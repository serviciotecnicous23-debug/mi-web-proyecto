/**
 * Nivel 5 · Materia 6 — Exégesis de un libro: Romanos (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El método exegético aplicado a una carta entera, sección por sección. Donde los evangélicos leen distinto (Romanos 7,
 * la elección en Romanos 9, el futuro de Israel en Romanos 11, Junias en Romanos 16) se presentan las lecturas con
 * respeto; el ministerio de la mujer es un punto de la declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const N5_EXEGESIS: LeccionContenido[] = [
  {
    id: "n5-exegesis-1",
    objetivos: [
      "Distinguir la exégesis de la eiségesis.",
      "Describir los pasos del método exegético.",
      "Aplicar el método a la introducción y al tema de Romanos.",
    ],
    paraEmpezar:
      "Exégesis viene de una palabra griega que significa sacar o conducir hacia afuera: sacar del texto lo que el autor quiso decir. Lo contrario, meter en el texto lo que uno ya piensa, se llama eiségesis.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 2:15" },
      {
        t: "parrafo",
        texto:
          "El lema de la academia es la meta de esta materia: «Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad». Usar bien la Palabra empieza por entender lo que significó para sus primeros lectores, antes de preguntar qué significa hoy.",
      },
      { t: "subtitulo", texto: "Los pasos del método" },
      {
        t: "lista",
        items: [
          "El contexto histórico: quién escribe, a quién, cuándo y por qué.",
          "El contexto literario: el género, la estructura del libro y el lugar del pasaje en el argumento.",
          "Las palabras y la gramática: qué significan los términos clave y cómo se unen las frases.",
          "La teología: qué enseña el pasaje en el conjunto de la Escritura.",
          "La aplicación: qué le pide hoy a la iglesia y a cada creyente.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=jVNKGw8_bCQ", titulo: "Cartas del Nuevo Testamento: contexto histórico", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "parrafo",
        texto:
          "Gordon Fee, pastor ordenado de las Asambleas de Dios y profesor de Nuevo Testamento, enseñó este camino en su manual de exégesis. No hace falta saber griego para empezar: con buenas traducciones, una concordancia y paciencia, el líder puede escuchar el texto antes de predicarlo.",
      },
      { t: "subtitulo", texto: "El contexto histórico de Romanos" },
      { t: "versiculo", ref: "Romanos 15:22-24" },
      {
        t: "parrafo",
        texto:
          "Pablo escribió desde Corinto, hacia el año 57, a una iglesia que no había fundado. Quería visitarla de camino a España: «cuando vaya a España, iré a vosotros». La iglesia tenía creyentes judíos y gentiles, y en la carta se ven las tensiones entre ellos (Romanos 14 y 15).",
      },
      { t: "versiculo", ref: "Romanos 1:1-4" },
      { t: "versiculo", ref: "Romanos 1:5" },
      {
        t: "parrafo",
        texto:
          "El saludo ya es teología: el evangelio fue «prometido antes por sus profetas en las santas Escrituras», es «acerca de su Hijo», que fue «declarado Hijo de Dios con poder» «por la resurrección de entre los muertos». Y la misión es «la obediencia a la fe en todas las naciones». Al final de la carta vuelve la misma idea (Romanos 16:26): ese marco al principio y al final muestra el propósito de toda la carta.",
      },
      { t: "subtitulo", texto: "El tema: Romanos 1:16-17" },
      { t: "versiculo", ref: "Romanos 1:16-17" },
      { t: "versiculo", ref: "Habacuc 2:4" },
      {
        t: "parrafo",
        texto:
          "La tesis de la carta está en Romanos 1:16-17. Un buen exegeta va al texto que Pablo cita: Habacuc 2:4, donde Dios responde al profeta ante la amenaza de Babilonia: «el justo por su fe vivirá». Pablo lo usa para mostrar que la justicia que Dios da se recibe por la fe, «por fe y para fe».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: Romanos 1:16-17 en cinco pasos" },
      {
        t: "lista",
        items: [
          "El contexto histórico: Pablo escribe desde Corinto a una iglesia de judíos y gentiles que no fundó y que quiere visitar.",
          "El contexto literario: es la tesis de la carta, justo después del saludo y de la acción de gracias; todo lo que sigue la desarrolla.",
          "Las palabras y la gramática: evangelio es la buena noticia de Cristo; la justicia de Dios es la que él da al que cree; y tres veces la palabra porque une las frases en una cadena de razones.",
          "La teología: Pablo cita Habacuc 2:4, donde el justo vive por su fe en medio de la crisis; la fe siempre fue el camino de Dios.",
          "La aplicación: no me avergüenzo del evangelio, y lo anuncio «a todo aquel que cree», sin hacer diferencia de personas.",
        ],
      },
    ],
    ideaClave:
      "La exégesis saca del texto lo que el autor quiso decir; la eiségesis le mete lo que uno ya piensa. El método sigue cinco pasos: el contexto histórico, el contexto literario, las palabras y la gramática, la teología y la aplicación. Romanos se escribió desde Corinto a una iglesia de judíos y gentiles, su marco es la obediencia a la fe en todas las naciones, y su tesis es Romanos 1:16-17, que cita Habacuc 2:4.",
    paraLaVida: {
      texto: "Antes de preguntar qué me dice el texto, pregunto qué quiso decir.",
      pregunta: "¿Qué paso del método exegético sueles saltarte cuando preparas una enseñanza?",
    },
  },
  {
    id: "n5-exegesis-2",
    objetivos: [
      "Seguir el argumento de Pablo sobre el pecado de los gentiles y de los judíos.",
      "Explicar las palabras clave del pasaje: la ira de Dios, entregar y no tener excusa.",
      "Explicar la conclusión de Romanos 3:19-20.",
    ],
    paraEmpezar:
      "Antes de la buena noticia, Pablo da la mala: nadie puede presentarse justo delante de Dios. Seguir su argumento paso a paso es el mejor ejercicio de exégesis.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Romanos 1:18-20" },
      {
        t: "parrafo",
        texto:
          "Pablo pone dos revelaciones una al lado de la otra: en el evangelio se revela la justicia de Dios (1:17), y también «la ira de Dios se revela desde el cielo contra toda impiedad e injusticia de los hombres». La ira de Dios no es un enojo caprichoso, sino su justo rechazo del mal. Y nadie puede alegar ignorancia: lo que se conoce de Dios en la creación hace que «no tienen excusa».",
      },
      { t: "versiculo", ref: "Romanos 1:24-25" },
      {
        t: "parrafo",
        texto:
          "Tres veces dice Pablo que Dios «los entregó» (1:24, 26 y 28). El juicio empieza cuando Dios deja que el ser humano siga el camino que eligió, porque «cambiaron la verdad de Dios por la mentira». El pecado de fondo es la idolatría: dar culto «a las criaturas antes que al Creador».",
      },
      { t: "versiculo", ref: "Romanos 2:1" },
      {
        t: "parrafo",
        texto:
          "En el capítulo 2 Pablo se vuelve al moralista que juzga a los demás, y en especial al judío que confiaba en tener la ley: «eres inexcusable, oh hombre, quienquiera que seas tú que juzgas». Conocer la ley no salva si no se cumple.",
      },
      { t: "versiculo", ref: "Romanos 2:28-29" },
      {
        t: "parrafo",
        texto: "Lo que vale delante de Dios es el corazón: «la circuncisión es la del corazón, en espíritu, no en letra».",
      },
      { t: "versiculo", ref: "Romanos 3:19-20" },
      {
        t: "parrafo",
        texto:
          "La conclusión llega después de una cadena de citas de los Salmos y de Isaías (Romanos 3:10-18): la ley habla «para que toda boca se cierre y todo el mundo quede bajo el juicio de Dios», porque «por las obras de la ley ningún ser humano será justificado delante de él». La ley no salva: muestra el pecado.",
      },
      {
        t: "nota",
        titulo: "Un consejo de exégesis",
        texto:
          "Fíjate en las palabras que se repiten, como «los entregó», «no tienen excusa» e «inexcusable», y en los conectores, como porque, por lo cual y pues: muestran el hilo del argumento. Pablo no da versículos sueltos, sino un razonamiento.",
      },
    ],
    ideaClave:
      "En Romanos 1:18 a 3:20, Pablo muestra que todos están bajo pecado. Los gentiles conocían a Dios por la creación y no tienen excusa, pero cambiaron la verdad por la mentira, y Dios los entregó a su propio camino. Los judíos tenían la ley, pero juzgaban a otros sin cumplirla. La conclusión es que toda boca se cierra: por las obras de la ley nadie será justificado, y la ley muestra el pecado.",
    paraLaVida: {
      texto: "La mala noticia prepara el corazón para la buena.",
      pregunta: "¿Por qué es importante predicar sobre el pecado antes de anunciar la gracia, y cómo hacerlo con amor?",
    },
  },
  {
    id: "n5-exegesis-3",
    objetivos: [
      "Identificar el giro de Romanos 3:21 y las palabras clave de 3:21-26.",
      "Explicar el papel de Abraham en el argumento de Pablo.",
      "Analizar los frutos de la justificación y el contraste entre Adán y Cristo.",
    ],
    paraEmpezar: "Después de cerrar toda boca, Pablo escribe dos palabras que lo cambian todo: pero ahora.",
    bloques: [
      { t: "versiculo", ref: "Romanos 3:21-26" },
      {
        t: "parrafo",
        texto:
          "«Pero ahora, aparte de la ley, se ha manifestado la justicia de Dios». Estos versículos concentran la teología de la cruz. Dios justifica «gratuitamente por su gracia», mediante «la redención», y puso a Cristo «como propiciación por medio de la fe en su sangre». Así Dios es a la vez «el justo, y el que justifica»: no pasa por alto el pecado, sino que lo castiga en Cristo.",
      },
      {
        t: "lista",
        items: [
          "Justificar: declarar justo, como un juez.",
          "Redención: la libertad comprada con un precio.",
          "Propiciación: el sacrificio que satisface la justicia de Dios y quita su ira.",
        ],
      },
      { t: "versiculo", ref: "Romanos 4:11" },
      {
        t: "parrafo",
        texto:
          "En el capítulo 4, Pablo prueba su enseñanza con Abraham. Dios lo declaró justo antes de que fuera circuncidado, y la circuncisión fue «como sello de la justicia de la fe que tuvo estando aún incircunciso». Por eso Abraham es «padre de todos los creyentes», judíos y gentiles.",
      },
      { t: "versiculo", ref: "Romanos 5:1-5" },
      { t: "versiculo", ref: "Romanos 5:8" },
      {
        t: "parrafo",
        texto:
          "El capítulo 5 muestra los frutos: «tenemos paz para con Dios», entrada a la gracia y esperanza, y aun en las pruebas sabemos que «la tribulación produce paciencia». La base es el amor de Dios: «siendo aún pecadores, Cristo murió por nosotros».",
      },
      { t: "versiculo", ref: "Romanos 5:12" },
      {
        t: "parrafo",
        texto:
          "Desde 5:12 Pablo compara a Adán y a Cristo: por un hombre entraron el pecado y la muerte, y por otro vienen la justicia y la vida. Aquí se ve por qué la exégesis cuida las palabras: Agustín leía en la traducción latina de su tiempo una frase que decía que todos pecaron en Adán; hoy la mayoría traduce, como la RV1960, «por cuanto todos pecaron». Las dos lecturas enseñan que el pecado de Adán afectó a todos, aunque lo explican de maneras algo distintas.",
      },
      {
        t: "nota",
        titulo: "Un consejo de exégesis",
        texto:
          "Los grandes giros de un libro suelen estar marcados por conectores: «Pero ahora» (3:21), «Justificados, pues» (5:1), «Por tanto» (5:12). Señálalos al leer, y verás el mapa del argumento.",
      },
    ],
    ideaClave:
      "Desde Romanos 3:21, Pablo anuncia la justicia de Dios por la fe: Dios justifica gratuitamente por su gracia, mediante la redención, y puso a Cristo como propiciación, para ser justo y a la vez el que justifica. Abraham fue declarado justo por la fe antes de la circuncisión, y es padre de todos los creyentes. La justificación trae paz, esperanza y el amor de Dios, y Cristo deshace lo que hizo Adán.",
    paraLaVida: {
      texto: "Dios no pasó por alto tu pecado: lo pagó en Cristo.",
      pregunta: "¿Cómo explicarías la palabra propiciación a un nuevo creyente, con tus propias palabras?",
    },
  },
  {
    id: "n5-exegesis-4",
    objetivos: [
      "Explicar la unión del creyente con Cristo en Romanos 6.",
      "Comparar con respeto las lecturas de Romanos 7.",
      "Describir la obra del Espíritu en Romanos 8.",
    ],
    paraEmpezar: "Si la gracia es gratis, ¿puedo seguir pecando? Pablo se hace esa pregunta y responde con tres capítulos sobre la vida nueva.",
    bloques: [
      { t: "versiculo", ref: "Romanos 6:1-4" },
      {
        t: "parrafo",
        texto:
          "«¿Perseveraremos en el pecado para que la gracia abunde? En ninguna manera». El bautismo muestra que el creyente está unido a Cristo en su muerte y en su resurrección, para que «andemos en vida nueva».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=3clgkz-40Sw", titulo: "Qué significa la idea de santidad en la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Romanos 6:11" },
      { t: "versiculo", ref: "Romanos 6:23" },
      {
        t: "parrafo",
        texto:
          "Por eso Pablo manda: «consideraos muertos al pecado, pero vivos para Dios en Cristo Jesús». Y resume los dos caminos: «la paga del pecado es muerte, mas la dádiva de Dios es vida eterna».",
      },
      { t: "subtitulo", texto: "¿De quién habla Romanos 7?" },
      { t: "versiculo", ref: "Romanos 7:18-19" },
      { t: "versiculo", ref: "Romanos 7:24-25" },
      {
        t: "parrafo",
        texto:
          "En Romanos 7 Pablo habla en primera persona: «no hago el bien que quiero, sino el mal que no quiero». Los evangélicos lo leen de dos maneras. Agustín, en sus últimos años, Lutero y Calvino vieron aquí al creyente que todavía lucha con la carne. Muchos padres griegos de la iglesia, Juan Wesley y buena parte de los intérpretes pentecostales ven más bien a la persona bajo la ley, sin la fuerza del Espíritu, que clama «¿quién me librará de este cuerpo de muerte?» y encuentra la respuesta en Cristo y en Romanos 8.",
      },
      {
        t: "nota",
        titulo: "Las dos lecturas coinciden",
        texto:
          "Las dos lecturas coinciden en lo principal: con la sola ley, la carne no puede vencer al pecado, y la victoria viene por Cristo y por el Espíritu: «Gracias doy a Dios, por Jesucristo Señor nuestro».",
      },
      { t: "subtitulo", texto: "Romanos 8: la vida en el Espíritu" },
      { t: "versiculo", ref: "Romanos 8:1-2" },
      { t: "versiculo", ref: "Romanos 8:14-16" },
      { t: "versiculo", ref: "Romanos 8:26-28" },
      {
        t: "parrafo",
        texto:
          "Romanos 8 nombra al Espíritu más que ningún otro capítulo de la carta. Empieza con «ninguna condenación», porque «la ley del Espíritu de vida en Cristo Jesús me ha librado de la ley del pecado y de la muerte». El Espíritu nos guía como hijos, nos hace clamar «¡Abba, Padre!», nos ayuda «en nuestra debilidad» e «intercede por nosotros con gemidos indecibles».",
      },
    ],
    ideaClave:
      "En Romanos 6, la gracia no da permiso para pecar: el creyente está unido a Cristo en su muerte y su resurrección, y se considera muerto al pecado y vivo para Dios. Romanos 7 se lee de dos maneras, como la lucha del creyente o como la persona bajo la ley, y las dos coinciden en que la victoria viene por Cristo. Romanos 8 presenta la vida en el Espíritu: ninguna condenación, la adopción y la ayuda del Espíritu en la debilidad.",
    paraLaVida: {
      texto: "La gracia no es permiso para pecar, sino poder para vivir.",
      pregunta: "¿En qué área necesitas hoy considerarte muerto al pecado y vivo para Dios?",
    },
  },
  {
    id: "n5-exegesis-5",
    objetivos: [
      "Identificar la pregunta que responde Romanos 9 a 11.",
      "Comparar con respeto las lecturas de la elección en Romanos 9.",
      "Explicar las interpretaciones sobre el futuro de Israel en Romanos 11.",
    ],
    paraEmpezar:
      "Si Israel, el pueblo de las promesas, rechazó a su Mesías, ¿falló la palabra de Dios? Estos tres capítulos responden esa pregunta.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 9:6" },
      {
        t: "parrafo",
        texto:
          "La tesis de la sección es clara: «No que la palabra de Dios haya fallado». Pablo distingue entre el Israel según la carne y el Israel de la promesa: «no todos los que descienden de Israel son israelitas».",
      },
      { t: "versiculo", ref: "Romanos 9:14-16" },
      {
        t: "parrafo",
        texto:
          "Romanos 9 es uno de los textos centrales del debate sobre la elección: la salvación «no depende del que quiere, ni del que corre, sino de Dios que tiene misericordia». Los calvinistas lo leen como la elección de personas para salvación. Muchos arminianos lo leen como la elección de pueblos y de personas para un papel en la historia de la salvación, como Jacob y Esaú, que representan dos pueblos (Génesis 25:23; Malaquías 1:2-3). Las dos lecturas afirman que Dios es justo: «¿Que hay injusticia en Dios? En ninguna manera».",
      },
      { t: "versiculo", ref: "Romanos 10:9-10" },
      { t: "versiculo", ref: "Romanos 10:13-15" },
      {
        t: "parrafo",
        texto:
          "Romanos 10 subraya la fe y la misión. La salvación está cerca: «si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo», porque «todo aquel que invocare el nombre del Señor, será salvo». Por eso hacen falta mensajeros: «¿Y cómo oirán sin haber quien les predique?».",
      },
      { t: "versiculo", ref: "Romanos 11:25-26" },
      {
        t: "parrafo",
        texto:
          "En Romanos 11 Pablo anuncia un misterio: Israel tiene un endurecimiento «en parte, hasta que haya entrado la plenitud de los gentiles; y luego todo Israel será salvo». Muchos intérpretes, también entre los pentecostales, esperan una conversión futura del pueblo judío; otros entienden «todo Israel» como el conjunto de los redimidos, judíos y gentiles.",
      },
      { t: "versiculo", ref: "Romanos 11:33" },
      {
        t: "parrafo",
        texto: "Pablo no termina con una fórmula, sino con adoración: «¡Oh profundidad de las riquezas de la sabiduría y de la ciencia de Dios!».",
      },
      {
        t: "nota",
        titulo: "Con respeto",
        texto:
          "Calvinistas y arminianos han estudiado Romanos 9 con seriedad durante siglos, y la declaración de fe del ministerio no entra en esa pregunta, como se vio en Teología sistemática III. El líder enseña con firmeza lo que todos comparten: la salvación es por gracia, el que invoca al Señor será salvo y la iglesia tiene que predicar.",
      },
    ],
    ideaClave:
      "Romanos 9 a 11 responde si falló la palabra de Dios, y la respuesta es no: no todos los descendientes de Israel son el Israel de la promesa. Romanos 9 se lee de dos maneras sobre la elección, y las dos afirman la justicia de Dios. Romanos 10 subraya la fe y la misión, y Romanos 11 anuncia que todo Israel será salvo, que unos entienden como una conversión futura de los judíos y otros como el conjunto de los redimidos. Todo termina en adoración.",
    paraLaVida: {
      texto: "Donde no lo entendemos todo, adoramos.",
      pregunta: "¿Cómo te anima Romanos 10:14-15 a anunciar el evangelio esta semana?",
    },
  },
  {
    id: "n5-exegesis-6",
    objetivos: [
      "Explicar cómo la doctrina de Romanos 1 a 11 lleva a la vida práctica de los capítulos 12 a 16.",
      "Aplicar la enseñanza sobre el cuerpo, las autoridades y los débiles en la fe.",
      "Describir el equipo misionero de Romanos 16 y su importancia.",
    ],
    paraEmpezar:
      "Pablo nunca separa la doctrina de la vida. Después de once capítulos sobre la misericordia de Dios, empieza la parte práctica con un así que.",
    bloques: [
      { t: "versiculo", ref: "Romanos 12:3-5" },
      {
        t: "parrafo",
        texto:
          "La vida transformada se vive en el cuerpo de Cristo: cada uno piensa de sí «con cordura», porque «siendo muchos, somos un cuerpo en Cristo, y todos miembros los unos de los otros». Por eso siguen los dones y el amor práctico (Romanos 12:6-21).",
      },
      { t: "versiculo", ref: "Romanos 13:1" },
      { t: "versiculo", ref: "Hechos 5:29" },
      {
        t: "parrafo",
        texto:
          "Romanos 13 enseña a respetar a las autoridades: «Sométase toda persona a las autoridades superiores». No es una obediencia sin límites: cuando una autoridad manda desobedecer a Dios, vale lo que dijeron los apóstoles: «Es necesario obedecer a Dios antes que a los hombres».",
      },
      { t: "versiculo", ref: "Romanos 14:1" },
      { t: "versiculo", ref: "Romanos 15:7" },
      {
        t: "parrafo",
        texto:
          "En Roma había creyentes que comían de todo y otros que no, y unos guardaban ciertos días y otros no (Romanos 14:2-6). Pablo pide no juzgarse: «Recibid al débil en la fe, pero no para contender sobre opiniones», y «recibíos los unos a los otros, como también Cristo nos recibió».",
      },
      { t: "versiculo", ref: "Romanos 15:20" },
      { t: "versiculo", ref: "Romanos 16:7" },
      {
        t: "parrafo",
        texto:
          "La carta termina con la misión y con un equipo. Pablo quería predicar «no donde Cristo ya hubiese sido nombrado», y en el capítulo 16 saluda a más de veinte personas, hombres y mujeres: Febe, Priscila y Aquila, y Andrónico y Junias, «muy estimados entre los apóstoles». Sobre Junias hay una pregunta de exégesis: el nombre griego puede ser de varón o de mujer, y Juan Crisóstomo, en el siglo IV, lo entendió como el de una mujer; y la frase puede significar que eran notables entre los apóstoles o bien conocidos por ellos. El ministerio de la mujer es un punto de la declaración de fe por confirmar.",
      },
      { t: "versiculo", ref: "Romanos 16:25-26" },
      {
        t: "parrafo",
        texto:
          "Y la carta vuelve a su principio: el evangelio se ha dado a conocer «a todas las gentes para que obedezcan a la fe». La obediencia a la fe en todas las naciones abre y cierra la carta: ese es su propósito.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Al preparar una enseñanza de Romanos, no saltes de los capítulos 1 a 8 directamente a la aplicación: Pablo dedica cinco capítulos a mostrar cómo se vive la doctrina en una iglesia real, con diferencias, autoridades y misión.",
      },
    ],
    ideaClave:
      "Desde Romanos 12, la doctrina se vuelve vida: un cuerpo con dones y amor, respeto a las autoridades sin dejar de obedecer a Dios antes que a los hombres, y una iglesia que recibe al débil sin juzgarlo. La carta termina con la misión y con un equipo de hombres y mujeres, como Febe, Priscila y Junias, y vuelve a su propósito: la obediencia a la fe en todas las naciones.",
    paraLaVida: {
      texto: "La buena doctrina se nota en cómo tratamos a los hermanos.",
      pregunta: "¿A qué hermano débil en la fe necesitas recibir sin juzgarlo?",
    },
  },
];
