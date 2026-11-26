/**
 * Las prácticas de «Panorama del Nuevo Testamento» (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-panorama-nt.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_PANORAMA_NT: PracticasMateria = {
  materia: "n2-panorama-nt",
  mision: {
    titulo: "El Nuevo Testamento de principio a fin",
    intro: "Un amigo que nunca leyó la Biblia te pide que le cuentes el Nuevo Testamento de principio a fin: cómo preparó Dios el mundo, quién es Jesús en los cuatro evangelios, cómo nació la iglesia, qué enseñan las cartas y cómo termina la historia. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes recorrer el Nuevo Testamento de principio a fin: el mundo que Dios preparó, los cuatro retratos de Jesús, la iglesia en marcha, las cartas de los apóstoles y la esperanza de su regreso.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El mundo del Nuevo Testamento y sus libros
    "n2-panorama-nt-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué idioma se escribió el Nuevo Testamento?", reverso: "En el griego común que extendió Alejandro Magno por el oriente.", apoyo: "el Nuevo Testamento se escribió en ese griego común" },
              { frente: "¿Qué es la versión de los Setenta?", reverso: "El Antiguo Testamento traducido al griego por los judíos en Egipto.", apoyo: "En Egipto, los judíos tradujeron el Antiguo Testamento al griego (la versión llamada de los Setenta)" },
              { frente: "¿Qué emperador gobernaba cuando nació Jesús?", reverso: "Augusto, el emperador de Roma.", apoyo: "Cuando nació Jesús, gobernaba el emperador Augusto" },
              { frente: "¿Cuántos libros tiene el Nuevo Testamento?", reverso: "27: los evangelios, Hechos, las cartas y Apocalipsis.", apoyo: "El Nuevo Testamento lo cuenta en 27 libros: los evangelios, Hechos, las cartas y Apocalipsis" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuánto tiempo pasó entre el último profeta y el nacimiento de Jesús?", reverso: "Unos cuatrocientos años, sin un nuevo libro de la Escritura.", apoyo: "pasaron unos cuatrocientos años sin un nuevo libro de la Escritura" },
              { frente: "¿Qué ayudó a que el evangelio viajara rápido de una ciudad a otra?", reverso: "Los caminos y la paz de Roma.", apoyo: "con sus caminos y su paz, el evangelio pudo viajar rápido de una ciudad a otra" },
              { frente: "¿Qué era el sanedrín?", reverso: "El concilio: el tribunal supremo de los judíos.", apoyo: "El concilio (el sanedrín) era el tribunal supremo de los judíos" },
              { frente: "¿Por qué se leen juntos los dos testamentos?", reverso: "Porque el Antiguo anuncia la llegada del Mesías y el Nuevo cuenta que vino.", apoyo: "El Antiguo Testamento anuncia y prepara la llegada del Mesías; el Nuevo cuenta que vino, murió, resucitó y volverá" },
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
            consigna: "Del fin del Antiguo Testamento al nacimiento de Jesús: ordena los hechos del primero al último.",
            eventos: [
              { texto: "Persia gobierna cuando termina el Antiguo Testamento", fecha: "Fin del Antiguo Testamento" },
              { texto: "Alejandro Magno conquista el oriente y extiende el griego", fecha: "Después de Persia" },
              { texto: "Roma domina todo el Mediterráneo", fecha: "El imperio romano" },
              { texto: "Jesús nace cuando gobierna el emperador Augusto", fecha: "Unos 400 años tras Malaquías" },
            ],
            apoyo: "Persia gobernaba cuando terminó el Antiguo Testamento",
            ref: "Lucas 2:1",
            explica: "Persia gobernaba al terminar el Antiguo Testamento; después, Alejandro Magno extendió el griego y Roma dominó el Mediterráneo. Cuando nació Jesús, gobernaba Augusto.",
          },
          {
            consigna: "¿Cómo preparó Dios el mundo para la llegada de su Hijo? Ordena los hechos del primero al último.",
            eventos: [
              { texto: "Termina el Antiguo Testamento mientras gobierna Persia", fecha: "Tiempo de Malaquías" },
              { texto: "El idioma griego se extiende por el oriente", fecha: "Con Alejandro Magno" },
              { texto: "Roma abre sus caminos por todo el Mediterráneo", fecha: "El imperio romano" },
              { texto: "Nace Jesús, en tiempos del emperador Augusto", fecha: "El cumplimiento del tiempo" },
              { texto: "Pablo enseña en las sinagogas", fecha: "Después de Jesús" },
            ],
            apoyo: "Dios estaba preparando el mundo para la llegada de su Hijo",
            ref: "Gálatas 4:4",
            explica: "Después del Antiguo Testamento, Alejandro extendió el griego y Roma abrió sus caminos. Jesús nació en tiempos de Augusto, y después Pablo enseñó en las sinagogas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que Dios preparó antes de enviar a su Hijo.",
            texto: "Dios envió a su Hijo cuando vino el [[cumplimiento]] del tiempo. Había un idioma [[común]], caminos [[seguros]] y un pueblo que esperaba al [[Mesías]].",
            distractores: ["comienzo", "extraño", "cerrados", "emperador"],
            errores: {
              comienzo: "No era un comienzo cualquiera: era el momento que Dios había preparado, el cumplimiento del tiempo.",
              emperador: "El pueblo esperaba al Mesías, no a un emperador: en Roma ya gobernaba Augusto.",
            },
            apoyo: "Un idioma común, caminos seguros, sinagogas en muchas ciudades y un pueblo que esperaba al Mesías",
            ref: "Gálatas 4:4",
            explica: "Dios preparó todo antes de enviar a su Hijo: un idioma común, caminos seguros, sinagogas y un pueblo que esperaba al Mesías.",
          },
          {
            consigna: "Completa lo que Dios preparó para que la buena noticia viajara.",
            texto: "Pablo dice que Dios envió a su Hijo cuando vino el [[cumplimiento]] del tiempo. Había [[sinagogas]] en muchas ciudades, y por los [[caminos]] de Roma el evangelio pudo viajar rápido.",
            distractores: ["final", "cárceles", "muros"],
            errores: {
              final: "No habla del final de la historia: habla del momento que Dios había preparado para enviar a su Hijo.",
            },
            apoyo: "con sus caminos y su paz, el evangelio pudo viajar rápido de una ciudad a otra",
            ref: "Gálatas 4:4",
            explica: "Cuando vino el cumplimiento del tiempo, todo estaba listo: sinagogas en muchas ciudades y los caminos de Roma para que el evangelio viajara.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada grupo con lo que la lección dice de él.",
            pares: [
              ["Los fariseos", "Maestros muy estrictos con la ley y las tradiciones de los ancianos"],
              ["Los saduceos", "Del grupo sacerdotal; no creían en la resurrección"],
              ["Los escribas", "Copiaban y enseñaban la ley"],
              ["El sanedrín", "El tribunal supremo de los judíos"],
            ],
            apoyo: "Los fariseos eran maestros muy estrictos con la ley y con las tradiciones de los ancianos",
            ref: "Mateo 22:23; 23:27-28",
            explica: "Los fariseos eran estrictos con la ley y las tradiciones; los saduceos, del grupo sacerdotal, no creían en la resurrección; los escribas copiaban y enseñaban la ley, y el sanedrín era el tribunal supremo.",
          },
          {
            consigna: "Une cada nombre con lo que le corresponde.",
            pares: [
              ["Los fariseos", "Jesús denunció su hipocresía"],
              ["Los saduceos", "No creían en la resurrección"],
              ["La sinagoga", "Allí se reunían cada sábado a leer las Escrituras y orar"],
              ["El concilio", "El tribunal supremo de los judíos"],
            ],
            apoyo: "Los saduceos eran del grupo sacerdotal; no creían en la resurrección",
            ref: "Mateo 22:23; 23:27-28; Lucas 4:16",
            explica: "Jesús denunció la hipocresía de los fariseos; los saduceos no creían en la resurrección; en la sinagoga se leían las Escrituras cada sábado, y el concilio era el tribunal supremo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 3,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un evangelio o una carta general? Lleva cada libro a su grupo.",
            grupos: ["Un evangelio", "Una carta general"],
            frases: [
              { texto: "Mateo", grupo: 0 },
              { texto: "Marcos", grupo: 0 },
              { texto: "Juan", grupo: 0, explica: "Juan es el cuarto evangelio; 1, 2 y 3 Juan son cartas generales." },
              { texto: "Hebreos", grupo: 1, explica: "Hebreos es una carta general: no dice quién la escribió." },
              { texto: "Santiago", grupo: 1 },
              { texto: "1 Juan", grupo: 1, explica: "1 Juan es una carta general, distinta del evangelio de Juan." },
              { texto: "Judas", grupo: 1 },
            ],
            apoyo: "Los evangelios (4): Mateo, Marcos, Lucas y Juan",
            explica: "Los cuatro evangelios son Mateo, Marcos, Lucas y Juan. Las ocho cartas generales van de Hebreos a Judas, y entre ellas están 1, 2 y 3 Juan.",
          },
          {
            consigna: "¿Qué clase de libro es? Lleva cada libro a su grupo.",
            grupos: ["Una carta de Pablo", "Una carta general", "Historia o profecía"],
            frases: [
              { texto: "Romanos", grupo: 0 },
              { texto: "Filemón", grupo: 0 },
              { texto: "2 Pedro", grupo: 1 },
              { texto: "3 Juan", grupo: 1 },
              { texto: "Judas", grupo: 1 },
              { texto: "Hebreos", grupo: 1, explica: "Hebreos es una carta general: no dice quién la escribió." },
              { texto: "Hechos", grupo: 2, explica: "Hechos es la historia: cuenta cómo nació la iglesia." },
              { texto: "Apocalipsis", grupo: 2, explica: "Apocalipsis es la profecía: la revelación de Jesucristo." },
            ],
            apoyo: "Las cartas generales (8): Hebreos, Santiago, 1 y 2 Pedro, 1, 2 y 3 Juan y Judas",
            explica: "Las trece cartas de Pablo van de Romanos a Filemón y las ocho generales, de Hebreos a Judas. Hechos es la historia y Apocalipsis, la profecía.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un compañero de trabajo te dice: Si Dios no dio un libro nuevo en cuatrocientos años, seguro se olvidó de su pueblo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Es cierto: en esos años Dios se olvidó de su pueblo y no hizo nada.", explica: "No fueron años vacíos: Dios estaba preparando el mundo para la llegada de su Hijo." },
              { texto: "No fueron años vacíos: Dios preparaba el mundo para enviar a su Hijo.", bien: true, explica: "Así lo dice la lección: Dios preparó un idioma común, caminos y un pueblo que esperaba al Mesías." },
              { texto: "Nadie sabe qué pasó en esos años, así que mejor no hablar de eso.", explica: "La lección sí lo cuenta: en esos años el mundo cambió y Dios lo estaba preparando." },
              { texto: "Dios solo obra cuando da un libro nuevo; el resto del tiempo se queda quieto.", explica: "Aunque no hubo un nuevo libro de la Escritura, Dios estaba preparando la llegada de su Hijo." },
            ],
            apoyo: "Pero no fueron años vacíos: Dios estaba preparando el mundo para la llegada de su Hijo.",
            ref: "Gálatas 4:4",
            explica: "Entre los testamentos no hubo un nuevo libro, pero Dios preparó el mundo; cuando vino el cumplimiento del tiempo, envió a su Hijo.",
          },
          {
            caso: "Tu hermana te escribe: ¿Por qué Jesús no vino antes? Parece que llegó tarde.",
            pregunta: "¿Qué le contestas?",
            opciones: [
              { texto: "Vino en el momento justo: Dios había preparado todo para el evangelio.", bien: true, explica: "Gálatas 4:4 dice que Dios envió a su Hijo cuando vino el cumplimiento del tiempo." },
              { texto: "Sí llegó tarde: muchos murieron esperando y Dios no pudo hacer nada.", explica: "Nada se le salió de las manos a Dios: envió a su Hijo en el cumplimiento del tiempo." },
              { texto: "Vino cuando Roma lo permitió, porque el emperador era quien mandaba en todo.", explica: "Roma dominaba el Mediterráneo, pero fue Dios quien envió a su Hijo cuando vino el cumplimiento del tiempo." },
              { texto: "No importa cuándo vino: lo que pasó antes de Jesús no tiene nada que ver.", explica: "Sí importa: Dios preparó un idioma común, caminos seguros y un pueblo que esperaba al Mesías." },
            ],
            apoyo: "Dios había preparado todo para que la buena noticia llegara a las naciones",
            ref: "Gálatas 4:4",
            explica: "Jesús vino en el cumplimiento del tiempo: con un idioma común, caminos seguros, sinagogas y un pueblo que esperaba al Mesías, la buena noticia podía llegar a las naciones.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús vino en el cumplimiento del tiempo",
            ref: "Gálatas 4:4",
            clave: {
              id: "pr-n2-panorama-nt-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué se dice que Jesús vino en el cumplimiento del tiempo?",
              ideas: [
                { id: "prepara", peso: 50, texto: "Dios había preparado el mundo antes de enviar a su Hijo.", formas: ["dios prepar*", "prepar* (el|al|todo) mundo", "habia preparado", "preparo todo", "estaba preparando", "momento (justo|preciso|exacto)"] },
                { id: "como", peso: 50, texto: "Había un idioma común, caminos seguros, sinagogas y un pueblo que esperaba al Mesías.", formas: ["idioma comun", "griego", "caminos", "sinagogas", "esperaba al mesias", "pueblo que esperaba", "paz de roma"] },
              ],
              modelo: "Porque Dios había preparado el mundo antes de enviar a su Hijo: había un idioma común, caminos seguros, sinagogas en muchas ciudades y un pueblo que esperaba al Mesías.",
            },
          },
          {
            apoyo: "Dios prepara el camino antes de que lo veamos.",
            ref: "Gálatas 4:4",
            clave: {
              id: "pr-n2-panorama-nt-1-a7-2",
              tipo: "corta",
              pregunta: "¿Para qué preparó Dios el mundo antes de enviar a Jesús, y cómo lo hizo?",
              ideas: [
                { id: "naciones", peso: 50, texto: "Para que la buena noticia llegara a las naciones.", formas: ["a las naciones", "a todas las naciones", "a todo el mundo", "buena noticia lleg*", "evangelio lleg*", "evangelio viaj*", "se extendiera"] },
                { id: "como", peso: 50, texto: "Con un idioma común, los caminos de Roma, las sinagogas y un pueblo que esperaba al Mesías.", formas: ["idioma comun", "griego", "caminos", "sinagogas", "esperaba al mesias", "pueblo que esperaba"] },
              ],
              modelo: "Dios preparó un idioma común, los caminos de Roma, sinagogas en muchas ciudades y un pueblo que esperaba al Mesías, para que la buena noticia llegara a las naciones.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Los cuatro evangelios
    "n2-panorama-nt-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué hay cuatro evangelios y no uno solo?", reverso: "Porque cuatro testigos nos dan cuatro retratos del mismo Jesús.", apoyo: "cuatro testigos, guiados por el Espíritu Santo, nos dan cuatro retratos del mismo Jesús" },
              { frente: "¿Para qué lectores escribió Mateo, sobre todo?", reverso: "Para lectores judíos: les muestra cómo se cumplieron en Jesús las Escrituras.", apoyo: "escribió sobre todo para lectores judíos" },
              { frente: "¿Cuál es el evangelio más corto?", reverso: "Marcos, que escribe con prisa y con acción.", apoyo: "Es el evangelio más corto." },
              { frente: "¿Quién era Lucas?", reverso: "El médico compañero de Pablo, que investigó todo con cuidado.", apoyo: "Lucas, el médico compañero de Pablo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué significa la palabra sinópticos?", reverso: "Que se pueden ver juntos.", apoyo: "la palabra significa que se pueden ver juntos" },
              { frente: "¿Con qué empieza el evangelio de Juan?", reverso: "Con el Verbo eterno que se hizo carne.", apoyo: "empieza con el Verbo eterno que se hizo carne" },
              { frente: "¿Para quién escribió Lucas por orden?", reverso: "Para Teófilo, después de investigar todo con cuidado.", apoyo: "investigó todo con cuidado y escribió por orden para Teófilo" },
              { frente: "¿Qué historia aparece en los cuatro evangelios?", reverso: "La alimentación de los cinco mil.", apoyo: "la alimentación de los cinco mil está en los cuatro" },
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
            consigna: "Une cada evangelio con la forma en que presenta a Jesús.",
            pares: [
              ["Mateo", "El Rey prometido, el hijo de David"],
              ["Marcos", "El siervo que vino a dar su vida en rescate por muchos"],
              ["Lucas", "El Salvador de todos, que busca a los perdidos"],
              ["Juan", "El Hijo de Dios, el Verbo eterno que se hizo carne"],
            ],
            apoyo: "el Rey (Mateo), el Siervo (Marcos), el Salvador de todos (Lucas) y el Hijo de Dios (Juan)",
            ref: "Mateo 1:1; Marcos 10:45; Lucas 19:10; Juan 20:31",
            explica: "Son cuatro retratos del mismo Jesús: Mateo lo muestra como Rey, Marcos como Siervo, Lucas como Salvador de todos y Juan como Hijo de Dios.",
          },
          {
            consigna: "Une cada evangelio con lo que la lección dice de quien lo escribió o de su estilo.",
            pares: [
              ["Mateo", "El cobrador de impuestos que siguió a Jesús"],
              ["Marcos", "Escribe con prisa y con acción; es el más corto"],
              ["Lucas", "El médico que investigó todo y escribió para Teófilo"],
              ["Juan", "El discípulo amado, que empieza con el Verbo eterno"],
            ],
            apoyo: "Mateo, el cobrador de impuestos que siguió a Jesús",
            ref: "Mateo 9:9; Colosenses 4:14; Lucas 1:1-4",
            explica: "Mateo había sido cobrador de impuestos; Marcos es el más corto y rápido; Lucas, el médico, investigó con cuidado, y Juan, el discípulo amado, empieza con el Verbo eterno.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los evangelios está equivocada. Tócala.",
            frases: [
              "Mateo muestra cómo se cumplieron en Jesús las Escrituras.",
              "Marcos es el evangelio más largo y el más lento.",
              "Lucas muestra a Jesús como el Salvador que busca a los perdidos.",
              "Juan presenta a Jesús como el Hijo de Dios.",
            ],
            malo: 1,
            correccion: "Marcos es el evangelio más corto: escribe con prisa y con acción.",
            apoyo: "Marcos escribe con prisa y con acción",
            ref: "Marcos 10:45",
            explica: "Marcos es el más corto: cuenta todo con prisa y con acción, y presenta a Jesús como el siervo.",
          },
          {
            consigna: "Una de estas frases sobre los evangelios y quienes los escribieron está equivocada. Tócala.",
            frases: [
              "Mateo escribió sobre todo para lectores judíos.",
              "Lucas fue el cobrador de impuestos que siguió a Jesús.",
              "Juan es el discípulo amado.",
              "Marcos presenta a Jesús como el siervo que vino a dar su vida.",
            ],
            malo: 1,
            correccion: "El cobrador de impuestos que siguió a Jesús fue Mateo; Lucas era médico.",
            apoyo: "Lucas, el médico compañero de Pablo",
            ref: "Mateo 9:9; Colosenses 4:14",
            explica: "Mateo era el cobrador de impuestos; Lucas, el médico compañero de Pablo, investigó todo con cuidado.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es propio de los sinópticos o del evangelio de Juan? Lleva cada frase a su grupo.",
            grupos: ["Los sinópticos", "El evangelio de Juan"],
            frases: [
              { texto: "Mateo, Marcos y Lucas", grupo: 0 },
              { texto: "Muchas de las mismas escenas", grupo: 0 },
              { texto: "Escenas en un orden parecido", grupo: 0 },
              { texto: "Relatos que se leen uno al lado del otro", grupo: 0 },
              { texto: "Largos discursos, sobre todo en Jerusalén", grupo: 1 },
              { texto: "Las grandes palabras «Yo soy»", grupo: 1 },
              { texto: "El Verbo eterno que se hizo carne", grupo: 1, explica: "Así empieza el evangelio de Juan." },
            ],
            apoyo: "se pueden leer uno al lado del otro",
            ref: "Juan 8:12",
            explica: "Mateo, Marcos y Lucas se llaman sinópticos porque cuentan muchas escenas iguales en un orden parecido. Juan cuenta otras señales y largos discursos de Jesús.",
          },
          {
            consigna: "¿Es la razón de que se llamen sinópticos o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Por eso se llaman sinópticos", "No es la razón del nombre"],
            frases: [
              { texto: "Cuentan muchas de las mismas escenas", grupo: 0 },
              { texto: "Siguen un orden parecido", grupo: 0 },
              { texto: "Se pueden leer uno al lado del otro", grupo: 0 },
              { texto: "Son los evangelios más cortos", grupo: 1, explica: "El más corto es Marcos; sinóptico quiere decir que se pueden ver juntos." },
              { texto: "Cuentan largos discursos en Jerusalén", grupo: 1, explica: "Eso es lo propio de Juan." },
              { texto: "Empiezan con el Verbo eterno", grupo: 1, explica: "Así empieza Juan, que no es sinóptico." },
              { texto: "Los escribió una misma persona", grupo: 1, explica: "Son tres evangelios distintos: Mateo, Marcos y Lucas." },
            ],
            apoyo: "Mateo, Marcos y Lucas se llaman sinópticos (la palabra significa que se pueden ver juntos)",
            explica: "Sinóptico significa que se pueden ver juntos: Mateo, Marcos y Lucas cuentan muchas de las mismas escenas en un orden parecido.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un amigo de la universidad te dice: Los evangelios son biografías antiguas, como cualquier libro de historia.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: son biografías, y se leen como cualquier libro viejo.", explica: "Los evangelios no son solo biografías: son testimonios para llevarnos a la fe." },
              { texto: "Cuentan la vida de Jesús, pero son testimonios para llevarnos a la fe.", bien: true, explica: "Juan dice que escribió para que creamos que Jesús es el Cristo y tengamos vida." },
              { texto: "No cuentan nada que haya pasado; son solo enseñanzas para portarse bien.", explica: "Los evangelios son el testimonio de testigos: cuentan la vida, la muerte y la resurrección de Jesús." },
              { texto: "Son libros solo para los pastores; a ti no te hace falta leerlos.", explica: "Juan escribió para que, creyendo, tengamos vida: son para todos." },
            ],
            apoyo: "Los evangelios no son solo biografías: son testimonios para llevarnos a la fe.",
            ref: "Juan 20:31",
            explica: "Juan escribió para que creamos que Jesús es el Cristo, el Hijo de Dios, y para que creyendo tengamos vida en su nombre.",
          },
          {
            caso: "Tu vecina te pregunta: ¿Para qué escribió Juan su evangelio, si ya había otros tres?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Para que creamos que Jesús es el Hijo de Dios y tengamos vida.", bien: true, explica: "Lo dice Juan 20:31: escribió para que creamos y, creyendo, tengamos vida en su nombre." },
              { texto: "Para corregir los errores que tenían los otros tres evangelios.", explica: "Los cuatro son testimonios inspirados del mismo Jesús: cada uno da su retrato." },
              { texto: "Para contar la historia de los reyes y los profetas de Israel.", explica: "Juan escribió sobre Jesús, para que creamos que es el Cristo, el Hijo de Dios." },
              { texto: "Para tener un libro más de historia antigua en la biblioteca.", explica: "Los evangelios no son solo biografías: son testimonios para llevarnos a la fe." },
            ],
            apoyo: "Juan dice para qué escribió: para que creamos que Jesús es el Cristo, el Hijo de Dios, y para que creyendo tengamos vida en su nombre.",
            ref: "Juan 20:31",
            explica: "Cada evangelio da su retrato de Jesús. Juan escribió para que creamos que Jesús es el Cristo, el Hijo de Dios, y tengamos vida en su nombre.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "escritos para que creamos y tengamos vida",
            ref: "Juan 20:31",
            clave: {
              id: "pr-n2-panorama-nt-2-a6-1",
              tipo: "corta",
              pregunta: "¿Con qué propósito escribió Juan su evangelio?",
              ideas: [
                { id: "creer", peso: 50, texto: "Para que creamos que Jesús es el Cristo, el Hijo de Dios.", formas: ["creamos", "creer", "crean", "creyeramos", "fe en jesus", "hijo de dios", "es el cristo"] },
                { id: "vida", peso: 50, texto: "Para que, creyendo, tengamos vida en su nombre.", formas: ["tengamos vida", "tener vida", "tengan vida", "vida en su nombre", "vida eterna"] },
              ],
              modelo: "Juan escribió para que creamos que Jesús es el Cristo, el Hijo de Dios, y para que, creyendo en Él, tengamos vida en su nombre.",
            },
          },
          {
            apoyo: "Los evangelios no son solo biografías: son testimonios para llevarnos a la fe.",
            ref: "Juan 20:31",
            clave: {
              id: "pr-n2-panorama-nt-2-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué decimos que los evangelios no son solo biografías?",
              ideas: [
                { id: "testimonio", peso: 50, texto: "Son testimonios escritos para llevarnos a la fe.", formas: ["testimonio*", "testigos", "llevar* a la fe", "a la fe", "para que creamos", "para creer"] },
                { id: "vida", peso: 50, texto: "Quieren que creamos que Jesús es el Hijo de Dios y tengamos vida.", formas: ["tengamos vida", "tener vida", "vida en su nombre", "vida eterna", "hijo de dios", "es el cristo"] },
              ],
              modelo: "Porque son testimonios escritos para llevarnos a la fe: nos muestran quién es Jesús para que creamos que es el Cristo, el Hijo de Dios, y tengamos vida en su nombre.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. La vida y la obra de Jesús
    "n2-panorama-nt-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde nació Jesús y dónde creció?", reverso: "Nació en Belén y creció en Nazaret.", apoyo: "Jesús nació en Belén, como habían anunciado los profetas, de la virgen María, y creció en Nazaret" },
              { frente: "¿Qué pasó cuando Juan bautizó a Jesús en el Jordán?", reverso: "El Espíritu descendió sobre Él y el Padre habló desde el cielo.", apoyo: "el Espíritu descendió sobre Él y el Padre habló desde el cielo" },
              { frente: "¿Cómo venció Jesús la tentación en el desierto?", reverso: "Respondiendo con las Escrituras.", apoyo: "fue tentado en el desierto y venció respondiendo con las Escrituras" },
              { frente: "¿Para qué llamó Jesús a doce discípulos?", reverso: "Para que estuvieran con Él y después lo anunciaran.", apoyo: "llamó a doce discípulos para que estuvieran con Él y después lo anunciaran" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuánto duró el ministerio de Jesús?", reverso: "Unos tres años, sobre todo en Galilea.", apoyo: "Durante unos tres años (Juan menciona varias Pascuas en ese tiempo), sobre todo en Galilea" },
              { frente: "¿Qué mostraban las obras y las palabras de Jesús?", reverso: "Sus obras, quién era; sus palabras, cómo es Dios.", apoyo: "Sus obras mostraban quién era, y sus palabras, cómo es Dios." },
              { frente: "¿Cuánto tiempo se apareció Jesús resucitado?", reverso: "Cuarenta días: se apareció a muchos.", apoyo: "Se apareció a muchos durante cuarenta días" },
              { frente: "¿Qué dijeron los ángeles cuando Jesús subió al cielo?", reverso: "Que así como lo vieron ir al cielo, así vendrá.", apoyo: "Los ángeles dijeron que así como lo vieron ir al cielo, así vendrá." },
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
            consigna: "De Belén a Galilea: ordena las etapas de la vida de Jesús, de la primera a la última.",
            eventos: [
              { texto: "Nace en Belén, de la virgen María", fecha: "Comienzo de su vida escondida" },
              { texto: "Crece en Nazaret", fecha: "Unos treinta años" },
              { texto: "Es bautizado por Juan en el Jordán", fecha: "Cerca de los treinta años" },
              { texto: "Es tentado en el desierto y vence con las Escrituras", fecha: "Después del bautismo" },
              { texto: "Anuncia el reino de Dios y llama a doce discípulos", fecha: "Unos tres años de ministerio" },
            ],
            apoyo: "Pero antes hubo unos treinta años de vida escondida y unos tres años de ministerio que cambiaron la historia.",
            ref: "Mateo 3:16-17; 4:1-11",
            explica: "Jesús nació en Belén y creció en Nazaret; cerca de los treinta años fue bautizado y después tentado, y durante unos tres años anunció el reino de Dios.",
          },
          {
            consigna: "De la última semana a la ascensión: ordena los hechos del primero al último.",
            eventos: [
              { texto: "Celebra la Pascua con sus discípulos en Jerusalén", fecha: "Su última semana" },
              { texto: "Muere por nuestros pecados y es sepultado", fecha: "Después de la Pascua" },
              { texto: "Resucita, conforme a las Escrituras", fecha: "Al tercer día" },
              { texto: "Se aparece a muchos", fecha: "Durante cuarenta días" },
              { texto: "Sube al cielo", fecha: "Después de aparecerse" },
            ],
            apoyo: "Murió por nuestros pecados, fue sepultado y resucitó al tercer día, conforme a las Escrituras.",
            ref: "1 Corintios 15:3-4; Hechos 1:3",
            explica: "Después de la Pascua, Jesús murió por nuestros pecados y fue sepultado; resucitó al tercer día, se apareció a muchos durante cuarenta días y subió al cielo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa el centro de la buena noticia.",
            texto: "Jesús murió por nuestros [[pecados]], fue [[sepultado]] y resucitó al [[tercer]] día, conforme a las [[Escrituras]].",
            distractores: ["enemigos", "olvidado", "séptimo", "tradiciones"],
            errores: {
              tradiciones: "Todo pasó conforme a las Escrituras, no a las tradiciones.",
              séptimo: "Jesús resucitó al tercer día.",
            },
            apoyo: "su muerte y su resurrección son el corazón de la buena noticia",
            ref: "1 Corintios 15:3-4",
            explica: "Este es el corazón de la buena noticia: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día, conforme a las Escrituras.",
          },
          {
            consigna: "Completa lo que muestra la resurrección.",
            texto: "La resurrección muestra que el [[sacrificio]] de Jesús fue [[aceptado]] y que la [[muerte]] fue vencida.",
            distractores: ["templo", "rechazado", "ley"],
            errores: {
              rechazado: "Al revés: la resurrección muestra que el sacrificio de Jesús fue aceptado.",
            },
            apoyo: "La resurrección muestra que su sacrificio fue aceptado y que la muerte fue vencida.",
            ref: "1 Corintios 15:3-4",
            explica: "La resurrección lo cambia todo: muestra que el sacrificio de Jesús fue aceptado y que la muerte fue vencida.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la muerte y la resurrección de Jesús: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús murió por nuestros pecados, conforme a las Escrituras.", verdad: true, explica: "Así lo resume 1 Corintios 15:3-4: es el centro de la buena noticia.", apoyo: "Murió por nuestros pecados, fue sepultado y resucitó al tercer día, conforme a las Escrituras.", ref: "1 Corintios 15:3-4" },
              { texto: "Jesús resucitado se apareció un solo día y después subió al cielo.", verdad: false, explica: "Se apareció a muchos durante cuarenta días.", apoyo: "Se apareció a muchos durante cuarenta días", ref: "Hechos 1:3" },
              { texto: "Los evangelios cuentan muy poco de la última semana de Jesús.", verdad: false, explica: "Le dedican mucho espacio, porque su muerte y su resurrección son el corazón de la buena noticia.", apoyo: "Los evangelios dedican mucho espacio a la última semana de Jesús." },
            ],
          },
          {
            consigna: "Sobre la muerte y la resurrección de Jesús: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La resurrección muestra que el sacrificio de Jesús fue aceptado.", verdad: true, explica: "Y muestra también que la muerte fue vencida.", apoyo: "La resurrección muestra que su sacrificio fue aceptado y que la muerte fue vencida.", ref: "1 Corintios 15:3-4" },
              { texto: "Después de morir, Jesús quedó en la tumba para siempre.", verdad: false, explica: "Fue sepultado y resucitó al tercer día, conforme a las Escrituras.", apoyo: "fue sepultado y resucitó al tercer día", ref: "1 Corintios 15:4" },
              { texto: "La muerte y la resurrección de Jesús son el corazón de la buena noticia.", verdad: true, explica: "Por eso los evangelios dedican tanto espacio a su última semana.", apoyo: "su muerte y su resurrección son el corazón de la buena noticia" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué hizo Jesús antes de subir al cielo? Elige cómo se une cada idea.",
            nodos: [
              { id: "j", texto: "Jesús, antes de subir al cielo", x: 50, y: 15 },
              { id: "e", texto: "El poder del Espíritu Santo", x: 20, y: 80 },
              { id: "d", texto: "Sus discípulos", x: 80, y: 80 },
            ],
            enlaces: [
              { de: "j", a: "e", relacion: "prometió" },
              { de: "j", a: "d", relacion: "envió como testigos a" },
            ],
            distractores: ["dejó solos a"],
            apoyo: "Antes de subir al cielo, Jesús prometió el poder del Espíritu Santo y envió a sus discípulos a ser sus testigos.",
            ref: "Hechos 1:8-11",
            explica: "Jesús no dejó solos a los suyos: antes de subir al cielo prometió el poder del Espíritu Santo y envió a sus discípulos a ser sus testigos.",
          },
          {
            consigna: "¿Cómo sigue la historia después de la ascensión? Elige cómo se une cada idea.",
            nodos: [
              { id: "a", texto: "Los ángeles", x: 20, y: 15 },
              { id: "r", texto: "El regreso de Jesús", x: 80, y: 15 },
              { id: "m", texto: "La misión de ser sus testigos", x: 20, y: 85 },
              { id: "i", texto: "La iglesia", x: 80, y: 85 },
            ],
            enlaces: [
              { de: "a", a: "r", relacion: "anunciaron" },
              { de: "m", a: "i", relacion: "continúa con" },
            ],
            distractores: ["terminó con", "negaron"],
            apoyo: "Los ángeles dijeron que así como lo vieron ir al cielo, así vendrá.",
            ref: "Hechos 1:8-11",
            explica: "Jesús subió al cielo y volverá, como anunciaron los ángeles; mientras tanto, la misión de ser sus testigos continúa con la iglesia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu iglesia te dice: Jesús ya se fue al cielo; ahora solo nos queda esperar sentados a que vuelva.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: Él se fue y ya no nos dejó nada que hacer aquí.", explica: "Antes de subir, Jesús envió a sus discípulos a ser sus testigos: la misión continúa." },
              { texto: "Volverá, sí, y mientras tanto nos envió a ser sus testigos.", bien: true, explica: "Jesús prometió el poder del Espíritu Santo y nos dejó la misión de ser sus testigos." },
              { texto: "No va a volver: lo de su regreso es solo una forma de hablar.", explica: "Los ángeles dijeron que así como lo vieron ir al cielo, así vendrá." },
              { texto: "Ser sus testigos les tocaba solo a los apóstoles, no a nosotros.", explica: "Jesús nos dejó la misión de ser sus testigos: la misión continúa." },
            ],
            apoyo: "nos dejó la misión de ser sus testigos",
            ref: "Hechos 1:8-11",
            explica: "La ascensión no deja a la iglesia sin tarea: Jesús prometió el poder del Espíritu Santo y nos dejó la misión de ser sus testigos.",
          },
          {
            caso: "Una compañera de trabajo te pregunta: Si Jesús resucitó, ¿dónde está ahora y qué tiene que ver eso conmigo?",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Subió al cielo, volverá, y nos dejó la tarea de ser sus testigos.", bien: true, explica: "Así lo dice la lección: subió al cielo, desde donde volverá, y nos dejó la misión de ser sus testigos." },
              { texto: "Nadie sabe dónde está; a lo mejor sigue escondido en algún lugar.", explica: "Sus discípulos lo vieron ir al cielo, y los ángeles dijeron que así vendrá." },
              { texto: "Está en el cielo, pero eso no cambia nada en tu vida de cada día.", explica: "La resurrección lo cambia todo, y Jesús nos dejó la misión de ser sus testigos." },
              { texto: "Volvió a vivir como antes en Nazaret, con su familia y sus amigos.", explica: "Jesús resucitó, se apareció a muchos durante cuarenta días y subió al cielo." },
            ],
            apoyo: "subió al cielo, desde donde volverá; nos dejó la misión de ser sus testigos",
            ref: "Hechos 1:8-11",
            explica: "Jesús resucitado subió al cielo y volverá. Antes de irse prometió el Espíritu Santo y envió a los suyos a ser sus testigos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La resurrección muestra que su sacrificio fue aceptado y que la muerte fue vencida.",
            ref: "1 Corintios 15:3-4",
            clave: {
              id: "pr-n2-panorama-nt-3-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la muerte y la resurrección de Jesús son el centro del evangelio?",
              ideas: [
                { id: "murio", peso: 50, texto: "Jesús murió por nuestros pecados.", formas: ["murio por nuestros pecados", "por nuestros pecados", "por (mis|los) pecados", "murio por (nosotros|mi)", "en nuestro lugar"] },
                { id: "resucito", peso: 50, texto: "Resucitó: su sacrificio fue aceptado y la muerte fue vencida.", formas: ["resucit*", "tercer dia", "venci* (la|a) muerte", "muerte (fue|quedo) vencida", "fue aceptado", "acept* (su|el) sacrificio"] },
              ],
              modelo: "Porque Jesús murió por nuestros pecados y resucitó al tercer día, conforme a las Escrituras. Su resurrección muestra que el sacrificio fue aceptado y que la muerte fue vencida.",
            },
          },
          {
            apoyo: "La resurrección lo cambia todo.",
            ref: "1 Corintios 15:3-4",
            clave: {
              id: "pr-n2-panorama-nt-3-a7-2",
              tipo: "corta",
              pregunta: "Resume con tus palabras lo que dice 1 Corintios 15:3-4 sobre Jesús.",
              ideas: [
                { id: "murio", peso: 40, texto: "Murió por nuestros pecados.", formas: ["murio por", "por nuestros pecados", "por (mis|los) pecados", "en nuestro lugar"] },
                { id: "sepultado", peso: 20, texto: "Fue sepultado.", formas: ["sepult*", "enterr*", "tumba"] },
                { id: "resucito", peso: 40, texto: "Resucitó al tercer día, conforme a las Escrituras.", formas: ["resucit*", "tercer dia", "volvio a la vida", "se levanto"] },
              ],
              modelo: "Jesús murió por nuestros pecados, fue sepultado y resucitó al tercer día, tal como lo anunciaban las Escrituras. Ese es el corazón de la buena noticia.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Hechos: la iglesia en marcha
    "n2-panorama-nt-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dos libros escribió Lucas?", reverso: "El evangelio y Hechos.", apoyo: "Lucas escribió dos libros" },
              { frente: "¿De qué trata el libro de Hechos?", reverso: "De lo que Jesús siguió haciendo por medio de su Espíritu en la iglesia.", apoyo: "Hechos, sobre lo que siguió haciendo por medio de su Espíritu en la iglesia" },
              { frente: "¿Quién fue el primer mártir?", reverso: "Esteban, que dio un testimonio valiente en Jerusalén.", apoyo: "el testimonio valiente de Pedro y de Esteban, el primer mártir" },
              { frente: "¿A quién llevó Pedro el evangelio?", reverso: "A Cornelio, un centurión romano.", apoyo: "Pedro lleva el evangelio a Cornelio, un centurión romano" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es el plan del libro de Hechos?", reverso: "Jerusalén; Judea y Samaria; y hasta lo último de la tierra.", apoyo: "el evangelio avanzó desde Jerusalén, por Judea y Samaria, hasta lo último de la tierra" },
              { frente: "¿Qué hizo la persecución con los creyentes?", reverso: "Los esparció, y anunciaban el evangelio por donde iban.", apoyo: "la persecución esparce a los creyentes, que anuncian el evangelio por donde van" },
              { frente: "¿Dónde predicó Felipe?", reverso: "En Samaria.", apoyo: "Felipe predica en Samaria" },
              { frente: "¿Cómo termina el libro de Hechos?", reverso: "Abierto: Pablo sigue predicando en Roma, como la misión que continúa.", apoyo: "Así termina el libro: abierto, como la misión que continúa." },
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
            consigna: "¿En qué parte del plan de Hechos 1:8 ocurre? Lleva cada hecho a su grupo.",
            grupos: ["En Jerusalén", "En Judea y en Samaria", "Hasta lo último de la tierra"],
            frases: [
              { texto: "Pentecostés y la primera iglesia", grupo: 0 },
              { texto: "El testimonio de Esteban, el primer mártir", grupo: 0 },
              { texto: "La persecución esparce a los creyentes", grupo: 1 },
              { texto: "Felipe predica en Samaria", grupo: 1 },
              { texto: "Pedro lleva el evangelio a Cornelio", grupo: 1 },
              { texto: "Los viajes misioneros de Pablo", grupo: 2 },
              { texto: "Pablo llega a Roma", grupo: 2 },
            ],
            apoyo: "En Jerusalén (capítulos 1 a 7): Pentecostés, la primera iglesia y el testimonio valiente de Pedro y de Esteban, el primer mártir.",
            ref: "Hechos 1:8",
            explica: "Hechos sigue el plan de Hechos 1:8: Jerusalén (capítulos 1 a 7), Judea y Samaria (8 a 12) y hasta lo último de la tierra (13 a 28).",
          },
          {
            consigna: "¿En qué capítulos de Hechos se cuenta? Lleva cada hecho a su grupo.",
            grupos: ["Capítulos 1 a 7", "Capítulos 8 a 12", "Capítulos 13 a 28"],
            frases: [
              { texto: "El Espíritu Santo viene en Pentecostés", grupo: 0 },
              { texto: "Pedro y Esteban dan testimonio en Jerusalén", grupo: 0 },
              { texto: "Felipe anuncia el evangelio en Samaria", grupo: 1 },
              { texto: "Cornelio, un centurión romano, oye el evangelio", grupo: 1 },
              { texto: "Pablo funda iglesias en Asia Menor y Grecia", grupo: 2 },
              { texto: "Los tres viajes misioneros de Pablo", grupo: 2 },
              { texto: "Pablo predica preso en Roma", grupo: 2 },
            ],
            apoyo: "Hasta lo último de la tierra (capítulos 13 a 28): los viajes misioneros de Pablo y su llegada a Roma.",
            ref: "Hechos 1:8",
            explica: "Los capítulos 1 a 7 ocurren en Jerusalén; los 8 a 12, en Judea y Samaria, y los 13 a 28 llevan el evangelio hasta lo último de la tierra.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que pasó en Pentecostés.",
            texto: "[[Cincuenta]] días después de la Pascua, el [[Espíritu]] Santo vino sobre los discípulos reunidos. Pedro predicó, y unas tres [[mil]] personas creyeron y fueron [[bautizadas]].",
            distractores: ["Cuarenta", "ángel", "cien", "castigadas"],
            errores: {
              Cuarenta: "Pentecostés fue cincuenta días después de la Pascua.",
            },
            apoyo: "Cincuenta días después de la Pascua, el Espíritu Santo vino sobre los discípulos reunidos",
            ref: "Hechos 2:1-4, 41",
            explica: "En Pentecostés nació la iglesia: el Espíritu Santo vino sobre los discípulos, Pedro predicó a Cristo y unas tres mil personas creyeron y fueron bautizadas.",
          },
          {
            consigna: "Completa cómo vivía la primera iglesia.",
            texto: "La primera iglesia perseveraba en la [[enseñanza]] de los apóstoles, en la [[comunión]], en el partimiento del [[pan]] y en las [[oraciones]].",
            distractores: ["opinión", "discusión", "templo", "quejas"],
            errores: {
              discusión: "La primera iglesia perseveraba en la comunión, no en la discusión.",
            },
            apoyo: "La primera iglesia perseveraba en la enseñanza de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones",
            ref: "Hechos 2:42",
            explica: "Así vivía la iglesia que nació en Pentecostés: unida en la enseñanza de los apóstoles, la comunión, el partimiento del pan y las oraciones.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Pentecostés está equivocada. Tócala.",
            frases: [
              "El Espíritu Santo vino sobre los discípulos reunidos.",
              "Los discípulos comenzaron a hablar en otras lenguas.",
              "Pedro predicó a Cristo crucificado y resucitado.",
              "Ese día solo unas pocas personas creyeron el mensaje de Pedro.",
            ],
            malo: 3,
            correccion: "Unas tres mil personas creyeron y fueron bautizadas.",
            apoyo: "unas tres mil personas creyeron y fueron bautizadas",
            ref: "Hechos 2:41",
            explica: "Pentecostés fue el nacimiento de la iglesia: unas tres mil personas creyeron y fueron bautizadas.",
          },
          {
            consigna: "Una de estas frases sobre el nacimiento de la iglesia está equivocada. Tócala.",
            frases: [
              "Pentecostés fue cincuenta días después de la Pascua.",
              "Pedro predicó a Cristo crucificado y resucitado.",
              "Los que creyeron ese día fueron bautizados.",
              "En Pentecostés, los discípulos estaban cada uno en su casa.",
            ],
            malo: 3,
            correccion: "El Espíritu Santo vino sobre los discípulos reunidos.",
            apoyo: "el Espíritu Santo vino sobre los discípulos reunidos",
            ref: "Hechos 2:1-4",
            explica: "El Espíritu Santo vino sobre los discípulos reunidos, y ese día nació la iglesia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "linea",
        versiones: [
          {
            consigna: "¿Cómo llegó el evangelio a los gentiles? Ordena los hechos del primero al último.",
            eventos: [
              { texto: "Saulo se encuentra con Jesús resucitado camino a Damasco", fecha: "Hechos 9" },
              { texto: "En casa de Cornelio, los gentiles reciben el Espíritu", fecha: "Hechos 10" },
              { texto: "El concilio de Jerusalén confirma que la salvación es por la gracia", fecha: "Hechos 15" },
              { texto: "Pablo predica en Roma con toda libertad", fecha: "Hechos 28" },
            ],
            apoyo: "Saulo, que perseguía a la iglesia, se encontró con Jesús resucitado camino a Damasco y fue llamado a llevar el evangelio a los gentiles",
            ref: "Hechos 9:15; 10:44-45; 15:11; 28:30-31",
            explica: "Dios llamó a Saulo para los gentiles, mostró a Pedro que también ellos reciben el Espíritu por la fe, el concilio lo confirmó y Pablo llevó el evangelio hasta Roma.",
          },
          {
            consigna: "Del día de Pentecostés a Roma: ordena los hechos del primero al último.",
            eventos: [
              { texto: "El Espíritu Santo viene sobre los discípulos", fecha: "Pentecostés (Hechos 2)" },
              { texto: "Saulo es llamado a llevar el evangelio a los gentiles", fecha: "Hechos 9" },
              { texto: "Pablo funda iglesias en Filipos, Tesalónica, Corinto y Éfeso", fecha: "Los viajes misioneros" },
              { texto: "Pablo es arrestado en Jerusalén", fecha: "Después de los viajes" },
              { texto: "Pablo sigue predicando, preso en Roma", fecha: "El final de Hechos" },
            ],
            apoyo: "Pablo hizo tres viajes misioneros por Asia Menor y Grecia, fundando iglesias en ciudades como Filipos, Tesalónica, Corinto y Éfeso.",
            ref: "Hechos 2:1-4; 9:15; 28:30-31",
            explica: "Desde Pentecostés el evangelio avanzó: Saulo fue llamado para los gentiles, fundó iglesias en sus viajes, fue arrestado en Jerusalén y siguió predicando preso en Roma.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un amigo que no es judío te pregunta: ¿El evangelio es solo para los judíos, o también es para gente como yo?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Es para todos: Dios mostró que los gentiles reciben el Espíritu por la fe.", bien: true, explica: "En casa de Cornelio, Dios mostró a Pedro que también los gentiles reciben el Espíritu por la fe." },
              { texto: "Primero tendrías que cumplir toda la ley de Moisés para poder recibirlo.", explica: "El concilio de Jerusalén confirmó que la salvación es por la gracia, sin exigir a los gentiles la ley de Moisés." },
              { texto: "Es solo para los judíos; los demás pueden admirarlo, pero nunca recibirlo.", explica: "Saulo fue llamado justamente a llevar el evangelio a los gentiles." },
              { texto: "Depende del país donde naciste: en algunos lugares no se puede creer en Jesús.", explica: "Hechos cuenta cómo el evangelio avanzó hasta lo último de la tierra, entre judíos y gentiles." },
            ],
            apoyo: "Dios mostró a Pedro, en casa de Cornelio, que también los gentiles reciben el Espíritu por la fe",
            ref: "Hechos 10:44-45; 15:11",
            explica: "El evangelio llegó a los gentiles: Dios lo mostró en casa de Cornelio, y el concilio de Jerusalén confirmó que la salvación es por la gracia.",
          },
          {
            caso: "Tu primo te escribe: ¿Cómo llegó el evangelio desde Jerusalén hasta tantas naciones?",
            pregunta: "¿Qué le contestas?",
            opciones: [
              { texto: "Con los viajes de Pablo, que fundó iglesias en Asia Menor y en Grecia.", bien: true, explica: "Pablo hizo tres viajes misioneros por Asia Menor y Grecia, fundando iglesias, y llegó hasta Roma." },
              { texto: "Porque el emperador de Roma obligó a todos sus pueblos a creer en Jesús.", explica: "Pablo llegó a Roma como preso; el evangelio avanzó con el poder del Espíritu Santo." },
              { texto: "Porque los apóstoles se quedaron en Jerusalén y la gente viajaba hasta allí.", explica: "La persecución esparció a los creyentes, y Pablo hizo tres viajes misioneros." },
              { texto: "Porque el evangelio se quedó solo entre los judíos, sin llegar a los gentiles.", explica: "Saulo fue llamado a llevar el evangelio a los gentiles." },
            ],
            apoyo: "Pablo hizo tres viajes misioneros por Asia Menor y Grecia",
            ref: "Hechos 9:15; 28:30-31",
            explica: "Con el poder del Espíritu Santo, el evangelio avanzó: Pablo fundó iglesias en Asia Menor y Grecia, y siguió predicando en Roma.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "el evangelio avanzó desde Jerusalén, por Judea y Samaria, hasta lo último de la tierra",
            ref: "Hechos 1:8",
            clave: {
              id: "pr-n2-panorama-nt-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cuál es el plan del libro de Hechos, según Hechos 1:8?",
              ideas: [
                { id: "jerusalen", peso: 35, texto: "Empieza en Jerusalén.", formas: ["jerusalen"] },
                { id: "judea", peso: 30, texto: "Sigue por Judea y Samaria.", formas: ["judea", "samaria"] },
                { id: "ultimo", peso: 35, texto: "Llega hasta lo último de la tierra, hasta Roma.", formas: ["ultimo de la tierra", "hasta lo ultimo", "todo el mundo", "las naciones", "roma", "confines"] },
              ],
              modelo: "El evangelio avanza primero en Jerusalén, después por Judea y Samaria, y hasta lo último de la tierra, con el poder del Espíritu Santo, hasta llegar a Roma.",
            },
          },
          {
            apoyo: "Hechos es la historia de una iglesia en marcha.",
            ref: "Hechos 1:1; 28:30-31",
            clave: {
              id: "pr-n2-panorama-nt-4-a7-2",
              tipo: "corta",
              pregunta: "¿Qué cuenta el libro de Hechos y por qué se dice que termina abierto?",
              ideas: [
                { id: "cuenta", peso: 50, texto: "Cuenta lo que Jesús siguió haciendo por medio de su Espíritu en la iglesia.", formas: ["siguio haciendo", "espiritu santo", "su espiritu", "la iglesia", "nacio la iglesia", "evangelio avanz*", "iglesia en marcha"] },
                { id: "abierto", peso: 50, texto: "Termina con Pablo predicando en Roma: la misión continúa con nosotros.", formas: ["mision continua", "continua", "sigue (la|abierta|con)", "roma", "con nosotros", "nos toca"] },
              ],
              modelo: "Hechos cuenta lo que Jesús siguió haciendo por medio de su Espíritu en la iglesia, desde Jerusalén hasta Roma. Se dice que termina abierto porque la misión continúa con nosotros.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. Las cartas del Nuevo Testamento
    "n2-panorama-nt-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántos libros del Nuevo Testamento son cartas?", reverso: "Veintiuno de los veintisiete.", apoyo: "Veintiuno de los veintisiete libros del Nuevo Testamento son cartas." },
              { frente: "¿Por qué las cartas son tan prácticas?", reverso: "Porque se escribieron a iglesias y personas concretas, con problemas concretos.", apoyo: "Los apóstoles escribían a iglesias y a personas concretas, con problemas concretos." },
              { frente: "¿Qué cartas se llaman pastorales?", reverso: "1 y 2 Timoteo y Tito, porque orientan a líderes de iglesias.", apoyo: "Las tres primeras se llaman pastorales, porque orientan a líderes de iglesias" },
              { frente: "¿Qué le pide Pablo a Filemón?", reverso: "Que reciba a Onésimo como a un hermano amado.", apoyo: "en Filemón, Pablo le pide que reciba a Onésimo como a un hermano amado" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué carta explica el evangelio con más orden?", reverso: "Romanos.", apoyo: "Romanos explica el evangelio con más orden que ninguna otra carta" },
              { frente: "¿Desde dónde se escribió Filipenses?", reverso: "Desde la prisión; habla del gozo en medio de las pruebas.", apoyo: "Filipenses, escrita desde la prisión, el gozo en medio de las pruebas" },
              { frente: "¿Por qué se llaman generales algunas epístolas?", reverso: "Porque se escribieron para muchas iglesias.", apoyo: "Se llaman generales porque se escribieron para muchas iglesias." },
              { frente: "¿Contra qué advierte Judas?", reverso: "Contra los falsos maestros.", apoyo: "Judas advierte contra los falsos maestros" },
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
            consigna: "¿Es una carta de Pablo o una epístola general? Lleva cada carta a su grupo.",
            grupos: ["Carta de Pablo", "Epístola general"],
            frases: [
              { texto: "Romanos", grupo: 0 },
              { texto: "Gálatas", grupo: 0 },
              { texto: "Filipenses", grupo: 0 },
              { texto: "Tito", grupo: 0, explica: "Pablo escribió a Tito: es una de las cartas pastorales." },
              { texto: "Hebreos", grupo: 1 },
              { texto: "Santiago", grupo: 1 },
              { texto: "1 Pedro", grupo: 1 },
              { texto: "Judas", grupo: 1 },
            ],
            apoyo: "A iglesias: Romanos, 1 y 2 Corintios, Gálatas, Efesios, Filipenses, Colosenses y 1 y 2 Tesalonicenses.",
            explica: "Pablo escribió a iglesias, como Romanos, Gálatas y Filipenses, y a personas, como Tito. Hebreos, Santiago, 1 Pedro y Judas son epístolas generales, escritas para muchas iglesias.",
          },
          {
            consigna: "¿A quién se escribió? Lleva cada carta a su grupo.",
            grupos: ["Pablo a una iglesia", "Pablo a una persona", "Epístola general"],
            frases: [
              { texto: "Efesios", grupo: 0 },
              { texto: "Colosenses", grupo: 0 },
              { texto: "1 Tesalonicenses", grupo: 0 },
              { texto: "1 Timoteo", grupo: 1 },
              { texto: "Tito", grupo: 1 },
              { texto: "Filemón", grupo: 1 },
              { texto: "Hebreos", grupo: 2 },
              { texto: "Judas", grupo: 2 },
            ],
            apoyo: "A personas: 1 y 2 Timoteo, Tito y Filemón.",
            explica: "Pablo escribió a iglesias, como Efesios, Colosenses y 1 Tesalonicenses, y a personas, como Timoteo, Tito y Filemón. Hebreos y Judas son epístolas generales.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada carta de Pablo con su mensaje central.",
            pares: [
              ["Romanos", "Explica el evangelio con más orden que ninguna otra carta"],
              ["Gálatas", "Defiende la libertad frente a quienes querían volver a la ley"],
              ["Efesios", "Muestra la iglesia como el cuerpo de Cristo"],
              ["Filipenses", "El gozo en medio de las pruebas, escrita desde la prisión"],
            ],
            apoyo: "Romanos explica el evangelio con más orden que ninguna otra carta: todos pecaron, Dios justifica por la fe en Cristo, y el creyente vive una vida nueva por el Espíritu.",
            ref: "Romanos 5:1",
            explica: "Romanos explica el evangelio con orden; Gálatas defiende la libertad; Efesios presenta la iglesia como el cuerpo de Cristo, y Filipenses, el gozo en las pruebas.",
          },
          {
            consigna: "Une cada epístola general con su mensaje.",
            pares: [
              ["Hebreos", "Cristo es superior a los ángeles, a Moisés y a los sacrificios"],
              ["Santiago", "Una fe que se ve en las obras"],
              ["Pedro", "Ánimo para los que sufren por su fe"],
              ["Juan", "Andar en la luz y en el amor"],
              ["Judas", "Advertencia contra los falsos maestros"],
            ],
            apoyo: "Pedro anima a los que sufren por su fe; Juan llama a andar en la luz y en el amor",
            explica: "Cada epístola general tiene su acento: Hebreos, la superioridad de Cristo; Santiago, la fe con obras; Pedro, ánimo en el sufrimiento; Juan, la luz y el amor; Judas, la advertencia contra los falsos maestros.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre las cartas de Pablo está equivocada. Tócala.",
            frases: [
              "Romanos dice que todos pecaron y que Dios justifica por la fe en Cristo.",
              "Gálatas anima a volver a la ley para ser salvos.",
              "Efesios muestra la iglesia como el cuerpo de Cristo.",
              "Filipenses habla del gozo en medio de las pruebas.",
            ],
            malo: 1,
            correccion: "Gálatas defiende la libertad frente a quienes querían volver a la ley.",
            apoyo: "Gálatas defiende esa misma libertad frente a quienes querían volver a la ley.",
            explica: "Gálatas hace lo contrario: defiende la libertad del evangelio frente a quienes querían volver a la ley.",
          },
          {
            consigna: "Una de estas frases sobre las epístolas generales está equivocada. Tócala.",
            frases: [
              "Hebreos anima a no volver atrás.",
              "Santiago enseña una fe que se ve en las obras.",
              "Hebreos dice que los sacrificios antiguos son superiores a Cristo.",
              "Judas advierte contra los falsos maestros.",
            ],
            malo: 2,
            correccion: "Hebreos muestra que Cristo es superior a los ángeles, a Moisés y a los sacrificios antiguos.",
            apoyo: "Hebreos muestra que Cristo es superior a los ángeles, a Moisés y a los sacrificios antiguos, y anima a no volver atrás.",
            explica: "Hebreos muestra que Cristo es superior a todo lo antiguo, y por eso anima a no volver atrás.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseñan Pablo y Santiago sobre la fe y las obras.",
            texto: "Pablo enseña que somos salvos por [[gracia]], por medio de la fe; [[Santiago]], que esa fe verdadera se [[demuestra]] con obras.",
            distractores: ["suerte", "Judas", "esconde"],
            errores: {
              Judas: "Judas advierte contra los falsos maestros; quien enseña que la fe se demuestra con obras es Santiago.",
              esconde: "La fe verdadera no se esconde: se demuestra con obras.",
            },
            apoyo: "Pablo enseña que somos salvos por gracia, por medio de la fe, y no por obras; Santiago, que esa fe verdadera se demuestra con obras.",
            ref: "Efesios 2:8-10; Santiago 2:17-18",
            explica: "Pablo y Santiago no se contradicen: somos salvos por gracia, por medio de la fe, y esa fe verdadera se ve en las obras.",
          },
          {
            consigna: "Completa cómo se ve la fe que salva.",
            texto: "Las cartas enseñan qué [[creer]] y cómo vivir: la fe que salva nunca está sola, [[produce]] buenas obras y se ve en una vida [[nueva]].",
            distractores: ["temer", "impide", "vieja"],
            errores: {
              impide: "Al revés: la fe que salva produce buenas obras.",
            },
            apoyo: "esa fe verdadera se ve en una vida nueva y en buenas obras",
            ref: "Efesios 2:8-10; Santiago 2:17-18",
            explica: "La fe que salva no se queda quieta: produce buenas obras. Por eso Pablo y Santiago no se contradicen.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un compañero de trabajo te dice: Si me salvo solo por la fe, entonces da igual cómo viva.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Así es: lo único que cuenta es creer, y cómo vivas no importa.", explica: "Somos salvos por la fe sola, pero la fe que salva nunca está sola: produce buenas obras." },
              { texto: "La fe que salva nunca está sola: se nota en una vida nueva.", bien: true, explica: "Así lo enseñan Pablo y Santiago: la fe verdadera se demuestra con obras." },
              { texto: "No es por fe: para salvarte tienes que hacer muchas obras buenas.", explica: "Pablo enseña que somos salvos por gracia, por medio de la fe, y no por obras." },
              { texto: "Pablo y Santiago se contradicen, así que elige a cuál de los dos creerle.", explica: "No se contradicen: somos salvos por la fe, y esa fe verdadera se demuestra con obras." },
            ],
            apoyo: "la fe que salva nunca está sola: produce buenas obras",
            ref: "Efesios 2:8-10; Santiago 2:17-18",
            explica: "La salvación es por gracia, por medio de la fe, y esa fe verdadera se ve en una vida nueva y en buenas obras.",
          },
          {
            caso: "Tu tía te dice: Yo voy a la iglesia y ayudo a todos; con eso ya me gané el cielo.",
            pregunta: "¿Qué le contestas con cariño?",
            opciones: [
              { texto: "Ayudar es bueno, pero somos salvos por gracia, por medio de la fe.", bien: true, explica: "Pablo enseña que somos salvos por gracia, por medio de la fe, y no por obras." },
              { texto: "Tienes razón: si ayudas a todos, ya te ganaste el cielo con tus obras.", explica: "Las obras son buenas, pero no salvan: la salvación es por gracia, por medio de la fe." },
              { texto: "Ayudar no sirve de nada; lo único que importa es lo que crees por dentro.", explica: "Santiago enseña que la fe verdadera se ve en las obras: ayudar sí importa." },
              { texto: "Tendrías que ayudar todavía más para estar segura de ganarte el cielo.", explica: "La salvación no se gana con obras: es por gracia, por medio de la fe." },
            ],
            apoyo: "Pablo enseña que somos salvos por gracia, por medio de la fe, y no por obras",
            ref: "Efesios 2:8-10",
            explica: "Somos salvos por gracia, por medio de la fe, y no por obras; y la fe verdadera, eso sí, produce buenas obras.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "esa fe verdadera se ve en una vida nueva y en buenas obras",
            ref: "Efesios 2:8-10; Santiago 2:17-18",
            clave: {
              id: "pr-n2-panorama-nt-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué Pablo y Santiago no se contradicen sobre la fe y las obras?",
              ideas: [
                { id: "pablo", peso: 50, texto: "Pablo enseña que somos salvos por gracia, por medio de la fe, y no por obras.", formas: ["salv* por gracia", "salv* por la fe", "salv* por fe", "por gracia", "por medio de la fe", "fe sola", "solo por la fe"] },
                { id: "santiago", peso: 50, texto: "Santiago enseña que esa fe verdadera se demuestra con obras.", formas: ["se demuestra con", "se demuestra en", "se ve en", "produce obras", "fe verdadera", "nunca esta sola"] },
              ],
              modelo: "Porque hablan de dos lados de la misma verdad: Pablo enseña que somos salvos por gracia, por medio de la fe, y no por obras; Santiago, que esa fe verdadera se demuestra con buenas obras.",
            },
          },
          {
            apoyo: "Somos salvos por la fe sola, pero la fe que salva nunca está sola: produce buenas obras.",
            ref: "Efesios 2:8-10; Santiago 2:17-18",
            clave: {
              id: "pr-n2-panorama-nt-5-a7-2",
              tipo: "corta",
              pregunta: "Explica la frase: somos salvos por la fe sola, pero la fe que salva nunca está sola.",
              ideas: [
                { id: "fe", peso: 50, texto: "La salvación es por gracia, por medio de la fe, y no por obras.", formas: ["por gracia", "no por obras", "por medio de la fe", "solo por la fe", "salv* por la fe", "salv* por fe", "fe sola", "regalo", "no se gana", "no la ganamos"] },
                { id: "obras", peso: 50, texto: "La fe verdadera produce buenas obras: se ve en la vida.", formas: ["produce buenas obras", "produce obras", "buenas obras", "se demuestra", "se ve en", "vida nueva"] },
              ],
              errores: [
                { id: "por-obras", texto: "La salvación no se gana con obras: es por gracia, por medio de la fe.", formas: ["obras para salv*", "obras para gan*", "ganar* (la|el) (salvacion|cielo)", "salv* por (las|sus|nuestras) obras", "salv* con (las|sus|nuestras) obras"], anula: "obras" },
              ],
              modelo: "Quiere decir que Dios nos salva por gracia, por medio de la fe y no por obras; pero esa fe verdadera no se queda quieta: produce buenas obras y se ve en una vida nueva.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. Apocalipsis: Cristo vence
    "n2-panorama-nt-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué quiere decir Apocalipsis?", reverso: "Revelación.", apoyo: "Apocalipsis quiere decir revelación." },
              { frente: "¿Dónde y en qué tiempos escribió Juan el Apocalipsis?", reverso: "Desterrado en la isla de Patmos, en tiempos de persecución.", apoyo: "Juan lo escribió desterrado en la isla de Patmos, en tiempos de persecución" },
              { frente: "¿Para qué escribió Juan el Apocalipsis?", reverso: "Para animar a las iglesias: Jesucristo reina, vuelve y hará nuevas todas las cosas.", apoyo: "para animar a las iglesias: Jesucristo reina, vuelve y hará nuevas todas las cosas" },
              { frente: "¿Qué ve Juan en el cielo?", reverso: "A Dios en su trono y al Cordero que fue inmolado.", apoyo: "Juan ve a Dios en su trono y al Cordero que fue inmolado" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿En qué estilo está escrito Apocalipsis?", reverso: "En visiones y símbolos, que los primeros lectores conocían por Daniel y Ezequiel.", apoyo: "Apocalipsis está escrito en un estilo de visiones y símbolos" },
              { frente: "¿Cuál es el mensaje central de Apocalipsis?", reverso: "Dios está en el trono y el Cordero vence.", apoyo: "Dios está en el trono y el Cordero vence" },
              { frente: "¿Qué hace Cristo en las cartas a las siete iglesias?", reverso: "Alaba lo bueno, corrige lo malo y promete premios al que venza.", apoyo: "alaba lo bueno, corrige lo malo y promete premios al que venza" },
              { frente: "¿Cómo termina la Biblia?", reverso: "Con una ciudad donde Dios habita con su pueblo.", apoyo: "La Biblia empieza con un huerto y termina con una ciudad donde Dios habita con su pueblo" },
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
            consigna: "¿Así se lee bien Apocalipsis o no? Lleva cada frase a su grupo.",
            grupos: ["Así se lee bien", "Así no se lee bien"],
            frases: [
              { texto: "Con humildad", grupo: 0 },
              { texto: "Comparando la Escritura con la Escritura", grupo: 0 },
              { texto: "Sin perder de vista que el Cordero vence", grupo: 0 },
              { texto: "Como un libro que solo da miedo", grupo: 1, explica: "Juan lo escribió para animar a las iglesias." },
              { texto: "Buscando detalles y olvidando el mensaje central", grupo: 1 },
              { texto: "Sin comparar sus símbolos con el resto de la Escritura", grupo: 1, explica: "Los primeros lectores conocían sus símbolos por los profetas, como Daniel y Ezequiel: se compara la Escritura con la Escritura." },
            ],
            apoyo: "Por eso hay que leerlo con humildad, comparando la Escritura con la Escritura, sin perder de vista su mensaje central",
            ref: "Apocalipsis 1:1-3",
            explica: "Apocalipsis se lee con humildad, comparando la Escritura con la Escritura y sin perder de vista lo central: Dios está en el trono y el Cordero vence.",
          },
          {
            consigna: "¿Es el propósito de Apocalipsis o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Para eso se escribió", "No es su propósito"],
            frases: [
              { texto: "Animar a las iglesias perseguidas", grupo: 0 },
              { texto: "Mostrar que Jesucristo reina y vuelve", grupo: 0 },
              { texto: "Anunciar que Dios hará nuevas todas las cosas", grupo: 0 },
              { texto: "Asustar a los creyentes", grupo: 1, explica: "Juan escribió para animar a las iglesias, no para asustarlas." },
              { texto: "Contar la historia de los reyes de Israel", grupo: 1 },
              { texto: "Quitarles la esperanza a los que sufren", grupo: 1, explica: "Es un libro de visiones y de esperanza." },
            ],
            apoyo: "Juan lo escribió desterrado en la isla de Patmos, en tiempos de persecución, para animar a las iglesias",
            ref: "Apocalipsis 1:1-3",
            explica: "Juan escribió en tiempos de persecución para animar a las iglesias: Jesucristo reina, vuelve y hará nuevas todas las cosas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el libro de Apocalipsis: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La palabra Apocalipsis quiere decir revelación.", verdad: true, explica: "Es la revelación de Jesucristo.", apoyo: "Apocalipsis quiere decir revelación.", ref: "Apocalipsis 1:1" },
              { texto: "Juan escribió Apocalipsis en un tiempo de paz para la iglesia.", verdad: false, explica: "Lo escribió desterrado en la isla de Patmos, en tiempos de persecución.", apoyo: "Juan lo escribió desterrado en la isla de Patmos, en tiempos de persecución" },
              { texto: "Los primeros lectores conocían sus símbolos por profetas como Daniel y Ezequiel.", verdad: true, explica: "Por eso hay que leerlo comparando la Escritura con la Escritura.", apoyo: "que los primeros lectores conocían por los profetas, como Daniel y Ezequiel" },
            ],
          },
          {
            consigna: "Sobre el libro de Apocalipsis: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El mensaje central de Apocalipsis es que Dios está en el trono y el Cordero vence.", verdad: true, explica: "Ese mensaje no se pierde de vista al leer sus visiones.", apoyo: "sin perder de vista su mensaje central: Dios está en el trono y el Cordero vence" },
              { texto: "Apocalipsis se debe leer sin compararlo con el resto de la Escritura.", verdad: false, explica: "Hay que leerlo con humildad, comparando la Escritura con la Escritura.", apoyo: "comparando la Escritura con la Escritura" },
              { texto: "Juan escribió Apocalipsis para asustar a las iglesias.", verdad: false, explica: "Lo escribió para animar a las iglesias: Jesucristo reina, vuelve y hará nuevas todas las cosas.", apoyo: "para animar a las iglesias" },
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
            consigna: "Completa lo que hace Cristo en las cartas a las siete iglesias.",
            texto: "Cristo resucitado habla a siete iglesias de Asia: [[alaba]] lo bueno, [[corrige]] lo malo y promete [[premios]] al que venza.",
            distractores: ["ignora", "aplaude", "castigos"],
            errores: {
              castigos: "Al que venza, Cristo le promete premios.",
            },
            apoyo: "Cristo resucitado habla a siete iglesias de Asia: alaba lo bueno, corrige lo malo y promete premios al que venza.",
            explica: "Cristo conoce a cada iglesia: alaba lo bueno, corrige lo malo y promete premios al que venza.",
          },
          {
            consigna: "Completa lo que Cristo dice a dos de las siete iglesias.",
            texto: "A Éfeso le dice que dejó su primer [[amor]]; a Laodicea, que es [[tibia]]. Esas cartas siguen hablando hoy a cada [[creyente]].",
            distractores: ["templo", "fría", "ángel"],
            errores: {
              fría: "A Laodicea le dice que es tibia, no fría.",
            },
            apoyo: "A Éfeso le dice que dejó su primer amor; a Laodicea, que es tibia.",
            explica: "Cristo corrige a Éfeso porque dejó su primer amor y a Laodicea porque es tibia; esas cartas siguen hablando hoy a cada iglesia y a cada creyente.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Apocalipsis 22:20",
            consigna: "La iglesia responde a la promesa de Cristo con una oración. Toca la palabra con que le pide que vuelva.",
            texto: "Amén; sí, [[ven]], Señor Jesús",
            apoyo: "Casi al final, la iglesia responde a la promesa de Cristo con una oración",
            explica: "Con esa oración, la iglesia le pide a Cristo que venga. Lo seguro es que Cristo volverá, juzgará al mundo y reinará.",
          },
          {
            ref: "Apocalipsis 22:20",
            consigna: "La iglesia dice que sí a la promesa de Cristo. Toca las dos palabras con que lo dice.",
            texto: "[[Amén]]; [[sí]], ven, Señor Jesús",
            apoyo: "Cristo volverá, juzgará al mundo y reinará",
            explica: "Con «Amén; sí», la iglesia recibe la promesa de que Cristo vuelve, y le pide que venga.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un amigo de la iglesia te cuenta: Sigo sirviendo, pero ya no amo a Jesús como al principio.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Es normal: con los años el amor se enfría y no hay nada que hacer.", explica: "Cristo corrige a Éfeso porque dejó su primer amor: no lo deja pasar como algo normal." },
              { texto: "Eso mismo le dijo Cristo a Éfeso, y esa carta también te habla hoy.", bien: true, explica: "Las cartas a las siete iglesias siguen hablando hoy a cada creyente: Cristo corrige lo malo." },
              { texto: "Si sigues sirviendo, el amor no importa; lo que cuenta es lo que haces.", explica: "A Éfeso, Cristo le dice que dejó su primer amor: el amor sí importa." },
              { texto: "Eso solo les pasa a las iglesias tibias como Laodicea; a ti no te toca.", explica: "Esas cartas siguen hablando hoy a cada iglesia y a cada creyente." },
            ],
            apoyo: "A Éfeso le dice que dejó su primer amor",
            explica: "Cristo alaba lo bueno y corrige lo malo: a Éfeso le dice que dejó su primer amor, y esa palabra sigue hablando hoy.",
          },
          {
            caso: "Una compañera de estudio te dice: Las cartas de Apocalipsis eran para iglesias de hace siglos; hoy no me dicen nada.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Siguen hablando hoy a cada iglesia y a cada creyente, también a ti.", bien: true, explica: "Así lo dice la lección: Cristo sigue alabando lo bueno y corrigiendo lo malo." },
              { texto: "Es cierto: solo sirven para saber cómo eran las iglesias de Asia.", explica: "Esas cartas siguen hablando hoy a cada iglesia y a cada creyente." },
              { texto: "Solo hablan de castigos, así que mejor no leerlas para no asustarse.", explica: "Cristo también alaba lo bueno y promete premios al que venza." },
              { texto: "Son solo para los pastores, que son los que dirigen las iglesias hoy.", explica: "Hablan a cada iglesia y a cada creyente, no solo a los pastores." },
            ],
            apoyo: "Esas cartas siguen hablando hoy a cada iglesia y a cada creyente.",
            explica: "En las cartas a las siete iglesias, Cristo alaba lo bueno, corrige lo malo y promete premios al que venza; esas cartas siguen hablando hoy.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "anuncia su regreso y el día en que Dios hará nuevas todas las cosas",
            ref: "Apocalipsis 21:3-5",
            clave: {
              id: "pr-n2-panorama-nt-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué esperanza final anuncia el libro de Apocalipsis?",
              ideas: [
                { id: "vuelve", peso: 50, texto: "Cristo volverá, juzgará al mundo y reinará.", formas: ["volver*", "vuelve", "regres*", "vendra", "reinar*", "juzgar*"] },
                { id: "nuevo", peso: 50, texto: "Dios hará nuevas todas las cosas y habitará con su pueblo, sin llanto, ni dolor, ni muerte.", formas: ["nuevas todas las cosas", "todo nuevo", "hara nuevas", "nuevas las cosas", "habita* con su pueblo", "sin llanto", "ni dolor", "ni muerte", "ciudad"] },
              ],
              modelo: "Apocalipsis anuncia que Cristo volverá, juzgará al mundo y reinará, y que Dios hará nuevas todas las cosas: habitará con su pueblo en una ciudad sin llanto, ni dolor, ni muerte.",
            },
          },
          {
            apoyo: "La historia tiene un final, y está en las manos de Cristo.",
            ref: "Apocalipsis 5:12; 21:3-5",
            clave: {
              id: "pr-n2-panorama-nt-6-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué Apocalipsis da esperanza a una iglesia que sufre?",
              ideas: [
                { id: "reina", peso: 50, texto: "Porque muestra que Dios está en el trono y el Cordero vence.", formas: ["en el trono", "en su trono", "cordero vence", "el cordero", "cristo reina", "cristo vence", "jesucristo reina", "reina", "vence*", "victoria"] },
                { id: "final", peso: 50, texto: "Porque Cristo volverá y Dios hará nuevas todas las cosas.", formas: ["volver*", "vendra", "regres*", "nuevas todas las cosas", "todo nuevo", "hara nuevas", "sin llanto", "ni dolor"] },
              ],
              modelo: "Porque muestra que Dios sigue en su trono y que el Cordero vence. Además, Cristo volverá y Dios hará nuevas todas las cosas, sin llanto ni dolor.",
            },
          },
        ],
      },
    ],
  },
};
