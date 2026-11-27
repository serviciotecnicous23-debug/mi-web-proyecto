/**
 * Las prácticas de «Seminario de liderazgo ministerial» (Nivel 5). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n5-seminario.ts), con la guía de docs/academia-practicas.md.
 *
 * Es el cierre de la formación: los casos integran lo aprendido en situaciones reales del ministerio, siempre con lo que
 * dice la lección. Los casos de las actividades, como los de la lección, son ejemplos compuestos (sin personas reales).
 * Cuidados: en el caso del líder que cae solo se dice lo que la lección afirma sobre volver a un cargo (si llega, es un
 * proceso largo y evaluado) y sobre un menor o una persona vulnerable (se protege a la víctima y se reporta a las
 * autoridades), sin plazos ni pasos que la lección no da; de Hechos 6 y de Éxodo 18 solo se usa lo que la lección cuenta;
 * en el desacuerdo por la música no se dice qué estilo es bíblico; y no se pregunta por el proyecto final del nivel.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N5_SEMINARIO: PracticasMateria = {
  materia: "n5-seminario",
  mision: {
    titulo: "Un año con el consejo de líderes",
    intro: "Tu pastor te pidió que acompañes durante un año al nuevo consejo de líderes de la iglesia. En ese año llegarán un desacuerdo que amenaza con dividir, una diferencia de dinero en las ofrendas, la caída de un líder y una iglesia que crece más rápido que su organización. En cada caso vas a seguir el método del seminario, y al final escribirás tu propio plan de ministerio. Repasa las seis lecciones para tener cada paso listo.",
    cierre: "Ya sabes estudiar un caso del ministerio con la Biblia: buscar los hechos sin suposiciones y el problema de fondo, escuchar a todas las partes, orar y pedir consejo, decidir con justicia y con amor, cuidar a las personas y a la iglesia, y volver a evaluar. Y tu plan de ministerio queda escrito y encomendado a Dios: «Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados».",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Cómo estudiar un caso
    "n5-seminario-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué necesita un líder, además de conocimientos?", reverso: "Un camino para pensar con la Biblia antes de decidir.", apoyo: "un líder necesita, además de conocimientos, un camino para pensar con la Biblia antes de decidir" },
              { frente: "En el primer paso del método, ¿qué se busca?", reverso: "Los hechos: qué pasó, quiénes están involucrados y qué se sabe con certeza.", apoyo: "Los hechos: qué pasó, quiénes están involucrados y qué se sabe con certeza, sin suposiciones" },
              { frente: "Según el paso del problema de fondo, ¿qué suele ser lo que se ve?", reverso: "Un síntoma: hay que preguntar qué hay debajo.", apoyo: "El problema de fondo: lo que se ve suele ser un síntoma; hay que preguntar qué hay debajo" },
              { frente: "¿De dónde nacen muchos errores de liderazgo?", reverso: "De decidir antes de escuchar.", apoyo: "Muchos errores de liderazgo nacen de decidir antes de escuchar" },
            ],
          },
          {
            tarjetas: [
              { frente: "En el paso de las opciones, ¿cuántos caminos se piensan?", reverso: "Dos o tres caminos posibles, con sus consecuencias.", apoyo: "Las opciones: dos o tres caminos posibles, con sus consecuencias" },
              { frente: "¿Qué se define en el paso de la decisión?", reverso: "Qué se hará, quién lo hará y cómo se comunicará.", apoyo: "La decisión: qué se hará, quién lo hará y cómo se comunicará" },
              { frente: "En la evaluación, ¿qué se pregunta al volver después?", reverso: "Qué resultó y qué se aprendió.", apoyo: "La evaluación: volver después y preguntar qué resultó y qué se aprendió" },
              { frente: "Además de orar, ¿qué se busca en cada paso del método?", reverso: "El consejo de hermanos maduros.", apoyo: "Y se busca el consejo de hermanos maduros (Proverbios 15:22)" },
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
            consigna: "Ordena los seis pasos del método para estudiar un caso, del primero al último.",
            pasos: [
              "Los hechos: qué pasó y qué se sabe con certeza",
              "El problema de fondo: qué hay debajo de lo que se ve",
              "Los principios bíblicos: qué enseña la Escritura",
              "Las opciones: dos o tres caminos, con sus consecuencias",
              "La decisión: qué se hará, quién lo hará y cómo se dirá",
              "La evaluación: qué resultó y qué se aprendió",
            ],
            apoyo: "Para estudiar un caso del ministerio se siguen seis pasos",
            explica: "Primero, los hechos sin suposiciones y el problema de fondo; después, los principios bíblicos y las opciones con sus consecuencias; al final, la decisión con su forma de comunicarla y la evaluación posterior.",
          },
          {
            consigna: "Un líder de célula te pide ayuda con un problema de su grupo. Ordena cómo lo estudian juntos, del primer paso al último.",
            pasos: [
              "Anotar qué pasó y quiénes están involucrados, sin suponer",
              "Preguntar qué hay debajo de lo que se ve",
              "Buscar qué enseña la Escritura sobre la situación",
              "Pensar dos o tres caminos posibles y sus consecuencias",
              "Decidir quién hará qué y cómo se comunicará",
              "Volver después a ver qué resultó y qué aprendieron",
            ],
            apoyo: "Aplicar un método para estudiar un caso del ministerio a la luz de la Biblia",
            explica: "El método va en su orden: los hechos, el problema de fondo, los principios bíblicos, las opciones, la decisión y la evaluación posterior.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un hecho que se sabe con certeza o es una suposición? Lleva cada frase a su grupo.",
            grupos: ["Un hecho que se sabe", "Una suposición"],
            frases: [
              { texto: "Tres familias faltaron los dos últimos domingos", grupo: 0 },
              { texto: "El informe dice una cifra y el banco muestra otra", grupo: 0 },
              { texto: "Dos líderes discutieron en voz alta después del culto", grupo: 0 },
              { texto: "Seguro faltaron porque están molestas con el pastor", grupo: 1 },
              { texto: "Si las cifras no cuadran, es que alguien robó", grupo: 1 },
              { texto: "Discutieron porque uno quiere el cargo del otro", grupo: 1 },
            ],
            apoyo: "Los hechos: qué pasó, quiénes están involucrados y qué se sabe con certeza, sin suposiciones",
            explica: "Un hecho es lo que se sabe con certeza: qué pasó y quiénes están involucrados. Explicar el porqué sin saberlo es una suposición, y el método pide los hechos sin suposiciones.",
          },
          {
            consigna: "Un líder te cuenta un problema de su grupo. ¿Lo que dice es un hecho o una suposición? Lleva cada frase a su grupo.",
            grupos: ["Un hecho que se sabe", "Una suposición"],
            frases: [
              { texto: "Un joven dejó de venir al grupo hace un mes", grupo: 0 },
              { texto: "La reunión del jueves se canceló dos veces", grupo: 0 },
              { texto: "Una hermana pidió cambiarse a otro grupo", grupo: 0 },
              { texto: "El joven ya perdió su fe y no quiere saber nada", grupo: 1 },
              { texto: "La hermana se cambia porque no me soporta", grupo: 1 },
              { texto: "Nadie viene porque el grupo ya no les interesa", grupo: 1 },
            ],
            apoyo: "Distinguir los hechos de las suposiciones y el síntoma del problema de fondo",
            explica: "Lo que pasó y se sabe con certeza es un hecho; lo que se imagina sobre la razón, sin preguntar, es una suposición. Antes de decidir se separa lo uno de lo otro.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de alabanza te dice: Los músicos llegan tarde a todos los ensayos; les voy a exigir puntualidad y ya está.",
            pregunta: "¿Qué le aconsejas primero?",
            opciones: [
              { texto: "Que pregunte qué hay debajo: llegar tarde puede ser un síntoma.", bien: true, explica: "Lo que se ve suele ser un síntoma: antes de decidir, hay que preguntar qué hay debajo." },
              { texto: "Que les exija puntualidad desde el próximo ensayo, sin hablar más.", explica: "Eso trata solo lo que se ve; el método pide buscar el problema de fondo." },
              { texto: "Que dé por hecho que a los músicos ya no les importa el ministerio.", explica: "Eso es una suposición: los hechos son lo que se sabe con certeza." },
              { texto: "Que cambie a todos los músicos por otros que sean más puntuales.", explica: "Antes de decidir se busca el problema de fondo y se piensan dos o tres caminos, con sus consecuencias." },
            ],
            apoyo: "El problema de fondo: lo que se ve suele ser un síntoma; hay que preguntar qué hay debajo",
            explica: "Llegar tarde es lo que se ve. El método pide buscar el problema de fondo: lo que se ve suele ser un síntoma, y hay que preguntar qué hay debajo.",
          },
          {
            caso: "Una coordinadora de maestros de niños te dice: Tres maestros dejaron el servicio este año; seguro es que ya nadie quiere servir.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que separe lo que sabe de lo que supone, y busque qué hay debajo.", bien: true, explica: "Que tres maestros dejaron el servicio es un hecho; que nadie quiera servir es una suposición, y hay que buscar el problema de fondo." },
              { texto: "Que tiene razón: si tres dejaron el servicio, ya nadie quiere servir.", explica: "Eso es una suposición: el primer paso son los hechos, lo que se sabe con certeza." },
              { texto: "Que busque tres maestros nuevos y no pregunte nada más del asunto.", explica: "Lo que se ve suele ser un síntoma: antes de buscar reemplazos, hay que preguntar qué hay debajo." },
              { texto: "Que llame a los tres y les reproche que hayan dejado a los niños.", explica: "Muchos errores de liderazgo nacen de decidir antes de escuchar." },
            ],
            apoyo: "Distinguir los hechos de las suposiciones y el síntoma del problema de fondo",
            explica: "Los hechos son lo que se sabe con certeza, sin suposiciones; y lo que se ve suele ser un síntoma: hay que preguntar qué hay debajo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Proverbios 18:13 habla del que responde mal. ¿Cuándo responde? Toca las palabras que lo dicen.",
            texto: "Al que responde palabra [[antes de oír]], Le es fatuidad y oprobio",
            apoyo: "Muchos errores de liderazgo nacen de decidir antes de escuchar",
            ref: "Proverbios 18:13",
            explica: "Responder antes de oír es fatuidad y oprobio: muchos errores de liderazgo nacen de decidir antes de escuchar.",
          },
          {
            consigna: "Si a un líder le falta sabiduría para decidir, ¿qué debe hacer según Santiago 1:5? Toca las palabras que lo dicen.",
            texto: "Y si alguno de vosotros tiene falta de sabiduría, [[pídala a Dios]], el cual da a todos abundantemente y sin reproche, y le será dada",
            apoyo: "En cada paso se ora",
            ref: "Santiago 1:5",
            explica: "Quien tiene falta de sabiduría la pide a Dios, que da a todos abundantemente y sin reproche. Por eso, en cada paso del método se ora.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Antes de juzgar, se escucha a todas las partes",
            ref: "Proverbios 18:17",
            situacion: "Eres pastor. Un diácono llega muy molesto a tu oficina: dice que el encargado del sonido lo humilló delante de todos, y te pide que lo saques hoy mismo de su servicio.",
            escenas: [
              {
                id: "e1",
                narra: "El diácono te da muchos detalles, y su relato suena convincente.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo escuchas, y antes de decidir hablas con el encargado.", valor: 2, explica: "«Justo parece el primero que aboga por su causa; Pero viene su adversario, y le descubre»: antes de juzgar, se escucha a todas las partes.", siguiente: "e2" },
                  { texto: "Sacas hoy al encargado del sonido, como te pide el diácono.", valor: 0, explica: "Responder antes de oír es fatuidad y oprobio: muchos errores de liderazgo nacen de decidir antes de escuchar.", siguiente: "e1b" },
                  { texto: "Hablas con el encargado, pero ya decidido a sacarlo del servicio.", valor: 1, explica: "Escuchar al otro está bien, pero sin haber juzgado antes: se escucha a todas las partes antes de juzgar.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al día siguiente, el encargado del sonido te busca y te cuenta otra versión de lo que pasó.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Reconoces que te adelantaste y escuchas a los dos con calma.", valor: 2, explica: "Antes de juzgar, se escucha a todas las partes; reconocer que te adelantaste te devuelve al camino.", siguiente: "e2" },
                  { texto: "No lo escuchas: ya decidiste, y no vas a cambiar lo que hiciste.", valor: 0, explica: "«Al que responde palabra antes de oír, Le es fatuidad y oprobio»: todavía puedes escuchar a las dos partes.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya escuchaste a los dos por separado. Cada uno tiene parte de razón, y no sabes qué decidir.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras pidiendo sabiduría y buscas el consejo de hermanos maduros.", valor: 2, explica: "En cada paso se ora y se busca el consejo de hermanos maduros (Proverbios 15:22)." },
                  { texto: "Decides solo y rápido, para que el asunto no crezca más todavía.", valor: 0, explica: "Pensar con la Biblia antes de decidir evita muchas heridas: en cada paso se ora y se busca consejo." },
                  { texto: "Le pides consejo a un hermano maduro, pero no oras por el asunto.", valor: 1, explica: "El consejo ayuda, pero en cada paso también se ora: Dios da sabiduría a quien se la pide." },
                ],
              },
              {
                id: "e3",
                narra: "Ya tomaste una decisión con los dos, y pasa un mes.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves a hablar con ellos para ver qué resultó y qué aprendieron.", valor: 2, explica: "La evaluación: volver después y preguntar qué resultó y qué se aprendió." },
                  { texto: "Das el asunto por cerrado y no vuelves a preguntar nada nunca más.", valor: 0, explica: "El método termina con la evaluación: volver después y preguntar qué resultó y qué se aprendió." },
                  { texto: "Les preguntas a otros hermanos cómo les va a los dos en el servicio.", valor: 1, explica: "Interesarse está bien, pero la evaluación es volver con los involucrados y preguntar qué resultó y qué se aprendió." },
                ],
              },
            ],
          },
          {
            apoyo: "Antes de responder hay que oír, y escuchar a todas las partes, y en cada paso se pide sabiduría a Dios y consejo a hermanos maduros",
            ref: "Santiago 1:5",
            situacion: "Eres líder de los líderes de célula. Un líder te llama alterado: dice que otro líder le está quitando a las personas de su grupo, y quiere que lo frenes hoy mismo.",
            escenas: [
              {
                id: "e1",
                narra: "Te lo cuenta con mucha seguridad, y te pide una respuesta ya.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que antes de decidir vas a escuchar también al otro líder.", valor: 2, explica: "Justo parece el primero que aboga por su causa, pero viene su adversario y le descubre: se escucha a todas las partes.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que hoy mismo vas a frenar al otro líder.", valor: 0, explica: "Responder palabra antes de oír es fatuidad y oprobio.", siguiente: "e1b" },
                  { texto: "Que lo vas a pensar, aunque ya crees que él tiene toda la razón.", valor: 1, explica: "No decidir enseguida está bien, pero sin juzgar antes de escuchar a la otra parte.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Cuando hablas con el otro líder, te muestra que esas personas pidieron cambiarse de grupo por su horario de trabajo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Reconoces que te adelantaste y escuchas a las dos partes.", valor: 2, explica: "Antes de juzgar, se escucha a todas las partes.", siguiente: "e2" },
                  { texto: "Sostienes lo que dijiste, para no quedar mal con el primero.", valor: 0, explica: "Muchos errores de liderazgo nacen de decidir antes de escuchar; sostenerlos los agranda.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya escuchaste a los dos, y la situación no es sencilla.",
                pregunta: "¿Cómo sigues?",
                opciones: [
                  { texto: "Oras y pides consejo a hermanos maduros antes de decidir.", valor: 2, explica: "En cada paso se pide sabiduría a Dios y consejo a hermanos maduros." },
                  { texto: "Decides a favor del líder que lleva más años en la iglesia.", valor: 0, explica: "Eso no es pensar con la Biblia: en cada paso se ora y se busca el consejo de hermanos maduros." },
                  { texto: "Oras por el asunto, pero después decides solo, sin consejo.", valor: 1, explica: "Orar está muy bien; también se busca el consejo de hermanos maduros (Proverbios 15:22)." },
                ],
              },
              {
                id: "e3",
                narra: "Ya sabes qué se va a hacer.",
                pregunta: "¿Qué más defines antes de actuar?",
                opciones: [
                  { texto: "Quién hará cada cosa y cómo se lo comunicarás a los dos.", valor: 2, explica: "La decisión: qué se hará, quién lo hará y cómo se comunicará." },
                  { texto: "Nada más: cada uno se enterará cuando vea los cambios en el grupo.", valor: 0, explica: "La decisión incluye cómo se comunicará, y quién lo hará." },
                  { texto: "Solo lo que se hará; quién lo hace se irá viendo en el camino.", valor: 1, explica: "Falta definir quién lo hará y cómo se comunicará." },
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
            apoyo: "Para estudiar un caso del ministerio se siguen seis pasos",
            ref: "Proverbios 15:22",
            clave: {
              id: "pr-n5-seminario-1-a7-1",
              tipo: "corta",
              pregunta: "¿Cuáles son los seis pasos del método para estudiar un caso del ministerio?",
              ideas: [
                { id: "hechos", peso: 34, texto: "Los hechos, sin suposiciones, y el problema de fondo.", formas: ["los hechos", "hechos", "lo que paso", "problema de fondo", "de fondo", "que hay debajo", "sintoma*"] },
                { id: "principios", peso: 33, texto: "Los principios bíblicos y las opciones, con sus consecuencias.", formas: ["principios", "principio biblico", "lo que (ensena|dice) la (escritura|biblia|palabra)", "opciones", "caminos posibles", "consecuencias"] },
                { id: "decision", peso: 33, texto: "La decisión, con quién la hará y cómo se comunicará, y la evaluación posterior.", formas: ["la decision", "evalua*", "como se comunicara", "comunicar*", "que resulto", "que se aprendio"] },
              ],
              modelo: "Primero, los hechos sin suposiciones y el problema de fondo. Después, los principios bíblicos y dos o tres opciones con sus consecuencias. Al final, la decisión, con quién la hará y cómo se comunicará, y la evaluación posterior.",
            },
          },
          {
            apoyo: "Aplicar un método para estudiar un caso del ministerio a la luz de la Biblia",
            ref: "Proverbios 15:22",
            clave: {
              id: "pr-n5-seminario-1-a7-2",
              tipo: "corta",
              pregunta: "Un líder nuevo te pide ayuda para pensar un problema de su grupo antes de decidir. ¿Qué pasos le enseñas, en orden?",
              ideas: [
                { id: "hechos", peso: 34, texto: "Los hechos, sin suposiciones, y el problema de fondo.", formas: ["los hechos", "hechos", "lo que paso", "problema de fondo", "de fondo", "que hay debajo", "sintoma*"] },
                { id: "principios", peso: 33, texto: "Los principios bíblicos y las opciones, con sus consecuencias.", formas: ["principios", "principio biblico", "lo que (ensena|dice) la (escritura|biblia|palabra)", "opciones", "caminos posibles", "consecuencias"] },
                { id: "decision", peso: 33, texto: "La decisión, con quién la hará y cómo se comunicará, y la evaluación posterior.", formas: ["la decision", "evalua*", "como se comunicara", "comunicar*", "que resulto", "que se aprendio"] },
              ],
              modelo: "Le enseño a buscar primero los hechos, sin suposiciones, y el problema de fondo; luego, lo que enseña la Escritura y las opciones con sus consecuencias; y al final, la decisión, cómo se comunicará y la evaluación de lo que resultó.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Caso: un desacuerdo que amenaza con dividir
    "n5-seminario-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En el caso del culto, ¿qué piden los jóvenes?", reverso: "Un culto con música actual.", apoyo: "los jóvenes piden un culto con música actual" },
              { frente: "En el caso del culto, ¿qué sienten los mayores?", reverso: "Que se pierde la reverencia.", apoyo: "los mayores sienten que se pierde la reverencia" },
              { frente: "¿Qué hechos hay en el caso del culto?", reverso: "Dos grupos con preferencias distintas, críticas a escondidas y amenazas de irse.", apoyo: "hay dos grupos con preferencias distintas, críticas a escondidas y amenazas de irse" },
              { frente: "¿Cuál es el problema de fondo del caso del culto?", reverso: "Cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias.", apoyo: "es cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias" },
            ],
          },
          {
            tarjetas: [
              { frente: "En Hechos 15, ¿quiénes se reunieron para conocer del asunto?", reverso: "Los apóstoles y los ancianos.", apoyo: "«se reunieron los apóstoles y los ancianos para conocer de este asunto»" },
              { frente: "¿Cómo se comunicó la decisión de Hechos 15?", reverso: "Por escrito y con humildad.", apoyo: "La decisión se comunicó por escrito y con humildad" },
              { frente: "En Hechos 15, ¿qué buscaron, y no solo la mayoría?", reverso: "La dirección de Dios.", apoyo: "Buscaron la dirección de Dios, no solo la mayoría" },
              { frente: "¿Qué criterio de Pablo guía la decisión?", reverso: "Seguir lo que contribuye a la paz y a la mutua edificación.", apoyo: "El criterio de Pablo guía la decisión" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El problema de fondo no es solo la música: es cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias",
            ref: "Hechos 15:6-7",
            titulo: "La música del domingo",
            relato: [
              "Eres el pastor de una iglesia de varias generaciones. Los jóvenes piden un culto con música actual, y los mayores sienten que se pierde la reverencia.",
              "Hay comentarios en los pasillos, y dos familias dicen que se irán si las cosas cambian.",
              "El consejo de líderes te pide estudiar el caso con el método del seminario antes de decidir.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cuáles son los hechos del caso, sin suposiciones?",
                opciones: [
                  { texto: "Dos grupos con preferencias distintas, críticas a escondidas y amenazas de irse.", bien: true, explica: "Eso es lo que se sabe con certeza, sin suposiciones." },
                  { texto: "Que los jóvenes ya no respetan a Dios y solo buscan un culto que los entretenga a ellos.", explica: "Eso es una suposición sobre los jóvenes: los hechos son lo que se sabe con certeza." },
                  { texto: "Que los mayores no aceptan nada nuevo porque quieren seguir mandando en la iglesia.", explica: "Eso es una suposición sobre los mayores: los hechos son lo que se sabe con certeza." },
                ],
                apoyo: "Los hechos: hay dos grupos con preferencias distintas, críticas a escondidas y amenazas de irse",
                explica: "Los hechos son lo que se sabe con certeza: dos grupos con preferencias distintas, críticas a escondidas y amenazas de irse.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál es el problema de fondo?",
                opciones: [
                  { texto: "Cómo una iglesia de varias generaciones decide junta y se ama.", bien: true, explica: "Ese es el fondo: cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias." },
                  { texto: "Qué estilo de música es el correcto para el culto de cada domingo.", explica: "El problema de fondo no es solo la música." },
                  { texto: "Qué grupo tiene más miembros, para hacer lo que pida la mayoría.", explica: "En Hechos 15 buscaron la dirección de Dios, no solo la mayoría." },
                ],
                apoyo: "El problema de fondo no es solo la música",
                explica: "Lo que se ve es el desacuerdo por la música; lo que hay debajo es cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué modelo bíblico siguen para decidir?",
                opciones: [
                  { texto: "El de Hechos 15: escuchar, examinar la Escritura y buscar a Dios.", bien: true, explica: "Como en Hechos 15: escucharon a las partes, examinaron la Escritura y buscaron la dirección de Dios." },
                  { texto: "El de una votación rápida: que decida la mayoría, sin buscar nada más.", explica: "En Hechos 15 buscaron la dirección de Dios, no solo la mayoría." },
                  { texto: "El de un pastor que decide solo, sin escuchar a ninguno de los grupos.", explica: "En Hechos 15 se reunieron los apóstoles y los ancianos, y escucharon a las partes." },
                ],
                apoyo: "Escucharon a las partes, examinaron la Escritura (Hechos 15:15-17) y llegaron a un acuerdo",
                explica: "Como en Hechos 15, los líderes escuchan a las partes, examinan la Escritura, buscan la dirección del Espíritu y comunican la decisión con sus razones.",
              },
              {
                tipo: "explica",
                apoyo: "Proponen un camino que honre a los dos grupos: variedad en el culto, o espacios distintos que no dividan a la iglesia",
                clave: {
                  id: "pr-n5-seminario-2-a2-1",
                  tipo: "corta",
                  pregunta: "¿Qué camino propondrías a la iglesia, y con qué criterio lo decidirías?",
                  ideas: [
                    { id: "camino", peso: 50, texto: "Un camino que honre a los dos grupos: variedad en el culto, o espacios distintos que no dividan a la iglesia.", formas: ["honr* a (los|ambos) (dos|grupos)", "los dos grupos", "ambos grupos", "varied*", "espacios distintos", "espacios diferentes", "que no divid*"] },
                    { id: "criterio", peso: 50, texto: "El criterio de Pablo: seguir lo que contribuye a la paz y a la mutua edificación.", formas: ["la paz", "paz", "edifica*", "mutua edificacion", "romanos 14 19"] },
                  ],
                  errores: [
                    { id: "mayoria", texto: "Se busca la dirección de Dios, no solo la mayoría.", formas: ["lo que (diga|decida|quiera|pida|vote) la mayoria", "(decide|decida|gana|gane) la mayoria", "por votacion", "una votacion"], anula: "criterio" },
                  ],
                  modelo: "Propondría un camino que honre a los dos grupos: variedad en el culto, o espacios distintos que no dividan a la iglesia. Y lo decidiría con el criterio de Pablo: seguir lo que contribuye a la paz y a la mutua edificación.",
                },
              },
            ],
          },
          {
            apoyo: "Analizar un caso de desacuerdo en la iglesia con el método del seminario",
            ref: "Hechos 15:6-7",
            titulo: "El horario del culto",
            relato: [
              "Eres pastor. Un grupo de familias pide pasar el culto del domingo a la tarde, y los mayores, que viven lejos, dicen que de noche no podrán venir.",
              "Hay críticas a escondidas en el estacionamiento, y un grupo dice que se irá a otra iglesia si no se hace el cambio.",
              "Con tu equipo de líderes, estudias el caso con el método del seminario.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué es un hecho en este caso, y no una suposición?",
                opciones: [
                  { texto: "Hay dos grupos con necesidades distintas y críticas a escondidas.", bien: true, explica: "Eso es lo que se sabe con certeza." },
                  { texto: "Los que piden el cambio solo quieren dormir más los domingos por la mañana.", explica: "Eso es una suposición sobre sus razones: los hechos son lo que se sabe con certeza." },
                  { texto: "Los mayores no quieren que la iglesia crezca con las familias nuevas.", explica: "Eso es una suposición sobre los mayores, no un hecho." },
                ],
                apoyo: "Analizar un caso de desacuerdo en la iglesia con el método del seminario",
                explica: "Los hechos son lo que se sabe con certeza: dos grupos con necesidades distintas, críticas a escondidas y la amenaza de irse. Lo demás son suposiciones.",
              },
              {
                tipo: "situacion",
                pregunta: "Como en el caso de la música, ¿qué puede haber debajo del desacuerdo por el horario?",
                opciones: [
                  { texto: "Cómo la iglesia decide junta y se ama en sus diferencias.", bien: true, explica: "Como en el caso del culto, el fondo es cómo la iglesia decide junta y se ama en sus diferencias." },
                  { texto: "Qué horario le conviene más al pastor y a su propia familia.", explica: "Eso no es lo que hay debajo del desacuerdo: lo que se busca es cómo la iglesia decide junta." },
                  { texto: "Qué grupo protesta más fuerte, para darle lo que pide.", explica: "Así no se decide junto: se buscan la dirección de Dios y la paz de todos." },
                ],
                apoyo: "El problema de fondo no es solo la música: es cómo una iglesia de varias generaciones decide junta y se ama en sus diferencias",
                explica: "Lo que se ve es el desacuerdo por el horario; lo que hay debajo es cómo la iglesia decide junta y se ama en sus diferencias.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo siguen el modelo de Hechos 15?",
                opciones: [
                  { texto: "Escuchan a las partes, examinan la Escritura y buscan a Dios.", bien: true, explica: "Así lo hicieron en Hechos 15, y llegaron a un acuerdo." },
                  { texto: "Hacen una votación rápida y que gane el grupo que sea más grande.", explica: "En Hechos 15 buscaron la dirección de Dios, no solo la mayoría." },
                  { texto: "Deciden los líderes a solas, sin escuchar a ninguno de los grupos.", explica: "En Hechos 15 escucharon a las partes antes de decidir." },
                ],
                apoyo: "Como en Hechos 15, los líderes escuchan a las partes, examinan la Escritura, buscan la dirección del Espíritu y comunican la decisión con sus razones",
                explica: "Los líderes escuchan a las partes, examinan la Escritura, buscan la dirección del Espíritu y comunican la decisión con sus razones.",
              },
              {
                tipo: "explica",
                apoyo: "Explican la decisión con sus razones y piden que las críticas se hablen de frente",
                clave: {
                  id: "pr-n5-seminario-2-a2-2",
                  tipo: "corta",
                  pregunta: "¿Cómo comunicarían la decisión a la iglesia, y qué pedirían sobre las críticas?",
                  ideas: [
                    { id: "razones", peso: 50, texto: "Explicar la decisión con sus razones, por escrito y con humildad, como en Hechos 15.", formas: ["sus razones", "las razones", "con razones", "explic* (la|nuestra|su) decision", "explic* por que", "por escrito", "humildad", "humildemente"] },
                    { id: "frente", peso: 50, texto: "Pedir que las críticas se hablen de frente, y no a escondidas.", formas: ["de frente", "cara a cara", "no a escondidas", "directamente", "en persona", "con la persona"] },
                  ],
                  modelo: "Explicaríamos la decisión con sus razones, por escrito y con humildad, como en Hechos 15. Y pediríamos que las críticas se hablen de frente, con la persona, y no a escondidas en el estacionamiento.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo se resolvió la gran discusión de Hechos 15, del primer paso al último.",
            pasos: [
              "Se reunieron los apóstoles y los ancianos",
              "Escucharon a las partes",
              "Examinaron la Escritura",
              "Llegaron a un acuerdo",
              "Comunicaron la decisión por escrito",
            ],
            apoyo: "Escucharon a las partes, examinaron la Escritura (Hechos 15:15-17) y llegaron a un acuerdo",
            ref: "Hechos 15:6-7",
            explica: "Ante una gran discusión, se reunieron los apóstoles y los ancianos; escucharon a las partes, examinaron la Escritura y llegaron a un acuerdo, y la decisión se comunicó por escrito y con humildad.",
          },
          {
            consigna: "Tu consejo de líderes enfrenta un desacuerdo que afecta a toda la iglesia. Ordena cómo siguen el modelo de Hechos 15, del primer paso al último.",
            pasos: [
              "Reunirse los líderes para conocer del asunto",
              "Escuchar a las partes",
              "Examinar lo que dice la Escritura",
              "Llegar a un acuerdo, buscando la dirección de Dios",
              "Comunicar la decisión por escrito y con humildad",
            ],
            apoyo: "Aplicar el modelo de Hechos 15 para resolver un desacuerdo que afecta a todos",
            ref: "Hechos 15:28",
            explica: "Como en Hechos 15, los líderes se reúnen, escuchan a las partes, examinan la Escritura, buscan la dirección del Espíritu y comunican la decisión con sus razones.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Al comunicar su decisión, ¿a quién le pareció bien primero, según Hechos 15:28? Toca las palabras que lo dicen.",
            texto: "Porque ha parecido bien [[al Espíritu Santo]], y a nosotros",
            apoyo: "Buscaron la dirección de Dios, no solo la mayoría",
            ref: "Hechos 15:28",
            explica: "La decisión se comunicó por escrito y con humildad: «Porque ha parecido bien al Espíritu Santo, y a nosotros». Buscaron la dirección de Dios, no solo la mayoría.",
          },
          {
            consigna: "Ante la gran discusión de Hechos 15, ¿quiénes se reunieron para conocer del asunto? Toca las palabras que lo dicen.",
            texto: "se reunieron [[los apóstoles y los ancianos]] para conocer de este asunto",
            apoyo: "Ante una gran discusión, «se reunieron los apóstoles y los ancianos para conocer de este asunto»",
            ref: "Hechos 15:6",
            explica: "Ante una gran discusión, se reunieron los apóstoles y los ancianos para conocer del asunto: escucharon a las partes, examinaron la Escritura y llegaron a un acuerdo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "En el caso del culto, ¿este paso cuida la unidad o la pone en riesgo? Lleva cada frase a su grupo.",
            grupos: ["Cuida la unidad", "Pone en riesgo la unidad"],
            frases: [
              { texto: "Escuchar por separado a cada grupo y después juntos", grupo: 0 },
              { texto: "Enseñar sobre el amor que no busca lo suyo", grupo: 0 },
              { texto: "Visitar a las familias que están molestas", grupo: 0 },
              { texto: "Pedir que las críticas se hablen de frente", grupo: 0 },
              { texto: "Decidir sin escuchar a ninguno de los dos grupos", grupo: 1 },
              { texto: "Dejar que las críticas sigan a escondidas", grupo: 1 },
              { texto: "Darle todo a un grupo y nada al otro", grupo: 1 },
            ],
            apoyo: "Proponer pasos concretos para cuidar la unidad",
            explica: "Cuidan la unidad los pasos de la propuesta: escuchar a cada grupo, enseñar sobre el amor que no busca lo suyo, honrar a los dos grupos, pedir que las críticas se hablen de frente y visitar a las familias molestas.",
          },
          {
            consigna: "En un desacuerdo por el horario del culto, ¿este paso cuida la unidad o la pone en riesgo? Lleva cada frase a su grupo.",
            grupos: ["Cuida la unidad", "Pone en riesgo la unidad"],
            frases: [
              { texto: "Escuchar a los dos grupos antes de decidir", grupo: 0 },
              { texto: "Explicar la decisión con sus razones", grupo: 0 },
              { texto: "Buscar un camino que honre a los dos grupos", grupo: 0 },
              { texto: "Volver a evaluar la decisión en unos meses", grupo: 0 },
              { texto: "Anunciar el cambio sin dar ninguna razón", grupo: 1 },
              { texto: "Hablar mal del otro grupo en los pasillos", grupo: 1 },
              { texto: "Olvidarse de las familias que se molestaron", grupo: 1 },
            ],
            apoyo: "Las diferencias no tienen que dividir si se tratan con la Palabra y con amor",
            explica: "Las diferencias no tienen que dividir: se escucha a los dos grupos, se busca un camino que los honre, se explica la decisión con sus razones y se vuelve a evaluar en unos meses.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una familia de la iglesia te dice: Pastor, si cambian el culto, nos vamos; ya lo decidimos.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "La visito, la escucho y le explico la decisión con sus razones.", bien: true, explica: "Así se cuida la unidad: se visita a las familias molestas, se las escucha y se explica la decisión con sus razones." },
              { texto: "Le digo que, si quiere irse, puede buscar otra iglesia cuando quiera.", explica: "Las diferencias no tienen que dividir si se tratan con la Palabra y con amor." },
              { texto: "Le prometo que nada va a cambiar, aunque la decisión ya se tomó.", explica: "La decisión se explica con sus razones; prometer lo que no es cierto no cuida la unidad." },
              { texto: "Dejo que se vaya sin hablarle, para no hacer más grande el problema.", explica: "La propuesta de la lección pide visitar a las familias molestas." },
            ],
            apoyo: "Visitan a las familias molestas y vuelven a evaluar en unos meses",
            explica: "La propuesta pide explicar la decisión con sus razones, visitar a las familias molestas y volver a evaluar en unos meses.",
          },
          {
            caso: "Un líder de jóvenes te dice: Los mayores critican nuestra música en los pasillos; voy a contestarles igual, por los teléfonos.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que no responda así, y que pida que las críticas se hablen de frente.", bien: true, explica: "Se pide que las críticas se hablen de frente, y se sigue lo que contribuye a la paz y a la mutua edificación." },
              { texto: "Que les conteste por los teléfonos, para que vean que él también sabe.", explica: "Responder igual suma críticas a escondidas: se pide que las críticas se hablen de frente." },
              { texto: "Que deje de hablarles, para que ellos sientan lo que es ser criticados.", explica: "El amor no busca lo suyo: las diferencias no tienen que dividir." },
              { texto: "Que les diga en el culto que su gusto personal no tiene nada de bíblico.", explica: "Los líderes enseñan sobre la adoración y sobre el amor que no busca lo suyo; exponer a otros en el culto no cuida la unidad." },
            ],
            apoyo: "Explican la decisión con sus razones y piden que las críticas se hablen de frente",
            explica: "El criterio de Pablo guía: «Así que, sigamos lo que contribuye a la paz y a la mutua edificación». Por eso las críticas se hablan de frente.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Proponer pasos concretos para cuidar la unidad",
            ref: "Romanos 14:19",
            clave: {
              id: "pr-n5-seminario-2-a7-1",
              tipo: "corta",
              pregunta: "Propón tres pasos concretos para cuidar la unidad de la iglesia en el caso del culto.",
              ideas: [
                { id: "escuchar", peso: 34, texto: "Escuchar por separado a cada grupo y después juntos.", formas: ["escuch*", "por separado", "despues juntos", "reunir* a los dos"] },
                { id: "camino", peso: 33, texto: "Enseñar sobre la adoración y el amor, y proponer un camino que honre a los dos grupos.", formas: ["honr* a (los|ambos)", "los dos grupos", "ambos grupos", "varied*", "espacios distintos", "no busca lo suyo", "gusto personal", "ensen* sobre"] },
                { id: "frente", peso: 33, texto: "Explicar la decisión con sus razones, pedir que las críticas se hablen de frente y visitar a las familias molestas.", formas: ["sus razones", "explic* la decision", "de frente", "visit*", "familias molestas", "volv* a evaluar"] },
              ],
              modelo: "Primero, escuchar por separado a cada grupo y después juntos. Segundo, proponer un camino que honre a los dos grupos, como variedad en el culto. Tercero, explicar la decisión con sus razones, pedir que las críticas se hablen de frente y visitar a las familias molestas.",
            },
          },
          {
            apoyo: "Las diferencias no tienen que dividir si se tratan con la Palabra y con amor",
            ref: "Romanos 14:19",
            clave: {
              id: "pr-n5-seminario-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué criterio da Pablo para decidir en un desacuerdo, y qué pasos concretos cuidan la unidad?",
              ideas: [
                { id: "criterio", peso: 40, texto: "Seguir lo que contribuye a la paz y a la mutua edificación (Romanos 14:19).", formas: ["la paz", "paz", "edifica*", "mutua"] },
                { id: "escuchar", peso: 30, texto: "Escuchar a cada grupo y buscar un camino que honre a los dos.", formas: ["escuch*", "por separado", "honr* a (los|ambos)", "los dos grupos", "ambos grupos"] },
                { id: "frente", peso: 30, texto: "Explicar la decisión con sus razones, pedir que las críticas se hablen de frente y visitar a los molestos.", formas: ["sus razones", "explic* la decision", "de frente", "visit*", "volv* a evaluar"] },
              ],
              modelo: "Pablo pide seguir lo que contribuye a la paz y a la mutua edificación. Para cuidar la unidad, se escucha a cada grupo por separado y después juntos, y se explica la decisión con sus razones, pidiendo que las críticas se hablen de frente.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Caso: el dinero y la confianza
    "n5-seminario-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En el caso del dinero, ¿quién contaba las ofrendas?", reverso: "El tesorero, solo, desde hace años.", apoyo: "el tesorero cuenta solo las ofrendas desde hace años" },
              { frente: "¿Qué muestra el banco en el caso del dinero?", reverso: "800 dólares menos de lo que se anotó.", apoyo: "el banco muestra 800 dólares menos de lo que se anotó" },
              { frente: "¿Qué no se sabe todavía en el caso del dinero?", reverso: "Si hubo un error, una pérdida o un robo.", apoyo: "No se sabe todavía si hubo un error, una pérdida o un robo" },
              { frente: "¿Cuál es el problema de fondo del caso del dinero?", reverso: "Que la iglesia nunca tuvo controles.", apoyo: "El problema de fondo es que la iglesia nunca tuvo controles" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pedía la Ley para mantener una acusación?", reverso: "El testimonio de dos o tres testigos.", apoyo: "«por el testimonio de dos o tres testigos se mantendrá la acusación»" },
              { frente: "¿Por qué cosas no se acusa a nadie?", reverso: "Ni por sospechas ni por rumores.", apoyo: "No se acusa a nadie por sospechas ni por rumores" },
              { frente: "¿Cómo se habla con el tesorero?", reverso: "En privado, escuchándolo y sin acusarlo de antemano.", apoyo: "Se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano" },
              { frente: "¿A quién protegen también los controles?", reverso: "Al tesorero: con dos personas que cuentan, nadie queda bajo sospecha.", apoyo: "Los controles protegen también al tesorero: con dos personas que cuentan, nadie queda bajo sospecha" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "No se sabe todavía si hubo un error, una pérdida o un robo",
            ref: "Deuteronomio 19:15",
            titulo: "Ochocientos dólares menos",
            relato: [
              "Eres el pastor de una iglesia pequeña. Desde hace años, el tesorero cuenta solo las ofrendas.",
              "Este mes, el banco muestra 800 dólares menos de lo que se anotó, y algunos hermanos ya hablan de robo.",
              "Te reúnes con dos líderes de confianza para estudiar el caso con el método del seminario.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué se sabe con certeza?",
                opciones: [
                  { texto: "Hay 800 dólares de diferencia, y una sola persona maneja el dinero.", bien: true, explica: "Eso es lo que se sabe con certeza." },
                  { texto: "Que el tesorero se quedó con el dinero, porque nadie más tocaba las ofrendas.", explica: "Eso es una suposición: no se sabe todavía si hubo un error, una pérdida o un robo." },
                  { texto: "Que hubo un robo, porque varios hermanos de la iglesia ya lo están diciendo.", explica: "No se acusa a nadie por sospechas ni por rumores." },
                ],
                apoyo: "Los hechos: hay una diferencia de 800 dólares y una sola persona maneja el dinero",
                explica: "Los hechos son una diferencia de 800 dólares y una sola persona que maneja el dinero. No se sabe todavía si hubo un error, una pérdida o un robo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál es el problema de fondo?",
                opciones: [
                  { texto: "Que la iglesia nunca tuvo controles para el dinero.", bien: true, explica: "Ese es el fondo: una sola persona manejaba el dinero, sin controles." },
                  { texto: "Que el tesorero es alguien en quien ya no se puede confiar.", explica: "Eso acusa sin pruebas: el problema de fondo es la falta de controles." },
                  { texto: "Que los hermanos dan cada vez menos ofrendas los domingos.", explica: "El caso no habla de eso: el banco muestra menos de lo que se anotó." },
                ],
                apoyo: "El problema de fondo es que la iglesia nunca tuvo controles",
                explica: "Lo que se ve es la diferencia de dinero; el problema de fondo es que la iglesia nunca tuvo controles.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué hacen primero?",
                opciones: [
                  { texto: "Dos personas de confianza revisan con calma los registros y el banco.", bien: true, explica: "Es el primer paso de la propuesta: revisar con calma, antes de concluir nada." },
                  { texto: "Anuncian en el culto del domingo que falta dinero y que alguien se lo llevó.", explica: "No se acusa a nadie por sospechas ni por rumores." },
                  { texto: "Le quitan hoy el servicio al tesorero, sin hablar antes con él.", explica: "Se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano." },
                ],
                apoyo: "Dos personas de confianza revisan con calma los registros y el banco",
                explica: "Primero se revisan con calma los registros y el banco; después se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano.",
              },
              {
                tipo: "explica",
                apoyo: "Si fue un error, se corrige y se aprende",
                clave: {
                  id: "pr-n5-seminario-3-a2-1",
                  tipo: "corta",
                  pregunta: "¿Cómo hablarás con el tesorero, y qué harás según lo que resulte?",
                  ideas: [
                    { id: "privado", peso: 50, texto: "En privado, escuchándolo y sin acusarlo de antemano.", formas: ["en privado", "a solas", "escuch*", "sin acusar*", "no (lo|le) acus*"] },
                    { id: "resultado", peso: 50, texto: "Si fue un error, se corrige y se aprende; si hubo un robo, se busca el arrepentimiento y la restitución, deja ese servicio y se pide consejo legal.", formas: ["si fue un error", "corrig*", "correg*", "arrepent*", "restitu*", "devuelva", "consejo legal", "deja* (ese|el|su) servicio"] },
                  ],
                  errores: [
                    { id: "acusar", texto: "Se habla en privado con el tesorero, sin acusarlo de antemano.", formas: ["acus* (de|del) robo", "es un ladron", "(lo|le) acus* (delante|frente)", "(lo|le) acus* en publico", "(confront*|acus*) (delante|frente) de (todos|toda)", "(confront*|acus*) (delante|frente) de la iglesia"], anula: "privado" },
                  ],
                  modelo: "Hablaré con él en privado, escuchándolo y sin acusarlo de antemano. Si fue un error, se corrige y se aprende; si hubo un robo, buscaremos el arrepentimiento y la restitución, dejará ese servicio y pediremos consejo legal.",
                },
              },
            ],
          },
          {
            apoyo: "No se acusa a nadie por sospechas ni por rumores",
            ref: "2 Corintios 8:20-21",
            titulo: "La venta del retiro",
            relato: [
              "Eres líder de líderes. El grupo de jóvenes vendió comida para pagar un retiro, y una sola líder contó el dinero y lo guardó en su casa.",
              "Al depositarlo, faltan 150 dólares, y en los mensajes del grupo ya dicen que ella se lo quedó.",
              "El pastor te pide que estudies el caso con el método del seminario.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué se sabe con certeza?",
                opciones: [
                  { texto: "Que faltan 150 dólares y una sola persona contó y guardó el dinero.", bien: true, explica: "Eso es lo que se sabe con certeza." },
                  { texto: "Que la líder se quedó con el dinero, porque lo tuvo guardado en su casa.", explica: "Eso es una suposición: no se sabe todavía si hubo un error, una pérdida o un robo." },
                  { texto: "Que hubo un robo, porque ya lo dicen varios jóvenes en los mensajes.", explica: "No se acusa a nadie por sospechas ni por rumores." },
                ],
                apoyo: "No se sabe todavía si hubo un error, una pérdida o un robo",
                explica: "Se sabe que faltan 150 dólares y que una sola persona manejó el dinero; no se sabe todavía si hubo un error, una pérdida o un robo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le pides al grupo mientras se revisa el asunto?",
                opciones: [
                  { texto: "Que no repitan rumores mientras se revisa el asunto.", bien: true, explica: "Es lo que pide la propuesta: que nadie repita rumores mientras se revisa." },
                  { texto: "Que digan todo lo que sospechan, para llegar pronto a la verdad.", explica: "No se acusa a nadie por sospechas ni por rumores." },
                  { texto: "Que dejen de hablarle a la líder hasta que se sepa todo.", explica: "Eso ya la trata como culpable: la justicia escucha antes de juzgar." },
                ],
                apoyo: "Se pide a todos que no repitan rumores mientras se revisa el asunto",
                explica: "No se acusa a nadie por sospechas ni por rumores: se pide a todos que no repitan rumores mientras se revisa el asunto.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué controles pones desde ya para el dinero del grupo?",
                opciones: [
                  { texto: "Que lo cuenten dos personas que firman, se deposite pronto y se informe.", bien: true, explica: "Son los controles de la lección: dos personas que cuentan y firman, el depósito pronto y el informe." },
                  { texto: "Que lo siga guardando la misma líder, pero con mucho más cuidado que antes.", explica: "Con una sola persona que maneja el dinero no hay controles." },
                  { texto: "Que cada líder guarde una parte del dinero en su propia casa.", explica: "El dinero se deposita pronto; guardarlo en casas no lo protege." },
                ],
                apoyo: "Desde ya, las ofrendas las cuentan dos personas que firman, se depositan pronto y se informa a la iglesia",
                explica: "Como con las ofrendas, el dinero lo cuentan dos personas que firman, se deposita pronto y se informa.",
              },
              {
                tipo: "explica",
                apoyo: "Los controles protegen también al tesorero: con dos personas que cuentan, nadie queda bajo sospecha",
                clave: {
                  id: "pr-n5-seminario-3-a2-2",
                  tipo: "corta",
                  pregunta: "¿Por qué esos controles protegen también a la líder que manejaba el dinero?",
                  ideas: [
                    { id: "dos", peso: 50, texto: "Con dos personas que cuentan y firman, nadie queda bajo sospecha.", formas: ["dos personas", "entre dos", "dos que cuent*", "(nadie|ninguno|ninguna) (queda|quede|quedara) (bajo|en) sospecha", "(nadie|ninguno) (puede|podra) (sospechar|acusar*)"] },
                    { id: "honradez", peso: 50, texto: "Así se hacen las cosas honradamente, delante del Señor y también delante de los hombres.", formas: ["honrad*", "delante de los hombres", "ante los hombres", "ante la iglesia", "ante toda la iglesia", "(cuida|cuidan|protege|protegen) su (nombre|testimonio)", "la protege*", "queda protegida"] },
                  ],
                  modelo: "Porque con dos personas que cuentan y firman, nadie queda bajo sospecha. Así se hacen las cosas honradamente, no solo delante del Señor sino también delante de los hombres, y la líder queda protegida.",
                },
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
            consigna: "Sobre la justicia en el caso del dinero: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La Ley pedía dos o tres testigos para mantener una acusación.", verdad: true, explica: "La Ley pedía justicia: «por el testimonio de dos o tres testigos se mantendrá la acusación».", apoyo: "La Ley pedía justicia", ref: "Deuteronomio 19:15" },
              { texto: "Si varios hermanos ya hablan de robo, se puede acusar al tesorero.", verdad: false, explica: "No se acusa a nadie por sospechas ni por rumores.", apoyo: "No se acusa a nadie por sospechas ni por rumores", ref: "Deuteronomio 19:15" },
              { texto: "Al tesorero se le habla en privado, escuchándolo primero.", verdad: true, explica: "Se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano.", apoyo: "Se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano" },
            ],
          },
          {
            consigna: "Sobre cómo se trata a la persona: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La justicia escucha antes de juzgar.", verdad: true, explica: "Por eso se revisan los registros y se escucha a la persona en privado antes de concluir nada.", apoyo: "La justicia escucha antes de juzgar" },
              { texto: "Al tesorero se le confronta primero delante de toda la iglesia.", verdad: false, explica: "Se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano.", apoyo: "Se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano" },
              { texto: "Mientras se revisa el asunto, cada uno puede contar lo que sospecha.", verdad: false, explica: "Se pide a todos que no repitan rumores mientras se revisa el asunto.", apoyo: "Se pide a todos que no repitan rumores mientras se revisa el asunto" },
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
            apoyo: "No se acusa a nadie por sospechas ni por rumores",
            ref: "Deuteronomio 19:15",
            situacion: "Eres pastor. Un diácono te dice en voz baja que vio al tesorero estrenar un carro, y que seguro lo compró con las ofrendas que faltan.",
            escenas: [
              {
                id: "e1",
                narra: "El diácono espera que hagas algo de inmediato.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no se acusa por sospechas, y que se revisará con calma.", valor: 2, explica: "No se acusa a nadie por sospechas ni por rumores: primero se revisan con calma los registros y el banco.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que hoy mismo sacarás al tesorero del servicio.", valor: 0, explica: "Eso es acusar por una sospecha: la Ley pedía dos o tres testigos para mantener una acusación.", siguiente: "e1b" },
                  { texto: "Que lo vas a pensar, pero que a ti también te parece muy raro.", valor: 1, explica: "No actuar de inmediato está bien, pero sumarse a la sospecha no: no se acusa a nadie por sospechas.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al día siguiente, el tesorero te muestra que el carro lo compró con un préstamo de su trabajo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides perdón y revisan juntos, con calma, los registros.", valor: 2, explica: "La justicia escucha antes de juzgar: reconocer el error y revisar con calma es volver al camino.", siguiente: "e2" },
                  { texto: "Lo sacas igual, porque la gente ya habla y es mejor cortar por lo sano.", valor: 0, explica: "No se acusa a nadie por sospechas ni por rumores.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Dos personas de confianza revisan los registros y el banco, y encuentran algo que no cuadra.",
                pregunta: "¿Cómo hablas con el tesorero?",
                opciones: [
                  { texto: "En privado, escuchándolo y sin acusarlo de antemano.", valor: 2, explica: "Se habla en privado con el tesorero, escuchándolo y sin acusarlo de antemano." },
                  { texto: "Delante del consejo, para que todos vean que sí se actúa.", valor: 0, explica: "La conversación es en privado, y se escucha antes de juzgar." },
                  { texto: "En privado, pero diciéndole desde el principio que fue él.", valor: 1, explica: "Hablar en privado está bien, pero sin acusarlo de antemano: todavía no se sabe si fue un error." },
                ],
              },
              {
                id: "e3",
                narra: "Mientras se revisa, varios hermanos te preguntan si es verdad que el tesorero robó.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Que no repitan rumores mientras se revisa el asunto.", valor: 2, explica: "Se pide a todos que no repitan rumores mientras se revisa el asunto." },
                  { texto: "Que sí, que parece que fue él, pero que no se lo cuenten a nadie.", valor: 0, explica: "Eso es repetir un rumor: no se acusa a nadie por sospechas." },
                  { texto: "Que se lo pregunten ellos mismos al tesorero, a ver qué les dice.", valor: 0, explica: "Eso agranda el rumor: se habla en privado con el tesorero, y a los demás se les pide no repetir rumores." },
                ],
              },
            ],
          },
          {
            apoyo: "La justicia escucha antes de juzgar, y los buenos controles evitan muchas sospechas",
            ref: "Deuteronomio 19:15",
            situacion: "Eres líder del ministerio de ayuda social de la iglesia. Una voluntaria te dice que otra se lleva a su casa parte de la comida donada.",
            escenas: [
              {
                id: "e1",
                narra: "No trae pruebas: dice que lo sospecha por cómo se comporta la otra voluntaria.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le dices que se revisará con calma, sin acusar a nadie.", valor: 2, explica: "No se acusa a nadie por sospechas ni por rumores: se revisa con calma.", siguiente: "e2" },
                  { texto: "Le pides a la voluntaria acusada que ya no vuelva al ministerio.", valor: 0, explica: "Eso es acusar por una sospecha: la justicia escucha antes de juzgar.", siguiente: "e1b" },
                  { texto: "Le pides que te traiga pruebas antes de volver a hablar del tema.", valor: 1, explica: "Pedir pruebas está bien, pero también se revisa con calma lo que pasa, sin acusar a nadie.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "La voluntaria acusada se entera y llega llorando: dice que nunca se llevó nada.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La escuchas, reconoces que te adelantaste y revisas con calma.", valor: 2, explica: "La justicia escucha antes de juzgar.", siguiente: "e2" },
                  { texto: "Le dices que ya está decidido y que no hay nada más que hablar.", valor: 0, explica: "Se escucha a la persona antes de juzgar.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Dos personas de confianza revisan las listas de lo que entra y lo que sale.",
                pregunta: "¿Cómo sigues?",
                opciones: [
                  { texto: "Hablas en privado con la voluntaria, escuchándola primero.", valor: 2, explica: "Como con el tesorero: se habla en privado, escuchando y sin acusar de antemano." },
                  { texto: "La expones delante de todo el grupo, para que nadie más lo haga.", valor: 0, explica: "La conversación es en privado, y se escucha antes de juzgar." },
                  { texto: "Hablas con ella, pero ya dando por hecho que es la culpable.", valor: 1, explica: "Hablar con ella está bien, pero sin acusarla de antemano." },
                ],
              },
              {
                id: "e3",
                narra: "La revisión muestra que nadie llevaba la cuenta de lo que se entregaba.",
                pregunta: "¿Qué cambias desde ya?",
                opciones: [
                  { texto: "Que dos personas cuenten y anoten lo que entra y lo que sale.", valor: 2, explica: "Con dos personas que cuentan, nadie queda bajo sospecha: los buenos controles evitan muchas sospechas." },
                  { texto: "Nada: ya hubo una revisión, y todo puede seguir igual que antes.", valor: 0, explica: "El problema de fondo era la falta de controles: sin ellos, vuelven las sospechas." },
                  { texto: "Que una sola persona de confianza lleve la cuenta de todo.", valor: 0, explica: "Con una sola persona no hay control: con dos que cuentan, nadie queda bajo sospecha." },
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
            consigna: "Completa los controles que propone la lección para las ofrendas.",
            texto: "Desde ya, las ofrendas las cuentan [[dos]] personas que [[firman]], se [[depositan]] pronto y se [[informa]] a la iglesia.",
            distractores: ["una", "callan", "guardan", "oculta"],
            errores: {
              una: "Las cuentan dos personas: con dos que cuentan, nadie queda bajo sospecha.",
              callan: "Las dos personas que cuentan firman lo que contaron.",
              guardan: "Las ofrendas se depositan pronto.",
              oculta: "Se informa a la iglesia: las cosas se hacen honradamente también delante de los hombres.",
            },
            apoyo: "Desde ya, las ofrendas las cuentan dos personas que firman, se depositan pronto y se informa a la iglesia",
            ref: "2 Corintios 8:20-21",
            explica: "Los controles son sencillos: dos personas que cuentan y firman, el depósito pronto y el informe a la iglesia.",
          },
          {
            consigna: "Completa por qué los controles ayudan a todos.",
            texto: "Los buenos [[controles]] evitan muchas [[sospechas]] y protegen también al [[tesorero]].",
            distractores: ["rumores", "ofrendas", "ladrón"],
            errores: {
              rumores: "Son los buenos controles los que evitan muchas sospechas.",
              ofrendas: "Los controles evitan sospechas, no ofrendas.",
              "ladrón": "Los controles protegen también al tesorero: con dos personas que cuentan, nadie queda bajo sospecha.",
            },
            apoyo: "los buenos controles evitan muchas sospechas",
            ref: "2 Corintios 8:20-21",
            explica: "Los buenos controles evitan muchas sospechas: con dos personas que cuentan, nadie queda bajo sospecha, tampoco el tesorero.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un buen control para el dinero o deja a todos sin protección? Lleva cada frase a su grupo.",
            grupos: ["Un buen control", "Deja a todos sin protección"],
            frases: [
              { texto: "Dos personas cuentan las ofrendas y firman", grupo: 0 },
              { texto: "Las ofrendas se depositan pronto", grupo: 0 },
              { texto: "Se informa a la iglesia lo que entró", grupo: 0 },
              { texto: "Una sola persona cuenta y guarda el dinero", grupo: 1 },
              { texto: "El dinero queda guardado varios días en una casa", grupo: 1 },
              { texto: "Nadie sabe cuánto entró ni cuánto se depositó", grupo: 1 },
            ],
            apoyo: "Proponer controles que protejan a la iglesia y a quienes manejan el dinero",
            explica: "Los controles de la lección son dos personas que cuentan y firman, el depósito pronto y el informe a la iglesia. Una sola persona, el dinero guardado y la falta de informes dejan a todos sin protección.",
          },
          {
            consigna: "En el ministerio de jóvenes, ¿esta forma de manejar el dinero es un buen control o deja a todos sin protección? Lleva cada frase a su grupo.",
            grupos: ["Un buen control", "Deja a todos sin protección"],
            frases: [
              { texto: "Dos líderes cuentan juntos lo de la venta y firman", grupo: 0 },
              { texto: "El dinero de la venta se deposita pronto", grupo: 0 },
              { texto: "Se informa al grupo cuánto se juntó", grupo: 0 },
              { texto: "Un solo líder cuenta el dinero y lo guarda", grupo: 1 },
              { texto: "El dinero pasa la semana en la casa de alguien", grupo: 1 },
              { texto: "No queda anotado cuánto se juntó", grupo: 1 },
            ],
            apoyo: "Los controles protegen también al tesorero: con dos personas que cuentan, nadie queda bajo sospecha",
            explica: "Con dos que cuentan y firman, el depósito pronto y el informe, nadie queda bajo sospecha. Un solo líder, el dinero guardado en una casa y la falta de anotaciones dejan a todos sin protección.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Aplicar los principios de justicia: no acusar sin pruebas y escuchar a la persona",
            ref: "Deuteronomio 19:15",
            clave: {
              id: "pr-n5-seminario-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué principios de justicia sigues antes de juzgar a quien maneja el dinero?",
              ideas: [
                { id: "pruebas", peso: 50, negativa: true, texto: "No acusar sin pruebas, ni por sospechas ni por rumores: la acusación se mantenía con dos o tres testigos.", formas: ["sin pruebas", "pruebas", "sospechas", "rumor*", "dos o tres testigos", "testigos"] },
                { id: "escuchar", peso: 50, texto: "Escuchar a la persona en privado, sin acusarla de antemano.", formas: ["escuch*", "en privado", "a solas", "sin acusar*", "oir* a la persona", "hablar con (el|ella)", "hablar con la persona"] },
              ],
              errores: [
                { id: "acusar", texto: "No se acusa a nadie por sospechas ni por rumores.", formas: ["acus* (aunque|sin) (no|tener|haber)", "aunque no haya pruebas", "basta (una|la|con) (sospecha|rumor|rumores)", "acus* (de|del) robo"], anula: "pruebas" },
                { id: "publico", texto: "Se habla con la persona en privado, sin acusarla de antemano.", formas: ["(confront*|acus*|expon*) (delante|frente) de (todos|toda)", "(confront*|acus*|expon*) (delante|frente) de la iglesia", "en publico"], anula: "escuchar" },
              ],
              modelo: "No se acusa a nadie sin pruebas, ni por sospechas ni por rumores: la Ley pedía dos o tres testigos. Y se escucha a la persona en privado, sin acusarla de antemano, porque la justicia escucha antes de juzgar.",
            },
          },
          {
            apoyo: "La justicia escucha antes de juzgar",
            ref: "Deuteronomio 19:15",
            clave: {
              id: "pr-n5-seminario-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano te dice que ya todos saben que el tesorero robó. ¿Qué le respondes, según los principios de justicia de la lección?",
              ideas: [
                { id: "pruebas", peso: 50, negativa: true, texto: "Que no se acusa a nadie sin pruebas, ni por sospechas ni por rumores: la Ley pedía dos o tres testigos.", formas: ["sin pruebas", "pruebas", "sospechas", "rumor*", "dos o tres testigos", "testigos"] },
                { id: "escuchar", peso: 50, texto: "Que primero se revisa y se escucha al tesorero en privado, sin acusarlo de antemano.", formas: ["escuch*", "en privado", "a solas", "sin acusar*", "revis*", "hablar con el"] },
              ],
              errores: [
                { id: "acusar", texto: "No se acusa a nadie por sospechas ni por rumores.", formas: ["acus* (aunque|sin) (no|tener|haber)", "aunque no haya pruebas", "basta (una|la|con) (sospecha|rumor|rumores)", "tiene razon", "(es|fue) (un|el) ladron"], anula: "pruebas" },
                { id: "publico", texto: "Se habla con el tesorero en privado, sin acusarlo de antemano.", formas: ["(confront*|acus*|expon*) (delante|frente) de (todos|toda)", "(confront*|acus*|expon*) (delante|frente) de la iglesia", "en publico"], anula: "escuchar" },
              ],
              modelo: "Le respondo que no se acusa a nadie por sospechas ni por rumores, y que la Ley pedía dos o tres testigos. Primero se revisan los registros y se escucha al tesorero en privado, sin acusarlo de antemano.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Caso: un líder que cae
    "n5-seminario-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En el caso del líder que cae, ¿cómo se confirman los hechos?", reverso: "Con cuidado, escuchando a las personas involucradas.", apoyo: "Los hechos se confirman con cuidado, escuchando a las personas involucradas" },
              { frente: "¿Por qué el problema de fondo de este caso es doble?", reverso: "Hay un pecado grave que hiere a varias familias y una iglesia que necesita verdad, justicia y cuidado.", apoyo: "El problema de fondo es doble" },
              { frente: "¿A quiénes se cuida primero?", reverso: "A las personas heridas: la esposa del líder, la otra persona y sus familias.", apoyo: "Primero se cuida a las personas heridas: la esposa del líder, la otra persona y sus familias" },
              { frente: "¿Qué pasa con el servicio del líder que cae?", reverso: "Lo deja de inmediato, y recibe disciplina y acompañamiento.", apoyo: "El líder deja su servicio de inmediato y recibe disciplina y acompañamiento" },
            ],
          },
          {
            tarjetas: [
              { frente: "Cuando David pecó, ¿a quién envió Dios para confrontarlo?", reverso: "Al profeta Natán.", apoyo: "Dios envió al profeta Natán a confrontarlo" },
              { frente: "¿Cómo es la confrontación, según la lección?", reverso: "Clara, en privado al principio y con la verdad.", apoyo: "La confrontación es clara, en privado al principio y con la verdad" },
              { frente: "¿Qué no borra el perdón?", reverso: "Todas las consecuencias del pecado.", apoyo: "El perdón no borra todas las consecuencias" },
              { frente: "¿Cómo se busca la restauración espiritual?", reverso: "Con mansedumbre.", apoyo: "La restauración espiritual se busca con mansedumbre" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Los hechos se confirman con cuidado, escuchando a las personas involucradas",
            ref: "2 Samuel 12:7",
            titulo: "La noticia en los teléfonos",
            relato: [
              "Eres el pastor. Te enteras de que un líder de jóvenes, casado, mantiene una relación inapropiada con una mujer adulta de la iglesia.",
              "La noticia ya empieza a correr por los teléfonos, y varios hermanos te escriben para saber si es verdad.",
              "Te reúnes con dos líderes maduros para estudiar el caso con el método del seminario.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero con la noticia?",
                opciones: [
                  { texto: "Confirmo los hechos con cuidado, escuchando a los involucrados.", bien: true, explica: "Los hechos se confirman con cuidado, escuchando a las personas involucradas." },
                  { texto: "La doy por cierta, porque ya la sabe media iglesia por los teléfonos.", explica: "Lo que corre por los teléfonos no es un hecho confirmado: se confirma con cuidado." },
                  { texto: "La cuento en el culto del domingo, para que nadie se quede con dudas.", explica: "La iglesia recibe una información veraz y prudente, sin detalles innecesarios." },
                ],
                apoyo: "Los hechos se confirman con cuidado, escuchando a las personas involucradas",
                explica: "Antes de decidir nada, los hechos se confirman con cuidado, escuchando a las personas involucradas.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál es el problema de fondo?",
                opciones: [
                  { texto: "Un pecado grave que hiere a familias, y una iglesia que necesita cuidado.", bien: true, explica: "Así es: el problema de fondo es doble." },
                  { texto: "Que la noticia corre por los teléfonos y deja muy mal parada a la iglesia.", explica: "Eso es lo que se ve; el fondo es un pecado grave que hiere a varias familias y una iglesia que necesita verdad, justicia y cuidado." },
                  { texto: "Que la iglesia escogió mal a su líder de jóvenes hace algunos años.", explica: "Eso es una suposición: el caso no dice nada de cómo se escogió al líder." },
                ],
                apoyo: "El problema de fondo es doble",
                explica: "El problema de fondo es doble: un pecado grave que hiere a varias familias, y una iglesia que necesita verdad, justicia y cuidado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo confrontas al líder?",
                opciones: [
                  { texto: "Con claridad y con la verdad, en privado al principio, como Natán.", bien: true, explica: "Natán confrontó a David con claridad: «Tú eres aquel hombre»." },
                  { texto: "Delante de toda la iglesia, para que todos vean que no se tapa nada.", explica: "La confrontación es en privado al principio." },
                  { texto: "Con indirectas en la predicación, esperando que él entienda solo.", explica: "Natán le habló con claridad: «Tú eres aquel hombre»." },
                ],
                apoyo: "La confrontación es clara, en privado al principio y con la verdad",
                explica: "Como Natán con David: «Tú eres aquel hombre». La confrontación es clara, en privado al principio y con la verdad.",
              },
              {
                tipo: "explica",
                apoyo: "El líder deja su servicio de inmediato y recibe disciplina y acompañamiento",
                clave: {
                  id: "pr-n5-seminario-4-a2-1",
                  tipo: "corta",
                  pregunta: "¿Qué pasa con el servicio del líder, y qué recibe la iglesia?",
                  ideas: [
                    { id: "servicio", peso: 50, texto: "El líder deja su servicio de inmediato y recibe disciplina y acompañamiento.", formas: ["deja* (su|el) (servicio|cargo|ministerio)", "sale de su (servicio|cargo)", "de inmediato", "disciplina", "acompan*"] },
                    { id: "iglesia", peso: 50, texto: "La iglesia recibe una información veraz y prudente, sin detalles innecesarios, y se frena el chisme.", formas: ["veraz", "prudente", "informacion", "fren* (el|los) chisme*", "sin detalles", "la verdad"] },
                  ],
                  errores: [
                    { id: "detalles", texto: "La iglesia recibe una información veraz y prudente, sin detalles innecesarios.", formas: ["todos los detalles", "con detalles", "cont* todo", "cuent* todo lo que"], anula: "iglesia" },
                  ],
                  modelo: "El líder deja su servicio de inmediato y recibe disciplina y acompañamiento. La iglesia recibe una información veraz y prudente, sin detalles innecesarios, y se frena el chisme que corre por los teléfonos.",
                },
              },
            ],
          },
          {
            apoyo: "Primero se cuida a las personas heridas: la esposa del líder, la otra persona y sus familias",
            ref: "Gálatas 6:1",
            titulo: "El líder de célula",
            relato: [
              "Eres líder de líderes. Se descubre que un líder de célula, casado, mantiene una relación inapropiada con una compañera de trabajo.",
              "Su esposa está deshecha, y en el grupo ya circulan mensajes con versiones distintas de lo que pasó.",
              "El pastor te pide que lo ayudes a estudiar el caso con el método del seminario.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Una vez confirmados los hechos, ¿a quiénes se cuida primero?",
                opciones: [
                  { texto: "A las personas heridas: la esposa, la otra persona y sus familias.", bien: true, explica: "Así lo pide la propuesta: primero, las personas heridas." },
                  { texto: "Al líder, para que no se sienta solo ni avergonzado por lo que hizo.", explica: "El líder recibe disciplina y acompañamiento, pero primero se cuida a las personas heridas." },
                  { texto: "A la iglesia, para que en el barrio no se hable mal de ella por esto.", explica: "La iglesia necesita verdad, justicia y cuidado, pero primero se cuida a las personas heridas." },
                ],
                apoyo: "Primero se cuida a las personas heridas: la esposa del líder, la otra persona y sus familias",
                explica: "Primero se cuida a las personas heridas: la esposa del líder, la otra persona y sus familias. El líder recibe disciplina y acompañamiento.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué ejemplo bíblico sigues para confrontar al líder?",
                opciones: [
                  { texto: "El de Natán con David: con claridad, en privado y con la verdad.", bien: true, explica: "Natán confrontó a David: «Tú eres aquel hombre». La confrontación es clara, en privado al principio y con la verdad." },
                  { texto: "El de esperar en silencio a que el líder confiese solo, sin decirle nada.", explica: "Dios envió a Natán a confrontar a David: la confrontación es clara." },
                  { texto: "El de exponerlo primero delante del grupo, para que aprenda la lección.", explica: "La confrontación es en privado al principio." },
                ],
                apoyo: "Cuando David pecó, Dios envió al profeta Natán a confrontarlo",
                explica: "Dios envió al profeta Natán a confrontar a David: «Tú eres aquel hombre». La confrontación es clara, en privado al principio y con la verdad.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué se hace con los mensajes que circulan en el grupo?",
                opciones: [
                  { texto: "Se da una información veraz y prudente, y se frena el chisme.", bien: true, explica: "La iglesia recibe una información veraz y prudente, sin detalles innecesarios, y se frena el chisme." },
                  { texto: "Se deja que circulen: así todos se enteran más rápido de la verdad.", explica: "El chisme se frena: hiere a las personas y a la iglesia." },
                  { texto: "Se publican todos los detalles, para que nadie invente nada más.", explica: "La información es prudente, sin detalles innecesarios." },
                ],
                apoyo: "La iglesia recibe una información veraz y prudente, sin detalles innecesarios, y se frena el chisme",
                explica: "La iglesia recibe una información veraz y prudente, sin detalles innecesarios, y se frena el chisme.",
              },
              {
                tipo: "explica",
                apoyo: "La restauración espiritual se busca con mansedumbre; volver a un cargo, si llega, es un proceso largo y evaluado",
                clave: {
                  id: "pr-n5-seminario-4-a2-2",
                  tipo: "corta",
                  pregunta: "El líder se arrepiente. ¿Cómo se busca su restauración, y qué pasa con su cargo?",
                  ideas: [
                    { id: "mansedumbre", peso: 50, texto: "La restauración espiritual se busca con mansedumbre.", formas: ["mansedumbre", "espiritu manso", "humildad", "humildemente", "considerand*", "nosotros mismos", "a (si|ti|mi) mismo"] },
                    { id: "cargo", peso: 50, texto: "Volver a un cargo, si llega, es un proceso largo y evaluado.", formas: ["proceso largo", "largo proceso", "evaluad*", "si llega", "lleva (tiempo|anos)", "con el tiempo", "no es inmediato"] },
                  ],
                  errores: [
                    { id: "inmediato", texto: "Volver a un cargo, si llega, es un proceso largo y evaluado.", formas: ["vuelv* de inmediato", "regres* de inmediato", "de inmediato a su cargo", "inmediatamente a su cargo", "(vuelve|vuelva|regresa|regrese) (ya|enseguida|pronto)", "(vuelve|vuelva|regresa|regrese) a su cargo (ya|enseguida|pronto)"], anula: "cargo" },
                  ],
                  modelo: "Su restauración espiritual se busca con mansedumbre, considerándonos a nosotros mismos, porque nadie está libre de caer. Volver a un cargo, si llega, es un proceso largo y evaluado: el perdón no borra todas las consecuencias.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "¿Qué dice la lección de cada uno? Une cada uno con lo que le corresponde.",
            pares: [
              ["El profeta Natán", "Confrontó a David: «Tú eres aquel hombre»"],
              ["David", "Respondió: «Pequé contra Jehová»"],
              ["Dios", "Perdonó a David, pero las consecuencias siguieron"],
              ["Quien restaura al que cae", "Se considera a sí mismo, para no ser tentado"],
            ],
            apoyo: "Aplicar los principios de confrontación, disciplina y restauración de la Palabra",
            explica: "Natán confrontó a David con la verdad (2 Samuel 12:7); David respondió: «Pequé contra Jehová» (12:13); Dios lo perdonó, pero las consecuencias siguieron (12:10-14); y la meta es restaurar con mansedumbre (Gálatas 6:1).",
          },
          {
            consigna: "Une cada principio con lo que enseña la lección.",
            pares: [
              ["La confrontación", "Clara, en privado al principio y con la verdad"],
              ["El perdón", "No borra todas las consecuencias"],
              ["La restauración espiritual", "Se busca con mansedumbre"],
              ["Volver a un cargo", "Si llega, es un proceso largo y evaluado"],
              ["El líder que cae", "Deja su servicio y recibe disciplina y acompañamiento"],
            ],
            apoyo: "La meta es restaurar",
            explica: "La confrontación es clara, en privado al principio y con la verdad; el perdón no borra todas las consecuencias; la restauración se busca con mansedumbre; y volver a un cargo, si llega, es un proceso largo y evaluado.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre David y Natán tiene un error. Tócala.",
            frases: [
              "Dios envió al profeta Natán a confrontar a David.",
              "Natán le habló a David con claridad y con la verdad.",
              "Como Dios perdonó a David, las consecuencias de su pecado terminaron.",
              "David reconoció que había pecado contra Jehová.",
            ],
            malo: 2,
            correccion: "Dios perdonó a David, pero las consecuencias de su pecado siguieron: el perdón no borra todas las consecuencias.",
            apoyo: "Dios lo perdonó, pero las consecuencias de su pecado siguieron (2 Samuel 12:10-14)",
            ref: "2 Samuel 12:13",
            explica: "David respondió: «Pequé contra Jehová», y Dios lo perdonó; pero las consecuencias de su pecado siguieron. El perdón no borra todas las consecuencias.",
          },
          {
            consigna: "Una de estas frases sobre el líder que cae tiene un error. Tócala.",
            frases: [
              "El líder que cae deja su servicio de inmediato.",
              "El líder recibe disciplina y también acompañamiento.",
              "Si el líder pide perdón, vuelve enseguida a su cargo.",
              "Nadie está libre de caer: la prevención empieza en la propia vida.",
            ],
            malo: 2,
            correccion: "La restauración espiritual se busca con mansedumbre; volver a un cargo, si llega, es un proceso largo y evaluado.",
            apoyo: "volver a un cargo, si llega, es un proceso largo y evaluado",
            ref: "Gálatas 6:1",
            explica: "El perdón no borra todas las consecuencias: volver a un cargo, si llega, es un proceso largo y evaluado.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Este paso cuida a las personas heridas y a la iglesia, o les hace más daño? Lleva cada frase a su grupo.",
            grupos: ["Cuida a las personas y a la iglesia", "Les hace más daño"],
            frases: [
              { texto: "Visitar pronto a la esposa del líder", grupo: 0 },
              { texto: "Ocuparse también de la otra persona y de su familia", grupo: 0 },
              { texto: "Dar a la iglesia una información veraz y prudente", grupo: 0 },
              { texto: "Frenar el chisme que corre por los teléfonos", grupo: 0 },
              { texto: "Contar en el culto todos los detalles del caso", grupo: 1 },
              { texto: "Reenviar los mensajes que hablan del caso", grupo: 1 },
              { texto: "Dejar sola a la familia del líder", grupo: 1 },
            ],
            apoyo: "Proponer cómo cuidar a las personas heridas y a la iglesia",
            explica: "Primero se cuida a las personas heridas, y la iglesia recibe una información veraz y prudente, sin detalles innecesarios, y se frena el chisme.",
          },
          {
            consigna: "Cayó un líder de la iglesia. ¿Esta respuesta de los líderes cuida a las personas o les hace más daño? Lleva cada frase a su grupo.",
            grupos: ["Cuida a las personas y a la iglesia", "Les hace más daño"],
            frases: [
              { texto: "Acompañar a la esposa y a los hijos del líder", grupo: 0 },
              { texto: "Decir a la iglesia lo necesario, sin detalles de más", grupo: 0 },
              { texto: "Si hay un menor, proteger a la víctima y reportar a las autoridades", grupo: 0 },
              { texto: "Pedir a los hermanos que no repitan el chisme", grupo: 0 },
              { texto: "Callar el caso de un menor para cuidar el nombre de la iglesia", grupo: 1 },
              { texto: "Contar en las redes lo que pasó, con nombres", grupo: 1 },
              { texto: "Hacer como si nada hubiera pasado", grupo: 1 },
            ],
            apoyo: "Si en algún caso estuviera involucrado un menor o una persona vulnerable, se protege a la víctima y se reporta a las autoridades",
            explica: "Se cuida a las personas heridas, la iglesia recibe una información veraz y prudente, se frena el chisme y, si hay un menor o una persona vulnerable, se protege a la víctima y se reporta a las autoridades.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Primero se cuida a las personas heridas: la esposa del líder, la otra persona y sus familias",
            ref: "Gálatas 6:1",
            situacion: "Eres pastor. Ya confirmaste que un líder de la iglesia cayó en una relación inapropiada, y el domingo la iglesia espera saber qué pasa.",
            escenas: [
              {
                id: "e1",
                narra: "Es lunes, y tienes poco tiempo antes del domingo.",
                pregunta: "¿A quién atiendes primero?",
                opciones: [
                  { texto: "A las personas heridas: la esposa, la otra persona y sus familias.", valor: 2, explica: "Primero se cuida a las personas heridas: la esposa del líder, la otra persona y sus familias.", siguiente: "e2" },
                  { texto: "A los hermanos que más preguntan, para calmar pronto los teléfonos.", valor: 0, explica: "Las preguntas pueden esperar: primero se cuida a las personas heridas.", siguiente: "e1b" },
                  { texto: "Al líder que cayó, y dejas a las familias para más adelante en la semana.", valor: 1, explica: "El líder recibe acompañamiento, pero primero se cuida a las personas heridas.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "La esposa del líder te escribe: nadie de la iglesia la ha llamado.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La visitas pronto y te ocupas de ella y de su familia.", valor: 2, explica: "Ella es de las personas heridas, y a ellas se las cuida primero.", siguiente: "e2" },
                  { texto: "Le respondes que ahora estás ocupado con lo que pasa en la iglesia.", valor: 0, explica: "Primero se cuida a las personas heridas: la esposa del líder, la otra persona y sus familias.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Llega el domingo, y la iglesia espera una palabra tuya.",
                pregunta: "¿Qué dices?",
                opciones: [
                  { texto: "Una información veraz y prudente, sin detalles innecesarios.", valor: 2, explica: "La iglesia recibe una información veraz y prudente, sin detalles innecesarios." },
                  { texto: "Todos los detalles del caso, para que nadie pueda inventar otra cosa.", valor: 0, explica: "La información es prudente, sin detalles innecesarios." },
                  { texto: "Nada: haces como si no hubiera pasado nada en la iglesia.", valor: 0, explica: "La iglesia necesita verdad, justicia y cuidado: recibe una información veraz." },
                ],
              },
              {
                id: "e3",
                narra: "Después del culto, unos hermanos siguen comentando el caso por los teléfonos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les pides con amor que frenen el chisme por los teléfonos.", valor: 2, explica: "La iglesia recibe una información veraz y prudente, y se frena el chisme." },
                  { texto: "Los dejas: es normal que la gente hable de estas cosas.", valor: 0, explica: "El chisme se frena: hiere más a las personas y a la iglesia." },
                  { texto: "Respondes cada mensaje con tu propia versión de lo que pasó.", valor: 0, explica: "Eso multiplica los mensajes: se da una información veraz y prudente, y se frena el chisme." },
                ],
              },
            ],
          },
          {
            apoyo: "Si en algún caso estuviera involucrado un menor o una persona vulnerable, se protege a la víctima y se reporta a las autoridades",
            ref: "Gálatas 6:1",
            situacion: "Eres pastor. Se descubre que un maestro de la escuela dominical, casado, tiene una relación inapropiada con otra persona de la iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Mientras confirmas los hechos, la esposa del maestro te llama llorando.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La escuchas y te ocupas de ella y de su familia desde ahora.", valor: 2, explica: "Primero se cuida a las personas heridas: la esposa, la otra persona y sus familias." },
                  { texto: "Le pides que espere: primero tienes que resolver lo de la iglesia.", valor: 0, explica: "Primero se cuida a las personas heridas." },
                  { texto: "Le dices que ore mucho, y vuelves a tus reuniones sobre el caso.", valor: 0, explica: "Orar es bueno, pero ella es de las personas heridas, y a ellas se las cuida primero." },
                ],
              },
              {
                id: "e2",
                narra: "Al confirmar los hechos, surge una duda: la otra persona podría ser menor de edad.",
                pregunta: "¿Qué haces si es así?",
                opciones: [
                  { texto: "Proteges a la víctima y lo reportas a las autoridades.", valor: 2, explica: "Si estuviera involucrado un menor o una persona vulnerable, se protege a la víctima y se reporta a las autoridades." },
                  { texto: "Lo resuelves dentro de la iglesia, sin avisar a nadie de afuera.", valor: 0, explica: "Con un menor o una persona vulnerable, se protege a la víctima y se reporta a las autoridades." },
                  { texto: "Hablas con el maestro y esperas a ver si se arrepiente de verdad.", valor: 0, explica: "Primero se protege a la víctima y se reporta a las autoridades." },
                ],
              },
              {
                id: "e3",
                narra: "La iglesia nota que el maestro dejó su clase, y muchos preguntan por qué.",
                pregunta: "¿Qué les das?",
                opciones: [
                  { texto: "Una información veraz y prudente, sin detalles de más.", valor: 2, explica: "La iglesia recibe una información veraz y prudente, sin detalles innecesarios, y se frena el chisme." },
                  { texto: "Todos los detalles del caso, para cortar las dudas de raíz.", valor: 0, explica: "La información es prudente, sin detalles innecesarios." },
                  { texto: "Una excusa: dices que el maestro se fue por su trabajo.", valor: 0, explica: "La información es veraz: la iglesia necesita verdad, justicia y cuidado." },
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
            apoyo: "La confrontación es clara, en privado al principio y con la verdad",
            ref: "2 Samuel 12:7",
            clave: {
              id: "pr-n5-seminario-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseña el caso de David y Natán sobre la confrontación y sobre el perdón?",
              ideas: [
                { id: "confrontacion", peso: 50, texto: "La confrontación es clara, en privado al principio y con la verdad, como la de Natán: «Tú eres aquel hombre».", formas: ["(es|sea|fue|ser) clara", "claridad", "claramente", "en privado", "a solas", "con la verdad", "aquel hombre"] },
                { id: "perdon", peso: 50, negativa: true, texto: "Dios perdonó a David, pero las consecuencias de su pecado siguieron: el perdón no borra todas las consecuencias.", formas: ["consecuencias", "no borra", "siguieron"] },
              ],
              errores: [
                { id: "borra", texto: "El perdón no borra todas las consecuencias.", formas: ["borra todas las consecuencias", "borra las consecuencias", "no hay consecuencias", "sin consecuencias", "terminaron las consecuencias", "consecuencias terminaron"], anula: "perdon" },
              ],
              modelo: "Natán confrontó a David con claridad, en privado y con la verdad: «Tú eres aquel hombre». David confesó su pecado y Dios lo perdonó, pero las consecuencias siguieron: el perdón no borra todas las consecuencias.",
            },
          },
          {
            apoyo: "La meta es restaurar",
            ref: "Gálatas 6:1",
            clave: {
              id: "pr-n5-seminario-4-a7-2",
              tipo: "corta",
              pregunta: "Según Gálatas 6:1, ¿cuál es la meta con el que cae, y con qué actitud se busca?",
              ideas: [
                { id: "restaurar", peso: 50, texto: "La meta es restaurar al que cayó.", formas: ["restaur*", "levant*"] },
                { id: "actitud", peso: 50, texto: "Con espíritu de mansedumbre, considerándose a sí mismo, porque nadie está libre de caer.", formas: ["mansedumbre", "espiritu manso", "humildad", "humildemente", "considerand*", "a (si|ti|mi) mismo", "nosotros mismos", "nadie esta libre", "tentad*"] },
              ],
              errores: [
                { id: "castigar", texto: "La meta es restaurar con mansedumbre, no castigar ni humillar.", formas: ["la meta es castigar*", "para castigar*", "humillar*", "avergonzar*", "echar* de la iglesia"], anula: "restaurar" },
              ],
              modelo: "La meta es restaurar al que cayó, con espíritu de mansedumbre, considerándonos a nosotros mismos, no sea que también seamos tentados: nadie está libre de caer.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Caso: crecer sin perder el rumbo
    "n5-seminario-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En el caso de la iglesia que crece, ¿cuánto creció y en cuánto tiempo?", reverso: "De sesenta a doscientas personas en dos años.", apoyo: "una iglesia pasó de sesenta a doscientas personas en dos años" },
              { frente: "¿Cómo están el pastor, los nuevos y los voluntarios?", reverso: "El pastor agotado, muchos nuevos sin conocer a nadie y los voluntarios siempre los mismos.", apoyo: "El pastor está agotado, muchos nuevos no conocen a nadie y los voluntarios son siempre los mismos" },
              { frente: "¿Cuál es el problema de fondo de la iglesia que crece?", reverso: "Que creció en número, pero no en líderes ni en organización.", apoyo: "El problema de fondo es que la iglesia creció en número, pero no en líderes ni en organización" },
              { frente: "¿Qué es el crecimiento, según la lección?", reverso: "Una bendición, aunque trae desafíos.", apoyo: "El crecimiento es una bendición" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué consejo de Jetro vuelve a servir en este caso?", reverso: "«No está bien lo que haces. Desfallecerás del todo».", apoyo: "El consejo de Jetro vuelve a servir: «No está bien lo que haces. Desfallecerás del todo»" },
              { frente: "¿Qué pasó cuando la iglesia de Jerusalén se organizó?", reverso: "Hubo más crecimiento: crecía la palabra del Señor.", apoyo: "Cuando la iglesia de Jerusalén se organizó, el resultado fue más crecimiento" },
              { frente: "¿Dónde es conocida y cuidada cada persona?", reverso: "En los grupos pequeños.", apoyo: "Abrir grupos pequeños donde cada persona sea conocida y cuidada" },
              { frente: "¿Cómo se invita a servir a cada uno?", reverso: "Personalmente, según los dones de cada uno.", apoyo: "Invitar a servir personalmente, según los dones de cada uno" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El problema de fondo es que la iglesia creció en número, pero no en líderes ni en organización",
            ref: "Éxodo 18:17-18",
            titulo: "De sesenta a doscientas",
            relato: [
              "Eres el pastor. En dos años, tu iglesia pasó de sesenta a doscientas personas.",
              "Estás agotado, muchos nuevos no conocen a nadie y los voluntarios son siempre los mismos.",
              "Decides estudiar el caso con el método del seminario, junto con dos líderes maduros.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cuál es el problema de fondo?",
                opciones: [
                  { texto: "Que la iglesia creció en número, pero no en líderes ni en organización.", bien: true, explica: "Ese es el fondo: creció en número, pero no en líderes ni en organización." },
                  { texto: "Que llegó demasiada gente nueva, y habría que dejar de invitar por un tiempo.", explica: "El crecimiento es una bendición: el Señor añadía cada día a la iglesia." },
                  { texto: "Que el pastor no trabaja lo suficiente para atender bien a todos.", explica: "El pastor no puede atender a doscientas personas como atendía a sesenta." },
                ],
                apoyo: "El problema de fondo es que la iglesia creció en número, pero no en líderes ni en organización",
                explica: "Lo que se ve es un pastor cansado, nuevos sin integrar y pocos que sirven; el problema de fondo es que la iglesia creció en número, pero no en líderes ni en organización.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué te dice el consejo de Jetro?",
                opciones: [
                  { texto: "Que no está bien hacerlo todo solo: así desfalleceré del todo.", bien: true, explica: "«No está bien lo que haces. Desfallecerás del todo»." },
                  { texto: "Que el pastor debe atender a todos, como hacía cuando eran sesenta.", explica: "El pastor no puede atender a doscientas personas como atendía a sesenta." },
                  { texto: "Que el crecimiento es un problema, y hay que frenarlo cuanto antes.", explica: "El crecimiento es una bendición, aunque trae desafíos." },
                ],
                apoyo: "El consejo de Jetro vuelve a servir",
                explica: "«No está bien lo que haces. Desfallecerás del todo»: el pastor no puede atender a doscientas personas como atendía a sesenta.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con los nuevos que no conocen a nadie?",
                opciones: [
                  { texto: "Abro grupos pequeños donde cada persona sea conocida y cuidada.", bien: true, explica: "En los grupos pequeños cada persona es conocida y cuidada." },
                  { texto: "Les pido que esperen hasta que yo pueda visitarlos a todos uno por uno.", explica: "Un solo pastor no puede con todo: el cuidado pastoral se reparte en un equipo." },
                  { texto: "Hago un culto más largo, para que tengan tiempo de conocerse entre ellos.", explica: "Lo que la lección propone son grupos pequeños donde cada persona sea conocida y cuidada." },
                ],
                apoyo: "Abrir grupos pequeños donde cada persona sea conocida y cuidada",
                explica: "En los grupos pequeños cada persona es conocida y cuidada, y el cuidado pastoral se reparte en un equipo.",
              },
              {
                tipo: "explica",
                apoyo: "Formar líderes: escoger a personas fieles y formarlas, como enseña 2 Timoteo 2:2",
                clave: {
                  id: "pr-n5-seminario-5-a2-1",
                  tipo: "corta",
                  pregunta: "¿Qué harás para que la iglesia crezca también en líderes, y por qué?",
                  ideas: [
                    { id: "formar", peso: 50, texto: "Escoger a personas fieles y formarlas como líderes (2 Timoteo 2:2).", formas: ["form* lideres", "form* personas", "form* a (personas|otros|hermanos)", "personas fieles", "hermanos fieles", "fieles", "2 timoteo 2 2", "discipul*", "capacit*"] },
                    { id: "porque", peso: 50, texto: "Porque un solo pastor no puede con todo: como dijo Jetro, así desfallecerá del todo.", formas: ["no puede con todo", "un solo pastor", "solo no puede", "desfallec*", "no esta bien", "agot*", "cansad*", "no (puedo|puede) (solo|atender)"] },
                  ],
                  modelo: "Escogeré a personas fieles y las formaré como líderes, como enseña 2 Timoteo 2:2. Porque un solo pastor no puede con todo: como dijo Jetro, si lo hago todo solo, desfalleceré del todo.",
                },
              },
            ],
          },
          {
            apoyo: "Analizar el caso de una iglesia que crece más rápido que su organización",
            ref: "Hechos 6:7",
            titulo: "Setenta jóvenes y un solo líder",
            relato: [
              "Eres pastor. El grupo de jóvenes pasó de quince a setenta en un año, y su único líder está agotado.",
              "Muchos jóvenes nuevos no conocen a nadie, y los que ayudan son siempre los mismos tres.",
              "El líder te pide ayuda, y estudian juntos el caso con el método del seminario.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cuál es el problema de fondo del grupo?",
                opciones: [
                  { texto: "Que creció en número, pero no en líderes ni en organización.", bien: true, explica: "Como en el caso de la iglesia: creció en número, pero no en líderes ni en organización." },
                  { texto: "Que vienen demasiados jóvenes, y el grupo ya no es como era antes.", explica: "El crecimiento es una bendición, aunque trae desafíos." },
                  { texto: "Que el líder tiene poca fe para atender a tantos jóvenes él solo.", explica: "Un solo líder no puede con todo: el problema es de organización." },
                ],
                apoyo: "Analizar el caso de una iglesia que crece más rápido que su organización",
                explica: "Como en el caso de la iglesia, el grupo creció en número, pero no en líderes ni en organización.",
              },
              {
                tipo: "situacion",
                pregunta: "Con el consejo de Jetro, ¿qué le aconsejas al líder?",
                opciones: [
                  { texto: "Que no lo haga todo solo y reparta el cuidado en un equipo.", bien: true, explica: "Un solo líder no puede con todo: el cuidado se reparte en un equipo." },
                  { texto: "Que se esfuerce más y atienda él mismo a cada uno de los jóvenes.", explica: "«No está bien lo que haces. Desfallecerás del todo»." },
                  { texto: "Que cierre el grupo a los nuevos hasta que todo esté en orden.", explica: "El crecimiento es una bendición: la respuesta es organizarse, no cerrar la puerta." },
                ],
                apoyo: "Proteger el descanso del pastor y repartir el cuidado pastoral en un equipo",
                explica: "«No está bien lo que haces. Desfallecerás del todo»: el cuidado se reparte en un equipo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo integran a los jóvenes nuevos?",
                opciones: [
                  { texto: "Con un camino claro: bienvenida, primeros pasos y la academia.", bien: true, explica: "Es el camino claro para los nuevos: bienvenida, primeros pasos y la academia desde el Nivel 1." },
                  { texto: "Esperan a que cada joven nuevo encuentre su lugar por su cuenta.", explica: "A los nuevos se les ofrece un camino claro; no se los deja solos." },
                  { texto: "Les dan a todos un cargo el primer día, para que no se vayan.", explica: "Primero, un camino claro para los nuevos; después se los invita a servir según sus dones." },
                ],
                apoyo: "Ofrecer un camino claro para los nuevos: bienvenida, primeros pasos y la academia desde el Nivel 1",
                explica: "A los nuevos se les ofrece un camino claro: bienvenida, primeros pasos y la academia desde el Nivel 1.",
              },
              {
                tipo: "explica",
                apoyo: "Invitar a servir personalmente, según los dones de cada uno",
                clave: {
                  id: "pr-n5-seminario-5-a2-2",
                  tipo: "corta",
                  pregunta: "¿Cómo invitarías a servir a los jóvenes nuevos, y qué puede traer que el grupo se organice?",
                  ideas: [
                    { id: "invitar", peso: 50, texto: "Invitarlos a servir personalmente, según los dones de cada uno.", formas: ["personalmente", "en persona", "uno por uno", "uno a uno", "segun (sus|los) dones", "sus dones", "los dones", "cara a cara"] },
                    { id: "resultado", peso: 50, texto: "Como en Hechos 6, organizarse trae más crecimiento: crecía la palabra del Señor.", formas: ["mas crecimiento", "crec* la palabra", "hechos 6", "sig* creciendo", "crec* mas", "multiplic*"] },
                  ],
                  modelo: "Los invitaría a servir personalmente, uno por uno, según los dones de cada uno. Y organizarse puede traer más crecimiento, como en Hechos 6: cuando la iglesia se organizó, crecía la palabra del Señor.",
                },
              },
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
            consigna: "Completa lo que significa hoy el consejo de Jetro para la iglesia que crece.",
            texto: "Como dijo Jetro, un solo pastor no puede con todo: hay que formar [[líderes]], abrir grupos [[pequeños]] y repartir el cuidado pastoral en un [[equipo]].",
            distractores: ["oyentes", "grandes", "hombre"],
            errores: {
              oyentes: "Hay que formar líderes: escoger a personas fieles y formarlas.",
              grandes: "Se abren grupos pequeños, donde cada persona sea conocida y cuidada.",
              hombre: "El cuidado pastoral se reparte en un equipo: un solo pastor no puede con todo.",
            },
            apoyo: "como dijo Jetro, un solo pastor no puede con todo",
            ref: "Éxodo 18:17-18",
            explica: "Un solo pastor no puede con todo: hay que formar líderes, abrir grupos pequeños y repartir el cuidado pastoral en un equipo.",
          },
          {
            consigna: "Completa lo que pasó cuando la iglesia se organizó.",
            texto: "Cuando la iglesia de [[Jerusalén]] se [[organizó]], el resultado fue más crecimiento: crecía la palabra del Señor.",
            distractores: ["Antioquía", "dividió"],
            errores: {
              "Antioquía": "La lección habla de la iglesia de Jerusalén, en Hechos 6.",
              "dividió": "La iglesia se organizó, y el resultado fue más crecimiento.",
            },
            apoyo: "Cuando la iglesia de Jerusalén se organizó, el resultado fue más crecimiento",
            ref: "Hechos 6:7",
            explica: "Cuando la iglesia de Jerusalén se organizó, el resultado fue más crecimiento: «Y crecía la palabra del Señor, y el número de los discípulos se multiplicaba grandemente en Jerusalén».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pasaje con lo que enseña la lección sobre la iglesia que crece.",
            pares: [
              ["Hechos 2:47", "El Señor añadía cada día a la iglesia"],
              ["Éxodo 18:17-18", "Jetro advierte: así desfallecerás del todo"],
              ["2 Timoteo 2:2", "Escoger a personas fieles y formarlas"],
              ["Hechos 6:7", "Al organizarse, crecía la palabra del Señor"],
            ],
            apoyo: "Aplicar los principios de Éxodo 18 y Hechos 6 a una iglesia en crecimiento",
            explica: "En Hechos 2:47 el Señor añadía cada día a la iglesia; Jetro advirtió: «No está bien lo que haces. Desfallecerás del todo»; 2 Timoteo 2:2 enseña a escoger a personas fieles y formarlas; y en Hechos 6:7, al organizarse, crecía la palabra.",
          },
          {
            consigna: "Une cada idea con lo que enseña la lección.",
            pares: [
              ["El crecimiento", "Es una bendición, pero trae desafíos"],
              ["El consejo de Jetro", "Un solo pastor no puede con todo"],
              ["La iglesia de Jerusalén organizada", "Siguió creciendo en la palabra"],
              ["El cuidado pastoral", "Se reparte en un equipo"],
            ],
            apoyo: "El crecimiento es una bendición",
            explica: "El crecimiento es una bendición, pero trae desafíos; como dijo Jetro, un solo pastor no puede con todo, y el cuidado pastoral se reparte en un equipo. Cuando la iglesia se organizó en Hechos 6, la palabra siguió creciendo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Ayuda a integrar y formar a los nuevos o los deja solos? Lleva cada frase a su grupo.",
            grupos: ["Integra y forma a los nuevos", "Deja solos a los nuevos"],
            frases: [
              { texto: "Darles una bienvenida clara", grupo: 0 },
              { texto: "Ofrecerles los primeros pasos", grupo: 0 },
              { texto: "Invitarlos a la academia desde el Nivel 1", grupo: 0 },
              { texto: "Invitarlos a servir según sus dones", grupo: 0 },
              { texto: "Esperar a que encuentren su lugar solos", grupo: 1 },
              { texto: "Dejar que sirvan siempre los mismos", grupo: 1 },
              { texto: "Saludarlos el domingo y nada más", grupo: 1 },
            ],
            apoyo: "Proponer un camino para integrar y formar a los nuevos",
            explica: "Un camino claro para los nuevos lleva bienvenida, primeros pasos y la academia desde el Nivel 1, y la invitación a servir según los dones de cada uno.",
          },
          {
            consigna: "En una iglesia que crece, ¿con esta decisión cada persona es conocida y cuidada? Lleva cada frase a su grupo.",
            grupos: ["Cada uno es conocido y cuidado", "Nadie lo conoce ni lo cuida"],
            frases: [
              { texto: "Abrir grupos pequeños en las casas", grupo: 0 },
              { texto: "Repartir el cuidado pastoral en un equipo", grupo: 0 },
              { texto: "Formar líderes fieles para cada grupo", grupo: 0 },
              { texto: "Que el pastor atienda solo a las doscientas personas", grupo: 1 },
              { texto: "No saber quiénes son los que llegaron", grupo: 1 },
              { texto: "Dejar a los nuevos sin un grupo", grupo: 1 },
            ],
            apoyo: "Abrir grupos pequeños donde cada persona sea conocida y cuidada",
            explica: "En los grupos pequeños cada persona es conocida y cuidada, y el cuidado se reparte en un equipo de líderes formados: un solo pastor no puede atender a doscientas personas como atendía a sesenta.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana nueva te dice: Vengo hace tres meses a la iglesia y todavía no conozco a nadie.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "La invito a un grupo pequeño donde sea conocida y cuidada.", bien: true, explica: "En los grupos pequeños cada persona es conocida y cuidada." },
              { texto: "Le digo que tenga paciencia, que con el tiempo conocerá a alguien.", explica: "A los nuevos se les ofrece un camino claro; la integración no se deja al tiempo." },
              { texto: "Le pido que se presente sola ante la iglesia el próximo domingo.", explica: "Integrar no es dejar sola a la persona: se le ofrece un camino claro." },
              { texto: "Le prometo que el pastor la visitará esta semana sin falta.", explica: "El pastor no puede atender a todos: el cuidado pastoral se reparte en un equipo." },
            ],
            apoyo: "Abrir grupos pequeños donde cada persona sea conocida y cuidada",
            explica: "A los nuevos se les ofrece un camino claro, y en los grupos pequeños cada persona es conocida y cuidada.",
          },
          {
            caso: "Un joven que llegó hace poco te dice: Me gustaría ayudar en algo, pero nadie me ha pedido nada.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Lo invito personalmente a servir, según los dones que tiene.", bien: true, explica: "Así se integra a los nuevos: se los invita a servir personalmente, según sus dones." },
              { texto: "Le digo que primero espere varios años, hasta conocer bien todo.", explica: "La lección pide invitar a servir a los nuevos, no hacerlos esperar." },
              { texto: "Le pido que ayude donde falte gente, aunque no sea lo suyo.", explica: "Se invita a servir según los dones de cada uno." },
              { texto: "Le digo que ya hay voluntarios suficientes, que no se preocupe.", explica: "En el caso, los voluntarios son siempre los mismos: hace falta invitar a servir." },
            ],
            apoyo: "Invitar a servir personalmente, según los dones de cada uno",
            explica: "Una iglesia que crece necesita crecer también en líderes: a los nuevos se los invita a servir personalmente, según los dones de cada uno.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Proponer un camino para integrar y formar a los nuevos",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-n5-seminario-5-a7-1",
              tipo: "corta",
              pregunta: "Describe el camino que ofrecerías a las personas nuevas para que se integren y se formen.",
              ideas: [
                { id: "camino", peso: 40, texto: "Un camino claro: bienvenida, primeros pasos y la academia desde el Nivel 1.", formas: ["bienvenida", "primeros pasos", "academia", "nivel 1", "camino claro"] },
                { id: "grupos", peso: 30, texto: "Un grupo pequeño donde cada persona sea conocida y cuidada.", formas: ["grupo* pequen*", "celula*", "conocid* y cuidad*"] },
                { id: "servir", peso: 30, texto: "Invitarlos personalmente a servir, según los dones de cada uno.", formas: ["invit* a servir", "personalmente", "en persona", "sus dones", "los dones"] },
              ],
              modelo: "Les ofrecería un camino claro: bienvenida, primeros pasos y la academia desde el Nivel 1. Los llevaría a un grupo pequeño donde sean conocidos y cuidados, y los invitaría personalmente a servir, según sus dones.",
            },
          },
          {
            apoyo: "Una iglesia que crece necesita crecer también en líderes",
            ref: "Hechos 6:7",
            clave: {
              id: "pr-n5-seminario-5-a7-2",
              tipo: "corta",
              pregunta: "Una persona nueva lleva un mes en tu iglesia. ¿Qué pasos darías para que se integre y empiece a servir?",
              ideas: [
                { id: "camino", peso: 40, texto: "Un camino claro: bienvenida, primeros pasos y la academia desde el Nivel 1.", formas: ["bienvenida", "primeros pasos", "academia", "nivel 1", "camino claro"] },
                { id: "grupos", peso: 30, texto: "Un grupo pequeño donde sea conocida y cuidada.", formas: ["grupo* pequen*", "celula*", "conocid* y cuidad*"] },
                { id: "servir", peso: 30, texto: "Invitarla personalmente a servir, según sus dones.", formas: ["personalmente", "en persona", "sus dones", "los dones", "segun (sus|los) dones"] },
              ],
              modelo: "Le daría la bienvenida y la llevaría por los primeros pasos y la academia desde el Nivel 1. La invitaría a un grupo pequeño, donde sea conocida y cuidada, y después a servir personalmente, según sus dones.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Mi plan de ministerio
    "n5-seminario-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas partes tiene un plan de ministerio?", reverso: "Ocho partes.", apoyo: "Un plan de ministerio tiene ocho partes" },
              { frente: "¿Qué se pregunta en el llamado y la visión?", reverso: "A qué te llamó Dios y hacia dónde crees que lleva tu ministerio.", apoyo: "El llamado y la visión: a qué te llamó Dios y hacia dónde crees que lleva tu ministerio" },
              { frente: "¿Qué mira el diagnóstico de tu ministerio?", reverso: "Las fortalezas, las debilidades, las oportunidades y los riesgos.", apoyo: "El diagnóstico: las fortalezas, las debilidades, las oportunidades y los riesgos de tu ministerio" },
              { frente: "¿Cómo son las metas de un buen plan?", reverso: "Pocas, claras, que se puedan medir y con fecha.", apoyo: "Las metas: pocas, claras, que se puedan medir y con fecha" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué incluye la parte del equipo?", reverso: "Quiénes te ayudarán y cómo los formarás.", apoyo: "El equipo: quiénes te ayudarán y cómo los formarás" },
              { frente: "¿Qué llevan los recursos del plan?", reverso: "Lo que hace falta y un presupuesto sencillo.", apoyo: "Los recursos: lo que hace falta y un presupuesto sencillo" },
              { frente: "¿Qué dice el calendario del plan?", reverso: "Qué se hará cada mes o cada trimestre.", apoyo: "El calendario: qué se hará cada mes o cada trimestre" },
              { frente: "¿Qué cuida la última parte del plan?", reverso: "Tu vida con Dios, tu familia y tu descanso.", apoyo: "El cuidado personal: tu vida con Dios, tu familia y tu descanso" },
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
            consigna: "Une cada parte del plan de ministerio con lo que lleva.",
            pares: [
              ["El llamado y la visión", "A qué te llamó Dios y hacia dónde lleva tu ministerio"],
              ["El diagnóstico", "Fortalezas, debilidades, oportunidades y riesgos"],
              ["Las metas", "Pocas, claras, que se puedan medir y con fecha"],
              ["Los recursos", "Lo que hace falta y un presupuesto sencillo"],
              ["La evaluación", "Cómo y cuándo revisar el avance, y a quién rendir cuentas"],
            ],
            apoyo: "Describir las partes de un plan de ministerio",
            explica: "El plan tiene ocho partes: el llamado y la visión, el diagnóstico, las metas, el equipo, los recursos, el calendario, la evaluación y el cuidado personal.",
          },
          {
            consigna: "Une cada parte del plan con un ejemplo de lo que lleva.",
            pares: [
              ["El equipo", "Dos hermanos que te ayudarán, y cómo los formarás"],
              ["El calendario", "En marzo se abre el grupo; en junio, el primer retiro"],
              ["El cuidado personal", "Tu tiempo con Dios, con tu familia y tu descanso"],
              ["Los recursos", "Las Biblias que hacen falta y su presupuesto"],
              ["La evaluación", "Revisar el avance con tu mentor y rendirle cuentas"],
            ],
            apoyo: "Un plan de ministerio tiene ocho partes",
            explica: "El equipo dice quiénes te ayudarán y cómo los formarás; el calendario, qué se hará cada mes o cada trimestre; el cuidado personal, tu vida con Dios, tu familia y tu descanso; los recursos, lo que hace falta y un presupuesto; y la evaluación, cuándo revisarás el avance y a quién rendirás cuentas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo son las metas de un buen plan de ministerio.",
            texto: "Un buen plan tiene [[pocas]] metas, [[claras]], que se puedan [[medir]] y con [[fecha]].",
            distractores: ["muchas", "vagas", "olvidar", "excusas"],
            errores: {
              muchas: "Las metas de un buen plan son pocas.",
              vagas: "Las metas son claras.",
              olvidar: "Las metas se pueden medir: así se revisa el avance.",
              excusas: "Cada meta lleva su fecha.",
            },
            apoyo: "Las metas: pocas, claras, que se puedan medir y con fecha",
            explica: "Las metas de un plan son pocas, claras, que se puedan medir y con fecha.",
          },
          {
            consigna: "Completa lo que cuida la última parte del plan.",
            texto: "El cuidado personal es tu vida con [[Dios]], tu [[familia]] y tu [[descanso]].",
            distractores: ["fama", "cargo", "trabajo"],
            errores: {
              fama: "El cuidado personal es tu vida con Dios.",
              cargo: "El cuidado personal incluye a tu familia.",
              trabajo: "El cuidado personal incluye tu descanso.",
            },
            apoyo: "El cuidado personal: tu vida con Dios, tu familia y tu descanso",
            explica: "La última parte del plan es el cuidado personal: tu vida con Dios, tu familia y tu descanso.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Escríbelo con tu pastor o con tu mentor, y revísalo cada trimestre",
            ref: "Lucas 14:28",
            situacion: "Eres líder de un ministerio de la iglesia, y vas a escribir con tu mentor tu plan de ministerio para el próximo año.",
            escenas: [
              {
                id: "e1",
                narra: "Abres el cuaderno para empezar.",
                pregunta: "¿Por dónde empiezas?",
                opciones: [
                  { texto: "Por orar, y por el llamado y la visión: hacia dónde te lleva Dios.", valor: 2, explica: "El plan empieza y termina en oración, y su primera parte es el llamado y la visión.", siguiente: "e2" },
                  { texto: "Por la lista de actividades del año, sin preguntar hacia dónde vas.", valor: 0, explica: "Sin la visión, las actividades no tienen rumbo: el plan empieza por el llamado y la visión.", siguiente: "e1b" },
                  { texto: "Por el diagnóstico de tu ministerio, y después piensas en la visión.", valor: 1, explica: "El diagnóstico es parte del plan, pero primero se ora y se escribe el llamado y la visión.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Tu lista tiene treinta actividades, y no sabes cuáles importan más.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves a la visión y escoges pocas metas claras, con fecha.", valor: 2, explica: "Las metas son pocas, claras, que se puedan medir y con fecha.", siguiente: "e2" },
                  { texto: "Las dejas todas: cuantas más actividades haya, mejor será el año.", valor: 0, explica: "Las metas de un buen plan son pocas.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya tienes la visión. Ahora escribes las metas.",
                pregunta: "¿Cómo las escribes?",
                opciones: [
                  { texto: "Pocas, claras, que se puedan medir y con su fecha.", valor: 2, explica: "Así son las metas de un buen plan." },
                  { texto: "Muchas y generales, para que quepa todo lo que sueñas.", valor: 0, explica: "Las metas son pocas y claras, y se pueden medir." },
                  { texto: "Claras, pero sin fecha, para no sentir ninguna presión.", valor: 1, explica: "Que sean claras está bien, pero cada meta lleva su fecha." },
                ],
              },
              {
                id: "e3",
                narra: "Tu plan pide materiales y un salón para las reuniones.",
                pregunta: "¿Qué haces antes de empezar?",
                opciones: [
                  { texto: "Calculas los gastos y haces un presupuesto sencillo.", valor: 2, explica: "Jesús enseñó a calcular antes de edificar: los recursos llevan lo que hace falta y un presupuesto sencillo." },
                  { texto: "Empiezas igual, y ves después cómo pagar lo que falte.", valor: 0, explica: "Jesús enseñó a calcular antes de edificar: quien edifica una torre se sienta primero y calcula los gastos." },
                  { texto: "Pides que la iglesia lo pague todo, sin calcular nada.", valor: 0, explica: "Antes de edificar se calculan los gastos: el plan lleva un presupuesto sencillo." },
                ],
              },
            ],
          },
          {
            apoyo: "La evaluación: cómo y cuándo revisarás el avance, y a quién rendirás cuentas",
            ref: "Habacuc 2:2",
            situacion: "Eres pastor, y acompañas a una líder de jóvenes que prepara su plan de ministerio.",
            escenas: [
              {
                id: "e1",
                narra: "Ella te cuenta su plan, pero solo lo tiene en la cabeza.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que lo escriba, para compartirlo con su equipo y revisarlo.", valor: 2, explica: "Un plan escrito se puede compartir con el equipo, revisar y mejorar.", siguiente: "e2" },
                  { texto: "Que lo guarde en la cabeza: así nadie se lo podrá discutir.", valor: 0, explica: "El plan se escribe: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella».", siguiente: "e1b" },
                  { texto: "Que lo escriba, pero que no se lo muestre a nadie del equipo.", valor: 1, explica: "Escribirlo está bien; además, un plan escrito se comparte con el equipo y se revisa.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Un mes después, ella ya no recuerda bien qué había planeado.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que escriba la visión, como dice Habacuc, y la comparta.", valor: 2, explica: "Un plan escrito se puede compartir con el equipo, revisar y mejorar.", siguiente: "e2" },
                  { texto: "Que no importa: lo mejor es ir viendo todo sobre la marcha.", valor: 0, explica: "El plan se escribe para compartirlo y revisarlo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Su plan ya está escrito, con metas, equipo y calendario.",
                pregunta: "¿Qué le falta definir en la evaluación?",
                opciones: [
                  { texto: "Cuándo revisará el avance y a quién le rendirá cuentas.", valor: 2, explica: "La evaluación dice cómo y cuándo se revisa el avance, y a quién se rinden cuentas." },
                  { texto: "Nada: un buen plan no necesita revisarse durante el año.", valor: 0, explica: "El plan se revisa: con tu pastor o con tu mentor, cada trimestre." },
                  { texto: "Cuándo revisará el avance, aunque no rinda cuentas a nadie.", valor: 1, explica: "Revisar el avance está bien, pero la evaluación también dice a quién se rinden cuentas." },
                ],
              },
              {
                id: "e3",
                narra: "Ella te dice: Lo hice yo; ya no hace falta orar por el plan.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el plan empieza y termina en oración: se encomienda a Jehová.", valor: 2, explica: "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados»: el plan empieza y termina en oración." },
                  { texto: "Que tiene razón: si el plan está bien hecho, todo lo demás sale solo.", valor: 0, explica: "Todo se encomienda a Jehová: el plan empieza y termina en oración." },
                  { texto: "Que ore solo si algo del plan empieza a salir mal.", valor: 0, explica: "El plan empieza y termina en oración, no solo cuando algo sale mal." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Proverbios 16:3, ¿qué se le encomienda a Jehová? Toca las palabras que lo dicen.",
            texto: "Encomienda a Jehová [[tus obras]], Y tus pensamientos serán afirmados",
            apoyo: "El plan empieza y termina en oración",
            ref: "Proverbios 16:3",
            explica: "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados»: el plan empieza y termina en oración. Es el versículo de memoria de la materia.",
          },
          {
            consigna: "¿Qué promete Proverbios 16:3 a quien encomienda sus obras a Jehová? Toca las palabras que lo dicen.",
            texto: "Encomienda a Jehová tus obras, Y tus pensamientos [[serán afirmados]]",
            apoyo: "Un plan escrito y encomendado a Dios convierte la visión en pasos",
            ref: "Proverbios 16:3",
            explica: "Quien encomienda a Jehová sus obras, tiene esta promesa: sus pensamientos serán afirmados. Un plan escrito y encomendado a Dios convierte la visión en pasos.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el plan sometido a Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El plan de ministerio empieza y termina en oración.", verdad: true, explica: "«Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados»: el plan empieza y termina en oración.", apoyo: "El plan empieza y termina en oración", ref: "Proverbios 16:3" },
              { texto: "Con un buen plan escrito, ya no hace falta orar.", verdad: false, explica: "El plan empieza y termina en oración: todo se encomienda a Jehová.", apoyo: "todo se encomienda a Jehová", ref: "Proverbios 16:3" },
              { texto: "Jesús enseñó a calcular antes de edificar.", verdad: true, explica: "Quien quiere edificar una torre se sienta primero y calcula los gastos.", apoyo: "Jesús enseñó a calcular antes de edificar", ref: "Lucas 14:28" },
            ],
          },
          {
            consigna: "Sobre la evaluación y la rendición de cuentas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En la evaluación del plan se dice a quién rendirás cuentas.", verdad: true, explica: "La evaluación dice cómo y cuándo revisarás el avance, y a quién rendirás cuentas.", apoyo: "La evaluación: cómo y cuándo revisarás el avance, y a quién rendirás cuentas" },
              { texto: "Un plan escrito no se cambia: se cumple tal cual se escribió.", verdad: false, explica: "Un plan escrito se puede compartir con el equipo, revisar y mejorar.", apoyo: "Un plan escrito se puede compartir con el equipo, revisar y mejorar", ref: "Habacuc 2:2" },
              { texto: "El plan es personal, y conviene no mostrárselo a nadie.", verdad: false, explica: "Se escribe con tu pastor o con tu mentor, y un plan escrito se comparte con el equipo.", apoyo: "Escríbelo con tu pastor o con tu mentor, y revísalo cada trimestre" },
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
            apoyo: "¿Cuál será la primera meta de tu plan de ministerio, y para qué fecha?",
            ref: "Habacuc 2:2",
            clave: {
              id: "pr-n5-seminario-6-a7-1",
              tipo: "corta",
              pregunta: "Escribe la primera meta de tu plan de ministerio: qué harás, para qué fecha y cómo sabrás si la cumpliste.",
              ideas: [
                { id: "que", peso: 34, texto: "Qué se hará: una meta clara.", formas: ["abrir*", "abrire", "formar*", "formare", "visit*", "empez*", "comenz*", "inici*", "lograr*", "ensen*", "capacit*", "discipul*", "organiz*", "alcanz*", "reunir*", "llevar*", "plantar*", "levantar*"] },
                { id: "fecha", peso: 33, texto: "Para qué fecha: un día, un mes o un plazo concreto.", formas: ["(1*|2*|3*|4*|5*|6*|7*|8*|9*) de", "(de|en|para) enero", "febr*", "marz*", "en abril", "mayo", "juni*", "juli*", "agost*", "septiem*", "setiem*", "octub*", "noviem*", "diciem*", "fin de ano", "este ano", "en (un|dos|tres|cuatro|seis) (mes|meses|ano|anos)", "trimestre", "para el (dia|mes|ano|fin)", "semana"] },
                { id: "medir", peso: 33, texto: "Cómo se medirá: un número o una señal clara de que se cumplió.", formas: ["medire", "mediremos", "se (puede|pueda|podra) medir", "medir (si|cuantos|cuantas|con)", "sabre si", "sabremos si", "sabre que", "(cuantos|cuantas)", "numero", "al menos", "por lo menos", "revis*", "evalu*", "(dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|doce|quince|veinte|treinta) (personas|grupos|jovenes|lideres|familias|hermanos|ninos)"] },
              ],
              modelo: "Mi primera meta es abrir dos grupos pequeños de jóvenes para el 31 de marzo. Sabré si la cumplí si cada grupo se reúne cada semana con al menos seis personas, y lo revisaré con mi mentor.",
            },
          },
          {
            apoyo: "Preparar el plan de ministerio propio: visión, diagnóstico, metas, equipo, recursos, calendario y evaluación",
            ref: "Lucas 14:28",
            clave: {
              id: "pr-n5-seminario-6-a7-2",
              tipo: "corta",
              pregunta: "En tu plan de ministerio, ¿quiénes formarán tu equipo, qué recursos te harán falta y cuándo revisarás el avance?",
              ideas: [
                { id: "equipo", peso: 34, texto: "El equipo: quiénes te ayudarán y cómo los formarás.", formas: ["mi equipo", "el equipo", "equipo (de|sera|seran)", "me (ayudar*|acompanar*)", "formare", "mi esposa", "mi esposo", "(dos|tres|cuatro|cinco) (personas|hermanos|hermanas|lideres|jovenes)"] },
                { id: "recursos", peso: 33, texto: "Los recursos: lo que hace falta y un presupuesto sencillo.", formas: ["presupuesto", "dinero", "material*", "biblias", "(un|el) salon", "dolares", "ofrenda*", "sillas", "comida"] },
                { id: "revisar", peso: 33, texto: "La evaluación: cuándo revisarás el avance y a quién rendirás cuentas.", formas: ["cada trimestre", "trimestr*", "cada (mes|semana|tres|seis)", "revisare", "evaluare", "(mi|el|un|tu|su) mentor", "rendir* cuentas", "rendire"] },
              ],
              modelo: "Mi equipo serán dos hermanos de la célula, a quienes formaré cada sábado. Me harán falta Biblias y materiales, con un presupuesto sencillo de cien dólares. Revisaré el avance cada trimestre con mi pastor y le rendiré cuentas.",
            },
          },
        ],
      },
    ],
  },
};
