/**
 * Las prácticas de «Liderazgo cristiano I» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-liderazgo-1.ts), con la guía de docs/academia-practicas.md.
 * Quién puede ocupar cada cargo de la iglesia lo dice la declaración de fe (por confirmar): aquí no se pregunta.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_LIDERAZGO_1: PracticasMateria = {
  materia: "n3-liderazgo-1",
  mision: {
    titulo: "Líderes con la toalla de Jesús",
    intro:
      "Tu pastor te pidió que acompañes a los nuevos líderes de célula y de los equipos de servidores en su primer año. Te van a preguntar qué es liderar, qué carácter pide la Biblia, cómo servir sin abusar del poder, cómo cuidar su vida con Dios, cómo delegar y qué hacer con los conflictos y las decisiones. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes acompañar a otros a liderar como Jesús: sirviendo, con un carácter probado, rindiendo cuentas, con una vida con Dios que sostiene el ministerio, trabajando en equipo y formando a otros que continúen la obra. Tu grandeza en el reino se mide por tu servicio.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. ¿Qué es el liderazgo cristiano?
    "n3-liderazgo-1-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le pidieron Santiago y Juan a Jesús?", reverso: "Sentarse a su derecha y a su izquierda en su gloria.", apoyo: "Santiago y Juan le pidieron a Jesús sentarse a su derecha y a su izquierda en su gloria" },
              { frente: "¿Qué aprovechó Jesús para enseñar qué es ser grande en su reino?", reverso: "La discusión entre sus discípulos.", apoyo: "Jesús aprovechó la discusión para enseñar qué es ser grande en su reino" },
              { frente: "¿Qué hacen los gobernantes de las naciones, según Jesús?", reverso: "Jesús dijo que «se enseñorean de ellas».", apoyo: "Los gobernantes de las naciones «se enseñorean de ellas»" },
              { frente: "¿Qué será entre los discípulos el que quiera hacerse grande?", reverso: "Será «vuestro servidor».", apoyo: "El que quiera hacerse grande será «vuestro servidor»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es el liderazgo cristiano?", reverso: "Influir en las personas para que sigan a Cristo, sirviéndolas como él.", apoyo: "El liderazgo cristiano es influir en las personas para que sigan a Cristo y cumplan el propósito de Dios, sirviéndolas como él" },
              { frente: "¿Cómo se mide el liderazgo cristiano?", reverso: "Por cuántos crecen y por cuánto se parece el líder a Jesús.", apoyo: "sino por cuántos crecen y por cuánto se parece el líder a Jesús" },
              { frente: "Al desear servir en el liderazgo, ¿qué es lo que importa?", reverso: "El motivo.", apoyo: "Desear servir en el liderazgo es bueno, pero el motivo importa" },
              { frente: "¿De dónde viene la autoridad del líder cristiano?", reverso: "De Dios y de su vida, no de su cargo.", apoyo: "Su autoridad viene de Dios y de su vida, no de su cargo" },
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
            consigna: "Completa lo que Jesús enseñó sobre ser grande.",
            texto: "Jesús enseñó que el que quiera hacerse [[grande]] será servidor de los demás, porque él vino para [[servir]] y dar su [[vida]].",
            distractores: ["famoso", "mandar", "permiso"],
            errores: {
              famoso: "Jesús enseñó qué es ser grande en su reino: el que quiera hacerse grande será servidor.",
              mandar: "El Hijo del Hombre vino para servir, no para mandar.",
              permiso: "Jesús vino para servir y dar su vida.",
            },
            apoyo: "El que quiera hacerse grande será «vuestro servidor», porque el Hijo del Hombre vino para servir y dar su vida",
            ref: "Marcos 10:42-45",
            explica: "Los gobernantes de las naciones se enseñorean de ellas, pero entre los discípulos no será así: el que quiera hacerse grande será servidor, como el Hijo del Hombre, que vino para servir y dar su vida.",
          },
          {
            consigna: "Completa lo que enseña Pablo sobre el deseo de servir en el liderazgo.",
            texto: "Desear servir en el liderazgo es [[bueno]], pero el [[motivo]] importa: no se busca un lugar de honor, sino una [[obra]] al servicio de los demás.",
            distractores: ["malo", "título", "fama"],
            errores: {
              malo: "Pablo dice que el que anhela obispado, buena obra desea: desear servir es bueno.",
              "título": "Lo que importa es el motivo: no se busca un lugar de honor.",
              fama: "No se busca un lugar de honor, sino una obra, un trabajo al servicio de los demás.",
            },
            apoyo: "Desear servir en el liderazgo es bueno, pero el motivo importa",
            ref: "1 Timoteo 3:1",
            explica: "Pablo dice: «Si alguno anhela obispado, buena obra desea». Desear servir es bueno, pero el motivo importa: no se busca un lugar de honor, sino un trabajo al servicio de los demás.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el liderazgo cristiano tiene un error. Tócala.",
            frases: [
              "Liderar es influir en otros.",
              "El liderazgo cristiano se mide por cuántos obedecen al líder.",
              "El líder cristiano sirve a las personas como lo hizo Cristo.",
              "Un jefe manda desde arriba; el líder cristiano va delante con el ejemplo.",
            ],
            malo: 1,
            correccion: "No se mide por el título ni por cuántos obedecen, sino por cuántos crecen y por cuánto se parece el líder a Jesús.",
            apoyo: "No se mide por el título ni por cuántos obedecen, sino por cuántos crecen y por cuánto se parece el líder a Jesús",
            explica: "Liderar es influir en otros, y el liderazgo cristiano se mide por cuántos crecen y por cuánto se parece el líder a Jesús, no por cuántos obedecen.",
          },
          {
            consigna: "Una de estas frases sobre lo que enseñó Jesús en Marcos 10 tiene un error. Tócala.",
            frases: [
              "Jesús comparó dos maneras de ejercer autoridad.",
              "Los gobernantes de las naciones se enseñorean de ellas.",
              "Jesús dijo que entre sus discípulos debía ser igual que entre los gobernantes.",
              "Entre los discípulos, el que quiera hacerse grande será servidor.",
            ],
            malo: 2,
            correccion: "Jesús dijo: «Pero no será así entre vosotros». Entre sus discípulos, el que quiera hacerse grande será servidor.",
            apoyo: "Jesús comparó dos maneras de ejercer autoridad",
            ref: "Marcos 10:42-45",
            explica: "Los gobernantes de las naciones se enseñorean de ellas, pero Jesús dijo que entre sus discípulos no sería así: el que quiera hacerse grande será servidor.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un líder que confía en sí mismo o uno que confía en Dios? Lleva cada frase a su grupo.",
            grupos: ["Confía en sí mismo", "Confía en Dios"],
            frases: [
              { texto: "Se apoya en su carisma", grupo: 0 },
              { texto: "Confía en sus propios métodos", grupo: 0 },
              { texto: "Cree que le basta su experiencia", grupo: 0 },
              { texto: "Depende del Espíritu Santo", grupo: 1 },
              { texto: "Busca la voluntad de Dios", grupo: 1 },
              { texto: "Dirige con humildad", grupo: 1 },
              { texto: "Usa sus dones, pero depende de Dios", grupo: 1 },
            ],
            apoyo: "El primero se apoya en su carisma, sus métodos y su experiencia",
            ref: "Zacarías 4:6",
            explica: "El líder que confía en sí mismo se apoya en su carisma, sus métodos y su experiencia; el que confía en Dios también usa sus dones, pero depende del Espíritu Santo, busca la voluntad de Dios y dirige con humildad.",
          },
          {
            consigna: "¿Es liderazgo espiritual o se apoya solo en la capacidad humana? Lleva cada frase a su grupo.",
            grupos: ["Liderazgo espiritual", "Solo capacidad humana"],
            frases: [
              { texto: "Usa sus dones, pero depende del Espíritu", grupo: 0 },
              { texto: "Busca primero lo que Dios quiere", grupo: 0 },
              { texto: "Sabe que la obra de Dios se hace con la fuerza de Dios", grupo: 0 },
              { texto: "Dirige a su equipo con humildad", grupo: 0 },
              { texto: "Piensa que con su carisma le alcanza", grupo: 1 },
              { texto: "Cree que sus capacidades bastan", grupo: 1 },
              { texto: "Se apoya solo en su experiencia", grupo: 1 },
            ],
            apoyo: "Las capacidades sirven, pero no bastan: la obra de Dios se hace con la fuerza de Dios",
            ref: "Zacarías 4:6",
            explica: "El líder espiritual también usa sus dones, pero depende del Espíritu Santo: las capacidades sirven, pero no bastan, porque la obra de Dios se hace con la fuerza de Dios.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano que coordina el campamento de jóvenes te dice: Tengo experiencia y buenos métodos; no hace falta orar tanto para organizarlo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que sus métodos sirven, pero no bastan: la obra de Dios se hace con la fuerza de Dios.", bien: true, explica: "Las capacidades sirven, pero no bastan: el líder espiritual usa sus dones y depende del Espíritu Santo." },
              { texto: "Que tiene razón: con su experiencia y sus buenos métodos, el campamento saldrá muy bien.", explica: "Ese es el líder que confía en sí mismo: se apoya en su carisma, sus métodos y su experiencia." },
              { texto: "Que deje a un lado su experiencia, porque Dios no usa para nada las capacidades humanas.", explica: "El líder espiritual también usa sus dones: las capacidades sirven, aunque no bastan." },
              { texto: "Que ore solo si algo sale mal y que, mientras tanto, confíe en sus buenos métodos.", explica: "El líder espiritual depende del Espíritu Santo y busca la voluntad de Dios, no solo cuando algo sale mal." },
            ],
            apoyo: "Las capacidades sirven, pero no bastan: la obra de Dios se hace con la fuerza de Dios",
            ref: "Zacarías 4:6",
            explica: "El líder que confía en sí mismo se apoya en su carisma, sus métodos y su experiencia; el líder espiritual también usa sus dones, pero depende del Espíritu Santo.",
          },
          {
            caso: "Una hermana a quien le pidieron dirigir una célula te dice: No tengo carisma ni experiencia. ¿Cómo voy a dirigir a otros?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que use sus dones y dependa del Espíritu Santo, buscando lo que Dios quiere.", bien: true, explica: "El líder espiritual también usa sus dones, pero depende del Espíritu Santo y busca la voluntad de Dios." },
              { texto: "Que primero consiga carisma y experiencia, porque sin eso nadie puede dirigir.", explica: "Las capacidades sirven, pero no bastan: la obra de Dios se hace con la fuerza de Dios." },
              { texto: "Que copie los métodos de un líder con éxito, y que con eso le va a bastar.", explica: "Apoyarse en los métodos es confiar en lo humano; el líder espiritual depende del Espíritu Santo." },
              { texto: "Que no acepte, porque dirigir es solo para quien tiene mucho carisma.", explica: "El líder espiritual no se apoya en su carisma: usa sus dones y depende del Espíritu Santo." },
            ],
            apoyo: "el segundo también usa sus dones, pero depende del Espíritu Santo, busca la voluntad de Dios y dirige con humildad",
            ref: "Zacarías 4:6",
            explica: "Las capacidades sirven, pero no bastan: el líder espiritual usa sus dones, depende del Espíritu Santo, busca la voluntad de Dios y dirige con humildad.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada lugar donde influimos con lo que se hace allí.",
            pares: [
              ["En la familia", "Los padres guían a sus hijos y los esposos se edifican"],
              ["En el grupo pequeño", "El líder cuida, enseña y anima a sus hermanos"],
              ["En un equipo de ministerio", "El coordinador organiza, acompaña y forma a otros"],
              ["En la iglesia y en la comunidad", "Cada creyente es ejemplo con su vida"],
            ],
            apoyo: "todos ejercemos influencia en la familia, el grupo, el equipo y la iglesia",
            explica: "Todos influimos: en la familia, los padres guían y los esposos se edifican; en el grupo, el líder cuida, enseña y anima; en un equipo, el coordinador organiza, acompaña y forma; y en la iglesia y la comunidad, cada creyente es ejemplo.",
          },
          {
            consigna: "¿Qué hace cada uno con su influencia? Une a cada persona con lo que hace.",
            pares: [
              ["Los padres", "Guían a sus hijos"],
              ["Los esposos", "Se edifican mutuamente"],
              ["El líder de un grupo pequeño", "Cuida, enseña y anima a sus hermanos"],
              ["El coordinador de un equipo", "Organiza, acompaña y forma a otros"],
            ],
            apoyo: "En la familia: los padres guían a sus hijos y los esposos se edifican mutuamente",
            explica: "Todos ejercemos influencia: los padres guían a sus hijos, los esposos se edifican mutuamente, el líder del grupo cuida, enseña y anima, y el coordinador organiza, acompaña y forma a otros.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El liderazgo cristiano es influir en las personas para que sigan a Cristo y cumplan el propósito de Dios, sirviéndolas como él",
            ref: "Marcos 10:42-45",
            clave: {
              id: "pr-n3-liderazgo-1-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el liderazgo cristiano, y cómo se mide?",
              ideas: [
                { id: "influir", peso: 50, texto: "Es influir en las personas para que sigan a Cristo y cumplan el propósito de Dios, sirviéndolas como él.", formas: ["influ*", "sigan a (cristo|jesus)", "seguir a (cristo|jesus)", "sirviendo*", "servir* como (el|jesus|cristo)", "propos* de dios"] },
                { id: "mide", peso: 50, texto: "No se mide por el título ni por cuántos obedecen, sino por cuántos crecen y por cuánto se parece el líder a Jesús.", formas: ["cuantos crecen", "crec*", "crezc*", "se parec* (a|al) (jesus|cristo|senor)", "parec* a (jesus|cristo)", "parecido a (jesus|cristo)", "parecerse a (jesus|cristo)"] },
              ],
              errores: [
                { id: "obedecen", texto: "El liderazgo cristiano no se mide por el título ni por cuántos obedecen.", formas: ["mide por (el|su) (titulo|cargo)", "mide por cuantos (obedecen|lo|le)", "mide por (la|su) obediencia"], anula: "mide" },
              ],
              modelo: "Es influir en las personas para que sigan a Cristo, sirviéndolas como él. No se mide por el título ni por cuántos obedecen, sino por cuántos crecen y por cuánto se parece el líder a Jesús.",
            },
          },
          {
            apoyo: "El que quiera hacerse grande será «vuestro servidor», porque el Hijo del Hombre vino para servir y dar su vida",
            ref: "Marcos 10:42-45",
            clave: {
              id: "pr-n3-liderazgo-1-1-a7-2",
              tipo: "corta",
              pregunta: "En Marcos 10:42-45, ¿qué enseñó Jesús sobre ser grande, y qué ejemplo dio él mismo?",
              ideas: [
                { id: "servidor", peso: 50, texto: "Entre sus discípulos no será como entre los gobernantes que se enseñorean: el que quiera hacerse grande será servidor de los demás.", formas: ["servidor*", "serv* a (los|las) (demas|otros|otras|personas|hermanos|todos)", "grande* (es|sera|debe|tiene) serv*", "el que sirve", "quien sirve", "no sera asi"] },
                { id: "vida", peso: 50, texto: "Él mismo vino para servir y dar su vida.", formas: ["dar su vida", "dio su vida", "entrego su vida", "(vino|venido) (a|para) servir", "hijo del hombre vino", "(jesus|el) (sirvio|servia)"] },
              ],
              errores: [
                { id: "mandar", texto: "Los gobernantes de las naciones se enseñorean de ellas, pero entre los discípulos no será así.", formas: ["grande (es|sera) mand*", "ser grande es mand*", "lider (debe|tiene) mandar"], anula: "servidor" },
              ],
              modelo: "Jesús enseñó que entre sus discípulos no será como entre los gobernantes: el que quiera hacerse grande será servidor de los demás. Él mismo dio el ejemplo, porque vino para servir y dar su vida.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El carácter del líder
    "n3-liderazgo-1-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Para escoger líderes, ¿qué pesó más para Pablo: el talento o el carácter?", reverso: "El carácter: casi no habló de talentos ni de habilidades.", apoyo: "casi no habló de talentos ni de habilidades: habló de carácter" },
              { frente: "¿Qué quiere decir que el líder sea irreprensible?", reverso: "Que nadie pueda acusarlo con razón.", apoyo: "que nadie pueda acusarlo con razón" },
              { frente: "¿Qué es un neófito?", reverso: "Un creyente recién convertido.", apoyo: "un creyente recién convertido" },
              { frente: "¿Qué testimonio pide Pablo que tenga el líder ante los de afuera?", reverso: "Un buen testimonio, también entre los que no son creyentes.", apoyo: "En la comunidad: tiene buen testimonio también entre los que no son creyentes" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo debe ser el líder en su fe?", reverso: "No un recién convertido, sino alguien probado.", apoyo: "En su fe: no es un recién convertido, sino alguien probado" },
              { frente: "¿Cómo debe ser el líder en su casa?", reverso: "Gobierna bien su familia, con amor y orden.", apoyo: "En su casa: gobierna bien su familia, con amor y orden" },
              { frente: "¿Cómo debe ser el líder en el ministerio?", reverso: "Hospitalario y apto para enseñar.", apoyo: "En el ministerio: es hospitalario y apto para enseñar" },
              { frente: "¿Qué describen las cualidades de 1 Timoteo 3?", reverso: "El carácter que todo líder cristiano debe buscar.", apoyo: "describen el carácter que todo líder cristiano debe buscar" },
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
            consigna: "Une cada área de la vida del líder con lo que Pablo pide en ella.",
            pares: [
              ["En su vida personal", "Sobrio, prudente, decoroso, amable y apacible"],
              ["En su casa", "Gobierna bien su familia, con amor y orden"],
              ["En su fe", "No es un recién convertido, sino alguien probado"],
              ["En la comunidad", "Tiene buen testimonio entre los que no son creyentes"],
              ["En el ministerio", "Es hospitalario y apto para enseñar"],
            ],
            apoyo: "En su vida personal: sobrio, prudente, decoroso, no dado al vino, no pendenciero, amable, apacible, no avaro",
            ref: "1 Timoteo 3:2-7",
            explica: "Pablo pide carácter en cada área: en la vida personal, sobrio, prudente y apacible; en la casa, gobernar bien su familia; en la fe, alguien probado; en la comunidad, buen testimonio; y en el ministerio, hospitalario y apto para enseñar.",
          },
          {
            consigna: "¿Qué quiere decir cada palabra de 1 Timoteo 3? Une cada una con su sentido.",
            pares: [
              ["Irreprensible", "Nadie puede acusarlo con razón"],
              ["Un neófito", "Un creyente recién convertido"],
              ["Buen testimonio de los de afuera", "Bien visto también por los que no creen"],
              ["Gobierna bien su casa", "Guía a su familia con amor y orden"],
            ],
            apoyo: "Pablo pide que el líder sea «irreprensible», es decir, que nadie pueda acusarlo con razón",
            ref: "1 Timoteo 3:2-7",
            explica: "Irreprensible es que nadie pueda acusarlo con razón; el líder no debe ser un neófito, un recién convertido; debe tener buen testimonio entre los que no son creyentes y gobernar bien su familia, con amor y orden.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el carácter que Pablo pide al líder: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Al explicar cómo escoger líderes, Pablo habló sobre todo de talentos y habilidades.", verdad: false, explica: "Casi no habló de talentos ni de habilidades: habló de carácter.", apoyo: "casi no habló de talentos ni de habilidades: habló de carácter" },
              { texto: "Pablo pide que el líder no sea un creyente recién convertido.", verdad: true, explica: "Pide que no sea un neófito, un creyente recién convertido, sino alguien probado.", apoyo: "Pide también que no sea «un neófito», un creyente recién convertido", ref: "1 Timoteo 3:2-7" },
              { texto: "Las cualidades de 1 Timoteo 3 describen el carácter que todo líder cristiano debe buscar.", verdad: true, explica: "Pablo las pide a los ancianos y a los diáconos, y describen el carácter que todo líder cristiano debe buscar.", apoyo: "describen el carácter que todo líder cristiano debe buscar" },
            ],
          },
          {
            consigna: "Sobre las cualidades del líder: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Si un líder tiene buen testimonio en la iglesia, no importa lo que piensen los de afuera.", verdad: false, explica: "Pablo pide que tenga buen testimonio de los de afuera: también entre los que no son creyentes.", apoyo: "que tenga «buen testimonio de los de afuera»", ref: "1 Timoteo 3:2-7" },
              { texto: "Pablo pide que el líder sea irreprensible: que nadie pueda acusarlo con razón.", verdad: true, explica: "Irreprensible quiere decir que nadie pueda acusarlo con razón.", apoyo: "que nadie pueda acusarlo con razón" },
              { texto: "Con tener mucho talento, el líder ya cumple lo que pide 1 Timoteo 3.", verdad: false, explica: "Pablo casi no habló de talentos: lo que el líder es pesa más que lo que sabe hacer.", apoyo: "Lo que el líder es pesa más que lo que sabe hacer" },
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
            consigna: "Completa qué es la integridad.",
            texto: "Integridad es ser la misma persona en público y en [[privado]], en el templo y en la [[casa]], en lo grande y en lo [[pequeño]].",
            distractores: ["grupo", "iglesia", "visible"],
            errores: {
              grupo: "La integridad es ser la misma persona en público y en privado, también cuando nadie te ve.",
              iglesia: "Se es la misma persona en el templo y en la casa.",
              visible: "Se es la misma persona en lo grande y en lo pequeño.",
            },
            apoyo: "Integridad es ser la misma persona en público y en privado, en el templo y en la casa, en lo grande y en lo pequeño",
            ref: "Proverbios 11:3",
            explica: "Integridad es ser la misma persona en público y en privado, en el templo y en la casa, en lo grande y en lo pequeño. Si el líder la pierde, pierde la confianza, y sin confianza nadie lo sigue.",
          },
          {
            consigna: "Completa cómo es el líder humilde.",
            texto: "El líder humilde reconoce sus [[errores]], escucha, pide [[perdón]], da el reconocimiento a otros y sabe que todo lo que tiene lo [[recibió]] de Dios.",
            distractores: ["méritos", "aplausos", "mereció"],
            errores: {
              "méritos": "El líder humilde reconoce sus errores y da el reconocimiento a otros.",
              aplausos: "El líder humilde escucha y pide perdón.",
              "mereció": "El líder humilde sabe que todo lo que tiene lo recibió de Dios.",
            },
            apoyo: "El líder humilde reconoce sus errores, escucha, pide perdón, da el reconocimiento a otros y sabe que todo lo que tiene lo recibió de Dios",
            ref: "1 Pedro 5:5",
            explica: "Pedro recuerda que «Dios resiste a los soberbios, y da gracia a los humildes». Por eso el líder humilde reconoce sus errores, escucha, pide perdón, da el reconocimiento a otros y sabe que todo lo recibió de Dios.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la integridad y la humildad tiene un error. Tócala.",
            frases: [
              "Integridad es ser la misma persona en público y en privado.",
              "Si un líder tiene muchos dones, puede perder la integridad sin perder la confianza.",
              "Sin confianza, nadie sigue a un líder.",
              "Dios da gracia a los humildes.",
            ],
            malo: 1,
            correccion: "Un líder puede tener muchos dones, pero si pierde la integridad pierde la confianza, y sin confianza nadie lo sigue.",
            apoyo: "Un líder puede tener muchos dones, pero si pierde la integridad pierde la confianza, y sin confianza nadie lo sigue",
            ref: "Proverbios 11:3",
            explica: "La integridad es la base: un líder puede tener muchos dones, pero si la pierde, pierde la confianza, y sin confianza nadie lo sigue.",
          },
          {
            consigna: "Una de estas frases sobre el carácter y el talento tiene un error. Tócala.",
            frases: [
              "Saúl tenía estatura y presencia.",
              "David tenía un corazón conforme a Dios.",
              "El talento sostiene a un líder en el tiempo, aunque le falte carácter.",
              "El talento puede abrir una puerta.",
            ],
            malo: 2,
            correccion: "El talento puede abrir una puerta, pero solo el carácter sostiene a un líder en el tiempo.",
            apoyo: "El talento puede abrir una puerta, pero solo el carácter sostiene a un líder en el tiempo",
            explica: "Saúl tenía estatura y presencia; David, un corazón conforme a Dios. El talento puede abrir una puerta, pero solo el carácter sostiene a un líder en el tiempo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un servidor de tu equipo te dice: En la iglesia todos me ven amable, pero en casa le grito a mi familia. Total, allí nadie me ve.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo que eres cuando nadie te ve es lo que eres como líder.", bien: true, explica: "Integridad es ser la misma persona en el templo y en la casa: lo que eres cuando nadie te ve es lo que eres como líder." },
              { texto: "Que no se preocupe tanto: lo que cuenta es su testimonio en la iglesia.", explica: "Integridad es ser la misma persona en público y en privado, en el templo y en la casa." },
              { texto: "Que siga sirviendo igual, porque su familia ya lo conoce y lo entiende.", explica: "En su casa, el líder gobierna bien su familia, con amor y orden." },
              { texto: "Que deje de servir para siempre, porque un líder nunca se equivoca.", explica: "El líder humilde reconoce sus errores y pide perdón; lo que necesita es ser la misma persona en el templo y en la casa." },
            ],
            apoyo: "Lo que eres cuando nadie te ve es lo que eres como líder",
            explica: "Integridad es ser la misma persona en público y en privado, en el templo y en la casa: lo que eres cuando nadie te ve es lo que eres como líder.",
          },
          {
            caso: "Una líder de célula te dice: Quiero crecer como líder. ¿Por dónde empiezo a revisar mi vida?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que vea qué cualidad de 1 Timoteo 3 necesita cultivar y dé un paso concreto.", bien: true, explica: "Así lo propone la lección: ver qué cualidad de 1 Timoteo 3 necesita cultivar más y qué paso concreto dará para crecer en ella." },
              { texto: "Que empiece por aprender más técnicas para dirigir mejor las reuniones.", explica: "Pablo casi no habló de talentos ni de habilidades: habló de carácter." },
              { texto: "Que primero cuide a cada miembro de la célula y deje su propia vida para después.", explica: "El orden importa: el líder cuida primero su propia vida, porque no puede llevar a otros adonde él no va." },
              { texto: "Que se compare con otros líderes y se quede con lo que ella hace mejor.", explica: "El líder humilde da el reconocimiento a otros y sabe que todo lo que tiene lo recibió de Dios." },
            ],
            apoyo: "¿Qué cualidad de 1 Timoteo 3 necesitas cultivar más, y qué paso concreto darás para crecer en ella?",
            ref: "Hechos 20:28",
            explica: "El líder mira primero por sí mismo y después por el rebaño: revisa su vida con las cualidades de 1 Timoteo 3 y da un paso concreto para crecer en la que más necesita.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La integridad le da confianza y la humildad le trae la gracia de Dios",
            ref: "Proverbios 11:3; 1 Pedro 5:5",
            clave: {
              id: "pr-n3-liderazgo-1-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la integridad y la humildad son la base del liderazgo?",
              ideas: [
                { id: "integridad", peso: 50, texto: "Integridad es ser la misma persona en público y en privado: si el líder la pierde, pierde la confianza, y sin confianza nadie lo sigue.", formas: ["(confianza|confiar|confian|confia|confie|confien)", "misma persona", "mismo en (publico|privado|la|el|casa|todo|todas)", "en publico y en privado", "cuando nadie (lo|la|te|nos|me) ve"] },
                { id: "humildad", peso: 50, texto: "Dios resiste a los soberbios y da gracia a los humildes.", formas: ["gracia a los humildes", "da gracia", "(trae|recibe|recibimos|tiene|obtiene|atrae) (la|su) gracia", "resiste a los (soberbios|orgullosos)", "gracia de dios"] },
              ],
              modelo: "Porque la integridad, ser la misma persona en público y en privado, le da confianza: si la pierde, nadie lo sigue. Y la humildad le trae la gracia de Dios, que resiste a los soberbios y da gracia a los humildes.",
            },
          },
          {
            apoyo: "El talento puede abrir una puerta, pero solo el carácter sostiene a un líder en el tiempo",
            clave: {
              id: "pr-n3-liderazgo-1-2-a7-2",
              tipo: "corta",
              pregunta: "Saúl tenía estatura y presencia; David, un corazón conforme a Dios. ¿Qué enseña esto sobre el carácter y el talento del líder?",
              ideas: [
                { id: "puerta", peso: 50, texto: "El talento puede abrir una puerta, pero no basta.", formas: ["abr* (una|la|las) puerta*", "abre puertas", "abrir puertas", "talento (solo|no) (basta|alcanza|sostiene)"] },
                { id: "caracter", peso: 50, texto: "Solo el carácter sostiene a un líder en el tiempo.", formas: ["solo el caracter", "caracter sostiene*", "caracter (lo|le|la) sostiene*", "sostiene* (a|al) lider*", "caracter (dura|permanece|mantiene)", "caracter (es|va) (antes|primero)"] },
              ],
              errores: [
                { id: "talento-sostiene", texto: "Solo el carácter sostiene a un líder en el tiempo.", formas: ["talento sostiene*", "talento (lo|le|la) sostiene*", "talento (es|va) (primero|antes)", "talento (basta|alcanza)"], anula: "caracter" },
              ],
              modelo: "El talento, como la estatura de Saúl, puede abrir una puerta, pero no basta. Solo el carácter, como el corazón de David conforme a Dios, sostiene a un líder en el tiempo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Servir como Jesús
    "n3-liderazgo-1-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "La noche antes de morir, ¿qué hizo Jesús al levantarse de la cena?", reverso: "Se ciñó una toalla y lavó los pies de sus discípulos.", apoyo: "Jesús se levantó de la cena, se ciñó una toalla y lavó los pies de sus discípulos" },
              { frente: "¿Qué trabajo hizo el que tenía toda la autoridad?", reverso: "El trabajo del último siervo.", apoyo: "El que tenía toda la autoridad hizo el trabajo del último siervo" },
              { frente: "¿Qué lugar tiene el líder cristiano en el servicio humilde?", reverso: "No está por encima de él: lo encabeza.", apoyo: "El líder cristiano no está por encima del servicio humilde: lo encabeza" },
              { frente: "¿Cuál es el símbolo del liderazgo cristiano?", reverso: "La toalla de Jesús.", apoyo: "La toalla de Jesús es el símbolo del liderazgo cristiano" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dijo Jesús que debían hacer sus discípulos unos con otros?", reverso: "Lavarse los pies unos a otros, porque él les dio ejemplo.", apoyo: "«vosotros también debéis lavaros los pies los unos a los otros. Porque ejemplo os he dado»" },
              { frente: "¿Cómo pide Pablo que estimemos a los demás?", reverso: "Con humildad, como superiores a uno mismo.", apoyo: "antes bien con humildad, estimando cada uno a los demás como superiores a él mismo" },
              { frente: "¿Qué hizo Cristo, siendo Dios?", reverso: "Se despojó a sí mismo y se hizo siervo hasta la muerte de cruz.", apoyo: "que siendo Dios se despojó a sí mismo y se hizo siervo hasta la muerte de cruz" },
              { frente: "¿Qué sabía Jesús cuando lavó los pies de sus discípulos?", reverso: "Que el Padre le había dado todas las cosas.", apoyo: "sabiendo que el Padre le había dado todas las cosas" },
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
            consigna: "Ordena lo que hizo Jesús la noche antes de morir, del primer paso al último.",
            pasos: ["Se levantó de la cena", "Se ciñó una toalla", "Lavó los pies de sus discípulos", "Les explicó que les había dado ejemplo"],
            apoyo: "Jesús se levantó de la cena, se ciñó una toalla y lavó los pies de sus discípulos",
            ref: "Juan 13:14-15",
            explica: "Jesús se levantó de la cena, se ciñó una toalla y lavó los pies de sus discípulos. Después les explicó lo que había hecho: «Porque ejemplo os he dado».",
          },
          {
            consigna: "Ordena lo que cuenta Juan 13 de aquella noche, de lo primero a lo último.",
            pasos: [
              "Jesús sabía que el Padre le había dado todas las cosas",
              "Se ciñó una toalla, como un siervo",
              "Lavó los pies de sus discípulos",
              "Les dijo que también ellos debían lavarse los pies unos a otros",
            ],
            apoyo: "La noche antes de morir, sabiendo que el Padre le había dado todas las cosas, Jesús se levantó de la cena, se ciñó una toalla y lavó los pies de sus discípulos",
            ref: "Juan 13:14-15",
            explica: "Sabiendo que el Padre le había dado todas las cosas, Jesús se ciñó una toalla y lavó los pies de sus discípulos: el que tenía toda la autoridad hizo el trabajo del último siervo, y les pidió hacer lo mismo unos con otros.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Cómo debe servir el que cuida el rebaño de Dios? Toca las palabras que dicen cómo sí hacerlo.",
            texto: "no por fuerza, sino [[voluntariamente]]; no por ganancia deshonesta, sino con [[ánimo pronto]]; no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo [[ejemplos de la grey]]",
            apoyo: "Sirve con gusto, con motivos limpios y con el ejemplo",
            ref: "1 Pedro 5:2-3",
            explica: "El buen pastor cuida el rebaño de Dios voluntariamente, con ánimo pronto y siendo ejemplo de la grey: sirve con gusto, con motivos limpios y con el ejemplo.",
          },
          {
            consigna: "¿De qué tres maneras no debe servir el pastor? Toca la palabra o las palabras que nombran cada una.",
            texto: "no por [[fuerza]], sino voluntariamente; no por [[ganancia deshonesta]], sino con ánimo pronto; no como teniendo [[señorío]] sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey",
            apoyo: "Pedro describe al líder como un pastor que cuida el rebaño de Dios, que no es suyo",
            ref: "1 Pedro 5:2-3",
            explica: "El buen pastor no sirve por fuerza, ni por ganancia deshonesta, ni teniendo señorío sobre los demás: sirve voluntariamente, con ánimo pronto y siendo ejemplo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Sirve con gusto, con motivos limpios y con el ejemplo",
            ref: "1 Pedro 5:2-3",
            situacion: "Eres el nuevo líder de una célula en tu barrio. El grupo es parte del rebaño de Dios, y te toca cuidarlo.",
            escenas: [
              {
                id: "e1",
                narra: "Las primeras semanas, servir te pesa: lo haces solo porque te lo pidieron.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides a Dios un corazón que sirva voluntariamente, con ánimo pronto.", valor: 2, explica: "Pedro pide servir «no por fuerza, sino voluntariamente»: el buen pastor sirve con gusto." },
                  { texto: "Sigues sirviendo, aunque sea por obligación, mientras se te pasa el desgano.", valor: 1, explica: "Seguir sirviendo es fiel, pero Pedro pide más: servir voluntariamente, con ánimo pronto." },
                  { texto: "Dejas de ir a la célula hasta que te vuelvan las ganas de servir.", valor: 0, explica: "El buen pastor cuida el rebaño de Dios, que no es suyo: no lo deja solo, sino que sirve con ánimo pronto." },
                ],
              },
              {
                id: "e2",
                narra: "Un hermano de la célula tiene un negocio y te ofrece dinero si lo pones a dirigir la alabanza.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le dices con amor que el servicio no se compra, y no aceptas nada.", valor: 2, explica: "El buen pastor no sirve por ganancia deshonesta: sirve con motivos limpios." },
                  { texto: "No aceptas el dinero, pero le das el lugar para que no se moleste.", valor: 1, explica: "No aceptar el dinero está bien, pero el lugar tampoco se da para quedar bien: se decide con motivos limpios." },
                  { texto: "Aceptas el dinero, porque al fin y al cabo es para ayudar a la obra.", valor: 0, explica: "Eso es ganancia deshonesta: el liderazgo se tuerce cuando se usa para uno mismo." },
                ],
              },
              {
                id: "e3",
                narra: "Algunos hermanos no hacen lo que les pides en la célula.",
                pregunta: "¿Cómo los guías?",
                opciones: [
                  { texto: "Les muestras con tu ejemplo lo que enseñas, sin imponerte.", valor: 2, explica: "Pedro pide no actuar como teniendo señorío sobre los que están a tu cuidado, sino siendo ejemplo de la grey." },
                  { texto: "Les explicas otra vez lo que les pediste, ahora con más detalle.", valor: 1, explica: "Explicar ayuda, pero el buen pastor guía sobre todo con el ejemplo." },
                  { texto: "Les recuerdas que tú eres el líder y que te tienen que obedecer.", valor: 0, explica: "Eso es tener señorío: un jefe manda desde arriba, pero el buen pastor va delante con el ejemplo." },
                ],
              },
            ],
          },
          {
            apoyo: "Pedro describe al líder como un pastor que cuida el rebaño de Dios, que no es suyo",
            ref: "1 Pedro 5:2-3",
            situacion: "Eres coordinador del equipo de servidores de la iglesia. Tienes a tu cargo a doce hermanos.",
            escenas: [
              {
                id: "e1",
                narra: "Un servidor nuevo dice que el equipo es tuyo y que todos deben hacer lo que tú digas.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el rebaño es de Dios, no tuyo, y que tú estás para servir.", valor: 2, explica: "El líder es un pastor que cuida el rebaño de Dios, que no es suyo, y sirve sin señorío." },
                  { texto: "Que sí guías al equipo, pero que cada uno puede servir a su manera.", valor: 1, explica: "No imponerse está bien, pero falta lo principal: el rebaño es de Dios, y el líder lo cuida sirviendo." },
                  { texto: "Que tiene toda la razón: el coordinador manda y los demás obedecen.", valor: 0, explica: "Pedro pide no actuar como teniendo señorío sobre los que están a tu cuidado." },
                ],
              },
              {
                id: "e2",
                narra: "La iglesia te dio dinero para el refrigerio del equipo, y sobró una parte.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le das cuentas al pastor de lo que gastaste y de lo que sobró.", valor: 2, explica: "El líder maneja con transparencia el dinero y no sirve por ganancia deshonesta." },
                  { texto: "Lo guardas para el próximo refrigerio y después lo anotas en algún lado.", valor: 1, explica: "No te lo quedas, pero falta la transparencia: el líder rinde cuentas del dinero." },
                  { texto: "Te lo quedas: es justo por todas las horas que le das al ministerio.", valor: 0, explica: "Eso es ganancia deshonesta: aprovecharse en lo económico es una señal de alarma." },
                ],
              },
              {
                id: "e3",
                narra: "Un servidor llega tarde varias veces, y otros se quejan.",
                pregunta: "¿Cómo lo corriges?",
                opciones: [
                  { texto: "Hablas con él con amor, y tú eres el primero en llegar a tiempo.", valor: 2, explica: "El buen pastor guía siendo ejemplo de la grey." },
                  { texto: "Le mandas un mensaje para recordarle la hora, sin hablar con él.", valor: 1, explica: "Recordarle la hora ayuda, pero el buen pastor se acerca y guía con su ejemplo." },
                  { texto: "Lo sacas del equipo sin escucharlo, para que nadie más llegue tarde.", valor: 0, explica: "Diótrefes rechazaba a otros y los echaba de la iglesia: el liderazgo se tuerce cuando se usa para uno mismo." },
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
            consigna: "¿Es una señal de alarma o una protección contra el abuso? Lleva cada frase a su grupo.",
            grupos: ["Señal de alarma", "Protección contra el abuso"],
            frases: [
              { texto: "Exigir lealtad a la persona del líder en vez de a Cristo", grupo: 0 },
              { texto: "Manipular con la culpa o el miedo para que otros obedezcan", grupo: 0 },
              { texto: "Aprovecharse de las personas en lo económico", grupo: 0 },
              { texto: "Castigar a quien hace preguntas", grupo: 0 },
              { texto: "Trabajar bajo la supervisión pastoral", grupo: 1 },
              { texto: "Manejar con transparencia el dinero y las decisiones", grupo: 1 },
              { texto: "Aceptar la corrección", grupo: 1 },
              { texto: "Informar un abuso a los pastores", grupo: 1 },
            ],
            apoyo: "La protección está en rendir cuentas",
            explica: "Controlar, manipular, aprovecharse y castigar a quien pregunta son señales de alarma. La protección está en rendir cuentas: trabajar bajo la supervisión pastoral, manejar con transparencia el dinero y las decisiones, y aceptar la corrección.",
          },
          {
            consigna: "¿El poder se está torciendo o es un liderazgo sano? Lleva cada frase a su grupo.",
            grupos: ["El poder se tuerce", "Liderazgo sano"],
            frases: [
              { texto: "Dice tener revelaciones para que todos le obedezcan", grupo: 0 },
              { texto: "Echa del grupo a quien le hace preguntas", grupo: 0 },
              { texto: "Esconde las cuentas y no da explicaciones a nadie", grupo: 0 },
              { texto: "Le gusta tener siempre el primer lugar", grupo: 0 },
              { texto: "Deja que su pastor lo supervise", grupo: 1 },
              { texto: "Muestra con claridad en qué se usa el dinero", grupo: 1 },
              { texto: "Recibe la corrección con humildad", grupo: 1 },
            ],
            apoyo: "El liderazgo se tuerce cuando se usa para uno mismo",
            ref: "3 Juan 1:9",
            explica: "A Diótrefes le gustaba tener el primer lugar y echaba a otros de la iglesia: el liderazgo se tuerce cuando se usa para uno mismo. El líder sano rinde cuentas, maneja con transparencia el dinero y acepta la corrección.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una joven de tu célula te dice: El líder de alabanza dice que Dios le reveló que debo obedecerle en todo, y que no se lo cuente a nadie.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que eso es una señal de alarma, y que juntos lo van a informar a los pastores.", bien: true, explica: "Manipular con supuestas revelaciones y pedir secreto son señales de alarma: un abuso nunca se encubre, se informa a los pastores." },
              { texto: "Que le obedezca en todo: si fue una revelación de Dios, no hay nada que preguntar.", explica: "Manipular con supuestas revelaciones para que otros obedezcan es una señal de alarma." },
              { texto: "Que guarde el secreto, como él le pidió, para no causar problemas en la iglesia.", explica: "Un abuso nunca se encubre: se informa a los pastores y, cuando hay delito, a las autoridades." },
              { texto: "Que lo hable a solas con él y lo arreglen entre ellos, sin que nadie se entere.", explica: "Esconder las cosas es otra señal de alarma: un abuso no se arregla en secreto, se informa a los pastores." },
            ],
            apoyo: "Un abuso nunca se encubre: se informa a los pastores y, cuando hay delito, a las autoridades",
            ref: "3 Juan 1:9",
            explica: "Exigir obediencia con supuestas revelaciones y pedir secreto son señales de alarma. Un abuso nunca se encubre: se informa a los pastores y, cuando hay delito, a las autoridades.",
          },
          {
            caso: "Un servidor de tu equipo te dice: El coordinador no deja que nadie vea las cuentas del ministerio, y cuando pregunté me sacó del equipo.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que eso es una señal de alarma, y que lo van a informar juntos a los pastores.", bien: true, explica: "Esconder las cosas y castigar a quien hace preguntas son señales de alarma: el líder rinde cuentas, y un abuso se informa a los pastores." },
              { texto: "Que no pregunte más, porque el coordinador tiene derecho a manejar el dinero solo.", explica: "El líder maneja con transparencia el dinero y las decisiones: nadie queda libre de rendir cuentas." },
              { texto: "Que lo olvide y se busque otro ministerio donde no haya ningún problema.", explica: "Un abuso nunca se encubre: callarlo e irse es dejarlo escondido." },
              { texto: "Que lo cuente en la reunión del domingo, para que toda la iglesia se entere.", explica: "La lección enseña el camino: un abuso se informa a los pastores y, cuando hay delito, a las autoridades." },
            ],
            apoyo: "Esconder las cosas, no rendir cuentas a nadie y castigar a quien hace preguntas",
            explica: "Esconder las cosas, no rendir cuentas a nadie y castigar a quien hace preguntas son señales de alarma. La protección está en rendir cuentas, y un abuso se informa a los pastores.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El líder cristiano no está por encima del servicio humilde: lo encabeza",
            ref: "Juan 13:14-15",
            clave: {
              id: "pr-n3-liderazgo-1-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseñó Jesús a los líderes cuando lavó los pies de sus discípulos?",
              ideas: [
                { id: "ejemplo", peso: 50, texto: "Nos dio ejemplo: debemos lavarnos los pies los unos a los otros, servirnos con humildad.", formas: ["ejemplo", "los unos a los otros", "unos a otros", "lavar* los pies", "(servir|sirvamos|servirse|servirn*) (unos|los|a|al)", "con humildad"] },
                { id: "encabeza", peso: 50, texto: "El que tenía toda la autoridad hizo el trabajo del último siervo: el líder no está por encima del servicio humilde, lo encabeza.", formas: ["encabez*", "ultimo siervo", "toda la autoridad", "trabajo (de|del) (un|el|ultimo) siervo", "trabajo de siervo", "no esta por encima", "(sirve|servir) primero"] },
              ],
              errores: [
                { id: "servido", texto: "El líder cristiano no está por encima del servicio humilde: lo encabeza.", formas: ["(lider|lideres) (debe|deben|tiene|tienen) ser servid*", "ser servid* por", "esta por encima del servicio"], anula: "encabeza" },
              ],
              modelo: "Jesús, que tenía toda la autoridad, hizo el trabajo del último siervo: el líder no está por encima del servicio humilde, sino que lo encabeza. Y nos dio ejemplo para que nos sirvamos los unos a los otros.",
            },
          },
          {
            apoyo: "Servir como Jesús no significa decir que sí a todo ni dejar que otros abusen",
            ref: "Juan 13:14-15",
            clave: {
              id: "pr-n3-liderazgo-1-3-a7-2",
              tipo: "corta",
              pregunta: "Servir como Jesús, ¿significa dejarse usar? Explica cómo servía Jesús.",
              ideas: [
                { id: "no-todo", peso: 50, negativa: true, texto: "Servir como Jesús no significa decir que sí a todo ni dejar que otros abusen.", formas: ["no (significa|es|quiere) (decir|dejarse|dejar|aceptar|hacer)", "ni (dejar|deja|dejarse) que", "no (dejarse|dejarnos|dejarte) usar", "no (dejar|deja|dejamos|dejaba) que (otros|los|nos|se|abusen)", "no (decir|dice|decia) que si", "no (es|significa) (hacer|aceptar) todo"] },
                { id: "jesus", peso: 50, texto: "Jesús servía con propósito, ponía límites y se apartaba a orar: el servicio sano tiene amor y también sabiduría.", formas: ["propos*", "limites", "apart* a orar", "se apart*", "sabiduria", "servicio sano"] },
              ],
              errores: [
                { id: "dejarse-usar", texto: "Servir como Jesús no significa decir que sí a todo ni dejar que otros abusen.", formas: ["(significa|es) dejarse usar", "(significa|es) decir que si a todo", "hay que decir que si a todo"], anula: "no-todo" },
              ],
              modelo: "No. Servir como Jesús no significa decir que sí a todo ni dejar que otros abusen. Jesús servía con propósito, ponía límites y se apartaba a orar: el servicio sano tiene amor y también sabiduría.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La vida del líder con Dios
    "n3-liderazgo-1-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué caen muchos líderes cristianos, según la lección?", reverso: "Por agotamiento, por descuidar su familia o por abandonar su vida con Dios.", apoyo: "sino por agotamiento, por descuidar su familia o por abandonar su vida con Dios" },
              { frente: "¿Qué es la oración para el liderazgo?", reverso: "Su motor, no un adorno.", apoyo: "La oración no es un adorno del liderazgo: es su motor" },
              { frente: "¿Qué le dijo Moisés a Dios sobre su presencia?", reverso: "«Si tu presencia no ha de ir conmigo, no nos saques de aquí».", apoyo: "Moisés le dijo a Dios: «Si tu presencia no ha de ir conmigo, no nos saques de aquí»" },
              { frente: "¿Dónde está la fuerza del líder espiritual?", reverso: "No en sus planes, sino en la presencia de Dios.", apoyo: "El líder espiritual sabe que su fuerza no está en sus planes, sino en la presencia de Dios" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué prefería Moisés antes que avanzar sin Dios?", reverso: "Quedarse en el desierto con Dios.", apoyo: "Prefería quedarse en el desierto con Dios antes que avanzar sin él" },
              { frente: "¿Qué debe hacer un líder que no tiene tiempo para orar y estudiar la Palabra?", reverso: "Reorganizar su agenda.", apoyo: "Un líder que no tiene tiempo para orar y estudiar la Palabra tiene que reorganizar su agenda" },
              { frente: "¿Qué no puedes dar, según la lección?", reverso: "Lo que no recibes de Dios.", apoyo: "No puedes dar lo que no recibes de Dios" },
              { frente: "¿De dónde nace el liderazgo cristiano?", reverso: "De la vida con Dios.", apoyo: "El liderazgo cristiano nace de la vida con Dios" },
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
            consigna: "Completa por qué Moisés no quería avanzar sin Dios.",
            texto: "Moisés le pidió a Dios que su [[presencia]] fuera con él, porque prefería quedarse en el [[desierto]] con Dios antes que [[avanzar]] sin él.",
            distractores: ["ejército", "palacio", "dormir"],
            errores: {
              "ejército": "Moisés dijo: «Si tu presencia no ha de ir conmigo, no nos saques de aquí».",
              palacio: "Prefería quedarse en el desierto con Dios antes que avanzar sin él.",
              dormir: "Moisés prefería quedarse con Dios antes que avanzar sin él.",
            },
            apoyo: "Prefería quedarse en el desierto con Dios antes que avanzar sin él",
            ref: "Éxodo 33:15",
            explica: "Moisés prefería quedarse en el desierto con Dios antes que avanzar sin él: el líder espiritual sabe que su fuerza no está en sus planes, sino en la presencia de Dios.",
          },
          {
            consigna: "Completa dónde está la fuerza del líder espiritual.",
            texto: "El líder espiritual sabe que su [[fuerza]] está en la presencia de Dios, y que la [[oración]] es el [[motor]] del liderazgo.",
            distractores: ["fama", "música", "adorno"],
            errores: {
              fama: "Su fuerza no está en sus planes, sino en la presencia de Dios.",
              "música": "La oración es el motor del liderazgo.",
              adorno: "La oración no es un adorno del liderazgo: es su motor.",
            },
            apoyo: "La oración no es un adorno del liderazgo: es su motor",
            ref: "Marcos 1:35",
            explica: "El líder espiritual sabe que su fuerza no está en sus planes, sino en la presencia de Dios, y que la oración no es un adorno del liderazgo: es su motor.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada uno con su ejemplo de oración.",
            pares: [
              ["Jesús", "Se levantaba de madrugada para orar en un lugar desierto"],
              ["Moisés", "No quería avanzar sin la presencia de Dios"],
              ["Nehemías", "Oró antes de responder a la pregunta del rey"],
              ["Los apóstoles", "Persistieron en la oración y en el ministerio de la palabra"],
            ],
            apoyo: "Moisés no quería avanzar sin su presencia, Jesús oraba de madrugada y Nehemías oraba antes de hablar",
            explica: "Jesús se levantaba de madrugada para orar, Moisés no quería avanzar sin la presencia de Dios, Nehemías oró antes de responder al rey y los apóstoles persistieron en la oración y la Palabra.",
          },
          {
            consigna: "¿Qué hizo cada uno en ese momento? Une cada situación con lo que hizo.",
            pares: [
              ["Con toda la multitud buscándolo", "Jesús se levantaba de madrugada a orar"],
              ["Ante la pregunta del rey", "Nehemías oró antes de responder"],
              ["Antes de avanzar con el pueblo", "Moisés pidió que fuera con él la presencia de Dios"],
              ["Cuando las tareas crecieron", "Los apóstoles organizaron el servicio para seguir orando"],
            ],
            apoyo: "Nehemías, ante la pregunta del rey, oró antes de responder",
            explica: "Jesús, con toda la multitud buscándolo, se levantaba de madrugada a orar; Nehemías oró antes de responder al rey; Moisés no quería avanzar sin la presencia de Dios; y los apóstoles organizaron el servicio para persistir en la oración.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el descanso del líder: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Descansar es pereza: un buen líder nunca se detiene.", verdad: false, explica: "Descansar no es pereza: es obedecer el ritmo que Dios dio a la vida.", apoyo: "Descansar no es pereza: es obedecer el ritmo que Dios dio a la vida" },
              { texto: "Jesús invitó a sus discípulos cansados a descansar un poco.", verdad: true, explica: "Les dijo: «Venid vosotros aparte a un lugar desierto, y descansad un poco».", apoyo: "«Venid vosotros aparte a un lugar desierto, y descansad un poco»", ref: "Marcos 6:31" },
              { texto: "El líder agotado sirve mal y termina enfermo o amargado.", verdad: true, explica: "Por eso el líder descansa: así obedece el ritmo que Dios dio a la vida.", apoyo: "El líder agotado sirve mal y termina enfermo o amargado" },
            ],
          },
          {
            consigna: "Sobre la familia y el ejemplo del líder: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La familia es el primer ministerio del líder casado.", verdad: true, explica: "Pablo pregunta: el que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios?", apoyo: "La familia es el primer ministerio del líder casado", ref: "1 Timoteo 3:5" },
              { texto: "Cuidar la propia vida es egoísmo en un líder cristiano.", verdad: false, explica: "Cuidar la propia vida no es egoísmo: es la condición para poder cuidar a otros por mucho tiempo.", apoyo: "Cuidar la propia vida no es egoísmo: es la condición para poder cuidar a otros por mucho tiempo", ref: "1 Timoteo 4:16" },
              { texto: "Como Timoteo era joven, Pablo no le pidió que fuera ejemplo.", verdad: false, explica: "A Timoteo, que era joven, Pablo le pidió que fuera ejemplo en todo.", apoyo: "Y a Timoteo, que era joven, le pidió que fuera ejemplo en todo", ref: "1 Timoteo 4:12" },
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
            apoyo: "Separa cada día un tiempo con Dios, cada semana un día de descanso y un tiempo con tu familia, y cada año unos días para evaluar tu vida y tu ministerio",
            ref: "Marcos 6:31",
            situacion: "Eres coordinador del ministerio de jóvenes. Llevas meses sirviendo todos los días, y tu agenda está llena de reuniones.",
            escenas: [
              {
                id: "e1",
                narra: "Ya casi no te queda tiempo para orar ni para leer la Palabra.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Reorganizas tu agenda y separas cada día un tiempo con Dios.", valor: 2, explica: "Un líder que no tiene tiempo para orar y estudiar la Palabra tiene que reorganizar su agenda.", siguiente: "e2" },
                  { texto: "Oras un momento en el camino, entre una reunión y la otra.", valor: 1, explica: "Orar en el camino es bueno, pero el líder separa cada día un tiempo con Dios.", siguiente: "e2" },
                  { texto: "Sigues igual: tu servicio en las reuniones ya cuenta como oración.", valor: 0, explica: "La oración no es un adorno del liderazgo: es su motor. No puedes dar lo que no recibes de Dios.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Unas semanas después, sirves cansado y sin gozo, y en las reuniones das lo que ya no tienes.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Reconoces que te alejaste y vuelves a separar tu tiempo con Dios.", valor: 2, explica: "El liderazgo empieza en lo secreto: no puedes dar lo que no recibes de Dios.", siguiente: "e2" },
                  { texto: "Preparas mejor las reuniones para que nadie note cómo estás por dentro.", valor: 0, explica: "Muchos líderes no caen por falta de capacidad, sino por abandonar su vida con Dios.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Te sientes agotado, y tu familia te dice que casi no te ve.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Separas cada semana un día de descanso y un tiempo con tu familia.", valor: 2, explica: "Descansar no es pereza, y la familia es el primer ministerio del líder casado." },
                  { texto: "Tomas un día libre este mes y después vuelves al mismo ritmo de siempre.", valor: 1, explica: "Un día libre ayuda, pero el ritmo que Dios dio a la vida pide descanso cada semana." },
                  { texto: "Le explicas a tu familia que el ministerio tiene que ir primero.", valor: 0, explica: "La familia es el primer ministerio del líder casado: el que no sabe gobernar su casa, ¿cómo cuidará de la iglesia?" },
                ],
              },
              {
                id: "e3",
                narra: "Quieres que estos cambios duren y no se queden en buenas intenciones.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Escribes tu regla y le pides a alguien que te pregunte por ella.", valor: 2, explica: "Es la regla sencilla de la lección: escríbela y pide a alguien que te pregunte por ella." },
                  { texto: "Te propones cumplirla con todas tus fuerzas, pero no se lo cuentas a nadie.", valor: 1, explica: "Proponértelo es un buen paso, pero la lección pide escribir la regla y que alguien te pregunte por ella." },
                  { texto: "Lo dejas para el año que viene, cuando tengas menos trabajo.", valor: 0, explica: "El líder agotado sirve mal y termina enfermo o amargado: no conviene esperar." },
                ],
              },
            ],
          },
          {
            apoyo: "Cuidar la propia vida no es egoísmo: es la condición para poder cuidar a otros por mucho tiempo",
            ref: "1 Timoteo 4:16",
            situacion: "Eres un joven líder de célula. Hace poco te nombraron, y quieres cuidar bien a tu grupo por mucho tiempo.",
            escenas: [
              {
                id: "e1",
                narra: "Algunos dicen que eres muy joven para ser líder.",
                pregunta: "¿Cómo respondes?",
                opciones: [
                  { texto: "Te esfuerzas por ser ejemplo en todo, como Pablo le pidió a Timoteo.", valor: 2, explica: "A Timoteo, que era joven, Pablo le pidió que fuera ejemplo en todo." },
                  { texto: "Les explicas que ya estudiaste mucho la Biblia para poder dirigir.", valor: 1, explica: "Estudiar ayuda, pero a Timoteo, que era joven, Pablo le pidió algo más: que fuera ejemplo en todo." },
                  { texto: "Les exiges que te respeten, porque ahora tienes un cargo en la iglesia.", valor: 0, explica: "Pablo no le pidió a Timoteo que exigiera respeto, sino que fuera ejemplo en todo." },
                ],
              },
              {
                id: "e2",
                narra: "Un hermano te dice que dedicar tiempo a cuidarte a ti mismo es egoísmo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que cuidarte es la condición para cuidar a otros por mucho tiempo.", valor: 2, explica: "Pablo dice: «Ten cuidado de ti mismo y de la doctrina». Cuidar la propia vida no es egoísmo." },
                  { texto: "Que tal vez tiene razón, pero que tú sí necesitas descansar un poco.", valor: 1, explica: "Descansar está bien, pero cuidar la propia vida no es egoísmo: es la condición para cuidar a otros." },
                  { texto: "Le das la razón y dejas tu tiempo con Dios y tu día de descanso.", valor: 0, explica: "Cuidar la propia vida no es egoísmo: el líder tiene cuidado de sí mismo y de la doctrina." },
                ],
              },
              {
                id: "e3",
                narra: "Llega el fin de año, y todo el tiempo has estado ocupado con la célula.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Separas unos días para evaluar con calma tu vida y tu ministerio.", valor: 2, explica: "Es parte de la regla sencilla: cada año, unos días para evaluar tu vida y tu ministerio." },
                  { texto: "Haces una lista de todas las actividades que salieron bien en la célula.", valor: 1, explica: "Revisar las actividades ayuda, pero la evaluación es de tu vida y de tu ministerio." },
                  { texto: "Empiezas el año nuevo con más actividades, sin detenerte a pensar.", valor: 0, explica: "Cada año conviene separar unos días para evaluar tu vida y tu ministerio." },
                ],
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
            apoyo: "El líder espiritual sabe que su fuerza no está en sus planes, sino en la presencia de Dios",
            ref: "Éxodo 33:15",
            clave: {
              id: "pr-n3-liderazgo-1-4-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué la vida con Dios es la fuente del liderazgo cristiano?",
              ideas: [
                { id: "presencia", peso: 50, texto: "La fuerza del líder no está en sus planes, sino en la presencia de Dios, como sabía Moisés.", formas: ["presencia de dios", "su presencia", "(fuerza|poder) (esta|viene) (en|de) dios", "fuerza (de|en) dios", "moises"] },
                { id: "motor", peso: 50, texto: "La oración no es un adorno del liderazgo, sino su motor: no puedes dar lo que no recibes de Dios.", formas: ["motor", "no (puede|puedes|podemos|puedo) dar lo que no", "dar lo que no (recibe|recibes|recibimos|recibo)", "lo que (recibe|recibes|recibimos) de dios", "(empieza|nace|comienza) en lo secreto"] },
              ],
              modelo: "Porque la fuerza del líder no está en sus planes, sino en la presencia de Dios, como sabía Moisés. La oración no es un adorno, sino el motor del liderazgo: no puedes dar lo que no recibes de Dios.",
            },
          },
          {
            apoyo: "Un líder que no tiene tiempo para orar y estudiar la Palabra tiene que reorganizar su agenda",
            ref: "Hechos 6:4",
            clave: {
              id: "pr-n3-liderazgo-1-4-a6-2",
              tipo: "corta",
              pregunta: "Muchos líderes caen por abandonar su vida con Dios. ¿Qué debe hacer un líder muy ocupado para no caer así?",
              ideas: [
                { id: "agenda", peso: 50, texto: "Reorganizar su agenda para tener tiempo de orar y estudiar la Palabra, como los apóstoles.", formas: ["reorganiz*", "organiz* (su|la|mi|tu) (agenda|tiempo|horario)", "(agenda|horario)", "persist* en la oracion", "apostoles"] },
                { id: "tiempo", peso: 50, texto: "Separar cada día un tiempo con Dios, para orar y estudiar la Palabra.", formas: ["cada (dia|manana|noche)", "todos los (dias|dia)", "diari*", "tiempo (con|para) dios", "tiempo (para|de) orar", "orar y (estudiar|leer)", "(estudiar|leer) la (palabra|biblia)", "tiempo de oracion"] },
              ],
              modelo: "Debe reorganizar su agenda, como hicieron los apóstoles, para persistir en la oración y en la Palabra. Y separar cada día un tiempo con Dios para orar y estudiar la Palabra.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El trabajo en equipo
    "n3-liderazgo-1-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo atendía Moisés al pueblo antes del consejo de Jetro?", reverso: "Él solo, desde la mañana hasta la tarde.", apoyo: "Moisés atendía él solo al pueblo desde la mañana hasta la tarde" },
              { frente: "¿Qué le dijo Jetro a Moisés al verlo?", reverso: "«No está bien lo que haces».", apoyo: "Jetro le dijo: «No está bien lo que haces»" },
              { frente: "¿Qué asuntos juzgarían los hombres que escogiera Moisés?", reverso: "Los asuntos pequeños, mientras él atendía los grandes.", apoyo: "para que juzgaran los asuntos pequeños, mientras él atendía los grandes" },
              { frente: "¿Cómo debían ser los hombres que Moisés escogería?", reverso: "Capaces, temerosos de Dios y honrados.", apoyo: "escoger hombres capaces, temerosos de Dios y honrados" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué advertencia le hizo Jetro a Moisés?", reverso: "Así no vas a durar.", apoyo: "le hizo una advertencia que sigue salvando ministerios: así no vas a durar" },
              { frente: "¿Qué es la iglesia, según Romanos 12?", reverso: "Un cuerpo con muchos miembros, que no tienen todos la misma función.", apoyo: "La iglesia es un cuerpo con muchos miembros, y no todos tienen la misma función" },
              { frente: "¿Qué hace el buen líder con los dones de cada uno?", reverso: "Los descubre y los pone a servir.", apoyo: "El buen líder no hace todo: descubre los dones de cada uno y los pone a servir" },
              { frente: "¿Por qué en equipo se trabaja mejor?", reverso: "Porque se levanta al que cae y se resiste más.", apoyo: "en equipo se trabaja mejor, se levanta al que cae y se resiste más" },
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
            consigna: "El consejo de Jetro: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "jetro", texto: "Jetro", x: 20, y: 10 },
              { id: "moises", texto: "Moisés", x: 75, y: 10 },
              { id: "capaces", texto: "Hombres capaces y temerosos de Dios", x: 25, y: 50 },
              { id: "grandes", texto: "Los asuntos grandes", x: 78, y: 62 },
              { id: "pequenos", texto: "Los asuntos pequeños", x: 25, y: 90 },
            ],
            enlaces: [
              { de: "jetro", a: "moises", relacion: "aconsejó a" },
              { de: "moises", a: "capaces", relacion: "debía escoger a" },
              { de: "capaces", a: "pequenos", relacion: "juzgarían" },
              { de: "moises", a: "grandes", relacion: "atendería" },
            ],
            distractores: ["despidió a", "no necesitaba a"],
            apoyo: "Le aconsejó enseñar al pueblo y escoger hombres capaces, temerosos de Dios y honrados, para que juzgaran los asuntos pequeños, mientras él atendía los grandes",
            ref: "Éxodo 18:17-18",
            explica: "Jetro aconsejó a Moisés escoger hombres capaces, temerosos de Dios y honrados, para que juzgaran los asuntos pequeños, mientras él atendía los grandes: así el trabajo no sería demasiado pesado para él solo.",
          },
          {
            consigna: "Delegar o hacerlo todo: elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "delega", texto: "El líder que delega", x: 25, y: 12 },
              { id: "todo", texto: "El líder que lo hace todo", x: 75, y: 12 },
              { id: "trabajo", texto: "Su trabajo", x: 12, y: 45 },
              { id: "agota", texto: "El agotamiento", x: 88, y: 45 },
              { id: "otros", texto: "Otros servidores", x: 30, y: 90 },
              { id: "demas", texto: "Los demás", x: 70, y: 90 },
            ],
            enlaces: [
              { de: "delega", a: "trabajo", relacion: "multiplica" },
              { de: "delega", a: "otros", relacion: "forma a" },
              { de: "todo", a: "agota", relacion: "termina en" },
              { de: "todo", a: "demas", relacion: "deja sin crecer a" },
            ],
            distractores: ["pierde", "aleja a"],
            apoyo: "Un líder que delega multiplica su trabajo y forma a otros; uno que lo hace todo se agota y deja a los demás sin crecer",
            ref: "Éxodo 18:17-18",
            explica: "Un líder que delega multiplica su trabajo y forma a otros; uno que lo hace todo se agota y deja a los demás sin crecer. Por eso Jetro le advirtió a Moisés: así no vas a durar.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Hechos 6 tiene un error. Tócala.",
            frases: [
              "Las viudas de los griegos fueron desatendidas.",
              "Los apóstoles resolvieron el problema ellos solos.",
              "La iglesia buscó siete varones de buen testimonio.",
              "El resultado fue que la palabra del Señor crecía.",
            ],
            malo: 1,
            correccion: "Los apóstoles no lo resolvieron solos ni lo ignoraron: pidieron a la iglesia buscar siete varones para encargarles ese trabajo.",
            apoyo: "los apóstoles no lo resolvieron solos ni lo ignoraron",
            ref: "Hechos 6:3-4",
            explica: "Cuando las viudas de los griegos fueron desatendidas, los apóstoles no lo resolvieron solos ni lo ignoraron: encargaron ese trabajo a siete varones, y la palabra del Señor crecía.",
          },
          {
            consigna: "Una de estas frases sobre cómo delegó la iglesia de Hechos 6 tiene un error. Tócala.",
            frases: [
              "Los apóstoles no ignoraron el problema de las viudas.",
              "Los siete debían estar llenos del Espíritu Santo y de sabiduría.",
              "Los apóstoles dejaron la oración para atender ellos mismos a las viudas.",
              "Después de delegar, la palabra del Señor crecía.",
            ],
            malo: 2,
            correccion: "Los apóstoles encargaron ese trabajo a los siete, y ellos siguieron en la oración y la Palabra.",
            apoyo: "para encargarles ese trabajo, y ellos siguieron en la oración y la Palabra",
            ref: "Hechos 6:3-4",
            explica: "Los apóstoles pidieron a la iglesia buscar siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría, para encargarles ese trabajo, y ellos siguieron en la oración y la Palabra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para delegar, del primero al último.",
            pasos: [
              "Escoger personas fieles y con el carácter adecuado",
              "Explicar con claridad la tarea y hasta dónde llega su autoridad",
              "Dar las herramientas y acompañar al principio",
              "Dejar hacer, sin quitarle la tarea a la primera dificultad",
              "Evaluar juntos, corregir con amor y reconocer el trabajo",
            ],
            apoyo: "el buen líder escoge, explica, acompaña, deja hacer, evalúa y cuida la unidad del equipo",
            explica: "Para delegar, el buen líder escoge personas fieles, explica con claridad la tarea, da las herramientas y acompaña al principio, deja hacer y, al final, evalúa junto con ellos.",
          },
          {
            consigna: "Vas a delegar la bienvenida de tu célula. Ordena lo que haces, del primer paso al último.",
            pasos: [
              "Escoges a una hermana fiel, no solo a la que está libre",
              "Le explicas qué esperas y hasta dónde puede decidir",
              "La acompañas las primeras veces y le das lo que necesita",
              "La dejas hacer, aunque al principio le cueste",
              "Evalúan juntos y le reconoces lo que hizo bien",
            ],
            apoyo: "Escoger personas fieles y con el carácter adecuado, no solo disponibles",
            explica: "Se escoge a alguien fiel y con buen carácter, se le explica la tarea y su autoridad, se le acompaña al principio, se le deja hacer sin quitarle la tarea y al final se evalúa juntos, corrigiendo con amor y reconociendo lo bien hecho.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Dejar hacer, sin quitarle la tarea a la primera dificultad",
            ref: "Éxodo 18:21",
            situacion: "Eres líder de una célula que creció mucho. Ya no alcanzas a preparar tú solo la enseñanza, la alabanza y la merienda.",
            escenas: [
              {
                id: "e1",
                narra: "Decides delegar la alabanza de cada semana.",
                pregunta: "¿A quién se la encargas?",
                opciones: [
                  { texto: "A un hermano fiel y de buen carácter, que ya canta en el grupo.", valor: 2, explica: "Se escogen personas fieles y con el carácter adecuado, y el buen líder descubre los dones de cada uno." },
                  { texto: "Al que mejor canta, aunque a veces falta sin avisar a nadie.", valor: 1, explica: "El don importa, pero se escogen personas fieles y con el carácter adecuado." },
                  { texto: "Al primero que levante la mano: lo que importa es que haya alguien.", valor: 0, explica: "Se escogen personas fieles y con el carácter adecuado, no solo disponibles." },
                ],
              },
              {
                id: "e2",
                narra: "El hermano acepta, pero no sabe bien qué se espera de él.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le explicas la tarea, qué esperas y hasta dónde puede decidir.", valor: 2, explica: "Se explica con claridad la tarea, el resultado esperado y hasta dónde llega su autoridad." },
                  { texto: "Le das la lista de los cantos y le dices que lo demás lo decida él.", valor: 1, explica: "Darle herramientas ayuda, pero también hay que explicarle con claridad la tarea y el resultado esperado." },
                  { texto: "Le dices que haga lo que le parezca mejor, sin explicarle nada más.", valor: 0, explica: "Delegar no es soltar la tarea: se explica con claridad qué se espera y hasta dónde llega su autoridad." },
                ],
              },
              {
                id: "e3",
                narra: "La primera semana, la alabanza no sale bien y alguien se queja contigo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo animas, lo acompañas y lo dejas seguir con la tarea.", valor: 2, explica: "Se acompaña al principio y se deja hacer, sin quitarle la tarea a la primera dificultad." },
                  { texto: "Le dejas la tarea, pero le dices que ya no puede volver a fallar.", valor: 1, explica: "Dejarle la tarea está bien, pero al principio se le acompaña, y se corrige con amor." },
                  { texto: "Le quitas la tarea y vuelves a hacerla tú, para que salga bien.", valor: 0, explica: "No se quita la tarea a la primera dificultad: el que lo hace todo se agota y deja a los demás sin crecer." },
                ],
              },
              {
                id: "e4",
                narra: "Después de un mes, la alabanza ya va mucho mejor.",
                pregunta: "¿Cómo cierras esta etapa?",
                opciones: [
                  { texto: "Evalúan juntos, corriges con amor y reconoces lo bien hecho.", valor: 2, explica: "El último paso es evaluar juntos, corregir con amor y reconocer el trabajo bien hecho." },
                  { texto: "Le dices que lo hizo bien, pero no hablan de lo que se puede mejorar.", valor: 1, explica: "Reconocer es bueno, pero también se evalúa juntos y se corrige con amor." },
                  { texto: "No le dices nada: si todo va bien, no hace falta hablar de eso con él.", valor: 0, explica: "Al delegar se evalúa juntos y se reconoce el trabajo bien hecho." },
                ],
              },
            ],
          },
          {
            apoyo: "Un equipo se cuida con comunicación clara, metas compartidas, oración juntos y reconocimiento",
            ref: "Eclesiastés 4:9-10",
            situacion: "Eres coordinador del equipo de servidores del culto. Tienes un buen equipo, pero empiezan a aparecer roces.",
            escenas: [
              {
                id: "e1",
                narra: "Un servidor te cuenta a solas una crítica sobre otro compañero del equipo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides que hable de frente y con amor con su compañero.", valor: 2, explica: "Los problemas se hablan de frente y con amor: las críticas a espaldas de otros destruyen la confianza." },
                  { texto: "Lo escuchas y le prometes que tú vas a hablar con el otro por él.", valor: 1, explica: "Querer arreglarlo está bien, pero los problemas se hablan de frente, entre los que los tienen." },
                  { texto: "Lo escuchas y le cuentas lo que otros también dicen de ese hermano.", valor: 0, explica: "Los rumores y las críticas a espaldas de otros destruyen la confianza." },
                ],
              },
              {
                id: "e2",
                narra: "En la reunión del equipo, cada uno quiere algo distinto para el próximo mes.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oran juntos y se ponen de acuerdo en metas compartidas.", valor: 2, explica: "Un equipo se cuida con metas compartidas y con oración juntos." },
                  { texto: "Decides tú las metas del mes y se las explicas bien a todos.", valor: 1, explica: "Explicarlas con claridad ayuda, pero las metas del equipo se comparten." },
                  { texto: "Dejas que cada uno haga lo suyo, sin metas para todo el equipo.", valor: 0, explica: "Sin metas compartidas, el equipo pierde su unidad." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del mes, el equipo trabajó mucho y todo salió bien.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Reconoces delante del equipo el trabajo que hizo cada uno.", valor: 2, explica: "El reconocimiento cuida la unidad del equipo." },
                  { texto: "Les mandas un mensaje general para darles las gracias por todo.", valor: 1, explica: "Agradecer está bien, pero el reconocimiento llega mejor cuando se nombra el trabajo de cada uno." },
                  { texto: "Le cuentas al pastor lo bien que dirigiste tú al equipo este mes.", valor: 0, explica: "El líder humilde da el reconocimiento a otros: así se cuida la unidad del equipo." },
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
            consigna: "¿Cuida la unidad del equipo o destruye la confianza? Lleva cada frase a su grupo.",
            grupos: ["Cuida la unidad", "Destruye la confianza"],
            frases: [
              { texto: "Comunicar las cosas con claridad", grupo: 0 },
              { texto: "Tener metas compartidas", grupo: 0 },
              { texto: "Orar juntos", grupo: 0 },
              { texto: "Reconocer el trabajo de los demás", grupo: 0 },
              { texto: "Contar rumores sobre un compañero", grupo: 1 },
              { texto: "Criticar a otros a sus espaldas", grupo: 1 },
              { texto: "No hablar nunca de frente los problemas", grupo: 1 },
            ],
            apoyo: "Los rumores y las críticas a espaldas de otros destruyen la confianza",
            explica: "Un equipo se cuida con comunicación clara, metas compartidas, oración juntos y reconocimiento; los rumores y las críticas a espaldas de otros destruyen la confianza, porque los problemas se hablan de frente y con amor.",
          },
          {
            consigna: "¿Es delegar bien o es delegar mal? Lleva cada frase a su grupo.",
            grupos: ["Delegar bien", "Delegar mal"],
            frases: [
              { texto: "Escoger a alguien fiel, aunque no sea el más disponible", grupo: 0 },
              { texto: "Decir con claridad hasta dónde llega su autoridad", grupo: 0 },
              { texto: "Acompañar al principio", grupo: 0 },
              { texto: "Reconocer el trabajo bien hecho", grupo: 0 },
              { texto: "Escoger solo al que tiene tiempo libre", grupo: 1 },
              { texto: "Quitarle la tarea a la primera dificultad", grupo: 1 },
              { texto: "Dar la tarea sin explicar qué se espera", grupo: 1 },
            ],
            apoyo: "Dejar hacer, sin quitarle la tarea a la primera dificultad",
            explica: "Delegar bien es escoger personas fieles, explicar con claridad la tarea y su autoridad, acompañar al principio, dejar hacer y reconocer el trabajo bien hecho.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jetro advirtió a Moisés que no podía hacerlo todo solo y le aconsejó delegar en personas capaces y temerosas de Dios",
            ref: "Éxodo 18:17-18",
            clave: {
              id: "pr-n3-liderazgo-1-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué le aconsejó Jetro a Moisés, y qué enseña eso al líder de un equipo?",
              ideas: [
                { id: "solo", peso: 30, texto: "El trabajo era demasiado pesado: Moisés no podía hacerlo todo solo.", formas: ["(demasiado|muy) pesado", "no (podia|puede|podra|podras|puedes) hacerlo", "hacerlo (todo|el) solo", "(todo|el) solo", "no (va|vas|iba|ibas) a durar"] },
                { id: "escoger", peso: 40, texto: "Le aconsejó escoger hombres capaces, temerosos de Dios y honrados, para que juzgaran los asuntos pequeños mientras él atendía los grandes.", formas: ["escog* (hombres|personas|gente|a)", "hombres capaces", "personas capaces", "temerosos de dios", "asuntos pequenos", "capaces y (temerosos|honrados)"] },
                { id: "equipo", peso: 30, texto: "El líder no hace todo: delega y trabaja en equipo, descubriendo los dones de cada uno.", formas: ["en equipo", "no (hace|hacer|haga|debe) todo", "deleg*", "dones de cada", "compart* (el|la) (trabajo|carga)", "repart* (el|la) (trabajo|carga)"] },
              ],
              modelo: "Jetro le dijo que el trabajo era demasiado pesado y que no podía hacerlo solo. Le aconsejó escoger hombres capaces y temerosos de Dios para los asuntos pequeños. Así el líder aprende a delegar y a trabajar en equipo.",
            },
          },
          {
            apoyo: "La iglesia es un cuerpo con muchos miembros, y no todos tienen la misma función",
            ref: "Romanos 12:4-5",
            clave: {
              id: "pr-n3-liderazgo-1-5-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué el buen líder no hace todo él solo? Usa lo que enseñan Romanos 12 y Eclesiastés 4.",
              ideas: [
                { id: "cuerpo", peso: 50, texto: "La iglesia es un cuerpo con muchos miembros: el buen líder descubre los dones de cada uno y los pone a servir.", formas: ["cuerpo", "muchos miembros", "(misma|diferente*|distinta*) (funcion|funciones)", "dones de cada", "(descubr*|ve|reconoce) (los|sus) dones", "pone* a servir"] },
                { id: "dos", peso: 50, texto: "Mejores son dos que uno: en equipo se trabaja mejor, se levanta al que cae y se resiste más.", formas: ["mejores son dos", "dos que uno", "en equipo", "levant* al que cae", "al que cae", "resist* mas", "se trabaja mejor"] },
              ],
              modelo: "Porque la iglesia es un cuerpo con muchos miembros, y no todos tienen la misma función: el buen líder descubre los dones de cada uno y los pone a servir. Además, mejores son dos que uno: en equipo se levanta al que cae.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Conflictos, decisiones y nuevos líderes
    "n3-liderazgo-1-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Mateo 18:15, ¿qué enseñó Jesús a hacer con quien nos ofendió?", reverso: "Hablar primero a solas con esa persona.", apoyo: "Jesús enseñó a hablar primero a solas con quien nos ofendió" },
              { frente: "¿Cuándo enfrenta el líder los conflictos?", reverso: "A tiempo, sin esconderlos ni agrandarlos.", apoyo: "El líder no esconde los conflictos ni los agranda: los enfrenta a tiempo" },
              { frente: "¿Qué hizo la iglesia de Jerusalén ante el conflicto sobre los gentiles?", reverso: "Se reunieron, escucharon, buscaron la Escritura y decidieron juntos.", apoyo: "se reunieron, escucharon, buscaron la Escritura y llegaron a una decisión común" },
              { frente: "¿Qué puede hacer Dios con los conflictos?", reverso: "Sanarlos y sacar fruto de ellos.", apoyo: "Dios puede sanar los conflictos y sacar fruto de ellos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con qué actitudes pide Pablo que nos soportemos unos a otros?", reverso: "Con paciencia y amor.", apoyo: "Pablo pide soportarnos con paciencia y amor" },
              { frente: "¿Qué les pasó a Pablo y Bernabé en Hechos 15:39?", reverso: "Tuvieron un desacuerdo fuerte y se separaron.", apoyo: "Incluso Pablo y Bernabé tuvieron un desacuerdo fuerte y se separaron" },
              { frente: "Años después, ¿qué escribió Pablo de Marcos?", reverso: "Que le era útil para el ministerio.", apoyo: "años después, Pablo escribió que Marcos le era útil para el ministerio" },
              { frente: "Además de escuchar a todas las partes, ¿qué busca el líder en un conflicto?", reverso: "La reconciliación.", apoyo: "escucha a todas las partes y busca la reconciliación" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El líder no esconde los conflictos ni los agranda: los enfrenta a tiempo, escucha a todas las partes y busca la reconciliación",
            ref: "Efesios 4:2-3",
            situacion: "Eres líder del equipo de bienvenida. Dos servidores, Ana y Raúl, discutieron fuerte antes del culto y ya no se hablan.",
            escenas: [
              {
                id: "e1",
                narra: "Ana te lo cuenta molesta; Raúl no te ha dicho nada.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Hablas pronto con cada uno y escuchas a las dos partes.", valor: 2, explica: "El líder enfrenta los conflictos a tiempo y escucha a todas las partes.", siguiente: "e2" },
                  { texto: "Oras por ellos y esperas unas semanas, a ver si se calman solos.", valor: 1, explica: "Orar es bueno, pero el líder no esconde los conflictos: los enfrenta a tiempo.", siguiente: "e2" },
                  { texto: "Le das la razón a Ana, porque fue la primera en contártelo.", valor: 0, explica: "El líder escucha a todas las partes antes de pensar quién tiene la razón.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ana te dice: No le voy a hablar; que él venga a pedirme perdón.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que, como enseñó Jesús, hable primero a solas con él.", valor: 2, explica: "Jesús enseñó a hablar primero a solas con quien nos ofendió.", siguiente: "e3" },
                  { texto: "Que le escriba un mensaje largo explicándole por qué se ofendió.", valor: 1, explica: "Expresarlo es un paso, pero Jesús enseñó a hablar primero a solas con quien nos ofendió.", siguiente: "e3" },
                  { texto: "Que lo comente con otros del equipo, para ver quién tiene la razón.", valor: 0, explica: "Así el conflicto se agranda: los problemas se hablan primero a solas, de frente y con amor.", siguiente: "e2b" },
                ],
              },
              {
                id: "e2b",
                narra: "Al día siguiente, medio equipo habla del pleito y algunos ya tomaron partido.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Frenas los comentarios y buscas que Ana y Raúl hablen a solas.", valor: 2, explica: "El líder no agranda los conflictos: los enfrenta y busca la reconciliación.", siguiente: "e3" },
                  { texto: "Dejas que se calme solo con el tiempo, porque ya no tiene arreglo.", valor: 0, explica: "Dios puede sanar los conflictos y sacar fruto de ellos: el líder busca la reconciliación.", siguiente: "e3" },
                ],
              },
              {
                id: "e3",
                narra: "Después de hablar, los dos se piden perdón.",
                pregunta: "¿Cómo sigues?",
                opciones: [
                  { texto: "Oran juntos y se proponen cuidar la unidad del equipo.", valor: 2, explica: "Pablo pide ser «solícitos en guardar la unidad del Espíritu en el vínculo de la paz»." },
                  { texto: "Les agradeces el paso que dieron y sigues con el culto.", valor: 1, explica: "Agradecer está bien; además conviene cuidar juntos la unidad del equipo." },
                  { texto: "Les recuerdas delante del equipo lo mal que se portaron.", valor: 0, explica: "Eso agranda el conflicto: el líder busca la reconciliación y la unidad." },
                ],
              },
            ],
          },
          {
            apoyo: "La iglesia de Jerusalén enfrentó un conflicto serio sobre los gentiles: se reunieron, escucharon, buscaron la Escritura y llegaron a una decisión común",
            ref: "Efesios 4:2-3",
            situacion: "Eres líder de una célula. Los hermanos discuten fuerte sobre cómo ayudar a una familia necesitada del barrio, y el grupo se está dividiendo.",
            escenas: [
              {
                id: "e1",
                narra: "En plena reunión, la discusión sube de tono y algunos toman partido.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Calmas la discusión y propones reunirse para escuchar a todos.", valor: 2, explica: "Como en Jerusalén, el líder enfrenta el conflicto a tiempo: se reúnen y se escucha a todos." },
                  { texto: "Pides que oren y dejas el tema para la próxima reunión del grupo.", valor: 1, explica: "Orar es bueno, pero el conflicto también se enfrenta a tiempo y escuchando a todas las partes." },
                  { texto: "Decides tú solo quién tiene la razón y das el tema por cerrado.", valor: 0, explica: "El líder no esconde los conflictos: escucha a todas las partes y busca una decisión común." },
                ],
              },
              {
                id: "e2",
                narra: "En la reunión siguiente, cada uno explica lo que piensa.",
                pregunta: "¿Cómo la guías?",
                opciones: [
                  { texto: "Escuchas a todas las partes y buscan juntos lo que dice la Escritura.", valor: 2, explica: "Así lo hizo la iglesia de Jerusalén: se reunieron, escucharon y buscaron la Escritura." },
                  { texto: "Escuchas a todos, y al final haces lo que pensabas desde el principio.", valor: 1, explica: "Escuchar es un paso, pero la meta es buscar la Escritura y llegar a una decisión común." },
                  { texto: "Escuchas solo a los que piensan como tú, para avanzar más rápido.", valor: 0, explica: "El líder escucha a todas las partes y busca la reconciliación." },
                ],
              },
              {
                id: "e3",
                narra: "Después de orar y escuchar, llegan a un acuerdo.",
                pregunta: "¿Cómo terminas?",
                opciones: [
                  { texto: "Lo presentan como una decisión común y cuidan juntos la unidad.", valor: 2, explica: "Como en Hechos 15, llegan a una decisión común y guardan la unidad del Espíritu en el vínculo de la paz." },
                  { texto: "Anuncias el acuerdo y pasas rápido a otro tema de la reunión.", valor: 1, explica: "El acuerdo es bueno; además conviene cuidar juntos la unidad del grupo." },
                  { texto: "Les recuerdas a los que pensaban distinto que estaban equivocados.", valor: 0, explica: "Eso agranda el conflicto: el líder busca la reconciliación y la unidad." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Proverbios 15:22, ¿dónde se afirman los pensamientos? Toca las palabras que lo dicen.",
            texto: "Los pensamientos son frustrados donde no hay consejo; mas en la [[multitud de consejeros]] se afirman",
            apoyo: "El líder sabio no decide solo",
            ref: "Proverbios 15:22",
            explica: "Los pensamientos se frustran donde no hay consejo, pero se afirman en la multitud de consejeros: el líder sabio no decide solo, sino que pide consejo a personas maduras y escucha a su equipo.",
          },
          {
            consigna: "La carta del concilio de Jerusalén une dos guías en su decisión. Toca a quiénes les pareció bien.",
            texto: "Porque ha parecido bien al [[Espíritu Santo]], y a [[nosotros]]",
            apoyo: "Las buenas decisiones en la iglesia unen la guía del Espíritu con el discernimiento de un grupo que busca a Dios en unidad",
            ref: "Hechos 15:28",
            explica: "La carta del concilio dice que la decisión pareció bien al Espíritu Santo y a ellos: las buenas decisiones unen la guía del Espíritu con el discernimiento de un grupo que busca a Dios en unidad.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un servidor de tu equipo te dice: Me ofrecieron dirigir el ministerio de niños y tengo que responder mañana. ¿Cómo decido?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que ore, busque qué dice la Escritura y pida consejo a personas maduras.", bien: true, explica: "El líder sabio no decide solo: ora, busca lo que dice la Escritura, pide consejo a personas maduras y escucha a su equipo." },
              { texto: "Que decida solo y rápido, porque nadie conoce su vida mejor que él mismo.", explica: "Los pensamientos son frustrados donde no hay consejo: el líder sabio no decide solo." },
              { texto: "Que haga lo que le diga la primera persona a la que le pregunte mañana.", explica: "No basta un solo consejo: en la multitud de consejeros se afirman los pensamientos." },
              { texto: "Que no hable con nadie y que espere una señal del cielo antes de responder.", explica: "Santiago promete sabiduría al que la pide con fe, y los pensamientos se afirman en la multitud de consejeros." },
            ],
            apoyo: "ora, busca lo que dice la Escritura, pide consejo a personas maduras y escucha a su equipo",
            ref: "Proverbios 15:22",
            explica: "El líder sabio no decide solo: ora, busca lo que dice la Escritura, pide consejo a personas maduras y escucha a su equipo.",
          },
          {
            caso: "Una compañera del equipo de jóvenes te dice: Tú eres el líder; decide tú solo el nuevo día de la reunión y ya está.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que vas a orar, buscar lo que dice la Escritura y escuchar al equipo antes.", bien: true, explica: "Las buenas decisiones unen la guía del Espíritu con el discernimiento de un grupo que busca a Dios en unidad." },
              { texto: "Que tiene razón: el líder decide solo, y los demás solo tienen que obedecer.", explica: "El líder sabio no decide solo: escucha a su equipo." },
              { texto: "Que lo van a votar ahora mismo, sin orar ni hablarlo más entre ustedes.", explica: "Decidir rápido sin orar deja fuera la guía del Espíritu: el líder ora y busca lo que dice la Escritura." },
              { texto: "Que ya lo tenías decidido, y que después les vas a pedir que oren por eso.", explica: "Se ora y se escucha al equipo antes de decidir, no después: así se busca a Dios en unidad." },
            ],
            apoyo: "Las buenas decisiones en la iglesia unen la guía del Espíritu con el discernimiento de un grupo que busca a Dios en unidad",
            ref: "Hechos 15:28",
            explica: "El líder sabio no decide solo: ora, busca lo que dice la Escritura y escucha a su equipo, uniendo la guía del Espíritu con el discernimiento del grupo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se forman nuevos líderes.",
            texto: "Moisés formó a [[Josué]], y Pablo formó a [[Timoteo]], a quien le encargó formar a [[otros]].",
            distractores: ["Eliseo", "Bernabé", "nadie"],
            errores: {
              Eliseo: "Elías formó a Eliseo; Moisés formó a Josué.",
              "Bernabé": "Bernabé formó a Pablo, y Pablo formó a Timoteo.",
              nadie: "Pablo le encargó a Timoteo formar a otros.",
            },
            apoyo: "Elías formó a Eliseo; Bernabé, a Pablo; y Pablo, a Timoteo, a quien le encargó formar a otros",
            ref: "2 Timoteo 2:2",
            explica: "Moisés formó a Josué, Elías a Eliseo, Bernabé a Pablo y Pablo a Timoteo, a quien le encargó formar a otros: un líder no termina su tarea hasta que hay otros preparados para continuarla.",
          },
          {
            consigna: "Completa cuál es la meta del líder.",
            texto: "Muchos comienzan bien; la [[meta]] del líder es [[terminar]] bien, [[fiel]] a Cristo hasta el final.",
            distractores: ["excusa", "comenzar", "famoso"],
            errores: {
              excusa: "La meta del líder es terminar bien.",
              comenzar: "Muchos comienzan bien; la meta del líder es terminar bien.",
              famoso: "La meta es terminar fiel a Cristo hasta el final.",
            },
            apoyo: "Muchos comienzan bien; la meta del líder es terminar bien, fiel a Cristo hasta el final",
            ref: "2 Timoteo 4:7",
            explica: "Al final de su vida, Pablo pudo decir que había acabado la carrera y guardado la fe: muchos comienzan bien, pero la meta del líder es terminar bien, fiel a Cristo hasta el final.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la formación de nuevos líderes: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un líder cristiano termina su tarea cuando él ya no puede seguir.", verdad: false, explica: "Un líder cristiano no termina su tarea hasta que hay otros preparados para continuarla.", apoyo: "Un líder cristiano no termina su tarea hasta que hay otros preparados para continuarla" },
              { texto: "Pablo le encargó a Timoteo formar a otros.", verdad: true, explica: "Pablo formó a Timoteo y le encargó formar a otros.", apoyo: "y Pablo, a Timoteo, a quien le encargó formar a otros", ref: "2 Timoteo 2:2" },
              { texto: "Dios le mandó a Moisés poner las manos sobre Josué delante del pueblo.", verdad: true, explica: "Moisés formó a Josué, y Dios le mandó poner las manos sobre él delante del pueblo.", apoyo: "Moisés formó a Josué, y Dios le mandó poner las manos sobre él delante del pueblo" },
            ],
          },
          {
            consigna: "Sobre terminar bien la carrera: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Lo importante para un líder es comenzar bien, aunque después no termine bien.", verdad: false, explica: "Muchos comienzan bien; la meta del líder es terminar bien, fiel a Cristo hasta el final.", apoyo: "Muchos comienzan bien; la meta del líder es terminar bien, fiel a Cristo hasta el final" },
              { texto: "Al final de su vida, Pablo pudo decir que había guardado la fe.", verdad: true, explica: "Pablo pudo decir: «He peleado la buena batalla, he acabado la carrera, he guardado la fe».", apoyo: "Al final de su vida, Pablo pudo decir", ref: "2 Timoteo 4:7" },
              { texto: "Un buen líder se mide solo por lo que él mismo hace.", verdad: false, explica: "Un buen líder se mide también por los líderes que deja.", apoyo: "Un buen líder se mide también por los líderes que deja" },
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
            apoyo: "Un líder cristiano no termina su tarea hasta que hay otros preparados para continuarla",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-n3-liderazgo-1-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cuándo termina su tarea un líder cristiano? Da un ejemplo de la Biblia.",
              ideas: [
                { id: "otros", peso: 50, texto: "No termina su tarea hasta que hay otros preparados para continuarla.", formas: ["otros preparados", "(preparar|prepara|formar|forma|forme|formado|preparado) (a|otros|nuevos)", "continu*", "(siguen|sigan|seguir) (la|su|con|el)", "hasta que (hay|haya|otros)", "nuevos lideres"] },
                { id: "ejemplo", peso: 50, texto: "Como Moisés con Josué, Elías con Eliseo, Bernabé con Pablo y Pablo con Timoteo, a quien le encargó formar a otros.", formas: ["moises", "josue", "eliseo", "timoteo", "bernabe", "elias"] },
              ],
              modelo: "No termina su tarea hasta que hay otros preparados para continuarla. Por ejemplo, Moisés formó a Josué, y Pablo formó a Timoteo y le encargó formar a otros.",
            },
          },
          {
            apoyo: "Muchos comienzan bien; la meta del líder es terminar bien, fiel a Cristo hasta el final",
            ref: "2 Timoteo 4:7",
            clave: {
              id: "pr-n3-liderazgo-1-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir terminar bien la carrera, y qué pudo decir Pablo al final de su vida?",
              ideas: [
                { id: "fiel", peso: 50, texto: "Muchos comienzan bien; la meta del líder es terminar bien, fiel a Cristo hasta el final.", formas: ["fiel*", "fidelidad", "hasta el final", "hasta el fin", "(comienzan|empiezan) bien", "meta"] },
                { id: "pablo", peso: 50, texto: "Pablo pudo decir: He peleado la buena batalla, he acabado la carrera, he guardado la fe.", formas: ["buena batalla", "acabado la carrera", "(guardado|guarde|guardo) la fe", "pele* la", "acab* la carrera"] },
              ],
              modelo: "Terminar bien es seguir fiel a Cristo hasta el final, porque muchos comienzan bien pero no terminan. Pablo pudo decir que había peleado la buena batalla, acabado la carrera y guardado la fe.",
            },
          },
        ],
      },
    ],
  },
};
