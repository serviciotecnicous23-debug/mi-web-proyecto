// Las prácticas de las lecciones de «La Biblia, Palabra de Dios» (Nivel 1). Hechas como el modelo (n1-salvacion.ts):
// cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección.
// Cada actividad se entiende sola en todas sus formas de jugar: su consigna dice qué hacer y con qué criterio.
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N1_BIBLIA: PracticasMateria = {
  materia: "n1-biblia",
  mision: {
    titulo: "La Palabra en tus manos",
    intro: "Un compañero nuevo en la iglesia acaba de recibir su primera Biblia. Te pregunta qué es, cómo está organizada, por dónde empezar a leer y qué hacer con lo que lee. Repasa las cuatro lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar qué es la Biblia y cómo nos llegó, encontrar una cita, armar un plan para leerla cada día y convertir un versículo en una decisión concreta.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Qué es la Biblia y cómo nos llegó
    "n1-biblia-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué quiere decir que la Escritura es inspirada por Dios?", reverso: "Que fue exhalada por Dios: salió de su boca.", apoyo: "quiere decir, literalmente, que fue exhalada por Dios: salió de su boca" },
              { frente: "¿Cuántos escritores usó Dios y en cuánto tiempo?", reverso: "Unos cuarenta escritores, a lo largo de unos mil quinientos años.", apoyo: "Dios usó a unos cuarenta escritores, a lo largo de unos mil quinientos años" },
              { frente: "¿Cuál es el mensaje de la Biblia, de principio a fin?", reverso: "Dios salvando a su pueblo por medio de Jesucristo.", apoyo: "Por eso la Biblia tiene un mensaje unido de principio a fin: Dios salvando a su pueblo por medio de Jesucristo." },
              { frente: "¿Para qué es útil la Escritura, según Pablo?", reverso: "Para enseñar, para redargüir (mostrar el error), para corregir y para instruir en justicia.", apoyo: "la Escritura es útil para enseñar, para redargüir (mostrar el error), para corregir y para instruir en justicia" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según Pedro, ¿quién inspiró a los profetas?", reverso: "El Espíritu Santo: no hablaron por su propia cuenta.", apoyo: "Pedro explica que los profetas no hablaron por su propia cuenta, sino que fueron inspirados por el Espíritu Santo." },
              { frente: "Cuando Dios guió a los escritores, ¿qué pasó con su personalidad?", reverso: "No la borró: cada uno escribió con su estilo y su cultura.", apoyo: "Dios guió a los escritores para que escribieran lo que Él quería, sin borrar su personalidad." },
              { frente: "¿En qué idiomas se escribió la Biblia?", reverso: "El Antiguo Testamento, sobre todo en hebreo; el Nuevo Testamento, en griego.", apoyo: "El Antiguo Testamento se escribió sobre todo en hebreo, con algunas partes en arameo, y el Nuevo Testamento en griego." },
              { frente: "¿Qué se conserva hoy que permite confirmar el texto de la Biblia?", reverso: "Miles de manuscritos antiguos, más que de cualquier otro libro antiguo.", apoyo: "Hoy se conservan miles de manuscritos antiguos, más que de cualquier otro libro de la antigüedad, que permiten confirmar el texto." },
              { frente: "¿Qué traducción usan la academia y la Biblioteca de la web?", reverso: "La Reina-Valera, en su revisión de 1960.", apoyo: "La revisión de 1960 es la que usa la academia y la Biblioteca de la web." },
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
            consigna: "Sobre la inspiración de la Biblia: ¿es verdad o es un error, según la lección?",
            afirmaciones: [
              { texto: "La Escritura es inspirada por Dios: quiere decir que salió de su boca.", verdad: true, explica: "Inspirada quiere decir, literalmente, exhalada por Dios: Él es el autor de fondo de la Escritura.", apoyo: "quiere decir, literalmente, que fue exhalada por Dios: salió de su boca", ref: "2 Timoteo 3:16" },
              { texto: "Los profetas escribieron por su propia cuenta lo que se les ocurrió.", verdad: false, explica: "Pedro explica que no hablaron por su propia cuenta: fueron inspirados por el Espíritu Santo.", apoyo: "los profetas no hablaron por su propia cuenta, sino que fueron inspirados por el Espíritu Santo", ref: "2 Pedro 1:20-21" },
              { texto: "Aunque Dios usó a unos cuarenta escritores, la Biblia tiene un mensaje unido de principio a fin.", verdad: true, explica: "Cada escritor tenía su estilo y su cultura, pero el autor de fondo es uno solo: Dios.", apoyo: "pero el autor de fondo es uno solo" },
            ],
          },
          {
            consigna: "Sobre la inspiración de la Biblia: ¿es verdad o es un error, según la lección?",
            afirmaciones: [
              { texto: "Para inspirar la Biblia, Dios borró la personalidad de cada escritor.", verdad: false, explica: "Dios guió a los escritores sin borrar su personalidad: cada uno escribió con su estilo y su cultura.", apoyo: "Dios guió a los escritores para que escribieran lo que Él quería, sin borrar su personalidad.", ref: "2 Pedro 1:21" },
              { texto: "La Biblia es un conjunto de opiniones humanas.", verdad: false, explica: "Dios usó a hombres, pero el autor de fondo es Él: cuando lees la Biblia, escuchas a Dios.", apoyo: "Cuando lees la Biblia, no lees opiniones humanas: escuchas a Dios." },
              { texto: "Como Dios guió a los escritores, la Escritura es verdadera y digna de toda confianza.", verdad: true, explica: "Lo que Dios inspiró es verdad: por eso podemos confiar en la Biblia.", apoyo: "Por eso la Escritura es verdadera y digna de toda confianza", ref: "Salmos 19:7; Juan 17:17" },
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
            consigna: "Completa lo que dice Pablo: ¿para qué es útil la Escritura?",
            texto: "Pablo dice que la Escritura es útil para [[enseñar]], para redargüir (mostrar el [[error]]), para corregir y para instruir en justicia. Así el creyente está preparado para toda buena [[obra]].",
            distractores: ["entretener", "presumir", "suerte"],
            errores: {
              entretener: "La Escritura no se nos dio para entretenernos: es útil para enseñar, para corregir y para instruir en justicia.",
              presumir: "No es para presumir lo que sabemos: la Escritura nos forma para vivir como Cristo.",
              suerte: "No habla de buena suerte: la Escritura prepara al creyente para toda buena obra.",
            },
            apoyo: "a fin de que el creyente esté preparado para toda buena obra",
            ref: "2 Timoteo 3:16-17",
            explica: "La Escritura nos enseña, nos muestra el error, nos corrige y nos instruye, para que estemos preparados para toda buena obra.",
          },
          {
            consigna: "Completa lo que dice la lección: ¿para qué nos dio Dios la Biblia?",
            texto: "La Biblia nos lleva a la [[salvación]] por la [[fe]] en Cristo y nos forma para [[vivir]] como Él.",
            distractores: ["condenación", "suerte", "presumir"],
            errores: {
              condenación: "La Escritura muestra el error, pero su meta es llevarnos a la salvación por la fe en Cristo.",
              suerte: "No es cuestión de suerte: la Biblia nos lleva a la salvación por la fe en Cristo.",
              presumir: "No se nos dio para presumir lo que sabemos: nos forma para vivir como Cristo.",
            },
            apoyo: "La Biblia nos lleva a la salvación por la fe en Cristo",
            ref: "2 Timoteo 3:15",
            explica: "La Escritura nos lleva a la salvación por la fe en Cristo y nos forma para vivir como Él.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu amiga Marta te escribe: Hoy leí un pasaje que me hizo ver que ayer le hablé con dureza a mi mamá. Me siento mal. ¿Qué hago?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Busca otro pasaje que te haga sentir mejor y sigue con tu día.", explica: "Buscar solo lo que hace sentir bien es saltarse una parte: la Escritura también sirve para mostrar el error y para corregir." },
              { texto: "Deja que la Palabra te corrija y hoy pídele perdón a tu mamá.", bien: true, explica: "Para eso nos fue dada: para mostrar el error, corregir e instruir, y prepararnos para toda buena obra." },
              { texto: "Seguro que ese pasaje era para otra persona, no para ti.", explica: "La Biblia es la voz con la que Dios nos habla hoy: también le habla a ella." },
              { texto: "No te preocupes: es un libro antiguo que no tiene que ver con tu vida.", explica: "Para el creyente no es solo un libro antiguo: es la voz con la que Dios nos habla hoy." },
            ],
            apoyo: "Pablo dice que la Escritura es útil para enseñar, para redargüir (mostrar el error), para corregir y para instruir en justicia",
            ref: "2 Timoteo 3:16-17",
            explica: "La Biblia no solo enseña: también muestra el error y corrige, para formarnos y prepararnos para toda buena obra.",
          },
          {
            caso: "Un compañero de trabajo ve tu Biblia y te dice: Yo la leí una vez, como un libro de historia antigua. ¿Para qué la lees tú?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Porque es un libro de historia interesante, como cualquier otro.", explica: "La Biblia no es solo un libro antiguo: es la Palabra de Dios, la voz con la que Él nos habla hoy." },
              { texto: "Porque Dios me habla por ella: me lleva a Cristo y me forma para vivir como Él.", bien: true, explica: "Responde con lo que dice la Escritura de sí misma: nos lleva a la salvación por la fe en Cristo y nos forma para vivir como Él." },
              { texto: "Porque así sé más que los demás y les gano todas las discusiones.", explica: "No se nos dio para presumir: nos enseña, nos corrige y nos prepara para toda buena obra." },
              { texto: "Por costumbre de mi familia; la verdad, no sé muy bien para qué sirve.", explica: "Vale la pena saberlo: la Escritura nos lleva a Cristo y nos forma para vivir como Él." },
            ],
            apoyo: "La Biblia nos lleva a la salvación por la fe en Cristo (2 Timoteo 3:15) y nos forma para vivir como Él.",
            ref: "2 Timoteo 3:15-17",
            explica: "La Biblia no es solo historia: Dios la dio para llevarnos a la salvación en Cristo y formarnos para vivir como Él.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo nos llegó la Biblia, desde que se escribió hasta hoy.",
            pasos: [
              "Dios usa a unos cuarenta escritores, a lo largo de unos mil quinientos años",
              "Los judíos y la iglesia copian y conservan los escritos",
              "Casiodoro de Reina publica la Biblia completa en español (1569)",
              "Cipriano de Valera revisa esa traducción (1602)",
              "Se hace la revisión de 1960, la que usa la academia",
            ],
            apoyo: "Casiodoro de Reina publicó su traducción completa en 1569 y Cipriano de Valera la revisó en 1602.",
            explica: "Primero se escribió y luego se copió con muchísimo cuidado. Mucho después se tradujo al español (1569), se revisó (1602) y se volvió a revisar en 1960.",
          },
          {
            consigna: "Ordena estos hechos, del más antiguo al más reciente.",
            pasos: [
              "Se escribe el Antiguo Testamento, sobre todo en hebreo",
              "Se escribe el Nuevo Testamento, en griego",
              "La iglesia conserva y copia los escritos de los apóstoles",
              "Casiodoro de Reina traduce la Biblia completa al español",
              "Cipriano de Valera revisa la traducción de Reina",
            ],
            apoyo: "El Antiguo Testamento se escribió sobre todo en hebreo, con algunas partes en arameo, y el Nuevo Testamento en griego.",
            explica: "Primero se escribió el Antiguo Testamento y después el Nuevo; la iglesia copió los escritos de los apóstoles y, siglos después, Reina y Valera nos dieron la Biblia en español.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios guió a los escritores para que escribieran lo que Él quería, sin borrar su personalidad.",
            ref: "2 Timoteo 3:16; 2 Pedro 1:20-21",
            clave: {
              id: "pr-n1-biblia-1-a6-1",
              tipo: "corta",
              pregunta: "¿Qué quiere decir que la Biblia es inspirada por Dios?",
              ideas: [
                { id: "de-dios", peso: 50, texto: "Que salió de Dios: fue exhalada por Él, y Él es su autor de fondo.", formas: ["exhal*", "salio de (su|la) boca", "boca de dios", "salio de dios", "(viene|vino) de dios", "dios es (el|su) autor", "autor de fondo", "palabra de dios", "dios (la|lo|los) inspir*", "aliento de dios", "dios (hablo|habla)", "voz de dios"] },
                { id: "escritores", peso: 50, texto: "Dios guió por su Espíritu a los escritores para que escribieran lo que Él quería, sin borrar su personalidad.", formas: ["gui* a (los|unos|esos) (escritores|hombres|profetas)", "dios (los|lo|les) gui*", "(los|les) gui*", "espiritu santo", "(uso|escogio) a (unos|los|esos) (cuarenta|escritores|hombres)", "cuarenta (escritores|hombres)", "sin borrar", "no borr*", "su personalidad", "su estilo", "lo que (el|dios) queria"] },
              ],
              modelo: "Quiere decir que fue exhalada por Dios: salió de su boca. Dios usó a unos cuarenta escritores y los guió por su Espíritu para que escribieran lo que Él quería, sin borrar su personalidad.",
            },
          },
          {
            apoyo: "Dios usó a unos cuarenta escritores, a lo largo de unos mil quinientos años, cada uno con su estilo y su cultura, pero el autor de fondo es uno solo.",
            ref: "2 Pedro 1:20-21",
            clave: {
              id: "pr-n1-biblia-1-a6-2",
              tipo: "corta",
              pregunta: "Si la Biblia la escribieron unos cuarenta hombres, ¿por qué decimos que es Palabra de Dios?",
              ideas: [
                { id: "autor", peso: 50, texto: "Porque el autor de fondo es uno solo: Dios, que la inspiró.", formas: ["autor de fondo", "un solo autor", "(el|su) autor es dios", "dios es (el|su) autor", "uno solo", "exhal*", "salio de (su|la) boca", "dios (la|lo|los|les) inspir*", "inspirad* por (dios|el espiritu)", "mensaje unido", "(viene|vino) de dios"] },
                { id: "espiritu", peso: 50, texto: "Porque el Espíritu Santo guió a los escritores para que escribieran lo que Dios quería.", formas: ["espiritu santo", "gui* a (los|esos|unos) (escritores|hombres|profetas)", "dios (los|lo|les) gui*", "(los|les) gui*", "lo que (el|dios) queria", "no hablaron por su", "por su propia cuenta"] },
              ],
              modelo: "Porque Dios es el autor de fondo. Él usó a esos hombres, cada uno con su estilo, pero el Espíritu Santo los guió para que escribieran lo que Dios quería.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Cómo está organizada
    "n1-biblia-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántos libros tiene la Biblia?", reverso: "66 libros, en dos testamentos.", apoyo: "La Biblia tiene 66 libros en dos testamentos" },
              { frente: "¿Cuántos libros tiene el Antiguo Testamento y qué cuenta?", reverso: "39 libros: la creación, el pacto de Dios con Israel y las promesas del Mesías.", apoyo: "El Antiguo Testamento, con 39 libros, cuenta la creación, el pacto de Dios con Israel y las promesas del Mesías." },
              { frente: "¿Cuántos libros tiene el Nuevo Testamento y qué cuenta?", reverso: "27 libros: la vida de Jesús, el nacimiento de la iglesia y la esperanza de su regreso.", apoyo: "El Nuevo Testamento, con 27 libros, cuenta la vida de Jesús, el nacimiento de la iglesia y la esperanza de su regreso." },
              { frente: "¿Qué quiere decir testamento?", reverso: "Pacto: un antiguo pacto con Israel y un nuevo pacto en la sangre de Cristo.", apoyo: "Testamento quiere decir pacto" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A quién apunta toda la Biblia?", reverso: "A Jesucristo: Él dijo que tenía que cumplirse todo lo escrito de Él.", apoyo: "Toda la Biblia apunta a Él." },
              { frente: "¿Qué libros forman el Pentateuco o la Ley?", reverso: "Cinco libros: de Génesis a Deuteronomio.", apoyo: "El Pentateuco o la Ley (5 libros): de Génesis a Deuteronomio." },
              { frente: "¿Cuándo se añadieron los números de capítulos y versículos?", reverso: "Los capítulos, en el siglo XIII; los versículos, en el siglo XVI.", apoyo: "Los escritores no pusieron números: los capítulos se añadieron en el siglo XIII y los versículos en el siglo XVI, para facilitar la búsqueda." },
              { frente: "¿Cómo se lee Juan 3:16?", reverso: "Libro de Juan, capítulo 3, versículo 16.", apoyo: "Una cita como Juan 3:16 se lee así: libro de Juan, capítulo 3, versículo 16." },
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
            consigna: "Completa cuántos libros tiene la Biblia y cuántos tiene cada testamento.",
            texto: "La Biblia tiene [[66]] libros. El Antiguo Testamento tiene [[39]] y el Nuevo Testamento tiene [[27]].",
            // (en «Elige entre dos», cada espacio va con la palabra de su mismo lugar: 66 con 5, 39 con 12 y 27 con 13)
            distractores: ["5", "12", "13"],
            errores: {
              "5": "Cinco libros tiene el Pentateuco, que es solo una sección. La Biblia tiene 66 libros: 39 en el Antiguo Testamento y 27 en el Nuevo.",
              "12": "Doce son los libros históricos, o los profetas menores: es solo una sección. La Biblia tiene 66 libros: 39 en el Antiguo Testamento y 27 en el Nuevo.",
              "13": "Trece son las cartas de Pablo: es solo una sección. La Biblia tiene 66 libros: 39 en el Antiguo Testamento y 27 en el Nuevo.",
            },
            apoyo: "La Biblia tiene 66 libros en dos testamentos",
            explica: "Los 39 libros del Antiguo Testamento y los 27 del Nuevo suman los 66 libros de la Biblia.",
          },
          {
            consigna: "Completa qué quiere decir testamento y cuántos libros tiene el Nuevo.",
            texto: "Testamento quiere decir [[pacto]]. Dios hizo un pacto antiguo con [[Israel]] y uno nuevo en la sangre de Cristo. El Nuevo Testamento tiene [[27]] libros.",
            distractores: ["libro", "Egipto", "39"],
            errores: {
              libro: "Testamento no quiere decir libro: quiere decir pacto. Cada testamento reúne muchos libros.",
              Egipto: "El antiguo pacto Dios lo hizo con Israel.",
              "39": "39 son los libros del Antiguo Testamento; el Nuevo tiene 27.",
            },
            apoyo: "Testamento quiere decir pacto: Dios hizo un antiguo pacto con Israel y un nuevo pacto en la sangre de Cristo (Lucas 22:20).",
            ref: "Lucas 22:20",
            explica: "Testamento quiere decir pacto: el antiguo, con Israel; el nuevo, en la sangre de Cristo. El Nuevo Testamento tiene 27 libros.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Esta sección es del Antiguo o del Nuevo Testamento? Lleva cada una a su testamento.",
            grupos: ["Antiguo Testamento", "Nuevo Testamento"],
            frases: [
              { texto: "El Pentateuco o la Ley: de Génesis a Deuteronomio", grupo: 0 },
              { texto: "Los libros poéticos: de Job a Cantares", grupo: 0 },
              { texto: "Los profetas menores: de Oseas a Malaquías", grupo: 0 },
              { texto: "Los Evangelios: Mateo, Marcos, Lucas y Juan", grupo: 1 },
              { texto: "Las cartas de Pablo: de Romanos a Filemón", grupo: 1 },
              { texto: "La profecía: Apocalipsis", grupo: 1 },
            ],
            apoyo: "La Biblia tiene 66 libros en dos testamentos, ordenados por secciones",
            explica: "La Ley, los libros poéticos y los profetas menores están en el Antiguo Testamento; los Evangelios, las cartas de Pablo y el Apocalipsis, en el Nuevo.",
          },
          {
            consigna: "¿En qué parte del Nuevo Testamento está cada libro? Lleva cada uno a su recuadro.",
            grupos: ["Los Evangelios", "Las cartas de Pablo", "Las cartas generales"],
            frases: [
              { texto: "Mateo", grupo: 0 },
              { texto: "Marcos", grupo: 0 },
              { texto: "Lucas", grupo: 0 },
              { texto: "Romanos", grupo: 1 },
              { texto: "Filemón", grupo: 1, explica: "Las cartas de Pablo van de Romanos a Filemón." },
              { texto: "Judas", grupo: 2, explica: "Las cartas generales van de Hebreos a Judas." },
            ],
            apoyo: "Las cartas de Pablo (13): de Romanos a Filemón.",
            explica: "Los Evangelios son Mateo, Marcos, Lucas y Juan; las cartas de Pablo van de Romanos a Filemón; y las cartas generales, de Hebreos a Judas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena las secciones del Antiguo Testamento, de la primera a la última.",
            pasos: ["El Pentateuco o la Ley", "Los libros históricos", "Los libros poéticos", "Los profetas mayores", "Los profetas menores"],
            apoyo: "La Biblia tiene 66 libros en dos testamentos, ordenados por secciones",
            explica: "El Antiguo Testamento empieza con la Ley (de Génesis a Deuteronomio), sigue con los libros históricos y los poéticos, y termina con los profetas mayores y los menores, hasta Malaquías.",
          },
          {
            consigna: "Ordena las secciones del Nuevo Testamento, de la primera a la última.",
            pasos: ["Los Evangelios", "La historia de la iglesia (Hechos)", "Las cartas de Pablo", "Las cartas generales", "La profecía (Apocalipsis)"],
            apoyo: "Los Evangelios (4): Mateo, Marcos, Lucas y Juan.",
            explica: "El Nuevo Testamento empieza con los cuatro Evangelios, sigue con Hechos y las cartas (primero las de Pablo y luego las generales) y termina con Apocalipsis.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada cita con cómo se lee.",
            pares: [
              ["Juan 3:16", "Juan, capítulo 3, versículo 16"],
              ["Juan 16:3", "Juan, capítulo 16, versículo 3"],
              ["Romanos 12:1-2", "Romanos, capítulo 12, versículos 1 y 2"],
              ["Romanos 1:12", "Romanos, capítulo 1, versículo 12"],
            ],
            apoyo: "Una cita como Juan 3:16 se lee así: libro de Juan, capítulo 3, versículo 16.",
            explica: "Una cita se lee en orden: el libro, el capítulo y el versículo. Por eso Juan 3:16 y Juan 16:3 son versículos distintos.",
          },
          {
            consigna: "Une cada cita con cómo se lee.",
            pares: [
              ["Mateo 7:24-25", "Mateo, capítulo 7, versículos 24 y 25"],
              ["Mateo 7:24", "Mateo, capítulo 7, versículo 24"],
              ["Mateo 24:7", "Mateo, capítulo 24, versículo 7"],
              ["Mateo 4:4", "Mateo, capítulo 4, versículo 4"],
            ],
            apoyo: "Si dice Romanos 12:1-2, son los versículos 1 y 2 del capítulo 12.",
            explica: "Primero va el capítulo y después el versículo: 7:24 no es lo mismo que 24:7. Y 24-25 quiere decir los versículos 24 y 25.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El Antiguo Testamento, con 39 libros, cuenta la creación, el pacto de Dios con Israel y las promesas del Mesías.",
            ref: "Lucas 24:44",
            clave: {
              id: "pr-n1-biblia-2-a6-1",
              tipo: "corta",
              pregunta: "Describe las dos partes de la Biblia: cuántos libros tiene cada una y qué cuenta.",
              ideas: [
                { id: "antiguo", peso: 50, texto: "El Antiguo Testamento tiene 39 libros: la creación, el pacto de Dios con Israel y las promesas del Mesías.", formas: ["39", "treinta y nueve", "creacion", "israel", "promesas del mesias", "mesias"] },
                { id: "nuevo", peso: 50, texto: "El Nuevo Testamento tiene 27 libros: la vida de Jesús, el nacimiento de la iglesia y la esperanza de su regreso.", formas: ["27", "veintisiete", "vida de (jesus|cristo)", "nacimiento de la iglesia", "iglesia", "su regreso", "regreso", "segunda venida"] },
              ],
              modelo: "El Antiguo Testamento tiene 39 libros y cuenta la creación, el pacto de Dios con Israel y las promesas del Mesías. El Nuevo tiene 27 y cuenta la vida de Jesús y el nacimiento de la iglesia.",
            },
          },
          {
            apoyo: "Testamento quiere decir pacto: Dios hizo un antiguo pacto con Israel y un nuevo pacto en la sangre de Cristo (Lucas 22:20).",
            ref: "Lucas 22:20",
            clave: {
              id: "pr-n1-biblia-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir testamento y qué pacto hay detrás de cada parte de la Biblia?",
              ideas: [
                { id: "pacto", peso: 40, texto: "Testamento quiere decir pacto.", formas: ["(quiere|significa) decir pacto", "significa (pacto|alianza)", "es (un|el) pacto", "testamento (es|significa) pacto", "pacto o alianza", "alianza"] },
                { id: "antiguo", peso: 30, texto: "El Antiguo Testamento: el pacto de Dios con Israel.", formas: ["israel", "pueblo de dios"] },
                { id: "nuevo", peso: 30, texto: "El Nuevo Testamento: el nuevo pacto en la sangre de Cristo.", formas: ["sangre de (cristo|jesus)", "sangre", "nuevo pacto", "pacto en (cristo|jesus)", "por (cristo|jesus)", "con (cristo|jesus)"] },
              ],
              modelo: "Testamento quiere decir pacto. El Antiguo Testamento cuenta el pacto que Dios hizo con Israel, y el Nuevo Testamento cuenta el nuevo pacto que Dios hizo en la sangre de Cristo.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Leerla cada día
    "n1-biblia-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué la Palabra es el alimento diario del creyente?", reverso: "Porque así como el cuerpo necesita comida cada día, el alma necesita la Palabra de Dios.", apoyo: "Así como el cuerpo necesita comida cada día, el alma necesita la Palabra de Dios." },
              { frente: "¿Qué hace la persona bienaventurada de Salmos 1?", reverso: "Se deleita en la ley del Señor y medita en ella de día y de noche.", apoyo: "se deleita en la ley del Señor y medita en ella de día y de noche" },
              { frente: "¿A qué se parece la vida de quien medita en la Palabra?", reverso: "A un árbol junto a corrientes de aguas: firme y con fruto a su tiempo.", apoyo: "El resultado es una vida como un árbol plantado junto a corrientes de aguas: firme, con fruto a su tiempo y con hojas que no se marchitan." },
              { frente: "¿Qué vale más al leer la Biblia: la constancia o la cantidad?", reverso: "La constancia.", apoyo: "La constancia vale más que la cantidad." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué le dijo Dios a Josué sobre el libro de la ley?", reverso: "Que no se apartara de su boca, que meditara en él de día y de noche y que hiciera lo escrito.", apoyo: "Dios le dijo a Josué que el libro de la ley no debía apartarse de su boca" },
              { frente: "¿Cuánto conviene leer cada día?", reverso: "Poco, pero cada día: un capítulo o una porción, con calma.", apoyo: "Lee poco, pero cada día: un capítulo o una porción, con calma." },
              { frente: "¿Por dónde conviene empezar a leer la Biblia?", reverso: "Por un Evangelio, por ejemplo Marcos o Juan.", apoyo: "Empieza por un Evangelio, por ejemplo Marcos o Juan: conocerás a Jesús de cerca." },
              { frente: "¿Qué tres preguntas te ayudan al leer?", reverso: "¿Qué dice?, ¿qué significa? y ¿qué debo hacer?", apoyo: "Hazte tres preguntas: ¿qué dice?, ¿qué significa? y ¿qué debo hacer?" },
              { frente: "¿Para qué leemos la Biblia, según la lección?", reverso: "Para encontrarnos con Jesús.", apoyo: "Leemos la Biblia para encontrarnos con Jesús." },
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
            consigna: "Una de estas frases sobre la Palabra como alimento tiene un error. Tócala.",
            frases: [
              "Así como el cuerpo necesita comida cada día, el alma necesita la Palabra de Dios.",
              "Jesús dijo que no solo de pan vivirá el hombre.",
              "Basta con leer la Biblia una vez en la vida para estar bien alimentado.",
              "Leer la Palabra cada día es alimentarnos y aprender a obedecer.",
            ],
            malo: 2,
            correccion: "La Palabra es el alimento diario: así como comemos cada día, la necesitamos cada día.",
            apoyo: "La Palabra es el alimento diario del creyente",
            ref: "Mateo 4:4",
            explica: "Nadie come una sola vez en la vida: el alma, como el cuerpo, necesita su alimento cada día.",
          },
          {
            consigna: "Una de estas frases sobre leer la Biblia cada día tiene un error. Tócala.",
            frases: [
              "La Palabra es el alimento diario del creyente.",
              "Leer la Biblia sirve solo para informarnos de cosas que pasaron hace mucho.",
              "El hombre no vive solo de pan, sino de toda palabra que sale de la boca de Dios.",
              "Leemos la Biblia para encontrarnos con Jesús.",
            ],
            malo: 1,
            correccion: "Leer la Palabra cada día no es solo informarnos: es alimentarnos y aprender a obedecer.",
            apoyo: "Leer la Palabra cada día no es solo informarnos: es alimentarnos y aprender a obedecer.",
            ref: "Mateo 4:4; Josué 1:8",
            explica: "La Biblia no es solo un libro de datos: es el alimento que nos sostiene y nos enseña a obedecer.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de la iglesia te dice: Yo ya leí la Biblia completa el año pasado. Ya sé lo que dice, así que no necesito leerla más.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: si ya la leíste completa, ya cumpliste con Dios.", explica: "Leer la Palabra no es solo informarnos: es alimentarnos, y el alma necesita su alimento cada día." },
              { texto: "Qué bueno. Pero la Palabra es como la comida: el alma la necesita cada día.", bien: true, explica: "Así lo enseña la lección: la Palabra es el alimento diario del creyente." },
              { texto: "Mejor vuelve a leerla solo cuando tengas algún problema grande.", explica: "La Palabra no es solo para los días difíciles: es el alimento de cada día." },
              { texto: "Con escuchar la predicación del domingo ya tienes suficiente.", explica: "El alma necesita la Palabra cada día, así como el cuerpo necesita comida cada día." },
            ],
            apoyo: "La Palabra es el alimento diario del creyente",
            ref: "Mateo 4:4",
            explica: "Nadie dice: ya comí el año pasado. El alma necesita la Palabra cada día, como el cuerpo necesita comida.",
          },
          {
            caso: "En el almuerzo del trabajo, una compañera te ve leyendo la Biblia y te pregunta: ¿Por qué la lees todos los días?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Porque si un día no la leo, Dios se enoja conmigo y me castiga.", explica: "Leemos para alimentarnos y para encontrarnos con Jesús, no por miedo a que Dios se enoje." },
              { texto: "Porque mi alma necesita la Palabra cada día, como mi cuerpo necesita comida.", bien: true, explica: "Es la razón que da la lección con Mateo 4:4: no solo de pan vive el hombre." },
              { texto: "Para saber más que los demás y que me vean como un buen cristiano.", explica: "Leer la Palabra no es solo informarnos: es alimentarnos y aprender a obedecer." },
              { texto: "Es una costumbre de mi familia; la leo sin pensar mucho en eso.", explica: "La razón no es la costumbre: la Palabra es el alimento del alma." },
            ],
            apoyo: "Jesús dijo que no solo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios (Mateo 4:4).",
            ref: "Mateo 4:4",
            explica: "La Palabra no es alimento de una vez por semana: el alma la necesita cada día, como el cuerpo necesita comida.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué pasaje lo dice: Salmos 1 o Josué 1:8? Lleva cada frase a su pasaje.",
            grupos: ["Lo dice Salmos 1", "Lo dice Josué 1:8"],
            frases: [
              { texto: "No se deja guiar por el consejo de los malos", grupo: 0 },
              { texto: "Se deleita en la ley del Señor", grupo: 0 },
              { texto: "Es como un árbol plantado junto a corrientes de aguas", grupo: 0 },
              { texto: "El libro de la ley no debe apartarse de su boca", grupo: 1 },
              { texto: "Debe hacer conforme a todo lo que está escrito", grupo: 1 },
            ],
            apoyo: "Dios le dijo a Josué que el libro de la ley no debía apartarse de su boca, que debía meditar en él de día y de noche y hacer conforme a todo lo que estaba escrito.",
            ref: "Salmos 1:1-3; Josué 1:8",
            explica: "Salmos 1 describe al bienaventurado, firme como un árbol; Josué 1:8 pide que la Palabra no se aparte de la boca y que se haga lo escrito. Los dos piden meditar de día y de noche.",
          },
          {
            consigna: "¿Qué pasaje lo dice: Salmos 1 o Josué 1:8? Lleva cada frase a su pasaje.",
            grupos: ["Lo dice Salmos 1", "Lo dice Josué 1:8"],
            frases: [
              { texto: "No sigue el consejo de los malos", grupo: 0 },
              { texto: "Como un árbol, da fruto a su tiempo", grupo: 0 },
              { texto: "Sus hojas no se marchitan", grupo: 0 },
              { texto: "Que la Palabra no se aparte de tu boca", grupo: 1 },
              { texto: "Haz conforme a todo lo que está escrito", grupo: 1 },
            ],
            apoyo: "El salmo describe a la persona bienaventurada: no se deja guiar por el consejo de los malos, sino que se deleita en la ley del Señor y medita en ella de día y de noche.",
            ref: "Salmos 1:1-3; Josué 1:8",
            explica: "Salmos 1 muestra la vida firme y con fruto de quien medita en la ley; Josué 1:8 pide que la Palabra no se aparte de la boca y que se haga lo escrito. Los dos piden meditar de día y de noche.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada caso con el consejo de la lección que le sirve.",
            pares: [
              ["No sé qué libro leer primero", "Empieza por un Evangelio, como Marcos o Juan"],
              ["Tengo poco tiempo cada día", "Lee poco, pero cada día, con calma"],
              ["Antes de leer", "Pide a Dios que te ayude a entender"],
              ["Leí el pasaje y quiero saber qué debo hacer", "Pregúntate: ¿qué dice?, ¿qué significa? y ¿qué debo hacer?"],
            ],
            apoyo: "Lee poco, pero cada día: un capítulo o una porción, con calma.",
            ref: "Salmos 119:18",
            explica: "Un plan sencillo: empezar por un Evangelio, leer poco pero cada día, orar antes de leer y hacerse las tres preguntas.",
          },
          {
            consigna: "Une cada caso con el consejo de la lección que le sirve.",
            pares: [
              ["Quiero conocer a Jesús de cerca", "Empieza por Marcos o por Juan"],
              ["Quiero leer con un orden, sin perderme", "Usa un plan de lectura de la Biblioteca de la web"],
              ["Leí un versículo y no lo entendí", "Lee los versículos de antes y de después"],
              ["Ya entendí algo del pasaje", "Ponlo en práctica, y Dios te dará más luz"],
            ],
            apoyo: "Lo que entiendes, ponlo en práctica, y Dios te dará más luz.",
            explica: "Para leer cada día: empieza por un Evangelio, usa un plan, lee el contexto cuando no entiendas y pon en práctica lo que entiendes.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Lee poco, pero cada día: un capítulo o una porción, con calma.",
            ref: "Salmos 119:18",
            clave: {
              id: "pr-n1-biblia-3-a6-1",
              tipo: "corta",
              pregunta: "Arma tu plan para leer la Biblia esta semana: ¿qué vas a leer, cuánto y cómo?",
              ideas: [
                { id: "que", peso: 35, texto: "Qué leer: empezar por un Evangelio, como Marcos o Juan, o seguir un plan de lectura.", formas: ["evangelio*", "marcos", "juan", "mateo", "lucas", "plan de lectura", "un plan", "biblioteca"] },
                { id: "cuanto", peso: 35, texto: "Cuánto: poco, pero cada día (un capítulo o una porción).", formas: ["cada dia", "todos los dias", "diari*", "un capitulo", "una porcion", "poco", "cada manana", "cada noche"] },
                { id: "como", peso: 30, texto: "Cómo: orando antes de leer y haciéndose las tres preguntas (qué dice, qué significa y qué debo hacer).", formas: ["or* antes", "orar", "orando", "oracion", "pid* a dios", "pedir* a dios", "ayude a entender", "que dice", "que significa", "que debo hacer", "tres preguntas", "con calma"] },
              ],
              modelo: "Voy a leer el Evangelio de Marcos, un capítulo cada día en la mañana. Antes de leer voy a orar, y después me haré tres preguntas: qué dice, qué significa y qué debo hacer.",
            },
          },
          {
            apoyo: "Empieza por un Evangelio, por ejemplo Marcos o Juan: conocerás a Jesús de cerca.",
            ref: "Salmos 119:18",
            clave: {
              id: "pr-n1-biblia-3-a6-2",
              tipo: "corta",
              pregunta: "Un amigo quiere empezar a leer la Biblia y no sabe cómo. ¿Qué plan sencillo le propones?",
              ideas: [
                { id: "empezar", peso: 35, texto: "Empezar por un Evangelio, como Marcos o Juan, para conocer a Jesús de cerca.", formas: ["evangelio*", "marcos", "juan", "mateo", "lucas", "conocer a jesus", "plan de lectura", "un plan"] },
                { id: "constancia", peso: 35, texto: "Leer poco, pero cada día: la constancia vale más que la cantidad.", formas: ["cada dia", "todos los dias", "diari*", "un capitulo", "una porcion", "poco", "constancia"] },
                { id: "como", peso: 30, texto: "Pedir a Dios que le ayude a entender y hacerse las tres preguntas.", formas: ["or* antes", "orar", "ore", "oracion", "pid* a dios", "pedir* a dios", "ayude a entender", "que dice", "que significa", "que (debo|debe) hacer", "tres preguntas", "mentor", "pastor"] },
              ],
              modelo: "Le propongo empezar por el Evangelio de Juan y leer un capítulo cada día, con calma. Antes de leer, que le pida a Dios que le ayude a entender lo que lee.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Meditar y obedecer
    "n1-biblia-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A quién se parece quien oye la Palabra y no la practica?", reverso: "A quien se mira al espejo, ve que tiene la cara sucia y se va sin lavarse.", apoyo: "Quien solo oye la Palabra y no la practica es como quien se mira al espejo, ve que tiene la cara sucia y se va sin lavarse: se engaña a sí mismo." },
              { frente: "¿Cuál es la meta de leer la Biblia?", reverso: "Obedecerla.", apoyo: "La meta de leer la Biblia es obedecerla." },
              { frente: "¿Con quién comparó Jesús a quien oye sus palabras y las hace?", reverso: "Con un hombre prudente que edificó su casa sobre la roca.", apoyo: "Jesús terminó el Sermón del monte comparando a quien oye sus palabras y las hace con un hombre prudente que edificó su casa sobre la roca." },
              { frente: "Cuando vinieron lluvias, ríos y vientos, ¿qué pasó con esa casa?", reverso: "No cayó: estaba edificada sobre la roca.", apoyo: "Vinieron lluvias, ríos y vientos, y la casa no cayó." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es meditar en la Biblia?", reverso: "Llenar la mente con lo que Dios dijo, pensarlo una y otra vez y convertirlo en oración.", apoyo: "es llenarla con lo que Dios dijo, pensarlo una y otra vez, preguntarse qué significa para mi vida y convertirlo en oración" },
              { frente: "¿Qué alumbra la lámpara y qué ilumina la lumbrera?", reverso: "La lámpara alumbra el paso que tenemos delante; la lumbrera ilumina el camino.", apoyo: "La lámpara alumbra el paso que tenemos delante; la lumbrera ilumina el camino." },
              { frente: "¿Para qué guardó el salmista la Palabra en su corazón?", reverso: "Para no pecar contra Dios.", apoyo: "El salmista guardó la Palabra en su corazón para no pecar contra Dios (Salmos 119:11)." },
              { frente: "¿Qué le pasa a quien solo oye la Palabra?", reverso: "Se engaña a sí mismo.", apoyo: "se engaña a sí mismo" },
              { frente: "¿Qué vale más: un versículo obedecido o muchos capítulos olvidados?", reverso: "Un versículo obedecido.", apoyo: "Un versículo obedecido vale más que muchos capítulos olvidados." },
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
            consigna: "¿Esta persona solo oye la Palabra, o la oye y la hace? Lleva cada frase a su grupo.",
            grupos: ["Solo oye la Palabra", "Oye la Palabra y la hace"],
            frases: [
              { texto: "Se mira al espejo, ve la cara sucia y se va sin lavarse", grupo: 0 },
              { texto: "Se engaña a sí mismo", grupo: 0 },
              { texto: "Sabe mucho de la Biblia, pero no cambia en nada", grupo: 0 },
              { texto: "Mira con atención la Palabra y persevera en hacerla", grupo: 1 },
              { texto: "Edifica su casa sobre la roca", grupo: 1 },
              { texto: "Será bienaventurado en lo que hace", grupo: 1 },
            ],
            apoyo: "En cambio, quien mira con atención la Palabra y persevera en hacerla será bienaventurado en lo que hace.",
            ref: "Santiago 1:22-25; Mateo 7:24",
            explica: "Oír sin hacer es engañarse a uno mismo; quien oye y obedece es bienaventurado y edifica sobre la roca.",
          },
          {
            consigna: "¿Esta persona solo oye la Palabra, o la oye y la hace? Lleva cada caso a su grupo.",
            grupos: ["Solo oye la Palabra", "Oye la Palabra y la hace"],
            frases: [
              { texto: "Escucha la predicación del domingo y el lunes ya la olvidó", grupo: 0 },
              { texto: "Le cuenta a todos lo que aprendió, pero no lo vive", grupo: 0 },
              { texto: "Conoce muchos capítulos, pero no obedece ninguno", grupo: 0, explica: "Un versículo obedecido vale más que muchos capítulos olvidados." },
              { texto: "Lee un versículo en la mañana y lo pone en práctica ese día", grupo: 1 },
              { texto: "Escoge un versículo y lo obedece durante la semana", grupo: 1 },
              { texto: "Obedece lo que leyó, y eso lo sostiene en las tormentas", grupo: 1 },
            ],
            apoyo: "Un versículo obedecido vale más que muchos capítulos olvidados.",
            ref: "Santiago 1:22; Mateo 7:24-25",
            explica: "La diferencia no está en cuánto sabes, sino en si lo haces: oír sin obedecer es engañarse a uno mismo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre meditar en la Biblia tiene un error. Tócala.",
            frases: [
              "Meditar es pensar una y otra vez en lo que Dios dijo.",
              "Al meditar, me pregunto qué significa el versículo para mi vida.",
              "Para meditar hay que dejar la mente en blanco.",
              "Lo que medito lo convierto en oración.",
            ],
            malo: 2,
            correccion: "Meditar no es dejar la mente en blanco: es llenarla con lo que Dios dijo.",
            apoyo: "Meditar en la Biblia no es dejar la mente en blanco: es llenarla con lo que Dios dijo",
            explica: "Meditar en la Biblia no vacía la mente: la llena con la Palabra y la piensa una y otra vez.",
          },
          {
            consigna: "Así medita Ana en la Biblia. Una de estas frases tiene un error: tócala.",
            // (las frases se muestran mezcladas: cada una nombra a Ana y se entiende sola)
            frases: [
              "Ana escoge un versículo del día.",
              "Ana lee su versículo una sola vez y no vuelve a pensar en él.",
              "Ana se pregunta qué significa ese versículo para su vida.",
              "Ana convierte su versículo en oración.",
            ],
            malo: 1,
            correccion: "Meditar es pensar una y otra vez en la Palabra: Ana debería volver al versículo varias veces.",
            apoyo: "Un buen hábito es escoger un versículo del día y volver a él varias veces.",
            explica: "Meditar no es leer de paso: es volver al versículo varias veces, pensarlo y convertirlo en oración.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre aplicar la Palabra a tu vida: ¿es verdad o es un error, según la lección?",
            afirmaciones: [
              { texto: "Dios guía nuestras decisiones de cada día por medio de su Palabra.", verdad: true, explica: "La Palabra es lámpara para el paso de hoy y lumbrera para el camino de la vida.", apoyo: "Dios guía nuestras decisiones de cada día y la dirección de nuestra vida por medio de su Palabra.", ref: "Salmos 119:105" },
              { texto: "La Biblia solo sirve para las grandes decisiones de la vida.", verdad: false, explica: "La lámpara alumbra el paso que tenemos delante: Dios guía también las decisiones de cada día.", apoyo: "La lámpara alumbra el paso que tenemos delante", ref: "Salmos 119:105" },
              { texto: "Un versículo obedecido vale más que muchos capítulos olvidados.", verdad: true, explica: "Lo que cambia la vida no es cuánto leemos, sino lo que obedecemos.", apoyo: "Un versículo obedecido vale más que muchos capítulos olvidados." },
            ],
          },
          {
            consigna: "Sobre aplicar la Palabra a tu vida: ¿es verdad o es un error, según la lección?",
            afirmaciones: [
              { texto: "Aplicar un versículo es decidir algo concreto que haré esta semana para obedecerlo.", verdad: true, explica: "Así lo pide la lección: escoger un versículo y escribir qué harás esta semana para obedecerlo.", apoyo: "Escoge un versículo de esta materia y escribe qué vas a hacer esta semana para obedecerlo." },
              { texto: "Si ya subrayé el versículo, ya lo apliqué.", verdad: false, explica: "Marcarlo no es obedecerlo: quien oye la Palabra y no la practica se engaña a sí mismo.", apoyo: "Quien solo oye la Palabra y no la practica es como quien se mira al espejo", ref: "Santiago 1:22" },
              { texto: "Obedecer la Palabra es el cimiento firme para las tormentas de la vida.", verdad: true, explica: "Como la casa sobre la roca: vinieron lluvias, ríos y vientos, y no cayó.", apoyo: "Obedecer la Palabra es el cimiento firme para las tormentas de la vida.", ref: "Mateo 7:24-25" },
              { texto: "Quien sabe mucho de la Biblia ya la está obedeciendo.", verdad: false, explica: "Se puede saber mucho de la Biblia y no cambiar en nada: la meta de leerla es obedecerla.", apoyo: "Se puede saber mucho de la Biblia y no cambiar en nada." },
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
            // (en forma de chat, lo que va antes de los primeros dos puntos es quién escribe: por eso la cita va después)
            caso: "Tu mentor te escribe: Esta semana escogiste Salmos 119:11, donde el salmista guarda la Palabra en su corazón para no pecar contra Dios. ¿Qué vas a hacer para obedecerlo?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Le voy a pedir a Dios que me haga mejor persona, y con eso ya está.", explica: "Orar es bueno, pero no dice qué harás: una decisión concreta se puede cumplir esta semana." },
              { texto: "Cada mañana de esta semana voy a repasar el versículo de memoria de la materia.", bien: true, explica: "Es concreto, es para esta semana y obedece el versículo: guardar la Palabra en el corazón." },
              { texto: "Ya leí el versículo una vez; con eso es más que suficiente.", explica: "Leer sin hacer es como mirarse al espejo y irse sin lavarse." },
              { texto: "Lo haré cuando tenga más tiempo libre, quizá el próximo mes.", explica: "La decisión es para esta semana: dejarla para después es quedarse solo en oír." },
            ],
            apoyo: "El salmista guardó la Palabra en su corazón para no pecar contra Dios (Salmos 119:11).",
            ref: "Salmos 119:11",
            explica: "Aplicar un versículo es convertirlo en una decisión concreta para esta semana, y cumplirla.",
          },
          {
            caso: "Un amigo de la iglesia te escribe: Supe que esta semana decides si aceptas un trabajo nuevo. Si la Palabra es lámpara a tus pies (Salmos 119:105), ¿cómo te ayuda a decidir?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Decido solo por el sueldo: la Biblia es para la iglesia, no para el trabajo.", explica: "Dios guía nuestras decisiones de cada día y la dirección de nuestra vida por medio de su Palabra, también en el trabajo." },
              { texto: "Abro la Biblia en cualquier página y hago lo primero que lea.", explica: "La Palabra no se usa al azar: se medita, se piensa una y otra vez y se convierte en oración." },
              { texto: "Cada día de esta semana leo la Palabra y oro por esa decisión antes de responder.", bien: true, explica: "Así dejas que la Palabra alumbre el paso que tienes delante." },
              { texto: "Ya subrayé el versículo; ahora decido sin volver a pensar en él.", explica: "Eso es oír sin hacer: el versículo se queda en la página y no guía tu paso." },
            ],
            apoyo: "La Palabra es lámpara a nuestros pies y lumbrera a nuestro camino.",
            ref: "Salmos 119:105",
            explica: "Aplicar Salmos 119:105 es dejar que la Palabra alumbre el paso que tienes delante: meditarla y orar antes de decidir.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Quien solo oye la Palabra y no la practica es como quien se mira al espejo, ve que tiene la cara sucia y se va sin lavarse: se engaña a sí mismo.",
            ref: "Santiago 1:22-25",
            clave: {
              id: "pr-n1-biblia-4-a6-1",
              tipo: "corta",
              pregunta: "¿Cuál es la diferencia entre oír la Palabra y hacerla, según Santiago 1:22-25?",
              ideas: [
                { id: "oir", peso: 50, texto: "Quien solo oye y no practica se engaña a sí mismo, como quien se mira al espejo y se va sin lavarse.", formas: ["engan*", "espejo", "sin lavarse", "cara sucia", "no (la|lo) practica", "no (la|lo) hace", "no (la|lo) obedece", "solo (oye|escucha)"] },
                { id: "hacer", peso: 50, texto: "Quien mira con atención la Palabra y persevera en hacerla es bienaventurado: la meta es obedecerla.", formas: ["bienaventurad*", "persever*", "obedec*", "(la|lo) practica", "(la|lo) hace", "hacerla", "pone* en practica", "poner* en practica", "bendecid*", "feliz"] },
              ],
              modelo: "Quien solo oye la Palabra y no la practica se engaña a sí mismo, como quien se mira al espejo y se va sin lavarse. Quien la hace y persevera en obedecerla es bienaventurado.",
            },
          },
          {
            apoyo: "Obedecer la Palabra es el cimiento firme para las tormentas de la vida.",
            ref: "Mateo 7:24-25",
            clave: {
              id: "pr-n1-biblia-4-a6-2",
              tipo: "corta",
              pregunta: "¿Qué enseña Jesús con la casa sobre la roca acerca de oír y hacer su Palabra?",
              ideas: [
                { id: "prudente", peso: 50, texto: "Quien oye las palabras de Jesús y las hace es como el hombre prudente que edificó su casa sobre la roca.", formas: ["prudente", "sabio", "(las|la|lo) hace", "hacerlas", "(las|la|lo) obedece", "obedec*", "pone* en practica", "practica*"] },
                { id: "firme", peso: 50, texto: "Vinieron lluvias, ríos y vientos, y la casa no cayó: obedecer la Palabra es el cimiento firme para las tormentas.", formas: ["no (cae|cayo)", "no se (cae|cayo|derrumbo)", "firme", "cimiento", "tormenta*", "lluvia*", "viento*", "resist*", "se mantien*", "aguant*"] },
              ],
              modelo: "Enseña que quien oye las palabras de Jesús y las hace es como el hombre prudente. Cuando vienen las lluvias y los vientos, su casa no cae, porque obedecer es un cimiento firme.",
            },
          },
        ],
      },
    ],
  },
};
