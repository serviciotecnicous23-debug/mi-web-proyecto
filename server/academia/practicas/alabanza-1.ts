/**
 * Las prácticas de la materia `alabanza-1` (especialidad «Alabanza y adoración»). Hechas solo con lo que dice cada
 * lección (server/academia/contenido/alabanza-1.ts), con la guía de docs/academia-practicas.md.
 *
 * Los dones del Espíritu en el culto, como el hablar en lenguas, son un punto de la declaración de fe por confirmar (la
 * nota de la lección 5): ninguna actividad lo pregunta ni lo usa como apoyo, y de 1 Corintios 14:15 solo se pregunta lo
 * que la lección afirma (el equilibrio: la adoración une la mente y el corazón). Sobre los estilos de música solo se
 * pregunta lo que dicen las lecciones (la adoración no es un estilo; el estilo preferido puede ocupar el lugar de Dios),
 * nunca qué estilo es bíblico. No se repiten las actividades de «La adoración y el día del Señor» (n2-disciplinas-4).
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_ALABANZA_1: PracticasMateria = {
  materia: "alabanza-1",
  mision: {
    titulo: "Un grupo de adoradores",
    intro:
      "Tu iglesia te pidió formar un grupo de alabanza nuevo, y antes de enseñarles canciones quieres enseñarles qué es adorar. Te van a preguntar qué es la adoración y en qué se distingue de la alabanza, por qué solo Dios es digno, qué enseñan el tabernáculo, David y los salmos, qué cambió con Cristo, cómo se adora en espíritu y en verdad, y cómo se adora con toda la vida. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes enseñarle a tu grupo que Dios no busca solo canciones, sino adoradores: gente que se inclina delante de él, que lo honra a él y no al aplauso, que se acerca por la sangre de Cristo, que canta la verdad con el corazón y que adora también el lunes, mientras ensaya para la adoración que no termina.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Qué es adorar
    "alabanza-1-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En hebreo y en griego, ¿de qué hablan las palabras que se traducen adorar?", reverso: "De inclinarse o postrarse delante de alguien.", apoyo: "En hebreo y en griego, las palabras que se traducen adorar hablan de inclinarse o postrarse delante de alguien" },
              { frente: "Junto al pozo de Sicar, ¿sobre qué le preguntó la samaritana a Jesús?", reverso: "Sobre el lugar donde se debe adorar.", apoyo: "una mujer samaritana le hizo a Jesús una pregunta sobre el lugar" },
              { frente: "Para Jesús, ¿qué era lo importante al adorar?", reverso: "El adorador, y no el lugar.", apoyo: "Para Jesús, lo importante no era el lugar, sino el adorador" },
              { frente: "¿Qué reconoce el que adora, con el cuerpo y con el corazón?", reverso: "Que Dios es Dios y nosotros somos sus criaturas.", apoyo: "Adorar es reconocer, con el cuerpo y con el corazón, que Dios es Dios y nosotros somos sus criaturas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué les dijo Abraham a sus siervos al subir al monte con Isaac?", reverso: "Que él y el muchacho irían hasta allí y adorarían.", apoyo: "Cuando Abraham subió al monte para entregar a Isaac, les dijo a sus siervos: «yo y el muchacho iremos hasta allí y adoraremos»" },
              { frente: "Para Abraham, ¿qué era adorar?", reverso: "Entregarle a Dios lo más amado.", apoyo: "Para Abraham, adorar era entregarle a Dios lo más amado" },
              { frente: "Si la adoración no empieza en la música, ¿dónde empieza?", reverso: "En un corazón que se rinde.", apoyo: "La adoración no empieza en la música: empieza en un corazón que se rinde" },
              { frente: "¿Con qué le respondió Jesús al tentador?", reverso: "Con la Escritura: «Al Señor tu Dios adorarás, y a él sólo servirás».", apoyo: "Jesús le respondió al tentador con la Escritura: «Al Señor tu Dios adorarás, y a él sólo servirás»" },
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
            consigna: "Completa qué es adorar, según la lección.",
            texto: "Adorar es reconocer, con el [[cuerpo]] y con el [[corazón]], que Dios es Dios y nosotros somos sus [[criaturas]].",
            distractores: ["micrófono", "aplauso", "dueños"],
            errores: {
              "micrófono": "Se adora con el cuerpo y con el corazón: la adoración no es solo música, y la música es una de sus formas.",
              aplauso: "Se adora con el corazón: la adoración no es un espectáculo, y Dios es el centro, no los músicos ni el público.",
              "dueños": "Dios es Dios y nosotros somos sus criaturas, no sus dueños.",
            },
            apoyo: "Adorar es reconocer, con el cuerpo y con el corazón, que Dios es Dios y nosotros somos sus criaturas",
            ref: "Salmos 95:6",
            explica: "Las palabras que se traducen adorar hablan de inclinarse o postrarse. Adorar es reconocer, con el cuerpo y con el corazón, que Dios es Dios y nosotros somos sus criaturas.",
          },
          {
            consigna: "Completa lo que muestra Abraham sobre la adoración.",
            texto: "Para Abraham, adorar era entregarle a Dios lo más [[amado]]. La adoración empieza en un [[corazón]] que se [[rinde]].",
            distractores: ["barato", "ensayo", "exhibe"],
            errores: {
              barato: "Para Abraham, adorar era entregarle a Dios lo más amado: subió al monte para entregar a Isaac.",
              ensayo: "La adoración no empieza en la música: empieza en un corazón que se rinde.",
              exhibe: "La adoración no es un espectáculo: empieza en un corazón que se rinde.",
            },
            apoyo: "La adoración no empieza en la música: empieza en un corazón que se rinde",
            ref: "Génesis 22:5",
            explica: "Cuando Abraham subió al monte para entregar a Isaac, adorar era entregarle a Dios lo más amado. La adoración no empieza en la música: empieza en un corazón que se rinde.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pasaje con lo que enseña la lección sobre adorar.",
            pares: [
              ["Juan 4:23-24", "Lo importante no es el lugar, sino el adorador"],
              ["Salmos 95:6", "Invita a postrarse y arrodillarse ante el Hacedor"],
              ["Génesis 22:5", "Adorar es entregarle a Dios lo más amado"],
              ["Mateo 4:10", "La adoración es solo para Dios, y va junto con servir"],
            ],
            apoyo: "La adoración es solo para Dios, y adorar y servir van juntos",
            explica: "Jesús enseñó que lo importante no es el lugar, sino el adorador (Juan 4); el salmista invita a postrarse ante el Hacedor (Salmo 95); Abraham le entregó a Dios lo más amado (Génesis 22); y la adoración es solo para Dios (Mateo 4:10).",
          },
          {
            consigna: "Une cada persona con lo que nos enseña sobre adorar.",
            pares: [
              ["Abraham", "Subió al monte para entregarle a Dios lo más amado"],
              ["La samaritana", "Preguntó en qué lugar se debe adorar"],
              ["El salmista", "Invita a inclinarse y arrodillarse ante Jehová"],
              ["Jesús ante el tentador", "Respondió que solo a Dios se adora y se sirve"],
            ],
            apoyo: "Para Jesús, lo importante no era el lugar, sino el adorador",
            explica: "Abraham subió al monte para entregar a Isaac; la samaritana preguntó por el lugar, y Jesús le enseñó que lo importante es el adorador; el salmista invita a postrarse; y Jesús respondió al tentador que solo a Dios se adora y se sirve.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es alabar o es adorar, como los distingue la lección? Lleva cada frase a su grupo.",
            grupos: ["Alabar: celebrar a Dios", "Adorar: rendirse ante él"],
            frases: [
              { texto: "Celebrar a Dios por lo que es", grupo: 0 },
              { texto: "Celebrar a Dios por lo que hace", grupo: 0 },
              { texto: "Darle gracias con gozo por sus beneficios", grupo: 0 },
              { texto: "Inclinarse delante de Dios", grupo: 1 },
              { texto: "Rendirle a Dios la vida entera", grupo: 1 },
              { texto: "Postrarse delante del Señor", grupo: 1 },
            ],
            apoyo: "Alabar es celebrar a Dios por lo que es y por lo que hace, con gratitud y con gozo",
            ref: "Salmos 103:1-2",
            explica: "Alabar es celebrar a Dios por lo que es y por lo que hace, con gratitud y con gozo; adorar es inclinarse delante de él y rendirle la vida. En la Biblia, las dos van juntas.",
          },
          {
            consigna: "En el Salmo 95 y en el culto, ¿cada momento es más de alabanza o de adoración? Lleva cada frase a su grupo.",
            grupos: ["Alabanza: celebra", "Adoración: se rinde"],
            frases: [
              { texto: "Cantar con júbilo por lo que Dios hizo", grupo: 0 },
              { texto: "Recordar con gratitud todos sus beneficios", grupo: 0 },
              { texto: "Celebrar con gozo que Dios es bueno", grupo: 0 },
              { texto: "Arrodillarse delante de Jehová, el Hacedor", grupo: 1 },
              { texto: "Reconocer ante él que somos sus criaturas", grupo: 1 },
              { texto: "Rendirle a Dios lo más amado", grupo: 1 },
            ],
            apoyo: "Adorar es inclinarse delante de él y rendirle la vida",
            ref: "Salmos 95:6",
            explica: "La alabanza celebra a Dios por lo que es y hace; la adoración se rinde delante de él. El mismo Salmo 95 empieza con cantos de júbilo y sigue con postrarse delante del Señor: las dos van juntas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la alabanza y la adoración: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En la Biblia, la alabanza y la adoración van juntas.", verdad: true, explica: "El mismo Salmo 95 empieza con cantos de júbilo y sigue con postrarse delante del Señor.", apoyo: "En la Biblia van juntas", ref: "Salmos 95:1-6" },
              { texto: "El Salmo 95 trae solo cantos de júbilo, sin postrarse ante el Señor.", verdad: false, explica: "El Salmo 95 empieza con cantos de júbilo y sigue con postrarse delante del Señor.", apoyo: "el mismo Salmo 95 empieza con cantos de júbilo y sigue con postrarse delante del Señor", ref: "Salmos 95:1-6" },
              { texto: "Alabar es celebrar a Dios con gratitud y con gozo.", verdad: true, explica: "Alabar es celebrar a Dios por lo que es y por lo que hace, con gratitud y con gozo.", apoyo: "Alabar es celebrar a Dios por lo que es y por lo que hace, con gratitud y con gozo", ref: "Salmos 103:1-2" },
            ],
          },
          {
            consigna: "Sobre alabar y adorar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "A Dios se le alaba solo por lo que hace, y no por lo que es.", verdad: false, explica: "Alabar es celebrar a Dios por lo que es y por lo que hace.", apoyo: "Alabar es celebrar a Dios por lo que es y por lo que hace", ref: "Salmos 103:1-2" },
              { texto: "Adorar es inclinarse delante de Dios y rendirle la vida.", verdad: true, explica: "Así lo dice la lección: adorar es inclinarse delante de él y rendirle la vida.", apoyo: "Adorar es inclinarse delante de él y rendirle la vida", ref: "Salmos 95:6" },
              { texto: "La alabanza y la adoración son dos cosas que no se juntan en el culto.", verdad: false, explica: "La alabanza celebra a Dios por lo que es y hace; la adoración se rinde delante de él; las dos van juntas.", apoyo: "la adoración se rinde delante de él; las dos van juntas" },
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
            apoyo: "Es una respuesta a Dios con todo el ser, el domingo y toda la semana",
            ref: "Juan 4:23-24",
            situacion: "Eres líder del grupo de alabanza de tu iglesia. Este mes quieren ayudar a la congregación a entender qué es adorar.",
            escenas: [
              {
                id: "e1",
                narra: "En el ensayo, un músico dice: Adorar es cantar las canciones lentas; las rápidas son solo para animar.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que adorar no es un estilo, sino una respuesta del corazón.", valor: 2, explica: "La adoración no es un estilo, lento o rápido: es una respuesta del corazón.", siguiente: "e2" },
                  { texto: "Que las rápidas también sirven, porque animan más a la gente.", valor: 1, explica: "Las dos pueden servir, pero no por animar: la adoración no es un estilo, es una respuesta del corazón.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que el domingo cantarán solo canciones lentas.", valor: 0, explica: "Muchos piensan que adorar es cantar las canciones lentas del domingo, pero la Biblia muestra que es mucho más.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El domingo solo hay canciones lentas, y varios hermanos creen que adorar es sentir algo en ese momento.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Les explicas que adorar es responder a Dios con toda la vida.", valor: 2, explica: "Adorar es la respuesta de toda la persona a quien Dios es, el domingo y toda la semana.", siguiente: "e2" },
                  { texto: "Bajas más las luces y alargas la canción, para que todos se emocionen.", valor: 0, explica: "La adoración no es solo un sentimiento: es reconocer la verdad de quién es Dios.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un joven del grupo te cuenta que el domingo adora, pero que de lunes a sábado su vida es otra cosa.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que la adoración es con todo el ser, el domingo y la semana.", valor: 2, explica: "La adoración es una respuesta a Dios con todo el ser, el domingo y toda la semana." },
                  { texto: "Que venga también a los ensayos de entre semana, para no enfriarse.", valor: 1, explica: "Venir más ayuda, pero no es la idea: adorar es responder a Dios con todo el ser, también fuera del templo." },
                  { texto: "Que no se preocupe: lo que cuenta es cómo canta cada domingo.", valor: 0, explica: "Adorar no es solo cantar el domingo: es una respuesta a Dios con todo el ser, el domingo y toda la semana." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del mes, escoges una frase para el boletín de la iglesia.",
                pregunta: "¿Cuál escoges?",
                opciones: [
                  { texto: "Dios no busca solo canciones: busca adoradores.", valor: 2, explica: "Es lo que enseña la lección: Dios no busca solo canciones, busca adoradores." },
                  { texto: "Adorar es cantar con todo el corazón cada domingo.", valor: 1, explica: "Cantar con el corazón es bueno, pero la adoración es con todo el ser, el domingo y toda la semana." },
                  { texto: "Dios busca a los mejores músicos para su iglesia.", valor: 0, explica: "El Padre busca adoradores que le adoren en espíritu y en verdad, no solo buenos músicos." },
                ],
              },
            ],
          },
          {
            apoyo: "No es solo un sentimiento: es reconocer la verdad de quién es Dios",
            ref: "Mateo 4:10",
            situacion: "Diriges la alabanza en el culto de jóvenes de los viernes.",
            escenas: [
              {
                id: "e1",
                narra: "Antes del culto, una joven te dice: Hoy no siento nada; mejor no canto, porque adorar es un sentimiento.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que adorar no es solo sentir: es reconocer quién es Dios.", valor: 2, explica: "La adoración no es solo un sentimiento: es reconocer la verdad de quién es Dios.", siguiente: "e2" },
                  { texto: "Que cante igual, porque el grupo necesita su voz esta noche.", valor: 1, explica: "Cantar está bien, pero no por el grupo: adorar es reconocer la verdad de quién es Dios.", siguiente: "e2" },
                  { texto: "Que tiene razón: si hoy no siente nada, hoy no puede adorar.", valor: 0, explica: "La adoración no es solo un sentimiento: es reconocer la verdad de quién es Dios.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "La joven se queda sentada, y otros jóvenes empiezan a pensar lo mismo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les recuerdas que adorar es reconocer quién es Dios.", valor: 2, explica: "Adorar es reconocer, con el cuerpo y con el corazón, que Dios es Dios y nosotros somos sus criaturas.", siguiente: "e2" },
                  { texto: "Subes el volumen, para que vuelvan a sentir algo y se pongan de pie.", valor: 0, explica: "La adoración no es solo un sentimiento ni un espectáculo: Dios es el centro.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En medio del culto, el sonidista te pide más luces y humo, para que el público disfrute el espectáculo.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Que no es un espectáculo: Dios es el centro, no el público.", valor: 2, explica: "La adoración no es un espectáculo: Dios es el centro, no los músicos ni el público." },
                  { texto: "Que solo un poco, para que nadie se distraiga con nada más.", valor: 1, explica: "Cuidar que nadie se distraiga es bueno, pero la pregunta es otra: el culto no es un espectáculo, Dios es el centro." },
                  { texto: "Que sí: si el público disfruta mucho, el culto salió muy bien.", valor: 0, explica: "Dios es el centro, no los músicos ni el público." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, un joven te pregunta qué tiene que hacer el lunes para seguir adorando.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que responda a Dios con todo su ser, también en la semana.", valor: 2, explica: "La adoración es una respuesta a Dios con todo el ser, el domingo y toda la semana." },
                  { texto: "Que oiga música cristiana toda la semana, para no perder el ánimo.", valor: 1, explica: "La música es una de las formas de la adoración, pero no la única: adorar es responder con todo el ser." },
                  { texto: "Que espere al próximo viernes, porque solo se adora en el culto.", valor: 0, explica: "La adoración es con todo el ser, el domingo y toda la semana." },
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
            apoyo: "Adorar es inclinarse delante de Dios: reconocer que él es Dios y rendirle la vida",
            ref: "Salmos 95:6",
            clave: {
              id: "pr-alabanza-1-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es adorar según la Biblia? Explícalo con lo que significan las palabras que se traducen adorar.",
              ideas: [
                { id: "inclinarse", peso: 50, texto: "Las palabras que se traducen adorar hablan de inclinarse o postrarse delante de alguien.", formas: ["inclin*", "postr*", "arrodill*"] },
                { id: "reconocer", peso: 50, texto: "Adorar es reconocer que Dios es Dios y rendirle la vida.", formas: ["dios es dios", "el es dios", "sus criaturas", "somos criaturas", "rend* la vida", "rend* toda la vida", "rend* nuestra vida", "rend* mi vida", "rend* su vida", "entreg* la vida", "entreg* nuestra vida"] },
              ],
              modelo: "Adorar es inclinarse o postrarse delante de Dios, como dicen las palabras en hebreo y en griego. Es reconocer, con el cuerpo y con el corazón, que Dios es Dios y nosotros sus criaturas, y rendirle la vida.",
            },
          },
          {
            apoyo: "Muchos piensan que adorar es cantar las canciones lentas del domingo. La Biblia muestra que es mucho más: es la respuesta de toda la persona a quien Dios es",
            ref: "Juan 4:23-24",
            clave: {
              id: "pr-alabanza-1-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que adorar es cantar las canciones lentas del domingo. ¿Qué le explicas, según la lección?",
              ideas: [
                { id: "respuesta", peso: 50, texto: "Adorar es la respuesta de toda la persona a quien Dios es, con todo el ser y toda la semana.", formas: ["toda la persona", "todo (el|su|mi|nuestro) ser", "toda (la|su|mi|nuestra) vida", "toda la semana", "respuesta del corazon", "respuesta a (dios|quien)", "respond* a (dios|quien)", "rend* la vida"] },
                { id: "estilo", peso: 50, negativa: true, texto: "No es un estilo, lento o rápido, ni es solo música: la música es una de sus formas.", formas: ["no es (un|solo|el) estilo", "no es solo (musica|cantar)", "no es solo de (musica|canciones)", "ni (lento|lenta|lentas|rapido|rapida|rapidas)", "lento o rapido", "lenta o rapida", "una de sus formas", "mucho mas que"] },
              ],
              modelo: "Le explico que adorar no es un estilo, lento o rápido, y no es solo música: la música es una de sus formas. Adorar es la respuesta de toda la persona a quien Dios es, el domingo y toda la semana.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Dios en el centro
    "alabanza-1-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En el cielo, ¿qué dicen los que rodean el trono?", reverso: "Que el Señor es digno de recibir la gloria, la honra y el poder.", apoyo: "En el cielo, los que rodean el trono dicen: «Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas»" },
              { frente: "¿Por qué es Dios digno de la adoración?", reverso: "Por quién es: el Creador de todo.", apoyo: "Dios es digno de la adoración por quién es: el Creador de todo" },
              { frente: "¿Con quién empieza la adoración bíblica?", reverso: "Con Dios, y no con nosotros ni con la música.", apoyo: "La adoración bíblica no empieza con nosotros, ni con lo que sentimos, ni con la música: empieza con Dios" },
              { frente: "¿Cómo termina Pablo su enseñanza sobre la salvación?", reverso: "Con adoración: «A él sea la gloria por los siglos».", apoyo: "Pablo termina su enseñanza sobre la salvación con adoración" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde vio Isaías al Señor sentado?", reverso: "Sobre un trono alto y sublime.", apoyo: "Isaías vio al Señor «sentado sobre un trono alto y sublime»" },
              { frente: "¿Qué es un ídolo, según la lección?", reverso: "Cualquier cosa que ocupa el lugar de Dios en el corazón.", apoyo: "Un ídolo es cualquier cosa que ocupa el lugar de Dios en el corazón" },
              { frente: "¿Qué hizo el ángel cuando Juan se postró ante él?", reverso: "Lo detuvo y le dijo que adorara a Dios.", apoyo: "Cuando Juan se postró ante un ángel, el ángel lo detuvo" },
              { frente: "¿Qué prohíbe el segundo mandamiento?", reverso: "Hacerse imágenes para inclinarse ante ellas.", apoyo: "el segundo prohíbe hacerse imágenes para inclinarse ante ellas" },
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
            consigna: "Une cada cosa que adoramos de Dios con lo que significa, según la lección.",
            pares: [
              ["Es santo", "Distinto de todo y sin mancha"],
              ["Es el Creador", "Todo existe por su voluntad"],
              ["Es bueno y misericordioso", "Su amor no se acaba"],
              ["Es fiel", "Cumple lo que promete"],
              ["Es el Salvador", "Envió a su Hijo por nosotros"],
            ],
            apoyo: "Es santo: distinto de todo y sin mancha",
            ref: "Apocalipsis 4:11",
            explica: "Adoramos a Dios porque es santo, distinto de todo y sin mancha; Creador, y todo existe por su voluntad; bueno y misericordioso, y su amor no se acaba; fiel, y cumple lo que promete; y Salvador, porque envió a su Hijo por nosotros.",
          },
          {
            consigna: "Preparas los cantos del domingo. Une cada línea de un canto con lo que adora de Dios.",
            pares: [
              ["Tú cumples cada una de tus promesas", "Es fiel"],
              ["Todo lo que existe lo hiciste tú", "Es el Creador"],
              ["Enviaste a tu Hijo para salvarnos", "Es el Salvador"],
              ["Tu amor por nosotros nunca se acaba", "Es bueno y misericordioso"],
              ["No hay mancha en ti, eres distinto de todo", "Es santo"],
            ],
            apoyo: "Dios es el centro de la adoración: es digno porque es el Creador, santo, bueno, fiel y Salvador",
            ref: "Romanos 11:36",
            explica: "Cada línea adora algo de quién es Dios: fiel, porque cumple lo que promete; Creador, porque todo existe por su voluntad; Salvador, porque envió a su Hijo; bueno y misericordioso, porque su amor no se acaba; y santo, distinto de todo y sin mancha.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Isaías oyó a los serafines. ¿De qué dicen que está llena toda la tierra? Toca las palabras que lo dicen.",
            texto: "Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de [[su gloria]]",
            apoyo: "oyó a los serafines que decían: «Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria»",
            ref: "Isaías 6:3",
            explica: "Los serafines decían: «Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria». Isaías adoró al ver la santidad de Dios.",
          },
          {
            consigna: "¿Cómo era el trono sobre el que Isaías vio sentado al Señor? Toca las palabras que lo dicen.",
            texto: "sentado sobre un trono [[alto]] y [[sublime]]",
            apoyo: "Isaías vio al Señor «sentado sobre un trono alto y sublime»",
            ref: "Isaías 6:1",
            explica: "Isaías vio al Señor «sentado sobre un trono alto y sublime»: cuanto más clara es nuestra visión de Dios, más verdadera es nuestra adoración.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña la visión de Isaías sobre la adoración.",
            texto: "Cuanto más [[clara]] es nuestra visión de Dios, más [[verdadera]] es nuestra adoración.",
            distractores: ["oscura", "aburrida"],
            errores: {
              oscura: "Cuanto más clara es nuestra visión de Dios, más verdadera es nuestra adoración.",
              aburrida: "Ver a Dios con claridad hace más verdadera la adoración, como le pasó a Isaías.",
            },
            apoyo: "Cuanto más clara es nuestra visión de Dios, más verdadera es nuestra adoración",
            ref: "Isaías 6:1-3",
            explica: "Isaías vio al Señor en su trono y oyó a los serafines proclamar su santidad, y adoró. Cuanto más clara es nuestra visión de Dios, más verdadera es nuestra adoración.",
          },
          {
            consigna: "Completa lo que vio y oyó Isaías.",
            texto: "Isaías adoró al ver la [[santidad]] de Dios, y oyó a los [[serafines]] decir que toda la tierra está llena de su [[gloria]].",
            distractores: ["riqueza", "músicos", "ruido"],
            errores: {
              riqueza: "Isaías adoró al ver la santidad de Dios.",
              "músicos": "Isaías oyó a los serafines, que decían: Santo, santo, santo.",
              ruido: "Los serafines decían que toda la tierra está llena de su gloria.",
            },
            apoyo: "Isaías adoró al ver la santidad de Dios",
            ref: "Isaías 6:3",
            explica: "Isaías vio al Señor sentado sobre un trono alto y sublime, y oyó a los serafines que decían: «Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Mide el culto por si Dios fue honrado, o por otra cosa? Lleva cada frase a su grupo.",
            grupos: ["Lo mide por si Dios fue honrado", "Lo mide por otra cosa"],
            frases: [
              { texto: "¿Fue Dios el centro del culto de hoy?", grupo: 0 },
              { texto: "¿Honramos a Dios con lo que cantamos?", grupo: 0 },
              { texto: "¿Reconocimos que solo él es digno?", grupo: 0 },
              { texto: "¿Me gustó el estilo de las canciones?", grupo: 1 },
              { texto: "¿Cuánto aplaudió la gente al cantante?", grupo: 1 },
              { texto: "¿Sentimos una emoción muy fuerte?", grupo: 1 },
              { texto: "¿Salió todo perfecto con el sonido?", grupo: 1 },
            ],
            apoyo: "Una señal es cuando el culto se mide por lo que sentimos o por lo bien que salió, y no por si Dios fue honrado",
            ref: "Éxodo 20:3-5",
            explica: "La pregunta del culto no es si me gustó, sino si Dios fue honrado. Cuando el culto se mide por lo que sentimos o por lo bien que salió, la música, la emoción o el aplauso ocupan el lugar de Dios.",
          },
          {
            consigna: "¿Es algo que puede volverse un ídolo en la alabanza, o es lo que adoramos de Dios? Lleva cada frase a su grupo.",
            grupos: ["Puede volverse un ídolo", "Lo que adoramos de Dios"],
            frases: [
              { texto: "La música del culto", grupo: 0 },
              { texto: "La emoción del momento", grupo: 0 },
              { texto: "El talento del cantante", grupo: 0 },
              { texto: "El aplauso de la gente", grupo: 0 },
              { texto: "El estilo preferido", grupo: 0 },
              { texto: "Que es santo y sin mancha", grupo: 1 },
              { texto: "Que es fiel y cumple lo que promete", grupo: 1 },
              { texto: "Que envió a su Hijo por nosotros", grupo: 1 },
            ],
            apoyo: "La música, la emoción del momento, el talento del cantante, el aplauso o el estilo preferido pueden ocupar el lugar de Dios sin que nos demos cuenta",
            ref: "Éxodo 20:3",
            explica: "La música, la emoción, el talento, el aplauso o el estilo preferido pueden ocupar el lugar de Dios sin que nos demos cuenta. Lo que adoramos es a Dios mismo: santo, fiel y Salvador.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La pregunta del culto no es si me gustó, sino si Dios fue honrado",
            ref: "Apocalipsis 22:9",
            titulo: "El concierto de aniversario",
            relato: [
              "Tu iglesia cumple diez años, y tu grupo de alabanza prepara el culto especial. Invitaron a un cantante muy conocido.",
              "Al terminar, muchos le aplauden de pie al cantante, y alguien dice: ¡Qué noche! Ese hombre es lo máximo.",
              "Al día siguiente, el grupo se reúne contigo para evaluar el culto.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Con qué pregunta empiezas la evaluación?",
                opciones: [
                  { texto: "¿Fue Dios honrado en el culto de anoche?", bien: true, explica: "La pregunta del culto no es si me gustó, sino si Dios fue honrado." },
                  { texto: "¿Les gustó a todos el repertorio que escogimos?", explica: "Una señal de idolatría es cuando el culto se mide por lo que sentimos o por lo bien que salió." },
                  { texto: "¿Cuántas personas se pusieron de pie a aplaudir?", explica: "El aplauso puede ocupar el lugar de Dios sin que nos demos cuenta." },
                ],
                apoyo: "La pregunta del culto no es si me gustó, sino si Dios fue honrado",
                explica: "El culto no se mide por lo que sentimos o por lo bien que salió, sino por si Dios fue honrado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué piensas de los aplausos de pie al cantante?",
                opciones: [
                  { texto: "Que el aplauso puede ocupar el lugar de Dios sin notarlo.", bien: true, explica: "El aplauso o el talento del cantante pueden ocupar el lugar de Dios sin que nos demos cuenta." },
                  { texto: "Que se los ganó, porque cantó mejor que nadie en la iglesia.", explica: "Cantar bien no lo hace digno de la honra que es de Dios." },
                  { texto: "Que no importa a quién se aplauda, si la música fue buena.", explica: "La música buena también puede ocupar el lugar de Dios: la adoración es solo para él." },
                ],
                apoyo: "La música, la emoción del momento, el talento del cantante, el aplauso o el estilo preferido pueden ocupar el lugar de Dios sin que nos demos cuenta",
                explica: "Un ídolo es cualquier cosa que ocupa el lugar de Dios en el corazón, aun algo bueno como el talento o la música.",
              },
              {
                tipo: "situacion",
                pregunta: "Un músico del grupo dice: Ese cantante merece que lo honremos como a nadie. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que ni ángeles ni personas reciben la adoración de Dios.", bien: true, explica: "Ni los ángeles ni las personas reciben la adoración que es de Dios." },
                  { texto: "Que tiene razón, porque su talento viene directamente de Dios.", explica: "Aun con su talento, una persona no recibe la adoración que es de Dios." },
                  { texto: "Que lo honraremos menos, para que no se le suba a la cabeza.", explica: "No es cuestión de medir la honra: la adoración es solo para Dios." },
                ],
                apoyo: "Ni los ángeles ni las personas reciben la adoración que es de Dios",
                explica: "Cuando Juan se postró ante un ángel, el ángel lo detuvo y le dijo: «Adora a Dios».",
              },
              {
                tipo: "explica",
                apoyo: "Una señal es cuando el culto se mide por lo que sentimos o por lo bien que salió, y no por si Dios fue honrado",
                clave: {
                  id: "pr-alabanza-1-2-a6-1",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías al grupo sobre la manera de medir el culto de aniversario?",
                  ideas: [
                    { id: "honrado", peso: 50, texto: "Que el culto se mide por si Dios fue honrado, no por si nos gustó o salió bien.", formas: ["dios fue honrado", "dios (sea|fuera|fue) honrado", "honr* a dios", "honramos a dios", "dios (es|fue|sea) el centro", "gloria (a|de) dios"] },
                    { id: "idolo", peso: 50, texto: "Que el aplauso, el talento o la emoción pueden ocupar el lugar de Dios.", formas: ["ocup* el lugar de dios", "ocup* su lugar", "lugar de dios", "idolo*", "idolatr*"] },
                  ],
                  modelo: "Les diría que el culto no se mide por lo bien que salió ni por los aplausos, sino por si Dios fue honrado. El aplauso y el talento del cantante pueden ocupar el lugar de Dios sin que nos demos cuenta.",
                },
              },
            ],
          },
          {
            apoyo: "La adoración bíblica no empieza con nosotros, ni con lo que sentimos, ni con la música: empieza con Dios",
            ref: "Éxodo 20:3",
            titulo: "La discusión del coro",
            relato: [
              "En el coro de tu iglesia hay dos grupos. Unos quieren cantar solo himnos antiguos, y los otros, solo canciones nuevas.",
              "Cada domingo, el grupo que no cantó su estilo dice que el culto salió mal y que así no se puede adorar.",
              "El pastor te pide ayudarlos a ver el problema.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué señal de idolatría ves en la discusión?",
                opciones: [
                  { texto: "Que miden el culto por su estilo preferido, y no por Dios.", bien: true, explica: "El estilo preferido puede ocupar el lugar de Dios: el culto se mide por si Dios fue honrado." },
                  { texto: "Que uno de los dos grupos tiene el estilo correcto y el otro no.", explica: "La lección no pregunta por el estilo correcto: advierte que el estilo preferido puede ocupar el lugar de Dios." },
                  { texto: "Que el problema es solo de sonido y de volumen en el templo.", explica: "La señal es otra: el culto se mide por lo que sentimos o por lo bien que salió, y no por si Dios fue honrado." },
                ],
                apoyo: "La música, la emoción del momento, el talento del cantante, el aplauso o el estilo preferido pueden ocupar el lugar de Dios sin que nos demos cuenta",
                explica: "Cuando el culto se mide por el estilo que nos gusta, el estilo ocupa el lugar de Dios sin que nos demos cuenta.",
              },
              {
                tipo: "situacion",
                pregunta: "Un corista te dice: Si no cantamos mi estilo, yo no puedo adorar. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que la adoración empieza con Dios, no con su estilo.", bien: true, explica: "La adoración bíblica no empieza con nosotros, ni con lo que sentimos, ni con la música: empieza con Dios." },
                  { texto: "Que tiene razón, y que cantarán solo su estilo cada domingo.", explica: "Así el estilo preferido ocuparía el lugar de Dios." },
                  { texto: "Que se cambie de iglesia, donde canten lo que a él le gusta.", explica: "El problema no es la iglesia: la adoración empieza con Dios, no con lo que nos gusta." },
                ],
                apoyo: "La adoración bíblica no empieza con nosotros, ni con lo que sentimos, ni con la música: empieza con Dios",
                explica: "Dios es el centro de la adoración: la adoración no empieza con nosotros ni con la música.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pregunta les propones a los dos grupos para el próximo culto?",
                opciones: [
                  { texto: "¿Cómo honramos juntos a Dios este domingo?", bien: true, explica: "La pregunta del culto no es si me gustó, sino si Dios fue honrado." },
                  { texto: "¿Qué estilo de los dos ganó más votos esta vez?", explica: "Votar por el estilo sigue midiendo el culto por lo que nos gusta." },
                  { texto: "¿Qué grupo cantó mejor y recibió más aplausos?", explica: "El aplauso y el talento pueden ocupar el lugar de Dios." },
                ],
                apoyo: "La pregunta del culto no es si me gustó, sino si Dios fue honrado",
                explica: "El culto se mide por si Dios fue honrado, no por el estilo que ganó ni por los aplausos.",
              },
              {
                tipo: "explica",
                apoyo: "cualquier cosa que ocupe su lugar, aun la música o la emoción, se vuelve un ídolo",
                clave: {
                  id: "pr-alabanza-1-2-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué les explicarías a los dos grupos sobre el estilo preferido y la adoración?",
                  ideas: [
                    { id: "idolo", peso: 50, texto: "Que el estilo preferido puede ocupar el lugar de Dios sin que nos demos cuenta.", formas: ["ocup* el lugar de dios", "ocup* su lugar", "lugar de dios", "idolo*", "idolatr*"] },
                    { id: "centro", peso: 50, texto: "Que la adoración empieza con Dios: la pregunta es si Dios fue honrado.", formas: ["empieza con dios", "comienza con dios", "dios (es|sea) el centro", "el centro es dios", "dios fue honrado", "dios (sea|fuera) honrado", "honr* a dios", "honramos a dios"] },
                  ],
                  modelo: "Les explicaría que el estilo preferido puede ocupar el lugar de Dios sin que nos demos cuenta. La adoración empieza con Dios, y la pregunta del culto no es si me gustó, sino si Dios fue honrado.",
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
            apoyo: "Dios es el centro de la adoración: es digno porque es el Creador, santo, bueno, fiel y Salvador",
            ref: "Apocalipsis 4:11",
            clave: {
              id: "pr-alabanza-1-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué Dios es el único digno de la adoración?",
              ideas: [
                { id: "creador", peso: 40, texto: "Es digno por quién es: el Creador de todo.", formas: ["creador", "creo todas las cosas", "creo todo", "creaste todas", "todo existe por su voluntad", "por quien es"] },
                { id: "atributos", peso: 30, texto: "Es santo, bueno, fiel y Salvador.", formas: ["santo", "bueno", "misericordi*", "fiel", "salvador", "envio a su hijo", "sin mancha"] },
                { id: "solo", peso: 30, negativa: true, texto: "La adoración es solo para él: ni los ángeles ni las personas la reciben.", formas: ["solo (a|para) (dios|el)", "ni los angeles", "ni (las|a las) personas", "nadie mas", "ninguna (persona|criatura)"] },
              ],
              modelo: "Dios es digno de la adoración por quién es: el Creador de todo. Además es santo, bueno, fiel y Salvador. Por eso la adoración es solo para él: ni los ángeles ni las personas la reciben.",
            },
          },
          {
            apoyo: "Ni los ángeles ni las personas reciben la adoración que es de Dios",
            ref: "Apocalipsis 22:9",
            clave: {
              id: "pr-alabanza-1-2-a7-2",
              tipo: "corta",
              pregunta: "Un joven del grupo pregunta por qué le cantamos solo a Dios y no a los grandes siervos de la Biblia. ¿Qué le explicas?",
              ideas: [
                { id: "solo", peso: 50, negativa: true, texto: "La adoración es solo para Dios: ni los ángeles ni las personas la reciben.", formas: ["solo (a|para) (dios|el)", "ni los angeles", "ni (las|a las) personas", "no (reciben|recibe) (la|nuestra) adoracion", "adora a dios", "nadie mas"] },
                { id: "digno", peso: 50, texto: "Porque solo Dios es digno: es el Creador de todo, santo, fiel y Salvador.", formas: ["digno", "creador", "creo todas", "creo todo", "santo", "fiel", "salvador"] },
              ],
              modelo: "Le explico que la adoración es solo para Dios. Cuando Juan se postró ante un ángel, el ángel le dijo que adorara a Dios: ni los ángeles ni las personas la reciben. Solo Dios es digno, porque es el Creador de todo, santo y Salvador.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La adoración en el Antiguo Testamento
    "alabanza-1-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En el desierto, ¿qué le dijo Dios a Moisés sobre el santuario?", reverso: "Que harían un santuario para él, y él habitaría en medio de ellos.", apoyo: "En el desierto, Dios le dijo a Moisés: «Y harán un santuario para mí, y habitaré en medio de ellos»" },
              { frente: "¿Qué enseñaba el tabernáculo sobre lo que Dios quiere?", reverso: "Que Dios quiere vivir con su pueblo.", apoyo: "El tabernáculo enseñaba que Dios quiere vivir con su pueblo" },
              { frente: "¿Por qué había en el tabernáculo altar, sacrificios y sacerdotes?", reverso: "Porque solo se acerca a Dios quien es purificado.", apoyo: "solo se acerca a él quien es purificado: por eso estaban el altar, los sacrificios y los sacerdotes" },
              { frente: "En la dedicación del templo, ¿de qué se llenó la casa?", reverso: "De una nube: la gloria de Jehová había llenado la casa de Dios.", apoyo: "Entonces la casa se llenó de una nube" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A quiénes apartó David para cantar y tocar en el culto?", reverso: "A levitas, con turnos y con maestros.", apoyo: "David apartó a levitas para cantar y tocar instrumentos en el culto, con turnos y con maestros" },
              { frente: "En la dedicación del templo de Salomón, ¿cómo cantaban los músicos?", reverso: "Todos a una, para alabar y dar gracias a Jehová.", apoyo: "los músicos «cantaban todos a una, para alabar y dar gracias a Jehová»" },
              { frente: "¿Qué son los salmos?", reverso: "Oraciones y cantos para el culto y para la vida.", apoyo: "Los salmos son oraciones y cantos para el culto y para la vida" },
              { frente: "¿Qué razón da el Salmo 100 para entrar con alabanza?", reverso: "Que Jehová es bueno y para siempre es su misericordia.", apoyo: "y da la razón: «Porque Jehová es bueno; para siempre es su misericordia»" },
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
            consigna: "Une cada cosa de la adoración de Israel con lo que enseñaba, según la lección.",
            pares: [
              ["El santuario en el desierto", "Dios quiere habitar en medio de su pueblo"],
              ["El altar, los sacrificios y los sacerdotes", "Solo se acerca a Dios quien es purificado"],
              ["Los levitas apartados por David", "La adoración se prepara con orden"],
              ["La nube en la dedicación del templo", "La gloria de Jehová llenó la casa de Dios"],
            ],
            apoyo: "El tabernáculo enseñaba que Dios quiere vivir con su pueblo, y también que solo se acerca a él quien es purificado",
            ref: "Éxodo 25:8",
            explica: "El santuario enseñaba que Dios quiere vivir con su pueblo; el altar, los sacrificios y los sacerdotes, que solo se acerca a él quien es purificado. David apartó músicos con orden, y en la dedicación del templo la gloria de Jehová llenó la casa.",
          },
          {
            consigna: "Une cada hecho con lo que muestra sobre cómo adorar a Dios.",
            pares: [
              ["Dios pide un santuario para habitar con ellos", "Dios toma la iniciativa"],
              ["Hay altar, sacrificios y sacerdotes", "A Dios se lo adora con santidad"],
              ["David aparta músicos con turnos y maestros", "La adoración se prepara con orden"],
              ["Todo el pueblo canta cuando llega el arca", "Se adora con todo el pueblo junto"],
            ],
            apoyo: "Dios toma la iniciativa: él quiere habitar con su pueblo",
            ref: "Éxodo 25:8",
            explica: "Dios toma la iniciativa: él quiere habitar con su pueblo. A Dios se lo adora con santidad, y no de cualquier manera; la adoración se prepara con orden, y se adora con gozo, con gratitud y con música, todo el pueblo junto.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo organizó David la música del culto.",
            texto: "David apartó a [[levitas]] para cantar y tocar en el culto, con [[turnos]] y con [[maestros]].",
            distractores: ["soldados", "premios", "aplausos"],
            errores: {
              soldados: "David apartó a levitas para cantar y tocar instrumentos en el culto.",
              premios: "Los músicos tenían turnos: la adoración se prepara con orden.",
              aplausos: "Los levitas tenían maestros: hubo músicos apartados y formados.",
            },
            apoyo: "David apartó a levitas para cantar y tocar instrumentos en el culto, con turnos y con maestros",
            ref: "1 Crónicas 25",
            explica: "David apartó a levitas para cantar y tocar instrumentos en el culto, con turnos y con maestros: la adoración se prepara con orden.",
          },
          {
            consigna: "Completa lo que enseña la música del culto en tiempos de David.",
            texto: "La adoración se prepara con [[orden]]: hubo músicos [[apartados]] y [[formados]].",
            distractores: ["prisa", "olvidados", "improvisados"],
            errores: {
              prisa: "La adoración se prepara con orden.",
              olvidados: "Los músicos fueron apartados por David para cantar y tocar en el culto.",
              improvisados: "Los músicos eran formados, con turnos y con maestros.",
            },
            apoyo: "La adoración se prepara con orden: hubo músicos apartados y formados",
            ref: "1 Crónicas 25",
            explica: "David organizó la música del culto con levitas apartados y formados, con turnos y con maestros: la adoración se prepara con orden.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un guitarrista nuevo del grupo te dice: Yo no ensayo; en el culto toco lo que me sale, porque así es más espiritual.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la adoración se prepara con orden, con músicos formados.", bien: true, explica: "David apartó a levitas para la música del culto, con turnos y con maestros: la adoración se prepara con orden." },
              { texto: "Que tiene razón: ensayar le quita lo espiritual a la música.", explica: "En tiempos de David hubo músicos apartados y formados: preparar no le quita nada a la adoración." },
              { texto: "Que ensaye solo cuando le toque tocar en un culto especial.", explica: "La adoración se prepara con orden en todos los cultos, no solo en los especiales." },
              { texto: "Que no hace falta ensayar si tiene un talento natural para tocar.", explica: "Los levitas tenían maestros: hubo músicos apartados y formados." },
            ],
            apoyo: "La adoración se prepara con orden: hubo músicos apartados y formados",
            ref: "1 Crónicas 25",
            explica: "David organizó la música del culto con levitas apartados y formados, con turnos y con maestros: la adoración se prepara con orden.",
          },
          {
            caso: "La encargada del calendario del grupo te dice: Que toquen siempre los mismos dos músicos; los nuevos ya aprenderán solos.",
            pregunta: "¿Qué le propones?",
            opciones: [
              { texto: "Que haya turnos, y maestros que formen a los nuevos.", bien: true, explica: "David apartó a levitas para cantar y tocar en el culto, con turnos y con maestros." },
              { texto: "Que está bien: los mejores tocan siempre y los demás miran.", explica: "David organizó la música con turnos, y hubo maestros para formar a los músicos." },
              { texto: "Que cada músico toque cuando quiera, sin turnos ni orden.", explica: "La adoración se prepara con orden: hubo turnos y maestros." },
              { texto: "Que los nuevos aprendan solos, viendo videos en sus casas.", explica: "Con David hubo maestros: los músicos fueron apartados y formados." },
            ],
            apoyo: "David apartó a levitas para cantar y tocar instrumentos en el culto, con turnos y con maestros",
            ref: "1 Crónicas 25",
            explica: "La música del culto se organiza como lo hizo David: con músicos apartados, con turnos y con maestros que los forman.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los salmos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los salmos son oraciones y cantos para el culto y para la vida.", verdad: true, explica: "Los salmos son de alabanza, de gratitud, de dolor y de confianza, para el culto y para la vida.", apoyo: "Los salmos son oraciones y cantos para el culto y para la vida", ref: "Salmos 100:1-5" },
              { texto: "Los salmos sirven solo para los días de alegría.", verdad: false, explica: "Los salmos tienen palabras para la alegría y también para las lágrimas.", apoyo: "Los salmos tienen palabras para la alegría y también para las lágrimas" },
              { texto: "El Salmo 100 invita a entrar por sus puertas con acción de gracias.", verdad: true, explica: "El Salmo 100 invita: «Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza».", apoyo: "El Salmo 100 invita: «Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza»", ref: "Salmos 100:4" },
            ],
          },
          {
            consigna: "Sobre los salmos en la adoración: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los salmos enseñan a llevarle a Dios solo lo alegre de la vida.", verdad: false, explica: "Los salmos enseñan a llevar a Dios toda la vida, también el dolor.", apoyo: "Los salmos enseñan a llevar a Dios toda la vida, también el dolor" },
              { texto: "Los salmos fueron el libro de cantos de Israel.", verdad: true, explica: "Los salmos fueron el libro de cantos de Israel, para toda la vida.", apoyo: "Los salmos fueron el libro de cantos de Israel, para toda la vida" },
              { texto: "El Salmo 100 da como razón para alabar que el pueblo canta muy bien.", verdad: false, explica: "El Salmo 100 da la razón: «Porque Jehová es bueno; para siempre es su misericordia».", apoyo: "y da la razón: «Porque Jehová es bueno; para siempre es su misericordia»", ref: "Salmos 100:5" },
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
            apoyo: "Los salmos enseñan a llevar a Dios toda la vida, también el dolor",
            ref: "Salmos 100:1-5",
            titulo: "Un domingo con lágrimas",
            relato: [
              "El jueves murió un joven de la iglesia, y el domingo te toca dirigir la alabanza.",
              "Un músico te propone: Cantemos solo canciones alegres, para que nadie piense en lo que pasó.",
              "Abres el libro de los Salmos para preparar el culto.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te enseñan los salmos para ese domingo?",
                opciones: [
                  { texto: "Que se puede llevar a Dios toda la vida, también el dolor.", bien: true, explica: "Los salmos enseñan a llevar a Dios toda la vida, también el dolor." },
                  { texto: "Que en el culto se canta solo lo alegre, y el dolor queda afuera.", explica: "Los salmos son de alabanza, de gratitud, de dolor y de confianza." },
                  { texto: "Que el dolor se lleva a Dios en privado, y nunca en el culto.", explica: "Los salmos son oraciones y cantos para el culto y para la vida, también de dolor." },
                ],
                apoyo: "Los salmos enseñan a llevar a Dios toda la vida, también el dolor",
                explica: "Los salmos son oraciones y cantos para el culto y para la vida: de alabanza, de gratitud, de dolor y de confianza.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al músico que propone solo canciones alegres?",
                opciones: [
                  { texto: "Que los salmos traen palabras para la alegría y las lágrimas.", bien: true, explica: "Los salmos tienen palabras para la alegría y también para las lágrimas." },
                  { texto: "Que tiene razón: hay que evitar el tema, para que nadie llore.", explica: "Los salmos enseñan a llevar a Dios toda la vida, también el dolor." },
                  { texto: "Que mejor no haya alabanza este domingo, por respeto al dolor.", explica: "Los salmos son cantos también para los días de dolor." },
                ],
                apoyo: "Los salmos tienen palabras para la alegría y también para las lágrimas",
                explica: "Los salmos tienen palabras para la alegría y también para las lágrimas: el dolor también se lleva a Dios.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué cantos escoges para ese domingo?",
                opciones: [
                  { texto: "Cantos de dolor y de confianza, y también de gratitud.", bien: true, explica: "Los salmos son de alabanza, de gratitud, de dolor y de confianza." },
                  { texto: "Solo cantos de fiesta, para cambiar rápido el ánimo de todos.", explica: "Los salmos tienen palabras también para las lágrimas." },
                  { texto: "Ningún canto: solo música suave mientras la gente llora.", explica: "Los salmos son oraciones y cantos también para los días de dolor." },
                ],
                apoyo: "Los salmos son oraciones y cantos para el culto y para la vida: de alabanza, de gratitud, de dolor y de confianza",
                explica: "Con los salmos, el pueblo de Dios lleva a Dios toda la vida: la alegría, la gratitud, el dolor y la confianza.",
              },
              {
                tipo: "explica",
                apoyo: "Los salmos son oraciones y cantos para el culto y para la vida: de alabanza, de gratitud, de dolor y de confianza",
                clave: {
                  id: "pr-alabanza-1-3-a6-1",
                  tipo: "corta",
                  pregunta: "¿Cómo les explicarías a los músicos el lugar de los salmos en ese culto?",
                  ideas: [
                    { id: "dolor", peso: 50, texto: "Los salmos enseñan a llevar a Dios toda la vida, también el dolor.", formas: ["toda la vida", "tambien el dolor", "el dolor", "las lagrimas", "nuestro dolor", "la tristeza", "llev* a dios"] },
                    { id: "cantos", peso: 50, texto: "Son oraciones y cantos para el culto y para la vida: de alabanza, de gratitud, de dolor y de confianza.", formas: ["oraciones y cantos", "para el culto", "libro de cantos", "confianza", "gratitud"] },
                  ],
                  modelo: "Les explicaría que los salmos son oraciones y cantos para el culto y para la vida, también de dolor y de confianza. Nos enseñan a llevar a Dios toda la vida, también el dolor y las lágrimas.",
                },
              },
            ],
          },
          {
            apoyo: "Se adora con gozo, con gratitud y con música, todo el pueblo junto",
            ref: "Salmos 100:1-5",
            titulo: "El salmo de la apertura",
            relato: [
              "Tu iglesia prepara un culto de acción de gracias, y te piden abrirlo con un salmo.",
              "Escoges el Salmo 100. Un cantante del grupo dice: Mejor lo cantamos solo nosotros, y la gente escucha.",
              "Te sientas a preparar la apertura del culto.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A qué invita el Salmo 100 al entrar?",
                opciones: [
                  { texto: "A entrar por sus puertas con acción de gracias.", bien: true, explica: "El Salmo 100 invita: «Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza»." },
                  { texto: "A entrar en silencio, sin cantar ni dar gracias.", explica: "El Salmo 100 invita a entrar con acción de gracias y con alabanza." },
                  { texto: "A entrar mirando a los músicos que van a tocar.", explica: "El Salmo 100 invita a entrar por sus puertas con acción de gracias, y por sus atrios con alabanza." },
                ],
                apoyo: "El Salmo 100 invita: «Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza»",
                explica: "El Salmo 100 invita a entrar por sus puertas con acción de gracias y por sus atrios con alabanza.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué razón da el salmo para alabar?",
                opciones: [
                  { texto: "Que Jehová es bueno y para siempre es su misericordia.", bien: true, explica: "El Salmo 100 da la razón: «Porque Jehová es bueno; para siempre es su misericordia»." },
                  { texto: "Que el pueblo de Israel cantaba mejor que los demás pueblos.", explica: "La razón no está en el pueblo, sino en Dios: Jehová es bueno." },
                  { texto: "Que la gente sale más contenta cuando la música es buena.", explica: "La razón del salmo es que Jehová es bueno, y para siempre es su misericordia." },
                ],
                apoyo: "y da la razón: «Porque Jehová es bueno; para siempre es su misericordia»",
                explica: "El salmo invita a alabar y da la razón: Jehová es bueno, y para siempre es su misericordia.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al cantante que quiere cantarlo solo con el grupo?",
                opciones: [
                  { texto: "Que se adora con gozo y con música, todo el pueblo junto.", bien: true, explica: "Se adora con gozo, con gratitud y con música, todo el pueblo junto." },
                  { texto: "Que sí: el pueblo adora mejor cuando solo escucha al grupo.", explica: "En el culto de Israel se adoraba con todo el pueblo junto." },
                  { texto: "Que lo cante él solo, porque es quien mejor canta en el grupo.", explica: "Se adora con gozo, con gratitud y con música, todo el pueblo junto." },
                ],
                apoyo: "Se adora con gozo, con gratitud y con música, todo el pueblo junto",
                explica: "En la adoración de Israel, todo el pueblo junto adoraba con gozo, con gratitud y con música.",
              },
              {
                tipo: "explica",
                apoyo: "El Salmo 100 invita: «Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza», y da la razón: «Porque Jehová es bueno; para siempre es su misericordia»",
                clave: {
                  id: "pr-alabanza-1-3-a6-2",
                  tipo: "corta",
                  pregunta: "¿Cómo presentarías el Salmo 100 a la iglesia al abrir el culto?",
                  ideas: [
                    { id: "gracias", peso: 50, texto: "Invita a entrar por sus puertas con acción de gracias y por sus atrios con alabanza.", formas: ["accion de gracias", "dar gracias", "demos gracias", "con gratitud", "agradec*", "por sus puertas", "por sus atrios"] },
                    { id: "razon", peso: 50, texto: "Porque Jehová es bueno y para siempre es su misericordia.", formas: ["jehova es bueno", "dios es bueno", "el senor es bueno", "su misericordia", "misericordia es para siempre"] },
                  ],
                  modelo: "Invitaría a toda la iglesia a entrar por sus puertas con acción de gracias y por sus atrios con alabanza, todos juntos, porque Jehová es bueno y para siempre es su misericordia.",
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
            apoyo: "El tabernáculo enseñaba que Dios quiere vivir con su pueblo, y también que solo se acerca a él quien es purificado",
            ref: "Éxodo 25:8",
            clave: {
              id: "pr-alabanza-1-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseñaban el tabernáculo y el templo sobre la adoración de Israel?",
              ideas: [
                { id: "habitar", peso: 50, texto: "Que Dios quiere habitar con su pueblo.", formas: ["habit* con", "habit* en medio", "vivir con su pueblo", "viv* con (su|el) pueblo", "en medio de (ellos|su pueblo)", "con su pueblo"] },
                { id: "santidad", peso: 50, texto: "Que se lo adora con santidad: solo se acerca a él quien es purificado.", formas: ["santidad", "purific*", "no de cualquier manera", "sacrificio*", "sacerdote*", "el altar"] },
              ],
              modelo: "Enseñaban que Dios quiere habitar con su pueblo, y también que se lo adora con santidad: solo se acerca a él quien es purificado, y por eso estaban el altar, los sacrificios y los sacerdotes.",
            },
          },
          {
            apoyo: "En el Antiguo Testamento, el tabernáculo y el templo mostraban que Dios quiere habitar con su pueblo y que se lo adora con santidad",
            ref: "Éxodo 25:8",
            clave: {
              id: "pr-alabanza-1-3-a7-2",
              tipo: "corta",
              pregunta: "Un joven del grupo pregunta para qué estudiar la tienda que Israel tenía en el desierto. ¿Qué le enseñas sobre lo que mostraba?",
              ideas: [
                { id: "habitar", peso: 50, texto: "Que Dios quiere vivir con su pueblo: él toma la iniciativa.", formas: ["habit* con", "habit* en medio", "vivir con su pueblo", "viv* con (su|el) pueblo", "en medio de (ellos|su pueblo)", "con su pueblo", "toma la iniciativa"] },
                { id: "purificado", peso: 50, texto: "Y que solo se acerca a Dios quien es purificado: por eso había altar, sacrificios y sacerdotes.", formas: ["purific*", "santidad", "no de cualquier manera", "sacrificio*", "sacerdote*", "el altar"] },
              ],
              modelo: "Le enseño que para entender la adoración del Nuevo Testamento hay que conocer la del Antiguo. El tabernáculo mostraba que Dios quiere vivir con su pueblo, y que solo se acerca a él quien es purificado.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Lo que cambió con Cristo
    "alabanza-1-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Cuando Jesús dijo: Destruid este templo, ¿de qué templo hablaba?", reverso: "Del templo de su cuerpo.", apoyo: "Juan explica que «él hablaba del templo de su cuerpo»" },
              { frente: "¿Cuál es ahora el lugar de encuentro con Dios?", reverso: "No un edificio, sino una persona: Jesucristo.", apoyo: "Ahora el lugar de encuentro con Dios no es un edificio, sino una persona: Jesucristo" },
              { frente: "¿Por qué tenemos libertad para entrar en el Lugar Santísimo?", reverso: "Por la sangre de Jesucristo.", apoyo: "Por eso Hebreos dice que tenemos «libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo»" },
              { frente: "¿Cómo llama Hebreos al camino para acercarnos a Dios?", reverso: "Un camino nuevo y vivo.", apoyo: "por un camino «nuevo y vivo»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuántas veces se ofreció Cristo?", reverso: "Una vez para siempre.", apoyo: "Cristo se ofreció una vez para siempre" },
              { frente: "¿Qué sacrificio ofrecemos ahora a Dios?", reverso: "Sacrificio de alabanza: fruto de labios que confiesan su nombre.", apoyo: "Lo que ofrecemos ahora es otro sacrificio: «ofrezcamos siempre a Dios, por medio de él, sacrificio de alabanza, es decir, fruto de labios que confiesan su nombre»" },
              { frente: "Según Pedro, ¿qué somos todos los creyentes?", reverso: "Un sacerdocio santo.", apoyo: "Pedro enseña que todos los creyentes somos «sacerdocio santo, para ofrecer sacrificios espirituales aceptables a Dios por medio de Jesucristo»" },
              { frente: "¿Dónde se reunían los primeros creyentes?", reverso: "En el templo y en las casas.", apoyo: "Los primeros creyentes se reunían en el templo y en las casas" },
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
            consigna: "Une cada cosa de antes con lo que es ahora, desde que vino Cristo.",
            pares: [
              ["Antes, un lugar: Jerusalén", "Ahora, una persona: Jesucristo"],
              ["Antes, sacrificios que se repetían", "Ahora, el sacrificio de Cristo, una vez para siempre"],
              ["Antes, un grupo de sacerdotes", "Ahora, todos los creyentes son sacerdotes"],
            ],
            apoyo: "Antes, un lugar: Jerusalén. Ahora, una persona: Jesucristo",
            ref: "Juan 2:19-21",
            explica: "Con Jesús, todo encontró su cumplimiento en él: el lugar de encuentro con Dios es una persona, su sacrificio fue una vez para siempre, y todos los creyentes son sacerdotes.",
          },
          {
            consigna: "Une cada cosa que Cristo cumplió con lo que la lección dice que es ahora.",
            pares: [
              ["El templo de Jerusalén", "El cuerpo de Jesús, levantado en tres días"],
              ["Los sacrificios de animales", "Cristo, que se ofreció una vez para siempre"],
              ["Los sacerdotes de Israel", "Todos los creyentes, un sacerdocio santo"],
              ["El Lugar Santísimo", "Se entra con libertad por la sangre de Jesucristo"],
            ],
            apoyo: "Cristo cumplió el templo y los sacrificios: él es el lugar de encuentro con Dios, y por su sangre tenemos libertad para acercarnos al Padre",
            ref: "Hebreos 10:19-22",
            explica: "Jesús hablaba del templo de su cuerpo; se ofreció una vez para siempre; todos los creyentes somos un sacerdocio santo; y por su sangre tenemos libertad para entrar en el Lugar Santísimo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un cantante del coro te dice: Hoy canté perfecto; seguro que Dios me recibió mejor que a los demás.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que llegamos a Dios por la sangre de Cristo, no por cantar bien.", bien: true, explica: "Nadie llega a Dios por lo bien que canta, sino por la sangre de Cristo." },
              { texto: "Que sí: Dios recibe primero a los que mejor cantan en cada culto.", explica: "Adoramos por medio de Cristo, no por nuestros méritos ni por un rito." },
              { texto: "Que no se confíe, y que ensaye más para que Dios lo siga recibiendo.", explica: "Dios no nos recibe por lo bien que cantamos: tenemos libertad para acercarnos por la sangre de Jesucristo." },
              { texto: "Que lo que importa es que la gente lo aplaudió más que a los otros.", explica: "Nadie llega a Dios por el aplauso ni por lo bien que canta, sino por la sangre de Cristo." },
            ],
            apoyo: "Nadie llega a Dios por lo bien que canta, sino por la sangre de Cristo",
            ref: "Hebreos 10:19-22",
            explica: "Adoramos por medio de Cristo, no por nuestros méritos ni por un rito: por su sangre tenemos libertad para acercarnos al Padre.",
          },
          {
            caso: "Un hermano te dice: Yo me siento cerca de Dios solo cuando estoy en el templo; afuera, Dios está lejos.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que ahora el encuentro con Dios es en una persona: Jesucristo.", bien: true, explica: "Ahora el lugar de encuentro con Dios no es un edificio, sino una persona: Jesucristo." },
              { texto: "Que tiene razón: a Dios solo se le encuentra dentro del templo.", explica: "Con Jesús, la adoración no se quedó en un edificio: el lugar de encuentro con Dios es una persona." },
              { texto: "Que venga más días al templo, para estar cerca de Dios más veces.", explica: "El encuentro con Dios no depende de un edificio, sino de Jesucristo." },
              { texto: "Que busque un templo más grande, donde Dios se sienta más cerca.", explica: "Ahora el lugar de encuentro con Dios no es un edificio, sino una persona." },
            ],
            apoyo: "Ahora el lugar de encuentro con Dios no es un edificio, sino una persona: Jesucristo",
            ref: "Juan 2:19-21",
            explica: "Jesús hablaba del templo de su cuerpo: antes, un lugar, Jerusalén; ahora, una persona, Jesucristo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que ofrecemos ahora a Dios.",
            texto: "Cristo se [[ofreció]] una vez para [[siempre]]; por eso ahora no se ofrecen animales, sino sacrificio de [[alabanza]] por medio de él.",
            distractores: ["ocultó", "probar", "silencio"],
            errores: {
              "ocultó": "Cristo se ofreció una vez para siempre.",
              probar: "Cristo se ofreció una vez para siempre: su sacrificio no se repite.",
              silencio: "Lo que ofrecemos ahora es sacrificio de alabanza, fruto de labios que confiesan su nombre.",
            },
            apoyo: "Cristo se ofreció una vez para siempre, y ya no hacen falta sacrificios de animales",
            ref: "Hebreos 13:15",
            explica: "Cristo se ofreció una vez para siempre, y ya no hacen falta sacrificios de animales. Ahora ofrecemos siempre a Dios, por medio de él, sacrificio de alabanza.",
          },
          {
            consigna: "Completa lo que enseña Pedro sobre quiénes adoran.",
            texto: "La adoración es de toda la [[iglesia]]: cada creyente es un [[sacerdote]] que adora y ofrece a Dios su [[alabanza]] por medio de Cristo.",
            distractores: ["banda", "espectador", "mérito"],
            errores: {
              banda: "La adoración no es solo de los músicos o de los líderes.",
              espectador: "Cada creyente es un sacerdote que adora.",
              "mérito": "Adoramos por medio de Cristo, no por nuestros méritos ni por un rito.",
            },
            apoyo: "La adoración no es solo de los músicos o de los líderes: cada creyente es un sacerdote que adora",
            ref: "1 Pedro 2:5",
            explica: "Todos los creyentes somos un sacerdocio santo, para ofrecer sacrificios espirituales aceptables a Dios por medio de Jesucristo: cada creyente es un sacerdote que adora.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La adoración no es solo de los músicos o de los líderes: cada creyente es un sacerdote que adora",
            ref: "1 Pedro 2:5",
            situacion: "Eres el nuevo líder de alabanza de una iglesia donde el grupo canta y la congregación solo mira, como en un concierto.",
            escenas: [
              {
                id: "e1",
                narra: "En tu primera reunión, un músico dice: Nosotros somos los que adoramos; la gente viene a escucharnos.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que cada creyente es un sacerdote que adora, no solo el grupo.", valor: 2, explica: "La adoración no es solo de los músicos o de los líderes: cada creyente es un sacerdote que adora.", siguiente: "e2" },
                  { texto: "Que la gente también puede cantar, si es que se sabe las canciones.", valor: 1, explica: "Es verdad que pueden cantar, pero es más que eso: todos los creyentes son un sacerdocio santo, y cada uno adora.", siguiente: "e2" },
                  { texto: "Que tiene razón: el grupo es el que le ofrece la alabanza a Dios.", valor: 0, explica: "Todos los creyentes somos un sacerdocio santo, para ofrecer sacrificios espirituales a Dios.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasan las semanas y la congregación canta cada vez menos; muchos solo graban al grupo con el teléfono.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Enseñas que todos los creyentes son un sacerdocio santo.", valor: 2, explica: "Pedro enseña que todos los creyentes somos sacerdocio santo: la alabanza es de toda la iglesia.", siguiente: "e2" },
                  { texto: "Subes el volumen del grupo, para que se luzca todavía mucho más.", valor: 0, explica: "La adoración no es solo de los músicos: cada creyente es un sacerdote que adora.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Preparas los cantos del próximo domingo.",
                pregunta: "¿Cómo los eliges?",
                opciones: [
                  { texto: "Cantos que toda la iglesia pueda ofrecer a Dios.", valor: 2, explica: "Cada creyente es un sacerdote que adora: la alabanza la ofrece toda la iglesia." },
                  { texto: "Los cantos que el grupo toca mejor, aunque casi nadie los conozca.", valor: 1, explica: "Tocar bien ayuda, pero el sacrificio de alabanza lo ofrece cada creyente." },
                  { texto: "Cantos muy difíciles, para mostrar el nivel que ya tiene el grupo.", valor: 0, explica: "La adoración no es solo de los músicos o de los líderes." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del culto, una hermana te dice: Yo no canto bien, así que mejor me quedo callada.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que su alabanza es un sacrificio que ofrece por medio de Cristo.", valor: 2, explica: "Ofrecemos siempre a Dios, por medio de Cristo, sacrificio de alabanza: nadie llega a Dios por lo bien que canta." },
                  { texto: "Que cante, pero bajito, para que nadie note cuando desafina.", valor: 1, explica: "Que cante está bien, pero la razón es otra: su alabanza es un sacrificio que ofrece por medio de Cristo." },
                  { texto: "Que tiene razón: la alabanza es solo para los que cantan muy bien.", valor: 0, explica: "Nadie llega a Dios por lo bien que canta, sino por la sangre de Cristo." },
                ],
              },
            ],
          },
          {
            apoyo: "Ya no ofrecemos animales, sino sacrificio de alabanza por medio de él, y todos los creyentes somos un sacerdocio santo",
            ref: "Hebreos 13:15",
            situacion: "Diriges la alabanza en un grupo de hogar. Allí no hay un grupo de músicos, solo una guitarra vieja.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano dice: Sin un buen grupo de músicos, aquí no se puede adorar de verdad.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que cada creyente es sacerdote y puede ofrecer su alabanza.", valor: 2, explica: "Todos los creyentes somos un sacerdocio santo: cada creyente es un sacerdote que adora.", siguiente: "e2" },
                  { texto: "Que mejor pongan grabaciones del templo, y canten con ellas.", valor: 1, explica: "Se puede, pero no hace falta un grupo: cada creyente es un sacerdote que adora.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que esperen al domingo para adorar en el templo.", valor: 0, explica: "La adoración no es solo de los músicos o de los líderes.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Esa noche nadie canta, y todos esperan al domingo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los animas a ofrecer juntos sacrificio de alabanza.", valor: 2, explica: "Ofrecemos siempre a Dios, por medio de Cristo, sacrificio de alabanza.", siguiente: "e2" },
                  { texto: "Dejas la alabanza para el templo, porque allí sí hay un buen grupo.", valor: 0, explica: "La adoración no es solo de los músicos: antes, el templo; ahora, la iglesia reunida y cada día de la vida.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Una hermana pregunta qué es el sacrificio de alabanza.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que es confesar el nombre de Dios con los labios, por Cristo.", valor: 2, explica: "Es el sacrificio que ofrecemos ahora: fruto de labios que confiesan su nombre, por medio de Cristo." },
                  { texto: "Que es alabar a Dios de vez en cuando, cuando uno tiene ganas.", valor: 1, explica: "Alabar está bien, pero Hebreos dice: «ofrezcamos siempre a Dios, por medio de él, sacrificio de alabanza»." },
                  { texto: "Que es volver a ofrecer animales, como se hacía en el templo antiguo.", valor: 0, explica: "Cristo se ofreció una vez para siempre, y ya no hacen falta sacrificios de animales." },
                ],
              },
              {
                id: "e3",
                narra: "Al despedirse, un joven pregunta por qué podemos acercarnos a Dios con libertad.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Por la sangre de Jesucristo, no por nuestros méritos.", valor: 2, explica: "Tenemos libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo: adoramos por medio de Cristo, no por nuestros méritos." },
                  { texto: "Porque esta noche cantamos con mucho cariño y con fervor.", valor: 0, explica: "Nadie llega a Dios por lo bien que canta, sino por la sangre de Cristo." },
                  { texto: "Porque cumplimos bien todos los ritos del grupo de hogar.", valor: 0, explica: "Adoramos por medio de Cristo, no por nuestros méritos ni por un rito." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la primera iglesia tiene un error. Tócala.",
            frases: [
              "Los primeros creyentes se reunían en el templo y en las casas.",
              "Comían juntos con alegría y sencillez de corazón, alabando a Dios.",
              "Su adoración unía la enseñanza de los apóstoles y la comunión.",
              "Dejaban las oraciones solo para los días de fiesta en Jerusalén.",
            ],
            malo: 3,
            correccion: "Su vida de adoración unía la enseñanza de los apóstoles, la comunión, el partimiento del pan, las oraciones y la alabanza.",
            apoyo: "Su vida de adoración unía la enseñanza de los apóstoles, la comunión, el partimiento del pan, las oraciones y la alabanza",
            ref: "Hechos 2:42-47",
            explica: "La primera iglesia adoraba con alegría, en el templo y en las casas, y su vida de adoración unía la enseñanza, la comunión, el partimiento del pan, las oraciones y la alabanza.",
          },
          {
            consigna: "Una de estas frases sobre cómo adoraba la primera iglesia tiene un error. Tócala.",
            frases: [
              "La primera iglesia adoraba con alegría.",
              "Partían el pan y oraban juntos.",
              "Se reunían en el templo y también en las casas.",
              "Comían juntos con tristeza y por obligación.",
            ],
            malo: 3,
            correccion: "Comían juntos con alegría y sencillez de corazón, alabando a Dios.",
            apoyo: "Los primeros creyentes se reunían en el templo y en las casas, y «comían juntos con alegría y sencillez de corazón, alabando a Dios»",
            ref: "Hechos 2:46-47",
            explica: "Los primeros creyentes comían juntos con alegría y sencillez de corazón, alabando a Dios.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Ya no ofrecemos animales, sino sacrificio de alabanza por medio de él, y todos los creyentes somos un sacerdocio santo",
            ref: "Hebreos 13:15",
            clave: {
              id: "pr-alabanza-1-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el sacrificio de alabanza, y quiénes lo ofrecen?",
              ideas: [
                { id: "alabanza", peso: 50, texto: "Es lo que ofrecemos ahora a Dios por medio de Cristo: fruto de labios que confiesan su nombre.", formas: ["fruto de labios", "confies* (su|el) nombre", "por medio de (cristo|el|jesus|jesucristo)", "con los labios", "nuestros labios"] },
                { id: "todos", peso: 50, texto: "Lo ofrecen todos los creyentes: cada uno es un sacerdote que adora.", formas: ["todos los creyentes", "cada creyente", "sacerdocio", "sacerdote*", "todos (los que creen|los cristianos|nosotros)"] },
              ],
              errores: [
                { id: "musicos", texto: "La adoración no es solo de los músicos o de los líderes: cada creyente es un sacerdote que adora.", formas: ["solo (los|de los) (musicos|lideres|cantantes)", "solo el grupo"], anula: "todos" },
                { id: "animales", texto: "Cristo se ofreció una vez para siempre, y ya no hacen falta sacrificios de animales.", formas: ["ofrec* animales", "sacrific* animales"], anula: "alabanza" },
              ],
              modelo: "Es el sacrificio que ofrecemos ahora a Dios por medio de Cristo: fruto de labios que confiesan su nombre. Lo ofrecen todos los creyentes, porque cada creyente es un sacerdote que adora.",
            },
          },
          {
            apoyo: "Pedro enseña que todos los creyentes somos «sacerdocio santo, para ofrecer sacrificios espirituales aceptables a Dios por medio de Jesucristo»",
            ref: "1 Pedro 2:5",
            clave: {
              id: "pr-alabanza-1-4-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que en la iglesia solo los músicos y los líderes ofrecen la adoración. ¿Qué le enseñas?",
              ideas: [
                { id: "sacerdocio", peso: 50, texto: "Todos los creyentes somos un sacerdocio santo: cada creyente es un sacerdote que adora.", formas: ["todos los creyentes", "cada creyente", "sacerdocio", "sacerdote*", "todos (los que creen|los cristianos|nosotros)"] },
                { id: "medio", peso: 50, texto: "Ofrecemos a Dios sacrificios espirituales y alabanza por medio de Jesucristo.", formas: ["por medio de (cristo|el|jesus|jesucristo)", "sacrificio* espiritual*", "sacrificio de alabanza", "fruto de labios"] },
              ],
              errores: [
                { id: "musicos", texto: "La adoración no es solo de los músicos o de los líderes.", formas: ["solo (los|de los) (musicos|lideres|cantantes)", "solo el grupo"], anula: "sacerdocio" },
              ],
              modelo: "Le enseño que todos los creyentes somos un sacerdocio santo, y que cada creyente es un sacerdote que adora. Todos ofrecemos a Dios sacrificios espirituales y alabanza por medio de Jesucristo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. En espíritu y en verdad
    "alabanza-1-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En vez de una lista de estilos y de horarios, ¿qué dio Jesús para adorar?", reverso: "Dos marcas de la adoración verdadera: en espíritu y en verdad.", apoyo: "Jesús no dio una lista de estilos ni de horarios para adorar: dio dos marcas de la adoración verdadera, en espíritu y en verdad" },
              { frente: "¿Cómo se adora en espíritu?", reverso: "Desde el interior, con el corazón, movidos por el Espíritu Santo.", apoyo: "En espíritu: desde el interior, con el corazón, movidos por el Espíritu Santo" },
              { frente: "¿Cómo se adora en verdad?", reverso: "Conforme a quien Dios es, como se revela en su Palabra y en Cristo.", apoyo: "En verdad: conforme a quien Dios es, como él se revela en su Palabra y en Cristo" },
              { frente: "¿Qué oró Jesús sobre la palabra del Padre?", reverso: "Que su palabra es verdad.", apoyo: "Jesús oró: «tu palabra es verdad»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuándo adora en verdad un canto?", reverso: "Cuando dice de Dios lo que la Biblia dice.", apoyo: "Un canto adora en verdad cuando dice de Dios lo que la Biblia dice" },
              { frente: "¿Por qué lo que cantamos también enseña?", reverso: "Porque muchos aprenden lo que creen sobre Dios por las canciones que repiten.", apoyo: "muchas personas aprenden lo que creen sobre Dios por las canciones que repiten" },
              { frente: "En Isaías 29, ¿de qué pueblo se quejó Dios?", reverso: "De un pueblo que lo honraba solo de palabra.", apoyo: "Dios se quejó de un pueblo que lo honraba solo de palabra" },
              { frente: "¿Qué pide Pablo cuando dice que cantará con el espíritu y con el entendimiento?", reverso: "Equilibrio: la adoración une la mente y el corazón.", apoyo: "Pablo pide equilibrio" },
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
            consigna: "Completa las dos marcas de la adoración verdadera.",
            texto: "En espíritu: desde el [[interior]], con el corazón, [[movidos]] por el Espíritu Santo. En verdad: conforme a quien Dios es, como él se [[revela]] en su Palabra.",
            distractores: ["exterior", "obligados", "esconde"],
            errores: {
              exterior: "En espíritu es desde el interior, con el corazón.",
              obligados: "En espíritu es movidos por el Espíritu Santo.",
              esconde: "En verdad es conforme a quien Dios es, como él se revela en su Palabra y en Cristo.",
            },
            apoyo: "En espíritu: desde el interior, con el corazón, movidos por el Espíritu Santo. En verdad: conforme a quien Dios es, como él se revela en su Palabra y en Cristo",
            ref: "Juan 4:24",
            explica: "Adorar en espíritu es adorar desde el interior, con el corazón, movidos por el Espíritu Santo; adorar en verdad es adorar conforme a quien Dios es, como él se revela en su Palabra y en Cristo.",
          },
          {
            consigna: "Completa lo que dio Jesús para adorar.",
            texto: "Jesús dio dos [[marcas]] de la adoración verdadera: en espíritu, desde el corazón, y en verdad, como Dios se revela en su [[Palabra]] y en [[Cristo]].",
            distractores: ["listas", "costumbre", "emoción"],
            errores: {
              listas: "Jesús no dio una lista de estilos ni de horarios: dio dos marcas de la adoración verdadera.",
              costumbre: "En verdad es conforme a quien Dios es, como él se revela en su Palabra y en Cristo.",
              "emoción": "Dios se revela en su Palabra y en Cristo.",
            },
            apoyo: "Jesús no dio una lista de estilos ni de horarios para adorar: dio dos marcas de la adoración verdadera, en espíritu y en verdad",
            ref: "Juan 4:24",
            explica: "Jesús no dio una lista de estilos ni de horarios: dio dos marcas, en espíritu y en verdad. En verdad es conforme a quien Dios es, como él se revela en su Palabra y en Cristo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿El canto pasa las preguntas de la lección o hay que revisarlo? Lleva cada frase a su grupo.",
            grupos: ["Pasa la revisión", "Hay que revisarlo"],
            frases: [
              { texto: "Dice de Dios lo que la Biblia dice", grupo: 0 },
              { texto: "Pone a Cristo y su obra en el centro", grupo: 0 },
              { texto: "Se entiende, y toda la iglesia lo puede cantar", grupo: 0 },
              { texto: "Ayuda al pueblo a responder a Dios con el corazón", grupo: 0 },
              { texto: "Habla solo de nosotros y de lo que sentimos", grupo: 1 },
              { texto: "Dice de Dios cosas que la Biblia no dice", grupo: 1 },
              { texto: "Usa palabras que casi nadie entiende", grupo: 1 },
            ],
            apoyo: "Un canto adora en verdad cuando dice de Dios lo que la Biblia dice",
            ref: "Colosenses 3:16",
            explica: "Un canto se revisa con cuatro preguntas: si dice de Dios lo que la Biblia dice, si pone a Cristo y su obra en el centro, si se entiende para cantarlo con el entendimiento y si ayuda al pueblo a responder a Dios con el corazón.",
          },
          {
            consigna: "Revisas los cantos del domingo. ¿Cada canto pasa la revisión de la lección o hay que revisarlo? Lleva cada frase a su grupo.",
            grupos: ["Pasa la revisión", "Hay que revisarlo"],
            frases: [
              { texto: "Un canto que repite que la palabra de Dios es verdad", grupo: 0 },
              { texto: "Un canto que cuenta la obra de Cristo por nosotros", grupo: 0 },
              { texto: "Un canto sencillo que toda la iglesia entiende", grupo: 0 },
              { texto: "Un canto que habla de mí y nunca menciona a Dios", grupo: 1 },
              { texto: "Un canto bonito que dice de Dios lo que la Biblia no dice", grupo: 1 },
              { texto: "Un canto lleno de palabras raras que nadie entiende", grupo: 1 },
            ],
            apoyo: "¿Pone a Cristo y su obra en el centro, y no a nosotros?",
            ref: "Juan 17:17",
            explica: "Pasa la revisión el canto que dice lo que la Biblia dice, que pone a Cristo y su obra en el centro y que todos pueden cantar con el entendimiento. El que habla solo de nosotros, dice lo que la Biblia no dice o nadie entiende, hay que revisarlo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Cantamos lo que creemos, y terminamos creyendo lo que cantamos",
            ref: "Juan 17:17",
            titulo: "La canción de moda",
            relato: [
              "Eres líder de alabanza. Los jóvenes te piden cantar el domingo una canción muy pegajosa que todos escuchan en la radio.",
              "Al leer la letra con calma, ves que habla mucho de lo que sentimos, casi nada de Cristo, y que una frase dice de Dios algo que la Biblia no dice.",
              "Antes de decidir, revisas la canción con la Biblia en la mano.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cuál es la primera pregunta que le haces a la letra?",
                opciones: [
                  { texto: "¿Dice de Dios lo que la Biblia dice?", bien: true, explica: "Un canto adora en verdad cuando dice de Dios lo que la Biblia dice." },
                  { texto: "¿Está entre las más escuchadas de la radio?", explica: "Que sea muy escuchada no dice si adora en verdad." },
                  { texto: "¿Les gusta a los jóvenes de la iglesia?", explica: "La pregunta es si dice de Dios lo que la Biblia dice, no si nos gusta." },
                ],
                apoyo: "¿Dice de Dios lo que la Biblia dice?",
                explica: "Jesús oró: «tu palabra es verdad». Un canto adora en verdad cuando dice de Dios lo que la Biblia dice.",
              },
              {
                tipo: "situacion",
                pregunta: "La canción habla mucho de lo que sentimos y casi nada de Cristo. ¿Qué pregunta de la lección le falla?",
                opciones: [
                  { texto: "¿Pone a Cristo y su obra en el centro, y no a nosotros?", bien: true, explica: "La canción pone en el centro lo que sentimos, y no a Cristo y su obra." },
                  { texto: "¿Se entiende bien, para que todos puedan cantarlo con el entendimiento?", explica: "La letra se entiende; lo que le falta es poner a Cristo y su obra en el centro." },
                  { texto: "¿Tiene un ritmo rápido y alegre, para que nadie se aburra en el culto?", explica: "El ritmo no es una de las preguntas de la lección." },
                ],
                apoyo: "¿Pone a Cristo y su obra en el centro, y no a nosotros?",
                explica: "Una de las preguntas para revisar un canto es si pone a Cristo y su obra en el centro, y no a nosotros.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué decides hacer con la canción?",
                opciones: [
                  { texto: "Dejarla de lado, porque dice de Dios lo que la Biblia no dice.", bien: true, explica: "Un canto adora en verdad cuando dice de Dios lo que la Biblia dice, y lo que cantamos también enseña." },
                  { texto: "Cantarla igual, porque lo que importa es que la gente se anime.", explica: "Lo que cantamos también enseña: muchas personas aprenden lo que creen sobre Dios por las canciones que repiten." },
                  { texto: "Cantarla sin poner la letra en la pantalla, para que nadie la lea.", explica: "Aunque no se lea, se canta y se aprende: lo que cantamos también enseña." },
                ],
                apoyo: "Un canto adora en verdad cuando dice de Dios lo que la Biblia dice",
                explica: "Lo que cantamos también enseña: muchas personas aprenden lo que creen sobre Dios por las canciones que repiten.",
              },
              {
                tipo: "explica",
                apoyo: "Lo que cantamos también enseña: muchas personas aprenden lo que creen sobre Dios por las canciones que repiten",
                clave: {
                  id: "pr-alabanza-1-5-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué les explicarás a los jóvenes sobre por qué revisaste la canción?",
                  ideas: [
                    { id: "verdad", peso: 50, texto: "Que un canto adora en verdad cuando dice de Dios lo que la Biblia dice.", formas: ["lo que la biblia dice", "lo que dice la biblia", "segun la biblia", "conforme a la (biblia|palabra)", "adora en verdad", "con la biblia"] },
                    { id: "ensena", peso: 50, texto: "Que lo que cantamos también enseña: muchos aprenden lo que creen por las canciones que repiten.", formas: ["tambien ensena", "cant* ensen*", "aprend* lo que creen", "aprend* por las canciones", "terminamos creyendo", "creyendo lo que cantamos", "las canciones que (repiten|repetimos|cantamos)"] },
                  ],
                  modelo: "Les explicaré que un canto adora en verdad cuando dice de Dios lo que la Biblia dice. Además, lo que cantamos también enseña: muchas personas aprenden lo que creen sobre Dios por las canciones que repiten.",
                },
              },
            ],
          },
          {
            apoyo: "¿Se entiende, para que todos puedan cantarlo con el entendimiento?",
            ref: "1 Corintios 14:15",
            titulo: "El himno de siempre",
            relato: [
              "En tu iglesia se canta cada domingo un himno antiguo, muy querido por los hermanos mayores.",
              "Su letra es fiel a la Biblia y habla de la obra de Cristo, pero usa palabras que hoy casi nadie entiende, y muchos lo cantan sin pensar.",
              "El pastor te pide revisar con el grupo si conviene seguir cantándolo y cómo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué pregunta de la lección pasa bien el himno?",
                opciones: [
                  { texto: "¿Dice de Dios lo que la Biblia dice?", bien: true, explica: "Su letra es fiel a la Biblia: dice de Dios lo que la Biblia dice." },
                  { texto: "¿Se entiende, para que todos puedan cantarlo?", explica: "Esa es la que le falla: usa palabras que hoy casi nadie entiende." },
                  { texto: "¿Es el himno más antiguo que canta la iglesia?", explica: "Que sea antiguo o nuevo no es una de las preguntas de la lección." },
                ],
                apoyo: "¿Dice de Dios lo que la Biblia dice?",
                explica: "Un canto adora en verdad cuando dice de Dios lo que la Biblia dice, y este himno lo hace.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pregunta le falla al himno?",
                opciones: [
                  { texto: "¿Se entiende, para que todos puedan cantarlo?", bien: true, explica: "Usa palabras que casi nadie entiende, y muchos lo cantan sin pensar." },
                  { texto: "¿Pone a Cristo y su obra en el centro de la letra?", explica: "El himno habla de la obra de Cristo: esa pregunta la pasa." },
                  { texto: "¿Es tan conocido como las canciones de la radio?", explica: "Eso no es una de las preguntas de la lección." },
                ],
                apoyo: "¿Se entiende, para que todos puedan cantarlo con el entendimiento?",
                explica: "Un canto se revisa también por si se entiende, para que todos puedan cantarlo con el entendimiento.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué propones hacer con el himno?",
                opciones: [
                  { texto: "Explicar sus palabras, para cantarlo con el entendimiento.", bien: true, explica: "La adoración no apaga la mente ni el corazón: los une." },
                  { texto: "Dejar de cantarlo, porque lo antiguo ya no sirve para adorar.", explica: "El problema no es que sea antiguo: la pregunta es si se entiende, para cantarlo con el entendimiento." },
                  { texto: "Cantarlo más rápido, para que nadie se fije en lo que dice.", explica: "Pablo pide cantar también con el entendimiento." },
                ],
                apoyo: "La adoración no apaga la mente ni el corazón: los une",
                explica: "Pablo pide equilibrio: cantar con el espíritu, pero también con el entendimiento.",
              },
              {
                tipo: "explica",
                apoyo: "La adoración une el espíritu y el entendimiento",
                clave: {
                  id: "pr-alabanza-1-5-a4-2",
                  tipo: "corta",
                  pregunta: "¿Cómo les explicarías a los hermanos por qué conviene entender lo que cantan?",
                  ideas: [
                    { id: "entendimiento", peso: 50, texto: "Que se canta también con el entendimiento: la adoración no apaga la mente.", formas: ["entendimiento", "entend*", "la mente", "comprend*", "sab* lo que (cantamos|cantan|canta|decimos)", "pens* lo que", "pens* en lo que"] },
                    { id: "une", peso: 50, texto: "Que la adoración une la mente y el corazón.", formas: ["une la mente", "unir la mente", "junta la mente", "mente y (el|al) corazon", "mente y corazon", "con el corazon", "de corazon"] },
                  ],
                  modelo: "Les explicaría que la adoración une la mente y el corazón. Por eso conviene cantar también con el entendimiento, sabiendo lo que decimos, y no solo de memoria.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre adorar con el corazón y con el entendimiento: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios se quejó de un pueblo que lo honraba solo de palabra.", verdad: true, explica: "Dios dijo: «este pueblo se acerca a mí con su boca, y con sus labios me honra, pero su corazón está lejos de mí».", apoyo: "Dios se quejó de un pueblo que lo honraba solo de palabra", ref: "Isaías 29:13" },
              { texto: "Para adorar de verdad hay que apagar la mente y dejarse llevar.", verdad: false, explica: "La adoración no apaga la mente ni el corazón: los une.", apoyo: "La adoración no apaga la mente ni el corazón: los une", ref: "1 Corintios 14:15" },
              { texto: "Pablo dice que cantará con el espíritu, y también con el entendimiento.", verdad: true, explica: "Pablo pide equilibrio: «cantaré con el espíritu, pero cantaré también con el entendimiento».", apoyo: "Pablo pide equilibrio: «cantaré con el espíritu, pero cantaré también con el entendimiento»", ref: "1 Corintios 14:15" },
            ],
          },
          {
            consigna: "Sobre la adoración que Dios recibe: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Si la letra dice la verdad, no importa que el corazón esté lejos de Dios.", verdad: false, explica: "Cantar la verdad sin el corazón no es adoración verdadera.", apoyo: "Cantar la verdad sin el corazón no es adoración verdadera", ref: "Isaías 29:13" },
              { texto: "La adoración es obra del Espíritu.", verdad: true, explica: "Pablo lo dice así: «sed llenos del Espíritu, hablando entre vosotros con salmos, con himnos y cánticos espirituales».", apoyo: "La adoración es obra del Espíritu", ref: "Efesios 5:18-19" },
              { texto: "Dios acepta la honra de labios, aunque el corazón esté lejos de él.", verdad: false, explica: "Dios rechaza la honra de labios sin el corazón.", apoyo: "Dios rechaza la honra de labios sin el corazón", ref: "Isaías 29:13" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Dios se quejó de un pueblo que lo honraba solo de palabra. ¿Qué estaba lejos de él? Toca las palabras que lo dicen.",
            texto: "con sus labios me honra, pero [[su corazón]] está lejos de mí",
            apoyo: "Dios se quejó de un pueblo que lo honraba solo de palabra: «este pueblo se acerca a mí con su boca, y con sus labios me honra, pero su corazón está lejos de mí»",
            ref: "Isaías 29:13",
            explica: "El pueblo honraba a Dios con los labios, pero su corazón estaba lejos de él: cantar la verdad sin el corazón no es adoración verdadera.",
          },
          {
            consigna: "Pablo pide equilibrio al cantar. Además de con el espíritu, ¿con qué cantará? Toca las palabras que lo dicen.",
            texto: "cantaré con el espíritu, pero cantaré también con [[el entendimiento]]",
            apoyo: "Pablo pide equilibrio: «cantaré con el espíritu, pero cantaré también con el entendimiento»",
            ref: "1 Corintios 14:15",
            explica: "Pablo cantará también con el entendimiento: la adoración no apaga la mente ni el corazón, los une.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Adorar en espíritu es adorar con el corazón, movidos por el Espíritu Santo; adorar en verdad es adorar conforme a quien Dios es, como se revela en su Palabra",
            ref: "Juan 4:24",
            clave: {
              id: "pr-alabanza-1-5-a7-1",
              tipo: "corta",
              pregunta: "Un músico del grupo dice que adorar en espíritu es dejarse llevar por la emoción, sin pensar en la letra. ¿Qué le explicas sobre las dos marcas de la adoración verdadera?",
              ideas: [
                { id: "espiritu", peso: 50, texto: "En espíritu es desde el interior, con el corazón, movidos por el Espíritu Santo.", formas: ["desde el interior", "(el|su|del|nuestro) interior", "con el corazon", "de corazon", "movid* por el espiritu", "espiritu santo"] },
                { id: "verdad", peso: 50, texto: "En verdad es conforme a quien Dios es, como se revela en su Palabra y en Cristo: la letra importa.", formas: ["conforme a quien dios es", "quien dios es", "se revela", "revel*", "su palabra", "la biblia", "en cristo", "la letra importa"] },
              ],
              modelo: "Le explico que adorar en espíritu es adorar desde el interior, con el corazón, movidos por el Espíritu Santo. Y adorar en verdad es hacerlo conforme a quien Dios es, como se revela en su Palabra y en Cristo; por eso la letra importa.",
            },
          },
          {
            apoyo: "En espíritu: desde el interior, con el corazón, movidos por el Espíritu Santo. En verdad: conforme a quien Dios es, como él se revela en su Palabra y en Cristo",
            ref: "Juan 4:24",
            clave: {
              id: "pr-alabanza-1-5-a7-2",
              tipo: "corta",
              pregunta: "Para un estudio con el grupo de alabanza, explica qué es adorar en espíritu y qué es adorar en verdad, según Juan 4:24.",
              ideas: [
                { id: "espiritu", peso: 50, texto: "Adorar en espíritu es adorar desde el interior, con el corazón, movidos por el Espíritu Santo.", formas: ["desde el interior", "(el|su|del|nuestro) interior", "con el corazon", "de corazon", "movid* por el espiritu", "espiritu santo"] },
                { id: "verdad", peso: 50, texto: "Adorar en verdad es adorar conforme a quien Dios es, como él se revela en su Palabra y en Cristo.", formas: ["conforme a quien dios es", "quien dios es", "se revela", "revel*", "su palabra", "la biblia", "en cristo"] },
              ],
              modelo: "Adorar en espíritu es adorar desde el interior, con el corazón, movidos por el Espíritu Santo. Adorar en verdad es adorar conforme a quien Dios es, como él se revela en su Palabra y en Cristo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La adoración de toda la vida y la del cielo
    "alabanza-1-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué ruega Pablo que presentemos a Dios?", reverso: "Nuestros cuerpos en sacrificio vivo, santo, agradable a Dios.", apoyo: "Pablo ruega «que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional»" },
              { frente: "¿Qué parte de la vida es adoración?", reverso: "Toda: lo que hacemos con el cuerpo, con el tiempo y con las decisiones.", apoyo: "Toda la vida es adoración: lo que hacemos con el cuerpo, con el tiempo y con las decisiones" },
              { frente: "Cuando se apagan los instrumentos, ¿dónde sigue la adoración?", reverso: "El lunes, en la casa, en el trabajo y en la calle.", apoyo: "sigue el lunes en la casa, en el trabajo y en la calle" },
              { frente: "¿Pueden ser adoración aun las cosas más sencillas, como comer o beber?", reverso: "Sí, si se hacen para la gloria de Dios.", apoyo: "Aun lo más sencillo puede ser adoración" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué tenía Israel cuando Dios rechazó su música?", reverso: "Fiestas, ofrendas y mucha música, pero vivía en la injusticia.", apoyo: "Israel tenía fiestas, ofrendas y mucha música, pero vivía en la injusticia" },
              { frente: "¿Qué resume Miqueas que Dios pide?", reverso: "Hacer justicia, amar misericordia y humillarse ante Dios.", apoyo: "Miqueas resume lo que Dios pide: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios»" },
              { frente: "¿Cómo termina la historia, según la lección?", reverso: "En adoración.", apoyo: "La historia termina en adoración" },
              { frente: "¿Qué ensaya la iglesia cada vez que adora?", reverso: "Lo que hará para siempre delante del trono.", apoyo: "Cada vez que la iglesia adora, con gente de distintos pueblos y lenguas, ensaya lo que hará para siempre delante del trono" },
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
            consigna: "Une cada lugar de la vida con la manera de adorar allí, según la lección.",
            pares: [
              ["En la casa", "Amar y servir a la familia"],
              ["En el trabajo", "Ser honesto y trabajar de corazón"],
              ["Con el prójimo", "Practicar la justicia y la misericordia"],
              ["Con el cuerpo", "Vivir en santidad"],
              ["Con el dinero", "Dar con generosidad y ayudar al necesitado"],
            ],
            apoyo: "En la casa: amar y servir a la familia",
            ref: "Romanos 12:1-2",
            explica: "Toda la vida es adoración: en la casa se ama y se sirve a la familia; en el trabajo, se es honesto; con el prójimo, se practica la justicia y la misericordia; con el cuerpo, se vive en santidad; y con el dinero, se da con generosidad.",
          },
          {
            consigna: "¿Dónde adora a Dios cada persona con sus actos? Une cada ejemplo con su lugar.",
            pares: [
              ["Atiende con amor a su esposa y a sus hijos", "En la casa"],
              ["Entrega su trabajo bien hecho, aunque nadie lo revise", "En el trabajo"],
              ["Defiende al vecino al que le hacen una injusticia", "Con el prójimo"],
              ["Da de su sueldo con generosidad al necesitado", "Con el dinero"],
            ],
            apoyo: "Con el prójimo: practicar la justicia y la misericordia",
            ref: "1 Corintios 10:31",
            explica: "El lunes también es día de culto: se adora amando y sirviendo a la familia, trabajando de corazón, practicando la justicia y la misericordia con el prójimo y ayudando al necesitado.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña Romanos 12 sobre la adoración.",
            texto: "Toda la vida es [[adoración]]: lo que hacemos con el [[cuerpo]] y con el [[tiempo]], y aun lo más sencillo.",
            distractores: ["rutina", "pasado", "domingo"],
            errores: {
              rutina: "Toda la vida es adoración: presentar el cuerpo en sacrificio vivo.",
              pasado: "Pablo ruega que presentemos nuestros cuerpos en sacrificio vivo, santo, agradable a Dios.",
              domingo: "La adoración no termina cuando se apagan los instrumentos: sigue el lunes.",
            },
            apoyo: "Toda la vida es adoración: lo que hacemos con el cuerpo, con el tiempo y con las decisiones",
            ref: "Romanos 12:1",
            explica: "Pablo ruega que presentemos nuestros cuerpos en sacrificio vivo: toda la vida es adoración, lo que hacemos con el cuerpo, con el tiempo y con las decisiones.",
          },
          {
            consigna: "Completa dónde sigue la adoración después del culto.",
            texto: "El culto del domingo dura unas [[horas]], pero la adoración sigue el [[lunes]] en la casa, en el [[trabajo]] y en la calle.",
            distractores: ["semanas", "olvido", "escenario"],
            errores: {
              semanas: "El culto del domingo dura unas horas.",
              olvido: "La adoración no termina cuando se apagan los instrumentos: sigue el lunes.",
              escenario: "La adoración sigue el lunes en la casa, en el trabajo y en la calle.",
            },
            apoyo: "El culto del domingo dura unas horas, pero la adoración no termina cuando se apagan los instrumentos: sigue el lunes en la casa, en el trabajo y en la calle",
            ref: "1 Corintios 10:31",
            explica: "La adoración no termina cuando se apagan los instrumentos: sigue el lunes en la casa, en el trabajo y en la calle. El lunes también es día de culto.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La alabanza del culto y la vida de la semana tienen que decir lo mismo",
            ref: "Miqueas 6:8",
            situacion: "Diriges el grupo de alabanza, y preparan un gran culto de fiesta con mucha música. Esa semana, una familia pobre de la iglesia se quedó sin comida.",
            escenas: [
              {
                id: "e1",
                narra: "En la reunión de preparación, todos hablan solo de luces, sonido y ensayos.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Ayudar también a la familia: Dios pide justicia y misericordia.", valor: 2, explica: "Miqueas resume lo que Dios pide: hacer justicia, amar misericordia y humillarse ante Dios.", siguiente: "e2" },
                  { texto: "Orar por la familia al final del ensayo, y seguir con lo del culto.", valor: 1, explica: "Orar es bueno, pero la alabanza del culto y la vida de la semana tienen que decir lo mismo.", siguiente: "e2" },
                  { texto: "Seguir con los ensayos: lo importante de esta semana es el culto.", valor: 0, explica: "Dios rechaza la música del culto cuando la vida niega la justicia y la misericordia.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El domingo, el culto sale perfecto, pero la familia no vino: no tenían ni para el transporte.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Visitas a la familia con el grupo y le llevan ayuda.", valor: 2, explica: "Con el dinero se adora dando con generosidad y ayudando al necesitado.", siguiente: "e2" },
                  { texto: "Te alegras del culto y piensas que eso es todo lo que Dios pide.", valor: 0, explica: "Dios pide hacer justicia y amar misericordia, no solo buena música.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un hermano te dice: Con tanta música, Dios tiene que estar contento con nosotros.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Dios rechaza la música si la vida niega la misericordia.", valor: 2, explica: "Dios rechaza la música del culto cuando la vida niega la justicia y la misericordia." },
                  { texto: "Que la música es buena, pero que también importa algo más.", valor: 1, explica: "Es cierto, pero conviene decirlo claro: Dios pide hacer justicia y amar misericordia." },
                  { texto: "Que sí: mientras haya mucha música, Dios está agradado con todo.", valor: 0, explica: "Israel tenía mucha música, pero vivía en la injusticia, y Dios rechazó sus cantares." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del mes, evalúan con el grupo la adoración de la iglesia.",
                pregunta: "¿Qué miran?",
                opciones: [
                  { texto: "Si la alabanza y la vida de la semana dicen lo mismo.", valor: 2, explica: "La alabanza del culto y la vida de la semana tienen que decir lo mismo." },
                  { texto: "Si la música salió bien y, si queda tiempo, lo demás.", valor: 1, explica: "La música importa, pero no es lo primero: la alabanza y la vida de la semana tienen que decir lo mismo." },
                  { texto: "Solo cuántas canciones nuevas aprendieron en todo el mes.", valor: 0, explica: "Dios pide hacer justicia y amar misericordia, no solo más canciones." },
                ],
              },
            ],
          },
          {
            apoyo: "Miqueas resume lo que Dios pide: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios»",
            ref: "Amós 5:21-24",
            situacion: "Tocas en el grupo de alabanza y trabajas en una tienda. El domingo te toca tocar en el culto.",
            escenas: [
              {
                id: "e1",
                narra: "El sábado, tu jefe te pide que les cobres de más a los clientes que no se fijan en los precios.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le dices con respeto que no lo harás, porque Dios pide justicia.", valor: 2, explica: "En el trabajo se adora siendo honesto: Dios pide hacer justicia.", siguiente: "e2" },
                  { texto: "No cobras de más, pero tampoco le dices nada a tu jefe del tema.", valor: 1, explica: "Bien que no lo haces: ser honesto en el trabajo también es adorar, y se puede decir con respeto.", siguiente: "e2" },
                  { texto: "Lo haces: el trabajo es una cosa y la alabanza del domingo es otra.", valor: 0, explica: "La alabanza del culto y la vida de la semana tienen que decir lo mismo.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El domingo, mientras tocas, te acuerdas de los clientes a los que les cobraste de más.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te humillas ante Dios y decides hacer justicia con ellos.", valor: 2, explica: "Dios pide hacer justicia, amar misericordia y humillarse ante él.", siguiente: "e2" },
                  { texto: "Tocas con más fuerza, para no pensar más en lo que hiciste.", valor: 0, explica: "Dios rechaza la música del culto cuando la vida niega la justicia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un compañero del grupo te dice: Lo de la tienda no importa; lo que Dios mira es cómo tocas el domingo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la alabanza y la vida de la semana dicen lo mismo.", valor: 2, explica: "La alabanza del culto y la vida de la semana tienen que decir lo mismo." },
                  { texto: "Que tiene razón: Dios solo mira lo que pasa dentro del culto.", valor: 0, explica: "Israel tenía mucha música, pero vivía en la injusticia, y Dios rechazó sus cantares." },
                  { texto: "Que lo importante es tocar bien, y que lo demás se arregla solo.", valor: 0, explica: "Dios pide hacer justicia y amar misericordia, no solo buena música." },
                ],
              },
              {
                id: "e3",
                narra: "Esa semana, en la tienda, entra un cliente que no sabe leer los precios.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le ayudas y le cobras lo justo, con misericordia.", valor: 2, explica: "Con el prójimo se adora practicando la justicia y la misericordia." },
                  { texto: "Le cobras lo justo, pero sin ayudarle a entender nada.", valor: 1, explica: "Cobrar lo justo está bien; Dios también pide amar misericordia." },
                  { texto: "Le cobras de más, porque igual nadie se va a enterar.", valor: 0, explica: "Dios pide hacer justicia: la vida de la semana tiene que decir lo mismo que la alabanza." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Miqueas resume lo que Dios pide. ¿Cuáles son las tres cosas? Toca las palabras que lo dicen.",
            texto: "solamente [[hacer justicia]], y [[amar misericordia]], y [[humillarte ante tu Dios]]",
            apoyo: "Miqueas resume lo que Dios pide: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios»",
            ref: "Miqueas 6:8",
            explica: "Dios pide «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios»: la alabanza del culto y la vida de la semana tienen que decir lo mismo.",
          },
          {
            consigna: "Israel tenía mucha música, pero vivía en la injusticia. ¿Qué quiere Dios que corra como las aguas y como impetuoso arroyo? Toca las palabras que lo dicen.",
            texto: "Pero corra [[el juicio]] como las aguas, y [[la justicia]] como impetuoso arroyo",
            apoyo: "Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo",
            ref: "Amós 5:24",
            explica: "Dios rechazó la multitud de cantares de un pueblo que vivía en la injusticia, y pidió que corriera el juicio como las aguas y la justicia como impetuoso arroyo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la adoración del cielo tiene un error. Tócala.",
            frases: [
              "La historia termina en adoración.",
              "En el cielo cantan un nuevo cántico al Cordero.",
              "Con su sangre, el Cordero redimió a gente de un solo pueblo.",
              "Toda la creación da la gloria al que está sentado en el trono y al Cordero.",
            ],
            malo: 2,
            correccion: "Con su sangre, el Cordero redimió para Dios a gente de todo linaje y lengua y pueblo y nación.",
            apoyo: "En el cielo cantan un nuevo cántico al Cordero: «con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación»",
            ref: "Apocalipsis 5:9-13",
            explica: "En el cielo cantan un nuevo cántico al Cordero, que con su sangre redimió para Dios a gente de todo linaje, lengua, pueblo y nación.",
          },
          {
            consigna: "Una de estas frases sobre la adoración que no termina tiene un error. Tócala.",
            frases: [
              "Cada vez que la iglesia adora, ensaya lo que hará para siempre.",
              "En la iglesia adora gente de distintos pueblos y lenguas.",
              "En el cielo, la adoración al Cordero termina después de un tiempo.",
              "Al Cordero se le da la gloria por los siglos de los siglos.",
            ],
            malo: 2,
            correccion: "La adoración del cielo no termina: al que está sentado en el trono y al Cordero sea la alabanza por los siglos de los siglos.",
            apoyo: "Cada vez que la iglesia adora, con gente de distintos pueblos y lenguas, ensaya lo que hará para siempre delante del trono",
            ref: "Apocalipsis 5:13",
            explica: "Toda la creación dice: «Al que está sentado en el trono, y al Cordero, sea la alabanza, la honra, la gloria y el poder, por los siglos de los siglos». Es la adoración que no termina.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La historia termina en la adoración eterna al Cordero, con gente de todo linaje, lengua, pueblo y nación",
            ref: "Apocalipsis 5:9-13",
            clave: {
              id: "pr-alabanza-1-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo termina la historia, según Apocalipsis 5, y quiénes adoran al Cordero?",
              ideas: [
                { id: "termina", peso: 50, texto: "La historia termina en adoración: en el cielo cantan un nuevo cántico al Cordero, por los siglos de los siglos.", formas: ["termina en adoracion", "nuevo cantico", "cantico nuevo", "por los siglos", "para siempre", "adoracion eterna", "eternamente"] },
                { id: "todos", peso: 50, texto: "Lo adoran los redimidos de todo linaje, lengua, pueblo y nación, y toda la creación.", formas: ["todo linaje", "toda lengua", "todo pueblo", "toda nacion", "todas las naciones", "toda la creacion", "todos los pueblos", "distintos pueblos"] },
              ],
              modelo: "La historia termina en adoración: en el cielo cantan un nuevo cántico al Cordero, que con su sangre nos redimió. Lo adoran personas de todo linaje, lengua, pueblo y nación, y toda la creación, por los siglos de los siglos.",
            },
          },
          {
            apoyo: "Cada vez que la iglesia adora, con gente de distintos pueblos y lenguas, ensaya lo que hará para siempre delante del trono",
            ref: "Apocalipsis 5:9-13",
            clave: {
              id: "pr-alabanza-1-6-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué la lección dice que cada culto de la iglesia es un ensayo para la eternidad?",
              ideas: [
                { id: "siempre", peso: 50, texto: "Porque cada vez que la iglesia adora, ensaya lo que hará para siempre delante del trono.", formas: ["para siempre", "delante del trono", "lo que hara", "lo que haremos", "en el cielo", "por los siglos"] },
                { id: "pueblos", peso: 50, texto: "Porque adora gente de distintos pueblos y lenguas, como los redimidos de todo linaje, lengua, pueblo y nación.", formas: ["distintos pueblos", "distintas lenguas", "todo linaje", "toda lengua", "toda nacion", "pueblos y lenguas", "todos los pueblos", "muchos pueblos"] },
              ],
              modelo: "Porque cada vez que la iglesia adora, con gente de distintos pueblos y lenguas, ensaya lo que hará para siempre delante del trono, cuando los redimidos de todo linaje, lengua, pueblo y nación adoren al Cordero.",
            },
          },
        ],
      },
    ],
  },
};
