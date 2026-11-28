/**
 * Las prácticas de la materia `pastoral-4` (especialidad Ministerio pastoral): visitación y cuidado del rebaño. Hechas
 * solo con lo que dice cada lección (server/academia/contenido/pastoral-4.ts), con la guía de docs/academia-practicas.md.
 *
 * La sanidad (lección 3) se practica solo con lo que la lección afirma sin reservas: lo que pide Santiago 5 y lo que
 * enseña la declaración de fe (Dios sana hoy en respuesta a la oración de fe, la sanidad se ministra con la oración y la
 * unción con aceite, y buscarla no se opone a recibir atención médica). Si la sanidad está provista en la expiación es un
 * punto por confirmar: ninguna actividad lo pregunta. Nada toca quién puede ser anciano o diácono ni el ministerio de la
 * mujer: de Hechos 6 solo se practica que los apóstoles no lo hicieron todo solos y eligieron a siete para atender a las
 * viudas. La lección no da un plazo para reportar un abuso, así que ninguna actividad lo pide. En los casos, las buenas
 * opciones son las de la lección (escuchar, leer, orar, acompañar, avisar y seguir las reglas de cada lugar), sin
 * consejos médicos ni legales.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_PASTORAL_4: PracticasMateria = {
  materia: "pastoral-4",
  mision: {
    titulo: "Que nadie quede sin cuidado",
    intro:
      "Tu iglesia te pidió organizar el cuidado del rebaño. Una hermana pasó semanas enferma sin que nadie lo supiera, hay ancianos que ya no pueden venir, un joven está preso, algunas familias dejaron de asistir y el pastor no alcanza a llegar a todos. Vas a armar el mapa del rebaño, preparar las visitas a las casas, al hospital, al asilo y a la cárcel, buscar a los que se alejaron y repartir el cuidado con toda la iglesia. Repasa las seis lecciones para tener listo cada paso.",
    cierre:
      "Ya sabes cuidar al rebaño como el buen pastor: conocer a cada oveja por su nombre y por su necesidad, visitar las casas con un propósito y con prudencia, acompañar al enfermo y al que se muere con fe y con amor, no olvidar a los ancianos ni a los presos, buscar sin reproches a la que falta y organizar a toda la iglesia para que alguien llegue a cada uno. Cada silla vacía tiene un nombre.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Conocer a las ovejas
    "pastoral-4-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pide la Biblia que el pastor conozca de cada oveja?", reverso: "Su nombre y su necesidad.", apoyo: "La Biblia pide algo más: conocer a cada oveja por su nombre y por su necesidad" },
              { frente: "Conocer el estado de cada oveja, ¿qué le cuesta al pastor?", reverso: "Tiempo, visitas y un oído atento.", apoyo: "Conocer el estado de cada uno pide tiempo, visitas y un oído atento" },
              { frente: "¿A quién imita el pastor de una iglesia?", reverso: "A Dios mismo, el pastor que busca a sus ovejas.", apoyo: "El pastor de una iglesia imita a ese Pastor" },
              { frente: "En Jeremías 3:15, ¿cómo apacientan los pastores que Dios promete?", reverso: "Con corazón, y también con sabiduría y con orden.", apoyo: "con corazón, y también con sabiduría y con orden" },
            ],
          },
          {
            tarjetas: [
              { frente: "En Juan 10:14, ¿cómo es la relación de Jesús con sus ovejas?", reverso: "Él conoce a sus ovejas, y ellas lo conocen a él.", apoyo: "«Yo soy el buen pastor; y conozco mis ovejas, y las mías me conocen»" },
              { frente: "¿Qué aconseja el sabio a quien cuida un rebaño, en Proverbios 27:23?", reverso: "Ser diligente en conocer el estado de sus ovejas.", apoyo: "«Sé diligente en conocer el estado de tus ovejas, Y mira con cuidado por tus rebaños»" },
              { frente: "Según Ezequiel 34:11, ¿qué dice Dios que hará él mismo?", reverso: "Ir a buscar sus ovejas.", apoyo: "Dios mismo es el pastor que busca" },
              { frente: "¿Siguen las ovejas a un pastor que no conocen?", reverso: "No: las ovejas no siguen a un pastor que no conocen.", apoyo: "Las ovejas no siguen a un pastor que no conocen" },
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
            consigna: "El sabio aconseja a quien cuida un rebaño. ¿En qué debe ser diligente? Toca las palabras que lo dicen.",
            texto: "Sé diligente en [[conocer el estado]] de tus ovejas, Y mira con cuidado por tus rebaños",
            apoyo: "Conocer el estado de cada uno pide tiempo, visitas y un oído atento",
            ref: "Proverbios 27:23",
            explica: "El sabio aconseja ser diligente en conocer el estado de las ovejas. Por eso el pastor conoce y visita a las suyas: conocer el estado de cada uno pide tiempo, visitas y un oído atento.",
          },
          {
            consigna: "En Ezequiel 34, Dios mismo es el pastor que busca. ¿Qué dice que hará con sus ovejas? Toca las palabras que lo dicen.",
            texto: "He aquí yo, yo mismo iré a [[buscar]] mis ovejas, y las [[reconoceré]]",
            apoyo: "Dios mismo es el pastor que busca",
            ref: "Ezequiel 34:11",
            explica: "Dios dice que él mismo irá a buscar sus ovejas, y que las reconocerá. El pastor de una iglesia imita a ese Pastor: busca a sus ovejas y las conoce.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así obra el buen pastor o así obra el asalariado? Lleva cada frase a su grupo.",
            grupos: ["Así obra el buen pastor", "Así obra el asalariado"],
            frases: [
              { texto: "Conoce a sus ovejas por su nombre", grupo: 0 },
              { texto: "Se queda cuando viene el peligro", grupo: 0 },
              { texto: "Busca a la oveja que falta", grupo: 0 },
              { texto: "Sirve al rebaño", grupo: 0 },
              { texto: "Solo conoce los números", grupo: 1 },
              { texto: "Huye cuando viene el peligro", grupo: 1 },
              { texto: "No le importa la oveja que falta", grupo: 1 },
              { texto: "Se sirve del rebaño", grupo: 1 },
            ],
            apoyo: "El buen pastor conoce a sus ovejas por su nombre; el asalariado solo conoce los números",
            ref: "Juan 10:11-14",
            explica: "El buen pastor conoce a sus ovejas por su nombre, se queda cuando viene el peligro, busca a la que falta y sirve al rebaño. El asalariado solo conoce los números, huye, no le importa la que falta y se sirve del rebaño.",
          },
          {
            consigna: "¿Qué muestra cada ejemplo: un buen pastor o un asalariado? Lleva cada frase a su grupo.",
            grupos: ["Un buen pastor", "Un asalariado"],
            frases: [
              { texto: "Sabe cómo se llama cada familia y qué necesita", grupo: 0 },
              { texto: "En una crisis de la iglesia, se queda a cuidar a su gente", grupo: 0 },
              { texto: "Pregunta por el hermano que faltó tres domingos", grupo: 0 },
              { texto: "Usa su tiempo y sus fuerzas para servir a las ovejas", grupo: 0 },
              { texto: "Solo le interesa cuántos llegaron el domingo", grupo: 1, explica: "El asalariado solo conoce los números." },
              { texto: "Cuando llega el peligro, se va y deja sola a la iglesia", grupo: 1, explica: "El asalariado huye cuando viene el peligro." },
              { texto: "Nunca pregunta por los que dejaron de venir", grupo: 1, explica: "Al asalariado no le importa la oveja que falta." },
              { texto: "Usa a las ovejas para su propio provecho", grupo: 1, explica: "El asalariado se sirve del rebaño." },
            ],
            apoyo: "El buen pastor busca a la que falta; al asalariado no le importa",
            ref: "Juan 10:11-14",
            explica: "El buen pastor conoce a cada oveja, se queda en el peligro, busca a la que falta y sirve al rebaño. El asalariado solo cuenta números, huye, no pregunta por la que falta y se sirve del rebaño.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el buen pastor y el asalariado: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Según Juan 10, el buen pastor da su vida por las ovejas.", verdad: true, explica: "Jesús dice que el buen pastor «su vida da por las ovejas».", apoyo: "El buen pastor «su vida da por las ovejas»", ref: "Juan 10:11" },
              { texto: "Cuando viene el peligro, el asalariado se queda a cuidar a las ovejas.", verdad: false, explica: "El buen pastor se queda cuando viene el peligro; el asalariado huye.", apoyo: "El buen pastor se queda cuando viene el peligro; el asalariado huye", ref: "Juan 10:12" },
              { texto: "El asalariado conoce los números, pero no los nombres de las ovejas.", verdad: true, explica: "El buen pastor conoce a sus ovejas por su nombre; el asalariado solo conoce los números.", apoyo: "El buen pastor conoce a sus ovejas por su nombre; el asalariado solo conoce los números" },
            ],
          },
          {
            consigna: "Sobre el buen pastor y el asalariado: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús dice que al asalariado no le importan las ovejas.", verdad: true, explica: "El asalariado huye, «y no le importan las ovejas».", apoyo: "mientras que el asalariado huye, «y no le importan las ovejas»", ref: "Juan 10:13" },
              { texto: "El buen pastor se sirve del rebaño para su propio provecho.", verdad: false, explica: "El buen pastor sirve al rebaño; el que se sirve del rebaño es el asalariado.", apoyo: "El buen pastor sirve al rebaño; el asalariado se sirve del rebaño" },
              { texto: "Si una oveja falta, al buen pastor no le importa mientras queden las demás.", verdad: false, explica: "El buen pastor busca a la que falta; al asalariado no le importa.", apoyo: "El buen pastor busca a la que falta; al asalariado no le importa" },
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
            apoyo: "Para que nadie quede sin cuidado, arma un mapa del rebaño",
            ref: "Proverbios 27:23",
            titulo: "Nadie sabía que estaba enferma",
            relato: [
              "Eres pastor de una iglesia de unas noventa personas. Un domingo te enteras de que la hermana Elvira pasó dos meses enferma en su casa, y nadie de la iglesia lo supo.",
              "Te duele, y decides que no vuelva a pasar: con tus líderes vas a armar un mapa del rebaño.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Por dónde empiezas el mapa?",
                opciones: [
                  { texto: "Por una lista de los miembros y de los que asisten, con su teléfono y dirección.", bien: true, explica: "Así empieza el mapa: una lista de todos los miembros y de los que asisten, con su teléfono y su dirección." },
                  { texto: "Por un anuncio en el culto: que cada uno avise a la oficina cuando se enferme.", explica: "Avisar ayuda, pero muchos no avisan: el mapa empieza con una lista de todos los miembros y de los que asisten." },
                  { texto: "Por una lista de los que vienen todos los domingos, que son los que ya conoces bien.", explica: "La lista lleva a todos, también a los que asisten poco: así nadie queda sin cuidado." },
                ],
                apoyo: "Hacer una lista de todos los miembros y de los que asisten, con su teléfono y su dirección",
                explica: "El mapa del rebaño empieza con una lista de todos los miembros y de los que asisten, con su teléfono y su dirección.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya tienes la lista. ¿Cómo te aseguras de que nadie quede fuera?",
                opciones: [
                  { texto: "Asignas a cada persona a un grupo o a un líder que la cuide.", bien: true, explica: "Así nadie queda fuera: cada persona tiene un grupo o un líder que la cuida." },
                  { texto: "Pides en el culto que todos se cuiden entre todos, sin dar nombres.", explica: "Si nadie tiene nombres a su cargo, muchos quedan fuera: cada persona se asigna a un grupo o a un líder." },
                  { texto: "Te quedas tú con la lista y atiendes a los que te vienen a buscar.", explica: "Los que no buscan ayuda quedarían fuera: el mapa asigna a cada persona a un grupo o a un líder que la cuide." },
                ],
                apoyo: "Asignar a cada persona a un grupo o a un líder que la cuide, para que nadie quede fuera",
                explica: "El mapa asigna a cada persona a un grupo o a un líder que la cuide, para que nadie quede fuera.",
              },
              {
                tipo: "situacion",
                pregunta: "¿A quiénes marcas en el mapa como los que necesitan más cuidado?",
                opciones: [
                  { texto: "A los enfermos, los ancianos, los nuevos, los que están en duelo o en crisis y los que dejaron de venir.", bien: true, explica: "Ellos necesitan más cuidado: los enfermos, los ancianos, los nuevos, los que están en duelo o en crisis y los que dejaron de venir." },
                  { texto: "A los que más sirven y a los que nunca faltan, porque son los que sostienen la obra de toda la iglesia.", explica: "Los que sirven también necesitan cuidado, pero el mapa marca a los que más lo necesitan: enfermos, ancianos, nuevos, en duelo o en crisis y los que dejaron de venir." },
                  { texto: "A los que dan las ofrendas más grandes y a los líderes, porque de ellos depende que la iglesia siga adelante.", explica: "El mapa no mira las ofrendas: marca a los enfermos, los ancianos, los nuevos, los que están en duelo o en crisis y los que dejaron de venir." },
                ],
                apoyo: "Marcar a los que necesitan más cuidado: los enfermos, los ancianos, los nuevos, los que están en duelo o en crisis y los que dejaron de venir",
                explica: "El mapa marca a los que necesitan más cuidado: los enfermos, los ancianos, los nuevos, los que están en duelo o en crisis y los que dejaron de venir.",
              },
              {
                tipo: "situacion",
                pregunta: "Un líder te pide la lista para mandarla al chat de toda la iglesia, para que todos oren. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que los datos solo los ven quienes cuidan a esas personas, y nunca sin permiso.", bien: true, explica: "Así se guardan los datos del rebaño: solo los ven quienes cuidan a esas personas, y nunca se comparten sin permiso." },
                  { texto: "Que sí, porque así toda la iglesia sabe quién está enfermo y puede orar por él.", explica: "Orar es bueno, pero los datos solo los ven quienes cuidan a esas personas: conocer a las ovejas no es un archivo de chismes." },
                  { texto: "Que sí, pero que les pida a todos en el chat que no la reenvíen a nadie de afuera.", explica: "Aunque no la reenvíen, los datos se compartirían sin permiso: solo los ven quienes cuidan a esas personas." },
                ],
                apoyo: "Guarda los datos del rebaño con cuidado: solo los ven quienes cuidan a esas personas, y nunca se comparten sin permiso",
                explica: "Conocer a las ovejas es un privilegio, no un archivo de chismes: los datos solo los ven quienes cuidan a esas personas.",
              },
              {
                tipo: "explica",
                apoyo: "Anotar las fechas importantes: los cumpleaños, los aniversarios de duelo y los nacimientos",
                clave: {
                  id: "pr-pastoral-4-1-a5-1",
                  tipo: "corta",
                  pregunta: "¿Qué más anotarás en el mapa del rebaño, y cada cuánto lo revisarás con tus líderes?",
                  ideas: [
                    { id: "fechas", peso: 50, texto: "Las fechas importantes: los cumpleaños, los aniversarios de duelo y los nacimientos.", formas: ["fechas importantes", "cumpleanos", "aniversario*", "nacimiento*", "fechas de (duelo|nacimiento|cumpleanos)"] },
                    { id: "revisar", peso: 50, texto: "Revisarlo cada mes con los líderes y orar por cada nombre.", formas: ["cada mes", "una vez al mes", "todos los meses", "mensual*", "(orar|orare|oraremos|oramos|orando) por cada (nombre|uno|persona)", "por cada nombre"] },
                  ],
                  errores: [
                    { id: "anual", texto: "El mapa se revisa cada mes, no una vez al año.", formas: ["cada ano", "una vez al ano", "anualmente"], anula: "revisar" },
                  ],
                  modelo: "Anotaré las fechas importantes: los cumpleaños, los aniversarios de duelo y los nacimientos. Y revisaré el mapa cada mes con mis líderes, orando por cada nombre.",
                },
              },
            ],
          },
          {
            apoyo: "Conocer a las ovejas es un privilegio, no un archivo de chismes",
            ref: "Juan 10:14",
            titulo: "La iglesia creció",
            relato: [
              "En dos años, tu iglesia pasó de cuarenta a ciento veinte personas. Ya no conoces a todos, y algunas familias nuevas se fueron sin que nadie lo notara.",
              "En la reunión de líderes deciden armar un mapa del rebaño.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A quiénes pones en la lista del mapa?",
                opciones: [
                  { texto: "A todos los miembros y a los que asisten, con su teléfono y su dirección.", bien: true, explica: "La lista lleva a todos los miembros y a los que asisten, con su teléfono y su dirección." },
                  { texto: "Solo a los miembros bautizados, porque los demás todavía no son de la iglesia.", explica: "Para que nadie quede fuera, la lista lleva también a los que asisten." },
                  { texto: "Solo a los que sirven en algún ministerio, porque son los más fieles de todos.", explica: "El mapa es para que nadie quede sin cuidado: lleva a todos los miembros y a los que asisten." },
                ],
                apoyo: "Hacer una lista de todos los miembros y de los que asisten, con su teléfono y su dirección",
                explica: "El mapa empieza con una lista de todos los miembros y de los que asisten, con su teléfono y su dirección.",
              },
              {
                tipo: "situacion",
                pregunta: "Una familia nueva todavía no está en ningún grupo. ¿Qué haces?",
                opciones: [
                  { texto: "La asignas desde ya a un grupo o a un líder que la cuide.", bien: true, explica: "Cada persona tiene un grupo o un líder que la cuida, para que nadie quede fuera." },
                  { texto: "Esperas a que ella misma escoja un grupo cuando se sienta lista.", explica: "Mientras espera, nadie la cuida: el mapa asigna a cada persona a un grupo o a un líder." },
                  { texto: "La dejas fuera del mapa hasta que se haga miembro de la iglesia.", explica: "Los nuevos son de los que necesitan más cuidado, no de los que quedan fuera." },
                ],
                apoyo: "Asignar a cada persona a un grupo o a un líder que la cuide, para que nadie quede fuera",
                explica: "El mapa asigna a cada persona a un grupo o a un líder que la cuide, y marca a los nuevos entre los que necesitan más cuidado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué fechas importantes anotas en el mapa?",
                opciones: [
                  { texto: "Los cumpleaños, los aniversarios de duelo y los nacimientos.", bien: true, explica: "Son las fechas importantes que se anotan en el mapa del rebaño." },
                  { texto: "Solo los cumpleaños, porque los duelos es mejor no recordarlos.", explica: "También se anotan los aniversarios de duelo y los nacimientos." },
                  { texto: "Solo el día en que cada familia llegó por primera vez a la iglesia.", explica: "Las fechas importantes son los cumpleaños, los aniversarios de duelo y los nacimientos." },
                ],
                apoyo: "Anotar las fechas importantes: los cumpleaños, los aniversarios de duelo y los nacimientos",
                explica: "En el mapa se anotan las fechas importantes: los cumpleaños, los aniversarios de duelo y los nacimientos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cada cuánto revisan el mapa, y cómo?",
                opciones: [
                  { texto: "Cada mes, con los líderes, y oran por cada nombre.", bien: true, explica: "El mapa se revisa cada mes con los líderes, y se ora por cada nombre." },
                  { texto: "Una vez al año, en la asamblea, leyendo la lista en voz alta.", explica: "El mapa se revisa cada mes con los líderes, y sus datos no se leen ante todos." },
                  { texto: "Solo cuando alguien se queja de que nadie lo ha visitado.", explica: "Si se espera una queja, ya es tarde: el mapa se revisa cada mes con los líderes." },
                ],
                apoyo: "Revisar el mapa cada mes con los líderes y orar por cada nombre",
                explica: "El mapa se revisa cada mes con los líderes, orando por cada nombre.",
              },
              {
                tipo: "explica",
                apoyo: "Guarda los datos del rebaño con cuidado: solo los ven quienes cuidan a esas personas, y nunca se comparten sin permiso",
                clave: {
                  id: "pr-pastoral-4-1-a5-2",
                  tipo: "corta",
                  pregunta: "¿Para qué sirve el mapa del rebaño, y cómo se cuidan los datos que guarda?",
                  ideas: [
                    { id: "nadie", peso: 50, texto: "Para que nadie quede sin cuidado: cada persona tiene un líder, y los que necesitan más atención quedan marcados.", formas: ["nadie (quede|queda|quedara|se)", "(un|su) lider que (la|lo|las|los) cuid*", "cada (persona|uno|familia) (con|tiene|tenga) (un|su) lider", "necesitan mas (cuidado|atencion)", "quede fuera"] },
                    { id: "datos", peso: 50, negativa: true, texto: "Los datos solo los ven quienes cuidan a esas personas, y nunca se comparten sin permiso.", formas: ["solo (los|las|lo) (ven|vean|conocen|saben)", "quienes (los|las|la|lo) cuidan", "(los|las) que (los|las|la|lo) cuidan", "sin permiso", "(nunca|no|jamas) se (comparten|comparte|publican|pasan|reenvian|dan)", "privilegio", "chisme*"] },
                  ],
                  errores: [
                    { id: "compartir", texto: "Los datos del rebaño solo los ven quienes cuidan a esas personas.", formas: ["(compartir*|comparti*|mandar*|enviar*|publicar*|pasar*) (la|los) (lista|datos) (a|con) (toda|todos)", "(se|los|la) (comparten|compartimos|publicamos|mandamos|pasamos) (a|con) (toda|todos)", "toda la iglesia (los|la|las) (vea|ve|vean|conozca|conozcan)"], anula: "datos" },
                  ],
                  modelo: "Sirve para que nadie quede sin cuidado: cada persona tiene un líder que la cuida, y se marcan los que necesitan más atención. Los datos solo los ven quienes cuidan a esas personas, y nunca se comparten sin permiso.",
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
            apoyo: "El pastor imita a Dios, que busca a sus ovejas, y es diligente en conocer el estado de cada una",
            ref: "Juan 10:14",
            clave: {
              id: "pr-pastoral-4-1-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué el pastor no se conforma con predicar, sino que conoce y visita a cada una de sus ovejas?",
              ideas: [
                { id: "jesus", peso: 35, texto: "Jesús, el buen pastor, es el modelo: conoce a sus ovejas, y ellas lo conocen a él.", formas: ["conoce a sus ovejas", "conozco mis ovejas", "las mias me conocen", "jesus (las|nos|a) conoce", "(jesus|cristo) (es|como) (el|nuestro) (modelo|buen)", "el buen pastor (conoce|las)"] },
                { id: "dios", peso: 30, texto: "El pastor imita a Dios, el pastor que busca a sus ovejas.", formas: ["imit*", "dios (busca|mismo|va)", "(busca|buscar|buscaba) a sus ovejas", "busca sus ovejas", "pastor que busca"] },
                { id: "estado", peso: 35, texto: "Debe ser diligente en conocer el estado de cada oveja, y eso pide tiempo, visitas y un oído atento.", formas: ["estado de (cada|sus|las|tus)", "diligen*", "oido atento", "su necesidad", "por su nombre", "(tiempo|visitas) y (visitas|tiempo|escuch*|oido)", "como (esta|estan) (cada|sus|las)"] },
              ],
              modelo: "Porque Jesús, el buen pastor, es el modelo: conoce a sus ovejas y ellas lo conocen. El pastor imita a Dios, que busca a sus ovejas, y es diligente en conocer el estado de cada una, con tiempo, visitas y un oído atento.",
            },
          },
          {
            apoyo: "Un pastor puede predicar a cientos de personas y no conocer a ninguna",
            ref: "Proverbios 27:23",
            clave: {
              id: "pr-pastoral-4-1-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Al pastor le basta con predicar bien; no necesita conocer a cada oveja. ¿Qué le respondes?",
              ideas: [
                { id: "nombre", peso: 35, texto: "Que la Biblia pide conocer a cada oveja por su nombre y por su necesidad.", formas: ["por su nombre", "su necesidad", "sus necesidades", "(sus|los) nombres"] },
                { id: "jesus", peso: 30, texto: "Que Jesús, el buen pastor, conoce a sus ovejas, y las ovejas no siguen a un pastor que no conocen.", formas: ["conoce a sus ovejas", "conozco mis ovejas", "las mias me conocen", "no (siguen|sigue|seguiran) a un pastor", "pastor que no conocen", "(jesus|cristo) (es|como) (el|nuestro) (modelo|buen)"] },
                { id: "estado", peso: 35, texto: "Que hay que ser diligente en conocer el estado de las ovejas, y eso pide tiempo, visitas y un oído atento.", formas: ["estado de (cada|sus|las|tus)", "diligen*", "oido atento", "visitas"] },
              ],
              errores: [
                { id: "basta", texto: "Predicar no basta: la Biblia pide conocer a cada oveja por su nombre y por su necesidad.", formas: ["tiene razon", "basta con predicar", "(le|nos) basta con"], anula: "nombre" },
              ],
              modelo: "Le respondo que no basta con predicar: la Biblia pide conocer a cada oveja por su nombre y por su necesidad. Jesús conoce a sus ovejas, y el pastor debe ser diligente en conocer su estado, con tiempo, visitas y un oído atento.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La visita en el hogar
    "pastoral-4-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué ve el pastor en una visita que no vería desde el púlpito?", reverso: "La casa, la familia, las fotos en la pared y las cargas que no se cuentan.", apoyo: "En una visita, el pastor ve lo que nunca vería desde el púlpito" },
              { frente: "¿Cómo enseñó Pablo, según Hechos 20:20?", reverso: "Públicamente y por las casas.", apoyo: "Pablo enseñó «públicamente y por las casas»" },
              { frente: "¿Qué hizo Jesús con Zaqueo?", reverso: "Se invitó a su casa, y esa visita le cambió la vida.", apoyo: "Jesús mismo se invitó a la casa de Zaqueo" },
              { frente: "¿Qué es la visita, según la lección?", reverso: "El evangelio con tiempo y con cariño.", apoyo: "La visita es el evangelio con tiempo y con cariño" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo cuidaba Pablo a los creyentes, según 1 Tesalonicenses 2:7?", reverso: "Como la nodriza que cuida con ternura a sus hijos.", apoyo: "Pablo cuidaba a los creyentes «como la nodriza que cuida con ternura a sus propios hijos»" },
              { frente: "Además del evangelio, ¿qué quería entregarles Pablo?", reverso: "Su propia vida.", apoyo: "«no sólo el evangelio de Dios, sino también nuestras propias vidas»" },
              { frente: "Según la lección, ¿qué va junto con la enseñanza desde el púlpito?", reverso: "La visita a las casas.", apoyo: "La enseñanza desde el púlpito y la visita a las casas van juntas" },
              { frente: "A veces, ¿qué es lo que más predica en una visita?", reverso: "Una bolsa de comida o una mano para arreglar algo.", apoyo: "A veces lo que más predica es una bolsa de comida o una mano para arreglar algo" },
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
            consigna: "Une cada pasaje con lo que enseña sobre la visita a las casas.",
            pares: [
              ["Hechos 20:20", "Pablo enseñó en público y también por las casas"],
              ["Lucas 19:5-6", "Jesús se invitó a la casa de Zaqueo"],
              ["1 Tesalonicenses 2:7-8", "Pablo cuidó a los creyentes como una nodriza"],
              ["Romanos 12:13", "Compartir para las necesidades de los santos"],
            ],
            apoyo: "Pablo enseñó públicamente y por las casas, y Jesús entró en la casa de Zaqueo",
            explica: "Pablo enseñó públicamente y por las casas (Hechos 20:20); Jesús se invitó a la casa de Zaqueo (Lucas 19:5-6); Pablo cuidaba a los creyentes como la nodriza a sus hijos (1 Tesalonicenses 2:7-8); y la visita abre la puerta a la ayuda (Romanos 12:13).",
          },
          {
            consigna: "Une a cada uno con lo que dice de él la lección sobre la visita.",
            pares: [
              ["Jesús", "Se invitó él mismo a una casa"],
              ["Zaqueo", "Recibió gozoso a Jesús en su casa"],
              ["Pablo", "Quiso entregar el evangelio y también su propia vida"],
              ["Una nodriza", "Cuida con ternura a sus propios hijos"],
            ],
            apoyo: "Esa visita le cambió la vida",
            ref: "Lucas 19:5-6",
            explica: "Jesús se invitó a la casa de Zaqueo, y Zaqueo lo recibió gozoso. Pablo cuidaba a los creyentes como la nodriza que cuida con ternura a sus hijos, y quería entregarles el evangelio y también su propia vida.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se prepara una visita pastoral, o así no se prepara? Lleva cada frase a su grupo.",
            grupos: ["Así se prepara", "Así no se prepara"],
            frases: [
              { texto: "Tener un propósito claro para la visita", grupo: 0 },
              { texto: "Llamar antes y acordar el día y la hora", grupo: 0 },
              { texto: "Ir de a dos", grupo: 0 },
              { texto: "Orar antes de llegar por la persona", grupo: 0 },
              { texto: "Llegar sin avisar, a la hora que se pueda", grupo: 1, explica: "Se llama antes y se acuerda el día y la hora." },
              { texto: "Ir solo a la casa de una persona del otro sexo", grupo: 1, explica: "Se va de a dos, y nunca solo a la casa de una persona del otro sexo." },
              { texto: "Ir solo a la casa de un menor", grupo: 1, explica: "Nunca se va solo a la casa de un menor." },
              { texto: "Ir para cobrarle a la familia el diezmo", grupo: 1, explica: "La visita no se usa para cobrar diezmos ni para pedir favores." },
            ],
            apoyo: "Se prepara con un propósito, una llamada previa y oración, y se hace de a dos, con prudencia",
            explica: "La visita se prepara con un propósito, una llamada previa para acordar el día y la hora, y oración, y se hace de a dos: nunca solo a la casa de una persona del otro sexo ni a la de un menor. Y no se usa para cobrar diezmos.",
          },
          {
            consigna: "¿Esta visita está bien planeada o mal planeada? Lleva cada frase a su grupo.",
            grupos: ["Bien planeada", "Mal planeada"],
            frases: [
              { texto: "Vas a acompañar a una familia que está en crisis", grupo: 0 },
              { texto: "Llamas el lunes y quedan para el jueves a las siete", grupo: 0 },
              { texto: "Vas con otro hermano del equipo de visitación", grupo: 0 },
              { texto: "Antes de tocar la puerta, oran por la familia", grupo: 0 },
              { texto: "Vas sin saber para qué, solo por cumplir", grupo: 1, explica: "La visita tiene un propósito: conocer, acompañar, celebrar o animar." },
              { texto: "Vas solo a ver a un joven de quince años en su casa", grupo: 1, explica: "Nunca se va solo a la casa de un menor." },
              { texto: "Aprovechas para pedirle a la familia que te preste su auto", grupo: 1, explica: "La visita no se usa para pedir favores." },
              { texto: "Llegas de sorpresa un domingo en la noche", grupo: 1, explica: "Se llama antes y se acuerda el día y la hora." },
            ],
            apoyo: "Tener un propósito: conocer a una familia nueva, acompañar una crisis, celebrar un nacimiento o animar a alguien que se alejó",
            explica: "Una visita bien planeada tiene un propósito, se acuerda antes por teléfono, se hace de a dos y empieza con oración. Ir sin propósito, solo a la casa de un menor, para pedir favores o sin avisar es una visita mal planeada.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano del equipo de visitación te dice: Esta tarde paso solo a ver a la hermana Rosa, que vive sola. No hace falta avisarle.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que vaya con otro hermano, y que la llame antes para acordar el día.", bien: true, explica: "La visita se hace de a dos, nunca solo a la casa de una persona del otro sexo, y se llama antes para acordar el día y la hora." },
              { texto: "Que está bien: una visita de sorpresa muestra más cariño que una avisada.", explica: "Antes de ir se llama y se acuerda el día y la hora." },
              { texto: "Que vaya solo, pero que se quede poco rato para que nadie hable de él.", explica: "Se va de a dos, y nunca solo a la casa de una persona del otro sexo." },
              { texto: "Que mejor no la visite, porque las visitas a las casas traen problemas.", explica: "La visita pastoral es el evangelio con tiempo y con cariño: se hace con prudencia, no se deja." },
            ],
            apoyo: "Ir de a dos, y nunca solo a la casa de una persona del otro sexo ni a la de un menor",
            explica: "La visita se prepara con una llamada previa para acordar el día y la hora, y se hace de a dos: nunca solo a la casa de una persona del otro sexo ni a la de un menor.",
          },
          {
            caso: "Una hermana del equipo de visitación te dice: Quiero visitar a los Méndez, pero no sé bien para qué. ¿Voy y ya veo qué pasa?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que vaya con un propósito, como conocerlos o acompañar una crisis.", bien: true, explica: "Antes de ir se tiene un propósito: conocer a una familia nueva, acompañar una crisis, celebrar un nacimiento o animar a alguien que se alejó." },
              { texto: "Que vaya y vea qué pasa, porque en las visitas lo mejor es improvisar.", explica: "La visita se prepara con un propósito, una llamada previa y oración." },
              { texto: "Que aproveche la visita para recordarles los diezmos que no han dado.", explica: "La visita no se usa para cobrar diezmos ni para pedir favores." },
              { texto: "Que no vaya hasta que ellos mismos le pidan una visita a la iglesia.", explica: "El pastor y su equipo visitan: la enseñanza desde el púlpito y la visita a las casas van juntas." },
            ],
            apoyo: "Tener un propósito: conocer a una familia nueva, acompañar una crisis, celebrar un nacimiento o animar a alguien que se alejó",
            explica: "La visita se prepara con un propósito, una llamada previa y oración. Un propósito claro puede ser conocer a una familia nueva, acompañar una crisis, celebrar un nacimiento o animar a alguien que se alejó.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos de una visita pastoral, como en el ejemplo resuelto de la lección, del primero al último.",
            pasos: [
              "Saludar, agradecer que los reciban y conversar de la vida de la familia",
              "Escuchar más que hablar: cómo están de verdad y qué necesitan",
              "Leer un pasaje breve que responda a lo que escucharon",
              "Orar por cada persona de la casa, por su nombre",
              "Ofrecer ayuda práctica y acordar el siguiente paso",
              "Despedirse a tiempo: de veinte a treinta minutos suelen bastar",
            ],
            apoyo: "En la casa se escucha más de lo que se habla, se lee un pasaje breve, se ora por cada persona, se ofrece ayuda y se acuerda el siguiente paso",
            ref: "Hechos 20:20",
            explica: "Primero se saluda y se conversa; después se escucha más de lo que se habla, se lee un pasaje breve que responda a lo escuchado, se ora por cada persona, se ofrece ayuda, se acuerda el siguiente paso y uno se despide a tiempo.",
          },
          {
            consigna: "Visitas a los Herrera. Ordena lo que haces, como en el ejemplo de la lección, desde que llegas hasta después de irte.",
            pasos: [
              "Agradeces que te reciban y conversas de la familia",
              "Preguntas cómo están de verdad, y escuchas",
              "Lees un salmo breve que responda a lo que oíste",
              "Oras por cada uno de la casa, por su nombre",
              "Te despides a los veinte o treinta minutos",
              "Anotas con discreción y avisas al líder de su grupo",
            ],
            apoyo: "Después, anotar con discreción lo que haya que recordar y avisar al líder de su grupo",
            explica: "Se saluda y se conversa, se escucha, se lee un pasaje breve que responda a lo escuchado, se ora por cada uno, uno se despide a tiempo y, después, se anota con discreción y se avisa al líder de su grupo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La visita pastoral es el evangelio con tiempo y con cariño",
            ref: "Romanos 12:13",
            situacion: "Con otro hermano del equipo vas a visitar a la familia Peña, como quedaron por teléfono: el sábado a las cuatro. El señor Peña perdió su trabajo hace un mes.",
            escenas: [
              {
                id: "e1",
                narra: "La señora Peña los recibe y los hace pasar a la sala.",
                pregunta: "¿Cómo empiezan la visita?",
                opciones: [
                  { texto: "Saludan, agradecen que los reciban y conversan de la familia.", valor: 2, explica: "Así empieza la visita: saludar, agradecer que los reciban y conversar de la vida de la familia.", siguiente: "e2" },
                  { texto: "Saludan y enseguida preguntan qué necesitan, sin más conversación.", valor: 1, explica: "Preguntar qué necesitan está bien, pero primero se saluda, se agradece y se conversa de la vida de la familia.", siguiente: "e2" },
                  { texto: "Abren la Biblia de una vez y empiezan a predicarles un sermón largo.", valor: 0, explica: "En la casa se escucha más de lo que se habla: la visita no es un sermón.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "A los diez minutos de sermón, el señor Peña mira el reloj y no dice nada.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Paran, le preguntan cómo están de verdad y lo escuchan.", valor: 2, explica: "En la visita se escucha más de lo que se habla: se pregunta cómo están de verdad y qué necesitan.", siguiente: "e2" },
                  { texto: "Siguen hasta el final, porque la Palabra es lo más importante de todo.", valor: 0, explica: "La Palabra importa, pero en la visita se lee un pasaje breve que responda a lo que escucharon.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El señor Peña cuenta que se siente avergonzado por no tener trabajo.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Lo escuchan, y le leen un salmo breve que responda a lo que oyeron.", valor: 2, explica: "Se escucha más de lo que se habla, y se lee un pasaje breve que responda a lo que escucharon, como un salmo." },
                  { texto: "Le dan una lista larga de consejos para que consiga trabajo muy pronto.", valor: 1, explica: "Ayudar vale, pero primero se escucha más de lo que se habla y se lee un pasaje que responda a lo que escucharon." },
                  { texto: "Le dicen que, si tuviera un poco más de fe, ya tendría un trabajo nuevo.", valor: 0, explica: "La visita es el evangelio con tiempo y con cariño: se escucha y se lee un pasaje que responda a lo que escucharon." },
                ],
              },
              {
                id: "e3",
                narra: "Ya oraron por cada uno, por su nombre. La señora Peña cuenta que esta semana no tienen comida.",
                pregunta: "¿Qué hacen antes de irse?",
                opciones: [
                  { texto: "Ofrecen ayuda práctica, acuerdan el siguiente paso y se despiden a tiempo.", valor: 2, explica: "Se ofrece ayuda práctica si hace falta y se acuerda el siguiente paso: a veces lo que más predica es una bolsa de comida." },
                  { texto: "Les prometen orar por esa necesidad, y se despiden de ellos enseguida.", valor: 1, explica: "Orar es bueno, pero la visita también abre la puerta a la ayuda: compartir para las necesidades de los santos." },
                  { texto: "Al salir, cuentan su necesidad en el chat de la iglesia, con todos los detalles.", valor: 0, explica: "Después se anota con discreción lo que haya que recordar y se avisa al líder de su grupo; no se cuenta a todos." },
                ],
              },
            ],
          },
          {
            apoyo: "En la casa se escucha más de lo que se habla",
            ref: "1 Tesalonicenses 2:7-8",
            situacion: "Los Salinas llegaron a la iglesia hace un mes. Con otro hermano del equipo vas a visitarlos el martes a las siete, como acordaron por teléfono, para conocerlos.",
            escenas: [
              {
                id: "e1",
                narra: "Llegan puntuales, y los Salinas los reciben con café.",
                pregunta: "¿De qué hablan primero?",
                opciones: [
                  { texto: "De la vida de la familia: de dónde vienen, sus hijos y su trabajo.", valor: 2, explica: "Así empieza la visita: se agradece que los reciban y se conversa de la vida de la familia.", siguiente: "e2" },
                  { texto: "De los horarios y los ministerios de la iglesia, para que se unan pronto.", valor: 1, explica: "Contarles de la iglesia está bien, pero primero se conversa de la vida de la familia.", siguiente: "e2" },
                  { texto: "De todo lo que tú has hecho por la iglesia en todos estos años.", valor: 0, explica: "En la casa se escucha más de lo que se habla: la visita es para conocerlos a ellos.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Notas que llevas media hora hablando de ti, y los Salinas casi no han dicho nada.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te detienes y les preguntas cómo están de verdad y qué necesitan.", valor: 2, explica: "Escuchar más que hablar: preguntar cómo están de verdad y qué necesitan.", siguiente: "e2" },
                  { texto: "Sigues con tus historias, porque así ellos te conocen mucho mejor.", valor: 0, explica: "La visita es para escuchar: en la casa se escucha más de lo que se habla.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "La señora Salinas cuenta, con lágrimas, que su mamá murió hace poco en su país.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La escuchas, y lees un pasaje breve que responda a lo que contó.", valor: 2, explica: "Se escucha más de lo que se habla, y se lee un pasaje breve que responda a lo que escucharon." },
                  { texto: "Oras por ella enseguida, sin dejarla terminar de contar lo que pasó.", valor: 1, explica: "Orar es parte de la visita, pero primero se escucha más de lo que se habla." },
                  { texto: "Le cuentas con todo detalle cómo fue la muerte de tu propia mamá.", valor: 0, explica: "En la casa se escucha más de lo que se habla: la visita es para escucharla a ella." },
                ],
              },
              {
                id: "e3",
                narra: "Ya pasaron veinticinco minutos.",
                pregunta: "¿Cómo terminan la visita?",
                opciones: [
                  { texto: "Oran por cada uno por su nombre, acuerdan el siguiente paso y se van.", valor: 2, explica: "Se ora por cada persona de la casa, por su nombre, se acuerda el siguiente paso y uno se despide a tiempo." },
                  { texto: "Oran por cada uno, y se quedan otra hora más porque están muy a gusto.", valor: 1, explica: "Orar por cada uno está bien, pero uno se despide a tiempo: de veinte a treinta minutos suelen bastar." },
                  { texto: "Se van sin orar ni acordar nada, para no quitarles más de su tiempo.", valor: 0, explica: "Antes de irse se ora por cada persona, por su nombre, y se acuerda el siguiente paso." },
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
            apoyo: "La visita pastoral es el evangelio con tiempo y con cariño",
            ref: "Hechos 20:20",
            clave: {
              id: "pr-pastoral-4-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la visita pastoral a las casas tiene valor bíblico? Usa ejemplos de la lección.",
              ideas: [
                { id: "pablo", peso: 35, texto: "Pablo enseñó públicamente y por las casas: el púlpito y la visita van juntos.", formas: ["por las casas", "publicamente", "en publico", "van juntas", "van juntos", "de casa en casa"] },
                { id: "zaqueo", peso: 30, texto: "Jesús se invitó a la casa de Zaqueo, y esa visita le cambió la vida.", formas: ["zaqueo", "se invito", "cambio la vida", "cambio su vida"] },
                { id: "evangelio", peso: 35, texto: "La visita es el evangelio con tiempo y con cariño, como Pablo, que cuidaba a los creyentes como una nodriza.", formas: ["tiempo y (con|carino)", "con carino", "carino", "nodriza", "ternura", "(propias|propia) (vidas|vida)"] },
              ],
              modelo: "Porque Pablo enseñó públicamente y por las casas, y Jesús se invitó a la casa de Zaqueo y le cambió la vida. La visita es el evangelio con tiempo y con cariño, como la nodriza que cuida con ternura a sus hijos.",
            },
          },
          {
            apoyo: "La enseñanza desde el púlpito y la visita a las casas van juntas",
            ref: "Lucas 19:5-6",
            clave: {
              id: "pr-pastoral-4-2-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Si el pastor predica bien el domingo, no hace falta que visite las casas. ¿Qué le respondes con la Biblia?",
              ideas: [
                { id: "juntas", peso: 40, texto: "Que la enseñanza desde el púlpito y la visita a las casas van juntas: Pablo enseñó públicamente y por las casas.", formas: ["van juntas", "van juntos", "por las casas", "publicamente", "en publico y", "de casa en casa"] },
                { id: "zaqueo", peso: 30, texto: "Que Jesús entró en la casa de Zaqueo, y esa visita le cambió la vida.", formas: ["zaqueo", "se invito", "cambio la vida", "cambio su vida"] },
                { id: "ve", peso: 30, texto: "Que en la casa el pastor ve lo que nunca vería desde el púlpito: la familia y las cargas que no se cuentan el domingo.", formas: ["cargas", "nunca veria", "no veria", "no se cuentan", "las fotos"] },
              ],
              errores: [
                { id: "basta", texto: "La enseñanza desde el púlpito y la visita a las casas van juntas.", formas: ["tiene razon", "basta con predicar"], anula: "juntas" },
              ],
              modelo: "Le respondo que no basta con predicar: la enseñanza desde el púlpito y la visita a las casas van juntas, como enseñó Pablo. Jesús entró en la casa de Zaqueo y le cambió la vida, y en una casa el pastor ve cargas que no se cuentan el domingo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Los enfermos y los que se mueren
    "pastoral-4-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le recuerda al enfermo la visita del pastor?", reverso: "Que no está solo y que Dios no lo olvidó.", apoyo: "la visita del pastor le recuerda al enfermo que no está solo y que Dios no lo olvidó" },
              { frente: "En Mateo 25, ¿cómo cuenta Jesús la visita al enfermo?", reverso: "Como hecha a él mismo.", apoyo: "Jesús cuenta la visita al enfermo como hecha a él mismo" },
              { frente: "Según Santiago 5:14, ¿a quiénes llama el creyente enfermo?", reverso: "A los ancianos de la iglesia, para que oren por él.", apoyo: "Llame a los ancianos de la iglesia, y oren por él" },
              { frente: "¿Qué promete Santiago sobre la oración de fe?", reverso: "Que salvará al enfermo, y el Señor lo levantará.", apoyo: "Y promete: «la oración de fe salvará al enfermo, y el Señor lo levantará»" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según la declaración de fe del ministerio, ¿sana Dios hoy?", reverso: "Sí: Dios sana hoy en respuesta a la oración de fe.", apoyo: "La declaración de fe del ministerio enseña que Dios sana hoy en respuesta a la oración de fe" },
              { frente: "Según la declaración de fe, ¿con qué se ministra la sanidad?", reverso: "Con la oración y la unción con aceite.", apoyo: "que la sanidad se ministra con la oración y la unción con aceite" },
              { frente: "¿Se opone buscar la sanidad de Dios a recibir atención médica?", reverso: "No: buscar la sanidad de Dios no se opone a la atención médica.", apoyo: "buscar la sanidad de Dios no se opone a recibir atención médica" },
              { frente: "Después de orar con fe por un enfermo, ¿qué hace el pastor con el resultado?", reverso: "Lo deja en las manos de Dios.", apoyo: "El pastor ora con fe y deja el resultado en las manos de Dios" },
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
            consigna: "Santiago dice qué hacer cuando un creyente está enfermo. ¿Qué hacen los ancianos por él? Toca las palabras que lo dicen.",
            texto: "Llame a los ancianos de la iglesia, y [[oren por él]], [[ungiéndole con aceite]] en el nombre del Señor",
            apoyo: "Santiago pide llamar a los ancianos para que oren con fe y unjan con aceite",
            ref: "Santiago 5:14",
            explica: "Santiago pide que el enfermo llame a los ancianos de la iglesia, y que ellos oren por él, ungiéndole con aceite en el nombre del Señor.",
          },
          {
            consigna: "¿Qué salvará al enfermo, según la promesa de Santiago? Toca las palabras que lo dicen.",
            texto: "la [[oración de fe]] salvará al enfermo, y el Señor lo levantará",
            apoyo: "El pastor ora con fe y deja el resultado en las manos de Dios",
            ref: "Santiago 5:15",
            explica: "Santiago promete que la oración de fe salvará al enfermo, y el Señor lo levantará. Por eso el pastor ora con fe y deja el resultado en las manos de Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que pide Santiago 5 y lo que enseña la declaración de fe: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Santiago pide que el enfermo llame a los ancianos de la iglesia para que oren por él.", verdad: true, explica: "Santiago pide llamar a los ancianos para que oren con fe y unjan con aceite.", apoyo: "Santiago pide llamar a los ancianos para que oren con fe y unjan con aceite", ref: "Santiago 5:14" },
              { texto: "La declaración de fe del ministerio enseña que Dios ya no sana hoy.", verdad: false, explica: "La declaración de fe enseña que Dios sana hoy en respuesta a la oración de fe.", apoyo: "La declaración de fe del ministerio enseña que Dios sana hoy en respuesta a la oración de fe" },
              { texto: "Según la declaración de fe, la sanidad se ministra con la oración y la unción con aceite.", verdad: true, explica: "Así lo enseña la declaración de fe del ministerio (artículo 11).", apoyo: "que la sanidad se ministra con la oración y la unción con aceite" },
            ],
          },
          {
            consigna: "Sobre la sanidad y la gracia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Según la declaración de fe, quien busca la sanidad de Dios no debe ir al médico.", verdad: false, explica: "La declaración de fe enseña que buscar la sanidad de Dios no se opone a recibir atención médica.", apoyo: "buscar la sanidad de Dios no se opone a recibir atención médica" },
              { texto: "El pastor ora con fe y deja el resultado en las manos de Dios.", verdad: true, explica: "Así lo enseña la lección: ora con fe y deja el resultado en las manos de Dios.", apoyo: "El pastor ora con fe y deja el resultado en las manos de Dios", ref: "Santiago 5:15" },
              { texto: "Cuando la sanidad no llega, también falta la gracia de Dios.", verdad: false, explica: "Cuando la sanidad no llega, la gracia sí: «Bástate mi gracia; porque mi poder se perfecciona en la debilidad».", apoyo: "Cuando la sanidad no llega, la gracia sí", ref: "2 Corintios 12:9" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la visita al hospital tiene un error. Tócala.",
            frases: [
              "Pregunta en la recepción o a la enfermera si puedes pasar.",
              "Lávate las manos al entrar y al salir.",
              "Siéntate en la cama del enfermo para estar más cerca de él.",
              "Sé breve: de diez a quince minutos, o menos si está cansado.",
            ],
            malo: 2,
            correccion: "No te sientes en la cama ni toques los aparatos, y no des consejos médicos.",
            apoyo: "No te sientes en la cama ni toques los aparatos, y no des consejos médicos",
            explica: "En el hospital el pastor respeta las reglas: no se sienta en la cama ni toca los aparatos, y no da consejos médicos.",
          },
          {
            consigna: "Una de estas frases sobre cómo visitar a un enfermo en el hospital tiene un error. Tócala.",
            frases: [
              "Toca a la puerta, preséntate y pregunta si es buen momento.",
              "Respeta los avisos de aislamiento.",
              "Quédate por lo menos una hora, aunque la persona esté cansada.",
              "Lee un pasaje breve, como el Salmo 23, y ora con fe.",
              "Cuida también a la familia que espera en el pasillo.",
            ],
            malo: 2,
            correccion: "Sé breve: de diez a quince minutos, o menos si la persona está cansada.",
            apoyo: "Sé breve: de diez a quince minutos, o menos si la persona está cansada",
            explica: "La visita al hospital es breve: de diez a quince minutos, o menos si la persona está cansada.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu célula te dice: Voy a visitar a don Tito en el hospital. Le voy a decir que deje sus medicinas y que confíe solo en Dios.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que no dé consejos médicos: buscar la sanidad no se opone a los médicos.", bien: true, explica: "En el hospital no se dan consejos médicos, y la declaración de fe enseña que buscar la sanidad de Dios no se opone a recibir atención médica." },
              { texto: "Que está bien, porque tomar medicinas muestra que a don Tito le falta fe.", explica: "La declaración de fe enseña que buscar la sanidad de Dios no se opone a recibir atención médica." },
              { texto: "Que se lo diga, pero en voz baja, para que la enfermera no lo escuche.", explica: "En el hospital no se dan consejos médicos, ni en voz alta ni en voz baja." },
              { texto: "Que mejor no ore por sanidad, para no darle a don Tito falsas esperanzas.", explica: "No se promete una sanidad que Dios no prometió, pero tampoco se quita la esperanza: se ora con fe." },
            ],
            apoyo: "buscar la sanidad de Dios no se opone a recibir atención médica",
            explica: "En el hospital no se dan consejos médicos. La declaración de fe enseña que buscar la sanidad de Dios no se opone a recibir atención médica: se ora con fe y se deja el resultado en las manos de Dios.",
          },
          {
            caso: "La enfermera de la recepción te dice: Solo pueden pasar los familiares, y el paciente tiene un aviso de aislamiento.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Le dices que eres su pastor, y respetas lo que te pida y el aislamiento.", bien: true, explica: "El hospital protege la privacidad del paciente y puede pedirte que te identifiques como su pastor; y los avisos de aislamiento se respetan." },
              { texto: "Entras igual, porque un pastor tiene derecho a ver a su gente cuando quiera.", explica: "Se pregunta en la recepción o a la enfermera si se puede pasar, y se respetan sus reglas." },
              { texto: "Le pides a un familiar el número del cuarto y entras sin que te vean.", explica: "El hospital protege la privacidad del paciente: se pregunta si se puede pasar y se siguen sus reglas." },
              { texto: "Te vas molesto, y le dices a la familia que el hospital no te deja orar.", explica: "Se puede preguntar si te dejan pasar como su pastor, y se respetan los avisos de aislamiento sin quejarse." },
            ],
            apoyo: "el hospital protege la privacidad del paciente y puede pedirte que te identifiques como su pastor",
            explica: "Se pregunta en la recepción o a la enfermera si se puede pasar: el hospital protege la privacidad del paciente y puede pedirte que te identifiques como su pastor. Y se respetan los avisos de aislamiento.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Junto a quien se muere, lee las promesas de Jesús y acompaña",
            ref: "Juan 14:1-3",
            situacion: "Don Aurelio, un hermano de ochenta años de tu iglesia, entró en cuidados paliativos (hospice) en su casa. Su familia te pidió que lo acompañes.",
            escenas: [
              {
                id: "e1",
                narra: "Los médicos dicen que a don Aurelio le quedan pocas semanas.",
                pregunta: "¿Cómo organizas tus visitas?",
                opciones: [
                  { texto: "Lo visitas más seguido y te coordinas con el capellán o el equipo médico.", valor: 2, explica: "Si la persona entra en cuidados paliativos, se la visita más seguido y se coordina con el capellán o con el equipo médico.", siguiente: "e2" },
                  { texto: "Lo dejas en la lista del equipo de visitación, una vez al mes, como a todos.", valor: 1, explica: "Visitarlo está bien, pero en cuidados paliativos se lo visita más seguido.", siguiente: "e2" },
                  { texto: "Dejas que lo cuide el equipo médico, porque ya no hay mucho que hacer.", valor: 0, explica: "El pastor no deja de ir: en cuidados paliativos visita más seguido y acompaña con amor.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Una semana después, su esposa te llama: Don Aurelio pregunta por usted.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vas pronto, y desde ese día lo visitas más seguido.", valor: 2, explica: "En cuidados paliativos se visita más seguido, y se acompaña con amor.", siguiente: "e2" },
                  { texto: "Le dices que estás ocupado y que irás cuando puedas.", valor: 0, explica: "Si la persona entra en cuidados paliativos, visítala más seguido.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la cocina, su hija te pregunta en voz baja: ¿Usted cree que Dios lo va a sanar?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que oran juntos con fe, y dejan el resultado en las manos de Dios.", valor: 2, explica: "No prometas una sanidad que Dios no prometió, ni quites la esperanza: ora con fe y acompaña con amor." },
                  { texto: "Que sí: le prometes que se va a sanar si la familia tiene bastante fe.", valor: 0, explica: "No se promete una sanidad que Dios no prometió." },
                  { texto: "Que no: ya no hay esperanza, y no tiene sentido orar por su sanidad.", valor: 0, explica: "No se quita la esperanza: se ora con fe y se acompaña con amor." },
                ],
              },
              {
                id: "e3",
                narra: "Entras al cuarto. Don Aurelio está despierto y muy débil.",
                pregunta: "¿Qué haces junto a él?",
                opciones: [
                  { texto: "Le lees las promesas de Jesús, oras con él y le recuerdas el evangelio.", valor: 2, explica: "Junto a quien se está muriendo, el pastor lee las promesas de Jesús, ora y le recuerda el evangelio." },
                  { texto: "Oras por él un momento, y sales sin leerle nada de la Biblia ni hablarle.", valor: 1, explica: "Orar está bien, pero junto a quien se muere el pastor también lee las promesas de Jesús y le recuerda el evangelio." },
                  { texto: "Le das tu opinión sobre las medicinas que le están dando los médicos.", valor: 0, explica: "El pastor no da consejos médicos: lee las promesas de Jesús, ora y acompaña." },
                ],
              },
            ],
          },
          {
            apoyo: "No prometas una sanidad que Dios no prometió, ni quites la esperanza: ora con fe y acompaña con amor",
            ref: "2 Corintios 12:9",
            situacion: "Daniela, una joven de tu iglesia, tuvo un accidente y está grave en el hospital. Su mamá te llama llorando.",
            escenas: [
              {
                id: "e1",
                narra: "Llegas al hospital. La familia de Daniela espera en el pasillo de cuidados intensivos.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Te acercas a la familia, la escuchas y oras con ellos en el pasillo.", valor: 2, explica: "Cuida también a la familia que espera en el pasillo: escucha y ora con ellos.", siguiente: "e2" },
                  { texto: "Preguntas por su cuarto y entras a verla, sin hablar antes con la familia.", valor: 1, explica: "Visitar a la enferma está bien, pero se cuida también a la familia que espera en el pasillo.", siguiente: "e2" },
                  { texto: "Les das tu opinión sobre lo que deberían hacer los médicos con ella.", valor: 0, explica: "El pastor no da consejos médicos: escucha, ora y acompaña a la familia.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El papá de Daniela te responde, molesto: Pastor, los médicos saben lo que hacen.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides perdón, y te quedas a escucharlos y a orar con ellos.", valor: 2, explica: "El pastor no da consejos médicos: acompaña con amor a la familia, escucha y ora.", siguiente: "e2" },
                  { texto: "Insistes en tu opinión, porque estás seguro de que tienes la razón.", valor: 0, explica: "No des consejos médicos: el pastor escucha, ora y acompaña.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "La enfermera te deja pasar unos minutos. Daniela está despierta y tiene miedo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lees un pasaje breve, como el Salmo 23, y oras con fe por ella.", valor: 2, explica: "En el hospital se escucha, se lee un pasaje breve, como el Salmo 23, y se ora con fe." },
                  { texto: "Oras con fe por ella, pero te quedas casi una hora junto a su cama.", valor: 1, explica: "Orar con fe está bien, pero la visita es breve: de diez a quince minutos, o menos si la persona está cansada." },
                  { texto: "Le prometes que mañana mismo va a salir sana del hospital.", valor: 0, explica: "No prometas una sanidad que Dios no prometió: ora con fe y acompaña con amor." },
                ],
              },
              {
                id: "e3",
                narra: "Al salir, su mamá te pregunta: Pastor, ¿y ahora qué hacemos?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que seguirán orando con fe, y que tú y la iglesia los acompañarán.", valor: 2, explica: "Ora con fe y acompaña con amor: sin prometer una sanidad que Dios no prometió y sin quitar la esperanza." },
                  { texto: "Que oren mucho, y que te llamen si pasa algo con Daniela.", valor: 1, explica: "Orar está bien, pero el pastor también acompaña con amor a la familia." },
                  { texto: "Que se preparen para lo peor, porque ya no queda ninguna esperanza.", valor: 0, explica: "No quites la esperanza: ora con fe y acompaña con amor." },
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
            apoyo: "Junto a quien se está muriendo, el pastor lee las promesas de Jesús",
            ref: "Juan 14:1-3",
            clave: {
              id: "pr-pastoral-4-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo acompaña el pastor a quien se está muriendo, y qué hace con su familia?",
              ideas: [
                { id: "promesas", peso: 40, texto: "Le lee las promesas de Jesús, como Juan 14, y le recuerda el evangelio.", formas: ["promesas", "juan 14", "no se turbe", "evangelio"] },
                { id: "ora", peso: 30, texto: "Ora con él y, si la familia lo desea, canta en voz baja.", formas: ["(ora|orar|oro|oramos|orando|oraria|orare)", "canta*", "en voz baja"] },
                { id: "familia", peso: 30, texto: "Acompaña a los suyos: cuida también a su familia.", formas: ["acompan* (a|de) (la|su|los|sus) (familia|suyos|familiares|seres)", "a los suyos", "(cuida|cuidar|cuido|cuidaria) (a|de) (la|su) familia", "(con|a) (la|su) familia", "sus familiares"] },
              ],
              modelo: "Junto a quien se está muriendo, el pastor lee las promesas de Jesús, como Juan 14, ora con él y le recuerda el evangelio. Si la familia lo desea, canta en voz baja, y acompaña también a los suyos.",
            },
          },
          {
            apoyo: "Si la persona entra en cuidados paliativos (hospice), visítala más seguido y coordina con el capellán o con el equipo médico",
            ref: "2 Corintios 12:9",
            clave: {
              id: "pr-pastoral-4-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano de tu iglesia entró en cuidados paliativos (hospice). ¿Qué harás como su pastor, y qué cuidarás al hablar de sanidad?",
              ideas: [
                { id: "seguido", peso: 40, texto: "Visitarlo más seguido y coordinar con el capellán o con el equipo médico.", formas: ["mas seguido", "mas a menudo", "con mas frecuencia", "mas veces", "coordin*", "capellan", "equipo medico"] },
                { id: "prometer", peso: 30, negativa: true, texto: "No prometer una sanidad que Dios no prometió, ni quitar la esperanza.", formas: ["(no|nunca|sin) (prometer*|prometo)", "(no|nunca) (le|les) (prometer*|prometo)", "(no|ni|sin) quit* (la|su) esperanza", "(no|ni) (le|les) quit*", "falsas promesas"] },
                { id: "fe", peso: 30, texto: "Orar con fe y acompañar con amor.", formas: ["(ora|orar|orare|oraria|oro|oraremos) con fe", "con fe", "acompan* con amor", "con amor"] },
              ],
              errores: [
                { id: "promesa", texto: "No se promete una sanidad que Dios no prometió.", formas: ["(prometo|prometi|aseguro|asegure) que (se|va|sanara|sana|dios|lo)", "(le|les) (prometo|prometi|aseguro) (que|una|la)"], anula: "prometer" },
              ],
              modelo: "Lo visitaré más seguido y me coordinaré con el capellán o con el equipo médico. No le prometeré una sanidad que Dios no prometió, ni le quitaré la esperanza: oraré con fe y lo acompañaré con amor.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Los ancianos, los presos y los que están solos
    "pastoral-4-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Si la iglesia no va a ver a las ovejas que no pueden llegar, ¿qué les pasa?", reverso: "Se quedan solas.", apoyo: "Si la iglesia no va, se quedan solos" },
              { frente: "Según Santiago 1:27, ¿a quiénes visita la fe verdadera?", reverso: "A los huérfanos y a las viudas en sus tribulaciones.", apoyo: "La fe verdadera también se mide en visitas" },
              { frente: "¿Qué manda Dios en Levítico 19:32 sobre el anciano?", reverso: "Levantarse delante de las canas y honrar su rostro.", apoyo: "«Delante de las canas te levantarás, y honrarás el rostro del anciano»" },
              { frente: "¿Cuándo responde la iglesia a la oración del anciano del Salmo 71?", reverso: "Cuando no olvida a sus mayores.", apoyo: "La iglesia responde a esa oración cuando no olvida a sus mayores" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo pide Hebreos 13:3 que nos acordemos de los presos?", reverso: "Como si estuviéramos presos juntamente con ellos.", apoyo: "«Acordaos de los presos, como si estuvierais presos juntamente con ellos»" },
              { frente: "En Mateo 25, ¿qué dice Jesús de sí mismo sobre la cárcel?", reverso: "Que estuvo en la cárcel, y fueron a verlo.", apoyo: "Jesús lo dice de sí mismo: «en la cárcel, y vinisteis a mí»" },
              { frente: "¿Qué hizo Onesíforo cuando Pablo estaba preso?", reverso: "Lo confortó muchas veces y no se avergonzó de sus cadenas.", apoyo: "Onesíforo visitó a Pablo cuando estaba preso" },
              { frente: "¿Qué son para Dios los que están solos?", reverso: "Una prioridad.", apoyo: "Los que están solos son prioridad para Dios" },
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
            consigna: "Une cada pasaje con lo que manda o enseña sobre los que no pueden venir.",
            pares: [
              ["Santiago 1:27", "Visitar a los huérfanos y a las viudas"],
              ["Levítico 19:32", "Honrar el rostro del anciano"],
              ["Salmos 71:9", "El anciano pide no ser desechado en su vejez"],
              ["Hebreos 13:3", "Acordarse de los presos"],
              ["2 Timoteo 1:16", "Onesíforo no se avergonzó de las cadenas de Pablo"],
            ],
            apoyo: "La religión pura visita a los huérfanos y a las viudas, honra a los ancianos y se acuerda de los presos, porque lo que se hace por ellos se hace por Cristo",
            explica: "La religión pura visita a los huérfanos y a las viudas (Santiago 1:27), honra a los ancianos (Levítico 19:32), escucha la oración del anciano (Salmos 71:9) y se acuerda de los presos (Hebreos 13:3), como Onesíforo con Pablo (2 Timoteo 1:16).",
          },
          {
            consigna: "Une a cada uno con lo que dice de él la lección.",
            pares: [
              ["Onesíforo", "Muchas veces confortó a Pablo, que estaba preso"],
              ["Jesús", "Cuenta como hecho a él lo que se hace por el preso"],
              ["El anciano del Salmo 71", "Ora para que Dios no lo deseche en la vejez"],
              ["La iglesia", "Responde a esa oración cuando no olvida a sus mayores"],
            ],
            apoyo: "Y el anciano ora: «No me deseches en el tiempo de la vejez»",
            ref: "Salmos 71:9",
            explica: "Onesíforo confortó muchas veces a Pablo preso; Jesús dice de sí mismo: «en la cárcel, y vinisteis a mí»; el anciano ora para que Dios no lo deseche en la vejez, y la iglesia responde a esa oración cuando no olvida a sus mayores.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se cuida a los que no salen de casa, o así no se los cuida? Lleva cada frase a su grupo.",
            grupos: ["Así se los cuida", "Así no se los cuida"],
            frases: [
              { texto: "Un calendario para que cada uno reciba al menos una visita al mes", grupo: 0 },
              { texto: "Llevarles la Santa Cena con un diácono", grupo: 0 },
              { texto: "Llevarles la grabación del culto o ayudarlos a verlo en línea", grupo: 0 },
              { texto: "Llamarlos por teléfono entre visita y visita", grupo: 0 },
              { texto: "Visitarlos solo cuando alguien se acuerda de ellos", grupo: 1, explica: "Un calendario de visitas hace que cada uno reciba al menos una al mes." },
              { texto: "Esperar a que vuelvan al templo para darles la Santa Cena", grupo: 1, explica: "A los que no salen de casa se les lleva la Santa Cena con un diácono." },
              { texto: "Ir al asilo a cualquier hora, sin avisar en la recepción", grupo: 1, explica: "En el asilo se avisa en la recepción y se siguen sus horarios." },
              { texto: "Dejar de llamarlos porque ya no vienen a la iglesia", grupo: 1, explica: "Entre visita y visita se los llama por teléfono." },
            ],
            apoyo: "La iglesia arma un calendario para que los que no salen de casa reciban visitas, la Santa Cena y el culto, y visita los asilos según sus reglas",
            explica: "La iglesia arma un calendario para que cada uno reciba al menos una visita al mes, les lleva la Santa Cena con un diácono y el culto, los llama entre visita y visita y visita los asilos según sus reglas.",
          },
          {
            consigna: "¿La iglesia cuida bien a doña Amparo, que ya no puede salir de su casa, o no la cuida bien? Lleva cada frase a su grupo.",
            grupos: ["La cuida bien", "No la cuida bien"],
            frases: [
              { texto: "Según el calendario, alguien la visita cada mes", grupo: 0 },
              { texto: "Un hermano la llama por teléfono entre visita y visita", grupo: 0 },
              { texto: "Le ayudan a ver el culto en línea los domingos", grupo: 0 },
              { texto: "Visitan también a su hija, que la cuida día y noche", grupo: 0, explica: "Quien atiende a un familiar enfermo o anciano también necesita que lo visiten." },
              { texto: "Hace un año que nadie la visita", grupo: 1, explica: "Un calendario de visitas hace que cada uno reciba al menos una al mes." },
              { texto: "Le dicen que la Santa Cena es solo para los que van al templo", grupo: 1, explica: "A los que no salen de casa se les lleva la Santa Cena." },
              { texto: "Nadie se acuerda de llamarla desde que dejó de venir", grupo: 1, explica: "Entre visita y visita se los llama por teléfono." },
            ],
            apoyo: "Y cuida a los que cuidan: quien atiende a un familiar enfermo o anciano también necesita que lo visiten",
            explica: "A doña Amparo la cuidan las visitas de cada mes, las llamadas entre visita y visita, el culto en línea y la visita a su hija, que la cuida. Dejarla sin visitas, sin la Santa Cena o sin llamadas es dejarla sola.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se cuida a los que no salen de casa.",
            texto: "Cada uno de los que no salen de casa recibe al menos una [[visita]] al [[mes]], y entre una y otra lo [[llaman]] por teléfono.",
            distractores: ["multa", "año", "regañan"],
            errores: {
              multa: "Lo que recibe cada uno es una visita.",
              "año": "El calendario es para que cada uno reciba al menos una visita al mes.",
              "regañan": "Entre una visita y otra se los llama por teléfono para acompañarlos.",
            },
            apoyo: "Un calendario de visitas, para que cada uno reciba al menos una al mes",
            explica: "La iglesia arma un calendario de visitas para que cada uno reciba al menos una al mes, y entre visita y visita los llama por teléfono.",
          },
          {
            consigna: "Completa cómo se hacen estas visitas, según la lección.",
            texto: "A los que viven en un [[asilo]] o en un centro de cuidado se los visita avisando en la [[recepción]] y siguiendo sus [[horarios]].",
            distractores: ["mercado", "calle", "caprichos"],
            errores: {
              mercado: "Se visita también a los que viven en un asilo o en un centro de cuidado.",
              calle: "Al llegar al asilo se avisa en la recepción.",
              caprichos: "En el asilo se siguen sus horarios.",
            },
            apoyo: "Visitar también a los que viven en un asilo o en un centro de cuidado, avisando en la recepción y siguiendo sus horarios",
            explica: "La iglesia visita también a los que viven en un asilo o en un centro de cuidado, avisando en la recepción y siguiendo sus horarios.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El ministerio en la cárcel se hace con el permiso, la capacitación y las reglas de cada lugar, y acompaña también a las familias y a quien sale libre",
            ref: "Hebreos 13:3",
            titulo: "Raúl está en la cárcel del condado",
            relato: [
              "Raúl, un joven de tu iglesia, está preso en la cárcel del condado. Su esposa y sus dos hijos siguen viniendo al culto, pero se ven muy solos.",
              "Quieres empezar a visitarlo, y también formar un pequeño equipo para visitar la cárcel.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero para empezar a visitarlo?",
                opciones: [
                  { texto: "Averiguas las reglas: el registro, la revisión de antecedentes y la capacitación.", bien: true, explica: "Las cárceles del condado y las prisiones del estado suelen pedir que los voluntarios se registren, pasen una revisión de antecedentes y reciban una capacitación." },
                  { texto: "Vas el domingo a la cárcel con tu Biblia y pides pasar a verlo porque eres su pastor.", explica: "Primero se averiguan las reglas: cada lugar suele pedir un registro, una revisión de antecedentes y una capacitación." },
                  { texto: "Esperas a que salga, porque mientras esté preso no se puede hacer nada por él.", explica: "La Biblia manda: «Acordaos de los presos, como si estuvierais presos juntamente con ellos»." },
                ],
                apoyo: "Averiguar las reglas: las cárceles del condado y las prisiones del estado suelen pedir que los voluntarios se registren, pasen una revisión de antecedentes y reciban una capacitación",
                explica: "El ministerio en la cárcel empieza por averiguar las reglas de cada lugar: el registro, la revisión de antecedentes y la capacitación.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya te registraste. ¿Con quién coordinas las visitas?",
                opciones: [
                  { texto: "Con el capellán, y sigues sus reglas al pie de la letra.", bien: true, explica: "Se coordina con el capellán y se siguen sus reglas al pie de la letra." },
                  { texto: "Con un guardia conocido, que te deja entrar cuando tú quieras.", explica: "Las visitas se coordinan con el capellán, siguiendo sus reglas al pie de la letra." },
                  { texto: "Con nadie: un pastor no necesita pedir permiso para visitar a su gente.", explica: "El ministerio en la cárcel se hace con el permiso, la capacitación y las reglas de cada lugar." },
                ],
                apoyo: "Coordinar con el capellán y seguir sus reglas al pie de la letra",
                explica: "Las visitas a la cárcel se coordinan con el capellán, y sus reglas se siguen al pie de la letra.",
              },
              {
                tipo: "situacion",
                pregunta: "En la visita, Raúl te pide que la próxima vez le lleves una carta de su esposa y unos dulces. ¿Qué haces?",
                opciones: [
                  { texto: "Le explicas que no puedes llevar ni recibir nada sin permiso.", bien: true, explica: "En la cárcel no se lleva ni se recibe nada sin permiso." },
                  { texto: "Se los llevas escondidos en tu Biblia, porque es un acto de amor.", explica: "No se lleva ni se recibe nada sin permiso, aunque sea con buena intención." },
                  { texto: "Se los llevas sin decirle nada al capellán, para no molestarlo.", explica: "Se coordina con el capellán, y no se lleva nada sin permiso." },
                ],
                apoyo: "El ministerio en la cárcel se hace con el permiso, la capacitación y las reglas de cada lugar",
                explica: "En la cárcel no se lleva ni se recibe nada sin permiso: se siguen las reglas de cada lugar.",
              },
              {
                tipo: "situacion",
                pregunta: "La esposa de Raúl te pregunta si puedes conseguir que lo suelten antes. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que no puedes hacer promesas legales, pero que la iglesia los acompañará.", bien: true, explica: "No se hacen promesas legales; y se visita también a las familias de los presos, que muchas veces quedan solas." },
                  { texto: "Que sí: le prometes que hablarás con el juez y que Raúl saldrá muy pronto.", explica: "En el ministerio en la cárcel no se hacen promesas legales." },
                  { texto: "Que eso no es asunto de la iglesia, y que lo resuelva ella como pueda.", explica: "La iglesia acompaña también a las familias de los presos, que muchas veces quedan solas." },
                ],
                apoyo: "No llevar ni recibir nada sin permiso, y no hacer promesas legales",
                explica: "El pastor no hace promesas legales, pero acompaña a la familia del preso, que muchas veces queda sola.",
              },
              {
                tipo: "explica",
                apoyo: "Acompañar al preso cuando salga: la vuelta a la vida y a la iglesia también necesita un pastor",
                clave: {
                  id: "pr-pastoral-4-4-a5-1",
                  tipo: "corta",
                  pregunta: "Raúl saldrá libre en unos meses. ¿Qué hará la iglesia con él y con su familia?",
                  ideas: [
                    { id: "familia", peso: 50, texto: "Visitar y acompañar también a su familia, que muchas veces queda sola.", formas: ["(su|la|sus) familia*", "su esposa", "sus hijos", "(quedan|queda) (solas|solos|sola|solo)"] },
                    { id: "salga", peso: 50, texto: "Acompañarlo cuando salga: la vuelta a la vida y a la iglesia también necesita un pastor.", formas: ["(acompan*|apoy*|recib*|ayud*) cuando (salga|lo|le)", "cuando salga (lo|le) (acompan*|apoy*|recib*|ayud*)", "(acompan*|apoy*|recib*|ayud*) al salir", "(vuelta|volver|regreso|regresar|vuelva|regrese) a la (vida|iglesia)"] },
                  ],
                  modelo: "Mientras esté preso, visitaremos también a su esposa y a sus hijos, que muchas veces quedan solos. Y cuando salga libre, lo acompañaremos en su vuelta a la vida y a la iglesia, porque eso también necesita un pastor.",
                },
              },
            ],
          },
          {
            apoyo: "Forma un equipo para estas visitas: hay hermanos que no predican, pero tienen el don de acompañar",
            ref: "2 Timoteo 1:16",
            titulo: "Un equipo para la prisión del estado",
            relato: [
              "Tres hermanos de tu iglesia quieren visitar la prisión del estado. Uno de ellos, Samuel, no predica, pero tiene el don de acompañar.",
              "Además, el hijo de la hermana Gloria está preso allí, y ella no sabe cómo seguir.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Samuel te dice: Yo no sé predicar; mejor no voy. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que hay hermanos que no predican, pero tienen el don de acompañar.", bien: true, explica: "Para estas visitas se forma un equipo: hay hermanos que no predican, pero tienen el don de acompañar." },
                  { texto: "Que tiene razón: a la prisión solo deben ir los que predican muy bien.", explica: "Hay hermanos que no predican, pero tienen el don de acompañar." },
                  { texto: "Que vaya, pero que primero aprenda a predicar un sermón completo.", explica: "Su don es acompañar, y eso es lo que más hace falta en estas visitas." },
                ],
                apoyo: "Forma un equipo para estas visitas: hay hermanos que no predican, pero tienen el don de acompañar",
                explica: "El equipo para visitar la cárcel no es solo de predicadores: hay hermanos que tienen el don de acompañar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué deben hacer los tres antes de la primera visita?",
                opciones: [
                  { texto: "Registrarse, pasar la revisión de antecedentes y recibir la capacitación.", bien: true, explica: "Las prisiones del estado suelen pedir que los voluntarios se registren, pasen una revisión de antecedentes y reciban una capacitación." },
                  { texto: "Nada especial: basta con llegar con la Biblia y decir que son de una iglesia.", explica: "Primero se averiguan las reglas: registro, revisión de antecedentes y capacitación." },
                  { texto: "Pedirle a un guardia conocido que los deje pasar sin registrarse.", explica: "El ministerio en la cárcel se hace con el permiso, la capacitación y las reglas de cada lugar." },
                ],
                apoyo: "Averiguar las reglas: las cárceles del condado y las prisiones del estado suelen pedir que los voluntarios se registren, pasen una revisión de antecedentes y reciban una capacitación",
                explica: "Antes de visitar, los voluntarios se registran, pasan una revisión de antecedentes y reciben una capacitación.",
              },
              {
                tipo: "situacion",
                pregunta: "La hermana Gloria se siente sola desde que su hijo está preso. ¿Qué hace el equipo?",
                opciones: [
                  { texto: "La visita también a ella: las familias de los presos muchas veces quedan solas.", bien: true, explica: "Se visita a los presos de la iglesia y también a sus familias, que muchas veces quedan solas." },
                  { texto: "Visita solo al preso, porque la familia no es parte del ministerio en la cárcel.", explica: "El ministerio en la cárcel acompaña también a las familias." },
                  { texto: "Le pide que no hable de su hijo en la iglesia, para que nadie haga comentarios.", explica: "Las familias de los presos muchas veces quedan solas: se las visita y se las acompaña." },
                ],
                apoyo: "Visitar a los presos de la iglesia y también a sus familias, que muchas veces quedan solas",
                explica: "El equipo visita a los presos de la iglesia y también a sus familias, que muchas veces quedan solas.",
              },
              {
                tipo: "situacion",
                pregunta: "En una visita, un preso les pide que reciban un paquete y se lo den a su hermano afuera. ¿Qué hacen?",
                opciones: [
                  { texto: "No reciben nada sin permiso, y siguen las reglas del capellán.", bien: true, explica: "En la cárcel no se lleva ni se recibe nada sin permiso, y se siguen las reglas del capellán al pie de la letra." },
                  { texto: "Lo reciben, porque negarse sería una falta de amor hacia el preso.", explica: "No se lleva ni se recibe nada sin permiso, aunque parezca un favor." },
                  { texto: "Lo reciben, pero lo revisan ellos mismos antes de entregarlo.", explica: "No se recibe nada sin permiso: se siguen las reglas del capellán." },
                ],
                apoyo: "No llevar ni recibir nada sin permiso, y no hacer promesas legales",
                explica: "El equipo no lleva ni recibe nada sin permiso, y sigue al pie de la letra las reglas del capellán.",
              },
              {
                tipo: "explica",
                apoyo: "Coordinar con el capellán y seguir sus reglas al pie de la letra",
                clave: {
                  id: "pr-pastoral-4-4-a5-2",
                  tipo: "corta",
                  pregunta: "Escribe tres reglas de prudencia que el equipo debe seguir para visitar la prisión.",
                  ideas: [
                    { id: "registro", peso: 35, texto: "Registrarse, pasar la revisión de antecedentes y recibir la capacitación.", formas: ["registr*", "antecedentes", "capacita*"] },
                    { id: "capellan", peso: 30, texto: "Coordinar con el capellán y seguir sus reglas al pie de la letra.", formas: ["capellan", "al pie de la letra", "(sus|las) reglas"] },
                    { id: "nada", peso: 35, negativa: true, texto: "No llevar ni recibir nada sin permiso, y no hacer promesas legales.", formas: ["(no|nunca|ni) (llevar|recibir|llevamos|recibimos|lleven|reciban|llevan|reciben|llevaremos|recibiremos)", "nada sin permiso", "(no|ni|nunca) (hacer|hagan|haremos) promesas", "sin permiso"] },
                  ],
                  errores: [
                    { id: "promesas", texto: "No se hacen promesas legales, ni se lleva o recibe nada sin permiso.", formas: ["(hacer|hagan|hacemos|haremos) promesas legales", "(llevar|llevarle|llevamos|llevaremos) (lo|todo) que (pida|pidan|nos)"], anula: "nada" },
                  ],
                  modelo: "Primero, registrarse, pasar la revisión de antecedentes y recibir la capacitación. Segundo, coordinar con el capellán y seguir sus reglas al pie de la letra. Tercero, no llevar ni recibir nada sin permiso, y no hacer promesas legales.",
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
            apoyo: "La religión pura visita a los huérfanos y a las viudas, honra a los ancianos y se acuerda de los presos",
            ref: "Santiago 1:27",
            clave: {
              id: "pr-pastoral-4-4-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué la iglesia visita a los ancianos, a los que no salen de casa y a los presos?",
              ideas: [
                { id: "pura", peso: 35, texto: "La fe verdadera, la religión pura, visita a los huérfanos y a las viudas: los que están solos son prioridad para Dios.", formas: ["religion pura", "fe verdadera", "huerfanos", "viudas", "prioridad", "(estan|quedan|estarian|quedarian) solos", "se quedan solos", "iglesia no va", "si no (vamos|va|visitamos|van)"] },
                { id: "anciano", peso: 30, texto: "Dios manda honrar al anciano, y la iglesia no olvida a sus mayores.", formas: ["honr*", "canas", "sus mayores", "nuestros mayores", "vejez"] },
                { id: "cristo", peso: 35, texto: "Lo que se hace por ellos se hace por Cristo: Jesús dice que estuvo en la cárcel y fueron a verlo.", formas: ["por cristo", "por jesus", "a cristo mismo", "(visitamos|visitar|visitan|visita) a (cristo|jesus)", "(hacemos|hace|hacen|hacer|hago) a (cristo|jesus)", "vinisteis a mi", "(estuvo|estaba|estuve) en la carcel", "(acordarse|acordarnos|acordaos|recordar) de los presos", "como si (estuvieramos|estuvierais|estuvieras|estuviera) presos"] },
              ],
              modelo: "Porque la fe verdadera visita a los huérfanos y a las viudas: los que están solos son prioridad para Dios. Dios manda honrar al anciano, y lo que hacemos por los presos y por los enfermos lo hacemos por Cristo.",
            },
          },
          {
            apoyo: "Hay ovejas que ya no pueden llegar a la iglesia",
            ref: "Hebreos 13:3",
            clave: {
              id: "pr-pastoral-4-4-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Si los ancianos y los presos ya no vienen a la iglesia, no es nuestro problema. ¿Qué le respondes con la Biblia?",
              ideas: [
                { id: "solos", peso: 35, texto: "Que si la iglesia no va, se quedan solos, y los que están solos son prioridad para Dios.", formas: ["(quedan|estan|estarian|quedarian) solos", "se quedan solos", "iglesia no va", "si no (vamos|va|visitamos|van)", "prioridad", "huerfanos", "viudas", "religion pura", "fe verdadera"] },
                { id: "anciano", peso: 30, texto: "Que Dios manda honrar el rostro del anciano, y la iglesia no olvida a sus mayores.", formas: ["honr*", "canas", "sus mayores", "nuestros mayores", "vejez"] },
                { id: "presos", peso: 35, texto: "Que la Biblia manda acordarse de los presos, y lo que se hace por ellos se hace por Cristo.", formas: ["(acordarse|acordarnos|acordaos|recordar|recordarlos) de los presos", "acordarnos de ellos", "por cristo", "por jesus", "(hacemos|hace|hacen|hacer|hago) a (cristo|jesus)", "vinisteis a mi", "(estuvo|estaba|estuve) en la carcel", "como si (estuvieramos|estuvierais|estuviera) presos"] },
              ],
              errores: [
                { id: "problema", texto: "Si la iglesia no va, se quedan solos: visitarlos es parte de la fe verdadera.", formas: ["tiene razon"], anula: "solos" },
              ],
              modelo: "Le respondo que si la iglesia no va, se quedan solos, y los que están solos son prioridad para Dios. Él manda honrar al anciano y acordarse de los presos, porque lo que se hace por ellos se hace por Cristo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La oveja que se alejó
    "pastoral-4-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Se va alguien de la iglesia de un día para otro?", reverso: "No: primero falta un domingo, luego tres, y un día nadie pregunta por él.", apoyo: "Nadie se va de la iglesia de un día para otro" },
              { frente: "En la parábola, ¿hasta cuándo busca el pastor a la oveja perdida?", reverso: "Hasta encontrarla.", apoyo: "El pastor de la parábola deja las noventa y nueve «y va tras la que se perdió, hasta encontrarla»" },
              { frente: "Cuando el pastor encuentra a la oveja, ¿la regaña?", reverso: "No: la pone sobre sus hombros, gozoso.", apoyo: "Y cuando la encuentra, no la regaña: «la pone sobre sus hombros gozoso»" },
              { frente: "¿Qué tiene cada silla vacía de la iglesia?", reverso: "Un nombre.", apoyo: "Cada silla vacía tiene un nombre" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según Ezequiel 34:16, ¿qué hace Dios con la oveja perdida y con la descarriada?", reverso: "Busca la perdida y hace volver al redil la descarriada.", apoyo: "Dios hace lo que los malos pastores no hacían" },
              { frente: "Según Hebreos 10:24, ¿cómo se cuida la iglesia?", reverso: "Mutuamente: considerándose unos a otros.", apoyo: "La iglesia se cuida mutuamente" },
              { frente: "Según Santiago 5:20, ¿qué obra es buscar al que se fue?", reverso: "Una obra que salva.", apoyo: "Buscar al que se fue es una obra que salva" },
              { frente: "¿Se perdió todo el que se va de la iglesia?", reverso: "No; pero todo el que se va merece que alguien pregunte por él.", apoyo: "No todo el que se va se perdió; pero todo el que se va merece que alguien pregunte por él" },
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
            consigna: "Completa lo que hace el buen pastor de la parábola.",
            texto: "El buen pastor deja las noventa y nueve, va tras la oveja [[perdida]] hasta encontrarla, y la pone sobre sus [[hombros]] con [[gozo]].",
            distractores: ["obediente", "pies", "enojo"],
            errores: {
              obediente: "El pastor va tras la que se perdió, hasta encontrarla.",
              pies: "El pastor la pone sobre sus hombros.",
              enojo: "Cuando la encuentra, no la regaña: la carga con gozo.",
            },
            apoyo: "El buen pastor va tras la oveja que se perdió hasta encontrarla, y cuando la encuentra la carga con gozo",
            ref: "Lucas 15:4-7",
            explica: "El pastor deja las noventa y nueve y va tras la que se perdió, hasta encontrarla; y cuando la encuentra, no la regaña: «la pone sobre sus hombros gozoso».",
          },
          {
            consigna: "Completa lo que Dios hace, según Ezequiel 34:16.",
            texto: "Dios hace lo que los malos pastores no hacían: va a [[buscar]] a la oveja perdida y hace [[volver]] al [[redil]] a la descarriada.",
            distractores: ["castigar", "salir", "monte"],
            errores: {
              castigar: "Dios va a buscar a la perdida: hace lo que los malos pastores no hacían.",
              salir: "Dios hace volver al redil a la descarriada.",
              monte: "La descarriada vuelve al redil, con el rebaño.",
            },
            apoyo: "«Yo buscaré la perdida, y haré volver al redil la descarriada»",
            ref: "Ezequiel 34:16",
            explica: "Dios dice: «Yo buscaré la perdida, y haré volver al redil la descarriada». El pastor de una iglesia hace lo mismo: busca a la que falta.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Por qué se está alejando cada uno: por una herida, por una crisis o por un cambio de vida? Lleva cada frase a su grupo.",
            grupos: ["Una herida", "Una crisis", "Un cambio de vida"],
            frases: [
              { texto: "Un hermano lo ofendió en una reunión", grupo: 0 },
              { texto: "Se sintió ignorada: nadie la saludaba", grupo: 0 },
              { texto: "Le diagnosticaron una enfermedad grave", grupo: 1 },
              { texto: "Está de luto por la muerte de su esposo", grupo: 1 },
              { texto: "Perdió su trabajo hace un mes", grupo: 1 },
              { texto: "En su trabajo nuevo le toca el turno del domingo", grupo: 2 },
              { texto: "Se mudó a otra ciudad, lejos de la iglesia", grupo: 2 },
              { texto: "Ahora cuida a su abuela todos los fines de semana", grupo: 2 },
            ],
            apoyo: "Nadie se va de golpe: se aleja por una herida, una crisis, las dudas, un pecado o un cambio de vida",
            explica: "Una herida es una ofensa o sentirse ignorado; una crisis es una enfermedad, un duelo, el desempleo o un problema en la familia; y un cambio es un trabajo con un horario nuevo, una mudanza o el cuidado de un familiar.",
          },
          {
            consigna: "¿Qué lo está alejando: las dudas, un pecado que le da vergüenza o una herida? Lleva cada frase a su grupo.",
            grupos: ["Las dudas o una fe fría", "Un pecado que avergüenza", "Una herida"],
            frases: [
              { texto: "Tiene preguntas sobre la fe que nadie le ha respondido", grupo: 0 },
              { texto: "Dice que ya no siente nada cuando ora", grupo: 0 },
              { texto: "Su fe se fue enfriando poco a poco", grupo: 0 },
              { texto: "Le da vergüenza volver después de lo que hizo", grupo: 1 },
              { texto: "Teme que en la iglesia se sepa su pecado", grupo: 1 },
              { texto: "El líder del grupo se burló de él delante de todos", grupo: 2 },
              { texto: "Pidió ayuda y sintió que nadie le hizo caso", grupo: 2 },
            ],
            apoyo: "Las dudas, o una fe que se enfrió",
            explica: "Las dudas o una fe que se enfrió, un pecado que les da vergüenza y una herida, como una ofensa o sentirse ignorado, son tres de las causas por las que alguien se aleja.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "El líder de un grupo te dice: Marcos ya faltó tres domingos seguidos, pero seguro está ocupado. Mejor no lo molestamos.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo llame ya, sin reproches, para saber cómo está: nadie se va de golpe.", bien: true, explica: "Nadie se va de golpe: el líder avisa cuando alguien falta dos o tres semanas seguidas, y se lo llama sin reproches." },
              { texto: "Que tiene razón: si en unos meses no ha vuelto, entonces lo buscarán.", explica: "Si se espera meses, un día ya nadie pregunta por él: la ausencia se nota a tiempo." },
              { texto: "Que lo llame para reclamarle, así entiende que no debe faltar más a la iglesia.", explica: "Se llama sin reproches: Te extrañamos, ¿cómo estás?" },
              { texto: "Que no se preocupe: el que se va es porque nunca fue de los nuestros.", explica: "No todo el que se va se perdió, pero todo el que se va merece que alguien pregunte por él." },
            ],
            apoyo: "Notar la ausencia: el líder del grupo avisa cuando alguien falta dos o tres semanas seguidas",
            explica: "Nadie se va de golpe: la iglesia nota la ausencia a tiempo, cuando alguien falta dos o tres semanas seguidas, y llama sin reproches.",
          },
          {
            caso: "Una hermana del grupo de oración te dice: Desde que murió su esposo, doña Teresa viene cada vez menos. Este mes vino una sola vez.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Reconoces una crisis: la llamas pronto y vas a visitarla para escucharla.", bien: true, explica: "El duelo es una de las crisis que alejan a las personas: se la llama sin reproches y se la visita para escucharla." },
              { texto: "Esperas: el duelo pasa solo, y ella volverá cuando se sienta mejor.", explica: "Nadie se va de golpe: la ausencia se nota a tiempo, y la crisis se acompaña." },
              { texto: "Le mandas decir que el duelo no es excusa para dejar de congregarse.", explica: "Se llama sin reproches y se acompaña la crisis." },
              { texto: "Anuncias en el culto que doña Teresa se está apartando de la fe del Señor.", explica: "No se la expone ante todos: se la llama sin reproches y se la visita para escuchar." },
            ],
            apoyo: "Una crisis: una enfermedad, un duelo, el desempleo o un problema en la familia",
            explica: "El duelo es una de las crisis por las que alguien se aleja. La iglesia nota la ausencia a tiempo, llama sin reproches, visita para escuchar y acompaña la crisis.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para buscar a quien dejó de venir, del primero al último.",
            pasos: [
              "Notar la ausencia cuando falta dos o tres semanas seguidas",
              "Llamar sin reproches: Te extrañamos, ¿cómo estás?",
              "Visitar para escuchar qué pasó, sin interrumpir",
              "Responder a la causa: pedir perdón, acompañar o hablar con amor",
              "Invitar a volver con un paso concreto",
              "Celebrar su regreso, sin pedirle explicaciones",
            ],
            apoyo: "La iglesia nota la ausencia a tiempo, llama sin reproches, visita para escuchar, responde a la causa, invita con un paso concreto y celebra el regreso",
            ref: "Lucas 15:4-7",
            explica: "Primero se nota la ausencia a tiempo; después se llama sin reproches, se visita para escuchar, se responde a la causa, se invita con un paso concreto y se celebra el regreso.",
          },
          {
            consigna: "Julia dejó de venir hace un mes. Ordena lo que hace la iglesia, del primer paso al último.",
            pasos: [
              "Su líder nota que faltó tres semanas y avisa",
              "La llaman y le dicen: Te extrañamos, ¿cómo estás?",
              "La visitan y la escuchan contar lo que pasó",
              "Le piden perdón, porque alguien de la iglesia la ofendió",
              "La invitan a reunirse en un grupo pequeño",
              "Celebran su regreso sin hacerle dar explicaciones",
            ],
            apoyo: "Invitar a volver con un paso concreto, como reunirse en un grupo pequeño",
            explica: "Se nota la ausencia, se llama sin reproches, se visita para escuchar, se responde a la causa (aquí, pidiendo perdón porque la iglesia falló), se invita con un paso concreto y se celebra el regreso.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Si alguien se fue a otra iglesia sana, bendícelo y despídelo en paz, sin hablar mal de él ni de su nueva iglesia",
            ref: "Lucas 15:4-7",
            situacion: "La familia Vargas dejó de venir hace tres meses. Su líder te avisó tarde, y nadie los ha llamado.",
            escenas: [
              {
                id: "e1",
                narra: "Decides buscarlos hoy mismo.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Los llamas sin reproches: Los extrañamos, ¿cómo están?", valor: 2, explica: "Se llama sin reproches: Te extrañamos, ¿cómo estás?", siguiente: "e2" },
                  { texto: "Les mandas un mensaje con los horarios de todos los cultos.", valor: 1, explica: "Invitar está bien, pero primero se llama sin reproches para saber cómo están.", siguiente: "e2" },
                  { texto: "Les escribes para preguntarles por qué abandonaron la iglesia.", valor: 0, explica: "A quien dejó de venir se lo busca sin acusar: se llama sin reproches.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El señor Vargas te responde, molesto: En tres meses nadie preguntó por nosotros.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides perdón porque la iglesia falló, y le pides visitarlos.", valor: 2, explica: "Responder a la causa: pedir perdón si la iglesia falló.", siguiente: "e2" },
                  { texto: "Le contestas que ellos también podían haber avisado antes de irse.", valor: 0, explica: "A quien dejó de venir se lo busca sin acusar; y si la iglesia falló, se pide perdón.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la visita los escuchas. La mamá estuvo enferma, y ahora van a una iglesia sana cerca de su casa.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los bendices y los despides en paz, sin hablar mal de esa iglesia.", valor: 2, explica: "Si alguien se fue a otra iglesia sana, bendícelo y despídelo en paz, sin hablar mal de él ni de su nueva iglesia." },
                  { texto: "Los bendices, pero les insistes en que su lugar es en tu iglesia.", valor: 1, explica: "Bendecirlos está bien, pero se los despide en paz: no todo el que se va se perdió." },
                  { texto: "Les adviertes que en esa iglesia nunca van a crecer como en la tuya.", valor: 0, explica: "Se los despide en paz, sin hablar mal de su nueva iglesia." },
                ],
              },
              {
                id: "e3",
                narra: "De regreso a casa, piensas en lo que pasó con los Vargas.",
                pregunta: "¿Qué aprendes de esta visita?",
                opciones: [
                  { texto: "Que no todo el que se va se perdió, pero todos merecen que alguien pregunte.", valor: 2, explica: "No todo el que se va se perdió; pero todo el que se va merece que alguien pregunte por él." },
                  { texto: "Que estuvo bien ir, aunque esta vez la visita casi no sirvió de nada al final.", valor: 1, explica: "Sí sirvió: todo el que se va merece que alguien pregunte por él, aunque no vuelva." },
                  { texto: "Que fue una pérdida de tiempo, porque ellos ya no son parte de tu iglesia.", valor: 0, explica: "Todo el que se va merece que alguien pregunte por él." },
                ],
              },
            ],
          },
          {
            apoyo: "Responder a la causa: pedir perdón si la iglesia falló, acompañar la crisis o hablar con amor del pecado",
            ref: "Santiago 5:19-20",
            situacion: "Ernesto dejó de venir hace dos meses. Un amigo suyo te cuenta, preocupado, que cayó en un pecado y que le da vergüenza volver.",
            escenas: [
              {
                id: "e1",
                narra: "Decides llamar a Ernesto.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Te extrañamos, ¿cómo estás? ¿Puedo visitarte esta semana?", valor: 2, explica: "Se llama sin reproches y se ofrece una visita para escuchar.", siguiente: "e2" },
                  { texto: "Hola, ¿vienes el domingo? Te esperamos en el culto de la mañana.", valor: 1, explica: "Invitarlo está bien, pero primero se pregunta cómo está y se ofrece una visita para escuchar.", siguiente: "e2" },
                  { texto: "Ya sé lo que hiciste; tienes que venir a dar la cara.", valor: 0, explica: "A quien dejó de venir se lo busca sin acusar: se llama sin reproches.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Ernesto se queda callado y corta la llamada.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le escribes para pedirle perdón por el reproche, y le pides verlo.", valor: 2, explica: "Se busca sin acusar y con esperanza; si fallaste, pides perdón.", siguiente: "e2" },
                  { texto: "Lo dejas así: ya tuvo su oportunidad de volver a la iglesia y no quiso.", valor: 0, explica: "El buen pastor va tras la que se perdió, hasta encontrarla.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ernesto acepta tu visita y te cuenta, con vergüenza, lo que hizo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo escuchas sin interrumpir y le hablas con amor de su pecado.", valor: 2, explica: "Se visita para escuchar sin interrumpir, y se responde a la causa: hablar con amor del pecado." },
                  { texto: "Lo escuchas, pero no le hablas del pecado para no incomodarlo más.", valor: 1, explica: "Escuchar está bien, pero se responde a la causa: hablar con amor del pecado." },
                  { texto: "Le dices que, después de eso, ya no tiene lugar en la iglesia.", valor: 0, explica: "Buscar al que se fue es una obra que salva: se habla con amor del pecado y se lo invita a volver." },
                ],
              },
              {
                id: "e3",
                narra: "Al final de la visita, Ernesto te dice que quiere volver, pero no sabe cómo.",
                pregunta: "¿Qué le propones?",
                opciones: [
                  { texto: "Un paso concreto: reunirse esta semana en un grupo pequeño.", valor: 2, explica: "Se invita a volver con un paso concreto, como reunirse en un grupo pequeño." },
                  { texto: "Que vuelva algún día, cuando se sienta listo, sin ninguna prisa.", valor: 1, explica: "No presionar está bien, pero se invita a volver con un paso concreto." },
                  { texto: "Que primero pida perdón delante de toda la iglesia el domingo.", valor: 0, explica: "Se celebra su regreso, sin hacerle sentir que tiene que dar explicaciones." },
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
            apoyo: "El buen pastor va tras la oveja que se perdió hasta encontrarla",
            ref: "Lucas 15:4-7",
            clave: {
              id: "pr-pastoral-4-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué muestra la parábola de la oveja perdida sobre el corazón del pastor?",
              ideas: [
                { id: "busca", peso: 40, texto: "Que deja las noventa y nueve y va tras la que se perdió, hasta encontrarla.", formas: ["deja las (noventa|99)", "deja a las (noventa|99)", "va tras", "hasta encontrarla", "(la|las|lo) busca", "sale a buscar*", "va a buscar*", "busca a la"] },
                { id: "gozo", peso: 30, texto: "Que cuando la encuentra no la regaña: la pone sobre sus hombros, gozoso.", formas: ["hombros", "gozo*", "alegr*", "sin (reganar*|reproche*)", "no la regana"] },
                { id: "obra", peso: 30, texto: "Que buscar al que se fue es una obra que salva, como hace Dios, que busca la perdida.", formas: ["obra que salva", "salvar* (de|un) (muerte|alma)", "un alma", "dios (busca|buscara)", "buscare la perdida", "cada silla", "un nombre"] },
              ],
              modelo: "Muestra que el buen pastor deja las noventa y nueve y va tras la que se perdió, hasta encontrarla. Cuando la encuentra no la regaña: la pone sobre sus hombros con gozo. Buscar al que se fue es una obra que salva.",
            },
          },
          {
            apoyo: "pero todo el que se va merece que alguien pregunte por él",
            ref: "Santiago 5:19-20",
            clave: {
              id: "pr-pastoral-4-5-a7-2",
              tipo: "corta",
              pregunta: "Un líder dice: Si alguien se va, es su problema; todavía tenemos noventa y nueve. ¿Qué le respondes?",
              ideas: [
                { id: "busca", peso: 40, texto: "Que el buen pastor deja las noventa y nueve y va tras la que se perdió, hasta encontrarla.", formas: ["va tras", "hasta encontrarla", "deja las (noventa|99)", "deja a las (noventa|99)", "(la|lo) (busca|buscamos|buscaria)", "va a buscar*", "sale a buscar*", "busca a la"] },
                { id: "nombre", peso: 30, texto: "Que cada silla vacía tiene un nombre: todo el que se va merece que alguien pregunte por él.", formas: ["silla", "un nombre", "pregunte por", "preguntar por", "merece"] },
                { id: "obra", peso: 30, texto: "Que buscar al que se fue es una obra que salva: salvará de muerte un alma.", formas: ["obra que salva", "salva* de muerte", "un alma", "multitud de pecados"] },
              ],
              errores: [
                { id: "problema", texto: "Todo el que se va merece que alguien pregunte por él.", formas: ["tiene razon"], anula: "nombre" },
              ],
              modelo: "Le respondo que el buen pastor deja las noventa y nueve y va tras la que se perdió, hasta encontrarla. Cada silla vacía tiene un nombre, y buscar al que se fue es una obra que salva de muerte un alma.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Un plan de cuidado con toda la iglesia
    "pastoral-4-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué puede lograr una iglesia organizada, aunque el pastor no llegue a todos?", reverso: "Que nadie se quede sin visita.", apoyo: "Pero una iglesia organizada puede hacer que nadie se quede sin visita" },
              { frente: "Cuando las viudas eran desatendidas, ¿lo hicieron todo solos los apóstoles?", reverso: "No: eligieron a siete para que las atendieran.", apoyo: "los apóstoles no lo hicieron todo solos" },
              { frente: "Después de elegir a los siete, ¿con qué siguieron los apóstoles?", reverso: "Con la oración y la Palabra.", apoyo: "eligieron a siete para atender a las viudas y siguieron con la oración y la Palabra" },
              { frente: "En el cuerpo de Cristo, ¿quién se preocupa por quién?", reverso: "Todos se preocupan por todos.", apoyo: "En el cuerpo de Cristo todos se preocupan por todos" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según 1 Corintios 12:26, ¿qué pasa si un miembro padece?", reverso: "Todos los miembros se duelen con él.", apoyo: "«si un miembro padece, todos los miembros se duelen con él»" },
              { frente: "Según 1 Pedro 4:10, ¿con qué sirve cada uno a los otros?", reverso: "Con el don que ha recibido.", apoyo: "Cada uno cuida con su don" },
              { frente: "Según Gálatas 6:10, ¿a quiénes hace bien la iglesia?", reverso: "A todos, y mayormente a los de la familia de la fe.", apoyo: "El cuidado empieza en la iglesia, pero no se queda ahí" },
              { frente: "¿Es el cuidado del rebaño tarea solo del pastor?", reverso: "No: el cuidado es tarea de todos.", apoyo: "El cuidado es tarea de todos" },
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
            consigna: "¿Qué pasó en Hechos 6? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "viudas", texto: "Las viudas de los griegos", x: 15, y: 15 },
              { id: "distribucion", texto: "La distribución diaria", x: 15, y: 85 },
              { id: "apostoles", texto: "Los apóstoles", x: 50, y: 50 },
              { id: "siete", texto: "Los siete elegidos", x: 85, y: 15 },
              { id: "palabra", texto: "La oración y la Palabra", x: 85, y: 85 },
            ],
            enlaces: [
              { de: "viudas", a: "distribucion", relacion: "desatendidas en" },
              { de: "apostoles", a: "siete", relacion: "eligieron a" },
              { de: "siete", a: "viudas", relacion: "atienden a" },
              { de: "apostoles", a: "palabra", relacion: "siguen con" },
            ],
            distractores: ["dejan", "descuidan a"],
            apoyo: "Los apóstoles no lo hicieron todo solos: eligieron a siete para atender a las viudas y siguieron con la oración y la Palabra",
            ref: "Hechos 6:1-4",
            explica: "Las viudas de los griegos «eran desatendidas en la distribución diaria». Los apóstoles no lo hicieron todo solos: eligieron a siete para atenderlas y siguieron con la oración y la Palabra.",
          },
          {
            consigna: "¿Por qué el cuidado es de todo el cuerpo? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "cuidado", texto: "El cuidado del rebaño", x: 50, y: 12 },
              { id: "todos", texto: "Todos los miembros", x: 20, y: 50 },
              { id: "padece", texto: "Un miembro que padece", x: 20, y: 88 },
              { id: "cada", texto: "Cada uno", x: 80, y: 50 },
              { id: "don", texto: "El don que recibió", x: 80, y: 88 },
            ],
            enlaces: [
              { de: "cuidado", a: "todos", relacion: "es tarea de" },
              { de: "todos", a: "padece", relacion: "se duelen con" },
              { de: "cada", a: "don", relacion: "ministra a otros" },
            ],
            distractores: ["lo guarda para sí", "no tiene que ver con"],
            apoyo: "En el cuerpo de Cristo todos se preocupan por todos, y cada uno sirve con su don",
            ref: "1 Corintios 12:25-26",
            explica: "El cuidado es tarea de todos: «si un miembro padece, todos los miembros se duelen con él», y cada uno ministra a los otros el don que ha recibido (1 Pedro 4:10).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada uno con su tarea en el plan de cuidado.",
            pares: [
              ["Los líderes de grupo", "Cuidan a su grupo y avisan si alguien falta"],
              ["Los diáconos", "Atienden las comidas, el transporte y las mudanzas"],
              ["El equipo de visitación", "Visita a los enfermos, a los ancianos y a los que no salen de casa"],
              ["El equipo de oración", "Recibe los pedidos y ora con discreción"],
              ["El pastor", "Atiende las crisis más graves y forma a los líderes"],
            ],
            apoyo: "Un plan de cuidado reparte la tarea entre los líderes de grupo, los diáconos, un equipo de visitación, un equipo de oración y el pastor, con un protocolo para las crisis",
            explica: "Los líderes de grupo cuidan a su grupo y avisan; los diáconos atienden lo práctico; el equipo de visitación visita a los enfermos, a los ancianos y a los que no salen de casa; el equipo de oración ora con discreción; y el pastor atiende las crisis más graves y forma a los líderes.",
          },
          {
            consigna: "Une cada necesidad con quien la atiende en el plan de cuidado.",
            pares: [
              ["Una familia necesita ayuda con su mudanza", "Los diáconos"],
              ["Un hermano faltó dos semanas a su grupo", "Su líder de grupo, que avisa"],
              ["Una hermana pide oración por algo delicado", "El equipo de oración"],
              ["Un anciano ya no puede salir de su casa", "El equipo de visitación"],
              ["Un hermano murió de repente anoche", "El protocolo de crisis"],
            ],
            apoyo: "Un protocolo de crisis dice quién llama a quién cuando alguien muere, se enferma de gravedad o sufre una emergencia",
            explica: "Los diáconos atienden las necesidades prácticas, como una mudanza; el líder de grupo avisa cuando alguien falta; el equipo de oración ora con discreción; el de visitación visita a los que no salen de casa; y el protocolo de crisis dice quién llama a quién cuando alguien muere.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un diácono te dice: Pastor, anoche murió el hermano Felipe y nadie sabía a quién avisar. La familia estuvo sola por horas.",
            pregunta: "¿Qué le falta al plan de cuidado de tu iglesia?",
            opciones: [
              { texto: "Un protocolo de crisis que diga quién llama a quién cuando alguien muere.", bien: true, explica: "Un protocolo de crisis dice quién llama a quién cuando alguien muere, se enferma de gravedad o sufre una emergencia." },
              { texto: "Que el pastor sea el único en enterarse primero de todas las noticias.", explica: "El pastor no tiene que llegar a todos: un protocolo dice quién llama a quién." },
              { texto: "Que cada familia avise a la iglesia por su cuenta, como mejor pueda.", explica: "En una crisis la familia no debe quedar sola: el protocolo dice quién llama a quién." },
              { texto: "Un chat donde se cuente a toda la iglesia lo que pasó, con todos los detalles.", explica: "Los que cuidan guardan la confidencia: el protocolo dice quién llama a quién, no cuenta todo a todos." },
            ],
            apoyo: "Un protocolo de crisis dice quién llama a quién cuando alguien muere, se enferma de gravedad o sufre una emergencia",
            explica: "Un plan de cuidado lleva un protocolo de crisis: dice quién llama a quién cuando alguien muere, se enferma de gravedad o sufre una emergencia, para que nadie quede solo en esas horas.",
          },
          {
            caso: "Un pastor amigo te dice: Tengo ciento cincuenta personas y las visito yo solo. Ya no duermo, y aun así muchos se quedan sin visita.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que reparta la tarea con los líderes, los diáconos y un equipo de visitación.", bien: true, explica: "Un plan de cuidado reparte la tarea entre los líderes de grupo, los diáconos, un equipo de visitación, un equipo de oración y el pastor." },
              { texto: "Que se esfuerce un poco más, porque el buen pastor nunca descansa de su trabajo.", explica: "Ningún pastor puede visitar a todos: el pastor tiene que asegurarse de que alguien llegue." },
              { texto: "Que deje de visitar y se dedique solo a predicar bien los domingos.", explica: "El cuidado no se deja: se reparte entre toda la iglesia." },
              { texto: "Que pida a la iglesia que no lo llamen, salvo en una emergencia grave.", explica: "El cuidado es tarea de todos: con un plan, alguien llega a cada uno." },
            ],
            apoyo: "Ningún pastor puede visitar a todos. Pero una iglesia organizada puede hacer que nadie se quede sin visita",
            explica: "Los apóstoles no lo hicieron todo solos. Un plan de cuidado reparte la tarea entre los líderes de grupo, los diáconos, un equipo de visitación, un equipo de oración y el pastor, para que nadie se quede sin visita.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El pastor forma a los que visitan y cuida a los que cuidan",
            ref: "1 Pedro 4:10",
            titulo: "El nuevo equipo de visitación",
            relato: [
              "Seis hermanos se ofrecieron para el nuevo equipo de visitación de tu iglesia. Tienen buena voluntad, pero nunca han visitado a nadie.",
              "Antes de enviarlos, te reúnes con ellos para formarlos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué les enseñas antes de la primera visita?",
                opciones: [
                  { texto: "A escuchar, a guardar la confidencia y a avisarte cuando un caso los supere.", bien: true, explica: "Así se capacita a los que visitan: a escuchar, a guardar la confidencia y a avisar al pastor cuando un caso los supera." },
                  { texto: "A predicar un sermón corto en cada casa, aunque nadie se lo haya pedido antes.", explica: "Los que visitan se capacitan primero para escuchar, guardar la confidencia y avisar cuando un caso los supera." },
                  { texto: "A resolver solos todo lo que encuentren, para no tener que molestarte nunca.", explica: "Los que visitan avisan al pastor cuando un caso los supera, como un riesgo para la vida o un abuso." },
                ],
                apoyo: "Capacita a los que visitan: a escuchar, a guardar la confidencia y a avisarte cuando un caso los supera, como un riesgo para la vida o un abuso",
                explica: "El pastor forma a los que visitan: a escuchar, a guardar la confidencia y a avisarle cuando un caso los supera.",
              },
              {
                tipo: "situacion",
                pregunta: "En una visita, una señora le contó a una hermana del equipo que su esposo la golpea. ¿Qué debe hacer la hermana?",
                opciones: [
                  { texto: "Avisarte: es un caso que la supera, como un riesgo para la vida o un abuso.", bien: true, explica: "La confidencia se guarda, pero el que visita avisa al pastor cuando un caso lo supera, como un riesgo para la vida o un abuso." },
                  { texto: "Guardarlo en secreto, porque la señora se lo contó a ella sola y en confianza.", explica: "Un riesgo para la vida o un abuso supera al que visita: se avisa al pastor." },
                  { texto: "Contarlo en el equipo de oración, para que todos oren por esa señora.", explica: "Lo que supera al que visita se le avisa al pastor; no se cuenta a todos." },
                ],
                apoyo: "Capacita a los que visitan: a escuchar, a guardar la confidencia y a avisarte cuando un caso los supera, como un riesgo para la vida o un abuso",
                explica: "Cuando un caso supera al que visita, como un riesgo para la vida o un abuso, avisa al pastor.",
              },
              {
                tipo: "situacion",
                pregunta: "Tres meses después, Rebeca, del equipo, te dice que está agotada: visita a cuatro familias por semana y nadie le pregunta cómo está. ¿Qué haces?",
                opciones: [
                  { texto: "La cuidas: le das descanso, oras por ella y le reconoces su trabajo.", bien: true, explica: "Cuida a los que cuidan: dales descanso, oración y reconocimiento, para que no se agoten." },
                  { texto: "Le dices que el que sirve a Dios no se cansa, y que siga como va hasta ahora.", explica: "Los que cuidan también se agotan: necesitan descanso, oración y reconocimiento." },
                  { texto: "Le das dos familias más, porque es la que mejor visita de todo el equipo.", explica: "El pastor cuida a los que cuidan, para que no se agoten." },
                ],
                apoyo: "Y cuida a los que cuidan: dales descanso, oración y reconocimiento, para que no se agoten",
                explica: "El pastor cuida a los que cuidan: les da descanso, oración y reconocimiento, para que no se agoten.",
              },
              {
                tipo: "explica",
                apoyo: "Y cuida a los que cuidan: dales descanso, oración y reconocimiento, para que no se agoten",
                clave: {
                  id: "pr-pastoral-4-6-a5-1",
                  tipo: "corta",
                  pregunta: "¿Cómo formarás a los que visitan, y cómo los cuidarás para que no se agoten?",
                  ideas: [
                    { id: "formar", peso: 50, texto: "Capacitarlos para escuchar, guardar la confidencia y avisar cuando un caso los supera.", formas: ["escuch*", "confiden*", "avis*", "(los|lo|les|nos) supera", "capacit*"] },
                    { id: "cuidar", peso: 50, texto: "Cuidarlos con descanso, oración y reconocimiento.", formas: ["descans*", "reconoc*", "(orar|orare|oraremos|oracion|orando) por ellos", "oracion"] },
                  ],
                  modelo: "Los capacitaré para escuchar, guardar la confidencia y avisarme cuando un caso los supera, como un riesgo para la vida. Y los cuidaré con descanso, oración y reconocimiento, para que no se agoten.",
                },
              },
            ],
          },
          {
            apoyo: "Capacita a los que visitan: a escuchar, a guardar la confidencia y a avisarte cuando un caso los supera, como un riesgo para la vida o un abuso",
            ref: "1 Corintios 12:25-26",
            titulo: "Lo que oyó Tomás",
            relato: [
              "Tomás visita a los ancianos con el equipo de tu iglesia desde hace un año, y lo hace con mucho amor.",
              "Esta semana te llama, preocupado por dos cosas que pasaron en sus visitas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Una anciana le contó a Tomás un problema de su familia y le pidió que no lo contara. ¿Qué debe hacer Tomás?",
                opciones: [
                  { texto: "Guardar la confidencia, y orar por ella con discreción.", bien: true, explica: "Los que visitan guardan la confidencia, y el cuidado se acompaña con oración discreta." },
                  { texto: "Contarlo en el culto, para que toda la iglesia ore por ella.", explica: "Los que visitan guardan la confidencia: no se cuenta lo que se confió." },
                  { texto: "Contárselo a los hijos de la anciana, para que lo arreglen pronto.", explica: "Lo que se confía en una visita se guarda con discreción." },
                ],
                apoyo: "Capacita a los que visitan: a escuchar, a guardar la confidencia y a avisarte cuando un caso los supera, como un riesgo para la vida o un abuso",
                explica: "Los que visitan aprenden a escuchar y a guardar la confidencia.",
              },
              {
                tipo: "situacion",
                pregunta: "Otro anciano le dijo a Tomás que ya no quiere seguir viviendo. ¿Qué debe hacer Tomás?",
                opciones: [
                  { texto: "Avisarte enseguida: es un riesgo para la vida y el caso lo supera.", bien: true, explica: "Cuando un caso supera al que visita, como un riesgo para la vida, avisa al pastor." },
                  { texto: "Guardar el secreto, porque el anciano se lo dijo a él en confianza.", explica: "Un riesgo para la vida supera al que visita: se avisa al pastor." },
                  { texto: "Animarlo él solo, y volver a ver cómo sigue dentro de un mes.", explica: "Un riesgo para la vida no se deja para después: se avisa al pastor." },
                ],
                apoyo: "Capacita a los que visitan: a escuchar, a guardar la confidencia y a avisarte cuando un caso los supera, como un riesgo para la vida o un abuso",
                explica: "La confidencia se guarda, pero un riesgo para la vida o un abuso supera al que visita: se avisa al pastor.",
              },
              {
                tipo: "situacion",
                pregunta: "Al final, Tomás te confiesa que está cansado y que hace meses nadie ora por él. ¿Qué haces?",
                opciones: [
                  { texto: "Le das descanso, oras por él y le reconoces su servicio.", bien: true, explica: "Cuida a los que cuidan: dales descanso, oración y reconocimiento, para que no se agoten." },
                  { texto: "Le dices que los que cuidan a otros no necesitan que los cuiden.", explica: "Los que cuidan también necesitan descanso, oración y reconocimiento." },
                  { texto: "Le pides que visite también a los ancianos de otro barrio.", explica: "El pastor cuida a los que cuidan, para que no se agoten." },
                ],
                apoyo: "Y cuida a los que cuidan: dales descanso, oración y reconocimiento, para que no se agoten",
                explica: "El pastor cuida a los que cuidan: descanso, oración y reconocimiento.",
              },
              {
                tipo: "explica",
                apoyo: "El pastor forma a los que visitan y cuida a los que cuidan",
                clave: {
                  id: "pr-pastoral-4-6-a5-2",
                  tipo: "corta",
                  pregunta: "A partir de lo que vivió Tomás, ¿qué le enseñarás a todo el equipo de visitación?",
                  ideas: [
                    { id: "guardar", peso: 35, texto: "A guardar la confidencia.", formas: ["confiden*", "guard* (el|los|la|las) (secreto|secretos|confidencia)", "discrecion"] },
                    { id: "avisar", peso: 35, texto: "A avisar al pastor cuando un caso los supera, como un riesgo para la vida o un abuso.", formas: ["avis*", "(los|lo|les|nos) supera", "riesgo para la vida", "abuso"] },
                    { id: "cuidar", peso: 30, texto: "Que los que cuidan también necesitan descanso, oración y reconocimiento.", formas: ["descans*", "reconoc*", "cuid* a los que cuidan", "(orar|oracion|orando) por (ellos|los)"] },
                  ],
                  modelo: "Les enseñaré a guardar la confidencia, pero a avisarme cuando un caso los supera, como un riesgo para la vida o un abuso. Y que los que cuidan también necesitan descanso, oración y reconocimiento.",
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
            apoyo: "El cuidado es tarea de todos",
            ref: "1 Corintios 12:25-26",
            clave: {
              id: "pr-pastoral-4-6-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué el cuidado del rebaño es tarea de toda la iglesia, y no solo del pastor?",
              ideas: [
                { id: "apostoles", peso: 35, texto: "Los apóstoles no lo hicieron todo solos: eligieron a siete para atender a las viudas y siguieron con la oración y la Palabra.", formas: ["apostoles", "eligieron a siete", "(los|a) siete", "hechos 6"] },
                { id: "cuerpo", peso: 35, texto: "En el cuerpo de Cristo todos se preocupan por todos: si un miembro padece, todos se duelen con él.", formas: ["cuerpo", "(se|nos|todos) preocup*", "preocup* (por|unos) (todos|otros|los)", "(se|nos|todos) duel*", "padece", "unos por (los|otros)", "miembros"] },
                { id: "don", peso: 30, texto: "Cada uno sirve con el don que ha recibido.", formas: ["don", "dones", "su don", "el don"] },
              ],
              modelo: "Porque los apóstoles no lo hicieron todo solos: eligieron a siete para atender a las viudas y siguieron con la oración y la Palabra. En el cuerpo de Cristo todos se preocupan por todos, y cada uno sirve con su don.",
            },
          },
          {
            apoyo: "El pastor no tiene que llegar a todos; tiene que asegurarse de que alguien llegue",
            ref: "Hechos 6:1-4",
            clave: {
              id: "pr-pastoral-4-6-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Visitar a los enfermos es trabajo del pastor; para eso está. ¿Qué le respondes con la Biblia?",
              ideas: [
                { id: "cuerpo", peso: 35, texto: "Que en el cuerpo de Cristo todos se preocupan por todos: si un miembro padece, todos se duelen con él.", formas: ["cuerpo", "(se|nos|todos) preocup*", "preocup* (por|unos) (todos|otros|los)", "(se|nos|todos) duel*", "padece", "unos por (los|otros)", "miembros"] },
                { id: "don", peso: 30, texto: "Que cada uno sirve con el don que ha recibido.", formas: ["don", "dones", "su don", "el don"] },
                { id: "apostoles", peso: 35, texto: "Que los apóstoles no lo hicieron todo solos: eligieron a siete para atender a las viudas.", formas: ["apostoles", "eligieron a siete", "(los|a) siete", "hechos 6", "ningun pastor puede", "que alguien llegue"] },
              ],
              errores: [
                { id: "pastor", texto: "El cuidado es tarea de todos, no solo del pastor.", formas: ["tiene razon", "(es|seria) (trabajo|tarea) (solo|solamente|unicamente) del pastor"], anula: "cuerpo" },
              ],
              modelo: "Le respondo que el cuidado es tarea de todos. En el cuerpo de Cristo todos se preocupan por todos, y cada uno sirve con su don. Los apóstoles eligieron a siete para atender a las viudas y siguieron con la oración y la Palabra.",
            },
          },
        ],
      },
    ],
  },
};
