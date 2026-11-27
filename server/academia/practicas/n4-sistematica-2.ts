/**
 * Las prácticas de «Teología sistemática II: Cristo y el Espíritu Santo» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-sistematica-2.ts), con la guía de docs/academia-practicas.md.
 *
 * Materia doctrinal: cada afirmación sigue la lección con sus mismas palabras, y lo que la lección atribuye a un concilio,
 * a un grupo (los cesacionistas, los continuistas, muchos maestros pentecostales) o a la declaración de fe se pregunta con
 * esa misma atribución. La lección marca dos puntos de la declaración de fe por confirmar: si la sanidad del cuerpo está
 * provista en la expiación y si hablar en lenguas es la señal del bautismo en el Espíritu. Ninguna actividad pregunta por
 * esos puntos ni por sus posiciones. El objetivo 3 de la lección 3, que trata de la sanidad, se practica solo con lo que
 * dice Isaías 53:5-6, que la lección cita sin reservas; el objetivo 3 de la lección 6, solo con la prueba de los espíritus.
 * Tampoco se pregunta si el Espíritu procede también del Hijo (lo discutieron Oriente y Occidente): solo lo que la lección
 * afirma, que procede del Padre y que el Hijo lo envía.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_SISTEMATICA_2: PracticasMateria = {
  materia: "n4-sistematica-2",
  mision: {
    titulo: "Toda la plenitud de la Deidad",
    intro: "Tu pastor te pidió que prepares una serie de clases sobre Cristo y el Espíritu Santo para los nuevos líderes de la iglesia. Te van a preguntar si Jesús es Dios, cómo puede ser Dios y hombre a la vez, qué hizo en la cruz, qué hace hoy a la diestra del Padre, quién es el Espíritu Santo y cómo se procuran los dones sin dejar de examinarlo todo. Repasa las seis lecciones para tener cada clase lista.",
    cierre: "Ya puedes enseñar con la Escritura que en Cristo habita corporalmente toda la plenitud de la Deidad: verdadero Dios y verdadero hombre, que murió en nuestro lugar, resucitó y hoy vive, reina e intercede. Y que el Espíritu Santo es Dios, adorado y glorificado con el Padre y el Hijo, que todas las manifestaciones las hace el mismo Espíritu para provecho, y que procurar los dones y probar los espíritus van juntos.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La deidad de Cristo
    "n4-sistematica-2-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué habita corporalmente en Cristo, según Colosenses 2:9?", reverso: "Toda la plenitud de la Deidad, y en un cuerpo humano.", apoyo: "está toda la plenitud de la Deidad, y en un cuerpo humano" },
              { frente: "¿Por qué Juan pone al Verbo fuera de lo creado?", reverso: "Porque todas las cosas por él fueron hechas: si todo fue hecho por él, él no fue hecho.", apoyo: "Si todo lo hecho fue hecho por él, él no fue hecho" },
              { frente: "Al decir «Antes que Abraham fuese, yo soy», ¿qué nombre usó Jesús?", reverso: "El nombre con que Dios se reveló a Moisés.", apoyo: "Usó el nombre con que Dios se reveló a Moisés" },
              { frente: "¿Qué confesó Tomás ante el resucitado?", reverso: "«¡Señor mío, y Dios mío!», y Jesús aceptó esa adoración.", apoyo: "Tomás, ante el resucitado, confesó: «¡Señor mío, y Dios mío!», y Jesús aceptó esa adoración" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Hay en Cristo solo una parte de Dios o un reflejo de él?", reverso: "No: en él está toda la plenitud de la Deidad.", apoyo: "En Cristo no hay una parte de Dios ni un reflejo" },
              { frente: "Según Juan 1:1, ¿qué era el Verbo?", reverso: "Era con Dios, y era Dios.", apoyo: "«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios»" },
              { frente: "¿Por qué los oyentes de Jesús tomaron piedras para apedrearlo?", reverso: "Porque, al afirmar su eternidad, usó el nombre con que Dios se reveló a Moisés.", apoyo: "por eso sus oyentes tomaron piedras para apedrearlo" },
              { frente: "¿Cómo llama Hebreos al Hijo?", reverso: "Lo llama «el resplandor de su gloria, y la imagen misma de su sustancia».", apoyo: "Hebreos lo llama «el resplandor de su gloria, y la imagen misma de su sustancia»" },
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
            consigna: "Une cada pasaje con lo que muestra sobre la deidad de Cristo.",
            pares: [
              ["Colosenses 2:9", "En él habita corporalmente toda la plenitud de la Deidad"],
              ["Juan 1:1-3", "El Verbo era Dios, y todas las cosas por él fueron hechas"],
              ["Juan 8:58", "Jesús afirma su eternidad: antes que Abraham fuese, él es"],
              ["Hebreos 1:8", "Al Hijo le dice: Tu trono, oh Dios, por el siglo del siglo"],
              ["Juan 20:28", "Tomás lo confiesa como Señor y Dios, y Jesús lo acepta"],
            ],
            apoyo: "El Verbo era Dios y todo fue hecho por él; antes que Abraham fuese, él es; Hebreos lo llama Dios, y Tomás lo adoró como Señor y Dios",
            ref: "Colosenses 2:9; Juan 1:1-3",
            explica: "Colosenses 2:9 dice que en él habita toda la plenitud de la Deidad; Juan llama Dios al Verbo, por quien todo fue hecho; en Juan 8:58 Jesús afirma su eternidad; Hebreos 1:8 le dice oh Dios, y Tomás lo adora como Señor y Dios.",
          },
          {
            consigna: "Une a cada uno con lo que dice o hace en los pasajes sobre la deidad de Cristo.",
            pares: [
              ["Pablo", "Escribe que en Cristo habita toda la plenitud de la Deidad"],
              ["Juan", "Presenta al Verbo eterno y lo pone fuera de lo creado"],
              ["Jesús", "Afirma su eternidad con el nombre que Dios reveló a Moisés"],
              ["Los oyentes de Jesús", "Toman piedras para apedrearlo"],
              ["Tomás", "Confiesa al resucitado como su Señor y su Dios"],
            ],
            apoyo: "Juan presenta al Verbo eterno",
            ref: "Juan 8:58; Juan 20:28",
            explica: "Pablo escribió que en Cristo habita toda la plenitud de la Deidad; Juan presenta al Verbo eterno; Jesús afirmó su eternidad, y por eso sus oyentes tomaron piedras; y Tomás lo confesó como Señor y Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Arrio y el concilio de Nicea tiene un error. Tócala.",
            frases: [
              "Arrio fue un presbítero de Alejandría, a comienzos del siglo IV.",
              "Arrio enseñó que el Hijo era la primera y más alta criatura, pero no Dios eterno.",
              "En el año 325, el concilio de Nicea le dio la razón a Arrio.",
              "Hoy algunos grupos repiten la idea de Arrio.",
            ],
            malo: 2,
            correccion: "En el año 325, el concilio de Nicea afirmó contra Arrio que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios.",
            apoyo: "En el año 325 el concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios",
            explica: "Arrio, presbítero de Alejandría, enseñó que el Hijo era una criatura y no Dios eterno. Contra él, Nicea afirmó en el año 325 que el Hijo es de la misma sustancia que el Padre.",
          },
          {
            consigna: "Una de estas frases sobre lo que afirmó Nicea tiene un error. Tócala.",
            frases: [
              "Nicea afirmó que el Hijo es de la misma sustancia que el Padre.",
              "Nicea confesó al Hijo como verdadero Dios de verdadero Dios.",
              "Arrio enseñaba que el Hijo era Dios eterno.",
              "El obrero debe saber responder con la Escritura a la idea de Arrio.",
            ],
            malo: 2,
            correccion: "Arrio enseñó que el Hijo era la primera y más alta criatura, pero no Dios eterno.",
            apoyo: "Arrio, un presbítero de Alejandría, enseñó que el Hijo era la primera y más alta criatura, pero no Dios eterno",
            explica: "Arrio enseñó que el Hijo era la primera y más alta criatura, pero no Dios eterno. Nicea afirmó lo contrario: el Hijo es verdadero Dios de verdadero Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Hoy algunos grupos repiten la idea de Arrio, y el obrero debe saber responder con la Escritura",
            ref: "Juan 1:1-3",
            titulo: "Solo la primera criatura",
            relato: [
              "Andrés es nuevo en la clase de adultos que tú enseñas. Esta semana lo visitaron en su casa y le dejaron un folleto.",
              "El folleto dice que Jesús fue la primera y más alta criatura de Dios, pero no Dios eterno. Andrés te pregunta si eso es verdad.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué enseñanza antigua repite ese folleto?",
                opciones: [
                  { texto: "La de Arrio, el presbítero de Alejandría, a comienzos del siglo IV.", bien: true, explica: "Arrio enseñó que el Hijo era la primera y más alta criatura, pero no Dios eterno, y hoy algunos grupos repiten su idea." },
                  { texto: "La del concilio de Nicea, que se reunió en el año 325 para eso.", explica: "Nicea afirmó lo contrario: que el Hijo es de la misma sustancia que el Padre." },
                  { texto: "La de Tomás, que ante el resucitado lo llamó su Señor y su Dios.", explica: "Tomás confesó «¡Señor mío, y Dios mío!»: lo contrario de lo que dice el folleto." },
                  { texto: "Ninguna: es una idea nueva, que la iglesia nunca tuvo que responder antes.", explica: "Arrio ya lo enseñó a comienzos del siglo IV, y el concilio de Nicea le respondió en el año 325." },
                ],
                apoyo: "A comienzos del siglo IV, Arrio, un presbítero de Alejandría, enseñó que el Hijo era la primera y más alta criatura, pero no Dios eterno",
                explica: "Es la idea de Arrio: el Hijo como la primera y más alta criatura, pero no Dios eterno. Hoy algunos grupos la repiten.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pasaje le muestras para enseñarle que el Hijo no fue hecho?",
                opciones: [
                  { texto: "Juan 1:3: si todas las cosas por él fueron hechas, él no fue hecho.", bien: true, explica: "Juan pone al Verbo fuera de lo creado: si todo lo hecho fue hecho por él, él no fue hecho." },
                  { texto: "Colosenses 2:9, donde Pablo dice que en Cristo hay solo un reflejo de Dios.", explica: "Colosenses 2:9 dice que en él habita corporalmente toda la plenitud de la Deidad: no una parte ni un reflejo." },
                  { texto: "Juan 20:28, donde Jesús le prohíbe a Tomás que lo adore como Dios.", explica: "Fue al revés: Tomás confesó «¡Señor mío, y Dios mío!», y Jesús aceptó esa adoración." },
                  { texto: "Ninguno: la Biblia no dice nada sobre si el Hijo fue hecho o no.", explica: "Juan lo pone fuera de lo creado: «Todas las cosas por él fueron hechas»." },
                ],
                apoyo: "Y lo pone fuera de lo creado: «Todas las cosas por él fueron hechas»",
                explica: "Juan presenta al Verbo eterno y lo pone fuera de lo creado: si todo lo hecho fue hecho por él, él no fue hecho.",
              },
              {
                tipo: "explica",
                apoyo: "En el año 325 el concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre",
                ref: "Juan 1:1-3",
                clave: {
                  id: "pr-n4-sistematica-2-1-a4-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a Andrés sobre quién es el Hijo.",
                  ideas: [
                    { id: "dios", peso: 50, texto: "Que el Hijo no es una criatura: el Verbo era Dios, y todas las cosas por él fueron hechas.", formas: ["verbo (era|es) dios", "(es|era) dios eterno", "verdadero dios", "(no|nunca) (fue|es) (hecho|creado)", "no es (una|la) criatura", "todas las cosas", "todo fue hecho", "plenitud de la deidad", "antes que abraham"] },
                    { id: "nicea", peso: 50, texto: "Que contra Arrio, el concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre.", formas: ["misma sustancia", "misma esencia", "mismo ser", "verdadero dios de verdadero dios", "nicea (afirm*|dijo|confes*|declar*|ensen*|respond*)", "contra arrio", "(refut*|rechaz*|corrig*|condeno|respond*) arrio"] },
                  ],
                  errores: [
                    { id: "criatura", texto: "El Hijo no es una criatura: el Verbo era Dios, y todas las cosas por él fueron hechas.", formas: ["(jesus|cristo|hijo|verbo) (es|fue) (una|la) criatura", "(jesus|cristo|hijo|verbo) fue (creado|hecho)", "folleto tiene razon"], anula: "dios" },
                  ],
                  modelo: "Le diría que el Hijo no es una criatura: el Verbo era Dios, y todas las cosas por él fueron hechas. Y que contra Arrio, el concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre.",
                },
              },
            ],
          },
          {
            apoyo: "Contra Arrio, el concilio de Nicea afirmó en el año 325 que el Hijo es de la misma sustancia que el Padre",
            ref: "Juan 8:58",
            titulo: "Una pregunta en el grupo de jóvenes",
            relato: [
              "Eres líder de jóvenes. Después de la reunión, Sofía te cuenta que una compañera de estudios le dijo que Jesús fue un ser creado, muy alto, pero no Dios eterno.",
              "Sofía quiere saber si la iglesia ya respondió eso alguna vez y qué dice la Biblia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué respondió la iglesia a esa idea en el año 325?",
                opciones: [
                  { texto: "El concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre.", bien: true, explica: "Contra Arrio, Nicea afirmó que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios." },
                  { texto: "El concilio de Nicea afirmó que el Hijo es la más alta de todas las criaturas.", explica: "Eso enseñaba Arrio; Nicea afirmó que el Hijo es verdadero Dios de verdadero Dios." },
                  { texto: "Nada: la iglesia dejó que cada uno pensara lo que quisiera sobre el Hijo.", explica: "En el año 325, el concilio de Nicea respondió: el Hijo es verdadero Dios de verdadero Dios." },
                  { texto: "Arrio, el presbítero de Alejandría, respondió que el Hijo es Dios eterno.", explica: "Fue al revés: Arrio enseñó que el Hijo era una criatura, y Nicea le respondió." },
                ],
                apoyo: "En el año 325 el concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios",
                explica: "A comienzos del siglo IV, Arrio enseñó que el Hijo era una criatura; en el año 325, Nicea afirmó que es de la misma sustancia que el Padre.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Con qué palabras de Jesús le muestras a Sofía que él es eterno?",
                opciones: [
                  { texto: "«Antes que Abraham fuese, yo soy»: el nombre con que Dios se reveló a Moisés.", bien: true, explica: "Jesús mismo afirmó su eternidad con el nombre con que Dios se reveló a Moisés." },
                  { texto: "Las que le dijo a Tomás al rechazar que lo adorara como su Dios.", explica: "Jesús no rechazó a Tomás: Tomás confesó «¡Señor mío, y Dios mío!», y Jesús aceptó esa adoración." },
                  { texto: "Ninguna: Jesús nunca habló de su eternidad; eso lo dijeron otros después de él.", explica: "Jesús mismo afirmó su eternidad: «Antes que Abraham fuese, yo soy»." },
                  { texto: "Las de Hebreos 1:3, que Jesús escribió sobre el resplandor de su gloria.", explica: "Hebreos no es una carta de Jesús: es la carta que lo llama «el resplandor de su gloria»." },
                ],
                apoyo: "Jesús mismo afirmó su eternidad: «Antes que Abraham fuese, yo soy»",
                explica: "Jesús mismo afirmó su eternidad: «Antes que Abraham fuese, yo soy». Usó el nombre con que Dios se reveló a Moisés.",
              },
              {
                tipo: "explica",
                apoyo: "Jesús mismo afirmó su eternidad",
                ref: "Juan 8:58",
                clave: {
                  id: "pr-n4-sistematica-2-1-a4-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a Sofía para que responda a su compañera.",
                  ideas: [
                    { id: "eterno", peso: 50, texto: "Que Jesús afirmó su eternidad: antes que Abraham fuese, yo soy; y que el Verbo era Dios.", formas: ["antes que abraham", "yo soy", "eternidad", "(es|era) eterno", "(es|era) dios eterno", "verbo (era|es) dios", "verdadero dios", "(no|nunca) (fue|es) (hecho|creado)", "no es (una|la) criatura"] },
                    { id: "nicea", peso: 50, texto: "Que la iglesia ya respondió: en el año 325, el concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre.", formas: ["misma sustancia", "misma esencia", "mismo ser", "verdadero dios de verdadero dios", "nicea (afirm*|dijo|confes*|declar*|ensen*|respond*)", "contra arrio", "(refut*|rechaz*|corrig*|condeno|respond*) arrio"] },
                  ],
                  errores: [
                    { id: "creado", texto: "Jesús no fue creado: él mismo afirmó su eternidad.", formas: ["(jesus|cristo|hijo|verbo) (es|fue) (una|la|un) (criatura|ser)", "(jesus|cristo|hijo|verbo) fue (creado|hecho)", "companera tiene razon"], anula: "eterno" },
                  ],
                  modelo: "Le diría que Jesús afirmó su eternidad: antes que Abraham fuese, yo soy. Y que la iglesia ya respondió: en el año 325, el concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre.",
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
            consigna: "Completa por qué la salvación necesita un Cristo que sea Dios.",
            texto: "Solo [[Dios]] puede salvar, y solo un sacrificio de valor [[infinito]] puede pagar por los [[pecados]] del mundo.",
            distractores: ["Abraham", "limitado", "méritos"],
            errores: {
              Abraham: "Jesús es antes que Abraham: solo Dios puede salvar.",
              limitado: "Hace falta un sacrificio de valor infinito para pagar por los pecados del mundo.",
              "méritos": "Lo que se paga son los pecados del mundo.",
            },
            apoyo: "Solo Dios puede salvar, y solo un sacrificio de valor infinito puede pagar por los pecados del mundo",
            explica: "Solo Dios puede salvar, y solo un sacrificio de valor infinito puede pagar por los pecados del mundo: por eso solo un Cristo divino puede salvar.",
          },
          {
            consigna: "Completa lo que significa para nosotros que Cristo sea Dios.",
            texto: "Como Cristo es verdadero Dios, puede ser nuestro [[Salvador]] y podemos [[adorarlo]] sin caer en [[idolatría]].",
            distractores: ["acusador", "olvidarlo", "alabanza"],
            errores: {
              acusador: "Si Cristo no fuera Dios, no podría ser nuestro Salvador.",
              olvidarlo: "A Cristo se le adora: adorarlo es darle lo que le corresponde como Dios.",
              alabanza: "Adorar a Cristo no es idolatría, porque él es Dios.",
            },
            apoyo: "Si Cristo no fuera Dios, no podría ser nuestro Salvador ni podríamos adorarlo sin idolatría",
            ref: "Juan 20:28",
            explica: "Si Cristo no fuera Dios, no podría ser nuestro Salvador ni podríamos adorarlo sin idolatría. Como es verdadero Dios, adorarlo es darle lo que le corresponde.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre por qué la deidad de Cristo importa para la salvación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Solo Dios puede salvar.", verdad: true, explica: "Por eso importa que Cristo sea Dios: solo un Cristo divino puede salvar.", apoyo: "Solo Dios puede salvar" },
              { texto: "Para pagar por los pecados del mundo basta un sacrificio de valor limitado.", verdad: false, explica: "Solo un sacrificio de valor infinito puede pagar por los pecados del mundo.", apoyo: "solo un sacrificio de valor infinito puede pagar por los pecados del mundo" },
              { texto: "Adorar a Jesús es darle lo que le corresponde como Dios.", verdad: true, explica: "Adorar a Jesús no es exagerar: es darle lo que le corresponde como Dios.", apoyo: "Adorar a Jesús no es exagerar: es darle lo que le corresponde como Dios" },
            ],
          },
          {
            consigna: "Sobre la deidad de Cristo y nuestra salvación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Para ser nuestro Salvador, Cristo tiene que ser Dios.", verdad: true, explica: "Solo Dios puede salvar: si Cristo no fuera Dios, no podría ser nuestro Salvador.", apoyo: "Si Cristo no fuera Dios, no podría ser nuestro Salvador" },
              { texto: "Adorar a Jesús como Dios es una exageración.", verdad: false, explica: "Adorar a Jesús no es exagerar: es darle lo que le corresponde como Dios.", apoyo: "Adorar a Jesús no es exagerar" },
              { texto: "Jesús rechazó la adoración de Tomás.", verdad: false, explica: "Tomás confesó «¡Señor mío, y Dios mío!», y Jesús aceptó esa adoración.", apoyo: "y Jesús aceptó esa adoración", ref: "Juan 20:28" },
              { texto: "Solo un Cristo divino puede salvar.", verdad: true, explica: "Lo dice la lección: solo Dios puede salvar, y por eso solo un Cristo divino puede salvar.", apoyo: "Solo un Cristo divino puede salvar" },
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
            apoyo: "Jesucristo es verdadero Dios: en él habita corporalmente toda la plenitud de la Deidad",
            ref: "Colosenses 2:9; Juan 1:1-3",
            clave: {
              id: "pr-n4-sistematica-2-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseñan Colosenses 2:9 y Juan 1:1-3 sobre quién es Jesucristo?",
              ideas: [
                { id: "plenitud", peso: 50, texto: "Que en él habita corporalmente toda la plenitud de la Deidad, no una parte de Dios ni un reflejo.", formas: ["plenitud", "habita corporalmente", "toda la deidad", "no (es|hay) una parte", "ni un reflejo", "no (es|hay) un reflejo"] },
                { id: "verbo", peso: 50, texto: "Que el Verbo era Dios, y todas las cosas por él fueron hechas: él no fue hecho.", formas: ["verbo (era|es) dios", "todas las cosas", "todo (fue|lo) hecho", "(no|nunca) fue (hecho|creado)", "fuera de lo creado", "no es (una|la) criatura", "creador de todo", "(creo|hizo) todas"] },
              ],
              errores: [
                { id: "criatura", texto: "El Verbo no fue hecho: todas las cosas por él fueron hechas.", formas: ["(jesus|cristo|hijo|verbo) (es|fue) (una|la) criatura", "(jesus|cristo|hijo|verbo) fue (creado|hecho)"], anula: "verbo" },
              ],
              modelo: "Colosenses 2:9 enseña que en él habita corporalmente toda la plenitud de la Deidad, no una parte de Dios. Juan dice que el Verbo era Dios y que todas las cosas por él fueron hechas: él no fue hecho.",
            },
          },
          {
            apoyo: "Jesús mismo afirmó su eternidad",
            ref: "Juan 8:58; Juan 20:28",
            clave: {
              id: "pr-n4-sistematica-2-1-a7-2",
              tipo: "corta",
              pregunta: "¿Qué muestran sobre la deidad de Cristo sus palabras en Juan 8:58 y la confesión de Tomás?",
              ideas: [
                { id: "eterno", peso: 50, texto: "Que Jesús afirmó su eternidad: antes que Abraham fuese, yo soy, el nombre con que Dios se reveló a Moisés.", formas: ["antes que abraham", "yo soy", "eternidad", "(es|era) eterno", "se revelo a moises", "nombre (de|con|que) dios", "existia antes"] },
                { id: "tomas", peso: 50, texto: "Que Tomás lo confesó como Señor y Dios, y Jesús aceptó esa adoración.", formas: ["senor mio", "dios mio", "senor y dios", "acept* (esa|la|su) adoracion", "acept* ser adorado", "acept* que (lo|le) (adorara|adore|adoraran)", "(lo|le) (adoro|adoraba)", "(lo|le) (confeso|llamo|reconocio) (como|su) (senor|dios)"] },
              ],
              modelo: "Jesús afirmó su eternidad al decir antes que Abraham fuese, yo soy: el nombre con que Dios se reveló a Moisés. Y Tomás lo confesó como su Señor y su Dios, y Jesús aceptó esa adoración.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La humanidad de Cristo y sus dos naturalezas
    "n4-sistematica-2-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Al tomar nuestra naturaleza, ¿de qué participó el Hijo?", reverso: "De carne y sangre, como los hijos.", apoyo: "«por cuanto los hijos participaron de carne y sangre, él también participó de lo mismo»" },
              { frente: "¿Para qué debía ser el Hijo en todo semejante a sus hermanos?", reverso: "Para venir a ser misericordioso y fiel sumo sacerdote.", apoyo: "«debía ser en todo semejante a sus hermanos, para venir a ser misericordioso y fiel sumo sacerdote»" },
              { frente: "¿Qué muestra que la humanidad de Jesús fue completa?", reverso: "Tuvo hambre, se cansó, lloró y murió.", apoyo: "Tuvo hambre, se cansó, lloró y murió" },
              { frente: "¿Hasta dónde se humilló el Hijo, según Filipenses 2?", reverso: "Hasta la muerte, y muerte de cruz.", apoyo: "se humilló «hasta la muerte, y muerte de cruz»" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según Lucas 2:52, ¿en qué crecía Jesús?", reverso: "En sabiduría y en estatura.", apoyo: "«Jesús crecía en sabiduría y en estatura»" },
              { frente: "Al despojarse a sí mismo, ¿dejó el Hijo de ser Dios?", reverso: "No: tomó la condición de siervo sin dejar de ser Dios.", apoyo: "No dejó de ser Dios: tomó la condición de siervo" },
              { frente: "¿Qué hizo Dios después de que el Hijo se humilló?", reverso: "Le exaltó hasta lo sumo.", apoyo: "Por eso Dios «le exaltó hasta lo sumo»" },
              { frente: "¿Cómo llaman los teólogos a la unión de las dos naturalezas de Cristo?", reverso: "La unión hipostática.", apoyo: "Los teólogos llaman a esta unión la unión hipostática" },
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
            consigna: "Completa cómo tomó el Hijo nuestra naturaleza.",
            texto: "El Hijo participó de [[carne]] y [[sangre]], y debía ser en todo [[semejante]] a sus hermanos.",
            distractores: ["oro", "plata", "distinto"],
            errores: {
              oro: "El Hijo participó de carne y sangre: tomó nuestra naturaleza.",
              plata: "Los hijos participaron de carne y sangre, y él también participó de lo mismo.",
              distinto: "Debía ser en todo semejante a sus hermanos.",
            },
            apoyo: "El Hijo tomó nuestra naturaleza",
            ref: "Hebreos 2:14-17",
            explica: "El Hijo tomó nuestra naturaleza: participó de carne y sangre, y debía ser en todo semejante a sus hermanos, para venir a ser misericordioso y fiel sumo sacerdote.",
          },
          {
            consigna: "Completa lo que muestra que Jesús fue hombre de verdad.",
            texto: "Jesús creció en [[sabiduría]] y en [[estatura]]; tuvo hambre, se cansó, [[lloró]] y murió.",
            distractores: ["orgullo", "riqueza", "pecó"],
            errores: {
              orgullo: "Jesús crecía en sabiduría y en estatura.",
              riqueza: "Lucas 2:52 dice que crecía en sabiduría y en estatura.",
              "pecó": "La lección dice que tuvo hambre, se cansó, lloró y murió.",
            },
            apoyo: "Su humanidad fue completa: «Jesús crecía en sabiduría y en estatura»",
            ref: "Lucas 2:52",
            explica: "Su humanidad fue completa: Jesús crecía en sabiduría y en estatura; tuvo hambre, se cansó, lloró y murió. No fue un Dios disfrazado de hombre.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Para qué debía ser el Hijo en todo semejante a sus hermanos? Toca las palabras que lo dicen.",
            texto: "debía ser en todo semejante a sus hermanos, para venir a ser [[misericordioso]] y [[fiel sumo sacerdote]]",
            apoyo: "Y tenía que ser así: «debía ser en todo semejante a sus hermanos, para venir a ser misericordioso y fiel sumo sacerdote»",
            ref: "Hebreos 2:17",
            explica: "El Hijo tomó nuestra naturaleza, y tenía que ser así: debía ser en todo semejante a sus hermanos, para venir a ser misericordioso y fiel sumo sacerdote.",
          },
          {
            consigna: "Al despojarse a sí mismo, ¿qué forma tomó el Hijo? Toca las palabras que lo dicen.",
            texto: "se despojó a sí mismo, tomando [[forma de siervo]]",
            apoyo: "No dejó de ser Dios: tomó la condición de siervo",
            ref: "Filipenses 2:7",
            explica: "Siendo en forma de Dios, el Hijo se despojó a sí mismo, tomando forma de siervo. No dejó de ser Dios: tomó la condición de siervo y se humilló hasta la muerte.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Lo confesó el concilio de Calcedonia o lo rechazó? Lleva cada frase a su grupo.",
            grupos: ["Lo confesó Calcedonia", "Lo rechazó Calcedonia"],
            frases: [
              { texto: "Cristo es una sola persona", grupo: 0 },
              { texto: "En Cristo hay dos naturalezas: la divina y la humana", grupo: 0 },
              { texto: "Sus dos naturalezas se unen sin mezclarse ni cambiar", grupo: 0 },
              { texto: "Sus dos naturalezas no se dividen ni se separan", grupo: 0 },
              { texto: "Cristo es dos personas distintas", grupo: 1, explica: "El nestorianismo lo dividía en dos personas; Calcedonia confesó una sola persona." },
              { texto: "Las dos naturalezas se mezclan en una sola", grupo: 1, explica: "Eso decía el eutiquianismo: mezclaba las dos naturalezas en una sola." },
              { texto: "Jesús solo parecía hombre", grupo: 1, explica: "Eso decía el docetismo, que niega su humanidad." },
            ],
            apoyo: "Cristo es una sola persona en dos naturalezas, la divina y la humana, unidas sin mezclarse ni cambiar, y sin dividirse ni separarse",
            explica: "En el año 451, Calcedonia confesó una sola persona en dos naturalezas, sin mezcla ni división, contra el docetismo, el nestorianismo y el eutiquianismo.",
          },
          {
            consigna: "¿Así confiesa Calcedonia a Cristo o es un error sobre su persona? Lleva cada frase a su grupo.",
            grupos: ["Así lo confiesa Calcedonia", "Es un error sobre su persona"],
            frases: [
              { texto: "Verdadero Dios y verdadero hombre a la vez", grupo: 0 },
              { texto: "Dos naturalezas en una sola persona", grupo: 0 },
              { texto: "Lo divino y lo humano, sin mezcla", grupo: 0 },
              { texto: "Lo divino y lo humano, sin división", grupo: 0 },
              { texto: "Dos personas: una divina y otra humana", grupo: 1, explica: "Eso es el nestorianismo, que lo dividía en dos personas." },
              { texto: "Una sola naturaleza, mezcla de las dos", grupo: 1, explica: "Eso es el eutiquianismo, que mezclaba las dos naturalezas en una sola." },
              { texto: "Un Dios que solo parecía hombre", grupo: 1, explica: "Eso es el docetismo: niega su humanidad." },
            ],
            apoyo: "Calcedonia, en el año 451, confesó una sola persona en dos naturalezas, sin mezcla ni división, contra el docetismo, el nestorianismo y el eutiquianismo",
            explica: "Calcedonia confesó a Cristo como verdadero Dios y verdadero hombre: una sola persona en dos naturalezas, sin mezcla ni división. Dividirlo en dos personas, mezclar sus naturalezas o decir que solo parecía hombre son errores.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada error sobre la persona de Cristo con lo que decía.",
            pares: [
              ["El docetismo", "Jesús solo parecía hombre: niega su humanidad"],
              ["El arrianismo", "Jesús era una criatura: niega su deidad"],
              ["El nestorianismo", "Dividía a Cristo en dos personas"],
              ["El eutiquianismo", "Mezclaba las dos naturalezas en una sola"],
            ],
            apoyo: "La fe bíblica confiesa a un solo Cristo, verdadero Dios y verdadero hombre",
            explica: "El docetismo niega su humanidad; el arrianismo, su deidad; el nestorianismo lo divide en dos personas, y el eutiquianismo mezcla las dos naturalezas. La fe bíblica confiesa a un solo Cristo, verdadero Dios y verdadero hombre.",
          },
          {
            consigna: "Une cada enseñanza con lo que dice o niega de Cristo.",
            pares: [
              ["El docetismo", "Niega que su humanidad sea verdadera"],
              ["El arrianismo", "Niega que sea verdadero Dios"],
              ["El nestorianismo", "Rompe la unidad de su persona"],
              ["El eutiquianismo", "Confunde lo divino y lo humano en una sola naturaleza"],
              ["La fe bíblica", "Confiesa a un solo Cristo, Dios y hombre"],
            ],
            apoyo: "El docetismo decía que Jesús solo parecía hombre: niega su humanidad",
            explica: "El docetismo dice que solo parecía hombre; el arrianismo, que era una criatura; el nestorianismo lo divide en dos personas, y el eutiquianismo mezcla las dos naturalezas. La fe bíblica confiesa a un solo Cristo, verdadero Dios y verdadero hombre.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu célula te dice: Si Jesús es Dios, ¿para qué tuvo que hacerse hombre para salvarnos?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que como hombre nos representa, y como Dios su obra tiene valor infinito.", bien: true, explica: "Por eso puede ser mediador: como hombre, nos representa; como Dios, su obra tiene valor infinito." },
              { texto: "Que no se hizo hombre de verdad: solo parecía hombre para que lo pudieran ver.", explica: "Eso decía el docetismo, que niega su humanidad. El Hijo participó de carne y sangre." },
              { texto: "Que al hacerse hombre dejó de ser Dios, y así pudo morir por nosotros.", explica: "No dejó de ser Dios: tomó la condición de siervo y se humilló hasta la muerte." },
              { texto: "Que se dividió en dos personas: una para ser Dios y otra para morir.", explica: "Eso es el nestorianismo: Cristo es una sola persona en dos naturalezas." },
            ],
            apoyo: "Como hombre, nos representa; como Dios, su obra tiene valor infinito",
            ref: "1 Timoteo 2:5",
            explica: "Hay un solo mediador entre Dios y los hombres, Jesucristo hombre. Como hombre, nos representa; como Dios, su obra tiene valor infinito.",
          },
          {
            caso: "Una hermana que acompañas te dice: A veces pienso que Jesús no entiende lo que vivo, porque él es Dios.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Jesús sabe lo que vives, porque fue hombre como tú, sin dejar de ser Dios.", bien: true, explica: "Cristo es verdadero Dios y verdadero hombre: debía ser en todo semejante a sus hermanos, y por eso sabe lo que vives." },
              { texto: "Que tiene razón: Jesús solo parecía hombre, y por eso no sabe lo que es sufrir.", explica: "Eso es el docetismo. Su humanidad fue completa: tuvo hambre, se cansó, lloró y murió." },
              { texto: "Que Jesús la entiende como Dios, pero que nunca tuvo hambre ni se cansó.", explica: "Jesús tuvo hambre, se cansó, lloró y murió: fue hombre de verdad." },
              { texto: "Que para entenderla habría tenido que dejar de ser Dios, y eso no pasó.", explica: "Sin dejar de ser Dios, tomó la condición de siervo y fue en todo semejante a sus hermanos." },
            ],
            apoyo: "Jesús sabe lo que vives, porque fue hombre como tú",
            ref: "Hebreos 2:17",
            explica: "El Hijo participó de carne y sangre y debía ser en todo semejante a sus hermanos, para ser misericordioso y fiel sumo sacerdote: Jesús sabe lo que vives.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Calcedonia, en el año 451, confesó una sola persona en dos naturalezas, sin mezcla ni división",
            ref: "Filipenses 2:5-11",
            clave: {
              id: "pr-n4-sistematica-2-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué confesó el concilio de Calcedonia sobre la persona de Cristo?",
              ideas: [
                { id: "persona", peso: 50, texto: "Que Cristo es una sola persona en dos naturalezas, la divina y la humana.", formas: ["una sola persona", "una persona", "un solo cristo", "dos naturalezas", "divina y (la|una) humana", "divina y humana", "verdadero dios y verdadero hombre", "verdadero hombre"] },
                { id: "union", peso: 50, negativa: true, texto: "Que sus naturalezas están unidas sin mezclarse ni cambiar, y sin dividirse ni separarse.", formas: ["sin mezcl*", "sin cambi*", "sin divid*", "sin separ*", "sin confu*", "sin confund*", "sin division", "no se (mezcl*|divid*|separ*|confund*)", "ni (mezcl*|divid*|separ*|cambi*|confund*)", "hipostatica"] },
              ],
              errores: [
                { id: "dos-personas", texto: "Calcedonia confesó una sola persona: el nestorianismo es el que lo dividía en dos personas.", formas: ["(tiene|hay|son|es) dos personas"], anula: "persona" },
              ],
              modelo: "Calcedonia confesó que Cristo es una sola persona en dos naturalezas, la divina y la humana, unidas sin mezclarse ni cambiar, y sin dividirse ni separarse: la unión hipostática.",
            },
          },
          {
            apoyo: "Los teólogos llaman a esta unión la unión hipostática",
            ref: "Filipenses 2:5-11",
            clave: {
              id: "pr-n4-sistematica-2-2-a7-2",
              tipo: "corta",
              pregunta: "Según Calcedonia, ¿cómo están unidas en Cristo la naturaleza divina y la humana, y cómo llaman los teólogos a esa unión?",
              ideas: [
                { id: "persona", peso: 35, texto: "Están unidas en una sola persona.", formas: ["una sola persona", "una persona", "un solo cristo", "misma persona"] },
                { id: "sin", peso: 35, negativa: true, texto: "Sin mezclarse ni cambiar, y sin dividirse ni separarse.", formas: ["sin mezcl*", "sin cambi*", "sin divid*", "sin separ*", "sin confu*", "sin confund*", "sin division", "no se (mezcl*|divid*|separ*|confund*)", "ni (mezcl*|divid*|separ*|cambi*|confund*)"] },
                { id: "nombre", peso: 30, texto: "Los teólogos la llaman la unión hipostática.", formas: ["hipostatica", "hipostasis"] },
              ],
              modelo: "Están unidas en una sola persona, sin mezclarse ni cambiar, y sin dividirse ni separarse. Los teólogos llaman a esa unión la unión hipostática.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La obra de Cristo en la cruz
    "n4-sistematica-2-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo anunció Isaías la obra de la cruz?", reverso: "Como una sustitución: Cristo ocupó nuestro lugar.", apoyo: "Isaías lo anunció como una sustitución" },
              { frente: "¿Para qué vino Jesús, según Marcos 10:45?", reverso: "Para dar su vida en rescate por muchos.", apoyo: "Rescate: Jesús vino «para dar su vida en rescate por muchos»" },
              { frente: "¿Qué es la redención?", reverso: "El pago que nos libera.", apoyo: "Redención: el pago que nos libera" },
              { frente: "¿Hace falta repetir la obra de Cristo o añadirle algo?", reverso: "No: es una obra completa.", apoyo: "No hace falta repetirla ni añadirle nada" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué muestra cada palabra que usa la Biblia para la cruz?", reverso: "Un lado de la misma obra.", apoyo: "cada una muestra un lado de la misma obra" },
              { frente: "Según 2 Corintios 5:21, ¿para qué hizo Dios pecado al que no conoció pecado?", reverso: "Para que nosotros fuésemos hechos justicia de Dios en él.", apoyo: "«Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos hechos justicia de Dios en él»" },
              { frente: "En la propiciación, ¿qué queda satisfecho?", reverso: "La justicia de Dios.", apoyo: "su justicia queda satisfecha" },
              { frente: "¿Cuántas veces entró Cristo en el Lugar Santísimo?", reverso: "Una vez para siempre, habiendo obtenido eterna redención.", apoyo: "Cristo entró «una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención»" },
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
            consigna: "Completa cómo resume Pablo la obra de la cruz.",
            texto: "Cristo fue hecho [[pecado]] por nosotros, para que fuésemos [[justicia]] de [[Dios]] en él.",
            distractores: ["ley", "enemigos", "Moisés"],
            errores: {
              ley: "Al que no conoció pecado, por nosotros lo hizo pecado.",
              enemigos: "Fue para que fuésemos hechos justicia de Dios en él.",
              "Moisés": "Somos hechos justicia de Dios en él.",
            },
            apoyo: "hecho pecado por nosotros para que fuésemos justicia de Dios en él",
            ref: "2 Corintios 5:21",
            explica: "Pablo lo resume: al que no conoció pecado, por nosotros lo hizo pecado, para que fuésemos hechos justicia de Dios en él. Cristo murió en nuestro lugar.",
          },
          {
            consigna: "Completa por qué a la obra de la cruz no le falta nada.",
            texto: "La obra de la cruz está [[completa]]: Cristo entró una vez para [[siempre]] en el Lugar Santísimo y obtuvo eterna [[redención]].",
            distractores: ["pendiente", "empezar", "condena"],
            errores: {
              pendiente: "Es una obra completa: no hace falta repetirla ni añadirle nada.",
              empezar: "Cristo entró «una vez para siempre en el Lugar Santísimo».",
              condena: "Cristo obtuvo eterna redención.",
            },
            apoyo: "y es una obra completa: entró una vez para siempre, habiendo obtenido eterna redención",
            ref: "Hebreos 9:12",
            explica: "Es una obra completa: Cristo entró una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención. No hace falta repetirla ni añadirle nada.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada palabra de la cruz con lo que muestra.",
            pares: [
              ["Rescate", "Jesús vino a dar su vida por muchos"],
              ["Redención", "El pago que nos libera"],
              ["Propiciación", "La justicia de Dios queda satisfecha"],
              ["Justificación", "Dios es «el justo, y el que justifica al que es de la fe de Jesús»"],
            ],
            apoyo: "La Biblia lo explica como rescate, redención, propiciación y justificación",
            ref: "Marcos 10:45; Romanos 3:24-26",
            explica: "Rescate: Jesús vino para dar su vida en rescate por muchos. Redención: el pago que nos libera. Propiciación: la justicia de Dios queda satisfecha. Justificación: Dios es el justo, y el que justifica al que es de la fe de Jesús.",
          },
          {
            consigna: "Une cada palabra de la cruz con lo que dice de ella la lección.",
            pares: [
              ["Rescate", "Lo enseña Marcos 10:45: dio su vida por muchos"],
              ["Redención", "El pago por el que somos justificados en Cristo Jesús"],
              ["Propiciación", "Por la fe en su sangre, la justicia de Dios queda satisfecha"],
              ["Justificación", "Dios es el justo, y justifica a los que son de la fe de Jesús"],
            ],
            apoyo: "Redención: el pago que nos libera; somos justificados «mediante la redención que es en Cristo Jesús»",
            ref: "Romanos 3:24-26",
            explica: "Jesús vino para dar su vida en rescate por muchos; somos justificados mediante la redención que es en Cristo Jesús; Dios lo puso como propiciación por medio de la fe en su sangre, y justifica al que es de la fe de Jesús.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre las palabras de la cruz tiene un error. Tócala.",
            frases: [
              "Rescate: Jesús vino para dar su vida en rescate por muchos.",
              "Redención: el pago que nos libera.",
              "Propiciación: la justicia de Dios queda sin satisfacer.",
              "Justificación: Dios justifica al que es de la fe de Jesús.",
            ],
            malo: 2,
            correccion: "En la propiciación, la justicia de Dios queda satisfecha: Dios lo puso como propiciación por medio de la fe en su sangre.",
            apoyo: "Propiciación: Dios lo puso «como propiciación por medio de la fe en su sangre»; su justicia queda satisfecha",
            ref: "Romanos 3:24-26",
            explica: "Dios puso a Cristo como propiciación por medio de la fe en su sangre: su justicia queda satisfecha.",
          },
          {
            consigna: "Una de estas frases sobre el rescate, la redención y la justificación tiene un error. Tócala.",
            frases: [
              "La Biblia explica la obra de la cruz con varias palabras.",
              "Rescate: Jesús vino para que muchos dieran su vida por él.",
              "Redención: somos justificados «mediante la redención que es en Cristo Jesús».",
              "Justificación: Dios es «el justo, y el que justifica al que es de la fe de Jesús».",
            ],
            malo: 1,
            correccion: "Rescate: Jesús vino «para dar su vida en rescate por muchos».",
            apoyo: "Rescate: Jesús vino «para dar su vida en rescate por muchos»",
            ref: "Marcos 10:45",
            explica: "Jesús vino para dar su vida en rescate por muchos: él dio su vida, no los muchos por él.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Isaías anunció la cruz como una sustitución. Según Isaías 53:5, ¿por qué fue herido y molido? Toca las palabras que lo dicen.",
            texto: "él herido fue por [[nuestras rebeliones]], molido por [[nuestros pecados]]",
            apoyo: "Isaías lo anunció como una sustitución: «él herido fue por nuestras rebeliones, molido por nuestros pecados»",
            ref: "Isaías 53:5",
            explica: "Isaías lo anunció como una sustitución: él herido fue por nuestras rebeliones, molido por nuestros pecados. Cristo ocupó nuestro lugar.",
          },
          {
            consigna: "Según Isaías 53:6, ¿qué cargó Jehová en él? Toca las palabras que lo dicen.",
            texto: "Jehová cargó en él [[el pecado de todos nosotros]]",
            apoyo: "«Jehová cargó en él el pecado de todos nosotros»",
            ref: "Isaías 53:6",
            explica: "Jehová cargó en él el pecado de todos nosotros: Cristo ocupó nuestro lugar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "A la obra de Cristo no le falta nada: no hay que añadirle méritos",
            ref: "Hebreos 9:12",
            titulo: "Un ujier que quiere pagar su pecado",
            relato: [
              "Ramiro se convirtió hace un año y sirve con los ujieres de tu iglesia. El mes pasado cayó en un pecado que lo avergüenza mucho.",
              "Ya se lo confesó a Dios, pero te dice que no se siente perdonado: piensa ayunar cuarenta días y servir el doble, para pagar lo que hizo antes de volver a acercarse a Dios.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le muestras primero a Ramiro?",
                opciones: [
                  { texto: "Que Cristo ocupó su lugar: Jehová cargó en él el pecado de todos nosotros.", bien: true, explica: "Isaías lo anunció como una sustitución: Cristo ocupó nuestro lugar y cargó con nuestro pecado." },
                  { texto: "Que tiene razón: el perdón llega cuando uno lo paga con su propio esfuerzo y ayuno.", explica: "Cristo murió en nuestro lugar: a su obra no hay que añadirle méritos." },
                  { texto: "Que ayune solo veinte días, porque cuarenta es demasiado para comenzar.", explica: "El problema no es cuánto: a la obra de Cristo no le falta nada." },
                  { texto: "Que espere a sentirse perdonado, y que solo entonces vuelva a orar.", explica: "Cristo ya ocupó su lugar en la cruz: no tiene que esperar ni pagar nada." },
                ],
                apoyo: "Isaías lo anunció como una sustitución",
                explica: "Isaías anunció la cruz como una sustitución: Jehová cargó en él el pecado de todos nosotros. Cristo ocupó nuestro lugar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pasaje le enseña que la obra de Cristo no hay que repetirla?",
                opciones: [
                  { texto: "Hebreos 9:12: Cristo entró una vez para siempre y obtuvo eterna redención.", bien: true, explica: "Es una obra completa: entró una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención." },
                  { texto: "Marcos 10:45: cada uno tiene que dar su propia vida para pagar su rescate.", explica: "Marcos 10:45 dice lo contrario: Jesús vino «para dar su vida en rescate por muchos»." },
                  { texto: "Romanos 3:24-26: Dios justifica solo al que se esfuerza lo suficiente.", explica: "Dios es «el justo, y el que justifica al que es de la fe de Jesús»: por la fe, no por el esfuerzo." },
                  { texto: "Isaías 53:6: cada uno tiene que cargar con su propio pecado ante Dios.", explica: "Isaías dice que «Jehová cargó en él el pecado de todos nosotros»." },
                ],
                apoyo: "Y es una obra completa: Cristo entró «una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención»",
                explica: "Es una obra completa: Cristo entró una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención. No hace falta repetirla ni añadirle nada.",
              },
              {
                tipo: "explica",
                apoyo: "A la obra de Cristo no le falta nada: no hay que añadirle méritos",
                ref: "Hebreos 9:12",
                clave: {
                  id: "pr-n4-sistematica-2-3-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a Ramiro sobre su perdón.",
                  ideas: [
                    { id: "lugar", peso: 50, texto: "Que Cristo murió en su lugar: Jehová cargó en él nuestro pecado.", formas: ["en (su|tu|nuestro|mi) lugar", "ocupo (su|tu|nuestro|mi) lugar", "murio por (ti|el|nosotros|tus|sus|nuestros|mi|mis)", "cargo (tu|su|nuestro|el|nuestros|tus|sus|mi|mis) pecado*", "cargo con (tu|su|nuestro|el|nuestros|tus|sus) pecado*", "sustitu*", "pago (tu|su|nuestro|nuestra|la|el|por) (deuda|pecado|pecados|culpa)", "pago por (ti|el|nosotros)", "hecho pecado"] },
                    { id: "completa", peso: 50, texto: "Que la obra de Cristo es completa: no hay que añadirle méritos ni pagar nada.", formas: ["obra completa", "(es|esta) completa", "no le falta nada", "no (hay|tiene|tienes|necesita|necesitas) que (anadir*|pagar|repetir*|agregar*|ganar*)", "(anadir*|agregar*) meritos", "sin (anadir*|agregar*|meritos)", "una vez para siempre", "eterna redencion", "ya (lo|la) pago", "ya pago", "ya esta pagado"] },
                  ],
                  modelo: "Le diría que Cristo murió en su lugar: Jehová cargó en él nuestro pecado. Y que su obra es completa, una vez para siempre: no hay que añadirle méritos ni pagar nada con ayunos.",
                },
              },
            ],
          },
          {
            apoyo: "En la cruz, Cristo murió en nuestro lugar",
            ref: "2 Corintios 5:21",
            titulo: "La clase de los niños sobre la cruz",
            relato: [
              "Eres maestro de la escuela dominical y vas a preparar con Marta la clase de los niños sobre la cruz.",
              "Marta propone decirles que Jesús murió para que aprendamos a portarnos bien, y que si nos portamos bien, Dios nos va a perdonar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le explicas a Marta sobre lo que pasó en la cruz?",
                opciones: [
                  { texto: "Que Cristo murió en nuestro lugar: fue herido por nuestras rebeliones.", bien: true, explica: "Isaías lo anunció como una sustitución: él herido fue por nuestras rebeliones. Cristo ocupó nuestro lugar." },
                  { texto: "Que la cruz fue solo un ejemplo, y que lo importante es portarse bien.", explica: "La cruz fue una sustitución: Cristo murió en nuestro lugar." },
                  { texto: "Que Jesús murió por sus propios pecados, como cualquier otro hombre.", explica: "Él no conoció pecado: por nosotros Dios lo hizo pecado." },
                  { texto: "Que la cruz fue un accidente de la historia, sin nada que ver con nosotros.", explica: "El centro del evangelio es lo que Cristo hizo en la cruz: murió en nuestro lugar." },
                ],
                apoyo: "El centro del evangelio es lo que Cristo hizo en la cruz",
                explica: "En la cruz, Cristo murió en nuestro lugar: herido por nuestras rebeliones, hecho pecado por nosotros para que fuésemos justicia de Dios en él.",
              },
              {
                tipo: "situacion",
                pregunta: "Marta pregunta qué hay que añadirle a la cruz para que Dios nos perdone. ¿Qué le respondes?",
                opciones: [
                  { texto: "Nada: es una obra completa, y no hay que añadirle méritos.", bien: true, explica: "A la obra de Cristo no le falta nada: no hay que añadirle méritos." },
                  { texto: "Portarse bien todos los días, para terminar de pagar lo que falta.", explica: "A la obra de Cristo no le falta nada: no hay que añadirle méritos." },
                  { texto: "Repetir el sacrificio de Cristo cada vez que volvemos a pecar.", explica: "Cristo entró una vez para siempre: no hace falta repetirla." },
                  { texto: "Una ofrenda, porque la cruz solo pagó una parte de nuestros pecados.", explica: "Es una obra completa: entró una vez para siempre, habiendo obtenido eterna redención." },
                ],
                apoyo: "No hace falta repetirla ni añadirle nada",
                explica: "Es una obra completa: Cristo entró una vez para siempre, habiendo obtenido eterna redención. No hace falta repetirla ni añadirle nada.",
              },
              {
                tipo: "explica",
                apoyo: "En la cruz, Cristo murió en nuestro lugar",
                ref: "2 Corintios 5:21",
                clave: {
                  id: "pr-n4-sistematica-2-3-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que los niños deben aprender sobre la cruz.",
                  ideas: [
                    { id: "lugar", peso: 50, texto: "Que Jesús murió en nuestro lugar: fue hecho pecado por nosotros.", formas: ["en (su|tu|nuestro|mi) lugar", "ocupo (su|tu|nuestro|mi) lugar", "murio por (ti|nosotros|nuestros|ellos|mi|mis|sus)", "cargo (tu|su|nuestro|el|nuestros|tus|sus) pecado*", "cargo con (tu|su|nuestro|el|nuestros|tus|sus) pecado*", "sustitu*", "hecho pecado", "por nuestras rebeliones", "pago (nuestros|sus|los) pecados", "pago por (nuestros|sus|los|nosotros|ellos)"] },
                    { id: "completa", peso: 50, texto: "Que su obra es completa: no hay que añadirle nada para que Dios nos perdone.", formas: ["obra completa", "(es|esta) completa", "no le falta nada", "no (hay|tiene|tienen|tenemos|necesita|necesitan|necesitamos) que (anadir*|pagar|repetir*|agregar*|ganar*)", "(anadir*|agregar*) meritos", "sin (anadir*|agregar*|meritos)", "una vez para siempre", "eterna redencion"] },
                  ],
                  modelo: "Que Jesús murió en nuestro lugar: fue hecho pecado por nosotros, para que fuésemos justicia de Dios en él. Y que su obra es completa: no hay que añadirle nada para que Dios nos perdone.",
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
            apoyo: "La Biblia lo explica con varias palabras, y cada una muestra un lado de la misma obra",
            ref: "Romanos 3:24-26",
            clave: {
              id: "pr-n4-sistematica-2-3-a7-1",
              tipo: "corta",
              pregunta: "Explica con tus palabras qué es la redención y qué es la propiciación.",
              ideas: [
                { id: "redencion", peso: 50, texto: "La redención es el pago que nos libera: somos justificados mediante la redención que es en Cristo Jesús.", formas: ["(redencion|redimi*|redime) (pago|pagar|pagado|precio)", "(redencion|redimi*|redime) (libera|liberta|libero|libra|liberarnos|librarnos|liberacion|libres|libre|libertad|rescata)"] },
                { id: "propiciacion", peso: 50, texto: "En la propiciación, Dios puso a Cristo por medio de la fe en su sangre, y su justicia queda satisfecha.", formas: ["satisf*", "fe en su sangre", "justicia (queda|quedo) (cumplida|pagada)"] },
              ],
              modelo: "La redención es el pago que nos libera: somos justificados mediante la redención que es en Cristo Jesús. La propiciación es que Dios puso a Cristo por medio de la fe en su sangre, y su justicia queda satisfecha.",
            },
          },
          {
            apoyo: "Justificación: Dios es «el justo, y el que justifica al que es de la fe de Jesús»",
            ref: "Marcos 10:45; Romanos 3:24-26",
            clave: {
              id: "pr-n4-sistematica-2-3-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseñan sobre la cruz las palabras rescate y justificación, con sus pasajes?",
              ideas: [
                { id: "rescate", peso: 50, texto: "Rescate: Jesús vino para dar su vida en rescate por muchos (Marcos 10:45).", formas: ["dar su vida", "dio su vida", "entreg* su vida", "su vida (en|por|como)", "por muchos", "marcos 10"] },
                { id: "justificacion", peso: 50, texto: "Justificación: Dios es el justo, y el que justifica al que es de la fe de Jesús (Romanos 3:24-26).", formas: ["justifica al", "nos justifica", "(es|somos|son|fuimos|quedamos|seremos) justificad*", "declara justo*", "el justo", "fe de jesus", "fe en jesus", "romanos 3"] },
              ],
              modelo: "Rescate: Jesús vino para dar su vida en rescate por muchos, como dice Marcos 10:45. Justificación: Dios es el justo, y el que justifica al que es de la fe de Jesús, según Romanos 3:24-26.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Profeta, sacerdote y rey: la resurrección y la intercesión
    "n4-sistematica-2-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué anunció Moisés en Deuteronomio 18:15?", reverso: "Un profeta como él, del que dijo: a él oiréis.", apoyo: "Moisés anunció a un profeta como él: «a él oiréis»" },
              { frente: "Como profeta, ¿qué hace Cristo?", reverso: "Nos revela a Dios.", apoyo: "Cristo es el profeta que nos revela a Dios" },
              { frente: "¿Qué ofreció Cristo como gran sumo sacerdote?", reverso: "Se ofreció a sí mismo.", apoyo: "que se ofreció a sí mismo" },
              { frente: "¿Qué tiene escrito el rey en su vestidura?", reverso: "Rey de reyes y Señor de señores.", apoyo: "en su vestidura tiene escrito «REY DE REYES Y SEÑOR DE SEÑORES»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Terminó la obra de Cristo en la cruz?", reverso: "No: resucitó, subió al cielo y hoy reina e intercede.", apoyo: "La obra de Cristo no terminó en la cruz" },
              { frente: "¿A quiénes apareció el Cristo resucitado, según 1 Corintios 15?", reverso: "A Cefas, a los doce y a más de quinientos hermanos a la vez.", apoyo: "«apareció a Cefas, y después a los doce»" },
              { frente: "¿Qué invitaba Pablo a hacer con los testigos que vivían?", reverso: "A preguntarles.", apoyo: "Pablo invitaba a preguntarles" },
              { frente: "¿Para qué vive Cristo siempre, según Hebreos 7:25?", reverso: "Para interceder por los suyos.", apoyo: "vive «siempre para interceder por ellos»" },
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
            consigna: "¿Es lo que Cristo es o hace como profeta, como sacerdote o como rey? Lleva cada frase a su grupo.",
            grupos: ["Como profeta", "Como sacerdote", "Como rey"],
            frases: [
              { texto: "Nos revela a Dios", grupo: 0 },
              { texto: "Moisés dijo de él: a él oiréis", grupo: 0 },
              { texto: "Se ofreció a sí mismo", grupo: 1 },
              { texto: "Traspasó los cielos", grupo: 1 },
              { texto: "Es Rey de reyes", grupo: 2 },
              { texto: "Es Señor de señores", grupo: 2 },
              { texto: "Hoy reina", grupo: 2 },
            ],
            apoyo: "Cristo es profeta, sacerdote y rey: nos revela a Dios, se ofreció a sí mismo como gran sumo sacerdote y es Rey de reyes",
            explica: "Como profeta, nos revela a Dios, como anunció Moisés; como gran sumo sacerdote, se ofreció a sí mismo y traspasó los cielos; y como rey, es Rey de reyes y Señor de señores, y hoy reina.",
          },
          {
            consigna: "¿Qué oficio de Cristo muestra cada frase: profeta, sacerdote o rey? Lleva cada frase a su grupo.",
            grupos: ["Profeta", "Sacerdote", "Rey"],
            frases: [
              { texto: "Deuteronomio 18:15: a él oiréis", grupo: 0 },
              { texto: "El que nos revela a Dios", grupo: 0 },
              { texto: "Hebreos 4:14: traspasó los cielos", grupo: 1 },
              { texto: "El que se ofreció a sí mismo", grupo: 1 },
              { texto: "Apocalipsis 19:16: lo escrito en su vestidura", grupo: 2 },
              { texto: "El que hoy reina", grupo: 2 },
              { texto: "Rey de reyes y Señor de señores", grupo: 2 },
            ],
            apoyo: "Moisés anunció a un profeta como él: «a él oiréis»",
            explica: "Deuteronomio 18:15 anuncia al profeta que nos revela a Dios; Hebreos 4:14, al gran sumo sacerdote que se ofreció a sí mismo; y Apocalipsis 19:16, al Rey de reyes y Señor de señores, que hoy reina.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según 1 Corintios 15:17, si Cristo no resucitó, ¿cómo es la fe? Toca la palabra que lo dice.",
            texto: "si Cristo no resucitó, vuestra fe es [[vana]]; aún estáis en vuestros pecados",
            apoyo: "Todo depende de ella: «si Cristo no resucitó, vuestra fe es vana; aún estáis en vuestros pecados»",
            ref: "1 Corintios 15:17",
            explica: "Todo depende de la resurrección: si Cristo no resucitó, vuestra fe es vana; aún estáis en vuestros pecados.",
          },
          {
            consigna: "Según 1 Corintios 15:20, ¿qué es hecho Cristo al resucitar? Toca las palabras que lo dicen.",
            texto: "ahora Cristo ha resucitado de los muertos; [[primicias de los que durmieron]] es hecho",
            apoyo: "su resurrección garantiza la nuestra",
            ref: "1 Corintios 15:20",
            explica: "Ahora Cristo ha resucitado de los muertos y es hecho primicias de los que durmieron: su resurrección garantiza la nuestra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "su resurrección garantiza la nuestra",
            ref: "1 Corintios 15:3-8",
            situacion: "Eres pastor asistente. Visitas a doña Elena, una hermana de la iglesia que acaba de perder a su esposo, también creyente. Su hijo Julián, que no va a la iglesia, está con ella.",
            escenas: [
              {
                id: "e1",
                narra: "Doña Elena llora y te pregunta: ¿De verdad voy a volver a ver a mi esposo?",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que Cristo resucitó, primicias de los que durmieron: su resurrección garantiza la nuestra.", valor: 2, explica: "Ahora Cristo ha resucitado de los muertos y es primicias de los que durmieron: su resurrección garantiza la nuestra.", siguiente: "e2" },
                  { texto: "Que vas a acompañarla en su dolor y a orar con ella, sin hablarle todavía de la resurrección.", valor: 1, explica: "Acompañarla es bueno, pero su esperanza está en la resurrección: Cristo es primicias de los que durmieron.", siguiente: "e2" },
                  { texto: "Que nadie puede saberlo, porque de lo que pasa después de la muerte no sabemos nada.", valor: 0, explica: "Sí lo sabemos: Cristo ha resucitado de los muertos, y su resurrección garantiza la nuestra.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Doña Elena se queda en silencio, todavía más triste.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le lees que Cristo es primicias de los que durmieron, y le explicas esa esperanza.", valor: 2, explica: "Su resurrección garantiza la nuestra: esa es la esperanza de doña Elena.", siguiente: "e2" },
                  { texto: "Cambias de tema para no ponerla más triste con una pregunta que para ti no tiene respuesta.", valor: 0, explica: "Sí tiene respuesta: ahora Cristo ha resucitado de los muertos, primicias de los que durmieron.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Julián te dice: Eso de la resurrección es un cuento bonito; nadie vio nada.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que fue un hecho con testigos: apareció a Cefas, a los doce y a más de quinientos.", valor: 2, explica: "La resurrección fue un hecho con testigos, y Pablo invitaba a preguntarles." },
                  { texto: "Que es un asunto de pura fe, y que en eso no tiene sentido buscar pruebas ni testigos.", valor: 0, explica: "La resurrección fue un hecho con testigos: más de quinientos hermanos lo vieron a la vez." },
                  { texto: "Que respetas lo que piensa, y que otro día con más calma le explicarás lo que pasó.", valor: 1, explica: "Respetarlo está bien, pero puedes darle razones ahora: fue un hecho con testigos." },
                ],
              },
              {
                id: "e3",
                narra: "Ya a solas, doña Elena te dice: A veces siento que Dios me condena por no haberlo cuidado mejor.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Cristo está a la diestra de Dios e intercede por ella: «¿Quién es el que condenará?».", valor: 2, explica: "Hoy está a la diestra de Dios y vive siempre para interceder por los suyos: por eso Pablo pregunta quién es el que condenará." },
                  { texto: "Que quizás tenga razón, y que ahora tiene que hacer algo para ganarse otra vez la paz con Dios.", valor: 0, explica: "Cristo vive siempre para interceder por los suyos: «¿Quién es el que condenará?»." },
                  { texto: "Que no se preocupe, que eso se le va a pasar con el tiempo.", valor: 1, explica: "Consolarla está bien, pero la base de su paz es Cristo, que está a la diestra de Dios e intercede." },
                ],
              },
            ],
          },
          {
            apoyo: "Todo depende de ella",
            ref: "1 Corintios 15:17-20",
            situacion: "Eres maestro de jóvenes. Esta semana das una clase sobre la resurrección de Cristo, y los jóvenes llegan con preguntas.",
            escenas: [
              {
                id: "e1",
                narra: "Andrea dice: Lo importante es que Jesús enseñó a amar; que haya resucitado o no, da igual.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que todo depende de la resurrección: si Cristo no resucitó, nuestra fe es vana.", valor: 2, explica: "«si Cristo no resucitó, vuestra fe es vana; aún estáis en vuestros pecados»: todo depende de ella." },
                  { texto: "Que tiene parte de razón, porque lo que de verdad cuenta es lo que Jesús enseñó.", valor: 0, explica: "Todo depende de la resurrección: sin ella, nuestra fe sería vana." },
                  { texto: "Que es una buena pregunta, y que la van a pensar juntos al final de la clase.", valor: 1, explica: "Está bien escucharla, pero la respuesta es clara: todo depende de la resurrección." },
                ],
              },
              {
                id: "e2",
                narra: "Mateo pregunta: ¿Y cómo sabemos que de verdad pasó?",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que hubo testigos: más de quinientos hermanos lo vieron a la vez, y muchos vivían aún.", valor: 2, explica: "La resurrección fue un hecho con testigos, y Pablo invitaba a preguntarles." },
                  { texto: "Que no hace falta saberlo: basta con sentirlo en el corazón cada vez que oramos juntos.", valor: 0, explica: "La resurrección fue un hecho con testigos: apareció a Cefas, a los doce y a más de quinientos." },
                  { texto: "Que la iglesia siempre lo ha creído, sin hablarle de los testigos que lo vieron vivo.", valor: 1, explica: "Es verdad, pero hay más: fue un hecho con testigos, y Pablo invitaba a preguntarles." },
                ],
              },
              {
                id: "e3",
                narra: "Sara pregunta: ¿Y qué tiene que ver su resurrección conmigo?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Cristo es primicias de los que durmieron: su resurrección garantiza la nuestra.", valor: 2, explica: "Ahora Cristo ha resucitado de los muertos; primicias de los que durmieron es hecho: su resurrección garantiza la nuestra." },
                  { texto: "Que nada: la resurrección fue solo para él, porque él es el Hijo de Dios y nosotros no.", valor: 0, explica: "Es primicias de los que durmieron: su resurrección garantiza la nuestra." },
                  { texto: "Que sin ella seguiríamos en nuestros pecados, sin decirle nada de su propia resurrección.", valor: 1, explica: "Es verdad que sin ella aún estaríamos en nuestros pecados, pero además su resurrección garantiza la nuestra." },
                ],
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
            consigna: "Ordena la obra de Cristo, desde la cruz hasta su venida, de lo primero a lo último.",
            pasos: [
              "Se ofreció a sí mismo en la cruz",
              "Resucitó corporalmente, con muchos testigos",
              "Fue alzado, y le recibió una nube",
              "Hoy está a la diestra de Dios e intercede",
              "Volverá igual que como subió",
            ],
            apoyo: "Resucitó, subió al cielo y hoy reina e intercede",
            ref: "Hechos 1:9-11",
            explica: "La obra de Cristo no terminó en la cruz: resucitó, subió al cielo ante los discípulos y hoy está a la diestra de Dios e intercede, con la promesa de que volverá igual.",
          },
          {
            consigna: "Ordena lo que dice la lección del Cristo resucitado, de lo primero a lo último.",
            pasos: [
              "Apareció a Cefas",
              "Apareció a los doce",
              "Ante los discípulos, fue alzado al cielo",
              "Está a la diestra de Dios y vive para interceder",
              "Volverá igual, según la promesa",
            ],
            apoyo: "Subió al cielo, está a la diestra de Dios y vive siempre para interceder por los suyos",
            ref: "1 Corintios 15:3-8; Hechos 1:9-11",
            explica: "Resucitado, apareció a Cefas, y después a los doce. Ante los discípulos fue alzado y le recibió una nube; hoy está a la diestra de Dios y vive siempre para interceder, con la promesa de que volverá igual.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven que discipulas te dice: Volví a fallar. Siento que Dios ya se cansó de mí y que me condena.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Cristo está a la diestra de Dios y vive para interceder por los suyos.", bien: true, explica: "Cristo vive siempre para interceder por los suyos: por eso Pablo pregunta «¿Quién es el que condenará?»." },
              { texto: "Que tiene razón: Cristo intercede por los que nunca fallan, no por los demás.", explica: "Cristo vive siempre para interceder por los suyos, y Pablo pregunta: «¿Quién es el que condenará?»." },
              { texto: "Que Cristo ya hizo su parte en la cruz, y que ahora le toca arreglarlo solo.", explica: "La obra de Cristo no terminó en la cruz: hoy vive, reina e intercede." },
              { texto: "Que Cristo subió al cielo y desde allá ya no se ocupa de lo que nos pasa.", explica: "Subió al cielo, pero está a la diestra de Dios y vive siempre para interceder por los suyos." },
            ],
            apoyo: "Por eso Pablo pregunta: «¿Quién es el que condenará?»",
            ref: "Romanos 8:34",
            explica: "Cristo está a la diestra de Dios y vive siempre para interceder por los suyos. Por eso Pablo pregunta: «¿Quién es el que condenará?».",
          },
          {
            caso: "Una hermana del grupo de oración te dice: Desde que Jesús subió al cielo, siento que está muy lejos de nosotros.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que hoy vive a la diestra de Dios, reina e intercede por ella.", bien: true, explica: "El Cristo que murió por ella hoy vive, reina e intercede por ella." },
              { texto: "Que es cierto: se fue al cielo y dejó de ocuparse de lo que nos pasa.", explica: "Subió al cielo, pero está a la diestra de Dios y vive siempre para interceder por los suyos." },
              { texto: "Que nunca subió de verdad: la ascensión es solo una manera de hablar.", explica: "Ante los discípulos, «fue alzado, y le recibió una nube»." },
              { texto: "Que solo subió su espíritu, y que su cuerpo quedó aquí, en la tumba.", explica: "Resucitó corporalmente, y ante los discípulos fue alzado y le recibió una nube." },
            ],
            apoyo: "El Cristo que murió por ti hoy vive, reina e intercede por ti",
            ref: "Hebreos 7:25",
            explica: "Ante los discípulos, fue alzado y le recibió una nube; hoy está a la diestra de Dios y vive siempre para interceder por los suyos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Cristo es profeta, sacerdote y rey",
            ref: "Deuteronomio 18:15; Hebreos 4:14; Apocalipsis 19:16",
            clave: {
              id: "pr-n4-sistematica-2-4-a7-1",
              tipo: "corta",
              pregunta: "Explica con tus palabras los tres oficios de Cristo: qué hace como profeta, como sacerdote y como rey.",
              ideas: [
                { id: "profeta", peso: 34, texto: "Como profeta, nos revela a Dios: Moisés lo anunció, a él oiréis.", formas: ["profeta (revel*|oireis|conocer|muestra|ensena|habla|palabra)", "a el oireis"] },
                { id: "sacerdote", peso: 33, texto: "Como sacerdote, se ofreció a sí mismo: es el gran sumo sacerdote que traspasó los cielos.", formas: ["sacerdote (ofrecio|entrego|sacrifico|sacrificio|traspaso|cielos|vida|dio)", "gran sumo sacerdote"] },
                { id: "rey", peso: 33, texto: "Como rey, es Rey de reyes y Señor de señores, y hoy reina.", formas: ["rey de reyes", "senor de senores", "rey (reina|reinar*|gobierna|reino)", "(hoy|ahora) reina"] },
              ],
              modelo: "Como profeta, Cristo nos revela a Dios. Como sacerdote, se ofreció a sí mismo: es el gran sumo sacerdote que traspasó los cielos. Y como rey, es Rey de reyes y Señor de señores, y hoy reina.",
            },
          },
          {
            apoyo: "nos revela a Dios, se ofreció a sí mismo como gran sumo sacerdote y es Rey de reyes",
            ref: "Deuteronomio 18:15; Hebreos 4:14; Apocalipsis 19:16",
            clave: {
              id: "pr-n4-sistematica-2-4-a7-2",
              tipo: "corta",
              pregunta: "¿Qué anunció Moisés, qué dice Hebreos 4:14 y qué dice Apocalipsis 19:16 sobre los oficios de Cristo?",
              ideas: [
                { id: "profeta", peso: 34, texto: "Moisés anunció a un profeta como él, a quien hay que oír: Cristo nos revela a Dios.", formas: ["profeta (como|revel*|oireis|oir|oirlo|escuchar|escucharlo|conocer)", "a el oireis", "moises (anuncio|anuncia|dijo|prometio) profeta"] },
                { id: "sacerdote", peso: 33, texto: "Hebreos lo llama un gran sumo sacerdote que traspasó los cielos, que se ofreció a sí mismo.", formas: ["sumo sacerdote", "gran sacerdote", "sacerdote (traspaso|cielos|ofrecio|paso)"] },
                { id: "rey", peso: 33, texto: "Apocalipsis dice que en su vestidura está escrito Rey de reyes y Señor de señores.", formas: ["rey de reyes", "senor de senores", "su vestidura", "rey (reina|reino)"] },
              ],
              modelo: "Moisés anunció a un profeta como él, al que hay que oír: Cristo nos revela a Dios. Hebreos lo llama un gran sumo sacerdote que traspasó los cielos. Y en su vestidura está escrito Rey de reyes y Señor de señores.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La deidad y la personalidad del Espíritu Santo
    "n4-sistematica-2-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué tiene el Espíritu que solo tiene Dios?", reverso: "Atributos divinos: conoce todo y está en todo lugar.", apoyo: "El Espíritu tiene atributos que solo tiene Dios" },
              { frente: "¿Qué escudriña el Espíritu, según 1 Corintios 2:10?", reverso: "Todo, aun lo profundo de Dios.", apoyo: "«el Espíritu todo lo escudriña, aun lo profundo de Dios»" },
              { frente: "¿A quiénes mandó apartar el Espíritu Santo en Antioquía?", reverso: "A Bernabé y a Saulo, para la obra a que los había llamado.", apoyo: "en Antioquía, «dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado»" },
              { frente: "¿Qué tres cosas hace el Espíritu que muestran que es una persona?", reverso: "Habla, llama y envía.", apoyo: "Es una persona: habla, llama y envía" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué significa que el Espíritu es omnisciente?", reverso: "Que escudriña aun lo profundo de Dios.", apoyo: "Es omnisciente: escudriña aun lo profundo de Dios" },
              { frente: "¿Qué significa que el Espíritu es omnipresente?", reverso: "Que nadie puede huir de su presencia.", apoyo: "Es omnipresente: nadie puede huir de su presencia" },
              { frente: "¿Cómo llama Jesús al Espíritu en Juan 15:26?", reverso: "El Consolador, el Espíritu de verdad.", apoyo: "es el Consolador «a quien yo os enviaré del Padre, el Espíritu de verdad, el cual procede del Padre»" },
              { frente: "¿Cómo confesó al Espíritu el concilio de Constantinopla?", reverso: "Como el Señor y dador de vida.", apoyo: "lo confesó como el Señor y dador de vida" },
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
            consigna: "¿Muestra un atributo que solo tiene Dios o algo que hace una persona? Lleva cada frase a su grupo.",
            grupos: ["Un atributo que solo tiene Dios", "Algo que hace una persona"],
            frases: [
              { texto: "Escudriña aun lo profundo de Dios", grupo: 0 },
              { texto: "Conoce todo", grupo: 0 },
              { texto: "Está en todo lugar", grupo: 0 },
              { texto: "Nadie puede huir de su presencia", grupo: 0 },
              { texto: "Dice: Apartadme a Bernabé y a Saulo", grupo: 1 },
              { texto: "Llama a Bernabé y a Saulo para la obra", grupo: 1 },
              { texto: "Envía a los que llamó", grupo: 1 },
            ],
            apoyo: "El Espíritu tiene atributos que solo tiene Dios",
            ref: "1 Corintios 2:10-11; Hechos 13:2",
            explica: "Conoce todo y está en todo lugar: tiene atributos que solo tiene Dios. Y actúa como una persona: habla, llama y envía, como en Antioquía.",
          },
          {
            consigna: "¿Es un atributo divino del Espíritu o una acción que muestra que es una persona? Lleva cada frase a su grupo.",
            grupos: ["Un atributo divino", "Una acción de persona"],
            frases: [
              { texto: "Es omnisciente", grupo: 0 },
              { texto: "Es omnipresente", grupo: 0 },
              { texto: "Todo lo escudriña", grupo: 0 },
              { texto: "Habla a la iglesia de Antioquía", grupo: 1 },
              { texto: "Llama a sus siervos para la obra", grupo: 1 },
              { texto: "Envía a Bernabé y a Saulo", grupo: 1 },
            ],
            apoyo: "Y actúa como una persona",
            ref: "Salmos 139:7-8; Hechos 13:2",
            explica: "Es omnisciente, omnipresente y todo lo escudriña: es Dios. Y habla, llama y envía, como en Antioquía: es una persona.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En Antioquía, ¿qué dos palabras muestran que el Espíritu habla y llama como una persona? Tócalas.",
            texto: "[[dijo]] el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he [[llamado]]",
            apoyo: "Habla, llama y envía",
            ref: "Hechos 13:2",
            explica: "En Antioquía, «dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado». Habla, llama y envía: actúa como una persona.",
          },
          {
            consigna: "Según 1 Corintios 2:10, ¿qué escudriña el Espíritu? Toca las palabras que lo dicen.",
            texto: "el Espíritu [[todo]] lo escudriña, [[aun lo profundo de Dios]]",
            apoyo: "Es omnisciente: escudriña aun lo profundo de Dios",
            ref: "1 Corintios 2:10",
            explica: "El Espíritu tiene atributos que solo tiene Dios: «el Espíritu todo lo escudriña, aun lo profundo de Dios».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que confesó el concilio de Constantinopla.",
            texto: "En el año 381, el concilio de Constantinopla confesó al Espíritu como el [[Señor]] y dador de [[vida]], que con el Padre y el Hijo es [[adorado]] y glorificado.",
            distractores: ["siervo", "miedo", "olvidado"],
            errores: {
              siervo: "Constantinopla lo confesó como el Señor y dador de vida.",
              miedo: "El Espíritu es el Señor y dador de vida.",
              olvidado: "Con el Padre y el Hijo es adorado y glorificado.",
            },
            apoyo: "el concilio de Constantinopla, en el año 381, lo confesó como el Señor y dador de vida, que con el Padre y el Hijo es adorado y glorificado",
            explica: "Cuando algunos negaron que el Espíritu fuera Dios, el concilio de Constantinopla, en el año 381, lo confesó como el Señor y dador de vida, que con el Padre y el Hijo es adorado y glorificado.",
          },
          {
            consigna: "Completa por qué se reunió el concilio de Constantinopla y qué logró.",
            texto: "Cuando algunos [[negaron]] que el Espíritu fuera Dios, el concilio de Constantinopla lo confesó, y así la iglesia [[completó]] su confesión de la [[Trinidad]].",
            distractores: ["afirmaron", "abandonó", "Reforma"],
            errores: {
              afirmaron: "El concilio se reunió cuando algunos negaron que el Espíritu fuera Dios.",
              "abandonó": "Así la iglesia completó su confesión de la Trinidad.",
              Reforma: "Con Constantinopla, la iglesia completó su confesión de la Trinidad.",
            },
            apoyo: "Así la iglesia completó su confesión de la Trinidad, como enseña el artículo 2 de la declaración de fe",
            explica: "Cuando algunos negaron que el Espíritu fuera Dios, el concilio de Constantinopla, en el año 381, lo confesó como el Señor y dador de vida. Así la iglesia completó su confesión de la Trinidad.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el concilio de Constantinopla tiene un error. Tócala.",
            frases: [
              "Algunos negaron que el Espíritu fuera Dios.",
              "El concilio de Constantinopla se reunió en el año 381.",
              "Constantinopla confesó al Espíritu como el Señor y dador de vida.",
              "Constantinopla dijo que al Espíritu no se le adora como al Padre y al Hijo.",
            ],
            malo: 3,
            correccion: "Constantinopla lo confesó como el que, con el Padre y el Hijo, es adorado y glorificado.",
            apoyo: "que con el Padre y el Hijo es adorado y glorificado",
            explica: "El concilio de Constantinopla, en el año 381, confesó al Espíritu como el Señor y dador de vida, que con el Padre y el Hijo es adorado y glorificado.",
          },
          {
            consigna: "Una de estas frases sobre la confesión del Espíritu tiene un error. Tócala.",
            frases: [
              "El concilio de Constantinopla se reunió en el año 325.",
              "Constantinopla confesó al Espíritu como Señor y dador de vida.",
              "Con Constantinopla, la iglesia completó su confesión de la Trinidad.",
              "La confesión de la Trinidad la enseña el artículo 2 de la declaración de fe.",
            ],
            malo: 0,
            correccion: "El concilio de Constantinopla se reunió en el año 381.",
            apoyo: "el concilio de Constantinopla, en el año 381",
            explica: "El concilio de Constantinopla, en el año 381, confesó al Espíritu como Señor y dador de vida, y así la iglesia completó su confesión de la Trinidad, como enseña el artículo 2 de la declaración de fe.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se relaciona el Espíritu Santo con el Padre, con el Hijo y con la iglesia? Elige la relación de cada enlace.",
            nodos: [
              { id: "espiritu", texto: "El Espíritu Santo", x: 50, y: 50 },
              { id: "padre", texto: "El Padre", x: 50, y: 12 },
              { id: "hijo", texto: "El Hijo", x: 18, y: 88 },
              { id: "iglesia", texto: "La iglesia", x: 82, y: 88 },
            ],
            enlaces: [
              { de: "espiritu", a: "padre", relacion: "procede del" },
              { de: "hijo", a: "espiritu", relacion: "envía al" },
              { de: "iglesia", a: "espiritu", relacion: "adora y glorifica al" },
            ],
            distractores: ["solo pide poder al", "se olvida del"],
            apoyo: "Procede del Padre y es enviado por el Hijo",
            ref: "Juan 15:26",
            explica: "El Espíritu procede del Padre y es enviado por el Hijo, y con el Padre y el Hijo es adorado y glorificado: al Espíritu Santo también se le adora.",
          },
          {
            consigna: "Según Juan 15:26, ¿cómo se relaciona el Espíritu de verdad con el Padre, con Jesús y con los discípulos? Elige la relación de cada enlace.",
            nodos: [
              { id: "espiritu", texto: "El Espíritu de verdad", x: 50, y: 50 },
              { id: "padre", texto: "El Padre", x: 50, y: 12 },
              { id: "jesus", texto: "Jesús", x: 18, y: 88 },
              { id: "discipulos", texto: "Los discípulos", x: 82, y: 88 },
            ],
            enlaces: [
              { de: "espiritu", a: "padre", relacion: "procede del" },
              { de: "jesus", a: "espiritu", relacion: "envía del Padre al" },
              { de: "espiritu", a: "discipulos", relacion: "es el Consolador de" },
            ],
            distractores: ["es una fuerza de", "huye de"],
            apoyo: "Jesús explicó su relación con el Padre y el Hijo",
            ref: "Juan 15:26",
            explica: "Jesús lo explicó: es el Consolador a quien él envía del Padre, el Espíritu de verdad, el cual procede del Padre. La Biblia afirma que procede del Padre y que el Hijo lo envía.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Procede del Padre y es enviado por el Hijo",
            ref: "Juan 15:26",
            clave: {
              id: "pr-n4-sistematica-2-5-a7-1",
              tipo: "corta",
              pregunta: "Según Juan 15:26 y la confesión de Constantinopla, ¿cómo se relaciona el Espíritu Santo con el Padre y con el Hijo?",
              ideas: [
                { id: "procede", peso: 50, texto: "Que procede del Padre y que el Hijo lo envía: es el Consolador, el Espíritu de verdad.", formas: ["procede del padre", "proced* del padre", "sale del padre", "hijo (lo|le) envia", "enviado por el hijo", "(jesus|cristo) (lo|le) (envia|envio|enviara)", "lo envia (el|jesus|cristo)"] },
                { id: "adorado", peso: 50, texto: "Que con el Padre y el Hijo es adorado y glorificado.", formas: ["adorado", "glorificad*", "se le adora", "le adoramos", "recibe adoracion", "merece adoracion", "merece ser adorado"] },
              ],
              modelo: "Jesús enseñó que el Espíritu de verdad procede del Padre y que el Hijo lo envía como Consolador. Y Constantinopla confesó que con el Padre y el Hijo es adorado y glorificado.",
            },
          },
          {
            apoyo: "Al Espíritu Santo también se le adora",
            ref: "Juan 15:26",
            clave: {
              id: "pr-n4-sistematica-2-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano te dice que al Espíritu Santo solo se le pide poder. ¿Qué le enseñas sobre su relación con el Padre y el Hijo?",
              ideas: [
                { id: "adorado", peso: 50, texto: "Que con el Padre y el Hijo es adorado y glorificado: al Espíritu Santo también se le adora.", formas: ["adorado", "glorificad*", "se le adora", "tambien se le adora", "hay que adorarlo", "adorar*", "le adoramos", "recibe adoracion", "merece adoracion"] },
                { id: "procede", peso: 50, texto: "Que procede del Padre y que el Hijo lo envía.", formas: ["procede del padre", "proced* del padre", "sale del padre", "hijo (lo|le) envia", "enviado por el hijo", "(jesus|cristo) (lo|le) (envia|envio|enviara)", "lo envia (el|jesus|cristo)"] },
              ],
              modelo: "Le enseño que al Espíritu Santo también se le adora: con el Padre y el Hijo es adorado y glorificado. Y que procede del Padre, y que el Hijo lo envía a los suyos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Los dones, el bautismo en el Espíritu y el discernimiento
    "n4-sistematica-2-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas manifestaciones del Espíritu nombra Pablo en 1 Corintios 12?", reverso: "Nueve, dadas para provecho.", apoyo: "Pablo nombra nueve manifestaciones, dadas «para provecho»" },
              { frente: "¿En qué tres grupos las agrupan muchos maestros pentecostales?", reverso: "Dones de revelación, de poder y de expresión.", apoyo: "Muchos maestros pentecostales las agrupan en tres" },
              { frente: "¿Quién hace todas esas manifestaciones?", reverso: "Uno y el mismo Espíritu.", apoyo: "Todas las hace «uno y el mismo Espíritu»" },
              { frente: "¿Qué enseña el artículo 10 de la declaración de fe sobre los dones?", reverso: "Que siguen vigentes hoy.", apoyo: "El artículo 10 de la declaración de fe enseña que los dones siguen vigentes hoy" },
            ],
          },
          {
            tarjetas: [
              { frente: "En esa agrupación, ¿cuáles son los dones de revelación?", reverso: "Palabra de sabiduría, palabra de ciencia y discernimiento de espíritus.", apoyo: "dones de revelación (palabra de sabiduría, palabra de ciencia y discernimiento de espíritus)" },
              { frente: "¿Cuáles son los dones de poder?", reverso: "Fe, sanidades y milagros.", apoyo: "dones de poder (fe, sanidades y milagros)" },
              { frente: "¿Cuáles son los dones de expresión?", reverso: "Profecía, lenguas e interpretación.", apoyo: "dones de expresión (profecía, lenguas e interpretación)" },
              { frente: "¿Qué enseña el artículo 9 sobre el bautismo en el Espíritu?", reverso: "Que es distinto del nuevo nacimiento, que puede seguirlo y que da poder para testificar y servir.", apoyo: "El artículo 9 enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento, que puede seguirlo y que da poder para testificar y servir" },
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
            consigna: "Según muchos maestros pentecostales, ¿es un don de revelación, de poder o de expresión? Lleva cada don a su grupo.",
            grupos: ["Dones de revelación", "Dones de poder", "Dones de expresión"],
            frases: [
              { texto: "Palabra de sabiduría", grupo: 0 },
              { texto: "Palabra de ciencia", grupo: 0 },
              { texto: "Discernimiento de espíritus", grupo: 0 },
              { texto: "El don de fe", grupo: 1 },
              { texto: "Sanidades", grupo: 1 },
              { texto: "Milagros", grupo: 1 },
              { texto: "Profecía", grupo: 2 },
              { texto: "Interpretación", grupo: 2 },
            ],
            apoyo: "dones de revelación (palabra de sabiduría, palabra de ciencia y discernimiento de espíritus)",
            ref: "1 Corintios 12:7-11",
            explica: "Muchos maestros pentecostales agrupan las nueve en tres: de revelación (palabra de sabiduría, palabra de ciencia y discernimiento de espíritus), de poder (fe, sanidades y milagros) y de expresión (profecía, lenguas e interpretación).",
          },
          {
            consigna: "Según muchos maestros pentecostales, ¿es un don de poder o de expresión? Lleva cada don a su grupo.",
            grupos: ["Dones de poder", "Dones de expresión"],
            frases: [
              { texto: "El don de fe", grupo: 0 },
              { texto: "Sanidades", grupo: 0 },
              { texto: "Milagros", grupo: 0 },
              { texto: "Profecía", grupo: 1 },
              { texto: "Lenguas", grupo: 1 },
              { texto: "Interpretación", grupo: 1 },
            ],
            apoyo: "dones de poder (fe, sanidades y milagros) y dones de expresión (profecía, lenguas e interpretación)",
            ref: "1 Corintios 12:7-11",
            explica: "En esa agrupación, los dones de poder son fe, sanidades y milagros, y los de expresión, profecía, lenguas e interpretación. Todas las manifestaciones las hace uno y el mismo Espíritu.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los dones y lo perfecto: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los cesacionistas creen que lo perfecto es la Biblia completa.", verdad: true, explica: "Así lo dice la lección: para los cesacionistas, lo perfecto es la Biblia completa, y ciertos dones terminaron con los apóstoles.", apoyo: "Los cesacionistas creen que lo perfecto es la Biblia completa" },
              { texto: "Los continuistas entienden que ciertos dones terminaron con los apóstoles.", verdad: false, explica: "Eso creen los cesacionistas. Los continuistas entienden que los dones siguen hasta la venida de Cristo.", apoyo: "Los continuistas, como la tradición pentecostal, entienden que lo perfecto llegará con la venida de Cristo, y que hasta entonces los dones siguen" },
              { texto: "El artículo 10 de la declaración de fe enseña que los dones siguen vigentes hoy.", verdad: true, explica: "Así lo enseña el artículo 10: contra el cesacionismo, los dones siguen vigentes hasta que venga lo perfecto.", apoyo: "El artículo 10 de la declaración de fe enseña que los dones siguen vigentes hoy" },
            ],
          },
          {
            consigna: "Sobre el continuismo y el cesacionismo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La tradición pentecostal es continuista.", verdad: true, explica: "Los continuistas, como la tradición pentecostal, entienden que los dones siguen hasta la venida de Cristo.", apoyo: "Los continuistas, como la tradición pentecostal" },
              { texto: "Para los continuistas, lo perfecto llegará con la venida de Cristo.", verdad: true, explica: "Los continuistas entienden que lo perfecto llegará con la venida de Cristo, y que hasta entonces los dones siguen.", apoyo: "entienden que lo perfecto llegará con la venida de Cristo" },
              { texto: "La declaración de fe enseña que los dones terminaron con los apóstoles.", verdad: false, explica: "Fue al revés: contra el cesacionismo, la declaración de fe enseña que los dones siguen vigentes.", apoyo: "Contra el cesacionismo, la declaración de fe enseña que los dones siguen vigentes hasta que venga lo perfecto, ejercidos con orden" },
              { texto: "Pablo dice que las profecías cesarán cuando muera el último apóstol.", verdad: false, explica: "Pablo dice que cesarán «cuando venga lo perfecto».", apoyo: "Pablo dice que las profecías y las lenguas cesarán «cuando venga lo perfecto»", ref: "1 Corintios 13:8-10" },
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
            consigna: "Completa lo que enseña la declaración de fe sobre los dones.",
            texto: "Contra el cesacionismo, la declaración de fe enseña que los dones siguen [[vigentes]] hasta que venga lo [[perfecto]], ejercidos con [[orden]].",
            distractores: ["dormidos", "difícil", "orgullo"],
            errores: {
              dormidos: "El artículo 10 enseña que los dones siguen vigentes hoy.",
              "difícil": "Los dones siguen hasta que venga lo perfecto.",
              orgullo: "Pablo pide que todo se haga decentemente y con orden.",
            },
            apoyo: "Contra el cesacionismo, la declaración de fe enseña que los dones siguen vigentes hasta que venga lo perfecto, ejercidos con orden",
            ref: "1 Corintios 14:39-40",
            explica: "El artículo 10 de la declaración de fe enseña que los dones siguen vigentes hoy, hasta que venga lo perfecto, y Pablo pide que todo se haga decentemente y con orden.",
          },
          {
            consigna: "Completa cómo entienden lo perfecto los cesacionistas y los continuistas.",
            texto: "Los cesacionistas creen que lo perfecto es la [[Biblia]] completa; los continuistas entienden que llegará con la [[venida]] de [[Cristo]].",
            distractores: ["iglesia", "muerte", "Pablo"],
            errores: {
              iglesia: "Los cesacionistas creen que lo perfecto es la Biblia completa.",
              muerte: "Los continuistas entienden que lo perfecto llegará con la venida de Cristo.",
              Pablo: "Lo perfecto llegará con la venida de Cristo, según los continuistas.",
            },
            apoyo: "Los cesacionistas creen que lo perfecto es la Biblia completa",
            ref: "1 Corintios 13:8-10",
            explica: "Los cesacionistas creen que lo perfecto es la Biblia completa y que ciertos dones terminaron con los apóstoles; los continuistas, como la tradición pentecostal, entienden que lo perfecto llegará con la venida de Cristo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué manda 1 Juan 4:1 hacer con los espíritus? Toca las palabras que lo dicen.",
            texto: "no creáis a todo espíritu, sino [[probad los espíritus]] si son de Dios",
            apoyo: "Toda manifestación se examina",
            ref: "1 Juan 4:1",
            explica: "Toda manifestación se examina: «no creáis a todo espíritu, sino probad los espíritus si son de Dios».",
          },
          {
            consigna: "Según 1 Juan 4:2, ¿qué confiesa el espíritu que es de Dios? Toca las palabras que lo dicen.",
            texto: "Todo espíritu que confiesa que [[Jesucristo ha venido en carne]], es de Dios",
            apoyo: "La primera prueba es Cristo",
            ref: "1 Juan 4:2",
            explica: "La primera prueba es Cristo: «Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Procurar los dones y probar los espíritus van juntos",
            ref: "1 Juan 4:1-3",
            situacion: "Eres líder de un grupo de oración de tu iglesia. En la reunión del martes, Carmen se pone de pie y dice que tiene una palabra de parte de Dios para el grupo.",
            escenas: [
              {
                id: "e1",
                narra: "Antes de que Carmen hable, un hermano te dice al oído: Esto es peligroso; mejor que nadie hable en el grupo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La dejas hablar con orden, y después examinan juntos lo que dijo.", valor: 2, explica: "Procurar los dones y probar los espíritus van juntos: «procurad profetizar», pero toda manifestación se examina.", siguiente: "e2" },
                  { texto: "La dejas hablar, y al terminar no dices nada, para no incomodar a nadie.", valor: 1, explica: "Dejarla hablar está bien, pero toda manifestación se examina.", siguiente: "e2" },
                  { texto: "Le pides que se siente: en el grupo no se permiten esas cosas.", valor: 0, explica: "Pablo dice «procurad profetizar»: los dones no se impiden; se ejercen con orden.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Carmen se sienta triste, y varios del grupo se quedan confundidos.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Les explicas que los dones se procuran, y que todo se hace con orden.", valor: 2, explica: "Pablo da el equilibrio: «procurad profetizar», pero hágase todo decentemente y con orden.", siguiente: "e2" },
                  { texto: "Les dices que esas manifestaciones ya terminaron, y que no esperen ninguna más.", valor: 0, explica: "El artículo 10 de la declaración de fe enseña que los dones siguen vigentes hoy.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Carmen anima al grupo a seguir a Jesucristo, que vino en carne, y a servirse unos a otros con amor.",
                pregunta: "¿Cómo lo examinas?",
                opciones: [
                  { texto: "Ves que confiesa a Cristo venido en carne y que es para provecho del grupo.", valor: 2, explica: "La primera prueba es Cristo, y las manifestaciones son dadas para provecho." },
                  { texto: "Lo aceptas sin examinarlo, porque Carmen es una hermana muy espiritual y conocida.", valor: 0, explica: "«no creáis a todo espíritu»: toda manifestación se examina." },
                  { texto: "Lo examinas solo por lo que sentiste mientras ella hablaba en la reunión.", valor: 0, explica: "La primera prueba es Cristo: «Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios»." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, un joven te pregunta: Si los dones siguen, ¿por qué hay que examinarlo todo?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que procurar los dones y probar los espíritus van juntos.", valor: 2, explica: "Así lo resume la lección: procurar los dones y probar los espíritus van juntos." },
                  { texto: "Que no hace falta examinar nada cuando el que habla es un líder de la iglesia.", valor: 0, explica: "Toda manifestación se examina: no creáis a todo espíritu." },
                  { texto: "Que examinar es solo para los que dudan de que los dones sigan vigentes.", valor: 0, explica: "La declaración de fe enseña que los dones siguen vigentes, y toda manifestación se examina." },
                ],
              },
            ],
          },
          {
            apoyo: "Toda manifestación se examina",
            ref: "1 Corintios 14:39-40",
            situacion: "Eres pastor asistente. El pastor te pide que prepares a los líderes de célula para cuando haya manifestaciones espirituales en sus reuniones.",
            escenas: [
              {
                id: "e1",
                narra: "Un líder te dice: Yo prefiero que en mi célula no haya profecías; así evito problemas.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Pablo dice procurad profetizar, pero que todo se haga con orden.", valor: 2, explica: "Pablo da el equilibrio: «procurad profetizar», pero «hágase todo decentemente y con orden»." },
                  { texto: "Que tiene razón: es más seguro impedir todas las manifestaciones en la célula.", valor: 0, explica: "Pablo dice «procurad profetizar»: los dones no se impiden; se ejercen con orden." },
                  { texto: "Que haga lo que le parezca mejor, porque la célula es suya.", valor: 1, explica: "Respetar su célula está bien, pero Pablo da el equilibrio: procurad profetizar, y hágase todo con orden." },
                ],
              },
              {
                id: "e2",
                narra: "Otra líder pregunta: ¿Cuál es la primera prueba para saber si una manifestación es de Dios?",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que confiese que Jesucristo ha venido en carne: la primera prueba es Cristo.", valor: 2, explica: "«Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios»." },
                  { texto: "Que el que habla grite fuerte, para que todos noten el poder de Dios en la reunión.", valor: 0, explica: "La primera prueba es Cristo, no la fuerza de la voz." },
                  { texto: "Que sea para provecho de todos, sin fijarse en lo que dice de Cristo.", valor: 1, explica: "Las manifestaciones son dadas para provecho, pero la primera prueba es Cristo." },
                ],
              },
              {
                id: "e3",
                narra: "Un líder joven pregunta: ¿Y si alguien dice que habla de parte de Dios, pero niega que Jesucristo vino en carne?",
                pregunta: "¿Qué le enseñas?",
                opciones: [
                  { texto: "Que no lo crea: hay que probar los espíritus, y la primera prueba es Cristo.", valor: 2, explica: "«no creáis a todo espíritu, sino probad los espíritus si son de Dios»: la primera prueba es Cristo." },
                  { texto: "Que lo acepte igual, porque cada manifestación es una experiencia muy personal.", valor: 0, explica: "Toda manifestación se examina: no creáis a todo espíritu." },
                  { texto: "Que lo deje pasar si la reunión estuvo bonita y nadie del grupo se molestó.", valor: 0, explica: "La primera prueba es Cristo, no cómo se sintió la reunión." },
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
            apoyo: "Los continuistas, como la tradición pentecostal, entienden que lo perfecto llegará con la venida de Cristo, y que hasta entonces los dones siguen",
            ref: "1 Corintios 13:8-10",
            clave: {
              id: "pr-n4-sistematica-2-6-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencian el cesacionismo y el continuismo al leer «cuando venga lo perfecto»?",
              ideas: [
                { id: "cesa", peso: 50, texto: "Los cesacionistas creen que lo perfecto es la Biblia completa y que ciertos dones terminaron con los apóstoles.", formas: ["cesacion* biblia", "cesacion* (escritura|escrituras)", "cesacion* apostoles", "cesacion* (terminaron|cesaron|acabaron|termino|ceso)", "cesacion* (creen|dicen|piensan|ensenan|entienden|afirman) perfecto (es|sea|era) biblia"] },
                { id: "continua", peso: 50, texto: "Los continuistas entienden que lo perfecto llegará con la venida de Cristo, y que hasta entonces los dones siguen.", formas: ["continuis* (venida|vuelva|venga|regrese|regreso)", "continuis* cristo", "continuis* (siguen|continuan|vigentes)", "continuis* (creen|dicen|piensan|ensenan|entienden|afirman) perfecto (llegara|vendra|es|sera) (venida|cristo)"] },
              ],
              modelo: "Los cesacionistas creen que lo perfecto es la Biblia completa, y que ciertos dones terminaron con los apóstoles. Los continuistas entienden que lo perfecto llegará con la venida de Cristo, y que hasta entonces los dones siguen.",
            },
          },
          {
            apoyo: "El artículo 10 de la declaración de fe enseña que los dones siguen vigentes hoy",
            ref: "1 Corintios 14:39-40",
            clave: {
              id: "pr-n4-sistematica-2-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña la declaración de fe sobre los dones hoy, y qué equilibrio da Pablo para ejercerlos?",
              ideas: [
                { id: "vigentes", peso: 50, texto: "Que el artículo 10 enseña que los dones siguen vigentes hoy, hasta que venga lo perfecto.", formas: ["vigent*", "siguen (hoy|hasta|activos|presentes)", "no han cesado", "no cesaron", "no terminaron", "hasta que venga lo perfecto"] },
                { id: "orden", peso: 50, texto: "Que Pablo da el equilibrio: procurad profetizar, pero hágase todo decentemente y con orden.", formas: ["con orden", "decentemente", "en orden", "ordenad*", "procurad profetizar", "procurar profetizar", "procurar los dones"] },
              ],
              modelo: "La declaración de fe enseña que los dones siguen vigentes hoy, hasta que venga lo perfecto. Y Pablo da el equilibrio: procurad profetizar, pero hágase todo decentemente y con orden.",
            },
          },
        ],
      },
    ],
  },
};
