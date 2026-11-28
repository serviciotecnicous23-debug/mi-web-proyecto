/**
 * Las prácticas de la materia `pastoral-2` (especialidad Ministerio pastoral): la consejería pastoral. Hechas solo con
 * lo que dice cada lección (server/academia/contenido/pastoral-2.ts), con la guía de docs/academia-practicas.md.
 *
 * Los tres enfoques evangélicos se comparan con respeto, con lo que la lección dice de cada uno: ninguna actividad
 * pregunta cuál es mejor. En los casos, quien aconseja es el pastor, y las buenas opciones son las de la lección
 * (escuchar, aplicar la Palabra, orar, anunciar el perdón, derivar sin abandonar y guardar la confidencia dentro de sus
 * límites), sin consejos clínicos. Nada toca quién ejerce el pastorado ni el divorcio. La lección no da un plazo para
 * denunciar el abuso de un menor en Texas, así que ninguna actividad lo pide, y no se da otro número de ayuda que el 988.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_PASTORAL_2: PracticasMateria = {
  materia: "pastoral-2",
  mision: {
    titulo: "Cuando tocan a la puerta del pastor",
    intro:
      "Tu iglesia abrió un tiempo de consejería pastoral cada semana, y te pidió atenderlo y formar a otros para aconsejar. Llegarán personas con el corazón roto: con culpa, con ansiedad o tristeza profunda, con conflictos que piden reconciliación y con secretos que a veces no se pueden guardar. Repasa las seis lecciones para acompañar a cada uno con la Palabra, como Jesús a la samaritana, y para saber cuándo hace falta otra ayuda.",
    cierre:
      "Ya puedes aconsejar desde el oficio del pastor: escuchar antes de hablar, aplicar la Palabra a cada persona para que madure en Cristo, anunciar con claridad el perdón, acompañar al abatido con la Palabra, la oración y la ayuda adecuada, buscar la reconciliación y guardar la confianza dentro de sus límites. Y no lo olvides: derivar no es abandonar.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La consejería pastoral y sus enfoques
    "pastoral-2-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es la consejería pastoral?", reverso: "La Palabra aplicada a una persona en su situación, para que madure en Cristo.", apoyo: "La consejería pastoral es la Palabra aplicada a una persona en su situación, para que madure en Cristo" },
              { frente: "Según Isaías 50:4, ¿qué hace el consejero antes de hablar?", reverso: "Escucha, como el siervo de Dios, que tenía un oído atento.", apoyo: "Antes de hablar, el consejero escucha" },
              { frente: "¿Aconseja solo el pastor en la iglesia?", reverso: "No: el pastor aconseja y también forma a otros para hacerlo.", apoyo: "El pastor aconseja y también forma a otros para hacerlo" },
              { frente: "¿De dónde viene el nombre de la consejería noutética?", reverso: "De la palabra griega que se traduce amonestar.", apoyo: "Su nombre viene de la palabra griega que se traduce amonestar" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál era la meta de Pablo al amonestar y enseñar a todo hombre?", reverso: "«presentar perfecto en Cristo Jesús a todo hombre».", apoyo: "a fin de presentar perfecto en Cristo Jesús a todo hombre" },
              { frente: "¿Qué podían hacer los creyentes llenos de bondad y de conocimiento?", reverso: "Aconsejarse: «podéis amonestaros los unos a los otros».", apoyo: "de tal manera que podéis amonestaros los unos a los otros" },
              { frente: "¿Qué es trabajar junto con médicos, psicólogos cristianos y otros pastores?", reverso: "Es sabiduría, no falta de fe.", apoyo: "trabajar junto con médicos, psicólogos cristianos y otros pastores es sabiduría, no falta de fe" },
              { frente: "¿En qué difieren los tres enfoques evangélicos de la consejería?", reverso: "En cuánto usar de la psicología; los tres reconocen la autoridad de la Escritura.", apoyo: "Los tres enfoques reconocen la autoridad de la Escritura, y difieren en cuánto usar de la psicología" },
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
            consigna: "Completa qué es la consejería pastoral.",
            texto: "La consejería pastoral es la [[Palabra]] aplicada a una persona en su [[situación]], para que [[madure]] en Cristo.",
            distractores: ["opinión", "contra", "tropiece"],
            errores: {
              "opinión": "La consejería pastoral aplica la Palabra a la persona, no una opinión.",
              contra: "La Palabra se aplica a la persona en su situación, para ayudarla a crecer.",
              tropiece: "La meta es que la persona madure en Cristo.",
            },
            apoyo: "La consejería pastoral es la Palabra aplicada a una persona en su situación, para que madure en Cristo",
            ref: "Colosenses 1:28",
            explica: "La consejería pastoral es la Palabra aplicada a una persona en su situación, para que madure en Cristo: la meta de Pablo era «presentar perfecto en Cristo Jesús a todo hombre».",
          },
          {
            consigna: "Completa qué es aconsejar y por dónde empieza la consejería.",
            texto: "Aconsejar es acompañar a otro hacia la [[madurez]] en Cristo, y la consejería pastoral empieza por [[escuchar]].",
            distractores: ["culpa", "hablar"],
            errores: {
              culpa: "Aconsejar es acompañar a otro hacia la madurez en Cristo.",
              hablar: "Antes de hablar, el consejero escucha.",
            },
            apoyo: "Aconsejar es acompañar a otro hacia la madurez en Cristo",
            ref: "Isaías 50:4",
            explica: "Aconsejar es acompañar a otro hacia la madurez en Cristo, y la consejería empieza por escuchar: el siervo de Dios tenía un oído atento «para que oiga como los sabios».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Para qué amonestaba y enseñaba Pablo a todo hombre? Toca las palabras que lo dicen.",
            texto: "amonestando a todo hombre, y enseñando a todo hombre en toda sabiduría, a fin de [[presentar perfecto en Cristo Jesús]] a todo hombre",
            apoyo: "La meta de Pablo era clara",
            ref: "Colosenses 1:28",
            explica: "La meta de Pablo era presentar perfecto en Cristo Jesús a todo hombre. Así también, la consejería pastoral busca que la persona madure en Cristo.",
          },
          {
            consigna: "Según Pablo, ¿qué podían hacer los creyentes de Roma? Toca las palabras que lo dicen.",
            texto: "llenos de bondad, llenos de todo conocimiento, de tal manera que [[podéis amonestaros los unos a los otros]]",
            apoyo: "No es solo tarea del pastor",
            ref: "Romanos 15:14",
            explica: "Pablo confiaba en que los creyentes podían amonestarse los unos a los otros: la consejería no es solo tarea del pastor, que también forma a otros para hacerlo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana te dice: Pastor, mi hijo no puede dejar las drogas, pero no quiero llevarlo a ningún especialista. Con su consejo basta, ¿verdad?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo aconsejarás con la Palabra y que, además, necesita un profesional.", bien: true, explica: "El pastor no es psicólogo ni médico, pero sabe cuándo una persona necesita, además, la ayuda de un profesional de la salud, como en una adicción." },
              { texto: "Que sí: con la Palabra basta, y buscar un especialista sería una falta de fe.", explica: "Trabajar junto con médicos, psicólogos cristianos y otros pastores es sabiduría, no falta de fe." },
              { texto: "Que ese ya no es asunto tuyo, y que lo lleve al médico sin volver a buscarte.", explica: "El pastor no reemplaza al profesional de la salud, y trabaja con otros cuando hace falta: su consejo sigue." },
              { texto: "Que no lo lleve a nadie: si ora con más fuerza, Dios lo librará de las drogas.", explica: "Una adicción es uno de los casos en que la persona necesita, además, la ayuda de un profesional de la salud." },
            ],
            apoyo: "Pero sí necesita saber cuándo una persona necesita, además, la ayuda de un profesional de la salud",
            ref: "Proverbios 11:14",
            explica: "El pastor aconseja con la Palabra y sabe cuándo hace falta, además, un profesional de la salud: una depresión grave, una adicción, un trauma o un riesgo para la vida.",
          },
          {
            caso: "Un hermano te dice: Desde el asalto que sufrí, tengo un trauma: revivo todo cada noche. No quiero ir a un psicólogo; solo quiero hablar con usted.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo seguirás aconsejando, y que un trauma pide, además, un profesional.", bien: true, explica: "El pastor no reemplaza al profesional de la salud: aconseja con la Palabra y trabaja con otros cuando hace falta." },
              { texto: "Que no vaya al psicólogo: si confía en Dios, no necesita a nadie más que a ti.", explica: "Trabajar junto con médicos, psicólogos cristianos y otros pastores es sabiduría, no falta de fe." },
              { texto: "Que tú puedes tratar su trauma, porque un pastor es casi como un psicólogo.", explica: "El pastor no es psicólogo ni médico, y no necesita serlo para aconsejar con la Palabra." },
              { texto: "Que de eso se encargará solo un psicólogo, y que ya no vuelva a hablar contigo.", explica: "El pastor trabaja con otros cuando hace falta: la ayuda del profesional es además de su consejo." },
            ],
            apoyo: "El pastor no reemplaza al profesional de la salud, y trabaja con otros cuando hace falta",
            explica: "Un trauma es uno de los casos en que la persona necesita, además, la ayuda de un profesional de la salud. El pastor no lo reemplaza, pero sigue aconsejando con la Palabra.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el pastor y el profesional de la salud: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El pastor necesita ser psicólogo o médico para aconsejar con la Palabra.", verdad: false, explica: "El pastor no es psicólogo ni médico, y no necesita serlo para aconsejar con la Palabra.", apoyo: "El pastor no es psicólogo ni médico, y no necesita serlo para aconsejar con la Palabra" },
              { texto: "Una depresión grave puede pedir, además, la ayuda de un profesional de la salud.", verdad: true, explica: "El pastor sabe cuándo hace falta, además, un profesional: una depresión grave, una adicción, un trauma o un riesgo para la vida.", apoyo: "una depresión grave, una adicción, un trauma o un riesgo para su vida" },
              { texto: "Trabajar junto con médicos y psicólogos cristianos es falta de fe.", verdad: false, explica: "«en la multitud de consejeros hay seguridad»: trabajar junto con ellos es sabiduría, no falta de fe.", apoyo: "es sabiduría, no falta de fe", ref: "Proverbios 11:14" },
            ],
          },
          {
            consigna: "Sobre la consejería pastoral y la ayuda profesional: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Según Proverbios 11:14, en la multitud de consejeros hay seguridad.", verdad: true, explica: "Por eso trabajar junto con médicos, psicólogos cristianos y otros pastores es sabiduría.", apoyo: "«en la multitud de consejeros hay seguridad»", ref: "Proverbios 11:14" },
              { texto: "Cuando la persona es de la iglesia, el pastor reemplaza al profesional de la salud.", verdad: false, explica: "El pastor no reemplaza al profesional de la salud, y trabaja con otros cuando hace falta.", apoyo: "El pastor no reemplaza al profesional de la salud" },
              { texto: "Un riesgo para la vida de la persona es un caso en que hace falta, además, un profesional.", verdad: true, explica: "El pastor necesita saber cuándo una persona necesita, además, la ayuda de un profesional de la salud, y un riesgo para su vida es uno de esos casos.", apoyo: "Pero sí necesita saber cuándo una persona necesita, además, la ayuda de un profesional de la salud" },
              { texto: "Una adicción se resuelve siempre con el consejo del pastor, sin nadie más.", verdad: false, explica: "Una adicción es uno de los casos en que la persona necesita, además, la ayuda de un profesional de la salud.", apoyo: "una depresión grave, una adicción, un trauma o un riesgo para su vida" },
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
            consigna: "¿Qué enfoque evangélico describe cada frase? Lleva cada frase a su grupo.",
            grupos: ["Noutética (Jay Adams)", "Integración (Gary Collins)", "Modelo de Larry Crabb"],
            frases: [
              { texto: "Aconseja solo con la Escritura", grupo: 0 },
              { texto: "Desconfía de la psicología", grupo: 0 },
              { texto: "Su nombre viene de la palabra griega que se traduce amonestar", grupo: 0 },
              { texto: "Usa con discernimiento lo que la psicología ha aprendido", grupo: 1 },
              { texto: "Al usar lo que aprendió la psicología, pone la Escritura como autoridad", grupo: 1 },
              { texto: "Una consejería bíblica que se vive en la iglesia local", grupo: 2 },
              { texto: "Llega a las necesidades profundas del corazón", grupo: 2 },
            ],
            apoyo: "Los enfoques evangélicos, el noutético, el de la integración y el de Crabb, difieren en el uso de la psicología, pero todos ponen la Escritura como autoridad",
            explica: "La noutética de Jay Adams aconseja solo con la Escritura y desconfía de la psicología; la integración de Gary Collins usa con discernimiento lo que la psicología ha aprendido; y el modelo de Larry Crabb se vive en la iglesia local y llega a las necesidades profundas del corazón.",
          },
          {
            consigna: "¿Con qué enfoque aconseja cada consejero? Lleva cada frase a su grupo.",
            grupos: ["Noutética (Jay Adams)", "Integración (Gary Collins)", "Modelo de Larry Crabb"],
            frases: [
              { texto: "Abre solo la Biblia y no usa nada de la psicología", grupo: 0 },
              { texto: "Mira con recelo los aportes de la psicología", grupo: 0 },
              { texto: "Toma con cuidado lo que la psicología aprendió, bajo la Biblia", grupo: 1 },
              { texto: "Usa lo que aprendió la psicología, pero la Escritura manda", grupo: 1 },
              { texto: "Aconseja dentro de la vida de la iglesia local", grupo: 2 },
              { texto: "Busca con la Biblia las necesidades profundas del corazón", grupo: 2 },
              { texto: "Hace de la iglesia local el lugar de la consejería bíblica", grupo: 2 },
            ],
            apoyo: "La integración, como la de Gary Collins: usa con discernimiento lo que la psicología ha aprendido, con la Escritura como autoridad",
            explica: "Quien aconseja solo con la Escritura y desconfía de la psicología sigue el enfoque noutético; quien usa con discernimiento lo que la psicología ha aprendido, la integración; y quien vive la consejería bíblica en la iglesia local y busca las necesidades profundas del corazón, el modelo de Crabb.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los tres enfoques reconocen la autoridad de la Escritura, y difieren en cuánto usar de la psicología",
            clave: {
              id: "pr-pastoral-2-1-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se parecen y en qué se diferencian los tres enfoques evangélicos de la consejería?",
              ideas: [
                { id: "escritura", peso: 50, texto: "Se parecen en que los tres reconocen la autoridad de la Escritura.", formas: ["autoridad", "(escritura|biblia|palabra) como (autoridad|regla)", "(reconocen|ponen|tienen|aceptan|respetan) la (escritura|biblia|palabra)", "(escritura|biblia|palabra) (manda|gobierna)"] },
                { id: "psicologia", peso: 50, texto: "Se diferencian en cuánto usar de la psicología.", formas: ["(usar|usan|usa|uso|usen|toman|toma|tomar|aprovechan) psicolog*", "cuanto psicolog*", "cuanto (usar|usan|usa|toman|toma|tomar)", "(difieren|diferencian|distinguen|varian|cambian) psicolog*", "(difieren|diferencian|distinguen) (en|por) (el|la) (uso|psicolog*)"] },
              ],
              errores: [
                { id: "autoridad-distinta", texto: "Los tres reconocen la autoridad de la Escritura: en eso no se diferencian.", formas: ["(difieren|diferencian|distinguen) (en|por) la autoridad", "(no|ni) (reconocen|aceptan|tienen|ponen) la (escritura|biblia|palabra)", "solo (uno|el|la) (reconoce|acepta|pone|tiene) la (escritura|biblia|palabra)"], anula: "escritura" },
                { id: "psicologia-igual", texto: "Lo que cambia entre los enfoques es cuánto usan de la psicología.", formas: ["(parecen|coinciden) (en|que) (usan|usar|uso|aceptan) psicolog*", "todos (usan|aceptan|rechazan) psicolog*", "tres (usan|aceptan|rechazan) psicolog*"], anula: "psicologia" },
              ],
              modelo: "Los tres enfoques reconocen la autoridad de la Escritura, y se diferencian en cuánto usar de la psicología. Por eso el pastor puede aprender de todos, siempre con la Palabra como regla.",
            },
          },
          {
            apoyo: "El pastor puede aprender de todos, siempre con la Palabra como regla",
            clave: {
              id: "pr-pastoral-2-1-a7-2",
              tipo: "corta",
              pregunta: "Describe en pocas palabras cada uno de los tres enfoques evangélicos de la consejería.",
              ideas: [
                { id: "noutetica", peso: 34, texto: "La noutética de Jay Adams aconseja solo con la Escritura y desconfía de la psicología.", formas: ["solo con la (escritura|biblia|palabra)", "solamente con la (escritura|biblia|palabra)", "unicamente con la (escritura|biblia|palabra)", "desconf* psicolog*"] },
                { id: "integracion", peso: 33, texto: "La integración de Gary Collins usa con discernimiento lo que la psicología ha aprendido, con la Escritura como autoridad.", formas: ["discernimiento", "psicolog* (ha|a) aprendido", "aprendido (la|de) psicolog*", "aprendio la psicolog*", "aprovech* psicolog*", "integr* psicolog*", "(usa|toma|utiliza) (lo|la|de) psicolog*"] },
                { id: "crabb", peso: 33, texto: "El modelo de Larry Crabb es una consejería bíblica que se vive en la iglesia local y llega a las necesidades profundas del corazón.", formas: ["iglesia local", "necesidades profundas", "profund* del corazon", "del corazon", "en la iglesia", "dentro de la iglesia", "vida de la iglesia"] },
              ],
              errores: [
                { id: "noutetica-usa", texto: "La noutética desconfía de la psicología; la que usa con discernimiento lo que la psicología ha aprendido es la integración.", formas: ["nouteti* (usa|acepta|aprovecha|utiliza|integra) psicolog*"], anula: "noutetica" },
                { id: "integracion-desconfia", texto: "La integración usa con discernimiento lo que la psicología ha aprendido; la que desconfía de la psicología es la noutética.", formas: ["integracion (desconf*|rechaz*)", "integracion solo con la (escritura|biblia|palabra)"], anula: "integracion" },
              ],
              modelo: "La noutética de Jay Adams aconseja solo con la Escritura y desconfía de la psicología. La integración de Gary Collins usa con discernimiento lo que la psicología ha aprendido. El modelo de Larry Crabb se vive en la iglesia local y llega a las necesidades profundas del corazón.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Jesús y la mujer samaritana
    "pastoral-2-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué empezó Jesús la conversación con la samaritana?", reverso: "Con algo sencillo: «Dame de beber».", apoyo: "Jesús empezó con algo sencillo: «Dame de beber»" },
              { frente: "¿Qué barrera de su tiempo rompió Jesús al hablarle?", reverso: "La que separaba a los dos pueblos: «judíos y samaritanos no se tratan entre sí».", apoyo: "Rompió las barreras de su tiempo, porque «judíos y samaritanos no se tratan entre sí»" },
              { frente: "¿Cómo tocó Jesús la herida de la mujer?", reverso: "Con verdad y sin desprecio.", apoyo: "Jesús tocó la herida con verdad y sin desprecio" },
              { frente: "¿En qué terminó el encuentro?", reverso: "En una vida cambiada: la mujer dejó su cántaro y fue a la ciudad.", apoyo: "El encuentro terminó en una vida cambiada" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con qué palabras pasó Jesús de lo cotidiano a lo profundo?", reverso: "«Si conocieras el don de Dios».", apoyo: "pasó de lo cotidiano a lo profundo: «Si conocieras el don de Dios»" },
              { frente: "¿Qué reconoció Jesús de lo que había dicho la mujer?", reverso: "Lo que había dicho bien: «esto has dicho con verdad».", apoyo: "Y reconoció lo que ella había dicho bien: «esto has dicho con verdad»" },
              { frente: "¿Qué le dijo la mujer a la gente de su ciudad?", reverso: "«Venid, ved a un hombre que me ha dicho todo cuanto he hecho».", apoyo: "fue a la ciudad y dijo: «Venid, ved a un hombre que me ha dicho todo cuanto he hecho»" },
              { frente: "Antes de dar respuestas, ¿qué dio Jesús?", reverso: "Su tiempo.", apoyo: "Antes de dar respuestas, Jesús dio su tiempo" },
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
            consigna: "Une cada palabra del encuentro con lo que muestra de cómo acompañó Jesús a la mujer.",
            pares: [
              ["«Dame de beber»", "Empezó con algo sencillo"],
              ["«Si conocieras el don de Dios»", "Pasó de lo cotidiano a lo profundo"],
              ["«cinco maridos has tenido»", "Tocó la herida con verdad y sin desprecio"],
              ["«esto has dicho con verdad»", "Reconoció lo que ella había dicho bien"],
              ["«dejó su cántaro»", "El encuentro terminó en una vida cambiada"],
            ],
            apoyo: "Jesús acompañó a la mujer samaritana en una conversación que es un modelo",
            explica: "Jesús empezó con algo sencillo, pasó de lo cotidiano a lo profundo, tocó la herida con verdad y sin desprecio y reconoció lo que ella había dicho bien; el encuentro terminó en una vida cambiada.",
          },
          {
            consigna: "Une cada momento del encuentro con lo que hizo Jesús en él.",
            pares: [
              ["Al pedirle agua a una samaritana", "Cruzó las barreras de su tiempo"],
              ["Al hablarle del agua viva", "La llevó de lo cotidiano a lo profundo"],
              ["Al nombrar a sus cinco maridos", "Le dijo la verdad sin humillarla"],
              ["Al hablarle del Padre", "Le señaló a Dios y la verdadera adoración"],
              ["Cuando ella fue a contarlo a su ciudad", "La dejó actuar a ella misma"],
            ],
            apoyo: "se acercó cruzando barreras, partió de una necesidad cotidiana, la llevó a lo profundo, le dijo la verdad sin humillarla, le señaló a Dios y la dejó actuar",
            explica: "Jesús se acercó cruzando barreras, la llevó del agua del pozo al agua viva, le dijo la verdad sin humillarla, le señaló a Dios y la verdadera adoración, y la dejó actuar: ella misma fue a contarlo a su ciudad.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos de la conversación de Jesús con la samaritana, del primero al último.",
            pasos: [
              "Acercarse: inició la conversación y cruzó las barreras",
              "Conectar: partió de la necesidad del momento, el agua",
              "Llevar a lo profundo: del agua del pozo al agua viva",
              "Decir la verdad con amor: nombró el pecado sin humillar",
              "Señalar a Dios: le habló del Padre y de la verdadera adoración",
              "Dejar que la persona actúe: ella fue a contarlo a su ciudad",
            ],
            apoyo: "Ejemplo resuelto: los pasos de la conversación",
            explica: "Jesús se acercó cruzando barreras, conectó con la necesidad del momento, llevó la conversación a lo profundo, dijo la verdad con amor, señaló a Dios y dejó que ella actuara.",
          },
          {
            consigna: "En una consulta se sigue el mismo camino. Ordena los pasos del consejero, del primero al último.",
            pasos: [
              "Escuchar antes de hablar",
              "Entender la necesidad real",
              "Iluminar con la Palabra y nombrar con amor lo que haya que nombrar",
              "Orar con la persona y acordar un paso concreto",
              "Acompañar a la persona",
            ],
            apoyo: "En una consulta, sigue el mismo camino",
            explica: "En una consulta, el consejero escucha antes de hablar, entiende la necesidad real, ilumina con la Palabra, nombra con amor lo que haya que nombrar, ora con la persona y acuerdan un paso concreto. Después, acompaña.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los pasos de Jesús con la samaritana tiene un error. Tócala.",
            frases: [
              "Acercarse: Jesús inició la conversación y cruzó las barreras.",
              "Conectar: partió de la necesidad del momento, el agua.",
              "Decir la verdad con amor: nombró el pecado y humilló a la mujer.",
              "Dejar que la persona actúe: ella misma fue a contarlo a su ciudad.",
            ],
            malo: 2,
            correccion: "Decir la verdad con amor: Jesús nombró el pecado sin humillar.",
            apoyo: "Decir la verdad con amor: nombró el pecado sin humillar",
            explica: "Jesús tocó la herida con verdad y sin desprecio: nombró el pecado sin humillar a la mujer.",
          },
          {
            consigna: "Una de estas frases sobre cómo se sigue en una consulta el camino de Jesús tiene un error. Tócala.",
            frases: [
              "El consejero escucha antes de hablar.",
              "El consejero entiende la necesidad real de la persona.",
              "El consejero ilumina la conversación con la Palabra.",
              "Al final, el consejero decide solo el paso que la persona dará.",
            ],
            malo: 3,
            correccion: "Al final, el consejero ora con la persona y acuerdan juntos un paso concreto. Después, la acompaña.",
            apoyo: "ora con la persona y acuerden un paso concreto",
            explica: "En una consulta se sigue el camino de Jesús: escuchar, entender, iluminar con la Palabra, nombrar con amor, orar con la persona y acordar juntos un paso concreto; después, acompañar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "En una consulta, sigue el mismo camino",
            titulo: "Raúl y las deudas escondidas",
            relato: [
              "Eres pastor. Raúl, un hermano de la iglesia, te pidió una cita para el martes.",
              "Llega cansado, se sienta y te dice: En mi casa todo va mal. Después se queda callado.",
              "Decides seguir en la consulta el mismo camino de Jesús con la samaritana.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Lo escuchas con calma y le preguntas qué está pasando en su casa.", bien: true, explica: "En una consulta, el consejero escucha antes de hablar y entiende la necesidad real." },
                  { texto: "Le lees enseguida un pasaje sobre la familia y le das tu consejo.", explica: "Antes de hablar, el consejero escucha: primero hay que entender la necesidad real." },
                  { texto: "Le pides que vaya al grano, porque tienes otra cita dentro de un rato.", explica: "Antes de dar respuestas, Jesús dio su tiempo." },
                ],
                apoyo: "escucha antes de hablar, entiende la necesidad real",
                explica: "Como Jesús, que dio su tiempo antes de dar respuestas, el consejero escucha antes de hablar y entiende la necesidad real.",
              },
              {
                tipo: "situacion",
                pregunta: "Raúl te cuenta que le esconde a su esposa unas deudas y que le ha mentido varias veces. Te pregunta qué dice Dios. ¿Qué haces?",
                opciones: [
                  { texto: "Iluminas su situación con la Palabra, en vez de darle tu opinión.", bien: true, explica: "En una consulta, el consejero ilumina con la Palabra." },
                  { texto: "Le dices que lo que importa es lo que tú opinas de su caso.", explica: "El consejero no da su opinión: ilumina la situación con la Palabra." },
                  { texto: "Le dices que eso no tiene que ver con Dios, sino solo con el dinero.", explica: "El consejero ilumina con la Palabra la situación de la persona." },
                ],
                apoyo: "ilumina con la Palabra",
                explica: "Después de escuchar y de entender la necesidad real, el consejero ilumina la situación con la Palabra.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con las mentiras que Raúl le dijo a su esposa?",
                opciones: [
                  { texto: "Le nombras con amor sus mentiras, sin humillarlo.", bien: true, explica: "Decir la verdad con amor: Jesús nombró el pecado sin humillar." },
                  { texto: "Le dices que no es para tanto, porque todos esconden algo.", explica: "Callar el pecado no ayuda: Jesús tocó la herida con verdad." },
                  { texto: "Lo regañas fuerte, para que sienta vergüenza de lo que hizo.", explica: "Jesús tocó la herida con verdad y sin desprecio: nombró el pecado sin humillar." },
                ],
                apoyo: "nombra con amor lo que haya que nombrar",
                explica: "Como Jesús con la samaritana, el consejero nombra con amor lo que haya que nombrar: dice la verdad sin humillar.",
              },
              {
                tipo: "situacion",
                pregunta: "La consulta está por terminar. ¿Cómo la terminan?",
                opciones: [
                  { texto: "Oran juntos y acuerdan un paso: esta semana hablará con su esposa.", bien: true, explica: "En una consulta se ora con la persona y se acuerda un paso concreto." },
                  { texto: "Le dices que lo piense bien, y que vuelva cuando ya sepa qué hacer.", explica: "Se acuerda un paso concreto con la persona, y después se la acompaña." },
                  { texto: "Decides tú lo que hará, y das el caso por cerrado ese mismo día.", explica: "El paso se acuerda con la persona, que es quien actúa; y después, el consejero acompaña." },
                ],
                apoyo: "ora con la persona y acuerden un paso concreto",
                explica: "El consejero ora con la persona y acuerdan un paso concreto; la persona misma actúa, como la samaritana. Después, el consejero acompaña.",
              },
              {
                tipo: "explica",
                apoyo: "El consejero pastoral sigue ese camino: escucha, entiende, ilumina con la Palabra, ora, acuerda un paso y acompaña",
                clave: {
                  id: "pr-pastoral-2-2-a5-1",
                  tipo: "corta",
                  pregunta: "Ya acordaron el paso. ¿Qué harás tú en las próximas semanas, y quién dará el paso?",
                  ideas: [
                    { id: "acompanar", peso: 50, texto: "Después, acompañarlo: el consejero sigue a su lado.", formas: ["acompan*", "seguir* cerca", "estar* cerca", "estare pendiente", "(lo|le) (llamare|llamo|visitare|visito|buscare|busco|escribire|escribo|preguntare|pregunto)", "orare por el", "orar por el"] },
                    { id: "actua", peso: 50, texto: "El paso lo da Raúl mismo: él habla con su esposa, como la samaritana fue ella misma a su ciudad.", formas: ["(raul|el) mismo", "el (dara|da|debe|tiene|hablara|habla)", "raul (dara|da|debe|tiene|hablara|habla)", "(hablar|hable|hablara|habla) con su esposa", "su esposa", "dej* que (el|raul)", "lo (dejo|dejare) actuar"] },
                  ],
                  errores: [
                    { id: "yo-paso", texto: "El paso lo da la persona misma: el consejero no actúa en su lugar.", formas: ["yo hablare con su esposa", "yo dare el paso", "lo hare yo", "hablare yo con"], anula: "actua" },
                  ],
                  modelo: "Lo voy a acompañar: lo llamaré durante la semana, oraré por él y le preguntaré cómo le fue. El paso lo dará Raúl mismo: él hablará con su esposa, como la samaritana fue ella misma a su ciudad.",
                },
              },
            ],
          },
          {
            apoyo: "Jesús acompañó a la mujer samaritana en una conversación que es un modelo",
            titulo: "Un joven que se siente lejos de Dios",
            relato: [
              "Eres pastor. Andrés, un joven de la iglesia, te pide hablar después del culto.",
              "Te dice que ya no tiene ganas de orar y que se siente lejos de Dios.",
              "Te propones acompañarlo como Jesús acompañó a la samaritana.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo empiezas la conversación?",
                opciones: [
                  { texto: "Le preguntas por algo sencillo de su vida, como sus estudios.", bien: true, explica: "Jesús empezó con algo sencillo y partió de la necesidad del momento." },
                  { texto: "Le dices de entrada que su problema es que no lee la Biblia.", explica: "Antes de hablar, el consejero escucha: Jesús empezó con algo sencillo." },
                  { texto: "Le pides que vuelva otro día, porque después del culto no hay tiempo.", explica: "Antes de dar respuestas, Jesús dio su tiempo." },
                ],
                apoyo: "Jesús empezó con algo sencillo",
                explica: "Jesús empezó con algo sencillo y partió de la necesidad del momento; desde ahí pasó a lo profundo.",
              },
              {
                tipo: "situacion",
                pregunta: "Andrés te cuenta que está muy ocupado con la universidad y el trabajo. ¿Cómo pasas a lo profundo?",
                opciones: [
                  { texto: "Le preguntas cómo está su vida con Dios en medio de tanto trabajo.", bien: true, explica: "Como Jesús, que pasó del agua del pozo al agua viva, el consejero lleva la conversación a lo profundo." },
                  { texto: "Le das unos consejos para organizar sus horarios, y ahí terminas.", explica: "Partir de lo cotidiano está bien, pero Jesús llevó la conversación a lo profundo." },
                  { texto: "Cambias de tema y le cuentas del próximo campamento de los jóvenes.", explica: "Jesús partió de la necesidad del momento y la llevó a lo profundo, sin cambiar de tema." },
                ],
                apoyo: "Llevar a lo profundo: pasó del agua del pozo al agua viva",
                explica: "Jesús pasó de lo cotidiano a lo profundo: del agua del pozo al agua viva.",
              },
              {
                tipo: "situacion",
                pregunta: "Andrés te cuenta que no le habla a su papá desde hace meses y que le guarda rencor. ¿Qué haces?",
                opciones: [
                  { texto: "Le nombras con amor el rencor que guarda, sin humillarlo.", bien: true, explica: "Decir la verdad con amor: Jesús nombró el pecado sin humillar." },
                  { texto: "Le dices que su papá se lo merece, para que se sienta mejor.", explica: "Justificar el rencor no es decir la verdad: Jesús tocó la herida con verdad." },
                  { texto: "Le dices que es un mal hijo y que debería darle vergüenza.", explica: "Jesús tocó la herida con verdad y sin desprecio." },
                ],
                apoyo: "Decir la verdad con amor: nombró el pecado sin humillar",
                explica: "El consejero nombra con amor lo que haya que nombrar, como Jesús, que tocó la herida con verdad y sin desprecio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo terminas la conversación con Andrés?",
                opciones: [
                  { texto: "Oran juntos y acuerdan un paso: esta semana buscará a su papá.", bien: true, explica: "Se ora con la persona y se acuerda un paso concreto: la persona misma actúa." },
                  { texto: "Le dices que él ya sabe bien lo que tiene que hacer, y te despides.", explica: "En una consulta se acuerda un paso concreto, y después se acompaña." },
                  { texto: "Llamas tú a su papá esa misma noche para arreglarlo por él.", explica: "Dejar que la persona actúe: la samaritana misma fue a contarlo a su ciudad." },
                ],
                apoyo: "Dejar que la persona actúe: ella misma fue a contarlo a su ciudad",
                explica: "El consejero ora con la persona y acuerdan un paso concreto; después deja que ella misma actúe, y la acompaña.",
              },
              {
                tipo: "explica",
                apoyo: "Jesús acompañó a la mujer samaritana en una conversación que es un modelo",
                clave: {
                  id: "pr-pastoral-2-2-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué pasos de la conversación de Jesús con la samaritana seguiste con Andrés?",
                  ideas: [
                    { id: "inicio", peso: 34, texto: "Me acerqué y partí de algo sencillo de su vida, como Jesús partió del agua.", formas: ["acerc*", "algo sencillo", "lo sencillo", "conect*", "necesidad del momento", "sus estudios", "lo cotidiano", "cotidian*"] },
                    { id: "profundo", peso: 33, texto: "Lo llevé a lo profundo y le dije la verdad con amor, sin humillarlo.", formas: ["profund*", "verdad con amor", "sin humillar*", "con amor", "nombra*", "nombre (con|el|su)"] },
                    { id: "paso", peso: 33, texto: "Oramos, acordamos un paso y lo dejé actuar a él mismo.", formas: ["un paso", "acord*", "(el|andres) mismo", "dej* actuar", "actu*", "oramos", "orar con el", "ore con el"] },
                  ],
                  modelo: "Me acerqué y partí de algo sencillo de su vida, sus estudios. Después lo llevé a lo profundo y le dije la verdad con amor, sin humillarlo. Al final oramos, acordamos un paso y lo dejé actuar a él mismo.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo empezó Jesús la conversación con la samaritana.",
            texto: "Jesús empezó con algo [[sencillo]], rompió las [[barreras]] de su tiempo y pasó de lo cotidiano a lo [[profundo]].",
            distractores: ["difícil", "promesas", "superficial"],
            errores: {
              "difícil": "Jesús empezó con algo sencillo: «Dame de beber».",
              promesas: "Jesús rompió las barreras de su tiempo: judíos y samaritanos no se trataban entre sí.",
              superficial: "Jesús pasó de lo cotidiano a lo profundo: del agua del pozo al agua viva.",
            },
            apoyo: "Jesús empezó con algo sencillo",
            ref: "Juan 4:7-10",
            explica: "Jesús empezó con algo sencillo, «Dame de beber»; rompió las barreras de su tiempo, porque judíos y samaritanos no se trataban, y pasó de lo cotidiano a lo profundo: «Si conocieras el don de Dios».",
          },
          {
            consigna: "Completa cómo tocó Jesús la herida de la mujer.",
            texto: "Jesús tocó la [[herida]] con [[verdad]] y sin desprecio, y reconoció lo que ella había dicho [[bien]].",
            distractores: ["fama", "burla", "mal"],
            errores: {
              fama: "Jesús tocó la herida de la mujer: «cinco maridos has tenido».",
              burla: "Jesús tocó la herida con verdad y sin desprecio.",
              mal: "Jesús reconoció lo que ella había dicho bien: «esto has dicho con verdad».",
            },
            apoyo: "Jesús tocó la herida con verdad y sin desprecio",
            ref: "Juan 4:16-18",
            explica: "Jesús le dijo la verdad sin humillarla, «cinco maridos has tenido», y reconoció lo que ella había dicho bien: «esto has dicho con verdad».",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús acompañó a la mujer samaritana en una conversación que es un modelo",
            clave: {
              id: "pr-pastoral-2-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué pasos siguió Jesús en su conversación con la mujer samaritana?",
              ideas: [
                { id: "acercarse", peso: 34, texto: "Se acercó cruzando barreras y partió de una necesidad cotidiana, el agua.", formas: ["acerc*", "barrera*", "necesidad cotidiana", "necesidad del momento", "dame de beber", "inici* la conversacion", "conect*", "(del|el) agua del pozo", "pidio (agua|de beber)"] },
                { id: "verdad", peso: 33, texto: "La llevó a lo profundo y le dijo la verdad sin humillarla.", formas: ["profund*", "agua viva", "verdad con amor", "verdad sin", "sin humillar*", "sin desprecio", "nombr* (el|su) pecado", "dijo la verdad", "cinco maridos"] },
                { id: "dios", peso: 33, texto: "Le señaló a Dios y la dejó actuar.", formas: ["senal* a dios", "hablo del padre", "del padre", "verdadera adoracion", "adoracion", "dejo actuar", "dej* que actu*", "ella misma", "a su ciudad", "a la ciudad"] },
              ],
              errores: [
                { id: "humillo", texto: "Jesús nombró el pecado sin humillar.", formas: ["la humillo", "con desprecio", "la desprecio", "la regano", "la condeno"], anula: "verdad" },
              ],
              modelo: "Jesús se acercó cruzando las barreras y partió de una necesidad cotidiana, el agua. La llevó a lo profundo y le dijo la verdad sin humillarla. Al final le señaló a Dios y la dejó actuar: ella misma fue a su ciudad.",
            },
          },
          {
            apoyo: "escucha antes de hablar, entiende la necesidad real, ilumina con la Palabra, nombra con amor lo que haya que nombrar, ora con la persona y acuerden un paso concreto",
            clave: {
              id: "pr-pastoral-2-2-a7-2",
              tipo: "corta",
              pregunta: "Según la nota para el líder, ¿qué camino sigue el consejero en una consulta?",
              ideas: [
                { id: "escucha", peso: 34, texto: "Escucha antes de hablar y entiende la necesidad real.", formas: ["escuch*", "necesidad real", "entiend* (la|su) necesidad", "entender (la|su) necesidad", "comprend* (la|su) necesidad"] },
                { id: "palabra", peso: 33, texto: "Ilumina con la Palabra, nombra con amor lo que haya que nombrar y ora con la persona.", formas: ["ilumin*", "con la (palabra|biblia|escritura)", "nombra*", "nombro", "(ora|orar|orare|oraria|oro|ore|oramos|orariamos|orando|orara|oren) con (la|el) persona", "ora con", "oramos", "orar con"] },
                { id: "paso", peso: 33, texto: "Acuerdan un paso concreto y, después, la acompaña.", formas: ["paso concreto", "un paso", "acuerd*", "acord*", "acompan*"] },
              ],
              modelo: "Primero escucha antes de hablar y entiende la necesidad real. Luego ilumina con la Palabra, nombra con amor lo que haya que nombrar y ora con la persona. Al final acuerdan un paso concreto, y después la acompaña.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La culpa y el perdón
    "pastoral-2-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué cargan muchas personas que llegan a consejería?", reverso: "Culpa: unas por pecados que no han confesado, y otras por pecados que Dios ya perdonó.", apoyo: "Muchas personas que llegan a consejería cargan culpa" },
              { frente: "Según David, ¿qué hace la culpa escondida?", reverso: "Pesa hasta en el cuerpo: «Mientras callé, se envejecieron mis huesos».", apoyo: "David describe lo que hace la culpa escondida: «Mientras callé, se envejecieron mis huesos»" },
              { frente: "¿Qué se hace con la culpa verdadera?", reverso: "Se confiesa a Dios, se repara el daño cuando se puede y se recibe el perdón.", apoyo: "Se confiesa a Dios, se repara el daño cuando se puede y se recibe el perdón" },
              { frente: "¿Con qué se enfrenta la falsa culpa?", reverso: "Con la verdad de la Palabra.", apoyo: "Se enfrenta con la verdad de la Palabra" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hay detrás de la culpa verdadera?", reverso: "Un pecado real.", apoyo: "La culpa verdadera: hay un pecado real" },
              { frente: "¿Por qué se culpa la persona que tiene falsa culpa?", reverso: "Por lo que no fue pecado, o por un pecado que Dios ya perdonó.", apoyo: "la persona se culpa por lo que no fue pecado, o por un pecado que Dios ya perdonó" },
              { frente: "¿De qué depende el perdón de Dios?", reverso: "De la fidelidad de Dios, no de cómo se siente la persona.", apoyo: "El perdón no depende de cómo se siente la persona, sino de la fidelidad de Dios" },
              { frente: "¿Dónde se resuelve la culpa?", reverso: "En la cruz, no en el castigo propio.", apoyo: "La culpa se resuelve en la cruz, no en el castigo propio" },
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
            consigna: "¿Es culpa verdadera o falsa culpa? Lleva cada frase a su grupo.",
            grupos: ["Culpa verdadera", "Falsa culpa"],
            frases: [
              { texto: "Hay un pecado real", grupo: 0 },
              { texto: "Se confiesa a Dios y se repara el daño cuando se puede", grupo: 0 },
              { texto: "Viene de un pecado que todavía no se ha confesado", grupo: 0 },
              { texto: "Se culpa por lo que no fue pecado", grupo: 1 },
              { texto: "Se culpa por un pecado que Dios ya perdonó", grupo: 1 },
              { texto: "Se enfrenta con la verdad de la Palabra", grupo: 1 },
            ],
            apoyo: "El consejero distingue la culpa verdadera, que se confiesa y se repara, de la falsa culpa, que se enfrenta con la verdad del perdón",
            explica: "En la culpa verdadera hay un pecado real: se confiesa a Dios, se repara el daño cuando se puede y se recibe el perdón. En la falsa culpa, la persona se culpa por lo que no fue pecado o por un pecado que Dios ya perdonó, y eso se enfrenta con la verdad de la Palabra.",
          },
          {
            consigna: "¿Qué culpa carga cada persona: culpa verdadera o falsa culpa? Lleva cada frase a su grupo.",
            grupos: ["Culpa verdadera", "Falsa culpa"],
            frases: [
              { texto: "Le robó a su jefe y nunca lo ha confesado", grupo: 0 },
              { texto: "Le mintió a su esposa y lo sigue escondiendo", grupo: 0 },
              { texto: "Engañó a un cliente y no ha reparado el daño", grupo: 0 },
              { texto: "Se culpa porque su padre murió de una enfermedad", grupo: 1 },
              { texto: "Confesó a Dios un pecado hace años, pero se sigue castigando", grupo: 1 },
              { texto: "Se culpa por un accidente que causó otro conductor", grupo: 1 },
            ],
            apoyo: "La falsa culpa: la persona se culpa por lo que no fue pecado, o por un pecado que Dios ya perdonó",
            explica: "Un robo, una mentira o un engaño escondidos son culpa verdadera: hay un pecado real, que se confiesa y se repara. Culparse por lo que no fue pecado, como la enfermedad de un padre o un accidente que causó otro, o por un pecado ya perdonado, es falsa culpa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre las dos tristezas que distingue Pablo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La tristeza que es según Dios produce arrepentimiento para salvación.", verdad: true, explica: "Así lo dice Pablo: «la tristeza que es según Dios produce arrepentimiento para salvación».", apoyo: "«la tristeza que es según Dios produce arrepentimiento para salvación»", ref: "2 Corintios 7:10" },
              { texto: "La tristeza del mundo lleva a la persona a Dios y a cambiar.", verdad: false, explica: "La tristeza del mundo produce muerte y hunde a la persona en sí misma; la que lleva a Dios y a cambiar es la tristeza según Dios.", apoyo: "La primera lleva a Dios y a cambiar; la segunda hunde a la persona en sí misma" },
              { texto: "La tristeza del mundo hunde a la persona en sí misma.", verdad: true, explica: "La tristeza del mundo produce muerte: hunde a la persona en sí misma.", apoyo: "la segunda hunde a la persona en sí misma" },
            ],
          },
          {
            consigna: "Sobre la tristeza según Dios y la del mundo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Según Pablo, la tristeza del mundo produce muerte.", verdad: true, explica: "Pablo lo dice así: «pero la tristeza del mundo produce muerte».", apoyo: "«pero la tristeza del mundo produce muerte»", ref: "2 Corintios 7:10" },
              { texto: "La tristeza según Dios hunde a la persona en sí misma.", verdad: false, explica: "La tristeza según Dios lleva a Dios y a cambiar; la que hunde a la persona en sí misma es la del mundo.", apoyo: "La primera lleva a Dios y a cambiar" },
              { texto: "La tristeza según Dios lleva al arrepentimiento y a la vida.", verdad: true, explica: "La tristeza según Dios lleva al arrepentimiento y a la vida; la del mundo, a la muerte.", apoyo: "La tristeza según Dios lleva al arrepentimiento y a la vida" },
              { texto: "Pablo enseña que toda tristeza es igual delante de Dios.", verdad: false, explica: "Pablo distingue dos tristezas: la que es según Dios y la del mundo.", apoyo: "Pablo distingue dos tristezas" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Si confesamos nuestros pecados, ¿cómo es Dios para perdonarnos? Toca las palabras que lo dicen.",
            texto: "Si confesamos nuestros pecados, él es [[fiel y justo]] para perdonar nuestros pecados, y limpiarnos de toda maldad",
            apoyo: "La promesa es firme",
            ref: "1 Juan 1:9",
            explica: "Dios es fiel y justo para perdonar nuestros pecados: el perdón no depende de cómo se siente la persona, sino de la fidelidad de Dios.",
          },
          {
            consigna: "David declaró su pecado y no encubrió su iniquidad. ¿Qué hizo Dios entonces? Toca las palabras que lo dicen.",
            texto: "Y tú [[perdonaste la maldad de mi pecado]]",
            apoyo: "la confesión trae el perdón de Dios, que es fiel y justo para perdonar",
            ref: "Salmos 32:5",
            explica: "La confesión trae el perdón de Dios: David declaró su pecado, y Dios perdonó la maldad de su pecado.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Ante alguien que confiesa, no te escandalices ni lo humilles: guarda la confidencia, ora con él y anúnciale con claridad la promesa del perdón",
            ref: "1 Juan 1:9",
            situacion: "Eres pastor. Tomás, un hermano de la iglesia, te pide hablar a solas en tu oficina. Se nota nervioso.",
            escenas: [
              {
                id: "e1",
                narra: "Tomás te confiesa que hace años dijo mentiras sobre su hermano delante de toda la familia, y que nunca lo ha confesado.",
                pregunta: "¿Cómo reaccionas?",
                opciones: [
                  { texto: "Lo escuchas con calma, sin escandalizarte ni humillarlo.", valor: 2, explica: "Ante alguien que confiesa, no te escandalices ni lo humilles.", siguiente: "e2" },
                  { texto: "Le dices que te sorprende mucho, viniendo de alguien como él.", valor: 0, explica: "Ante alguien que confiesa, el consejero no se escandaliza ni lo humilla.", siguiente: "e1b" },
                  { texto: "Le dices que lo pedirás en el grupo de oración, para que oren por él.", valor: 0, explica: "Ante alguien que confiesa, el consejero guarda la confidencia.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Tomás se queda callado y te dice: Creo que no debí contarle esto.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le pides perdón, y le aseguras que guardarás su confidencia.", valor: 2, explica: "El consejero no se escandaliza ni humilla a quien confiesa, y guarda la confidencia.", siguiente: "e2" },
                  { texto: "Le dices que sí debía, porque así ya sabes cómo es él en realidad.", valor: 0, explica: "Ante alguien que confiesa, no te escandalices ni lo humilles.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Tomás te dice: Dios no puede perdonar a alguien como yo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le anuncias la promesa: Dios es fiel y justo para perdonar.", valor: 2, explica: "Al que confiesa se le anuncia con claridad la promesa del perdón: Dios es fiel y justo para perdonar." },
                  { texto: "Que primero tiene que sufrir un tiempo para merecer el perdón.", valor: 0, explica: "La culpa se resuelve en la cruz, no en el castigo propio." },
                  { texto: "Le lees 1 Juan 1:9, pero sin orar con él ni explicarle nada.", valor: 1, explica: "Leer la promesa es bueno, pero el consejero ora con él y le anuncia con claridad la promesa del perdón." },
                ],
              },
              {
                id: "e3",
                narra: "Tomás pregunta si basta con confesárselo a Dios, o si tiene que hacer algo con su hermano.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que lo confiese a Dios y repare el daño con su hermano, si se puede.", valor: 2, explica: "La culpa verdadera se confiesa a Dios, se repara el daño cuando se puede y se recibe el perdón." },
                  { texto: "Que no haga nada con su hermano, porque eso ya pasó hace muchos años.", valor: 0, explica: "En la culpa verdadera también se repara el daño cuando se puede." },
                  { texto: "Que lo cuente delante de toda la iglesia, para que todos lo perdonen.", valor: 0, explica: "El pecado se confiesa a Dios, y el daño se repara cuando se puede; el consejero guarda la confidencia." },
                ],
              },
            ],
          },
          {
            apoyo: "La culpa se resuelve en la cruz, no en el castigo propio",
            ref: "1 Juan 1:9",
            situacion: "Eres pastor. Samuel, un joven de la iglesia, te pide una cita porque se siente sucio delante de Dios.",
            escenas: [
              {
                id: "e1",
                narra: "Samuel te cuenta que hace dos años le mintió a su mejor amigo; lo confesó a Dios y le pidió perdón al amigo, que lo perdonó. Aun así, sigue sintiéndose culpable.",
                pregunta: "¿Qué clase de culpa carga Samuel?",
                opciones: [
                  { texto: "Falsa culpa: se culpa por un pecado que Dios ya perdonó.", valor: 2, explica: "La falsa culpa: la persona se culpa por un pecado que Dios ya perdonó, y eso se enfrenta con la verdad de la Palabra." },
                  { texto: "Culpa verdadera: tiene que volver a confesar ese mismo pecado.", valor: 0, explica: "Ya lo confesó y reparó el daño: se culpa por un pecado que Dios ya perdonó." },
                  { texto: "Culpa verdadera, porque si todavía la siente, sigue sin perdón.", valor: 0, explica: "El perdón no depende de cómo se siente la persona, sino de la fidelidad de Dios." },
                ],
              },
              {
                id: "e2",
                narra: "Samuel te dice: Creo que tengo que castigarme un tiempo para merecer el perdón.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la culpa se resuelve en la cruz, no en el castigo propio.", valor: 2, explica: "La culpa se resuelve en la cruz, no en el castigo propio." },
                  { texto: "Que sí: unos meses de castigo le van a ayudar a sentirse perdonado.", valor: 0, explica: "La culpa se resuelve en la cruz, no en el castigo propio." },
                  { texto: "Que no se castigue, pero que mejor no vuelva a pensar en el tema.", valor: 1, explica: "No castigarse está bien, pero la falsa culpa se enfrenta con la verdad de la Palabra." },
                ],
              },
              {
                id: "e3",
                narra: "Samuel pregunta: ¿Y si un día no siento que Dios me perdonó?",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que el perdón depende de la fidelidad de Dios, no de lo que sienta.", valor: 2, explica: "El perdón no depende de cómo se siente la persona, sino de la fidelidad de Dios." },
                  { texto: "Que entonces tendrá que confesarlo otra vez, hasta que lo sienta.", valor: 0, explica: "La promesa es firme: Dios es fiel y justo para perdonar, aunque la persona no lo sienta." },
                  { texto: "Que si no lo siente, quizás Dios todavía no lo ha perdonado del todo.", valor: 0, explica: "El perdón no depende de cómo se siente la persona, sino de la fidelidad de Dios." },
                ],
              },
              {
                id: "e4",
                narra: "Antes de despedirse, Samuel te pide que ores por él.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras con él y le anuncias con claridad la promesa del perdón.", valor: 2, explica: "Ante alguien que carga culpa, el consejero ora con él y le anuncia con claridad la promesa del perdón." },
                  { texto: "Le dices que orarás por él esta noche, cuando llegues a tu casa.", valor: 1, explica: "Orar por él está bien, pero el consejero ora con él y le anuncia con claridad la promesa del perdón." },
                  { texto: "Le dices que ore él solo, porque su caso es entre él y Dios nada más.", valor: 0, explica: "El consejero ora con la persona y le anuncia con claridad la promesa del perdón." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué se hace con la culpa verdadera.",
            texto: "En la culpa verdadera hay un pecado real: se [[confiesa]] a Dios, se [[repara]] el daño cuando se puede y se [[recibe]] el perdón.",
            distractores: ["esconde", "aumenta", "rechaza"],
            errores: {
              esconde: "La culpa escondida pesa hasta en el cuerpo: el pecado se confiesa a Dios.",
              aumenta: "Cuando se puede, el daño se repara.",
              rechaza: "Al confesar, se recibe el perdón: Dios es fiel y justo para perdonar.",
            },
            apoyo: "La culpa verdadera: hay un pecado real. Se confiesa a Dios, se repara el daño cuando se puede y se recibe el perdón",
            ref: "Salmos 32:5",
            explica: "En la culpa verdadera hay un pecado real: se confiesa a Dios, como David, que declaró su pecado; se repara el daño cuando se puede, y se recibe el perdón.",
          },
          {
            consigna: "Completa qué hace la persona que tiene falsa culpa, y cómo se enfrenta.",
            texto: "Quien tiene falsa culpa se [[acusa]] por un pecado que Dios ya [[perdonó]], y la enfrenta con la [[verdad]] de la Palabra.",
            distractores: ["alegra", "aprobó", "mentira"],
            errores: {
              alegra: "En la falsa culpa, la persona se culpa por lo que no fue pecado o por un pecado que Dios ya perdonó.",
              "aprobó": "La falsa culpa carga un pecado que Dios ya perdonó.",
              mentira: "La falsa culpa se enfrenta con la verdad de la Palabra.",
            },
            apoyo: "Se enfrenta con la verdad de la Palabra",
            explica: "En la falsa culpa, la persona se culpa por lo que no fue pecado o por un pecado que Dios ya perdonó, y eso se enfrenta con la verdad de la Palabra: la culpa se resuelve en la cruz, no en el castigo propio.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La primera lleva a Dios y a cambiar; la segunda hunde a la persona en sí misma",
            ref: "2 Corintios 7:10",
            clave: {
              id: "pr-pastoral-2-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué diferencia hay entre la tristeza que es según Dios y la tristeza del mundo?",
              ideas: [
                { id: "segunDios", peso: 50, texto: "La tristeza según Dios produce arrepentimiento para salvación: lleva a Dios y a cambiar.", formas: ["arrepent*", "salvacion", "(lleva|acerca|vuelve|conduce) a dios", "a cambiar", "a la vida"] },
                { id: "mundo", peso: 50, texto: "La tristeza del mundo produce muerte: hunde a la persona en sí misma.", formas: ["muerte", "hund*", "en si mism*"] },
              ],
              errores: [
                { id: "mundo-dios", texto: "La que lleva al arrepentimiento y a Dios es la tristeza según Dios, no la del mundo.", formas: ["mundo (produce|lleva|trae|da) arrepent*", "mundo (lleva|acerca) a dios", "mundo (produce|lleva|trae|da) salvacion", "arrepent* es la del mundo"], anula: "segunDios" },
                { id: "dios-muerte", texto: "La que produce muerte es la tristeza del mundo, no la que es según Dios.", formas: ["dios (produce|lleva|trae|da) muerte", "dios hund*", "dios (lo|la|nos|te|me) hund*", "hund* es la de dios"], anula: "mundo" },
              ],
              modelo: "La tristeza según Dios produce arrepentimiento para salvación: lleva a Dios y a cambiar. La tristeza del mundo, en cambio, produce muerte y hunde a la persona en sí misma.",
            },
          },
          {
            apoyo: "La tristeza según Dios lleva al arrepentimiento y a la vida; la del mundo, a la muerte",
            ref: "2 Corintios 7:10",
            clave: {
              id: "pr-pastoral-2-3-a7-2",
              tipo: "corta",
              pregunta: "En consejería, ¿cómo reconoces si la tristeza de alguien por su pecado es según Dios o del mundo?",
              ideas: [
                { id: "segunDios", peso: 50, texto: "Si es según Dios, lo lleva a Dios, al arrepentimiento y a cambiar.", formas: ["arrepent*", "salvacion", "(lleva|acerca|vuelve|conduce) a dios", "a cambiar", "a la vida"] },
                { id: "mundo", peso: 50, texto: "Si es del mundo, lo hunde en sí mismo y produce muerte.", formas: ["muerte", "hund*", "en si mism*"] },
              ],
              errores: [
                { id: "mundo-dios", texto: "La que lleva al arrepentimiento y a Dios es la tristeza según Dios, no la del mundo.", formas: ["mundo (produce|lleva|trae|da) arrepent*", "mundo (lleva|acerca) a dios", "mundo (produce|lleva|trae|da) salvacion", "arrepent* es la del mundo"], anula: "segunDios" },
                { id: "dios-muerte", texto: "La que produce muerte es la tristeza del mundo, no la que es según Dios.", formas: ["dios (produce|lleva|trae|da) muerte", "dios hund*", "dios (lo|la|nos|te|me) hund*", "hund* es la de dios"], anula: "mundo" },
              ],
              modelo: "Si es según Dios, la tristeza lo lleva a Dios, al arrepentimiento y a cambiar. Si es del mundo, lo hunde en sí mismo y produce muerte, porque no lo acerca a Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La ansiedad y la tristeza profunda
    "pastoral-2-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A quiénes llegan también la ansiedad y la depresión?", reverso: "También a los creyentes.", apoyo: "La ansiedad y la depresión llegan también a los creyentes" },
              { frente: "¿Qué muestran los salmos sobre los fieles y el abatimiento?", reverso: "Que lo conocieron, y que Dios no los rechazó.", apoyo: "Los salmos muestran que los fieles conocieron el abatimiento, y que Dios no los rechazó" },
              { frente: "¿Qué invitación hace Jesús a los cansados?", reverso: "«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar».", apoyo: "Jesús invita a los cansados" },
              { frente: "¿Qué les enseñó Dios a los fieles abatidos de la Biblia?", reverso: "A esperar en él y a llevarle su ansiedad en oración.", apoyo: "Dios les enseñó a esperar en él y a llevarle su ansiedad en oración" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué paz promete Dios a los que oran?", reverso: "«la paz de Dios, que sobrepasa todo entendimiento».", apoyo: "y promete «la paz de Dios, que sobrepasa todo entendimiento»" },
              { frente: "¿Qué podemos echar sobre Dios?", reverso: "Toda nuestra ansiedad, porque él tiene cuidado de nosotros.", apoyo: "Podemos ir «echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros»" },
              { frente: "¿Rechaza Dios al abatido?", reverso: "No: lo invita a descansar.", apoyo: "Dios no rechaza al abatido: lo invita a descansar" },
              { frente: "Tomar un medicamento recetado, ¿es falta de fe?", reverso: "No, como no lo es usar anteojos.", apoyo: "Tomar un medicamento recetado o ir a terapia no es falta de fe, como no lo es usar anteojos" },
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
            consigna: "El salmista se pregunta por qué se abate su alma. ¿Qué se dice que haga? Toca las palabras que lo dicen.",
            texto: "¿Por qué te abates, oh alma mía, Y te turbas dentro de mí? [[Espera en Dios]]",
            apoyo: "El salmista se habla a sí mismo en medio de la angustia",
            ref: "Salmos 42:5",
            explica: "En medio de la angustia, el salmista se dice: «Espera en Dios». La Biblia no esconde la tristeza de los fieles: les enseña a llevarla delante de Dios.",
          },
          {
            consigna: "Frente al afán, ¿cómo se presentan las peticiones delante de Dios? Toca las palabras que lo dicen.",
            texto: "sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, [[con acción de gracias]]",
            apoyo: "Frente al afán, la Palabra invita a orar",
            ref: "Filipenses 4:6-7",
            explica: "Frente al afán, la Palabra invita a orar: las peticiones se presentan delante de Dios en toda oración y ruego, con acción de gracias.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pasaje con lo que enseña sobre la ansiedad y el abatimiento.",
            pares: [
              ["Salmos 42:5", "El salmista se dice a sí mismo: espera en Dios"],
              ["Filipenses 4:6-7", "Frente al afán, orar con acción de gracias"],
              ["1 Pedro 5:7", "Echar toda la ansiedad sobre Dios, que tiene cuidado de nosotros"],
              ["Mateo 11:28", "Jesús invita a los cansados a ir a él para descansar"],
            ],
            apoyo: "Los fieles de la Biblia también conocieron el abatimiento, y Dios les enseñó a esperar en él y a llevarle su ansiedad en oración",
            explica: "En Salmos 42:5 el salmista se dice: «Espera en Dios»; Filipenses 4:6-7 invita a orar con acción de gracias; 1 Pedro 5:7, a echar la ansiedad sobre Dios; y en Mateo 11:28 Jesús invita a los cansados a descansar.",
          },
          {
            consigna: "Une cada pasaje con lo que Dios ofrece en él al que está cargado.",
            pares: [
              ["Filipenses 4:6-7", "Una paz que sobrepasa todo entendimiento"],
              ["1 Pedro 5:7", "Su cuidado: por eso echamos sobre él la ansiedad"],
              ["Mateo 11:28", "Descanso para los trabajados y cargados"],
            ],
            apoyo: "y promete «la paz de Dios, que sobrepasa todo entendimiento»",
            explica: "Filipenses 4:6-7 promete la paz de Dios, que sobrepasa todo entendimiento; 1 Pedro 5:7 dice que él tiene cuidado de nosotros; y Jesús da descanso a los trabajados y cargados.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre cuándo la tristeza necesita atención médica: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una tristeza que dura más de dos semanas y afecta el sueño o el trabajo pide ayuda médica.", verdad: true, explica: "Es una de las señales de que hace falta ayuda médica: la tristeza dura más de dos semanas y afecta el sueño, el apetito o el trabajo.", apoyo: "La tristeza dura más de dos semanas y afecta el sueño, el apetito o el trabajo" },
              { texto: "Si la ansiedad no deja funcionar a la persona, basta con que ore más.", verdad: false, explica: "Cuando la ansiedad no deja funcionar a la persona, hace falta además ayuda médica; el consejero sigue acompañando con la Palabra y la oración.", apoyo: "Hay ataques de pánico, o la ansiedad no la deja funcionar" },
              { texto: "Los pensamientos de muerte o de hacerse daño son una señal de que hace falta ayuda.", verdad: true, explica: "Es una de las señales de que hace falta ayuda médica, y si alguien piensa en quitarse la vida se busca ayuda de inmediato.", apoyo: "Aparecen pensamientos de muerte o de hacerse daño" },
            ],
          },
          {
            consigna: "Sobre la fe, la medicina y la depresión: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Tomar un medicamento recetado es falta de fe.", verdad: false, explica: "Tomar un medicamento recetado o ir a terapia no es falta de fe, como no lo es usar anteojos.", apoyo: "Tomar un medicamento recetado o ir a terapia no es falta de fe, como no lo es usar anteojos" },
              { texto: "La depresión siempre es fruto de un pecado.", verdad: false, explica: "La depresión no siempre es fruto de un pecado.", apoyo: "La depresión no siempre es fruto de un pecado" },
              { texto: "Si alguien ya no disfruta de nada o siente que su vida no tiene sentido, hace falta ayuda médica.", verdad: true, explica: "Es una de las señales de que la tristeza necesita atención médica.", apoyo: "La persona ya no disfruta de nada, o siente que su vida no tiene sentido" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana te dice: Mi hijo ya no disfruta de nada y dice que su vida no tiene sentido. Pastor, ¿será solo una etapa?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que son señales de que necesita ayuda médica, y que los acompañarás.", bien: true, explica: "Cuando la persona ya no disfruta de nada o siente que su vida no tiene sentido, hace falta ayuda médica, y el consejero acompaña con la Palabra y la oración." },
              { texto: "Que sí: es una etapa de la juventud, y se le va a pasar muy pronto.", explica: "Esas son señales de que la tristeza necesita atención médica." },
              { texto: "Que lo que tiene su hijo es falta de fe, y que ore más por él cada día.", explica: "La depresión no siempre es fruto de un pecado: no se le dice que su problema es falta de fe." },
              { texto: "Que lo lleve al médico, pero que tú ya no puedes hacer nada por ellos.", explica: "El consejero acompaña con la Palabra y la oración, y reconoce cuándo hace falta ayuda médica." },
            ],
            apoyo: "La persona ya no disfruta de nada, o siente que su vida no tiene sentido",
            explica: "Cuando una persona ya no disfruta de nada o siente que su vida no tiene sentido, hace falta ayuda médica. El consejero acompaña con la Palabra y la oración, y ante el riesgo de suicidio se busca ayuda de inmediato.",
          },
          {
            caso: "Un hermano te escribe: Hace tres semanas que casi no como ni duermo, y ya falté al trabajo. ¿Será que solo debo orar más?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que siga orando y que, además, vea a un médico: su tristeza lo pide.", bien: true, explica: "La tristeza que dura más de dos semanas y afecta el sueño, el apetito o el trabajo necesita ayuda médica, y la oración sigue." },
              { texto: "Que sí: con orar más le basta, y muy pronto se le va a pasar todo eso.", explica: "Orar es bueno, pero esa tristeza ya pide atención médica." },
              { texto: "Que deje de orar por eso, y que busque solo la ayuda de un médico.", explica: "La Palabra invita a orar: el consejero acompaña con la oración y con la ayuda adecuada." },
              { texto: "Que espere unos meses más, a ver si se le pasa con el tiempo solo.", explica: "Una tristeza que dura más de dos semanas y afecta el sueño, el apetito o el trabajo ya pide ayuda médica." },
            ],
            apoyo: "La tristeza dura más de dos semanas y afecta el sueño, el apetito o el trabajo",
            explica: "Una tristeza de más de dos semanas que afecta el sueño, el apetito o el trabajo necesita atención médica. Ir al médico no es falta de fe, y el consejero sigue acompañando con la Palabra y la oración.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El consejero acompaña con la Palabra y la oración, y reconoce cuándo hace falta ayuda médica",
            ref: "Mateo 11:28",
            situacion: "Eres pastor. Héctor, un hermano de la iglesia, te pide una cita. Desde hace un mes está muy triste, casi no duerme y ya faltó varias veces al trabajo.",
            escenas: [
              {
                id: "e1",
                narra: "Héctor te dice: Un hermano me dijo que esto me pasa por falta de fe.",
                pregunta: "¿Qué le dices primero?",
                opciones: [
                  { texto: "Que los fieles de la Biblia también conocieron el abatimiento.", valor: 2, explica: "Los fieles de la Biblia también conocieron el abatimiento, y Dios no los rechazó: se acompaña sin decir que el problema es falta de fe." },
                  { texto: "Que ese hermano tiene razón, y que debe orar con mucha más fe.", valor: 0, explica: "La depresión no siempre es fruto de un pecado: no se le dice que su problema es falta de fe." },
                  { texto: "Que no le haga caso a ese hermano, y cambias de tema enseguida.", valor: 1, explica: "No culparlo está bien, pero el consejero lo acompaña con la Palabra y la oración." },
                ],
              },
              {
                id: "e2",
                narra: "Mientras lo escuchas, ves que su tristeza dura ya un mes y le afecta el sueño y el trabajo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras con él y le dices que, además, necesita ver a un médico.", valor: 2, explica: "Una tristeza que dura más de dos semanas y afecta el sueño o el trabajo necesita ayuda médica, y el consejero acompaña con la oración." },
                  { texto: "Le dices que con la oración basta, y que no vaya a ningún médico.", valor: 0, explica: "Ir al médico no es falta de fe, y esa tristeza pide atención médica." },
                  { texto: "Le das un versículo de ánimo y le pides que vuelva dentro de un mes.", valor: 1, explica: "La Palabra ayuda, pero esa tristeza ya pide atención médica: dura más de dos semanas y afecta el sueño y el trabajo." },
                ],
              },
              {
                id: "e3",
                narra: "Héctor te pregunta: Si el médico me receta un medicamento, ¿tomarlo es falta de fe?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no es falta de fe, como no lo es usar anteojos.", valor: 2, explica: "Tomar un medicamento recetado o ir a terapia no es falta de fe, como no lo es usar anteojos." },
                  { texto: "Que sí: un creyente con fe no debe tomar medicamentos.", valor: 0, explica: "Tomar un medicamento recetado no es falta de fe." },
                  { texto: "Que lo tome, pero que deje de orar por su tristeza.", valor: 0, explica: "La Palabra invita a llevarle a Dios la ansiedad en oración: el consejero acompaña con la oración y con la ayuda adecuada." },
                ],
              },
              {
                id: "e4",
                narra: "Una noche, Héctor te escribe: Ya no le encuentro sentido a nada; a veces pienso en quitarme la vida.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "No lo dejas solo y buscan ayuda de inmediato, como el 988.", valor: 2, explica: "Si alguien piensa en quitarse la vida, no lo dejes solo y busquen ayuda de inmediato: en Estados Unidos, el 988 atiende por teléfono o por mensaje, también en español." },
                  { texto: "Le respondes que mañana hablan con calma en tu oficina.", valor: 0, explica: "Ante el riesgo de suicidio se busca ayuda de inmediato." },
                  { texto: "Le pides que ore y que trate de dormir, que ya se le pasará.", valor: 0, explica: "No lo dejes solo: ante el riesgo de suicidio se busca ayuda de inmediato." },
                ],
              },
            ],
          },
          {
            apoyo: "Frente al afán, la Palabra invita a orar",
            ref: "Filipenses 4:6-7",
            situacion: "Eres pastor. Esteban, un joven universitario de la iglesia, te pide hablar porque la ansiedad lo tiene muy mal.",
            escenas: [
              {
                id: "e1",
                narra: "Esteban te dice: Si me siento ansioso, es porque soy un mal cristiano.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la ansiedad llega también a los creyentes, y Dios no los rechaza.", valor: 2, explica: "La ansiedad y la depresión llegan también a los creyentes, y Dios no los rechazó." },
                  { texto: "Que tiene razón: un buen cristiano nunca debería sentir ninguna ansiedad.", valor: 0, explica: "La ansiedad llega también a los creyentes: los salmos muestran que los fieles conocieron el abatimiento." },
                  { texto: "Que no piense más en eso, y que se distraiga con otras cosas un tiempo.", valor: 1, explica: "Distraerse no responde su duda: la ansiedad llega también a los creyentes, y la Palabra los invita a orar." },
                ],
              },
              {
                id: "e2",
                narra: "Esteban te pide que lo ayudes a enfrentar el afán con la Palabra.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oran juntos, y le muestras que puede echar su ansiedad sobre Dios.", valor: 2, explica: "Frente al afán, la Palabra invita a orar, y podemos echar toda la ansiedad sobre Dios, porque él tiene cuidado de nosotros." },
                  { texto: "Le dices que deje la Biblia a un lado y que solo haga más ejercicio.", valor: 0, explica: "Frente al afán, la Palabra invita a orar: el consejero acompaña con la Palabra y la oración." },
                  { texto: "Le das un pasaje para que lo lea él solo en su casa, y te despides.", valor: 1, explica: "La Palabra ayuda, pero el consejero también acompaña con la oración." },
                ],
              },
              {
                id: "e3",
                narra: "Esteban te cuenta que tiene ataques de pánico y que la ansiedad no lo deja ir a clases.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que, además de orar, vea a un médico: el pánico lo pide.", valor: 2, explica: "Los ataques de pánico, o una ansiedad que no deja funcionar, son señales de que hace falta ayuda médica." },
                  { texto: "Que ore más fuerte, y los ataques se le van a quitar solos.", valor: 0, explica: "Orar es bueno, pero el pánico pide además ayuda médica." },
                  { texto: "Que deje la universidad, para no sentir más esa ansiedad.", valor: 0, explica: "Cuando hay ataques de pánico o la ansiedad no deja funcionar, hace falta ayuda médica." },
                ],
              },
              {
                id: "e4",
                narra: "Semanas después, Esteban ya está en terapia y te pregunta si eso es falta de fe.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que ir a terapia no es falta de fe, y que sigues orando por él.", valor: 2, explica: "Ir a terapia no es falta de fe, y el consejero sigue acompañando con la Palabra y la oración." },
                  { texto: "Que sí: si tuviera más fe, no le haría falta ir a ninguna terapia.", valor: 0, explica: "Tomar un medicamento recetado o ir a terapia no es falta de fe." },
                  { texto: "Que eso no importa nada, mientras él se sienta un poco mejor.", valor: 1, explica: "Sí importa decirle la verdad: ir a terapia no es falta de fe, y el consejero sigue acompañando." },
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
            apoyo: "Dios no rechaza al abatido: lo invita a descansar",
            clave: {
              id: "pr-pastoral-2-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo acompañarías a un hermano con depresión sin decirle que su problema es falta de fe?",
              ideas: [
                { id: "palabra", peso: 35, texto: "Con la Palabra y la oración: Dios no rechaza al abatido.", formas: ["con la (palabra|biblia|escritura)", "(ora|orar|orare|oraria|oro|ore|oramos|orariamos|orando|orara|oren) con el", "(ora|orar|orare|oraria|oro|ore|oramos|orariamos|orando|orara|oren) por el", "oracion", "orando", "salmo*", "espera en dios", "ansiedad sobre", "no rechaza", "no (lo|la|le) rechaza", "venid a mi", "descans*"] },
                { id: "medico", peso: 35, texto: "Reconociendo cuándo necesita ayuda médica: ir al médico no es falta de fe.", formas: ["medico", "medicos", "medicamento*", "medicina*", "terapia", "psicolog*", "profesional*", "doctor", "especialista*"] },
                { id: "pecado", peso: 30, negativa: true, texto: "Recordándole que la depresión no siempre es fruto de un pecado, y que los fieles de la Biblia también se abatieron.", formas: ["no siempre", "no es fruto", "no es culpa", "no es por (su|un) pecado", "fieles tambien", "tambien (los|a los) fieles", "salmista", "tambien conocieron", "llega tambien", "llegan tambien"] },
              ],
              errores: [
                { id: "dejar-medicina", texto: "Tomar un medicamento recetado o ir a terapia no es falta de fe.", formas: ["(deje|dejar|deja|dejes) (el|los|su|sus) (medicamento*|tratamiento|medicina*|pastilla*)", "no (vaya|ir|vayas|necesita) (al|el|un) medico"], anula: "medico" },
              ],
              modelo: "Lo acompañaría con la Palabra y la oración, porque Dios no rechaza al abatido. Le diría que la depresión no siempre es fruto de un pecado, y lo ayudaría a buscar un médico, porque ir al médico no es falta de fe.",
            },
          },
          {
            apoyo: "El consejero acompaña con la Palabra y la oración, y reconoce cuándo hace falta ayuda médica",
            clave: {
              id: "pr-pastoral-2-4-a7-2",
              tipo: "corta",
              pregunta: "Un joven te pide ayuda porque la ansiedad lo tiene mal. ¿Cómo lo acompañas con la Palabra, con la oración y con la ayuda adecuada?",
              ideas: [
                { id: "palabra", peso: 34, texto: "Con la Palabra: puede echar su ansiedad sobre Dios, que tiene cuidado de él.", formas: ["echar* (su|la|toda) ansiedad", "ansiedad sobre", "tiene cuidado", "cuida de", "paz de dios", "espera en dios", "venid a mi", "descans*", "sobrepasa", "filipenses", "pedro", "mateo", "salmo*"] },
                { id: "oracion", peso: 33, texto: "Con la oración: orar con él, con acción de gracias.", formas: ["(ora|orar|orare|oraria|oro|ore|oramos|orariamos|orando|orara|oren) con el", "(ora|orar|orare|oraria|oro|ore|oramos|orariamos|orando|orara|oren) juntos", "oramos", "orariamos", "accion de gracias", "peticiones", "orar", "oracion"] },
                { id: "ayuda", peso: 33, texto: "Con la ayuda adecuada: si hay pánico o la ansiedad no lo deja funcionar, un médico.", formas: ["medico", "medicos", "medicamento*", "medicina*", "terapia", "psicolog*", "profesional*", "doctor", "especialista*"] },
              ],
              modelo: "Le mostraría con la Palabra que puede echar toda su ansiedad sobre Dios, porque él tiene cuidado de nosotros. Oraríamos juntos con acción de gracias, y si tiene pánico o la ansiedad no lo deja funcionar, lo ayudaría a ver a un médico.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La reconciliación
    "pastoral-2-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De dónde nacen muchas consultas pastorales?", reverso: "De un conflicto: entre esposos, entre hermanos de la iglesia o en una familia.", apoyo: "Muchas consultas pastorales nacen de un conflicto" },
              { frente: "Según Jesús, ¿qué se deja delante del altar para ir a reconciliarse?", reverso: "La ofrenda: «deja allí tu ofrenda delante del altar».", apoyo: "Jesús puso la paz con el hermano antes que el culto" },
              { frente: "¿Qué pide Pablo en Romanos 12:18?", reverso: "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres».", apoyo: "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres»" },
              { frente: "¿Qué se hace con lo que depende de uno?", reverso: "Se hace, aunque no siempre todo depende de uno.", apoyo: "No siempre depende de uno, pero lo que depende de uno se hace" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pone Dios antes que la ofrenda?", reverso: "La reconciliación.", apoyo: "Dios pone la reconciliación antes que la ofrenda" },
              { frente: "Según Efesios 4:31, ¿qué hay que dejar?", reverso: "«toda amargura, enojo, ira, gritería y maledicencia».", apoyo: "El camino pasa por dejar «toda amargura, enojo, ira, gritería y maledicencia»" },
              { frente: "¿Cómo nos perdonamos unos a otros?", reverso: "«como Dios también os perdonó a vosotros en Cristo».", apoyo: "«misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo»" },
              { frente: "¿En qué libro resume Ken Sande el camino de la reconciliación?", reverso: "En Pacificadores, con cuatro pasos.", apoyo: "Ken Sande, en su libro Pacificadores, resume el camino en cuatro pasos" },
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
            consigna: "Completa por qué la reconciliación va primero.",
            texto: "Jesús enseñó a dejar la [[ofrenda]] delante del [[altar]] e ir primero a buscar la [[paz]] con el hermano.",
            distractores: ["Biblia", "pueblo", "pelea"],
            errores: {
              Biblia: "Jesús habló de dejar la ofrenda delante del altar: la reconciliación va antes que la ofrenda.",
              pueblo: "La ofrenda se deja delante del altar.",
              pelea: "Se va primero a buscar la paz con el hermano: «reconcíliate primero con tu hermano».",
            },
            apoyo: "Jesús puso la paz con el hermano antes que el culto",
            ref: "Mateo 5:23-24",
            explica: "Jesús puso la paz con el hermano antes que el culto: «deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano».",
          },
          {
            consigna: "Completa lo que pide Pablo para estar en paz.",
            texto: "Pablo pide estar en [[paz]] con todos en lo que [[dependa]] de nosotros, dejando la [[amargura]] y perdonando como Dios nos perdonó.",
            distractores: ["guerra", "convenga", "humildad"],
            errores: {
              guerra: "Pablo pide estar en paz con todos los hombres.",
              convenga: "Pablo pide estar en paz en cuanto dependa de nosotros: lo que depende de uno se hace.",
              humildad: "El camino pasa por dejar toda amargura, enojo, ira, gritería y maledicencia.",
            },
            apoyo: "Pablo pide estar en paz con todos en lo que dependa de nosotros, dejando la amargura y perdonando como Dios nos perdonó",
            ref: "Romanos 12:18",
            explica: "Pablo es realista: «Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres». El camino pasa por dejar la amargura y perdonar como Dios nos perdonó en Cristo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para ayudar a dos personas a reconciliarse, del primero al último.",
            pasos: [
              "Escuchar a cada parte por separado, sin tomar partido antes de tiempo",
              "Ayudar a cada uno a ver primero su propia parte de la culpa",
              "Guiar a pedir perdón con claridad y sin excusas, y a perdonar",
              "Acordar pasos concretos para reparar el daño y cambiar",
              "Acompañar después: la confianza se reconstruye con el tiempo",
            ],
            apoyo: "Cómo ayudar a reconciliar",
            explica: "El consejero escucha a cada parte por separado, ayuda a cada uno a ver su propia culpa, guía a pedir perdón y a perdonar, acuerda pasos concretos y acompaña después, porque la confianza se reconstruye con el tiempo.",
          },
          {
            consigna: "Ken Sande resume el camino en cuatro pasos. Ordénalos del primero al último.",
            pasos: [
              "Glorificar a Dios en el conflicto",
              "Sacar primero la viga del propio ojo",
              "Restaurar con mansedumbre",
              "Reconciliarse",
            ],
            apoyo: "Ken Sande, en su libro Pacificadores, resume el camino en cuatro pasos",
            ref: "Mateo 7:5",
            explica: "Ken Sande, en Pacificadores, resume el camino así: glorificar a Dios en el conflicto, sacar primero la viga del propio ojo (Mateo 7:5), restaurar con mansedumbre y reconciliarse.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El consejero escucha a cada parte, ayuda a cada uno a ver su propia culpa, guía a pedir perdón y a perdonar, acuerda pasos y acompaña",
            ref: "Mateo 5:23-24",
            titulo: "Dos socios que no se hablan",
            relato: [
              "Eres pastor. Rubén y Daniel, dos hermanos de la iglesia, tenían juntos un taller de pintura. Hace tres meses pelearon por unos clientes y desde entonces no se hablan.",
              "Los dos siguen viniendo a los cultos, pero se sientan lejos y no se saludan. Rubén te pide ayuda.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo empiezas a ayudarlos?",
                opciones: [
                  { texto: "Escuchas a cada uno por separado, sin tomar partido todavía.", bien: true, explica: "Primero se escucha a cada parte por separado, sin tomar partido antes de tiempo." },
                  { texto: "Los citas a los dos juntos, para que discutan ahí delante de ti.", explica: "El primer paso es escuchar a cada parte por separado." },
                  { texto: "Le das la razón a Rubén, porque fue el primero en buscarte.", explica: "No se toma partido antes de tiempo: primero se escucha a cada parte." },
                ],
                apoyo: "Escuchar a cada parte por separado, sin tomar partido antes de tiempo",
                explica: "El primer paso es escuchar a cada parte por separado, sin tomar partido antes de tiempo.",
              },
              {
                tipo: "situacion",
                pregunta: "Rubén te dice: Yo no hice nada malo; todo es culpa de Daniel. ¿Qué haces?",
                opciones: [
                  { texto: "Lo ayudas a ver primero su propia parte de la culpa.", bien: true, explica: "Se ayuda a cada uno a ver primero su propia parte de la culpa: sacar primero la viga del propio ojo." },
                  { texto: "Le das la razón, para que se calme y siga viniendo.", explica: "Dar la razón antes de tiempo es tomar partido: cada uno ve primero su propia parte." },
                  { texto: "Le dices que, entonces, no hay nada que hacer con Daniel.", explica: "Lo que depende de uno se hace: el camino empieza por ver la propia parte de la culpa." },
                ],
                apoyo: "Ayudar a cada uno a ver primero su propia parte de la culpa",
                explica: "Como enseña Mateo 7:5, cada uno saca primero la viga de su propio ojo: ve primero su propia parte de la culpa.",
              },
              {
                tipo: "situacion",
                pregunta: "Daniel quiere pedir perdón y ensaya: Perdón, pero es que tú me provocaste. ¿Cómo lo guías?",
                opciones: [
                  { texto: "A pedir perdón con claridad y sin excusas.", bien: true, explica: "Se guía a pedir perdón con claridad y sin excusas, y a perdonar." },
                  { texto: "A esperar a que Rubén le pida perdón primero.", explica: "Lo que depende de uno se hace: no hay que esperar al otro." },
                  { texto: "A decirlo así, porque al menos ya pide perdón.", explica: "Un perdón con excusas no es claro: se pide perdón sin excusas." },
                ],
                apoyo: "Guiar a pedir perdón con claridad y sin excusas, y a perdonar",
                explica: "El consejero guía a pedir perdón con claridad y sin excusas, y a perdonar.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya se pidieron perdón y se perdonaron. ¿Qué sigue?",
                opciones: [
                  { texto: "Acordar pasos concretos para reparar el daño y cambiar.", bien: true, explica: "Después del perdón se acuerdan pasos concretos para reparar el daño y cambiar." },
                  { texto: "Nada más: con el perdón ya quedó todo resuelto entre ellos.", explica: "Después del perdón se acuerdan pasos concretos, y después se acompaña." },
                  { texto: "Pedirles que no vuelvan a hablar del tema nunca más en la vida.", explica: "Se acuerdan pasos concretos para reparar el daño y cambiar." },
                ],
                apoyo: "Acordar pasos concretos para reparar el daño y cambiar",
                explica: "El consejero acuerda con ellos pasos concretos para reparar el daño y cambiar.",
              },
              {
                tipo: "explica",
                apoyo: "Acompañar después: la confianza se reconstruye con el tiempo",
                clave: {
                  id: "pr-pastoral-2-5-a4-1",
                  tipo: "corta",
                  pregunta: "Rubén te pregunta por qué todavía no confía del todo en Daniel, si ya se perdonaron. ¿Qué le respondes, y qué harás tú?",
                  ideas: [
                    { id: "tiempo", peso: 50, texto: "Que la confianza se reconstruye con el tiempo.", formas: ["con el tiempo", "toma tiempo", "lleva tiempo", "requiere tiempo", "necesita tiempo", "poco a poco", "reconstru*", "se (recupera|gana|construye) con"] },
                    { id: "acompanar", peso: 50, texto: "Que yo los seguiré acompañando después.", formas: ["acompan*", "seguir* cerca", "estare cerca", "estare pendiente", "(los|lo) (visitare|llamare|buscare|seguire|vere)", "seguire con ellos", "seguire a su lado"] },
                  ],
                  errores: [
                    { id: "ya", texto: "La confianza no vuelve de golpe: se reconstruye con el tiempo.", formas: ["debe confiar (ya|enseguida|inmediatamente)", "tiene que confiar (ya|enseguida|inmediatamente)", "confiar (ya|enseguida) en el"], anula: "tiempo" },
                  ],
                  modelo: "Le respondo que la confianza se reconstruye con el tiempo, aunque ya se hayan perdonado. Yo los seguiré acompañando después, para que cumplan los pasos que acordaron para reparar el daño y cambiar.",
                },
              },
            ],
          },
          {
            apoyo: "Muchas consultas pastorales nacen de un conflicto: entre esposos, entre hermanos de la iglesia o en una familia",
            titulo: "Un padre y su hijo",
            relato: [
              "Eres pastor. Don Felipe y su hijo Marcos, los dos de la iglesia, no se hablan desde hace un año.",
              "Marcos dejó el negocio de la familia sin avisar, y don Felipe lo humilló delante de todos en una reunión familiar. La familia te pide ayuda.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Don Felipe te llama primero y quiere contarte su versión. ¿Qué haces?",
                opciones: [
                  { texto: "Lo escuchas a él, y después escuchas a Marcos por separado.", bien: true, explica: "Se escucha a cada parte por separado, sin tomar partido antes de tiempo." },
                  { texto: "Le dices que ya sabes quién tiene la culpa, sin oír a Marcos.", explica: "No se toma partido antes de tiempo: se escucha a cada parte." },
                  { texto: "Le pides que lo cuente en la iglesia, delante de los hermanos.", explica: "Se escucha a cada parte por separado." },
                ],
                apoyo: "Escuchar a cada parte por separado, sin tomar partido antes de tiempo",
                explica: "El primer paso es escuchar a cada parte por separado, sin tomar partido antes de tiempo.",
              },
              {
                tipo: "situacion",
                pregunta: "Marcos te dice: Mi papá me humilló; yo no tengo nada que reconocer. ¿Qué haces?",
                opciones: [
                  { texto: "Lo ayudas a ver también su parte: dejó el negocio sin avisar.", bien: true, explica: "Se ayuda a cada uno a ver primero su propia parte de la culpa." },
                  { texto: "Le dices que tiene toda la razón y que no tiene que pedir perdón.", explica: "Cada uno ve primero su propia parte de la culpa: sacar primero la viga del propio ojo." },
                  { texto: "Le dices que su papá no va a cambiar, y que mejor se olvide de él.", explica: "Lo que depende de uno se hace: el camino empieza por ver la propia parte." },
                ],
                apoyo: "Ayudar a cada uno a ver primero su propia parte de la culpa",
                explica: "Cada uno saca primero la viga de su propio ojo (Mateo 7:5): ve primero su propia parte de la culpa.",
              },
              {
                tipo: "situacion",
                pregunta: "Don Felipe acepta pedir perdón, pero quiere mandar un mensaje sin nombrar lo que hizo. ¿Cómo lo guías?",
                opciones: [
                  { texto: "A pedir perdón con claridad por haberlo humillado, sin excusas.", bien: true, explica: "Se guía a pedir perdón con claridad y sin excusas, y a perdonar." },
                  { texto: "A mandar el mensaje así, porque lo importante es que dé el paso.", explica: "El perdón se pide con claridad: nombrando lo que se hizo, sin excusas." },
                  { texto: "A esperar a que Marcos le pida perdón primero, por ser el hijo.", explica: "Lo que depende de uno se hace: no se espera a que el otro empiece." },
                ],
                apoyo: "Guiar a pedir perdón con claridad y sin excusas, y a perdonar",
                explica: "El perdón se pide con claridad y sin excusas, y se guía también a perdonar.",
              },
              {
                tipo: "situacion",
                pregunta: "Los dos se perdonaron. ¿Qué acuerdas con ellos?",
                opciones: [
                  { texto: "Pasos concretos, como volver a hablarse cada semana.", bien: true, explica: "Se acuerdan pasos concretos para reparar el daño y cambiar." },
                  { texto: "Que se olviden del tema y sigan como si nada hubiera pasado.", explica: "Después del perdón se acuerdan pasos concretos para reparar el daño y cambiar." },
                  { texto: "Que Marcos vuelva al negocio, aunque él no quiera hacerlo.", explica: "Los pasos se acuerdan con los dos, para reparar el daño y cambiar." },
                ],
                apoyo: "Acordar pasos concretos para reparar el daño y cambiar",
                explica: "El consejero acuerda pasos concretos para reparar el daño y cambiar, y después acompaña.",
              },
              {
                tipo: "explica",
                apoyo: "El consejero escucha a cada parte, ayuda a cada uno a ver su propia culpa, guía a pedir perdón y a perdonar, acuerda pasos y acompaña",
                clave: {
                  id: "pr-pastoral-2-5-a4-2",
                  tipo: "corta",
                  pregunta: "Escribe, en orden, los pasos que seguiste para ayudar a don Felipe y a Marcos a reconciliarse.",
                  ideas: [
                    { id: "escuchar", peso: 34, texto: "Escuché a cada uno por separado, sin tomar partido, y lo ayudé a ver su propia parte de la culpa.", formas: ["por separado", "a cada uno", "cada parte", "sin tomar partido", "propia (parte|culpa)", "su parte", "su culpa", "escuch*"] },
                    { id: "perdon", peso: 33, texto: "Los guié a pedir perdón con claridad y sin excusas, y a perdonar.", formas: ["pedir perdon", "pid* perdon", "pedirse perdon", "perdon con claridad", "sin excusas", "a perdonar", "se perdonaran", "perdonarse", "perdonaran"] },
                    { id: "pasos", peso: 33, texto: "Acordamos pasos concretos y los acompañé después.", formas: ["pasos concretos", "un paso", "acord*", "acompan*", "repar*"] },
                  ],
                  modelo: "Primero escuché a cada uno por separado, sin tomar partido, y los ayudé a ver su propia parte de la culpa. Después los guié a pedir perdón con claridad y sin excusas, y a perdonar. Al final acordamos pasos concretos y los acompañé después.",
                },
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
            consigna: "¿Es propio del perdón o de la reconciliación? Lleva cada frase a su grupo.",
            grupos: ["El perdón", "La reconciliación"],
            frases: [
              { texto: "Depende de uno", grupo: 0 },
              { texto: "Se da porque Dios nos perdonó", grupo: 0 },
              { texto: "Una víctima de abuso puede perdonar sin ponerse en peligro", grupo: 0 },
              { texto: "Necesita a los dos", grupo: 1 },
              { texto: "Pide un cambio real", grupo: 1 },
              { texto: "La confianza se reconstruye con el tiempo", grupo: 1 },
            ],
            apoyo: "El perdón depende de uno y se da porque Dios nos perdonó. La reconciliación necesita a los dos y un cambio real",
            explica: "El perdón depende de uno y se da porque Dios nos perdonó; por eso una víctima de abuso puede perdonar sin volver a ponerse en peligro. La reconciliación necesita a los dos y un cambio real, y la confianza se reconstruye con el tiempo.",
          },
          {
            consigna: "¿Muestra un perdón o una reconciliación? Lleva cada frase a su grupo.",
            grupos: ["Perdón", "Reconciliación"],
            frases: [
              { texto: "Ana perdona a una amiga que nunca le pidió perdón", grupo: 0 },
              { texto: "Una víctima de abuso perdona, sin volver a ponerse en peligro", grupo: 0 },
              { texto: "Luis perdona a su vecino, aunque el vecino no quiere hablarle", grupo: 0 },
              { texto: "Dos hermanos que pelearon vuelven a trabajar juntos después de cambiar", grupo: 1 },
              { texto: "Dos amigos se piden perdón y acuerdan pasos para reparar el daño", grupo: 1 },
              { texto: "Dos esposos recuperan la confianza poco a poco, con el tiempo", grupo: 1 },
            ],
            apoyo: "Perdonar no es lo mismo que reconciliarse",
            explica: "Perdonar depende de uno: se puede perdonar aunque el otro no pida perdón ni cambie, y una víctima de abuso puede perdonar sin ponerse en peligro. La reconciliación necesita a los dos y un cambio real.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana te dice: Mi esposo me golpeó otra vez. Dice que, si soy cristiana, tengo que perdonarlo y volver a la casa.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que puede perdonar sin volver a ponerse en peligro.", bien: true, explica: "Una víctima de abuso puede perdonar sin volver a ponerse en peligro: el pastor nunca le pide que regrese a una situación de violencia." },
              { texto: "Que perdonar es volver a la casa y seguir como antes.", explica: "Perdonar no es lo mismo que reconciliarse: la reconciliación necesita a los dos y un cambio real." },
              { texto: "Que no puede perdonarlo hasta que él le pida perdón.", explica: "El perdón depende de uno y se da porque Dios nos perdonó." },
              { texto: "Que vuelva a la casa y ore para que él cambie pronto.", explica: "El pastor nunca le pide a una víctima que regrese a una situación de violencia." },
            ],
            apoyo: "Una víctima de abuso puede perdonar sin volver a ponerse en peligro: el pastor nunca le pide que regrese a una situación de violencia",
            explica: "Perdonar no es lo mismo que reconciliarse. El perdón depende de uno; la reconciliación necesita a los dos y un cambio real, y nunca se le pide a una víctima volver a la violencia.",
          },
          {
            caso: "Un joven te dice: Ya perdoné a mi amigo, pero él no quiere hablarme. ¿Entonces no lo perdoné de verdad?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que sí: el perdón depende de él, y la reconciliación, de los dos.", bien: true, explica: "El perdón depende de uno; la reconciliación necesita a los dos y un cambio real." },
              { texto: "Que no: si su amigo no se reconcilia con él, su perdón no cuenta nada.", explica: "Perdonar no es lo mismo que reconciliarse: el perdón depende de uno." },
              { texto: "Que obligue a su amigo a hablarle, para que su perdón sí valga.", explica: "La reconciliación necesita a los dos: no se obliga al otro." },
              { texto: "Que retire su perdón hasta que su amigo decida hablarle otra vez.", explica: "El perdón se da porque Dios nos perdonó, no porque el otro responda." },
            ],
            apoyo: "El perdón depende de uno y se da porque Dios nos perdonó. La reconciliación necesita a los dos y un cambio real",
            explica: "Perdonar no es lo mismo que reconciliarse: el perdón depende de uno, y la reconciliación necesita a los dos. Lo que depende de uno se hace.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Perdonar no es lo mismo que reconciliarse",
            clave: {
              id: "pr-pastoral-2-5-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencia el perdón de la reconciliación?",
              ideas: [
                { id: "perdon", peso: 50, texto: "El perdón depende de uno y se da porque Dios nos perdonó.", formas: ["depende de uno", "depende de mi", "depende de cada", "depende de una", "depende de quien", "depende solo de", "dios nos perdono", "porque dios (nos|me|te|lo) perdono", "uno solo"] },
                { id: "reconciliacion", peso: 50, texto: "La reconciliación necesita a los dos y un cambio real.", formas: ["a los dos", "de los dos", "ambos", "las dos partes", "ambas partes", "cambio real", "un cambio"] },
              ],
              errores: [
                { id: "perdon-dos", texto: "El perdón depende de uno; la que necesita a los dos es la reconciliación.", formas: ["perdon (necesita|requiere|pide) (a|de) (los|ambos)", "perdon depende de (los|ambos)", "perdonar (necesita|requiere) (a|de) (los|ambos)"], anula: "perdon" },
                { id: "reconciliacion-uno", texto: "La reconciliación necesita a los dos; lo que depende de uno es el perdón.", formas: ["reconciliacion depende de uno", "reconciliacion depende solo", "reconciliarse depende de uno"], anula: "reconciliacion" },
              ],
              modelo: "El perdón depende de uno y se da porque Dios nos perdonó. La reconciliación, en cambio, necesita a los dos y un cambio real; por eso se puede perdonar aunque todavía no haya reconciliación.",
            },
          },
          {
            apoyo: "Una víctima de abuso puede perdonar sin volver a ponerse en peligro",
            clave: {
              id: "pr-pastoral-2-5-a7-2",
              tipo: "corta",
              pregunta: "Una víctima de abuso te pregunta si perdonar significa volver con quien la dañó. ¿Qué le respondes?",
              ideas: [
                { id: "peligro", peso: 50, negativa: true, texto: "Que puede perdonar sin volver a ponerse en peligro: nunca se le pide volver a la violencia.", formas: ["sin volver", "sin poner* en peligro", "no tiene que volver", "no tienes que volver", "no debe volver", "no debes volver", "nunca (le|te) pedire", "no (significa|es) volver", "no (volver|regresar|vuelva|vuelvas|regrese|regreses)", "peligro", "violencia"] },
                { id: "distintos", peso: 50, texto: "Que perdonar no es lo mismo que reconciliarse: la reconciliación necesita a los dos y un cambio real.", formas: ["no es lo mismo", "reconcili*", "a los dos", "cambio real", "un cambio"] },
              ],
              errores: [
                { id: "volver", texto: "El pastor nunca le pide a una víctima que regrese a una situación de violencia.", formas: ["(debe|debes) volver", "(debe|debes|tiene|tienes) que volver", "si (significa|es) volver", "perdonar es volver"], anula: "peligro" },
              ],
              modelo: "Le respondo que no: perdonar no es lo mismo que reconciliarse. Puede perdonar sin volver a ponerse en peligro, y yo nunca le pediré que regrese a una situación de violencia. La reconciliación necesita a los dos y un cambio real.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La confidencialidad, la derivación y los límites
    "pastoral-2-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es el corazón de la consejería?", reverso: "La confianza.", apoyo: "La confianza es el corazón de la consejería" },
              { frente: "Según Proverbios 11:13, ¿qué hace el que anda en chismes?", reverso: "«descubre el secreto».", apoyo: "«El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo»" },
              { frente: "¿Puede el pastor compartir lo que oye en consejería como motivo de oración?", reverso: "No, sin permiso de la persona.", apoyo: "El pastor no comparte lo que oye en consejería, ni siquiera como motivo de oración, sin permiso" },
              { frente: "En Texas, ¿quién está obligado a denunciar el abuso de un menor?", reverso: "Toda persona que lo sospeche.", apoyo: "En Texas, toda persona que sospeche el abuso de un menor está obligada a denunciarlo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuándo tiene límites la confidencialidad?", reverso: "Cuando hay riesgo de suicidio, peligro para otra persona o abuso de un menor o de un anciano.", apoyo: "La confidencialidad tiene límites cuando hay riesgo de suicidio, peligro para otra persona o abuso de un menor o de un anciano" },
              { frente: "¿Cómo se guardan las notas de una consulta?", reverso: "Con lo esencial anotado con discreción, en un lugar seguro.", apoyo: "Anotar lo esencial con discreción y guardarlo en un lugar seguro" },
              { frente: "¿Es lo mismo derivar que abandonar?", reverso: "No: el pastor sigue acompañando mientras el profesional atiende lo que le toca.", apoyo: "Derivar no es abandonar" },
              { frente: "¿Qué se explica al comienzo de una consulta?", reverso: "Qué se guarda en confidencia y qué no.", apoyo: "Explicar al comienzo qué se guarda en confidencia y qué no" },
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
            consigna: "Según Proverbios 11:13, ¿qué hace el de espíritu fiel? Toca las palabras que lo dicen.",
            texto: "El que anda en chismes descubre el secreto; Mas el de espíritu fiel [[lo guarda todo]]",
            apoyo: "La Palabra condena el chisme",
            ref: "Proverbios 11:13",
            explica: "La Palabra condena el chisme: el de espíritu fiel lo guarda todo. Por eso el pastor no comparte lo que oye en consejería sin permiso.",
          },
          {
            consigna: "¿A quiénes manda salvar Proverbios 24:11? Toca las palabras que lo dicen.",
            texto: "Libra a los que son llevados a la muerte; Salva a los que están [[en peligro de muerte]]",
            apoyo: "Pero hay situaciones en que callar sería dejar a alguien en peligro",
            ref: "Proverbios 24:11",
            explica: "«Salva a los que están en peligro de muerte»: por eso la confidencialidad tiene límites cuando hay riesgo de suicidio, peligro para otra persona o abuso de un menor o de un anciano.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la confidencialidad tiene un error. Tócala.",
            frases: [
              "El de espíritu fiel guarda el secreto.",
              "El chisme destruye la confianza.",
              "El pastor puede compartir lo que oye en consejería como motivo de oración, sin permiso.",
              "La confidencialidad tiene límites cuando hay riesgo de suicidio.",
            ],
            malo: 2,
            correccion: "El pastor no comparte lo que oye en consejería, ni siquiera como motivo de oración, sin permiso.",
            apoyo: "El pastor no comparte lo que oye en consejería, ni siquiera como motivo de oración, sin permiso",
            explica: "El pastor guarda las confidencias, porque el chisme destruye la confianza: no comparte lo que oye, ni siquiera como motivo de oración, sin permiso.",
          },
          {
            consigna: "Una de estas frases sobre los límites de la confidencialidad tiene un error. Tócala.",
            frases: [
              "Guardar un secreto es fidelidad, pero callar un peligro no lo es.",
              "La confidencialidad tiene límites cuando otra persona está en peligro.",
              "En Texas, solo los pastores están obligados a denunciar el abuso de un menor.",
              "El abuso de un anciano es un límite de la confidencialidad.",
            ],
            malo: 2,
            correccion: "En Texas, toda persona que sospeche el abuso de un menor está obligada a denunciarlo.",
            apoyo: "En Texas, toda persona que sospeche el abuso de un menor está obligada a denunciarlo",
            explica: "En Texas, la obligación de denunciar el abuso de un menor es de toda persona que lo sospeche, no solo de los pastores.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu primo, que es de tu iglesia, te dice: Pastor, mi esposa y yo estamos muy mal. Queremos que usted mismo nos aconseje.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Por ser tan cercanos, buscas que los aconseje otro pastor, y sigues cerca.", bien: true, explica: "Se deriva cuando hay un conflicto de intereses o una relación muy cercana con la persona. Derivar no es abandonar: el pastor sigue acompañando." },
              { texto: "Los aconsejas tú solo, porque nadie en toda la iglesia los conoce mejor que tú.", explica: "Una relación muy cercana con la persona es una razón para derivar." },
              { texto: "Le dices que no metan a la iglesia en eso y que lo arreglen en familia.", explica: "El amor sabe cuándo otro puede ayudar mejor: se deriva, y se sigue acompañando." },
              { texto: "Los aconsejas, y les cuentas a tus tíos lo que oyes, para que te ayuden.", explica: "El pastor no comparte lo que oye en consejería sin permiso." },
            ],
            apoyo: "Cuando hay un conflicto de intereses o una relación muy cercana con la persona",
            explica: "Una relación muy cercana con la persona es una de las razones para derivar. El pastor busca que otro los aconseje y sigue acompañando en oración y en la vida de la iglesia.",
          },
          {
            caso: "Un hermano te dice: Mi hijo está detenido y tengo que enfrentar un juicio. Pastor, ¿usted me puede llevar el caso?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo acompañarás en oración, y que para el juicio busque un profesional.", bien: true, explica: "Se deriva cuando hay asuntos legales, y derivar no es abandonar: el pastor sigue acompañando en oración." },
              { texto: "Que tú le vas a llevar el caso, porque conoces muy bien a toda su familia.", explica: "Los asuntos legales son una razón para derivar: el caso supera la preparación del pastor." },
              { texto: "Que eso es asunto del mundo, y que la iglesia no se mete nunca en juicios.", explica: "Derivar no es abandonar: el pastor acompaña en oración y en la vida de la iglesia." },
              { texto: "Que no busque a nadie más: con la oración, el juicio se va a arreglar solo.", explica: "Los asuntos legales piden un profesional; la oración acompaña, no lo reemplaza." },
            ],
            apoyo: "Cuando hay violencia en el hogar o asuntos legales",
            explica: "Los asuntos legales son una razón para derivar a un profesional. Derivar no es abandonar: el pastor sigue acompañando en oración y en la vida de la iglesia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cuándo se deriva a un profesional.",
            texto: "Se deriva cuando hay riesgo para la [[vida]] de la persona o de otros, o una [[adicción]] o un [[trauma]] que piden tratamiento.",
            distractores: ["fama", "amistad", "regalo"],
            errores: {
              fama: "Se deriva cuando hay riesgo para la vida de la persona o de otros.",
              amistad: "Una adicción que pide tratamiento es una razón para derivar.",
              regalo: "Un trauma que pide tratamiento es una razón para derivar.",
            },
            apoyo: "Cuando hay una enfermedad mental, una adicción o un trauma que piden tratamiento",
            explica: "Se deriva cuando hay riesgo para la vida de la persona o de otros, y cuando hay una enfermedad mental, una adicción o un trauma que piden tratamiento.",
          },
          {
            consigna: "Completa otras razones para derivar.",
            texto: "Se deriva cuando hay [[violencia]] en el hogar, cuando el caso supera tu [[tiempo]] o cuando hay una relación muy [[cercana]] con la persona.",
            distractores: ["alegría", "edad", "lejana"],
            errores: {
              "alegría": "Se deriva cuando hay violencia en el hogar o asuntos legales.",
              edad: "Se deriva cuando el caso supera tu preparación o tu tiempo.",
              lejana: "Se deriva cuando hay un conflicto de intereses o una relación muy cercana con la persona.",
            },
            apoyo: "Cuando el caso supera tu preparación o tu tiempo",
            explica: "También se deriva cuando hay violencia en el hogar o asuntos legales, cuando el caso supera tu preparación o tu tiempo, y cuando hay un conflicto de intereses o una relación muy cercana con la persona.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El consejero deriva cuando el caso lo supera, explica desde el principio qué guarda y qué no, aconseja con prudencia y a la vista, y sigue acompañando",
            ref: "Proverbios 11:13",
            situacion: "Eres pastor de una iglesia mediana, y esta semana tienes varias consultas en tu oficina.",
            escenas: [
              {
                id: "e1",
                narra: "Una hermana de la iglesia te pide verla a solas el viernes a las diez de la noche, cuando el templo está vacío.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le propones otro horario, con otra persona cerca de la oficina.", valor: 2, explica: "Con una persona del otro sexo se buscan horarios y lugares prudentes, o que haya otra persona presente." },
                  { texto: "Aceptas, porque a esa hora nadie los va a interrumpir para nada.", valor: 0, explica: "Con una persona del otro sexo se buscan horarios y lugares prudentes, o que haya otra persona presente." },
                  { texto: "Aceptas la hora, pero dejas abierta la puerta de la oficina.", valor: 1, explica: "Ayuda, pero a esa hora el templo está vacío: con una persona del otro sexo se buscan horarios prudentes, o que haya otra persona presente." },
                ],
              },
              {
                id: "e2",
                narra: "El lunes llega un joven a su primera consulta contigo.",
                pregunta: "¿Qué le explicas al comenzar?",
                opciones: [
                  { texto: "Qué guardarás en confidencia y qué no podrás guardar.", valor: 2, explica: "Al comienzo se explica qué se guarda en confidencia y qué no." },
                  { texto: "Que todo lo que diga quedará en secreto, pase lo que pase.", valor: 0, explica: "La confidencialidad tiene límites: se explica al comienzo qué se guarda y qué no." },
                  { texto: "Nada: los límites se explican solo si aparece algún peligro.", valor: 0, explica: "Los límites de la confidencia se explican desde el principio." },
                ],
              },
              {
                id: "e3",
                narra: "Terminó la consulta y quieres recordar lo que hablaron.",
                pregunta: "¿Qué haces con tus notas?",
                opciones: [
                  { texto: "Anotas lo esencial con discreción y lo guardas en lugar seguro.", valor: 2, explica: "Se anota lo esencial con discreción y se guarda en un lugar seguro." },
                  { texto: "Escribes todo con mucho detalle y lo dejas encima de tu escritorio.", valor: 0, explica: "Se anota lo esencial, con discreción, y se guarda en un lugar seguro." },
                  { texto: "Mandas un resumen al grupo de los líderes, para que estén al tanto.", valor: 0, explica: "El pastor no comparte lo que oye en consejería sin permiso." },
                ],
              },
              {
                id: "e4",
                narra: "Un caso te tiene confundido y no sabes cómo seguir.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Pides supervisión o consejo a otro pastor para seguir bien.", valor: 2, explica: "Cuando hace falta, se pide supervisión o consejo a otro pastor." },
                  { texto: "Sigues tú solo, para que nadie piense que no sabes qué hacer.", valor: 0, explica: "Pedir supervisión o consejo a otro pastor es una medida que protege al aconsejado y al consejero." },
                  { texto: "Le cuentas el caso con nombres a un amigo tuyo que no es pastor.", valor: 0, explica: "El pastor no comparte lo que oye en consejería: pide supervisión o consejo a otro pastor." },
                ],
              },
            ],
          },
          {
            apoyo: "Explicar al comienzo qué se guarda en confidencia y qué no",
            ref: "Proverbios 24:11",
            situacion: "Eres pastor de una iglesia pequeña que todavía no tiene oficina, y varios hermanos te piden consejo.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano quiere hablar contigo después del culto.",
                pregunta: "¿Dónde lo atiendes?",
                opciones: [
                  { texto: "En el salón, a la vista de otros, aunque sin que los oigan.", valor: 2, explica: "Se aconseja en un lugar con visibilidad, o con otra persona cerca." },
                  { texto: "En tu carro, en un lugar apartado, para tener más privacidad.", valor: 0, explica: "Se aconseja en un lugar con visibilidad, o con otra persona cerca." },
                  { texto: "En tu casa, los dos solos, porque ahí se habla con más calma.", valor: 0, explica: "Se aconseja en un lugar con visibilidad, como una oficina con ventana o con otra persona cerca." },
                ],
              },
              {
                id: "e2",
                narra: "Al empezar, el hermano te pregunta: ¿Todo lo que le cuente quedará entre nosotros?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le explicas qué guardarás en confidencia y qué no.", valor: 2, explica: "Al comienzo se explica qué se guarda en confidencia y qué no." },
                  { texto: "Que sí, pase lo que pase y diga lo que diga, todo quedará ahí.", valor: 0, explica: "La confidencialidad tiene límites, y se explican al comienzo." },
                  { texto: "Que si hay algo grave, se lo vas a contar a toda la iglesia.", valor: 0, explica: "El pastor guarda las confidencias; al comienzo explica qué guarda y qué no." },
                ],
              },
              {
                id: "e3",
                narra: "Tus hijos encontraron en la mesa de la cocina tu cuaderno de notas de consejería.",
                pregunta: "¿Qué cambias?",
                opciones: [
                  { texto: "Desde ahora lo guardas en un lugar seguro.", valor: 2, explica: "Lo esencial se anota con discreción y se guarda en un lugar seguro." },
                  { texto: "Nada: en tu casa todos son de mucha confianza.", valor: 0, explica: "Las notas de consejería se guardan en un lugar seguro." },
                  { texto: "Dejas de anotar y confías solo en tu memoria.", valor: 1, explica: "Así nadie las lee, pero la medida es anotar lo esencial con discreción y guardarlo en un lugar seguro." },
                ],
              },
              {
                id: "e4",
                narra: "Una joven de la iglesia te escribe para pedirte consejo sobre su noviazgo.",
                pregunta: "¿Cómo la atiendes?",
                opciones: [
                  { texto: "En un horario prudente, en el salón y con otra persona presente.", valor: 2, explica: "Con una persona del otro sexo se buscan horarios y lugares prudentes, o que haya otra persona presente." },
                  { texto: "Le propones verse a solas en un café, de noche, para hablar mejor.", valor: 0, explica: "Con una persona del otro sexo se buscan horarios y lugares prudentes, o que haya otra persona presente." },
                  { texto: "Le respondes por mensajes privados, a cualquier hora de la noche.", valor: 0, explica: "Con una persona del otro sexo se buscan horarios y lugares prudentes." },
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
            apoyo: "Explicar al comienzo qué se guarda en confidencia y qué no",
            clave: {
              id: "pr-pastoral-2-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué le dirías a alguien, al empezar una consulta, sobre lo que guardarás en confidencia y lo que no?",
              ideas: [
                { id: "guardar", peso: 40, texto: "Que guardaré lo que me cuente y no lo compartiré sin su permiso.", formas: ["guard*", "sin (su|tu) permiso", "no lo (contare|compartire|dire|comentare)", "no se lo (contare|dire)", "entre nosotros", "confidencia*", "secreto", "permiso"] },
                { id: "riesgo", peso: 30, texto: "Que no podré guardarlo si hay riesgo de suicidio o peligro para otra persona.", formas: ["suicid*", "quitar* la vida", "riesgo", "peligro", "hacerse dano", "dano a (otro|otra|otros|alguien)"] },
                { id: "abuso", peso: 30, texto: "Ni si hay abuso de un menor o de un anciano.", formas: ["abus*", "(un|una|los|al|del|a|de) (menor|menores)", "nino*", "nina*", "anciano*", "maltrat*"] },
              ],
              errores: [
                { id: "todo", texto: "La confidencialidad tiene límites: no se promete guardar todo, pase lo que pase.", formas: ["pase lo que pase", "sin (ninguna|ningun) (excepcion|limite)"], anula: "riesgo" },
              ],
              modelo: "Le diría que guardaré en confidencia lo que me cuente y no lo compartiré sin su permiso. Pero no podré guardarlo si hay riesgo de suicidio, peligro para otra persona o abuso de un menor o de un anciano.",
            },
          },
          {
            apoyo: "aconseja con prudencia y a la vista",
            clave: {
              id: "pr-pastoral-2-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué medidas protegen al aconsejado y al consejero en la consejería pastoral?",
              ideas: [
                { id: "vista", peso: 34, texto: "Aconsejar en un lugar con visibilidad o con otra persona cerca, y con alguien del otro sexo, en horarios y lugares prudentes.", formas: ["visib*", "a la vista", "ventana", "otra persona (cerca|presente)", "alguien (cerca|presente)", "puerta abierta", "(puedan|pueden) ver", "(lo|los|nos|me|te) (vean|ven)", "lugar abierto", "lugar* prudente*", "horario* prudente*", "otro sexo"] },
                { id: "comienzo", peso: 33, texto: "Explicar al comienzo qué se guarda en confidencia y qué no.", formas: ["al (comienzo|principio|inicio|empezar)", "desde el (comienzo|principio|inicio)", "que se guarda", "que (guarda|guardara|guardare) y que no", "confidencia*"] },
                { id: "notas", peso: 33, texto: "Anotar lo esencial con discreción, guardarlo en un lugar seguro y pedir supervisión a otro pastor.", formas: ["anot*", "notas", "lugar seguro", "supervis*", "otro pastor", "consejo a otro"] },
              ],
              modelo: "Aconsejar en un lugar con visibilidad o con otra persona cerca, y con alguien del otro sexo buscar horarios prudentes. Explicar al comienzo qué se guarda en confidencia y qué no. Anotar lo esencial con discreción, guardarlo en un lugar seguro y pedir supervisión a otro pastor.",
            },
          },
        ],
      },
    ],
  },
};
