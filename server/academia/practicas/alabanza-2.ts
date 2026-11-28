/**
 * Las prácticas de la materia `alabanza-2` (especialidad Alabanza y adoración): el adorador, su carácter y su vida.
 * Hechas solo con lo que dice cada lección (server/academia/contenido/alabanza-2.ts), con la guía de
 * docs/academia-practicas.md.
 *
 * La lección no habla de estilos de música ni de formas de expresión en el culto, y ninguna actividad las pregunta.
 * De la danza de David solo se pregunta lo que dice la lección: que danzó con toda su fuerza delante de Jehová y que
 * adoraba para Dios, no para cuidar su imagen. Cuando un servidor cae, las actividades dicen lo que dice la nota de la
 * lección (el amor no lo esconde ni lo expone, lo acompaña; se aparta un tiempo de la plataforma con sus pastores y
 * vuelve cuando ellos lo vean listo), sin nombrar pecados ni plazos. Las situaciones no preguntan quién puede dirigir
 * la alabanza ni predicar.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_ALABANZA_2: PracticasMateria = {
  materia: "alabanza-2",
  mision: {
    titulo: "Afinar el corazón antes que los instrumentos",
    intro:
      "Tu pastor te pidió acompañar durante un año a los nuevos del equipo de alabanza. Llegan cantantes, músicos y técnicos con mucho talento, y te van a preguntar qué mira Dios en el que sirve, cómo vivir en santidad toda la semana, qué hacer con el orgullo y los aplausos, cómo sostener un tiempo diario con Dios, cómo servir en equipo bajo la autoridad de los pastores y cómo seguir adorando cuando llega la prueba. Repasa las seis lecciones para acompañar a cada uno.",
    cierre:
      "Ya puedes acompañar al equipo en lo que Dios mira primero: un corazón que vuelve a él cuando cae, manos limpias y corazón puro, la humildad de quien sabe que todo lo recibió, una vida devocional que sostiene lo que se canta en público, un servicio unido bajo la autoridad de los pastores y una adoración que sigue firme a medianoche. Antes de afinar los instrumentos, hay que afinar el corazón.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Un corazón conforme al de Dios
    "alabanza-2-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué hijo de Isaí se fijó Samuel, y por qué?", reverso: "En Eliab, el mayor, por su apariencia.", apoyo: "se fijó en Eliab, el mayor, por su apariencia" },
              { frente: "¿A quién eligió Dios entre los hijos de Isaí?", reverso: "A David, el menor, que cuidaba las ovejas.", apoyo: "El elegido fue David, el menor, que cuidaba las ovejas" },
              { frente: "¿Cómo llamó Dios a David, según lo que recordó Pablo?", reverso: "Varón conforme a su corazón, que haría todo lo que él quiere.", apoyo: "Pablo recordó lo que Dios dijo de él: «He hallado a David hijo de Isaí, varón conforme a mi corazón, quien hará todo lo que yo quiero»" },
              { frente: "¿Qué hizo David cuando el profeta Natán lo confrontó?", reverso: "No se justificó: se arrepintió y le pidió a Dios un corazón limpio.", apoyo: "cuando el profeta Natán lo confrontó, no se justificó: se arrepintió" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según 1 Samuel 16:7, ¿qué mira el hombre?", reverso: "Lo que está delante de sus ojos.", apoyo: "pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón" },
              { frente: "¿Qué oficios tuvo David, según la lección?", reverso: "Fue pastor, músico y poeta.", apoyo: "David fue pastor, músico y poeta" },
              { frente: "¿Qué pecados cometió David?", reverso: "Adulterio y un asesinato.", apoyo: "David no fue perfecto: cometió adulterio y un asesinato" },
              { frente: "¿Por qué el adorador guarda su corazón sobre toda cosa?", reverso: "Porque de él mana la vida.", apoyo: "Por eso el adorador cuida lo más importante: «Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida»" },
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
            consigna: "¿Muestra un corazón conforme al de Dios o no lo muestra? Lleva cada frase a su grupo.",
            grupos: ["Un corazón conforme al de Dios", "No es un corazón conforme al de Dios"],
            frases: [
              { texto: "Busca a Dios en lo secreto, como David con las ovejas", grupo: 0 },
              { texto: "Obedece a Dios, aunque nadie lo vea", grupo: 0 },
              { texto: "Confía en Dios en el peligro", grupo: 0 },
              { texto: "Se arrepiente de verdad cuando peca", grupo: 0 },
              { texto: "Se justifica cuando alguien lo confronta por su pecado", grupo: 1 },
              { texto: "Obedece a Dios solo cuando otros lo están mirando", grupo: 1 },
              { texto: "Cuida su talento, pero descuida lo que hay en su corazón", grupo: 1 },
            ],
            apoyo: "David fue un varón conforme al corazón de Dios: buscaba a Dios, le obedecía y, cuando pecó, se arrepintió de verdad y pidió un corazón limpio",
            ref: "Hechos 13:22",
            explica: "Un corazón conforme al de Dios busca a Dios en lo secreto, le obedece aunque nadie lo vea, confía en él en el peligro y se arrepiente de verdad cuando peca. David no se justificó cuando Natán lo confrontó.",
          },
          {
            consigna: "En el equipo de alabanza, ¿quién muestra un corazón conforme al de Dios? Lleva cada ejemplo a su grupo.",
            grupos: ["Un corazón conforme al de Dios", "No es un corazón conforme al de Dios"],
            frases: [
              { texto: "Una cantante ora a solas antes de que llegue el equipo", grupo: 0 },
              { texto: "Un guitarrista obedece a Dios en su casa, donde nadie lo ve", grupo: 0 },
              { texto: "Un músico que pecó vuelve a Dios con sinceridad", grupo: 0 },
              { texto: "Un baterista adora con todas sus fuerzas, sin vergüenza", grupo: 0 },
              { texto: "Un pianista se justifica cuando su pastor le muestra su pecado", grupo: 1 },
              { texto: "Una cantante solo obedece cuando el director la está viendo", grupo: 1 },
              { texto: "Un técnico cree que su talento tapa lo que hay en su corazón", grupo: 1 },
            ],
            apoyo: "Un corazón conforme al de Dios no es un corazón sin caídas, sino uno que vuelve a Dios con sinceridad",
            explica: "El que tiene un corazón conforme al de Dios lo busca en lo secreto, le obedece aunque nadie lo vea, vuelve a él con sinceridad cuando peca y adora sin vergüenza. No se justifica ni confía en su talento.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Samuel se fijó en Eliab por su apariencia. ¿Qué mira Jehová? Toca la palabra que lo dice.",
            texto: "Jehová no mira lo que mira el hombre; pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el [[corazón]]",
            apoyo: "Jehová no mira lo que mira el hombre; pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón",
            ref: "1 Samuel 16:7",
            explica: "Dios no mira lo que mira el hombre: el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón. Por eso Dios mira el corazón antes que la apariencia o el talento.",
          },
          {
            consigna: "David fue pastor, músico y poeta, pero Dios destacó su corazón. ¿Qué clase de varón dijo Dios que era David? Toca las palabras que lo dicen.",
            texto: "He hallado a David hijo de Isaí, varón [[conforme a mi corazón]], quien hará todo lo que yo quiero",
            apoyo: "David fue pastor, músico y poeta, y la Biblia le atribuye muchos salmos, pero lo que Dios destacó fue su corazón",
            ref: "Hechos 13:22",
            explica: "David fue pastor, músico y poeta, pero lo que Dios destacó fue su corazón: lo llamó varón conforme a su corazón.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un guitarrista nuevo del equipo te dice: Toco mejor que todos; con mi talento, Dios ya está contento conmigo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Dios mira el corazón antes que la apariencia o el talento.", bien: true, explica: "Dios mira el corazón antes que la apariencia o el talento: antes de afinar los instrumentos, hay que afinar el corazón." },
              { texto: "Que tiene razón: el que mejor toca es el que más agrada a Dios.", explica: "Dios no mira lo que mira el hombre: mira el corazón antes que el talento." },
              { texto: "Que Dios mira primero quién canta afinado y quién toca bien.", explica: "Eso es lo que se nota enseguida en el ministerio de alabanza, pero Dios mira otra cosa primero: el corazón." },
              { texto: "Que con ese talento ya no necesita cuidar su vida con Dios.", explica: "El adorador guarda su corazón por encima de todo, porque de él mana la vida." },
            ],
            apoyo: "Dios mira el corazón antes que la apariencia o el talento",
            ref: "1 Samuel 16:7",
            explica: "Dios no mira lo que mira el hombre: mira el corazón antes que la apariencia o el talento. Antes de afinar los instrumentos, hay que afinar el corazón.",
          },
          {
            caso: "Una cantante del equipo te dice: Mi voz no es tan linda como la de Sara; seguro que Dios la prefiere a ella.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Dios no mira lo que mira el hombre: él mira el corazón.", bien: true, explica: "Samuel se fijó en Eliab por su apariencia, pero Dios eligió a David: Jehová mira el corazón." },
              { texto: "Que tiene razón: Dios siempre prefiere a los que tienen mejor voz.", explica: "Dios mira el corazón antes que la apariencia o el talento." },
              { texto: "Que practique mucho, y así Dios la va a mirar con otros ojos.", explica: "Practicar no cambia lo que Dios mira primero: Jehová mira el corazón." },
              { texto: "Que en la iglesia nadie se fija en quién canta afinado y quién no.", explica: "En el ministerio de alabanza se nota enseguida quién canta afinado, pero Dios mira otra cosa primero: el corazón." },
            ],
            apoyo: "Jehová no mira lo que mira el hombre; pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón",
            ref: "1 Samuel 16:7",
            explica: "Samuel se fijó en Eliab por su apariencia, pero Dios eligió a David, el menor: Jehová mira el corazón, antes que la apariencia o el talento.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el arrepentimiento de David: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando el profeta Natán lo confrontó, David no se justificó.", verdad: true, explica: "No se justificó: se arrepintió y oró pidiendo un corazón limpio.", apoyo: "cuando el profeta Natán lo confrontó, no se justificó: se arrepintió", ref: "Salmos 51:10-12" },
              { texto: "David nunca pecó, y por eso Dios lo llamó varón conforme a su corazón.", verdad: false, explica: "David no fue perfecto: cometió adulterio y un asesinato. Un corazón conforme al de Dios no es un corazón sin caídas.", apoyo: "David no fue perfecto: cometió adulterio y un asesinato" },
              { texto: "Después de pecar, David le pidió a Dios un corazón limpio.", verdad: true, explica: "Oró: «Crea en mí, oh Dios, un corazón limpio, Y renueva un espíritu recto dentro de mí».", apoyo: "se arrepintió de verdad y pidió un corazón limpio", ref: "Salmos 51:10-12" },
            ],
          },
          {
            consigna: "Sobre el arrepentimiento en la vida del adorador: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un corazón conforme al de Dios es un corazón que nunca cae.", verdad: false, explica: "No es un corazón sin caídas, sino uno que vuelve a Dios con sinceridad.", apoyo: "Un corazón conforme al de Dios no es un corazón sin caídas, sino uno que vuelve a Dios con sinceridad" },
              { texto: "El adorador se arrepiente de verdad cuando peca.", verdad: true, explica: "Es una de las marcas de un corazón conforme al de Dios, como el de David.", apoyo: "Se arrepiente de verdad cuando peca" },
              { texto: "Cuando alguien le muestra su pecado, el adorador se justifica.", verdad: false, explica: "David no se justificó cuando Natán lo confrontó: se arrepintió.", apoyo: "Pero cuando el profeta Natán lo confrontó, no se justificó" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Un corazón conforme al de Dios no es un corazón sin caídas, sino uno que vuelve a Dios con sinceridad",
            ref: "Salmos 51:10-12",
            situacion: "Cantas en el equipo de alabanza. Esta semana caíste en un pecado que nadie conoce, y el domingo te toca cantar.",
            escenas: [
              {
                id: "e1",
                narra: "Es sábado en la noche. Nadie sabe lo que pasó, pero Dios sí lo sabe.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te arrepientes de verdad y le pides a Dios un corazón limpio.", valor: 2, explica: "Como David, el adorador se arrepiente de verdad cuando peca y le pide a Dios un corazón limpio.", siguiente: "e2" },
                  { texto: "Le pides perdón a Dios de prisa, para no pensar más en el tema.", valor: 1, explica: "Pedir perdón está bien, pero el arrepentimiento es de verdad: un corazón que vuelve a Dios con sinceridad.", siguiente: "e2" },
                  { texto: "Lo dejas así: si nadie lo sabe, no afecta lo que vas a cantar.", valor: 0, explica: "Dios mira el corazón: el adorador obedece a Dios aunque nadie lo vea, y se arrepiente de verdad cuando peca.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "En el ensayo del domingo, te toca cantar una canción sobre un corazón limpio.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Vuelves a Dios con sinceridad antes de cantar, sin excusas.", valor: 2, explica: "Un corazón conforme al de Dios vuelve a él con sinceridad: antes de afinar los instrumentos, hay que afinar el corazón.", siguiente: "e2" },
                  { texto: "Cantas con más fuerza que nunca, para que nadie note nada raro en ti.", valor: 0, explica: "El hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya te arrepentiste, pero piensas que alguien que cayó no merece cantar.",
                pregunta: "¿Qué recuerdas?",
                opciones: [
                  { texto: "Que un corazón conforme al de Dios es el que vuelve a él.", valor: 2, explica: "Un corazón conforme al de Dios no es un corazón sin caídas, sino uno que vuelve a Dios con sinceridad." },
                  { texto: "Que un verdadero adorador nunca cae, y que debes dejar de servir.", valor: 0, explica: "David no fue perfecto, y Dios lo llamó varón conforme a su corazón: lo que cuenta es volver a Dios con sinceridad." },
                  { texto: "Que David nunca pecó, y que por eso Dios lo llamó varón conforme.", valor: 0, explica: "David cometió adulterio y un asesinato; cuando Natán lo confrontó, se arrepintió de verdad." },
                ],
              },
              {
                id: "e3",
                narra: "En el culto llega el momento de adorar, con tu corazón ya delante de Dios.",
                pregunta: "¿Cómo adoras?",
                opciones: [
                  { texto: "Con todas tus fuerzas y sin vergüenza, delante de Dios.", valor: 2, explica: "El que tiene un corazón conforme al de Dios adora con todas sus fuerzas, sin vergüenza." },
                  { texto: "Con sinceridad, pero callado, por miedo a lo que piensen.", valor: 1, explica: "La sinceridad está bien, pero el adorador adora con todas sus fuerzas, sin vergüenza." },
                  { texto: "Pensando en lucirte, para que todos vean lo bien que cantas.", valor: 0, explica: "Dios no mira lo que mira el hombre: mira el corazón." },
                ],
              },
            ],
          },
          {
            apoyo: "Se arrepiente de verdad cuando peca",
            ref: "Salmos 51:10-12",
            situacion: "Diriges la alabanza en tu iglesia. En el ensayo le hablaste con dureza a un músico, y un hermano del equipo lo vio.",
            escenas: [
              {
                id: "e1",
                narra: "Después del ensayo, el hermano te habla a solas y te muestra con amor lo que hiciste.",
                pregunta: "¿Cómo le respondes?",
                opciones: [
                  { texto: "Lo reconoces sin justificarte, como David ante Natán.", valor: 2, explica: "Cuando el profeta Natán lo confrontó, David no se justificó: se arrepintió.", siguiente: "e2" },
                  { texto: "Lo escuchas en silencio y le dices que lo vas a pensar.", valor: 1, explica: "Escuchar sin justificarte está bien; el paso que sigue es arrepentirte de verdad.", siguiente: "e2" },
                  { texto: "Le explicas que el músico tuvo la culpa por tocar tan mal.", valor: 0, explica: "Eso es justificarse: David no se justificó cuando lo confrontaron, se arrepintió.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "En la noche, al orar, recuerdas la cara del músico cuando le hablaste.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te arrepientes de verdad delante de Dios, sin excusas.", valor: 2, explica: "El adorador se arrepiente de verdad cuando peca, como David.", siguiente: "e2" },
                  { texto: "Le pides a Dios que cambie al músico, que es el que falla.", valor: 0, explica: "Eso sigue siendo justificarse: un corazón conforme al de Dios vuelve a él con sinceridad.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "A la mañana siguiente tienes tu tiempo con Dios.",
                pregunta: "¿Qué le pides?",
                opciones: [
                  { texto: "Que cree en ti un corazón limpio y un espíritu recto.", valor: 2, explica: "Como David, que oró: «Crea en mí, oh Dios, un corazón limpio, Y renueva un espíritu recto dentro de mí»." },
                  { texto: "Que te dé paciencia con los músicos que tocan mal.", valor: 1, explica: "Pedir paciencia es bueno, pero el corazón que agrada a Dios primero se arrepiente de su pecado." },
                  { texto: "Que nadie más en la iglesia se entere de lo que pasó en el ensayo.", valor: 0, explica: "Esconderlo no es arrepentirse: el adorador se arrepiente de verdad cuando peca." },
                ],
              },
              {
                id: "e3",
                narra: "Un músico nuevo te pregunta cómo pudo David ser un varón conforme al corazón de Dios, si pecó.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no es un corazón sin caídas, sino uno que vuelve a Dios.", valor: 2, explica: "Un corazón conforme al de Dios no es un corazón sin caídas, sino uno que vuelve a Dios con sinceridad." },
                  { texto: "Que en realidad David nunca pecó, y que esas historias se exageran mucho.", valor: 0, explica: "David no fue perfecto: cometió adulterio y un asesinato." },
                  { texto: "Que Dios lo eligió por su talento de músico, y no por su corazón.", valor: 0, explica: "David fue pastor, músico y poeta, pero lo que Dios destacó fue su corazón." },
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
            apoyo: "Dios mira el corazón antes que la apariencia o el talento",
            ref: "1 Samuel 16:7",
            clave: {
              id: "pr-alabanza-2-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué Dios mira el corazón antes que el talento? Explícalo con el ejemplo de David.",
              ideas: [
                { id: "corazon", peso: 40, texto: "Dios no mira lo que mira el hombre: el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón.", formas: ["mira el corazon", "ve el corazon", "(mira|ve|mire|vea|miraba|veia|mirando|viendo|mirar|ver|miro|vio) (el|al|su|nuestro|tu|los|nuestros|sus) (corazon|corazones|interior)", "lo que mira el hombre", "delante de (sus|los) ojos", "no (mira|ve|miro|vio) (la|su|las) (apariencia|apariencias)", "no en (la|su|las) (apariencia|apariencias)", "(fija|fijo|fijaba|fijan) en (el|su|nuestro|tu) corazon", "sino (el|su|en) corazon", "se fijo en eliab"] },
                { id: "david", peso: 30, texto: "David fue pastor, músico y poeta, pero lo que Dios destacó fue su corazón: lo llamó varón conforme a su corazón.", formas: ["conforme a (su|mi) corazon", "conforme al corazon", "varon conforme", "(destaco|destaca|valoro|valora|resalto|resalta|elogio) (su|el) corazon", "(musico|poeta|pastor) pero", "aunque (era|fue) (musico|poeta|pastor)", "(eligio|escogio|prefirio|llamo) por su corazon"] },
                { id: "vida", peso: 30, texto: "Del corazón mana la vida: por eso el adorador lo guarda sobre toda cosa.", formas: ["mana la vida", "(sale|nace|brota|viene) la vida", "de el (mana|sale|nace|brota)", "guard* (el|su|tu|nuestro) corazon", "sobre toda cosa", "afinar el corazon", "corazon es lo mas importante", "lo mas importante es el corazon"] },
              ],
              errores: [
                { id: "talento", texto: "Dios no eligió a David por su talento: lo que destacó fue su corazón.", formas: ["dios (mira|ve|prefiere|busca|elige|valora|quiere) (el|su|los) (talento|talentos)", "(eligio|escogio|prefirio) david por (su|ser) (talento|musico|voz|musica)", "por (su|ser) (buen|gran) musico"], anula: "david" },
                { id: "apariencia", texto: "Jehová no mira lo que está delante de los ojos: mira el corazón.", formas: ["dios (mira|ve|elige|prefiere|busca) (la|las|su) (apariencia|apariencias)", "dios (mira|ve|busca) (lo|quien) (bien|mejor) (canta|toca)"], anula: "corazon" },
              ],
              modelo: "Porque Dios no mira lo que mira el hombre: Samuel se fijó en Eliab por su apariencia, pero Jehová mira el corazón. David era músico y poeta, pero Dios destacó su corazón, y de él mana la vida.",
            },
          },
          {
            apoyo: "Antes de afinar los instrumentos, hay que afinar el corazón",
            ref: "Hechos 13:22",
            clave: {
              id: "pr-alabanza-2-1-a7-2",
              tipo: "corta",
              pregunta: "Un músico muy talentoso del equipo dice que a Dios le basta con lo bien que toca. ¿Qué le explicas con el ejemplo de David?",
              ideas: [
                { id: "corazon", peso: 40, texto: "Dios mira el corazón antes que el talento: no mira lo que mira el hombre.", formas: ["mira el corazon", "ve el corazon", "(mira|ve|mire|vea|miraba|veia|mirando|viendo|mirar|ver|miro|vio) (el|al|su|nuestro|tu|los|nuestros|sus) (corazon|corazones|interior)", "lo que mira el hombre", "delante de (sus|los) ojos", "antes que el talento", "mas que el talento", "no (le|les) basta", "(fija|fijo|fijaba|fijan) en (el|su|nuestro|tu) corazon", "sino (el|su|en) corazon"] },
                { id: "david", peso: 30, texto: "David fue músico y poeta, pero lo que Dios destacó fue su corazón: varón conforme a su corazón.", formas: ["conforme a (su|mi) corazon", "conforme al corazon", "varon conforme", "(destaco|destaca|valoro|valora|resalto|resalta|elogio) (su|el) corazon", "(musico|poeta|pastor) pero", "aunque (era|fue) (musico|poeta|pastor)"] },
                { id: "afinar", peso: 30, texto: "Antes de afinar los instrumentos, hay que afinar el corazón.", formas: ["afinar el corazon", "afin* (su|el|tu|nuestro) corazon", "guard* (su|el|tu|nuestro) corazon", "cuid* (su|el|tu|nuestro) corazon", "mana la vida", "antes de afinar"] },
              ],
              errores: [
                { id: "basta", texto: "A Dios no le basta con el talento: mira el corazón antes que el talento.", formas: ["(le|les) basta con (lo|el|su|tocar)", "(tiene|tienes) razon", "dios (mira|ve|prefiere|busca|valora|quiere) (el|su|los) (talento|talentos)"], anula: "corazon" },
                { id: "talento", texto: "Dios no eligió a David por su talento: lo que destacó fue su corazón.", formas: ["(eligio|escogio|prefirio) david por (su|ser) (talento|musico|voz|musica)", "por (su|ser) (buen|gran) musico"], anula: "david" },
              ],
              modelo: "Le explico que Dios mira el corazón antes que el talento: Jehová no mira lo que mira el hombre. David era músico y poeta, pero Dios destacó su corazón. Antes de afinar los instrumentos, hay que afinar el corazón.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Manos limpias y corazón puro
    "alabanza-2-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según el Salmo 24, ¿quién subirá al monte de Jehová?", reverso: "El limpio de manos y puro de corazón.", apoyo: "«¿Quién subirá al monte de Jehová? ¿Y quién estará en su lugar santo? El limpio de manos y puro de corazón»" },
              { frente: "¿De qué hablan las manos limpias?", reverso: "De lo que hacemos.", apoyo: "Las manos limpias hablan de lo que hacemos" },
              { frente: "¿De qué habla el corazón puro?", reverso: "De lo que pensamos y deseamos.", apoyo: "el corazón puro, de lo que pensamos y deseamos" },
              { frente: "¿Qué dijo Jesús de los de limpio corazón?", reverso: "Que ellos verán a Dios.", apoyo: "Jesús lo dijo en el Sermón del monte: «Bienaventurados los de limpio corazón, porque ellos verán a Dios»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dijo Isaías de sí mismo cuando vio la gloria de Dios?", reverso: "Que era hombre inmundo de labios.", apoyo: "Cuando Isaías vio la gloria de Dios, dijo: «¡Ay de mí! que soy muerto; porque siendo hombre inmundo de labios»" },
              { frente: "¿Con qué tocó el serafín la boca de Isaías?", reverso: "Con un carbón del altar.", apoyo: "Un serafín tocó su boca con un carbón del altar" },
              { frente: "Si la santidad no es perfección, ¿qué es?", reverso: "Vivir en el camino del arrepentimiento y la obediencia.", apoyo: "La santidad no es perfección: es vivir en el camino del arrepentimiento y la obediencia" },
              { frente: "¿Qué hace Dios si confesamos nuestros pecados?", reverso: "Nos perdona y nos limpia de toda maldad, porque es fiel y justo.", apoyo: "Y hay una promesa: «Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad»" },
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
            consigna: "¿Habla de las manos limpias o del corazón puro? Lleva cada frase a su grupo.",
            grupos: ["Manos limpias: lo que hacemos", "Corazón puro: lo que pensamos y deseamos"],
            frases: [
              { texto: "Cómo trato a las personas", grupo: 0 },
              { texto: "Lo que hago con el dinero", grupo: 0 },
              { texto: "Lo que hago cuando nadie me ve", grupo: 0 },
              { texto: "Lo que deseo en secreto", grupo: 1 },
              { texto: "Lo que pienso de los demás", grupo: 1 },
              { texto: "Las intenciones con que sirvo", grupo: 1 },
            ],
            apoyo: "Las manos limpias hablan de lo que hacemos; el corazón puro, de lo que pensamos y deseamos",
            ref: "Salmos 24:3-4",
            explica: "Las manos limpias hablan de lo que hacemos, y el corazón puro, de lo que pensamos y deseamos: para estar en la presencia de Dios hacen falta las dos cosas.",
          },
          {
            consigna: "En la semana de un músico del equipo, ¿qué habla de sus manos y qué de su corazón? Lleva cada frase a su grupo.",
            grupos: ["Manos limpias: lo que hacemos", "Corazón puro: lo que pensamos y deseamos"],
            frases: [
              { texto: "Cumple lo que prometió en su trabajo", grupo: 0 },
              { texto: "Ayuda a su mamá con las cosas de la casa", grupo: 0 },
              { texto: "Devuelve lo que pidió prestado", grupo: 0 },
              { texto: "Desea en secreto el aplauso de la gente", grupo: 1 },
              { texto: "Piensa mal de un compañero del equipo", grupo: 1 },
              { texto: "Guarda rencor contra su hermano", grupo: 1 },
            ],
            apoyo: "Para estar en la presencia de Dios hacen falta manos limpias y corazón puro: lo que hacemos y lo que deseamos",
            ref: "Salmos 24:3-4",
            explica: "Lo que el músico hace habla de sus manos; lo que piensa y desea, de su corazón. Para estar en la presencia de Dios hacen falta manos limpias y corazón puro.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "El serafín tocó la boca de Isaías con un carbón del altar. ¿Qué le dijo que pasaba con su culpa y con su pecado? Toca las palabras que lo dicen.",
            texto: "es [[quitada]] tu culpa, y [[limpio]] tu pecado",
            apoyo: "Un serafín tocó su boca con un carbón del altar y le dijo: «es quitada tu culpa, y limpio tu pecado»",
            ref: "Isaías 6:5-7",
            explica: "El serafín le dijo que su culpa era quitada y su pecado, limpio. Dios limpió los labios de Isaías antes de enviarlo: solo después Isaías respondió al llamado.",
          },
          {
            consigna: "¿Qué hace Dios si confesamos nuestros pecados? Toca las palabras que lo dicen.",
            texto: "Si confesamos nuestros pecados, él es fiel y justo para [[perdonar nuestros pecados]], y [[limpiarnos de toda maldad]]",
            apoyo: "Y hay una promesa: «Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad»",
            ref: "1 Juan 1:9",
            explica: "Si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos y limpiarnos de toda maldad: así limpia al que sirve, como limpió a Isaías.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena lo que pasó con Isaías, como lo cuenta la lección, del primero al último.",
            pasos: [
              "Isaías vio la gloria de Dios",
              "Dijo que era hombre inmundo de labios",
              "Un serafín tocó su boca con un carbón del altar",
              "El serafín le dijo que su culpa era quitada",
              "Isaías respondió al llamado",
            ],
            apoyo: "Solo después Isaías respondió al llamado",
            ref: "Isaías 6:5-7",
            explica: "Isaías vio la gloria de Dios y se reconoció inmundo de labios; un serafín tocó su boca con un carbón del altar y le dijo que su culpa era quitada. Solo después respondió al llamado.",
          },
          {
            consigna: "Ordena el camino del que va a servir con su voz, como el de Isaías, del primer paso al último.",
            pasos: [
              "Ver la gloria de Dios y reconocer su propio pecado",
              "Confesar sus pecados delante de Dios",
              "Recibir el perdón y la limpieza de Dios",
              "Responder al llamado y servir con labios limpios",
            ],
            apoyo: "Los que usamos la voz para adorar necesitamos labios limpiados por Dios",
            ref: "1 Juan 1:9",
            explica: "Como Isaías, el que sirve reconoce su pecado ante la gloria de Dios, lo confiesa, recibe el perdón y la limpieza que Dios promete, y después responde al llamado: los que usamos la voz para adorar necesitamos labios limpiados por Dios.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada área de la vida con un ejemplo de la semana del que sirve en la alabanza.",
            pares: [
              ["Lo que miro y escucho", "Las películas y los videos de la semana"],
              ["Mi manera de hablar", "Los comentarios que dejo en las redes"],
              ["La honestidad", "Pagar lo que debo y cumplir lo que prometo"],
              ["El trato con mi familia", "La paciencia con los míos en la casa"],
            ],
            apoyo: "Lo que miro y escucho durante la semana",
            explica: "La santidad abarca toda la semana: lo que miro y escucho, mi manera de hablar, también en las redes, la honestidad con el dinero y con los compromisos, y la manera de tratar a mi familia.",
          },
          {
            consigna: "Une cada área que el que sirve pone delante de Dios con un ejemplo de su vida diaria.",
            pares: [
              ["Lo que miro y escucho", "Lo que veo en el teléfono cuando estoy solo"],
              ["Mi manera de hablar", "Cómo contesto cuando alguien me molesta"],
              ["La honestidad con el dinero", "Devolver el cambio que me dieron de más"],
              ["La manera de tratar a mi familia", "El tiempo y el cariño que les doy a los míos"],
            ],
            apoyo: "La manera de tratar a mi familia",
            explica: "Lo que hago el sábado se oye el domingo: la santidad toca lo que miro, mi manera de hablar, la honestidad con el dinero y el trato con mi familia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Si alguien del equipo cae en un pecado grave, el amor no lo esconde ni lo expone: lo acompaña",
            ref: "1 Juan 1:9",
            titulo: "El bajista que cayó",
            relato: [
              "Eres responsable del equipo de alabanza. Después del ensayo, Tomás, el bajista, te pide hablar a solas.",
              "Con lágrimas te cuenta que cayó en un pecado grave. Está arrepentido, y el domingo le toca tocar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con lo que Tomás te contó?",
                opciones: [
                  { texto: "No lo escondo ni lo expongo: lo acompaño, junto con sus pastores.", bien: true, explica: "Si alguien del equipo cae en un pecado grave, el amor no lo esconde ni lo expone: lo acompaña." },
                  { texto: "Lo cuento en el próximo ensayo, para que todos aprendan de su caída.", explica: "Eso lo expone: el amor no lo esconde ni lo expone, lo acompaña." },
                  { texto: "Lo guardo en secreto y hago como si nunca hubiera pasado nada.", explica: "Eso lo esconde: el amor lo acompaña, y lo acompañan también sus pastores." },
                ],
                apoyo: "el amor no lo esconde ni lo expone: lo acompaña",
                explica: "El amor no esconde ni expone al que cayó: lo acompaña.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pasa con el domingo y con la plataforma?",
                opciones: [
                  { texto: "Que se aparte un tiempo de la plataforma, acompañado por sus pastores.", bien: true, explica: "Lo sano es que se aparte por un tiempo de la plataforma para ser restaurado, acompañado por sus pastores." },
                  { texto: "Que toque igual el domingo, para que nadie note lo que pasó en su vida.", explica: "Lo sano es que se aparte por un tiempo de la plataforma para ser restaurado." },
                  { texto: "Que deje el equipo para siempre, porque el que cae ya no puede servir.", explica: "Se aparta por un tiempo para ser restaurado, y vuelve cuando sus pastores lo vean listo." },
                ],
                apoyo: "Lo sano es que se aparte por un tiempo de la plataforma para ser restaurado, acompañado por sus pastores",
                explica: "Lo sano es que se aparte por un tiempo de la plataforma para ser restaurado, acompañado por sus pastores.",
              },
              {
                tipo: "situacion",
                pregunta: "Tomás te pregunta cuándo podrá volver a tocar. ¿Qué le dices?",
                opciones: [
                  { texto: "Cuando sus pastores lo vean listo para volver.", bien: true, explica: "Vuelve cuando sus pastores lo vean listo: ellos lo acompañan en la restauración." },
                  { texto: "Cuando él mismo sienta que ya está bien para tocar.", explica: "La lección dice que vuelve cuando sus pastores lo vean listo." },
                  { texto: "En dos semanas exactas, pase lo que pase con él.", explica: "La lección no pone un plazo: vuelve cuando sus pastores lo vean listo." },
                ],
                apoyo: "que vuelva cuando ellos lo vean listo",
                explica: "El que se apartó vuelve cuando sus pastores lo vean listo.",
              },
              {
                tipo: "explica",
                apoyo: "Y hay una promesa: «Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad»",
                clave: {
                  id: "pr-alabanza-2-2-a6-1",
                  tipo: "corta",
                  pregunta: "Tomás te dice que ya no merece servir nunca más. ¿Qué promesa le recuerdas, y qué le explicas sobre la santidad?",
                  ideas: [
                    { id: "promesa", peso: 50, texto: "Si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos y limpiarnos de toda maldad.", formas: ["fiel y justo", "si confes*", "confes* (nuestros|sus|tus|los|mis) pecados", "(nos|te|lo|le|me) (perdona|perdonara|limpia|limpiara)", "perdonar*", "limpiar*", "toda maldad", "1 juan 1"] },
                    { id: "camino", peso: 50, texto: "La santidad no es perfección: es vivir en el camino del arrepentimiento y la obediencia.", formas: ["no es perfeccion", "no (es|significa|exige|pide) perfeccion", "no (es|significa|exige|pide) ser perfect*", "nadie es perfecto", "camino arrepentimiento", "arrepentimiento obediencia", "arrepent* obedec*", "puede volver", "restaur*"] },
                  ],
                  errores: [
                    { id: "nunca", texto: "El que cae puede ser restaurado y volver cuando sus pastores lo vean listo.", formas: ["no (puede|podra|debe|deberia) (volver|servir|tocar)", "nunca (podra|puede|debe|volvera) (servir|tocar|volver)", "(tiene|tienes) razon"], anula: "camino" },
                  ],
                  modelo: "Le recuerdo que si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos y limpiarnos de toda maldad. Y le explico que la santidad no es perfección: es vivir en el camino del arrepentimiento y la obediencia.",
                },
              },
            ],
          },
          {
            apoyo: "Lo que hago el sábado se oye el domingo",
            ref: "Salmos 24:3-4",
            titulo: "Las redes de Marcela",
            relato: [
              "Marcela canta en el equipo de alabanza y prepara con cuidado cada canción del domingo.",
              "Durante la semana publica burlas en sus redes y le contesta mal a su mamá. Cuando alguien se lo comenta, responde: Eso no tiene nada que ver con cantar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué enseña la lección sobre lo que dice Marcela?",
                opciones: [
                  { texto: "Que lo que hace el sábado se oye el domingo.", bien: true, explica: "La santidad abarca toda la semana: lo que hago el sábado se oye el domingo." },
                  { texto: "Que tiene razón: en la plataforma solo importa que cante bien.", explica: "Para estar en la presencia de Dios hacen falta manos limpias y corazón puro, toda la semana." },
                  { texto: "Que lo de la semana es privado, y Dios solo mira lo que hace en el culto.", explica: "La santidad no se queda en el culto: abarca toda la semana." },
                ],
                apoyo: "Lo que hago el sábado se oye el domingo",
                explica: "La santidad abarca toda la semana: lo que hago el sábado se oye el domingo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué áreas de su vida necesita poner delante de Dios?",
                opciones: [
                  { texto: "Cómo habla en las redes y cómo trata a su familia.", bien: true, explica: "La santidad abarca mi manera de hablar, también en las redes, y la manera de tratar a mi familia." },
                  { texto: "La afinación de su voz y la letra de cada canción del domingo.", explica: "Eso es preparar el culto; la santidad toca su manera de hablar y el trato con su familia." },
                  { texto: "Solo lo que hace dentro del templo, en los días de culto.", explica: "La santidad abarca toda la semana, no solo los días de culto." },
                ],
                apoyo: "Mi manera de hablar, también en las redes",
                explica: "La santidad abarca mi manera de hablar, también en las redes, y la manera de tratar a mi familia.",
              },
              {
                tipo: "situacion",
                pregunta: "Marcela te dice: Entonces tengo que ser perfecta para cantar. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que la santidad no es perfección: es arrepentirse y obedecer.", bien: true, explica: "La santidad no es perfección: es vivir en el camino del arrepentimiento y la obediencia." },
                  { texto: "Que sí: solo los que nunca fallan pueden subir a cantar el domingo.", explica: "La santidad no es perfección: es un camino de arrepentimiento y obediencia." },
                  { texto: "Que no importa: Dios no se fija en la vida de los que cantan.", explica: "Dios sí se fija: para estar en su presencia hacen falta manos limpias y corazón puro." },
                ],
                apoyo: "La santidad no es perfección: es vivir en el camino del arrepentimiento y la obediencia",
                explica: "La santidad no es perfección: es vivir en el camino del arrepentimiento y la obediencia.",
              },
              {
                tipo: "explica",
                apoyo: "¿Qué área de tu vida necesitas poner hoy delante de Dios para que la limpie?",
                clave: {
                  id: "pr-alabanza-2-2-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué le aconsejas a Marcela para esta semana, según la lección?",
                  ideas: [
                    { id: "confesar", peso: 50, texto: "Que confiese su pecado a Dios, que es fiel y justo para perdonarla y limpiarla.", formas: ["confies*", "confes*", "(pida|pedir|pide|pidale) perdon", "arrepient*", "arrepent*", "fiel y justo", "(la|lo|te) (perdona|limpia|perdonara|limpiara)", "perdonar*", "limpiar*"] },
                    { id: "areas", peso: 50, texto: "Que cuide toda la semana su manera de hablar en las redes y el trato con su mamá.", formas: ["redes", "(su|tu) (mama|madre|familia)", "toda la semana", "durante la semana", "el sabado", "(manera|forma|modo) de hablar", "como (habla|hable|trata|trate|contesta|conteste)", "(trate|tratar|trata) (bien|mejor|con)", "(deje|dejar) de (burlarse|publicar|contestar)", "burl*"] },
                  ],
                  errores: [
                    { id: "nada", texto: "Lo que hago el sábado se oye el domingo: la santidad abarca toda la semana.", formas: ["no tiene nada que ver", "no (importa|afecta) lo que (hace|haga)", "(siga|seguir) (igual|asi)", "(tiene|tienes) razon"], anula: "areas" },
                  ],
                  modelo: "Le aconsejo que confiese su pecado a Dios, que es fiel y justo para perdonarla y limpiarla. Y que esta semana cuide su manera de hablar en las redes y el trato con su mamá, porque lo del sábado se oye el domingo.",
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
            apoyo: "Las manos limpias hablan de lo que hacemos; el corazón puro, de lo que pensamos y deseamos",
            ref: "Salmos 24:3-4",
            clave: {
              id: "pr-alabanza-2-2-a7-1",
              tipo: "corta",
              pregunta: "Según el Salmo 24, ¿quién subirá al monte de Jehová, y qué significa cada parte de esa respuesta?",
              ideas: [
                { id: "quien", peso: 30, texto: "El limpio de manos y puro de corazón.", formas: ["limpio de manos", "puro de corazon", "manos limpias", "corazon puro", "limpio corazon"] },
                { id: "manos", peso: 35, texto: "Las manos limpias hablan de lo que hacemos.", formas: ["lo que (hacemos|hago|hace|hacen|haces)", "(nuestras|sus|las|mis|tus) (acciones|obras|hechos)", "(nuestra|su|la|mi|tu) conducta", "como (vivimos|actuamos|vive|actua|obramos)"] },
                { id: "corazon", peso: 35, texto: "El corazón puro habla de lo que pensamos y deseamos.", formas: ["lo que (pensamos|pienso|piensa|piensan|piensas)", "lo que (deseamos|deseo|desea|desean|deseas)", "(nuestros|sus|los|mis|tus) (pensamientos|deseos|intenciones)", "(pensar|pensamos|piensa) (y|o) (desear|deseamos|desea)"] },
              ],
              errores: [
                { id: "manos-piensa", texto: "Las manos limpias hablan de lo que hacemos; lo que pensamos y deseamos es el corazón.", formas: ["(las|sus|tus|mis|nuestras) manos (hablan|habla|son|es|significan|significa) de lo que (pensamos|piensa|deseamos|desea|pienso|deseo)"], anula: "manos" },
                { id: "corazon-hace", texto: "El corazón puro habla de lo que pensamos y deseamos; lo que hacemos son las manos.", formas: ["(el|su|tu|mi|nuestro) corazon (habla|hablan|es|son|significa|significan) de lo que (hacemos|hace|hago)"], anula: "corazon" },
              ],
              modelo: "Subirá el limpio de manos y puro de corazón. Las manos limpias hablan de lo que hacemos, y el corazón puro, de lo que pensamos y deseamos. Jesús también dijo que los de limpio corazón verán a Dios.",
            },
          },
          {
            apoyo: "Para estar en la presencia de Dios hacen falta manos limpias y corazón puro: lo que hacemos y lo que deseamos",
            ref: "Mateo 5:8",
            clave: {
              id: "pr-alabanza-2-2-a7-2",
              tipo: "corta",
              pregunta: "Un músico dice que para servir en la alabanza basta con portarse bien por fuera. ¿Qué le explicas con el Salmo 24 y con lo que dijo Jesús?",
              ideas: [
                { id: "ambas", peso: 40, texto: "Hacen falta manos limpias y también corazón puro: lo que pensamos y deseamos, no solo lo de afuera.", formas: ["corazon puro", "puro de corazon", "limpio corazon", "lo que (pensamos|pienso|piensa|piensan|deseamos|desea|deseo|desean)", "(pensamientos|deseos|intenciones)", "por dentro", "(el|su|tu|nuestro) interior"] },
                { id: "manos", peso: 30, texto: "Las manos limpias hablan de lo que hacemos.", formas: ["manos limpias", "limpio de manos", "lo que (hacemos|hace|hago|hacen)"] },
                { id: "jesus", peso: 30, texto: "Jesús dijo: Bienaventurados los de limpio corazón, porque ellos verán a Dios.", formas: ["(vera|veran|veremos|ver) a dios", "bienaventurados", "mateo 5"] },
              ],
              errores: [
                { id: "basta", texto: "No basta con portarse bien por fuera: también hace falta un corazón puro.", formas: ["basta con portarse bien", "(tiene|tienes) razon", "solo (importa|cuenta) lo que (hace|hacemos|hago)", "solo (importa|cuenta) lo que se ve"], anula: "ambas" },
              ],
              modelo: "Le explico que no basta con lo de afuera: el Salmo 24 pide manos limpias, que hablan de lo que hacemos, y también corazón puro, que habla de lo que pensamos y deseamos. Jesús dijo que los de limpio corazón verán a Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Humildad: que él crezca
    "alabanza-2-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pregunta Pablo en 1 Corintios 4:7?", reverso: "«¿o qué tienes que no hayas recibido?»", apoyo: "Pablo pregunta: «¿o qué tienes que no hayas recibido? Y si lo recibiste, ¿por qué te glorías como si no lo hubieras recibido?»" },
              { frente: "¿Qué respondió Juan el Bautista cuando la gente seguía a Jesús?", reverso: "Que era necesario que Jesús creciera y que él menguara.", apoyo: "Juan respondió: «Es necesario que él crezca, pero que yo mengüe»" },
              { frente: "¿A quién resiste Dios, y a quién da gracia?", reverso: "Resiste a los soberbios y da gracia a los humildes.", apoyo: "Pedro advierte: «Dios resiste a los soberbios, Y da gracia a los humildes»" },
              { frente: "¿Por qué Mical despreció a David?", reverso: "Porque danzaba con toda su fuerza delante de Jehová.", apoyo: "«David danzaba con toda su fuerza delante de Jehová». Su esposa Mical lo despreció por eso" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es el lema de todo el que dirige o canta en la iglesia?", reverso: "«Es necesario que él crezca, pero que yo mengüe».", apoyo: "Es el lema de todo el que dirige o canta en la iglesia" },
              { frente: "¿Qué son la voz, el oído y la habilidad?", reverso: "Regalos de Dios: se cultivan con esfuerzo, pero no son motivo de orgullo.", apoyo: "La voz, el oído y la habilidad son regalos de Dios: se cultivan con esfuerzo, pero no son motivo de orgullo" },
              { frente: "¿Contra qué advirtió Jesús en Mateo 6:1?", reverso: "Contra hacer las cosas para que nos vean; eso vale también para cantar.", apoyo: "Jesús advirtió contra hacer las cosas para que nos vean" },
              { frente: "¿Qué le respondió David a Mical?", reverso: "Que fue delante de Jehová, y que aun se haría más vil.", apoyo: "David le respondió: «Fue delante de Jehová», y añadió: «Y aun me haré más vil que esta vez»" },
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
            consigna: "¿Es orgullo o es humildad en el ministerio de alabanza? Lleva cada frase a su grupo.",
            grupos: ["Orgullo", "Humildad"],
            frases: [
              { texto: "Buscar el aplauso", grupo: 0 },
              { texto: "Molestarse si no me eligen", grupo: 0 },
              { texto: "Querer siempre el micrófono", grupo: 0 },
              { texto: "No aceptar corrección", grupo: 0 },
              { texto: "Servir donde haga falta", grupo: 1 },
              { texto: "Alegrarse del don de otros", grupo: 1 },
              { texto: "Aceptar corrección", grupo: 1 },
              { texto: "Darle la gloria a Dios", grupo: 1 },
            ],
            apoyo: "Orgullo: buscar el aplauso, molestarse si no me eligen, querer siempre el micrófono, no aceptar corrección",
            ref: "1 Pedro 5:5-6",
            explica: "El orgullo busca el aplauso, se molesta si no lo eligen, quiere siempre el micrófono y no acepta corrección. La humildad sirve donde haga falta, se alegra del don de otros, acepta corrección y le da la gloria a Dios.",
          },
          {
            consigna: "¿Muestra orgullo o humildad cada ejemplo del equipo? Lleva cada frase a su grupo.",
            grupos: ["Orgullo", "Humildad"],
            frases: [
              { texto: "Un cantante se enoja porque el solo se lo dieron a otro", grupo: 0 },
              { texto: "Una cantante pide el micrófono principal en todos los cultos", grupo: 0 },
              { texto: "Un tecladista se ofende cuando el director le corrige el tono", grupo: 0 },
              { texto: "Un guitarrista espera que la iglesia lo aplauda al terminar", grupo: 0 },
              { texto: "Un músico toca la pandereta porque faltaba alguien", grupo: 1 },
              { texto: "Una cantante felicita a la nueva corista por su voz", grupo: 1 },
              { texto: "Un pianista agradece cuando le corrigen un acorde", grupo: 1 },
              { texto: "Un técnico dice que la gloria es de Dios cuando lo felicitan", grupo: 1 },
            ],
            apoyo: "Humildad: servir donde haga falta, alegrarse del don de otros, aceptar corrección y darle la gloria a Dios",
            ref: "Juan 3:30",
            explica: "Enojarse si no me eligen, querer siempre el micrófono, no aceptar corrección y buscar el aplauso es orgullo. Servir donde haga falta, alegrarse del don de otros, aceptar corrección y darle la gloria a Dios es humildad.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña la lección sobre el talento.",
            texto: "La voz, el oído y la habilidad son [[regalos]] de Dios: se [[cultivan]] con [[esfuerzo]].",
            distractores: ["méritos", "ganan", "orgullo"],
            errores: {
              "méritos": "El talento es un don recibido, no un mérito.",
              ganan: "Los dones no se ganan: se reciben de Dios, y se cultivan con esfuerzo.",
              orgullo: "Los dones se cultivan con esfuerzo, pero no son motivo de orgullo.",
            },
            apoyo: "La voz, el oído y la habilidad son regalos de Dios: se cultivan con esfuerzo, pero no son motivo de orgullo",
            ref: "1 Corintios 4:7",
            explica: "La voz, el oído y la habilidad son regalos de Dios: se cultivan con esfuerzo, pero no son motivo de orgullo, porque todo lo hemos recibido.",
          },
          {
            consigna: "Completa lo que enseña la lección con la pregunta de Pablo.",
            texto: "Todo lo que tengo lo he [[recibido]]: por eso el talento es un [[don]] y no un mérito, y la [[gloria]] es de Dios.",
            distractores: ["ganado", "premio", "fama"],
            errores: {
              ganado: "Pablo pregunta: ¿qué tienes que no hayas recibido? Lo que tenemos lo recibimos.",
              premio: "El talento es un don recibido, no un premio ni un mérito.",
              fama: "La humildad le da la gloria a Dios.",
            },
            apoyo: "El talento es un don recibido, no un mérito",
            ref: "1 Corintios 4:7",
            explica: "Pablo pregunta qué tenemos que no hayamos recibido. El talento es un don recibido, no un mérito, y por eso la humildad le da la gloria a Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Con qué propósito advirtió Jesús que no hiciéramos nuestra justicia delante de los hombres? Toca las palabras que lo dicen.",
            texto: "Guardaos de hacer vuestra justicia delante de los hombres, [[para ser vistos de ellos]]",
            apoyo: "Jesús advirtió contra hacer las cosas para que nos vean: «Guardaos de hacer vuestra justicia delante de los hombres, para ser vistos de ellos». Eso vale también para cantar",
            ref: "Mateo 6:1",
            explica: "Jesús advirtió contra hacer las cosas para ser vistos de los hombres, y eso vale también para cantar: la adoración busca agradar a Dios, no a la gente.",
          },
          {
            consigna: "Cuando el arca llegó a Jerusalén, ¿delante de quién danzaba David con toda su fuerza? Toca las palabras que lo dicen.",
            texto: "David danzaba con toda su fuerza [[delante de Jehová]]",
            apoyo: "David adoraba para Dios, no para cuidar su imagen",
            ref: "2 Samuel 6:14",
            explica: "David danzaba con toda su fuerza delante de Jehová. Cuando Mical lo despreció, le respondió que fue delante de Jehová: adoraba para Dios, no para cuidar su imagen.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la adoración que busca agradar a Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús advirtió contra hacer las cosas para ser vistos de los hombres.", verdad: true, explica: "Así lo dijo en Mateo 6:1, y eso vale también para cantar.", apoyo: "Jesús advirtió contra hacer las cosas para que nos vean", ref: "Mateo 6:1" },
              { texto: "David dejó de adorar cuando Mical lo despreció.", verdad: false, explica: "David le respondió que fue delante de Jehová, y que aun se haría más vil.", apoyo: "David le respondió: «Fue delante de Jehová», y añadió: «Y aun me haré más vil que esta vez»", ref: "2 Samuel 6:21-22" },
              { texto: "David adoraba para Dios, no para cuidar su imagen.", verdad: true, explica: "Por eso danzaba con toda su fuerza delante de Jehová, aunque Mical lo despreciara.", apoyo: "David adoraba para Dios, no para cuidar su imagen", ref: "2 Samuel 6:14" },
            ],
          },
          {
            consigna: "Sobre buscar la aprobación de Dios o la de la gente: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cantar para que la gente nos admire también agrada a Dios.", verdad: false, explica: "Jesús advirtió contra hacer las cosas para ser vistos, y eso vale también para cantar.", apoyo: "Eso vale también para cantar", ref: "Mateo 6:1" },
              { texto: "Si me molesta no estar en la plataforma, quizá la plataforma se volvió mía.", verdad: true, explica: "Molestarse si no me eligen es una señal de orgullo: la plataforma no es mía.", apoyo: "Si me molesta no estar en la plataforma, quizá la plataforma se volvió mía" },
              { texto: "David danzaba para cuidar su imagen delante de los demás.", verdad: false, explica: "David adoraba para Dios, no para cuidar su imagen: le dijo a Mical que fue delante de Jehová.", apoyo: "David adoraba para Dios, no para cuidar su imagen", ref: "2 Samuel 6:21-22" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Si me molesta no estar en la plataforma, quizá la plataforma se volvió mía",
            ref: "Juan 3:30",
            situacion: "Cantas en el equipo de alabanza desde hace dos años. Este mes llegó una cantante nueva con una voz muy hermosa.",
            escenas: [
              {
                id: "e1",
                narra: "El director le da a ella el solo del domingo, que siempre cantabas tú.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te alegras de su don y sirves donde te toque.", valor: 2, explica: "La humildad sirve donde haga falta y se alegra del don de otros.", siguiente: "e2" },
                  { texto: "Lo aceptas, pero pasas la semana callado y molesto.", valor: 1, explica: "Aceptarlo está bien, pero molestarse si no me eligen es orgullo: si me molesta no estar en la plataforma, quizá la plataforma se volvió mía.", siguiente: "e2" },
                  { texto: "Le dices al director que, sin el solo, tú no cantas más.", valor: 0, explica: "Querer siempre el micrófono y molestarse si no me eligen son señales de orgullo.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El director te recuerda que Cristo tiene que crecer, y que nosotros tenemos que menguar.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Reconoces tu orgullo y le das la gloria a Dios.", valor: 2, explica: "Es necesario que Cristo crezca y que nosotros menguemos: es el lema de todo el que canta en la iglesia.", siguiente: "e2" },
                  { texto: "Te vas del ensayo, ofendido porque nadie te valora.", valor: 0, explica: "Dios resiste a los soberbios, y da gracia a los humildes.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En el ensayo, el director te corrige el tono delante de todos.",
                pregunta: "¿Cómo respondes?",
                opciones: [
                  { texto: "Aceptas la corrección y lo intentas otra vez.", valor: 2, explica: "La humildad acepta corrección; el orgullo no la acepta." },
                  { texto: "Le recuerdas que tú llevas más años cantando que él.", valor: 0, explica: "No aceptar corrección es una señal de orgullo." },
                  { texto: "Te callas, y después te quejas de él con los demás.", valor: 0, explica: "Eso tampoco es aceptar la corrección: la humildad la recibe." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del culto, varios hermanos te felicitan por cómo cantaste.",
                pregunta: "¿Qué haces con esas palabras?",
                opciones: [
                  { texto: "Agradeces con sencillez y le das la gloria a Dios.", valor: 2, explica: "La humildad le da la gloria a Dios: el talento es un don recibido." },
                  { texto: "Te quedas pensando en cómo lograr más aplausos.", valor: 0, explica: "Buscar el aplauso es una señal de orgullo." },
                  { texto: "Agradeces, pero por dentro te sientes el mejor del equipo.", valor: 1, explica: "Agradecer está bien, pero el orgullo crece fácil donde hay luces, micrófonos y aplausos." },
                ],
              },
            ],
          },
          {
            apoyo: "Es necesario que Cristo crezca y que nosotros menguemos",
            ref: "1 Pedro 5:5-6",
            situacion: "Tocas la guitarra en el equipo de alabanza, y muchos dicen que eres el mejor músico de la iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Falta el que toca la pandereta, y te piden que la toques tú este domingo.",
                pregunta: "¿Qué respondes?",
                opciones: [
                  { texto: "Que sí: sirves con gusto donde haga falta.", valor: 2, explica: "La humildad sirve donde haga falta.", siguiente: "e2" },
                  { texto: "Que sí, pero que es la última vez que lo haces.", valor: 1, explica: "Aceptar está bien, pero la humildad sirve donde haga falta, sin poner condiciones.", siguiente: "e2" },
                  { texto: "Que no: un músico como tú no toca la pandereta.", valor: 0, explica: "Eso es orgullo: la humildad sirve donde haga falta.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Esa semana lees que Dios resiste a los soberbios y da gracia a los humildes.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te humillas ante Dios y ofreces servir donde haga falta.", valor: 2, explica: "«Humillaos, pues, bajo la poderosa mano de Dios, para que él os exalte cuando fuere tiempo».", siguiente: "e2" },
                  { texto: "Piensas que eso es para otros, no para alguien con tu talento.", valor: 0, explica: "El talento es un don recibido, no un mérito: Dios resiste a los soberbios.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un músico nuevo toca muy bien un arreglo, y todos lo felicitan.",
                pregunta: "¿Cómo reaccionas?",
                opciones: [
                  { texto: "Te alegras de su don y lo felicitas tú también.", valor: 2, explica: "La humildad se alegra del don de otros." },
                  { texto: "Lo felicitas, aunque por dentro te molesta mucho.", valor: 1, explica: "Felicitarlo está bien, pero la humildad se alegra de verdad del don de otros." },
                  { texto: "Le buscas un error delante de todos, para que no te opaque.", valor: 0, explica: "Eso es orgullo: la humildad se alegra del don de otros." },
                ],
              },
              {
                id: "e3",
                narra: "En un culto, sientes ganas de lucirte con un solo de guitarra muy largo.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Tocar para Dios, sin buscar que te miren a ti.", valor: 2, explica: "Es necesario que Cristo crezca y que nosotros menguemos: se toca para Dios, no para ser vistos." },
                  { texto: "Tocar un solo corto, pero mirando si la gente aplaude.", valor: 1, explica: "Acortarlo ayuda, pero buscar el aplauso es una señal de orgullo." },
                  { texto: "Lucirte, para que todos vean el talento que tienes.", valor: 0, explica: "Jesús advirtió contra hacer las cosas para que nos vean." },
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
            apoyo: "La voz, el oído y la habilidad son regalos de Dios: se cultivan con esfuerzo, pero no son motivo de orgullo",
            ref: "1 Corintios 4:7",
            clave: {
              id: "pr-alabanza-2-3-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el talento es un don y no un mérito? Usa la pregunta de Pablo en 1 Corintios 4:7.",
              ideas: [
                { id: "recibido", peso: 40, texto: "Todo lo que tenemos lo recibimos: ¿qué tienes que no hayas recibido?", formas: ["recib*", "regal*", "(nos|me|te|les|le|se) (lo|la|los|las) (dio|da|regalo|regala|dieron)", "(dios|el|senor) (nos|me|te|les|le) (dio|da|regalo|regala)", "viene* de dios", "de parte de dios", "dado por dios", "dados por dios"] },
                { id: "cultiva", peso: 30, texto: "Se cultiva con esfuerzo.", formas: ["cultiv*", "esfuerzo", "practic*", "ensay*", "desarroll*"] },
                { id: "gloria", peso: 30, texto: "Pero no es motivo de orgullo: la gloria es de Dios.", formas: ["no (es|son) motivo de orgullo", "(sin|no) (orgullo|gloriarse|gloriarnos|jactarse|jactarnos|presumir|enorgullecerse|enorgullecernos)", "no (nos|me|te|se) (glori*|jact*|enorgullec*)", "la gloria a dios", "gloria a dios", "gloria es de dios", "gloria para dios", "humild*"] },
              ],
              errores: [
                { id: "merito", texto: "El talento es un don recibido, no un mérito.", formas: ["(es|son) (un|mi|su|tu|nuestro) merito", "(es|son) merito (mio|suyo|tuyo|nuestro|propio)", "(lo|los|la|las) (gane|ganamos|gano|ganaste|ganaron|merezco|merecemos|merece)", "por (mi|su|tu|nuestro) merito", "por (mis|sus|tus|nuestros) meritos"], anula: "recibido" },
                { id: "orgullo", texto: "El talento no es motivo de orgullo.", formas: ["(es|son) motivo de orgullo", "(podemos|puedo|puede|pueden|debemos|debo) (presumir|gloriarnos|gloriarse|jactarnos|enorgullecernos)"], anula: "gloria" },
              ],
              modelo: "Porque todo lo que tenemos lo recibimos de Dios: Pablo pregunta qué tenemos que no hayamos recibido. La voz y la habilidad se cultivan con esfuerzo, pero no son motivo de orgullo: la gloria es de Dios.",
            },
          },
          {
            apoyo: "El talento es un don recibido, no un mérito",
            ref: "1 Corintios 4:7",
            clave: {
              id: "pr-alabanza-2-3-a7-2",
              tipo: "corta",
              pregunta: "Una cantante del equipo dice que su voz es mérito suyo, porque estudió canto muchos años. ¿Qué le explicas?",
              ideas: [
                { id: "recibido", peso: 40, texto: "Su voz es un regalo de Dios: ¿qué tiene que no haya recibido?", formas: ["recib*", "regal*", "(nos|me|te|les|le|se) (lo|la|los|las) (dio|da|regalo|regala|dieron)", "(dios|el|senor) (nos|me|te|les|le) (dio|da|regalo|regala)", "viene* de dios", "de parte de dios", "dado por dios", "dada por dios"] },
                { id: "cultiva", peso: 30, texto: "Sus años de estudio valen, porque los dones se cultivan con esfuerzo.", formas: ["cultiv*", "esfuerzo", "practic*", "desarroll*", "(sus|tus|los) anos de estudio"] },
                { id: "gloria", peso: 30, texto: "Pero no es motivo de orgullo: Dios resiste a los soberbios y da gracia a los humildes.", formas: ["no (es|son) motivo de orgullo", "(sin|no) (orgullo|gloriarse|gloriarnos|jactarse|jactarnos|presumir|enorgullecerse|enorgullecernos)", "no (nos|me|te|se) (glori*|jact*|enorgullec*)", "resiste a los soberbios", "gracia a los humildes", "la gloria a dios", "gloria a dios", "gloria es de dios", "humild*"] },
              ],
              errores: [
                { id: "merito", texto: "El talento es un don recibido, no un mérito.", formas: ["(es|son) (un|mi|su|tu|nuestro) merito", "(es|son) merito (mio|suyo|tuyo|nuestro|propio)", "(lo|los|la|las) (gane|ganamos|gano|ganaste|ganaron|merezco|merecemos|merece)", "por (mi|su|tu|nuestro) merito", "(tiene|tienes) razon"], anula: "recibido" },
                { id: "orgullo", texto: "El talento no es motivo de orgullo.", formas: ["(es|son) motivo de orgullo", "(podemos|puedo|puede|pueden|debemos|debo) (presumir|gloriarnos|gloriarse|jactarnos|enorgullecernos)"], anula: "gloria" },
              ],
              modelo: "Le explico que su voz es un regalo de Dios: ¿qué tiene que no haya recibido? Sus años de estudio valen, porque los dones se cultivan con esfuerzo, pero no son motivo de orgullo. Dios resiste a los soberbios y da gracia a los humildes.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La vida devocional del adorador
    "alabanza-2-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hace el bienaventurado del Salmo 1 con la ley de Jehová?", reverso: "Medita en ella de día y de noche: es su delicia.", apoyo: "El hombre bienaventurado del Salmo 1 es aquel que «en la ley de Jehová está su delicia, Y en su ley medita de día y de noche»" },
              { frente: "¿Qué hizo Jesús después de un día lleno de gente y de milagros?", reverso: "Se levantó muy de mañana y se fue a orar a un lugar desierto.", apoyo: "Después de un día lleno de gente y de milagros, Jesús, «Levantándose muy de mañana, siendo aún muy oscuro, salió y se fue a un lugar desierto, y allí oraba»" },
              { frente: "¿Dónde escribió David el Salmo 63?", reverso: "En el desierto.", apoyo: "David escribió en el desierto" },
              { frente: "¿De dónde nace la adoración pública?", reverso: "De la sed personal que tenemos de Dios.", apoyo: "La adoración pública nace de esa sed personal" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hacía María mientras Marta servía?", reverso: "Se sentó a los pies de Jesús a oír su palabra.", apoyo: "María, «sentándose a los pies de Jesús, oía su palabra»" },
              { frente: "¿Qué le dijo Jesús a Marta sobre María?", reverso: "Que una sola cosa es necesaria, y que María escogió la buena parte.", apoyo: "Jesús le dijo a Marta: «sólo una cosa es necesaria; y María ha escogido la buena parte»" },
              { frente: "¿Qué riesgo corren los que sirven en la alabanza?", reverso: "El de Marta: estar tan ocupados sirviendo que se olvidan de estar con el Señor.", apoyo: "Los que sirven en la alabanza corren el riesgo de Marta: estar tan ocupados sirviendo que se olvidan de estar con el Señor" },
              { frente: "¿Qué le pasa a un adorador sin vida devocional?", reverso: "Termina cantando de memoria lo que ya no vive.", apoyo: "Un adorador sin vida devocional termina cantando de memoria lo que ya no vive" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada uno con lo que hacía para encontrarse con Dios, según la lección.",
            pares: [
              ["Jesús", "Buscaba al Padre de madrugada, en un lugar desierto"],
              ["David", "Tenía sed de Dios y lo buscaba de madrugada"],
              ["María", "Se sentó a los pies del Señor a oír su palabra"],
              ["El bienaventurado del Salmo 1", "Medita en la ley de Jehová de día y de noche"],
            ],
            apoyo: "Jesús buscaba al Padre de madrugada, David tenía sed de Dios y el bienaventurado medita en su ley de día y de noche",
            ref: "Marcos 1:35",
            explica: "Jesús buscaba al Padre de madrugada, en un lugar desierto; David tenía sed de Dios; María se sentó a los pies de Jesús a oír su palabra; y el bienaventurado medita en la ley de día y de noche.",
          },
          {
            consigna: "Une cada parte de la historia de Marta y María con lo que dice la lección.",
            pares: [
              ["Lo que hacía María", "Oía la palabra de Jesús, sentada a sus pies"],
              ["Lo que hacía Marta", "Se preocupaba con muchos quehaceres"],
              ["Lo que Jesús dijo de María", "Que escogió la buena parte"],
              ["El riesgo de los que sirven", "Estar tan ocupados que olvidan estar con el Señor"],
            ],
            apoyo: "Como María a los pies de Jesús, el adorador escoge la buena parte: estar con el Señor antes de servirle",
            ref: "Lucas 10:39-42",
            explica: "María oía la palabra sentada a los pies de Jesús, mientras Marta se preocupaba con muchos quehaceres. Jesús dijo que María escogió la buena parte, y el riesgo de los que sirven es el de Marta.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña la lección sobre lo secreto y lo público.",
            texto: "La vida devocional es la [[raíz]] del ministerio público: lo que se ve en la plataforma [[nace]] de lo que se vive en lo [[secreto]].",
            distractores: ["sombra", "huye", "visible"],
            errores: {
              sombra: "La vida devocional es la raíz del ministerio público.",
              huye: "Lo que se ve en la plataforma nace de lo que se vive en lo secreto.",
              visible: "Lo público nace de lo que se vive en lo secreto, a solas con Dios.",
            },
            apoyo: "Lo que se ve en la plataforma nace de lo que se vive en lo secreto",
            ref: "Marcos 1:35",
            explica: "La vida devocional es la raíz del ministerio público: lo que se ve en la plataforma nace de lo que se vive en lo secreto.",
          },
          {
            consigna: "Completa de dónde nace lo que cantamos.",
            texto: "La adoración [[pública]] nace de la sed [[personal]] que tenemos de Dios, y la [[Palabra]] alimenta lo que después cantamos.",
            distractores: ["fingida", "ajena", "costumbre"],
            errores: {
              fingida: "Lo que nace de la sed personal que tenemos de Dios es la adoración pública, la que se ve en la plataforma.",
              ajena: "La adoración pública nace de una sed personal, como la de David, que tenía sed de Dios.",
              costumbre: "La Palabra alimenta lo que después cantamos: el bienaventurado medita en la ley de Jehová de día y de noche.",
            },
            apoyo: "La adoración pública nace de esa sed personal",
            ref: "Salmos 63:1",
            explica: "David escribió en el desierto que su alma tenía sed de Dios: la adoración pública nace de esa sed personal, y la Palabra alimenta lo que después cantamos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un músico del equipo te dice: Estoy en todos los ensayos y en todos los cultos; no necesito un tiempo aparte con Dios.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el servicio no reemplaza el encuentro personal con Dios.", bien: true, explica: "Se puede estar en todos los ensayos y en todos los cultos, y aun así estar lejos de Dios." },
              { texto: "Que tiene razón: el que más ensaya es el que más cerca está de Dios.", explica: "El servicio no reemplaza el encuentro personal con Dios." },
              { texto: "Que está bien, mientras se sepa de memoria todas las canciones.", explica: "Un adorador sin vida devocional termina cantando de memoria lo que ya no vive." },
              { texto: "Que el tiempo a solas con Dios es solo para los pastores y los líderes.", explica: "Si el Hijo de Dios buscaba al Padre a solas, cuánto más lo necesitamos nosotros." },
            ],
            apoyo: "Lo que se ve en la plataforma nace de lo que se vive en lo secreto",
            ref: "Marcos 1:35",
            explica: "Se puede estar en todos los ensayos y en todos los cultos, y aun así estar lejos de Dios. El servicio no reemplaza el encuentro personal con él: lo que se ve en la plataforma nace de lo que se vive en lo secreto.",
          },
          {
            caso: "Una cantante del equipo te dice: Últimamente canto las canciones de memoria, pero ya no siento lo que digo.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que vuelva a buscar a Dios en lo secreto, cada día.", bien: true, explica: "Lo que se ve en la plataforma nace de lo que se vive en lo secreto." },
              { texto: "Que ensaye más horas, hasta que le salgan perfectas.", explica: "Ensayar no reemplaza el encuentro personal con Dios." },
              { texto: "Que cante más fuerte, para que nadie note lo que siente.", explica: "Eso no cambia nada: un adorador sin vida devocional termina cantando de memoria lo que ya no vive." },
              { texto: "Que deje de cantar para siempre, porque ya no sirve.", explica: "Lo que necesita es volver a su tiempo con Dios: la vida devocional es la raíz del ministerio público." },
            ],
            apoyo: "Un adorador sin vida devocional termina cantando de memoria lo que ya no vive",
            explica: "Lo que se ve en la plataforma nace de lo que se vive en lo secreto: un adorador sin vida devocional termina cantando de memoria lo que ya no vive.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el ejemplo de Jesús y de María tiene un error. Tócala.",
            frases: [
              "Después de un día lleno de gente y de milagros, Jesús buscó al Padre a solas.",
              "Jesús se fue a orar a un lugar desierto, siendo aún muy oscuro.",
              "María se preocupaba con muchos quehaceres mientras Marta oía a Jesús.",
              "Jesús dijo que María había escogido la buena parte.",
            ],
            malo: 2,
            correccion: "Marta se preocupaba con muchos quehaceres, mientras María, sentada a los pies de Jesús, oía su palabra.",
            apoyo: "María, «sentándose a los pies de Jesús, oía su palabra», mientras Marta «se preocupaba con muchos quehaceres»",
            ref: "Lucas 10:39-42",
            explica: "Era Marta la que se preocupaba con muchos quehaceres; María se sentó a los pies de Jesús a oír su palabra, y Jesús dijo que ella escogió la buena parte.",
          },
          {
            consigna: "Una de estas frases sobre buscar a Dios tiene un error. Tócala.",
            frases: [
              "David escribió en el desierto que su alma tenía sed de Dios.",
              "El bienaventurado del Salmo 1 medita en la ley de Jehová de día y de noche.",
              "Jesús, por ser el Hijo de Dios, no necesitaba buscar al Padre a solas.",
              "La adoración pública nace de la sed personal que tenemos de Dios.",
            ],
            malo: 2,
            correccion: "Jesús, el Hijo de Dios, buscaba al Padre a solas, de madrugada: cuánto más lo necesitamos nosotros.",
            apoyo: "Si el Hijo de Dios buscaba al Padre a solas, cuánto más lo necesitamos nosotros",
            ref: "Marcos 1:35",
            explica: "Jesús buscaba al Padre de madrugada, en un lugar desierto: si el Hijo de Dios lo hacía, cuánto más lo necesitamos nosotros.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Un tiempo fijo cada día, aunque sea corto",
            ref: "Marcos 1:35",
            titulo: "La agenda de Andrea",
            relato: [
              "Andrea canta en el equipo de alabanza: sirve en los cultos del domingo, ensaya los jueves y prepara las canciones los sábados. Su semana está llena.",
              "Hace meses que no tiene un tiempo a solas con Dios. Te dice: Sirvo tanto que no me queda tiempo para estar con él.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué riesgo está corriendo Andrea?",
                opciones: [
                  { texto: "El de Marta: tan ocupada sirviendo que olvida estar con el Señor.", bien: true, explica: "Los que sirven en la alabanza corren el riesgo de Marta: estar tan ocupados sirviendo que se olvidan de estar con el Señor." },
                  { texto: "Ninguno, porque servir tanto ya es lo mismo que estar con el Señor cada día.", explica: "El servicio no reemplaza el encuentro personal con Dios." },
                  { texto: "El de cantar mal, porque no ensaya lo suficiente cada semana.", explica: "Andrea ensaya; lo que le falta es su tiempo a solas con Dios." },
                ],
                apoyo: "Los que sirven en la alabanza corren el riesgo de Marta: estar tan ocupados sirviendo que se olvidan de estar con el Señor",
                explica: "Los que sirven en la alabanza corren el riesgo de Marta: estar tan ocupados sirviendo que se olvidan de estar con el Señor.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué es lo primero que le propones para su semana?",
                opciones: [
                  { texto: "Un tiempo fijo cada día con Dios, aunque sea corto.", bien: true, explica: "Un tiempo fijo cada día, aunque sea corto: el servicio no reemplaza el encuentro personal con Dios." },
                  { texto: "Esperar a tener una semana libre para dedicársela a Dios.", explica: "El tiempo con Dios es cada día, aunque sea corto." },
                  { texto: "Un ensayo más, para que el domingo todo salga perfecto.", explica: "Más servicio no reemplaza el encuentro personal con Dios." },
                ],
                apoyo: "Un tiempo fijo cada día, aunque sea corto",
                explica: "Lo primero es un tiempo fijo cada día, aunque sea corto.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué puede hacer Andrea en ese tiempo?",
                opciones: [
                  { texto: "Leer la Biblia con un plan, orar con un salmo y cantarle a Dios a solas.", bien: true, explica: "Puede leer la Biblia en orden, con un plan, orar con un salmo y con sus palabras, y cantarle a Dios a solas, sin público." },
                  { texto: "Ensayar las canciones del domingo, para ganar tiempo en la semana entera.", explica: "Ensayar es servir; el tiempo con Dios es para estar con él, como María." },
                  { texto: "Revisar las redes del ministerio y contestar los mensajes del equipo.", explica: "Eso es parte del servicio; el tiempo con Dios es para estar a solas con él." },
                ],
                apoyo: "Cantarle a Dios a solas, sin público",
                explica: "En ese tiempo puede leer la Biblia en orden, con un plan, orar con un salmo, cantarle a Dios a solas y escribir en un cuaderno lo que Dios le enseña.",
              },
              {
                tipo: "explica",
                apoyo: "¿A qué hora y en qué lugar vas a buscar a Dios cada día esta semana?",
                clave: {
                  id: "pr-alabanza-2-4-a6-1",
                  tipo: "corta",
                  pregunta: "Ayuda a Andrea a planificar su tiempo diario con Dios: ¿a qué hora, dónde y qué hará?",
                  ideas: [
                    { id: "hora", peso: 34, texto: "Una hora fija cada día.", formas: ["cada (dia|manana|noche|tarde|madrugada)", "todos los dias", "(por|en|de) la (manana|noche|tarde|madrugada)", "a las (una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|1|2|3|4|5|6|7|8|9|10|11|12)", "temprano", "madrugada", "antes de (desayunar|trabajar|salir|dormir|ir|acostarse|acostarme)", "(hora|tiempo|momento) fij*", "(lunes|martes|miercoles|jueves|viernes)", "al (levantarse|levantarme|despertar|despertarse|acostarse)", "media hora", "minutos"] },
                    { id: "lugar", peso: 33, texto: "Un lugar tranquilo, a solas.", formas: ["(en|su|mi|tu) (cuarto|habitacion|sala|cocina|casa|carro|auto|patio|balcon|jardin|oficina|recamara|pieza|dormitorio|estudio|parque|comedor|terraza)", "a solas", "lugar (tranquilo|apartado|quieto|fijo|secreto|callado|silencioso)", "en lo secreto", "en silencio", "sin (ruido|telefono|celular|distracciones)"] },
                    { id: "que", peso: 33, texto: "Leer la Biblia con un plan, orar con un salmo, cantarle a solas o escribir en un cuaderno.", formas: ["(leer|lea|leera|leyendo|leemos|leere) biblia", "(leer|lea|leera|leere) palabra", "(orar|ore|orara|orando|orare)", "salmo*", "cantar* a dios", "cant* a solas", "cant* sin publico", "cantarle", "cuaderno", "(escribir|escriba|escribira|escribiendo|escribire|anotar|anote|anotara)", "un plan", "ayun*", "medit*"] },
                  ],
                  modelo: "Andrea buscará a Dios cada mañana a las seis, en su cuarto, a solas. Leerá la Biblia con un plan, orará con un salmo, le cantará a Dios sin público y escribirá en un cuaderno lo que aprenda.",
                },
              },
            ],
          },
          {
            apoyo: "Nadie puede guiar a otros a un lugar donde él mismo no va",
            ref: "Lucas 10:39-42",
            titulo: "El nuevo director de alabanza",
            relato: [
              "A Julián le pidieron dirigir la alabanza del culto de jóvenes. Está feliz, y pasa las noches buscando canciones nuevas.",
              "Su pastor le pregunta cómo está su tiempo con Dios, y Julián reconoce que hace semanas que solo ora en los ensayos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le enseña la lección a Julián?",
                opciones: [
                  { texto: "Que nadie puede guiar a otros a donde él mismo no va.", bien: true, explica: "Nadie puede guiar a otros a un lugar donde él mismo no va." },
                  { texto: "Que con buenas canciones nuevas ya puede guiar bien a los jóvenes.", explica: "Lo que se ve en la plataforma nace de lo que se vive en lo secreto." },
                  { texto: "Que orar en los ensayos es lo mismo que tener su tiempo con Dios.", explica: "El servicio no reemplaza el encuentro personal con Dios." },
                ],
                apoyo: "Nadie puede guiar a otros a un lugar donde él mismo no va",
                explica: "Nadie puede guiar a otros a un lugar donde él mismo no va: lo que se ve en la plataforma nace de lo que se vive en lo secreto.",
              },
              {
                tipo: "situacion",
                pregunta: "¿A quién se parece hoy Julián en la historia de Lucas 10?",
                opciones: [
                  { texto: "A Marta, ocupada con muchos quehaceres.", bien: true, explica: "Como Marta, Julián está tan ocupado sirviendo que se olvida de estar con el Señor." },
                  { texto: "A María, sentada a los pies de Jesús.", explica: "María oía la palabra de Jesús; Julián dejó de buscar a Dios a solas." },
                  { texto: "A Jesús, que oraba a solas de madrugada.", explica: "Jesús buscaba al Padre a solas; Julián solo ora en los ensayos." },
                ],
                apoyo: "mientras Marta «se preocupaba con muchos quehaceres»",
                explica: "Los que sirven en la alabanza corren el riesgo de Marta: estar tan ocupados sirviendo que se olvidan de estar con el Señor.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le propones para empezar esta semana?",
                opciones: [
                  { texto: "Empezar con un tiempo fijo cada día, aunque sea corto.", bien: true, explica: "Un tiempo fijo cada día, aunque sea corto, como María, que escogió la buena parte." },
                  { texto: "Que busque más canciones nuevas, y que ore solo cuando tenga tiempo.", explica: "El servicio no reemplaza el encuentro personal con Dios." },
                  { texto: "Que deje de dirigir hasta que tenga una semana libre.", explica: "Lo que necesita es su tiempo diario con Dios, aunque sea corto." },
                ],
                apoyo: "Un tiempo fijo cada día, aunque sea corto",
                explica: "Lo primero es un tiempo fijo cada día, aunque sea corto.",
              },
              {
                tipo: "explica",
                apoyo: "Como María a los pies de Jesús, el adorador escoge la buena parte: estar con el Señor antes de servirle",
                clave: {
                  id: "pr-alabanza-2-4-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe un plan para el tiempo diario de Julián con Dios: cuándo, dónde y qué hará.",
                  ideas: [
                    { id: "hora", peso: 34, texto: "Una hora fija cada día.", formas: ["cada (dia|manana|noche|tarde|madrugada)", "todos los dias", "(por|en|de) la (manana|noche|tarde|madrugada)", "a las (una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|1|2|3|4|5|6|7|8|9|10|11|12)", "temprano", "madrugada", "antes de (desayunar|trabajar|salir|dormir|ir|acostarse|acostarme)", "(hora|tiempo|momento) fij*", "(lunes|martes|miercoles|jueves|viernes)", "al (levantarse|levantarme|despertar|despertarse|acostarse)", "media hora", "minutos"] },
                    { id: "lugar", peso: 33, texto: "Un lugar tranquilo, a solas.", formas: ["(en|su|mi|tu) (cuarto|habitacion|sala|cocina|casa|carro|auto|patio|balcon|jardin|oficina|recamara|pieza|dormitorio|estudio|parque|comedor|terraza)", "a solas", "lugar (tranquilo|apartado|quieto|fijo|secreto|callado|silencioso)", "en lo secreto", "en silencio", "sin (ruido|telefono|celular|distracciones)"] },
                    { id: "que", peso: 33, texto: "Leer la Biblia con un plan, orar con un salmo, cantarle a solas o escribir en un cuaderno.", formas: ["(leer|lea|leera|leyendo|leemos|leere) biblia", "(leer|lea|leera|leere) palabra", "(orar|ore|orara|orando|orare)", "salmo*", "cantar* a dios", "cant* a solas", "cant* sin publico", "cantarle", "cuaderno", "(escribir|escriba|escribira|escribiendo|escribire|anotar|anote|anotara)", "un plan", "ayun*", "medit*"] },
                  ],
                  modelo: "Julián buscará a Dios cada noche a las nueve, en su cuarto, a solas. Leerá la Biblia en orden con un plan, orará con un salmo y escribirá en su cuaderno lo que Dios le enseñe.",
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
            apoyo: "La vida devocional es la raíz del ministerio público",
            ref: "Marcos 1:35",
            clave: {
              id: "pr-alabanza-2-4-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la vida devocional es la raíz del ministerio público del que sirve en la alabanza?",
              ideas: [
                { id: "secreto", peso: 40, texto: "Lo que se ve en la plataforma nace de lo que se vive en lo secreto.", formas: ["lo secreto", "a solas", "en privado", "(nace|sale|viene|brota|depende|crece) de lo que viv*", "(nace|sale|viene|brota) de (la|esa|nuestra|su|mi) (sed|relacion|intimidad)", "sed personal", "sed de dios", "tiene sed"] },
                { id: "reemplaza", peso: 30, texto: "El servicio no reemplaza el encuentro personal con Dios.", formas: ["no reemplaza", "no (sustituye|remplaza|reemplazan|sustituyen)", "encuentro personal", "(estar|estando) todos los (ensayos|cultos)", "lejos de dios"] },
                { id: "memoria", peso: 30, texto: "Sin vida devocional, el adorador termina cantando de memoria lo que ya no vive: nadie guía a otros a donde él no va.", formas: ["de memoria", "lo que ya no vive", "ya no (vive|vivimos|vivo|siente|sentimos)", "guiar a otros", "donde (el|uno|yo|tu|ellos) no (va|vamos|voy|van)"] },
              ],
              modelo: "Porque lo que se ve en la plataforma nace de lo que se vive en lo secreto, a solas con Dios. El servicio no reemplaza el encuentro personal con él, y sin vida devocional se termina cantando de memoria lo que ya no se vive.",
            },
          },
          {
            apoyo: "Si el Hijo de Dios buscaba al Padre a solas, cuánto más lo necesitamos nosotros",
            ref: "Lucas 10:39-42",
            clave: {
              id: "pr-alabanza-2-4-a7-2",
              tipo: "corta",
              pregunta: "Un cantante dice que su tiempo con Dios son los ensayos y los cultos. ¿Qué le explicas, con el ejemplo de Jesús o de María?",
              ideas: [
                { id: "reemplaza", peso: 35, texto: "El servicio no reemplaza el encuentro personal con Dios: se puede estar en todos los ensayos y aun así lejos de él.", formas: ["no reemplaza", "no (sustituye|remplaza|reemplazan|sustituyen)", "encuentro personal", "lejos de dios"] },
                { id: "ejemplo", peso: 35, texto: "Jesús buscaba al Padre a solas, de madrugada; María se sentó a los pies de Jesús y escogió la buena parte.", formas: ["de madrugada", "muy de manana", "lugar desierto", "a solas", "a los pies", "buena parte", "(maria|ella) escogio", "cosa necesaria", "solo una cosa", "busc* al padre"] },
                { id: "secreto", peso: 30, texto: "Lo que se ve en la plataforma nace de lo que se vive en lo secreto.", formas: ["lo secreto", "en privado", "(nace|sale|viene|brota) de lo que viv*", "raiz", "sed personal", "sed de dios"] },
              ],
              errores: [
                { id: "basta", texto: "El servicio no reemplaza el encuentro personal con Dios.", formas: ["(tiene|tienes) razon", "con eso basta", "ensayos (bastan|basta)", "(es|son) suficiente*"], anula: "reemplaza" },
              ],
              modelo: "Le explico que el servicio no reemplaza el encuentro personal con Dios. Jesús buscaba al Padre a solas, de madrugada, y María se sentó a los pies de Jesús: escogió la buena parte. Lo que se ve en la plataforma nace de lo secreto.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El equipo: un solo cuerpo
    "alabanza-2-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué compara Pablo a la iglesia?", reverso: "Con un cuerpo: uno solo, con muchos miembros.", apoyo: "Pablo compara a la iglesia con un cuerpo" },
              { frente: "¿Quiénes forman el equipo de alabanza?", reverso: "Voces, instrumentos y técnicos, y todos son necesarios.", apoyo: "En el equipo de alabanza hay voces, instrumentos y técnicos, y todos son necesarios" },
              { frente: "¿Quién dio a cada miembro su lugar en el cuerpo?", reverso: "Dios, que los colocó como él quiso.", apoyo: "Cada uno tiene el lugar que Dios le dio: «Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso»" },
              { frente: "¿Hay en el equipo miembros de primera y de segunda?", reverso: "No: cada uno tiene el lugar que Dios le dio.", apoyo: "No hay miembros de primera y de segunda" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es la regla del equipo, según Filipenses 2:3?", reverso: "Nada por contienda ni vanagloria: con humildad, estimar a los demás como superiores.", apoyo: "La regla del equipo está en Filipenses" },
              { frente: "¿Qué pide Romanos 12:10 sobre la honra?", reverso: "Preferirse los unos a los otros, con amor fraternal.", apoyo: "Y Romanos lo completa: «Amaos los unos a los otros con amor fraternal; en cuanto a honra, prefiriéndoos los unos a los otros»" },
              { frente: "¿Es el ministerio de alabanza un grupo aparte de la iglesia?", reverso: "No: es parte de la iglesia.", apoyo: "El ministerio de alabanza es parte de la iglesia, no un grupo aparte" },
              { frente: "¿Cómo se tratan los desacuerdos con los pastores?", reverso: "Se conversan con respeto y en privado, no frente al pueblo.", apoyo: "Cuando hay desacuerdos, se conversan con respeto y en privado, no frente al pueblo" },
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
            consigna: "¿Cómo se aplica la imagen del cuerpo al equipo de alabanza? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "equipo", texto: "El equipo de alabanza", x: 50, y: 12 },
              { id: "iglesia", texto: "La iglesia", x: 15, y: 50 },
              { id: "miembros", texto: "Voces, instrumentos y técnicos", x: 85, y: 50 },
              { id: "dios", texto: "Dios", x: 15, y: 88 },
              { id: "lugar", texto: "El lugar de cada miembro", x: 85, y: 88 },
            ],
            enlaces: [
              { de: "equipo", a: "iglesia", relacion: "es parte de" },
              { de: "equipo", a: "miembros", relacion: "tiene" },
              { de: "dios", a: "lugar", relacion: "dio" },
            ],
            distractores: ["está fuera de", "compite con"],
            apoyo: "El ministerio de alabanza es parte de la iglesia, no un grupo aparte",
            ref: "1 Corintios 12:12",
            explica: "El equipo de alabanza es parte de la iglesia, no un grupo aparte. Tiene voces, instrumentos y técnicos, y todos son necesarios, porque cada uno tiene el lugar que Dios le dio.",
          },
          {
            consigna: "¿Qué enseña Pablo sobre el cuerpo en 1 Corintios 12? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "cuerpo", texto: "El cuerpo", x: 50, y: 12 },
              { id: "miembros", texto: "Muchos miembros", x: 15, y: 55 },
              { id: "uno", texto: "Un solo cuerpo", x: 85, y: 55 },
              { id: "dios", texto: "Dios", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "cuerpo", a: "miembros", relacion: "tiene" },
              { de: "miembros", a: "uno", relacion: "son" },
              { de: "dios", a: "miembros", relacion: "colocó como quiso" },
            ],
            distractores: ["descarta", "divide en rangos"],
            apoyo: "«Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso»",
            ref: "1 Corintios 12:18",
            explica: "El cuerpo es uno y tiene muchos miembros; todos los miembros, siendo muchos, son un solo cuerpo; y Dios colocó cada miembro en el cuerpo como él quiso.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo sirve cada uno en un buen equipo.",
            texto: "En un buen equipo nadie compite: cada uno se [[alegra]] cuando otro [[brilla]] y [[escucha]] a los demás, también al tocar.",
            distractores: ["molesta", "falla", "tapa"],
            errores: {
              molesta: "El que sirve en equipo no compite: se alegra cuando otro brilla.",
              falla: "Se alegra cuando otro brilla, no cuando otro falla.",
              tapa: "La música en equipo es dejar espacio: se escucha a los demás, también al tocar.",
            },
            apoyo: "No compite: se alegra cuando otro brilla",
            explica: "El que sirve en equipo no compite: se alegra cuando otro brilla y escucha a los demás, también al tocar, porque la música en equipo es dejar espacio.",
          },
          {
            consigna: "Completa la regla del equipo que dan Filipenses y Romanos.",
            texto: "En el equipo se sirve con [[humildad]], estimando a cada hermano como [[superior]], y prefiriéndose unos a otros en la [[honra]].",
            distractores: ["contienda", "rival", "fama"],
            errores: {
              contienda: "Nada se hace por contienda ni por vanagloria: se sirve con humildad.",
              rival: "Cada uno estima a los demás como superiores a él mismo, no como rivales.",
              fama: "Romanos dice: «en cuanto a honra, prefiriéndoos los unos a los otros».",
            },
            apoyo: "Se sirve sin contienda ni vanagloria, estimando a los demás como superiores y prefiriéndose en la honra",
            ref: "Filipenses 2:3-4",
            explica: "Nada se hace por contienda ni por vanagloria: con humildad, cada uno estima a los demás como superiores a él mismo, y en cuanto a honra se prefieren los unos a los otros.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una cantante del equipo te dice: Siempre le dan el solo a Carla; el domingo voy a cantar más fuerte para que se note mi voz.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no compita: en un buen equipo nadie suena más fuerte que la canción.", bien: true, explica: "El que sirve en equipo no compite: se alegra cuando otro brilla." },
              { texto: "Que tiene razón: si canta más fuerte, el director al fin se va a dar cuenta de su voz.", explica: "Eso es competir: en un buen equipo, nadie suena más fuerte que la canción." },
              { texto: "Que hable con los demás sobre Carla, para que le quiten el solo.", explica: "Eso es contienda: nada se hace por contienda o por vanagloria." },
              { texto: "Que se salga del equipo, porque ahí nunca la van a valorar como merece.", explica: "En el equipo cada uno tiene el lugar que Dios le dio, y se sirve estimando a los demás como superiores." },
            ],
            apoyo: "En un buen equipo, nadie suena más fuerte que la canción",
            explica: "El que sirve en equipo no compite: se alegra cuando otro brilla. En un buen equipo, nadie suena más fuerte que la canción.",
          },
          {
            caso: "Un músico veterano te dice: Llevo diez años en el equipo; los nuevos deberían servirme a mí, y no al revés.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que con humildad estime a los nuevos como superiores a él mismo.", bien: true, explica: "La regla del equipo está en Filipenses: con humildad, cada uno estima a los demás como superiores a él mismo." },
              { texto: "Que tiene razón: los años en el equipo le dan derecho a que lo sirvan.", explica: "Nada se hace por contienda o por vanagloria: se estima a los demás como superiores." },
              { texto: "Que deje que los nuevos aprendan solos, sin dedicarles su tiempo.", explica: "En el equipo se sirve con humildad, prefiriéndose los unos a los otros en la honra." },
              { texto: "Que les exija respeto delante de todos en el próximo ensayo.", explica: "Eso busca su propia honra: en el equipo, cada uno prefiere al otro en la honra." },
            ],
            apoyo: "antes bien con humildad, estimando cada uno a los demás como superiores a él mismo",
            ref: "Filipenses 2:3-4",
            explica: "La regla del equipo está en Filipenses: nada por contienda o por vanagloria; con humildad, cada uno estima a los demás como superiores a él mismo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el equipo y la autoridad de los pastores: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El ministerio de alabanza es un grupo aparte de la iglesia.", verdad: false, explica: "Es parte de la iglesia, no un grupo aparte: por eso sirve bajo la dirección de sus pastores.", apoyo: "El ministerio de alabanza es parte de la iglesia, no un grupo aparte" },
              { texto: "El equipo de alabanza sirve bajo la dirección de sus pastores.", verdad: true, explica: "Hebreos 13:17 pide obedecer a los pastores, porque ellos velan por nuestras almas.", apoyo: "Por eso sirve bajo la dirección de sus pastores", ref: "Hebreos 13:17" },
              { texto: "Los pastores velan por las almas de los que sirven en el equipo.", verdad: true, explica: "Así lo dice Hebreos 13:17: «porque ellos velan por vuestras almas».", apoyo: "«Obedeced a vuestros pastores, y sujetaos a ellos; porque ellos velan por vuestras almas»", ref: "Hebreos 13:17" },
              { texto: "El equipo de alabanza decide solo, sin la dirección de sus pastores.", verdad: false, explica: "El ministerio de alabanza es parte de la iglesia: sirve bajo la dirección de sus pastores.", apoyo: "Por eso sirve bajo la dirección de sus pastores", ref: "Hebreos 13:17" },
            ],
          },
          {
            consigna: "Sobre los desacuerdos y los conflictos en el equipo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un desacuerdo con los pastores se conversa con respeto y en privado.", verdad: true, explica: "Los desacuerdos se conversan con respeto y en privado, no frente al pueblo.", apoyo: "Cuando hay desacuerdos, se conversan con respeto y en privado, no frente al pueblo" },
              { texto: "Si tengo un conflicto con un hermano, se lo cuento primero a todo el equipo.", verdad: false, explica: "Los conflictos se resuelven hablando a solas con el hermano, como enseñó Jesús.", apoyo: "Resuelve los conflictos hablando a solas con el hermano, como enseñó Jesús (Mateo 18:15)", ref: "Mateo 18:15" },
              { texto: "El que sirve en el equipo acepta la dirección del responsable y de los pastores.", verdad: true, explica: "Es parte de servir unidos: el ministerio sirve bajo la autoridad de los pastores.", apoyo: "Acepta la dirección del responsable y de los pastores" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El ministerio sirve bajo la autoridad de los pastores, que velan por las almas",
            ref: "Hebreos 13:17",
            titulo: "El cambio de canciones",
            relato: [
              "Eres el responsable del equipo de alabanza. El sábado, el pastor te pide cambiar dos canciones del domingo por otras que hablan del tema del sermón.",
              "A ti te gustaban más las que ya tenían ensayadas, y un músico te dice: Digámosle que no, o mejor cantemos las nuestras igual.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con el pedido del pastor?",
                opciones: [
                  { texto: "Lo acepto: el equipo sirve bajo la dirección de los pastores.", bien: true, explica: "El ministerio de alabanza sirve bajo la dirección de sus pastores, que velan por las almas." },
                  { texto: "Cantamos las nuestras igual, porque el equipo decide lo que se canta.", explica: "El ministerio de alabanza es parte de la iglesia, no un grupo aparte." },
                  { texto: "Lo ignoro y no le digo nada, para no tener un problema con él.", explica: "El equipo acepta la dirección de los pastores; si hay desacuerdo, se conversa con respeto." },
                ],
                apoyo: "Por eso sirve bajo la dirección de sus pastores",
                explica: "El ministerio de alabanza es parte de la iglesia, no un grupo aparte: sirve bajo la dirección de sus pastores, que velan por las almas.",
              },
              {
                tipo: "situacion",
                pregunta: "No estás de acuerdo con el cambio. ¿Cómo se lo dices al pastor?",
                opciones: [
                  { texto: "Con respeto y en privado, antes del culto.", bien: true, explica: "Los desacuerdos se conversan con respeto y en privado, no frente al pueblo." },
                  { texto: "En el culto, delante de todos, para que la iglesia opine.", explica: "Los desacuerdos no se tratan frente al pueblo, sino en privado." },
                  { texto: "Por las redes, para que otros hermanos me apoyen.", explica: "Los desacuerdos se conversan con respeto y en privado." },
                ],
                apoyo: "Cuando hay desacuerdos, se conversan con respeto y en privado, no frente al pueblo",
                explica: "Los desacuerdos se conversan con respeto y en privado, no frente al pueblo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al músico que propuso cantar las suyas igual?",
                opciones: [
                  { texto: "Que el equipo no es un grupo aparte: es parte de la iglesia.", bien: true, explica: "El ministerio de alabanza es parte de la iglesia, no un grupo aparte." },
                  { texto: "Que tiene razón: los músicos saben más de canciones que el pastor.", explica: "El ministerio sirve bajo la autoridad de los pastores, que velan por las almas." },
                  { texto: "Que está bien, pero solo si nadie se da cuenta del cambio.", explica: "Eso sería desobedecer a escondidas: el equipo sirve bajo la dirección de sus pastores." },
                ],
                apoyo: "El ministerio de alabanza es parte de la iglesia, no un grupo aparte",
                explica: "El ministerio de alabanza es parte de la iglesia, no un grupo aparte: por eso sirve bajo la dirección de sus pastores.",
              },
              {
                tipo: "explica",
                apoyo: "«Obedeced a vuestros pastores, y sujetaos a ellos; porque ellos velan por vuestras almas»",
                clave: {
                  id: "pr-alabanza-2-5-a6-1",
                  tipo: "corta",
                  pregunta: "¿Por qué el equipo de alabanza sirve bajo la autoridad de los pastores, y cómo se trata un desacuerdo con ellos?",
                  ideas: [
                    { id: "parte", peso: 35, texto: "Porque el ministerio de alabanza es parte de la iglesia, no un grupo aparte.", formas: ["parte de la iglesia", "no (es|somos|son) un grupo aparte", "(pertenece|pertenecemos|pertenecen) a la iglesia", "dentro de la iglesia"] },
                    { id: "velan", peso: 35, texto: "Porque los pastores velan por las almas (Hebreos 13:17).", formas: ["velan por", "vela por", "velar por", "cuidan (nuestras|las|sus) almas", "(cuidan|cuidar) de (nosotros|nuestras)", "hebreos 13", "obedec*", "sujet*"] },
                    { id: "privado", peso: 30, texto: "El desacuerdo se conversa con respeto y en privado, no frente al pueblo.", formas: ["en privado", "a solas", "con respeto", "respetuos*", "no (frente|delante) (al|del|de) (pueblo|iglesia|congregacion|todos)"] },
                  ],
                  errores: [
                    { id: "publico", texto: "Los desacuerdos se conversan con respeto y en privado, no frente al pueblo.", formas: ["(frente|delante) (al|del) pueblo", "(frente|delante) de (la|toda) (iglesia|congregacion)", "(frente|delante) de todos", "en (el|pleno) culto", "en publico"], anula: "privado" },
                  ],
                  modelo: "Porque el ministerio de alabanza es parte de la iglesia, no un grupo aparte, y los pastores velan por nuestras almas. Si hay un desacuerdo, se conversa con ellos con respeto y en privado, no frente al pueblo.",
                },
              },
            ],
          },
          {
            apoyo: "Resuelve los conflictos hablando a solas con el hermano, como enseñó Jesús (Mateo 18:15)",
            ref: "Mateo 18:15",
            titulo: "Tensión en el ensayo",
            relato: [
              "En el ensayo, Rubén, el baterista, y Lucía, la tecladista, discuten porque cada uno quiere llevar la canción a su manera.",
              "Después, Lucía escribe en el grupo del equipo para quejarse de Rubén, y algunos dicen que van a hablar con el pastor en el culto del domingo, delante de todos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Según la lección, ¿cómo se resuelve el conflicto entre Rubén y Lucía?",
                opciones: [
                  { texto: "Hablando a solas, como enseñó Jesús en Mateo 18:15.", bien: true, explica: "Los conflictos se resuelven hablando a solas con el hermano, como enseñó Jesús." },
                  { texto: "Con una votación del equipo para ver quién tiene razón.", explica: "La lección enseña a resolverlo hablando a solas con el hermano." },
                  { texto: "Con mensajes en el grupo, para que todos opinen del tema.", explica: "Los conflictos se resuelven hablando a solas, no en el grupo." },
                ],
                apoyo: "Resuelve los conflictos hablando a solas con el hermano, como enseñó Jesús (Mateo 18:15)",
                explica: "Los conflictos se resuelven hablando a solas con el hermano, como enseñó Jesús.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué enseña la lección sobre tocar en equipo?",
                opciones: [
                  { texto: "Que se escucha a los demás: la música en equipo es dejar espacio.", bien: true, explica: "El que sirve escucha a los demás, también al tocar: la música en equipo es dejar espacio." },
                  { texto: "Que manda el que toca más fuerte, y los demás tienen que seguirlo a él.", explica: "En un buen equipo, nadie suena más fuerte que la canción." },
                  { texto: "Que cada uno toca a su manera, aunque los demás se pierdan.", explica: "La música en equipo es dejar espacio: se escucha a los demás." },
                ],
                apoyo: "Escucha a los demás, también al tocar: la música en equipo es dejar espacio",
                explica: "El que sirve escucha a los demás, también al tocar: la música en equipo es dejar espacio.",
              },
              {
                tipo: "situacion",
                pregunta: "Algunos quieren hablar con el pastor en el culto, delante de todos. ¿Qué les dices?",
                opciones: [
                  { texto: "Que los desacuerdos se conversan con respeto y en privado.", bien: true, explica: "Los desacuerdos se conversan con respeto y en privado, no frente al pueblo." },
                  { texto: "Que está bien: así la iglesia sabe lo que pasa en el equipo.", explica: "Los desacuerdos no se tratan frente al pueblo." },
                  { texto: "Que mejor no le digan nada al pastor, porque no es asunto suyo.", explica: "El equipo sirve bajo la dirección de sus pastores: con ellos se conversa con respeto y en privado." },
                ],
                apoyo: "Cuando hay desacuerdos, se conversan con respeto y en privado, no frente al pueblo",
                explica: "Los desacuerdos se conversan con respeto y en privado, no frente al pueblo; y el equipo sirve bajo la dirección de sus pastores.",
              },
              {
                tipo: "explica",
                apoyo: "¿Con quién del equipo necesitas arreglar algo o a quién necesitas honrar esta semana?",
                clave: {
                  id: "pr-alabanza-2-5-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué les aconsejas a Rubén y a Lucía para arreglar su conflicto, según la lección?",
                  ideas: [
                    { id: "solas", peso: 50, texto: "Que hablen a solas, como enseñó Jesús en Mateo 18:15, y no en el grupo ni frente a todos.", formas: ["a solas", "en privado", "(ellos|los) dos solos", "cara a cara", "personalmente", "mateo 18", "como (enseno|dijo) jesus", "lo que (enseno|dijo) jesus", "no en el grupo", "fuera del grupo"] },
                    { id: "honra", peso: 50, texto: "Que se estimen como superiores y se prefieran en la honra, sin contienda ni vanagloria.", formas: ["humild*", "superior*", "honr*", "sin contienda", "vanagloria", "(se|nos) (escuchen|escuchemos|escuchan|escuche)", "escuchandose", "dejar espacio", "(deje|dejen) espacio", "amor fraternal", "perdon*", "no compit*"] },
                  ],
                  errores: [
                    { id: "grupo", texto: "Los conflictos se resuelven hablando a solas con el hermano, no en el grupo ni frente a todos.", formas: ["(en|por) el grupo", "(frente|delante) de todos", "en el culto", "que (vote|voten|opine|opinen)"], anula: "solas" },
                  ],
                  modelo: "Les aconsejo que hablen a solas, como enseñó Jesús en Mateo 18:15, y no en el grupo. Y que con humildad cada uno estime al otro como superior, sin contienda, prefiriéndose en la honra y escuchándose al tocar.",
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
            apoyo: "El equipo de alabanza es parte del cuerpo de Cristo: muchos miembros, un solo cuerpo, cada uno en el lugar que Dios le dio",
            ref: "1 Corintios 12:12",
            clave: {
              id: "pr-alabanza-2-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseña la imagen del cuerpo de 1 Corintios 12 para el equipo de alabanza?",
              ideas: [
                { id: "cuerpo", peso: 40, texto: "Somos muchos miembros, pero un solo cuerpo.", formas: ["muchos miembros", "un solo cuerpo", "(somos|son|es|forman|formamos) cuerpo", "cuerpo de cristo", "(somos|son) uno", "unidad", "unidos"] },
                { id: "necesarios", peso: 30, texto: "Voces, instrumentos y técnicos: todos son necesarios; no hay miembros de primera y de segunda.", formas: ["todos (son|somos) necesarios", "necesari*", "no hay primera", "ni primera ni segunda", "(voces|instrumentos|tecnicos)"] },
                { id: "lugar", peso: 30, texto: "Cada uno tiene el lugar que Dios le dio, como él quiso.", formas: ["lugar que dios", "dios (nos|le|les|me|te|los|lo) (dio|puso|coloco)", "(coloco|puso) cada (uno|miembro)", "como (el|dios) quiso", "su lugar", "cada uno (tiene|en) (su|el) lugar"] },
              ],
              modelo: "Que el equipo es parte del cuerpo de Cristo: muchos miembros, pero un solo cuerpo. Voces, instrumentos y técnicos son todos necesarios, y cada uno tiene el lugar que Dios le dio, como él quiso.",
            },
          },
          {
            apoyo: "No hay miembros de primera y de segunda",
            ref: "1 Corintios 12:18",
            clave: {
              id: "pr-alabanza-2-5-a7-2",
              tipo: "corta",
              pregunta: "Un músico dice que en el equipo los que cantan valen más que los técnicos. ¿Qué le explicas con la imagen del cuerpo?",
              ideas: [
                { id: "primera", peso: 40, texto: "No hay miembros de primera y de segunda: todos son necesarios.", formas: ["no hay primera", "ni primera ni segunda", "todos (son|somos) necesarios", "necesari*", "(valen|valemos|vale) igual", "valen lo mismo"] },
                { id: "lugar", peso: 30, texto: "Dios colocó a cada miembro en el cuerpo como él quiso.", formas: ["como (el|dios) quiso", "dios (nos|los|le|les|lo|me) (coloco|puso|dio)", "(coloco|puso) cada (uno|miembro)", "lugar que dios", "su lugar"] },
                { id: "cuerpo", peso: 30, texto: "Somos muchos miembros, pero un solo cuerpo.", formas: ["un solo cuerpo", "muchos miembros", "(somos|son|es|forman|formamos) cuerpo", "cuerpo de cristo"] },
              ],
              errores: [
                { id: "valen-mas", texto: "No hay miembros de primera y de segunda.", formas: ["(cantan|cantantes|musicos) valen mas", "(valen|vale) mas (que|los)", "(son|somos) mas importantes", "(tiene|tienes) razon"], anula: "primera" },
              ],
              modelo: "Le explico que en el cuerpo no hay miembros de primera y de segunda: voces, instrumentos y técnicos son todos necesarios. Somos muchos miembros, pero un solo cuerpo, y Dios colocó a cada uno en su lugar, como él quiso.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Adorar en la prueba y toda la semana
    "alabanza-2-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué perdió Job en un solo día?", reverso: "Sus bienes y a sus hijos.", apoyo: "Job perdió sus bienes y a sus hijos en un solo día" },
              { frente: "¿Qué dijo Job después de postrarse en tierra y adorar?", reverso: "«Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito».", apoyo: "y dijo: «Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito»" },
              { frente: "¿Qué hacían Pablo y Silas a medianoche en la cárcel de Filipos?", reverso: "Oraban y cantaban himnos a Dios, y los presos los oían.", apoyo: "«a medianoche, orando Pablo y Silas, cantaban himnos a Dios; y los presos los oían»" },
              { frente: "¿Qué escasez imaginó Habacuc?", reverso: "La peor: sin higos, sin uvas, sin ovejas y sin vacas.", apoyo: "El profeta Habacuc imaginó la peor escasez: sin higos, sin uvas, sin ovejas y sin vacas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Fingió Job que no le dolía lo que perdió?", reverso: "No: lloró y adoró a la vez.", apoyo: "Job lloró y adoró a la vez: adorar en el dolor no es fingir que no duele" },
              { frente: "¿Qué fue para los presos la adoración de Pablo y Silas?", reverso: "Un testimonio: los presos los oían cantar en la noche.", apoyo: "Su adoración en la noche fue también un testimonio para otros" },
              { frente: "¿De qué dependía el gozo de Habacuc?", reverso: "De Dios, y no de las circunstancias.", apoyo: "Su gozo no dependía de las circunstancias, sino de Dios" },
              { frente: "¿Desde dónde escribió Pablo «Regocijaos en el Señor siempre»?", reverso: "Desde la cárcel.", apoyo: "Pablo escribió desde la cárcel: «Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!»" },
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
            consigna: "Une a cada uno con su manera de adorar en medio de la prueba.",
            pares: [
              ["Job", "Lloró y adoró el día que lo perdió todo"],
              ["Pablo y Silas", "Cantaron himnos a medianoche en la cárcel"],
              ["Habacuc", "Se alegró en Dios en medio de la escasez"],
              ["Los presos de Filipos", "Oyeron la adoración de los dos en la noche"],
            ],
            apoyo: "Job lloró y adoró, Pablo y Silas cantaron himnos a medianoche en la cárcel, y Habacuc se alegró en Dios en medio de la escasez",
            explica: "Job lloró y adoró a la vez; Pablo y Silas cantaron himnos a medianoche en la cárcel, y los presos los oían; y Habacuc se alegró en Dios en medio de la escasez.",
          },
          {
            consigna: "Une cada frase de la Biblia con quien la dijo o la vivió, según la lección.",
            pares: [
              ["«Jehová dio, y Jehová quitó»", "Job, el día que perdió sus bienes y a sus hijos"],
              ["«Con todo, yo me alegraré en Jehová»", "Habacuc, ante la peor escasez"],
              ["«Regocijaos en el Señor siempre»", "Lo escribió Pablo en una carta"],
              ["«cantaban himnos a Dios»", "Pablo y Silas, a medianoche, en Filipos"],
            ],
            apoyo: "Pablo escribió desde la cárcel: «Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!»",
            explica: "Job bendijo el nombre de Jehová el día que lo perdió todo; Habacuc declaró que se alegraría en Jehová aun en la peor escasez; Pablo escribió desde la cárcel que nos regocijemos en el Señor siempre; y Pablo y Silas cantaban himnos a Dios a medianoche.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es adoración sincera en el dolor o es una alegría fingida? Lleva cada frase a su grupo.",
            grupos: ["Adoración sincera en el dolor", "Alegría fingida"],
            frases: [
              { texto: "Llorar y adorar a la vez, como Job", grupo: 0 },
              { texto: "Cantar la verdad de Dios cuando todavía no la siento", grupo: 0 },
              { texto: "Recordar lo que Dios ya hizo y lo que prometió", grupo: 0 },
              { texto: "Confiar en el Señor dentro del dolor", grupo: 0 },
              { texto: "Fingir que no me duele nada", grupo: 1 },
              { texto: "Esconder el llanto porque creo que un adorador no llora", grupo: 1 },
              { texto: "Negar el dolor para parecer fuerte en la fe", grupo: 1 },
            ],
            apoyo: "Adorar en la prueba no es fingir, sino confiar en Dios dentro del dolor",
            ref: "Job 1:20-21",
            explica: "Adorar en la prueba no es fingir alegría: los salmos también lloran. Es cantar la verdad de Dios cuando todavía no la sentimos, recordar lo que Dios ya hizo y lo que prometió, y confiar en el Señor dentro del dolor.",
          },
          {
            consigna: "En el equipo de alabanza, ¿quién adora con sinceridad en el dolor y quién finge alegría? Lleva cada ejemplo a su grupo.",
            grupos: ["Adoración sincera en el dolor", "Alegría fingida"],
            frases: [
              { texto: "Una cantante que perdió a su padre llora y adora en el culto", grupo: 0 },
              { texto: "Un músico sin trabajo canta que Dios es fiel, aunque todavía no lo siente", grupo: 0 },
              { texto: "Un pianista enfermo recuerda lo que Dios ya hizo por él", grupo: 0 },
              { texto: "Un cantante dice que todo está perfecto, aunque por dentro se derrumba", grupo: 1 },
              { texto: "Una corista esconde su llanto porque cree que un adorador no llora", grupo: 1 },
              { texto: "Un guitarrista sonríe en la plataforma para esconder que está triste", grupo: 1 },
            ],
            apoyo: "Adorar en la prueba no es fingir alegría: los salmos también lloran",
            ref: "Filipenses 4:4",
            explica: "Llorar y adorar a la vez, cantar la verdad de Dios aunque todavía no se sienta y recordar lo que Dios ya hizo es adoración sincera. Esconder el dolor detrás de una alegría que no se tiene es fingir.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hizo Habacuc en medio de la escasez.",
            texto: "Habacuc imaginó la peor [[escasez]], y aun así se [[alegró]] en Dios: su [[gozo]] dependía de Dios y no de las circunstancias.",
            distractores: ["abundancia", "quejó", "cosecha"],
            errores: {
              abundancia: "Habacuc imaginó la peor escasez: sin higos, sin uvas, sin ovejas y sin vacas.",
              "quejó": "Aun así declaró que se alegraría en Jehová y se gozaría en el Dios de su salvación.",
              cosecha: "Lo que dependía de Dios era su gozo: no dependía de las circunstancias.",
            },
            apoyo: "Su gozo no dependía de las circunstancias, sino de Dios",
            ref: "Habacuc 3:18",
            explica: "Habacuc imaginó la peor escasez y aun así declaró que se alegraría en Jehová: su gozo no dependía de las circunstancias, sino de Dios.",
          },
          {
            consigna: "Completa lo que pasó con Pablo y Silas en Filipos.",
            texto: "Pablo y Silas fueron [[azotados]] y encerrados en la [[cárcel]], pero en la noche le cantaban [[himnos]] a Dios, y su adoración fue un testimonio para los presos.",
            distractores: ["premiados", "plaza", "quejas"],
            errores: {
              premiados: "En Filipos, Pablo y Silas fueron azotados y encerrados en la cárcel.",
              plaza: "Los encerraron en la cárcel, y allí los presos los oían.",
              quejas: "A medianoche, orando, cantaban himnos a Dios.",
            },
            apoyo: "En Filipos, Pablo y Silas fueron azotados y encerrados en la cárcel",
            ref: "Hechos 16:25",
            explica: "En Filipos, Pablo y Silas fueron azotados y encerrados en la cárcel, pero a medianoche oraban y cantaban himnos a Dios, y los presos los oían: su adoración fue también un testimonio para otros.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Es cantar la verdad de Dios cuando todavía no la sentimos",
            ref: "Job 1:20-21",
            situacion: "Cantas en el equipo de alabanza. Esta semana perdiste tu trabajo, y el domingo te toca cantar.",
            escenas: [
              {
                id: "e1",
                narra: "Es de noche y no puedes dormir, pensando en las cuentas de la casa.",
                pregunta: "¿Qué haces con lo que sientes?",
                opciones: [
                  { texto: "Le cuentas tu dolor a Dios y le cantas su verdad, aunque no la sientas.", valor: 2, explica: "Adorar en la prueba es cantar la verdad de Dios cuando todavía no la sentimos; y los salmos también lloran.", siguiente: "e2" },
                  { texto: "Lloras delante de Dios, pero decides no cantarle nada hasta que todo pase.", valor: 1, explica: "Llorar delante de Dios está bien, porque los salmos también lloran; pero la adoración se prueba en el dolor, y se sigue cantando su verdad.", siguiente: "e2" },
                  { texto: "Te dices que un adorador no llora, y finges que no te duele nada.", valor: 0, explica: "Adorar en el dolor no es fingir que no duele: Job lloró y adoró a la vez.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Por la mañana lees que Job lloró y adoró a la vez.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Dejar de fingir y adorar a Dios con tu dolor, como Job.", valor: 2, explica: "Job lloró y adoró a la vez: adorar en el dolor no es fingir que no duele.", siguiente: "e2" },
                  { texto: "Seguir fingiendo que todo está bien, para que nadie piense que te falta fe.", valor: 0, explica: "Adorar en la prueba no es fingir alegría: el gozo cristiano no niega el dolor.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El domingo, en el culto, el equipo canta que Dios es fiel.",
                pregunta: "¿Cómo cantas?",
                opciones: [
                  { texto: "Recordando lo que Dios ya hizo y lo que prometió.", valor: 2, explica: "Adorar en la prueba es recordar lo que Dios ya hizo y lo que prometió." },
                  { texto: "En silencio, porque no quieres cantar lo que no sientes.", valor: 1, explica: "Es sincero, pero adorar en la prueba es cantar la verdad de Dios cuando todavía no la sentimos." },
                  { texto: "Con una gran sonrisa, para que nadie note tu dolor.", valor: 0, explica: "Eso es fingir alegría: adorar en la prueba no es fingir." },
                ],
              },
              {
                id: "e3",
                narra: "Un vecino que no va a la iglesia te pregunta cómo puedes tener paz.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que confías en Dios, también dentro del dolor.", valor: 2, explica: "Es dejar que otros vean nuestra fe en la noche, como los presos de Filipos que oían a Pablo y Silas." },
                  { texto: "Que todo va perfecto, para que no dude de Dios.", valor: 0, explica: "Adorar en la prueba no es fingir: el gozo cristiano no niega el dolor, confía en el Señor dentro de él." },
                  { texto: "Nada: de la fe no se habla fuera de la iglesia.", valor: 0, explica: "La adoración de Pablo y Silas en la noche fue también un testimonio para otros." },
                ],
              },
            ],
          },
          {
            apoyo: "El gozo cristiano no niega el dolor: confía en el Señor dentro de él",
            ref: "Filipenses 4:4",
            situacion: "Tocas el piano en el equipo de alabanza. Hace un mes te dijeron que tienes una enfermedad seria, y el tratamiento será largo.",
            escenas: [
              {
                id: "e1",
                narra: "Después de una cita en el hospital, te sientas a solas a orar.",
                pregunta: "¿Cómo oras?",
                opciones: [
                  { texto: "Con sinceridad: le cuentas tu dolor, como hacen los salmos.", valor: 2, explica: "Adorar en la prueba no es fingir alegría: los salmos también lloran.", siguiente: "e2" },
                  { texto: "Le cuentas tu dolor, pero ya no le das gracias a Dios por nada de lo que hizo.", valor: 1, explica: "Contarle tu dolor está bien; adorar en la prueba también es recordar lo que Dios ya hizo y lo que prometió.", siguiente: "e2" },
                  { texto: "Con palabras alegres, escondiéndole a Dios lo que sientes.", valor: 0, explica: "Adorar en el dolor no es fingir que no duele.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Al leer los salmos, ves que muchos de ellos lloran delante de Dios.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le hablas a Dios con la verdad de lo que sientes.", valor: 2, explica: "Los salmos también lloran: adorar en el dolor no es fingir que no duele.", siguiente: "e2" },
                  { texto: "Sigues fingiendo, porque crees que Dios no quiere oír tu tristeza.", valor: 0, explica: "El gozo cristiano no niega el dolor: confía en el Señor dentro de él.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En tu cuaderno escribes lo que vas a recordar esta semana.",
                pregunta: "¿Qué escribes?",
                opciones: [
                  { texto: "Lo que Dios ya hizo por ti y lo que te prometió.", valor: 2, explica: "Adorar en la prueba es recordar lo que Dios ya hizo y lo que prometió." },
                  { texto: "Solo la lista de todo lo que te falta y te duele.", valor: 0, explica: "Mirar solo lo que falta no es adorar: adorar es recordar lo que Dios ya hizo y lo que prometió." },
                  { texto: "Lo que te duele, y una oración para pedirle fuerzas a Dios.", valor: 1, explica: "Orar con tu dolor está bien; también ayuda recordar lo que Dios ya hizo y lo que prometió." },
                ],
              },
              {
                id: "e3",
                narra: "Una enfermera que te atiende te pregunta por qué tienes paz.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que confías en el Señor, también dentro del dolor.", valor: 2, explica: "Es dejar que otros vean nuestra fe en la noche, como los presos de Filipos." },
                  { texto: "Que no te duele nada, para que piense que eres fuerte.", valor: 0, explica: "Adorar en la prueba no es fingir: el gozo cristiano no niega el dolor." },
                  { texto: "Nada: la fe es algo que no se comparte con nadie.", valor: 0, explica: "La adoración de Pablo y Silas en la noche fue también un testimonio para otros." },
                ],
              },
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
            caso: "Tu hermana te dice: En la plataforma cantas muy lindo, pero en la casa siempre pierdes la paciencia y contestas de mal modo.",
            pregunta: "¿Qué te enseña la lección sobre lo que te dijo?",
            opciones: [
              { texto: "Que el fruto en la casa dice más que la mejor canción.", bien: true, explica: "La vida del adorador se ve en su fruto: ese fruto en la casa, en el trabajo y en el equipo dice más que la mejor canción." },
              { texto: "Que lo que de verdad le importa a Dios es cómo canto los domingos en el culto.", explica: "La vida del adorador se ve en su fruto, toda la semana, y no solo en cómo canta." },
              { texto: "Que en la casa no tiene que ser igual, porque ahí nadie lo ve.", explica: "El fruto del Espíritu se ve en la casa, en el trabajo y en el equipo." },
              { texto: "Que ella también tiene sus fallas, y que primero cambie ella.", explica: "La lección pide mirar mi propio fruto: amor, paz, paciencia, mansedumbre." },
            ],
            apoyo: "Ese fruto en la casa, en el trabajo y en el equipo dice más que la mejor canción",
            ref: "Gálatas 5:22-23",
            explica: "La vida del adorador se ve en su fruto: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza. Ese fruto en la casa dice más que la mejor canción.",
          },
          {
            caso: "Un compañero de trabajo te dice: Te oí cantar en la iglesia, pero en la oficina eres el primero en criticar a todos.",
            pregunta: "¿Qué te enseña la lección sobre lo que te dijo?",
            opciones: [
              { texto: "Que el fruto del Espíritu muestra en la semana lo que canto el domingo.", bien: true, explica: "El fruto del Espíritu muestra durante la semana lo que cantamos el domingo." },
              { texto: "Que el trabajo y la iglesia son mundos distintos, y que no tienen nada que ver.", explica: "Ese fruto se ve en la casa, en el trabajo y en el equipo." },
              { texto: "Que lo importante es cantar bien; la oficina es otro asunto.", explica: "El fruto en el trabajo dice más que la mejor canción." },
              { texto: "Que él no tiene derecho a juzgarme, así que su opinión no cuenta.", explica: "La lección enseña a mirar el propio fruto: la vida del adorador se ve en su fruto." },
            ],
            apoyo: "el fruto del Espíritu muestra durante la semana lo que cantamos el domingo",
            ref: "Gálatas 5:22-23",
            explica: "Ese fruto en la casa, en el trabajo y en el equipo dice más que la mejor canción: el fruto del Espíritu muestra durante la semana lo que cantamos el domingo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La vida del adorador se ve en su fruto",
            ref: "Gálatas 5:22-23",
            clave: {
              id: "pr-alabanza-2-6-a7-1",
              tipo: "corta",
              pregunta: "¿Dónde se ve la vida del adorador durante la semana, y por qué importa? Menciona algunas partes del fruto del Espíritu.",
              ideas: [
                { id: "fruto", peso: 40, texto: "Se ve en su fruto: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.", formas: ["amor", "gozo", "paz", "paciencia", "benignidad", "bondad", "mansedumbre", "templanza"] },
                { id: "lugares", peso: 30, texto: "En la casa, en el trabajo y en el equipo.", formas: ["casa", "hogar", "trabajo", "oficina", "escuela", "familia", "(el|mi|su|tu|del) equipo"] },
                { id: "dice", peso: 30, texto: "Ese fruto dice más que la mejor canción: muestra en la semana lo que cantamos el domingo.", formas: ["(dice|vale|habla|pesa|importa|cuenta|es) mas que la mejor cancion", "(dice|vale|habla|pesa|importa|cuenta|es) mas que una cancion", "(dice|vale|habla|pesa|importa|cuenta|es) mas que cualquier cancion", "(muestra|muestre|mostrar|demuestra|refleja|confirma) lo que (cantamos|canto|canta|cantan|cantas|cante)"] },
              ],
              modelo: "La vida del adorador se ve en su fruto: amor, gozo, paz, paciencia y mansedumbre. Ese fruto se ve en la casa, en el trabajo y en el equipo, y dice más que la mejor canción del domingo.",
            },
          },
          {
            apoyo: "Ese fruto en la casa, en el trabajo y en el equipo dice más que la mejor canción",
            ref: "Gálatas 5:22-23",
            clave: {
              id: "pr-alabanza-2-6-a7-2",
              tipo: "corta",
              pregunta: "Evalúa tu vida: ¿en qué lugar de tu semana necesitas que se vea más el fruto del Espíritu, qué parte de ese fruto y por qué importa?",
              ideas: [
                { id: "lugar", peso: 35, texto: "Un lugar concreto de la semana: la casa, el trabajo o el equipo.", formas: ["casa", "hogar", "trabajo", "oficina", "escuela", "familia", "(el|mi|su|tu|del) equipo", "ensayo*", "(mis|los) (hijos|padres|companeros|hermanos)", "(mi|la) (esposa|esposo|mama|papa|madre|padre)", "redes"] },
                { id: "fruto", peso: 35, texto: "Una parte del fruto: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre o templanza.", formas: ["amor", "gozo", "paz", "paciencia", "benignidad", "bondad", "mansedumbre", "templanza"] },
                { id: "canto", peso: 30, texto: "Porque ese fruto dice más que la mejor canción: muestra en la semana lo que canto el domingo.", formas: ["(dice|vale|habla|pesa|importa|cuenta|es) mas que la mejor cancion", "(dice|vale|habla|pesa|importa|cuenta|es) mas que una cancion", "(dice|vale|habla|pesa|importa|cuenta|es) mas que cualquier cancion", "(muestra|muestre|mostrar|demuestra|refleja|confirma) lo que (cantamos|canto|canta|cantan|cantas|cante)"] },
              ],
              modelo: "Necesito que se vea más en mi casa, sobre todo la paciencia y la mansedumbre con mi familia. Ese fruto dice más que la mejor canción, y muestra durante la semana lo que canto el domingo.",
            },
          },
        ],
      },
    ],
  },
};
