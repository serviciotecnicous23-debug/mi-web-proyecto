// Las prácticas de las lecciones de «La iglesia, mi nueva familia» (Nivel 1). Siguen el modelo de n1-salvacion.ts:
// cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección.
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N1_IGLESIA: PracticasMateria = {
  materia: "n1-iglesia",
  mision: {
    titulo: "Mi lugar en la familia de Dios",
    intro: "Un amigo que acaba de creer en Jesús te pregunta qué es la iglesia, por qué congregarse, cómo servir y por qué dar. Repasa las cuatro lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar qué es la iglesia, por qué nos congregamos, cómo servir con tus dones y cómo dar con alegría.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Qué es la iglesia
    "n1-iglesia-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué significa la palabra iglesia?", reverso: "Asamblea: los que fueron llamados a reunirse.", apoyo: "La palabra iglesia traduce un término griego que significa asamblea: los que fueron llamados a reunirse." },
              { frente: "¿La iglesia es un edificio?", reverso: "No: son personas, el pueblo de Dios.", apoyo: "en la Biblia la iglesia no es un lugar: son personas" },
              { frente: "¿Qué hace falta para ser parte de la iglesia?", reverso: "Haber creído en Jesús.", apoyo: "Si has creído en Jesús, tú eres parte de la iglesia." },
              { frente: "¿Cuáles son las tres imágenes bíblicas de la iglesia?", reverso: "La familia, el cuerpo y el templo.", apoyo: "es el pueblo de Dios, su familia, el cuerpo de Cristo y el templo del Espíritu" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De dónde llamó Dios a su pueblo?", reverso: "De las tinieblas a su luz admirable.", apoyo: "La iglesia es el pueblo que Dios llamó de las tinieblas a su luz admirable" },
              { frente: "¿Por qué la iglesia es de Jesús?", reverso: "Porque Él dijo que la edificaría y la ganó con su propia sangre.", apoyo: "es suya, porque la ganó con su propia sangre" },
              { frente: "¿Qué es la iglesia universal?", reverso: "Todos los creyentes de todos los tiempos y lugares.", apoyo: "La iglesia universal está formada por todos los creyentes de todos los tiempos y lugares." },
              { frente: "¿Qué es la iglesia local?", reverso: "La congregación con la que te reúnes, aprendes, sirves y creces.", apoyo: "La iglesia local es la congregación con la que te reúnes, aprendes, sirves y creces." },
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
            consigna: "Completa lo que significa la palabra iglesia.",
            texto: "La palabra iglesia significa [[asamblea]]: los que fueron [[llamados]] a reunirse. En la Biblia, la iglesia no es un edificio: son [[personas]].",
            distractores: ["construcción", "obligados", "paredes"],
            errores: {
              construcción: "La iglesia no es una construcción: la palabra significa asamblea, los que fueron llamados a reunirse.",
              obligados: "Nadie los obligó: Dios los llamó de las tinieblas a su luz admirable.",
              paredes: "En la Biblia la iglesia no es un lugar: son personas.",
            },
            apoyo: "La palabra iglesia traduce un término griego que significa asamblea: los que fueron llamados a reunirse.",
            ref: "1 Pedro 2:9",
            explica: "La iglesia es la asamblea de los que Dios llamó: no es un edificio, sino su pueblo.",
          },
          {
            consigna: "Completa lo que dice la lección sobre quién es la iglesia.",
            texto: "La iglesia es el [[pueblo]] que Dios llamó de las [[tinieblas]] a su luz admirable. Si has creído en Jesús, tú eres [[parte]] de la iglesia.",
            distractores: ["edificio", "visitante", "lugar"],
            errores: {
              edificio: "La iglesia no es un edificio: es el pueblo que Dios llamó.",
              visitante: "Si creíste en Jesús, no eres un visitante: eres parte de la familia.",
              lugar: "En la Biblia la iglesia no es un lugar: son personas.",
            },
            apoyo: "La iglesia es el pueblo que Dios llamó de las tinieblas a su luz admirable",
            ref: "1 Pedro 2:9",
            explica: "La iglesia es el pueblo que Dios llamó, y todo el que ha creído en Jesús es parte de ese pueblo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Habla de la familia, del cuerpo o del templo? Lleva cada frase a su recuadro.",
            grupos: ["La iglesia es una familia", "La iglesia es un cuerpo", "La iglesia es un templo"],
            frases: [
              { texto: "Dios es nuestro Padre", grupo: 0 },
              { texto: "Los creyentes son nuestros hermanos", grupo: 0 },
              { texto: "Cristo es la cabeza", grupo: 1 },
              { texto: "Cada creyente es un miembro con una función", grupo: 1 },
              { texto: "Juntos somos edificados para morada de Dios", grupo: 2 },
              { texto: "Se edifica sobre el fundamento de los apóstoles y profetas", grupo: 2 },
              { texto: "Jesucristo es la principal piedra del ángulo", grupo: 2 },
            ],
            apoyo: "Describir tres imágenes bíblicas de la iglesia: la familia, el cuerpo y el templo.",
            ref: "Efesios 2:19-22; 1 Corintios 12:27",
            explica: "En la familia, Dios es nuestro Padre y los creyentes son nuestros hermanos. En el cuerpo, Cristo es la cabeza; en el templo, Jesucristo es la principal piedra del ángulo.",
          },
          {
            consigna: "¿De qué imagen de la iglesia habla cada frase? Llévala a su recuadro.",
            grupos: ["La iglesia es una familia", "La iglesia es un cuerpo", "La iglesia es un templo"],
            frases: [
              { texto: "Ya no somos extranjeros: somos de la familia de Dios", grupo: 0 },
              { texto: "Tenemos a Dios como Padre", grupo: 0 },
              { texto: "Los demás creyentes son nuestros hermanos", grupo: 0 },
              { texto: "Todos los miembros tienen a Cristo por cabeza", grupo: 1 },
              { texto: "Cada miembro cumple una función", grupo: 1 },
              { texto: "Somos morada de Dios en el Espíritu", grupo: 2 },
              { texto: "Jesucristo mismo es la principal piedra del ángulo", grupo: 2 },
            ],
            apoyo: "es el pueblo de Dios, su familia, el cuerpo de Cristo y el templo del Espíritu",
            ref: "Efesios 2:19-22",
            explica: "Las tres imágenes hablan de personas, no de un edificio: la familia de Dios, el cuerpo de Cristo y el templo que es morada de Dios en el Espíritu.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Cristo y la iglesia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La iglesia es del pastor que la fundó.", verdad: false, explica: "La iglesia es de Jesús: Él dijo que la edificaría, y la ganó con su propia sangre.", apoyo: "es suya, porque la ganó con su propia sangre", ref: "Mateo 16:18; Hechos 20:28" },
              { texto: "Cristo es la cabeza de la iglesia.", verdad: true, explica: "La iglesia es un cuerpo: Cristo es la cabeza, y cada creyente es un miembro con una función.", apoyo: "Un cuerpo: Cristo es la cabeza, y cada creyente es un miembro con una función", ref: "Colosenses 1:18" },
              { texto: "Jesucristo mismo es la principal piedra del ángulo de la iglesia.", verdad: true, explica: "La iglesia es un templo edificado sobre el fundamento de los apóstoles y profetas, y Jesucristo mismo es la principal piedra del ángulo.", apoyo: "siendo Jesucristo mismo la principal piedra del ángulo", ref: "Efesios 2:20" },
            ],
          },
          {
            consigna: "Sobre Cristo y su iglesia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús dijo que Él edificaría su iglesia.", verdad: true, explica: "La iglesia es de Jesús: Él dijo que la edificaría, y la ganó con su propia sangre.", apoyo: "Jesús dijo que Él edificaría su iglesia", ref: "Mateo 16:18" },
              { texto: "La cabeza de la iglesia es el líder más importante de la congregación.", verdad: false, explica: "Los pastores velan por tu alma, pero la cabeza de la iglesia es Cristo.", apoyo: "Un cuerpo: Cristo es la cabeza", ref: "Colosenses 1:18" },
              { texto: "El fundamento de la iglesia es el esfuerzo de sus miembros.", verdad: false, explica: "El fundamento de la iglesia es Cristo: Jesucristo mismo es la principal piedra del ángulo.", apoyo: "Cristo es su cabeza y su fundamento", ref: "Efesios 2:20" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Llevas tres semanas en la iglesia. Un domingo piensas: Todavía soy un visitante; la iglesia es de los que llevan años.",
            pregunta: "¿Qué pensamiento está de acuerdo con la lección?",
            opciones: [
              { texto: "Si creí en Jesús, ya soy parte de la iglesia: soy de la familia.", bien: true, explica: "En la Biblia la iglesia no es un lugar: son personas, y todo el que ha creído en Jesús es parte de ella." },
              { texto: "Seré parte de la iglesia cuando lleve varios años asistiendo.", explica: "No depende del tiempo que llevas: si creíste en Jesús, ya eres parte de la familia." },
              { texto: "La iglesia es el edificio; yo solo voy a visitarlo los domingos.", explica: "La iglesia no es un edificio: es el pueblo de Dios, y tú eres parte de él." },
              { texto: "Primero tengo que ser perfecto para ser parte de la iglesia.", explica: "La iglesia no es perfecta: está formada por personas que todavía están creciendo, igual que tú." },
            ],
            apoyo: "Si creíste en Jesús, eres parte de la familia.",
            ref: "Efesios 2:19",
            explica: "La iglesia es el pueblo de Dios: quien cree en Jesús ya no es extranjero, sino miembro de la familia de Dios.",
          },
          {
            caso: "Un amigo del trabajo te dice: Yo creo en Jesús, pero no voy a ninguna iglesia; ahí hay gente que falla.",
            pregunta: "¿Qué le respondes con cariño?",
            opciones: [
              { texto: "Tienes razón: es mejor seguir a Jesús por tu cuenta, sin iglesia.", explica: "Pertenecer a una iglesia local es parte de seguir a Jesús." },
              { texto: "La iglesia no es perfecta, pero Dios la eligió para que crezcamos juntos.", bien: true, explica: "Reconoce que hay fallas y muestra por qué Dios quiere que pertenezcamos a una iglesia local." },
              { texto: "En mi iglesia nadie falla; ven y verás que allí todos son perfectos.", explica: "No es así: la iglesia está formada por personas que todavía están creciendo." },
              { texto: "Busca una iglesia perfecta y, cuando la encuentres, quédate allí para siempre.", explica: "La iglesia no es perfecta: está formada por personas que todavía están creciendo, igual que tú." },
            ],
            apoyo: "pero es el lugar que Dios eligió para que crezcamos juntos",
            explica: "Dios quiere que pertenezcas a su familia en todo el mundo y a una iglesia local donde te conozcan, te cuiden y te enseñen.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús dijo que Él edificaría su iglesia",
            ref: "Mateo 16:18; Hechos 20:28",
            clave: {
              id: "pr-n1-iglesia-1-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué decimos que la iglesia es de Cristo?",
              ideas: [
                { id: "edifica", peso: 30, texto: "Jesús dijo que Él edificaría su iglesia.", formas: ["edificar", "edificaria", "edifica", "edificada", "edificando", "la edifico", "construi*", "construy*", "la (hizo|fundo|formo|levanto)", "es su obra"] },
                { id: "sangre", peso: 40, texto: "La ganó con su propia sangre.", formas: ["sangre", "la gano", "la compro", "dio su vida", "murio por (ella|nosotros|todos)", "murio por la iglesia", "pago* (por|con)"] },
                { id: "cabeza", peso: 30, texto: "Él es su cabeza.", formas: ["cabeza"] },
              ],
              modelo: "La iglesia es de Cristo porque Él dijo que edificaría su iglesia y la ganó con su propia sangre. Además, Cristo es su cabeza y su fundamento.",
            },
          },
          {
            apoyo: "Cristo es su cabeza y su fundamento",
            ref: "Colosenses 1:18; Efesios 2:20",
            clave: {
              id: "pr-n1-iglesia-1-a6-2",
              tipo: "corta",
              pregunta: "¿Qué lugar tiene Cristo en la iglesia?",
              ideas: [
                { id: "cabeza", peso: 50, texto: "Cristo es la cabeza de la iglesia, que es su cuerpo.", formas: ["cabeza"] },
                { id: "fundamento", peso: 50, texto: "Cristo es su fundamento: la principal piedra del ángulo.", formas: ["fundament*", "piedra", "angulo", "base", "cimient*"] },
              ],
              modelo: "Cristo es la cabeza de la iglesia, y cada creyente es un miembro de su cuerpo. También es su fundamento: Jesucristo mismo es la principal piedra del ángulo.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Congregarse
    "n1-iglesia-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuáles eran las cuatro prácticas de la primera iglesia?", reverso: "La doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones.", apoyo: "La primera iglesia perseveraba en la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones" },
              { frente: "¿Qué es perseverar en la doctrina de los apóstoles?", reverso: "Aprender la Palabra.", apoyo: "la doctrina de los apóstoles, es decir, aprender la Palabra" },
              { frente: "¿Dónde se reunían los primeros creyentes?", reverso: "En el templo y en las casas.", apoyo: "Se reunían en el templo y en las casas" },
              { frente: "¿Qué hacía el Señor cada día?", reverso: "Añadía a la iglesia los que habían de ser salvos.", apoyo: "el Señor añadía cada día a la iglesia los que habían de ser salvos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pasa con una brasa que se saca del fuego?", reverso: "Se apaga pronto; junto a las demás, sigue encendida.", apoyo: "Una brasa que se saca del fuego se apaga pronto; junto a las demás, sigue encendida." },
              { frente: "¿Para qué nos pide Hebreos que nos consideremos unos a otros?", reverso: "Para estimularnos al amor y a las buenas obras.", apoyo: "Hebreos nos pide considerarnos unos a otros para estimularnos al amor y a las buenas obras" },
              { frente: "¿Qué hacemos al reunirnos?", reverso: "Adoramos juntos, oímos la Palabra, oramos unos por otros y nos animamos.", apoyo: "Al reunirnos, adoramos juntos, oímos la Palabra, oramos unos por otros y nos animamos" },
              { frente: "¿Congregarse es solo asistir?", reverso: "No: es participar.", apoyo: "Congregarse no es solo asistir: es participar." },
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
            consigna: "Completa las cuatro cosas en que perseveraba la primera iglesia.",
            texto: "Después de Pentecostés, los nuevos creyentes perseveraban en la doctrina de los [[apóstoles]], en la comunión unos con otros, en el partimiento del [[pan]] y en las [[oraciones]].",
            distractores: ["reyes", "riquezas", "vino"],
            errores: {
              reyes: "Hechos 2:42 habla de la doctrina de los apóstoles, es decir, de aprender la Palabra.",
              riquezas: "No perseveraban en las riquezas: compartían lo que tenían con los necesitados. La cuarta práctica eran las oraciones.",
              vino: "Hechos 2:42 habla del partimiento del pan.",
            },
            apoyo: "Después de Pentecostés, los nuevos creyentes perseveraban en cuatro cosas",
            ref: "Hechos 2:42",
            explica: "Las cuatro prácticas de la primera iglesia fueron la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones.",
          },
          {
            consigna: "Completa lo que hacía la primera iglesia, según Hechos 2:42.",
            texto: "La primera iglesia perseveraba en la [[doctrina]] de los apóstoles, es decir, en [[aprender]] la Palabra, y en la [[comunión]] unos con otros.",
            distractores: ["fama", "olvidar", "competencia"],
            errores: {
              fama: "No se trataba de la fama de los apóstoles, sino de su doctrina: aprender la Palabra.",
              olvidar: "Perseverar en la doctrina de los apóstoles es aprender la Palabra.",
              competencia: "Los primeros creyentes perseveraban en la comunión unos con otros.",
            },
            apoyo: "la doctrina de los apóstoles, es decir, aprender la Palabra",
            ref: "Hechos 2:42",
            explica: "Aprender la Palabra y vivir la comunión unos con otros eran dos de las cuatro prácticas; las otras dos eran el partimiento del pan y las oraciones.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la primera iglesia tiene un error. Tócala.",
            frases: [
              "Después de Pentecostés, los nuevos creyentes perseveraban en tres cosas.",
              "Perseveraban en la doctrina de los apóstoles, es decir, en aprender la Palabra.",
              "Perseveraban en la comunión unos con otros y en el partimiento del pan.",
              "Perseveraban también en las oraciones.",
            ],
            malo: 0,
            correccion: "Perseveraban en cuatro cosas: la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones.",
            apoyo: "Después de Pentecostés, los nuevos creyentes perseveraban en cuatro cosas",
            ref: "Hechos 2:42",
            explica: "Hechos 2:42 nombra cuatro cosas: la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones.",
          },
          {
            consigna: "Una frase sobre cómo vivían los primeros creyentes tiene un error. Tócala.",
            frases: [
              "Los primeros creyentes aprendían la Palabra y vivían en comunión unos con otros.",
              "Perseveraban en el partimiento del pan y en las oraciones.",
              "Compartían lo que tenían con los necesitados y alababan a Dios con alegría.",
              "Se reunían solo en el templo, nunca en las casas.",
            ],
            malo: 3,
            correccion: "Se reunían en el templo y en las casas.",
            apoyo: "Se reunían en el templo y en las casas",
            ref: "Hechos 2:42-46",
            explica: "Los primeros creyentes se reunían en el templo y en las casas, compartían con los necesitados y alababan a Dios con alegría.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tuviste una semana muy dura en el trabajo. Es domingo y piensas quedarte en casa, porque no tienes ánimo para ver a nadie.",
            pregunta: "¿Qué es lo mejor que puedes hacer?",
            opciones: [
              { texto: "Quedarme solo en casa hasta que se me pase el desánimo.", explica: "Como la brasa que se saca del fuego, el creyente solo se apaga pronto: necesita a sus hermanos." },
              { texto: "Ir a la reunión: allí oramos unos por otros y nos animamos.", bien: true, explica: "Congregarse fortalece: al reunirnos, nos animamos unos a otros, sobre todo en los momentos difíciles." },
              { texto: "Ir, pero llegar tarde y salir sin hablar con nadie.", explica: "Congregarse no es solo asistir: es participar." },
              { texto: "Esperar a sentirme bien para volver a la iglesia.", explica: "Justo en los momentos difíciles la reunión nos anima: no hace falta esperar a estar bien." },
            ],
            apoyo: "Al reunirnos, adoramos juntos, oímos la Palabra, oramos unos por otros y nos animamos, sobre todo en los momentos difíciles.",
            ref: "Hebreos 10:24-25",
            explica: "Hebreos nos pide no dejar de congregarnos: juntos nos animamos, y eso nos fortalece en los días difíciles.",
          },
          {
            caso: "Tu primo, que también es creyente, te dice: Ya no voy a la iglesia; veo el culto por internet desde mi cama. Es lo mismo y es más cómodo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: si ves el culto por internet desde tu casa, ya te congregaste.", explica: "Congregarse no es solo asistir: es participar, orar unos por otros y animarnos." },
              { texto: "Internet ayuda al que no puede ir; si tú puedes, nada reemplaza la comunión cara a cara.", bien: true, explica: "Valora las transmisiones y lo anima a volver a la comunión con la familia de la fe siempre que sea posible." },
              { texto: "Ver el culto por internet es pecado; no lo vuelvas a hacer nunca más.", explica: "No: las transmisiones en vivo bendicen a quienes no pueden asistir por enfermedad o distancia." },
              { texto: "Entonces yo también me quedaré en casa los domingos, viendo el culto desde la cama.", explica: "Siempre que sea posible, nada reemplaza la oración, el abrazo y la comunión cara a cara." },
            ],
            apoyo: "Pero, siempre que sea posible, nada reemplaza la oración, el abrazo y la comunión cara a cara con la familia de la fe.",
            ref: "Hebreos 10:25",
            explica: "Hebreos lo dice así: «no dejando de congregarnos, como algunos tienen por costumbre». Las transmisiones ayudan a quien no puede ir, pero no reemplazan la reunión con los hermanos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada paso con lo que te ayuda a hacer.",
            pares: [
              ["Llegar con el corazón preparado", "Adorar y escuchar bien la Palabra"],
              ["Unirte a un grupo pequeño o célula", "Crecer junto con otros"],
              ["Aprender el nombre de tus hermanos", "Orar por cada uno por su nombre"],
              ["Acercarte a tus pastores y líderes", "Tener quien vele por tu alma"],
            ],
            apoyo: "Congregarse no es solo asistir: es participar.",
            ref: "Hebreos 13:17",
            explica: "Participar es más que asistir: llegar preparado, unirte a una célula, orar por tus hermanos y acercarte a tus pastores.",
          },
          {
            consigna: "Une lo que quieres con el paso que te ayuda.",
            pares: [
              ["Quieres crecer junto con otros", "Únete a un grupo pequeño o célula"],
              ["Quieres adorar y escuchar bien la Palabra", "Llega con el corazón preparado"],
              ["Quieres orar por cada hermano por su nombre", "Aprende el nombre de tus hermanos"],
              ["Quieres que alguien vele por tu alma", "Acércate a tus pastores y líderes"],
            ],
            apoyo: "Congregarse es una decisión de cada semana.",
            ref: "Hebreos 13:17",
            explica: "Congregarse es una decisión de cada semana: con pasos concretos pasas de solo asistir a participar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "congregarnos con fidelidad nos fortalece y nos permite animarnos unos a otros",
            ref: "Hebreos 10:24-25",
            clave: {
              id: "pr-n1-iglesia-2-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué no debemos dejar de congregarnos?",
              ideas: [
                { id: "animar", peso: 50, texto: "Al reunirnos nos animamos unos a otros y nos estimulamos al amor y a las buenas obras.", formas: ["anim*", "estimul*", "unos a otros", "unos por otros", "buenas obras", "al amor", "nos ayudamos", "apoy*"] },
                { id: "fortalece", peso: 50, texto: "Congregarnos nos fortalece: juntos adoramos, oímos la Palabra y oramos.", formas: ["fortalec*", "fuerza*", "fuerte*", "adora*", "oimos la palabra", "escuch* la palabra", "ora*", "mantener* vivo", "encendid*", "no (nos|me) apag*"] },
              ],
              modelo: "Porque al reunirnos adoramos juntos, oímos la Palabra y oramos unos por otros. Así nos fortalecemos y nos animamos al amor y a las buenas obras, sobre todo en los momentos difíciles.",
            },
          },
          {
            apoyo: "Así pasa con el creyente: necesita a sus hermanos para mantener vivo su fuego.",
            ref: "Hebreos 10:24-25",
            clave: {
              id: "pr-n1-iglesia-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué nos enseña la brasa que se saca del fuego sobre congregarnos?",
              ideas: [
                { id: "apaga", peso: 50, texto: "Una brasa sola se apaga pronto; junto a las demás, sigue encendida.", formas: ["apag*", "encendid*", "enfri*", "pierde (el|su) fuego", "sin fuego"] },
                { id: "hermanos", peso: 50, texto: "El creyente necesita a sus hermanos para mantener vivo su fuego.", formas: ["hermanos", "creyente*", "cristian*", "familia", "juntos (nos|seguimos|estamos|permanecemos|mantenemos)", "(nos|me|te) apag*", "necesit* (otros|demas|hermanos)", "mantener* vivo", "unos a otros", "comunidad", "iglesia"] },
              ],
              modelo: "Una brasa que se saca del fuego se apaga pronto, pero junto a las demás sigue encendida. Así el creyente necesita a sus hermanos para mantener vivo su fuego.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Servir con mis dones
    "n1-iglesia-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quién recibió un don, según Pedro?", reverso: "Cada uno: todo creyente recibió un don.", apoyo: "Pedro enseña que cada uno ha recibido un don" },
              { frente: "¿Para qué son los dones?", reverso: "Para edificar a la iglesia y para que en todo sea Dios glorificado.", apoyo: "sino para edificar a la iglesia y para que en todo sea Dios glorificado" },
              { frente: "¿Qué dijo Jesús de sí mismo en Marcos 10:45?", reverso: "Que no vino para ser servido, sino para servir y dar su vida.", apoyo: "Jesús dijo que no vino para ser servido, sino para servir y dar su vida" },
              { frente: "¿Qué dos tipos de dones nombra Romanos 12, según la lección?", reverso: "Dones de palabra y dones de servicio.", apoyo: "Hay dones de palabra, como enseñar o animar, y dones de servicio" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dones de servicio nombra la lección?", reverso: "Ayudar, dirigir, repartir o mostrar misericordia.", apoyo: "dones de servicio, como ayudar, dirigir, repartir o mostrar misericordia" },
              { frente: "¿Quién colocó a cada miembro en el cuerpo?", reverso: "Dios lo hizo, como Él quiso.", apoyo: "Dios colocó a cada miembro en el cuerpo como Él quiso." },
              { frente: "¿Con qué amamos cuando servimos?", reverso: "Con las manos: servir es amar con las manos.", apoyo: "Servir es amar con las manos." },
              { frente: "¿A quiénes debe servir cada uno con su don?", reverso: "A los otros: cada uno debe ministrar su don a los demás.", apoyo: "Pedro enseña que cada uno ha recibido un don y que debe ministrarlo a los otros" },
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
            consigna: "Completa lo que enseña Pedro sobre cada creyente.",
            texto: "Cada uno ha recibido un [[don]] y debe ministrarlo a los [[otros]], como buen [[administrador]] de la multiforme gracia de Dios.",
            distractores: ["dueño", "aplauso", "espectador"],
            errores: {
              dueño: "Pedro dice administrador: el don viene de la multiforme gracia de Dios y se ministra a los otros.",
              aplauso: "Los dones no son para lucirse: son para edificar a la iglesia.",
              espectador: "Nadie está solo para mirar: cada uno debe ministrar su don a los otros.",
            },
            apoyo: "Pedro enseña que cada uno ha recibido un don y que debe ministrarlo a los otros, como buen administrador de la multiforme gracia de Dios.",
            ref: "1 Pedro 4:10",
            explica: "Todo creyente recibió un don de Dios, y lo administra bien cuando lo usa para servir a los demás.",
          },
          {
            consigna: "Completa para qué son los dones.",
            texto: "Los dones no son para lucirse, sino para [[edificar]] a la [[iglesia]] y para que en todo sea [[Dios]] glorificado.",
            distractores: ["yo", "presumir", "dividir"],
            errores: {
              yo: "Los dones no son para lucirse: son para que en todo sea Dios glorificado.",
              presumir: "Los dones no son para lucirse, sino para edificar a la iglesia.",
              dividir: "La lección dice que los dones son para edificar a la iglesia.",
            },
            apoyo: "Los dones no son para lucirse, sino para edificar a la iglesia y para que en todo sea Dios glorificado.",
            ref: "1 Pedro 4:10-11",
            explica: "Dios da los dones para servir: edifican a la iglesia y llevan la gloria a Dios, no a quien los usa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los miembros del cuerpo de Cristo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En la iglesia hay miembros que sobran.", verdad: false, explica: "Dios colocó a cada miembro en el cuerpo como Él quiso: nadie sobra.", apoyo: "En la iglesia nadie sobra, y nadie es más importante que otro.", ref: "1 Corintios 12:18" },
              { texto: "Los miembros que parecen más débiles son los más necesarios.", verdad: true, explica: "Así lo enseña Pablo: los que parecen más débiles son los más necesarios.", apoyo: "los miembros que parecen más débiles son los más necesarios", ref: "1 Corintios 12:22" },
              { texto: "Dios colocó a cada miembro en el cuerpo como Él quiso.", verdad: true, explica: "Cada miembro está en el cuerpo porque Dios lo colocó allí, como Él quiso.", apoyo: "Dios colocó a cada miembro en el cuerpo como Él quiso.", ref: "1 Corintios 12:18" },
            ],
          },
          {
            consigna: "Sobre la iglesia como un cuerpo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los que cantan o predican son más importantes que los que sirven sin que nadie los vea.", verdad: false, explica: "En la iglesia nadie es más importante que otro: todos somos necesarios.", apoyo: "En la iglesia nadie sobra, y nadie es más importante que otro.", ref: "1 Corintios 12:21-22" },
              { texto: "Todos los miembros del cuerpo de Cristo son necesarios.", verdad: true, explica: "Ni el ojo puede decir a la mano: «No te necesito». Cada miembro necesita a los demás.", apoyo: "Ni el ojo puede decir a la mano: «No te necesito»", ref: "1 Corintios 12:21" },
              { texto: "En la iglesia solo hacen falta los creyentes que tienen dones muy visibles.", verdad: false, explica: "Todos somos necesarios, y los miembros que parecen más débiles son los más necesarios.", apoyo: "Todos somos necesarios, y los miembros que parecen más débiles son los más necesarios.", ref: "1 Corintios 12:22" },
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
            consigna: "Ordena los pasos para empezar a servir, como los enseña la lección.",
            pasos: [
              "Primero, orar y preguntarle a Dios dónde quiere que sirvas",
              "Mirar lo que sabes hacer y lo que te apasiona",
              "Hablar con tus líderes de lo que te gustaría hacer",
              "Empezar por algo sencillo",
              "Seguir sirviendo con alegría y humildad, como para el Señor",
            ],
            apoyo: "Habla con tus líderes y empieza por algo sencillo",
            ref: "Lucas 16:10; Colosenses 3:23",
            explica: "Primero se ora y se mira lo que sabes hacer; luego se habla con los líderes, se empieza por algo sencillo y se sigue sirviendo con alegría, como para el Señor.",
          },
          {
            consigna: "Marta quiere empezar a servir en su iglesia. Ordena lo que hace, según la lección.",
            pasos: [
              "Primero ora y le pregunta a Dios dónde quiere que sirva",
              "Mira lo que sabe hacer y descubre que le apasionan los niños",
              "Les cuenta a sus líderes que quiere servir con los niños",
              "Empieza ayudando en algo sencillo con los niños",
              "Sigue sirviendo con alegría, como para el Señor y no para los hombres",
            ],
            apoyo: "Mira lo que sabes hacer y lo que te apasiona",
            ref: "Lucas 16:10; Colosenses 3:23",
            explica: "Servir empieza en oración, sigue con lo que te apasiona y con tus líderes, y crece desde lo sencillo: el que es fiel en lo muy poco, también en lo más es fiel.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Te encanta cocinar y te gusta recibir a la gente. Quieres servir en la iglesia, pero no sabes por dónde empezar.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Oro, hablo con mis líderes y empiezo por algo sencillo, como ayudar en la cocina.", bien: true, explica: "Parte de lo que sabes hacer y te apasiona, y empieza por algo sencillo con tus líderes." },
              { texto: "Espero a que alguien me llame; si Dios quisiera, ya me lo habrían pedido.", explica: "Servir empieza por orar y hablar con tus líderes; no hace falta esperar a que te llamen." },
              { texto: "Pido que me pongan a dirigir un ministerio grande desde el primer día.", explica: "La lección enseña a empezar por algo sencillo: el que es fiel en lo muy poco, también en lo más es fiel." },
              { texto: "Espero a estudiar los dones espirituales en el Nivel 2 para empezar a servir.", explica: "Los dones del Espíritu los estudiarás a fondo en el Nivel 2, pero ya puedes empezar con lo que sabes hacer y te apasiona." },
            ],
            apoyo: "Mira lo que sabes hacer y lo que te apasiona: la música, los niños, la tecnología, la cocina, la limpieza, la oración o recibir a los que llegan.",
            ref: "Lucas 16:10",
            explica: "Lo que sabes hacer y lo que te apasiona te ayudan a ver dónde servir; con tus líderes, empiezas por algo sencillo.",
          },
          {
            caso: "Un compañero nuevo de tu célula dice: Yo no sé cantar ni predicar. Solo sé de computadoras, así que en la iglesia no tengo dónde servir.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Es verdad: en la iglesia solo pueden servir los que saben cantar o predicar.", explica: "En el cuerpo todos son necesarios, y la tecnología también es un área para servir." },
              { texto: "Lo que sabes de tecnología sirve: habla con tus líderes y empieza por algo sencillo.", bien: true, explica: "Le ayuda a ver que lo que sabe hacer puede servir a la iglesia y le da un primer paso." },
              { texto: "Espera a recibir un don espiritual, porque sin él no puedes servir en la iglesia.", explica: "Puedes empezar con lo que sabes hacer; los dones del Espíritu los estudiarás a fondo en el Nivel 2." },
              { texto: "Sirve solo cuando el pastor te vea, para que te tomen en cuenta en la iglesia.", explica: "Se sirve con alegría y humildad, como para el Señor y no para los hombres." },
            ],
            apoyo: "la música, los niños, la tecnología, la cocina, la limpieza, la oración o recibir a los que llegan",
            ref: "Colosenses 3:23",
            explica: "La lección nombra muchas áreas para servir, como la música, los niños, la tecnología o la cocina: lo que sabes hacer puede servir a la iglesia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Cada creyente recibió dones de Dios para servir a los demás",
            ref: "1 Pedro 4:10-11",
            clave: {
              id: "pr-n1-iglesia-3-a6-1",
              tipo: "corta",
              pregunta: "¿Para qué nos dio Dios dones, y para qué no?",
              ideas: [
                { id: "servir", peso: 40, texto: "Para servir a los demás: cada uno ministra su don a los otros.", formas: ["servir", "sirv*", "servicio", "ministr*", "a los (demas|otros|hermanos)", "ayudar"] },
                { id: "edificar", peso: 30, texto: "Para edificar a la iglesia y para que en todo Dios sea glorificado.", formas: ["edificar", "edifica", "edificarla", "edificando", "edificacion", "glori*", "honr*", "bien de la iglesia", "crec* iglesia", "fortalec* iglesia"] },
                { id: "lucirse", peso: 30, texto: "No son para lucirse.", formas: ["no (son|es) para (luci*|presumir|admir*)", "no para (luci*|presumir|admir*)", "ni para (luci*|presumir|admir*)", "no (son|es) para que (lo|nos|te|me) admiren", "no (son|es) para (el|uno|si|mi)", "no (son|es) para (nuestra|su|mi) (gloria|fama)"], negativa: true },
              ],
              modelo: "Dios nos dio dones para servir a los demás. No son para lucirse, sino para edificar a la iglesia y para que en todo sea Dios glorificado.",
            },
          },
          {
            apoyo: "Los dones no son para lucirse, sino para edificar a la iglesia y para que en todo sea Dios glorificado.",
            ref: "1 Pedro 4:10-11",
            clave: {
              id: "pr-n1-iglesia-3-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice que su don es para que la gente lo admire. ¿Qué le explicas?",
              ideas: [
                { id: "lucirse", peso: 30, texto: "Los dones no son para lucirse.", formas: ["no (son|es) para (luci*|presumir|admir*)", "no para (luci*|presumir|admir*)", "ni para (luci*|presumir|admir*)", "no (son|es) para que (lo|nos|te|la) admiren", "no (son|es) para (el|uno|si)", "no (son|es) para su (gloria|fama)"], negativa: true },
                { id: "servir", peso: 40, texto: "Son para servir a los demás y edificar a la iglesia.", formas: ["servir", "sirv*", "servicio", "ministr*", "edificar", "edifica", "edificarla", "edificando", "a los (demas|otros|hermanos)", "ayudar"] },
                { id: "gloria", peso: 30, texto: "Son para que en todo sea Dios glorificado.", formas: ["glori*", "honr*", "para dios", "dios (sea|reciba)"] },
              ],
              modelo: "Le explico que los dones no son para lucirse ni para que lo admiren. Son para servir a los demás, edificar a la iglesia y que en todo Dios sea glorificado.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Dar con alegría
    "n1-iglesia-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De quién es la tierra y su plenitud?", reverso: "De Jehová: todo es de Dios.", apoyo: "La Biblia enseña que de Jehová es la tierra y su plenitud" },
              { frente: "¿Qué cosas nos confía Dios?", reverso: "Nuestro tiempo, nuestros talentos y nuestros bienes.", apoyo: "Lo que tenemos —tiempo, talentos y bienes— es algo que Dios nos confía." },
              { frente: "¿Qué se requiere de los administradores?", reverso: "Que sean hallados fieles.", apoyo: "de los administradores se requiere que sean hallados fieles" },
              { frente: "¿Dar es una manera de pagarle a Dios?", reverso: "No. Dar es una manera de adorarle, de confiar en Él y de participar en su obra.", apoyo: "Dar no es una manera de pagarle a Dios, que no necesita nada de nosotros." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es el diezmo?", reverso: "La décima parte de lo que recibimos.", apoyo: "El diezmo es la décima parte de lo que recibimos." },
              { frente: "¿Qué son las ofrendas, según muchas iglesias evangélicas?", reverso: "Dádivas voluntarias que se dan además del diezmo.", apoyo: "las ofrendas como dádivas voluntarias, además del diezmo" },
              { frente: "Según 2 Corintios 9:7, ¿cómo debemos dar?", reverso: "Como cada uno propuso en su corazón, no con tristeza ni por necesidad.", apoyo: "cada uno dé como propuso en su corazón, no con tristeza ni por necesidad" },
              { frente: "¿Se compran las bendiciones de Dios?", reverso: "No: Dios bendice al generoso, pero sus bendiciones no se compran.", apoyo: "Dios bendice al generoso, pero sus bendiciones no se compran." },
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
            consigna: "Completa lo que enseña la lección sobre lo que tenemos.",
            texto: "Lo que tenemos es algo que Dios nos [[confía]]. Somos sus [[administradores]], y se nos pide ser hallados [[fieles]].",
            distractores: ["dueños", "debe", "ricos"],
            errores: {
              dueños: "Todo lo que tenemos es de Dios: Él nos lo confía, y nosotros somos sus administradores.",
              debe: "Dios no nos debe nada: lo que tenemos es algo que Él nos confía.",
              ricos: "De los administradores no se pide que sean ricos, sino que sean hallados fieles.",
            },
            apoyo: "Somos administradores, y de los administradores se requiere que sean hallados fieles",
            ref: "1 Corintios 4:2",
            explica: "Lo que tenemos es de Dios y Él nos lo confía: como administradores, se nos pide ser fieles.",
          },
          {
            consigna: "Completa lo que dice Salmos 24:1 y lo que Dios nos pide.",
            texto: "De Jehová es la [[tierra]] y su plenitud. Todo lo que tenemos es de [[Dios]]: Él nos lo confía, y nos pide que seamos [[fieles]].",
            distractores: ["mitad", "nosotros", "exitosos"],
            errores: {
              mitad: "Salmos 24:1 dice que de Jehová es la tierra y su plenitud: todo es de Dios, no una parte.",
              nosotros: "Lo que tenemos no es nuestro: es algo que Dios nos confía.",
              exitosos: "De los administradores se requiere que sean hallados fieles.",
            },
            apoyo: "La Biblia enseña que de Jehová es la tierra y su plenitud",
            ref: "Salmos 24:1; 1 Corintios 4:2",
            explica: "Si todo es de Dios, lo que tenemos no es nuestro: lo administramos para Él, con fidelidad.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Esto es el diezmo o la ofrenda? Lleva cada frase a su recuadro.",
            grupos: ["El diezmo", "La ofrenda"],
            frases: [
              { texto: "La décima parte de lo que recibimos", grupo: 0 },
              { texto: "Lo que Abram dio a Melquisedec antes de la ley de Moisés", grupo: 0 },
              { texto: "Lo que en Malaquías Dios invitó a traer al alfolí", grupo: 0 },
              { texto: "El punto de partida de la generosidad, según muchas iglesias evangélicas", grupo: 0 },
              { texto: "Una dádiva voluntaria", grupo: 1 },
              { texto: "Lo que se da además del diezmo", grupo: 1, explica: "Muchas iglesias evangélicas enseñan las ofrendas como dádivas voluntarias, además del diezmo." },
            ],
            apoyo: "Por eso muchas iglesias evangélicas enseñan el diezmo como el punto de partida de la generosidad, y las ofrendas como dádivas voluntarias, además del diezmo.",
            ref: "Génesis 14:18-20; Malaquías 3:10",
            explica: "El diezmo es la décima parte de lo que recibimos. Muchas iglesias evangélicas lo enseñan como el punto de partida de la generosidad, y las ofrendas como dádivas voluntarias, además del diezmo.",
          },
          {
            consigna: "¿Quién hizo o dijo cada cosa sobre el diezmo? Lleva cada frase a su recuadro.",
            grupos: ["Abram", "Dios, en el libro de Malaquías", "Jesús"],
            frases: [
              { texto: "Dio los diezmos a Melquisedec", grupo: 0 },
              { texto: "Dio los diezmos mucho antes de la ley de Moisés", grupo: 0 },
              { texto: "Invitó a su pueblo a traer todos los diezmos al alfolí", grupo: 1 },
              { texto: "Quería que hubiera alimento en su casa", grupo: 1, explica: "En Malaquías, Dios invitó a traer los diezmos al alfolí para que hubiera alimento en su casa." },
              { texto: "Invitó a su pueblo a probarlo", grupo: 1, explica: "En Malaquías, Dios invitó a su pueblo a traer los diezmos y a probarlo en esto." },
              { texto: "No anuló el diezmo", grupo: 2 },
              { texto: "Pidió además lo más importante: la justicia, la misericordia y la fe", grupo: 2 },
            ],
            apoyo: "Jesús no anuló el diezmo, sino que pidió además lo más importante: la justicia, la misericordia y la fe",
            ref: "Génesis 14:18-20; Malaquías 3:10; Mateo 23:23",
            explica: "Abram dio los diezmos antes de la ley; en Malaquías, Dios invitó a traerlos al alfolí; y Jesús no anuló el diezmo, sino que pidió además lo más importante.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el diezmo y la ofrenda: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El diezmo empezó con la ley de Moisés.", verdad: false, explica: "Abram dio los diezmos a Melquisedec mucho antes de la ley de Moisés.", apoyo: "Abram dio los diezmos a Melquisedec mucho antes de la ley de Moisés", ref: "Génesis 14:18-20" },
              { texto: "El diezmo es la décima parte de lo que recibimos.", verdad: true, explica: "Así lo explica la lección: la décima parte de lo que recibimos.", apoyo: "El diezmo es la décima parte de lo que recibimos." },
              { texto: "Jesús anuló el diezmo.", verdad: false, explica: "Jesús no anuló el diezmo, sino que pidió además lo más importante: la justicia, la misericordia y la fe.", apoyo: "Jesús no anuló el diezmo", ref: "Mateo 23:23" },
              { texto: "Muchas iglesias evangélicas enseñan las ofrendas como dádivas voluntarias, además del diezmo.", verdad: true, explica: "El diezmo se enseña como el punto de partida de la generosidad, y las ofrendas se dan además del diezmo.", apoyo: "las ofrendas como dádivas voluntarias, además del diezmo" },
            ],
          },
          {
            consigna: "Sobre el diezmo, la ofrenda y las bendiciones: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La ofrenda reemplaza al diezmo.", verdad: false, explica: "Muchas iglesias evangélicas enseñan las ofrendas como dádivas voluntarias, además del diezmo: no lo reemplazan.", apoyo: "las ofrendas como dádivas voluntarias, además del diezmo" },
              { texto: "En Malaquías, Dios invitó a su pueblo a traer todos los diezmos al alfolí para que hubiera alimento en su casa.", verdad: true, explica: "Así lo dice la lección: Dios invitó a su pueblo a traer los diezmos y a probarlo en esto.", apoyo: "Dios invitó a su pueblo a traer todos los diezmos al alfolí para que hubiera alimento en su casa", ref: "Malaquías 3:10" },
              { texto: "Damos el diezmo para comprar las bendiciones de Dios.", verdad: false, explica: "Dios bendice al generoso, pero sus bendiciones no se compran: damos porque Él nos dio primero a su Hijo.", apoyo: "Dios bendice al generoso, pero sus bendiciones no se compran.", ref: "Juan 3:16; Filipenses 4:19" },
              { texto: "Jesús no anuló el diezmo, y pidió además la justicia, la misericordia y la fe.", verdad: true, explica: "Así lo dice la lección: Jesús no anuló el diezmo, y además pidió lo más importante.", apoyo: "Jesús no anuló el diezmo, sino que pidió además lo más importante: la justicia, la misericordia y la fe", ref: "Mateo 23:23" },
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
            caso: "Llega el momento de la ofrenda. La persona de al lado te mira, y sientes que debes dar algo para quedar bien, aunque no lo habías pensado.",
            pregunta: "¿Qué es lo mejor, según 2 Corintios 9:7?",
            opciones: [
              { texto: "Dar mucho, para que todos los que me miran vean que soy generoso.", explica: "Dar es una manera de adorar a Dios, no de quedar bien con la gente." },
              { texto: "Dar algo de mala gana, porque lo importante es cumplir.", explica: "Pablo dice que no demos con tristeza ni por necesidad, porque Dios ama al dador alegre." },
              { texto: "Decidir en mi corazón lo que voy a dar, y darlo con alegría.", bien: true, explica: "Así lo enseña 2 Corintios 9:7: cada uno dé como propuso en su corazón, con alegría." },
              { texto: "No dar nada, ni hoy ni nunca, porque Dios no necesita mi dinero.", explica: "Es verdad que Dios no necesita nada de nosotros, pero dar es una manera de adorarle, de confiar en Él y de participar en su obra." },
            ],
            apoyo: "cada uno dé como propuso en su corazón, no con tristeza ni por necesidad",
            ref: "2 Corintios 9:7",
            explica: "Dar con alegría es dar lo que propusiste en tu corazón, no con tristeza ni por necesidad, porque «Dios ama al dador alegre».",
          },
          {
            caso: "Recibiste tu pago de la semana. Quieres dar a Dios, pero te da tristeza, porque pensabas comprarte algo y temes que te falte.",
            pregunta: "¿Qué te ayuda a dar como enseña 2 Corintios 9:7?",
            opciones: [
              { texto: "Dar con tristeza, solo para cumplir, aunque no sea de corazón.", explica: "Pablo pide dar no con tristeza ni por necesidad: Dios ama al dador alegre." },
              { texto: "Recordar que Dios me dio a su Hijo, confiar en que suplirá, y dar con alegría.", bien: true, explica: "Dar es un acto de fe y de gratitud: damos porque Él nos dio primero, y confiamos en que suplirá lo que nos falta." },
              { texto: "Dar mucho este mes para que Dios me devuelva el doble de lo que di.", explica: "Dios bendice al generoso, pero sus bendiciones no se compran." },
              { texto: "No dar nada hasta que me sobre dinero, después de comprar lo que quiero.", explica: "Dar es un acto de fe: confiamos en que Dios suplirá todo lo que nos falta." },
            ],
            apoyo: "Dar es un acto de fe y de gratitud.",
            ref: "2 Corintios 9:7; Filipenses 4:19",
            explica: "Damos con alegría porque Dios nos dio primero a su Hijo, y confiamos en que suplirá todo lo que nos falta.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "cada uno dé como propuso en su corazón, no con tristeza ni por necesidad",
            ref: "2 Corintios 9:7",
            clave: {
              id: "pr-n1-iglesia-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué quiere decir dar con alegría, según 2 Corintios 9:7?",
              ideas: [
                { id: "corazon", peso: 35, texto: "Dar como cada uno propuso en su corazón.", formas: ["propus*", "propon*", "en (su|mi|tu|nuestro) corazon", "de corazon", "decidi*", "lo que (pense|planee|planeo)"] },
                { id: "no-tristeza", peso: 35, texto: "No dar con tristeza ni por necesidad.", formas: ["no con tristeza", "sin tristeza", "ni (con|por) tristeza", "no (por|con) necesidad", "ni por necesidad", "no de mala gana", "sin (presion|obligacion)", "no (por|con) obligacion", "no (obligad*|forzad*)", "ni (obligad*|forzad*)", "no triste*"], negativa: true },
                { id: "dador", peso: 30, texto: "Dios ama al dador alegre: dar es un acto de fe y de gratitud.", formas: ["dador", "dios ama", "ama a quien", "ama al que", "acto de fe", "gratitud", "agradecid*"] },
              ],
              errores: [
                { id: "comprar", texto: "Dios bendice al generoso, pero sus bendiciones no se compran.", formas: ["para que (dios|el) (nos|me|te|le) (bendiga|devuelva|pague|multiplique)", "compra* bendicion*", "para recibir mas", "el doble"] },
              ],
              modelo: "Dar con alegría es dar lo que propuse en mi corazón, no con tristeza ni por necesidad. Damos así porque Dios ama al dador alegre.",
            },
          },
          {
            apoyo: "La generosidad es fruto de un corazón agradecido.",
            ref: "2 Corintios 9:7",
            clave: {
              id: "pr-n1-iglesia-4-a6-2",
              tipo: "corta",
              pregunta: "Una amiga da su ofrenda de mala gana, solo porque todos dan. ¿Qué le enseña 2 Corintios 9:7?",
              ideas: [
                { id: "corazon", peso: 35, texto: "Que dé como propuso en su corazón.", formas: ["propus*", "propon*", "en (su|mi|tu|nuestro) corazon", "de corazon", "decidi*"] },
                { id: "no-tristeza", peso: 35, texto: "Que no dé con tristeza ni por necesidad.", formas: ["no con tristeza", "sin tristeza", "ni (con|por) tristeza", "no (por|con) necesidad", "ni por necesidad", "no de mala gana", "sin (presion|obligacion)", "no (por|con) obligacion", "no (obligad*|forzad*)", "ni (obligad*|forzad*)", "no triste*"], negativa: true },
                { id: "alegre", peso: 30, texto: "Dios ama al dador alegre: dar es un acto de fe y de gratitud.", formas: ["dador", "dios ama", "ama a quien", "ama al que", "alegr*", "gozo*", "acto de fe", "gratitud", "agradecid*"] },
              ],
              errores: [
                { id: "comprar", texto: "Dios bendice al generoso, pero sus bendiciones no se compran.", formas: ["para que (dios|el) (nos|me|te|le) (bendiga|devuelva|pague|multiplique)", "compra* bendicion*", "para recibir mas", "el doble"] },
              ],
              modelo: "Le enseña que cada uno dé como propuso en su corazón, no con tristeza ni por necesidad, porque Dios ama al dador alegre. Dar es un acto de fe y de gratitud.",
            },
          },
        ],
      },
    ],
  },
};
