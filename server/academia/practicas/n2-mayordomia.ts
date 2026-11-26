/**
 * Las prácticas de «Mayordomía cristiana» (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-mayordomia.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_MAYORDOMIA: PracticasMateria = {
  materia: "n2-mayordomia",
  mision: {
    titulo: "El administrador fiel",
    intro:
      "Un amigo de la iglesia quiere poner en orden su vida: su tiempo, su trabajo, sus dones y su dinero. Te pide ayuda para empezar como enseña la Biblia. Repasa las seis lecciones para responderle: quién es el dueño, cómo usar el tiempo y los talentos, cómo dar y cómo hacer un presupuesto.",
    cierre:
      "Ya puedes explicar que Dios es el dueño de todo y que lo que pide es fidelidad: con el tiempo, el trabajo, los dones, la forma de dar y el dinero de cada día.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Dios es el dueño; nosotros, administradores
    "n2-mayordomia-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hacía un mayordomo?", reverso: "Administraba la casa y los bienes de su señor, sin ser el dueño.", apoyo: "Un mayordomo administraba la casa y los bienes de su señor." },
              { frente: "¿De quién es todo lo que tenemos?", reverso: "De Dios: Él es el creador y el dueño de todo.", apoyo: "Dios es el creador y el dueño de todo" },
              { frente: "¿Qué pide Dios a cada uno de sus administradores?", reverso: "Que sea fiel con lo que recibió, sea poco o mucho.", apoyo: "Dios no pide que todos tengan lo mismo, sino que cada uno sea fiel con lo que recibió." },
              { frente: "¿Por qué decimos que la mayordomía mira hacia adelante?", reverso: "Porque un día rendiremos cuentas a Dios de lo que recibimos.", apoyo: "La mayordomía mira hacia adelante: cada uno dará cuenta a Dios de lo que hizo con lo que recibió" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué puso Dios al hombre en el huerto de Edén?", reverso: "Para que lo trabajara y lo cuidara: el trabajo es parte del plan de Dios.", apoyo: "El trabajo y el cuidado de la creación son parte del plan de Dios desde antes del pecado." },
              { frente: "¿Qué cosas nos confió Dios para administrar?", reverso: "La vida, el tiempo, los dones, los bienes y el evangelio.", apoyo: "la vida, el tiempo, los dones, los bienes y el evangelio nos fueron confiados" },
              { frente: "¿Para qué se nos confió el evangelio?", reverso: "Para compartirlo con otros.", apoyo: "El evangelio, que se nos confió para compartirlo" },
              { frente: "¿Rendir cuentas a Dios es para vivir con miedo?", reverso: "No: es para vivir con propósito, porque el Señor desea encontrarnos fieles.", apoyo: "No es para vivir con miedo, sino con propósito" },
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
            consigna: "Completa qué hacía un mayordomo.",
            texto: "Un mayordomo [[administraba]] la casa y los bienes de su señor. No era el dueño: cuidaba lo [[ajeno]] y un día rendía [[cuentas]].",
            distractores: ["compraba", "suyo", "gracias"],
            errores: {
              compraba: "El mayordomo no compraba los bienes de su señor: los administraba.",
              suyo: "No cuidaba lo suyo, sino lo ajeno: los bienes de su señor.",
              gracias: "El mayordomo rendía cuentas: le decía a su señor qué había hecho con sus bienes.",
            },
            apoyo: "No era el dueño: cuidaba lo ajeno y un día rendía cuentas.",
            explica: "El mayordomo administraba lo que era de su señor y un día rendía cuentas. La Biblia usa esa imagen para toda nuestra vida.",
          },
          {
            consigna: "Completa qué es ser mayordomo de Dios.",
            texto: "Dios puso al hombre en el huerto de Edén «para que lo [[labrara]] y lo [[guardase]]». Ser mayordomo es trabajar y [[cuidar]] lo que Dios nos dio, para su gloria.",
            distractores: ["vendiera", "dejase", "derrochar"],
            errores: {
              vendiera: "El huerto era de Dios: el hombre estaba allí para trabajarlo y cuidarlo.",
              dejase: "Dios no le pidió que lo dejara: le pidió que lo trabajara y lo cuidara.",
              derrochar: "El mayordomo no derrocha lo ajeno: cuida lo que Dios le dio.",
            },
            apoyo: "Ser mayordomo es trabajar y cuidar lo que Dios nos dio, para su gloria.",
            ref: "Génesis 2:15",
            explica: "Desde el principio, Dios le dio al hombre el trabajo y el cuidado de la creación. Ser mayordomo es trabajar y cuidar lo que Dios nos dio.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Piensa como si fuera el dueño o como administrador de Dios? Lleva cada frase a su grupo.",
            grupos: ["Piensa como si fuera el dueño", "Piensa como administrador de Dios"],
            frases: [
              { texto: "Mi dinero es mío y nadie me dice qué hacer con él", grupo: 0 },
              { texto: "Mi tiempo es solo mío: lo uso como quiero", grupo: 0 },
              { texto: "Le doy a Dios algo de lo mío, y lo demás es para mí", grupo: 0, explica: "La pregunta no es cuánto de lo mío le doy a Dios, sino cómo uso lo que es de Dios." },
              { texto: "Mi cuerpo es templo del Espíritu Santo", grupo: 1 },
              { texto: "Lo que tengo me lo confió Dios", grupo: 1 },
              { texto: "Un día daré cuenta a Dios de lo que recibí", grupo: 1 },
            ],
            apoyo: "Nada es nuestro de forma absoluta; todo nos ha sido confiado.",
            ref: "Salmos 24:1; 1 Corintios 6:19-20",
            explica: "Dios es el dueño de todo: de nuestra vida, de nuestro tiempo y de lo que tenemos. Nosotros somos sus administradores.",
          },
          {
            consigna: "¿Vive como si fuera el dueño o como administrador de Dios? Lleva cada frase a su grupo.",
            grupos: ["Vive como si fuera el dueño", "Vive como administrador de Dios"],
            frases: [
              { texto: "Usa sus dones solo para su propio provecho", grupo: 0 },
              { texto: "Se guarda el evangelio y no lo comparte", grupo: 0, explica: "El evangelio se nos confió para compartirlo." },
              { texto: "Trata su cuerpo como si fuera solo suyo", grupo: 0, explica: "La vida y el cuerpo son templo del Espíritu Santo: también nos fueron confiados." },
              { texto: "Comparte el evangelio que se le confió", grupo: 1 },
              { texto: "Usa bien su tiempo, porque no vuelve", grupo: 1 },
              { texto: "Cuida la creación como parte del plan de Dios", grupo: 1 },
            ],
            apoyo: "Dios es el creador y el dueño de todo: de la tierra, de nuestra vida, de nuestro tiempo y de lo que tenemos.",
            ref: "Salmos 24:1; 1 Corintios 4:1",
            explica: "Quien sabe que Dios es el dueño de todo usa su vida, su tiempo, sus dones y el evangelio como lo que son: algo que Dios le confió.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que Dios espera de un administrador: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios pide que todos sus administradores tengan lo mismo.", verdad: false, explica: "Dios no pide que todos tengan lo mismo, sino que cada uno sea fiel con lo que recibió.", apoyo: "Dios no pide que todos tengan lo mismo, sino que cada uno sea fiel con lo que recibió.", ref: "1 Corintios 4:2" },
              { texto: "Lo que Dios pide a cada administrador es fidelidad.", verdad: true, explica: "Pablo dice que de los administradores se requiere que cada uno sea hallado fiel.", apoyo: "lo que Dios pide es fidelidad", ref: "1 Corintios 4:2" },
              { texto: "Rendir cuentas a Dios es una razón para vivir con miedo.", verdad: false, explica: "No es para vivir con miedo, sino con propósito: el Señor desea encontrarnos fieles cuando vuelva.", apoyo: "No es para vivir con miedo, sino con propósito", ref: "Mateo 25:21" },
            ],
          },
          {
            consigna: "Sobre lo que Dios espera de un administrador: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cada uno dará cuenta a Dios de lo que hizo con lo que recibió.", verdad: true, explica: "La mayordomía mira hacia adelante: un día rendiremos cuentas.", apoyo: "cada uno dará cuenta a Dios de lo que hizo con lo que recibió", ref: "Romanos 14:12" },
              { texto: "Solo a quien recibió mucho le pide Dios que sea fiel.", verdad: false, explica: "Dios pide a cada uno que sea fiel con lo que recibió, sea poco o mucho.", apoyo: "sino que cada uno sea fiel con lo que recibió", ref: "Lucas 16:10" },
              { texto: "El Señor desea encontrarnos fieles cuando vuelva.", verdad: true, explica: "Por eso la mayordomía se vive con propósito: Él quiere hallarnos fieles.", apoyo: "el Señor desea encontrarnos fieles cuando vuelva", ref: "Mateo 25:21" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana de la iglesia te dice: Tengo muy poco; cuando Dios me dé más, entonces sí voy a ser fiel con eso.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Dios no pide que tengas lo que otros tienen: pide que seas fiel con lo que hoy tienes.", bien: true, explica: "Así lo enseña la lección: Dios no pide que todos tengan lo mismo, sino que cada uno sea fiel con lo que recibió." },
              { texto: "Tienes razón: la fidelidad es para los que tienen mucho; con poco, Dios ya lo entiende.", explica: "Dios pide fidelidad a cada uno, tenga poco o mucho: que cada uno sea fiel con lo que recibió." },
              { texto: "Primero pídele más a Dios; cuando tengas suficiente, ahí empiezas a administrarlo bien.", explica: "La fidelidad empieza con lo que ya recibimos, no con lo que esperamos tener." },
              { texto: "No te preocupes: con tan poco no hay nada que administrar ni cuentas que rendir.", explica: "Todos rendiremos cuentas: cada uno dará cuenta a Dios de lo que hizo con lo que recibió." },
            ],
            apoyo: "Dios no pide que todos tengan lo mismo, sino que cada uno sea fiel con lo que recibió.",
            ref: "1 Corintios 4:2; Lucas 16:10",
            explica: "Dios no mide cuánto tenemos, sino si somos fieles con lo que recibimos.",
          },
          {
            caso: "Un joven del grupo te dice: Me da miedo pensar que voy a rendir cuentas a Dios; prefiero no pensar en eso.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Haces bien: mejor no pienses en eso, porque rendir cuentas solo trae miedo y tristeza.", explica: "Rendir cuentas no es para vivir con miedo, sino con propósito." },
              { texto: "No es para vivir con miedo, sino con propósito: el Señor quiere encontrarnos fieles.", bien: true, explica: "La mayordomía mira hacia adelante, pero no con miedo: el Señor desea encontrarnos fieles cuando vuelva." },
              { texto: "Sí, da miedo: por eso hay que juntar mucho, para tener algo grande que mostrarle.", explica: "Dios no pide que todos tengan lo mismo: lo que pide es fidelidad." },
              { texto: "Tranquilo: Dios no le pide cuentas a nadie de lo que hace con lo que recibió.", explica: "La Biblia dice que cada uno dará cuenta a Dios de lo que hizo con lo que recibió." },
            ],
            apoyo: "No es para vivir con miedo, sino con propósito: el Señor desea encontrarnos fieles cuando vuelva",
            ref: "Romanos 14:12; Mateo 25:21",
            explica: "Saber que rendiremos cuentas nos da propósito: vivir fieles con lo que Dios nos confió.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios es el dueño de todo y nosotros somos sus administradores",
            ref: "Salmos 24:1; 1 Corintios 4:2",
            clave: {
              id: "pr-n2-mayordomia-1-a6-1",
              tipo: "corta",
              pregunta: "Explica con tus palabras qué es la mayordomía cristiana.",
              ideas: [
                { id: "dueno", peso: 40, texto: "Dios es el dueño de todo: nada es nuestro de forma absoluta.", formas: ["dios dueno", "dueno de todo", "todo es de dios", "todo le pertenece", "pertenece a dios", "nada es nuestro", "no somos duenos"] },
                { id: "administra", peso: 35, texto: "Somos sus administradores: cuidamos lo que Él nos confió.", formas: ["administr*", "mayordomo*", "nos confio", "nos confia", "confiad*", "cuid* lo que", "lo ajeno"] },
                { id: "cuentas", peso: 25, texto: "Lo que Dios pide es fidelidad, y un día rendiremos cuentas.", formas: ["rend* cuenta*", "dar* cuenta*", "fiel*", "fidelidad"] },
              ],
              modelo: "La mayordomía cristiana es reconocer que Dios es el dueño de todo y que nosotros somos sus administradores: cuidamos lo que Él nos confió, le somos fieles y un día le rendiremos cuentas.",
            },
          },
          {
            apoyo: "La Biblia usa esa imagen para toda nuestra vida.",
            ref: "Salmos 24:1; Romanos 14:12",
            clave: {
              id: "pr-n2-mayordomia-1-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué la Biblia compara nuestra vida con la de un mayordomo?",
              ideas: [
                { id: "ajeno", peso: 40, texto: "El mayordomo cuidaba lo ajeno: no era el dueño.", formas: ["lo ajeno", "ajeno", "no era dueno", "no es nuestro", "nada es nuestro", "no somos duenos", "bienes de su senor"] },
                { id: "dueno", peso: 35, texto: "Dios es el dueño de todo y nos confió lo que tenemos.", formas: ["dios dueno", "dueno de todo", "todo es de dios", "todo le pertenece", "nos confio", "nos confia", "confiad*"] },
                { id: "cuentas", peso: 25, texto: "Un día rendiremos cuentas a Dios.", formas: ["rend* cuenta*", "dar* cuenta*"] },
              ],
              modelo: "Porque un mayordomo cuidaba lo ajeno y no era el dueño. Así somos nosotros: Dios es el dueño de todo, nos confió la vida y los bienes, y un día le rendiremos cuentas.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. El tiempo y el trabajo
    "n2-mayordomia-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas horas por semana tenemos todos?", reverso: "Las mismas 168 horas.", apoyo: "Todos tenemos las mismas 168 horas por semana." },
              { frente: "¿Qué es contar nuestros días?", reverso: "Recordar que la vida es breve y vivirla con sabiduría, sin desperdiciarla.", apoyo: "Contar los días es recordar que la vida es breve y vivirla con sabiduría, sin desperdiciarla." },
              { frente: "¿El trabajo es un castigo?", reverso: "No: Dios trabajó en la creación y le dio trabajo al hombre.", apoyo: "El trabajo no es un castigo: Dios trabajó en la creación y le dio trabajo al hombre." },
              { frente: "¿Qué ritmo de trabajo y descanso estableció Dios?", reverso: "Seis días de trabajo y uno de descanso.", apoyo: "Dios estableció un ritmo de seis días de trabajo y uno de descanso" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué diferencia hay entre el dinero perdido y el tiempo perdido?", reverso: "El dinero perdido a veces se recupera; el tiempo, no.", apoyo: "El dinero perdido a veces se recupera; el tiempo, no." },
              { frente: "¿Qué es aprovechar bien el tiempo?", reverso: "Usar la agenda para la voluntad de Dios: lo importante primero.", apoyo: "Aprovechar el tiempo no es llenar la agenda, sino usarla para la voluntad de Dios: lo importante primero." },
              { frente: "¿Cómo trabaja el creyente?", reverso: "Con honradez y excelencia, sea en una oficina, en una obra o en la casa.", apoyo: "con honradez y excelencia, sea en una oficina, en una obra o en la casa" },
              { frente: "¿Para qué es el día del Señor?", reverso: "Es un regalo para adorar y renovarse.", apoyo: "el día del Señor es un regalo para adorar y renovarse" },
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
            consigna: "Completa por qué el tiempo es un regalo que se administra.",
            texto: "El tiempo es un [[regalo]] de Dios. Contar nuestros días es recordar que la vida es [[breve]] y vivirla con [[sabiduría]], sin desperdiciarla.",
            distractores: ["castigo", "larga", "prisa"],
            errores: {
              castigo: "El tiempo no es un castigo: es un regalo de Dios que no vuelve.",
              larga: "Contar los días es recordar que la vida es breve.",
              prisa: "No se trata de correr: es vivir con sabiduría, sin desperdiciar el tiempo.",
            },
            apoyo: "Contar los días es recordar que la vida es breve y vivirla con sabiduría, sin desperdiciarla.",
            ref: "Salmos 90:12",
            explica: "El tiempo es un regalo que no vuelve. Contar nuestros días es recordar que la vida es breve y vivirla con sabiduría.",
          },
          {
            consigna: "Completa qué es aprovechar bien el tiempo.",
            texto: "Pablo pide andar como [[sabios]], «aprovechando bien el tiempo»: usar la agenda para la [[voluntad]] de Dios, con lo [[importante]] primero.",
            distractores: ["ricos", "comodidad", "urgente"],
            errores: {
              ricos: "Pablo pide andar como sabios: usar bien el tiempo.",
              comodidad: "El tiempo se aprovecha usándolo para la voluntad de Dios.",
              urgente: "No es correr detrás de lo urgente: es poner lo importante primero.",
            },
            apoyo: "Aprovechar el tiempo no es llenar la agenda, sino usarla para la voluntad de Dios: lo importante primero.",
            ref: "Efesios 5:15-17",
            explica: "Aprovechar el tiempo no es llenar la agenda: es usarla para la voluntad de Dios, con lo importante primero.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el trabajo está equivocada. Tócala.",
            frases: [
              "Dios mismo trabajó en la creación.",
              "Dios le dio trabajo al hombre.",
              "El trabajo es un castigo que hay que aguantar.",
              "El creyente trabaja con honradez y excelencia.",
            ],
            malo: 2,
            correccion: "El trabajo no es un castigo: Dios trabajó en la creación y le dio trabajo al hombre.",
            apoyo: "El trabajo no es un castigo: Dios trabajó en la creación y le dio trabajo al hombre.",
            ref: "Colosenses 3:23-24",
            explica: "El trabajo es parte del plan de Dios, y el creyente lo hace para el Señor.",
          },
          {
            consigna: "Una de estas frases sobre el trabajo está equivocada. Tócala.",
            frases: [
              "El creyente trabaja para el Señor, no solo para su jefe.",
              "Solo el trabajo en la iglesia se hace para el Señor.",
              "El trabajo en la casa también se hace con excelencia.",
              "Trabajar con honradez es parte de trabajar para el Señor.",
            ],
            malo: 1,
            correccion: "Todo trabajo se hace para el Señor, sea en una oficina, en una obra o en la casa.",
            apoyo: "sea en una oficina, en una obra o en la casa",
            ref: "Colosenses 3:23-24",
            explica: "No importa dónde trabaje: el creyente trabaja con honradez y excelencia, para el Señor.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de la semana con la forma de darle su lugar.",
            pares: [
              ["El tiempo con Dios", "La Palabra, la oración y la iglesia, primero"],
              ["La familia", "Tiempo de calidad, no solo lo que sobra"],
              ["El trabajo o el estudio", "Con diligencia"],
              ["El descanso", "Lo que renueva, porque el cuerpo no es una máquina"],
              ["El teléfono y las pantallas", "Revisar en qué se va el tiempo"],
            ],
            apoyo: "Primero, el tiempo con Dios: la Palabra, la oración y la iglesia.",
            ref: "Éxodo 20:9-10; Efesios 5:15-17",
            explica: "Un plan semanal sencillo da su lugar a Dios, a la familia, al trabajo y al descanso, y revisa en qué se va el tiempo.",
          },
          {
            consigna: "Une cada problema de la semana con lo que conviene cambiar.",
            pares: [
              ["Llego a la noche sin haber orado", "Poner primero el tiempo con Dios"],
              ["A mi familia le doy solo lo que sobra", "Darle tiempo de calidad"],
              ["Trabajo los siete días de la semana", "Guardar un día para descansar y adorar"],
              ["Se me van las horas en el teléfono", "Revisar en qué se va el tiempo"],
            ],
            apoyo: "La familia: tiempo de calidad, no solo lo que sobra.",
            ref: "Éxodo 20:9-10",
            explica: "Ordenar la semana es poner primero a Dios, dar a la familia tiempo de calidad, respetar el descanso y revisar en qué se va el tiempo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu esposo te dice: Esta semana no hay tiempo para orar ni para estar en familia; primero está el trabajo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: cuando baje el trabajo, le damos a Dios y a la familia lo que sobre.", explica: "La familia merece tiempo de calidad, no solo lo que sobra; y el tiempo con Dios va primero." },
              { texto: "Entonces dejemos el trabajo: lo único que importa es orar y quedarnos en la casa.", explica: "El trabajo también es parte del plan de Dios: se hace con diligencia, junto con el tiempo para Dios y la familia." },
              { texto: "Pongamos primero el tiempo con Dios, y a la familia démosle tiempo de calidad.", bien: true, explica: "Así se ordena la semana: primero Dios, y la familia con tiempo de calidad, no solo lo que sobra." },
              { texto: "No pasa nada: Dios entiende que el trabajo siempre tiene que ir antes que Él.", explica: "El plan semanal pone primero el tiempo con Dios: la Palabra, la oración y la iglesia." },
            ],
            apoyo: "La familia: tiempo de calidad, no solo lo que sobra.",
            explica: "Una semana ordenada pone primero el tiempo con Dios y da a la familia tiempo de calidad, junto con el trabajo y el descanso.",
          },
          {
            caso: "Un amigo de la iglesia te dice: Trabajo los siete días y casi no duermo; descansar es perder el tiempo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: mientras más horas trabajes, más contento va a estar Dios contigo.", explica: "El trabajo es bueno, pero Dios también dio el descanso: el día del Señor es un regalo." },
              { texto: "Descansar también es mayordomía: Dios dio seis días de trabajo y uno de descanso.", bien: true, explica: "Dios estableció un ritmo de trabajo y descanso: el cuerpo no es una máquina." },
              { texto: "Descansa solo cuando te enfermes; antes de eso, el cuerpo aguanta lo que sea.", explica: "El cuerpo no es una máquina: el descanso es parte de administrar la vida." },
              { texto: "Deja el trabajo por completo y dedícate solo a descansar, que eso es lo espiritual.", explica: "Dios estableció seis días de trabajo: el trabajo también es parte de su plan." },
            ],
            apoyo: "El descanso también es mayordomía: el cuerpo no es una máquina",
            ref: "Éxodo 20:9-10",
            explica: "Dios estableció un ritmo de seis días de trabajo y uno de descanso. Descansar para adorar y renovarse también es mayordomía.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El trabajo no es un castigo: Dios trabajó en la creación y le dio trabajo al hombre.",
            ref: "Colosenses 3:23-24",
            clave: {
              id: "pr-n2-mayordomia-2-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué el trabajo no es un castigo para el creyente?",
              ideas: [
                { id: "dios", peso: 50, texto: "Dios trabajó en la creación y le dio trabajo al hombre.", formas: ["dios trabaj*", "creacion", "dio trabajo", "plan de dios", "desde el principio"] },
                { id: "senor", peso: 50, texto: "El creyente trabaja de corazón, como para el Señor, con honradez y excelencia.", formas: ["para el senor", "de corazon", "honrad*", "excelencia", "para dios", "con diligencia"] },
              ],
              modelo: "Porque Dios mismo trabajó en la creación y le dio trabajo al hombre. Por eso el creyente trabaja de corazón, como para el Señor, con honradez y excelencia.",
            },
          },
          {
            apoyo: "con honradez y excelencia, sea en una oficina, en una obra o en la casa",
            ref: "Colosenses 3:23-24",
            clave: {
              id: "pr-n2-mayordomia-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir trabajar para el Señor, aunque el jefe sea una persona?",
              ideas: [
                { id: "corazon", peso: 50, texto: "Trabajar de corazón, con honradez y excelencia.", formas: ["de corazon", "honrad*", "excelencia", "con diligencia", "lo mejor"] },
                { id: "todo", peso: 50, texto: "Se trabaja para Dios y no solo para los hombres, en cualquier trabajo: oficina, obra o casa.", formas: ["no para los hombres", "no para el jefe", "oficina", "obra", "en la casa", "cualquier trabajo", "todo trabajo", "para dios"], negativa: true },
              ],
              modelo: "Quiere decir trabajar de corazón, con honradez y excelencia, porque el trabajo es para Dios y no solo para los hombres, sea en una oficina, en una obra o en la casa.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Los talentos: lo que Dios puso en tus manos
    "n2-mayordomia-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué era un talento?", reverso: "Una gran suma de dinero.", apoyo: "Un talento era una gran suma de dinero." },
              { frente: "¿Cómo repartió el señor los talentos?", reverso: "A cada uno según su capacidad: no a todos lo mismo.", apoyo: "No todos recibimos lo mismo, pero todos recibimos algo" },
              { frente: "¿Qué hicieron los dos primeros siervos?", reverso: "Negociaron y duplicaron lo que recibieron.", apoyo: "Los dos primeros siervos negociaron y duplicaron lo recibido" },
              { frente: "¿Por qué el tercer siervo enterró su talento?", reverso: "Por miedo: veía a su señor como un hombre duro.", apoyo: "El tercer siervo enterró su talento por miedo, porque veía a su señor como un hombre duro." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué premia Dios: la cantidad o la fidelidad?", reverso: "La fidelidad, no la cantidad.", apoyo: "Dios premia la fidelidad, no la cantidad." },
              { frente: "¿Cuál fue el problema del tercer siervo?", reverso: "No fue tener poco, sino no usar lo que recibió.", apoyo: "Su problema no fue tener poco, sino no usarlo" },
              { frente: "¿Para qué se recibe cada don?", reverso: "Para servir a otros.", apoyo: "cada don se recibe para servir a otros" },
              { frente: "¿Qué recibimos todos de Dios?", reverso: "Capacidades, oportunidades, recursos y dones espirituales.", apoyo: "todos recibimos algo: capacidades, oportunidades, recursos y dones espirituales" },
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
            consigna: "Une cada parte de la parábola con lo que le corresponde.",
            pares: [
              ["Un talento", "Una gran suma de dinero"],
              ["El señor", "Repartió a cada uno conforme a su capacidad"],
              ["Los dos primeros siervos", "Negociaron y duplicaron lo recibido"],
              ["El tercer siervo", "Enterró su talento por miedo"],
            ],
            apoyo: "Jesús contó la historia de un señor que repartió talentos a sus siervos antes de un viaje.",
            ref: "Mateo 25:14-30",
            explica: "El señor repartió los talentos según la capacidad de cada uno: dos siervos negociaron y duplicaron lo recibido, y el tercero lo enterró por miedo.",
          },
          {
            consigna: "Une cada siervo o idea con lo que dice la parábola.",
            pares: [
              ["Los siervos que duplicaron lo recibido", "El señor les dijo lo mismo a ambos"],
              ["El siervo que enterró su talento", "El señor lo llamó malo y negligente"],
              ["Cómo veía a su señor el tercer siervo", "Como un hombre duro"],
              ["Lo que Dios premia", "La fidelidad, no la cantidad"],
            ],
            apoyo: "Dios premia la fidelidad, no la cantidad.",
            ref: "Mateo 25:21-26",
            explica: "A los dos fieles el señor les dijo lo mismo; al que enterró su talento por miedo lo llamó malo y negligente.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Mateo 25:21",
            consigna: "¿Por qué cualidad premió el señor a sus siervos? Toca las dos veces que el pasaje la nombra.",
            texto: "Bien, buen siervo y [[fiel]]; sobre poco has sido [[fiel]], sobre mucho te pondré",
            apoyo: "Dios premia la fidelidad, no la cantidad.",
            explica: "El señor alabó a sus siervos por ser fieles: fueron fieles sobre poco, y les confió mucho más.",
          },
          {
            ref: "Mateo 25:15",
            consigna: "¿Según qué repartió el señor los talentos a cada siervo? Toca la palabra.",
            texto: "a cada uno conforme a su [[capacidad]]",
            apoyo: "No todos recibimos lo mismo, pero todos recibimos algo",
            explica: "El señor no dio a todos lo mismo: repartió a cada uno conforme a su capacidad.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los dones y las capacidades que Dios nos confió: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Todos recibimos algo de Dios, aunque no todos recibimos lo mismo.", verdad: true, explica: "El señor repartió a cada uno conforme a su capacidad: nadie se quedó sin nada.", apoyo: "No todos recibimos lo mismo, pero todos recibimos algo", ref: "Mateo 25:15" },
              { texto: "Solo los pastores y los líderes reciben dones de Dios.", verdad: false, explica: "Todos recibimos algo: capacidades, oportunidades, recursos y dones espirituales.", apoyo: "todos recibimos algo: capacidades, oportunidades, recursos y dones espirituales" },
              { texto: "Pedro llama a los creyentes administradores de la multiforme gracia de Dios.", verdad: true, explica: "Cada creyente administra lo que recibió de la gracia de Dios.", apoyo: "Pedro llama a los creyentes buenos administradores de la multiforme gracia de Dios", ref: "1 Pedro 4:10" },
            ],
          },
          {
            consigna: "Sobre los dones y las capacidades que Dios nos confió: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios reparte a todos sus hijos exactamente lo mismo.", verdad: false, explica: "El señor repartió a cada uno conforme a su capacidad: no todos recibimos lo mismo.", apoyo: "No todos recibimos lo mismo, pero todos recibimos algo", ref: "Mateo 25:15" },
              { texto: "Las oportunidades y los recursos también son algo que recibimos de Dios.", verdad: true, explica: "La lección los nombra junto con las capacidades y los dones espirituales.", apoyo: "todos recibimos algo: capacidades, oportunidades, recursos y dones espirituales" },
              { texto: "Nuestras capacidades son solo mérito nuestro.", verdad: false, explica: "Las capacidades también las recibimos: Dios reparte a cada uno conforme a su capacidad.", apoyo: "Dios reparte a cada uno conforme a su capacidad" },
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
            consigna: "¿Así actúa el siervo fiel o el negligente? Lleva cada frase a su grupo.",
            grupos: ["Como el siervo fiel", "Como el siervo negligente"],
            frases: [
              { texto: "Usa lo que recibió para servir a otros", grupo: 0 },
              { texto: "Es fiel con lo poco que tiene", grupo: 0 },
              { texto: "Usa su don confiando en la bondad de Dios", grupo: 0 },
              { texto: "Entierra su don por miedo", grupo: 1 },
              { texto: "Piensa que, como tiene poco, no vale la pena usarlo", grupo: 1, explica: "El problema del tercer siervo no fue tener poco, sino no usarlo." },
              { texto: "Ve a Dios como un señor duro", grupo: 1, explica: "El tercer siervo veía a su señor como un hombre duro, y por eso enterró su talento." },
            ],
            apoyo: "el siervo fiel usa lo recibido para el Señor y para servir a otros, y el negligente lo entierra por miedo",
            ref: "Mateo 25:21-26",
            explica: "El siervo fiel usa lo recibido para el Señor y para servir a otros; el negligente lo entierra por miedo.",
          },
          {
            consigna: "¿Usa su don para servir o lo tiene enterrado? Lleva cada frase a su grupo.",
            grupos: ["Usa su don para servir", "Tiene su don enterrado"],
            frases: [
              { texto: "Toca la guitarra en la reunión de jóvenes", grupo: 0 },
              { texto: "Ayuda a un vecino con lo que sabe hacer", grupo: 0 },
              { texto: "Enseña a otros lo que aprendió", grupo: 0 },
              { texto: "Canta muy bien, pero nunca quiere servir", grupo: 1 },
              { texto: "Sabe cocinar, pero no ayuda por miedo a fallar", grupo: 1, explica: "El miedo llevó al tercer siervo a enterrar su talento." },
              { texto: "Guarda su don solo para sí mismo", grupo: 1, explica: "Cada don se recibe para servir a otros." },
            ],
            apoyo: "Lo que no se usa para Dios termina enterrado.",
            ref: "1 Pedro 4:10",
            explica: "Lo que no se usa para Dios termina enterrado: cada don se recibe para servir a otros.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu grupo te dice: Yo casi no tengo talentos; mejor que sirvan los que tienen más.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: con tan poco, es mejor que lo guardes y dejes servir a los demás.", explica: "El problema del tercer siervo no fue tener poco, sino no usarlo." },
              { texto: "Espera a tener más dones; cuando seas como los demás, ahí empiezas a servir.", explica: "Dios pide fidelidad con lo que hoy recibiste: los siervos fueron fieles sobre poco." },
              { texto: "Dios premia la fidelidad, no la cantidad: usa lo que recibiste para servir.", bien: true, explica: "Todos recibimos algo, y cada don se recibe para servir a otros." },
              { texto: "Si no tienes talentos, Dios no te va a pedir nada, así que puedes estar tranquilo.", explica: "Todos recibimos algo: capacidades, oportunidades, recursos y dones espirituales." },
            ],
            apoyo: "Su problema no fue tener poco, sino no usarlo",
            ref: "Mateo 25:21; 1 Pedro 4:10",
            explica: "Todos recibimos algo. Lo que Dios espera es fidelidad con lo recibido, y cada don es para servir a otros.",
          },
          {
            caso: "Tu amiga, que canta muy bien, te dice: Me da miedo equivocarme; prefiero no cantar nunca en la iglesia.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Quien conoce la bondad de Dios no entierra lo que recibió: úsalo para servir.", bien: true, explica: "El tercer siervo enterró su talento por miedo. Quien conoce la bondad de Dios usa lo que recibió." },
              { texto: "Haces bien: si te equivocas, Dios se va a enojar contigo; mejor no te arriesgues.", explica: "Así pensaba el tercer siervo: veía a su señor como un hombre duro, y enterró su talento." },
              { texto: "Canta solo cuando estés segura de que lo vas a hacer mejor que todos los demás.", explica: "Dios premia la fidelidad, no la cantidad: no hace falta ser mejor que los demás." },
              { texto: "Tu don es solo para ti: cántale a Dios en tu casa, que en la iglesia no hace falta.", explica: "Cada don se recibe para servir a otros, no solo para uno mismo." },
            ],
            apoyo: "Quien conoce la bondad de Dios no entierra lo que recibió.",
            ref: "Mateo 25:24-26; 1 Pedro 4:10",
            explica: "El miedo llevó al tercer siervo a enterrar su talento. Los dones se usan confiando en la bondad de Dios, para servir a otros.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios reparte a cada uno conforme a su capacidad y espera fidelidad, no cantidad",
            ref: "Mateo 25:14-30",
            clave: {
              id: "pr-n2-mayordomia-3-a7-1",
              tipo: "corta",
              pregunta: "Explica con tus palabras la parábola de los talentos.",
              ideas: [
                { id: "reparte", peso: 30, texto: "El señor repartió a cada uno conforme a su capacidad.", formas: ["reparti* a cada uno", "dio a cada uno", "conforme a su capacidad", "segun su capacidad", "capacidad", "no todos recibimos lo mismo"] },
                { id: "fiel", peso: 40, texto: "Los fieles usaron lo recibido, y el señor premió su fidelidad, no la cantidad.", formas: ["fidelidad", "fiel*", "negociaron", "duplicaron", "premi*"] },
                { id: "enterro", peso: 30, texto: "El tercero enterró su talento por miedo: su problema fue no usarlo.", formas: ["enterr*", "por miedo", "no lo uso", "no usarlo", "negligente"] },
              ],
              modelo: "Un señor repartió talentos a cada uno conforme a su capacidad. Dos siervos negociaron y duplicaron lo recibido, y el señor premió su fidelidad. El tercero enterró su talento por miedo.",
            },
          },
          {
            apoyo: "Su problema no fue tener poco, sino no usarlo",
            ref: "Mateo 25:24-26",
            clave: {
              id: "pr-n2-mayordomia-3-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué el señor llamó malo y negligente al tercer siervo, si había recibido poco?",
              ideas: [
                { id: "usar", peso: 50, texto: "Su problema no fue tener poco, sino no usarlo.", formas: ["no fue tener poco", "no usarlo", "no uso", "no lo aprovecho", "no hizo nada", "enterr*"], negativa: true },
                { id: "miedo", peso: 50, texto: "Lo enterró por miedo, porque veía a su señor como un hombre duro.", formas: ["miedo", "temor", "hombre duro", "senor duro", "duro"] },
              ],
              modelo: "Porque su problema no fue tener poco, sino no usarlo: enterró su talento por miedo, ya que veía a su señor como un hombre duro.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. El diezmo y las ofrendas
    "n2-mayordomia-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A quién dio Abram los diezmos?", reverso: "A Melquisedec, antes de la ley.", apoyo: "Abram dio los diezmos a Melquisedec" },
              { frente: "¿A quiénes sostenía el diezmo en la ley?", reverso: "A los levitas, que servían en el tabernáculo.", apoyo: "sostenía a los levitas, que servían en el tabernáculo" },
              { frente: "¿Anuló Jesús el diezmo?", reverso: "No lo anuló, pero pidió lo más importante: la justicia, la misericordia y la fe.", apoyo: "no anuló el diezmo, pero pidió lo más importante de la ley" },
              { frente: "¿Qué son las ofrendas?", reverso: "Dádivas voluntarias que se dan además del diezmo.", apoyo: "las ofrendas como dádivas voluntarias además del diezmo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué prometió Jacob?", reverso: "Dar a Dios el diezmo de todo.", apoyo: "Jacob prometió dar a Dios el diezmo de todo" },
              { frente: "¿Por qué reprendió Dios a su pueblo en Malaquías?", reverso: "Por retener los diezmos y las ofrendas.", apoyo: "Dios reprendió a su pueblo por retener los diezmos y las ofrendas" },
              { frente: "¿Cómo enseña la iglesia el diezmo?", reverso: "Como el punto de partida de la generosidad del creyente.", apoyo: "enseñan el diezmo como el punto de partida de la generosidad del creyente" },
              { frente: "¿Qué enseña el evangelio de la prosperidad?", reverso: "Que dar dinero obliga a Dios a hacernos ricos; la Biblia reprende esa idea.", apoyo: "Hay quienes enseñan que dar dinero obliga a Dios a hacernos ricos." },
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
            consigna: "Ordena en el tiempo cómo aparece el diezmo, del primero al último.",
            eventos: [
              { texto: "Abram da los diezmos a Melquisedec.", fecha: "Antes de la ley" },
              { texto: "El diezmo sostiene a los levitas, que sirven en el tabernáculo.", fecha: "En la ley" },
              { texto: "Dios reprende a su pueblo por retener los diezmos y las ofrendas.", fecha: "En los profetas" },
              { texto: "Jesús no anula el diezmo y pide la justicia, la misericordia y la fe.", fecha: "En las palabras de Jesús" },
              { texto: "La iglesia enseña el diezmo como punto de partida de la generosidad.", fecha: "Hoy, en la iglesia" },
            ],
            apoyo: "El diezmo aparece antes de la ley, en la ley y en las palabras de Jesús",
            ref: "Génesis 14:18-20; Números 18:21; Malaquías 3:8-10; Mateo 23:23",
            explica: "El diezmo aparece antes de la ley, con Abram; en la ley, para sostener a los levitas; en los profetas, con Malaquías; y en las palabras de Jesús, que no lo anuló.",
          },
          {
            consigna: "Ordena en el tiempo estos hechos sobre el diezmo, del primero al último.",
            eventos: [
              { texto: "Jacob promete dar a Dios el diezmo de todo.", fecha: "Antes de la ley" },
              { texto: "El diezmo es santo para Jehová.", fecha: "En la ley" },
              { texto: "Dios invita a su pueblo a traer los diezmos al alfolí.", fecha: "En los profetas" },
              { texto: "Jesús pide lo más importante de la ley, sin anular el diezmo.", fecha: "En las palabras de Jesús" },
              { texto: "La iglesia enseña las ofrendas como dádivas además del diezmo.", fecha: "Hoy, en la iglesia" },
            ],
            apoyo: "Jacob prometió dar a Dios el diezmo de todo",
            ref: "Génesis 28:22; Levítico 27:30; Malaquías 3:10; Mateo 23:23",
            explica: "Antes de la ley, Jacob prometió el diezmo; en la ley, el diezmo era santo para Jehová; en los profetas, Dios invitó a traerlo al alfolí; y Jesús no lo anuló.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada forma de dar que enseña el Nuevo Testamento con su ejemplo.",
            pares: [
              ["Dar con orden y en proporción", "Dar una parte de acuerdo con lo que ganó"],
              ["Dar con alegría", "Dar contento, no de mala gana ni porque lo obligan"],
              ["Dar con transparencia", "Llevar cuentas claras de las ofrendas"],
              ["Dar para la obra de Dios", "Sostener a quienes sirven en la obra"],
              ["Dar a los necesitados", "Ayudar a un hermano que no tiene para comer"],
            ],
            apoyo: "el Nuevo Testamento pide dar con orden, en proporción, con alegría y con transparencia",
            ref: "1 Corintios 16:2; 2 Corintios 9:7; 2 Corintios 8:21",
            explica: "El Nuevo Testamento enseña a dar con orden, en proporción, con alegría y con transparencia, para sostener la obra de Dios y ayudar a los necesitados.",
          },
          {
            consigna: "Une cada principio para dar con lo que dice la lección.",
            pares: [
              ["Con orden y en proporción", "Según lo que cada uno ha recibido"],
              ["Con alegría", "No con tristeza ni por necesidad"],
              ["Con transparencia", "Honradamente delante del Señor y de los hombres"],
              ["Para la obra de Dios", "Sostener la obra y a quienes la sirven"],
              ["Para los necesitados", "Ayudar a los pobres y a los hermanos"],
            ],
            apoyo: "Con alegría, no con tristeza ni por necesidad",
            ref: "1 Corintios 16:2; 2 Corintios 9:7; Gálatas 6:6; Gálatas 2:10",
            explica: "Se da con orden, en proporción, con alegría y con transparencia; y se da para sostener la obra de Dios y ayudar a los necesitados.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es dar con fe y gratitud o es el evangelio de la prosperidad? Lleva cada frase a su grupo.",
            grupos: ["Dar con fe y gratitud", "El evangelio de la prosperidad"],
            frases: [
              { texto: "Doy porque Dios me dio primero a su Hijo", grupo: 0 },
              { texto: "Doy con alegría, como una forma de adorar", grupo: 0 },
              { texto: "Doy por amor, no como un negocio con Dios", grupo: 0 },
              { texto: "Si doy dinero, Dios está obligado a hacerme rico", grupo: 1, explica: "Hay quienes enseñan que dar dinero obliga a Dios a hacernos ricos: es un falso evangelio." },
              { texto: "Doy para que Dios me devuelva el doble", grupo: 1, explica: "A Dios no se le compra: damos por gratitud, por fe y por amor." },
              { texto: "La piedad es una forma de ganar dinero", grupo: 1, explica: "La Biblia reprende a los que toman la piedad como fuente de ganancia." },
            ],
            apoyo: "damos por gratitud, por fe y por amor, porque Él nos dio primero a su Hijo",
            ref: "1 Timoteo 6:5",
            explica: "Dios bendice al generoso, pero no se le compra. Damos por gratitud, por fe y por amor.",
          },
          {
            consigna: "¿Es dar por gratitud o es hacer un negocio con Dios? Lleva cada frase a su grupo.",
            grupos: ["Dar por gratitud", "Hacer un negocio con Dios"],
            frases: [
              { texto: "Dar sabiendo que a Dios no se le compra", grupo: 0 },
              { texto: "Dar con fe y con alegría", grupo: 0 },
              { texto: "Dar con orden y en proporción a lo recibido", grupo: 0 },
              { texto: "Dar esperando que Dios pague con riquezas", grupo: 1 },
              { texto: "Dar para obligar a Dios a bendecir", grupo: 1, explica: "Dios bendice al generoso, pero no se le compra." },
              { texto: "Usar la piedad como fuente de ganancia", grupo: 1, explica: "La Biblia reprende a los que toman la piedad como fuente de ganancia." },
            ],
            apoyo: "Dios bendice al generoso, pero no se le compra",
            ref: "1 Timoteo 6:5",
            explica: "El Nuevo Testamento nunca enseña a dar como un negocio con Dios: damos por gratitud, por fe y por amor.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un amigo te reenvía un video y te escribe: Este predicador dice que si doy 100 dólares, Dios tiene que devolverme 1000.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Inténtalo: si das más dinero, Dios tiene que devolverte más; así funciona la fe.", explica: "Eso es el evangelio de la prosperidad: enseña que dar dinero obliga a Dios a hacernos ricos." },
              { texto: "Mejor no des nada a la iglesia, porque todos los que piden dinero engañan.", explica: "Dar sigue siendo bíblico: el Nuevo Testamento enseña a dar con alegría para sostener la obra de Dios." },
              { texto: "A Dios no se le compra: damos por gratitud, por fe y por amor, no por negocio.", bien: true, explica: "Dios bendice al generoso, pero no se le compra: damos porque Él nos dio primero a su Hijo." },
              { texto: "Da los 100, y si Dios no te devuelve los 1000 es porque te faltó fe.", explica: "La fe no obliga a Dios: la Biblia reprende a los que toman la piedad como fuente de ganancia." },
            ],
            apoyo: "Hay quienes enseñan que dar dinero obliga a Dios a hacernos ricos.",
            ref: "1 Timoteo 6:5",
            explica: "Eso es el falso evangelio de la prosperidad. Dios bendice al generoso, pero no se le compra: damos por gratitud, por fe y por amor.",
          },
          {
            caso: "Una compañera de la iglesia te dice: Ya no voy a dar el diezmo; dicen que todo eso es un negocio.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Dar no es un negocio: damos por gratitud y por fe, no para hacernos ricos.", bien: true, explica: "Lo falso es pensar que dar obliga a Dios a hacernos ricos; dar con fe y gratitud es bíblico." },
              { texto: "Tienes razón: el diezmo era solo para la ley, y Jesús lo anuló para siempre.", explica: "Jesús no anuló el diezmo, pero pidió lo más importante de la ley: la justicia, la misericordia y la fe." },
              { texto: "Sigue dando, porque si dejas de hacerlo, Dios te va a castigar con pobreza.", explica: "Se da con alegría, no con tristeza ni por necesidad: damos por gratitud, por fe y por amor." },
              { texto: "Da solo cuando te sobre, que a Dios le basta con lo que tú no necesites.", explica: "El diezmo es el punto de partida de la generosidad, y se da con orden y en proporción a lo que recibimos." },
            ],
            apoyo: "damos por gratitud, por fe y por amor, porque Él nos dio primero a su Hijo",
            ref: "2 Corintios 9:7; 1 Timoteo 6:5",
            explica: "La Biblia reprende a los que toman la piedad como fuente de ganancia, pero sigue enseñando a dar: por gratitud, por fe y por amor, nunca como un negocio con Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "no anuló el diezmo, pero pidió lo más importante de la ley: la justicia, la misericordia y la fe",
            ref: "Mateo 23:23",
            clave: {
              id: "pr-n2-mayordomia-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué hizo Jesús con el diezmo, según Mateo 23:23?",
              ideas: [
                { id: "no-anulo", peso: 50, texto: "No anuló el diezmo.", formas: ["no anulo", "nunca anulo", "no quito", "no elimino", "no cancelo", "era necesario"], negativa: true },
                { id: "importante", peso: 50, texto: "Pidió lo más importante de la ley: la justicia, la misericordia y la fe.", formas: ["lo mas importante", "lo importante", "justicia", "misericordia", "la fe"] },
              ],
              modelo: "Jesús no anuló el diezmo, pero pidió lo más importante de la ley: la justicia, la misericordia y la fe. Por eso la iglesia enseña el diezmo como punto de partida de la generosidad.",
            },
          },
          {
            apoyo: "El diezmo aparece antes de la ley, en la ley y en las palabras de Jesús",
            ref: "Génesis 14:18-20; Levítico 27:30; Números 18:21",
            clave: {
              id: "pr-n2-mayordomia-4-a6-2",
              tipo: "corta",
              pregunta: "¿Qué enseña la Biblia sobre el diezmo antes de la ley y en la ley?",
              ideas: [
                { id: "antes", peso: 50, texto: "Antes de la ley, Abram dio los diezmos a Melquisedec y Jacob prometió el diezmo de todo.", formas: ["abram", "abraham", "melquisedec", "jacob"] },
                { id: "ley", peso: 50, texto: "En la ley, el diezmo era santo para Jehová y sostenía a los levitas.", formas: ["levitas", "santo para jehova", "santo para dios", "era santo", "tabernaculo"] },
              ],
              modelo: "Antes de la ley, Abram dio los diezmos a Melquisedec y Jacob prometió dar el diezmo de todo. En la ley, el diezmo era santo para Jehová y sostenía a los levitas.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. Generosidad y contentamiento
    "n2-mayordomia-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo estaban las iglesias de Macedonia cuando dieron?", reverso: "Eran pobres y estaban en prueba.", apoyo: "Las iglesias de Macedonia eran pobres y estaban en prueba" },
              { frente: "¿Cuál fue el secreto de la generosidad de Macedonia?", reverso: "Primero se dieron a sí mismos al Señor.", apoyo: "La generosidad nace de un corazón entregado a Dios." },
              { frente: "¿Quién es el modelo supremo de generosidad?", reverso: "Cristo, que siendo rico se hizo pobre por amor a nosotros.", apoyo: "El modelo supremo es Cristo" },
              { frente: "¿Qué es el contentamiento?", reverso: "Estar satisfecho en Cristo, tengamos mucho o poco.", apoyo: "El contentamiento es estar satisfecho en Cristo, tengamos mucho o poco" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué depende la generosidad?", reverso: "De cuánto confiamos en Dios, no de cuánto tenemos.", apoyo: "La generosidad no depende de cuánto tenemos, sino de cuánto confiamos en Dios." },
              { frente: "¿El dinero es malo?", reverso: "No: lo que es raíz de todos los males es el amor al dinero.", apoyo: "El dinero no es malo" },
              { frente: "¿Qué palabras del Señor Jesús recordó Pablo sobre dar?", reverso: "Que es más bienaventurado dar que recibir.", apoyo: "Pablo recordó las palabras del Señor Jesús" },
              { frente: "¿Qué incluye la generosidad, además del dinero?", reverso: "El tiempo, la hospitalidad y la ayuda práctica a quien lo necesita.", apoyo: "La generosidad incluye el dinero, pero también el tiempo, la hospitalidad y la ayuda práctica a quien lo necesita." },
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
            consigna: "Completa el ejemplo de las iglesias de Macedonia y de Cristo.",
            texto: "Las iglesias de Macedonia eran [[pobres]] y estaban en prueba, pero fueron generosas. Su secreto: primero se dieron a sí mismas al [[Señor]]. Y el modelo supremo es [[Cristo]], que se hizo pobre por amor a nosotros.",
            distractores: ["ricas", "pastor", "Pablo"],
            errores: {
              ricas: "Eran pobres y estaban en prueba: aun así dieron más allá de sus fuerzas.",
              pastor: "El secreto fue que primero se dieron al Señor.",
              Pablo: "El modelo supremo de la generosidad es Cristo, que se hizo pobre por nosotros.",
            },
            apoyo: "La generosidad nace de un corazón entregado a Dios.",
            ref: "2 Corintios 8:1-9",
            explica: "Las iglesias de Macedonia eran pobres, pero se dieron primero al Señor y dieron con generosidad. El modelo supremo es Cristo.",
          },
          {
            consigna: "Completa de dónde nace la generosidad.",
            texto: "La generosidad nace de un [[corazón]] entregado a Dios. Cristo, siendo [[rico]], se hizo pobre por amor a nosotros. Quien ha recibido tanta [[gracia]] aprende a [[dar]].",
            distractores: ["bolsillo", "pobre", "riqueza", "pedir"],
            errores: {
              bolsillo: "La generosidad no depende de cuánto tenemos: nace de un corazón entregado a Dios.",
              riqueza: "No es la riqueza la que enseña a dar: quien ha recibido tanta gracia aprende a dar.",
              pedir: "Quien ha recibido tanta gracia no aprende a pedir más, sino a dar.",
            },
            apoyo: "Quien ha recibido tanta gracia aprende a dar.",
            ref: "2 Corintios 8:9",
            explica: "La generosidad nace de un corazón entregado a Dios y de la gracia recibida: Cristo, siendo rico, se hizo pobre por nosotros.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "2 Corintios 8:5",
            consigna: "¿A quién se dieron primero las iglesias de Macedonia? Toca la palabra.",
            texto: "a sí mismos se dieron primeramente al [[Señor]]",
            apoyo: "La generosidad nace de un corazón entregado a Dios.",
            explica: "El secreto de Macedonia fue darse primero al Señor: de un corazón entregado a Dios nace la generosidad.",
          },
          {
            ref: "2 Corintios 8:9",
            consigna: "¿Por qué Cristo, siendo rico, se hizo pobre? Toca la palabra que da la razón.",
            texto: "por [[amor]] a vosotros se hizo pobre, siendo rico",
            apoyo: "El modelo supremo es Cristo",
            explica: "Cristo se hizo pobre por amor a nosotros: Él es el modelo supremo de la generosidad.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se unen estas ideas sobre el contentamiento? Elige la relación de cada enlace.",
            nodos: [
              { id: "cristo", texto: "Cristo", x: 25, y: 10 },
              { id: "conten", texto: "El contentamiento", x: 75, y: 37 },
              { id: "amor", texto: "El amor al dinero", x: 25, y: 63 },
              { id: "males", texto: "Todos los males", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "conten", a: "cristo", relacion: "es estar satisfecho en" },
              { de: "conten", a: "amor", relacion: "nos libra de" },
              { de: "amor", a: "males", relacion: "es raíz de" },
            ],
            distractores: ["es lo mismo que", "se compra con"],
            apoyo: "el contentamiento en Cristo nos libra del amor al dinero",
            ref: "1 Timoteo 6:6-10; Filipenses 4:11-13",
            explica: "El contentamiento es estar satisfecho en Cristo, y nos libra del amor al dinero, que es raíz de todos los males.",
          },
          {
            consigna: "¿Cómo se unen estas ideas sobre el contentamiento y el dinero? Elige la relación de cada enlace.",
            nodos: [
              { id: "piedad", texto: "La piedad", x: 25, y: 10 },
              { id: "conten", texto: "El contentamiento", x: 75, y: 37 },
              { id: "amor", texto: "El amor al dinero", x: 25, y: 63 },
              { id: "poco", texto: "Mucho o poco", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "piedad", a: "conten", relacion: "es gran ganancia con" },
              { de: "conten", a: "amor", relacion: "nos libra de" },
              { de: "conten", a: "poco", relacion: "es estar satisfecho con" },
            ],
            distractores: ["es lo mismo que", "se compra con"],
            apoyo: "El contentamiento es estar satisfecho en Cristo, tengamos mucho o poco",
            ref: "1 Timoteo 6:6-10; Filipenses 4:11-13",
            explica: "La piedad con contentamiento es gran ganancia. El contentamiento es estar satisfecho en Cristo, tengamos mucho o poco, y nos libra del amor al dinero.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es una forma de ser generoso o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Es ser generoso", "No es ser generoso"],
            frases: [
              { texto: "Abrir la casa y la mesa a otros", grupo: 0 },
              { texto: "Ayudar a un hermano en necesidad sin anunciarlo", grupo: 0 },
              { texto: "Dar tiempo y trabajo a quien no puede pagarlos", grupo: 0 },
              { texto: "Ayudar y contarlo a todos para que me admiren", grupo: 1, explica: "La lección enseña a ayudar a un hermano en necesidad sin anunciarlo." },
              { texto: "Dar solo lo que sobra al final del mes", grupo: 1, explica: "Lo generoso es apartar primero para Dios y para dar, antes de gastar." },
              { texto: "Esperar a ser rico para empezar a dar", grupo: 1, explica: "La generosidad no depende de cuánto tenemos, sino de cuánto confiamos en Dios." },
            ],
            apoyo: "La generosidad incluye el dinero, pero también el tiempo, la hospitalidad y la ayuda práctica a quien lo necesita.",
            ref: "Romanos 12:13; Hechos 20:35",
            explica: "La generosidad incluye el dinero, el tiempo, la hospitalidad y la ayuda práctica, y no espera a tener más.",
          },
          {
            consigna: "¿Vive con generosidad o se aferra a lo suyo? Lleva cada frase a su grupo.",
            grupos: ["Vive con generosidad", "Se aferra a lo suyo"],
            frases: [
              { texto: "Aparta primero para Dios y para dar, antes de gastar", grupo: 0 },
              { texto: "Invita a comer a una familia nueva de la iglesia", grupo: 0 },
              { texto: "Ayuda a un vecino a arreglar su casa sin cobrarle", grupo: 0 },
              { texto: "Nunca abre su casa ni su mesa a nadie", grupo: 1 },
              { texto: "Piensa que solo los ricos pueden ser generosos", grupo: 1, explica: "Algunas de las iglesias más pobres del Nuevo Testamento fueron las más generosas." },
              { texto: "Ayuda solo si otros se enteran", grupo: 1, explica: "La lección enseña a ayudar a un hermano en necesidad sin anunciarlo." },
            ],
            apoyo: "La persona generosa no es la que tiene más, sino la que se aferra menos.",
            ref: "Romanos 12:13",
            explica: "La persona generosa no es la que tiene más, sino la que se aferra menos: aparta para dar, abre su casa y ayuda sin anunciarlo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una amiga de la iglesia te dice: Yo no puedo ser generosa; apenas me alcanza el dinero.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Es verdad: la generosidad es para los que tienen dinero de sobra; tú no tienes que dar.", explica: "Algunas de las iglesias más pobres del Nuevo Testamento fueron las más generosas." },
              { texto: "La generosidad no depende de cuánto tienes: puedes dar tu tiempo o abrir tu mesa.", bien: true, explica: "Las iglesias de Macedonia eran pobres y fueron generosas; y la generosidad incluye el tiempo, la hospitalidad y la ayuda práctica." },
              { texto: "Primero junta mucho dinero y, cuando te sobre, ahí empiezas a ser generosa.", explica: "La generosidad no depende de cuánto tenemos, sino de cuánto confiamos en Dios." },
              { texto: "No te preocupes: a Dios solo le importa el dinero que das, y si no tienes, no cuenta.", explica: "La generosidad incluye el dinero, pero también el tiempo, la hospitalidad y la ayuda práctica." },
            ],
            apoyo: "La generosidad no depende de cuánto tenemos, sino de cuánto confiamos en Dios.",
            ref: "2 Corintios 8:1-5",
            explica: "No hace falta tener mucho para ser generoso: se puede dar tiempo, abrir la casa y ayudar a quien lo necesita.",
          },
          {
            caso: "Un compañero de la iglesia te dice: Ayudé a un hermano a pagar su renta; ¿lo cuento el domingo para que vean que soy generoso?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Sí, cuéntalo: así todos ven tu generosidad y te van a admirar mucho más.", explica: "La generosidad no busca que la admiren: se ayuda a un hermano sin anunciarlo." },
              { texto: "Mejor no vuelvas a ayudar a nadie, porque después todos te van a pedir.", explica: "Jesús enseñó que es más bienaventurado dar que recibir: la generosidad sigue dando." },
              { texto: "Cuéntalo, y pídele a ese hermano que te devuelva la ayuda cuando pueda.", explica: "La generosidad da también a quien no puede pagar: no da para cobrar después." },
              { texto: "Hiciste bien en ayudar; lo generoso es hacerlo sin anunciarlo a todos.", bien: true, explica: "Una forma de ser generoso es ayudar a un hermano en necesidad sin anunciarlo." },
            ],
            apoyo: "Ayudar a un hermano en necesidad sin anunciarlo.",
            ref: "Hechos 20:35",
            explica: "Una de las formas de ser generoso es ayudar a un hermano en necesidad sin anunciarlo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El contentamiento es estar satisfecho en Cristo, tengamos mucho o poco",
            ref: "1 Timoteo 6:6-10; Filipenses 4:11-13",
            clave: {
              id: "pr-n2-mayordomia-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el contentamiento y qué peligro tiene el amor al dinero?",
              ideas: [
                { id: "satisfecho", peso: 50, texto: "El contentamiento es estar satisfecho en Cristo, tengamos mucho o poco.", formas: ["satisfech*", "content* en cristo", "mucho o poco", "tengamos mucho", "con lo que tenemos", "con lo que tengo"] },
                { id: "raiz", peso: 50, texto: "El amor al dinero es raíz de todos los males; el dinero en sí no es malo.", formas: ["raiz de todos", "raiz de los males", "raiz de todo", "todos los males", "dinero no es malo"] },
              ],
              modelo: "El contentamiento es estar satisfecho en Cristo, tengamos mucho o poco. El dinero no es malo, pero el amor al dinero es raíz de todos los males.",
            },
          },
          {
            apoyo: "El dinero no es malo",
            ref: "1 Timoteo 6:6-10",
            clave: {
              id: "pr-n2-mayordomia-5-a7-2",
              tipo: "corta",
              pregunta: "Pablo dice que el dinero no es malo. Entonces, ¿cuál es el peligro y cuál es el remedio?",
              ideas: [
                { id: "amor", peso: 50, texto: "El peligro es el amor al dinero, raíz de todos los males.", formas: ["amor al dinero", "amor por el dinero", "amar el dinero", "aman el dinero", "raiz de todos", "raiz de los males"] },
                { id: "contento", peso: 50, texto: "El remedio es el contentamiento: estar satisfecho en Cristo, tengamos mucho o poco.", formas: ["contentamiento", "satisfech*", "contento*", "mucho o poco"] },
              ],
              modelo: "El peligro no es el dinero, sino el amor al dinero, que es raíz de todos los males. El remedio es el contentamiento: estar satisfecho en Cristo, tengamos mucho o poco.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. Finanzas sanas: trabajo, deudas, ahorro y presupuesto
    "n2-mayordomia-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué sufren muchas familias con el dinero?", reverso: "No tanto por ganar poco, sino por no administrar bien lo que ganan.", apoyo: "Muchas familias sufren no tanto por ganar poco, sino por no administrar bien lo que ganan." },
              { frente: "¿Para qué trabaja el creyente?", reverso: "Para proveer para los suyos, no ser carga para otros y tener qué compartir.", apoyo: "El creyente trabaja para proveer para los suyos" },
              { frente: "¿Qué advierte la Biblia sobre tomar prestado?", reverso: "Que «el que toma prestado es siervo del que presta».", apoyo: "advierte que «el que toma prestado es siervo del que presta»" },
              { frente: "¿Qué enseña la hormiga que prepara su comida en el verano?", reverso: "Que el sabio ahorra para el tiempo difícil.", apoyo: "el sabio ahorra para el tiempo difícil" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿La Biblia prohíbe todo préstamo?", reverso: "No, pero advierte sobre las deudas: conviene evitar las deudas para consumir.", apoyo: "La Biblia no prohíbe todo préstamo" },
              { frente: "¿Planear es falta de fe?", reverso: "No: es buena administración, como calcular los gastos antes de edificar.", apoyo: "planear no es falta de fe, es buena administración" },
              { frente: "¿Qué va primero en un presupuesto con prioridades bíblicas?", reverso: "Dar a Dios: el diezmo y las ofrendas.", apoyo: "Primero, dar a Dios: el diezmo y las ofrendas." },
              { frente: "¿Qué es el dinero manejado con honradez?", reverso: "Un testimonio.", apoyo: "El dinero manejado con honradez es un testimonio." },
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
            consigna: "Une cada tema con lo que enseña la Biblia sobre él.",
            pares: [
              ["El trabajo", "Proveer para los suyos y no ser carga para otros"],
              ["Las deudas", "Evitar las que son para consumir"],
              ["El ahorro", "Prepararse para el tiempo difícil"],
              ["Los planes", "Calcular los gastos antes de edificar"],
            ],
            apoyo: "La Biblia, y en especial Proverbios, tiene mucha sabiduría práctica para el dinero.",
            ref: "2 Tesalonicenses 3:10-12; Proverbios 22:7; Proverbios 6:6-8; Lucas 14:28",
            explica: "La Biblia enseña a trabajar para proveer, a evitar las deudas para consumir, a ahorrar para el tiempo difícil y a planear antes de gastar.",
          },
          {
            consigna: "Une cada imagen de la Biblia con lo que enseña.",
            pares: [
              ["La hormiga que prepara su comida en el verano", "El sabio ahorra para el tiempo difícil"],
              ["El que se sienta a calcular antes de edificar", "Planear es buena administración"],
              ["El que toma prestado", "Queda como siervo del que presta"],
              ["El que no quiere trabajar", "Tampoco debe comer"],
            ],
            apoyo: "La hormiga prepara en el verano su comida: el sabio ahorra para el tiempo difícil.",
            ref: "Proverbios 6:6-8; Lucas 14:28; Proverbios 22:7; 2 Tesalonicenses 3:10",
            explica: "La hormiga enseña a ahorrar, el que calcula los gastos enseña a planear, el que toma prestado queda como siervo, y el que no quiere trabajar tampoco coma.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena las prioridades de un presupuesto sencillo, de la primera a la última.",
            pasos: [
              "Dar a Dios: el diezmo y las ofrendas",
              "Ahorrar una parte para las emergencias",
              "Pagar las necesidades: vivienda, comida, servicios, transporte y salud",
              "Pagar las deudas a tiempo",
              "Lo que sobra, para lo que se desea",
            ],
            apoyo: "primero Dios, después el ahorro, las necesidades y las deudas, sin gastar más de lo que entra",
            explica: "Un presupuesto con prioridades bíblicas pone primero a Dios, después el ahorro, las necesidades y las deudas; lo que sobra va para lo que se desea.",
          },
          {
            consigna: "Ordena cómo se reparte el dinero que entra en el mes, del primer paso al último.",
            pasos: [
              "Apartar el diezmo y las ofrendas",
              "Ahorrar una parte, aunque sea pequeña",
              "Pagar la renta, la comida y el transporte",
              "Pagar a tiempo lo que se debe",
              "Usar lo que queda para lo que se desea",
            ],
            apoyo: "Primero, dar a Dios: el diezmo y las ofrendas.",
            explica: "Primero se da a Dios; después se ahorra, se pagan las necesidades y las deudas, y lo que sobra va a los deseos, sin gastar más de lo que entra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu esposa te dice: Ya cobramos y otra vez se nos fue todo el dinero; no sé ni en qué lo gastamos.",
            pregunta: "¿Qué le propones?",
            opciones: [
              { texto: "No pasa nada: mientras haya tarjeta de crédito, podemos seguir comprando igual.", explica: "Conviene evitar las deudas para consumir y no gastar más de lo que entra." },
              { texto: "Dejemos de dar a Dios por un tiempo, hasta que nos sobre algo al final del mes.", explica: "En un presupuesto con prioridades bíblicas, lo primero es dar a Dios: el diezmo y las ofrendas." },
              { texto: "Pidamos un préstamo grande y así ya no tenemos que pensar en el dinero este año.", explica: "El que toma prestado es siervo del que presta: conviene evitar las deudas para consumir." },
              { texto: "Hagamos un presupuesto: primero Dios, luego ahorro, necesidades y deudas.", bien: true, explica: "Un presupuesto le dice al dinero adónde ir, en vez de preguntarte después adónde se fue." },
            ],
            apoyo: "Un presupuesto le dice al dinero adónde ir, en vez de preguntarte después adónde se fue.",
            explica: "Muchas veces el problema no es ganar poco, sino no administrar bien lo que se gana: un presupuesto con prioridades ayuda.",
          },
          {
            caso: "Un amigo de la iglesia te dice: Gano bien, pero nunca me alcanza; gasto en lo que quiero y después veo qué pago.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Gana más: el problema siempre es el sueldo, no la forma en que se gasta el dinero.", explica: "Muchas familias sufren no tanto por ganar poco, sino por no administrar bien lo que ganan." },
              { texto: "Haz un presupuesto: Dios, ahorro, necesidades y deudas; los gustos, al final.", bien: true, explica: "Lo que sobra va para lo que se desea, sin gastar más de lo que entra." },
              { texto: "Sigue así, pero paga solo las deudas que te reclamen; las demás pueden esperar.", explica: "Hay que pagar lo que se debe con puntualidad y no prometer lo que no se puede cumplir." },
              { texto: "Usa el ahorro de las emergencias para tus gustos, que para eso está el dinero.", explica: "El ahorro es para las emergencias, para el tiempo difícil." },
            ],
            apoyo: "Lo que sobra, para lo que se desea, sin gastar más de lo que entra.",
            explica: "Un presupuesto con prioridades bíblicas pone los deseos al final: primero Dios, después el ahorro, las necesidades y las deudas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la honradez con el dinero está equivocada. Tócala.",
            frases: [
              "La mayordomía incluye pagar los impuestos.",
              "En los negocios no se debe engañar.",
              "Salir fiador de cualquiera, sin pensarlo, es una muestra de amor.",
              "El dinero manejado con honradez es un testimonio.",
            ],
            malo: 2,
            correccion: "La Biblia enseña a no salir fiador a la ligera.",
            apoyo: "no salir fiador a la ligera",
            ref: "Proverbios 22:26-27",
            explica: "La honradez con el dinero incluye pagar los impuestos, no engañar en los negocios y no salir fiador a la ligera.",
          },
          {
            consigna: "Una de estas frases sobre ahorrar y planear está equivocada. Tócala.",
            frases: [
              "El sabio ahorra para el tiempo difícil.",
              "Planear los gastos es falta de fe.",
              "Conviene ahorrar una parte para las emergencias.",
              "Antes de edificar, hay que calcular los gastos.",
            ],
            malo: 1,
            correccion: "Planear no es falta de fe: es buena administración.",
            apoyo: "planear no es falta de fe, es buena administración",
            ref: "Lucas 14:28; Proverbios 6:6-8",
            explica: "La hormiga y el que calcula los gastos enseñan que prever es sabio: planear es buena administración.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Por eso conviene evitar las deudas para consumir, pagar lo que se debe con puntualidad y no prometer lo que no se puede cumplir",
            ref: "Proverbios 22:7; Romanos 13:8",
            clave: {
              id: "pr-n2-mayordomia-6-a6-1",
              tipo: "corta",
              pregunta: "¿Qué enseña la Biblia sobre las deudas?",
              ideas: [
                { id: "siervo", peso: 50, texto: "No prohíbe todo préstamo, pero advierte que el que toma prestado es siervo del que presta.", formas: ["siervo del que presta", "es siervo", "esclavo", "no prohibe todo"] },
                { id: "evitar", peso: 50, texto: "Conviene evitar las deudas para consumir y pagar a tiempo lo que se debe.", formas: ["evit* deudas", "para consumir", "pag* a tiempo", "puntual*", "pag* lo que se debe", "no debais"] },
              ],
              modelo: "La Biblia no prohíbe todo préstamo, pero advierte que el que toma prestado es siervo del que presta. Por eso conviene evitar las deudas para consumir y pagar a tiempo lo que se debe.",
            },
          },
          {
            apoyo: "planear no es falta de fe, es buena administración",
            ref: "Proverbios 6:6-8; Lucas 14:28",
            clave: {
              id: "pr-n2-mayordomia-6-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué ahorrar y planear no es falta de fe?",
              ideas: [
                { id: "hormiga", peso: 50, texto: "Como la hormiga, el sabio ahorra para el tiempo difícil.", formas: ["hormiga", "tiempo dificil", "emergencias", "sabio ahorra"] },
                { id: "calcula", peso: 50, texto: "Jesús habló del que calcula los gastos antes de edificar: planear es buena administración.", formas: ["calcul*", "buena administracion", "antes de edificar", "edificar"] },
              ],
              modelo: "Porque la Biblia lo enseña: la hormiga prepara su comida en el verano y el sabio ahorra para el tiempo difícil. Jesús habló del que calcula los gastos antes de edificar: planear es buena administración.",
            },
          },
        ],
      },
    ],
  },
};
