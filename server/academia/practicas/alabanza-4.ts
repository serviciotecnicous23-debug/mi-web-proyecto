/**
 * Las prácticas de la materia `alabanza-4` (especialidad Alabanza y adoración): la música en la historia de la iglesia.
 * Hechas solo con lo que dice cada lección (server/academia/contenido/alabanza-4.ts), con la guía de
 * docs/academia-practicas.md.
 *
 * Cuidado doctrinal: el himno de la Cena y el de Filipenses 2 se practican con el matiz de la lección (la Biblia no dice
 * qué himno era; muchos estudiosos piensan). 1 Corintios 14:15-16 se usa solo como lo usa la lección (que la
 * adoración se entienda), sin nada sobre el don de lenguas. De la calle Azusa solo se practica lo que la lección dice
 * de su culto y de su alcance, sin tocar las lenguas ni otras doctrinas. Ninguna actividad dice qué estilo de música,
 * qué instrumentos o qué danza son bíblicos: solo lo que la lección afirma (la alabanza de Israel unía la voz, los
 * instrumentos y la danza; la letra importa más que el estilo; no despreciar lo antiguo ni lo nuevo). De María la
 * profetisa solo se pregunta lo que dice el pasaje, sin nada sobre el ministerio de la mujer hoy. Las cifras de himnos,
 * como en la lección, van sin números exactos (cientos, miles). La lección no trae puntos por confirmar.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_ALABANZA_4: PracticasMateria = {
  materia: "alabanza-4",
  mision: {
    titulo: "Generación a generación",
    intro:
      "Tu iglesia cumple aniversario, y el pastor te pidió preparar una noche de alabanza que recorra la historia del canto del pueblo de Dios: del cántico junto al mar Rojo a los himnos de los avivamientos y la alabanza de hoy. Vas a explicar de dónde viene cada canto, escoger cantos antiguos y nuevos probados por la Palabra y cuidar que todo el pueblo cante con entendimiento. Repasa las seis lecciones para tener lista cada parte.",
    cierre:
      "Ya conoces cómo ha cantado el pueblo de Dios: Israel cantó su salvación y también su dolor, la primera iglesia le cantó a Cristo, la Reforma devolvió el canto al pueblo en su lengua, los avivamientos dejaron himnos llenos de la Palabra y cada generación canta a Dios con su propia voz. Somos un eslabón: recibimos cantos y dejaremos cantos.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La música en el pueblo de Israel
    "alabanza-4-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde empieza la historia de la música de la iglesia?", reverso: "Mucho antes de la iglesia: en un pueblo que cantó a Dios después de ser librado.", apoyo: "La historia de la música de la iglesia empieza mucho antes de la iglesia: en un pueblo que cantó a Dios después de ser librado" },
              { frente: "¿Qué celebra el cántico de Moisés después del mar Rojo?", reverso: "La salvación: «Jehová es mi fortaleza y mi cántico, Y ha sido mi salvación».", apoyo: "Es uno de los primeros cánticos de la Biblia, y celebra la salvación" },
              { frente: "¿Qué unía la alabanza de Israel?", reverso: "La voz, los instrumentos y la danza.", apoyo: "La alabanza de Israel unía la voz, los instrumentos y la danza" },
              { frente: "¿Qué guardan también los salmos, además de la alabanza?", reverso: "Los cantos del dolor, como los del exilio en Babilonia.", apoyo: "Los salmos guardan también los cantos del dolor" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué canta el pueblo de Dios, según el cántico del mar Rojo?", reverso: "Porque Dios lo salvó.", apoyo: "El pueblo de Dios canta porque Dios lo salvó" },
              { frente: "¿A qué invita el último salmo, el Salmo 150?", reverso: "A alabar con todo: «Todo lo que respira alabe a JAH».", apoyo: "El último salmo es una invitación a alabar con todo" },
              { frente: "¿Qué músicos hubo en el templo de Israel?", reverso: "Músicos apartados y organizados para el templo.", apoyo: "Hubo músicos apartados y organizados para el templo" },
              { frente: "¿Qué hizo el pueblo con sus arpas en el exilio?", reverso: "Las colgó sobre los sauces, junto a los ríos de Babilonia.", apoyo: "«Sobre los sauces en medio de ella Colgamos nuestras arpas»" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En el cántico de Moisés, ¿qué es Jehová para su pueblo? Toca las tres palabras que lo dicen.",
            texto: "Jehová es mi [[fortaleza]] y mi [[cántico]], Y ha sido mi [[salvación]]",
            apoyo: "Es uno de los primeros cánticos de la Biblia, y celebra la salvación",
            ref: "Éxodo 15:2",
            explica: "El cántico de Moisés dice: «Jehová es mi fortaleza y mi cántico, Y ha sido mi salvación». Es uno de los primeros cánticos de la Biblia, y celebra la salvación.",
          },
          {
            consigna: "¿Qué tomó María la profetisa en su mano, y con qué salieron tras ella las mujeres? Toca las palabras que lo dicen.",
            texto: "tomó un [[pandero]] en su mano, y todas las mujeres salieron en pos de ella con [[panderos]] y [[danzas]]",
            apoyo: "La alabanza de Israel unía la voz, los instrumentos y la danza",
            ref: "Éxodo 15:20",
            explica: "María la profetisa «tomó un pandero en su mano, y todas las mujeres salieron en pos de ella con panderos y danzas»: la alabanza de Israel unía la voz, los instrumentos y la danza.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un canto de alabanza a Dios o un canto del dolor? Lleva cada frase a su grupo.",
            grupos: ["Alabanza a Dios", "Canto del dolor"],
            frases: [
              { texto: "Moisés y el pueblo cantan después de cruzar el mar Rojo", grupo: 0 },
              { texto: "María y las mujeres salen con panderos y danzas", grupo: 0 },
              { texto: "El último salmo invita a alabar con todo lo que respira", grupo: 0 },
              { texto: "Con Ezequías, vuelve el cántico de Jehová al templo", grupo: 0 },
              { texto: "El pueblo llora junto a los ríos de Babilonia", grupo: 1 },
              { texto: "En el exilio, cuelgan sus arpas sobre los sauces", grupo: 1 },
              { texto: "Lejos de su tierra, se preguntan cómo cantar a Jehová", grupo: 1 },
            ],
            apoyo: "También se cantaba el dolor, sin dejar de mirar a Dios",
            ref: "Salmos 137:1-4",
            explica: "Israel cantaba las obras de Dios, sobre todo su salvación: junto al mar, en los salmos y en el culto de Ezequías. Y los salmos guardan también los cantos del dolor, como los del exilio en Babilonia.",
          },
          {
            consigna: "¿Alaba a Dios o llora en el exilio? Lleva cada frase a su grupo.",
            grupos: ["Alaba a Dios", "Llora en el exilio"],
            frases: [
              { texto: "«Jehová es mi fortaleza y mi cántico»", grupo: 0 },
              { texto: "«Alabadle a son de bocina; Alabadle con salterio y arpa»", grupo: 0 },
              { texto: "«Todo lo que respira alabe a JAH»", grupo: 0 },
              { texto: "«toda la multitud adoraba, y los cantores cantaban»", grupo: 0 },
              { texto: "«Sobre los sauces en medio de ella Colgamos nuestras arpas»", grupo: 1 },
              { texto: "«¿Cómo cantaremos cántico de Jehová En tierra de extraños?»", grupo: 1 },
              { texto: "El pueblo lloraba junto a los ríos de Babilonia", grupo: 1 },
            ],
            apoyo: "Los salmos guardan también los cantos del dolor",
            ref: "Salmos 150:3-6",
            explica: "El cántico del mar Rojo, el Salmo 150 y el culto de Ezequías alaban a Dios; el Salmo 137 canta el dolor del exilio: «¿Cómo cantaremos cántico de Jehová En tierra de extraños?».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que pasó después de cruzar el mar Rojo.",
            texto: "Después de cruzar el mar Rojo, cantaron [[Moisés]] y el pueblo, y [[María]] con las mujeres, con panderos y [[danzas]].",
            distractores: ["Josué", "Ester", "lágrimas"],
            errores: {
              "Josué": "Después de cruzar el mar Rojo cantaron Moisés y los hijos de Israel.",
              Ester: "La que salió con las mujeres fue María la profetisa, hermana de Aarón.",
              "lágrimas": "Las mujeres salieron tras María con panderos y danzas: la alabanza de Israel unía la voz, los instrumentos y la danza.",
            },
            apoyo: "La música de la iglesia tiene raíces en Israel: después del mar Rojo cantaron Moisés y el pueblo, y María con las mujeres, con panderos y danzas",
            ref: "Éxodo 15:1-2",
            explica: "Después de cruzar el mar Rojo cantaron Moisés y los hijos de Israel, y María la profetisa con las mujeres, con panderos y danzas: así empieza la historia de la música del pueblo de Dios.",
          },
          {
            consigna: "Completa qué cantaron Moisés y María junto al mar.",
            texto: "Moisés y el pueblo cantaron la [[salvación]] de Dios junto al mar, y María, hermana de [[Aarón]], tomó un [[pandero]] en su mano.",
            distractores: ["ley", "Saúl", "espada"],
            errores: {
              ley: "El cántico del mar Rojo celebra la salvación: Jehová ha sido su salvación.",
              "Saúl": "María la profetisa era hermana de Aarón.",
              espada: "María tomó un pandero en su mano, y las mujeres salieron tras ella con panderos y danzas.",
            },
            apoyo: "Es uno de los primeros cánticos de la Biblia, y celebra la salvación",
            ref: "Éxodo 15:20-21",
            explica: "El cántico de Moisés celebra la salvación: «Jehová es mi fortaleza y mi cántico, Y ha sido mi salvación». Después, María, hermana de Aarón, tomó un pandero, y las mujeres salieron tras ella con panderos y danzas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena lo que pasó cuando el rey Ezequías restauró el culto, del primer hecho al último.",
            pasos: [
              "El templo y el culto pasan años de abandono",
              "El rey Ezequías purifica el templo",
              "Ezequías restaura el culto, y se ofrece el holocausto",
              "Comienza el cántico de Jehová, y toda la multitud adora",
            ],
            apoyo: "Después de años de abandono, el rey Ezequías purificó el templo y restauró el culto",
            ref: "2 Crónicas 29:27-28",
            explica: "Después de años de abandono, Ezequías purificó el templo y restauró el culto. Cuando se ofreció el holocausto, comenzó el cántico de Jehová y toda la multitud adoraba.",
          },
          {
            consigna: "¿Cómo volvió la alabanza en tiempos de Ezequías? Ordena los hechos, del primero al último.",
            pasos: [
              "Durante años, el culto del templo queda abandonado",
              "Ezequías limpia el templo de Jehová",
              "Se ofrece otra vez el holocausto en el culto restaurado",
              "Vuelve el cántico de Jehová con los instrumentos de David",
            ],
            apoyo: "Cuando el pueblo volvía a Dios, volvía la alabanza",
            ref: "2 Crónicas 29:27-28",
            explica: "Después de años de abandono, Ezequías purificó el templo y restauró el culto; cuando se ofreció el holocausto, comenzó el cántico de Jehová con las trompetas y los instrumentos de David: cuando el pueblo volvía a Dios, volvía la alabanza.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un músico de tu grupo de alabanza te dice: Desde que la iglesia se arrepintió y volvió a buscar a Dios, todos cantan como nunca. ¿Será casualidad?",
            pregunta: "¿Qué le respondes con la historia de Israel?",
            opciones: [
              { texto: "Que no es casualidad: en Israel, cuando el pueblo volvía a Dios, volvía la alabanza.", bien: true, explica: "Los avivamientos de Israel trajeron de vuelta la alabanza: con Ezequías, al restaurarse el culto, volvió el cántico de Jehová." },
              { texto: "Que sí lo es: la alabanza de una iglesia no tiene nada que ver con su vida con Dios.", explica: "La historia de Israel muestra lo contrario: cuando el pueblo volvía a Dios, volvía la alabanza." },
              { texto: "Que se debe solo a que ahora el grupo ensaya más y toca mucho mejor que antes.", explica: "Con Ezequías, el cántico de Jehová volvió cuando se restauró el culto: cuando el pueblo volvía a Dios, volvía la alabanza." },
              { texto: "Que el arrepentimiento no tiene que ver con el canto, y que pronto todo será como antes.", explica: "Los avivamientos de Israel trajeron de vuelta la alabanza: volver a Dios y volver a cantar van juntos." },
            ],
            apoyo: "Cuando el pueblo volvía a Dios, volvía la alabanza",
            ref: "2 Crónicas 29:27-28",
            explica: "Después de años de abandono, Ezequías restauró el culto, y volvió el cántico de Jehová: los avivamientos de Israel trajeron de vuelta la alabanza.",
          },
          {
            caso: "Una hermana del coro te dice: Por años nuestra iglesia casi no cantó, como un templo abandonado. ¿Qué podemos aprender de Ezequías?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Ezequías restauró el culto, y al volver el pueblo a Dios volvió el cántico de Jehová.", bien: true, explica: "Después de años de abandono, Ezequías purificó el templo y restauró el culto, y comenzó el cántico de Jehová." },
              { texto: "Que Ezequías solo cambió la música del templo, y con eso el pueblo volvió a cantar.", explica: "Ezequías purificó el templo y restauró el culto: cuando el pueblo volvía a Dios, volvía la alabanza." },
              { texto: "Que un culto que estuvo años abandonado ya no se puede restaurar, aunque se intente.", explica: "Después de años de abandono, Ezequías restauró el culto, y volvió el cántico de Jehová." },
              { texto: "Que en tiempos de Ezequías solo cantaban los cantores, mientras el pueblo miraba en silencio.", explica: "Cuando comenzó el cántico de Jehová, «toda la multitud adoraba, y los cantores cantaban»." },
            ],
            apoyo: "Los avivamientos trajeron de vuelta la alabanza",
            ref: "2 Crónicas 29:27-28",
            explica: "Después de años de abandono, el rey Ezequías purificó el templo y restauró el culto, y comenzó el cántico de Jehová: cuando el pueblo volvía a Dios, volvía la alabanza.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Israel cantaba las obras de Dios, sobre todo su salvación",
            ref: "Éxodo 15:1-2",
            clave: {
              id: "pr-alabanza-4-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué cantaba Israel, y cómo era su alabanza? Responde con lo que enseña la lección.",
              ideas: [
                { id: "obras", peso: 40, texto: "Israel cantaba las obras de Dios, sobre todo su salvación.", formas: ["obras de dios", "sus obras", "(la|su) salvacion", "(lo|los|nos|les) (salvo|libro)", "(fue|ser|haber) librado*", "(lo|los|nos|les) habia salvado"] },
                { id: "todos", peso: 30, texto: "Cantaba todo el pueblo, con voces, instrumentos y danza.", formas: ["todo el pueblo", "toda la (multitud|congregacion|gente)", "(cantaban|cantaba) todos", "todos cantaban", "voces instrumentos", "instrumentos danza*", "pandero* danza*"] },
                { id: "dolor", peso: 30, texto: "También cantaba el dolor, sin dejar de mirar a Dios.", formas: ["dolor", "tristeza*", "llor*", "llanto", "exilio", "sufrimiento*", "lament*"] },
              ],
              errores: [
                { id: "solo-musicos", texto: "Cantaba todo el pueblo, no solo los músicos.", formas: ["solo (los|unos) (musicos|cantores|levitas|sacerdotes)", "(cantaban|cantaba) solo (los|unos) (musicos|cantores|levitas|sacerdotes)"], anula: "todos" },
              ],
              modelo: "Israel cantaba las obras de Dios, sobre todo su salvación, como después del mar Rojo. Cantaba todo el pueblo, con voces, instrumentos y danza, y también cantaba su dolor, como en el exilio, sin dejar de mirar a Dios.",
            },
          },
          {
            apoyo: "El pueblo de Dios canta porque Dios lo salvó",
            ref: "Salmos 137:1-4",
            clave: {
              id: "pr-alabanza-4-1-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué canta el pueblo de Dios, según el cántico del mar Rojo, y qué otros cantos guardan los salmos?",
              ideas: [
                { id: "salvo", peso: 50, texto: "El pueblo de Dios canta porque Dios lo salvó.", formas: ["(lo|los|nos|les|la) (salvo|libro)", "salvacion", "(fue|ser|haber) librado*", "(lo|los|nos|les) habia salvado", "obras de dios"] },
                { id: "dolor", peso: 50, texto: "Los salmos guardan también los cantos del dolor, como los del exilio.", formas: ["dolor", "tristeza*", "llor*", "llanto", "exilio", "babilonia", "sufrimiento*", "lament*"] },
              ],
              errores: [
                { id: "solo-alegria", texto: "Los salmos guardan también los cantos del dolor.", formas: ["solo (cantos|canticos|canciones) (alegres|alegria|gozo)", "solo (alegria|gozo|fiesta)"], anula: "dolor" },
              ],
              modelo: "El pueblo de Dios canta porque Dios lo salvó, como Israel cuando cruzó el mar Rojo. Y los salmos guardan también los cantos del dolor, como los del exilio en Babilonia, sin dejar de mirar a Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Jesús y la iglesia de los primeros siglos
    "alabanza-4-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuándo cantó Jesús un himno con sus discípulos?", reverso: "La noche en que fue entregado, después de la Cena.", apoyo: "La noche en que fue entregado, después de la Cena, Jesús cantó con sus discípulos" },
              { frente: "¿Dice la Biblia qué himno cantaron Jesús y sus discípulos?", reverso: "No; muchos estudiosos piensan que eran salmos de los que se cantaban en la Pascua.", apoyo: "La Biblia no dice qué himno era; muchos estudiosos piensan que eran salmos de los que se cantaban en la Pascua" },
              { frente: "¿Qué muestran las cartas de Pablo sobre la iglesia?", reverso: "Una iglesia que canta salmos, himnos y cánticos espirituales.", apoyo: "Las cartas de Pablo muestran a una iglesia que canta" },
              { frente: "¿Qué hacían Pablo y Silas en la cárcel?", reverso: "Cantaban, aun en medio de la persecución.", apoyo: "Cantaban aun en la persecución, como Pablo y Silas en la cárcel (Hechos 16:25)" },
            ],
          },
          {
            tarjetas: [
              { frente: "Después de cantar el himno, ¿adónde salieron Jesús y sus discípulos?", reverso: "Al monte de los Olivos.", apoyo: "Jesús cantó un himno con sus discípulos antes de ir al monte de los Olivos" },
              { frente: "¿Qué cantaba la primera iglesia, además de los salmos de Israel?", reverso: "Cantos nuevos sobre Cristo y su obra.", apoyo: "Cantaban los salmos de Israel y también cantos nuevos sobre Cristo" },
              { frente: "¿Dónde se reunían los primeros cristianos?", reverso: "En las casas, y a veces antes del amanecer.", apoyo: "Se reunían en las casas, y a veces antes del amanecer" },
              { frente: "¿Por qué eran conocidos los primeros cristianos, aun por sus perseguidores?", reverso: "Porque cantaban a Cristo.", apoyo: "Y los primeros cristianos eran conocidos, incluso por sus perseguidores, porque cantaban a Cristo" },
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
            consigna: "Sobre cómo cantaban Jesús y los apóstoles: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Después de la Cena, Jesús cantó un himno con sus discípulos, y salieron al monte de los Olivos.", verdad: true, explica: "«Y cuando hubieron cantado el himno, salieron al monte de los Olivos».", apoyo: "La noche en que fue entregado, después de la Cena, Jesús cantó con sus discípulos", ref: "Mateo 26:30" },
              { texto: "La Biblia dice con exactitud qué himno cantó Jesús con sus discípulos esa noche.", verdad: false, explica: "La Biblia no dice qué himno era; muchos estudiosos piensan que eran salmos de los que se cantaban en la Pascua.", apoyo: "La Biblia no dice qué himno era", ref: "Mateo 26:30" },
              { texto: "Pablo y Silas dejaron de cantar cuando los metieron en la cárcel.", verdad: false, explica: "La primera iglesia cantaba aun en la persecución, como Pablo y Silas en la cárcel.", apoyo: "Cantaban aun en la persecución, como Pablo y Silas en la cárcel (Hechos 16:25)", ref: "Hechos 16:25" },
            ],
          },
          {
            consigna: "Sobre el canto de la primera iglesia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En sus cartas, Pablo habla de una iglesia que canta salmos, himnos y cánticos espirituales.", verdad: true, explica: "Pablo escribió: «hablando entre vosotros con salmos, con himnos y cánticos espirituales, cantando y alabando al Señor en vuestros corazones».", apoyo: "Las cartas de Pablo muestran a una iglesia que canta", ref: "Efesios 5:19" },
              { texto: "La primera iglesia dejó de cantar los salmos de Israel y solo cantaba cantos nuevos.", verdad: false, explica: "Cantaban los salmos de Israel y también cantos nuevos sobre Cristo.", apoyo: "Cantaban los salmos de Israel y también cantos nuevos sobre Cristo", ref: "Efesios 5:19" },
              { texto: "Los primeros cristianos se reunían en las casas, y a veces antes del amanecer.", verdad: true, explica: "Se reunían en las casas, y a veces antes del amanecer: Plinio contó que se reunían un día fijo antes del amanecer.", apoyo: "Se reunían en las casas, y a veces antes del amanecer" },
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
            consigna: "Completa quién escribió la carta y a quién.",
            texto: "Hacia el año 112, Plinio el Joven, gobernador [[romano]] de [[Bitinia]], le escribió al emperador [[Trajano]] sobre los cristianos que interrogaba.",
            distractores: ["griego", "Judea", "Herodes"],
            errores: {
              griego: "Plinio el Joven era el gobernador romano de Bitinia.",
              Judea: "Plinio era gobernador de Bitinia.",
              Herodes: "Plinio le escribió al emperador Trajano.",
            },
            apoyo: "Hacia el año 112, Plinio el Joven, gobernador romano de Bitinia, le escribió al emperador Trajano sobre los cristianos que interrogaba",
            explica: "Hacia el año 112, Plinio el Joven, gobernador romano de Bitinia, escribió al emperador Trajano sobre los cristianos que interrogaba. Es uno de los testimonios no cristianos más antiguos sobre la iglesia.",
          },
          {
            consigna: "Completa lo que Plinio le contó al emperador sobre los cristianos.",
            texto: "Plinio contó que los cristianos se reunían un día [[fijo]] antes del [[amanecer]] para cantar, a [[coros]], un himno a [[Cristo]] como a un dios.",
            distractores: ["cualquiera", "mediodía", "gritos", "César"],
            errores: {
              cualquiera: "Se reunían un día fijo.",
              "mediodía": "Se reunían antes del amanecer.",
              gritos: "Cantaban a coros un himno a Cristo.",
              "César": "Cantaban un himno a Cristo como a un dios: adoraban a Cristo con cantos.",
            },
            apoyo: "Le contó que se reunían un día fijo antes del amanecer para cantar, a coros, un himno a Cristo como a un dios",
            explica: "Plinio le contó a Trajano que los cristianos se reunían un día fijo antes del amanecer para cantar, a coros, un himno a Cristo como a un dios: adoraban a Cristo con cantos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué cuenta la carta de Plinio? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "plinio", texto: "Plinio el Joven", x: 50, y: 12 },
              { id: "trajano", texto: "Trajano, el emperador", x: 15, y: 50 },
              { id: "cristianos", texto: "Los cristianos", x: 85, y: 50 },
              { id: "himno", texto: "Un himno a Cristo", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "plinio", a: "trajano", relacion: "le escribió a" },
              { de: "plinio", a: "cristianos", relacion: "interrogaba a" },
              { de: "cristianos", a: "himno", relacion: "cantaban a coros" },
            ],
            distractores: ["se burlaban de", "nunca conoció a"],
            apoyo: "Es uno de los testimonios no cristianos más antiguos sobre la iglesia, y muestra que adoraban a Cristo con cantos",
            explica: "Plinio el Joven, que interrogaba a los cristianos, le escribió al emperador Trajano que se reunían antes del amanecer para cantar, a coros, un himno a Cristo como a un dios.",
          },
          {
            consigna: "¿Qué muestra el testimonio de Plinio? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "carta", texto: "La carta de Plinio", x: 50, y: 12 },
              { id: "cristianos", texto: "Los primeros cristianos", x: 50, y: 50 },
              { id: "amanecer", texto: "Antes del amanecer", x: 15, y: 88 },
              { id: "cristo", texto: "Cristo, como a un dios", x: 85, y: 88 },
            ],
            enlaces: [
              { de: "carta", a: "cristianos", relacion: "da testimonio de" },
              { de: "cristianos", a: "amanecer", relacion: "se reunían" },
              { de: "cristianos", a: "cristo", relacion: "cantaban un himno a" },
            ],
            distractores: ["cantaban contra", "se olvidaban de"],
            apoyo: "Le contó que se reunían un día fijo antes del amanecer para cantar, a coros, un himno a Cristo como a un dios",
            explica: "La carta de Plinio da testimonio de que los cristianos se reunían un día fijo antes del amanecer para cantar un himno a Cristo como a un dios. Es uno de los testimonios no cristianos más antiguos sobre la iglesia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Muchos estudiosos piensan que Filipenses 2:6-11 era un himno sobre Cristo. ¿Qué confiesa toda lengua al final? Toca las palabras que lo dicen.",
            texto: "y toda lengua confiese que [[Jesucristo es el Señor]], para gloria de Dios Padre",
            apoyo: "Muchos estudiosos piensan que Filipenses 2:6-11 era un himno que los primeros cristianos cantaban sobre Cristo",
            ref: "Filipenses 2:11",
            explica: "Muchos estudiosos ven en Filipenses 2:6-11 un himno sobre Cristo, que se humilló hasta la cruz y fue exaltado, y que termina: «y toda lengua confiese que Jesucristo es el Señor, para gloria de Dios Padre».",
          },
          {
            consigna: "Las cartas de Pablo muestran a una iglesia que canta. ¿Con qué cantos hablaban entre ellos? Toca las palabras que lo dicen.",
            texto: "hablando entre vosotros con [[salmos]], con [[himnos]] y [[cánticos espirituales]], cantando y alabando al Señor en vuestros corazones",
            apoyo: "Cantaban los salmos de Israel y también cantos nuevos sobre Cristo",
            ref: "Efesios 5:19",
            explica: "Pablo escribió: «hablando entre vosotros con salmos, con himnos y cánticos espirituales». Cantaban los salmos de Israel y también cantos nuevos sobre Cristo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "El líder de alabanza de los jóvenes te dice: En el barrio nos critican mucho por ser cristianos. ¿Dejamos de cantar en las reuniones hasta que se calmen las cosas?",
            pregunta: "¿Qué le respondes con lo que enseña la lección?",
            opciones: [
              { texto: "Que sigan: la primera iglesia cantaba aun en la persecución, como Pablo y Silas.", bien: true, explica: "Cantaban aun en la persecución, como Pablo y Silas en la cárcel (Hechos 16:25)." },
              { texto: "Que sí: los primeros cristianos se escondían y nunca cantaban cuando los perseguían.", explica: "Al contrario: cantaban aun en la persecución, y eran conocidos, incluso por sus perseguidores, porque cantaban a Cristo." },
              { texto: "Que canten, pero solo salmos de Israel, porque los himnos sobre Cristo traen problemas.", explica: "La primera iglesia cantaba los salmos de Israel y también himnos nuevos sobre Cristo." },
              { texto: "Que suspendan todo hasta que el barrio los acepte, porque cantar no es parte del culto.", explica: "Las cartas de Pablo muestran a una iglesia que canta: cantar es parte de la vida de la iglesia." },
            ],
            apoyo: "Cantaban aun en la persecución, como Pablo y Silas en la cárcel (Hechos 16:25)",
            ref: "Hechos 16:25",
            explica: "La primera iglesia cantaba aun en la persecución, como Pablo y Silas en la cárcel. Los primeros cristianos eran conocidos, incluso por sus perseguidores, porque cantaban a Cristo.",
          },
          {
            caso: "Un joven del grupo de alabanza te dice: Jesús enseñaba y oraba, pero cantar no es algo que él hiciera.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que después de la Cena, la noche en que fue entregado, Jesús cantó un himno.", bien: true, explica: "«Y cuando hubieron cantado el himno, salieron al monte de los Olivos»." },
              { texto: "Que tiene razón: los evangelios nunca cuentan que Jesús cantara con sus discípulos.", explica: "Mateo 26:30 cuenta que Jesús cantó un himno con sus discípulos antes de salir al monte de los Olivos." },
              { texto: "Que Jesús cantó, y que la Biblia dice que cantó el Salmo 23 en el monte de los Olivos.", explica: "La Biblia no dice qué himno era; muchos estudiosos piensan que eran salmos de los que se cantaban en la Pascua." },
              { texto: "Que Jesús solo cantó de niño en la sinagoga, y que como Maestro ya no cantaba más.", explica: "La noche en que fue entregado, después de la Cena, Jesús cantó con sus discípulos." },
            ],
            apoyo: "La noche en que fue entregado, después de la Cena, Jesús cantó con sus discípulos",
            ref: "Mateo 26:30",
            explica: "«Y cuando hubieron cantado el himno, salieron al monte de los Olivos». La Biblia no dice qué himno era; muchos estudiosos piensan que eran salmos de los que se cantaban en la Pascua.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Cantaban los salmos de Israel y también cantos nuevos sobre Cristo",
            ref: "Efesios 5:19",
            clave: {
              id: "pr-alabanza-4-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué cantos sobre Cristo muestra el Nuevo Testamento? Di lo que enseña la lección de Efesios 5:19 y de Filipenses 2.",
              ideas: [
                { id: "efesios", peso: 50, texto: "La iglesia cantaba salmos, himnos y cánticos espirituales: los salmos de Israel y también cantos nuevos sobre Cristo.", formas: ["cantos nuevos", "himnos nuevos", "canticos espirituales", "salmos himnos", "himnos canticos", "(cantos|himnos|canticos) sobre (cristo|jesus|senor)"] },
                { id: "filipenses", peso: 50, texto: "Muchos estudiosos piensan que Filipenses 2:6-11 era un himno sobre Cristo, que se humilló hasta la cruz y fue exaltado.", formas: ["humill*", "exaltad*", "exalto", "toda lengua", "jesucristo es el senor", "hasta la cruz"] },
              ],
              modelo: "En Efesios 5:19, la iglesia canta salmos, himnos y cánticos espirituales: los salmos de Israel y también cantos nuevos sobre Cristo. Y muchos estudiosos piensan que Filipenses 2:6-11 era un himno sobre Cristo, que se humilló hasta la cruz y fue exaltado.",
            },
          },
          {
            apoyo: "Los primeros cristianos eran conocidos por cantarle a Cristo",
            ref: "Filipenses 2:10-11",
            clave: {
              id: "pr-alabanza-4-2-a7-2",
              tipo: "corta",
              pregunta: "¿Desde cuándo le cantan los cristianos a Cristo? Muéstralo con el Nuevo Testamento y con la carta de Plinio.",
              ideas: [
                { id: "nt", peso: 50, texto: "En el Nuevo Testamento ya hay cantos sobre Cristo: cantos nuevos sobre Cristo y el himno que muchos ven en Filipenses 2.", formas: ["cantos nuevos", "himnos nuevos", "filipenses", "humill*", "exaltad*", "canticos espirituales", "salmos himnos", "(cantos|himnos|canticos) sobre (cristo|jesus|senor)"] },
                { id: "plinio", peso: 50, texto: "Hacia el año 112, Plinio contó que los cristianos se reunían para cantar un himno a Cristo como a un dios.", formas: ["plinio", "112", "trajano", "como a un dios", "antes del amanecer", "a coros", "bitinia"] },
              ],
              errores: [
                { id: "no-cantaban", texto: "Plinio contó que se reunían para cantar, a coros, un himno a Cristo como a un dios.", formas: ["no cantaban", "nunca cantaban", "dejaron de cantar"], anula: "plinio" },
              ],
              modelo: "Desde el principio: en el Nuevo Testamento la iglesia ya cantaba cantos nuevos sobre Cristo, y muchos ven un himno en Filipenses 2. Y hacia el año 112, Plinio contó que los cristianos se reunían antes del amanecer para cantar un himno a Cristo como a un dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La iglesia antigua y la Edad Media
    "alabanza-4-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Para qué escribió himnos Ambrosio, obispo de Milán?", reverso: "Para que el pueblo cantara.", apoyo: "En el siglo IV, Ambrosio, obispo de Milán, escribió himnos para que el pueblo cantara" },
              { frente: "¿Qué le pasó a Agustín al oír los himnos de la iglesia de Milán?", reverso: "Recién convertido, lloró de emoción.", apoyo: "Agustín de Hipona cuenta en sus Confesiones que, recién convertido, lloró de emoción al oír los himnos y los cantos de la iglesia de Milán" },
              { frente: "¿Qué pedía la Regla de san Benito?", reverso: "Cantar los 150 salmos cada semana.", apoyo: "La Regla de san Benito, del siglo VI, pedía cantar los 150 salmos cada semana" },
              { frente: "¿Qué es el canto llano?", reverso: "Una melodía sin acompañamiento, que también se llama canto gregoriano.", apoyo: "Así nació el canto llano, una melodía sin acompañamiento que la tradición asocia con el papa Gregorio Magno (590-604), y por eso se lo llama canto gregoriano" },
            ],
          },
          {
            tarjetas: [
              { frente: "Con el tiempo, ¿en qué lengua se celebró el culto de la iglesia de Occidente?", reverso: "En latín, una lengua que la mayoría del pueblo ya no entendía.", apoyo: "Con el tiempo, el culto de la iglesia de Occidente se celebró en latín, una lengua que la mayoría del pueblo ya no entendía" },
              { frente: "¿En manos de quiénes quedó sobre todo el canto?", reverso: "De los clérigos, los monjes y los coros.", apoyo: "el canto quedó sobre todo en manos de los clérigos, los monjes y los coros" },
              { frente: "¿Qué ocupaba el día en los monasterios?", reverso: "El canto de los salmos.", apoyo: "En los monasterios, el canto de los salmos ocupaba el día" },
              { frente: "¿Con quién asocia la tradición el canto llano?", reverso: "Con el papa Gregorio Magno, y por eso se lo llama canto gregoriano.", apoyo: "Así nació el canto llano, una melodía sin acompañamiento que la tradición asocia con el papa Gregorio Magno (590-604), y por eso se lo llama canto gregoriano" },
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
            consigna: "Une a cada uno con lo que dice la lección de él.",
            pares: [
              ["Ambrosio, obispo de Milán", "Escribió himnos para que el pueblo cantara"],
              ["Agustín de Hipona", "Lloró de emoción al oír los himnos de Milán"],
              ["La Regla de san Benito", "Pedía cantar los 150 salmos cada semana"],
              ["El papa Gregorio Magno", "La tradición asocia con él el canto llano"],
            ],
            apoyo: "En el siglo IV, Ambrosio escribió himnos para el pueblo, y Agustín lloró al oírlos en Milán",
            explica: "Ambrosio escribió himnos para que el pueblo cantara, y Agustín lloró al oírlos en Milán. La Regla de san Benito pedía cantar los 150 salmos cada semana, y la tradición asocia el canto llano con Gregorio Magno.",
          },
          {
            consigna: "Une cada nombre con lo que dice la lección de él.",
            pares: [
              ["Milán", "La iglesia donde Agustín oyó los himnos y los cantos"],
              ["Las Confesiones", "El libro donde Agustín cuenta que lloró de emoción"],
              ["Los monasterios", "Donde el canto de los salmos ocupaba el día"],
              ["El canto gregoriano", "Otro nombre del canto llano"],
              ["El latín", "La lengua del culto que el pueblo ya no entendía"],
            ],
            apoyo: "Los monasterios guardaron el canto de los salmos",
            explica: "En Milán, Agustín oyó los himnos y lo contó en sus Confesiones; en los monasterios, el canto de los salmos ocupaba el día; el canto llano también se llama gregoriano; y el latín fue la lengua del culto que el pueblo ya no entendía.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que pedía la Regla de san Benito y cómo nació el canto llano.",
            texto: "En los monasterios se cantaban los 150 [[salmos]] cada [[semana]], y así nació el canto [[llano]], una [[melodía]] sin acompañamiento.",
            distractores: ["himnos", "año", "moderno", "orquesta"],
            errores: {
              himnos: "La Regla de san Benito pedía cantar los 150 salmos cada semana.",
              "año": "La Regla pedía cantar los 150 salmos cada semana.",
              moderno: "Así nació el canto llano, que también se llama gregoriano.",
              orquesta: "El canto llano es una melodía sin acompañamiento.",
            },
            apoyo: "La Regla de san Benito, del siglo VI, pedía cantar los 150 salmos cada semana",
            explica: "En los monasterios, el canto de los salmos ocupaba el día: la Regla de san Benito pedía cantar los 150 salmos cada semana. Así nació el canto llano, una melodía sin acompañamiento.",
          },
          {
            consigna: "Completa lo que hizo Ambrosio.",
            texto: "En el siglo IV, [[Ambrosio]], obispo de [[Milán]], escribió himnos para que el [[pueblo]] cantara.",
            distractores: ["Gregorio", "Roma", "coro"],
            errores: {
              Gregorio: "Gregorio Magno fue papa entre 590 y 604; el obispo de Milán que escribió himnos en el siglo IV fue Ambrosio.",
              Roma: "Ambrosio era obispo de Milán.",
              coro: "Ambrosio escribió himnos para que el pueblo cantara.",
            },
            apoyo: "Ambrosio escribió himnos para que el pueblo cantara",
            explica: "En el siglo IV, Ambrosio, obispo de Milán, escribió himnos para que el pueblo cantara, y Agustín lloró de emoción al oírlos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre por qué el pueblo dejó de cantar tiene un error. Tócala.",
            frases: [
              "Con el tiempo, el culto de la iglesia de Occidente se celebró en latín.",
              "La mayoría del pueblo ya no entendía el latín.",
              "El canto quedó sobre todo en manos de la congregación.",
              "El pueblo fue quedando como espectador.",
            ],
            malo: 2,
            correccion: "El canto quedó sobre todo en manos de los clérigos, los monjes y los coros, y el pueblo fue quedando como espectador.",
            apoyo: "el canto quedó sobre todo en manos de los clérigos, los monjes y los coros",
            explica: "El culto se celebró en latín, una lengua que la mayoría del pueblo ya no entendía; el canto quedó en manos de los clérigos, los monjes y los coros, y el pueblo fue quedando como espectador.",
          },
          {
            consigna: "Una de estas frases sobre lo que advirtió Pablo tiene un error. Tócala.",
            frases: [
              "Pablo ya había advertido el problema de bendecir en una lengua que no se entiende.",
              "Si el oyente no entiende, no sabe lo que se ha dicho.",
              "Aun sin entender, el oyente puede decir el amén con todo el corazón.",
              "La adoración tiene que poder entenderse para que todo el pueblo participe.",
            ],
            malo: 2,
            correccion: "Sin entender, el oyente no puede decir el amén: «¿cómo dirá el Amén a tu acción de gracias? pues no sabe lo que has dicho».",
            apoyo: "La adoración tiene que poder entenderse para que todo el pueblo participe",
            ref: "1 Corintios 14:16",
            explica: "Pablo advirtió que si se bendice en una lengua que el oyente no entiende, «¿cómo dirá el Amén a tu acción de gracias? pues no sabe lo que has dicho». La adoración tiene que poder entenderse.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Una iglesia puede tener una música hermosa y un pueblo que no canta",
            ref: "1 Corintios 14:16",
            titulo: "Un culto hermoso y una iglesia callada",
            relato: [
              "Eres el nuevo director de alabanza de tu iglesia. El coro canta muy bien, con piezas difíciles y hermosas, muchas de ellas en inglés.",
              "Pero el domingo miras a la congregación y casi nadie canta: muchos solo miran al coro, como si fuera un concierto.",
              "Al salir, un hermano mayor te dice: Ya no canto, porque no conozco esos cantos ni entiendo lo que dicen.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "A la luz de la historia de la Edad Media, ¿qué está pasando en tu iglesia?",
                opciones: [
                  { texto: "Hay una música hermosa, pero el pueblo va quedando como espectador.", bien: true, explica: "Así pasó en la Edad Media: el canto quedó en manos de los clérigos, los monjes y los coros, y el pueblo fue quedando como espectador." },
                  { texto: "Todo está bien, porque lo único importante es que el coro cante con excelencia.", explica: "Una iglesia puede tener una música hermosa y un pueblo que no canta: la adoración es de todo el pueblo." },
                  { texto: "Es un problema de los mayores, que ya no quieren aprender nada nuevo.", explica: "El hermano no canta porque no conoce los cantos ni entiende lo que dicen: el pueblo va quedando como espectador." },
                ],
                apoyo: "El pueblo fue quedando como espectador",
                explica: "Con el tiempo, el canto quedó en manos de los clérigos, los monjes y los coros, y el pueblo fue quedando como espectador. Lo mismo puede pasar hoy.",
              },
              {
                tipo: "situacion",
                pregunta: "El hermano dice que no entiende lo que se canta. ¿Qué había advertido Pablo sobre eso?",
                opciones: [
                  { texto: "Que si el oyente no entiende, no puede decir el amén.", bien: true, explica: "«¿cómo dirá el Amén a tu acción de gracias? pues no sabe lo que has dicho»." },
                  { texto: "Que entender no importa, si la música es hermosa y bien cantada.", explica: "La adoración tiene que poder entenderse para que todo el pueblo participe." },
                  { texto: "Que el pueblo debe escuchar en silencio lo que cantan los que saben.", explica: "Pablo advirtió que sin entender nadie puede decir el amén: la adoración es de todo el pueblo." },
                ],
                apoyo: "La adoración tiene que poder entenderse para que todo el pueblo participe",
                explica: "Pablo advirtió: si se bendice en una lengua que el oyente no entiende, «¿cómo dirá el Amén a tu acción de gracias? pues no sabe lo que has dicho».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué decides hacer con el coro?",
                opciones: [
                  { texto: "Mantenerlo, pero con cantos que todo el pueblo entienda y pueda cantar.", bien: true, explica: "El cuidado de la música es una riqueza, pero la adoración es de todo el pueblo: tiene que poder entenderse para que todos participen." },
                  { texto: "Quitar el coro, porque los coros tienen la culpa de que el pueblo se quedara callado.", explica: "La lección no es despreciar el pasado, sino recordar que la adoración es de todo el pueblo: el cuidado de la música también es una riqueza." },
                  { texto: "Dejar todo igual, y pedirle a la congregación que escuche con más reverencia.", explica: "Si todo sigue igual, el pueblo sigue como espectador: la adoración tiene que poder entenderse para que todos participen." },
                ],
                apoyo: "La lección no es despreciar el pasado, sino recordar que la adoración es de todo el pueblo",
                explica: "El cuidado de la música es una riqueza, pero la adoración es de todo el pueblo: tiene que poder entenderse para que todos participen.",
              },
              {
                tipo: "explica",
                apoyo: "La adoración tiene que poder entenderse para que todo el pueblo participe",
                clave: {
                  id: "pr-alabanza-4-3-a5-1",
                  tipo: "corta",
                  pregunta: "¿Por qué es importante que la congregación entienda lo que se canta? Usa lo que advirtió Pablo.",
                  ideas: [
                    { id: "amen", peso: 50, negativa: true, texto: "Si el oyente no entiende, no puede decir el amén: no sabe lo que se ha dicho.", formas: ["decir* amen", "dira amen", "dice amen", "responder amen", "no (sabe|saben|sabemos) lo que (se|has|ha|han|esta|estan)", "no (entiende|entienden|entendemos) lo que (se|has|ha|esta|estan)"] },
                    { id: "participe", peso: 50, texto: "La adoración tiene que poder entenderse para que todo el pueblo participe.", formas: ["todo el pueblo", "toda la (iglesia|congregacion)", "particip*", "nadie particip*", "no (puede|pueden) particip*", "no particip*", "todos (canten|cantemos|participen|adoren)", "(pueda|puedan|podamos) (cantar|adorar|participar)", "espectador*"] },
                  ],
                  errores: [
                    { id: "sin-entender", texto: "Sin entender, el oyente no puede decir el amén.", formas: ["aunque no (entienda|entiendan|entiende|entienden|entendamos)", "no (hace|importa) falta entender", "no importa entender", "no importa (si|que) (entienda|entiendan|entiende|entienden)"], anula: "amen" },
                  ],
                  modelo: "Porque Pablo advirtió que si el oyente no entiende, no puede decir el amén: no sabe lo que se ha dicho. La adoración tiene que poder entenderse para que todo el pueblo participe y no quede como espectador.",
                },
              },
            ],
          },
          {
            apoyo: "Esos siglos también dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos",
            ref: "1 Corintios 14:16",
            titulo: "El salmo en latín",
            relato: [
              "Diana dirige el coro de tu iglesia y ama la música antigua. Para un culto especial, quiere que el coro cante un salmo en canto gregoriano, en latín.",
              "Tú diriges el ministerio de alabanza, y casi toda la congregación habla solo español.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le reconoces primero a Diana sobre la música de esos siglos?",
                opciones: [
                  { texto: "Que esos siglos dejaron riquezas, como el amor por los salmos.", bien: true, explica: "Esos siglos dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando." },
                  { texto: "Que de esos siglos no queda nada bueno, y que es mejor olvidarlo todo.", explica: "La lección no es despreciar el pasado: esos siglos también dejaron riquezas." },
                  { texto: "Que el canto gregoriano nació en el siglo XX, junto con los coros.", explica: "El canto llano nació en los monasterios, y la tradición lo asocia con el papa Gregorio Magno (590-604)." },
                ],
                apoyo: "Esos siglos también dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos",
                explica: "Esos siglos dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos. La lección no es despreciar el pasado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pasó en la Edad Media cuando el culto se celebró en latín, una lengua que el pueblo ya no entendía?",
                opciones: [
                  { texto: "El canto quedó en manos de los clérigos, los monjes y los coros, y el pueblo calló.", bien: true, explica: "El pueblo, que no entendía el latín, fue cantando cada vez menos, y fue quedando como espectador." },
                  { texto: "El pueblo aprendió el latín muy rápido, y cantó más que en ningún otro tiempo de la historia.", explica: "La mayoría del pueblo ya no entendía el latín, y fue cantando cada vez menos." },
                  { texto: "Nada cambió en la iglesia, porque entender lo que se canta no tiene ninguna importancia.", explica: "La adoración tiene que poder entenderse para que todo el pueblo participe." },
                ],
                apoyo: "El pueblo, que no entendía el latín, fue cantando cada vez menos",
                explica: "Con el tiempo, el culto se celebró en latín, que la mayoría del pueblo ya no entendía; el canto quedó en manos de los clérigos, los monjes y los coros, y el pueblo fue quedando como espectador.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le propones a Diana para el culto especial?",
                opciones: [
                  { texto: "Que el coro cante el salmo traducido, para que todos lo entiendan.", bien: true, explica: "Los himnos antiguos se siguen cantando traducidos: así se guarda la riqueza y la adoración se entiende." },
                  { texto: "Que lo cante en latín sin explicar nada, porque así suena más hermoso.", explica: "Si el oyente no entiende, no puede decir el amén: la adoración tiene que poder entenderse." },
                  { texto: "Que deje la música antigua y no vuelva a proponer nada de esos siglos.", explica: "La lección no es despreciar el pasado: esos siglos dejaron riquezas." },
                ],
                apoyo: "La adoración tiene que poder entenderse para que todo el pueblo participe",
                explica: "Los himnos antiguos se siguen cantando traducidos: así se guarda la riqueza del pasado y la adoración se entiende, para que todo el pueblo participe.",
              },
              {
                tipo: "explica",
                apoyo: "La lección no es despreciar el pasado, sino recordar que la adoración es de todo el pueblo",
                clave: {
                  id: "pr-alabanza-4-3-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué le explicarás a Diana para que el coro cuide la música antigua sin dejar al pueblo como espectador?",
                  ideas: [
                    { id: "riquezas", peso: 40, texto: "Que la música de esos siglos es una riqueza: el amor por los salmos, el cuidado de la música y los himnos antiguos.", formas: ["riqueza*", "amor por los salmos", "cuidado de la musica", "himnos antiguos", "(vale|valen|valor|valioso|valiosa|tesoro)"] },
                    { id: "entender", peso: 30, texto: "Que la adoración tiene que poder entenderse, como advirtió Pablo.", formas: ["entend*", "amen", "traduc*", "en (su|nuestra) lengua", "en espanol"] },
                    { id: "pueblo", peso: 30, texto: "Que la adoración es de todo el pueblo.", formas: ["todo el pueblo", "toda la (iglesia|congregacion)", "todos (canten|cantemos|participen|adoren)", "particip*"] },
                  ],
                  errores: [
                    { id: "latin", texto: "Si el pueblo no entiende, no puede decir el amén: la adoración tiene que poder entenderse.", formas: ["no (hace|importa) falta entender", "no importa entender", "aunque no (entienda|entiendan|entiende|entienden)"], anula: "entender" },
                  ],
                  modelo: "Le explicaré que esa música es una riqueza, como el amor por los salmos y los himnos antiguos. Pero la adoración tiene que poder entenderse, como advirtió Pablo: por eso cantaremos el salmo traducido, porque la adoración es de todo el pueblo.",
                },
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
            consigna: "¿Es una riqueza que dejaron esos siglos o algo que dejó callado al pueblo? Lleva cada frase a su grupo.",
            grupos: ["Una riqueza que nos dejaron", "Lo que dejó callado al pueblo"],
            frases: [
              { texto: "El amor por los salmos", grupo: 0 },
              { texto: "El cuidado de la música", grupo: 0 },
              { texto: "Himnos antiguos que se siguen cantando traducidos", grupo: 0 },
              { texto: "Los himnos que Ambrosio escribió para el pueblo", grupo: 0 },
              { texto: "Un culto en latín que el pueblo no entendía", grupo: 1 },
              { texto: "Un canto solo en manos de clérigos, monjes y coros", grupo: 1 },
              { texto: "Un pueblo que solo escuchaba, como espectador", grupo: 1 },
            ],
            apoyo: "Esos siglos también dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos",
            explica: "Esos siglos dejaron riquezas, como el amor por los salmos, el cuidado de la música y himnos antiguos. Pero el culto en latín, con el canto en manos de clérigos, monjes y coros, dejó al pueblo como espectador.",
          },
          {
            consigna: "¿Vale la pena guardarlo de esos siglos o no debe repetirse hoy? Lleva cada frase a su grupo.",
            grupos: ["Vale la pena guardarlo", "No debe repetirse hoy"],
            frases: [
              { texto: "Amar los salmos y cantarlos", grupo: 0 },
              { texto: "Cuidar bien la música de la iglesia", grupo: 0 },
              { texto: "Cantar himnos antiguos traducidos a nuestra lengua", grupo: 0 },
              { texto: "Cantar en una lengua que la congregación no entiende", grupo: 1 },
              { texto: "Dejar el canto solo en manos de los músicos y el coro", grupo: 1 },
              { texto: "Tener a la congregación como espectadora", grupo: 1 },
            ],
            apoyo: "La lección no es despreciar el pasado, sino recordar que la adoración es de todo el pueblo",
            explica: "La lección no es despreciar el pasado: el amor por los salmos, el cuidado de la música y los himnos antiguos son riquezas. Lo que no debe repetirse es un pueblo que no entiende y solo escucha.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Esos siglos también dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos",
            ref: "1 Corintios 14:16",
            clave: {
              id: "pr-alabanza-4-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué riquezas dejaron a la iglesia los siglos antiguos y medievales, y cuál es la lección para hoy?",
              ideas: [
                { id: "riquezas", peso: 40, texto: "Dejaron el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos.", formas: ["amor por los salmos", "cuidado de la musica", "cuid* la musica", "himnos antiguos", "traducid*", "canto de los salmos", "canto llano", "gregoriano"] },
                { id: "pasado", peso: 30, texto: "La lección no es despreciar el pasado.", formas: ["no despreci*", "sin despreci*", "valor* el pasado", "aprecia* el pasado", "respet* el pasado"] },
                { id: "pueblo", peso: 30, texto: "La adoración es de todo el pueblo.", formas: ["de todo el pueblo", "todo el pueblo", "toda la (iglesia|congregacion)", "todos (cantemos|canten|participen|adoren)", "no (solo|solamente) (el|los) (coro|coros|musicos|clerigos)"] },
              ],
              errores: [
                { id: "despreciar", texto: "La lección no es despreciar el pasado.", formas: ["hay que (despreciar|olvidar|dejar) pasado", "(despreciar|olvidar|desprecien|olvidemos) pasado"], anula: "pasado" },
              ],
              modelo: "Esos siglos dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos. La lección no es despreciar el pasado, sino recordar que la adoración es de todo el pueblo.",
            },
          },
          {
            apoyo: "La lección no es despreciar el pasado, sino recordar que la adoración es de todo el pueblo",
            clave: {
              id: "pr-alabanza-4-3-a7-2",
              tipo: "corta",
              pregunta: "Un joven músico dice que de la Edad Media no hay nada bueno para la alabanza. ¿Qué le respondes con lo que enseña la lección?",
              ideas: [
                { id: "riquezas", peso: 60, texto: "Esos siglos también dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos.", formas: ["riqueza*", "amor por los salmos", "cuidado de la musica", "cuid* la musica", "himnos antiguos", "traducid*", "canto llano", "gregoriano"] },
                { id: "pueblo", peso: 40, texto: "También enseñan a no dejar al pueblo como espectador: la adoración es de todo el pueblo.", formas: ["espectador*", "de todo el pueblo", "todo el pueblo", "toda la (iglesia|congregacion)", "pueblo (callado|silencio)", "todos (canten|cantemos|participen)"] },
              ],
              errores: [
                { id: "razon", texto: "Esos siglos también dejaron riquezas.", formas: ["tiene razon", "es verdad que no hay nada"], anula: "riquezas" },
              ],
              modelo: "Le respondo que esos siglos también dejaron riquezas: el amor por los salmos, el cuidado de la música y los himnos antiguos que se siguen cantando traducidos. Y nos enseñan a no dejar al pueblo como espectador: la adoración es de todo el pueblo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La Reforma: el pueblo vuelve a cantar
    "alabanza-4-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué siglo fue la Reforma?", reverso: "En el siglo XVI.", apoyo: "En el siglo XVI, la Reforma no solo devolvió la Biblia al pueblo en su lengua: también le devolvió el canto" },
              { frente: "¿En qué lengua escribió Lutero sus himnos, y con qué melodías?", reverso: "En alemán, con melodías que la gente podía aprender.", apoyo: "Escribió himnos en alemán con melodías que la gente podía aprender" },
              { frente: "¿Cuál es el himno más conocido de Lutero, y en qué salmo se basa?", reverso: "Castillo fuerte es nuestro Dios, basado en el Salmo 46.", apoyo: "El más conocido es Castillo fuerte es nuestro Dios, basado en el Salmo 46" },
              { frente: "¿Qué era cantar el Salmo 46 en la lengua del pueblo?", reverso: "Poner la Palabra en la boca de todos.", apoyo: "Cantarlo en la lengua del pueblo era poner la Palabra en la boca de todos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dos cosas le devolvió la Reforma al pueblo?", reverso: "La Biblia en su lengua, y también el canto.", apoyo: "En el siglo XVI, la Reforma no solo devolvió la Biblia al pueblo en su lengua: también le devolvió el canto" },
              { frente: "¿Qué impulsó Juan Calvino en Ginebra?", reverso: "El canto de los salmos en francés, puestos en verso para el pueblo.", apoyo: "Juan Calvino (1509-1564) impulsó en Ginebra el canto de los salmos en francés, puestos en verso para que el pueblo los cantara" },
              { frente: "¿Qué principio bíblico tenían los reformadores para el canto?", reverso: "Cantar con el espíritu, pero también con el entendimiento.", apoyo: "El principio de los reformadores estaba en la Biblia" },
              { frente: "¿Qué pasa si el pueblo entiende lo que canta?", reverso: "La Palabra lo enseña y lo forma.", apoyo: "Si el pueblo entiende lo que canta, la Palabra lo enseña y lo forma" },
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
            consigna: "¿Es de Martín Lutero o de Calvino y el Salterio de Ginebra? Lleva cada frase a su grupo.",
            grupos: ["Martín Lutero", "Calvino y el Salterio de Ginebra"],
            frases: [
              { texto: "Himnos en alemán", grupo: 0 },
              { texto: "Castillo fuerte es nuestro Dios", grupo: 0 },
              { texto: "Un himno basado en el Salmo 46", grupo: 0 },
              { texto: "Los salmos en francés, puestos en verso", grupo: 1 },
              { texto: "Los 150 salmos, completados en 1562", grupo: 1 },
              { texto: "Clemente Marot y Teodoro de Beza", grupo: 1 },
            ],
            apoyo: "La Reforma devolvió el canto al pueblo",
            explica: "Lutero escribió himnos en alemán, como Castillo fuerte es nuestro Dios, basado en el Salmo 46. Calvino impulsó en Ginebra el canto de los salmos en francés, y en 1562 se completó el Salterio de Ginebra, con los 150 salmos en verso.",
          },
          {
            consigna: "¿Lo hizo Martín Lutero o Juan Calvino? Lleva cada frase a su grupo.",
            grupos: ["Martín Lutero", "Juan Calvino"],
            frases: [
              { texto: "Escribió himnos en alemán", grupo: 0 },
              { texto: "Basó su himno más conocido en el Salmo 46", grupo: 0 },
              { texto: "Usó melodías que la gente podía aprender", grupo: 0 },
              { texto: "Impulsó el canto de los salmos en Ginebra", grupo: 1 },
              { texto: "Hizo cantar los salmos en francés", grupo: 1 },
              { texto: "Hizo poner los salmos en verso para el pueblo", grupo: 1 },
            ],
            apoyo: "Juan Calvino (1509-1564) impulsó en Ginebra el canto de los salmos en francés, puestos en verso para que el pueblo los cantara",
            explica: "Lutero escribió himnos en alemán, con melodías que la gente podía aprender; el más conocido se basa en el Salmo 46. Calvino impulsó en Ginebra el canto de los salmos en francés, puestos en verso para que el pueblo los cantara.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se hizo el Salterio de Ginebra.",
            texto: "En 1562 se completó el [[Salterio]] de Ginebra, con los 150 [[salmos]] en verso, y se [[imprimió]] en grandes cantidades.",
            distractores: ["Himnario", "himnos", "prohibió"],
            errores: {
              Himnario: "El Salterio de Ginebra reunía los 150 salmos en verso.",
              himnos: "El Salterio de Ginebra tenía los 150 salmos en verso.",
              "prohibió": "El Salterio se imprimió en grandes cantidades y marcó a las iglesias reformadas.",
            },
            apoyo: "En 1562 se completó el Salterio de Ginebra, con los 150 salmos en verso, sobre todo del poeta Clemente Marot y del teólogo Teodoro de Beza",
            explica: "En 1562 se completó el Salterio de Ginebra, con los 150 salmos en verso, sobre todo de Clemente Marot y de Teodoro de Beza. Se imprimió en grandes cantidades y marcó a las iglesias reformadas.",
          },
          {
            consigna: "Completa lo que impulsó Calvino en Ginebra.",
            texto: "Juan Calvino impulsó en Ginebra el canto de los salmos en [[francés]], puestos en [[verso]] para que el [[pueblo]] los cantara.",
            distractores: ["latín", "prosa", "clero"],
            errores: {
              "latín": "Calvino impulsó el canto de los salmos en francés, la lengua del pueblo.",
              prosa: "Los salmos se pusieron en verso para que el pueblo los cantara.",
              clero: "Los salmos se pusieron en verso para que el pueblo los cantara, no solo el clero.",
            },
            apoyo: "Juan Calvino (1509-1564) impulsó en Ginebra el canto de los salmos en francés, puestos en verso para que el pueblo los cantara",
            explica: "Calvino impulsó en Ginebra el canto de los salmos en francés, puestos en verso para que el pueblo los cantara; en 1562 se completó el Salterio de Ginebra con los 150 salmos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el Salterio de Ginebra: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Salterio de Ginebra se completó en 1562, con los 150 salmos en verso.", verdad: true, explica: "En 1562 se completó el Salterio de Ginebra, con los 150 salmos en verso.", apoyo: "En 1562 se completó el Salterio de Ginebra, con los 150 salmos en verso, sobre todo del poeta Clemente Marot y del teólogo Teodoro de Beza" },
              { texto: "Martín Lutero escribió el Salterio de Ginebra en alemán.", verdad: false, explica: "Lutero escribió himnos en alemán; los salmos del Salterio de Ginebra, en francés, son sobre todo del poeta Clemente Marot y del teólogo Teodoro de Beza.", apoyo: "sobre todo del poeta Clemente Marot y del teólogo Teodoro de Beza" },
              { texto: "El Salterio se imprimió en grandes cantidades y marcó a las iglesias reformadas.", verdad: true, explica: "Se imprimió en grandes cantidades y marcó a las iglesias reformadas.", apoyo: "Se imprimió en grandes cantidades y marcó a las iglesias reformadas" },
            ],
          },
          {
            consigna: "Sobre los salmos que se cantaban en Ginebra: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Calvino impulsó en Ginebra el canto de los salmos en latín, para el clero.", verdad: false, explica: "Calvino impulsó el canto de los salmos en francés, puestos en verso para que el pueblo los cantara.", apoyo: "Juan Calvino (1509-1564) impulsó en Ginebra el canto de los salmos en francés, puestos en verso para que el pueblo los cantara" },
              { texto: "Los salmos se pusieron en verso para que el pueblo los pudiera cantar.", verdad: true, explica: "Calvino impulsó el canto de los salmos en francés, puestos en verso para que el pueblo los cantara.", apoyo: "Juan Calvino (1509-1564) impulsó en Ginebra el canto de los salmos en francés, puestos en verso para que el pueblo los cantara" },
              { texto: "El Salterio de Ginebra reunía solo unos pocos salmos escogidos.", verdad: false, explica: "El Salterio de Ginebra tenía los 150 salmos en verso.", apoyo: "En 1562 se completó el Salterio de Ginebra, con los 150 salmos en verso, sobre todo del poeta Clemente Marot y del teólogo Teodoro de Beza" },
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
            consigna: "El principio de los reformadores estaba en la Biblia. Además de con el espíritu, ¿con qué cantaré también? Toca la palabra que lo dice.",
            texto: "cantaré con el espíritu, pero cantaré también con el [[entendimiento]]",
            apoyo: "El principio de los reformadores estaba en la Biblia",
            ref: "1 Corintios 14:15",
            explica: "Pablo escribió: «cantaré con el espíritu, pero cantaré también con el entendimiento». Si el pueblo entiende lo que canta, la Palabra lo enseña y lo forma.",
          },
          {
            consigna: "Los reformadores cuidaban la letra de los cantos. ¿Qué querían que morara en abundancia en el pueblo? Toca las palabras que lo dicen.",
            texto: "La [[palabra de Cristo]] more en abundancia",
            apoyo: "Por eso cuidaban la letra de los cantos",
            ref: "Colosenses 3:16",
            explica: "Los reformadores cuidaban la letra de los cantos: querían que «La palabra de Cristo more en abundancia» en el pueblo, enseñándose y exhortándose unos a otros al cantar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Si el pueblo entiende lo que canta, la Palabra lo enseña y lo forma",
            ref: "1 Corintios 14:15",
            situacion: "Eres el director de alabanza de una iglesia hispana. El pastor te pide que el domingo toda la congregación cante y entienda lo que canta.",
            escenas: [
              {
                id: "e1",
                narra: "Al escoger los cantos, encuentras uno con una melodía preciosa, pero su letra casi no dice nada de Dios ni de su Palabra.",
                pregunta: "¿Qué haces con ese canto?",
                opciones: [
                  { texto: "Buscas otro, con una letra llena de la Palabra.", valor: 2, explica: "Los reformadores cuidaban la letra de los cantos: querían que «La palabra de Cristo more en abundancia» en el pueblo.", siguiente: "e2" },
                  { texto: "Lo escoges: con una melodía así, la letra es lo de menos.", valor: 0, explica: "Si el pueblo entiende lo que canta, la Palabra lo enseña y lo forma: por eso se cuida la letra de los cantos.", siguiente: "e1b" },
                  { texto: "Lo cantas, y antes lees un versículo para darle Palabra.", valor: 1, explica: "Leer la Palabra está bien, pero los reformadores buscaban himnos y salmos llenos de la Palabra y de doctrina.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El domingo la gente disfruta la melodía, pero al salir nadie recuerda nada de lo que cantó.",
                pregunta: "¿Qué decides para el próximo domingo?",
                opciones: [
                  { texto: "Cuidar la letra, para que la Palabra enseñe al pueblo.", valor: 2, explica: "Si el pueblo entiende lo que canta, la Palabra lo enseña y lo forma.", siguiente: "e2" },
                  { texto: "Seguir igual, porque lo único importante es que la melodía guste.", valor: 0, explica: "Los reformadores cuidaban la letra de los cantos, para que la palabra de Cristo morara en abundancia en el pueblo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Muchos hermanos de la iglesia no entienden inglés, y el grupo quiere cantar dos cantos en inglés que les gustan mucho.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Cantarlos en español, para que todo el pueblo entienda.", valor: 2, explica: "La Reforma buscó cantos en la lengua del pueblo: cantar con el espíritu, pero también con el entendimiento." },
                  { texto: "Cantarlos en inglés, porque no hace falta entender para adorar.", valor: 0, explica: "Pablo dijo: «cantaré con el espíritu, pero cantaré también con el entendimiento»." },
                  { texto: "Cantarlos en inglés, pero poner la letra en español en la pantalla.", valor: 1, explica: "Así se entiende algo más, pero la Reforma buscó cantos en la lengua del pueblo, para que todos los cantaran." },
                ],
              },
              {
                id: "e3",
                narra: "Escogiste un himno nuevo con mucha doctrina, pero su melodía es tan difícil que solo el grupo puede cantarla.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le buscas una melodía que el pueblo pueda aprender.", valor: 2, explica: "Lutero escribió himnos con melodías que la gente podía aprender: el canto es de toda la congregación, no solo del coro." },
                  { texto: "Lo dejas así: el grupo canta y la iglesia escucha en silencio.", valor: 0, explica: "La Reforma devolvió el canto a toda la congregación, no solo al coro." },
                ],
              },
            ],
          },
          {
            apoyo: "El canto de toda la congregación, no solo del coro",
            ref: "Colosenses 3:16",
            situacion: "Eres líder de alabanza en una iglesia nueva, y vas a preparar con el grupo los cantos del primer mes.",
            escenas: [
              {
                id: "e1",
                narra: "Un músico propone cantar solo lo que el grupo sabe tocar bien, aunque la iglesia no conozca esos cantos.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Escoger cantos que toda la iglesia pueda aprender.", valor: 2, explica: "La Reforma buscó el canto de toda la congregación, con melodías que el pueblo podía aprender y cantar.", siguiente: "e2" },
                  { texto: "Hacerle caso: si el grupo suena bien, la iglesia puede escuchar.", valor: 0, explica: "El canto es de toda la congregación, no solo del coro ni del grupo.", siguiente: "e1b" },
                  { texto: "Escoger los del grupo, y enseñar a la iglesia un canto al mes.", valor: 1, explica: "Enseñar cantos ayuda, pero la Reforma buscó que toda la congregación cantara, con melodías que el pueblo podía aprender.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El primer domingo, la iglesia mira al grupo en silencio, como si fuera un concierto.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Cambias el plan: el canto es de toda la congregación.", valor: 2, explica: "La Reforma devolvió el canto al pueblo: el canto de toda la congregación, no solo del coro.", siguiente: "e2" },
                  { texto: "Nada: a la iglesia le basta con escuchar cómo toca el grupo.", valor: 0, explica: "El canto es de toda la congregación: la Reforma le devolvió el canto al pueblo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Al revisar un canto nuevo, notas que una parte de la letra no se entiende y no sabes qué quiere decir.",
                pregunta: "¿Qué haces con ese canto?",
                opciones: [
                  { texto: "Lo revisas con la Biblia y, si no es claro, buscas otro.", valor: 2, explica: "Los reformadores cuidaban la letra de los cantos: si el pueblo entiende lo que canta, la Palabra lo enseña y lo forma." },
                  { texto: "Lo cantas igual, porque no hace falta entender lo que se canta.", valor: 0, explica: "Pablo dijo: «cantaré con el espíritu, pero cantaré también con el entendimiento»." },
                  { texto: "Lo cantas, y le pides al pastor que lo explique después.", valor: 1, explica: "Explicarlo ayuda, pero los reformadores cuidaban la letra misma de los cantos, para cantar con entendimiento." },
                ],
              },
              {
                id: "e3",
                narra: "El pastor quiere que la iglesia aprenda a cantar el Salmo 46 en su lengua.",
                pregunta: "¿Qué himno le propones?",
                opciones: [
                  { texto: "Castillo fuerte es nuestro Dios, que se basa en ese salmo.", valor: 2, explica: "Lutero lo escribió basado en el Salmo 46: cantarlo en la lengua del pueblo era poner la Palabra en la boca de todos." },
                  { texto: "Un canto en latín, que suene antiguo aunque nadie lo entienda.", valor: 0, explica: "La Reforma buscó cantos en la lengua del pueblo: si el pueblo entiende lo que canta, la Palabra lo enseña y lo forma." },
                  { texto: "Cualquier canto alegre, aunque no tenga que ver con el salmo.", valor: 0, explica: "Los reformadores buscaban himnos y salmos llenos de la Palabra: Castillo fuerte es nuestro Dios se basa en el Salmo 46." },
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
            apoyo: "Martín Lutero (1483-1546) quería que el pueblo cantara en su propia lengua",
            ref: "Salmos 46:1",
            clave: {
              id: "pr-alabanza-4-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué aportó Martín Lutero al canto de la congregación?",
              ideas: [
                { id: "lengua", peso: 40, texto: "Quería que el pueblo cantara en su propia lengua: escribió himnos en alemán.", formas: ["alem*", "(su|propia) lengua", "lengua del pueblo", "(su|propio) idioma"] },
                { id: "melodias", peso: 30, texto: "Escribió himnos con melodías que la gente podía aprender.", formas: ["melodi*", "(podia|pudiera|podian|pudieran|pueda|puedan) aprender", "faciles de (aprender|cantar)"] },
                { id: "castillo", peso: 30, texto: "Su himno más conocido, Castillo fuerte es nuestro Dios, se basa en el Salmo 46: ponía la Palabra en la boca de todos.", formas: ["castillo fuerte", "salmo 46", "boca de todos", "la palabra en la boca"] },
              ],
              errores: [
                { id: "latin", texto: "Lutero escribió himnos en alemán, la lengua del pueblo.", formas: ["(himnos|cantos|canticos) en latin", "escribio en latin"], anula: "lengua" },
              ],
              modelo: "Lutero quería que el pueblo cantara en su propia lengua: escribió himnos en alemán, con melodías que la gente podía aprender. El más conocido es Castillo fuerte es nuestro Dios, basado en el Salmo 46, que ponía la Palabra en la boca de todos.",
            },
          },
          {
            apoyo: "La Reforma devolvió el canto al pueblo",
            ref: "1 Corintios 14:15",
            clave: {
              id: "pr-alabanza-4-4-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué se dice que la Reforma devolvió el canto al pueblo? Usa el ejemplo de Lutero y el de Calvino.",
              ideas: [
                { id: "lutero", peso: 35, texto: "Lutero escribió himnos en alemán, para que el pueblo cantara en su propia lengua.", formas: ["alem*", "castillo fuerte", "salmo 46"] },
                { id: "calvino", peso: 35, texto: "Calvino impulsó el canto de los salmos en francés, y en 1562 se completó el Salterio de Ginebra.", formas: ["frances", "salterio", "1562", "150 salmos", "salmos en verso"] },
                { id: "entender", peso: 30, texto: "Su principio era cantar con el espíritu y también con el entendimiento, en la lengua del pueblo.", formas: ["entend*", "con el espiritu", "(su|propia) lengua", "lengua del pueblo"] },
              ],
              errores: [
                { id: "lutero-frances", texto: "Lutero escribió himnos en alemán; los salmos en francés los impulsó Calvino.", formas: ["lutero (escribio|impulso|hizo|completo|creo) salterio", "lutero (escribio|compuso|hizo|creo|impulso) frances"], anula: "lutero" },
                { id: "calvino-aleman", texto: "Calvino impulsó los salmos en francés; los himnos en alemán los escribió Lutero.", formas: ["calvino (escribio|compuso|hizo|creo) aleman", "calvino (escribio|compuso) castillo"], anula: "calvino" },
              ],
              modelo: "Porque Lutero escribió himnos en alemán para que el pueblo cantara en su propia lengua, y Calvino impulsó el canto de los salmos en francés: en 1562 se completó el Salterio de Ginebra. Su principio era cantar con el espíritu y también con el entendimiento.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Los himnos de los avivamientos
    "alabanza-4-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuándo nacieron muchos de los himnos que todavía se cantan?", reverso: "En los avivamientos de los siglos XVIII y XIX, cuando miles llegaban a la fe.", apoyo: "Muchos de los himnos que todavía se cantan nacieron en los avivamientos de los siglos XVIII y XIX, cuando miles de personas llegaban a la fe" },
              { frente: "¿Qué escribió Isaac Watts, además de cientos de himnos?", reverso: "Salmos en verso.", apoyo: "En Inglaterra, Isaac Watts (1674-1748) escribió cientos de himnos, además de salmos en verso" },
              { frente: "¿De quién era hermano Charles Wesley?", reverso: "De Juan Wesley.", apoyo: "Durante el avivamiento metodista, Charles Wesley (1707-1788), hermano de Juan Wesley, escribió miles de himnos" },
              { frente: "¿En las campañas de qué evangelista cantaba Ira D. Sankey?", reverso: "En las de D. L. Moody.", apoyo: "Ira D. Sankey (1840-1908) cantaba en las campañas del evangelista D. L. Moody" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué aprendía la gente sencilla con los himnos de Charles Wesley?", reverso: "La fe, cantando.", apoyo: "con ellos, la gente sencilla aprendía la fe cantando" },
              { frente: "¿Qué cuenta la lección de Fanny Crosby?", reverso: "Ciega desde muy pequeña, escribió miles de himnos.", apoyo: "En los Estados Unidos, Fanny Crosby (1820-1915), ciega desde muy pequeña, escribió miles de himnos" },
              { frente: "¿Qué traían los avivamientos, como dice el Salmo 40?", reverso: "Cantos nuevos: «Puso luego en mi boca cántico nuevo».", apoyo: "Los avivamientos traían cantos nuevos, como dice el salmo" },
              { frente: "¿Quién fue el primer obispo protestante de España?", reverso: "Juan Bautista Cabrera, autor y traductor de himnos.", apoyo: "Juan Bautista Cabrera (1837-1916), el primer obispo protestante de España" },
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
            consigna: "Une a cada autor con lo que dice la lección de él.",
            pares: [
              ["Isaac Watts", "Escribió cientos de himnos y salmos en verso"],
              ["Charles Wesley", "Escribió miles de himnos en el avivamiento metodista"],
              ["Fanny Crosby", "Ciega desde muy pequeña, escribió miles de himnos"],
              ["Ira D. Sankey", "Cantaba en las campañas del evangelista Moody"],
              ["Reginald Heber", "Escribió en 1826 el himno Santo, santo, santo"],
            ],
            apoyo: "Los avivamientos trajeron himnos nuevos: Isaac Watts escribió cientos, Charles Wesley miles en el avivamiento metodista, y Fanny Crosby, ciega desde muy pequeña, miles más; Ira Sankey los cantó en las campañas de Moody",
            explica: "Isaac Watts escribió cientos de himnos y salmos en verso; Charles Wesley, miles en el avivamiento metodista; Fanny Crosby, ciega desde muy pequeña, miles más; Ira Sankey cantaba en las campañas de Moody; y Reginald Heber escribió Santo, santo, santo en 1826.",
          },
          {
            consigna: "Une a cada autor con lo que hizo, según la lección.",
            pares: [
              ["Juan Bautista Cabrera", "Tradujo al español Santo, santo, santo"],
              ["Reginald Heber", "Escribió en inglés Santo, santo, santo"],
              ["Isaac Watts", "Ayudó a que las iglesias cantaran himnos nuevos sobre Cristo"],
              ["Charles Wesley", "Con sus himnos, la gente sencilla aprendía la fe"],
              ["Ira D. Sankey", "Sus cantos se difundieron por todo el mundo"],
            ],
            apoyo: "Entre sus traducciones está Santo, santo, santo, el himno que el inglés Reginald Heber escribió en 1826",
            explica: "Cabrera tradujo Santo, santo, santo, que el inglés Reginald Heber escribió en 1826. Watts ayudó a que las iglesias cantaran himnos nuevos sobre Cristo; con los himnos de Wesley, la gente sencilla aprendía la fe; y los cantos de Sankey se difundieron por todo el mundo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo el nacimiento de estos autores de himnos, del primero al último.",
            eventos: [
              { texto: "Nace Isaac Watts, que escribiría cientos de himnos", fecha: "1674" },
              { texto: "Nace Charles Wesley, el hermano de Juan Wesley", fecha: "1707" },
              { texto: "Nace Fanny Crosby, que quedaría ciega desde muy pequeña", fecha: "1820" },
              { texto: "Nace Juan Bautista Cabrera, que sería obispo en España", fecha: "1837" },
              { texto: "Nace Ira D. Sankey, que cantaría en las campañas de Moody", fecha: "1840" },
            ],
            apoyo: "Muchos de los himnos que todavía se cantan nacieron en los avivamientos de los siglos XVIII y XIX, cuando miles de personas llegaban a la fe",
            explica: "Isaac Watts nació en 1674 y Charles Wesley en 1707; Fanny Crosby, en 1820; Juan Bautista Cabrera, en 1837, e Ira D. Sankey, en 1840.",
          },
          {
            consigna: "Ordena estos hechos de la historia de los himnos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Nace el que escribiría cientos de himnos y salmos en verso", fecha: "1674: Isaac Watts" },
              { texto: "Nace el que escribiría miles de himnos en el avivamiento metodista", fecha: "1707: Charles Wesley" },
              { texto: "Nace la autora de miles de himnos que fue ciega desde muy pequeña", fecha: "1820: Fanny Crosby" },
              { texto: "El inglés Reginald Heber escribe Santo, santo, santo", fecha: "1826" },
              { texto: "Nace el primer obispo protestante de España", fecha: "1837: Juan Bautista Cabrera" },
              { texto: "Nace el que cantaría en las campañas de D. L. Moody", fecha: "1840: Ira D. Sankey" },
            ],
            apoyo: "Entre sus traducciones está Santo, santo, santo, el himno que el inglés Reginald Heber escribió en 1826",
            explica: "Watts nació en 1674, Wesley en 1707 y Fanny Crosby en 1820; en 1826 Reginald Heber escribió Santo, santo, santo; Cabrera, que lo tradujo, nació en 1837, y Sankey, en 1840.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Los avivamientos traían cantos nuevos. ¿Qué puso Dios en la boca del salmista? Toca las palabras que lo dicen.",
            texto: "Puso luego en mi boca [[cántico nuevo]], alabanza a nuestro Dios",
            apoyo: "Los avivamientos traían cantos nuevos, como dice el salmo",
            ref: "Salmos 40:3",
            explica: "«Puso luego en mi boca cántico nuevo, alabanza a nuestro Dios»: los avivamientos traían cantos nuevos.",
          },
          {
            consigna: "Los himnos también fueron una forma de evangelizar. ¿Qué harán los muchos que vean el cántico nuevo? Toca las dos palabras que lo dicen.",
            texto: "Verán esto muchos, y [[temerán]], Y [[confiarán]] en Jehová",
            apoyo: "Los himnos también fueron una forma de evangelizar",
            ref: "Salmos 40:3",
            explica: "«Verán esto muchos, y temerán, Y confiarán en Jehová»: los himnos también fueron una forma de evangelizar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Un buen himno es teología que se puede cantar",
            ref: "Salmos 40:3",
            titulo: "La noche de himnos",
            relato: [
              "Tu iglesia recibió a muchos creyentes nuevos. Algunos son mayores y casi no saben leer, y el pastor quiere que todos aprendan las verdades de la fe.",
              "Te pide preparar una noche de himnos para enseñarles, y después salir a cantar en la campaña de evangelización del barrio.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Por qué los himnos pueden enseñar la fe a los hermanos que casi no saben leer?",
                opciones: [
                  { texto: "Porque los himnos enseñaban doctrina a gente que muchas veces no sabía leer.", bien: true, explica: "Los himnos enseñaban doctrina a gente que muchas veces no sabía leer: con ellos, la gente sencilla aprendía la fe cantando." },
                  { texto: "Porque los himnos solo sirven para emocionar, y la doctrina se deja para la clase.", explica: "Los himnos enseñaban doctrina: estaban llenos de la Palabra y de la obra de Cristo en la cruz." },
                  { texto: "Porque cantando no hace falta aprender nada: basta con disfrutar de la música.", explica: "Con los himnos, la gente sencilla aprendía la fe cantando." },
                ],
                apoyo: "Enseñaban doctrina a gente que muchas veces no sabía leer",
                explica: "Con los himnos de Charles Wesley, la gente sencilla aprendía la fe cantando: los himnos enseñaban doctrina a gente que muchas veces no sabía leer.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué clase de himnos escoges para esa noche?",
                opciones: [
                  { texto: "Himnos llenos de la Palabra y de la obra de Cristo en la cruz.", bien: true, explica: "Así eran los himnos de los avivamientos: llenos de la Palabra y de la obra de Cristo en la cruz." },
                  { texto: "Himnos con una melodía bonita, aunque su letra no diga nada de Dios.", explica: "Un buen himno es teología que se puede cantar: su letra está llena de la Palabra." },
                  { texto: "Solo himnos de un mismo autor, aunque no hablen de Cristo ni de la fe.", explica: "Los himnos que enseñan la fe están llenos de la Palabra y de la obra de Cristo, y hablan de la fe personal y de la vida cristiana." },
                ],
                apoyo: "Los himnos estaban llenos de la Palabra y de la obra de Cristo en la cruz",
                explica: "Los himnos estaban llenos de la Palabra y de la obra de Cristo en la cruz, y hablaban de la fe personal y de la vida cristiana.",
              },
              {
                tipo: "situacion",
                pregunta: "En la campaña del barrio, un joven pregunta para qué cantar himnos en la calle. ¿Qué le dices?",
                opciones: [
                  { texto: "Que los himnos también sirvieron para evangelizar en las campañas y las calles.", bien: true, explica: "Los himnos también fueron una forma de evangelizar: servían en las campañas y en las calles." },
                  { texto: "Que se canta en la calle solo para que el barrio vea lo bien que toca y canta el grupo.", explica: "Los himnos se cantaban en la calle para evangelizar: «Verán esto muchos, y temerán, Y confiarán en Jehová»." },
                  { texto: "Que en la calle no se canta, porque los himnos son solo para el templo.", explica: "Los himnos servían para evangelizar en las campañas y en las calles." },
                ],
                apoyo: "Servían para evangelizar en las campañas y en las calles",
                explica: "Los himnos también fueron una forma de evangelizar, como dice el salmo: «Verán esto muchos, y temerán, Y confiarán en Jehová».",
              },
              {
                tipo: "explica",
                apoyo: "Un buen himno es teología que se puede cantar",
                clave: {
                  id: "pr-alabanza-4-5-a5-1",
                  tipo: "corta",
                  pregunta: "¿Por qué un buen himno es teología que se puede cantar? Explícaselo a los creyentes nuevos.",
                  ideas: [
                    { id: "palabra", peso: 50, texto: "Los himnos estaban llenos de la Palabra y de la obra de Cristo en la cruz.", formas: ["llen* de la palabra", "la palabra", "obra de cristo", "la cruz", "de la biblia", "verdades de la fe"] },
                    { id: "doctrina", peso: 50, texto: "Enseñaban doctrina: con ellos, la gente sencilla, que muchas veces no sabía leer, aprendía la fe cantando.", formas: ["doctrina*", "aprend* la fe", "aprend* cantando", "cantando aprend*", "ensen* (fe|doctrina|verdades)", "no sab* leer", "gente sencilla"] },
                  ],
                  modelo: "Porque los himnos están llenos de la Palabra y de la obra de Cristo en la cruz, y enseñan doctrina. Con ellos, la gente sencilla, que muchas veces no sabía leer, aprendía la fe cantando.",
                },
              },
            ],
          },
          {
            apoyo: "Muchos de los himnos que todavía se cantan nacieron en los avivamientos de los siglos XVIII y XIX, cuando miles de personas llegaban a la fe",
            ref: "Salmos 40:3",
            titulo: "La clase de himnos",
            relato: [
              "El pastor te pide dar una clase al grupo de alabanza sobre los himnos que todavía canta tu iglesia.",
              "Quiere que los músicos entiendan cómo esos himnos enseñaron la fe al pueblo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Un músico pregunta de dónde vienen muchos de esos himnos. ¿Qué le respondes?",
                opciones: [
                  { texto: "Muchos nacieron en los avivamientos de los siglos XVIII y XIX.", bien: true, explica: "Muchos de los himnos que todavía se cantan nacieron en los avivamientos de los siglos XVIII y XIX, cuando miles de personas llegaban a la fe." },
                  { texto: "Todos nacieron en los monasterios de la Edad Media, y se cantaban en latín.", explica: "Muchos de los himnos que todavía se cantan nacieron en los avivamientos de los siglos XVIII y XIX." },
                  { texto: "Los escribió un solo autor en el siglo XX, en América Latina.", explica: "Nacieron en los avivamientos de los siglos XVIII y XIX, con autores como Watts, Wesley y Fanny Crosby." },
                ],
                apoyo: "Muchos de los himnos que todavía se cantan nacieron en los avivamientos de los siglos XVIII y XIX, cuando miles de personas llegaban a la fe",
                explica: "Muchos de los himnos que todavía se cantan nacieron en los avivamientos de los siglos XVIII y XIX, cuando miles de personas llegaban a la fe.",
              },
              {
                tipo: "situacion",
                pregunta: "Otro músico pregunta cómo aprendía la fe la gente sencilla del avivamiento metodista. ¿Qué le dices?",
                opciones: [
                  { texto: "Cantando los himnos de Charles Wesley.", bien: true, explica: "Charles Wesley escribió miles de himnos: con ellos, la gente sencilla aprendía la fe cantando." },
                  { texto: "Leyendo libros de teología muy largos y difíciles.", explica: "Con los himnos de Charles Wesley, la gente sencilla aprendía la fe cantando." },
                  { texto: "Escuchando al coro cantar en latín, sin entender.", explica: "En el avivamiento metodista, la gente sencilla aprendía la fe cantando los himnos de Charles Wesley." },
                ],
                apoyo: "con ellos, la gente sencilla aprendía la fe cantando",
                explica: "Durante el avivamiento metodista, Charles Wesley escribió miles de himnos: con ellos, la gente sencilla aprendía la fe cantando.",
              },
              {
                tipo: "situacion",
                pregunta: "¿De qué hablaban los himnos de los avivamientos, además de la Palabra y de la cruz?",
                opciones: [
                  { texto: "De la fe personal y de la vida cristiana.", bien: true, explica: "Hablaban de la fe personal y de la vida cristiana." },
                  { texto: "De la política y de los reyes de su tiempo.", explica: "Los himnos estaban llenos de la Palabra, y hablaban de la fe personal y de la vida cristiana." },
                  { texto: "Solo de la naturaleza y de las estaciones.", explica: "Los himnos hablaban de la fe personal y de la vida cristiana." },
                ],
                apoyo: "Hablaban de la fe personal y de la vida cristiana",
                explica: "Los himnos estaban llenos de la Palabra y de la obra de Cristo en la cruz, y hablaban de la fe personal y de la vida cristiana.",
              },
              {
                tipo: "explica",
                apoyo: "Enseñaban doctrina a gente que muchas veces no sabía leer",
                clave: {
                  id: "pr-alabanza-4-5-a5-2",
                  tipo: "corta",
                  pregunta: "¿Cómo enseñaron la fe al pueblo los himnos de los avivamientos? Escribe la idea central de tu clase.",
                  ideas: [
                    { id: "palabra", peso: 50, texto: "Estaban llenos de la Palabra y de la obra de Cristo en la cruz.", formas: ["llen* de la palabra", "la palabra", "obra de cristo", "la cruz", "de la biblia", "verdades de la fe"] },
                    { id: "cantando", peso: 50, texto: "La gente sencilla aprendía la fe cantando: enseñaban doctrina aun a quien no sabía leer.", formas: ["aprend* cantando", "aprend* la fe", "cantando aprend*", "no sab* leer", "gente sencilla", "doctrina*"] },
                  ],
                  modelo: "Los himnos de los avivamientos estaban llenos de la Palabra y de la obra de Cristo en la cruz. Con ellos, la gente sencilla aprendía la fe cantando: enseñaban doctrina a gente que muchas veces no sabía leer.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo comenzaron los himnos evangélicos en español.",
            texto: "En español, uno de los primeros grandes autores y traductores de himnos evangélicos fue Juan Bautista [[Cabrera]], el primer [[obispo]] protestante de [[España]].",
            distractores: ["Wesley", "músico", "México"],
            errores: {
              Wesley: "Charles Wesley escribió miles de himnos en el avivamiento metodista; en español, uno de los primeros grandes autores y traductores fue Juan Bautista Cabrera.",
              "músico": "Cabrera fue el primer obispo protestante de España.",
              "México": "Cabrera fue el primer obispo protestante de España.",
            },
            apoyo: "En español, uno de los primeros grandes autores y traductores de himnos evangélicos fue Juan Bautista Cabrera (1837-1916), el primer obispo protestante de España",
            explica: "En español, uno de los primeros grandes autores y traductores de himnos evangélicos fue Juan Bautista Cabrera, el primer obispo protestante de España.",
          },
          {
            consigna: "Completa quién escribió y quién tradujo el himno Santo, santo, santo.",
            texto: "El himno que el [[inglés]] Reginald [[Heber]] escribió en 1826 lo tradujo al [[español]] Juan Bautista Cabrera.",
            distractores: ["alemán", "Watts", "latín"],
            errores: {
              "latín": "Cabrera fue uno de los primeros grandes autores y traductores de himnos evangélicos en español.",
              "alemán": "Reginald Heber era inglés.",
              Watts: "Santo, santo, santo lo escribió el inglés Reginald Heber en 1826.",
            },
            apoyo: "Entre sus traducciones está Santo, santo, santo, el himno que el inglés Reginald Heber escribió en 1826",
            explica: "Entre las traducciones de Juan Bautista Cabrera está Santo, santo, santo, el himno que el inglés Reginald Heber escribió en 1826.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "En español, uno de los primeros grandes autores y traductores de himnos evangélicos fue Juan Bautista Cabrera (1837-1916), el primer obispo protestante de España",
            clave: {
              id: "pr-alabanza-4-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo comenzaron los himnos evangélicos en español, según la lección?",
              ideas: [
                { id: "cabrera", peso: 50, texto: "Uno de los primeros grandes autores y traductores de himnos evangélicos en español fue Juan Bautista Cabrera.", formas: ["cabrera", "juan bautista"] },
                { id: "obispo", peso: 25, texto: "Fue el primer obispo protestante de España.", formas: ["obispo", "protestante de espana", "primer obispo"] },
                { id: "santo", peso: 25, texto: "Tradujo himnos como Santo, santo, santo, que el inglés Reginald Heber escribió en 1826.", formas: ["santo santo", "heber", "reginald", "1826", "traduj*", "traduc*"] },
              ],
              modelo: "Uno de los primeros grandes autores y traductores de himnos evangélicos en español fue Juan Bautista Cabrera, el primer obispo protestante de España. Entre sus traducciones está Santo, santo, santo, que el inglés Reginald Heber escribió en 1826.",
            },
          },
          {
            apoyo: "Entre sus traducciones está Santo, santo, santo, el himno que el inglés Reginald Heber escribió en 1826",
            clave: {
              id: "pr-alabanza-4-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano te pregunta de dónde viene el himno Santo, santo, santo que canta tu iglesia en español. ¿Qué le explicas?",
              ideas: [
                { id: "heber", peso: 50, texto: "Lo escribió el inglés Reginald Heber en 1826.", formas: ["heber", "reginald", "1826"] },
                { id: "cabrera", peso: 50, texto: "Lo tradujo al español Juan Bautista Cabrera, el primer obispo protestante de España.", formas: ["cabrera", "juan bautista", "obispo protestante", "primer obispo"] },
              ],
              modelo: "Le explico que lo escribió el inglés Reginald Heber en 1826, y que lo tradujo al español Juan Bautista Cabrera, el primer obispo protestante de España y uno de los primeros grandes autores y traductores de himnos evangélicos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Del avivamiento pentecostal a la alabanza de hoy
    "alabanza-4-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo era el culto del avivamiento de la calle Azusa?", reverso: "Tenía libertad y participación de todos.", apoyo: "Su culto tenía libertad y participación de todos, con cantos sencillos y espontáneos" },
              { frente: "¿Qué movimiento salió, en buena parte, de la calle Azusa?", reverso: "El movimiento pentecostal.", apoyo: "De allí salió buena parte del movimiento pentecostal" },
              { frente: "¿Dónde comenzó, en 1906, el avivamiento que llegó a la calle Azusa?", reverso: "En Los Ángeles.", apoyo: "En 1906, en Los Ángeles, un grupo dirigido por el predicador William J. Seymour comenzó un avivamiento" },
              { frente: "¿Qué tarea tiene cada generación?", reverso: "Cantar a Dios sin olvidar lo que recibió.", apoyo: "cada generación tiene la tarea de cantar a Dios sin olvidar lo que recibió" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo eran los cantos del avivamiento de la calle Azusa?", reverso: "Sencillos y espontáneos.", apoyo: "Su culto tenía libertad y participación de todos, con cantos sencillos y espontáneos" },
              { frente: "¿Qué se extendió durante el siglo XX, antes de la alabanza contemporánea?", reverso: "Los coros, cantos breves y fáciles de aprender.", apoyo: "Durante el siglo XX se extendieron los coros, cantos breves y fáciles de aprender" },
              { frente: "¿Con qué instrumentos llegó la alabanza y adoración contemporánea?", reverso: "Con guitarras, teclados y batería.", apoyo: "Más tarde llegaron la alabanza y adoración contemporánea, con guitarras, teclados y batería" },
              { frente: "¿Quién es uno de los compositores en español más conocidos?", reverso: "Marcos Witt, autor de dos libros de esta especialidad.", apoyo: "Uno de los más conocidos es Marcos Witt, autor de dos libros de esta especialidad" },
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
            consigna: "Completa cómo era el culto del avivamiento de la calle Azusa.",
            texto: "El culto del avivamiento de la calle Azusa tenía [[libertad]] y participación de [[todos]], con cantos [[sencillos]] y espontáneos.",
            distractores: ["miedo", "pocos", "difíciles"],
            errores: {
              miedo: "Su culto tenía libertad y participación de todos.",
              pocos: "En la calle Azusa participaban todos, no solo unos pocos.",
              "difíciles": "Los cantos de la calle Azusa eran sencillos y espontáneos.",
            },
            apoyo: "Su culto tenía libertad y participación de todos, con cantos sencillos y espontáneos",
            explica: "En 1906 comenzó en Los Ángeles el avivamiento que llegó a la calle Azusa. Su culto tenía libertad y participación de todos, con cantos sencillos y espontáneos, y de allí salió buena parte del movimiento pentecostal.",
          },
          {
            consigna: "Completa cómo se extendió el avivamiento que comenzó con el grupo de William J. Seymour.",
            texto: "El avivamiento pasó a una [[misión]] de la calle Azusa, duró unos tres [[años]] y se extendió por el [[mundo]].",
            distractores: ["catedral", "días", "barrio"],
            errores: {
              catedral: "El avivamiento pronto se trasladó a una misión de la calle Azusa.",
              "días": "El avivamiento de la calle Azusa duró unos tres años.",
              barrio: "El avivamiento se extendió por el mundo.",
            },
            apoyo: "un avivamiento que pronto se trasladó a una misión de la calle Azusa, duró unos tres años y se extendió por el mundo",
            explica: "En 1906, en Los Ángeles, un grupo dirigido por William J. Seymour comenzó un avivamiento que pronto se trasladó a una misión de la calle Azusa, duró unos tres años y se extendió por el mundo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es de los coros o de la alabanza y adoración contemporánea? Lleva cada frase a su grupo.",
            grupos: ["Los coros", "La alabanza contemporánea"],
            frases: [
              { texto: "Cantos breves", grupo: 0 },
              { texto: "Cantos fáciles de aprender", grupo: 0 },
              { texto: "Llegaron primero", grupo: 0 },
              { texto: "Con guitarras, teclados y batería", grupo: 1 },
              { texto: "Llegaron más tarde", grupo: 1 },
              { texto: "Compositores de América Latina que escribieron en español", grupo: 1 },
              { texto: "Marcos Witt, uno de los compositores más conocidos", grupo: 1 },
            ],
            apoyo: "Durante el siglo XX se extendieron los coros, cantos breves y fáciles de aprender",
            explica: "Durante el siglo XX se extendieron los coros, cantos breves y fáciles de aprender. Más tarde llegaron la alabanza y adoración contemporánea, con guitarras, teclados y batería, y en América Latina surgieron compositores que escribieron en español.",
          },
          {
            consigna: "¿Es de la calle Azusa, de los coros o de la alabanza contemporánea? Lleva cada frase a su grupo.",
            grupos: ["La calle Azusa", "Los coros", "La alabanza contemporánea"],
            frases: [
              { texto: "Cantos sencillos y espontáneos", grupo: 0 },
              { texto: "Libertad y participación de todos", grupo: 0 },
              { texto: "Comenzó en 1906, en Los Ángeles", grupo: 0 },
              { texto: "Cantos breves", grupo: 1 },
              { texto: "Cantos fáciles de aprender", grupo: 1 },
              { texto: "Guitarras, teclados y batería", grupo: 2 },
              { texto: "Compositores que escribieron en español para sus iglesias", grupo: 2 },
            ],
            apoyo: "Más tarde llegaron la alabanza y adoración contemporánea, con guitarras, teclados y batería, y en América Latina surgieron compositores que escribieron en español para sus iglesias",
            explica: "La calle Azusa (1906) trajo un culto con libertad y participación de todos, con cantos sencillos y espontáneos. Después se extendieron los coros, breves y fáciles de aprender, y más tarde la alabanza contemporánea, con guitarras, teclados y batería y compositores que escribieron en español.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven músico te dice: En español no hay alabanza propia; todo lo que cantamos es traducido de otros idiomas.",
            pregunta: "¿Qué le respondes con la historia?",
            opciones: [
              { texto: "Que en América Latina surgieron compositores que escribieron en español.", bien: true, explica: "Más tarde llegaron la alabanza y adoración contemporánea, y en América Latina surgieron compositores que escribieron en español para sus iglesias." },
              { texto: "Que tiene razón: en español solo se canta lo que se traduce de cantos de otros países.", explica: "En América Latina surgieron compositores que escribieron en español para sus iglesias, como Marcos Witt." },
              { texto: "Que la alabanza en español empezó con los coros, y que después ya no se escribió nada.", explica: "Después de los coros llegaron la alabanza y adoración contemporánea, también con compositores que escribieron en español." },
              { texto: "Que el idioma no importa, porque se puede cantar en cualquier lengua sin entenderla.", explica: "La lección enseña a cantar en la lengua y con la música del pueblo." },
            ],
            apoyo: "en América Latina surgieron compositores que escribieron en español para sus iglesias",
            explica: "Más tarde llegaron la alabanza y adoración contemporánea, y en América Latina surgieron compositores que escribieron en español para sus iglesias. Uno de los más conocidos es Marcos Witt.",
          },
          {
            caso: "Una hermana mayor te dice: Mi abuela cantaba coros en la iglesia, pero ya casi no se cantan. ¿Qué eran los coros?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Cantos breves y fáciles de aprender, que se extendieron durante el siglo XX.", bien: true, explica: "Durante el siglo XX se extendieron los coros, cantos breves y fáciles de aprender." },
              { texto: "Himnos muy largos de la Reforma, que solo podían cantar los coros de las iglesias.", explica: "Los coros eran cantos breves y fáciles de aprender, que se extendieron durante el siglo XX." },
              { texto: "Cantos con guitarras, teclados y batería, que nacieron mucho antes de la Reforma.", explica: "La alabanza con guitarras, teclados y batería llegó más tarde que los coros, en el siglo XX." },
              { texto: "Los cantos en latín de los monasterios, que el pueblo escuchaba sin cantar.", explica: "Los coros eran cantos breves y fáciles de aprender, que se extendieron durante el siglo XX." },
            ],
            apoyo: "Durante el siglo XX se extendieron los coros, cantos breves y fáciles de aprender",
            explica: "Durante el siglo XX se extendieron los coros, cantos breves y fáciles de aprender; más tarde llegaron la alabanza y adoración contemporánea, con guitarras, teclados y batería.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Es el versículo de memoria de esta materia. ¿Qué celebrará y anunciará cada generación? Toca las palabras que lo dicen.",
            texto: "Generación a generación celebrará tus [[obras]], Y anunciará tus [[poderosos hechos]]",
            apoyo: "Cada generación canta a Dios con su propia voz, y recibe y transmite los cantos de las anteriores",
            ref: "Salmos 145:4",
            explica: "«Generación a generación celebrará tus obras, Y anunciará tus poderosos hechos». Cada generación canta a Dios con su propia voz, y recibe y transmite los cantos de las anteriores.",
          },
          {
            consigna: "En el cielo, los redimidos cantan dos cánticos que suenan juntos. ¿De quiénes son? Toca las palabras que lo dicen.",
            texto: "el cántico de [[Moisés]] siervo de Dios, y el cántico del [[Cordero]]",
            apoyo: "El cántico antiguo y el nuevo suenan juntos delante del trono",
            ref: "Apocalipsis 15:3",
            explica: "En el cielo, los redimidos cantan «el cántico de Moisés siervo de Dios, y el cántico del Cordero»: el cántico antiguo y el nuevo suenan juntos delante del trono.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "No despreciar lo antiguo por ser antiguo, ni lo nuevo por ser nuevo",
            ref: "Salmos 145:4",
            situacion: "Tu iglesia cumple cincuenta años, y el pastor te pide preparar la alabanza del culto de aniversario con los hermanos fundadores y con los jóvenes.",
            escenas: [
              {
                id: "e1",
                narra: "En la primera reunión, los jóvenes quieren cantar solo cantos nuevos, y los fundadores, solo los himnos de siempre.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Cantar lo antiguo y lo nuevo, sin despreciar ninguno.", valor: 2, explica: "No se desprecia lo antiguo por ser antiguo, ni lo nuevo por ser nuevo: el cántico de Moisés y el del Cordero suenan juntos.", siguiente: "e2" },
                  { texto: "Cantar solo lo nuevo, porque lo antiguo ya pasó de moda.", valor: 0, explica: "No se desprecia lo antiguo por ser antiguo: cada generación recibe y transmite los cantos de las anteriores.", siguiente: "e1b" },
                  { texto: "Cantar solo los himnos, porque lo nuevo no puede ser bueno.", valor: 0, explica: "Tampoco se desprecia lo nuevo por ser nuevo: cada generación canta a Dios con su propia voz.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Al conocer el programa, una parte de la iglesia siente que no se tomó en cuenta lo que ama cantar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Corriges el programa: ni lo antiguo ni lo nuevo se desprecia.", valor: 2, explica: "No se desprecia lo antiguo por ser antiguo, ni lo nuevo por ser nuevo.", siguiente: "e2" },
                  { texto: "Sigues igual: en una iglesia siempre hay alguien que se queja de todo.", valor: 0, explica: "El cántico antiguo y el nuevo suenan juntos delante del trono: no se desprecia ni lo uno ni lo otro.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un joven trae un canto con una melodía muy pegadiza, pero una parte de su letra no está de acuerdo con la Biblia.",
                pregunta: "¿Qué haces con ese canto?",
                opciones: [
                  { texto: "Lo pruebas con la Palabra, y escoges otro con una letra fiel.", valor: 2, explica: "Todo se prueba con la Palabra: la letra importa más que el estilo." },
                  { texto: "Lo cantas igual, porque si la melodía gusta, la letra es lo de menos.", valor: 0, explica: "La letra importa más que el estilo: todo se prueba con la Palabra." },
                  { texto: "Lo cantas tal cual, porque el joven lo trajo con buena intención.", valor: 0, explica: "La buena intención no basta: todo se prueba con la Palabra, y la letra importa más que el estilo." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del culto, un fundador te dice que teme que los jóvenes olviden los himnos que la iglesia cantó por años.",
                pregunta: "¿Qué le propones?",
                opciones: [
                  { texto: "Enseñar a los jóvenes los mejores cantos que recibimos.", valor: 2, explica: "La alabanza también es una herencia que se cuida y se pasa: «Contando a la generación venidera las alabanzas de Jehová»." },
                  { texto: "Que no se preocupe: cada generación tiene que empezar de cero.", valor: 0, explica: "Cada generación canta con su propia voz, pero recibe y transmite los cantos de las anteriores." },
                  { texto: "Guardar los himnos en un libro, aunque ya nadie los vuelva a cantar.", valor: 1, explica: "Cuidar la herencia está bien, pero también se pasa: hay que transmitir a los jóvenes los mejores cantos que recibimos." },
                ],
              },
            ],
          },
          {
            apoyo: "Probarlo todo con la Palabra: la letra importa más que el estilo",
            ref: "Apocalipsis 15:3",
            situacion: "Eres el nuevo líder del ministerio de alabanza, y el pastor te pide revisar cómo canta la iglesia a la luz de la historia y de la Palabra.",
            escenas: [
              {
                id: "e1",
                narra: "El domingo notas que casi solo canta el grupo, mientras la congregación mira desde sus asientos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Buscas que todo el pueblo cante, no solo los músicos.", valor: 2, explica: "Que todo el pueblo cante, no solo los músicos: la alabanza es de todo el pueblo.", siguiente: "e2" },
                  { texto: "Nada: lo importante es que los músicos canten y toquen bien.", valor: 0, explica: "La lección pide que todo el pueblo cante, no solo los músicos.", siguiente: "e1b" },
                  { texto: "Enseñas un canto nuevo, pero dejas que el resto lo cante el grupo.", valor: 1, explica: "Enseñar un canto ayuda, pero la meta es que todo el pueblo cante, no solo los músicos.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Un mes después la iglesia sigue callada, y un visitante comenta que parecía un concierto.",
                pregunta: "¿Qué decides ahora?",
                opciones: [
                  { texto: "Cambiar: la alabanza es de todo el pueblo.", valor: 2, explica: "Que todo el pueblo cante, no solo los músicos.", siguiente: "e2" },
                  { texto: "Seguir igual: el visitante no sabe nada de música.", valor: 0, explica: "La lección pide que todo el pueblo cante, no solo los músicos.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Dos hermanos discuten: cada uno dice que el estilo de música que a él le gusta es el único que sirve para el culto.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Que todo se prueba con la Palabra: la letra importa más que el estilo.", valor: 2, explica: "Probarlo todo con la Palabra: la letra importa más que el estilo." },
                  { texto: "Que se cante solo el estilo que tenga más seguidores entre los hermanos.", valor: 0, explica: "Lo que se prueba es la letra, con la Palabra: la letra importa más que el estilo." },
                  { texto: "Que se canten los dos estilos, sin revisar nunca lo que dicen las letras.", valor: 1, explica: "No despreciar ninguno está bien, pero todo se prueba con la Palabra: la letra importa más que el estilo." },
                ],
              },
              {
                id: "e3",
                narra: "Un joven compositor de tu iglesia escribe un canto nuevo y te pregunta si vale la pena, si ya hay tantos himnos.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que cada generación canta a Dios con su propia voz.", valor: 2, explica: "Cada generación canta a Dios con su propia voz, y recibe y transmite los cantos de las anteriores." },
                  { texto: "Que no escriba nada: todo lo bueno ya se escribió hace siglos.", valor: 0, explica: "No se desprecia lo nuevo por ser nuevo: cada generación canta a Dios con su propia voz." },
                  { texto: "Que lo escriba, y que no se preocupe por revisar la letra con la Biblia.", valor: 1, explica: "Escribirlo está bien, pero todo se prueba con la Palabra: la letra importa más que el estilo." },
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
            apoyo: "Probarlo todo con la Palabra: la letra importa más que el estilo",
            ref: "Salmos 145:4",
            clave: {
              id: "pr-alabanza-4-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo se evalúa la alabanza de hoy a la luz de la historia y de la Palabra? Menciona tres principios de la lección.",
              ideas: [
                { id: "antiguo", peso: 35, texto: "No despreciar lo antiguo por ser antiguo, ni lo nuevo por ser nuevo.", formas: ["no despreci*", "sin despreci*", "antiguo nuevo", "nuevo antiguo", "antiguos nuevos", "nuevos antiguos"] },
                { id: "palabra", peso: 35, texto: "Probarlo todo con la Palabra: la letra importa más que el estilo.", formas: ["con la palabra", "con la biblia", "letra (importa|vale|pesa) mas", "mas que el estilo", "prob* (todo|todos|cantos|canto|biblia|palabra)", "fiel* (biblia|palabra|escritura*)", "revis* letra*", "letra* fiel*"] },
                { id: "pueblo", peso: 30, texto: "Que todo el pueblo cante, en su lengua y con su música, no solo los músicos.", formas: ["todo el pueblo", "toda la (iglesia|congregacion)", "no solo (los|el) (musicos|grupo|coro)", "lengua del pueblo", "musica del pueblo", "en (su|nuestra) lengua"] },
              ],
              errores: [
                { id: "estilo", texto: "La letra importa más que el estilo.", formas: ["estilo importa mas", "estilo que mas importa", "estilo mas importante", "estilo vale mas"], anula: "palabra" },
                { id: "despreciar", texto: "No se desprecia lo antiguo por ser antiguo, ni lo nuevo por ser nuevo.", formas: ["hay que (despreciar|dejar|olvidar) (lo|los) (antiguo|antiguos|nuevo|nuevos|himnos)", "(despreciar|olvidar) (lo|los) (antiguo|antiguos|nuevo|nuevos)", "solo (lo|los) (nuevo|nuevos|antiguo|antiguos)", "solo (cantos|himnos|canticos) (nuevos|antiguos)"], anula: "antiguo" },
              ],
              modelo: "No despreciar lo antiguo por ser antiguo, ni lo nuevo por ser nuevo. Probarlo todo con la Palabra, porque la letra importa más que el estilo. Y que todo el pueblo cante, en su lengua y con su música, no solo los músicos.",
            },
          },
          {
            apoyo: "Somos un eslabón: recibimos cantos y dejaremos cantos",
            ref: "Salmos 78:4",
            clave: {
              id: "pr-alabanza-4-6-a7-2",
              tipo: "corta",
              pregunta: "La lección dice: Somos un eslabón. ¿Qué significa eso para quien sirve en la alabanza?",
              ideas: [
                { id: "recibimos", peso: 50, texto: "Recibimos los cantos de las generaciones anteriores.", formas: ["recib*", "herencia", "heredamos", "heredado", "generaciones anteriores", "los que (vinieron|estuvieron) antes"] },
                { id: "dejamos", peso: 50, texto: "Dejaremos cantos: hay que transmitir a los jóvenes los mejores cantos que recibimos.", formas: ["transmit*", "ensen* a los (jovenes|ninos|nuevos)", "(proxima|nueva|siguiente) generacion", "generacion venidera", "dejaremos (cantos|canticos|himnos)", "pasar* (los|esos|nuestros) cantos", "a los que vienen"] },
              ],
              modelo: "Significa que recibimos los cantos de las generaciones anteriores y que dejaremos cantos a la próxima generación. Cada generación canta a Dios con su propia voz, y debemos transmitir a los jóvenes los mejores cantos que recibimos.",
            },
          },
        ],
      },
    ],
  },
};
