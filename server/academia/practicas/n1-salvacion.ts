// Las prácticas de las lecciones de «La salvación: nueva vida en Cristo» (Nivel 1). Es el modelo de las demás: cada
// actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección.
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N1_SALVACION: PracticasMateria = {
  materia: "n1-salvacion",
  mision: {
    titulo: "La noticia que cambia la vida",
    intro: "Un amigo te pide que le expliques el evangelio de principio a fin: quién es Jesús, qué hizo, cómo se recibe y cómo saber que es para siempre. Repasa las cuatro lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar quién es Jesús, qué es el evangelio, cómo se recibe la salvación y por qué puedes estar seguro.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. ¿Quién es Jesús?
    "n1-salvacion-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué confesó Pedro acerca de Jesús?", reverso: "Que Jesús es el Cristo, el Hijo del Dios viviente.", apoyo: "Pedro respondió que Jesús es el Cristo, el Hijo del Dios viviente." },
              { frente: "¿Qué significa la palabra Cristo?", reverso: "Lo mismo que Mesías en hebreo: el Ungido, el Salvador prometido por Dios.", apoyo: "La palabra Cristo viene del griego y significa lo mismo que Mesías en hebreo" },
              { frente: "¿Por qué Juan llama a Jesús el Verbo?", reverso: "Porque es la Palabra de Dios: la expresión perfecta de quién es Dios.", apoyo: "Jesús es la expresión perfecta de quién es Dios." },
              { frente: "¿Qué es recibir a Jesús?", reverso: "Confiar en Él como Salvador y darle el primer lugar como Señor.", apoyo: "Recibirlo es confiar en Él como Salvador y darle el primer lugar como Señor." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde preguntó Jesús a sus discípulos quién decían que era Él?", reverso: "En la región de Cesarea de Filipo.", apoyo: "en la región de Cesarea de Filipo" },
              { frente: "¿Quién le reveló a Pedro quién es Jesús?", reverso: "El Padre: no salió de la inteligencia de Pedro.", apoyo: "esa respuesta no salió de la inteligencia de Pedro, sino que se la reveló el Padre" },
              { frente: "¿Por qué importa que Jesús sea Dios y hombre?", reverso: "Como Dios, puede salvarnos; como hombre, pudo tomar nuestro lugar.", apoyo: "Como Dios, puede salvarnos; como hombre, pudo tomar nuestro lugar." },
              { frente: "¿Quién llega a ser hijo de Dios?", reverso: "Quien recibe a Jesús y cree en su nombre.", apoyo: "quien lo recibe y cree en su nombre llega a ser hijo de Dios" },
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
            texto: "Pedro confesó que Jesús es el [[Cristo]], el Hijo del Dios [[viviente]]. La palabra Cristo significa lo mismo que [[Mesías]] en hebreo: el Ungido.",
            distractores: ["profeta", "maestro", "Elías"],
            errores: {
              profeta: "Eso decía la gente: unos lo veían como uno de los profetas. Pedro fue más allá.",
              maestro: "Jesús enseñaba, pero Pedro confesó mucho más: que es el Cristo, el Hijo del Dios viviente.",
              Elías: "Algunos decían que era Elías: una opinión respetuosa, pero no suficiente.",
            },
            apoyo: "Pedro respondió que Jesús es el Cristo, el Hijo del Dios viviente.",
            ref: "Mateo 16:16; Juan 1:41",
            explica: "Cristo (en griego) y Mesías (en hebreo) quieren decir lo mismo: el Ungido, el Salvador que Dios había prometido.",
          },
          {
            texto: "Cuando Jesús preguntó qué decía la gente, unos respondieron Juan el Bautista y otros [[Elías]]. Pedro dijo que Jesús es el [[Cristo]], y Jesús le explicó que eso se lo había revelado el [[Padre]].",
            distractores: ["Moisés", "rey", "pueblo"],
            errores: {
              pueblo: "La respuesta de Pedro no vino de la gente ni de su inteligencia: se la reveló el Padre.",
              rey: "Pedro no dijo solo que era un rey: confesó que es el Cristo, el Hijo del Dios viviente.",
            },
            apoyo: "esa respuesta no salió de la inteligencia de Pedro, sino que se la reveló el Padre",
            ref: "Mateo 16:13-17",
            explica: "La gente tenía opiniones respetuosas pero insuficientes. Conocer de verdad a Jesús es un regalo que Dios da.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            afirmaciones: [
              { texto: "Jesús empezó a existir cuando nació en Belén.", verdad: false, explica: "Juan dice que el Verbo ya existía en el principio, estaba con Dios y era Dios: Jesús es el Hijo eterno.", apoyo: "Jesús no empezó a existir en Belén.", ref: "Juan 1:1-2" },
              { texto: "Como hombre, Jesús tuvo hambre, se cansó y lloró.", verdad: true, explica: "El Verbo se hizo hombre de verdad: nació de una mujer y vivió como uno de nosotros.", apoyo: "Jesús nació de una mujer, creció, tuvo hambre, se cansó y lloró.", ref: "Juan 1:14" },
              { texto: "Todas las cosas fueron hechas por medio de Jesús.", verdad: true, explica: "Antes de nacer como hombre ya era el Hijo eterno, y la creación fue hecha por medio de Él.", apoyo: "todas las cosas fueron hechas por medio de Él", ref: "Juan 1:3" },
            ],
          },
          {
            afirmaciones: [
              { texto: "Jesús fue un buen maestro, pero no era Dios.", verdad: false, explica: "Juan dice que el Verbo era Dios y que se hizo hombre: Jesús es verdadero Dios y verdadero hombre.", apoyo: "Por eso decimos que Jesús es verdadero Dios y verdadero hombre.", ref: "Juan 1:1, 14" },
              { texto: "Juan llama a Jesús el Verbo, es decir, la Palabra de Dios.", verdad: true, explica: "Así como nuestras palabras expresan lo que pensamos, Jesús es la expresión perfecta de quién es Dios.", apoyo: "llama a Jesús el Verbo, es decir, la Palabra de Dios", ref: "Juan 1:1" },
              { texto: "Jesús se hizo hombre, pero nunca sintió cansancio ni dolor.", verdad: false, explica: "Jesús tuvo hambre, se cansó y lloró: era hombre de verdad, y así pudo tomar nuestro lugar.", apoyo: "Jesús nació de una mujer, creció, tuvo hambre, se cansó y lloró.", ref: "Juan 1:14" },
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
            consigna: "Lleva cada frase a su grupo.",
            grupos: ["Saber acerca de Jesús", "Recibir a Jesús"],
            frases: [
              { texto: "Conocer los datos de su vida", grupo: 0 },
              { texto: "Decir que fue un buen maestro", grupo: 0, explica: "Es una opinión respetuosa, pero no basta." },
              { texto: "Haber nacido en una familia cristiana", grupo: 0, explica: "Ser hijo de Dios no viene por la familia en que nacimos." },
              { texto: "Confiar en Él como Salvador", grupo: 1 },
              { texto: "Darle el primer lugar como Señor", grupo: 1 },
              { texto: "Creer en su nombre", grupo: 1 },
            ],
            apoyo: "Aquí está la diferencia entre saber acerca de Jesús y conocerlo.",
            ref: "Juan 1:12-13",
            explica: "Saber datos u opinar bien de Jesús no hace a nadie hijo de Dios; eso pasa cuando lo recibimos y creemos en su nombre.",
          },
          {
            consigna: "¿Qué nos hace hijos de Dios y qué no?",
            grupos: ["No nos hace hijos de Dios", "Así llegamos a ser hijos de Dios"],
            frases: [
              { texto: "La familia en que nacimos", grupo: 0 },
              { texto: "Nuestra fuerza de voluntad", grupo: 0 },
              { texto: "La decisión de otra persona", grupo: 0 },
              { texto: "Saber muchos datos de Jesús", grupo: 0, explica: "Saber acerca de Jesús no es lo mismo que recibirlo." },
              { texto: "Recibir a Jesús", grupo: 1 },
              { texto: "Creer en su nombre", grupo: 1 },
            ],
            apoyo: "Ser hijo de Dios no viene por la familia en que nacimos, ni por nuestra fuerza de voluntad, ni por la decisión de otra persona",
            ref: "Juan 1:12-13",
            explica: "Ser hijo de Dios viene de Dios: llega cuando recibimos a Jesús y creemos en su nombre.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "En el trabajo, un compañero te dice: Jesús fue un buen maestro, como muchos otros.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Sí, cada quien tiene su maestro y todos valen lo mismo.", explica: "Así Jesús queda como uno más. Las opiniones de la gente eran respetuosas, pero ninguna era suficiente." },
              { texto: "Fue más que un maestro: la Biblia dice que es Dios hecho hombre, y yo confío en Él.", bien: true, explica: "Responde con respeto, dice quién es Jesús según Juan 1 y cuenta lo que Él significa para ti." },
              { texto: "Mejor no hablemos de religión.", explica: "Evitar el tema pierde la ocasión de responder la pregunta más importante." },
              { texto: "Si no crees en Jesús, no tiene sentido hablar contigo.", explica: "Es una respuesta dura que cierra la puerta. Se puede hablar de Jesús con firmeza y con amor." },
            ],
            apoyo: "Eran opiniones respetuosas, pero ninguna era suficiente.",
            ref: "Juan 1:1, 14",
            explica: "Jesús enseñó como nadie, pero la Biblia dice mucho más: es el Cristo, Dios hecho hombre.",
          },
          {
            caso: "Tu sobrina de 12 años te pregunta si Jesús ya existía antes de nacer en Belén.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Sí: antes de nacer como hombre ya era el Hijo eterno, y todo fue hecho por medio de Él.", bien: true, explica: "Así lo enseña Juan 1:1-3: el Verbo ya existía en el principio." },
              { texto: "No, empezó a existir cuando nació de María.", explica: "Jesús no empezó a existir en Belén: ya existía en el principio y estaba con Dios." },
              { texto: "Nadie lo sabe; es un misterio sin respuesta.", explica: "La Biblia sí responde: Juan dice que el Verbo existía en el principio." },
              { texto: "Existía, pero como un ángel.", explica: "Juan no dice que era un ángel: dice que el Verbo era Dios." },
            ],
            apoyo: "Antes de nacer como hombre ya era el Hijo eterno, y todas las cosas fueron hechas por medio de Él.",
            ref: "Juan 1:1-3",
            explica: "Jesús es el Hijo eterno: no empezó a existir en Belén, sino que se hizo hombre allí.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Como Dios, puede salvarnos; como hombre, pudo tomar nuestro lugar.",
            ref: "Juan 1:1, 14",
            clave: {
              id: "pr-n1-salvacion-1-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué importa que Jesús sea verdadero Dios y verdadero hombre?",
              ideas: [
                { id: "dios", peso: 50, texto: "Como Dios, puede salvarnos.", formas: ["dios salv*", "como dios", "puede salv*", "pudo salv*", "es dios"] },
                { id: "hombre", peso: 50, texto: "Como hombre, pudo tomar nuestro lugar.", formas: ["tom* (nuestro|mi) lugar", "en (nuestro|mi) lugar", "ocup* (nuestro|mi) lugar", "murio por (nosotros|mi)", "como hombre", "hombre lugar"] },
              ],
              modelo: "Importa porque, como Dios, Jesús puede salvarnos, y como hombre pudo tomar nuestro lugar y morir por nosotros en la cruz.",
            },
          },
          {
            apoyo: "ese Verbo se hizo hombre y vivió entre nosotros",
            ref: "Juan 1:14",
            clave: {
              id: "pr-n1-salvacion-1-a6-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir que el Verbo se hizo hombre?",
              ideas: [
                { id: "vino", peso: 50, texto: "Dios mismo se hizo hombre y vivió entre nosotros: no se quedó lejos.", formas: ["dios se hizo hombre", "se hizo hombre", "vivio entre nosotros", "habito entre nosotros", "no se quedo lejos", "se hizo carne"] },
                { id: "humano", peso: 50, texto: "Fue hombre de verdad: nació, creció, tuvo hambre, se cansó y lloró.", formas: ["naci* de una mujer", "tuvo hambre", "se canso", "lloro", "creci*", "hombre de verdad", "verdadero hombre", "como nosotros"] },
              ],
              modelo: "Que Jesús, que era Dios, se hizo hombre de verdad y vivió entre nosotros: nació de una mujer, tuvo hambre, se cansó y lloró. Dios no se quedó lejos.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. El evangelio: el pecado y el regalo de Dios
    "n1-salvacion-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es pecar?", reverso: "Apartarse de lo que Dios quiere: vivir a nuestra manera en lugar de a la suya.", apoyo: "Pecar es apartarse de lo que Dios quiere: vivir a nuestra manera en lugar de a la suya." },
              { frente: "¿A quién alcanza el pecado?", reverso: "A todos: la Biblia no deja a nadie fuera.", apoyo: "La Biblia no deja a nadie fuera" },
              { frente: "¿Qué hace el pecado entre nosotros y Dios?", reverso: "Nos separa de Dios, que es santo.", apoyo: "nos separa de Dios, que es santo" },
              { frente: "¿Qué es una dádiva?", reverso: "Un regalo: la vida eterna en Cristo Jesús.", apoyo: "Una dádiva es un regalo." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Solo los crímenes graves son pecado?", reverso: "No: también el orgullo, la mentira, la envidia, el rencor y no amar a Dios por encima de todo.", apoyo: "También son pecado el orgullo, la mentira, la envidia, el rencor y no amar a Dios por encima de todo" },
              { frente: "¿Qué quiere decir estar destituidos de la gloria de Dios?", reverso: "Que nos quedamos cortos: ninguno llega a la medida santa de Dios.", apoyo: "quiere decir que nos quedamos cortos: ninguno llega a la medida santa de Dios" },
              { frente: "¿Cuál es la paga del pecado?", reverso: "La muerte: la separación de Dios.", apoyo: "lo que el pecado nos da a cambio es la muerte, la separación de Dios" },
              { frente: "¿Cuándo murió Cristo por nosotros?", reverso: "Cuando todavía éramos pecadores.", apoyo: "Cristo murió por nosotros cuando todavía éramos pecadores." },
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
            frases: [
              "Pecar es apartarse de lo que Dios quiere.",
              "El orgullo, la mentira y el rencor también son pecado.",
              "Solo las personas que cometen crímenes graves han pecado.",
              "El pecado nos separa de Dios, que es santo.",
            ],
            malo: 2,
            correccion: "Todos hemos pecado: la Biblia no deja a nadie fuera.",
            apoyo: "No se trata solo de crímenes graves.",
            ref: "Romanos 3:23",
            explica: "El pecado no es solo cosa de crímenes graves: todos nos quedamos cortos ante la medida santa de Dios.",
          },
          {
            frases: [
              "Todos hemos pecado y nos quedamos cortos ante la gloria de Dios.",
              "Ninguno llega a la medida santa de Dios.",
              "El pecado es un detalle sin importancia.",
              "Nadie puede presentarse ante Dios diciendo que es lo bastante bueno.",
            ],
            malo: 2,
            correccion: "El pecado no es un detalle sin importancia: nos separa de Dios.",
            apoyo: "el pecado no es un detalle sin importancia: nos separa de Dios, que es santo",
            ref: "Isaías 59:2",
            explica: "El pecado rompe la relación con Dios; por eso necesitamos la solución que Él da en Cristo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            grupos: ["La paga del pecado", "El regalo de Dios"],
            frases: [
              { texto: "La muerte", grupo: 0 },
              { texto: "La separación de Dios", grupo: 0 },
              { texto: "Lo que ganamos por pecar", grupo: 0 },
              { texto: "La vida eterna", grupo: 1 },
              { texto: "Lo que no se puede comprar", grupo: 1 },
              { texto: "Lo que Dios da en Cristo Jesús", grupo: 1 },
            ],
            apoyo: "La muerte la ganamos; la vida eterna, Dios nos la regala.",
            ref: "Romanos 6:23",
            explica: "Una paga se gana: el pecado nos da muerte. Una dádiva es un regalo: Dios nos regala la vida eterna en Cristo.",
          },
          {
            grupos: ["La mala noticia", "La buena noticia"],
            frases: [
              { texto: "Todos hemos pecado", grupo: 0 },
              { texto: "La paga del pecado es muerte", grupo: 0 },
              { texto: "Nos quedamos cortos ante Dios", grupo: 0 },
              { texto: "Dios envió a su Hijo", grupo: 1 },
              { texto: "Cristo murió y resucitó por nosotros", grupo: 1 },
              { texto: "La vida eterna es un regalo", grupo: 1 },
            ],
            apoyo: "La primera es una mala noticia: la paga del pecado es muerte.",
            ref: "Romanos 6:23; 5:8",
            explica: "El evangelio es buena noticia porque responde a un problema real: Dios mismo dio el primer paso en Cristo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Pon en orden lo que pasa en Juan 3:16.",
            pasos: ["Dios amó al mundo", "Dios dio a su Hijo", "Nosotros creemos en Él", "Recibimos vida eterna"],
            apoyo: "Dios amó, Dios dio, nosotros creemos y recibimos vida eterna",
            ref: "Juan 3:16",
            explica: "La iniciativa es de Dios: primero Él amó y dio; nosotros creemos y recibimos.",
          },
          {
            consigna: "Ordena cómo respondió Dios a nuestro problema, según la lección.",
            pasos: ["Dios nos amó cuando todavía éramos pecadores", "Envió a su Hijo, Jesús", "Jesús murió en la cruz en nuestro lugar", "Al tercer día resucitó", "Quien cree recibe vida eterna"],
            apoyo: "Dios no nos dejó perdidos: Él mismo dio el primer paso.",
            ref: "Juan 3:16; Romanos 5:8",
            explica: "Dios no esperó a que fuéramos buenos: amó, envió a su Hijo, y quien cree recibe la vida eterna.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una amiga te dice: Yo soy buena persona, no le hago daño a nadie; seguro que Dios me acepta por eso.",
            pregunta: "¿Qué le respondes con amor?",
            opciones: [
              { texto: "Tienes razón: lo importante es ser buena persona.", explica: "Nadie puede presentarse ante Dios diciendo que es lo bastante bueno: todos nos quedamos cortos." },
              { texto: "Ser buena es bueno, pero nadie llega a la medida de Dios. Por eso la salvación es un regalo que Dios da en Cristo.", bien: true, explica: "Reconoce lo bueno, explica el problema del pecado y presenta el regalo de Dios." },
              { texto: "Nadie es bueno, así que no hay esperanza.", explica: "Se queda en la mala noticia: falta el regalo de Dios en Cristo." },
              { texto: "Si haces más obras buenas, Dios te aceptará.", explica: "La salvación no se gana: las buenas obras vienen después, como fruto y no como precio." },
            ],
            apoyo: "Por eso nadie puede decir que se salvó por ser buena persona.",
            ref: "Romanos 3:23; 6:23",
            explica: "La salvación no es un premio por portarse bien: es un regalo que se recibe con gratitud.",
          },
          {
            caso: "Un compañero de estudio te pregunta: Si la salvación es gratis, ¿para qué sirven las buenas obras?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "No sirven para nada.", explica: "Las buenas obras son importantes; solo que no son el precio de la salvación." },
              { texto: "Son importantes, pero vienen después: son fruto de la salvación, no su precio.", bien: true, explica: "Así lo dice la lección con Efesios 2:10." },
              { texto: "Sirven para pagar una parte de la salvación.", explica: "Un regalo no se compra: si se paga, ya no es regalo." },
              { texto: "Sirven para que Dios nos ame más.", explica: "Dios nos amó cuando todavía éramos pecadores (Romanos 5:8)." },
            ],
            apoyo: "Las buenas obras son importantes, pero vienen después, como fruto de la salvación y no como su precio",
            ref: "Efesios 2:10",
            explica: "Si la salvación es un regalo, no se puede pagar ni ganar; las obras son el fruto de haberla recibido.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios amó, Dios dio, nosotros creemos y recibimos vida eterna",
            ref: "Juan 3:16",
            clave: {
              id: "pr-n1-salvacion-2-a6-1",
              tipo: "corta",
              pregunta: "Explica Juan 3:16 con tus palabras.",
              ideas: [
                { id: "amor", peso: 35, texto: "Dios ama al mundo.", formas: ["dios am*", "amor de dios", "nos ama", "nos amo", "amo al mundo"] },
                { id: "dio", peso: 35, texto: "Dios dio a su Hijo.", formas: ["dio a su hijo", "dio su hijo", "envio a su hijo", "entrego a su hijo", "dio a jesus"] },
                { id: "creer", peso: 30, texto: "Quien cree en Él tiene vida eterna.", formas: ["el que cree", "todo aquel que cree", "cree* en (el|jesus)", "creemos", "vida eterna"] },
              ],
              modelo: "Dios ama tanto al mundo que dio a su Hijo Jesús, para que todo el que cree en Él no se pierda y tenga vida eterna.",
            },
          },
          {
            apoyo: "La iniciativa es de Dios.",
            ref: "Juan 3:16; Romanos 5:8",
            clave: {
              id: "pr-n1-salvacion-2-a6-2",
              tipo: "corta",
              pregunta: "¿Quién da el primer paso en Juan 3:16 y qué nos toca a nosotros?",
              ideas: [
                { id: "inicia", peso: 50, texto: "Dios da el primer paso: Él amó y dio a su Hijo.", formas: ["primer paso", "iniciativa", "dios amo", "dios dio", "dios nos amo", "dios da"] },
                { id: "creer", peso: 50, texto: "A nosotros nos toca creer y recibir la vida eterna.", formas: ["creer", "creemos", "confiar", "recibir* vida", "recibimos"] },
              ],
              modelo: "Dios da el primer paso: Él nos amó y dio a su Hijo cuando todavía éramos pecadores. A nosotros nos toca creer en Jesús y recibir la vida eterna.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Arrepentimiento y fe
    "n1-salvacion-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué significa arrepentirse?", reverso: "Cambiar de mentalidad y volverse a Dios: dar media vuelta.", apoyo: "La palabra del Nuevo Testamento significa cambiar de mentalidad" },
              { frente: "¿Qué promete Dios a quien se arrepiente y se convierte?", reverso: "Le borra los pecados.", apoyo: "a quien se arrepiente y se convierte, Dios le borra los pecados" },
              { frente: "¿Qué es la gracia?", reverso: "El favor de Dios que no merecemos.", apoyo: "La gracia es el favor de Dios que no merecemos" },
              { frente: "¿Qué es la fe en esta lección?", reverso: "La mano vacía que recibe el regalo.", apoyo: "La fe es la mano vacía que recibe ese regalo." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Arrepentirse es solo sentir tristeza?", reverso: "No: es reconocer el pecado, dejar de justificarlo y volverse a Dios.", apoyo: "Arrepentirse no es solo sentir tristeza o vergüenza." },
              { frente: "¿Guarda Dios los pecados que borra?", reverso: "No los guarda para echárnoslos en cara después.", apoyo: "No los guarda para echárselos en cara después." },
              { frente: "¿Qué es creer con el corazón?", reverso: "Confiar de verdad en que Jesús murió por ti y en que Dios lo levantó de los muertos.", apoyo: "Creer con el corazón es confiar de verdad en que Jesús murió por ti y en que Dios lo levantó de los muertos." },
              { frente: "¿Qué es confesar con la boca?", reverso: "Declarar abiertamente que Jesús es tu Señor.", apoyo: "Confesar con la boca es declarar abiertamente que Jesús es tu Señor" },
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
            afirmaciones: [
              { texto: "Arrepentirse es solo sentirse triste por lo que hice.", verdad: false, explica: "Es cambiar de mentalidad y de dirección: reconocer el pecado, dejar de justificarlo y volverse a Dios.", apoyo: "Arrepentirse no es solo sentir tristeza o vergüenza.", ref: "Hechos 3:19" },
              { texto: "A quien se arrepiente y se convierte, Dios le borra los pecados.", verdad: true, explica: "Es la promesa de Hechos 3:19: el arrepentimiento es la puerta al perdón.", apoyo: "a quien se arrepiente y se convierte, Dios le borra los pecados", ref: "Hechos 3:19" },
              { texto: "El arrepentimiento es un castigo que pagamos por nuestros pecados.", verdad: false, explica: "No es un castigo que pagamos: es la puerta por la que entramos al perdón.", apoyo: "El arrepentimiento no es un castigo que pagamos: es la puerta por la que entramos al perdón." },
            ],
          },
          {
            afirmaciones: [
              { texto: "Arrepentirse es como dar media vuelta en un camino equivocado.", verdad: true, explica: "La Biblia lo describe como un cambio de dirección: volverse a Dios.", apoyo: "Es como quien va por un camino equivocado, se da cuenta y da media vuelta." },
              { texto: "Dios perdona, pero guarda los pecados para recordárnoslos después.", verdad: false, explica: "Dios borra los pecados de quien se arrepiente: no los usa contra nosotros.", apoyo: "No los guarda para echárselos en cara después.", ref: "Hechos 3:19" },
              { texto: "Arrepentirse incluye dejar de justificar mi pecado.", verdad: true, explica: "Reconocer el pecado sin excusas es parte de volverse a Dios.", apoyo: "dejar de justificar mi pecado y volverme a Él" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            texto: "La [[gracia]] es el favor de Dios que no merecemos. La [[fe]] es la mano vacía que recibe ese regalo.",
            distractores: ["suerte", "obediencia", "ley"],
            errores: {
              obediencia: "La obediencia es fruto de la fe, pero no es la mano que recibe el regalo: esa mano es la fe.",
              ley: "La ley no salva: la gracia es el favor que Dios nos da sin que lo merezcamos.",
            },
            apoyo: "La gracia es el favor de Dios que no merecemos: Dios nos da lo bueno que no ganamos.",
            ref: "Efesios 2:8-9",
            explica: "Por gracia, mediante la fe: Dios da el regalo y la fe lo recibe.",
          },
          {
            texto: "La fe que salva no es solo aceptar que Jesús existió: es [[confianza]] personal, como quien se [[sienta]] en una silla confiando en que lo va a sostener.",
            distractores: ["costumbre", "levanta", "sabiduría"],
            errores: {
              costumbre: "La fe no es una costumbre religiosa: es apoyar todo el peso de la vida en Jesús.",
              sabiduría: "No es solo saber cosas de Dios: hasta los demonios creen que hay un solo Dios.",
            },
            apoyo: "La fe que salva es confianza personal",
            ref: "Santiago 2:19; Efesios 2:8",
            explica: "La fe que salva confía en Jesús; no se queda en saber cosas de Él.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            pares: [
              ["La gracia", "El favor de Dios que no merecemos"],
              ["La fe", "La mano vacía que recibe el regalo"],
              ["Creer como los demonios", "Aceptar que hay un solo Dios, sin confiar en Él"],
              ["La fe que salva", "Apoyar todo el peso de mi vida en lo que Jesús hizo"],
            ],
            apoyo: "La fe que salva es confianza personal: apoyar todo el peso de mi vida en lo que Jesús hizo por mí",
            ref: "Efesios 2:8-9; Santiago 2:19",
            explica: "Saber que Dios existe no basta: la fe que salva es confianza personal en Jesús, y recibe lo que la gracia da.",
          },
          {
            pares: [
              ["La gracia", "Dios nos da lo bueno que no ganamos"],
              ["La fe", "Confianza personal en lo que Jesús hizo"],
              ["Las obras", "No son el camino para salvarse"],
              ["La gloria", "Es toda de Dios"],
            ],
            apoyo: "Toda la gloria es de Dios.",
            ref: "Efesios 2:8-9",
            explica: "No es por obras, para que nadie se gloríe: nadie podrá decir que lo logró por sí mismo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Después de la reunión, un joven te dice: Quiero recibir a Jesús, pero no sé qué palabras exactas tengo que decir.",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Si no dices la oración exacta, no cuenta.", explica: "No son las palabras las que salvan, sino la fe en Jesús que esas palabras expresan." },
              { texto: "Lo que salva es creer de corazón en Jesús y confesarlo como tu Señor; puedes decírselo a Dios con tus palabras.", bien: true, explica: "Es lo que enseña Romanos 10:9-10: creer con el corazón y confesar con la boca." },
              { texto: "Primero arregla tu vida y después vuelves.", explica: "La salvación es un regalo: no hay que arreglarse primero para recibirla." },
              { texto: "Basta con que vengas a la iglesia.", explica: "Asistir es bueno, pero la salvación se recibe creyendo en Jesús y confesándolo como Señor." },
            ],
            apoyo: "Recuerda: no son las palabras las que salvan, sino la fe en Jesús que esas palabras expresan.",
            ref: "Romanos 10:9-10",
            explica: "Creer con el corazón y confesar con la boca: así se recibe la salvación.",
          },
          {
            caso: "Una señora de tu iglesia dice: Yo creo en Jesús en mi corazón, pero eso es algo privado; no hace falta decirlo.",
            pregunta: "¿Qué le respondes con cariño?",
            opciones: [
              { texto: "Tiene razón: la fe es solo del corazón.", explica: "La fe nace en el corazón, pero no se queda escondida: se dice y se vive." },
              { texto: "La fe nace en el corazón, pero también se confiesa: decimos que Jesús es nuestro Señor.", bien: true, explica: "Romanos 10:9-10 une las dos cosas: creer con el corazón y confesar con la boca." },
              { texto: "Decirlo es lo único que importa.", explica: "Las palabras sin fe no salvan: hace falta creer de verdad." },
              { texto: "Solo los pastores deben decirlo en público.", explica: "Romanos 10:9 es para todo el que cree." },
            ],
            apoyo: "La fe nace en el corazón, pero no se queda escondida: se dice y se vive.",
            ref: "Romanos 10:9-10",
            explica: "Creer y confesar van juntos: la fe del corazón se expresa con la boca y con la vida.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "reconocer que he vivido de espaldas a Dios, dejar de justificar mi pecado y volverme a Él",
            ref: "Hechos 3:19",
            clave: {
              id: "pr-n1-salvacion-3-a6-1",
              tipo: "corta",
              pregunta: "Explica con tus palabras qué es arrepentirse.",
              ideas: [
                { id: "cambio", peso: 50, texto: "Es cambiar de mentalidad y de dirección: volverse a Dios.", formas: ["cambi* de mentalidad", "media vuelta", "dar la vuelta", "volver* a dios", "cambi* de direccion", "cambi* de vida"] },
                { id: "reconocer", peso: 25, texto: "Es reconocer el pecado y dejar de justificarlo.", formas: ["reconoc* pecado", "dejar de justificar", "reconocer que", "aceptar que he pecado"] },
                { id: "no-tristeza", peso: 25, texto: "No es solo sentir tristeza.", formas: ["no es solo (sentir|tristeza)", "no solo tristeza", "mas que tristeza", "no es solo sentir"], negativa: true },
              ],
              modelo: "Arrepentirse no es solo sentir tristeza: es reconocer mi pecado, dejar de justificarlo y dar media vuelta para volverme a Dios.",
            },
          },
          {
            apoyo: "Fíjate en la promesa: a quien se arrepiente y se convierte, Dios le borra los pecados.",
            ref: "Hechos 3:19",
            clave: {
              id: "pr-n1-salvacion-3-a6-2",
              tipo: "corta",
              pregunta: "¿Qué promete Dios a quien se arrepiente, y por qué eso da paz?",
              ideas: [
                { id: "borra", peso: 60, texto: "Dios borra sus pecados.", formas: ["borra* (los|sus|mis|nuestros) pecados", "borra*", "perdona*", "perdon"] },
                { id: "no-guarda", peso: 40, texto: "No los guarda para echárselos en cara.", formas: ["no los guarda", "no (los|nos) echa en cara", "no se acuerda", "no los recuerda", "olvida", "no los usa"], negativa: true },
              ],
              modelo: "Dios promete borrar los pecados de quien se arrepiente. Eso da paz porque no los guarda para echárnoslos en cara después: el perdón es completo.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. La seguridad de la salvación y el nuevo nacimiento
    "n1-salvacion-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quién era Nicodemo?", reverso: "Un principal de los judíos, fariseo: religioso, respetado y cumplidor.", apoyo: "Era fariseo: un hombre religioso, respetado y cumplidor." },
              { frente: "¿Qué le dijo Jesús a Nicodemo?", reverso: "Que para ver el reino de Dios hay que nacer de nuevo.", apoyo: "para ver el reino de Dios hay que nacer de nuevo" },
              { frente: "¿Quién da la vida nueva por dentro?", reverso: "El Espíritu Santo, a quien cree en Jesús.", apoyo: "el Espíritu Santo da una vida nueva por dentro a quien cree en Jesús" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿En qué nacimiento pensó Nicodemo?", reverso: "En un nacimiento físico; Jesús hablaba de nacer del Espíritu.", apoyo: "Nicodemo pensó en un nacimiento físico, pero Jesús hablaba de nacer del Espíritu." },
              { frente: "¿Qué tiene quien es nueva criatura?", reverso: "Una identidad nueva, un corazón nuevo y al Espíritu Santo para vivir de otra manera.", apoyo: "ahora tienes una identidad nueva, un corazón nuevo y al Espíritu Santo para vivir de otra manera" },
              { frente: "¿En qué se apoya la seguridad de la salvación?", reverso: "En lo que Dios prometió, que no cambia.", apoyo: "sino en lo que Dios prometió, que no cambia" },
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
            grupos: ["Es nacer de nuevo", "No es nacer de nuevo"],
            frases: [
              { texto: "Una obra de Dios por su Espíritu", grupo: 0 },
              { texto: "Recibir vida nueva por dentro al creer en Jesús", grupo: 0 },
              { texto: "Un regalo, como el primer nacimiento", grupo: 0 },
              { texto: "Empezar otra vez con fuerza de voluntad", grupo: 1 },
              { texto: "Cambiar de religión", grupo: 1 },
              { texto: "Mejorar un poco", grupo: 1 },
            ],
            apoyo: "Nacer de nuevo no es empezar otra vez con fuerza de voluntad, ni cambiar de religión, ni mejorar un poco.",
            ref: "Juan 3:3-7; Tito 3:5",
            explica: "Nacer de nuevo es una obra de Dios: el Espíritu Santo da vida nueva a quien cree.",
          },
          {
            grupos: ["Es nacer de nuevo", "No es nacer de nuevo"],
            frases: [
              { texto: "Nacer del Espíritu", grupo: 0 },
              { texto: "Un regalo de Dios", grupo: 0 },
              { texto: "Algo que Dios hace en quien cree", grupo: 0 },
              { texto: "Un nacimiento físico", grupo: 1, explica: "Eso pensó Nicodemo, pero Jesús hablaba de nacer del Espíritu." },
              { texto: "Ser muy religioso y cumplidor", grupo: 1, explica: "Nicodemo lo era, y aun así necesitaba nacer de nuevo." },
              { texto: "Portarse mejor por un tiempo", grupo: 1 },
            ],
            apoyo: "Nicodemo pensó en un nacimiento físico, pero Jesús hablaba de nacer del Espíritu.",
            ref: "Juan 3:3-7",
            explica: "Ni la religión ni el esfuerzo dan la vida nueva: la da el Espíritu a quien cree en Jesús.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            afirmaciones: [
              { texto: "Ser nueva criatura quiere decir que ya no tendrás luchas ni tentaciones.", verdad: false, explica: "Seguirá habiendo luchas, pero ahora tienes una identidad nueva, un corazón nuevo y al Espíritu Santo.", apoyo: "Eso no quiere decir que ya no tendrás luchas ni tentaciones", ref: "2 Corintios 5:17" },
              { texto: "Lo viejo ya no tiene la última palabra sobre la vida de quien está en Cristo.", verdad: true, explica: "En Cristo empezó un cambio de fondo, aunque crecer lleve tiempo.", apoyo: "Lo viejo ya no tiene la última palabra sobre tu vida." },
              { texto: "El creyente tiene al Espíritu Santo para vivir de otra manera.", verdad: true, explica: "Ser nueva criatura incluye un corazón nuevo y la ayuda del Espíritu Santo.", apoyo: "un corazón nuevo y al Espíritu Santo para vivir de otra manera" },
            ],
          },
          {
            afirmaciones: [
              { texto: "Crecer como nueva criatura lleva tiempo, pero el cambio de fondo ya empezó.", verdad: true, explica: "El cambio de fondo empieza al estar en Cristo; el crecimiento sigue toda la vida.", apoyo: "Crecer llevará tiempo, pero el cambio de fondo ya empezó." },
              { texto: "Quien está en Cristo sigue siendo el mismo; solo cambia algunas costumbres.", verdad: false, explica: "No es solo un cambio de costumbres: quien está en Cristo es una nueva criatura.", apoyo: "Quien está en Cristo es una nueva criatura.", ref: "2 Corintios 5:17" },
              { texto: "Tener un corazón nuevo es parte de ser nueva criatura.", verdad: true, explica: "La lección lo dice así: identidad nueva, corazón nuevo y el Espíritu Santo.", apoyo: "una identidad nueva, un corazón nuevo" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un creyente nuevo te dice: Hay días en que no siento nada y dudo de ser salvo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Si no lo sientes, quizá no eres salvo.", explica: "La seguridad no se apoya en lo que sentimos, que cambia." },
              { texto: "Lo que sientes cambia, pero la promesa de Dios no: el que tiene al Hijo tiene la vida.", bien: true, explica: "Lleva su seguridad a lo que Dios prometió en su Palabra (1 Juan 5:12)." },
              { texto: "Ora más fuerte hasta que lo sientas.", explica: "Orar es bueno, pero la seguridad viene de la promesa de Dios, no de un sentimiento." },
              { texto: "Bautízate otra vez para estar seguro.", explica: "La seguridad no viene de repetir algo: viene de lo que Dios prometió." },
            ],
            apoyo: "La seguridad no se apoya en lo que sentimos, que cambia, sino en lo que Dios prometió, que no cambia",
            ref: "1 Juan 5:11-13",
            explica: "Juan escribió para que los creyentes supieran que tienen vida eterna: la seguridad descansa en la promesa de Dios.",
          },
          {
            caso: "Una hermana te cuenta: Ayer volví a fallar en algo que había dejado. Seguro ya no soy hija de Dios.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Un hijo que tropieza no deja de ser hijo: confiésalo a Dios y recibe su perdón.", bien: true, explica: "Así lo enseña la lección con 1 Juan 1:9." },
              { texto: "Tienes que volver a empezar desde cero.", explica: "No se pierde la vida nueva por tropezar: se vuelve a Dios y se recibe su perdón." },
              { texto: "No pasa nada, sigue igual.", explica: "La seguridad no es permiso para pecar: hay que confesar y dejar que Dios corrija." },
              { texto: "Espera a sentirte mejor para hablar con Dios.", explica: "Lo que toca es volver a Dios ya, confesar y recibir su perdón." },
            ],
            apoyo: "Un hijo que tropieza no deja de ser hijo.",
            ref: "1 Juan 1:9",
            explica: "El Padre levanta, corrige con amor y ayuda a seguir: la caída se confiesa, no se esconde.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            frases: [
              "Juan escribió para que los creyentes supieran que tienen vida eterna.",
              "La seguridad de la salvación depende de cómo me siento cada día.",
              "El que tiene al Hijo tiene la vida.",
              "La seguridad no es permiso para pecar.",
            ],
            malo: 1,
            correccion: "La seguridad no se apoya en lo que sentimos, sino en lo que Dios prometió.",
            apoyo: "La seguridad no se apoya en lo que sentimos, que cambia, sino en lo que Dios prometió, que no cambia",
            ref: "1 Juan 5:13",
            explica: "Los sentimientos cambian; la promesa de Dios no.",
          },
          {
            frases: [
              "Nacer de nuevo es una obra de Dios.",
              "Quien sabe que es amado por Dios quiere agradarle.",
              "Como ya soy salvo, puedo pecar sin problema.",
              "Si fallo, vuelvo a Dios y confieso mi pecado.",
            ],
            malo: 2,
            correccion: "La seguridad no es permiso para pecar: es el suelo firme desde donde se crece.",
            apoyo: "La seguridad de la salvación no es permiso para pecar",
            ref: "1 Juan 2:1",
            explica: "Quien sabe que es amado por Dios no busca permiso para pecar: quiere agradarle.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Es una obra de Dios: el Espíritu Santo da una vida nueva por dentro a quien cree en Jesús.",
            ref: "Juan 3:3-7",
            clave: {
              id: "pr-n1-salvacion-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué quiso decir Jesús a Nicodemo con nacer de nuevo?",
              ideas: [
                { id: "espiritu", peso: 50, texto: "Es nacer del Espíritu: una vida nueva por dentro.", formas: ["nacer del espiritu", "del espiritu", "espiritu santo", "vida nueva", "nueva vida"] },
                { id: "obra", peso: 50, texto: "Es obra y regalo de Dios, no esfuerzo humano.", formas: ["obra de dios", "regalo de dios", "dios lo hace", "no es (fuerza|esfuerzo)", "no es cambiar de religion", "ni cambiar de religion"], negativa: true },
              ],
              modelo: "Jesús hablaba de nacer del Espíritu: Dios da una vida nueva por dentro a quien cree. No es fuerza de voluntad ni cambiar de religión; es una obra de Dios.",
            },
          },
          {
            apoyo: "Así como no hiciste nada para nacer la primera vez, el nuevo nacimiento es un regalo de Dios",
            ref: "Juan 1:13; Tito 3:5",
            clave: {
              id: "pr-n1-salvacion-4-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué el nuevo nacimiento es un regalo y no algo que logramos?",
              ideas: [
                { id: "regalo", peso: 50, texto: "Así como no hicimos nada para nacer la primera vez, es un regalo de Dios.", formas: ["no hicimos nada", "no hiciste nada", "primera vez", "regalo"] },
                { id: "espiritu", peso: 50, texto: "Lo hace el Espíritu Santo en quien cree en Jesús.", formas: ["espiritu santo", "del espiritu", "obra de dios", "dios lo hace", "dios da"] },
              ],
              modelo: "Porque así como no hiciste nada para nacer la primera vez, el nuevo nacimiento lo hace el Espíritu Santo: es un regalo de Dios para quien cree en Jesús.",
            },
          },
        ],
      },
    ],
  },
};
