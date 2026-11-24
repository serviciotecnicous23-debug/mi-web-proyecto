// Las prácticas de las lecciones de «El bautismo y la Santa Cena» (Nivel 1). Siguen el modelo de n1-salvacion.ts: cada
// actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección.
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N1_BAUTISMO_CENA: PracticasMateria = {
  materia: "n1-bautismo-cena",
  mision: {
    titulo: "El agua, el pan y la copa",
    intro: "Una amiga que acaba de creer en Jesús te pregunta por qué los cristianos se bautizan y qué significa la Santa Cena. Repasa las cuatro lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar qué significa el bautismo, quién se bautiza y cómo, qué representan el pan y la copa, y cómo prepararte para la Santa Cena.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El bautismo en agua
    "n1-bautismo-cena-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué mandó Jesús antes de subir al cielo?", reverso: "Hacer discípulos en todas las naciones y bautizarlos en el nombre del Padre, del Hijo y del Espíritu Santo.", apoyo: "Jesús mandó a sus discípulos hacer discípulos en todas las naciones" },
              { frente: "¿Qué significa la palabra bautizar?", reverso: "Viene del griego y significa sumergir.", apoyo: "La palabra bautizar viene del griego y significa sumergir." },
              { frente: "¿El bautismo te hace hijo de Dios?", reverso: "No: muestra que ya lo eres. La salvación es por gracia, por medio de la fe.", apoyo: "El bautismo no te hace hijo de Dios; muestra que ya lo eres." },
              { frente: "¿Qué celebra la iglesia el día de tu bautismo?", reverso: "Lo que Dios hizo en tu vida: es un día de fiesta.", apoyo: "la iglesia celebra contigo lo que Dios hizo en tu vida" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿El bautismo es una costumbre de familia?", reverso: "No: es un mandato del Señor para todo el que cree.", apoyo: "El bautismo no es una costumbre familiar ni un rito para cumplir" },
              { frente: "¿Quién bautizó a Jesús y dónde?", reverso: "Juan, en el Jordán. Así Jesús nos dejó el ejemplo.", apoyo: "Jesús mismo fue bautizado por Juan en el Jordán" },
              { frente: "¿Qué declara el creyente al salir del agua?", reverso: "Que resucitó con Cristo para andar en vida nueva.", apoyo: "al salir del agua, declara que resucitó con Él" },
              { frente: "¿En qué se parece el bautismo a un anillo de bodas?", reverso: "El anillo no casa a nadie, pero muestra que estás casado. El bautismo no salva, pero muestra que eres de Cristo.", apoyo: "Un anillo de bodas no casa a nadie, pero muestra a todos que esa persona está casada." },
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
            consigna: "Completa lo que mandó Jesús y el ejemplo que nos dejó.",
            texto: "Antes de subir al cielo, Jesús [[mandó]] a sus discípulos hacer discípulos en todas las naciones y bautizarlos. El bautismo es para todo el que [[cree]]. Jesús mismo fue bautizado por [[Juan]] en el Jordán.",
            distractores: ["sugirió", "duda", "Pedro"],
            errores: {
              sugirió: "No fue una sugerencia: el bautismo es un mandato del Señor.",
              duda: "El bautismo es un mandato del Señor para todo el que cree.",
              Pedro: "Fue Juan quien bautizó a Jesús en el Jordán.",
            },
            apoyo: "es un mandato del Señor para todo el que cree",
            ref: "Mateo 28:19; 3:13-17",
            explica: "Jesús mandó bautizar a los que creen, y Él mismo se bautizó para dejarnos el ejemplo.",
          },
          {
            consigna: "Completa qué significa bautizarse.",
            texto: "Bautizarse es [[obedecer]] a Jesús y dar un paso de fe delante de [[todos]]. No es una costumbre familiar: es un [[mandato]] del Señor para todo el que cree.",
            distractores: ["pagarle", "nadie", "consejo"],
            errores: {
              pagarle: "El bautismo no es un pago: la salvación es por gracia. Bautizarse es obedecer a Jesús.",
              nadie: "El bautismo no se hace a escondidas: es un paso de fe delante de todos.",
              consejo: "Jesús no lo dejó como un simple consejo: es un mandato para todo el que cree.",
            },
            apoyo: "Bautizarse es obedecer a Jesús y dar un paso de fe delante de todos.",
            ref: "Mateo 28:19",
            explica: "Jesús mandó bautizar a los que creen. Bautizarse es obedecerle y mostrar la fe delante de todos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "¿En qué orden declara el creyente estas cosas en su bautismo?",
            pasos: ["Murió al pecado", "Fue sepultado con Cristo", "Resucitó con Cristo", "Anda en vida nueva"],
            apoyo: "el creyente declara que murió al pecado y fue sepultado con Cristo",
            ref: "Romanos 6:3-4",
            explica: "Al bajar al agua, el creyente declara que murió al pecado y fue sepultado con Cristo; al salir, que resucitó con Él para andar en vida nueva.",
          },
          {
            consigna: "¿En qué orden vive esto el creyente, del primero al último?",
            pasos: [
              "Cree en Jesús",
              "Baja al agua: declara que murió al pecado y fue sepultado con Cristo",
              "Sale del agua: declara que resucitó con Cristo",
              "Anda en vida nueva",
            ],
            apoyo: "Al bajar al agua, el creyente declara que murió al pecado y fue sepultado con Cristo; al salir del agua, declara que resucitó con Él",
            ref: "Romanos 6:4; Colosenses 2:12",
            explica: "Primero se cree en Jesús. Al bajar al agua, el creyente declara que murió al pecado y fue sepultado con Cristo; al salir, que resucitó con Él para andar en vida nueva.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Cómo somos salvos y qué hace el bautismo? Lleva cada frase a su grupo.",
            grupos: ["Así somos salvos", "Esto hace el bautismo"],
            frases: [
              { texto: "Por la gracia de Dios", grupo: 0 },
              { texto: "Por medio de la fe", grupo: 0 },
              { texto: "Muestra que ya eres hijo de Dios", grupo: 1 },
              { texto: "Es la señal pública de que eres de Cristo", grupo: 1 },
              { texto: "Es tu primer paso público de obediencia", grupo: 1 },
            ],
            apoyo: "La salvación es por gracia, por medio de la fe, y no por obras",
            ref: "Efesios 2:8-9",
            explica: "La salvación viene por gracia, por medio de la fe. El bautismo no salva: es la señal pública de que ya eres de Cristo.",
          },
          {
            consigna: "¿Esto lo hace el bautismo o no? Lleva cada frase a su grupo.",
            grupos: ["El bautismo sí hace esto", "El bautismo no hace esto"],
            frases: [
              { texto: "Da testimonio público de tu fe", grupo: 0 },
              { texto: "Muestra que obedeces a Jesús", grupo: 0 },
              { texto: "Proclama que moriste al pecado y resucitaste con Cristo", grupo: 0 },
              { texto: "Te hace hijo de Dios", grupo: 1, explica: "No te hace hijo de Dios: muestra que ya lo eres." },
              { texto: "Te da la salvación", grupo: 1, explica: "La salvación es por gracia, por medio de la fe. El ladrón arrepentido fue salvo sin bautizarse." },
            ],
            apoyo: "El bautismo no te hace hijo de Dios; muestra que ya lo eres.",
            ref: "Efesios 2:8-9; Lucas 23:42-43",
            explica: "El bautismo no da la salvación: proclama lo que Dios ya hizo en quien cree.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu prima creyó en Jesús hace poco y te dice feliz: Me bautizo el domingo; así por fin voy a ser salva.",
            pregunta: "¿Qué le respondes con cariño?",
            opciones: [
              { texto: "¡Qué bien! El domingo, al salir del agua, por fin vas a ser salva.", explica: "El bautismo no salva: la salvación es por gracia, por medio de la fe." },
              { texto: "¡Qué alegría! Dios ya te salvó por gracia, y el bautismo lo muestra a todos.", bien: true, explica: "Celebra su paso y le explica bien: Dios salva por gracia, por medio de la fe, y el bautismo es la señal pública." },
              { texto: "Entonces no te bautices: si el bautismo no salva, no sirve de nada.", explica: "El bautismo no salva, pero es un mandato de Jesús y el primer paso público de obediencia." },
              { texto: "Antes pórtate bien un buen tiempo, para ganarte la salvación.", explica: "Nadie se gana la salvación: es por gracia, por medio de la fe, y no por obras." },
            ],
            apoyo: "no es lo que te salva, pero es la señal pública de que has entregado tu vida a Cristo",
            ref: "Efesios 2:8-9",
            explica: "Como el anillo de bodas no casa a nadie, el bautismo no salva: muestra a todos que entregaste tu vida a Cristo.",
          },
          {
            caso: "Un amigo que creyó en Jesús hace poco te pregunta: Si el bautismo no salva, ¿para qué me voy a bautizar?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: si el bautismo no salva, no hace falta bautizarse.", explica: "Quien de verdad cree, obedece: el bautismo es un mandato de Jesús para todo el que cree." },
              { texto: "Porque Jesús lo mandó, y quien de verdad cree, obedece.", bien: true, explica: "Así lo enseña la lección: el bautismo no salva, pero es el primer paso público de obediencia de una fe verdadera." },
              { texto: "Bautízate por si acaso: así te aseguras de que eres salvo.", explica: "La salvación no depende del bautismo: es por gracia, por medio de la fe." },
              { texto: "Mejor espera unos años, hasta que seas un cristiano maduro.", explica: "En el libro de los Hechos, los que creían eran bautizados pronto." },
            ],
            apoyo: "Es el primer paso público de obediencia de una fe verdadera.",
            ref: "Hechos 2:41; 8:12",
            explica: "El bautismo no salva, pero da testimonio de la salvación: es obedecer a Jesús delante de todos.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "proclama que el creyente murió al pecado y resucitó con Cristo para andar en vida nueva",
            ref: "Romanos 6:3-4",
            clave: {
              id: "pr-n1-bautismo-cena-1-a6-1",
              tipo: "corta",
              pregunta: "¿Qué simboliza el bautismo en agua?",
              ideas: [
                { id: "muerte", peso: 50, texto: "Al bajar al agua, el creyente declara que murió al pecado y fue sepultado con Cristo.", formas: ["muri* al pecado", "muert* al pecado", "morir al pecado", "sepult*", "enterr*", "murio", "muerte", "morir"] },
                { id: "vida", peso: 50, texto: "Al salir del agua, declara que resucitó con Cristo para andar en vida nueva.", formas: ["resucit*", "vida nueva", "nueva vida", "resurreccion", "volver a vivir"] },
              ],
              modelo: "El bautismo simboliza que el creyente murió al pecado y fue sepultado con Cristo al bajar al agua. Al salir del agua, muestra que resucitó con Él para andar en vida nueva.",
            },
          },
          {
            apoyo: "fuimos sepultados con Él en el bautismo y resucitados con Él mediante la fe",
            ref: "Colosenses 2:12",
            clave: {
              id: "pr-n1-bautismo-cena-1-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué decimos que el bautismo es una imagen viva del evangelio?",
              ideas: [
                { id: "sumergir", peso: 30, texto: "Bautizar significa sumergir.", formas: ["sumerg*", "inmersion", "bajo el agua", "meter* en el agua", "bajar al agua", "baja al agua", "entrar al agua"] },
                { id: "muerte", peso: 35, texto: "Al bajar al agua, el creyente muestra que murió al pecado y fue sepultado con Cristo.", formas: ["muri*", "muert*", "morir", "sepult*", "enterr*"] },
                { id: "vida", peso: 35, texto: "Al salir del agua, muestra que resucitó con Cristo para andar en vida nueva.", formas: ["resucit*", "vida nueva", "nueva vida", "resurreccion", "salir del agua", "sale del agua"] },
              ],
              modelo: "Porque bautizar significa sumergir. Al bajar al agua, el creyente muestra que murió al pecado y fue sepultado con Cristo; al salir, muestra que resucitó con Él para andar en vida nueva.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Quién se bautiza y cómo
    "n1-bautismo-cena-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En el libro de los Hechos, ¿qué pasa siempre antes del bautismo?", reverso: "Las personas oyen el evangelio y creen.", apoyo: "el bautismo siempre llega después de oír el evangelio y creer" },
              { frente: "¿Qué confesó el eunuco etíope antes de bautizarse?", reverso: "Que Jesucristo es el Hijo de Dios.", apoyo: "El eunuco confesó que Jesucristo es el Hijo de Dios" },
              { frente: "¿Qué quiere decir bautizar por inmersión?", reverso: "Que la persona es sumergida en el agua.", apoyo: "Por inmersión: la persona es sumergida en el agua." },
              { frente: "¿Por qué muchas iglesias evangélicas no bautizan a los bebés?", reverso: "Porque un bebé todavía no puede arrepentirse ni creer. Por eso se le presenta al Señor y se ora por él.", apoyo: "Un bebé todavía no puede arrepentirse ni creer" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuántas personas se añadieron el día de Pentecostés?", reverso: "Como tres mil: los que recibieron la palabra de Pedro y fueron bautizados.", apoyo: "se añadieron como tres mil personas" },
              { frente: "¿Qué hizo el carcelero de Filipos después de creer?", reverso: "En seguida se bautizó con todos los suyos.", apoyo: "el carcelero creyó en el Señor Jesús y en seguida se bautizó con todos los suyos" },
              { frente: "¿En qué nombre se bautiza?", reverso: "En el nombre del Padre, del Hijo y del Espíritu Santo, como mandó Jesús.", apoyo: "En el nombre del Padre, del Hijo y del Espíritu Santo, como mandó Jesús" },
              { frente: "En su confesión, ¿qué declara el que se bautiza?", reverso: "Que cree en Jesucristo como su Señor y Salvador.", apoyo: "el que se bautiza declara que cree en Jesucristo como su Señor y Salvador" },
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
            consigna: "En el libro de los Hechos, ¿en qué orden pasan estas cosas?",
            pasos: ["Oír el evangelio", "Arrepentirse y creer en Jesús", "Bautizarse"],
            apoyo: "El orden es siempre el mismo: oír el evangelio, arrepentirse, creer y bautizarse.",
            ref: "Hechos 2:38-41",
            explica: "En Hechos, el bautismo siempre llega después de oír el evangelio, arrepentirse y creer.",
          },
          {
            consigna: "¿En qué orden pasó la historia del eunuco etíope?",
            pasos: [
              "Oyó de Felipe el evangelio de Jesús",
              "Pidió ser bautizado",
              "Felipe le dijo que podía, si creía de todo corazón",
              "Confesó que Jesucristo es el Hijo de Dios",
              "Descendieron ambos al agua y Felipe lo bautizó",
            ],
            apoyo: "El eunuco etíope oyó de Felipe el evangelio de Jesús y pidió ser bautizado.",
            ref: "Hechos 8:35-38",
            explica: "El eunuco primero oyó el evangelio, creyó y confesó su fe; después fue bautizado.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pregunta sobre el bautismo con su respuesta.",
            pares: [
              ["¿Qué es bautizar por inmersión?", "La persona es sumergida en el agua"],
              ["¿En qué nombre se bautiza?", "En el nombre del Padre, del Hijo y del Espíritu Santo"],
              ["¿Delante de quién se bautiza?", "Delante de la iglesia, como testimonio público"],
              ["¿Qué confiesa el que se bautiza?", "Que cree en Jesucristo como su Señor y Salvador"],
            ],
            apoyo: "se hace por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo, como testimonio público de la fe",
            ref: "Mateo 28:19; Romanos 10:9",
            explica: "La Biblia muestra cómo se bautiza: por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo, delante de la iglesia y con una confesión personal.",
          },
          {
            consigna: "Une cada frase con lo que enseña sobre cómo bautizar.",
            pares: [
              ["Jesús subió del agua después de ser bautizado", "Se bautiza por inmersión"],
              ["En el nombre del Padre, del Hijo y del Espíritu Santo", "Así lo mandó Jesús en Mateo 28:19"],
              ["El eunuco confesó que Jesucristo es el Hijo de Dios", "El que se bautiza confiesa su fe"],
            ],
            apoyo: "Por inmersión: la persona es sumergida en el agua.",
            ref: "Mateo 3:16; 28:19; Hechos 8:35-38",
            explica: "Jesús subió del agua: por eso bautizamos por inmersión. Se bautiza en el nombre del Padre, del Hijo y del Espíritu Santo, y el que se bautiza confiesa su fe.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Los niños pequeños y el bautismo: ¿qué es verdad y qué es un error?",
            afirmaciones: [
              { texto: "Un bebé todavía no puede arrepentirse ni creer.", verdad: true, explica: "Por eso muchas iglesias evangélicas, entre ellas las pentecostales, presentan a los niños al Señor y oran por ellos.", apoyo: "Un bebé todavía no puede arrepentirse ni creer" },
              { texto: "Presentar a un niño al Señor es lo mismo que bautizarlo.", verdad: false, explica: "Al presentarlo, la iglesia ora por él. El bautismo llega después, cuando el niño crece y cree en Jesús.", apoyo: "presentan a los niños al Señor y oran por ellos", ref: "Lucas 2:22" },
              { texto: "Jesús tomó a los niños en sus brazos y los bendijo.", verdad: true, explica: "Por eso presentamos a los niños al Señor y oramos por ellos.", apoyo: "Jesús, que tomó a los niños en sus brazos y los bendijo", ref: "Marcos 10:13-16" },
            ],
          },
          {
            consigna: "Los niños pequeños y el bautismo: ¿qué es verdad y qué es un error?",
            afirmaciones: [
              { texto: "José y María llevaron a Jesús al templo para presentarlo al Señor.", verdad: true, explica: "Así lo hacen hoy muchas iglesias con los niños pequeños: los presentan al Señor y oran por ellos.", apoyo: "José y María, que llevaron a Jesús al templo para presentarlo al Señor", ref: "Lucas 2:22" },
              { texto: "Cuando el niño crece y cree en Jesús, él mismo decide bautizarse.", verdad: true, explica: "El bautismo es una decisión personal de quien ya cree.", apoyo: "Cuando el niño crece y cree en Jesús, él mismo decide bautizarse." },
              { texto: "Según la Biblia, son los padres los que deciden el bautismo de sus hijos.", verdad: false, explica: "La Biblia muestra que el bautismo sigue a la fe personal: cuando el niño crece y cree, él mismo decide.", apoyo: "El bautismo es una decisión personal de quien ya cree." },
              { texto: "Si a alguien lo bautizaron de bebé, es porque sus padres no lo amaban.", verdad: false, explica: "Muchos fueron bautizados de bebés por padres que los amaban y querían lo mejor para ellos.", apoyo: "Muchos fueron bautizados de bebés por padres que los amaban y querían lo mejor para ellos." },
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
            caso: "Tu hermana acaba de tener un bebé y te pregunta si en tu iglesia lo pueden bautizar.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Sí, bautízalo pronto, así ya es cristiano desde que es un bebé.", explica: "El bautismo sigue a la fe personal, y un bebé todavía no puede arrepentirse ni creer." },
              { texto: "Lo presentamos al Señor y oramos por él. Cuando crezca y crea, él decidirá bautizarse.", bien: true, explica: "Así lo hicieron José y María con Jesús, y así lo hizo Jesús cuando bendijo a los niños." },
              { texto: "No: los niños pequeños no tienen nada que hacer en la iglesia hasta que crezcan.", explica: "Jesús tomó a los niños en sus brazos y los bendijo: por eso se les presenta al Señor y se ora por ellos." },
              { texto: "Sí, bautízalo ya, y así tu hijo no tendrá que decidir nada cuando crezca.", explica: "El bautismo es una decisión personal: cuando el niño crece y cree en Jesús, él mismo decide." },
            ],
            apoyo: "La Biblia muestra que el bautismo sigue a la fe personal.",
            ref: "Lucas 2:22; Marcos 10:13-16",
            explica: "Un bebé todavía no puede creer; por eso se le presenta al Señor y se ora por él. Cuando crezca y crea, él mismo decidirá bautizarse.",
          },
          {
            caso: "Un compañero de trabajo te dice: A mí me bautizaron de bebé. ¿Me estás diciendo que mis padres hicieron algo malo?",
            pregunta: "¿Qué le respondes con respeto?",
            opciones: [
              { texto: "Sí: tus padres se equivocaron porque no sabían nada de Dios.", explica: "Es una respuesta dura e injusta: muchos fueron bautizados de bebés por padres que los amaban." },
              { texto: "No: seguro querían lo mejor para ti. En la Biblia, se bautiza quien ya cree en Jesús.", bien: true, explica: "Responde con respeto y explica lo que muestra el Nuevo Testamento: el bautismo es la respuesta personal de quien ya cree." },
              { texto: "No importa: ese bautismo de bebé ya te hizo cristiano.", explica: "El bautismo que vemos en el Nuevo Testamento es la respuesta personal de quien ya cree." },
              { texto: "Mejor no hablemos de eso, para no pelear ni ofenderte.", explica: "Se puede hablar con respeto: reconocer que sus padres lo amaban y explicar lo que enseña la Biblia." },
            ],
            apoyo: "El bautismo que vemos en el Nuevo Testamento es la respuesta personal de quien ya cree.",
            ref: "Hechos 8:35-38",
            explica: "Se puede respetar a los padres y, a la vez, explicar que el bautismo es la respuesta personal de quien ya cree.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El bautismo es para quien se arrepiente y cree en Jesús",
            ref: "Hechos 2:38-41",
            clave: {
              id: "pr-n1-bautismo-cena-2-a6-1",
              tipo: "corta",
              pregunta: "Según el libro de los Hechos, ¿para quién es el bautismo?",
              ideas: [
                { id: "cree", peso: 60, texto: "Es para quien se arrepiente y cree en Jesús.", formas: ["arrepient*", "arrepent*", "cree*", "crey*", "crei*", "creer", "fe personal", "tiene* fe"] },
                { id: "orden", peso: 40, texto: "Primero se oye el evangelio y se cree; después viene el bautismo.", formas: ["despues", "primero", "oir el evangelio", "oy* el evangelio", "oi* el evangelio", "el orden", "antes de bautiz*"] },
              ],
              modelo: "El bautismo es para quien oye el evangelio, se arrepiente y cree en Jesús. En Hechos, primero creían y después se bautizaban, como los tres mil de Pentecostés.",
            },
          },
          {
            apoyo: "El bautismo es para quien puede creer y confesar su fe.",
            ref: "Hechos 8:35-38",
            clave: {
              id: "pr-n1-bautismo-cena-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué nos enseña la historia del eunuco etíope sobre quién puede bautizarse?",
              ideas: [
                { id: "creer", peso: 50, texto: "Puede bautizarse quien cree de todo corazón.", formas: ["de todo corazon", "cree*", "crey*", "crei*", "creer", "fe"] },
                { id: "confesar", peso: 50, texto: "Quien confiesa su fe: que Jesucristo es el Hijo de Dios.", formas: ["confes*", "confies*", "hijo de dios", "declar*"] },
              ],
              modelo: "Que puede bautizarse quien cree de todo corazón. El eunuco oyó el evangelio, confesó que Jesucristo es el Hijo de Dios y después Felipe lo bautizó.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. La Santa Cena
    "n1-bautismo-cena-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuándo nos dejó Jesús la Santa Cena?", reverso: "La noche en que fue entregado, mientras celebraba la Pascua con sus discípulos.", apoyo: "Jesús instituyó la Santa Cena la noche en que fue entregado" },
              { frente: "¿Qué recordaba la Pascua?", reverso: "Cómo Dios libró a Israel de Egipto por la sangre del cordero.", apoyo: "La Pascua recordaba cómo Dios libró a Israel de Egipto por la sangre del cordero" },
              { frente: "¿Qué representa el pan?", reverso: "El cuerpo de Cristo, entregado por nosotros en la cruz.", apoyo: "El pan representa el cuerpo de Cristo, entregado por nosotros en la cruz." },
              { frente: "¿Qué representa la copa?", reverso: "La sangre de Cristo, la sangre del nuevo pacto, derramada para el perdón de los pecados.", apoyo: "La copa representa su sangre, la sangre del nuevo pacto, derramada para el perdón de los pecados" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hizo Jesús con el pan en esa cena?", reverso: "Lo tomó, dio gracias, lo partió y dijo que es su cuerpo, dado por nosotros.", apoyo: "Jesús tomó el pan, dio gracias, lo partió y dijo" },
              { frente: "¿Cómo llama Pablo a Jesús?", reverso: "Nuestra pascua, sacrificada por nosotros.", apoyo: "Pablo lo llama nuestra pascua, sacrificada por nosotros" },
              { frente: "¿Con quién tenemos comunión en la Santa Cena?", reverso: "Con Cristo y con los hermanos, porque somos un solo cuerpo.", apoyo: "tenemos comunión con Cristo y con los hermanos, porque somos un solo cuerpo" },
              { frente: "¿Qué anunciamos en cada Santa Cena?", reverso: "La muerte del Señor, hasta que Él venga.", apoyo: "anunciamos la muerte del Señor hasta que Él venga" },
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
            consigna: "Completa lo que hizo Jesús la noche antes de morir.",
            texto: "La noche antes de morir, Jesús celebró la [[Pascua]] con sus discípulos. Tomó el [[pan]], dio gracias y lo partió. Les pidió hacer esto en [[memoria]] de Él.",
            distractores: ["Pentecostés", "agua", "olvido"],
            errores: {
              Pentecostés: "Esa noche Jesús celebró la Pascua, la cena que recordaba cómo Dios libró a Israel de Egipto.",
              agua: "En esa cena, Jesús tomó el pan, lo partió y después tomó la copa.",
              olvido: "Jesús nos dejó la Cena para que lo recordemos: «haced esto en memoria de mí».",
            },
            apoyo: "La noche antes de morir, Jesús celebró la Pascua con sus discípulos.",
            ref: "Lucas 22:19",
            explica: "Jesús nos dejó la Santa Cena en la cena de la Pascua, la noche en que fue entregado, para que lo recordemos.",
          },
          {
            consigna: "Completa cuándo nos dejó Jesús la Santa Cena y para qué.",
            texto: "Jesús nos dejó la Santa Cena la [[noche]] en que fue entregado, en la cena de la Pascua. La Pascua recordaba cómo Dios libró a Israel de [[Egipto]]. Jesús pidió celebrar la Cena [[siempre]], en memoria de Él.",
            distractores: ["mañana", "Babilonia", "una vez"],
            errores: {
              mañana: "Fue de noche: la noche en que fue entregado, antes de morir.",
              Babilonia: "La Pascua recordaba cómo Dios libró a Israel de Egipto por la sangre del cordero.",
              "una vez": "Jesús la dejó para que la hicieran siempre: los primeros creyentes partían el pan cuando se reunían.",
            },
            apoyo: "En esa cena les dejó algo para que lo hicieran siempre, en memoria de Él.",
            ref: "Lucas 22:19-20",
            explica: "Esa noche, en la Pascua, Jesús dejó la Santa Cena para que la iglesia la celebre siempre, en memoria de Él.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une el pan, la copa y la Pascua con lo que significan.",
            pares: [
              ["El pan", "El cuerpo de Cristo, entregado por nosotros en la cruz"],
              ["La copa", "La sangre de Cristo, derramada para el perdón de los pecados"],
              ["La Pascua", "Recordaba cómo Dios libró a Israel de Egipto"],
            ],
            apoyo: "el pan y la copa representan su cuerpo y su sangre",
            ref: "Lucas 22:19-20; Mateo 26:28",
            explica: "El pan y la copa son símbolos que el Señor eligió: su cuerpo entregado y su sangre derramada por nosotros. La Pascua recordaba cómo Dios libró a Israel de Egipto.",
          },
          {
            consigna: "Une cada frase de la Biblia con lo que enseña.",
            pares: [
              ["«Esto es mi cuerpo»", "El pan representa su cuerpo, entregado por nosotros"],
              ["«Esta copa es el nuevo pacto en mi sangre»", "La copa representa su sangre, derramada para el perdón"],
              ["Pablo llama a Jesús nuestra pascua", "Jesús fue sacrificado por nosotros"],
            ],
            apoyo: "son símbolos que el Señor eligió para que lo recordemos y lo anunciemos",
            ref: "Lucas 22:19-20; 1 Corintios 5:7",
            explica: "Jesús, nuestra pascua, fue sacrificado por nosotros: el pan y la copa son los símbolos que Él eligió para que lo recordemos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Invitaste a un vecino a la iglesia y ese domingo celebran la Santa Cena. Te pregunta en voz baja: ¿Por qué comen pan y toman de una copa?",
            pregunta: "¿Qué le explicas en pocas palabras?",
            opciones: [
              { texto: "Es una costumbre de la iglesia, sin un significado especial.", explica: "No es una costumbre vacía: el pan y la copa son símbolos que el Señor eligió para que lo recordemos." },
              { texto: "Jesús nos la dejó: el pan representa su cuerpo y la copa, su sangre.", bien: true, explica: "Explica con palabras sencillas lo que representan el pan y la copa." },
              { texto: "Es una comida para compartir entre todos después del culto.", explica: "No es una comida cualquiera: el pan y la copa señalan el cuerpo y la sangre de Cristo." },
              { texto: "Es un premio para los que se portaron bien durante la semana.", explica: "No es un premio: el pan y la copa nos recuerdan lo que Jesús hizo por nosotros en la cruz." },
            ],
            apoyo: "Cada Santa Cena nos lleva de vuelta a la cruz.",
            ref: "Lucas 22:19-20",
            explica: "El pan y la copa nos llevan de vuelta a la cruz: al cuerpo entregado y a la sangre derramada por nosotros.",
          },
          {
            caso: "Tu sobrino de 10 años te pregunta: Si Jesús dijo que el pan es su cuerpo, ¿por qué sigue pareciendo pan?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Es una figura, como cuando Jesús dijo que Él es la puerta: el pan representa su cuerpo.", bien: true, explica: "Así lo explica la lección: son figuras que señalan una realidad." },
              { texto: "Porque el pan no significa nada; solo es parte de la costumbre.", explica: "El pan y la copa son símbolos que el Señor eligió para que lo recordemos y lo anunciemos." },
              { texto: "Eso no se pregunta en la iglesia; mejor no pienses más en eso.", explica: "Es una buena pregunta, y la lección la responde: Jesús habló con figuras que señalan una realidad." },
              { texto: "Nadie sabe lo que quiso decir Jesús; es un misterio sin respuesta.", explica: "La Biblia lo explica: Jesús habló así como cuando dijo que es la puerta o la vid." },
            ],
            apoyo: "Jesús habló así como cuando dijo que Él es la puerta o la vid",
            ref: "Juan 10:9; 15:5",
            explica: "Jesús usó figuras que señalan una realidad: el pan y la copa son símbolos de su cuerpo y su sangre.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿A qué mirada de la Cena corresponde cada frase? Llévala a su grupo.",
            grupos: ["Hacia atrás: la cruz", "Hacia arriba y alrededor: comunión", "Hacia adelante: su regreso"],
            frases: [
              { texto: "Recordamos la muerte de Jesús por nosotros", grupo: 0 },
              { texto: "Lo hacemos en memoria de Él", grupo: 0 },
              { texto: "Tenemos comunión con Cristo", grupo: 1 },
              { texto: "Tenemos comunión con los hermanos", grupo: 1 },
              { texto: "Somos un solo cuerpo", grupo: 1 },
              { texto: "Anunciamos que Él volverá", grupo: 2 },
              { texto: "Esperamos su regreso", grupo: 2 },
            ],
            apoyo: "recordamos su muerte, tenemos comunión con Él y anunciamos que volverá",
            ref: "1 Corintios 10:16-17; 11:26",
            explica: "En la Santa Cena miramos atrás a la cruz, arriba y alrededor a Cristo y a los hermanos, y adelante a su regreso.",
          },
          {
            consigna: "¿Qué hacemos en cada mirada de la Santa Cena? Lleva cada frase a su grupo.",
            grupos: ["Recordar la cruz", "Tener comunión", "Esperar su regreso"],
            frases: [
              { texto: "Pensar en el cuerpo de Jesús, entregado en la cruz", grupo: 0 },
              { texto: "Traer a la memoria su sangre, derramada por nosotros", grupo: 0 },
              { texto: "Estar en comunión con Cristo", grupo: 1 },
              { texto: "Estar unidos con los hermanos", grupo: 1 },
              { texto: "Saber que somos un solo cuerpo", grupo: 1 },
              { texto: "Anunciar que el Señor volverá", grupo: 2 },
              { texto: "Mirar al día en que Cristo vuelva", grupo: 2 },
            ],
            apoyo: "Hacia arriba y alrededor: tenemos comunión con Cristo y con los hermanos, porque somos un solo cuerpo",
            ref: "Lucas 22:19; 1 Corintios 10:16-17",
            explica: "Cada Santa Cena recuerda la cruz, nos une en comunión con Cristo y con los hermanos, y anuncia que Él volverá.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Hacia adelante: anunciamos la muerte del Señor hasta que Él venga",
            ref: "1 Corintios 11:26",
            clave: {
              id: "pr-n1-bautismo-cena-3-a6-1",
              tipo: "corta",
              pregunta: "Explica las tres miradas de la Santa Cena.",
              ideas: [
                { id: "atras", peso: 34, texto: "Hacia atrás: recordamos la muerte de Jesús por nosotros.", formas: ["record*", "recuerd*", "memoria", "hacia atras", "muerte de jesus", "murio por nosotros", "cruz"] },
                { id: "comunion", peso: 33, texto: "Hacia arriba y alrededor: tenemos comunión con Cristo y con los hermanos.", formas: ["comunion", "hermanos", "un solo cuerpo", "hacia arriba", "alrededor", "unidos", "unidad"] },
                { id: "adelante", peso: 33, texto: "Hacia adelante: anunciamos su muerte hasta que Él venga.", formas: ["hasta que (el|venga|vuelva|regrese)", "regres*", "volver*", "vuelv*", "venga", "hacia adelante", "venida", "anunci*"] },
              ],
              modelo: "Hacia atrás, recordamos la muerte de Jesús en la cruz. Hacia arriba y alrededor, tenemos comunión con Cristo y con los hermanos. Hacia adelante, anunciamos su muerte hasta que Él vuelva.",
            },
          },
          {
            apoyo: "las tres miradas de la Santa Cena: recordar, tener comunión y esperar su regreso",
            ref: "1 Corintios 10:16-17",
            clave: {
              id: "pr-n1-bautismo-cena-3-a6-2",
              tipo: "corta",
              pregunta: "Cuando participas de la Santa Cena, ¿qué recuerdas, con quién tienes comunión y qué esperas?",
              ideas: [
                { id: "recuerdo", peso: 34, texto: "Recuerdo la muerte de Jesús por nosotros.", formas: ["recuerd*", "record*", "memoria", "muri*", "muerte", "cruz"] },
                { id: "comunion", peso: 33, texto: "Tengo comunión con Cristo y con los hermanos.", formas: ["con cristo", "con jesus", "con el senor", "con dios", "hermanos", "un solo cuerpo", "iglesia"] },
                { id: "espero", peso: 33, texto: "Espero su regreso: anuncio su muerte hasta que Él venga.", formas: ["regres*", "volver*", "vuelv*", "venga", "venida", "hasta que", "anunci*"] },
              ],
              modelo: "Recuerdo que Jesús murió por mí en la cruz. Tengo comunión con Cristo y con los hermanos, porque somos un solo cuerpo. Y espero su regreso: anuncio su muerte hasta que Él venga.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Participar con el corazón preparado
    "n1-bautismo-cena-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pasaba en Corinto en la Cena del Señor?", reverso: "Algunos llegaban con divisiones y egoísmo: unos comían su propia cena y otros pasaban hambre.", apoyo: "unos comían su propia cena mientras otros pasaban hambre" },
              { frente: "¿Por qué la Cena es santa?", reverso: "Porque nos habla de la cruz. Por eso no se toma a la ligera.", apoyo: "La Cena es santa porque nos habla de la cruz" },
              { frente: "¿Quién es digno por sí mismo de participar?", reverso: "Nadie: participamos por la gracia de Cristo.", apoyo: "Nadie es digno por sí mismo: participamos por la gracia de Cristo." },
              { frente: "Si fallaste, ¿qué haces ante la mesa del Señor?", reverso: "No huyas de la mesa: confiesa tu pecado y participa con un corazón limpio.", apoyo: "Si fallaste, no huyas de la mesa: confiesa tu pecado y participa con un corazón limpio." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué corrigió Pablo a los corintios?", reverso: "Por sus divisiones y su egoísmo en la Cena del Señor.", apoyo: "algunos llegaban a la Cena del Señor con divisiones y egoísmo" },
              { frente: "¿Qué es participar indignamente?", reverso: "Hacerlo sin reverencia, sin discernir lo que representa, o aferrados a un pecado que no queremos dejar.", apoyo: "Participar indignamente es hacerlo sin reverencia, sin discernir lo que representa, o aferrados a un pecado que no queremos dejar." },
              { frente: "¿Qué pide Pablo a cada uno antes de participar?", reverso: "Que se examine a sí mismo y así participe.", apoyo: "Pablo no prohíbe participar; dice: «pruébese cada uno a sí mismo, y coma así del pan»" },
              { frente: "¿Quiénes participan de la Santa Cena?", reverso: "Los que han creído en Jesús.", apoyo: "La Santa Cena es para los que han creído en Jesús." },
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
            consigna: "Lo que pasó en Corinto: una de estas frases tiene un error. Tócala.",
            frases: [
              "En Corinto, algunos llegaban a la Cena del Señor con divisiones y egoísmo.",
              "Unos comían su propia cena mientras otros pasaban hambre.",
              "Pablo los corrigió porque celebraban la Cena muy seguido.",
              "Pablo les escribió para recordarles lo que el Señor había enseñado.",
            ],
            malo: 2,
            correccion: "Pablo los corrigió por sus divisiones y su egoísmo, y les recordó lo que el Señor había enseñado.",
            apoyo: "algunos llegaban a la Cena del Señor con divisiones y egoísmo",
            ref: "1 Corintios 11:23-26",
            explica: "El problema en Corinto no era cada cuánto la celebraban, sino las divisiones y el egoísmo con que llegaban a la mesa.",
          },
          {
            consigna: "Lo que Pablo recordó sobre la Cena: una de estas frases tiene un error. Tócala.",
            frases: [
              "Pablo repite las palabras de Jesús sobre el pan y la copa.",
              "El pan es su cuerpo y la copa es el nuevo pacto en su sangre.",
              "Como la Cena es una comida más, se puede tomar a la ligera.",
              "Cada vez que comemos el pan y bebemos la copa, anunciamos la muerte del Señor.",
            ],
            malo: 2,
            correccion: "La Cena no es una comida más: es santa porque nos habla de la cruz, y por eso no se toma a la ligera.",
            apoyo: "La Cena es santa porque nos habla de la cruz; por eso no se toma a la ligera.",
            ref: "1 Corintios 11:23-26",
            explica: "Los corintios trataban la Cena como su propia comida. Pablo les recordó que es santa porque anuncia la muerte del Señor.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Examinarse antes de la Santa Cena: ¿qué es verdad y qué es un error?",
            afirmaciones: [
              { texto: "Participar indignamente de la Cena es hacerlo sin reverencia o aferrado a un pecado que no quieres dejar.", verdad: true, explica: "También es participar sin discernir lo que representa la Cena.", apoyo: "Participar indignamente es hacerlo sin reverencia, sin discernir lo que representa, o aferrados a un pecado que no queremos dejar.", ref: "1 Corintios 11:27-29" },
              { texto: "Para participar de la Santa Cena, tengo que ser digno por mis buenas obras.", verdad: false, explica: "Nadie es digno por sí mismo: participamos por la gracia de Cristo.", apoyo: "Nadie es digno por sí mismo: participamos por la gracia de Cristo." },
              { texto: "Antes de la Cena, examinarse es mirar el corazón delante de Dios.", verdad: true, explica: "Y luego confesar lo que haya que confesar, perdonar a quien haya que perdonar y participar con fe y gratitud.", apoyo: "Examinarse es mirar el corazón delante de Dios, confesar lo que haya que confesar", ref: "1 Corintios 11:28" },
            ],
          },
          {
            consigna: "Examinarse antes de la Santa Cena: ¿qué es verdad y qué es un error?",
            afirmaciones: [
              { texto: "Si fallé en algo esta semana, mejor no participo de la Santa Cena.", verdad: false, explica: "Si fallaste, no huyas de la mesa: confiesa tu pecado y participa con un corazón limpio.", apoyo: "Si fallaste, no huyas de la mesa: confiesa tu pecado y participa con un corazón limpio." },
              { texto: "Antes de la Cena, examinarse incluye confesar lo que haya que confesar y perdonar a quien haya que perdonar.", verdad: true, explica: "Después de mirar el corazón delante de Dios, se confiesa, se perdona y, entonces, se participa con fe y gratitud.", apoyo: "confesar lo que haya que confesar, perdonar a quien haya que perdonar" },
              { texto: "Examinarse antes de la Cena es compararme con los demás para ver si soy mejor que ellos.", verdad: false, explica: "Examinarse es mirar mi propio corazón delante de Dios: cada uno se prueba a sí mismo.", apoyo: "Examinarse es mirar el corazón delante de Dios" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "¿En qué orden va una preparación sencilla para la Santa Cena?",
            pasos: ["Pedir a Dios que examine mi corazón", "Confesarle lo que Él me muestre", "Recibir su perdón", "Participar con fe y gratitud"],
            apoyo: "Confiesa tus pecados: Él es fiel y justo para perdonarte y limpiarte",
            ref: "Salmos 139:23-24; 1 Juan 1:9",
            explica: "Primero pido a Dios que examine mi corazón y le confieso lo que Él me muestre; Él me perdona y, entonces, participo con fe y gratitud.",
          },
          {
            consigna: "Es sábado y mañana hay Santa Cena. ¿En qué orden pasa esto?",
            pasos: [
              "Hoy, le pides a Dios que examine tu corazón",
              "Él te muestra algo pendiente con un hermano",
              "Llamas a ese hermano y buscas la paz con él",
              "Mañana, participas con fe y gratitud",
            ],
            apoyo: "Si tienes algo pendiente con un hermano, busca primero la paz con él",
            ref: "Salmos 139:23-24; Mateo 5:23-24",
            explica: "La preparación empieza antes del culto: examinar el corazón y buscar la paz con el hermano. Entonces se participa con fe y gratitud.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "El sábado discutiste fuerte con un hermano de la iglesia, y el domingo hay Santa Cena.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Busco la paz con él, confieso a Dios mi parte y participo con fe.", bien: true, explica: "Así lo enseña la lección: si tienes algo pendiente con un hermano, busca primero la paz con él." },
              { texto: "Participo como si nada; una discusión no tiene que ver con la Cena.", explica: "La Cena no se toma a la ligera: antes de participar, se busca la paz con el hermano." },
              { texto: "Ese domingo no voy a la iglesia, así no tengo que verlo.", explica: "Huir no arregla nada: busca la paz con tu hermano y participa con un corazón limpio." },
              { texto: "Espero a que él venga primero a pedirme perdón a mí.", explica: "La lección dice que busques tú primero la paz con él." },
            ],
            apoyo: "Si tienes algo pendiente con un hermano, busca primero la paz con él",
            ref: "Mateo 5:23-24",
            explica: "Antes de la Cena se busca la paz con el hermano: la mesa del Señor es un lugar de corazones limpios.",
          },
          {
            caso: "Esta semana volviste a decir una mentira en el trabajo. El domingo hay Santa Cena y piensas: Mejor no participo; no soy digno.",
            pregunta: "¿Qué es lo mejor?",
            opciones: [
              { texto: "Confesarle a Dios esa mentira, recibir su perdón y participar.", bien: true, explica: "Si fallaste, no huyas de la mesa: Dios es fiel y justo para perdonarte y limpiarte." },
              { texto: "No participar más de la Cena hasta llegar a ser perfecto.", explica: "Nadie es digno por sí mismo: participamos por la gracia de Cristo." },
              { texto: "Participar sin pensar en eso; una mentira no tiene importancia.", explica: "La Cena se toma con reverencia: primero se confiesa lo que haya que confesar." },
              { texto: "Esperar unos meses sin participar, hasta que se te olvide.", explica: "No hace falta esperar: confiesa tu pecado y participa con un corazón limpio." },
            ],
            apoyo: "Confiesa tus pecados: Él es fiel y justo para perdonarte y limpiarte",
            ref: "1 Juan 1:9",
            explica: "La mesa del Señor es un lugar de gracia: no se huye de ella; se llega con el pecado confesado.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Examinarse es mirar el corazón delante de Dios, confesar lo que haya que confesar, perdonar a quien haya que perdonar y, entonces, participar con fe y gratitud.",
            ref: "1 Corintios 11:28",
            clave: {
              id: "pr-n1-bautismo-cena-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué significa examinarse a sí mismo antes de la Santa Cena?",
              ideas: [
                { id: "corazon", peso: 40, texto: "Es mirar el corazón delante de Dios.", formas: ["mira* (el|mi|tu|su|nuestro) corazon", "revis* (el|mi|tu|su|nuestro) corazon", "examin* (el|mi|tu|su|nuestro) corazon", "corazon delante de dios", "delante de dios", "mi corazon", "nuestro corazon", "el corazon"] },
                { id: "confesar", peso: 30, texto: "Es confesar lo que haya que confesar y perdonar a quien haya que perdonar.", formas: ["confes*", "confies*", "perdon*", "arrepent*", "arrepient*"] },
                { id: "participar", peso: 30, texto: "Y, entonces, participar con fe y gratitud.", formas: ["particip*", "con fe", "gratitud", "agradec*", "tomar la cena", "comer del pan"] },
              ],
              modelo: "Examinarse es mirar mi corazón delante de Dios, confesar lo que tengo que confesar y perdonar a quien tenga que perdonar. Entonces participo de la Cena con fe y gratitud.",
            },
          },
          {
            apoyo: "Participar indignamente es hacerlo sin reverencia, sin discernir lo que representa",
            ref: "1 Corintios 11:27-29",
            clave: {
              id: "pr-n1-bautismo-cena-4-a6-2",
              tipo: "corta",
              pregunta: "¿Qué revisa el creyente al examinarse antes de la Cena, y qué hace después?",
              ideas: [
                { id: "revisa", peso: 50, texto: "Revisa que no vaya a participar sin reverencia, sin discernir lo que representa o aferrado a un pecado.", formas: ["reverencia", "discern*", "aferrad*", "pecado", "a la ligera", "su corazon", "mi corazon", "el corazon"], negativa: true },
                { id: "despues", peso: 50, texto: "Confiesa, perdona y participa con fe y gratitud.", formas: ["confes*", "confies*", "perdon*", "particip*", "gratitud", "con fe"] },
              ],
              modelo: "Revisa su corazón delante de Dios, para no participar sin reverencia ni aferrado a un pecado. Después confiesa su pecado, perdona a quien deba perdonar y participa con fe y gratitud.",
            },
          },
        ],
      },
    ],
  },
};
