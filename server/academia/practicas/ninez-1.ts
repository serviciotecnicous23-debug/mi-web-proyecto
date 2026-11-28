/**
 * Las prácticas de la materia `ninez-1` (especialidad «Niñez»). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/ninez-1.ts), con la guía de docs/academia-practicas.md.
 *
 * Las lecciones no marcan nada por confirmar. Los pasos de fe de los hijos (la presentación, la conversión y el
 * bautismo) se nombran solo como los nombra la lección 2, sin preguntar a qué edad ni de qué manera se bautiza: la edad
 * de la responsabilidad y el bautismo de los niños son de «El niño y su fe». La protección de los niños se practica solo
 * con lo que dice la lección 3 (recibir a un niño también es cuidarlo, y el amor por los niños va junto con su
 * protección), sin normas ni plazos que la lección no trae: son de «Protección de menores». Proverbios 22:6 va como lo
 * dice la lección: un principio de sabiduría, no una garantía automática. No se repiten las actividades de «Familia y
 * relaciones» (Nivel 2: el pasaje de Deuteronomio 6:7 y la crianza de Efesios 6:4), «Teología sistemática II» (Lucas
 * 2:52), «Libros poéticos y proféticos» (la madre de Proverbios 22:6) ni «Ordenanzas y ceremonias» (la presentación de
 * niños).
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_NINEZ_1: PracticasMateria = {
  materia: "ninez-1",
  mision: {
    titulo: "Contar a la generación que viene",
    intro:
      "Tu iglesia quiere renovar su ministerio de niños, y el pastor te pidió que prepares a los maestros y a los padres. Te van a preguntar por qué enseñar a los niños, cómo trabajan juntas la familia y la iglesia, cómo trató Jesús a los niños, qué enseñan los niños que sirvieron a Dios en la Biblia, cómo se enseñó a los niños en la historia y cuál es la meta del ministerio. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes ayudar a tu iglesia a ver a sus niños como discípulos de hoy: contarles las obras de Dios para que pongan en él su confianza, trabajar con sus familias sin reemplazarlas, recibirlos como Jesús, mostrarles al Dios que llama y usa a los pequeños, seguir la tarea que el pueblo de Dios ha cumplido por generaciones y formar discípulos que amen a Dios y al prójimo. «No las encubriremos a sus hijos, Contando a la generación venidera las alabanzas de Jehová, Y su potencia, y las maravillas que hizo».",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. ¿Por qué enseñar a los niños?
    "ninez-1-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué tarea tenía Israel de generación en generación?", reverso: "Contar a sus hijos las alabanzas de Jehová, su potencia y las maravillas que hizo.", apoyo: "Israel tenía una tarea de generación en generación" },
              { frente: "¿Para qué mandó Dios contar sus obras a la generación que viene?", reverso: "Para que ponga en él su confianza.", apoyo: "Dios mandó a su pueblo contar sus obras a la generación que viene, para que ponga en él su confianza" },
              { frente: "Enseñar a los niños, ¿es entretenerlos mientras los adultos están en el culto?", reverso: "No: es una de las tareas más importantes de la iglesia.", apoyo: "Enseñar a los niños no es entretenerlos mientras los adultos están en el culto: es una de las tareas más importantes de la iglesia" },
              { frente: "¿Cuándo conocieron a Cristo muchos cristianos?", reverso: "Cuando eran niños.", apoyo: "Muchos cristianos conocieron a Cristo cuando eran niños" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según Mateo 19:14, ¿a quiénes corrigió Jesús?", reverso: "A los discípulos que estorbaban a los niños.", apoyo: "Jesús corrigió a los discípulos que estorbaban a los niños" },
              { frente: "Para Jesús, ¿son los niños solo el futuro de la iglesia?", reverso: "No: ya son parte de ella.", apoyo: "Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella" },
              { frente: "¿Qué forma en el niño la educación cristiana?", reverso: "A toda la persona: lo que sabe, lo que siente y lo que hace.", apoyo: "Forma a toda la persona: lo que el niño sabe, lo que siente y lo que hace" },
              { frente: "¿Cuál es el primer paso de un buen ministerio de niños?", reverso: "Cambiar la mirada: ver a los niños como discípulos, no como una molestia.", apoyo: "El primer paso de un buen ministerio de niños es cambiar esa mirada" },
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
            consigna: "Israel no encubriría a sus hijos las obras de Dios. ¿Qué contaría a la generación venidera? Toca las palabras que lo dicen.",
            texto: "Contando a la generación venidera las [[alabanzas]] de Jehová, Y su [[potencia]], y las [[maravillas]] que hizo",
            apoyo: "Israel tenía una tarea de generación en generación: «No las encubriremos a sus hijos, Contando a la generación venidera las alabanzas de Jehová, Y su potencia, y las maravillas que hizo»",
            ref: "Salmos 78:4",
            explica: "Israel no encubría a sus hijos las obras de Dios: contaba a la generación venidera las alabanzas de Jehová, su potencia y las maravillas que hizo.",
          },
          {
            consigna: "¿Qué pondrían en Dios los hijos de Israel, y de qué no se olvidarían? Toca las dos palabras que lo dicen.",
            texto: "A fin de que pongan en Dios su [[confianza]], Y no se olviden de las [[obras]] de Dios",
            apoyo: "Y la meta era clara: «A fin de que pongan en Dios su confianza, Y no se olviden de las obras de Dios»",
            ref: "Salmos 78:7",
            explica: "La meta de contar las obras de Dios a los hijos era clara: que pusieran en Dios su confianza y no se olvidaran de sus obras.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Jesús y los niños: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús corrigió a los discípulos que estorbaban a los niños.", verdad: true, explica: "Les dijo: «Dejad a los niños venir a mí, y no se lo impidáis».", apoyo: "Jesús corrigió a los discípulos que estorbaban a los niños", ref: "Mateo 19:14" },
              { texto: "Jesús dijo que el reino de los cielos es de los adultos, y no de los niños.", verdad: false, explica: "Jesús dijo de los niños: «de los tales es el reino de los cielos».", apoyo: "Jesús recibió a los niños y dijo que de ellos es el reino", ref: "Mateo 19:14" },
              { texto: "Para Jesús, los niños ya son parte de la iglesia.", verdad: true, explica: "Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella.", apoyo: "Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella" },
            ],
          },
          {
            consigna: "Sobre el lugar de los niños en la iglesia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Para Jesús, los niños son solo el futuro de la iglesia.", verdad: false, explica: "Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella.", apoyo: "Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella" },
              { texto: "Jesús apoyó a los discípulos que no dejaban venir a los niños.", verdad: false, explica: "Jesús corrigió a los discípulos que estorbaban a los niños.", apoyo: "Jesús corrigió a los discípulos que estorbaban a los niños", ref: "Mateo 19:14" },
              { texto: "Los niños no son solo la iglesia de mañana: son discípulos de hoy.", verdad: true, explica: "Por eso el ministerio de niños los ve como discípulos de Jesús, no como una molestia durante el culto.", apoyo: "Los niños no son solo la iglesia de mañana: son discípulos de hoy" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El primer paso de un buen ministerio de niños es cambiar esa mirada",
            ref: "Mateo 19:14",
            situacion: "Eres maestro de niños en tu iglesia. Algunos hermanos se quejan de que los niños hacen ruido en el culto, y el pastor te pide ayuda para cambiar esa mirada.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano te dice: Los niños son una molestia en el culto; ya servirán a Dios cuando sean grandes.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que para Jesús los niños ya son parte de la iglesia: son discípulos de hoy.", valor: 2, explica: "Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella. Son discípulos de hoy.", siguiente: "e2" },
                  { texto: "Que tiene algo de razón, pero que hay que tenerles paciencia mientras crecen.", valor: 1, explica: "La paciencia ayuda, pero los niños no son solo la iglesia de mañana: son discípulos de hoy.", siguiente: "e2" },
                  { texto: "Que tiene razón: mientras sean niños, mejor que alguien los entretenga afuera.", valor: 0, explica: "Enseñar a los niños no es entretenerlos mientras los adultos están en el culto: es una de las tareas más importantes de la iglesia.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Esa semana, una niña quiere contarte algo que aprendió de Jesús, y otro maestro le dice que no moleste.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La escuchas con calma: Jesús corrigió a los que estorbaban a los niños.", valor: 2, explica: "Jesús corrigió a los discípulos que estorbaban a los niños: «Dejad a los niños venir a mí, y no se lo impidáis».", siguiente: "e2" },
                  { texto: "Le dices que el maestro tiene razón, y que te lo cuente cuando sea grande.", valor: 0, explica: "Jesús corrigió a los discípulos que estorbaban a los niños: para él, ya son parte de la iglesia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El pastor te pide que expliques a la iglesia qué hace el ministerio de niños durante el culto.",
                pregunta: "¿Qué dices?",
                opciones: [
                  { texto: "Que ayuda a los niños a conocer a Dios, a amarlo y a seguir a Jesús.", valor: 2, explica: "Eso es la educación cristiana de la niñez: ayudar a los niños a conocer a Dios, a amarlo y a seguir a Jesús, según su edad." },
                  { texto: "Que los cuida con cariño para que los padres puedan oír el sermón tranquilos.", valor: 1, explica: "Cuidarlos está bien, pero la educación cristiana no es solo entretener ni cuidar: es discipular." },
                  { texto: "Que los entretiene con juegos y películas para que no molesten a nadie.", valor: 0, explica: "Enseñar a los niños no es entretenerlos mientras los adultos están en el culto." },
                ],
              },
              {
                id: "e3",
                narra: "Para terminar, preparas un cartel para la puerta del salón de los niños.",
                pregunta: "¿Qué frase escoges?",
                opciones: [
                  { texto: "Los niños no son solo la iglesia de mañana: son discípulos de hoy.", valor: 2, explica: "Así lo dice la lección: los niños no son solo la iglesia de mañana: son discípulos de hoy." },
                  { texto: "Los niños de hoy serán los líderes que la iglesia necesitará mañana.", valor: 1, explica: "Es verdad que crecerán, pero para Jesús los niños no son solo el futuro de la iglesia: ya son parte de ella." },
                  { texto: "Aquí cuidamos a sus hijos para que el culto no tenga interrupciones.", valor: 0, explica: "El ministerio de niños no es solo cuidar: es discipular, y los niños ya son parte de la iglesia." },
                ],
              },
            ],
          },
          {
            apoyo: "Jesús recibió a los niños y dijo que de ellos es el reino",
            ref: "Mateo 19:14",
            situacion: "Vas a empezar un ministerio de niños en una iglesia pequeña. Antes de planear nada, quieres ver cómo trata la iglesia a sus niños.",
            escenas: [
              {
                id: "e1",
                narra: "En el culto, unos niños se acercan al frente para ver de cerca, y un ujier los regaña delante de todos.",
                pregunta: "¿Qué piensas de lo que pasó?",
                opciones: [
                  { texto: "Que Jesús corrigió a los que estorbaban a los niños que venían a él.", valor: 2, explica: "Jesús corrigió a los discípulos que estorbaban a los niños: «Dejad a los niños venir a mí, y no se lo impidáis».", siguiente: "e2" },
                  { texto: "Que el ujier pudo hablarles con calma y mostrarles dónde sentarse.", valor: 1, explica: "Hablarles con calma es mejor, pero Jesús no estorbaba a los niños que venían a él: los recibía.", siguiente: "e2" },
                  { texto: "Que hizo bien: en el culto, los niños no deben andar a la vista de todos.", valor: 0, explica: "Jesús corrigió a los discípulos que estorbaban a los niños, y dijo que de ellos es el reino de los cielos.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Los niños vuelven a su lugar con miedo, y uno dice que ya no quiere venir al culto.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Hablas con él con cariño y le dices que Jesús recibe a los niños.", valor: 2, explica: "Jesús recibió a los niños y dijo que de ellos es el reino.", siguiente: "e2" },
                  { texto: "Le dices que es mejor así: el culto de verdad es para los grandes.", valor: 0, explica: "Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un líder te dice: Primero trabajemos con los adultos; los niños son el futuro y ya habrá tiempo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que los niños ya son parte de la iglesia, no solo su futuro.", valor: 2, explica: "Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella." },
                  { texto: "Que se puede empezar con los adultos, si no se olvida a los niños.", valor: 1, explica: "No olvidarlos está bien, pero los niños no son solo la iglesia de mañana: son discípulos de hoy." },
                  { texto: "Que tiene razón: con los niños se puede esperar hasta que sean grandes.", valor: 0, explica: "Los niños no son solo la iglesia de mañana: son discípulos de hoy." },
                ],
              },
              {
                id: "e3",
                narra: "La iglesia acepta empezar el ministerio, y te preguntan cuál es el primer paso.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Cambiar la mirada: ver a los niños como discípulos de Jesús.", valor: 2, explica: "El primer paso de un buen ministerio de niños es cambiar esa mirada: verlos como discípulos de Jesús, no como una molestia." },
                  { texto: "Comprar materiales nuevos y decorar bien el salón de los niños.", valor: 1, explica: "Los materiales ayudan, pero el primer paso de un buen ministerio de niños es cambiar la mirada." },
                  { texto: "Buscar a alguien que los entretenga durante todo el culto.", valor: 0, explica: "Enseñar a los niños no es entretenerlos: es una de las tareas más importantes de la iglesia." },
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
            consigna: "Completa qué es la educación cristiana de la niñez.",
            texto: "La educación cristiana de la niñez es ayudar a los niños a [[conocer]] a Dios, a [[amarlo]] y a seguir a Jesús, según su [[edad]].",
            distractores: ["olvidar", "evitarlo", "capricho"],
            errores: {
              olvidar: "La educación cristiana ayuda a los niños a conocer a Dios.",
              evitarlo: "Ayuda a los niños a amar a Dios y a seguir a Jesús.",
              capricho: "Se enseña según la edad de cada niño.",
            },
            apoyo: "Es ayudar a los niños a conocer a Dios, a amarlo y a seguir a Jesús, según su edad",
            explica: "La educación cristiana de la niñez ayuda a los niños a conocer a Dios, a amarlo y a seguir a Jesús, según su edad: no es solo entretener ni cuidar, es discipular.",
          },
          {
            consigna: "Completa cómo forma la educación cristiana al niño y dónde se vive.",
            texto: "La educación cristiana forma a toda la [[persona]]: lo que el niño sabe, lo que [[siente]] y lo que hace, y se vive en la [[casa]] y en la iglesia.",
            distractores: ["semana", "olvida", "calle"],
            errores: {
              semana: "La educación cristiana forma a toda la persona.",
              olvida: "Forma lo que el niño sabe, lo que siente y lo que hace.",
              calle: "Se vive en la casa y en la iglesia, que trabajan juntas.",
            },
            apoyo: "Forma a toda la persona: lo que el niño sabe, lo que siente y lo que hace",
            explica: "La educación cristiana forma a toda la persona, lo que el niño sabe, lo que siente y lo que hace, y se vive en la casa y en la iglesia, que trabajan juntas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es educación cristiana de la niñez o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Es educación cristiana", "No es educación cristiana"],
            frases: [
              { texto: "Ayudar a los niños a conocer a Dios y a amarlo", grupo: 0 },
              { texto: "Enseñar a los niños a seguir a Jesús, según su edad", grupo: 0 },
              { texto: "Formar lo que el niño sabe, lo que siente y lo que hace", grupo: 0 },
              { texto: "Enseñar en la casa y en la iglesia, que trabajan juntas", grupo: 0 },
              { texto: "Solo entretener a los niños durante el culto", grupo: 1 },
              { texto: "Solo cuidar a los niños mientras los adultos están en el culto", grupo: 1 },
              { texto: "Formar solo lo que el niño sabe, sin lo que siente ni hace", grupo: 1, explica: "La educación cristiana forma a toda la persona: lo que el niño sabe, lo que siente y lo que hace." },
            ],
            apoyo: "No es solo entretener ni cuidar: es discipular",
            explica: "La educación cristiana ayuda a los niños a conocer a Dios, a amarlo y a seguir a Jesús según su edad, y forma a toda la persona. No es solo entretener ni cuidar: es discipular.",
          },
          {
            consigna: "¿Es discipular a los niños o es solo entretenerlos y cuidarlos? Lleva cada frase a su grupo.",
            grupos: ["Es discipular", "Es solo entretener o cuidar"],
            frases: [
              { texto: "Contar una historia de la Biblia y orar con los niños", grupo: 0 },
              { texto: "Enseñar a los niños a amar a Dios con palabras de su edad", grupo: 0 },
              { texto: "Mostrar a los niños cómo seguir a Jesús en lo que hacen", grupo: 0 },
              { texto: "Poner una película para que no molesten en el culto", grupo: 1 },
              { texto: "Cuidar a los niños durante el culto, y nada más", grupo: 1 },
              { texto: "Dejar a los niños jugar toda la hora para que no se aburran", grupo: 1 },
            ],
            apoyo: "Es ayudar a los niños a conocer a Dios, a amarlo y a seguir a Jesús, según su edad",
            explica: "Discipular es ayudar a los niños a conocer a Dios, a amarlo y a seguir a Jesús, según su edad. Entretenerlos o cuidarlos, y nada más, no es educación cristiana.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios mandó a su pueblo contar sus obras a la generación que viene, para que ponga en él su confianza",
            ref: "Salmos 78:4-7",
            clave: {
              id: "pr-ninez-1-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué mandó Dios a su pueblo sobre la generación que viene, y para qué?",
              ideas: [
                { id: "contar", peso: 50, texto: "Que le contara sus obras: sus alabanzas, su potencia y sus maravillas.", formas: ["cont* (sus|las) (obras|maravillas|alabanzas)", "cont* (a|sus|les) (hijos|ninos|nietos|generacion)", "las obras", "sus obras", "sus maravillas", "las maravillas", "su potencia", "las alabanzas", "no (las|lo|se) encubr*", "ensen* la fe", "transmit* la fe"] },
                { id: "confianza", peso: 50, texto: "Para que ponga en Dios su confianza y no se olvide de sus obras.", formas: ["confianza", "confi*", "no (se|las|lo|nos) olvid*", "nunca (se|las|lo|nos) olvid*", "recuerd*", "record*", "(crea|crean|creyera|creyeran|creer) en (dios|el)"] },
              ],
              modelo: "Dios mandó a su pueblo contar sus obras a la generación que viene: sus alabanzas, su potencia y sus maravillas. Lo mandó para que ponga en él su confianza y no se olvide de sus obras.",
            },
          },
          {
            apoyo: "La fe se enseñaba en la vida diaria",
            ref: "Deuteronomio 6:6-7",
            clave: {
              id: "pr-ninez-1-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que enseñar a los niños es solo entretenerlos durante el culto. ¿Qué le respondes con Salmos 78 y Deuteronomio 6?",
              ideas: [
                { id: "mandato", peso: 50, texto: "Que Dios mandó contar sus obras a la generación que viene, para que ponga en él su confianza.", formas: ["cont* (sus|las|a|de) (obras|maravillas|alabanzas|hijos|generacion|ninos)", "las obras de dios", "sus obras", "sus maravillas", "generacion que viene", "generacion venidera", "de generacion en generacion", "confianza", "confi*", "no (se|las|lo) olvid*"] },
                { id: "diaria", peso: 50, texto: "Que en Israel la fe se enseñaba en la vida diaria: en la casa, en el camino, al acostarse y al levantarse.", formas: ["vida diaria", "vida cotidiana", "cada dia", "todos los dias", "dia a dia", "en (la|su|tu) casa", "en el camino", "por el camino", "acostar*", "levant*", "sobre (el|tu|su) corazon"] },
              ],
              errores: [
                { id: "entretener", texto: "Enseñar a los niños no es entretenerlos: es una de las tareas más importantes de la iglesia.", formas: ["tiene razon", "(es|sea) solo entreten*", "basta con entreten*"], anula: "mandato" },
                { id: "entretener-casa", texto: "En Israel, la fe se enseñaba a los hijos en la vida diaria.", formas: ["tiene razon", "(es|sea) solo entreten*", "basta con entreten*"], anula: "diaria" },
              ],
              modelo: "Le respondo que no es solo entretenerlos. Dios mandó contar sus obras a la generación que viene, para que ponga en él su confianza. Y en Israel la fe se enseñaba en la vida diaria: en la casa y por el camino.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La familia y la iglesia, juntas
    "ninez-1-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde recibió Timoteo la fe?", reverso: "En su casa, de su abuela Loida y de su madre Eunice.", apoyo: "Timoteo recibió la fe en su casa" },
              { frente: "¿Desde cuándo conoció Timoteo las Escrituras?", reverso: "Desde la niñez.", apoyo: "desde la niñez conoció las Escrituras" },
              { frente: "¿Qué les pide a los padres Efesios 6:4?", reverso: "Criar a sus hijos en disciplina y amonestación del Señor.", apoyo: "La Biblia pone la tarea primero en los padres: «criadlos en disciplina y amonestación del Señor»" },
              { frente: "¿Qué hace la iglesia con la familia, en vez de reemplazarla?", reverso: "La equipa y la acompaña.", apoyo: "La iglesia no reemplaza a la familia: la equipa y la acompaña" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué fueron Loida y Eunice para Timoteo?", reverso: "Sus primeras maestras de la fe.", apoyo: "Una abuela y una madre fueron sus primeras maestras" },
              { frente: "¿Qué da lo que se siembra en la niñez?", reverso: "Fruto toda la vida.", apoyo: "Lo que se siembra en la niñez da fruto toda la vida" },
              { frente: "¿Con quién pasa un niño muchas más horas que en la iglesia?", reverso: "Con su familia.", apoyo: "Un niño pasa con su familia muchas más horas que en la iglesia" },
              { frente: "¿Cuál es el ministerio de niños más fuerte?", reverso: "El que trabaja con los padres.", apoyo: "el ministerio de niños más fuerte es el que trabaja con los padres" },
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
            consigna: "Pablo le recuerda a Timoteo en quiénes habitó primero su fe. ¿En quiénes? Toca las palabras que lo dicen.",
            texto: "la fe no fingida que hay en ti, la cual habitó primero en tu [[abuela Loida]], y en tu [[madre Eunice]]",
            apoyo: "Timoteo recibió la fe en su casa",
            ref: "2 Timoteo 1:5",
            explica: "La fe de Timoteo habitó primero en su abuela Loida y en su madre Eunice: una abuela y una madre fueron sus primeras maestras.",
          },
          {
            consigna: "¿Desde cuándo había sabido Timoteo las Sagradas Escrituras? Toca las palabras que lo dicen.",
            texto: "que [[desde la niñez]] has sabido las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvación",
            apoyo: "Lo que se siembra en la niñez da fruto toda la vida",
            ref: "2 Timoteo 3:15",
            explica: "Timoteo había sabido las Sagradas Escrituras desde la niñez: lo que se siembra en la niñez da fruto toda la vida.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa en quiénes pone la Biblia la tarea, y qué hace la iglesia.",
            texto: "La Biblia pone la tarea primero en los [[padres]], y la iglesia los [[equipa]] y los acompaña sin reemplazarlos.",
            distractores: ["pastores", "ignora"],
            errores: {
              pastores: "La Biblia pone la tarea primero en los padres: «criadlos en disciplina y amonestación del Señor».",
              ignora: "La iglesia no reemplaza a la familia: la equipa y la acompaña.",
            },
            apoyo: "La Biblia pone la tarea primero en los padres",
            ref: "Efesios 6:4",
            explica: "La Biblia pone la tarea primero en los padres. La iglesia no reemplaza a la familia: la equipa y la acompaña.",
          },
          {
            consigna: "Completa por qué el ministerio de niños trabaja con los padres.",
            texto: "Un niño pasa con su [[familia]] muchas más horas que en la iglesia: por eso el ministerio de niños más [[fuerte]] es el que trabaja con los padres.",
            distractores: ["pastor", "débil"],
            errores: {
              pastor: "Un niño pasa con su familia muchas más horas que en la iglesia.",
              "débil": "El ministerio de niños más fuerte es el que trabaja con los padres.",
            },
            apoyo: "Por eso el ministerio de niños más fuerte es el que trabaja con los padres",
            explica: "La iglesia tiene a los niños una hora; la familia, toda la semana. Por eso el ministerio de niños más fuerte es el que trabaja con los padres.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una madre de tu clase te dice: Yo no sé mucho de la Biblia; para eso traigo a mis hijos, para que ustedes les enseñen la fe.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la iglesia la ayudará a enseñarles en casa, sin reemplazarla.", bien: true, explica: "La iglesia no reemplaza a la familia: la equipa y la acompaña, y enseña a los padres a hablar de Dios con sus hijos." },
              { texto: "Que no se preocupe: la iglesia se encarga de toda la fe de sus hijos.", explica: "La Biblia pone la tarea primero en los padres; la iglesia no reemplaza a la familia." },
              { texto: "Que primero aprenda ella la Biblia, y que después traiga a sus hijos.", explica: "La iglesia acompaña a los padres desde ahora: les enseña a orar, a leer la Biblia y a hablar de Dios con sus hijos." },
              { texto: "Que entonces deje a los niños en casa hasta que ella sepa más.", explica: "La iglesia recibe a los niños y equipa a los padres para enseñar la fe en casa." },
            ],
            apoyo: "Enseñarles a orar, a leer la Biblia y a hablar de Dios con sus hijos en la vida diaria",
            ref: "Efesios 6:4",
            explica: "La Biblia pone la tarea primero en los padres, y la iglesia los equipa y los acompaña: les enseña a orar, a leer la Biblia y a hablar de Dios con sus hijos.",
          },
          {
            caso: "Un maestro nuevo te dice: Con la hora del domingo basta; lo que pase en las casas no es asunto del ministerio de niños.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la familia los tiene toda la semana, y la iglesia la equipa.", bien: true, explica: "La iglesia tiene a los niños una hora; la familia, toda la semana: por eso el ministerio de niños trabaja con los padres." },
              { texto: "Que tiene razón: la fe de los niños se forma solo en la iglesia.", explica: "Timoteo recibió la fe en su casa: los padres son los primeros maestros de la fe." },
              { texto: "Que alarguen la clase del domingo, para que no haga falta nada más.", explica: "La iglesia no reemplaza a la familia: la equipa y la acompaña." },
              { texto: "Que sí: si los padres no vienen al culto, su casa no es asunto nuestro.", explica: "A los niños que llegan sin sus padres se los trata con un cuidado especial, y se busca alcanzar también a su familia." },
            ],
            apoyo: "La iglesia tiene a los niños una hora; la familia, toda la semana",
            explica: "Un niño pasa con su familia muchas más horas que en la iglesia: por eso el ministerio de niños más fuerte es el que trabaja con los padres.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada situación con lo que hace la iglesia para trabajar con los padres.",
            pares: [
              ["Al terminar la clase del domingo", "Les cuenta a los padres qué aprendieron sus hijos"],
              ["Unos padres que no saben orar con sus hijos", "Les enseña a orar y a hablar de Dios en casa"],
              ["Un niño acaba de recibir a Cristo", "Celebra con sus padres ese paso de fe"],
              ["Un niño cuyos padres no creen", "Lo acompaña con especial cuidado"],
              ["Unos padres que quieren ayudar", "Los invita a servir en el ministerio de niños"],
            ],
            apoyo: "Invitar a los padres a servir en el ministerio de niños",
            explica: "La iglesia les cuenta a los padres qué aprendieron sus hijos, les enseña a orar y a hablar de Dios en casa, celebra con ellos los pasos de fe, acompaña con especial cuidado a los niños cuyos padres no creen e invita a los padres a servir.",
          },
          {
            consigna: "Une cada forma de trabajar con los padres con un ejemplo de lo que se puede hacer.",
            pares: [
              ["Contarles lo que aprenden sus hijos", "Un mensaje cada semana con el tema de la clase"],
              ["Darles algo para hacer en casa", "Una pregunta para conversar en familia"],
              ["Celebrar los pasos de fe", "Llamar a los padres cuando su hijo recibe a Cristo"],
              ["Acompañar a las familias distintas", "Visitar a unos abuelos que crían a sus nietos"],
              ["Invitarlos a servir", "Pedirle a un padre que ayude en la clase"],
            ],
            apoyo: "Contarles cada semana qué aprendieron sus hijos y darles una pregunta o una actividad para la casa",
            explica: "Se les cuenta cada semana qué aprendieron sus hijos y se les da una pregunta o una actividad para la casa; se celebran los pasos de fe; se acompaña con especial cuidado a las familias distintas y se invita a los padres a servir.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La iglesia tiene a los niños una hora; la familia, toda la semana",
            ref: "Efesios 6:4",
            titulo: "Un plan con las familias",
            relato: [
              "Te pidieron coordinar el ministerio de niños de tu iglesia. Hay quince niños: la mayoría viene con sus padres, pero tres llegan en el transporte de la iglesia.",
              "El pastor te pide un plan para este año, con una condición: que el ministerio no trabaje solo, sino con las familias.",
              "Antes de escribirlo, repasas lo que enseña la Biblia sobre los padres y la iglesia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué pones en el plan para cada domingo, al terminar la clase?",
                opciones: [
                  { texto: "Contar a los padres qué aprendieron y darles una pregunta para la casa.", bien: true, explica: "Es una de las formas de trabajar con los padres: contarles cada semana qué aprendieron sus hijos y darles una pregunta o una actividad para la casa." },
                  { texto: "Entregar a los niños a la salida, sin quitarles tiempo a los padres.", explica: "El ministerio de niños más fuerte es el que trabaja con los padres: se les cuenta qué aprendieron sus hijos." },
                  { texto: "Dar a los niños más tareas, para que los padres no tengan que hacer nada.", explica: "La iglesia no reemplaza a la familia: la equipa y la acompaña." },
                ],
                apoyo: "Contarles cada semana qué aprendieron sus hijos y darles una pregunta o una actividad para la casa",
                explica: "La iglesia tiene a los niños una hora; la familia, toda la semana: por eso cada domingo se les cuenta a los padres lo que aprendieron sus hijos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con los tres niños que llegan en el transporte, sin sus padres?",
                opciones: [
                  { texto: "Los cuidas de manera especial y buscas cómo alcanzar a su familia.", bien: true, explica: "Para ellos, la iglesia es la única familia en la fe que tienen: se los trata con un cuidado especial y se busca alcanzar también a su familia." },
                  { texto: "Los tratas como a todos, porque su familia no es asunto de la iglesia.", explica: "A los niños que llegan sin sus padres se los trata con un cuidado especial, y se busca la manera de alcanzar también a su familia." },
                  { texto: "Pides que el transporte ya no los traiga hasta que vengan sus padres.", explica: "Para esos niños, la iglesia es la única familia en la fe que tienen." },
                ],
                apoyo: "Para ellos, la iglesia es la única familia en la fe que tienen",
                explica: "Muchos niños llegan a la iglesia sin sus padres: se los trata con un cuidado especial y se busca la manera de alcanzar también a su familia.",
              },
              {
                tipo: "situacion",
                pregunta: "En la reunión de padres, uno dice: Para eso está la iglesia; enseñar la fe no es tarea nuestra. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que la Biblia pone la tarea primero en los padres, y la iglesia los ayuda.", bien: true, explica: "La Biblia pone la tarea primero en los padres, y la iglesia los equipa y los acompaña sin reemplazarlos." },
                  { texto: "Que tiene razón: la iglesia se encarga de toda la fe de sus hijos.", explica: "La iglesia no reemplaza a la familia: la equipa y la acompaña." },
                  { texto: "Que entonces sus hijos ya no podrán seguir viniendo al ministerio de niños.", explica: "La iglesia no rechaza a los niños: equipa y acompaña a sus padres para que enseñen la fe en casa." },
                ],
                apoyo: "La Biblia pone la tarea primero en los padres",
                explica: "La Biblia pone la tarea primero en los padres: «criadlos en disciplina y amonestación del Señor». La iglesia no los reemplaza: los equipa y los acompaña.",
              },
              {
                tipo: "explica",
                apoyo: "Contarles cada semana qué aprendieron sus hijos y darles una pregunta o una actividad para la casa",
                clave: {
                  id: "pr-ninez-1-2-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe en tu plan qué harás cada semana con los padres y qué harás con los niños que llegan sin ellos.",
                  ideas: [
                    { id: "semana", peso: 50, texto: "Cada semana, contarles qué aprendieron sus hijos y darles una pregunta o una actividad para la casa.", formas: ["que aprendieron", "lo que aprend*", "que (aprenden|aprendio)", "una pregunta", "una actividad", "para la casa", "para (hacer|conversar|hablar) en (casa|familia)", "contarles", "les (cont*|dire|diremos|dare|daremos|envi*|mand*)"] },
                    { id: "solos", peso: 50, texto: "A los que llegan sin sus padres, cuidarlos de manera especial y buscar cómo alcanzar a su familia.", formas: ["cuidado especial", "especial cuidado", "manera especial", "forma especial", "atencion especial", "cuid* (de|con) (manera|forma|mucho|especial)", "alcanz* (a|tambien) (su|sus|la)", "alcanz* (su|sus|la) familia", "busc* (a|su|sus) (familia|padres)", "visit* (a|su|sus) (familia|padres|casa)"] },
                  ],
                  modelo: "Cada semana les contaré a los padres qué aprendieron sus hijos y les daré una pregunta o una actividad para la casa. A los niños que llegan sin sus padres los cuidaré de manera especial y buscaré alcanzar a su familia.",
                },
              },
            ],
          },
          {
            apoyo: "Invitar a los padres a servir en el ministerio de niños",
            ref: "2 Timoteo 1:5",
            titulo: "La reunión de padres",
            relato: [
              "Eres maestro de los niños de 9 a 11 años. El ministerio prepara la primera reunión del año con los padres, y te piden dirigirla.",
              "Entre las familias hay unos padres que no creen, una madre sola y unos abuelos que crían a su nieto.",
              "Quieres que todos salgan de la reunión sabiendo que no están solos para enseñar la fe en casa.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Con qué idea abres la reunión?",
                opciones: [
                  { texto: "Ustedes son los primeros maestros de la fe, y la iglesia los acompaña.", bien: true, explica: "Los padres son los primeros maestros de la fe, como lo fueron la abuela y la madre de Timoteo; la iglesia los equipa y los acompaña." },
                  { texto: "La iglesia se encarga de la fe de sus hijos, y ustedes no tienen que hacer nada.", explica: "La Biblia pone la tarea primero en los padres: la iglesia no reemplaza a la familia." },
                  { texto: "Si ustedes no saben enseñar la fe, mejor que lo haga solo la iglesia.", explica: "La iglesia no reemplaza a los padres: los equipa y les enseña a hablar de Dios con sus hijos." },
                ],
                apoyo: "Los padres son los primeros maestros de la fe",
                explica: "Los padres son los primeros maestros de la fe, y la iglesia los equipa y los acompaña sin reemplazarlos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué les ofreces para la vida diaria en casa?",
                opciones: [
                  { texto: "Enseñarles a orar, a leer la Biblia y a hablar de Dios con sus hijos.", bien: true, explica: "Es una de las formas de trabajar con los padres: enseñarles a orar, a leer la Biblia y a hablar de Dios con sus hijos en la vida diaria." },
                  { texto: "Un video para que los niños lo vean solos, sin que nadie hable con ellos.", explica: "La iglesia enseña a los padres a hablar de Dios con sus hijos en la vida diaria." },
                  { texto: "Nada: lo que pasa en la casa ya no le toca a la iglesia ni al maestro.", explica: "El ministerio de niños más fuerte es el que trabaja con los padres." },
                ],
                apoyo: "Enseñarles a orar, a leer la Biblia y a hablar de Dios con sus hijos en la vida diaria",
                explica: "La iglesia les enseña a los padres a orar, a leer la Biblia y a hablar de Dios con sus hijos en la vida diaria.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con los abuelos y con la madre sola?",
                opciones: [
                  { texto: "Los acompañas con especial cuidado y les ofreces la ayuda de la iglesia.", bien: true, explica: "La iglesia acompaña con especial cuidado a las madres y los padres solos y a los abuelos que crían a sus nietos." },
                  { texto: "Les dices que, como su familia es distinta, mejor no vengan a las reuniones.", explica: "Las familias distintas se acompañan con especial cuidado: no se dejan de lado." },
                  { texto: "Los tratas igual que a todos, sin preguntarles cómo están ni qué necesitan.", explica: "La iglesia acompaña con especial cuidado a las madres solas y a los abuelos que crían a sus nietos." },
                ],
                apoyo: "Acompañar con especial cuidado a los niños cuyos padres no creen, a las madres y los padres solos y a los abuelos que crían a sus nietos",
                explica: "La iglesia cuida a los niños que llegan solos y a las familias distintas: los acompaña con especial cuidado.",
              },
              {
                tipo: "explica",
                apoyo: "Invitar a los padres a servir en el ministerio de niños",
                clave: {
                  id: "pr-ninez-1-2-a6-2",
                  tipo: "corta",
                  pregunta: "Un padre te pregunta cómo puede ayudar en el ministerio y qué puede hacer en casa con su hijo. ¿Qué le respondes?",
                  ideas: [
                    { id: "servir", peso: 50, texto: "Que puede servir en el ministerio de niños: la iglesia invita a los padres a servir.", formas: ["serv* (en|con) (el|la|los) (ministerio|clase|ninos)", "sirv* (en|con) (el|la|los) (ministerio|clase|ninos)", "ayud* en (el|la) (ministerio|clase)", "invit* a servir", "(puede|puedes|podria|podrias) servir", "a servir"] },
                    { id: "casa", peso: 50, texto: "Que en casa puede orar, leer la Biblia y hablar de Dios con su hijo en la vida diaria.", formas: ["orar (con|juntos|en)", "ore (con|junto|en)", "oren (con|juntos|en)", "leer la biblia", "lea la biblia", "lean la biblia", "hablar de dios", "hable de dios", "hables de dios", "hablen de dios", "hablarle de dios", "vida diaria", "cada dia", "todos los dias"] },
                  ],
                  modelo: "Le respondo que puede servir en el ministerio de niños, porque la iglesia invita a los padres a servir. Y que en casa puede orar, leer la Biblia y hablar de Dios con su hijo en la vida diaria.",
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
            apoyo: "Los padres son los primeros maestros de la fe",
            ref: "2 Timoteo 1:5",
            clave: {
              id: "pr-ninez-1-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué se dice que los padres son los primeros maestros de la fe? Usa el ejemplo de Timoteo.",
              ideas: [
                { id: "timoteo", peso: 50, texto: "Timoteo recibió la fe en su casa, de su abuela Loida y de su madre Eunice, y desde la niñez conoció las Escrituras.", formas: ["loida", "eunice", "(su|una|tu) abuela", "(su|una|tu) madre", "en su casa", "desde (la|su) ninez", "desde (nino|pequeno|chico)"] },
                { id: "padres", peso: 50, texto: "La Biblia pone la tarea primero en los padres, y la iglesia los equipa sin reemplazarlos.", formas: ["primero en los padres", "(tarea|responsabilidad) (de|a|en) (los|sus) padres", "criadlos", "criar* en disciplina", "disciplina y amonestacion", "efesios 6", "(pasa|pasan) (mas|muchas) horas", "toda la semana", "(la|lo|los|les|le) (equipa|equipan|equipara)", "(equipar|equiparlos|equiparlo|equiparla)", "no (la|los|lo) reemplaz*", "sin reemplaz*"] },
              ],
              errores: [
                { id: "iglesia", texto: "La Biblia pone la tarea primero en los padres; la iglesia no reemplaza a la familia.", formas: ["iglesia (los|la|les|lo) (reemplaza|reemplazan)", "iglesia (reemplaza|reemplazan)", "(reemplaza|reemplazan) a (la|los) (familia|padres)", "(es|sea) (tarea|trabajo) de la iglesia"], anula: "padres" },
              ],
              modelo: "Porque Timoteo recibió la fe en su casa: habitó primero en su abuela Loida y en su madre Eunice, y desde la niñez conoció las Escrituras. Además, la Biblia pone la tarea primero en los padres, y la iglesia los equipa sin reemplazarlos.",
            },
          },
          {
            apoyo: "La Biblia pone la tarea primero en los padres: «criadlos en disciplina y amonestación del Señor»",
            ref: "Efesios 6:4",
            clave: {
              id: "pr-ninez-1-2-a7-2",
              tipo: "corta",
              pregunta: "Un padre te dice que enseñar la fe a sus hijos es trabajo de la iglesia. ¿Qué le explicas?",
              ideas: [
                { id: "tarea", peso: 50, texto: "Que la Biblia pone la tarea primero en los padres: criadlos en disciplina y amonestación del Señor.", formas: ["primero en los padres", "(tarea|responsabilidad) (de|a|en) (los|sus) padres", "criadlos", "criar* en disciplina", "disciplina y amonestacion", "efesios 6", "primeros maestros", "primer maestro"] },
                { id: "equipa", peso: 50, texto: "Que la iglesia no reemplaza a la familia: la equipa y la acompaña.", formas: ["(la|lo|los|les|le) (equipa|equipan|equipara)", "(equipar|equiparlos|equiparlo|equiparla)", "acompan*", "no (la|los|lo|le|les) reemplaz*", "sin reemplaz*", "(le|les|lo|los) ayud* a ensenar", "(le|les) ensen* a (orar|hablar|leer)"] },
              ],
              errores: [
                { id: "iglesia", texto: "La iglesia no reemplaza a la familia: la equipa y la acompaña.", formas: ["iglesia (los|la|les|lo) (reemplaza|reemplazan)", "iglesia (reemplaza|reemplazan)", "(reemplaza|reemplazan) a (la|los) (familia|padres)", "(es|sea) (trabajo|tarea) de la iglesia", "tiene razon"], anula: "tarea" },
              ],
              modelo: "Le explico que la Biblia pone la tarea primero en los padres: criadlos en disciplina y amonestación del Señor. La iglesia no reemplaza a la familia: la equipa y la acompaña para enseñar la fe en casa.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Jesús y los niños
    "ninez-1-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Jesús cuando los discípulos discutían quién era el mayor?", reverso: "Llamó a un niño y lo puso en medio de ellos.", apoyo: "Jesús llamó a un niño y «lo puso en medio de ellos»" },
              { frente: "¿Cómo reaccionó Jesús cuando reprendieron a los que traían niños?", reverso: "Se indignó.", apoyo: "Cuando los discípulos reprendieron a los que traían niños, Jesús «se indignó»" },
              { frente: "¿Qué tuvo Jesús para los niños, según la lección?", reverso: "Tiempo, brazos y bendición.", apoyo: "Jesús tuvo tiempo, brazos y bendición para los niños" },
              { frente: "¿Qué lugar tenían los niños en la vida pública del tiempo de Jesús?", reverso: "Poco lugar: por eso sorprendió que Jesús los pusiera en el centro.", apoyo: "En la cultura de su tiempo, los niños tenían poco lugar en la vida pública" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué aclamaban los muchachos en el templo?", reverso: "«¡Hosanna al Hijo de David!»", apoyo: "En el templo, los muchachos aclamaban «¡Hosanna al Hijo de David!»" },
              { frente: "¿Con qué les respondió Jesús a los líderes que se molestaron?", reverso: "Con un salmo: «De la boca de los niños y de los que maman Perfeccionaste la alabanza».", apoyo: "Jesús les respondió con un salmo" },
              { frente: "¿Qué es recibir a un niño en el nombre de Jesús?", reverso: "Es recibir a Jesús.", apoyo: "Recibir a un niño en el nombre de Jesús es recibir a Jesús" },
              { frente: "¿Qué reprende Jesús, según la lección?", reverso: "Estorbar a un niño que viene a él.", apoyo: "Estorbar a un niño que viene a Jesús es algo que Jesús reprende" },
              { frente: "¿Qué va siempre junto con el amor por los niños?", reverso: "Su protección.", apoyo: "Por eso el amor por los niños va siempre junto con su protección" },
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
            consigna: "Une lo que hizo Jesús con lo que nos enseña sobre los niños.",
            pares: [
              ["Puso a un niño en medio de los discípulos", "Los niños tienen un lugar en el centro, no en el rincón"],
              ["Se indignó con los que estorbaban a los niños", "Estorbar a un niño que viene a Jesús es algo que él reprende"],
              ["Defendió la alabanza de los muchachos en el templo", "Los niños pueden creer, orar y adorar de verdad"],
              ["Enseñó a los adultos a hacerse como niños", "La confianza y la humildad del niño son un ejemplo"],
            ],
            apoyo: "Los niños tienen un lugar en el centro, no en el rincón",
            ref: "Mateo 18:2-5",
            explica: "Jesús puso a un niño en el centro, se indignó cuando estorbaban a los niños, defendió su alabanza en el templo y enseñó a los adultos a hacerse como niños: los niños tienen un lugar en el centro, pueden adorar de verdad y son un ejemplo.",
          },
          {
            consigna: "Une a cada uno con lo que hizo en los relatos de Jesús y los niños.",
            pares: [
              ["Los discípulos, en Marcos 10", "Reprendieron a los que traían niños"],
              ["Jesús, en Marcos 10", "Se indignó, tomó a los niños en sus brazos y los bendijo"],
              ["Los muchachos en el templo", "Aclamaban: «¡Hosanna al Hijo de David!»"],
              ["Los líderes del templo", "Se molestaron por la alabanza de los muchachos"],
            ],
            apoyo: "Se indignó cuando estorbaban a los niños, los tomó en sus brazos y los bendijo, y defendió su alabanza en el templo",
            ref: "Marcos 10:13-16; Mateo 21:15-16",
            explica: "Los discípulos reprendieron a los que traían niños, y Jesús se indignó, los tomó en sus brazos y los bendijo. En el templo, los muchachos aclamaban a Jesús, los líderes se molestaron y Jesús defendió su alabanza con un salmo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué dijo Jesús que debían hacer los adultos para entrar en el reino de los cielos? Toca las palabras que lo dicen.",
            texto: "si no [[os volvéis]] y [[os hacéis como niños]], no entraréis en el reino de los cielos",
            apoyo: "Les dijo: «si no os volvéis y os hacéis como niños, no entraréis en el reino de los cielos»",
            ref: "Mateo 18:3",
            explica: "Jesús enseñó a los adultos a volverse y hacerse como niños para entrar en el reino: la confianza y la humildad del niño son un ejemplo.",
          },
          {
            consigna: "Según Jesús, ¿a quién recibe el que recibe a un niño en su nombre? Toca las palabras que lo dicen.",
            texto: "cualquiera que reciba en mi nombre a un niño como este, [[a mí me recibe]]",
            apoyo: "Recibir a un niño en el nombre de Jesús es recibir a Jesús",
            ref: "Mateo 18:5",
            explica: "Jesús dijo que recibir a un niño en su nombre es recibirlo a él: por eso la iglesia recibe a cada niño como recibiría a Jesús.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre lo que Jesús enseñó a los adultos con un niño tiene un error. Tócala.",
            frases: [
              "Los discípulos discutían quién era el mayor cuando Jesús llamó a un niño.",
              "Jesús puso al niño en medio de los discípulos.",
              "Jesús dijo que los niños debían hacerse como los adultos para entrar en el reino.",
              "Jesús dijo que recibir a un niño en su nombre es recibirlo a él.",
            ],
            malo: 2,
            correccion: "Jesús les dijo a los adultos que debían hacerse como niños para entrar en el reino de los cielos.",
            apoyo: "enseñó a los adultos a hacerse como niños para entrar en el reino",
            ref: "Mateo 18:2-5",
            explica: "Fue al revés: Jesús enseñó a los adultos a hacerse como niños para entrar en el reino. La confianza y la humildad del niño son un ejemplo.",
          },
          {
            consigna: "Una de estas frases sobre lo que los adultos aprenden de los niños tiene un error. Tócala.",
            frases: [
              "La confianza del niño es un ejemplo para entrar en el reino.",
              "Los adultos no tienen nada que aprender de los niños.",
              "La humildad del niño también es un ejemplo para los adultos.",
              "Jesús puso a un niño en el centro para enseñar a sus discípulos.",
            ],
            malo: 1,
            correccion: "Los adultos aprenden de los niños: la confianza y la humildad del niño son un ejemplo para entrar en el reino.",
            apoyo: "Los adultos aprenden de ellos: la confianza y la humildad del niño son un ejemplo para entrar en el reino",
            ref: "Mateo 18:3",
            explica: "Jesús enseñó a los adultos con un niño: la confianza y la humildad del niño son un ejemplo para entrar en el reino.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Jesús tuvo tiempo, brazos y bendición para los niños",
            ref: "Marcos 10:13-16",
            situacion: "Eres maestra de la clase de niños de 6 a 8 años. Es domingo, y la clase está a punto de empezar.",
            escenas: [
              {
                id: "e1",
                narra: "Llega Tomás, un niño nuevo y callado, que se queda en un rincón sin hablar con nadie.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te acercas a él, le dedicas tiempo y le das un lugar con los demás.", valor: 2, explica: "Jesús tuvo tiempo para los niños, y los niños tienen un lugar en el centro, no en el rincón.", siguiente: "e2" },
                  { texto: "Le sonríes desde lejos y esperas a que él solo se anime a acercarse.", valor: 1, explica: "Sonreírle está bien, pero Jesús tuvo tiempo para los niños: los niños tienen un lugar en el centro, no en el rincón.", siguiente: "e2" },
                  { texto: "Lo dejas en el rincón: si está callado, al menos no estorba la clase.", valor: 0, explica: "Los niños tienen un lugar en el centro, no en el rincón.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Al final de la clase, Tomás se va sin haber dicho una palabra.",
                pregunta: "¿Qué haces el domingo siguiente?",
                opciones: [
                  { texto: "Lo esperas en la puerta, lo saludas y le dedicas tiempo.", valor: 2, explica: "Jesús tuvo tiempo, brazos y bendición para los niños.", siguiente: "e2" },
                  { texto: "Nada: si quiere participar, ya se acercará él solo algún día.", valor: 0, explica: "Los niños tienen un lugar en el centro, no en el rincón: Jesús tuvo tiempo para ellos.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la oración, una niña pide orar en voz alta por su papá, y otro maestro dice: Mejor oro yo, que ella es muy pequeña.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Dejas que ore ella: los niños pueden creer, orar y adorar de verdad.", valor: 2, explica: "Los niños pueden creer, orar y adorar de verdad." },
                  { texto: "Oras tú primero y después le das unos segundos a ella, si queda tiempo.", valor: 1, explica: "Darle un lugar está bien, pero los niños pueden orar de verdad: no hace falta dejarla para el final." },
                  { texto: "Le das la razón al maestro: los niños todavía no saben orar de verdad.", valor: 0, explica: "Los niños pueden creer, orar y adorar de verdad." },
                ],
              },
              {
                id: "e3",
                narra: "Mientras cuentas la historia, un niño interrumpe para preguntar algo sobre Jesús, y otro maestro le dice que se calle.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le respondes con calma: no se estorba a un niño que viene a Jesús.", valor: 2, explica: "Estorbar a un niño que viene a Jesús es algo que Jesús reprende." },
                  { texto: "Le pides que guarde su pregunta para el final y sigues la historia.", valor: 1, explica: "Ordenar la clase está bien, si después le respondes: estorbar a un niño que viene a Jesús es algo que él reprende." },
                  { texto: "Apoyas al maestro: en la clase, los niños están para escuchar y callar.", valor: 0, explica: "Jesús se indignó cuando estorbaban a los niños que venían a él." },
                ],
              },
            ],
          },
          {
            apoyo: "Por eso la iglesia da a los niños un lugar en el centro, cree que pueden creer y adorar, aprende de su confianza y los cuida",
            ref: "Mateo 21:15-16",
            situacion: "Coordinas a los niños en el culto de Navidad de tu iglesia. Los niños van a cantar y a leer un pasaje frente a la congregación.",
            escenas: [
              {
                id: "e1",
                narra: "Un líder te propone: Que canten al final, cuando ya se haya ido la mitad de la gente.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que los niños tienen un lugar en el centro, no en el rincón.", valor: 2, explica: "Los niños tienen un lugar en el centro, no en el rincón.", siguiente: "e2" },
                  { texto: "Que canten en medio del culto, aunque sea solo una canción corta.", valor: 1, explica: "Darles un lugar está bien: los niños tienen un lugar en el centro, no en el rincón.", siguiente: "e2" },
                  { texto: "Que sí: así los niños no interrumpen la parte del culto que importa.", valor: 0, explica: "Los niños tienen un lugar en el centro, no en el rincón, y también adoran de verdad.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Los niños cantan al final, ante pocas personas, y uno te pregunta si a nadie le importó su canto.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le dices que los niños adoran de verdad, y hablas con el líder.", valor: 2, explica: "Los niños también adoran de verdad, y tienen un lugar en el centro.", siguiente: "e2" },
                  { texto: "Le dices que es normal: el culto de verdad es el de los adultos.", valor: 0, explica: "Jesús defendió la alabanza de los muchachos: los niños también adoran de verdad.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Mientras ensayan, un hermano se queja: Esta alabanza de niños no es seria; es solo un número bonito.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Jesús defendió la alabanza de los niños en el templo.", valor: 2, explica: "Jesús respondió con un salmo: «De la boca de los niños y de los que maman Perfeccionaste la alabanza». Los niños también adoran de verdad." },
                  { texto: "Que no se preocupe, porque los niños van a cantar una sola canción.", valor: 1, explica: "Calmarlo no basta: Jesús defendió la alabanza de los niños, porque los niños también adoran de verdad." },
                  { texto: "Que tiene razón: la alabanza de verdad empieza cuando uno es adulto.", valor: 0, explica: "Los niños pueden creer, orar y adorar de verdad." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar el culto, un niño de ocho años te dice que quiere seguir a Jesús.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo escuchas con atención: los niños pueden creer de verdad.", valor: 2, explica: "Los niños pueden creer, orar y adorar de verdad." },
                  { texto: "Le dices que qué bueno, y que lo hablen otro día con más calma.", valor: 1, explica: "Alegrarte está bien, pero los niños pueden creer de verdad: merece que le dediques tiempo." },
                  { texto: "Le dices que es muy pequeño para entender esas cosas de grandes.", valor: 0, explica: "Los niños pueden creer, orar y adorar de verdad." },
                ],
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
            consigna: "¿Sigue el ejemplo de Jesús con los niños o no lo sigue? Lleva cada frase a su grupo.",
            grupos: ["Sigue el ejemplo de Jesús", "No sigue el ejemplo de Jesús"],
            frases: [
              { texto: "Dedicar tiempo a un niño que necesita que lo escuchen", grupo: 0 },
              { texto: "Dar a los niños un lugar en el centro de la iglesia", grupo: 0 },
              { texto: "Creer que un niño puede orar y adorar de verdad", grupo: 0 },
              { texto: "Bendecir a los niños y orar por ellos", grupo: 0 },
              { texto: "Amar a los niños y también protegerlos", grupo: 0, explica: "Recibir a un niño también es cuidarlo: el amor por los niños va siempre junto con su protección." },
              { texto: "Dejar a los niños en el rincón, para que no molesten", grupo: 1 },
              { texto: "Callar a un niño que pregunta por Jesús", grupo: 1 },
              { texto: "Pensar que la alabanza de los niños no es de verdad", grupo: 1 },
            ],
            apoyo: "Por eso la iglesia da a los niños un lugar en el centro, cree que pueden creer y adorar, aprende de su confianza y los cuida",
            ref: "Marcos 10:13-16",
            explica: "Jesús tuvo tiempo, brazos y bendición para los niños, los puso en el centro y defendió su alabanza. Estorbar a un niño que viene a Jesús es algo que él reprende.",
          },
          {
            consigna: "¿Recibe a los niños como Jesús o los estorba? Lleva cada frase a su grupo.",
            grupos: ["Los recibe como Jesús", "Los estorba"],
            frases: [
              { texto: "Un maestro saluda por su nombre a cada niño que llega", grupo: 0 },
              { texto: "Una hermana escucha con calma la pregunta de un niño", grupo: 0 },
              { texto: "El pastor ora por los niños y los bendice", grupo: 0 },
              { texto: "Un líder deja que los niños canten en el culto", grupo: 0 },
              { texto: "Un ujier regaña a los niños que se acercan al frente", grupo: 1 },
              { texto: "Un maestro no deja orar a una niña porque es pequeña", grupo: 1 },
              { texto: "Un adulto le dice a un niño que Jesús es solo para los grandes", grupo: 1 },
            ],
            apoyo: "Estorbar a un niño que viene a Jesús es algo que Jesús reprende",
            ref: "Mateo 18:5",
            explica: "Recibir a un niño en el nombre de Jesús es recibir a Jesús. Estorbar a un niño que viene a Jesús es algo que Jesús reprende.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "enseñó a los adultos a hacerse como niños para entrar en el reino",
            ref: "Mateo 18:2-5",
            clave: {
              id: "pr-ninez-1-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué les enseñó Jesús a los adultos cuando puso a un niño en medio de ellos?",
              ideas: [
                { id: "comoninos", peso: 50, texto: "Que para entrar en el reino debían volverse y hacerse como niños: la confianza y la humildad del niño son un ejemplo.", formas: ["como (ninos|nino)", "como un nino", "como los ninos", "confianza", "humild*"] },
                { id: "recibir", peso: 50, texto: "Que recibir a un niño en su nombre es recibirlo a él.", formas: ["recib* a (un|una|los|las) (nino|nina|ninos|ninas)", "recib* (en|a) (su|mi) nombre", "en su nombre", "en mi nombre", "a mi me recibe", "(lo|le|me) recibe a (el|mi|jesus)", "recib* a jesus", "recibirlo a el"] },
              ],
              errores: [
                { id: "alreves", texto: "Fue al revés: Jesús enseñó a los adultos a hacerse como niños.", formas: ["(ninos|nino) (deben|debian|tienen|tenian) (ser|hacerse|volverse) como", "hacerse como (adultos|grandes|mayores)"], anula: "comoninos" },
              ],
              modelo: "Les enseñó que para entrar en el reino de los cielos debían volverse y hacerse como niños, porque la confianza y la humildad del niño son un ejemplo. Y que recibir a un niño en su nombre es recibirlo a él.",
            },
          },
          {
            apoyo: "Los adultos aprenden de ellos: la confianza y la humildad del niño son un ejemplo para entrar en el reino",
            ref: "Mateo 18:3",
            clave: {
              id: "pr-ninez-1-3-a7-2",
              tipo: "corta",
              pregunta: "Un líder dice que los niños solo vienen a la iglesia a aprender de los adultos. ¿Qué le explicas con lo que enseñó Jesús?",
              ideas: [
                { id: "aprenden", peso: 50, texto: "Que los adultos también aprenden de ellos: la confianza y la humildad del niño son un ejemplo para entrar en el reino.", formas: ["confianza", "humild*", "aprendemos de (ellos|los|las)", "(son|es) un ejemplo"] },
                { id: "centro", peso: 50, texto: "Que Jesús llamó a un niño y lo puso en medio de los discípulos para enseñarles.", formas: ["en medio", "en el centro", "(lo|le) puso", "puso a un nino", "llamo a un nino"] },
              ],
              errores: [
                { id: "solo", texto: "Los adultos también aprenden de los niños: su confianza y su humildad son un ejemplo.", formas: ["tiene razon", "nada que aprender", "solo (vienen|estan|van) a aprender"], anula: "aprenden" },
              ],
              modelo: "Le explico que Jesús llamó a un niño y lo puso en medio de los discípulos para enseñarles. Los adultos también aprenden de los niños: su confianza y su humildad son un ejemplo para entrar en el reino.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Niños que sirvieron a Dios
    "ninez-1-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué era Samuel cuando Dios lo llamó?", reverso: "Un muchacho.", apoyo: "Samuel era un muchacho cuando Dios lo llamó" },
              { frente: "¿Qué le enseñó Elí a Samuel?", reverso: "A responder: «Habla, Jehová, porque tu siervo oye».", apoyo: "Elí le enseñó a responder: «Habla, Jehová, porque tu siervo oye»" },
              { frente: "¿Qué hace el adulto que ayuda a un niño a reconocer la voz de Dios?", reverso: "Una obra eterna.", apoyo: "Un adulto que ayuda a un niño a reconocer la voz de Dios hace una obra eterna" },
              { frente: "¿A qué edad empezó a reinar Josías?", reverso: "A los ocho años.", apoyo: "Josías empezó a reinar a los ocho años" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A quién le habló de Dios la muchacha cautiva?", reverso: "A su señora.", apoyo: "Una muchacha cautiva, lejos de su casa, habló de Dios a su señora" },
              { frente: "¿Adónde llevó a Naamán la fe sencilla de la muchacha?", reverso: "Al Dios de Israel.", apoyo: "Su fe sencilla llevó a Naamán al Dios de Israel" },
              { frente: "¿Qué preparó la búsqueda temprana de Josías?", reverso: "Una gran reforma en Judá.", apoyo: "Esa búsqueda temprana preparó una gran reforma en Judá" },
              { frente: "¿Qué tenía el muchacho de la multiplicación de los panes?", reverso: "Cinco panes de cebada y dos pececillos.", apoyo: "«Aquí está un muchacho, que tiene cinco panes de cebada y dos pececillos»" },
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
            consigna: "Sigue la línea de niños y jóvenes que sirvieron a Dios. Ordénalos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Samuel aprende a escuchar a Dios en el santuario", fecha: "1 Samuel 3" },
              { texto: "David, un joven pastor, confía en Dios frente a Goliat", fecha: "1 Samuel 17" },
              { texto: "Una muchacha cautiva habla de Dios a Naamán", fecha: "2 Reyes 5" },
              { texto: "Josías, un rey niño, busca a Dios desde muchacho", fecha: "2 Crónicas 34" },
              { texto: "Un muchacho entrega a Jesús sus panes y sus peces", fecha: "Juan 6" },
            ],
            apoyo: "La Biblia está llena de niños y jóvenes que escucharon a Dios y lo sirvieron",
            explica: "Samuel (1 Samuel 3), David (1 Samuel 17), la muchacha de Israel (2 Reyes 5), Josías (2 Crónicas 34) y el muchacho de los panes (Juan 6): la Biblia está llena de niños y jóvenes que escucharon a Dios y lo sirvieron.",
          },
          {
            consigna: "¿Quién vino primero? Ordena en el tiempo a estos niños y jóvenes que escucharon a Dios, del más antiguo al más reciente.",
            eventos: [
              { texto: "Dios llama a Samuel cuando todavía es un muchacho", fecha: "1 Samuel 3" },
              { texto: "Una cautiva de Israel le habla de Dios a su señora", fecha: "2 Reyes 5" },
              { texto: "Josías empieza a reinar a los ocho años y busca a Dios", fecha: "2 Crónicas 34" },
              { texto: "Jesús, a los doce años, escucha y pregunta a los maestros", fecha: "Lucas 2:46" },
              { texto: "Timoteo llega a ser colaborador de Pablo y líder de la iglesia", fecha: "2 Timoteo 3:15" },
            ],
            apoyo: "Dios no espera a que los niños crezcan para hablarles ni para usarlos",
            explica: "Dios llamó a Samuel (1 Samuel 3), usó a la muchacha cautiva (2 Reyes 5) y movió a Josías a buscarlo (2 Crónicas 34); Jesús, a los doce años, estuvo en el templo con los maestros (Lucas 2:46), y Timoteo, que conoció las Escrituras desde la niñez, llegó a ser colaborador de Pablo (2 Timoteo 3:15).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada historia con lo que enseña sobre la fe de un niño.",
            pares: [
              ["Samuel y Elí", "Un adulto que ayuda a un niño a reconocer la voz de Dios hace una obra eterna"],
              ["La muchacha cautiva", "Una fe sencilla puede llevar a otros a Dios"],
              ["Josías", "Buscar a Dios desde joven prepara grandes obras"],
              ["El muchacho de los panes", "Jesús usa lo poco que un niño le entrega"],
            ],
            apoyo: "La Biblia está llena de niños y jóvenes que escucharon a Dios y lo sirvieron",
            explica: "Samuel aprendió a escuchar a Dios con la ayuda de Elí; la fe sencilla de la muchacha llevó a Naamán al Dios de Israel; la búsqueda temprana de Josías preparó una gran reforma; y Jesús usó lo poco de un muchacho para alimentar a una multitud.",
          },
          {
            consigna: "Une a cada niño o joven con lo que muestra su historia.",
            pares: [
              ["Samuel", "Un niño puede aprender a escuchar la voz de Dios"],
              ["La muchacha de Israel", "Un niño puede hablar de Dios lejos de su casa"],
              ["El rey Josías", "Un niño puede buscar a Dios desde muy joven"],
              ["El muchacho de los cinco panes", "Lo poco de un niño, en manos de Jesús, alcanza para muchos"],
            ],
            apoyo: "Su fe sencilla llevó a Naamán al Dios de Israel",
            explica: "Samuel aprendió a escuchar la voz de Dios; la muchacha cautiva habló de Dios lejos de su casa; Josías buscó a Dios siendo aún muchacho; y Jesús usó lo poco de un muchacho para alimentar a una multitud.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseñan las historias de la muchacha cautiva y del muchacho de los panes.",
            texto: "La fe [[sencilla]] de una muchacha llevó a Naamán al Dios de Israel, y Jesús usó lo [[poco]] de un muchacho para [[alimentar]] a una multitud.",
            distractores: ["perfecta", "mucho", "despedir"],
            errores: {
              perfecta: "La lección habla de la fe sencilla de la muchacha; y el héroe de la historia es Dios, no el niño.",
              mucho: "Jesús usó lo poco de un niño: cinco panes de cebada y dos pececillos.",
              despedir: "Jesús usó lo poco de un niño para alimentar a una multitud.",
            },
            apoyo: "Jesús usó lo poco de un niño para alimentar a una multitud",
            ref: "Juan 6:9",
            explica: "La fe sencilla de la muchacha cautiva llevó a Naamán al Dios de Israel, y Jesús usó lo poco de un muchacho para alimentar a una multitud: Dios usa la fe de los pequeños.",
          },
          {
            consigna: "Completa lo que enseña la historia de Samuel.",
            texto: "Dios llamó a Samuel cuando era un [[muchacho]], y Elí le enseñó a [[responder]]: un adulto que ayuda a un niño a reconocer la voz de Dios hace una obra [[eterna]].",
            distractores: ["anciano", "callar", "pequeña"],
            errores: {
              anciano: "Samuel era un muchacho cuando Dios lo llamó.",
              callar: "Elí le enseñó a responder: «Habla, Jehová, porque tu siervo oye».",
              "pequeña": "Ayudar a un niño a reconocer la voz de Dios es una obra eterna.",
            },
            apoyo: "Un adulto que ayuda a un niño a reconocer la voz de Dios hace una obra eterna",
            ref: "1 Samuel 3:8-10",
            explica: "Samuel era un muchacho cuando Dios lo llamó, y Elí le enseñó a responder. Un adulto que ayuda a un niño a reconocer la voz de Dios hace una obra eterna.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre cómo contar las historias de niños de la Biblia tiene un error. Tócala.",
            frases: [
              "Muestra a Dios como el héroe que llama, escucha y usa a los pequeños.",
              "Haz del niño de la historia un héroe perfecto, para que los niños lo imiten.",
              "Termina con una pregunta: ¿cómo puedes tú escuchar a Dios y servirle esta semana?",
              "Anima a los niños a escuchar a Dios y a servirle hoy.",
            ],
            malo: 1,
            correccion: "No hagas del niño de la historia un héroe perfecto: muestra a Dios como el héroe que llama, escucha y usa a los pequeños.",
            apoyo: "Al contar estas historias, no hagas del niño de la historia un héroe perfecto",
            explica: "El héroe de la historia es Dios, que llama, escucha y usa a los pequeños; y la clase termina con una pregunta para servirle esta semana.",
          },
          {
            consigna: "Una de estas frases sobre lo que hace el maestro al contar estas historias tiene un error. Tócala.",
            frases: [
              "El maestro muestra que Dios es el héroe de la historia.",
              "El maestro anima a los niños a escuchar a Dios y a servirle hoy.",
              "El maestro termina la historia con una pregunta para la semana.",
              "El maestro enseña que Dios espera a que los niños crezcan para usarlos.",
            ],
            malo: 3,
            correccion: "Dios no espera a que los niños crezcan para hablarles ni para usarlos.",
            apoyo: "Dios no espera a que los niños crezcan para hablarles ni para usarlos",
            explica: "Al contar sus historias, el maestro muestra que Dios es el héroe y anima a los niños a escucharlo y a servirle hoy: Dios no espera a que crezcan para usarlos.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Al contar sus historias, el maestro muestra que Dios es el héroe y anima a los niños a escucharlo y a servirle hoy",
            ref: "1 Samuel 3:8-10",
            titulo: "La historia de Samuel en la clase",
            relato: [
              "Este domingo te toca contar a los niños de 7 a 10 años la historia del llamado de Samuel.",
              "Una compañera te sugiere: Cuéntales que Samuel era un niño perfecto, que nunca fallaba, y diles que sean como él.",
              "Tú quieres que la historia anime a los niños a escuchar a Dios y a servirle esta semana.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Quién será el héroe de tu historia?",
                opciones: [
                  { texto: "Dios, que llama, escucha y usa a los pequeños, como a Samuel.", bien: true, explica: "No se hace del niño de la historia un héroe perfecto: Dios es el héroe que llama, escucha y usa a los pequeños." },
                  { texto: "Samuel, un niño perfecto que nunca falló en nada, para imitarlo.", explica: "Al contar estas historias, no se hace del niño de la historia un héroe perfecto." },
                  { texto: "Elí, porque ayudar a un niño a oír a Dios es una obra eterna.", explica: "Elí hizo una obra eterna al ayudar a Samuel, pero el héroe de la historia es Dios, que llama a los pequeños." },
                ],
                apoyo: "muestra a Dios como el héroe que llama, escucha y usa a los pequeños",
                explica: "El maestro muestra que Dios es el héroe de la historia: el que llama, escucha y usa a los pequeños.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué parte del relato destacas para mostrar cómo responde un niño a Dios?",
                opciones: [
                  { texto: "Que Samuel respondió: «Habla, porque tu siervo oye».", bien: true, explica: "Elí le enseñó a responder, y Samuel dijo: «Habla, porque tu siervo oye»." },
                  { texto: "Que Samuel era tan bueno que Dios lo escogió por sus méritos.", explica: "No se hace del niño de la historia un héroe perfecto: el héroe es Dios, que llama a los pequeños." },
                  { texto: "Que Samuel tuvo que esperar a ser adulto para que Dios le hablara.", explica: "Samuel era un muchacho cuando Dios lo llamó: Dios no espera a que los niños crezcan para hablarles." },
                ],
                apoyo: "Samuel era un muchacho cuando Dios lo llamó",
                explica: "Samuel era un muchacho cuando Dios lo llamó, y Elí le enseñó a responder: «Habla, Jehová, porque tu siervo oye».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo terminas la clase?",
                opciones: [
                  { texto: "Con una pregunta: ¿cómo puedes tú escuchar a Dios y servirle esta semana?", bien: true, explica: "Así lo pide la lección: terminar con una pregunta para escuchar a Dios y servirle esta semana." },
                  { texto: "Con un resumen de los datos de la historia, para que los repitan de memoria.", explica: "La historia termina con una pregunta que anima a los niños a escuchar a Dios y a servirle hoy." },
                  { texto: "Con un premio para el niño que se porte tan perfecto como se portó Samuel.", explica: "No se hace del niño de la historia un héroe perfecto: el héroe es Dios." },
                ],
                apoyo: "Y termina con una pregunta: ¿cómo puedes tú escuchar a Dios y servirle esta semana?",
                explica: "Al contar estas historias, se termina con una pregunta: ¿cómo puedes tú escuchar a Dios y servirle esta semana?",
              },
              {
                tipo: "explica",
                apoyo: "Al contar estas historias, no hagas del niño de la historia un héroe perfecto",
                clave: {
                  id: "pr-ninez-1-4-a6-1",
                  tipo: "corta",
                  pregunta: "¿Qué le respondes a tu compañera, que quiere presentar a Samuel como un niño perfecto?",
                  ideas: [
                    { id: "heroe", peso: 50, texto: "Que no se hace del niño de la historia un héroe perfecto: Dios es el héroe que llama, escucha y usa a los pequeños.", formas: ["dios es el heroe", "el heroe es dios", "heroe (es|sea|seria) dios", "dios (como|sea) el heroe", "no (era|es|fue) (un|una) (nino|heroe) perfect*", "no (era|es|fue) perfect*", "nadie es perfecto", "dios (llama|llamo|usa|uso|escucha|hablo|habla)", "(llama|usa) a los pequenos"] },
                    { id: "pregunta", peso: 50, texto: "Que la historia termine con una pregunta: ¿cómo pueden escuchar a Dios y servirle esta semana?", formas: ["una pregunta", "con (una|la) pregunta", "esta semana", "escuch* a dios", "escuch* (su|la) voz", "voz de dios", "servir*", "sirvan"] },
                  ],
                  errores: [
                    { id: "perfecto", texto: "No se hace del niño de la historia un héroe perfecto: el héroe es Dios.", formas: ["(era|es|fue) (un|una) (nino|heroe) perfect*", "(era|es|fue) perfect*", "nunca (fallo|fallaba)", "tiene razon", "samuel (es|era|sea|fue) el heroe"], anula: "heroe" },
                  ],
                  modelo: "Le diría que no haga de Samuel un héroe perfecto: Dios es el héroe que llama, escucha y usa a los pequeños. Y que terminemos con una pregunta: ¿cómo pueden escuchar a Dios y servirle esta semana?",
                },
              },
            ],
          },
          {
            apoyo: "Y termina con una pregunta: ¿cómo puedes tú escuchar a Dios y servirle esta semana?",
            ref: "Juan 6:9",
            titulo: "Los cinco panes en la escuela bíblica",
            relato: [
              "En la escuela bíblica de vacaciones te toca contar la historia del muchacho de los cinco panes y los dos peces.",
              "Un ayudante propone: Digamos que el muchacho fue el héroe, porque era el más generoso de todos los niños.",
              "Tú quieres que los niños vean lo que hace Dios con lo poco que ellos le entregan.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Quién es el héroe de la historia que vas a contar?",
                opciones: [
                  { texto: "Jesús, que usó lo poco de un niño para alimentar a una multitud.", bien: true, explica: "No se hace del niño de la historia un héroe perfecto: Jesús usó lo poco de un muchacho para alimentar a una multitud." },
                  { texto: "El muchacho, porque era el niño más generoso de toda la multitud.", explica: "Al contar estas historias, no se hace del niño de la historia un héroe perfecto." },
                  { texto: "Los discípulos, que repartieron los panes entre toda la gente del lugar.", explica: "El héroe de la historia es Dios: Jesús usó lo poco de un niño para alimentar a una multitud." },
                ],
                apoyo: "Jesús usó lo poco de un niño para alimentar a una multitud",
                explica: "Dios es el héroe que llama, escucha y usa a los pequeños: Jesús usó lo poco de un muchacho para alimentar a una multitud.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué parte del relato destacas?",
                opciones: [
                  { texto: "Que todo empezó con lo poco que tenía un muchacho.", bien: true, explica: "Todo empezó con lo que tenía un muchacho: cinco panes de cebada y dos pececillos." },
                  { texto: "Que el muchacho tenía mucha comida y por eso pudo alimentar a todos.", explica: "El muchacho tenía poco: cinco panes de cebada y dos pececillos, y Jesús usó eso para alimentar a una multitud." },
                  { texto: "Que la multitud trajo su comida, y Jesús no tuvo que hacer nada.", explica: "Todo empezó con lo que tenía un muchacho, y Jesús alimentó con eso a una multitud." },
                ],
                apoyo: "En la multiplicación de los panes, todo empezó con lo que tenía un muchacho",
                explica: "Todo empezó con lo que tenía un muchacho: «Aquí está un muchacho, que tiene cinco panes de cebada y dos pececillos». Jesús usó lo poco de un niño para alimentar a una multitud.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo terminas la historia?",
                opciones: [
                  { texto: "Preguntando: ¿cómo puedes tú escuchar a Dios y servirle esta semana?", bien: true, explica: "Al contar estas historias, se termina con una pregunta para escuchar a Dios y servirle esta semana." },
                  { texto: "Repasando los números de la historia, para que los aprendan de memoria.", explica: "La historia termina con una pregunta que anima a los niños a escuchar a Dios y a servirle hoy." },
                  { texto: "Diciéndoles que sean tan generosos como el muchacho, que era perfecto.", explica: "No se hace del niño de la historia un héroe perfecto: el héroe es Dios." },
                ],
                apoyo: "Y termina con una pregunta: ¿cómo puedes tú escuchar a Dios y servirle esta semana?",
                explica: "El maestro muestra que Dios es el héroe y anima a los niños a escucharlo y a servirle hoy.",
              },
              {
                tipo: "explica",
                apoyo: "Dios no espera a que los niños crezcan para hablarles ni para usarlos",
                clave: {
                  id: "pr-ninez-1-4-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué quieres que los niños aprendan de esta historia para su propia vida?",
                  ideas: [
                    { id: "poco", peso: 50, texto: "Que Jesús puede usar lo poco que un niño le entrega, como usó los panes del muchacho para alimentar a una multitud.", formas: ["lo poco", "poco que", "aliment* a (una|la|miles|mucha|muchas)", "multitud", "miles", "(usa|uso|usar|usarlos) (lo|a|sus)", "(entreg*|dar|den|da|dan) a jesus"] },
                    { id: "servir", peso: 50, texto: "Que Dios no espera a que crezcan: pueden escucharlo y servirle esta semana.", formas: ["servir*", "sirvan", "esta semana", "escuch* a dios", "escucharlo", "no espera", "desde (ahora|ya|hoy|ninos|pequenos)", "ahora mismo", "hoy mismo"] },
                  ],
                  modelo: "Quiero que aprendan que Jesús puede usar lo poco que un niño le entrega, como usó los panes del muchacho para alimentar a una multitud. Y que Dios no espera a que crezcan: pueden escucharlo y servirle esta semana.",
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
            apoyo: "Dios no espera a que los niños crezcan para hablarles ni para usarlos",
            ref: "1 Samuel 3:8-10",
            clave: {
              id: "pr-ninez-1-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseñan las historias de Samuel y de la muchacha cautiva sobre la fe de un niño?",
              ideas: [
                { id: "samuel", peso: 50, texto: "Que Dios habla a los niños: llamó a Samuel cuando era un muchacho, y él aprendió a responder.", formas: ["dios (habla|hablo|llama|llamo) a (los|un|una) (ninos|nino|pequenos)", "(llamo|hablo) a samuel", "samuel (era|siendo) (nino|pequeno|chico)", "samuel cuando era", "tu siervo oye", "escuch* (a|la) (dios|voz)", "voz de dios", "aprendi* a (escuchar|responder|oir)", "no espera"] },
                { id: "muchacha", peso: 50, texto: "Que una fe sencilla puede llevar a otros a Dios: la muchacha llevó a Naamán al Dios de Israel.", formas: ["fe sencilla", "naaman", "llev* a (naaman|otros)", "su senora", "cautiva hablo de dios", "hablar de dios a otros"] },
              ],
              errores: [
                { id: "esperar", texto: "Dios no espera a que los niños crezcan para hablarles ni para usarlos.", formas: ["esperar a ser (adultos|grandes|mayores)", "(tienen|deben|hay) que esperar", "cuando (sean|crezcan) (grandes|adultos|mayores)", "hasta que (crezcan|sean)", "(solo|unicamente) (habla|hablo|llama|usa) a los (adultos|grandes|mayores)"], anula: "samuel" },
                { id: "esperar-usar", texto: "Dios no espera a que los niños crezcan para usarlos: la fe sencilla de una muchacha llevó a Naamán a Dios.", formas: ["esperar a ser (adultos|grandes|mayores)", "(tienen|deben|hay) que esperar", "cuando (sean|crezcan) (grandes|adultos|mayores)", "hasta que (crezcan|sean)"], anula: "muchacha" },
              ],
              modelo: "Enseñan que Dios no espera a que los niños crezcan para hablarles: llamó a Samuel cuando era un muchacho. Y que una fe sencilla puede llevar a otros a Dios, como la muchacha cautiva que llevó a Naamán al Dios de Israel.",
            },
          },
          {
            apoyo: "Esa búsqueda temprana preparó una gran reforma en Judá",
            ref: "Juan 6:9",
            clave: {
              id: "pr-ninez-1-4-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseñan las historias de Josías y del muchacho de los panes sobre lo que Dios hace con los niños?",
              ideas: [
                { id: "josias", peso: 50, texto: "Que Josías buscó a Dios siendo aún muchacho, y esa búsqueda temprana preparó una gran reforma.", formas: ["busc* a dios", "busqueda temprana", "desde (muchacho|joven|nino|pequeno|chico)", "siendo (aun|un|muy|nino|joven|muchacho)", "gran reforma", "reforma", "ocho anos"] },
                { id: "panes", peso: 50, texto: "Que Jesús usó lo poco de un muchacho para alimentar a una multitud.", formas: ["lo poco", "poco (que|de)", "aliment* a (una|la|miles|mucha|muchas)", "multitud", "miles", "cinco panes", "pececillos"] },
              ],
              errores: [
                { id: "esperar", texto: "Dios no espera a que los niños crezcan: Josías buscó a Dios siendo aún muchacho.", formas: ["esperar a ser (adultos|grandes|mayores)", "espero a ser (adulto|grande|mayor)", "(tienen|deben|hay) que esperar", "hasta que (crezcan|sean)"], anula: "josias" },
                { id: "esperar-usar", texto: "Dios no espera a que los niños crezcan para usarlos: Jesús usó lo poco de un muchacho.", formas: ["esperar a ser (adultos|grandes|mayores)", "(tienen|deben|hay) que esperar", "hasta que (crezcan|sean)"], anula: "panes" },
              ],
              modelo: "Josías buscó a Dios siendo aún muchacho, y esa búsqueda temprana preparó una gran reforma en Judá. Y Jesús usó lo poco de un muchacho, cinco panes y dos pececillos, para alimentar a una multitud: Dios usa a los niños.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La enseñanza a los niños en la historia
    "ninez-1-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué era la Pascua para los hijos de Israel, además de una fiesta?", reverso: "Una clase: la pregunta de un niño abría la historia de la salvación.", apoyo: "La Pascua era también una clase para los hijos" },
              { frente: "¿Qué preguntaban los hijos en la Pascua?", reverso: "«¿Qué es este rito vuestro?»", apoyo: "«cuando os dijeren vuestros hijos: ¿Qué es este rito vuestro?»" },
              { frente: "Cuando Esdras leyó la ley, ¿quiénes escuchaban también con el pueblo?", reverso: "Los que tenían edad para entender.", apoyo: "Los que tenían edad para entender también escuchaban la Palabra con el pueblo" },
              { frente: "¿Qué supo la iglesia desde el principio, según Hechos 2:39?", reverso: "Que el evangelio era también para los niños.", apoyo: "Desde el principio, la iglesia supo que el evangelio era también para los niños" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué publicó Martín Lutero en 1529?", reverso: "Su Catecismo Menor, para que los padres enseñaran la fe en casa.", apoyo: "En 1529: Martín Lutero publicó su Catecismo Menor para que los padres enseñaran la fe a sus hijos en casa" },
              { frente: "¿Qué fue el Orbis Pictus de Comenio?", reverso: "Uno de los primeros libros con imágenes para enseñar a los niños.", apoyo: "el pedagogo moravo Juan Amós Comenio publicó el Orbis Pictus, uno de los primeros libros con imágenes para enseñar a los niños" },
              { frente: "¿Para quiénes abrió Robert Raikes escuelas dominicales?", reverso: "Para niños pobres que trabajaban toda la semana.", apoyo: "Robert Raikes abrió escuelas dominicales en Gloucester, Inglaterra, para enseñar a leer y la Biblia a niños pobres que trabajaban toda la semana" },
              { frente: "¿Cómo llegaron las escuelas dominicales a América Latina?", reverso: "Con los misioneros evangélicos, en el siglo XIX.", apoyo: "En el siglo XIX: las escuelas dominicales se extendieron por el mundo y llegaron a América Latina con los misioneros evangélicos" },
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
            consigna: "Ordena en el tiempo cómo se enseñó la fe a los niños, del primero al último.",
            eventos: [
              { texto: "Los padres enseñan la ley en casa y en fiestas como la Pascua", fecha: "En Israel" },
              { texto: "Los que se preparan para el bautismo reciben el catecumenado", fecha: "En la iglesia antigua" },
              { texto: "Lutero publica su Catecismo Menor para enseñar la fe en casa", fecha: "1529" },
              { texto: "Comenio publica el Orbis Pictus, un libro con imágenes", fecha: "1658" },
              { texto: "Robert Raikes abre escuelas dominicales en Gloucester", fecha: "1780" },
              { texto: "Las escuelas dominicales llegan a América Latina con los misioneros", fecha: "En el siglo XIX" },
              { texto: "Ministerios de niños, cultos infantiles y escuelas bíblicas de vacaciones", fecha: "Hoy" },
            ],
            apoyo: "Una línea de tiempo de la enseñanza a los niños",
            explica: "En Israel, los padres enseñaban en casa y en las fiestas; en la iglesia antigua, el catecumenado; en 1529, el Catecismo Menor de Lutero; en 1658, el Orbis Pictus de Comenio; en 1780, las escuelas dominicales de Raikes; en el siglo XIX, su expansión con las misiones; y hoy, los ministerios de niños siguen la misma tarea.",
          },
          {
            consigna: "¿Qué pasó primero? Ordena estos hechos de la enseñanza a los niños, del más antiguo al más reciente.",
            eventos: [
              { texto: "Un niño pregunta en la Pascua qué significa el rito", fecha: "En Israel" },
              { texto: "La iglesia da una enseñanza ordenada antes del bautismo", fecha: "En la iglesia antigua" },
              { texto: "Un catecismo ayuda a los padres a enseñar la fe en casa", fecha: "1529" },
              { texto: "Un pedagogo moravo enseña a los niños con un libro de imágenes", fecha: "1658" },
              { texto: "En Gloucester, niños pobres aprenden a leer y la Biblia el domingo", fecha: "1780" },
              { texto: "Las escuelas dominicales se extienden por el mundo", fecha: "En el siglo XIX" },
            ],
            apoyo: "Desde los días de Israel, el pueblo de Dios buscó maneras de enseñar la fe a sus hijos",
            explica: "En Israel, la pregunta de un niño abría la historia de la salvación; en la iglesia antigua llegó el catecumenado; en 1529, el Catecismo Menor de Lutero; en 1658, el Orbis Pictus de Comenio; en 1780, las escuelas dominicales de Raikes; y en el siglo XIX, su expansión por el mundo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En la Pascua, ¿qué preguntaban los hijos? Toca las palabras de su pregunta.",
            texto: "cuando os dijeren vuestros hijos: [[¿Qué es este rito vuestro?]]",
            apoyo: "La pregunta de un niño abría la historia de la salvación",
            ref: "Éxodo 12:26",
            explica: "Los hijos preguntaban: ¿Qué es este rito vuestro?, y los padres respondían contando cómo Dios libró sus casas: la pregunta de un niño abría la historia de la salvación.",
          },
          {
            consigna: "En Pentecostés, ¿para quiénes dijo Pedro que era la promesa? Toca las palabras que lo dicen.",
            texto: "Porque [[para vosotros]] es la promesa, y [[para vuestros hijos]]",
            apoyo: "Desde el principio, la iglesia supo que el evangelio era también para los niños",
            ref: "Hechos 2:39",
            explica: "Pedro anunció que la promesa era para ellos y para sus hijos: desde el principio, la iglesia supo que el evangelio era también para los niños.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada uno con lo que aportó a la enseñanza de los niños.",
            pares: [
              ["Martín Lutero, en 1529", "El Catecismo Menor, para enseñar la fe en casa"],
              ["Juan Amós Comenio, en 1658", "El Orbis Pictus, un libro con imágenes para niños"],
              ["Robert Raikes, en 1780", "Escuelas dominicales para niños pobres"],
              ["Los misioneros evangélicos, en el siglo XIX", "Llevaron las escuelas dominicales a América Latina"],
            ],
            apoyo: "Después vinieron el catecumenado de la iglesia antigua, el Catecismo Menor de Lutero en 1529, el Orbis Pictus de Comenio en 1658, las escuelas dominicales de Robert Raikes en 1780 y su expansión con las misiones",
            explica: "Lutero publicó en 1529 su Catecismo Menor; Comenio, en 1658, el Orbis Pictus; Raikes abrió en 1780 escuelas dominicales para niños pobres; y en el siglo XIX los misioneros evangélicos las llevaron a América Latina.",
          },
          {
            consigna: "Une cada aporte con lo que buscaba.",
            pares: [
              ["El Catecismo Menor de Lutero", "Que los padres enseñaran la fe a sus hijos en casa"],
              ["El Orbis Pictus de Comenio", "Enseñar a los niños con imágenes"],
              ["Las escuelas dominicales de Raikes", "Enseñar a leer y la Biblia a niños que trabajaban"],
              ["El catecumenado de la iglesia antigua", "Preparar con orden a los que se iban a bautizar"],
            ],
            apoyo: "En 1529: Martín Lutero publicó su Catecismo Menor para que los padres enseñaran la fe a sus hijos en casa",
            explica: "El Catecismo Menor buscaba que los padres enseñaran la fe en casa; el Orbis Pictus enseñaba a los niños con imágenes; las escuelas dominicales enseñaban a leer y la Biblia a niños pobres que trabajaban; y el catecumenado preparaba con orden a los que se iban a bautizar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la Reforma y las escuelas dominicales: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Lutero publicó su Catecismo Menor para que los padres enseñaran la fe a sus hijos en casa.", verdad: true, explica: "Lo publicó en 1529, para que la fe se enseñara en casa.", apoyo: "En 1529: Martín Lutero publicó su Catecismo Menor para que los padres enseñaran la fe a sus hijos en casa" },
              { texto: "Robert Raikes abrió escuelas dominicales para los hijos de las familias ricas.", verdad: false, explica: "Las abrió en 1780, en Gloucester, para niños pobres que trabajaban toda la semana.", apoyo: "para enseñar a leer y la Biblia a niños pobres que trabajaban toda la semana" },
              { texto: "En las escuelas dominicales de Raikes, los niños aprendían a leer y también la Biblia.", verdad: true, explica: "Raikes abrió escuelas dominicales para enseñar a leer y la Biblia a niños pobres.", apoyo: "Robert Raikes abrió escuelas dominicales en Gloucester, Inglaterra" },
            ],
          },
          {
            consigna: "Sobre los que enseñaron a los niños en la historia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Orbis Pictus de Comenio fue uno de los primeros libros con imágenes para enseñar a los niños.", verdad: true, explica: "Comenio, un pedagogo moravo, lo publicó en 1658.", apoyo: "uno de los primeros libros con imágenes para enseñar a los niños" },
              { texto: "Lutero escribió su Catecismo Menor para que solo los pastores enseñaran la fe.", verdad: false, explica: "Lo escribió para que los padres enseñaran la fe a sus hijos en casa.", apoyo: "para que los padres enseñaran la fe a sus hijos en casa" },
              { texto: "Las escuelas dominicales llegaron a América Latina con los misioneros evangélicos.", verdad: true, explica: "En el siglo XIX, las escuelas dominicales se extendieron por el mundo y llegaron a América Latina.", apoyo: "llegaron a América Latina con los misioneros evangélicos" },
              { texto: "Comenio publicó el Orbis Pictus para enseñar a los adultos a leer la Biblia.", verdad: false, explica: "Era uno de los primeros libros con imágenes para enseñar a los niños.", apoyo: "el pedagogo moravo Juan Amós Comenio publicó el Orbis Pictus" },
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
            caso: "Una maestra nueva te dice: En la iglesia de mi primo enseñan a los niños con un catecismo; eso no sirve, lo nuestro es lo único bueno.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que hay distintas maneras de enseñar, y todas cuentan las obras de Dios.", bien: true, explica: "Las iglesias han enseñado a los niños con catecismos, con escuelas dominicales o con cultos infantiles: todas buscan lo mismo que Israel." },
              { texto: "Que tiene razón: los catecismos son una manera equivocada de enseñar a los niños.", explica: "Con respeto: las iglesias han enseñado de distintas maneras, y todas buscan contar a la generación que viene las obras de Dios." },
              { texto: "Que lo mejor es dejar de lado todo lo antiguo y empezar de cero con lo de hoy.", explica: "El ministerio de niños de hoy hereda una tarea que el pueblo de Dios cumple desde los días de Israel." },
              { texto: "Que la manera no importa, porque a los niños no hace falta enseñarles la fe.", explica: "Desde los días de Israel, el pueblo de Dios buscó maneras de enseñar la fe a sus hijos." },
            ],
            apoyo: "Todas buscan lo mismo que Israel: contar a la generación que viene las obras de Dios",
            explica: "Las iglesias han enseñado a los niños de distintas maneras: con catecismos, con escuelas dominicales o con cultos infantiles. Todas buscan lo mismo que Israel.",
          },
          {
            caso: "Un joven que sirve con los niños te dice: Lo que hacemos es nuevo; antes nadie se preocupaba por enseñar la fe a los niños.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que somos un eslabón de una cadena que empezó en los días de Israel.", bien: true, explica: "El ministerio de niños no empezó con los programas de hoy: hereda la tarea que el pueblo de Dios cumple desde Israel." },
              { texto: "Que tiene razón: el ministerio de niños empezó con los programas de hoy.", explica: "El ministerio de niños no empezó con los programas de hoy." },
              { texto: "Que antes solo se enseñaba a los adultos, y a los niños nunca se les enseñó.", explica: "Desde los días de Israel, el pueblo de Dios buscó maneras de enseñar la fe a sus hijos." },
              { texto: "Que lo nuevo siempre es mejor, así que no hace falta mirar la historia.", explica: "El ministerio de niños de hoy hereda la tarea de contar a la generación que viene las obras de Dios." },
            ],
            apoyo: "Somos un eslabón en la cadena que cuenta las obras de Dios a la generación que viene",
            explica: "Desde los días de Israel, el pueblo de Dios buscó maneras de enseñar la fe a sus hijos. El ministerio de niños de hoy hereda esa tarea: somos un eslabón en la cadena.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El ministerio de niños de hoy hereda esa tarea",
            ref: "Hechos 2:39",
            clave: {
              id: "pr-ninez-1-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué tarea hereda el ministerio de niños de hoy, y desde cuándo la cumple el pueblo de Dios?",
              ideas: [
                { id: "tarea", peso: 50, texto: "La tarea de contar a la generación que viene las obras de Dios: enseñar la fe a los niños.", formas: ["cont* (las|sus) obras", "obras de dios", "generacion que viene", "generacion venidera", "ensen* la fe", "ensen* (la|su) fe a", "ensenarles la fe", "fe a (los|sus) (ninos|hijos)"] },
                { id: "israel", peso: 50, texto: "Desde los días de Israel, y siguió con la iglesia antigua, la Reforma y las escuelas dominicales.", formas: ["israel", "pascua", "desde siempre", "desde el principio", "catecism*", "catecumen*", "lutero", "raikes", "comenio", "escuela* dominical*"] },
              ],
              modelo: "Hereda la tarea de contar a la generación que viene las obras de Dios, enseñando la fe a los niños. El pueblo de Dios la cumple desde los días de Israel, y siguió con la iglesia antigua, Lutero y las escuelas dominicales.",
            },
          },
          {
            apoyo: "Somos un eslabón en la cadena que cuenta las obras de Dios a la generación que viene",
            ref: "Éxodo 12:26-27",
            clave: {
              id: "pr-ninez-1-5-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué se dice que el maestro de niños de hoy es un eslabón en una cadena?",
              ideas: [
                { id: "cadena", peso: 50, texto: "Porque el pueblo de Dios ha enseñado la fe a los niños desde Israel: en la Pascua y después con el catecumenado, el catecismo y las escuelas dominicales.", formas: ["israel", "pascua", "catecism*", "catecumen*", "lutero", "raikes", "comenio", "escuela* dominical*", "generacion en generacion", "desde siempre", "desde el principio", "otros antes"] },
                { id: "misma", peso: 50, texto: "Porque sigue la misma tarea: contar a la generación que viene las obras de Dios.", formas: ["misma tarea", "cont* (las|sus) obras", "obras de dios", "generacion que viene", "generacion venidera", "hereda*", "segui* (la|con|esa) (tarea|obra|cadena)"] },
              ],
              modelo: "Porque el pueblo de Dios enseña la fe a los niños desde los días de Israel, en la Pascua, y después con el catecumenado, el catecismo y las escuelas dominicales. Hoy seguimos la misma tarea: contar a la generación que viene las obras de Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La meta: discípulos que aman a Dios
    "ninez-1-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Puede un niño saberse todas las historias de la Biblia y no amar a Dios?", reverso: "Sí: por eso la meta es más alta, formar discípulos de Jesús.", apoyo: "Un niño puede saberse todas las historias de la Biblia y no amar a Dios" },
              { frente: "¿En cuántos mandamientos resumió Jesús la ley?", reverso: "En dos: amar a Dios y amar al prójimo.", apoyo: "Jesús resumió la ley en dos mandamientos" },
              { frente: "¿Qué es Proverbios 22:6, si no es una garantía automática?", reverso: "Un principio de sabiduría.", apoyo: "El proverbio no es una garantía automática, sino un principio de sabiduría" },
              { frente: "¿Qué le daba a Juan su mayor gozo como padre en la fe?", reverso: "Oír que sus hijos andaban en la verdad.", apoyo: "Juan lo dice como un padre en la fe" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es la meta de la educación cristiana de la niñez?", reverso: "Formar discípulos que amen a Dios y al prójimo.", apoyo: "La meta de la educación cristiana de la niñez es formar discípulos que amen a Dios con todo su ser y al prójimo como a sí mismos" },
              { frente: "¿Dónde sigue formar discípulos cuando termina la clase?", reverso: "En la casa y en la vida.", apoyo: "formar discípulos sigue en la casa y en la vida" },
              { frente: "¿Qué celebra formar discípulos, además de la memoria?", reverso: "También la fe, la oración y el servicio.", apoyo: "formar discípulos celebra también la fe, la oración y el servicio" },
              { frente: "¿Qué pasa con lo que no se escribe y con lo que no se revisa?", reverso: "Lo que no se escribe se olvida; lo que no se revisa se vuelve costumbre.", apoyo: "Lo que no se escribe se olvida, y lo que no se revisa se vuelve costumbre" },
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
            consigna: "Completa la meta de la educación cristiana de la niñez.",
            texto: "La meta es formar discípulos que [[amen]] a Dios con todo su [[ser]] y al [[prójimo]] como a sí mismos.",
            distractores: ["olviden", "miedo", "dinero"],
            errores: {
              olviden: "La meta es formar discípulos que amen a Dios.",
              miedo: "Se ama a Dios con todo el ser: con todo el corazón, con toda el alma y con toda la mente.",
              dinero: "El segundo mandamiento es amar al prójimo como a uno mismo.",
            },
            apoyo: "La meta de la educación cristiana de la niñez es formar discípulos que amen a Dios con todo su ser y al prójimo como a sí mismos",
            ref: "Mateo 22:37-39",
            explica: "Jesús resumió la ley en dos mandamientos: amar a Dios con todo el corazón, el alma y la mente, y al prójimo como a uno mismo. Esa es también la meta con los niños.",
          },
          {
            consigna: "Completa lo que enseña Proverbios 22:6, según la lección.",
            texto: "Proverbios 22:6 es un principio de [[sabiduría]]: lo que se [[siembra]] en la niñez deja [[raíces]] para toda la vida.",
            distractores: ["castigo", "olvida", "dudas"],
            errores: {
              castigo: "El proverbio no es una garantía automática, sino un principio de sabiduría.",
              olvida: "Lo que se siembra en la niñez deja raíces para toda la vida.",
              dudas: "Lo que se siembra en la niñez deja raíces para toda la vida.",
            },
            apoyo: "El proverbio no es una garantía automática, sino un principio de sabiduría: lo que se siembra en la niñez deja raíces para toda la vida",
            ref: "Proverbios 22:6",
            explica: "El proverbio no es una garantía automática, sino un principio de sabiduría: lo que se siembra en la niñez deja raíces para toda la vida.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la meta de la educación cristiana de la niñez: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La meta con los niños es que amen a Dios y a los demás.", verdad: true, explica: "Jesús resumió la ley en dos mandamientos: amar a Dios y amar al prójimo. Esa es también la meta con los niños.", apoyo: "Esa es también la meta con los niños: que amen a Dios y a los demás", ref: "Mateo 22:37-39" },
              { texto: "Si un niño se sabe todas las historias de la Biblia, ya es un discípulo de Jesús.", verdad: false, explica: "Un niño puede saberse todas las historias de la Biblia y no amar a Dios: la meta es más alta, formar discípulos.", apoyo: "Un niño puede saberse todas las historias de la Biblia y no amar a Dios" },
              { texto: "Proverbios 22:6 es una garantía automática de que el niño nunca se apartará.", verdad: false, explica: "El proverbio no es una garantía automática, sino un principio de sabiduría.", apoyo: "El proverbio no es una garantía automática, sino un principio de sabiduría", ref: "Proverbios 22:6" },
            ],
          },
          {
            consigna: "Sobre el fruto de enseñar a los niños: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Lo que se siembra en la niñez deja raíces para toda la vida.", verdad: true, explica: "Por eso el proverbio es un principio de sabiduría, aunque no una garantía automática.", apoyo: "lo que se siembra en la niñez deja raíces para toda la vida", ref: "Proverbios 22:6" },
              { texto: "El fruto que se busca no es solo saber, sino andar en la verdad.", verdad: true, explica: "Juan lo dice como un padre en la fe: «No tengo yo mayor gozo que este, el oír que mis hijos andan en la verdad».", apoyo: "El fruto no es solo saber, sino andar en la verdad", ref: "3 Juan 1:4" },
              { texto: "El mayor gozo de Juan era que sus hijos supieran muchos datos de la Biblia.", verdad: false, explica: "Su mayor gozo era oír que sus hijos andaban en la verdad: el fruto no es solo saber.", apoyo: "el gozo mayor es ver a los hijos andar en la verdad", ref: "3 Juan 1:4" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es enseñar datos o es formar discípulos? Lleva cada frase a su grupo.",
            grupos: ["Enseñar datos", "Formar discípulos"],
            frases: [
              { texto: "Busca que el niño repita", grupo: 0 },
              { texto: "Termina con la clase", grupo: 0 },
              { texto: "Mira solo lo que el niño sabe", grupo: 0 },
              { texto: "Premia la memoria", grupo: 0 },
              { texto: "Busca que el niño ame y obedezca", grupo: 1 },
              { texto: "Sigue en la casa y en la vida", grupo: 1 },
              { texto: "Mira también lo que siente y lo que hace", grupo: 1 },
              { texto: "Celebra la fe, la oración y el servicio", grupo: 1 },
            ],
            apoyo: "Formar discípulos va más allá de enseñar datos",
            explica: "Enseñar datos busca que el niño repita, termina con la clase, mira lo que sabe y premia la memoria; formar discípulos busca que ame y obedezca, sigue en la casa y en la vida, mira también lo que siente y hace, y celebra la fe, la oración y el servicio.",
          },
          {
            consigna: "¿Enseña solo datos o forma discípulos? Lleva cada frase a su grupo.",
            grupos: ["Enseña solo datos", "Forma discípulos"],
            frases: [
              { texto: "Solo premia al niño que recita más versículos", grupo: 0 },
              { texto: "Termina la clase y no vuelve a pensar en los niños", grupo: 0 },
              { texto: "Solo pregunta los nombres y las fechas de la historia", grupo: 0 },
              { texto: "Celebra que un niño oró por un compañero enfermo", grupo: 1 },
              { texto: "Manda a la casa una pregunta para hablar con los padres", grupo: 1 },
              { texto: "Ayuda a los niños a servir en la iglesia y en su casa", grupo: 1 },
              { texto: "Se fija en lo que el niño siente y en lo que hace", grupo: 1 },
            ],
            apoyo: "Enseñar datos premia la memoria; formar discípulos celebra también la fe, la oración y el servicio",
            explica: "Enseñar datos premia la memoria y termina con la clase; formar discípulos celebra también la fe, la oración y el servicio, sigue en la casa y en la vida y mira también lo que el niño siente y lo que hace.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada objetivo del ministerio de niños con lo que busca para cada niño o familia.",
            pares: [
              ["Conocer", "Las grandes historias de la Biblia y el evangelio"],
              ["Creer", "La oportunidad de recibir a Cristo, sin presión"],
              ["Amar", "Aprender a orar y a adorar"],
              ["Pertenecer", "Un adulto que lo conozca por su nombre"],
              ["Acompañar", "Ayuda para que cada familia enseñe la fe en casa"],
            ],
            apoyo: "Ejemplo resuelto: los objetivos de un ministerio de niños",
            explica: "Conocer: las grandes historias de la Biblia y el evangelio; creer: la oportunidad de recibir a Cristo, sin presión; amar: orar, adorar y amar a Dios y a los demás; pertenecer: un adulto que lo conozca por su nombre; acompañar: ayuda para enseñar la fe en casa.",
          },
          {
            consigna: "Une cada cosa que hace el ministerio con el objetivo que cumple.",
            pares: [
              ["Una serie de clases con las grandes historias de la Biblia", "Conocer"],
              ["Una invitación a recibir a Cristo, sin presionar a nadie", "Creer"],
              ["Un niño ayuda a ordenar el salón después de la clase", "Servir"],
              ["Una maestra saluda a cada niño por su nombre", "Pertenecer"],
              ["Una hoja para que los padres hablen de Dios en casa", "Acompañar"],
            ],
            apoyo: "busca que el niño conozca, crea, ame, sirva y pertenezca",
            explica: "Las grandes historias de la Biblia sirven para conocer; la invitación sin presión, para creer; una tarea en la iglesia, para servir; un adulto que conoce a cada niño por su nombre, para pertenecer; y la ayuda a los padres, para acompañar a cada familia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Escribe los objetivos de tu ministerio de niños y revísalos cada año con los maestros y con los padres",
            ref: "Mateo 22:37-39",
            titulo: "Los objetivos del ministerio de niños",
            relato: [
              "Tu iglesia tiene un ministerio de niños desde hace años, pero nunca escribió sus objetivos. Cada maestro enseña a su manera.",
              "El pastor te pide que prepares los objetivos con los maestros y que los presentes a los padres.",
              "En la primera reunión, una maestra dice: Para mí, el objetivo es que los niños se aprendan muchos versículos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a la maestra?",
                opciones: [
                  { texto: "Que es bueno, pero la meta es más alta: que amen a Dios y a los demás.", bien: true, explica: "Un niño puede saberse todas las historias de la Biblia y no amar a Dios: la meta es formar discípulos que amen a Dios y al prójimo." },
                  { texto: "Que tiene razón: si se saben los versículos, ya son discípulos de Jesús.", explica: "Enseñar datos premia la memoria; formar discípulos busca que el niño ame y obedezca." },
                  { texto: "Que los versículos no sirven, y que mejor dejen de aprenderlos en la clase.", explica: "Un niño que sabe la Biblia es una bendición; la meta es más alta: que sea un discípulo que ama a Dios." },
                ],
                apoyo: "Un niño que sabe la Biblia es una bendición; un niño que ama a Dios es un discípulo",
                explica: "Saber la Biblia es una bendición, pero la meta de la educación cristiana es más alta: formar discípulos que amen a Dios y al prójimo.",
              },
              {
                tipo: "situacion",
                pregunta: "Un maestro propone este objetivo: Que todos los niños pasen al frente a recibir a Cristo el mismo día. ¿Qué haces?",
                opciones: [
                  { texto: "Lo cambias: que cada niño tenga la oportunidad de recibir a Cristo, sin presión.", bien: true, explica: "El objetivo de creer es que cada niño tenga la oportunidad de recibir a Cristo, sin presión." },
                  { texto: "Lo dejas así: cuantos más niños pasen al frente ese día, mejor será el ministerio.", explica: "El objetivo de creer es que cada niño tenga la oportunidad de recibir a Cristo, sin presión." },
                  { texto: "Lo quitas: los niños son muy pequeños para recibir a Cristo, y es mejor esperar.", explica: "Uno de los objetivos del ministerio es que cada niño tenga la oportunidad de recibir a Cristo." },
                ],
                apoyo: "Creer: que cada niño tenga la oportunidad de recibir a Cristo, sin presión",
                explica: "Creer: que cada niño tenga la oportunidad de recibir a Cristo, sin presión.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya tienen los objetivos escritos. ¿Qué harán con ellos?",
                opciones: [
                  { texto: "Revisarlos cada año con los maestros y con los padres.", bien: true, explica: "Los objetivos se escriben y se revisan cada año con los maestros y con los padres." },
                  { texto: "Guardarlos en un cajón: lo importante ya fue escribirlos.", explica: "Lo que no se revisa se vuelve costumbre: los objetivos se revisan cada año." },
                  { texto: "Cambiarlos cada domingo, según lo que diga cada maestro.", explica: "Los objetivos se escriben y se revisan cada año, con los maestros y con los padres." },
                ],
                apoyo: "Lo que no se escribe se olvida, y lo que no se revisa se vuelve costumbre",
                explica: "Los objetivos se escriben y se revisan cada año con los maestros y con los padres: lo que no se revisa se vuelve costumbre.",
              },
              {
                tipo: "explica",
                apoyo: "Servir: que cada niño tenga una manera de servir en la iglesia y en su casa",
                clave: {
                  id: "pr-ninez-1-6-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe con tus palabras los objetivos de servir y de pertenecer para el ministerio de niños de tu iglesia.",
                  ideas: [
                    { id: "servir", peso: 50, texto: "Servir: que cada niño tenga una manera de servir en la iglesia y en su casa.", formas: ["serv* en (la|su) (iglesia|casa|hogar|familia)", "sirv* en (la|su) (iglesia|casa|hogar|familia)", "manera de servir", "forma de servir", "(ayud*|colabor*) en (la|su) (iglesia|casa|hogar|clase)", "tarea en (la|su) (iglesia|casa)"] },
                    { id: "pertenecer", peso: 50, texto: "Pertenecer: que cada niño tenga un adulto de la iglesia que lo conozca por su nombre.", formas: ["por su nombre", "(lo|la|los|las) conozca*", "conozca* por", "un adulto", "conoc* su nombre", "sepa su nombre", "(lo|la) llame por"] },
                  ],
                  modelo: "Servir: que cada niño tenga una manera de servir en la iglesia y en su casa. Pertenecer: que cada niño tenga un adulto de la iglesia que lo conozca por su nombre.",
                },
              },
            ],
          },
          {
            apoyo: "Formar discípulos va más allá de enseñar datos: busca que el niño conozca, crea, ame, sirva y pertenezca",
            ref: "3 Juan 1:4",
            titulo: "Un ministerio con muchos premios",
            relato: [
              "El ministerio de niños de tu iglesia da un premio cada mes al niño que más versículos recita. Los niños compiten, pero algunos ya no quieren venir.",
              "El pastor te pide revisar con los maestros los objetivos del ministerio para el próximo año.",
              "Quieres que el ministerio forme discípulos, y no solo niños que repiten.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué ves en lo que hace hoy el ministerio?",
                opciones: [
                  { texto: "Que premia la memoria, y la meta es formar discípulos que amen a Dios.", bien: true, explica: "Enseñar datos premia la memoria; formar discípulos busca que el niño ame y obedezca." },
                  { texto: "Que todo va muy bien, porque los niños que más recitan ya son discípulos.", explica: "Un niño puede saberse todas las historias de la Biblia y no amar a Dios." },
                  { texto: "Que hay que dar premios más grandes, para que vuelvan los niños que faltan.", explica: "Formar discípulos celebra también la fe, la oración y el servicio, no solo la memoria." },
                ],
                apoyo: "Enseñar datos premia la memoria; formar discípulos celebra también la fe, la oración y el servicio",
                explica: "Enseñar datos premia la memoria; formar discípulos celebra también la fe, la oración y el servicio, y busca que el niño ame y obedezca.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué propones que el ministerio celebre, además de la memoria?",
                opciones: [
                  { texto: "La fe, la oración y el servicio de los niños.", bien: true, explica: "Formar discípulos celebra también la fe, la oración y el servicio." },
                  { texto: "Solo al niño que llega más temprano cada domingo.", explica: "Formar discípulos celebra también la fe, la oración y el servicio." },
                  { texto: "Al niño que trae más dinero para la ofrenda del mes.", explica: "Formar discípulos celebra también la fe, la oración y el servicio." },
                ],
                apoyo: "formar discípulos celebra también la fe, la oración y el servicio",
                explica: "Formar discípulos va más allá de enseñar datos: celebra también la fe, la oración y el servicio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué objetivo escriben para que cada niño se sienta parte de la iglesia?",
                opciones: [
                  { texto: "Que cada niño tenga un adulto que lo conozca por su nombre.", bien: true, explica: "Pertenecer: que cada niño tenga un adulto de la iglesia que lo conozca por su nombre." },
                  { texto: "Que cada niño tenga un premio distinto al final de cada mes.", explica: "Pertenecer es que cada niño tenga un adulto de la iglesia que lo conozca por su nombre." },
                  { texto: "Que cada niño recite más versículos que sus compañeros de clase.", explica: "Formar discípulos va más allá de enseñar datos." },
                ],
                apoyo: "Pertenecer: que cada niño tenga un adulto de la iglesia que lo conozca por su nombre",
                explica: "Pertenecer: que cada niño tenga un adulto de la iglesia que lo conozca por su nombre.",
              },
              {
                tipo: "explica",
                apoyo: "Conocer: que cada niño conozca las grandes historias de la Biblia y el evangelio, según su edad",
                clave: {
                  id: "pr-ninez-1-6-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe con tus palabras los objetivos de conocer y de creer para el ministerio de niños de tu iglesia.",
                  ideas: [
                    { id: "conocer", peso: 50, texto: "Conocer: que cada niño conozca las grandes historias de la Biblia y el evangelio, según su edad.", formas: ["historias de la biblia", "grandes historias", "el evangelio", "segun su edad", "(conozca|conozcan|conocer|aprenda|aprendan) (la|las|el) (biblia|historias|evangelio)"] },
                    { id: "creer", peso: 50, texto: "Creer: que cada niño tenga la oportunidad de recibir a Cristo, sin presión.", formas: ["recib* a (cristo|jesus)", "oportunidad", "sin presion", "sin presionar*", "sin obligar*", "(acept*|crea|crean|creer) en (cristo|jesus)"] },
                  ],
                  errores: [
                    { id: "presion", texto: "El objetivo de creer es que cada niño tenga la oportunidad de recibir a Cristo, sin presión.", formas: ["(presion*|oblig*) a (los|cada|todos)", "todos (pasen|pasan) al frente"], anula: "creer" },
                  ],
                  modelo: "Conocer: que cada niño conozca las grandes historias de la Biblia y el evangelio, según su edad. Creer: que cada niño tenga la oportunidad de recibir a Cristo, sin presión.",
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
            apoyo: "Formar discípulos va más allá de enseñar datos",
            ref: "3 Juan 1:4",
            clave: {
              id: "pr-ninez-1-6-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencia enseñar datos de formar discípulos?",
              ideas: [
                { id: "datos", peso: 50, texto: "Enseñar datos busca que el niño repita, mira lo que sabe, premia la memoria y termina con la clase.", formas: ["repit*", "memoria", "lo que (sabe|sepa)", "termina con la clase", "solo saber"] },
                { id: "discipulos", peso: 50, texto: "Formar discípulos busca que el niño ame y obedezca, mira también lo que siente y hace, y sigue en la casa y en la vida.", formas: ["ame y obedezca", "amar y obedecer", "(ame|amen|amar) a dios", "obedez*", "obedec*", "en la casa y en la vida", "sigue en la (casa|vida)", "lo que siente", "lo que hace", "andar en la verdad", "anden en la verdad"] },
              ],
              errores: [
                { id: "igual", texto: "Formar discípulos va más allá de enseñar datos.", formas: ["son lo mismo", "es lo mismo", "no hay diferencia", "ninguna diferencia"], anula: "discipulos" },
                { id: "igual-datos", texto: "Enseñar datos y formar discípulos no son lo mismo: enseñar datos busca que el niño repita.", formas: ["son lo mismo", "es lo mismo", "no hay diferencia", "ninguna diferencia"], anula: "datos" },
              ],
              modelo: "Enseñar datos busca que el niño repita, mira lo que sabe, premia la memoria y termina con la clase. Formar discípulos busca que el niño ame y obedezca, mira también lo que siente y hace, y sigue en la casa y en la vida.",
            },
          },
          {
            apoyo: "Un niño que sabe la Biblia es una bendición; un niño que ama a Dios es un discípulo",
            ref: "3 Juan 1:4",
            clave: {
              id: "pr-ninez-1-6-a7-2",
              tipo: "corta",
              pregunta: "Un maestro dice que su clase va muy bien porque los niños repiten de memoria todas las historias. ¿Qué le dirías?",
              ideas: [
                { id: "bendicion", peso: 50, texto: "Que saber la Biblia es una bendición, pero un niño puede saberla y no amar a Dios.", formas: ["bendicion", "no amar a dios", "y no (ame|amen|amar)", "no basta", "no es suficiente"] },
                { id: "meta", peso: 50, texto: "Que la meta es más alta: formar discípulos que amen a Dios, obedezcan y anden en la verdad.", formas: ["mas alta", "formar discipulos", "discipulo*", "(ame|amen) a dios", "obedez*", "obedec*", "andar en la verdad", "anden en la verdad"] },
              ],
              errores: [
                { id: "basta", texto: "Un niño puede saberse todas las historias de la Biblia y no amar a Dios.", formas: ["con eso basta", "ya (son|es) discipul*", "tiene razon"], anula: "meta" },
                { id: "basta-saber", texto: "Saber la Biblia es una bendición, pero no basta: la meta es formar discípulos.", formas: ["con eso basta", "ya (son|es) discipul*", "tiene razon"], anula: "bendicion" },
              ],
              modelo: "Le diría que saber la Biblia es una bendición, pero un niño puede saberse todas las historias y no amar a Dios. La meta es más alta: formar discípulos que amen a Dios, obedezcan y anden en la verdad.",
            },
          },
        ],
      },
    ],
  },
};
