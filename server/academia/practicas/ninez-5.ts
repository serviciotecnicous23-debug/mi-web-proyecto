/**
 * Las prácticas de la materia `ninez-5` (especialidad Niñez): organizar el ministerio infantil. Hechas solo con lo que
 * dice cada lección (server/academia/contenido/ninez-5.ts), con la guía de docs/academia-practicas.md.
 *
 * Es una materia práctica: la misión, la visión y los valores; el equipo de voluntarios; los grupos por edad, las salas y
 * el horario; el currículo y el calendario; la Escuela Bíblica de Vacaciones y el seguimiento; el presupuesto y la
 * evaluación. En lo que toca a la seguridad de los niños, las buenas opciones son las normas de la lección (al menos dos
 * adultos seleccionados por sala, la selección y la capacitación antes de servir, el registro, la entrega de cada niño a
 * quien lo trajo, el permiso de los padres y nunca presionar a un niño para que tome una decisión). La lección no da un
 * plazo para reportar un abuso, así que ninguna actividad lo pide.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_NINEZ_5: PracticasMateria = {
  materia: "ninez-5",
  mision: {
    titulo: "Un ministerio de niños en orden",
    intro:
      "Tu pastor te pidió organizar el ministerio de niños de tu iglesia. Hoy todo depende de una sola hermana, los niños de todas las edades están juntos en un salón, cada maestro enseña lo que se le ocurre y nadie sabe decir para qué existe el ministerio. Vas a escribir su misión, formar el equipo, ordenar los grupos, las salas y el horario, elegir el currículo y armar el calendario del año, abrir una puerta al barrio con la Escuela Bíblica de Vacaciones y, al final, armar el presupuesto y evaluar con tu equipo. Repasa las seis lecciones para tener listo cada paso.",
    cierre:
      "Ya sabes organizar un ministerio de niños: con una misión escrita que recibe de la Palabra, un equipo que sirve según sus dones, grupos y salas seguras para cada edad, un currículo que recorre toda la Biblia, puertas abiertas al barrio con seguimiento, y un presupuesto y una evaluación hechos con fidelidad. El orden no es frialdad: es paz para los niños, los maestros y los padres.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Misión, visión y valores
    "ninez-5-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dice la misión de un ministerio?", reverso: "Para qué existe el ministerio.", apoyo: "La misión: para qué existe el ministerio" },
              { frente: "¿Qué describe la visión de un ministerio?", reverso: "Lo que se quiere ver en unos años.", apoyo: "La visión: lo que se quiere ver en unos años" },
              { frente: "¿Qué dicen los valores de un ministerio?", reverso: "Cómo se trabaja.", apoyo: "Los valores: cómo se trabaja" },
              { frente: "Según la lección, ¿qué es lo que se puede seguir?", reverso: "Lo que está escrito con claridad.", apoyo: "Lo que está escrito con claridad se puede seguir" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De dónde recibe su propósito el ministerio de niños?", reverso: "De la Palabra: no lo inventa.", apoyo: "El ministerio de niños no inventa su propósito: lo recibe de la Palabra" },
              { frente: "¿A quiénes mandó reunir Moisés para que oyeran y aprendieran?", reverso: "A todo el pueblo: varones, mujeres y niños.", apoyo: "Moisés mandó reunir a todo el pueblo, «varones y mujeres y niños», para que oyeran y aprendieran" },
              { frente: "¿Quiénes son los primeros maestros de los niños?", reverso: "Sus padres.", apoyo: "porque los padres son los primeros maestros" },
              { frente: "¿Con quién conversa el líder antes de escribir la misión?", reverso: "Con el pastor.", apoyo: "Antes de escribirla, conversa con el pastor" },
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
            consigna: "¿Es la misión, la visión o un valor del ministerio? Lleva cada frase a su grupo.",
            grupos: ["La misión: para qué existe", "La visión: lo que se quiere ver", "Un valor: cómo se trabaja"],
            frases: [
              { texto: "Ayudar a cada niño a conocer a Jesús, amarlo y seguirlo", grupo: 0 },
              { texto: "Existimos para que cada niño, con su familia, siga a Jesús", grupo: 0 },
              { texto: "Que cada niño llegue a los doce años sabiendo orar", grupo: 1 },
              { texto: "Que a los doce años cada niño conozca la historia de la Biblia", grupo: 1 },
              { texto: "Que cada niño de doce años ya sirva en la iglesia", grupo: 1 },
              { texto: "La Palabra en el centro", grupo: 2 },
              { texto: "La seguridad de cada niño", grupo: 2 },
              { texto: "La excelencia sin orgullo", grupo: 2 },
            ],
            apoyo: "La visión: lo que se quiere ver en unos años; por ejemplo, que cada niño llegue a los doce años sabiendo orar, conociendo la historia de la Biblia y sirviendo en la iglesia",
            explica: "La misión dice para qué existe el ministerio: que cada niño conozca, ame y siga a Jesús, junto con su familia. La visión mira lo que se quiere ver en unos años, como niños de doce años que oran, conocen la Biblia y sirven. Los valores dicen cómo se trabaja.",
          },
          {
            consigna: "¿Habla de la misión, de la visión o de los valores? Lleva cada frase a su grupo.",
            grupos: ["La misión", "La visión", "Los valores"],
            frases: [
              { texto: "Para qué existe el ministerio", grupo: 0 },
              { texto: "Una sola frase que un niño puede entender", grupo: 0, explica: "Así se prueba la misión: ¿la entiende un niño?" },
              { texto: "Una frase que los maestros pueden repetir", grupo: 0, explica: "Así se prueba la misión: ¿la pueden repetir los maestros?" },
              { texto: "Lo que se quiere ver en unos años", grupo: 1 },
              { texto: "Cómo serán los niños al llegar a los doce años", grupo: 1 },
              { texto: "Cómo se trabaja en el ministerio", grupo: 2 },
              { texto: "Trabajar con excelencia, pero sin orgullo", grupo: 2, explica: "La excelencia sin orgullo es uno de los valores del ejemplo de la lección." },
              { texto: "La alianza con las familias y el amor por cada niño", grupo: 2 },
            ],
            apoyo: "Paso 4, probarla: ¿la entiende un niño? ¿La pueden repetir los maestros? Si no, se acorta",
            explica: "La misión dice para qué existe el ministerio, y se escribe en una frase que un niño entiende y los maestros repiten. La visión dice lo que se quiere ver en unos años. Los valores dicen cómo se trabaja, y se eligen de tres a cinco.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que dice cada parte del plan del ministerio.",
            texto: "La [[misión]] dice para qué existe el ministerio; la [[visión]], lo que se quiere ver en unos años; y los [[valores]], cómo se trabaja.",
            distractores: ["agenda", "historia", "juegos"],
            errores: {
              agenda: "Lo que dice para qué existe el ministerio es la misión.",
              historia: "Lo que se quiere ver en unos años es la visión.",
              juegos: "Lo que dice cómo se trabaja son los valores: la Palabra en el centro, la seguridad, la alianza con las familias.",
            },
            apoyo: "La misión: para qué existe el ministerio",
            explica: "La misión dice para qué existe el ministerio; la visión, lo que se quiere ver en unos años; y los valores, cómo se trabaja.",
          },
          {
            consigna: "Completa los ejemplos de la lección.",
            texto: "Que cada niño llegue a los doce años sabiendo orar es parte de la [[visión]]; la [[Palabra]] en el centro y la [[seguridad]] de cada niño son valores.",
            distractores: ["misión", "fama", "soledad"],
            errores: {
              "misión": "Lo que se quiere ver en unos años, como niños de doce años que saben orar, es la visión; la misión dice para qué existe el ministerio.",
              fama: "Uno de los valores es la Palabra en el centro.",
              soledad: "Uno de los valores es la seguridad de cada niño.",
            },
            apoyo: "Los valores: cómo se trabaja; por ejemplo, la Palabra en el centro, la seguridad de cada niño, la alianza con las familias y la excelencia sin orgullo",
            explica: "Que cada niño llegue a los doce años sabiendo orar es lo que se quiere ver en unos años: la visión. La Palabra en el centro y la seguridad de cada niño dicen cómo se trabaja: son valores.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para escribir la misión del ministerio de niños, del primero al último.",
            pasos: [
              "Orar y leer textos como Deuteronomio 6:6-7",
              "Preguntar qué queremos que sea un niño a los doce años",
              "Escribir la misión en una sola frase",
              "Probarla: ¿la entiende un niño? ¿La repiten los maestros?",
              "Presentarla al pastor, a los maestros y a los padres",
            ],
            apoyo: "Paso 6, presentarla: se la muestra al pastor, a los maestros y a los padres, y se la pone a la vista en las salas",
            explica: "Primero el equipo ora y lee la Palabra; después pregunta qué quiere que sea un niño a los doce años, escribe una frase y la prueba; al final la presenta al pastor, a los maestros y a los padres.",
          },
          {
            consigna: "El equipo de niños de tu iglesia va a escribir su misión. Ordena lo que hace, del primer paso al último.",
            pasos: [
              "Ora y lee Mateo 22:37-39 y Mateo 28:19-20",
              "Se pregunta cómo quiere que sea un niño a los doce años",
              "Escribe: ayudar a cada niño a conocer a Jesús, amarlo y seguirlo",
              "Ve que los maestros no la pueden repetir, y la acorta",
              "La pone a la vista en las salas",
            ],
            apoyo: "Paso 2, preguntar: ¿qué queremos que sea un niño cuando termine el ministerio, a los doce años?",
            explica: "El equipo ora y lee la Palabra, se pregunta qué quiere que sea un niño a los doce años, escribe la frase, la prueba (si los maestros no la pueden repetir, se acorta) y la pone a la vista en las salas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre cómo se escribe la misión tiene un error. Tócala.",
            frases: [
              "Antes de escribir la misión, el líder conversa con el pastor.",
              "La misión se escribe en una sola frase.",
              "Si los maestros no pueden repetir la misión, se alarga.",
              "La misión se pone a la vista en las salas.",
            ],
            malo: 2,
            correccion: "Si los maestros no pueden repetir la misión, se acorta.",
            apoyo: "Paso 4, probarla: ¿la entiende un niño? ¿La pueden repetir los maestros? Si no, se acorta",
            explica: "La misión se prueba: si un niño no la entiende o los maestros no la pueden repetir, se acorta.",
          },
          {
            consigna: "Una de estas frases sobre la misión del ministerio de niños tiene un error. Tócala.",
            frases: [
              "La misión del ministerio de niños está dentro de la visión de la iglesia.",
              "La misión del ministerio de niños está dentro de la declaración de fe.",
              "El ministerio de niños inventa su propósito con sus propias ideas.",
              "Para escribir la misión, el equipo ora y lee la Palabra.",
            ],
            malo: 2,
            correccion: "El ministerio de niños no inventa su propósito: lo recibe de la Palabra.",
            apoyo: "El ministerio de niños no inventa su propósito: lo recibe de la Palabra",
            ref: "Proverbios 29:18",
            explica: "El propósito del ministerio de niños no se inventa: se recibe de la Palabra, y la misión está dentro de la visión de la iglesia y de su declaración de fe.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un papá que trae a sus hijos cada domingo te dice: Yo los traigo a la iglesia; enseñarles de Dios ya es trabajo de ustedes.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la iglesia lo ayuda, pero los padres son los primeros maestros.", bien: true, explica: "La iglesia no reemplaza a los padres: los ayuda. Un ministerio que forma discípulos trabaja junto con ellos, porque los padres son los primeros maestros." },
              { texto: "Que tiene razón: con la hora del domingo, sus hijos ya aprenden lo necesario.", explica: "Una hora el domingo da fruto cuando en la casa se sigue enseñando durante la semana." },
              { texto: "Que deje a los niños más horas en la iglesia, y así él no tiene que enseñarles.", explica: "La iglesia no reemplaza a los padres: los ayuda, les da recursos para la casa y ora con ellos." },
              { texto: "Que en casa no les hable de Dios, para no confundirlos con lo que aprenden aquí.", explica: "Los padres son los primeros maestros: en la casa se sigue enseñando durante la semana." },
            ],
            apoyo: "La iglesia no reemplaza a los padres: los ayuda",
            explica: "La iglesia ayuda a los padres: les cuenta qué aprendieron sus hijos, les da recursos para la casa y ora con ellos. Una hora el domingo da fruto cuando en la casa se sigue enseñando durante la semana.",
          },
          {
            caso: "Una maestra de preescolares te dice: ¿Para qué contarles a los padres lo que enseñamos? Con la clase del domingo basta.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la clase da fruto si en casa se sigue enseñando en la semana.", bien: true, explica: "Una hora el domingo da fruto cuando en la casa se sigue enseñando durante la semana; por eso la iglesia les cuenta a los padres qué aprendieron sus hijos." },
              { texto: "Que tiene razón: lo que pasa en la clase no es asunto de los padres.", explica: "Un ministerio que forma discípulos trabaja junto con los padres, porque ellos son los primeros maestros." },
              { texto: "Que basta con que los niños se diviertan, aunque los padres no sepan nada.", explica: "Un ministerio que entretiene mide el éxito por lo que los niños se divirtieron; uno que forma discípulos trabaja junto con los padres." },
              { texto: "Que les cuente solo a los padres que sirven en el ministerio de niños.", explica: "La iglesia ayuda a todos los padres: les cuenta qué aprendieron sus hijos, les da recursos para la casa y ora con ellos." },
            ],
            apoyo: "Una hora el domingo da fruto cuando en la casa se sigue enseñando durante la semana",
            explica: "La iglesia no reemplaza a los padres: los ayuda. Les cuenta qué aprendieron sus hijos, les da recursos para la casa y ora con ellos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un ministerio que entretiene trabaja aparte de los padres. Uno que forma discípulos trabaja junto con ellos, porque los padres son los primeros maestros",
            clave: {
              id: "pr-ninez-5-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el ministerio de niños trabaja junto con las familias, y cómo las ayuda?",
              ideas: [
                { id: "padres", peso: 40, texto: "Porque los padres son los primeros maestros de sus hijos.", formas: ["primeros maestros", "primer maestro", "primeras maestras", "primeros en ensenar", "padres son (los|sus) primeros", "padres (ensenan|educan|forman) primero"] },
                { id: "ayuda", peso: 30, texto: "La iglesia no reemplaza a los padres: los ayuda, les cuenta qué aprendieron sus hijos, les da recursos para la casa y ora con ellos.", formas: ["no (reemplaza|reemplazan|sustituye|ocupa)", "(los|les) ayuda", "ayuda* a los padres", "recursos", "(les|le) cuenta", "contarles", "or* con (ellos|los)", "que aprendieron"] },
                { id: "casa", peso: 30, texto: "Una hora el domingo da fruto cuando en la casa se sigue enseñando durante la semana.", formas: ["en (la|su) casa", "en casa", "en el hogar", "durante la semana", "en la semana", "toda la semana"] },
              ],
              errores: [
                { id: "reemplaza", texto: "La iglesia no reemplaza a los padres: los ayuda.", formas: ["iglesia (reemplaza|sustituye) a los padres", "(reemplazar|sustituir|reemplaza|sustituye) a los padres"], anula: "ayuda" },
              ],
              modelo: "Porque los padres son los primeros maestros de sus hijos. La iglesia no los reemplaza: los ayuda, les cuenta qué aprendieron sus hijos, les da recursos y ora con ellos, porque una hora el domingo da fruto si en casa se sigue enseñando durante la semana.",
            },
          },
          {
            apoyo: "La iglesia no reemplaza a los padres: los ayuda. Les cuenta qué aprendieron sus hijos, les da recursos para la casa y ora con ellos",
            clave: {
              id: "pr-ninez-5-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que el ministerio de niños solo existe para cuidar a los niños mientras los adultos están en el culto. ¿Qué le explicas?",
              ideas: [
                { id: "discipulos", peso: 40, texto: "Un ministerio que forma discípulos no solo cuida a los niños: les enseña a conocer, amar y seguir a Jesús.", formas: ["discipul*", "conocer a jesus", "conozcan a jesus", "amar a jesus", "amen a jesus", "seguir a jesus", "sigan a jesus", "(conocer|conozcan) amar*", "(ensena|ensenar|ensenamos|ensenarles) a (conocer|amar|seguir)"] },
                { id: "padres", peso: 30, texto: "Trabaja junto con los padres, porque ellos son los primeros maestros.", formas: ["primeros maestros", "primer maestro", "junto con (los|sus) padres", "junto con (ellos|las familias)", "con los padres", "con las familias", "ayuda* a los padres"] },
                { id: "fruto", peso: 30, texto: "No mide el éxito solo por lo que los niños se divirtieron, sino también por lo que aprendieron y viven.", formas: ["lo que aprendieron", "lo que aprenden", "aprend* y viv*", "lo que viven", "no solo (divert*|entreten*|jugar|juegos|cuid*)", "mas que (divert*|entreten*|cuidar*)"] },
              ],
              errores: [
                { id: "cuidar", texto: "Un ministerio que forma discípulos no solo cuida a los niños: les enseña a conocer, amar y seguir a Jesús.", formas: ["solo (existe|sirve|esta) para (cuidar*|entretener*)", "(basta|alcanza) con (cuidar*|entretener*)", "lo importante es que se diviertan"], anula: "discipulos" },
              ],
              modelo: "Le explico que no solo cuida a los niños: forma discípulos que conocen, aman y siguen a Jesús. Trabaja junto con los padres, que son los primeros maestros, y mide el éxito también por lo que los niños aprendieron y viven.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El equipo del ministerio de niños
    "ninez-5-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué Jetro le dijo a Moisés que no podría hacerlo solo?", reverso: "Porque el trabajo era demasiado pesado para él.", apoyo: "porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo" },
              { frente: "Según el consejo de Jetro, ¿qué tiene un buen equipo?", reverso: "Personas de carácter y un orden claro.", apoyo: "El buen equipo tiene personas de carácter y un orden claro" },
              { frente: "¿Para qué dio Cristo pastores y maestros?", reverso: "«a fin de perfeccionar a los santos para la obra del ministerio».", apoyo: "Cristo dio pastores y maestros «a fin de perfeccionar a los santos para la obra del ministerio»" },
              { frente: "¿De quién dependen muchos ministerios de niños, hasta que se cansa?", reverso: "De una sola persona que hace todo.", apoyo: "Muchos ministerios de niños dependen de una sola persona que hace todo, hasta que se cansa" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué carácter le pidió Jetro a Moisés para sus ayudantes?", reverso: "«varones de virtud, temerosos de Dios, varones de verdad, que aborrezcan la avaricia».", apoyo: "le dijo cómo elegirlos: «varones de virtud, temerosos de Dios, varones de verdad, que aborrezcan la avaricia»" },
              { frente: "¿En qué orden le aconsejó Jetro poner a los ayudantes?", reverso: "Por grupos: jefes de millares, de centenas, de cincuenta y de diez.", apoyo: "le aconsejó elegir personas de carácter y organizarlas por grupos" },
              { frente: "¿Qué hace el líder de niños, en vez de hacerlo todo?", reverso: "Prepara a otros para servir.", apoyo: "El líder de niños no hace todo: prepara a otros para servir" },
              { frente: "Según Jetro, ¿qué le pasaría a Moisés si seguía atendiendo solo al pueblo?", reverso: "Desfallecería del todo, él y también el pueblo.", apoyo: "Desfallecerás del todo, tú, y también este pueblo que está contigo" },
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
            consigna: "Moisés atendía solo a todo el pueblo. ¿Por qué Jetro le dijo que no podría hacerlo solo? Toca las palabras que lo dicen.",
            texto: "porque [[el trabajo es demasiado pesado para ti]]; no podrás hacerlo tú solo",
            apoyo: "Jetro le dijo a Moisés que no podía hacerlo solo",
            ref: "Éxodo 18:17-18",
            explica: "Jetro le dijo a Moisés: «No está bien lo que haces», «porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo». Por eso el ministerio de niños forma un equipo y reparte el trabajo.",
          },
          {
            consigna: "Cristo dio pastores y maestros. ¿A quiénes preparan, y para qué? Toca las palabras que lo dicen.",
            texto: "a fin de perfeccionar a [[los santos]] para [[la obra del ministerio]]",
            apoyo: "El líder de niños no hace todo: prepara a otros para servir",
            ref: "Efesios 4:11-12",
            explica: "Cristo dio pastores y maestros «a fin de perfeccionar a los santos para la obra del ministerio». Así también, el líder de niños no hace todo: prepara a otros para servir.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada servicio del equipo con lo que hace.",
            pares: [
              ["El coordinador", "Dirige el ministerio y rinde cuentas al pastor"],
              ["Los líderes de grupo", "Guían a los maestros de su grupo de edad"],
              ["Los maestros", "Preparan y dan la clase"],
              ["Los ayudantes", "Acompañan a los maestros y cuidan a los niños"],
              ["La bienvenida y el registro", "Reciben a las familias y anotan la entrada y la salida"],
            ],
            apoyo: "El coordinador: dirige el ministerio, cuida al equipo y rinde cuentas al pastor",
            explica: "El coordinador dirige y rinde cuentas al pastor; los líderes de grupo guían a sus maestros; los maestros preparan y dan la clase; los ayudantes acompañan a los maestros y cuidan a los niños; y la bienvenida y el registro reciben a las familias y anotan la entrada y la salida.",
          },
          {
            consigna: "¿Qué servicio cumple cada hermano? Une cada uno con su servicio.",
            pares: [
              ["Rosa recibe a las familias y anota a qué hora sale cada niño", "La bienvenida y el registro"],
              ["Pedro prepara la clase de los escolares y la da", "Un maestro"],
              ["Ana guía a los maestros de la sala de preescolares", "Una líder de grupo"],
              ["Luis enseña a los niños a cantar y a adorar", "La alabanza"],
              ["Marta compra materiales, limpia las salas y ora por los maestros", "El apoyo y la oración"],
            ],
            apoyo: "Cada uno sirve con lo que Dios le dio",
            ref: "1 Pedro 4:10",
            explica: "Recibir a las familias y anotar la entrada y la salida es la bienvenida y el registro; preparar y dar la clase, el maestro; guiar a los maestros de un grupo, el líder de grupo; enseñar a cantar y a adorar, la alabanza; y comprar, limpiar y orar, el apoyo y la oración.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los servicios del equipo de niños: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "No todos en el equipo tienen que enseñar: hay quien recibe a las familias o prepara materiales.", verdad: true, explica: "El que no enseña puede recibir a las familias, preparar materiales u orar: cada uno sirve con lo que Dios le dio.", apoyo: "No todos tienen que enseñar: el que no enseña puede recibir a las familias, preparar materiales u orar", ref: "1 Pedro 4:10" },
              { texto: "En el equipo de niños, el coordinador rinde cuentas al pastor.", verdad: true, explica: "El coordinador dirige el ministerio, cuida al equipo y rinde cuentas al pastor.", apoyo: "El coordinador: dirige el ministerio, cuida al equipo y rinde cuentas al pastor" },
              { texto: "Un solo líder de grupo guía a los maestros de todas las edades.", verdad: false, explica: "Hay un líder de grupo por cada grupo de edad, que guía a sus maestros.", apoyo: "Los líderes de grupo: uno por cada grupo de edad, que guía a sus maestros" },
            ],
          },
          {
            consigna: "Sobre quiénes forman el equipo de niños: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Solo los maestros forman parte del equipo del ministerio de niños.", verdad: false, explica: "El equipo lo forman el coordinador, los líderes de grupo, los maestros, los ayudantes, la bienvenida y el registro, la alabanza, y el apoyo y la oración.", apoyo: "El ministerio de niños es un equipo: coordinador, líderes de grupo, maestros, ayudantes, bienvenida y registro, alabanza, apoyo y oración" },
              { texto: "Los ayudantes acompañan a los maestros, cuidan a los niños y preparan los materiales.", verdad: true, explica: "Así lo dice la lección sobre el servicio de los ayudantes.", apoyo: "Los ayudantes: acompañan a los maestros, cuidan a los niños y preparan los materiales" },
              { texto: "Orar por los niños y por los maestros no es un servicio del equipo.", verdad: false, explica: "El apoyo y la oración es uno de los servicios: compran materiales, limpian las salas y oran por los niños y los maestros.", apoyo: "El apoyo y la oración: compran materiales, limpian las salas y oran por los niños y los maestros" },
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
            consigna: "Ordena los pasos para sumar voluntarios, del primero al último.",
            pasos: [
              "Orar durante un mes por nuevos obreros",
              "Invitar en persona a cada hermano",
              "Seleccionarlo con los pasos de Protección de menores",
              "Capacitarlo y que sirva unas semanas junto a otro",
              "Evaluar juntos, cada cierto tiempo, cómo se siente",
            ],
            apoyo: "Los voluntarios se suman orando, invitando en persona, seleccionando, capacitando y acompañando, y se quedan cuando se los cuida",
            ref: "Mateo 9:37-38",
            explica: "Primero se ora por nuevos obreros; después se invita en persona, se selecciona a cada uno, se lo capacita y acompaña, y cada cierto tiempo se evalúa juntos cómo se siente.",
          },
          {
            consigna: "La sala de escolares necesita un maestro más. Ordena lo que hace la coordinadora, del primer paso al último.",
            pasos: [
              "Ora con el equipo por nuevos obreros",
              "Habla en persona con Juan y le dice por qué pensó en él",
              "Juan pasa por los pasos de la selección",
              "Juan aprende la misión y la política de protección",
              "Le agradece a Juan y lo invita a la reunión de maestros",
            ],
            apoyo: "Paso 3, invitar en persona: se habla con cada hermano, se le explica el servicio y se le dice por qué se pensó en él; un anuncio general casi nunca basta",
            explica: "La coordinadora ora e invita en persona; Juan pasa por la selección y la capacitación antes de servir, y después ella lo cuida: le agradece y lo invita a la reunión de maestros.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Paso 3, invitar en persona: se habla con cada hermano, se le explica el servicio y se le dice por qué se pensó en él; un anuncio general casi nunca basta",
            ref: "Mateo 9:37-38",
            situacion: "Eres la coordinadora del ministerio de niños. Este año se abre una sala nueva y faltan voluntarios para atenderla.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes que empezar a buscar quién sirva en la sala nueva.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Cuentas cuántos hacen falta, con turnos para que nadie sirva siempre.", valor: 2, explica: "Paso 1: contar lo que falta, cuántas personas se necesitan en cada sala, con turnos para que nadie sirva todos los domingos.", siguiente: "e2" },
                  { texto: "Pones un anuncio general en el boletín y esperas a ver quién se anota.", valor: 0, explica: "Un anuncio general casi nunca basta: se invita en persona.", siguiente: "e1b" },
                  { texto: "Empiezas a invitar hermanos sin saber todavía cuántos hacen falta.", valor: 1, explica: "Invitar está bien, pero primero se cuenta lo que falta: cuántas personas se necesitan, con turnos.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasan dos domingos y nadie se anota para la sala nueva.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Oras con el equipo y hablas en persona con cada hermano.", valor: 2, explica: "Jesús enseñó a empezar orando, y se invita en persona: se le explica el servicio y por qué se pensó en él.", siguiente: "e2" },
                  { texto: "Repites el mismo anuncio, ahora más fuerte, desde el púlpito.", valor: 0, explica: "Un anuncio general casi nunca basta: se habla con cada hermano.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya sabes que hacen falta seis personas, y el equipo oró durante un mes.",
                pregunta: "¿Cómo invitas a los hermanos?",
                opciones: [
                  { texto: "Hablas con cada uno, le explicas el servicio y por qué pensaste en él.", valor: 2, explica: "Así se invita en persona: se le explica el servicio y se le dice por qué se pensó en él." },
                  { texto: "Mandas un mensaje al grupo de la iglesia con la lista de todo lo que falta.", valor: 0, explica: "Un anuncio general casi nunca basta: se habla con cada hermano en persona." },
                  { texto: "Le pides al pastor que nombre él a seis personas, sin preguntarles.", valor: 0, explica: "Se invita en persona: se habla con cada hermano y se le explica el servicio." },
                ],
              },
              {
                id: "e3",
                narra: "Dos hermanos aceptan servir, y uno quiere empezar este mismo domingo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Primero pasa por la selección y la capacitación, y sirve junto a otro.", valor: 2, explica: "Cada uno pasa por los pasos de la selección y se capacita: aprende la misión, la política de protección y cómo se da una clase, y sirve unas semanas junto a otro." },
                  { texto: "Lo pones solo en la sala nueva desde este mismo domingo, porque falta gente.", valor: 0, explica: "Antes de servir, cada voluntario pasa por la selección y la capacitación, y sirve unas semanas junto a otro." },
                  { texto: "Lo capacitas para dar la clase y dejas la selección para más adelante.", valor: 0, explica: "La selección no se salta: cada uno pasa por los pasos de la selección que se estudian en Protección de menores." },
                ],
              },
            ],
          },
          {
            apoyo: "Un voluntario cuidado se queda; uno olvidado se va",
            ref: "1 Pedro 4:10",
            situacion: "Eres el líder del grupo de escolares. Tu equipo de maestras ya lleva un año sirviendo.",
            escenas: [
              {
                id: "e1",
                narra: "Notas que dos maestras sirven todos los domingos desde hace meses.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Armas turnos para que ninguna sirva todos los domingos.", valor: 2, explica: "Al cuidar a los voluntarios se respetan sus turnos y su descanso.", siguiente: "e2" },
                  { texto: "Las dejas así: mientras no se quejen, no hay nada que cambiar.", valor: 0, explica: "Un voluntario cuidado se queda; uno olvidado se va.", siguiente: "e1b" },
                  { texto: "Les das las gracias, pero dejas los turnos tal como están.", valor: 1, explica: "Agradecer es parte de cuidar, pero también se respetan sus turnos y su descanso.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Un domingo, una de ellas te dice que está agotada y que piensa dejar de servir.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le agradeces, respetas su descanso y ajustas los turnos.", valor: 2, explica: "Cuidar es agradecer y respetar los turnos y el descanso: un voluntario cuidado se queda.", siguiente: "e2" },
                  { texto: "Le dices que no puede irse, porque no hay quién la reemplace.", valor: 0, explica: "Un voluntario olvidado se va: se le agradece y se respetan sus turnos y su descanso.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Se acerca el final del trimestre.",
                pregunta: "¿Qué haces por el equipo?",
                opciones: [
                  { texto: "Les agradeces de una manera que anotaste en tu calendario.", valor: 2, explica: "La lección lo pide así: anota en tu calendario una manera de agradecer al equipo cada trimestre." },
                  { texto: "Nada especial: sirven al Señor y no necesitan que nadie les agradezca.", valor: 0, explica: "Un voluntario cuidado se queda; uno olvidado se va: al voluntario se le agradece." },
                  { texto: "Les agradeces una vez al año, cuando sobra tiempo en la reunión.", valor: 1, explica: "Agradecer está bien, pero la lección pide anotar una manera de agradecer al equipo cada trimestre." },
                ],
              },
              {
                id: "e3",
                narra: "Una maestra lleva dos años en la misma sala, y hace tiempo que nadie habla con ella.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Conversas con ella sobre cómo se siente y si quiere seguir ahí.", valor: 2, explica: "Paso 7: cada cierto tiempo se conversa sobre cómo se siente y si quiere seguir en el mismo servicio." },
                  { texto: "La cambias de servicio sin preguntarle nada, para que no se aburra.", valor: 0, explica: "Se evalúa juntos: se conversa con ella sobre cómo se siente y si quiere seguir en el mismo servicio." },
                  { texto: "Le mandas un mensaje para preguntarle si quiere seguir.", valor: 1, explica: "Preguntarle va bien, pero evaluar juntos es conversar con ella sobre cómo se siente y si quiere seguir." },
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
            apoyo: "Jetro le dijo a Moisés que no podía hacerlo solo, y le aconsejó elegir personas de carácter y organizarlas por grupos",
            ref: "Éxodo 18:17-18",
            clave: {
              id: "pr-ninez-5-2-a7-1",
              tipo: "corta",
              pregunta: "Con el consejo de Jetro, explica por qué el ministerio de niños necesita un equipo.",
              ideas: [
                { id: "solo", peso: 40, texto: "Jetro le dijo a Moisés que el trabajo era demasiado pesado y que no podría hacerlo solo.", formas: ["demasiado pesado", "muy pesado", "no (podra|podria|puede|podia|podemos|pueden|podian) (hacerlo|hacer|con|solo|sola)", "no (vas|va) a poder", "nadie (puede|podria|podra)", "desfallec*", "cans*", "agot*", "una sola persona"] },
                { id: "caracter", peso: 30, texto: "Le aconsejó elegir personas de carácter y organizarlas por grupos, con un orden claro.", formas: ["de caracter", "temeroso* de dios", "de virtud", "varones de verdad", "aborrezcan la avaricia", "por grupos", "orden claro", "organiz*", "eleg* (personas|ayudantes|hombres|lideres)", "busc* ayudantes", "ayudantes"] },
                { id: "otros", peso: 30, texto: "El líder de niños no hace todo: prepara a otros para servir y reparte el trabajo.", formas: ["prepar* a otros", "perfeccion* a los santos", "repart*", "deleg*", "formar un equipo", "forma un equipo", "trabajo en equipo", "capacit* a otros", "otros para servir", "que otros sirvan"] },
              ],
              modelo: "Jetro le dijo a Moisés que el trabajo era demasiado pesado y que no podría hacerlo solo. Le aconsejó elegir personas de carácter y organizarlas por grupos. Así el líder de niños no hace todo: prepara a otros para servir y reparte el trabajo.",
            },
          },
          {
            apoyo: "Muchos ministerios de niños dependen de una sola persona que hace todo, hasta que se cansa. La Biblia muestra otro camino: formar un equipo y repartir el trabajo",
            ref: "Efesios 4:11-12",
            clave: {
              id: "pr-ninez-5-2-a7-2",
              tipo: "corta",
              pregunta: "Una maestra de niños te dice: Prefiero hacerlo todo yo sola; así todo sale como yo quiero. ¿Qué le explicas?",
              ideas: [
                { id: "cansa", peso: 40, texto: "Quien hace todo solo se cansa: Jetro le dijo a Moisés que el trabajo era demasiado pesado y que no podría hacerlo solo.", formas: ["demasiado pesado", "muy pesado", "no (podra|podria|puede|podia|podemos|pueden|podian) (hacerlo|hacer|con|solo|sola)", "no (vas|va) a poder", "nadie (puede|podria|podra)", "desfallec*", "cans*", "agot*", "una sola persona"] },
                { id: "equipo", peso: 30, texto: "La Biblia muestra otro camino: formar un equipo y repartir el trabajo.", formas: ["formar un equipo", "forma un equipo", "un equipo", "en equipo", "repart*", "deleg*", "otro camino"] },
                { id: "otros", peso: 30, texto: "El líder no hace todo: prepara a otros para servir, y cada uno sirve según el don que recibió.", formas: ["prepar* a otros", "perfeccion* a los santos", "otros para servir", "que otros sirvan", "capacit* a otros", "ensen* a otros", "segun el don", "su don", "sus dones", "cada uno sirve"] },
              ],
              errores: [
                { id: "sola", texto: "Hacerlo todo solo no es el camino que muestra la Biblia: el líder forma un equipo y reparte el trabajo.", formas: ["(esta|es) bien (hacerlo|hacer) (todo|solo|sola)", "mejor (hacerlo|hacer) (todo|solo|sola)", "tiene razon"], anula: "equipo" },
              ],
              modelo: "Le explico que quien hace todo solo termina cansado: Jetro le dijo a Moisés que no podría hacerlo solo. La Biblia muestra otro camino: formar un equipo y repartir el trabajo. El líder no hace todo: prepara a otros para servir.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Los grupos, las salas y el horario
    "ninez-5-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es el orden en el ministerio de niños?", reverso: "No es frialdad: es paz para los niños, los maestros y los padres.", apoyo: "El orden en el ministerio de niños no es frialdad: es paz para los niños, para los maestros y para los padres" },
              { frente: "¿Cuántos adultos seleccionados hay, como mínimo, en cada sala?", reverso: "Al menos dos.", apoyo: "Siempre hay al menos dos adultos seleccionados por sala" },
              { frente: "¿Qué pasa con los grupos en una iglesia pequeña?", reverso: "Se unen, con actividades distintas para los mayores y los menores.", apoyo: "En una iglesia pequeña, los grupos se unen" },
              { frente: "¿Cuándo es hora de dividir un grupo?", reverso: "Cuando crece más que su sala o que sus maestros.", apoyo: "Cuando un grupo crece más que su sala o que sus maestros, es hora de dividirlo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo se prepara la sala de los niños, según Proverbios 24:3-4?", reverso: "Con sabiduría, como se edifica la casa.", apoyo: "También la sala de los niños se prepara con sabiduría" },
              { frente: "¿Cómo deben estar los enchufes de una sala segura?", reverso: "Cubiertos.", apoyo: "Con los enchufes cubiertos, sin objetos peligrosos ni cosas pequeñas al alcance de los bebés" },
              { frente: "Además del lugar para el registro, ¿qué tiene una sala segura a mano?", reverso: "Un botiquín.", apoyo: "Con un lugar para el registro a la entrada, y un botiquín" },
              { frente: "Si hay iglesia infantil durante el culto, ¿qué necesitan los maestros?", reverso: "Turnos, para no perderse siempre el culto de los adultos.", apoyo: "La iglesia infantil durante el culto: los niños tienen su propio culto, pero los maestros necesitan turnos para no perderse siempre el culto de los adultos" },
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
            consigna: "Une cada grupo con sus edades.",
            pares: [
              ["La cuna", "De 0 a 2 años"],
              ["Los preescolares", "De 3 a 5 años"],
              ["Los escolares", "De 6 a 9 años"],
              ["Los preadolescentes", "De 10 a 12 años"],
            ],
            apoyo: "Los escolares, de 6 a 9 años: historias, juegos de repaso, versículos de memoria y trabajos en grupo",
            explica: "La cuna va de 0 a 2 años; los preescolares, de 3 a 5; los escolares, de 6 a 9; y los preadolescentes, de 10 a 12.",
          },
          {
            consigna: "Une cada grupo con lo que mejor le sirve, según la lección.",
            pares: [
              ["La cuna", "Cuidado amoroso, canciones y oraciones sencillas"],
              ["Los preescolares", "Historias cortas, canciones con gestos y actividades con las manos"],
              ["Los escolares", "Juegos de repaso, versículos de memoria y trabajos en grupo"],
              ["Los preadolescentes", "Preguntas abiertas, conversación y servicio"],
            ],
            apoyo: "Lo importante es que cada niño reciba algo para su edad",
            explica: "Un niño de dos años y uno de once no aprenden de la misma manera: la cuna recibe cuidado amoroso y canciones; los preescolares, historias cortas y canciones con gestos; los escolares, juegos de repaso y versículos de memoria; y los preadolescentes, preguntas abiertas, conversación y servicio.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así es una sala segura y adecuada, o no? Lleva cada frase a su grupo.",
            grupos: ["Así es una sala segura", "Así no es una sala segura"],
            frases: [
              { texto: "Tiene una ventana en la puerta", grupo: 0 },
              { texto: "Los enchufes están cubiertos", grupo: 0 },
              { texto: "Los muebles están a la altura de los niños", grupo: 0 },
              { texto: "El plan de salida está a la vista", grupo: 0 },
              { texto: "Hay cosas pequeñas al alcance de los bebés", grupo: 1 },
              { texto: "La puerta no tiene ninguna ventana", grupo: 1 },
              { texto: "Queda lejos del baño y de la salida de emergencia", grupo: 1 },
              { texto: "Un solo adulto atiende a todo el grupo", grupo: 1, explica: "Siempre hay al menos dos adultos seleccionados por sala." },
            ],
            apoyo: "Con los enchufes cubiertos, sin objetos peligrosos ni cosas pequeñas al alcance de los bebés",
            ref: "Proverbios 24:3-4",
            explica: "Una sala segura está limpia, con buena luz y una ventana en la puerta; tiene los enchufes cubiertos y muebles a la altura de los niños; queda cerca de un baño y de una salida de emergencia, y siempre tiene al menos dos adultos seleccionados.",
          },
          {
            consigna: "Revisas la sala de la cuna antes del domingo. ¿Está lista o hay que cambiar algo? Lleva cada frase a su grupo.",
            grupos: ["La sala está lista", "Hay que cambiar algo"],
            frases: [
              { texto: "La sala está limpia y tiene buena luz", grupo: 0 },
              { texto: "Hay un botiquín a mano", grupo: 0 },
              { texto: "Hay un lugar para el registro a la entrada", grupo: 0 },
              { texto: "Los muebles son del tamaño de los niños", grupo: 0 },
              { texto: "Hay monedas y botones al alcance de los bebés", grupo: 1 },
              { texto: "Un enchufe está sin tapa, cerca del piso", grupo: 1 },
              { texto: "El plan de salida no está a la vista", grupo: 1 },
              { texto: "Hay tijeras sobre la mesa de los bebés", grupo: 1 },
            ],
            apoyo: "Cerca de un baño y de una salida de emergencia, con el plan de salida a la vista",
            explica: "La sala de la cuna está lista si está limpia, con buena luz, un botiquín, un lugar para el registro y muebles a la altura de los niños; hay que cambiar lo que no es seguro: cosas pequeñas u objetos peligrosos al alcance de los bebés, enchufes sin cubrir o un plan de salida que no se ve.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cuántos adultos hay en cada sala.",
            texto: "Siempre hay al menos [[dos]] adultos seleccionados por sala, y más adultos cuanto más [[pequeños]] son los niños.",
            distractores: ["seis", "grandes"],
            errores: {
              seis: "La lección pide al menos dos adultos seleccionados por sala.",
              grandes: "Hacen falta más adultos cuanto más pequeños son los niños, no cuanto más grandes.",
            },
            apoyo: "Siempre hay al menos dos adultos seleccionados por sala",
            explica: "Siempre hay al menos dos adultos seleccionados por sala, y más adultos cuanto más pequeños son los niños.",
          },
          {
            consigna: "Completa la guía que usan muchas iglesias.",
            texto: "Como guía, muchas iglesias ponen un adulto por cada tres o cuatro [[bebés]] y uno por cada diez o doce [[escolares]], y [[averiguan]] lo que recomienda su concilio.",
            distractores: ["jóvenes", "adultos", "olvidan"],
            errores: {
              "jóvenes": "La guía pone un adulto por cada tres o cuatro bebés: cuanto más pequeños son los niños, más adultos.",
              adultos: "La guía pone un adulto por cada diez o doce escolares.",
              olvidan: "La lección pide averiguar lo que recomiendan tu concilio o tu aseguradora.",
            },
            apoyo: "Averigua lo que recomiendan tu concilio o tu aseguradora",
            explica: "Muchas iglesias usan como guía más adultos cuanto más pequeños son los niños: un adulto por cada tres o cuatro bebés, uno por cada seis u ocho preescolares y uno por cada diez o doce escolares. Y se averigua lo que recomiendan el concilio o la aseguradora.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "En una iglesia pequeña, los grupos se unen",
            ref: "1 Corintios 14:40",
            titulo: "Una iglesia con 25 niños",
            relato: [
              "Eres el nuevo coordinador del ministerio de niños de una iglesia pequeña. Hasta ahora, todos los niños estaban juntos en un salón, desde los bebés hasta los de doce años.",
              "Al contarlos, encuentras 4 bebés, 8 niños de 3 a 5 años y 13 de 6 a 12.",
              "El pastor te pide un plan para empezar el mes que viene.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo formas los grupos?",
                opciones: [
                  { texto: "Tres grupos: la cuna, los de 3 a 5 y los de 6 a 12.", bien: true, explica: "En una iglesia pequeña, los grupos se unen: la cuna, los de 3 a 5 y los de 6 a 12, con actividades distintas para los mayores y los menores." },
                  { texto: "Un solo grupo con todos, como hasta ahora, porque son pocos.", explica: "Un niño de dos años y uno de once no aprenden de la misma manera: cada niño debe recibir algo para su edad." },
                  { texto: "Cuatro grupos, uno por cada edad de la lista, aunque sean pocos.", explica: "En una iglesia pequeña, los grupos se unen, como en el ejemplo: la cuna, los de 3 a 5 y los de 6 a 12." },
                ],
                apoyo: "Paso 2, formar los grupos: tres grupos, la cuna, los de 3 a 5 y los de 6 a 12",
                explica: "En una iglesia pequeña los grupos se unen, y lo importante es que cada niño reciba algo para su edad.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuántos voluntarios necesitas para atender las tres salas?",
                opciones: [
                  { texto: "Doce: dos por sala son seis, y con dos turnos, doce.", bien: true, explica: "Dos por sala son seis cada domingo; con dos turnos que se alternan, hacen falta doce voluntarios." },
                  { texto: "Tres: con un adulto en cada sala ya es suficiente.", explica: "Siempre hay al menos dos adultos seleccionados por sala." },
                  { texto: "Seis: dos por sala, y que sirvan ellos todos los domingos.", explica: "Con dos turnos que se alternan, nadie sirve todos los domingos: hacen falta doce." },
                ],
                apoyo: "Paso 3, calcular los adultos: dos por sala son seis cada domingo; con dos turnos que se alternan, hacen falta doce voluntarios",
                explica: "Siempre hay al menos dos adultos seleccionados por sala, y los turnos hacen que nadie sirva todos los domingos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué horario propones, para que aprendan a adorar con la iglesia y reciban algo para su edad?",
                opciones: [
                  { texto: "Que empiecen con sus padres en la alabanza y luego pasen a sus salas.", bien: true, explica: "Así aprenden a adorar con la iglesia y reciben una enseñanza para su edad." },
                  { texto: "Que estén en sus salas desde que llegan hasta el final del culto de los adultos.", explica: "Así no aprenden a adorar con la iglesia: muchas iglesias combinan, y los niños empiezan el culto con sus padres." },
                  { texto: "Que se queden todo el culto con los adultos, sin ninguna clase para su edad.", explica: "Así no reciben una enseñanza para su edad: después de la alabanza pasan a sus salas." },
                ],
                apoyo: "Paso 5, elegir el horario: los niños empiezan el culto con sus padres y pasan a sus salas después de la alabanza",
                explica: "Muchas iglesias combinan: los niños empiezan el culto con sus padres, en la alabanza, y después pasan a sus salas.",
              },
              {
                tipo: "explica",
                apoyo: "Paso 6, avisar a las familias: se les explica cómo funcionan el registro, los grupos y el horario",
                clave: {
                  id: "pr-ninez-5-3-a5-1",
                  tipo: "corta",
                  pregunta: "Antes del primer domingo, ¿qué harás con las salas y con las familias?",
                  ideas: [
                    { id: "salas", peso: 50, texto: "Revisar cada sala con la lista de una sala segura.", formas: ["revis* (cada|las|la) (sala|salas)", "revis* cada una", "sala segura", "salas seguras", "enchuf*", "ventana*", "botiquin", "salida de emergencia", "plan de salida"] },
                    { id: "familias", peso: 50, texto: "Avisar a las familias y explicarles cómo funcionan el registro, los grupos y el horario.", formas: ["avis* a (las|los) (familias|padres)", "explic* a (las|los) (familias|padres)", "(les|le) explic*", "(contar|cuento|contare|informar|informo|informare|avisar|avisare|reunire|reunir) a (las|los) (familias|padres)", "(familias|padres) (como|sobre|del|el) (registro|horario|grupos)", "como funciona*"] },
                  ],
                  modelo: "Revisaré cada sala con la lista de una sala segura: la ventana en la puerta, los enchufes cubiertos y la salida de emergencia. Y avisaré a las familias: les explicaré cómo funcionan el registro, los grupos y el horario.",
                },
              },
            ],
          },
          {
            apoyo: "Cuando un grupo crece más que su sala o que sus maestros, es hora de dividirlo. Planea la división antes de que la sala se llene",
            ref: "1 Corintios 14:33",
            titulo: "La sala de los de 6 a 12 se llena",
            relato: [
              "Tu iglesia creció. Tiene tres grupos: la cuna, los de 3 a 5 y los de 6 a 12, y la sala de los de 6 a 12 casi ya no alcanza.",
              "En ese grupo hay niños de seis años junto a otros de once y doce, y los maestros dicen que es difícil enseñarles a todos lo mismo.",
              "Tienes una sala libre y dos maestros nuevos que ya pasaron por la selección.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con el grupo de 6 a 12?",
                opciones: [
                  { texto: "Planeo dividirlo ahora, antes de que la sala se llene.", bien: true, explica: "Cuando un grupo crece más que su sala o que sus maestros, es hora de dividirlo, y la división se planea antes de que la sala se llene." },
                  { texto: "Espero a que ya no quepan para pensar qué hacer.", explica: "La división se planea antes de que la sala se llene." },
                  { texto: "Dejo de recibir niños nuevos, para que la sala alcance.", explica: "Cuando un grupo crece más que su sala, es hora de dividirlo." },
                ],
                apoyo: "Planea la división antes de que la sala se llene",
                explica: "Cuando un grupo crece más que su sala o que sus maestros, es hora de dividirlo, y la división se planea antes de que la sala se llene.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo divides el grupo?",
                opciones: [
                  { texto: "Escolares de 6 a 9 y preadolescentes de 10 a 12.", bien: true, explica: "Los grupos son por edad: los escolares, de 6 a 9 años, y los preadolescentes, de 10 a 12." },
                  { texto: "Los de 6 y 7 en un grupo, y los de 8 a 12 en el otro.", explica: "Los grupos de la lección son los escolares, de 6 a 9 años, y los preadolescentes, de 10 a 12." },
                  { texto: "Varones en una sala y niñas en otra, sin mirar la edad.", explica: "El ministerio de niños se organiza en grupos por edad." },
                ],
                apoyo: "Los preadolescentes, de 10 a 12 años: preguntas abiertas, conversación y servicio",
                explica: "Los grupos son por edad: los escolares van de 6 a 9 años, y los preadolescentes, de 10 a 12.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué preparas para los preadolescentes en su sala nueva?",
                opciones: [
                  { texto: "Preguntas abiertas, conversación y servicio.", bien: true, explica: "A los preadolescentes, de 10 a 12 años, les sirven las preguntas abiertas, la conversación y el servicio." },
                  { texto: "Canciones con gestos y actividades con las manos.", explica: "Eso es para los preescolares, de 3 a 5 años." },
                  { texto: "Cuidado amoroso, canciones y oraciones sencillas.", explica: "Eso es para la cuna, de 0 a 2 años." },
                ],
                apoyo: "Lo importante es que cada niño reciba algo para su edad",
                explica: "Cada niño recibe algo para su edad: a los preadolescentes les sirven las preguntas abiertas, la conversación y el servicio.",
              },
              {
                tipo: "explica",
                apoyo: "Siempre hay al menos dos adultos seleccionados por sala",
                clave: {
                  id: "pr-ninez-5-3-a5-2",
                  tipo: "corta",
                  pregunta: "¿Cuántos adultos pondrás en la sala nueva, y qué revisarás en ella antes de abrirla?",
                  ideas: [
                    { id: "adultos", peso: 50, texto: "Al menos dos adultos seleccionados por sala.", formas: ["(dos|2) adultos", "al menos (dos|2)", "(dos|2) (maestros|maestras|personas|voluntarios|ayudantes)", "minimo (dos|2)", "(dos|2) seleccionados"] },
                    { id: "revisar", peso: 50, texto: "Revisarla con la lista de una sala segura: ventana en la puerta, enchufes cubiertos, salida de emergencia, registro y botiquín.", formas: ["ventana*", "enchuf*", "salida de emergencia", "plan de salida", "botiquin", "el registro", "bano", "buena luz", "limpi*", "a la altura", "sala segura", "objetos peligrosos", "cosas pequenas"] },
                  ],
                  modelo: "Pondré al menos dos adultos seleccionados en la sala nueva. Antes de abrirla, la revisaré con la lista de una sala segura: limpia, con una ventana en la puerta, los enchufes cubiertos, la salida de emergencia cerca y un botiquín.",
                },
              },
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
            caso: "El pastor te dice: Quiero que los niños tengan su propio culto mientras los adultos están en el templo.",
            pregunta: "¿Qué cuidado le recomiendas?",
            opciones: [
              { texto: "Armar turnos, para que los maestros no se pierdan siempre el culto.", bien: true, explica: "En la iglesia infantil durante el culto, los niños tienen su propio culto, pero los maestros necesitan turnos para no perderse siempre el culto de los adultos." },
              { texto: "Que los mismos maestros lo den cada domingo del año, sin cambiar.", explica: "Así los maestros se pierden siempre el culto de los adultos: necesitan turnos." },
              { texto: "Que los maestros no necesitan el culto, porque ya oyeron muchos sermones.", explica: "Los maestros necesitan turnos para no perderse siempre el culto de los adultos." },
              { texto: "Que mejor no, porque los niños solo pueden aprender junto a los adultos.", explica: "La iglesia infantil durante el culto es una de las maneras comunes: los niños tienen su propio culto." },
            ],
            apoyo: "La iglesia infantil durante el culto: los niños tienen su propio culto, pero los maestros necesitan turnos para no perderse siempre el culto de los adultos",
            explica: "Cada horario tiene su cuidado: en la iglesia infantil durante el culto, los maestros necesitan turnos para no perderse siempre el culto de los adultos.",
          },
          {
            caso: "Un maestro te dice: Propongo una reunión de niños entre semana; así tendríamos más tiempo con ellos.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que da más tiempo, pero pide más compromiso a maestros y familias.", bien: true, explica: "Una reunión entre semana da más tiempo, pero pide más compromiso de los maestros y de las familias." },
              { texto: "Que es la única manera bíblica de enseñar a los niños de la iglesia.", explica: "Es una de las tres maneras comunes, junto con la escuela dominical y la iglesia infantil; y muchas iglesias combinan." },
              { texto: "Que con esa reunión ya no hace falta enseñar a los niños el domingo.", explica: "La reunión entre semana es una de las maneras comunes, y muchas iglesias combinan las maneras." },
              { texto: "Que no conviene, porque no les pide nada más a los maestros ni a las familias.", explica: "Al contrario: da más tiempo, pero pide más compromiso de los maestros y de las familias." },
            ],
            apoyo: "Una reunión entre semana: da más tiempo, pero pide más compromiso de los maestros y de las familias",
            explica: "Cada horario tiene su ventaja y su cuidado: la reunión entre semana da más tiempo, pero pide más compromiso de los maestros y de las familias.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "el horario se elige entre la escuela dominical, la iglesia infantil durante el culto o una reunión entre semana, o se combinan",
            ref: "1 Corintios 14:40",
            clave: {
              id: "pr-ninez-5-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué tres maneras comunes de organizar el horario presenta la lección, y qué ventaja o cuidado tiene cada una?",
              ideas: [
                { id: "dominical", peso: 34, texto: "La escuela dominical antes del culto: niños y adultos estudian a la misma hora, y los maestros pueden estar en el culto.", formas: ["escuela dominical", "antes del culto"] },
                { id: "infantil", peso: 33, texto: "La iglesia infantil durante el culto: los niños tienen su propio culto, y los maestros necesitan turnos.", formas: ["iglesia infantil", "durante el culto", "propio culto", "turno*"] },
                { id: "semana", peso: 33, texto: "Una reunión entre semana: da más tiempo, pero pide más compromiso.", formas: ["entre semana", "otro dia de la semana", "durante la semana", "compromiso"] },
              ],
              modelo: "La escuela dominical antes del culto, que deja a los maestros estar en el culto; la iglesia infantil durante el culto, donde los maestros necesitan turnos; y una reunión entre semana, que da más tiempo pero pide más compromiso.",
            },
          },
          {
            apoyo: "Muchas iglesias combinan: los niños empiezan el culto con sus padres, en la alabanza, y después pasan a sus salas. Así aprenden a adorar con la iglesia y reciben una enseñanza para su edad",
            clave: {
              id: "pr-ninez-5-3-a7-2",
              tipo: "corta",
              pregunta: "Muchas iglesias combinan las maneras de organizar el horario de los niños. ¿Cómo lo hacen, y qué ganan los niños con eso?",
              ideas: [
                { id: "padres", peso: 35, texto: "Los niños empiezan el culto con sus padres, en la alabanza.", formas: ["con (sus|los) padres", "en la alabanza", "(empiezan|comienzan|inician|estan|participan) en el culto", "(empiezan|comienzan|inician) el culto", "con la iglesia", "con los adultos"] },
                { id: "salas", peso: 30, texto: "Después pasan a sus salas.", formas: ["(pasan|van|salen) a (sus|las|su) (salas|sala|clases|clase)", "a sus salas", "(despues|luego) (pasan|van|salen|se)"] },
                { id: "ganan", peso: 35, texto: "Así aprenden a adorar con la iglesia y reciben una enseñanza para su edad.", formas: ["aprend* a adorar", "adorar con la iglesia", "adoran con", "para su edad", "ensenanza para", "segun su edad", "de su edad"] },
              ],
              modelo: "Los niños empiezan el culto con sus padres, en la alabanza, y después pasan a sus salas. Así aprenden a adorar con la iglesia y reciben una enseñanza para su edad.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. El currículo y el calendario
    "ninez-5-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Sin un plan de enseñanza, ¿qué enseña cada maestro?", reverso: "Lo que se le ocurre.", apoyo: "Sin un plan, cada maestro enseña lo que se le ocurre" },
              { frente: "¿Por qué el plan de enseñanza no se queda en unas pocas historias favoritas?", reverso: "Porque toda la Escritura es útil para enseñar.", apoyo: "Toda la Escritura es útil para enseñar; por eso el ministerio de niños no se queda con unas pocas historias" },
              { frente: "En un currículo centrado en Cristo, ¿adónde lleva cada historia?", reverso: "A Jesús.", apoyo: "Es bíblico y está centrado en Cristo: cada historia lleva a Jesús" },
              { frente: "¿Qué trae para la familia un buen currículo?", reverso: "Una hoja o una pregunta para la casa.", apoyo: "Trae algo para la familia: una hoja o una pregunta para la casa" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué ventaja tiene comprar un currículo?", reverso: "Ahorra tiempo y trae materiales listos.", apoyo: "Comprar uno: ahorra tiempo y trae materiales listos" },
              { frente: "¿Qué pide escribir un currículo propio?", reverso: "Mucho tiempo y personas preparadas.", apoyo: "Escribir uno propio: se ajusta a la iglesia, pero pide mucho tiempo y personas preparadas" },
              { frente: "¿Cuál es una salida común entre comprar y escribir un currículo?", reverso: "Usar uno bueno y adaptarlo, con la revisión del pastor.", apoyo: "Una salida común: usar uno bueno y adaptarlo, con la revisión del pastor" },
              { frente: "¿Para qué estaban las piedras del Jordán?", reverso: "Para que los hijos preguntaran qué significaban.", apoyo: "Las piedras del Jordán estaban para que los hijos preguntaran" },
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
            consigna: "¿Es un buen criterio para elegir un currículo, o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Un buen criterio", "No es un buen criterio"],
            frases: [
              { texto: "Cada historia lleva a Jesús", grupo: 0 },
              { texto: "Recorre el Antiguo y el Nuevo Testamento", grupo: 0 },
              { texto: "Es fácil de preparar para un maestro voluntario", grupo: 0 },
              { texto: "Trae una pregunta para la casa", grupo: 0 },
              { texto: "Se queda en unas pocas historias favoritas", grupo: 1 },
              { texto: "Da la misma clase a todas las edades", grupo: 1 },
              { texto: "Cuenta la historia sin llevarla a la vida del niño", grupo: 1 },
              { texto: "No está de acuerdo con la declaración de fe", grupo: 1 },
            ],
            apoyo: "Elige un currículo bíblico y centrado en Cristo, adecuado a cada edad, con aplicación, fácil de preparar, de acuerdo con la declaración de fe y con algo para la familia",
            ref: "2 Timoteo 3:16-17",
            explica: "Un buen currículo es bíblico y centrado en Cristo, recorre toda la Biblia, es adecuado para cada edad, tiene aplicación, es fácil de preparar, está de acuerdo con la declaración de fe y trae algo para la familia.",
          },
          {
            consigna: "Tu equipo revisa un currículo. ¿Lo que notan es a favor o en contra de elegirlo? Lleva cada frase a su grupo.",
            grupos: ["A favor de elegirlo", "En contra de elegirlo"],
            frases: [
              { texto: "Cada lección termina mostrando a Jesús", grupo: 0 },
              { texto: "Trae un plan para toda la historia de la Biblia", grupo: 0 },
              { texto: "Tiene una versión para cada edad", grupo: 0 },
              { texto: "Manda a casa una hoja para hablar con la familia", grupo: 0 },
              { texto: "Repite cada año las mismas cinco historias", grupo: 1 },
              { texto: "Un maestro voluntario tarda días en preparar una clase", grupo: 1 },
              { texto: "Enseña algo contrario a la declaración de fe", grupo: 1 },
              { texto: "No dice qué hacer con la historia en la vida del niño", grupo: 1 },
            ],
            apoyo: "Tiene aplicación para la vida del niño",
            explica: "Un buen currículo lleva a Jesús, recorre toda la historia de la Biblia, es adecuado para cada edad y trae algo para la familia; además es fácil de preparar, está de acuerdo con la declaración de fe y tiene aplicación para la vida del niño.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre comprar o escribir un currículo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Al comprar un currículo, hay que revisar que esté de acuerdo con la declaración de fe.", verdad: true, explica: "Comprar uno ahorra tiempo y trae materiales listos, pero hay que revisar que esté de acuerdo con la declaración de fe y adaptarlo a la iglesia.", apoyo: "Comprar uno: ahorra tiempo y trae materiales listos, pero hay que revisar que esté de acuerdo con la declaración de fe y adaptarlo a la iglesia" },
              { texto: "Escribir un currículo propio se hace rápido, y lo puede hacer cualquiera.", verdad: false, explica: "Escribir uno propio se ajusta a la iglesia, pero pide mucho tiempo y personas preparadas.", apoyo: "Escribir uno propio: se ajusta a la iglesia, pero pide mucho tiempo y personas preparadas" },
              { texto: "Una salida común es usar un buen currículo y adaptarlo, con la revisión del pastor.", verdad: true, explica: "Así lo dice la lección: usar uno bueno y adaptarlo, con la revisión del pastor.", apoyo: "Una salida común: usar uno bueno y adaptarlo, con la revisión del pastor" },
            ],
          },
          {
            consigna: "Sobre cómo se elige un currículo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un currículo comprado ya trae todo listo, y no hace falta adaptarlo a la iglesia.", verdad: false, explica: "Comprar uno ahorra tiempo, pero hay que revisarlo y adaptarlo a la iglesia.", apoyo: "hay que revisar que esté de acuerdo con la declaración de fe y adaptarlo a la iglesia" },
              { texto: "Un currículo escrito por la propia iglesia se ajusta a ella.", verdad: true, explica: "Escribir uno propio se ajusta a la iglesia, pero pide mucho tiempo y personas preparadas.", apoyo: "Escribir uno propio: se ajusta a la iglesia" },
              { texto: "Un buen currículo recorre solo el Nuevo Testamento.", verdad: false, explica: "Recorre toda la historia de la Biblia, del Antiguo y del Nuevo Testamento.", apoyo: "Recorre toda la historia de la Biblia, del Antiguo y del Nuevo Testamento" },
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
            consigna: "Completa cómo se planea la enseñanza para recorrer toda la Biblia.",
            texto: "Un plan en [[ciclos]] ayuda a recorrer toda la Biblia. Por ejemplo, en tres años: uno para el Antiguo Testamento, otro para la [[vida]] de Jesús y otro para la [[iglesia]] y las verdades básicas de la fe.",
            distractores: ["secreto", "familia", "política"],
            errores: {
              secreto: "La enseñanza se planea en ciclos, para recorrer toda la Biblia.",
              familia: "En el ejemplo, un año es para la vida de Jesús.",
              "política": "En el ejemplo, otro año es para la iglesia y las verdades básicas de la fe.",
            },
            apoyo: "Un plan en ciclos ayuda a recorrer toda la Biblia",
            ref: "2 Timoteo 3:16-17",
            explica: "Un plan en ciclos ayuda a recorrer toda la Biblia: por ejemplo, un ciclo de tres años, con un año para el Antiguo Testamento, otro para la vida de Jesús y otro para la iglesia y las verdades básicas de la fe.",
          },
          {
            consigna: "Completa qué pasa cuando se termina el plan.",
            texto: "Cuando el ciclo [[termina]], empieza otra vez con actividades [[nuevas]], porque los niños ya [[crecieron]].",
            distractores: ["aburre", "iguales", "olvidaron"],
            errores: {
              aburre: "El ciclo empieza otra vez cuando termina.",
              iguales: "Cuando empieza otra vez, lleva actividades nuevas.",
              olvidaron: "Las actividades son nuevas porque los niños ya crecieron.",
            },
            apoyo: "Cuando el ciclo termina, empieza otra vez con actividades nuevas, porque los niños ya crecieron",
            explica: "Cuando el ciclo termina, empieza otra vez con actividades nuevas, porque los niños ya crecieron.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Las piedras del Jordán hacían preguntar a los hijos. ¿Qué pregunta harían? Toca las palabras que la dicen.",
            texto: "cuando vuestros hijos preguntaren a sus padres mañana, diciendo: [[¿Qué significan estas piedras?]]",
            apoyo: "Las fechas especiales del calendario también hacen preguntar, y cada pregunta es una oportunidad para enseñar",
            ref: "Josué 4:6-7",
            explica: "Las piedras estaban para que los hijos preguntaran: «¿Qué significan estas piedras?». Las fechas especiales del calendario también hacen preguntar, y cada pregunta es una oportunidad para enseñar.",
          },
          {
            consigna: "Jesús creció con el calendario de su pueblo. ¿Cuándo iban sus padres a Jerusalén? Toca las palabras que lo dicen.",
            texto: "Iban sus padres [[todos los años]] a Jerusalén en la [[fiesta de la pascua]]",
            apoyo: "Jesús creció con el calendario de su pueblo",
            ref: "Lucas 2:41-42",
            explica: "«Iban sus padres todos los años a Jerusalén en la fiesta de la pascua»: Jesús creció con el calendario de su pueblo. El calendario del ministerio también aprovecha las fechas que hacen preguntar a los niños.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Lo que está en el calendario se prepara con tiempo; lo que no está, se improvisa",
            ref: "Josué 4:6-7",
            situacion: "Eres la coordinadora del ministerio de niños y estás armando con tu equipo el calendario del próximo año.",
            escenas: [
              {
                id: "e1",
                narra: "Empiezan a poner las fechas en el calendario.",
                pregunta: "¿Qué fechas ponen primero?",
                opciones: [
                  { texto: "Las fechas de la fe: la Navidad y la Semana Santa.", valor: 2, explica: "Paso 1: las fechas de la fe, la Navidad y la Semana Santa, con la muerte y la resurrección de Jesús.", siguiente: "e2" },
                  { texto: "Ninguna: cada fecha especial se verá cuando llegue.", valor: 0, explica: "Lo que está en el calendario se prepara con tiempo; lo que no está, se improvisa.", siguiente: "e1b" },
                  { texto: "Solo el Día de las Madres, porque es la fecha que más gusta.", valor: 1, explica: "El Día de las Madres es una fecha de la familia, pero el calendario empieza con las fechas de la fe.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Llega diciembre y nadie preparó nada para la Navidad.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Pones todas las fechas en el calendario, para prepararlas.", valor: 2, explica: "Lo que está en el calendario se prepara con tiempo.", siguiente: "e2" },
                  { texto: "Improvisas algo a última hora, como se hace todos los años.", valor: 0, explica: "Lo que no está en el calendario, se improvisa.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya están las fechas de la fe y de la familia, y el verano.",
                pregunta: "¿Qué agregan para el equipo de maestros?",
                opciones: [
                  { texto: "Dos capacitaciones al año y una reunión de maestros cada mes.", valor: 2, explica: "Paso 5, el equipo: dos capacitaciones al año y una reunión de maestros cada mes." },
                  { texto: "Nada: los maestros ya saben lo que tienen que hacer cada domingo.", valor: 0, explica: "El calendario también deja su lugar al equipo: capacitaciones y reuniones de maestros." },
                  { texto: "Una sola reunión de maestros al año, en el mes de enero.", valor: 1, explica: "Una reunión ayuda, pero el calendario pone una reunión de maestros cada mes y dos capacitaciones al año." },
                ],
              },
              {
                id: "e3",
                narra: "El calendario del año ya está listo.",
                pregunta: "¿Qué hacen con él?",
                opciones: [
                  { texto: "Lo entregan a los maestros y a los padres al comenzar el año.", valor: 2, explica: "Entrega el calendario a los maestros y a los padres al comenzar el año." },
                  { texto: "Lo guarda la coordinadora en su oficina, para que nadie lo cambie.", valor: 0, explica: "El calendario se entrega a los maestros y a los padres al comenzar el año." },
                  { texto: "Se lo dan a los maestros, pero a los padres no les dicen nada.", valor: 1, explica: "Los maestros lo necesitan, y los padres también: se entrega a los dos al comenzar el año." },
                ],
              },
            ],
          },
          {
            apoyo: "Como las piedras del Jordán y las fiestas de Israel, el calendario del año aprovecha las fechas que hacen preguntar a los niños",
            ref: "Lucas 2:41-42",
            situacion: "Eres el líder del grupo de escolares, y la coordinadora te pide ideas para el calendario del año.",
            escenas: [
              {
                id: "e1",
                narra: "Un maestro propone: Pongamos solo las clases de cada domingo; lo demás lo vemos en el camino.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que lo que está en el calendario se prepara con tiempo.", valor: 2, explica: "Lo que está en el calendario se prepara con tiempo; lo que no está, se improvisa.", siguiente: "e2" },
                  { texto: "Que tiene razón: es mejor no planear tanto las cosas.", valor: 0, explica: "Lo que no está en el calendario, se improvisa.", siguiente: "e1b" },
                  { texto: "Que pondrán solo la Navidad, porque es la fecha más grande.", valor: 1, explica: "La Navidad va, pero el calendario también lleva la Semana Santa, las fechas de la familia, el verano, el equipo y las evaluaciones.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Llega el verano y nadie preparó la Escuela Bíblica de Vacaciones.",
                pregunta: "¿Qué propones para el próximo año?",
                opciones: [
                  { texto: "Poner el verano en el calendario, con sus fechas y su equipo.", valor: 2, explica: "Paso 3, el verano: la Escuela Bíblica de Vacaciones, con sus fechas y su equipo.", siguiente: "e2" },
                  { texto: "Dejar de hacer la Escuela Bíblica de Vacaciones, porque no hay tiempo.", valor: 0, explica: "El calendario deja su lugar al verano: la Escuela Bíblica de Vacaciones, con sus fechas y su equipo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Se acerca el regreso a clases.",
                pregunta: "¿Qué propones para esa fecha?",
                opciones: [
                  { texto: "Un domingo para orar por los estudiantes y sus maestros.", valor: 2, explica: "Paso 4, el regreso a clases: un domingo para orar por los estudiantes y sus maestros." },
                  { texto: "Nada: el regreso a clases no tiene que ver con la iglesia.", valor: 0, explica: "El regreso a clases es una de las fechas del calendario: un domingo para orar por los estudiantes y sus maestros." },
                  { texto: "Una nota en el boletín para desearles un buen año escolar.", valor: 1, explica: "Recordarlo está bien, pero la lección propone un domingo para orar por los estudiantes y sus maestros." },
                ],
              },
              {
                id: "e3",
                narra: "Quieres que los niños también sirvan en la iglesia.",
                pregunta: "¿Qué propones poner en el calendario?",
                opciones: [
                  { texto: "Un domingo de los niños: cantan, leen o reciben a las personas.", valor: 2, explica: "Paso 6: un domingo de los niños, en que sirven en el culto, cantando, leyendo o recibiendo a las personas." },
                  { texto: "Nada: los niños vienen a la iglesia a aprender, no a servir.", valor: 0, explica: "El calendario lleva un domingo de los niños, en que sirven en el culto." },
                  { texto: "Que canten algún domingo en el culto, aunque no se prepare nada.", valor: 1, explica: "Que canten está bien, pero el domingo de los niños va en el calendario, para prepararlo con tiempo." },
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
            apoyo: "Un plan en ciclos ayuda a recorrer toda la Biblia",
            ref: "2 Timoteo 3:16-17",
            clave: {
              id: "pr-ninez-5-4-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la enseñanza de los niños se planea en ciclos, y cómo puede ser un ciclo?",
              ideas: [
                { id: "toda", peso: 40, texto: "Para recorrer toda la Biblia, porque toda la Escritura es útil para enseñar, y no quedarse en unas pocas historias.", formas: ["toda la biblia", "toda la escritura", "toda la historia", "pocas historias", "historias favoritas", "todo el consejo", "recorr* (toda|la) biblia"] },
                { id: "ejemplo", peso: 40, texto: "Por ejemplo, tres años: uno para el Antiguo Testamento, otro para la vida de Jesús y otro para la iglesia y las verdades básicas de la fe.", formas: ["tres anos", "antiguo testamento", "vida de jesus", "verdades basicas", "un ano para"] },
                { id: "otravez", peso: 20, texto: "Cuando termina, empieza otra vez con actividades nuevas, porque los niños ya crecieron.", formas: ["otra vez", "de nuevo", "actividades nuevas", "nuevas actividades", "ya crecieron", "crecieron", "vuelve a empezar", "(ciclo|plan) (empieza|comienza|vuelve)", "comienza otra"] },
              ],
              modelo: "Porque toda la Escritura es útil para enseñar, y el plan no se queda en unas pocas historias: recorre toda la Biblia. Por ejemplo, tres años: uno para el Antiguo Testamento, otro para la vida de Jesús y otro para la iglesia. Luego empieza otra vez con actividades nuevas.",
            },
          },
          {
            apoyo: "Sin un plan, cada maestro enseña lo que se le ocurre, y algunas historias se repiten mientras otras nunca se cuentan",
            ref: "2 Timoteo 3:16-17",
            clave: {
              id: "pr-ninez-5-4-a7-2",
              tipo: "corta",
              pregunta: "Una maestra te dice: Yo enseño cada domingo la historia que más me gusta. ¿Qué le explicas sobre el plan en ciclos?",
              ideas: [
                { id: "sinplan", peso: 30, texto: "Sin un plan, algunas historias se repiten mientras otras nunca se cuentan.", formas: ["se repiten", "nunca se cuentan", "otras nunca", "lo que se le ocurre", "sin un plan", "sin plan", "pocas historias"] },
                { id: "toda", peso: 40, texto: "Toda la Escritura es útil para enseñar: el plan recorre toda la Biblia.", formas: ["toda la biblia", "toda la escritura", "todo el consejo", "toda la historia de la biblia", "antiguo y nuevo", "antiguo y el nuevo", "antiguo testamento"] },
                { id: "ciclo", peso: 30, texto: "Un plan en ciclos, como uno de tres años, recorre el Antiguo Testamento, la vida de Jesús y la iglesia.", formas: ["ciclo*", "tres anos", "vida de jesus", "un ano para"] },
              ],
              errores: [
                { id: "favorita", texto: "Sin un plan, algunas historias se repiten mientras otras nunca se cuentan: el plan recorre toda la Biblia.", formas: ["(esta|es) bien (ensenar|contar)", "(basta|alcanza) con (las|la|unas) (historias|historia)", "mejor (ensenar|contar) (la|las) (historia|historias) que", "tiene razon"], anula: "sinplan" },
              ],
              modelo: "Le explico que sin un plan algunas historias se repiten mientras otras nunca se cuentan. Toda la Escritura es útil para enseñar, por eso un plan en ciclos, como uno de tres años, recorre toda la Biblia: el Antiguo Testamento, la vida de Jesús y la iglesia.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Puertas abiertas al barrio y el seguimiento
    "ninez-5-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hacen muchas familias que no entrarían a un culto?", reverso: "Traen a sus hijos a una actividad para niños.", apoyo: "Muchas familias que no entrarían a un culto sí traen a sus hijos a una actividad para niños" },
              { frente: "¿Cómo miraba Jesús a las multitudes?", reverso: "Con compasión: estaban como ovejas sin pastor.", apoyo: "Jesús miraba a la gente con compasión" },
              { frente: "¿Qué hace la iglesia en vez de esperar a que los niños lleguen solos?", reverso: "Sale a invitarlos.", apoyo: "La iglesia no espera a que los niños lleguen solos: sale a invitarlos" },
              { frente: "Según Hechos 16, ¿a quiénes alcanza el evangelio?", reverso: "A las familias enteras.", apoyo: "El evangelio alcanza a las familias enteras" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué puede ser el ministerio de niños para el barrio?", reverso: "Una puerta abierta de la iglesia hacia su barrio.", apoyo: "El ministerio de niños puede ser una puerta abierta de la iglesia hacia su barrio" },
              { frente: "¿Qué le dijeron Pablo y Silas al carcelero de Filipos?", reverso: "«Cree en el Señor Jesucristo, y serás salvo, tú y tu casa».", apoyo: "Pablo y Silas le dijeron al carcelero de Filipos: «Cree en el Señor Jesucristo, y serás salvo, tú y tu casa»" },
              { frente: "Con los niños de familias que no son cristianas, ¿qué pide la iglesia a los padres?", reverso: "Su permiso.", apoyo: "pide el permiso de los padres, les cuenta lo que se enseña y nunca presiona a un niño para que tome una decisión" },
              { frente: "¿Cómo se mide el fruto de una actividad para niños?", reverso: "En cuántas familias nuevas siguen viniendo un mes después.", apoyo: "se mide en cuántas familias nuevas siguen viniendo un mes después" },
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
            consigna: "Sobre por qué el ministerio de niños sale al barrio: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús tuvo compasión de las multitudes, porque estaban como ovejas que no tienen pastor.", verdad: true, explica: "«Y al ver las multitudes, tuvo compasión de ellas; porque estaban desamparadas y dispersas como ovejas que no tienen pastor». En cada barrio hay niños y familias así.", apoyo: "Jesús tuvo compasión de las multitudes, que estaban como ovejas sin pastor", ref: "Mateo 9:36" },
              { texto: "La iglesia espera a que los niños del barrio lleguen solos.", verdad: false, explica: "La iglesia no espera a que los niños lleguen solos: sale a invitarlos.", apoyo: "La iglesia no espera a que los niños lleguen solos: sale a invitarlos", ref: "Lucas 14:23" },
              { texto: "Muchas familias que no entrarían a un culto sí traen a sus hijos a una actividad para niños.", verdad: true, explica: "Por eso el ministerio de niños puede ser una puerta abierta de la iglesia hacia su barrio.", apoyo: "Muchas familias que no entrarían a un culto sí traen a sus hijos a una actividad para niños" },
            ],
          },
          {
            consigna: "Sobre el evangelio, las familias y el respeto: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El evangelio llegó a toda la casa del carcelero de Filipos.", verdad: true, explica: "Pablo y Silas «le hablaron la palabra del Señor a él y a todos los que estaban en su casa»: el evangelio alcanza a las familias enteras.", apoyo: "el evangelio llegó a toda la casa del carcelero de Filipos", ref: "Hechos 16:31-32" },
              { texto: "Con los niños de familias que no son cristianas, la iglesia los presiona para que decidan.", verdad: false, explica: "La iglesia actúa con respeto: nunca presiona a un niño para que tome una decisión.", apoyo: "nunca presiona a un niño para que tome una decisión" },
              { texto: "La iglesia guarda en secreto lo que les enseña a los niños de otras familias.", verdad: false, explica: "La iglesia pide el permiso de los padres y les cuenta lo que se enseña.", apoyo: "pide el permiso de los padres, les cuenta lo que se enseña" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena la Escuela Bíblica de Vacaciones en el tiempo, del primer paso al último.",
            eventos: [
              { texto: "El pastor y el equipo eligen el tema, las fechas y el presupuesto", fecha: "Tres meses antes" },
              { texto: "Se preparan las historias y se capacita a los voluntarios", fecha: "Dos meses antes" },
              { texto: "Se invita en el barrio y se abre la inscripción", fecha: "Un mes antes" },
              { texto: "Bienvenida, alabanza, historia, juego, merienda y cierre", fecha: "Cada día" },
              { texto: "Un programa con las familias, donde los niños cantan", fecha: "El último día" },
              { texto: "Se llama o se visita a cada familia nueva", fecha: "Las dos semanas siguientes" },
            ],
            apoyo: "Tres meses antes: el pastor y el equipo eligen el tema, las fechas, el presupuesto y a los responsables",
            explica: "Tres meses antes se eligen el tema, las fechas y el presupuesto; dos meses antes se preparan las historias y los voluntarios; un mes antes se invita y se abre la inscripción; cada día tiene su programa; el último día hay un programa con las familias; y después se llama o se visita a cada familia nueva.",
          },
          {
            consigna: "Ordena estos pasos de la Escuela Bíblica de Vacaciones en el tiempo, del primero al último.",
            eventos: [
              { texto: "Se eligen los responsables", fecha: "Tres meses antes" },
              { texto: "Se suman y se seleccionan los voluntarios", fecha: "Dos meses antes" },
              { texto: "Se invita en las escuelas cercanas", fecha: "Un mes antes" },
              { texto: "Cada niño se entrega a quien lo trajo", fecha: "Cada día" },
              { texto: "Los niños muestran a sus familias lo que aprendieron", fecha: "El último día" },
              { texto: "Se invita a cada familia nueva a la iglesia", fecha: "Después" },
            ],
            apoyo: "Después: en las dos semanas siguientes, se llama o se visita a cada familia nueva y se la invita a la iglesia",
            explica: "Los responsables se eligen tres meses antes; los voluntarios se suman y se seleccionan dos meses antes; un mes antes se invita en las escuelas; cada día se entrega a cada niño a quien lo trajo; el último día los niños muestran lo que aprendieron; y después se invita a cada familia nueva a la iglesia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa los datos de la inscripción.",
            texto: "Un mes antes se abre la inscripción con los datos de cada niño, sus [[alergias]], el [[teléfono]] de los padres y su [[permiso]].",
            distractores: ["juguetes", "sueldo", "ofrenda"],
            errores: {
              juguetes: "La inscripción pide las alergias de cada niño.",
              sueldo: "La inscripción pide el teléfono de los padres.",
              ofrenda: "La inscripción pide el permiso de los padres.",
            },
            apoyo: "Un mes antes: se invita en el barrio y en las escuelas cercanas, y se abre la inscripción con los datos de cada niño, sus alergias, el teléfono de los padres y su permiso",
            explica: "La inscripción se abre un mes antes, con los datos de cada niño, sus alergias, el teléfono de los padres y su permiso.",
          },
          {
            consigna: "Completa cómo empieza y cómo termina cada día.",
            texto: "Cada día empieza con la bienvenida y el [[registro]], y termina con la entrega de cada niño a quien lo [[trajo]].",
            distractores: ["sermón", "pida"],
            errores: {
              "sermón": "Cada día empieza con la bienvenida y el registro.",
              pida: "Cada niño se entrega a quien lo trajo, no a quien lo pida.",
            },
            apoyo: "Cada día: bienvenida y registro, alabanza, la historia, la manualidad, el juego, la merienda y el cierre, con la entrega de cada niño a quien lo trajo",
            explica: "Cada día empieza con la bienvenida y el registro, sigue con la alabanza, la historia, la manualidad, el juego y la merienda, y termina con el cierre y la entrega de cada niño a quien lo trajo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El fruto de una actividad no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después",
            ref: "Lucas 14:23",
            titulo: "Después de la Escuela Bíblica de Vacaciones",
            relato: [
              "Tu iglesia hizo su Escuela Bíblica de Vacaciones, y vinieron quince niños de familias nuevas del barrio.",
              "El último día, los padres vieron a sus hijos cantar y mostrar lo que aprendieron, y muchos se fueron contentos.",
              "En la reunión del equipo, un hermano dice: Salió muy bien; ya cumplimos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hace el equipo en las dos semanas siguientes?",
                opciones: [
                  { texto: "Llama o visita a cada familia nueva y la invita a la iglesia.", bien: true, explica: "El seguimiento es parte del plan, no un agregado: en las dos semanas siguientes se llama o se visita a cada familia nueva." },
                  { texto: "Nada más: la actividad terminó, y el fruto ya se vio ese día.", explica: "El fruto de una actividad no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después." },
                  { texto: "Espera a que las familias vuelvan solas, cuando ellas quieran.", explica: "La iglesia no espera a que los niños lleguen solos: sale a invitarlos." },
                ],
                apoyo: "Después: en las dos semanas siguientes, se llama o se visita a cada familia nueva y se la invita a la iglesia",
                explica: "El seguimiento es parte del plan: en las dos semanas siguientes se llama o se visita a cada familia nueva y se la invita a la iglesia.",
              },
              {
                tipo: "situacion",
                pregunta: "Un domingo llega una de esas familias. ¿Qué hace el equipo?",
                opciones: [
                  { texto: "Alguien la acompaña, le explica el registro y la llama en la semana.", bien: true, explica: "Recibir bien a las visitas: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana." },
                  { texto: "La saludan desde lejos y después la dejan sola, para no incomodarla en nada.", explica: "A la familia nueva alguien la acompaña y le explica el registro." },
                  { texto: "Le dan los papeles del registro y la dejan que se las arregle sola.", explica: "Alguien acompaña a la familia nueva y le explica el registro." },
                ],
                apoyo: "Recibir bien a las visitas: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana",
                explica: "Recibir bien a las visitas es otra puerta abierta: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo sabrá el equipo si la actividad dio fruto?",
                opciones: [
                  { texto: "Viendo cuántas familias nuevas siguen viniendo un mes después.", bien: true, explica: "El fruto de una actividad se mide en cuántas familias nuevas siguen viniendo un mes después." },
                  { texto: "Contando cuántos niños llegaron el primer día de la Escuela Bíblica.", explica: "El fruto no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después." },
                  { texto: "Preguntando a los niños si se divirtieron mucho durante la semana.", explica: "El fruto se mide en cuántas familias nuevas siguen viniendo un mes después." },
                ],
                apoyo: "El fruto de una actividad no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después",
                explica: "El fruto no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después.",
              },
              {
                tipo: "explica",
                apoyo: "Con los niños de familias que no son cristianas, la iglesia actúa con respeto: pide el permiso de los padres, les cuenta lo que se enseña y nunca presiona a un niño para que tome una decisión",
                clave: {
                  id: "pr-ninez-5-5-a5-1",
                  tipo: "corta",
                  pregunta: "Una madre del barrio, que no es cristiana, quiere que su hija siga viniendo. ¿Cómo actuará la iglesia con ella y con la niña?",
                  ideas: [
                    { id: "permiso", peso: 34, texto: "Le pide su permiso.", formas: ["permiso", "autoriz*", "consentimiento"] },
                    { id: "cuenta", peso: 33, texto: "Le cuenta lo que se enseña.", formas: ["(le|les) (cuenta|contara|contamos|contaremos|cuento|contare|explica|explicara|explicaremos|explico|explicare|informa|informara|informaremos|dice|diremos|dira) lo que", "lo que se ensena", "lo que (ensenamos|ensenaremos|aprende|aprendera|aprenden)", "lo que le ensen*", "inform*", "contarle"] },
                    { id: "presion", peso: 33, negativa: true, texto: "Nunca presiona a la niña para que tome una decisión.", formas: ["no (presiona|presionara|presionamos|presionaremos|presionar|presionarla|obliga|obligara|obligamos|obligaremos)", "no la (presiona|presionara|presionamos|presionaremos|obliga|obligara|obligaremos)", "nunca (presiona|presionara|presionamos|presionaremos|presionar|presionarla|obliga|obligara)", "nunca la (presiona|presionara|presionamos|presionaremos|obliga|obligara)", "sin (presion|presiones|presionar|presionarla|obligar|obligarla|forzar|forzarla)", "respet* (su|la) decision"] },
                  ],
                  errores: [
                    { id: "callar", texto: "La iglesia les cuenta a los padres lo que se enseña.", formas: ["no (le|les) (diremos|diria|decimos|dire|contaremos|contamos|contare|explicaremos|explicamos|explicare) nada", "no (le|les) (diremos|dire|decimos|contaremos|contare|contamos|explicaremos|explicare|explicamos)", "en secreto", "sin (decirle|decirles|contarle|contarles)"], anula: "cuenta" },
                    { id: "presionar", texto: "La iglesia nunca presiona a un niño para que tome una decisión.", formas: ["presion* para que", "presion* a la nina", "debe* presionar*", "hay que presionar*", "vamos a presionar*", "obligar* a (decidir|aceptar|creer|convertirse)"], anula: "presion" },
                  ],
                  modelo: "La iglesia actuará con respeto: le pedirá permiso a la madre, le contará lo que se le enseña a su hija y nunca presionará a la niña para que tome una decisión.",
                },
              },
            ],
          },
          {
            apoyo: "Recibir bien a las visitas: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana",
            ref: "Hechos 16:31-32",
            titulo: "Carlos y su mamá llegan al culto",
            relato: [
              "Tu iglesia tiene un club bíblico en un parque del barrio, con el permiso de los padres y siempre con dos adultos.",
              "Ahí conociste a Carlos, de nueve años, y a su mamá, que no va a ninguna iglesia.",
              "Este domingo, Carlos y su mamá llegaron por primera vez al culto, y se ven un poco perdidos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces cuando llegan?",
                opciones: [
                  { texto: "Los acompaño y les explico cómo funciona el registro de los niños.", bien: true, explica: "Alguien acompaña a la familia nueva y le explica el registro: así se recibe bien a las visitas." },
                  { texto: "Los saludo y sigo con lo mío, para no hacerlos sentir observados.", explica: "A la familia nueva alguien la acompaña y le explica el registro." },
                  { texto: "Llevo a Carlos a una sala sin pasar por el registro, para no demorar.", explica: "Cada niño pasa por el registro: alguien acompaña a la familia nueva y se lo explica." },
                ],
                apoyo: "Recibir bien a las visitas: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana",
                explica: "Alguien acompaña a la familia nueva y le explica el registro: así se recibe bien a las visitas.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces en la semana?",
                opciones: [
                  { texto: "Los llamo para saludarlos y volver a invitarlos a la iglesia.", bien: true, explica: "A la familia nueva se la llama en la semana: el seguimiento es parte del plan." },
                  { texto: "Nada: si les gustó, ellos volverán solos el próximo domingo.", explica: "La iglesia no espera a que lleguen solos: a la familia nueva se la llama en la semana." },
                  { texto: "Les mando un folleto general de la iglesia, sin llamarlos nunca.", explica: "A la familia nueva alguien la llama en la semana." },
                ],
                apoyo: "alguien acompaña a la familia nueva, le explica el registro y la llama en la semana",
                explica: "A la familia nueva se la llama en la semana: el seguimiento es parte del plan, no un agregado.",
              },
              {
                tipo: "situacion",
                pregunta: "La mamá te pregunta qué le enseñan a Carlos en su clase. ¿Qué haces?",
                opciones: [
                  { texto: "Le cuento con respeto lo que aprende, y le doy la hoja semanal.", bien: true, explica: "La iglesia actúa con respeto y les cuenta a los padres lo que se enseña; la hoja semanal los ayuda a hablar de Dios en casa." },
                  { texto: "Le digo que eso solo se les cuenta a los padres que ya son cristianos.", explica: "Con las familias que no son cristianas, la iglesia les cuenta lo que se enseña." },
                  { texto: "Le contesto que no se preocupe, y no le digo lo que se le enseña.", explica: "La iglesia actúa con respeto: les cuenta a los padres lo que se enseña." },
                ],
                apoyo: "la iglesia actúa con respeto: pide el permiso de los padres, les cuenta lo que se enseña y nunca presiona a un niño para que tome una decisión",
                explica: "Con las familias que no son cristianas, la iglesia actúa con respeto y les cuenta lo que se enseña; el apoyo a los padres incluye una hoja semanal para hablar de Dios en casa.",
              },
              {
                tipo: "explica",
                apoyo: "El fruto de una actividad no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después. Por eso el seguimiento es parte del plan, no un agregado",
                clave: {
                  id: "pr-ninez-5-5-a5-2",
                  tipo: "corta",
                  pregunta: "¿Por qué el seguimiento de Carlos y su mamá es parte del plan, y cómo sabrás si dio fruto?",
                  ideas: [
                    { id: "plan", peso: 50, texto: "El seguimiento es parte del plan, no un agregado: el fruto no se mide solo el día de la actividad.", formas: ["parte del plan", "no es un agregado", "no un agregado", "no se mide solo", "solo ese dia", "solo el dia"] },
                    { id: "mes", peso: 50, texto: "Se ve en si la familia sigue viniendo un mes después.", formas: ["un mes despues", "siguen viniendo", "sigue viniendo", "sigan viniendo", "siga viniendo", "despues de un mes", "un mes"] },
                  ],
                  modelo: "Porque el seguimiento es parte del plan, no un agregado: el fruto no se mide solo el día de la actividad. Sabré si dio fruto si Carlos y su mamá siguen viniendo un mes después.",
                },
              },
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
            caso: "Una maestra te dice: La familia que vino a la Escuela Bíblica de Vacaciones no volvió. Ya hicimos nuestra parte.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el seguimiento es parte del plan: hay que llamarla o visitarla.", bien: true, explica: "El seguimiento es parte del plan, no un agregado: en las dos semanas siguientes se llama o se visita a cada familia nueva." },
              { texto: "Que tiene razón: la actividad terminó, y el fruto se vio ese mismo día.", explica: "El fruto de una actividad no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después." },
              { texto: "Que esperemos a que vuelva sola el verano que viene, si quiere.", explica: "La iglesia no espera a que los niños lleguen solos: sale a invitarlos y da seguimiento a cada familia nueva." },
              { texto: "Que solo llamemos a las familias nuevas que ya son cristianas.", explica: "El ministerio de niños alcanza también a las familias que no conocen a Cristo, y da seguimiento a cada familia nueva." },
            ],
            apoyo: "Por eso el seguimiento es parte del plan, no un agregado",
            explica: "El seguimiento es parte del plan, no un agregado: se llama o se visita a cada familia nueva y se la invita a la iglesia.",
          },
          {
            caso: "Un ujier te dice: Llegó una familia nueva con dos niños, y no sabe adónde llevarlos.",
            pregunta: "¿Qué le pides que haga?",
            opciones: [
              { texto: "Que alguien la acompañe, le explique el registro y la llame en la semana.", bien: true, explica: "Recibir bien a las visitas: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana." },
              { texto: "Que le señale desde lejos el pasillo de las salas, y siga con lo suyo.", explica: "A la familia nueva alguien la acompaña y le explica el registro." },
              { texto: "Que deje a los niños en cualquier sala, sin pasar por el registro, para no demorar.", explica: "Cada niño pasa por el registro: alguien acompaña a la familia nueva y le explica cómo funciona." },
              { texto: "Que les diga que vuelvan otro día, cuando el equipo tenga más tiempo.", explica: "Recibir bien a las visitas es una puerta abierta: alguien acompaña a la familia nueva ese mismo día." },
            ],
            apoyo: "Recibir bien a las visitas: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana",
            explica: "Recibir bien a las visitas es parte del seguimiento: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El ministerio de niños puede ser una puerta abierta de la iglesia hacia su barrio",
            ref: "Mateo 9:36",
            clave: {
              id: "pr-ninez-5-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el ministerio de niños alcanza también a las familias que no conocen a Cristo?",
              ideas: [
                { id: "compasion", peso: 35, texto: "Jesús tuvo compasión de las multitudes, que estaban como ovejas sin pastor, y en cada barrio hay niños y familias así.", formas: ["compasion", "ovejas", "sin pastor", "no tienen pastor", "desamparad*", "dispers*"] },
                { id: "invitar", peso: 30, texto: "La iglesia no espera a que los niños lleguen solos: sale a invitarlos.", formas: ["sale a invitar*", "salir a invitar*", "salimos a invitar*", "sale a buscar*", "salir a buscar*", "no espera", "por los caminos", "los invita", "invitarlos", "invit* a (los|las) (ninos|familias)"] },
                { id: "familias", peso: 35, texto: "El evangelio alcanza a las familias enteras, y el ministerio de niños es una puerta abierta hacia el barrio.", formas: ["familias enteras", "toda la familia", "toda la casa", "tu casa", "su casa", "puerta abierta", "carcelero", "traen a sus hijos"] },
              ],
              modelo: "Porque Jesús tuvo compasión de las multitudes, que estaban como ovejas sin pastor. La iglesia no espera a que los niños lleguen solos: sale a invitarlos. Y el evangelio alcanza a las familias enteras: el ministerio de niños es una puerta abierta hacia el barrio.",
            },
          },
          {
            apoyo: "Muchas familias que no entrarían a un culto sí traen a sus hijos a una actividad para niños. El ministerio de niños puede ser una puerta abierta de la iglesia hacia su barrio",
            ref: "Hechos 16:31-32",
            clave: {
              id: "pr-ninez-5-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que las actividades para los niños del barrio son una pérdida de tiempo, porque sus padres nunca vendrán a la iglesia. ¿Qué le explicas?",
              ideas: [
                { id: "puerta", peso: 40, texto: "Muchas familias que no entrarían a un culto sí traen a sus hijos a una actividad para niños: es una puerta abierta.", formas: ["puerta abierta", "una puerta", "traen a sus hijos", "traen a los ninos", "si traen", "no entrarian"] },
                { id: "familias", peso: 35, texto: "El evangelio alcanza a las familias enteras, como a la casa del carcelero de Filipos.", formas: ["familias enteras", "toda la familia", "toda la casa", "tu casa", "su casa", "carcelero", "filipos"] },
                { id: "respeto", peso: 25, texto: "Y se hace con respeto: con el permiso de los padres, contándoles lo que se enseña y sin presionar a los niños.", formas: ["permiso", "respeto", "sin presion*", "no presion*", "nunca presion*", "lo que se ensena"] },
              ],
              modelo: "Le explico que muchas familias que no entrarían a un culto sí traen a sus hijos a una actividad para niños: es una puerta abierta. El evangelio alcanza a las familias enteras, como a la casa del carcelero. Y se hace con respeto, con el permiso de los padres.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. El presupuesto y la evaluación
    "ninez-5-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Jesús, ¿qué hace primero el que quiere edificar una torre?", reverso: "Se sienta y calcula los gastos.", apoyo: "Jesús enseñó a calcular los gastos antes de edificar" },
              { frente: "¿Qué se requiere de los administradores?", reverso: "«que cada uno sea hallado fiel».", apoyo: "«se requiere de los administradores, que cada uno sea hallado fiel»" },
              { frente: "¿De qué rinde cuentas el líder del ministerio de niños?", reverso: "De cómo usó el dinero.", apoyo: "El líder rinde cuentas de cómo usó el dinero" },
              { frente: "¿Qué entra en la parte de la seguridad del presupuesto?", reverso: "La verificación de antecedentes, las etiquetas del registro y el botiquín.", apoyo: "La seguridad: la verificación de antecedentes, las etiquetas del registro y el botiquín" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es evaluar, y qué no es?", reverso: "No es buscar culpables: es preguntar con humildad qué da fruto.", apoyo: "Evaluar no es buscar culpables: es preguntar con humildad qué está dando fruto y qué hay que cambiar" },
              { frente: "¿Dónde empieza la evaluación?", reverso: "Delante de Dios.", apoyo: "La evaluación empieza delante de Dios" },
              { frente: "Al evaluar, ¿a quiénes se escucha?", reverso: "A los maestros, a los padres y también a los niños.", apoyo: "Se escucha a los maestros, a los padres y también a los niños" },
              { frente: "¿Qué dice una meta clara?", reverso: "Qué, para cuándo y quién.", apoyo: "Una meta clara dice qué, para cuándo y quién" },
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
            consigna: "¿En qué parte del presupuesto va cada gasto? Une cada uno con su parte.",
            pares: [
              ["La verificación de antecedentes de un voluntario", "La seguridad"],
              ["Las hojas y los lápices de la clase", "Los materiales y el currículo"],
              ["Un taller sobre cómo dar una clase", "La capacitación del equipo"],
              ["Las mesas y las sillas de la cuna", "Los muebles y el equipo de las salas"],
              ["Un regalo de gracias para el equipo", "El agradecimiento a los voluntarios"],
            ],
            apoyo: "La seguridad: la verificación de antecedentes, las etiquetas del registro y el botiquín",
            ref: "Lucas 14:28-30",
            explica: "El presupuesto tiene sus partes: los materiales y el currículo; la seguridad, con la verificación de antecedentes; la capacitación del equipo; los eventos; los muebles y el equipo de las salas; las meriendas; y el agradecimiento a los voluntarios.",
          },
          {
            consigna: "Une cada gasto del año con la parte del presupuesto donde va.",
            pares: [
              ["Las etiquetas del registro", "La seguridad"],
              ["La Escuela Bíblica de Vacaciones", "Los eventos"],
              ["El jugo y las galletas de cada domingo", "Las meriendas"],
              ["Las crayolas y el papel de las manualidades", "Los materiales y el currículo"],
            ],
            apoyo: "Los eventos, como la Escuela Bíblica de Vacaciones",
            ref: "Lucas 14:28-30",
            explica: "Las etiquetas del registro son parte de la seguridad; la Escuela Bíblica de Vacaciones, de los eventos; el jugo y las galletas, de las meriendas; y las crayolas y el papel, de los materiales.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es algo que se cuenta o algo que se ve? Lleva cada frase a su grupo.",
            grupos: ["Lo que se cuenta: los números", "Lo que se ve: el fruto"],
            frases: [
              { texto: "La asistencia de cada domingo", grupo: 0 },
              { texto: "Los niños nuevos", grupo: 0 },
              { texto: "Los voluntarios activos", grupo: 0 },
              { texto: "Los turnos cubiertos", grupo: 0 },
              { texto: "Niños que oran", grupo: 1 },
              { texto: "Niños que conocen la historia de la Biblia", grupo: 1 },
              { texto: "Niños que recitan versículos", grupo: 1 },
              { texto: "Familias que hablan de Dios en casa", grupo: 1 },
            ],
            apoyo: "Lo que se cuenta: la asistencia, los niños nuevos, los que vuelven, los voluntarios activos y los turnos cubiertos",
            explica: "Se cuentan la asistencia, los niños nuevos, los que vuelven, los voluntarios activos y los turnos cubiertos; se ve el fruto en niños que oran, que conocen la Biblia, que recitan versículos y que sirven, y en familias que hablan de Dios en casa.",
          },
          {
            consigna: "¿Cada noticia de la reunión del trimestre es un número que se cuenta o un fruto que se ve? Lleva cada frase a su grupo.",
            grupos: ["Un número que se cuenta", "Un fruto que se ve"],
            frases: [
              { texto: "Este trimestre vinieron 40 niños cada domingo", grupo: 0 },
              { texto: "Seis niños nuevos volvieron otra vez", grupo: 0 },
              { texto: "Hay doce voluntarios activos", grupo: 0 },
              { texto: "Todos los turnos de la cuna están cubiertos", grupo: 0 },
              { texto: "Un niño de diez años sirve recibiendo a las personas", grupo: 1 },
              { texto: "Una niña recitó de memoria el versículo del mes", grupo: 1 },
              { texto: "Una mamá comenta que su hijo ora antes de dormir", grupo: 1 },
              { texto: "Un papá dice que en casa ahora hablan de Dios", grupo: 1 },
            ],
            apoyo: "Los números ayudan a ver, pero no son el fruto: un ministerio puede crecer en número sin formar discípulos",
            explica: "La asistencia, los nuevos que vuelven, los voluntarios y los turnos son números: ayudan a ver. Los niños que sirven, recitan versículos y oran, y las familias que hablan de Dios en casa son el fruto que se ve.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena la reunión de evaluación de cada trimestre, del primer paso al último.",
            pasos: [
              "Orar: pedir a Dios que muestre sus caminos",
              "Mirar los números: asistencia, nuevos y turnos",
              "Nombrar un problema",
              "Poner una meta concreta, con fecha y responsable",
              "Enviar un informe breve al pastor",
            ],
            apoyo: "Cada trimestre el equipo ora, mira los números, escucha, celebra, nombra un problema, pone una meta concreta con fecha y responsable, e informa al pastor",
            ref: "Lamentaciones 3:40",
            explica: "La reunión empieza delante de Dios, con oración; después se miran los números, se escucha y se celebra; se nombra un problema, se pone una meta concreta con fecha y responsable, y se informa al pastor.",
          },
          {
            consigna: "La sala de preescolares tiene un solo turno de maestros. Ordena lo que hace el equipo, del primer paso al último.",
            pasos: [
              "Pide a Dios que le muestre sus caminos",
              "Nombra el problema: un solo turno en preescolares",
              "Pone la meta: dos maestros más para marzo",
              "Envía un informe breve al pastor",
              "En la próxima reunión, revisa si se cumplió la meta",
            ],
            apoyo: "Paso 7, informar y revisar: se envía un informe breve al pastor, y en la próxima reunión se revisa la meta",
            explica: "El equipo empieza orando, nombra el problema, pone una meta concreta (dos maestros más para marzo), envía un informe breve al pastor y en la próxima reunión revisa la meta.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña la lección sobre las metas.",
            texto: "Una meta clara dice qué, para cuándo y quién, y pocas metas [[cumplidas]] valen más que muchas [[olvidadas]].",
            distractores: ["soñadas", "logradas"],
            errores: {
              "soñadas": "Valen más las metas cumplidas.",
              logradas: "Pocas metas cumplidas valen más que muchas olvidadas.",
            },
            apoyo: "Pocas metas cumplidas valen más que muchas olvidadas",
            explica: "Una meta clara dice qué, para cuándo y quién, y pocas metas cumplidas valen más que muchas olvidadas.",
          },
          {
            consigna: "Completa qué se hace con la meta al final de la reunión.",
            texto: "Al final de la reunión se envía un [[informe]] breve al [[pastor]], y en la próxima reunión se [[revisa]] la meta.",
            distractores: ["reclamo", "periódico", "olvida"],
            errores: {
              reclamo: "Se envía un informe breve al pastor.",
              "periódico": "El informe se le envía al pastor.",
              olvida: "En la próxima reunión se revisa la meta.",
            },
            apoyo: "Paso 7, informar y revisar: se envía un informe breve al pastor, y en la próxima reunión se revisa la meta",
            explica: "Al final se envía un informe breve al pastor, y en la próxima reunión se revisa la meta.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Cada trimestre el equipo ora, mira los números, escucha, celebra, nombra un problema, pone una meta concreta con fecha y responsable, e informa al pastor",
            ref: "Proverbios 15:22",
            titulo: "La reunión del trimestre",
            relato: [
              "Eres la coordinadora del ministerio de niños. Termina el trimestre y reúnes a tu equipo para evaluar.",
              "La asistencia subió, pero la sala de preescolares tiene un solo turno de maestros, y esos maestros casi nunca están en el culto.",
              "Una maestra propone poner diez metas nuevas para el próximo trimestre.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo empiezan la reunión?",
                opciones: [
                  { texto: "Orando, para pedir a Dios que les muestre sus caminos.", bien: true, explica: "La evaluación empieza delante de Dios: el equipo empieza pidiendo a Dios que le muestre sus caminos." },
                  { texto: "Buscando quién tiene la culpa de lo que salió mal.", explica: "Evaluar no es buscar culpables: es preguntar con humildad qué está dando fruto y qué hay que cambiar." },
                  { texto: "Mirando solo cuánto subió la asistencia este trimestre.", explica: "Los números ayudan a ver, pero la reunión empieza orando." },
                ],
                apoyo: "Paso 1, orar: el equipo empieza pidiendo a Dios que le muestre sus caminos",
                explica: "La evaluación empieza delante de Dios: «Escudriñemos nuestros caminos, y busquemos, y volvámonos a Jehová».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con la propuesta de las diez metas?",
                opciones: [
                  { texto: "Propongo pocas metas, que de verdad se puedan cumplir.", bien: true, explica: "Pocas metas cumplidas valen más que muchas olvidadas." },
                  { texto: "Acepto las diez, para que se vea que el equipo trabaja mucho.", explica: "Pocas metas cumplidas valen más que muchas olvidadas." },
                  { texto: "No pongo ninguna meta, para no comprometer a nadie del equipo.", explica: "Cada trimestre el equipo pone una meta concreta, con fecha y responsable." },
                ],
                apoyo: "Pocas metas cumplidas valen más que muchas olvidadas",
                explica: "Pocas metas cumplidas valen más que muchas olvidadas: cada trimestre se nombra un problema y se pone una meta concreta.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál de estas metas es clara?",
                opciones: [
                  { texto: "Para marzo, dos maestros más en preescolares; responsable, la coordinadora.", bien: true, explica: "Dice qué (dos maestros más), para cuándo (marzo) y quién (la coordinadora)." },
                  { texto: "Este año vamos a mejorar mucho la sala de preescolares, con la ayuda de Dios.", explica: "No dice qué se hará, ni para cuándo, ni quién: una meta clara dice qué, para cuándo y quién." },
                  { texto: "Alguien del equipo debería buscar más maestros para preescolares cuando pueda.", explica: "No dice para cuándo ni quién es el responsable." },
                ],
                apoyo: "Una meta clara dice qué, para cuándo y quién",
                explica: "La meta clara dice qué (dos maestros más), para cuándo (marzo) y quién (la coordinadora).",
              },
              {
                tipo: "explica",
                apoyo: "Paso 7, informar y revisar: se envía un informe breve al pastor, y en la próxima reunión se revisa la meta",
                clave: {
                  id: "pr-ninez-5-6-a6-1",
                  tipo: "corta",
                  pregunta: "Ya tienen la meta. ¿Qué harás con ella después de la reunión?",
                  ideas: [
                    { id: "informe", peso: 50, texto: "Enviar un informe breve al pastor.", formas: ["informe", "inform* al pastor", "(enviar|envio|enviare|mandar|mando|mandare|entregar|entrego|entregare) (un|el) (informe|reporte|resumen)", "al pastor", "reporte"] },
                    { id: "revisar", peso: 50, texto: "Revisar la meta en la próxima reunión.", formas: ["revis* la meta", "proxima reunion", "siguiente reunion", "si se cumplio", "si la cumplimos", "revisar*", "revisaremos"] },
                  ],
                  modelo: "Enviaré un informe breve al pastor con la meta: para marzo, dos maestros más en preescolares, con la coordinadora como responsable. Y en la próxima reunión revisaremos si se cumplió.",
                },
              },
            ],
          },
          {
            apoyo: "Se escucha a los maestros, a los padres y también a los niños",
            ref: "Lamentaciones 3:40",
            titulo: "Las familias nuevas no vuelven",
            relato: [
              "Eres el coordinador del ministerio de niños. En la reunión del trimestre, los números muestran que llegaron muchos niños nuevos, pero pocos volvieron.",
              "Un maestro dice: Seguro que es culpa de la maestra de los escolares.",
              "Todavía no han escuchado a nadie más.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al maestro?",
                opciones: [
                  { texto: "Que evaluar no es buscar culpables, sino ver qué hay que cambiar.", bien: true, explica: "Evaluar no es buscar culpables: es preguntar con humildad qué está dando fruto y qué hay que cambiar." },
                  { texto: "Que tiene razón, y que hablarás con esa maestra para que lo corrija.", explica: "Evaluar no es buscar culpables." },
                  { texto: "Que mejor no evalúen nada, para que nadie se sienta mal.", explica: "Un ministerio crece cuando se detiene a mirar cómo va." },
                ],
                apoyo: "Evaluar no es buscar culpables: es preguntar con humildad qué está dando fruto y qué hay que cambiar",
                explica: "Evaluar no es buscar culpables: es preguntar con humildad qué está dando fruto y qué hay que cambiar.",
              },
              {
                tipo: "situacion",
                pregunta: "Antes de nombrar el problema, ¿a quiénes escuchan?",
                opciones: [
                  { texto: "A los maestros, a los padres y también a los niños.", bien: true, explica: "Se escucha a los maestros, a los padres y también a los niños." },
                  { texto: "Solo al coordinador, que es el que conoce mejor los números.", explica: "La evaluación se hace con otros: se escucha a los maestros, a los padres y a los niños." },
                  { texto: "Solo a los maestros, porque los niños no saben opinar.", explica: "Se escucha a los maestros, a los padres y también a los niños." },
                ],
                apoyo: "Se escucha a los maestros, a los padres y también a los niños",
                explica: "La evaluación se hace con otros: «Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman».",
              },
              {
                tipo: "situacion",
                pregunta: "Al escuchar, descubren que nadie llamó a las familias nuevas en la semana. ¿Qué meta es clara?",
                opciones: [
                  { texto: "Para junio, llamar a cada familia nueva en su semana; responsable, Marta.", bien: true, explica: "Dice qué (llamar a cada familia nueva en su semana), para cuándo (junio) y quién (Marta)." },
                  { texto: "Desde ahora vamos a preocuparnos más por todas las familias nuevas.", explica: "No dice qué se hará, ni para cuándo, ni quién." },
                  { texto: "Alguien del equipo debería llamar a las familias nuevas cuando tenga tiempo.", explica: "No dice para cuándo ni quién es el responsable." },
                ],
                apoyo: "Una meta clara dice qué, para cuándo y quién",
                explica: "Una meta clara dice qué, para cuándo y quién.",
              },
              {
                tipo: "explica",
                apoyo: "Una meta clara dice qué, para cuándo y quién",
                clave: {
                  id: "pr-ninez-5-6-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe otra meta concreta para tu ministerio de niños, que diga qué, para cuándo y quién.",
                  ideas: [
                    { id: "que", peso: 34, texto: "Qué: algo concreto que se hará.", formas: ["llam*", "visit*", "busc*", "sum*", "capacit*", "cubr*", "invit*", "arm*", "prepar*", "consegu*", "agradec*", "orar", "revis*", "(un|una|dos|tres|cuatro|cinco|seis) (maestros|maestras|voluntarios|ayudantes|turnos|turno|sala|salas)"] },
                    { id: "cuando", peso: 33, texto: "Para cuándo: una fecha.", formas: ["para (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)", "(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)", "fin de (mes|ano|trimestre)", "este (mes|trimestre|ano)", "proximo (mes|trimestre|domingo)", "en (dos|tres|cuatro|seis) (semanas|meses)"] },
                    { id: "quien", peso: 33, texto: "Quién: el responsable.", formas: ["responsable", "encargad*", "a cargo", "coordinador*", "lider*"] },
                  ],
                  modelo: "Para mayo, sumar dos ayudantes a la sala de la cuna, con su selección completa. Responsable: el líder del grupo de la cuna.",
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
            apoyo: "También el ministerio de niños calcula lo que necesita antes de empezar",
            ref: "Lucas 14:28-30",
            clave: {
              id: "pr-ninez-5-6-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el ministerio de niños arma un presupuesto antes de empezar, y cómo administra lo que recibe?",
              ideas: [
                { id: "calcular", peso: 40, texto: "Como el que quiere edificar una torre, primero calcula los gastos: lo que necesita antes de empezar.", formas: ["calcul*", "torre", "lo que necesita", "cuanto necesita", "cuanto cuesta"] },
                { id: "fiel", peso: 30, texto: "Administra con fidelidad lo que recibe: de los administradores se requiere que sean hallados fieles.", formas: ["fiel", "fieles", "fidelidad", "hallado fiel", "hallados fieles"] },
                { id: "cuentas", peso: 30, texto: "El líder rinde cuentas de cómo usó el dinero.", formas: ["rend* cuentas", "rinde cuentas", "(dar|da|damos|dara|dare) cuentas", "como uso el dinero", "como se uso", "informa*", "transparen*"] },
              ],
              modelo: "Porque Jesús enseñó que el que quiere edificar una torre primero calcula los gastos: el ministerio calcula lo que necesita antes de empezar. Lo que recibe lo administra con fidelidad, y el líder rinde cuentas de cómo usó el dinero.",
            },
          },
          {
            apoyo: "La seguridad: la verificación de antecedentes, las etiquetas del registro y el botiquín",
            ref: "1 Corintios 4:2",
            clave: {
              id: "pr-ninez-5-6-a7-2",
              tipo: "corta",
              pregunta: "El tesorero pregunta por qué el ministerio de niños pide dinero para la seguridad y para los voluntarios. ¿Qué le explicas?",
              ideas: [
                { id: "seguridad", peso: 35, texto: "La seguridad necesita la verificación de antecedentes, las etiquetas del registro y el botiquín.", formas: ["antecedentes", "etiqueta*", "botiquin", "verificac*"] },
                { id: "voluntarios", peso: 35, texto: "Los voluntarios necesitan capacitación, y se les agradece.", formas: ["capacit*", "agradec*", "dar las gracias", "darles las gracias", "entrenar*"] },
                { id: "fiel", peso: 30, texto: "El dinero se administra con fidelidad, y el líder rinde cuentas de cómo lo usó.", formas: ["fiel", "fieles", "fidelidad", "rend* cuentas", "rinde cuentas", "(dar|da|damos|dara|dare) cuentas", "como (lo|se) (uso|usa|usara|usamos)", "informe"] },
              ],
              modelo: "Le explico que la seguridad necesita la verificación de antecedentes, las etiquetas del registro y el botiquín. Los voluntarios necesitan capacitación y un agradecimiento. Y el dinero se administra con fidelidad: el líder rinde cuentas de cómo lo usó.",
            },
          },
        ],
      },
    ],
  },
};
