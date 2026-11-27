/**
 * Las prácticas de «Ética cristiana y ministerial» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-etica.ts), con la guía de docs/academia-practicas.md.
 * Quién puede ejercer cada cargo (también el ministerio de la mujer) no se pregunta: es un punto de la declaración de fe
 * por confirmar. Lo del reporte de un abuso va con las mismas palabras de la lección 6.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_ETICA: PracticasMateria = {
  materia: "n4-etica",
  mision: {
    titulo: "Una mente renovada para servir",
    intro: "Tu pastor te pidió que acompañes a los nuevos líderes de la iglesia en las preguntas difíciles de la ética: en qué se funda, cómo decidir cuando la Biblia no lo dice directamente, cómo defender la vida y la dignidad, cómo vivir la pureza, cómo ser íntegro con el dinero, el trabajo y la palabra, y cómo servir sin dañar a nadie, protegiendo a los menores. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes ayudar a otros a vivir una ética que nace de la gracia: una mente renovada por la Palabra, que ama a Dios y al prójimo, defiende la dignidad de cada persona, vive en pureza, es íntegra en lo pequeño y sirve con transparencia, protegiendo siempre a los más débiles.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El fundamento de la ética cristiana
    "n4-etica-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Si la ética cristiana no es una lista de prohibiciones, ¿qué es?", reverso: "Una vida transformada que busca agradar a Dios.", apoyo: "La ética cristiana no es una lista de prohibiciones, sino una vida transformada que busca agradar a Dios" },
              { frente: "Según el carácter de Dios, ¿qué es lo bueno?", reverso: "Lo que refleja a Dios, que es santo, justo y amor.", apoyo: "lo bueno es lo que refleja a Dios, que es santo, justo y amor" },
              { frente: "Según Jesús, ¿cuál es la medida de toda decisión moral?", reverso: "El doble amor: amar a Dios con todo el corazón y al prójimo como a uno mismo.", apoyo: "Toda decisión moral se mide por este doble amor" },
              { frente: "¿Qué dice el relativismo moral?", reverso: "Que no hay verdades morales para todos.", apoyo: "El relativismo dice que no hay verdades morales para todos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué prepara la Escritura al creyente?", reverso: "Para toda buena obra.", apoyo: "la Escritura enseña lo que agrada a Dios y prepara para toda buena obra" },
              { frente: "¿Qué imitamos del ejemplo de Cristo?", reverso: "Su amor, su humildad y su obediencia.", apoyo: "imitamos su amor, su humildad y su obediencia" },
              { frente: "¿Quién produce en nosotros el fruto que agrada a Dios?", reverso: "El Espíritu Santo (Gálatas 5:22-23).", apoyo: "La obra del Espíritu Santo: él produce en nosotros el fruto que agrada a Dios" },
              { frente: "Si el creyente no obedece para ganarse el amor de Dios, ¿por qué obedece?", reverso: "Porque ya fue amado y salvado.", apoyo: "El creyente no obedece para ganarse el amor de Dios, sino porque ya fue amado y salvado" },
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
            consigna: "Une cada fundamento de la ética cristiana con lo que enseña la lección.",
            pares: [
              ["El carácter de Dios", "Lo bueno es lo que refleja a Dios, que es santo, justo y amor"],
              ["La Palabra de Dios", "Enseña lo que agrada a Dios y prepara para toda buena obra"],
              ["El ejemplo de Cristo", "Imitamos su amor, su humildad y su obediencia"],
              ["La obra del Espíritu Santo", "Produce en nosotros el fruto que agrada a Dios"],
            ],
            apoyo: "La ética cristiana se funda en el carácter santo de Dios, en su Palabra, en el ejemplo de Cristo y en la obra del Espíritu",
            ref: "1 Pedro 1:15-16; 2 Timoteo 3:16-17",
            explica: "La ética cristiana se funda en el carácter de Dios (lo bueno refleja a Dios), en su Palabra (enseña lo que le agrada), en el ejemplo de Cristo (imitamos su amor, su humildad y su obediencia) y en la obra del Espíritu (produce el fruto que agrada a Dios).",
          },
          {
            consigna: "¿Qué fundamento de la ética cristiana enseña cada pasaje? Une cada pasaje con su fundamento.",
            pares: [
              ["1 Pedro 1:15-16: lo bueno refleja a Dios, que es santo", "El carácter de Dios"],
              ["2 Timoteo 3:16-17: prepara para toda buena obra", "La Palabra de Dios"],
              ["1 Pedro 2:21: imitamos su humildad y su obediencia", "El ejemplo de Cristo"],
              ["Gálatas 5:22-23: el fruto que agrada a Dios", "La obra del Espíritu Santo"],
            ],
            apoyo: "El ejemplo de Cristo: imitamos su amor, su humildad y su obediencia (1 Pedro 2:21)",
            ref: "1 Pedro 2:21",
            explica: "Cada fundamento tiene su pasaje: el carácter de Dios (1 Pedro 1:15-16), su Palabra (2 Timoteo 3:16-17), el ejemplo de Cristo (1 Pedro 2:21) y la obra del Espíritu Santo (Gálatas 5:22-23).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Lo afirma la ética cristiana o lo dice el relativismo? Lleva cada frase a su grupo.",
            grupos: ["Lo afirma la ética cristiana", "Lo dice el relativismo"],
            frases: [
              { texto: "Hay un bien y un mal reales", grupo: 0 },
              { texto: "Dios existe y ha hablado", grupo: 0 },
              { texto: "La injusticia y el abuso están mal", grupo: 0 },
              { texto: "No hay verdades morales para todos", grupo: 1 },
              { texto: "Cada uno decide lo que está bien o mal", grupo: 1 },
              { texto: "Cada uno puede hacer lo que bien le parece", grupo: 1 },
            ],
            apoyo: "La ética cristiana afirma que hay un bien y un mal reales, porque Dios existe y ha hablado",
            ref: "Jueces 21:25",
            explica: "La ética cristiana afirma que hay un bien y un mal reales, porque Dios existe y ha hablado. El relativismo dice que no hay verdades morales para todos; pero, si fuera así, nadie podría decir que la injusticia o el abuso están mal.",
          },
          {
            consigna: "¿Es una idea de la ética cristiana o del relativismo moral? Lleva cada frase a su grupo.",
            grupos: ["Ética cristiana", "Relativismo moral"],
            frases: [
              { texto: "Lo bueno es lo que refleja a Dios", grupo: 0 },
              { texto: "Toda decisión moral se mide por el doble amor", grupo: 0 },
              { texto: "Dios, que es santo, ha hablado", grupo: 0 },
              { texto: "Las verdades morales cambian según cada persona", grupo: 1 },
              { texto: "Nadie puede decir que algo está mal para todos", grupo: 1 },
              { texto: "El bien y el mal dependen de lo que cada uno piensa", grupo: 1 },
            ],
            apoyo: "El relativismo dice que no hay verdades morales para todos; pero, si fuera así, nadie podría decir que la injusticia o el abuso están mal",
            explica: "La ética cristiana parte de otra base: Dios, que es santo, ha hablado; por eso lo bueno es lo que refleja a Dios. El relativismo dice que no hay verdades morales para todos, y así nadie podría decir que algo está mal.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el relativismo moral: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El relativismo dice que no hay verdades morales para todos.", verdad: true, explica: "Así lo describe la lección; la ética cristiana, en cambio, afirma que hay un bien y un mal reales.", apoyo: "El relativismo dice que no hay verdades morales para todos" },
              { texto: "En tiempos de los jueces, cuando «cada uno hacía lo que bien le parecía», hubo orden y paz.", verdad: false, explica: "Cuando cada uno hacía lo que bien le parecía, el resultado fue el caos.", apoyo: "y el resultado fue el caos", ref: "Jueces 21:25" },
              { texto: "Si el relativismo tuviera razón, nadie podría decir que el abuso está mal.", verdad: true, explica: "Por eso el relativismo no se sostiene: la injusticia y el abuso están mal para todos.", apoyo: "si fuera así, nadie podría decir que la injusticia o el abuso están mal" },
            ],
          },
          {
            consigna: "Sobre la ética cristiana frente al relativismo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La ética cristiana afirma que hay un bien y un mal reales.", verdad: true, explica: "Lo afirma porque Dios existe y ha hablado.", apoyo: "La ética cristiana afirma que hay un bien y un mal reales, porque Dios existe y ha hablado" },
              { texto: "Para la ética cristiana, cada persona decide lo que está bien o mal.", verdad: false, explica: "Eso es lo que muchos dicen hoy; la ética cristiana parte de otra base: Dios, que es santo, ha hablado.", apoyo: "La ética cristiana parte de otra base: Dios, que es santo, ha hablado" },
              { texto: "El relativismo permite decir con firmeza que la injusticia está mal para todos.", verdad: false, explica: "Al revés: si no hubiera verdades morales para todos, nadie podría decir que la injusticia o el abuso están mal.", apoyo: "nadie podría decir que la injusticia o el abuso están mal" },
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
            consigna: "Según Romanos 12:2, ¿por medio de qué se transforma el creyente? Toca las palabras que lo dicen.",
            texto: "No os conforméis a este siglo, sino transformaos por medio de la [[renovación de vuestro entendimiento]]",
            apoyo: "Una mente renovada por la Palabra decide distinto que el mundo",
            ref: "Romanos 12:2",
            explica: "Romanos 12:2 pide no conformarse a este siglo, sino transformarse por medio de la renovación del entendimiento: una mente renovada por la Palabra decide distinto que el mundo.",
          },
          {
            consigna: "Según Romanos 12:2, ¿cómo es la voluntad de Dios que comprueba una mente renovada? Toca las tres palabras que la describen.",
            texto: "para que comprobéis cuál sea la [[buena]] voluntad de Dios, [[agradable]] y [[perfecta]]",
            apoyo: "No es una lista de prohibiciones, sino una mente renovada que comprueba la buena voluntad de Dios",
            ref: "Romanos 12:2",
            explica: "Una mente renovada comprueba cuál sea la buena voluntad de Dios, agradable y perfecta. Por eso la ética cristiana no es una lista de prohibiciones.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una joven de tu grupo de jóvenes te dice: En la universidad todos dicen que cada uno decide qué está bien. ¿Por qué yo tengo que pensar distinto?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Porque una mente renovada por la Palabra decide distinto que el mundo.", bien: true, explica: "Romanos 12:2 pide no conformarse a este siglo, sino renovar el entendimiento para comprobar la buena voluntad de Dios." },
              { texto: "No tienes que hacerlo: allá piensa como ellos, y aquí piensa como creyente.", explica: "Eso es conformarse a este siglo: una mente renovada por la Palabra decide distinto que el mundo." },
              { texto: "Porque cada uno tiene su verdad, y la tuya es la que enseña tu iglesia.", explica: "Eso también es relativismo: la ética cristiana afirma que hay un bien y un mal reales, porque Dios existe y ha hablado." },
              { texto: "Porque si cumples bien las reglas de la iglesia, Dios te va a amar más.", explica: "El creyente no obedece para ganarse el amor de Dios, sino porque ya fue amado y salvado." },
            ],
            apoyo: "Una mente renovada por la Palabra decide distinto que el mundo",
            ref: "Romanos 12:2",
            explica: "Romanos 12:2 llama a no conformarse a este siglo, sino a transformarse por la renovación del entendimiento. Una mente renovada por la Palabra decide distinto que el mundo.",
          },
          {
            caso: "Un hermano que discipulas te dice: Para mí, ser cristiano es cumplir una lista de cosas que no se hacen.",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Que es una vida transformada que busca agradar a Dios, no una lista.", bien: true, explica: "La ética cristiana no es una lista de prohibiciones, sino una vida transformada que busca agradar a Dios." },
              { texto: "Que tiene razón: si cumple la lista, ya agrada a Dios aunque no cambie por dentro.", explica: "La ética cristiana no es una lista de prohibiciones: es una mente renovada que comprueba la buena voluntad de Dios." },
              { texto: "Que no hay reglas: cada creyente decide lo que le parece bien a él.", explica: "Eso es relativismo: la ética cristiana afirma que hay un bien y un mal reales, porque Dios ha hablado." },
              { texto: "Que cumpla la lista con cuidado, para ganarse cada día el amor de Dios.", explica: "El creyente no obedece para ganarse el amor de Dios, sino porque ya fue amado y salvado: la ética cristiana nace de la gracia." },
            ],
            apoyo: "La ética cristiana no es una lista de prohibiciones, sino una vida transformada que busca agradar a Dios",
            ref: "Romanos 12:1-2",
            explica: "La ética cristiana no es una lista de prohibiciones, sino una vida transformada que busca agradar a Dios: una mente renovada que comprueba su buena voluntad.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La ética cristiana se funda en el carácter santo de Dios, en su Palabra, en el ejemplo de Cristo y en la obra del Espíritu, y se resume en amar a Dios y al prójimo",
            ref: "Mateo 22:37-40",
            clave: {
              id: "pr-n4-etica-1-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se funda la ética cristiana, y en qué se resume?",
              ideas: [
                { id: "dios", peso: 35, texto: "Se funda en el carácter santo de Dios y en su Palabra.", formas: ["caracter", "dios (es|que) santo", "santidad", "su palabra", "la palabra", "escritura*", "biblia"] },
                { id: "cristo", peso: 35, texto: "También en el ejemplo de Cristo y en la obra del Espíritu Santo.", formas: ["ejemplo de (cristo|jesus)", "su ejemplo", "imit*", "espiritu", "fruto"] },
                { id: "amor", peso: 30, texto: "Se resume en amar a Dios y al prójimo.", formas: ["amar a dios", "amor a dios", "projimo", "doble amor"] },
              ],
              modelo: "Se funda en el carácter santo de Dios y en su Palabra, en el ejemplo de Cristo y en la obra del Espíritu Santo. Se resume en amar a Dios con todo el corazón y al prójimo como a uno mismo.",
            },
          },
          {
            apoyo: "lo bueno es lo que refleja a Dios, que es santo, justo y amor",
            ref: "1 Pedro 1:15-16",
            clave: {
              id: "pr-n4-etica-1-a7-2",
              tipo: "corta",
              pregunta: "Según la ética cristiana, ¿qué es lo bueno, y cómo nos ayudan Cristo y el Espíritu Santo a vivirlo?",
              ideas: [
                { id: "refleja", peso: 40, texto: "Lo bueno es lo que refleja a Dios, que es santo, justo y amor.", formas: ["refleja*", "parec* a dios", "santo justo", "justo y amor", "caracter de dios"] },
                { id: "cristo", peso: 30, texto: "Imitamos el ejemplo de Cristo: su amor, su humildad y su obediencia.", formas: ["imit*", "ejemplo de (cristo|jesus)", "su ejemplo", "humildad", "obediencia"] },
                { id: "espiritu", peso: 30, texto: "El Espíritu Santo produce en nosotros el fruto que agrada a Dios.", formas: ["fruto", "produce* en", "obra del espiritu", "el espiritu (produce|da|obra)"] },
              ],
              modelo: "Lo bueno es lo que refleja a Dios, que es santo, justo y amor. Para vivirlo, imitamos el ejemplo de Cristo, su amor, su humildad y su obediencia, y el Espíritu Santo produce en nosotros el fruto que agrada a Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Cómo tomar decisiones morales
    "n4-etica-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué se hace si la Biblia manda o prohíbe algo claramente?", reverso: "Se obedece.", apoyo: "Si lo dice claramente, se obedece" },
              { frente: "¿Qué principios bíblicos da la lección como ejemplo?", reverso: "El amor al prójimo, la santidad y la verdad.", apoyo: "Por ejemplo, el amor al prójimo, la santidad y la verdad" },
              { frente: "¿Qué tres preguntas se hacen con 1 Corintios 10:31 y 6:12?", reverso: "¿Glorifica a Dios? ¿Edifica a otros? ¿Me esclaviza?", apoyo: "¿Glorifica a Dios? ¿Edifica a otros? ¿Me esclaviza?" },
              { frente: "¿Cómo da Dios la sabiduría a quien se la pide?", reverso: "Abundantemente y sin reproche.", apoyo: "La sabiduría para decidir se pide a Dios, y él la da sin reproche" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es la primera pregunta de los pasos para decidir?", reverso: "¿Qué manda o prohíbe la Biblia sobre esto?", apoyo: "¿Qué manda o prohíbe la Biblia sobre esto?" },
              { frente: "En lo que la Biblia no regula, ¿qué busca el creyente al usar su libertad?", reverso: "Lo que edifica, sin hacer tropezar al hermano débil.", apoyo: "busca lo que edifica, no hace tropezar al hermano débil y no se deja dominar por nada" },
              { frente: "¿Qué es la conciencia, según la nota de la lección?", reverso: "Una alarma valiosa, que puede estar mal entrenada.", apoyo: "La conciencia es una alarma valiosa, pero puede estar mal entrenada" },
              { frente: "¿Con qué se educa la conciencia?", reverso: "Con la Palabra de Dios.", apoyo: "Se educa con la Palabra de Dios" },
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
            consigna: "Una de estas frases sobre los pasos para decidir tiene un error. Tócala.",
            frases: [
              "Al decidir, se pregunta qué manda o prohíbe la Biblia sobre el tema.",
              "Si la Biblia lo dice claramente, se busca una opinión que diga otra cosa.",
              "Se buscan los principios bíblicos que se aplican, como el amor al prójimo.",
              "Se escucha la conciencia, iluminada por la Palabra de Dios.",
            ],
            malo: 1,
            correccion: "Si la Biblia lo dice claramente, se obedece.",
            apoyo: "¿Qué manda o prohíbe la Biblia sobre esto? Si lo dice claramente, se obedece",
            explica: "El primer paso es preguntar qué manda o prohíbe la Biblia: si lo dice claramente, se obedece. Después se buscan los principios, se escucha la conciencia iluminada por la Palabra y el consejo de creyentes maduros, y se ora.",
          },
          {
            consigna: "Una de estas frases sobre cómo decidir tiene un error. Tócala.",
            frases: [
              "Para decidir, conviene preguntar qué aconsejan creyentes maduros.",
              "Se pregunta si la decisión glorifica a Dios y edifica a otros.",
              "Se pregunta si lo que se quiere hacer puede esclavizar.",
              "Pedir sabiduría a Dios no hace falta si uno ya lo pensó bien.",
            ],
            malo: 3,
            correccion: "Se ora y se pide sabiduría a Dios, que la da abundantemente y sin reproche.",
            apoyo: "Oro y pido sabiduría a Dios (Santiago 1:5)",
            ref: "Santiago 1:5",
            explica: "Los pasos incluyen el consejo de creyentes maduros, las preguntas de Pablo (¿glorifica a Dios?, ¿edifica a otros?, ¿me esclaviza?) y la oración pidiendo sabiduría, que Dios da sin reproche.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Para decidir se pregunta qué manda la Biblia, qué principios se aplican, qué dice la conciencia iluminada por la Palabra y qué aconsejan creyentes maduros, y se ora pidiendo sabiduría",
            ref: "1 Corintios 10:31; 6:12",
            titulo: "Las noches en las redes",
            relato: [
              "Eres líder de jóvenes. Andrés, de diecisiete años, pasa casi todas las noches en las redes sociales hasta la madrugada, y llega cansado a todo.",
              "Después de la reunión te pregunta: ¿Es pecado usar las redes? La Biblia no dice nada de eso.",
              "Decides ayudarle a pensarlo con los pasos de la lección.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes primero?",
                opciones: [
                  { texto: "Que la Biblia no las menciona, pero sí da principios que se aplican.", bien: true, explica: "Cuando ningún versículo lo dice directamente, se buscan los principios bíblicos que se aplican, como el amor al prójimo, la santidad y la verdad." },
                  { texto: "Que, como la Biblia no las menciona, puede usarlas como él quiera.", explica: "Todo es lícito, pero no todo conviene: en lo que la Biblia no regula, la libertad se usa con amor." },
                  { texto: "Que las redes son pecado, y que debe borrar todas sus cuentas desde hoy.", explica: "La Biblia no menciona las redes sociales: es un tema que no regula, y en esos temas se decide con sus principios." },
                ],
                apoyo: "¿Qué principios bíblicos se aplican? Por ejemplo, el amor al prójimo, la santidad y la verdad",
                explica: "La Biblia no menciona las redes sociales, pero sus principios sí se aplican: el amor al prójimo, la santidad y la verdad.",
              },
              {
                tipo: "situacion",
                pregunta: "Andrés reconoce que no puede soltar el teléfono aunque quiera. ¿Qué pregunta de los pasos toca su caso?",
                opciones: [
                  { texto: "¿Me esclaviza? El creyente no se deja dominar por nada.", bien: true, explica: "Es la pregunta de 1 Corintios 6:12: aunque algo sea lícito, el creyente no se deja dominar por nada." },
                  { texto: "¿Lo usan otros jóvenes? Si todos lo usan, entonces está bien.", explica: "Lo que hacen otros no es uno de los pasos: se pregunta si glorifica a Dios, si edifica y si esclaviza." },
                  { texto: "¿Me gusta mucho? Si me gusta, seguro que Dios lo aprueba.", explica: "Que algo guste no dice si conviene: se pregunta si glorifica a Dios, si edifica y si esclaviza." },
                ],
                apoyo: "¿Glorifica a Dios? ¿Edifica a otros? ¿Me esclaviza? (1 Corintios 10:31; 6:12)",
                explica: "Pablo pide no dejarse dominar por nada (1 Corintios 6:12): cuando algo esclaviza, ya no conviene, aunque sea lícito.",
              },
              {
                tipo: "situacion",
                pregunta: "Andrés no sabe qué decidir. ¿Qué más le propones, según los pasos?",
                opciones: [
                  { texto: "Que pida consejo a creyentes maduros y que ore pidiendo sabiduría.", bien: true, explica: "Los pasos piden escuchar lo que aconsejan creyentes maduros (Proverbios 11:14) y orar pidiendo sabiduría (Santiago 1:5)." },
                  { texto: "Que decida él solo, y que no le cuente a nadie lo que le está pasando.", explica: "Uno de los pasos es preguntar qué aconsejan creyentes maduros (Proverbios 11:14)." },
                  { texto: "Que espere a sentirse culpable para saber si está bien o mal.", explica: "La conciencia es una alarma valiosa, pero puede estar mal entrenada: se educa con la Palabra, y se ora pidiendo sabiduría." },
                ],
                apoyo: "¿Qué aconsejan creyentes maduros? (Proverbios 11:14)",
                explica: "Además de los principios y de la conciencia iluminada por la Palabra, se escucha a creyentes maduros y se pide sabiduría a Dios, que la da sin reproche.",
              },
              {
                tipo: "explica",
                apoyo: "En los temas que la Biblia no regula, el creyente usa su libertad con amor: busca lo que edifica, no hace tropezar al hermano débil y no se deja dominar por nada",
                clave: {
                  id: "pr-n4-etica-2-a3-1",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías a Andrés para que decida qué hacer con las redes, según los pasos de la lección?",
                  ideas: [
                    { id: "principios", peso: 35, texto: "La Biblia no menciona las redes, pero sus principios se aplican: el amor al prójimo, la santidad y la verdad.", formas: ["principios", "amor al projimo", "amar al projimo", "santidad"] },
                    { id: "dominar", peso: 35, negativa: true, texto: "Que no se deje dominar por nada: si las redes lo esclavizan, no le convienen, aunque sean lícitas.", formas: ["esclaviz*", "(dominar|domine|domina|dominado|dominen)", "conviene*", "glorific*", "gloria de dios", "edifica*"] },
                    { id: "consejo", peso: 30, texto: "Que pida consejo a creyentes maduros y ore pidiendo sabiduría a Dios.", formas: ["consejo", "aconsej*", "creyentes maduros", "hermanos maduros", "sabiduria", "(ore|orar|oremos|oracion|ora)"] },
                  ],
                  modelo: "Le diría que la Biblia no menciona las redes, pero sus principios sí se aplican, como el amor al prójimo y la santidad. Que no se deje dominar por nada, que pida consejo a creyentes maduros y que ore pidiendo sabiduría.",
                },
              },
            ],
          },
          {
            apoyo: "¿Qué manda o prohíbe la Biblia sobre esto? Si lo dice claramente, se obedece",
            ref: "Santiago 1:5",
            titulo: "Un ascenso con un costo",
            relato: [
              "Eres pastor asistente. Daniel, un hermano casado y con dos hijos, te pide consejo: le ofrecen un ascenso con mejor sueldo.",
              "El nuevo puesto le pediría viajar casi todo el mes, y apenas vería a su familia. Daniel te dice: La Biblia no habla de ascensos. ¿Cómo decido?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices primero?",
                opciones: [
                  { texto: "Que la Biblia no habla de ascensos, pero sí da principios para decidir.", bien: true, explica: "Si la Biblia no lo dice directamente, se buscan los principios bíblicos que se aplican, como el amor al prójimo." },
                  { texto: "Que acepte de una vez: un sueldo mejor siempre es una bendición de Dios.", explica: "Así se decide sin los pasos: se pregunta qué principios se aplican, qué dice la conciencia y qué aconsejan creyentes maduros." },
                  { texto: "Que lo rechace, porque la Biblia prohíbe aceptar trabajos con viajes.", explica: "La Biblia no dice eso: en lo que no menciona directamente, se decide con sus principios." },
                ],
                apoyo: "¿Qué principios bíblicos se aplican? Por ejemplo, el amor al prójimo, la santidad y la verdad",
                explica: "Primero se pregunta qué manda o prohíbe la Biblia; si no lo dice directamente, se buscan los principios bíblicos que se aplican.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué preguntas de Pablo le ayudan a pesar la decisión?",
                opciones: [
                  { texto: "¿Glorifica a Dios? ¿Edifica a otros? ¿Lo esclaviza?", bien: true, explica: "Son las preguntas de 1 Corintios 10:31 y 6:12: si glorifica a Dios, si edifica a otros y si esclaviza." },
                  { texto: "¿Cuánto más va a ganar? ¿Qué dirán en su trabajo nuevo?", explica: "El dinero y la opinión de otros no son las preguntas de Pablo: se pregunta si glorifica a Dios, si edifica y si esclaviza." },
                  { texto: "¿Lo hacen otros hermanos? ¿Se lo van a aplaudir?", explica: "Lo que hacen o aplauden otros no decide: se pregunta si glorifica a Dios, si edifica y si esclaviza." },
                ],
                apoyo: "¿Glorifica a Dios? ¿Edifica a otros? ¿Me esclaviza? (1 Corintios 10:31; 6:12)",
                explica: "Las preguntas de Pablo son tres: ¿glorifica a Dios?, ¿edifica a otros?, ¿me esclaviza? Todo se hace para la gloria de Dios.",
              },
              {
                tipo: "situacion",
                pregunta: "Daniel todavía duda. ¿Qué más le propones antes de decidir?",
                opciones: [
                  { texto: "Que escuche el consejo de creyentes maduros y ore pidiendo sabiduría.", bien: true, explica: "Los pasos piden escuchar a creyentes maduros (Proverbios 11:14) y orar pidiendo sabiduría a Dios (Santiago 1:5)." },
                  { texto: "Que decida rápido y solo, porque pedir consejo es señal de poca fe.", explica: "Uno de los pasos es preguntar qué aconsejan creyentes maduros (Proverbios 11:14)." },
                  { texto: "Que no ore por esto, porque a Dios no le importan los asuntos de trabajo.", explica: "Dios promete ayudar: «Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada»." },
                ],
                apoyo: "Oro y pido sabiduría a Dios (Santiago 1:5)",
                explica: "Al decidir se escucha lo que aconsejan creyentes maduros y se pide sabiduría a Dios, que la da abundantemente y sin reproche.",
              },
              {
                tipo: "explica",
                apoyo: "La sabiduría para decidir se pide a Dios, y él la da sin reproche",
                clave: {
                  id: "pr-n4-etica-2-a3-2",
                  tipo: "corta",
                  pregunta: "Explica a Daniel, en pocas frases, cómo decidir con los pasos de la lección.",
                  ideas: [
                    { id: "principios", peso: 35, texto: "Como la Biblia no habla de ascensos, se buscan los principios que se aplican, como el amor al prójimo.", formas: ["principios", "amor al projimo", "amar al projimo", "santidad"] },
                    { id: "preguntas", peso: 35, texto: "Se pregunta si glorifica a Dios, si edifica a otros y si lo esclaviza.", formas: ["glorific*", "gloria de dios", "edifica*", "esclaviz*", "(dominar|domine|domina|dominado)"] },
                    { id: "consejo", peso: 30, texto: "Se escucha a creyentes maduros y se ora pidiendo sabiduría a Dios.", formas: ["consejo", "aconsej*", "creyentes maduros", "hermanos maduros", "sabiduria", "(ore|orar|oremos|oracion|ora)"] },
                  ],
                  modelo: "Como la Biblia no habla de ascensos, busca los principios que se aplican, como el amor al prójimo. Pregúntate si glorifica a Dios, si edifica a tu familia y si te esclaviza. Pide consejo a creyentes maduros y ora pidiendo sabiduría.",
                },
              },
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
            consigna: "En lo que la Biblia no regula, ¿es usar la libertad con amor o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Usa la libertad con amor", "No usa la libertad con amor"],
            frases: [
              { texto: "Busca lo que edifica a los demás", grupo: 0 },
              { texto: "Cuida de no hacer tropezar al hermano débil", grupo: 0 },
              { texto: "No se deja dominar por nada", grupo: 0 },
              { texto: "Lo hace todo para la gloria de Dios", grupo: 0 },
              { texto: "Si algo es lícito, piensa que siempre conviene", grupo: 1 },
              { texto: "Hace lo que quiere aunque un hermano débil tropiece", grupo: 1 },
              { texto: "Deja que algo lícito lo domine", grupo: 1 },
            ],
            apoyo: "En los temas que la Biblia no regula, el creyente usa su libertad con amor: busca lo que edifica, no hace tropezar al hermano débil y no se deja dominar por nada",
            ref: "1 Corintios 10:23-24",
            explica: "Pablo escribe: «Todo me es lícito, pero no todo conviene; todo me es lícito, pero no todo edifica». Por eso la libertad se usa con amor: se busca lo que edifica, no se hace tropezar al débil y nada debe dominarnos.",
          },
          {
            consigna: "Ante algo que la Biblia no menciona, ¿te ayuda a decidir como enseña Pablo o no? Lleva cada pregunta a su grupo.",
            grupos: ["Pregunta que enseña Pablo", "Pregunta que no ayuda a decidir"],
            frases: [
              { texto: "¿Esto edifica a otros?", grupo: 0 },
              { texto: "¿Hará tropezar a un hermano débil?", grupo: 0 },
              { texto: "¿Me puede dominar o esclavizar?", grupo: 0 },
              { texto: "¿Lo puedo hacer para la gloria de Dios?", grupo: 0 },
              { texto: "¿Lo hace la mayoría de mis amigos?", grupo: 1 },
              { texto: "¿Alguien se va a enterar de que lo hice?", grupo: 1 },
              { texto: "¿Es lícito? Entonces siempre conviene", grupo: 1 },
            ],
            apoyo: "Pablo escribe: «Todo me es lícito, pero no todo conviene; todo me es lícito, pero no todo edifica»",
            ref: "1 Corintios 10:23-24; 10:31",
            explica: "En lo que la Biblia no regula, Pablo enseña a preguntar si edifica, si hace tropezar al débil, si domina y si es para la gloria de Dios: todo es lícito, pero no todo conviene.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se decide en lo que la Biblia no regula.",
            texto: "En los temas que la Biblia no regula, el creyente usa su [[libertad]] con [[amor]] y busca lo que [[edifica]] a los demás.",
            distractores: ["capricho", "orgullo", "divierte"],
            errores: {
              capricho: "El creyente usa su libertad, y la usa con amor.",
              orgullo: "La libertad se usa con amor, pensando en el otro.",
              divierte: "Pablo pide buscar lo que edifica: todo es lícito, pero no todo edifica.",
            },
            apoyo: "En los temas que la Biblia no regula, el creyente usa su libertad con amor",
            ref: "1 Corintios 10:23-24",
            explica: "En lo que la Biblia no regula, el creyente usa su libertad con amor: busca lo que edifica, no hace tropezar al hermano débil y no se deja dominar por nada.",
          },
          {
            consigna: "Completa lo que escribe Pablo sobre lo que la Biblia no regula.",
            texto: "Pablo escribe que todo le es [[lícito]], pero no todo conviene: por eso el creyente busca lo que [[edifica]] y hace todo para la [[gloria]] de Dios.",
            distractores: ["prohibido", "divierte", "comodidad"],
            errores: {
              prohibido: "Pablo escribe: todo me es lícito, pero no todo conviene.",
              divierte: "En lo que la Biblia no regula, el creyente busca lo que edifica.",
              comodidad: "La pregunta final es la de Pablo: hacerlo todo para la gloria de Dios.",
            },
            apoyo: "no todo conviene ni todo edifica, y todo se hace para la gloria de Dios",
            ref: "1 Corintios 10:23-24; 10:31",
            explica: "Todo le es lícito a Pablo, pero no todo conviene ni todo edifica. La pregunta final es la suya: «Si, pues, coméis o bebéis, o hacéis otra cosa, hacedlo todo para la gloria de Dios».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven que aconsejas te dice: Mi conciencia no me molesta, así que no necesito pedir consejo ni orar por esta decisión.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la conciencia se educa con la Palabra, y que pida consejo y ore.", bien: true, explica: "La conciencia es una alarma valiosa, pero puede estar mal entrenada: se educa con la Palabra, y se busca el consejo de creyentes maduros y la sabiduría que Dios da." },
              { texto: "Que tiene razón: si la conciencia está tranquila, ya no hay nada que revisar.", explica: "La conciencia puede estar mal entrenada: se educa con la Palabra de Dios." },
              { texto: "Que no le haga caso a su conciencia, porque nunca sirve para decidir.", explica: "La conciencia es una alarma valiosa, y nunca se pasa por encima de ella a la ligera." },
              { texto: "Que decida solo, porque pedir consejo a otros es una falta de fe en Dios.", explica: "Los pasos incluyen preguntar qué aconsejan creyentes maduros (Proverbios 11:14) y pedir sabiduría a Dios." },
            ],
            apoyo: "La conciencia es una alarma valiosa, pero puede estar mal entrenada",
            ref: "Romanos 14:23",
            explica: "La conciencia necesita la Palabra: es una alarma valiosa, pero puede estar mal entrenada. Por eso también se pide consejo a creyentes maduros y se ora pidiendo sabiduría.",
          },
          {
            caso: "Una hermana de tu célula te dice: Siento que esto está mal, pero todos me dicen que no pasa nada. Lo voy a hacer igual.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que no pase por encima de su conciencia a la ligera: que la examine con la Palabra.", bien: true, explica: "La conciencia se educa con la Palabra de Dios, y nunca se pasa por encima de ella a la ligera." },
              { texto: "Que lo haga: lo que piensan todos pesa más que lo que le dice su conciencia por dentro.", explica: "La conciencia es una alarma valiosa: nunca se pasa por encima de ella a la ligera." },
              { texto: "Que su conciencia nunca se equivoca, así que no necesita mirar lo que dice la Palabra.", explica: "La conciencia es una alarma valiosa, pero puede estar mal entrenada: se educa con la Palabra." },
              { texto: "Que no lo piense más: estas decisiones se toman sin orar ni pedir consejo a nadie.", explica: "Los pasos para decidir incluyen el consejo de creyentes maduros y la oración pidiendo sabiduría." },
            ],
            apoyo: "Se educa con la Palabra de Dios, y nunca se pasa por encima de ella a la ligera",
            ref: "Romanos 14:23",
            explica: "La conciencia es una alarma valiosa, pero puede estar mal entrenada. Se educa con la Palabra de Dios, y nunca se pasa por encima de ella a la ligera.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La conciencia es una alarma valiosa, pero puede estar mal entrenada",
            ref: "Romanos 14:23",
            clave: {
              id: "pr-n4-etica-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la conciencia sola no basta para decidir, y qué más se busca antes de decidir?",
              ideas: [
                { id: "conciencia", peso: 40, texto: "La conciencia es una alarma valiosa, pero puede estar mal entrenada: se educa con la Palabra.", formas: ["mal entrenada", "entrenad*", "alarma", "se educa", "educada", "educ* con la palabra", "iluminada por la palabra", "con la palabra", "puede (equivocarse|fallar|enganar*)"] },
                { id: "consejo", peso: 30, texto: "Se busca el consejo de creyentes maduros.", formas: ["consejo", "aconsej*", "creyentes maduros", "hermanos maduros", "personas maduras"] },
                { id: "oracion", peso: 30, texto: "Se ora y se pide sabiduría a Dios, que la da sin reproche.", formas: ["sabiduria", "sin reproche", "(ore|orar|oremos|oracion|ora|oro|oramos)"] },
              ],
              modelo: "Porque la conciencia es una alarma valiosa, pero puede estar mal entrenada: se educa con la Palabra de Dios. Antes de decidir también se busca el consejo de creyentes maduros, y se ora pidiendo sabiduría a Dios.",
            },
          },
          {
            apoyo: "La sabiduría para decidir se pide a Dios, y él la da sin reproche",
            ref: "Santiago 1:5",
            clave: {
              id: "pr-n4-etica-2-a7-2",
              tipo: "corta",
              pregunta: "Cuando un creyente no sabe qué decidir, ¿cómo lo ayuda Dios, y por qué conviene escuchar a otros?",
              ideas: [
                { id: "sabiduria", peso: 50, texto: "Dios da sabiduría a quien se la pide, abundantemente y sin reproche (Santiago 1:5).", formas: ["sabiduria", "sin reproche", "abundantemente", "pedirsela"] },
                { id: "consejo", peso: 50, texto: "Conviene escuchar lo que aconsejan creyentes maduros, porque la conciencia puede estar mal entrenada.", formas: ["creyentes maduros", "hermanos maduros", "personas maduras", "consejo", "aconsej*", "mal entrenada", "puede (equivocarse|fallar)"] },
              ],
              modelo: "Dios le da sabiduría si se la pide en oración, abundantemente y sin reproche, como promete Santiago 1:5. Y conviene escuchar a creyentes maduros, porque su consejo ayuda y la conciencia sola puede estar mal entrenada.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La vida y la dignidad humana
    "n4-etica-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué toda persona tiene un valor que nadie le puede quitar?", reverso: "Porque fue creada a imagen de Dios.", apoyo: "tiene un valor que nadie le da ni le puede quitar: fue creada a imagen de Dios" },
              { frente: "¿De qué no depende la dignidad de una persona?", reverso: "De su utilidad, de su salud ni de su edad.", apoyo: "La dignidad de una persona no depende de su utilidad, de su salud ni de su edad" },
              { frente: "¿Desde cuándo defienden la vida los cristianos?", reverso: "Desde el vientre materno.", apoyo: "Por eso los cristianos defienden la vida desde el vientre materno" },
              { frente: "Según Hechos 17:26, ¿de qué hizo Dios todo el linaje de los hombres?", reverso: "De una sangre.", apoyo: "Dios «de una sangre ha hecho todo el linaje de los hombres»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo acompañan los cristianos a la mujer en un embarazo difícil?", reverso: "Con compasión y sin condenación.", apoyo: "acompañan con compasión y sin condenación a la mujer en un embarazo difícil" },
              { frente: "¿A quiénes pide proteger la Biblia?", reverso: "A los más vulnerables: niños, ancianos, enfermos, pobres, inmigrantes y víctimas de la violencia.", apoyo: "Eso incluye a los niños, los ancianos, los enfermos, los pobres, los inmigrantes y las víctimas de la violencia" },
              { frente: "¿Cuándo se justifica la violencia en la familia?", reverso: "Nunca.", apoyo: "La violencia en la familia nunca se justifica" },
              { frente: "¿Qué contradicen el racismo y el desprecio por el origen de una persona?", reverso: "La creación y el evangelio.", apoyo: "contradicen la creación y el evangelio" },
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
            consigna: "Sobre la dignidad humana: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Toda persona fue creada a imagen de Dios, sea rica o pobre, sana o enferma.", verdad: true, explica: "Toda persona, rica o pobre, joven o anciana, sana o enferma, tiene un valor que nadie le da ni le puede quitar: fue creada a imagen de Dios.", apoyo: "Toda persona, rica o pobre, joven o anciana, sana o enferma, tiene un valor que nadie le da ni le puede quitar" },
              { texto: "Una persona vale más cuanto más útil es para los demás.", verdad: false, explica: "La dignidad de una persona no depende de su utilidad, de su salud ni de su edad.", apoyo: "La dignidad de una persona no depende de su utilidad, de su salud ni de su edad" },
              { texto: "Como el ser humano fue creado a imagen de Dios, la vida humana es sagrada.", verdad: true, explica: "«Y creó Dios al hombre a su imagen»: por eso la vida humana es sagrada.", apoyo: "Por eso la vida humana es sagrada", ref: "Génesis 1:27" },
            ],
          },
          {
            consigna: "Sobre el valor de cada persona: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un anciano enfermo tiene menos dignidad que un joven sano.", verdad: false, explica: "La dignidad no depende de la salud ni de la edad: toda persona fue creada a imagen de Dios.", apoyo: "La dignidad de una persona no depende de su utilidad, de su salud ni de su edad" },
              { texto: "El valor de una persona se lo dan lo que tiene y lo que logra.", verdad: false, explica: "Toda persona tiene un valor que nadie le da ni le puede quitar: fue creada a imagen de Dios.", apoyo: "tiene un valor que nadie le da ni le puede quitar" },
              { texto: "Cada persona que ves lleva la imagen de Dios.", verdad: true, explica: "Por eso se trata a cada persona con la dignidad que Dios le dio.", apoyo: "Cada persona que ves lleva la imagen de Dios" },
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
            consigna: "Completa lo que hacen los cristianos ante la vida antes de nacer.",
            texto: "Los cristianos [[defienden]] la vida desde el [[vientre]] materno y acompañan con [[compasión]], sin condenación, a quien ya abortó y busca el perdón de Dios.",
            distractores: ["critican", "parto", "dureza"],
            errores: {
              critican: "Los cristianos defienden la vida desde el vientre materno.",
              parto: "La vida se defiende desde el vientre materno: Dios conoció a Jeremías antes de formarlo en el vientre.",
              dureza: "A quien ya abortó y busca el perdón de Dios se le acompaña con compasión y sin condenación.",
            },
            apoyo: "Por eso los cristianos defienden la vida desde el vientre materno",
            ref: "Salmos 139:13-16; Jeremías 1:5",
            explica: "David le dice a Dios: «Tú me hiciste en el vientre de mi madre». Por eso los cristianos defienden la vida desde el vientre materno y acompañan con compasión y sin condenación a la mujer en un embarazo difícil y a quien ya abortó y busca el perdón de Dios.",
          },
          {
            consigna: "Completa a quiénes pide proteger la Biblia.",
            texto: "La Biblia pide [[proteger]] a los más vulnerables: los niños, los [[ancianos]], los enfermos, los pobres, los inmigrantes y las [[víctimas]] de la violencia.",
            distractores: ["ignorar", "poderosos", "autores"],
            errores: {
              ignorar: "La Biblia pide proteger a los más vulnerables: «Abre tu boca por el mudo».",
              poderosos: "Los más vulnerables incluyen a los niños, los ancianos, los enfermos, los pobres y los inmigrantes.",
              autores: "La Biblia pide proteger a las víctimas de la violencia, y la violencia en la familia nunca se justifica.",
            },
            apoyo: "La Biblia pide proteger a los más vulnerables",
            ref: "Proverbios 31:8-9",
            explica: "«Abre tu boca por el mudo En el juicio de todos los desvalidos»: la Biblia pide proteger a los niños, los ancianos, los enfermos, los pobres, los inmigrantes y las víctimas de la violencia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "acompañan con compasión y sin condenación a la mujer en un embarazo difícil y a quien ya abortó y busca el perdón de Dios",
            ref: "Salmos 139:13-16; Jeremías 1:5",
            situacion: "Eres parte del equipo de consejería de tu iglesia. Una joven de la iglesia, Carla, pide hablar con el equipo después del culto.",
            escenas: [
              {
                id: "e1",
                narra: "Carla llega con miedo: está embarazada, el padre del bebé se fue y ella no sabe qué hacer.",
                pregunta: "¿Cómo la recibes?",
                opciones: [
                  { texto: "La escuchas con compasión y le dices que no está sola.", valor: 2, explica: "Los cristianos acompañan con compasión y sin condenación a la mujer en un embarazo difícil.", siguiente: "e2" },
                  { texto: "Le dices que la iglesia no puede ayudar a alguien en su caso.", valor: 0, explica: "La iglesia acompaña con compasión a la mujer en un embarazo difícil; no la deja sola.", siguiente: "e1b" },
                  { texto: "Le dices, delante de otros, que esto le pasa por no obedecer.", valor: 0, explica: "Defender la vida y la dignidad no es condenar a las personas, sino amarlas como Dios las ama: con la verdad y con misericordia.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Carla baja la mirada y se levanta para irse.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "La detienes con cariño, le pides perdón y la escuchas con compasión.", valor: 2, explica: "Así la acompañas como enseña la lección: con compasión y sin condenación.", siguiente: "e2" },
                  { texto: "La dejas ir: si de verdad quiere ayuda, ya volverá cuando esté lista.", valor: 0, explica: "La mujer en un embarazo difícil necesita que la acompañen con compasión; dejarla ir es dejarla sola.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Carla te dice que piensa abortar, porque cree que no va a poder sola.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que Dios formó a su hijo en el vientre, y que la iglesia la acompañará.", valor: 2, explica: "Dios le dijo a Jeremías: «Antes que te formase en el vientre te conocí». Los cristianos defienden la vida desde el vientre materno y acompañan con compasión." },
                  { texto: "Que la vida de su hijo es sagrada, y que lo demás lo resuelva ella.", valor: 1, explica: "Es verdad que la vida es sagrada, pero la iglesia no la deja sola: la acompaña con compasión." },
                  { texto: "Que es su decisión, porque la Biblia no dice nada de la vida antes de nacer.", valor: 0, explica: "La Biblia sí lo dice: «Tú me hiciste en el vientre de mi madre». Por eso los cristianos defienden la vida desde el vientre materno." },
                ],
              },
              {
                id: "e3",
                narra: "Semanas después, otra mujer de la iglesia te cuenta, llorando, que hace años abortó y que busca el perdón de Dios.",
                pregunta: "¿Cómo la acompañas?",
                opciones: [
                  { texto: "Con compasión y sin condenación, mientras busca el perdón de Dios.", valor: 2, explica: "Los cristianos acompañan con compasión y sin condenación a quien ya abortó y busca el perdón de Dios." },
                  { texto: "La escuchas con respeto, aunque no le dices nada del perdón de Dios.", valor: 1, explica: "Escucharla con respeto es bueno, pero ella busca el perdón de Dios: se la acompaña con compasión en esa búsqueda." },
                  { texto: "Le dices que lo que hizo la deja lejos de Dios para siempre, sin remedio.", valor: 0, explica: "Defender la vida no es condenar a las personas, sino amarlas como Dios las ama: con la verdad y con misericordia." },
                ],
              },
            ],
          },
          {
            apoyo: "La Biblia pide proteger a los más vulnerables",
            ref: "Proverbios 31:8-9",
            situacion: "Eres líder de una célula. Esta semana te toca pensar en los más débiles de tu célula y de tu barrio.",
            escenas: [
              {
                id: "e1",
                narra: "Doña Marta, una anciana de la célula, está enferma y ya no puede ir a las reuniones. Un hermano dice: Ella ya no aporta nada.",
                pregunta: "¿Qué respondes?",
                opciones: [
                  { texto: "Que su dignidad no depende de su salud, y organizas visitas.", valor: 2, explica: "La dignidad de una persona no depende de su utilidad, de su salud ni de su edad, y la Biblia pide proteger a los ancianos y a los enfermos." },
                  { texto: "Que no hable así, aunque nadie de la célula vaya a visitarla.", valor: 1, explica: "Corregirlo está bien, pero la Biblia pide proteger a los más vulnerables: también hace falta cuidarla." },
                  { texto: "Que tiene razón: conviene usar el tiempo con los que sí pueden servir.", valor: 0, explica: "La dignidad de una persona no depende de su utilidad: doña Marta lleva la imagen de Dios." },
                ],
              },
              {
                id: "e2",
                narra: "Una hermana de la célula te cuenta que su esposo la maltrata, y que él dice que tiene derecho.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que la violencia en la familia nunca se justifica, y buscas protegerla.", valor: 2, explica: "La Biblia pide proteger a las víctimas de la violencia: la violencia en la familia nunca se justifica." },
                  { texto: "Que aguante en silencio, porque así lo va a ganar para Cristo algún día.", valor: 0, explica: "La violencia en la familia nunca se justifica, y la Biblia pide abrir la boca por los desvalidos." },
                  { texto: "Que eso es un asunto de su casa, y que la iglesia no se mete en esas cosas.", valor: 0, explica: "La Biblia pide proteger a los más vulnerables, también a las víctimas de la violencia." },
                ],
              },
              {
                id: "e3",
                narra: "Alguien propone que la célula ayude a una familia de inmigrantes que llegó al barrio sin nada.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Apoyas la idea: la Biblia pide proteger también a los inmigrantes.", valor: 2, explica: "Los inmigrantes están entre los más vulnerables que la Biblia pide proteger." },
                  { texto: "Apoyas la idea, aunque prefieres que se encargue otra célula.", valor: 1, explica: "Apoyar la idea es bueno, pero la Biblia te pide a ti también proteger a los más vulnerables." },
                  { texto: "Te opones: primero los de la iglesia, y ellos ni siquiera son de aquí.", valor: 0, explica: "El desprecio por el origen o la nación de una persona contradice la creación y el evangelio, y la Biblia pide proteger a los inmigrantes." },
                ],
              },
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
            consigna: "¿Honra la imagen de Dios en cada persona o es racismo y discriminación? Lleva cada frase a su grupo.",
            grupos: ["Honra la imagen de Dios", "Es racismo o discriminación"],
            frases: [
              { texto: "Recibir en la iglesia a gente de toda nación", grupo: 0 },
              { texto: "Ver en cada persona la imagen de Dios", grupo: 0 },
              { texto: "Tratar a todos como un solo cuerpo en Cristo", grupo: 0 },
              { texto: "Despreciar a alguien por el color de su piel", grupo: 1 },
              { texto: "Tratar peor a un hermano por su origen", grupo: 1 },
              { texto: "Burlarse de la nación de donde viene alguien", grupo: 1 },
            ],
            apoyo: "El racismo y el desprecio por el origen, el color o la nación de una persona contradicen la creación y el evangelio",
            ref: "Hechos 17:26; Gálatas 3:28",
            explica: "Dios «de una sangre ha hecho todo el linaje de los hombres», y el evangelio une a todos en un solo cuerpo en Cristo: el desprecio por el origen, el color o la nación contradice la creación y el evangelio.",
          },
          {
            consigna: "¿Va con la creación y el evangelio o los contradice? Lleva cada frase a su grupo.",
            grupos: ["Va con la creación y el evangelio", "Contradice la creación y el evangelio"],
            frases: [
              { texto: "Todos venimos de una sola sangre", grupo: 0 },
              { texto: "En Cristo, todos somos un solo cuerpo", grupo: 0 },
              { texto: "Cada persona lleva la imagen de Dios", grupo: 0 },
              { texto: "Unas razas valen más que otras", grupo: 1 },
              { texto: "Los de mi país son mejores que los de otros", grupo: 1 },
              { texto: "El color de la piel dice cuánto vale alguien", grupo: 1 },
            ],
            apoyo: "el evangelio, que une a todos en un solo cuerpo en Cristo (Gálatas 3:28)",
            ref: "Hechos 17:26",
            explica: "Dios hizo de una sangre todo el linaje humano, y el evangelio une a todos en un solo cuerpo en Cristo. Por eso el racismo y el desprecio por el origen, el color o la nación contradicen la creación y el evangelio.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu célula te dice: No quiero que esa familia nueva venga a mi casa; son de otro país y no son como nosotros.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Dios hizo de una sangre a todos, y en Cristo somos un solo cuerpo.", bien: true, explica: "Dios «de una sangre ha hecho todo el linaje de los hombres», y el evangelio une a todos en un solo cuerpo en Cristo." },
              { texto: "Que lo entiendes, y que es mejor que cada grupo se reúna solo con los suyos.", explica: "El desprecio por el origen o la nación de una persona contradice la creación y el evangelio." },
              { texto: "Que no lo diga en voz alta, aunque en el fondo tenga algo de razón.", explica: "No es un asunto de callarlo: el racismo contradice la creación y el evangelio." },
              { texto: "Que los reciba, pero solo cuando ya se parezcan a nosotros en todo.", explica: "Cada persona lleva la imagen de Dios: en Cristo, todos son un solo cuerpo, sin importar su origen." },
            ],
            apoyo: "Dios «de una sangre ha hecho todo el linaje de los hombres»",
            ref: "Hechos 17:26; Gálatas 3:28",
            explica: "El racismo y el desprecio por el origen, el color o la nación de una persona contradicen la creación y el evangelio, que une a todos en un solo cuerpo en Cristo.",
          },
          {
            caso: "Una joven del grupo de alabanza te dice: En el colegio se burlan de mí por mi color de piel, y en la iglesia alguien hizo lo mismo.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Que lleva la imagen de Dios, y que ese desprecio contradice el evangelio.", bien: true, explica: "Cada persona lleva la imagen de Dios, y el desprecio por el color de una persona contradice la creación y el evangelio." },
              { texto: "Que no le dé importancia: son solo bromas, y en la iglesia no hay racismo.", explica: "El desprecio por el color de una persona no es una broma: contradice la creación y el evangelio." },
              { texto: "Que se aleje de la iglesia hasta que esa persona se vaya a otro lugar.", explica: "El evangelio une a todos en un solo cuerpo en Cristo: el problema es el desprecio, no ella." },
              { texto: "Que el color sí importa un poco, pero que Dios la ama de todos modos.", explica: "Dios hizo de una sangre todo el linaje humano: el color no le quita a nadie su valor." },
            ],
            apoyo: "El racismo y el desprecio por el origen, el color o la nación de una persona contradicen la creación y el evangelio",
            ref: "Hechos 17:26; Gálatas 3:28",
            explica: "Toda persona fue creada a imagen de Dios, y el evangelio une a todos en un solo cuerpo en Cristo: el racismo contradice la creación y el evangelio.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La dignidad de una persona no depende de su utilidad, de su salud ni de su edad",
            ref: "Génesis 1:27",
            clave: {
              id: "pr-n4-etica-3-a7-1",
              tipo: "corta",
              pregunta: "¿De dónde viene la dignidad de toda persona, y de qué no depende?",
              ideas: [
                { id: "imagen", peso: 50, texto: "Toda persona fue creada a imagen de Dios.", formas: ["imagen", "creada* por dios", "creado* por dios", "hechos por dios"] },
                { id: "nodepende", peso: 50, negativa: true, texto: "Su dignidad no depende de su utilidad, de su salud ni de su edad.", formas: ["utilidad", "util", "salud", "edad", "rica o pobre", "rico o pobre", "enferm*", "ancian*", "joven"] },
              ],
              errores: [
                { id: "depende", texto: "La dignidad de una persona no depende de su utilidad, de su salud ni de su edad.", formas: ["depende de (su|la|lo) (utilidad|salud|edad|util)", "(de|por) lo util", "(vale|valen) menos", "vale mas (el|la|los|las|quien|si)", "(vale|valen) (segun|por) (su|lo|la) (utilidad|salud|edad|util)"], anula: "nodepende" },
              ],
              modelo: "La dignidad viene de que toda persona fue creada a imagen de Dios. Por eso no depende de su utilidad, de su salud ni de su edad: vale lo mismo rica o pobre, sana o enferma.",
            },
          },
          {
            apoyo: "tiene un valor que nadie le da ni le puede quitar: fue creada a imagen de Dios",
            ref: "Génesis 1:27",
            clave: {
              id: "pr-n4-etica-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Los ancianos enfermos ya no valen como antes. ¿Qué le respondes con lo que enseña la lección?",
              ideas: [
                { id: "imagen", peso: 50, texto: "Toda persona fue creada a imagen de Dios.", formas: ["imagen", "creada* por dios", "creado* por dios", "hechos por dios"] },
                { id: "nodepende", peso: 50, negativa: true, texto: "Su dignidad no depende de su utilidad, de su salud ni de su edad.", formas: ["utilidad", "util", "salud", "edad", "nadie le (da|puede)", "nadie se lo"] },
              ],
              errores: [
                { id: "depende", texto: "La dignidad de una persona no depende de su utilidad, de su salud ni de su edad.", formas: ["depende de (su|la|lo) (utilidad|salud|edad|util)", "(de|por) lo util", "(vale|valen) menos", "tiene razon", "(vale|valen) (segun|por) (su|lo|la) (utilidad|salud|edad|util)"], anula: "nodepende" },
              ],
              modelo: "Le respondo que su valor no depende de su salud ni de su edad, porque toda persona fue creada a imagen de Dios. Un anciano enfermo tiene un valor que nadie le da ni le puede quitar.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La sexualidad, el matrimonio y la pureza
    "n4-etica-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es la sexualidad, según la lección?", reverso: "Un regalo de Dios, no algo sucio.", apoyo: "La sexualidad es un regalo de Dios, no algo sucio" },
              { frente: "¿Qué enseña la declaración de fe del ministerio sobre el matrimonio?", reverso: "Que Dios lo instituyó entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida.", apoyo: "La declaración de fe del ministerio enseña que Dios instituyó el matrimonio entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida" },
              { frente: "¿Qué nos llama a hacer la Biblia ante la fornicación?", reverso: "A huir de ella (1 Corintios 6:18).", apoyo: "y nos llama a huir de ella (1 Corintios 6:18)" },
              { frente: "¿Dónde empieza la pureza, según Jesús?", reverso: "En el corazón.", apoyo: "Jesús enseñó que la pureza empieza en el corazón" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién confirmó el diseño de Génesis 2:24?", reverso: "Jesús (Mateo 19:4-6).", apoyo: "Jesús confirmó este diseño (Mateo 19:4-6)" },
              { frente: "¿Qué hace la pornografía, según la lección?", reverso: "Destruye la intimidad, explota a personas y esclaviza.", apoyo: "La pornografía destruye la intimidad, explota a personas y esclaviza" },
              { frente: "¿Qué incluye la salida de la pornografía?", reverso: "Confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza.", apoyo: "La salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza" },
              { frente: "¿Quién está fuera del alcance de la gracia?", reverso: "Nadie.", apoyo: "Nadie está fuera del alcance de la gracia" },
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
            consigna: "Completa lo que enseña la lección sobre la sexualidad.",
            texto: "La sexualidad es un [[regalo]] de Dios, no algo sucio, y tiene un [[diseño]] y un [[lugar]]: el matrimonio.",
            distractores: ["peligro", "secreto", "precio"],
            errores: {
              peligro: "La sexualidad es un regalo de Dios, no algo sucio.",
              secreto: "Como todo regalo poderoso, la sexualidad tiene un diseño y un lugar.",
              precio: "La sexualidad tiene un diseño y un lugar: Dios la puso dentro del matrimonio.",
            },
            apoyo: "La sexualidad es un regalo de Dios, no algo sucio",
            ref: "Génesis 2:24",
            explica: "La sexualidad es un regalo de Dios, no algo sucio. Pero, como todo regalo poderoso, tiene un diseño y un lugar: Dios la puso dentro del matrimonio entre un hombre y una mujer.",
          },
          {
            consigna: "Completa lo que enseña la declaración de fe del ministerio sobre el matrimonio.",
            texto: "Dios instituyó el matrimonio entre un hombre y una mujer, como un [[pacto]] de [[amor]] y [[fidelidad]] para toda la [[vida]].",
            distractores: ["ensayo", "interés", "costumbre", "juventud"],
            errores: {
              ensayo: "El matrimonio es un pacto para toda la vida.",
              "interés": "El matrimonio es un pacto de amor y fidelidad.",
              costumbre: "El matrimonio es un pacto de amor y fidelidad para toda la vida.",
              juventud: "El pacto del matrimonio es para toda la vida.",
            },
            apoyo: "Dios instituyó el matrimonio entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida",
            ref: "Génesis 2:24; Mateo 19:4-6",
            explica: "La declaración de fe del ministerio enseña que Dios instituyó el matrimonio entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida. Jesús confirmó este diseño.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Génesis 2:24, ¿en qué se convierten el hombre y su mujer? Toca las palabras que lo dicen.",
            texto: "y se unirá a su mujer, y serán [[una sola carne]]",
            apoyo: "Dios creó la sexualidad como un regalo y la puso dentro del matrimonio entre un hombre y una mujer, un pacto para toda la vida",
            ref: "Génesis 2:24",
            explica: "«Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne». Jesús confirmó este diseño (Mateo 19:4-6).",
          },
          {
            consigna: "Según Hebreos 13:4, ¿cómo debe ser el matrimonio para todos? Toca la palabra que lo dice.",
            texto: "[[Honroso]] sea en todos el matrimonio, y el lecho sin mancilla",
            apoyo: "La intimidad sexual es para el matrimonio",
            ref: "Hebreos 13:4",
            explica: "«Honroso sea en todos el matrimonio, y el lecho sin mancilla»: la intimidad sexual es para el matrimonio.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Cuida la pureza o la pone en riesgo? Lleva cada frase a su grupo.",
            grupos: ["Cuida la pureza", "Pone en riesgo la pureza"],
            frases: [
              { texto: "Poner límites prácticos para no caer", grupo: 0 },
              { texto: "Rendir cuentas a alguien de confianza", grupo: 0 },
              { texto: "Confesar la lucha y pedir ayuda", grupo: 0 },
              { texto: "Mirar a una persona para codiciarla", grupo: 1 },
              { texto: "Esconder la lucha y no contarla a nadie", grupo: 1 },
              { texto: "Pensar que la pornografía no daña a nadie", grupo: 1 },
            ],
            apoyo: "La salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza",
            ref: "Mateo 5:27-28",
            explica: "La pureza empieza en el corazón: mirar a una persona para codiciarla ya es adulterio en el corazón. La pornografía esclaviza, y la salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas.",
          },
          {
            consigna: "¿Es lo que hace la pornografía o es parte de la salida? Lleva cada frase a su grupo.",
            grupos: ["Lo que hace la pornografía", "Parte de la salida"],
            frases: [
              { texto: "Destruye la intimidad", grupo: 0 },
              { texto: "Explota a personas", grupo: 0 },
              { texto: "Esclaviza a quien la mira", grupo: 0 },
              { texto: "Confesar", grupo: 1 },
              { texto: "Pedir ayuda", grupo: 1 },
              { texto: "Poner límites prácticos", grupo: 1 },
              { texto: "Rendir cuentas a alguien de confianza", grupo: 1 },
            ],
            apoyo: "La pornografía destruye la intimidad, explota a personas y esclaviza",
            ref: "1 Corintios 6:18-20",
            explica: "La pornografía destruye la intimidad, explota a personas y esclaviza. La salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu grupo te dice: Estoy atrapado en la pornografía. Ya intenté dejarla solo muchas veces y no puedo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que hay salida: confesar, pedir ayuda, poner límites y rendir cuentas.", bien: true, explica: "La salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza." },
              { texto: "Que no es tan grave, porque mirar eso no le hace daño a nadie de verdad.", explica: "La pornografía destruye la intimidad, explota a personas y esclaviza." },
              { texto: "Que lo siga intentando solo, sin contarle a nadie, con más fuerza de voluntad.", explica: "La salida incluye pedir ayuda y rendir cuentas a alguien de confianza." },
              { texto: "Que se aparte de la iglesia hasta que esté limpio y pueda volver.", explica: "La iglesia acompaña a quien quiere ser libre: nadie está fuera del alcance de la gracia." },
            ],
            apoyo: "La salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza",
            ref: "1 Corintios 6:18-20",
            explica: "La pornografía esclaviza, pero hay salida: confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza.",
          },
          {
            caso: "Un joven de tu célula te dice: Yo solo miro, no hago nada. Mirar no puede ser pecado.",
            pregunta: "¿Qué le enseñas?",
            opciones: [
              { texto: "Que la pureza empieza en el corazón: mirar para codiciar ya es adulterio.", bien: true, explica: "Jesús enseñó que la pureza empieza en el corazón: mirar a una persona para codiciarla ya es adulterio en el corazón." },
              { texto: "Que tiene razón: mientras no haga nada, lo que mira no le importa a Dios.", explica: "Jesús enseñó que mirar a una persona para codiciarla ya es adulterio en el corazón." },
              { texto: "Que mirar es pecado solo si alguien más se da cuenta de lo que está mirando.", explica: "La pureza empieza en el corazón, no en lo que ven los demás." },
              { texto: "Que la pureza se cuida solo por fuera, con lo que uno hace delante de otros.", explica: "Jesús enseñó que la pureza empieza en el corazón." },
            ],
            apoyo: "Jesús enseñó que la pureza empieza en el corazón: mirar a una persona para codiciarla ya es adulterio en el corazón",
            ref: "Mateo 5:27-28",
            explica: "Jesús enseñó que la pureza empieza en el corazón: mirar a una persona para codiciarla ya es adulterio en el corazón.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Nadie está fuera del alcance de la gracia",
            ref: "1 Juan 1:9",
            titulo: "Un joven que quiere ser libre",
            relato: [
              "Eres líder de jóvenes. Después de un retiro, Mateo, de veinte años, te pide hablar y te confiesa con vergüenza que lleva meses atrapado en la pornografía.",
              "Te dice que se siente sucio, que Dios ya no lo puede querer y que, si se sabe, todos se van a burlar de él.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices primero?",
                opciones: [
                  { texto: "Que nadie está fuera de la gracia: si confiesa, Dios es fiel para perdonar.", bien: true, explica: "«Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad»." },
                  { texto: "Que primero demuestre que cambió, y que después hablarán del perdón de Dios.", explica: "El perdón no se gana: si confesamos, él es fiel y justo para perdonar. Nadie está fuera del alcance de la gracia." },
                  { texto: "Que no se preocupe, porque eso no es pecado y todos los jóvenes lo hacen.", explica: "La pornografía destruye la intimidad, explota a personas y esclaviza: se habla de ella con verdad." },
                ],
                apoyo: "Nadie está fuera del alcance de la gracia",
                explica: "Hay perdón y restauración para quien confiesa: Dios es fiel y justo para perdonar y limpiar de toda maldad.",
              },
              {
                tipo: "situacion",
                pregunta: "Mateo quiere ser libre. ¿Cómo lo acompañas?",
                opciones: [
                  { texto: "Lo ayudas a poner límites prácticos y a rendir cuentas a alguien de confianza.", bien: true, explica: "La salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza." },
                  { texto: "Le dices que ya está perdonado, y que no necesita cambiar nada más en su vida.", explica: "Hay perdón para quien confiesa, y la iglesia acompaña a quien quiere ser libre: la salida incluye límites prácticos y rendir cuentas." },
                  { texto: "Le pides que lo resuelva él solo, con oración y sin contárselo a nadie más.", explica: "La salida incluye pedir ayuda y rendir cuentas a alguien de confianza." },
                ],
                apoyo: "La iglesia debe hablar de este tema con verdad y sin burla, y acompañar a quien quiere ser libre",
                explica: "La iglesia acompaña a quien quiere ser libre: la salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas.",
              },
              {
                tipo: "situacion",
                pregunta: "Días después, en la reunión de jóvenes, alguien hace un chiste sobre los que luchan con esto. ¿Qué haces?",
                opciones: [
                  { texto: "Pides que se hable del tema con verdad y sin burla: nadie debe ser humillado.", bien: true, explica: "La iglesia debe hablar de este tema con verdad y sin burla. Nadie debe ser humillado ni maltratado." },
                  { texto: "Te ríes tú también, para que nadie sospeche que alguien del grupo tiene esa lucha.", explica: "La iglesia habla de este tema con verdad y sin burla: nadie debe ser humillado." },
                  { texto: "Cuentas lo de Mateo, sin su nombre, para que vean que no es para reírse.", explica: "Así Mateo podría quedar expuesto y humillado: se habla del tema con verdad y sin burla, y nadie debe ser humillado." },
                ],
                apoyo: "La iglesia enseña el diseño de Dios con claridad y trata a toda persona con respeto, cualquiera que sea su lucha",
                explica: "La iglesia trata a toda persona con respeto, cualquiera que sea su lucha, y habla de este tema con verdad y sin burla.",
              },
              {
                tipo: "explica",
                apoyo: "Hay perdón y restauración para quien confiesa, y respeto para todos",
                clave: {
                  id: "pr-n4-etica-4-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe lo que le dirías a Mateo para darle esperanza y un camino para ser libre.",
                  ideas: [
                    { id: "perdon", peso: 50, texto: "Que nadie está fuera del alcance de la gracia: si confiesa, Dios es fiel y justo para perdonarlo y limpiarlo.", formas: ["perdon*", "la gracia", "su gracia", "fiel y justo", "limpi*", "restaura*"] },
                    { id: "salida", peso: 50, texto: "Que la salida incluye pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza.", formas: ["limites", "limite", "rendir cuentas", "rinda* cuentas", "rendirle cuentas", "pedir ayuda", "pida ayuda", "alguien de confianza", "acompan*"] },
                  ],
                  modelo: "Le diría que nadie está fuera del alcance de la gracia: si confiesa su pecado, Dios es fiel y justo para perdonarlo y limpiarlo. Y que hay salida: pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza.",
                },
              },
            ],
          },
          {
            apoyo: "Hay perdón y restauración para quien confiesa, y respeto para todos",
            ref: "1 Juan 1:9",
            titulo: "Una joven que se siente perdida",
            relato: [
              "Eres maestro de jóvenes. Lucía, de diecinueve años, se acerca después de la clase: tuvo intimidad con su novio y ahora siente que Dios ya no la quiere.",
              "Además, otros jóvenes se enteraron y hablan de ella a sus espaldas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices a Lucía?",
                opciones: [
                  { texto: "Que si confiesa su pecado, Dios es fiel y justo para perdonarla.", bien: true, explica: "«Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad»." },
                  { texto: "Que lo que hizo no tiene perdón, y que ya no podrá servir a Dios nunca.", explica: "Nadie está fuera del alcance de la gracia: hay perdón y restauración para quien confiesa." },
                  { texto: "Que no se sienta mal, porque hoy casi todas las parejas hacen lo mismo.", explica: "La intimidad sexual es para el matrimonio; la iglesia habla de este tema con verdad, y ofrece perdón a quien confiesa." },
                ],
                apoyo: "Nadie está fuera del alcance de la gracia",
                explica: "Nadie está fuera del alcance de la gracia: si confesamos, Dios es fiel y justo para perdonar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con los jóvenes que hablan de ella?",
                opciones: [
                  { texto: "Les pides tratarla con respeto: nadie debe ser humillado ni maltratado.", bien: true, explica: "La iglesia trata a toda persona con respeto, cualquiera que sea su lucha. Nadie debe ser humillado ni maltratado." },
                  { texto: "Los dejas hablar, porque así los demás aprenden a no hacer lo mismo que ella.", explica: "La iglesia habla de este tema con verdad y sin burla: nadie debe ser humillado." },
                  { texto: "Sacas a Lucía del grupo de jóvenes, para que se acaben los comentarios.", explica: "La iglesia acompaña a quien quiere ser libre; apartarla la humilla y la deja sola." },
                ],
                apoyo: "Nadie debe ser humillado ni maltratado",
                explica: "La iglesia enseña el diseño de Dios con claridad y trata a toda persona con respeto, cualquiera que sea su lucha.",
              },
              {
                tipo: "situacion",
                pregunta: "Lucía quiere vivir en pureza. ¿Cómo la acompañas?",
                opciones: [
                  { texto: "La ayudas a poner límites prácticos y a rendir cuentas a alguien de confianza.", bien: true, explica: "La pureza es posible con la gracia de Dios y la ayuda de hermanos fieles: límites prácticos y rendir cuentas." },
                  { texto: "Le dices que la pureza ya no es para ella, porque ya cayó una vez y no hay vuelta.", explica: "Hay perdón y restauración para quien confiesa: la pureza es posible con la gracia de Dios." },
                  { texto: "Le pides que no vuelva a hablar del tema con nadie de la iglesia, nunca.", explica: "La iglesia acompaña a quien quiere ser libre, y la pureza es posible con la ayuda de hermanos fieles." },
                ],
                apoyo: "La pureza es posible con la gracia de Dios y la ayuda de hermanos fieles",
                explica: "La pureza es posible con la gracia de Dios y la ayuda de hermanos fieles: se ponen límites prácticos y se rinde cuentas a alguien de confianza.",
              },
              {
                tipo: "explica",
                apoyo: "La pureza es posible con la gracia de Dios y la ayuda de hermanos fieles",
                clave: {
                  id: "pr-n4-etica-4-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías a Lucía para que tenga esperanza y pueda vivir en pureza?",
                  ideas: [
                    { id: "perdon", peso: 50, texto: "Que si confiesa, Dios es fiel y justo para perdonarla: nadie está fuera del alcance de la gracia.", formas: ["perdon*", "fiel y justo", "limpi*", "restaura*", "alcance de la gracia"] },
                    { id: "pureza", peso: 50, texto: "Que la pureza es posible con la gracia de Dios y la ayuda de hermanos fieles: límites prácticos y rendir cuentas.", formas: ["hermanos fieles", "ayuda de (hermanos|otros)", "limites", "limite", "rendir cuentas", "rinda* cuentas", "alguien de confianza", "acompan*"] },
                  ],
                  modelo: "Le diría que si confiesa su pecado, Dios es fiel y justo para perdonarla, porque nadie está fuera del alcance de la gracia. Y que la pureza es posible con la ayuda de hermanos fieles, poniendo límites prácticos y rindiendo cuentas.",
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
            apoyo: "Dios creó la sexualidad como un regalo y la puso dentro del matrimonio entre un hombre y una mujer, un pacto para toda la vida",
            ref: "Génesis 2:24",
            clave: {
              id: "pr-n4-etica-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cuál es el diseño de Dios para la sexualidad y el matrimonio?",
              ideas: [
                { id: "regalo", peso: 30, texto: "La sexualidad es un regalo de Dios, no algo sucio.", formas: ["regalo", "don de dios", "un don", "creacion de dios"] },
                { id: "matrimonio", peso: 40, texto: "Dios la puso dentro del matrimonio entre un hombre y una mujer.", formas: ["dentro del matrimonio", "para el matrimonio", "en el matrimonio", "un hombre y una mujer", "hombre y mujer", "hombre y una mujer"] },
                { id: "pacto", peso: 30, texto: "El matrimonio es un pacto de amor y fidelidad para toda la vida.", formas: ["pacto", "toda la vida", "fidelidad", "fiel*"] },
              ],
              modelo: "La sexualidad es un regalo de Dios, no algo sucio, y Dios la puso dentro del matrimonio entre un hombre y una mujer. El matrimonio es un pacto de amor y fidelidad para toda la vida.",
            },
          },
          {
            apoyo: "La intimidad sexual es para el matrimonio",
            ref: "Hebreos 13:4",
            clave: {
              id: "pr-n4-etica-4-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué la intimidad sexual es solo para el matrimonio, según la lección?",
              ideas: [
                { id: "diseno", peso: 50, texto: "Porque Dios la puso dentro del matrimonio entre un hombre y una mujer, un pacto de amor y fidelidad para toda la vida.", formas: ["pacto", "toda la vida", "fidelidad", "diseño", "dentro del matrimonio", "un hombre y una mujer", "hombre y mujer", "una sola carne", "honroso"] },
                { id: "fuera", peso: 50, texto: "Fuera del matrimonio, la Biblia la llama fornicación o adulterio, y nos llama a huir de ella.", formas: ["fornicacion", "adulterio", "huir", "huyamos", "huye*"] },
              ],
              modelo: "Porque Dios la puso dentro del matrimonio entre un hombre y una mujer, un pacto de amor y fidelidad para toda la vida. Fuera de él, la Biblia la llama fornicación o adulterio, y nos llama a huir de ella.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El dinero, el trabajo y la verdad
    "n4-etica-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Proverbios 11:1, ¿qué le agrada a Jehová?", reverso: "La pesa cabal; el peso falso le es abominación.", apoyo: "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada»" },
              { frente: "¿Qué paga el creyente, como enseñó Pablo?", reverso: "Lo que debe, también sus impuestos.", apoyo: "paga lo que debe y paga sus impuestos, como enseñó Pablo" },
              { frente: "Según 1 Timoteo 6:10, ¿cuál es la raíz de todos los males?", reverso: "El amor al dinero.", apoyo: "«porque raíz de todos los males es el amor al dinero»" },
              { frente: "¿Qué hace el creyente que no ama el dinero?", reverso: "Da con generosidad, se contenta con lo que tiene y no se deja comprar.", apoyo: "Por eso el creyente da con generosidad, se contenta con lo que tiene y no se deja comprar" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo es el creyente en sus negocios?", reverso: "Honrado: no engaña en el precio y no roba en el trabajo.", apoyo: "El creyente es honrado en sus negocios: no engaña en el precio, no roba en el trabajo" },
              { frente: "¿Qué enseñó Pablo en Romanos 13:7?", reverso: "Que paguemos a todos lo que debemos.", apoyo: "como enseñó Pablo: «Pagad a todos lo que debéis»" },
              { frente: "¿Qué predica más que tus palabras?", reverso: "Tu manera de trabajar y de usar el dinero.", apoyo: "Tu manera de trabajar y de usar el dinero predica más que tus palabras" },
              { frente: "¿Dónde se construye la integridad?", reverso: "En los detalles: una factura honesta, una hora bien trabajada, una promesa cumplida.", apoyo: "La integridad se construye en los detalles: una factura honesta, una hora bien trabajada, una promesa cumplida" },
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
            apoyo: "El creyente es honrado en sus negocios y paga lo que debe, también sus impuestos",
            ref: "Proverbios 11:1; Romanos 13:7",
            titulo: "El taller de don Ernesto",
            relato: [
              "Eres pastor asistente. Don Ernesto, un hermano que tiene un taller mecánico, te pide consejo sobre su negocio.",
              "Te cuenta que un cliente le ofrece pagar en efectivo y sin factura, para que ninguno de los dos pague impuestos. Y confiesa que a veces cobra de más a quien no sabe de precios.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le aconsejas sobre el pago sin factura?",
                opciones: [
                  { texto: "Que haga su factura y pague sus impuestos: el creyente paga lo que debe.", bien: true, explica: "El creyente paga sus impuestos, como enseñó Pablo: «Pagad a todos lo que debéis»." },
                  { texto: "Que acepte, porque pagar menos impuestos es una buena forma de cuidar su dinero.", explica: "El creyente paga lo que debe y paga sus impuestos (Romanos 13:7)." },
                  { texto: "Que acepte esta vez, y que la próxima vez ya haga las cosas con más cuidado.", explica: "La integridad se construye en los detalles: una factura honesta." },
                ],
                apoyo: "paga lo que debe y paga sus impuestos, como enseñó Pablo",
                explica: "El creyente es honrado en sus negocios: paga lo que debe y paga sus impuestos, como enseñó Pablo: «Pagad a todos lo que debéis».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices sobre cobrar de más a quien no sabe de precios?",
                opciones: [
                  { texto: "Que no engañe en el precio: el peso falso es abominación a Jehová.", bien: true, explica: "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada»: el creyente no engaña en el precio." },
                  { texto: "Que no pasa nada si el cliente nunca se da cuenta del precio que paga.", explica: "El creyente es honrado en sus negocios: no engaña en el precio, aunque nadie se dé cuenta." },
                  { texto: "Que lo compense dando una buena ofrenda en la iglesia cada domingo.", explica: "Una ofrenda no hace honrado un precio falso: el creyente no engaña en el precio." },
                ],
                apoyo: "El creyente es honrado en sus negocios: no engaña en el precio, no roba en el trabajo",
                explica: "El creyente es honrado en sus negocios: no engaña en el precio. «El peso falso es abominación a Jehová; Mas la pesa cabal le agrada».",
              },
              {
                tipo: "situacion",
                pregunta: "Don Ernesto te dice: Son detalles pequeños; lo importante es que soy fiel en lo grande. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que la integridad se construye en los detalles, como una factura honesta.", bien: true, explica: "La integridad se construye en los detalles: una factura honesta, una hora bien trabajada, una promesa cumplida." },
                  { texto: "Que tiene razón: Dios solo se fija en las decisiones más grandes de la vida.", explica: "El que es fiel en lo muy poco también es fiel en lo más (Lucas 16:10): la integridad se ve en lo pequeño." },
                  { texto: "Que los detalles importan, pero solo cuando hay mucho dinero en juego.", explica: "La integridad se ve en lo pequeño: una factura honesta, una hora bien trabajada." },
                ],
                apoyo: "La integridad se construye en los detalles: una factura honesta, una hora bien trabajada, una promesa cumplida",
                explica: "Lucas 16:10 enseña que el fiel en lo muy poco también es fiel en lo más: la integridad se ve en lo pequeño.",
              },
              {
                tipo: "explica",
                apoyo: "El creyente es honrado en sus negocios: no engaña en el precio, no roba en el trabajo, paga lo que debe y paga sus impuestos",
                clave: {
                  id: "pr-n4-etica-5-a2-1",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías a don Ernesto para que su negocio honre a Dios?",
                  ideas: [
                    { id: "impuestos", peso: 50, texto: "Que pague lo que debe, también sus impuestos, con una factura honesta.", formas: ["impuesto*", "factura*", "pag* lo que debe*"] },
                    { id: "precio", peso: 50, texto: "Que no engañe en el precio: el peso falso es abominación a Jehová.", formas: ["no engan*", "sin engan*", "sin aprovech*", "no aprovech*", "no (se|te) aprovech*", "cobr* lo mismo", "precio justo", "abominacion", "pesa cabal", "honrado", "honradez", "honest*"] },
                  ],
                  errores: [
                    { id: "sin-factura", texto: "El creyente paga lo que debe y paga sus impuestos.", formas: ["sin factura", "menos impuestos", "ahorr* impuestos"], anula: "impuestos" },
                  ],
                  modelo: "Le diría que haga su factura y pague sus impuestos, porque el creyente paga lo que debe. Y que no engañe a nadie en el precio, porque el peso falso es abominación a Jehová y la integridad se construye en los detalles.",
                },
              },
            ],
          },
          {
            apoyo: "El creyente es honrado en sus negocios: no engaña en el precio, no roba en el trabajo, paga lo que debe y paga sus impuestos",
            ref: "Proverbios 11:1; 1 Timoteo 6:9-10",
            titulo: "La cocina de la hermana Gloria",
            relato: [
              "Eres líder de célula. Gloria, una hermana de tu célula, vende comida desde su casa y te pide consejo.",
              "Te cuenta que su balanza marca un poco más de lo que pesa la comida, que le debe dinero a un proveedor desde hace meses y que un cliente le ofrece mucho dinero por firmar un recibo falso.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices sobre su balanza?",
                opciones: [
                  { texto: "Que la arregle: el peso falso es abominación a Jehová, y la pesa cabal le agrada.", bien: true, explica: "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada»." },
                  { texto: "Que la deje así: es muy poca la diferencia, y nadie en su barrio lo va a notar nunca.", explica: "El creyente no engaña en el precio, aunque la diferencia sea pequeña: la integridad se ve en lo pequeño." },
                  { texto: "Que la use así solo con los clientes que siempre le piden una rebaja al pagar.", explica: "El peso falso es abominación a Jehová: el creyente no engaña a nadie en el precio." },
                ],
                apoyo: "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada»",
                explica: "El creyente es honrado en sus negocios: usa la pesa cabal y no engaña en el precio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le aconsejas sobre su deuda con el proveedor?",
                opciones: [
                  { texto: "Que pague lo que debe, como enseñó Pablo: «Pagad a todos lo que debéis».", bien: true, explica: "El creyente paga lo que debe, como enseñó Pablo en Romanos 13:7." },
                  { texto: "Que no le conteste las llamadas, hasta que el proveedor se olvide de la deuda.", explica: "El creyente paga lo que debe: «Pagad a todos lo que debéis»." },
                  { texto: "Que le pague solo si al proveedor le va mal y de verdad le hace falta el dinero.", explica: "Lo que se debe se paga: el creyente paga lo que debe, también sus impuestos." },
                ],
                apoyo: "paga lo que debe y paga sus impuestos, como enseñó Pablo",
                explica: "El creyente es honrado: paga lo que debe y paga sus impuestos, como enseñó Pablo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y qué le dices sobre el recibo falso que le ofrecen firmar?",
                opciones: [
                  { texto: "Que no se deje comprar: la raíz de todos los males es el amor al dinero.", bien: true, explica: "«porque raíz de todos los males es el amor al dinero»: el creyente no se deja comprar." },
                  { texto: "Que lo firme: es mucho dinero, y lo puede usar para ayudar a la iglesia.", explica: "El creyente no se deja comprar: la raíz de todos los males es el amor al dinero." },
                  { texto: "Que lo firme solo esta vez, pero que no lo vuelva a hacer nunca más en su vida.", explica: "La integridad se construye en los detalles, y el creyente no se deja comprar ni una sola vez." },
                ],
                apoyo: "Por eso el creyente da con generosidad, se contenta con lo que tiene y no se deja comprar",
                explica: "El problema no es el dinero, sino amarlo: por eso el creyente se contenta con lo que tiene y no se deja comprar.",
              },
              {
                tipo: "explica",
                apoyo: "El problema no es el dinero, sino amarlo",
                clave: {
                  id: "pr-n4-etica-5-a2-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías a Gloria para que su negocio sea honrado delante de Dios?",
                  ideas: [
                    { id: "honrada", peso: 50, texto: "Que use una pesa cabal y no engañe en el precio, y que pague lo que debe.", formas: ["pesa cabal", "abominacion", "pes* bien", "arregl* (la|su) balanza", "no engan*", "sin engan*", "precio justo", "pag* lo que debe*", "pag* (su|la|sus) deuda*", "pag* al proveedor"] },
                    { id: "comprar", peso: 50, texto: "Que no se deje comprar, porque la raíz de todos los males es el amor al dinero.", formas: ["no se deje comprar", "no te dejes comprar", "no dejarse comprar", "no se deja comprar", "no firm*", "raiz de todos los males", "amor al dinero es raiz"] },
                  ],
                  errores: [
                    { id: "firmar", texto: "El creyente no se deja comprar: no firma un recibo falso.", formas: ["firm* el recibo", "firm* ese recibo", "se deje comprar", "dejarse comprar"], anula: "comprar" },
                  ],
                  modelo: "Le diría que arregle su balanza y use una pesa cabal, que pague lo que debe a su proveedor y que no firme el recibo falso. Que no se deje comprar, porque la raíz de todos los males es el amor al dinero.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se unen estas ideas sobre el dinero? Elige la relación de cada enlace.",
            nodos: [
              { id: "amor", texto: "El amor al dinero", x: 25, y: 12 },
              { id: "males", texto: "Todos los males", x: 75, y: 12 },
              { id: "creyente", texto: "El creyente", x: 50, y: 52 },
              { id: "tiene", texto: "Lo que tiene", x: 20, y: 90 },
              { id: "generosidad", texto: "Generosidad", x: 80, y: 90 },
            ],
            enlaces: [
              { de: "amor", a: "males", relacion: "es raíz de" },
              { de: "creyente", a: "tiene", relacion: "se contenta con" },
              { de: "creyente", a: "generosidad", relacion: "da con" },
            ],
            distractores: ["es lo mismo que", "se gana con"],
            apoyo: "Por eso el creyente da con generosidad, se contenta con lo que tiene y no se deja comprar",
            ref: "1 Timoteo 6:9-10",
            explica: "«porque raíz de todos los males es el amor al dinero». El problema no es el dinero, sino amarlo: por eso el creyente da con generosidad y se contenta con lo que tiene.",
          },
          {
            consigna: "¿Cómo se unen estas ideas sobre la honradez en los negocios? Elige la relación de cada enlace.",
            nodos: [
              { id: "falso", texto: "El peso falso", x: 20, y: 12 },
              { id: "jehova", texto: "Jehová", x: 50, y: 45 },
              { id: "cabal", texto: "La pesa cabal", x: 80, y: 12 },
              { id: "creyente", texto: "El creyente", x: 25, y: 88 },
              { id: "debe", texto: "Lo que debe", x: 75, y: 88 },
            ],
            enlaces: [
              { de: "falso", a: "jehova", relacion: "es abominación a" },
              { de: "cabal", a: "jehova", relacion: "le agrada a" },
              { de: "creyente", a: "debe", relacion: "paga" },
            ],
            distractores: ["le da igual a", "esconde"],
            apoyo: "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada»",
            ref: "Proverbios 11:1; Romanos 13:7",
            explica: "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada». El creyente es honrado en sus negocios y paga lo que debe, también sus impuestos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo trabaja el creyente.",
            texto: "El creyente trabaja de [[corazón]], como para el [[Señor]] y no para los hombres, y trata con [[justicia]] a quienes trabajan para él.",
            distractores: ["prisa", "jefe", "dureza"],
            errores: {
              prisa: "El creyente trabaja de corazón, como para el Señor.",
              jefe: "Se trabaja como para el Señor y no para los hombres.",
              dureza: "El creyente trata con justicia a quienes trabajan para él (Santiago 5:4).",
            },
            apoyo: "El creyente trabaja con diligencia, sin pereza y sin explotar a otros, y trata con justicia a quienes trabajan para él",
            ref: "Colosenses 3:23-24; Santiago 5:4",
            explica: "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres». El creyente trabaja con diligencia y trata con justicia a quienes trabajan para él.",
          },
          {
            consigna: "Completa lo que enseña la lección sobre el trabajo.",
            texto: "El [[trabajo]] es parte del [[plan]] de Dios desde el [[Edén]], y el creyente lo hace con diligencia, como para el Señor.",
            distractores: ["castigo", "error", "diluvio"],
            errores: {
              castigo: "La lección enseña que el trabajo es parte del plan de Dios desde el Edén (Génesis 2:15).",
              error: "El trabajo es parte del plan de Dios.",
              diluvio: "El trabajo es parte del plan de Dios desde el Edén (Génesis 2:15).",
            },
            apoyo: "El trabajo es parte del plan de Dios desde el Edén (Génesis 2:15)",
            ref: "Génesis 2:15",
            explica: "El trabajo es parte del plan de Dios desde el Edén (Génesis 2:15). Por eso el creyente trabaja con diligencia, sin pereza y sin explotar a otros.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la verdad en las palabras: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La mentira, aunque parezca pequeña, rompe la confianza.", verdad: true, explica: "Por eso Pablo pide: «desechando la mentira, hablad verdad cada uno con su prójimo».", apoyo: "La mentira, aunque parezca pequeña, rompe la confianza", ref: "Efesios 4:25" },
              { texto: "Una mentira pequeña no hace daño si sirve para quedar bien.", verdad: false, explica: "La mentira, aunque parezca pequeña, rompe la confianza.", apoyo: "«Por lo cual, desechando la mentira, hablad verdad cada uno con su prójimo»", ref: "Efesios 4:25" },
              { texto: "Jesús enseñó que nuestro sí sea sí y nuestro no sea no.", verdad: true, explica: "Por eso el creyente cumple su palabra aunque le cueste (Mateo 5:37).", apoyo: "Jesús enseñó que nuestro sí sea sí y nuestro no sea no (Mateo 5:37)", ref: "Mateo 5:37" },
            ],
          },
          {
            consigna: "Sobre cumplir la palabra: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El creyente cumple su palabra aunque le cueste.", verdad: true, explica: "Nuestro sí sea sí y nuestro no sea no: el creyente cumple su palabra aunque le cueste.", apoyo: "el creyente cumple su palabra aunque le cueste" },
              { texto: "Si cumplir una promesa sale caro, el creyente puede olvidarla.", verdad: false, explica: "El creyente cumple su palabra aunque le cueste.", apoyo: "Jesús enseñó que nuestro sí sea sí y nuestro no sea no" },
              { texto: "Hablar verdad con el prójimo hace falta solo en las cosas grandes.", verdad: false, explica: "La integridad se ve en lo pequeño, y la mentira, aunque parezca pequeña, rompe la confianza.", apoyo: "La integridad se ve en lo pequeño" },
              { texto: "Una promesa cumplida es uno de los detalles donde se construye la integridad.", verdad: true, explica: "La integridad se construye en los detalles: una factura honesta, una hora bien trabajada, una promesa cumplida.", apoyo: "La integridad se construye en los detalles: una factura honesta, una hora bien trabajada, una promesa cumplida" },
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
            caso: "Un hermano del grupo de alabanza te dice: Prometí ayudar en la mudanza de un vecino, pero me invitaron a algo mejor. Le diré que me enfermé.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que cumpla su palabra aunque le cueste, y que no le mienta.", bien: true, explica: "El creyente cumple su palabra aunque le cueste, y la mentira, aunque parezca pequeña, rompe la confianza." },
              { texto: "Que diga que se enfermó: es una mentira pequeña y nadie sale herido.", explica: "La mentira, aunque parezca pequeña, rompe la confianza." },
              { texto: "Que no conteste los mensajes del vecino, y así no tiene que mentirle.", explica: "Callar para no cumplir también rompe su palabra: el creyente cumple su palabra aunque le cueste." },
              { texto: "Que mande a otro en su lugar sin avisar, para quedar bien con todos.", explica: "Nuestro sí sea sí: el creyente cumple lo que prometió y habla verdad con su prójimo." },
            ],
            apoyo: "el creyente cumple su palabra aunque le cueste",
            ref: "Mateo 5:37; Efesios 4:25",
            explica: "Jesús enseñó que nuestro sí sea sí y nuestro no sea no: el creyente cumple su palabra aunque le cueste, y no miente, porque la mentira rompe la confianza.",
          },
          {
            caso: "Una maestra de niños te dice: Me pidieron enseñar el domingo y dije que sí, pero ya no tengo ganas. Diré que tengo un compromiso.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que su sí sea sí: el creyente cumple su palabra, y mentir rompe la confianza.", bien: true, explica: "Jesús enseñó que nuestro sí sea sí y nuestro no sea no, y la mentira, aunque parezca pequeña, rompe la confianza." },
              { texto: "Que está bien: una excusa así no es mentira si la dice para no quedar mal con nadie.", explica: "Una excusa falsa es una mentira: «desechando la mentira, hablad verdad cada uno con su prójimo»." },
              { texto: "Que no avise nada y que falte, porque al fin y al cabo es solo un domingo.", explica: "Una promesa cumplida es parte de la integridad: el creyente cumple su palabra aunque le cueste." },
              { texto: "Que diga que sí a todo, aunque después no cumpla nada de lo que promete.", explica: "Nuestro sí sea sí y nuestro no sea no: el creyente cumple su palabra." },
            ],
            apoyo: "Jesús enseñó que nuestro sí sea sí y nuestro no sea no (Mateo 5:37): el creyente cumple su palabra aunque le cueste",
            ref: "Mateo 5:37",
            explica: "El creyente cumple su palabra aunque le cueste. La mentira, aunque parezca pequeña, rompe la confianza.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El creyente trabaja con diligencia, sin pereza y sin explotar a otros, y trata con justicia a quienes trabajan para él",
            ref: "Colosenses 3:23-24",
            clave: {
              id: "pr-n4-etica-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo trabaja un creyente, según la lección?",
              ideas: [
                { id: "corazon", peso: 40, texto: "Trabaja de corazón, como para el Señor y no para los hombres.", formas: ["de corazon", "para el senor", "como para dios", "para dios"] },
                { id: "diligencia", peso: 30, texto: "Trabaja con diligencia, sin pereza.", formas: ["diligen*", "sin pereza", "sin flojera", "no (es|ser|sea) perezoso", "con esfuerzo", "con empeno", "bien trabajad*", "bien hecho", "trabaj* bien"] },
                { id: "justicia", peso: 30, texto: "No explota a otros y trata con justicia a quienes trabajan para él.", formas: ["justicia", "justo", "sin explotar", "no explot*", "trata bien"] },
              ],
              modelo: "Trabaja de corazón, como para el Señor y no para los hombres. Lo hace con diligencia y sin pereza, sin explotar a nadie, y trata con justicia a quienes trabajan para él.",
            },
          },
          {
            apoyo: "El trabajo es parte del plan de Dios desde el Edén (Génesis 2:15)",
            ref: "Génesis 2:15; Colosenses 3:23",
            clave: {
              id: "pr-n4-etica-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Trabajo solo por el sueldo y cuando el jefe me ve. ¿Qué le enseñas sobre el trabajo?",
              ideas: [
                { id: "plan", peso: 50, texto: "El trabajo es parte del plan de Dios desde el Edén.", formas: ["plan de dios", "eden", "genesis 2", "parte del plan"] },
                { id: "corazon", peso: 50, texto: "Se trabaja de corazón, como para el Señor y no para los hombres.", formas: ["de corazon", "para el senor", "como para dios", "para dios", "no para los hombres"] },
              ],
              modelo: "Le enseño que el trabajo es parte del plan de Dios desde el Edén, y que se hace de corazón, como para el Señor y no para los hombres, aunque el jefe no lo vea.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La ética del ministro
    "n4-etica-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo pide Pablo que sea quien dirige, en 1 Timoteo 3:2-3?", reverso: "Irreprensible, sobrio y prudente, no codicioso de ganancias deshonestas.", apoyo: "Pablo pide que quien dirige sea «irreprensible», sobrio y prudente, «no codicioso de ganancias deshonestas»" },
              { frente: "¿De qué son, ante todo, los requisitos del liderazgo?", reverso: "De carácter.", apoyo: "Los requisitos del liderazgo son, ante todo, de carácter" },
              { frente: "¿A quiénes protege la ética ministerial?", reverso: "A la iglesia, a los débiles y al propio ministro.", apoyo: "La ética ministerial protege a la iglesia, a los débiles y al propio ministro" },
              { frente: "¿Quién está por encima de la Palabra?", reverso: "Nadie: todo ministro necesita a alguien a quien rendir cuentas.", apoyo: "Nadie está por encima de la Palabra" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuántas personas cuentan las ofrendas, como mínimo?", reverso: "Al menos dos.", apoyo: "las ofrendas las cuentan al menos dos personas" },
              { frente: "¿Qué hace el que dirige con autoridad sin abuso?", reverso: "Sirve, no se enseñorea de los demás y rinde cuentas.", apoyo: "el que dirige sirve, no se enseñorea de los demás, y rinde cuentas" },
              { frente: "¿Cuándo no se guarda lo que alguien confía?", reverso: "Cuando hay peligro para la vida o abuso.", apoyo: "se guarda lo que se confía, salvo cuando hay peligro para la vida o abuso" },
              { frente: "¿A quién puede rendir cuentas un ministro?", reverso: "A un pastor, un consejo o un grupo de hermanos maduros.", apoyo: "un pastor, un consejo o un grupo de hermanos maduros" },
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
            consigna: "¿Es parte de la integridad que pide la Palabra a quien dirige, o va contra ella? Lleva cada frase a su grupo.",
            grupos: ["Es integridad", "Va contra la integridad"],
            frases: [
              { texto: "Ser irreprensible, sobrio y prudente", grupo: 0 },
              { texto: "No buscar ganancias deshonestas", grupo: 0 },
              { texto: "Rendir cuentas a un pastor o a un consejo", grupo: 0 },
              { texto: "Usar el ministerio para ganar dinero deshonesto", grupo: 1 },
              { texto: "Creerse por encima de la Palabra", grupo: 1 },
              { texto: "Pensar que basta el talento, aunque falte el carácter", grupo: 1 },
            ],
            apoyo: "Quien dirige debe ser irreprensible y no codicioso de ganancias deshonestas",
            ref: "1 Timoteo 3:2-3",
            explica: "Pablo pide que quien dirige sea «irreprensible», sobrio y prudente, «no codicioso de ganancias deshonestas»: los requisitos del liderazgo son, ante todo, de carácter, y nadie está por encima de la Palabra.",
          },
          {
            consigna: "¿Muestra la integridad del que sirve o la falta de ella? Lleva cada frase a su grupo.",
            grupos: ["Muestra integridad", "Muestra falta de integridad"],
            frases: [
              { texto: "Hace las cosas honradamente delante del Señor y de los hombres", grupo: 0 },
              { texto: "Acepta que un consejo de hermanos le pida cuentas", grupo: 0 },
              { texto: "Es sobrio y prudente al dirigir", grupo: 0 },
              { texto: "No deja que nadie le pida cuentas", grupo: 1 },
              { texto: "Cuida su imagen, pero descuida su carácter", grupo: 1 },
              { texto: "Es codicioso de ganancias deshonestas", grupo: 1 },
            ],
            apoyo: "Todo ministro necesita a alguien a quien rendir cuentas: un pastor, un consejo o un grupo de hermanos maduros",
            ref: "2 Corintios 8:20-21",
            explica: "La integridad del que sirve se ve en su carácter: hace las cosas honradamente delante del Señor y de los hombres, y rinde cuentas, porque nadie está por encima de la Palabra.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada norma de ética ministerial con lo que pide.",
            pares: [
              ["Transparencia en el dinero", "Las ofrendas las cuentan al menos dos personas y se registran"],
              ["Autoridad sin abuso", "El que dirige sirve y no se enseñorea de los demás"],
              ["Relaciones apropiadas", "No se aconseja a solas a alguien del otro sexo en un lugar cerrado"],
              ["Confidencialidad con sus límites", "Se guarda lo que se confía, salvo peligro para la vida o abuso"],
              ["Honestidad en el púlpito", "No se inventan testimonios ni se usan sermones ajenos sin decirlo"],
            ],
            apoyo: "La ética ministerial pide transparencia en el dinero, autoridad sin abuso, relaciones apropiadas, confidencialidad con límites y honestidad en el púlpito",
            ref: "1 Pedro 5:2-3; 2 Corintios 8:20-21",
            explica: "Las normas de ética ministerial son cinco: transparencia en el dinero, autoridad sin abuso, relaciones apropiadas, confidencialidad con sus límites y honestidad en el púlpito.",
          },
          {
            consigna: "¿Qué norma de ética ministerial se cumple en cada caso? Une cada caso con su norma.",
            pares: [
              ["Dos hermanos cuentan juntos la ofrenda y la anotan", "Transparencia en el dinero"],
              ["El líder sirve a su equipo y acepta que le pidan cuentas", "Autoridad sin abuso"],
              ["El consejero no se encierra a solas con alguien del otro sexo", "Relaciones apropiadas"],
              ["Se guarda un secreto, pero no si hay peligro para la vida", "Confidencialidad con sus límites"],
              ["El predicador dice de quién es el sermón ajeno que usa", "Honestidad en el púlpito"],
            ],
            apoyo: "Pablo cuidaba el dinero de las ofrendas «procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres»",
            ref: "2 Corintios 8:20-21",
            explica: "Contar la ofrenda entre dos es transparencia; servir y rendir cuentas es autoridad sin abuso; no aconsejar a solas en un lugar cerrado es una relación apropiada; guardar un secreto salvo peligro es confidencialidad con límites; y decir de quién es un sermón es honestidad en el púlpito.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La ética ministerial pide transparencia en el dinero, autoridad sin abuso, relaciones apropiadas, confidencialidad con límites y honestidad en el púlpito",
            ref: "2 Corintios 8:20-21; 1 Pedro 5:2-3",
            titulo: "Una semana de pastor asistente",
            relato: [
              "Eres pastor asistente en una iglesia pequeña. El pastor está de viaje, y esta semana te toca atender varias cosas.",
              "El domingo, el tesorero tiene prisa después del culto. El martes, una persona pide consejería. El jueves, el líder de alabanza discute con los músicos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "El tesorero te dice: Cuenta tú solo la ofrenda y guárdala, que yo me tengo que ir. ¿Qué haces?",
                opciones: [
                  { texto: "Esperas a otra persona: la ofrenda la cuentan al menos dos y se registra.", bien: true, explica: "Transparencia en el dinero: las ofrendas las cuentan al menos dos personas, se registran y se rinden cuentas a la iglesia." },
                  { texto: "La cuentas tú solo, porque eres pastor y todos en la iglesia confían en ti.", explica: "Pablo procuraba hacer las cosas honradamente delante del Señor y también delante de los hombres: la ofrenda la cuentan al menos dos." },
                  { texto: "La guardas sin contarla, y que la cuenten cuando vuelva el pastor de su viaje.", explica: "Las ofrendas las cuentan al menos dos personas y se registran: así se rinden cuentas a la iglesia." },
                ],
                apoyo: "Transparencia en el dinero: las ofrendas las cuentan al menos dos personas, se registran y se rinden cuentas a la iglesia",
                explica: "Pablo cuidaba el dinero de las ofrendas «procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».",
              },
              {
                tipo: "situacion",
                pregunta: "Una persona del otro sexo te pide consejería y propone verse en tu oficina, a solas y con la puerta cerrada. ¿Qué haces?",
                opciones: [
                  { texto: "La atiendes, pero no a solas en un lugar cerrado: evitas toda apariencia de mal.", bien: true, explica: "Relaciones apropiadas: no se aconseja a solas a alguien del otro sexo en un lugar cerrado, y se evita toda apariencia de mal." },
                  { texto: "Aceptas, porque eres pastor y nadie va a pensar mal de una consejería en la iglesia.", explica: "Se evita toda apariencia de mal: no se aconseja a solas a alguien del otro sexo en un lugar cerrado." },
                  { texto: "Te niegas a ayudarla, porque nunca se debe aconsejar a alguien del otro sexo.", explica: "La norma no es dejar de aconsejar, sino no hacerlo a solas en un lugar cerrado." },
                ],
                apoyo: "Relaciones apropiadas: no se aconseja a solas a alguien del otro sexo en un lugar cerrado, y se evita toda apariencia de mal",
                explica: "Las relaciones apropiadas protegen a la persona y al ministro: no se aconseja a solas a alguien del otro sexo en un lugar cerrado.",
              },
              {
                tipo: "situacion",
                pregunta: "El líder de alabanza les grita a los músicos y dice: Aquí mando yo, y nadie me pide cuentas. ¿Qué le dices?",
                opciones: [
                  { texto: "Que el que dirige sirve, no se enseñorea de los demás y rinde cuentas.", bien: true, explica: "Autoridad sin abuso: el que dirige sirve, no se enseñorea de los demás, y rinde cuentas (1 Pedro 5:2-3)." },
                  { texto: "Que tiene razón: el líder manda, y los músicos tienen que obedecer callados.", explica: "El que dirige no se enseñorea de los demás: sirve y rinde cuentas." },
                  { texto: "Que no grite tanto, aunque es cierto que nadie le puede pedir cuentas a él.", explica: "Todo ministro necesita a alguien a quien rendir cuentas: nadie está por encima de la Palabra." },
                ],
                apoyo: "Autoridad sin abuso: el que dirige sirve, no se enseñorea de los demás, y rinde cuentas (1 Pedro 5:2-3)",
                explica: "La autoridad en la iglesia es para servir: el que dirige no se enseñorea de los demás, y rinde cuentas.",
              },
              {
                tipo: "explica",
                apoyo: "La integridad del que sirve protege a toda la iglesia",
                clave: {
                  id: "pr-n4-etica-6-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué normas de ética ministerial aplicaste esta semana, y para qué sirven?",
                  ideas: [
                    { id: "dinero", peso: 35, texto: "Transparencia en el dinero: la ofrenda la cuentan al menos dos personas y se registra.", formas: ["dos personas", "al menos dos", "entre dos", "transparen*", "registr*", "anot*", "dos hermanos"] },
                    { id: "relaciones", peso: 35, texto: "Relaciones apropiadas: no se aconseja a solas a alguien del otro sexo en un lugar cerrado.", formas: ["no a solas", "nunca a solas", "sin a solas", "evit* a solas", "evit* (sola|solo|solos|solas)", "no (me|te|se|nos) reuni* (sola|solo|solos|solas)", "apariencia de mal", "relaciones apropiadas"] },
                    { id: "autoridad", peso: 30, texto: "Autoridad sin abuso: el que dirige sirve, no se enseñorea y rinde cuentas.", formas: ["sin abuso", "rinde* cuentas", "rendir cuentas", "rindan cuentas", "dirige sirve", "dirigir es servir", "no se ensenorea", "autoridad sin"] },
                  ],
                  modelo: "Apliqué la transparencia en el dinero: la ofrenda la cuentan al menos dos personas y se registra. No aconsejé a solas a alguien del otro sexo en un lugar cerrado. Y recordé que el que dirige sirve y rinde cuentas. Así se protege a la iglesia.",
                },
              },
            ],
          },
          {
            apoyo: "Transparencia en el dinero: las ofrendas las cuentan al menos dos personas, se registran y se rinden cuentas a la iglesia",
            ref: "1 Pedro 5:2-3",
            titulo: "El nuevo coordinador de células",
            relato: [
              "Eres el nuevo coordinador de las células de tu iglesia. En tu primer mes aparecen tres asuntos que tocan la ética ministerial.",
              "Hay una célula que guarda su ofrenda sin control, un líder que no acepta que lo corrijan y una invitación que no te deja tranquilo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "La tesorera de una célula guarda en su casa el dinero de las ofrendas, sin anotar nada, y dice que ella responde. ¿Qué haces?",
                opciones: [
                  { texto: "Pides que dos personas cuenten las ofrendas, las registren y rindan cuentas.", bien: true, explica: "Transparencia en el dinero: las ofrendas las cuentan al menos dos personas, se registran y se rinden cuentas a la iglesia." },
                  { texto: "Lo dejas así, porque ella es una hermana de confianza y nunca ha robado nada.", explica: "La transparencia no es desconfianza: se hacen las cosas honradamente delante del Señor y también delante de los hombres." },
                  { texto: "Le pides que te entregue a ti el dinero, para que lo guardes tú solo en tu casa.", explica: "Tampoco una sola persona: las ofrendas las cuentan al menos dos, se registran y se rinden cuentas." },
                ],
                apoyo: "Transparencia en el dinero: las ofrendas las cuentan al menos dos personas, se registran y se rinden cuentas a la iglesia",
                explica: "Pablo cuidaba el dinero de las ofrendas procurando hacer las cosas honradamente delante del Señor y también delante de los hombres.",
              },
              {
                tipo: "situacion",
                pregunta: "Un líder de célula decide todo sin escuchar a nadie y se enoja si alguien lo corrige. ¿Qué le dices?",
                opciones: [
                  { texto: "Que el que dirige sirve, no se enseñorea de los demás, y rinde cuentas.", bien: true, explica: "Autoridad sin abuso: el que dirige sirve, no se enseñorea de los demás, y rinde cuentas (1 Pedro 5:2-3)." },
                  { texto: "Que lo entiendes: un buen líder no tiene por qué darle explicaciones a nadie.", explica: "Todo ministro necesita a alguien a quien rendir cuentas: nadie está por encima de la Palabra." },
                  { texto: "Que siga así, pero que sea un poco más amable cuando da sus órdenes.", explica: "No es un asunto de tono: el que dirige sirve y no se enseñorea de los demás." },
                ],
                apoyo: "Autoridad sin abuso: el que dirige sirve, no se enseñorea de los demás, y rinde cuentas (1 Pedro 5:2-3)",
                explica: "El que dirige sirve y rinde cuentas: nadie está por encima de la Palabra.",
              },
              {
                tipo: "situacion",
                pregunta: "Una persona del otro sexo, líder de otra célula, te invita a reunirse los dos solos, de noche, en su casa, para hablar del ministerio. ¿Qué haces?",
                opciones: [
                  { texto: "Aceptas, pero no a solas en un lugar cerrado: evitas toda apariencia de mal.", bien: true, explica: "Relaciones apropiadas: no se aconseja a solas a alguien del otro sexo en un lugar cerrado, y se evita toda apariencia de mal." },
                  { texto: "Aceptas, porque es para hablar del ministerio y en eso no hay nada de malo.", explica: "Se evita toda apariencia de mal: la reunión no se hace a solas en un lugar cerrado." },
                  { texto: "Aceptas, pero le pides que no le cuente a nadie de la reunión que van a tener.", explica: "Esconder la reunión es lo contrario de evitar toda apariencia de mal." },
                ],
                apoyo: "Relaciones apropiadas: no se aconseja a solas a alguien del otro sexo en un lugar cerrado, y se evita toda apariencia de mal",
                explica: "Las relaciones apropiadas evitan toda apariencia de mal: nada a solas con alguien del otro sexo en un lugar cerrado.",
              },
              {
                tipo: "explica",
                apoyo: "La integridad del que sirve protege a toda la iglesia",
                clave: {
                  id: "pr-n4-etica-6-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué normas aplicaste en estos tres asuntos, y para qué sirven?",
                  ideas: [
                    { id: "dinero", peso: 35, texto: "Transparencia en el dinero: las ofrendas las cuentan al menos dos personas y se registran.", formas: ["dos personas", "al menos dos", "entre dos", "transparen*", "registr*", "anot*", "dos hermanos"] },
                    { id: "autoridad", peso: 35, texto: "Autoridad sin abuso: el que dirige sirve, no se enseñorea y rinde cuentas.", formas: ["sin abuso", "rinde* cuentas", "rendir cuentas", "rindan cuentas", "dirige sirve", "dirigir es servir", "no se ensenorea", "autoridad sin"] },
                    { id: "relaciones", peso: 30, texto: "Relaciones apropiadas: nada a solas con alguien del otro sexo en un lugar cerrado.", formas: ["no a solas", "nunca a solas", "sin a solas", "evit* a solas", "evit* (sola|solo|solos|solas)", "no (me|te|se|nos) reuni* (sola|solo|solos|solas)", "apariencia de mal", "relaciones apropiadas"] },
                  ],
                  modelo: "Pedí que dos personas cuenten las ofrendas y las registren, para que haya transparencia. Recordé que el que dirige sirve y rinde cuentas. Y no me reuní a solas con alguien del otro sexo en un lugar cerrado. Así se protege a la iglesia.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "En el ministerio con niños y adolescentes, la iglesia sigue normas claras",
            ref: "Mateo 18:6",
            situacion: "Eres el coordinador del ministerio de niños de tu iglesia. Este domingo te toca cuidar que todo se haga según las normas.",
            escenas: [
              {
                id: "e1",
                narra: "Faltan cinco minutos para la clase y solo llegó una maestra; la otra avisó que no viene.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Buscas a otro adulto, para que siempre haya al menos dos con los niños.", valor: 2, explica: "En el ministerio con niños siempre hay al menos dos adultos." },
                  { texto: "Suspendes la clase de hoy, y los niños se quedan con sus padres en el culto.", valor: 1, explica: "Así cuidas la norma, pero lo mejor es buscar a otro adulto: siempre hay al menos dos adultos con los niños." },
                  { texto: "Dejas que dé la clase sola, con la puerta cerrada para que no haya ruido.", valor: 0, explica: "Siempre hay al menos dos adultos, y las puertas tienen ventana o quedan abiertas." },
                ],
              },
              {
                id: "e2",
                narra: "Una persona que llegó hace poco a la iglesia, muy amable, se ofrece para ayudar con los niños desde hoy.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le agradeces y le explicas que primero se verifica a quienes sirven.", valor: 2, explica: "La iglesia sigue normas claras: se verifica a quienes sirven con los niños." },
                  { texto: "Le dices que no puede ayudar con los niños, sin explicarle el porqué.", valor: 1, explica: "Cuidas a los niños, pero conviene explicarle la norma: la iglesia verifica a quienes sirven con ellos." },
                  { texto: "La dejas sola con los niños, porque se ve que es una persona muy buena.", valor: 0, explica: "Se verifica a quienes sirven y siempre hay al menos dos adultos: la amabilidad no reemplaza las normas." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, una maestra te cuenta algo que dijo una niña y que le hace sospechar que alguien la está abusando.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Reportan la sospecha a las autoridades, como manda la ley.", valor: 2, explica: "Toda sospecha de abuso se reporta a las autoridades. En Texas, la ley obliga a toda persona a reportar la sospecha de abuso de un menor, sin excepción para los ministros." },
                  { texto: "Esperan a tener pruebas antes de decir nada, para no dañar a nadie.", valor: 0, explica: "La norma habla de la sospecha: toda sospecha de abuso se reporta a las autoridades." },
                  { texto: "Lo hablan solo con el pastor, y lo arreglan dentro de la iglesia.", valor: 0, explica: "Nunca se encubre un abuso para cuidar la imagen de la iglesia: toda sospecha de abuso se reporta a las autoridades." },
                ],
              },
            ],
          },
          {
            apoyo: "La restauración se hace «con espíritu de mansedumbre», pero no es lo mismo que volver enseguida al cargo",
            ref: "Gálatas 6:1",
            situacion: "Eres parte del consejo de tu iglesia. Se supo que Samuel, el líder de alabanza, cayó en un pecado grave.",
            escenas: [
              {
                id: "e1",
                narra: "El consejo se reúne para decidir qué hacer con Samuel.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Que deje el ministerio por un tiempo y reciba disciplina y acompañamiento.", valor: 2, explica: "Un líder que cae en un pecado grave deja el ministerio por un tiempo, recibe disciplina y acompañamiento, y repara el daño." },
                  { texto: "Que deje el ministerio, pero que nadie del consejo lo busque ni lo acompañe.", valor: 1, explica: "Dejar el ministerio por un tiempo es parte de la restauración, pero también recibe acompañamiento: se restaura con espíritu de mansedumbre." },
                  { texto: "Que siga dirigiendo el domingo, como si nada, para no causar un escándalo.", valor: 0, explica: "Un líder que cae en un pecado grave deja el ministerio por un tiempo: la restauración no es seguir como si nada." },
                ],
              },
              {
                id: "e2",
                narra: "A las pocas semanas, Samuel se arrepiente y pide volver a dirigir la alabanza el mes próximo.",
                pregunta: "¿Qué le responden?",
                opciones: [
                  { texto: "Que restaurar no es volver enseguida al cargo, y que lo seguirán acompañando.", valor: 2, explica: "La restauración se hace con espíritu de mansedumbre, pero no es lo mismo que volver enseguida al cargo." },
                  { texto: "Que vuelva cuando él mismo sienta que ya está listo, sin que nadie lo acompañe.", valor: 0, explica: "Quien cae recibe disciplina y acompañamiento: todo ministro necesita a alguien a quien rendir cuentas." },
                  { texto: "Que vuelva ya: si se arrepintió, todo quedó restaurado y no hay nada más que hacer.", valor: 0, explica: "Restaurar no es lo mismo que volver enseguida al cargo: también se repara el daño." },
                ],
              },
              {
                id: "e3",
                narra: "Meses después se descubre que otro líder abusó de un menor. Alguien del consejo propone no decir nada, para cuidar la imagen de la iglesia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te opones: primero se protege a la víctima y se reporta el abuso.", valor: 2, explica: "Nunca se encubre un abuso para cuidar la imagen de la iglesia: primero se protege a la víctima. Y toda sospecha de abuso se reporta a las autoridades." },
                  { texto: "Aceptas callar, pero pides que ese líder deje su cargo por un tiempo.", valor: 0, explica: "Nunca se encubre un abuso para cuidar la imagen de la iglesia: primero se protege a la víctima." },
                  { texto: "Aceptas, porque contarlo dañaría el testimonio de toda la iglesia.", valor: 0, explica: "Nunca se encubre un abuso para cuidar la imagen de la iglesia. En Texas, la ley obliga a toda persona a reportar la sospecha de abuso de un menor, sin excepción para los ministros." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la protección de los menores: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En Texas, la ley obliga a toda persona a reportar la sospecha de abuso de un menor, sin excepción para los ministros.", verdad: true, explica: "Así lo dice la lección: en la iglesia, toda sospecha de abuso se reporta a las autoridades.", apoyo: "En Texas, la ley obliga a toda persona a reportar la sospecha de abuso de un menor, sin excepción para los ministros" },
              { texto: "En el ministerio con niños basta un solo adulto, si es de mucha confianza.", verdad: false, explica: "En el ministerio con niños y adolescentes siempre hay al menos dos adultos.", apoyo: "siempre hay al menos dos adultos" },
              { texto: "En el ministerio con niños, las puertas tienen ventana o quedan abiertas.", verdad: true, explica: "Es una de las normas claras que sigue la iglesia en el ministerio con niños y adolescentes.", apoyo: "las puertas tienen ventana o quedan abiertas" },
            ],
          },
          {
            consigna: "Sobre el líder que cae: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Restaurar a un líder que cae es devolverlo enseguida a su cargo.", verdad: false, explica: "La restauración se hace con espíritu de mansedumbre, pero no es lo mismo que volver enseguida al cargo.", apoyo: "pero no es lo mismo que volver enseguida al cargo" },
              { texto: "Un líder que cae en un pecado grave deja el ministerio por un tiempo.", verdad: true, explica: "Deja el ministerio por un tiempo, recibe disciplina y acompañamiento, y repara el daño.", apoyo: "Un líder que cae en un pecado grave deja el ministerio por un tiempo, recibe disciplina y acompañamiento, y repara el daño" },
              { texto: "Para cuidar la imagen de la iglesia, a veces conviene callar un abuso.", verdad: false, explica: "Nunca se encubre un abuso para cuidar la imagen de la iglesia: primero se protege a la víctima.", apoyo: "Nunca se encubre un abuso para cuidar la imagen de la iglesia: primero se protege a la víctima" },
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
            apoyo: "Los requisitos del liderazgo son, ante todo, de carácter",
            ref: "1 Timoteo 3:2-3",
            clave: {
              id: "pr-n4-etica-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué integridad pide la Palabra a quien dirige, según 1 Timoteo 3:2-3?",
              ideas: [
                { id: "irreprensible", peso: 50, texto: "Que sea irreprensible, sobrio y prudente.", formas: ["irreprensible", "sobrio", "prudente"] },
                { id: "codicia", peso: 50, negativa: true, texto: "Que no sea codicioso de ganancias deshonestas: los requisitos son, ante todo, de carácter.", formas: ["codicios*", "codicia", "ganancias deshonestas", "deshonest*", "mal ganad*"] },
              ],
              errores: [
                { id: "codicioso", texto: "Pablo pide que quien dirige no sea codicioso de ganancias deshonestas.", formas: ["(sea|ser) codicios*", "(tenga|tener|con) codicia", "busque ganancias deshonestas", "buscar ganancias deshonestas"], anula: "codicia" },
              ],
              modelo: "Pide que quien dirige sea irreprensible, sobrio y prudente, y que no sea codicioso de ganancias deshonestas. Los requisitos del liderazgo son, ante todo, de carácter.",
            },
          },
          {
            apoyo: "Todo ministro necesita a alguien a quien rendir cuentas: un pastor, un consejo o un grupo de hermanos maduros",
            ref: "1 Pedro 5:2-3",
            clave: {
              id: "pr-n4-etica-6-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué todo ministro necesita rendir cuentas, y a quién puede rendirlas?",
              ideas: [
                { id: "quien", peso: 50, texto: "A un pastor, a un consejo o a un grupo de hermanos maduros.", formas: ["cuentas (a|al) pastor", "rendir* (a|al) pastor", "a (un|su) pastor", "un consejo", "hermanos maduros", "grupo de hermanos"] },
                { id: "porque", peso: 50, negativa: true, texto: "Porque nadie está por encima de la Palabra, y la integridad del que sirve protege a toda la iglesia.", formas: ["por encima de la palabra", "nadie esta por encima", "encima de la (palabra|biblia)", "protege* a (la|toda) (iglesia|la)"] },
              ],
              modelo: "Porque nadie está por encima de la Palabra, y la integridad del que sirve protege a toda la iglesia. Puede rendir cuentas a un pastor, a un consejo o a un grupo de hermanos maduros.",
            },
          },
        ],
      },
    ],
  },
};
