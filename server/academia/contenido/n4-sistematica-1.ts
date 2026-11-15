/**
 * Nivel 4 · Materia 1 — Teología sistemática I: la Biblia y Dios (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue los artículos 1 y 2 de la declaración de fe (shared/academia-declaracion.ts), que no tienen puntos por
 * confirmar: la Biblia inspirada, sin error en lo que enseña y suficiente; un solo Dios en tres personas.
 */
import type { LeccionContenido } from "../tipos";

export const N4_SISTEMATICA_1: LeccionContenido[] = [
  {
    id: "n4-sistematica-1-1",
    objetivos: [
      "Distinguir la revelación general de la revelación especial.",
      "Explicar lo que enseñan Salmos 19 y Romanos 1 sobre lo que la creación revela de Dios.",
      "Reconocer a Jesucristo como la revelación suprema de Dios.",
    ],
    paraEmpezar:
      "Nadie podría conocer a Dios si él no se diera a conocer. La teología empieza con una verdad maravillosa: Dios ha hablado.",
    bloques: [
      { t: "versiculo", ref: "Salmos 19:1-4" },
      {
        t: "parrafo",
        texto:
          "«Los cielos cuentan la gloria de Dios, Y el firmamento anuncia la obra de sus manos». A esto se le llama revelación general: lo que Dios muestra de sí mismo a todas las personas, en todo lugar, por medio de la creación y de la conciencia.",
      },
      { t: "versiculo", ref: "Romanos 1:19-20" },
      {
        t: "parrafo",
        texto:
          "Pablo afirma que «las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo», de modo que nadie tiene excusa. Y la ley de Dios está escrita en el corazón humano, como lo muestra la conciencia (Romanos 2:14-15). Pero la revelación general no basta para salvar: muestra que Dios existe y que somos culpables, pero no anuncia el evangelio.",
      },
      { t: "subtitulo", texto: "La revelación especial" },
      { t: "versiculo", ref: "Hebreos 1:1-2" },
      {
        t: "parrafo",
        texto:
          "Dios también habló de manera especial: «muchas veces y de muchas maneras» por medio de los profetas, y en estos postreros días «nos ha hablado por el Hijo». La revelación especial incluye los hechos de Dios en la historia, su palabra a los profetas y a los apóstoles y, sobre todo, a Jesucristo. Esa revelación quedó escrita en la Biblia.",
      },
      { t: "subtitulo", texto: "Cristo, la revelación suprema" },
      { t: "versiculo", ref: "Juan 1:18" },
      { t: "versiculo", ref: "Juan 14:9" },
      {
        t: "parrafo",
        texto:
          "«A Dios nadie le vio jamás; el unigénito Hijo, que está en el seno del Padre, él le ha dado a conocer». Jesús dijo: «El que me ha visto a mí, ha visto al Padre». Por eso la Biblia se entiende a la luz de Cristo, y en Cristo conocemos a Dios como Padre.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=rkSRDC49Dtc", titulo: "Lo que significa que Jesús sea la Palabra de Dios", fuente: "Proyecto Biblia", minutos: 7 },
      {
        t: "nota",
        titulo: "¿Qué es la teología sistemática?",
        texto:
          "Teología significa estudio de Dios. La teología sistemática ordena por temas lo que toda la Biblia enseña: sobre la Escritura, Dios, Cristo, el Espíritu Santo, el ser humano, la salvación, la iglesia y el futuro. Esta materia empieza por los dos primeros temas: la Biblia y Dios.",
      },
    ],
    ideaClave:
      "Dios se da a conocer. En la revelación general, la creación y la conciencia muestran a todos su poder y su deidad, pero no bastan para salvar. En la revelación especial, Dios habló por los profetas y sobre todo por su Hijo, y esa revelación quedó escrita en la Biblia. Jesucristo es la revelación suprema de Dios.",
    paraLaVida: {
      texto: "Cada vez que abres la Biblia, el Dios que creó los cielos te habla.",
      pregunta: "¿Qué te muestra de Dios la creación, y qué solo puedes conocer por la Biblia?",
    },
  },
  {
    id: "n4-sistematica-1-2",
    objetivos: [
      "Explicar qué significa que la Escritura es inspirada por Dios, según 2 Timoteo 3:16 y 2 Pedro 1:20-21.",
      "Describir la inspiración verbal y plenaria y el papel de los autores humanos.",
      "Reconocer la autoridad de la Biblia en la enseñanza de Jesús.",
    ],
    paraEmpezar:
      "La Biblia fue escrita por unos cuarenta autores a lo largo de unos mil quinientos años, y sin embargo tiene un solo mensaje. ¿Cómo es posible? Porque detrás de los autores humanos hay un solo Autor.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "parrafo",
        texto:
          "«Toda la Escritura es inspirada por Dios». La palabra griega que se traduce así significa, literalmente, exhalada por Dios: la Escritura sale de Dios como el aliento sale de la boca. Por eso es útil «para enseñar, para redargüir, para corregir, para instruir en justicia». Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "2 Pedro 1:20-21" },
      {
        t: "parrafo",
        texto:
          "Pedro explica cómo ocurrió: «nunca la profecía fue traída por voluntad humana, sino que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo». Dios guió a los autores de tal manera que lo que escribieron fue su Palabra, sin anular su personalidad: Lucas investigó con cuidado (Lucas 1:3), Pablo escribió con su estilo y David cantó con el suyo.",
      },
      { t: "subtitulo", texto: "Verbal y plenaria" },
      {
        t: "lista",
        items: [
          "Plenaria: toda la Escritura es inspirada, no solo algunas partes.",
          "Verbal: la inspiración llega a las palabras, no solo a las ideas.",
          "En los escritos originales: Dios inspiró lo que escribieron los autores; las copias y las traducciones son Palabra de Dios en la medida en que reproducen fielmente ese texto.",
        ],
      },
      { t: "subtitulo", texto: "La autoridad de la Biblia según Jesús" },
      { t: "versiculo", ref: "Mateo 5:17-18" },
      { t: "versiculo", ref: "Juan 10:35" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo que no vino a abrogar la ley ni los profetas, sino a cumplir, y que «ni una jota ni una tilde pasará de la ley, hasta que todo se haya cumplido». También afirmó que «la Escritura no puede ser quebrantada». Si Jesús es nuestro Señor, su manera de ver la Escritura es la nuestra: ella es la autoridad final de lo que creemos y hacemos.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=uMOc-YI0iaM", titulo: "¿Qué es la Biblia? ¿Cómo se formó? y, ¿cuál es su propósito?", fuente: "Proyecto Biblia" },
      {
        t: "nota",
        titulo: "Lo que confiesa el ministerio",
        texto:
          "La declaración de fe del ministerio confiesa que la Biblia, el Antiguo y el Nuevo Testamento, es la Palabra de Dios inspirada por el Espíritu Santo, sin error en lo que enseña y suficiente para la fe y la conducta, y que es la autoridad final de todo lo que creemos y hacemos.",
      },
    ],
    ideaClave:
      "Toda la Escritura es inspirada por Dios: exhalada por él (2 Timoteo 3:16). El Espíritu Santo guió a los autores humanos, con su propio estilo, para que escribieran la Palabra de Dios. La inspiración es plenaria y verbal, y Jesús enseñó que la Escritura no puede ser quebrantada: es la autoridad final.",
    paraLaVida: {
      texto: "Si la Biblia es la Palabra de Dios, merece tu obediencia, no solo tu admiración.",
      pregunta: "¿En qué área de tu vida necesitas que la Biblia tenga la última palabra?",
    },
  },
  {
    id: "n4-sistematica-1-3",
    objetivos: [
      "Explicar qué significa que la Biblia es sin error en lo que enseña.",
      "Describir cómo nos llegó el texto bíblico y por qué es confiable.",
      "Explicar la suficiencia y la claridad de la Escritura y la iluminación del Espíritu.",
    ],
    paraEmpezar:
      "Si Dios no puede mentir, su Palabra tampoco. Pero ¿qué significa exactamente que la Biblia no tiene error, y cómo sabemos que la que tenemos es la que Dios inspiró?",
    bloques: [
      { t: "versiculo", ref: "Proverbios 30:5-6" },
      {
        t: "parrafo",
        texto:
          "«Toda palabra de Dios es limpia». Porque Dios no miente (Tito 1:2), lo que su Palabra enseña es verdad. Decimos que la Biblia es sin error en lo que enseña: cuando se interpreta bien, según su sentido y su género, todo lo que afirma es verdad, en la fe, en la conducta y en los hechos que narra.",
      },
      {
        t: "parrafo",
        texto:
          "Esto no significa que la Biblia hable como un libro de ciencia moderna: describe el mundo como lo ve quien lo observa, como cuando dice que el sol sale y se pone. Tampoco anula las figuras, la poesía ni los números redondos. Significa que Dios no nos engaña en nada de lo que su Palabra afirma.",
      },
      { t: "subtitulo", texto: "Cómo nos llegó" },
      {
        t: "parrafo",
        texto:
          "No tenemos los escritos originales, pero sí miles de copias antiguas. Del Nuevo Testamento se conservan más de cinco mil manuscritos en griego, algunos muy cercanos a la época de los apóstoles. En 1947 se encontraron, junto al mar Muerto, rollos de libros del Antiguo Testamento unos mil años más antiguos que las copias que se conocían, entre ellos el libro de Isaías completo, y su texto coincide en lo esencial. Comparando las copias, los estudiosos recuperan el texto con gran seguridad, y ninguna doctrina depende de un pasaje dudoso.",
      },
      { t: "versiculo", ref: "Isaías 40:8" },
      { t: "subtitulo", texto: "Suficiente y clara" },
      { t: "versiculo", ref: "Salmos 19:7-8" },
      {
        t: "parrafo",
        texto:
          "«La ley de Jehová es perfecta, que convierte el alma; El testimonio de Jehová es fiel, que hace sabio al sencillo». La Escritura es suficiente: contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios, para que el creyente esté enteramente preparado para toda buena obra (2 Timoteo 3:17). Y es clara en lo esencial: un creyente sencillo puede entender el evangelio y lo que Dios le pide.",
      },
      { t: "subtitulo", texto: "La iluminación del Espíritu" },
      { t: "versiculo", ref: "1 Corintios 2:12-14" },
      {
        t: "parrafo",
        texto:
          "El mismo Espíritu que inspiró la Escritura ayuda al creyente a entenderla y a recibirla: hemos recibido el Espíritu que proviene de Dios, «para que sepamos lo que Dios nos ha concedido». La iluminación no añade revelaciones nuevas a la Biblia: abre el corazón para comprender y obedecer lo que ya está escrito.",
      },
      {
        t: "nota",
        titulo: "Nada está por encima de la Escritura",
        texto:
          "Ninguna visión, sueño o profecía de hoy está a la altura de la Escritura ni puede contradecirla: todo se examina a la luz de la Biblia (1 Tesalonicenses 5:20-21).",
      },
    ],
    ideaClave:
      "Porque Dios no miente, la Biblia es sin error en lo que enseña, bien interpretada según su sentido y su género. Tenemos miles de copias antiguas que permiten recuperar el texto con gran seguridad. La Escritura es suficiente y clara en lo esencial, y el Espíritu ilumina al creyente para entenderla y obedecerla, sin añadirle nada.",
    paraLaVida: {
      texto: "Puedes apoyar toda tu vida en la Palabra de Dios: no te va a fallar.",
      pregunta: "¿Qué duda sobre la Biblia has escuchado, y cómo la responderías con lo que aprendiste?",
    },
  },
  {
    id: "n4-sistematica-1-4",
    objetivos: [
      "Explicar por qué la Biblia da por sentada la existencia de Dios y qué dice del que la niega.",
      "Explicar que Dios se puede conocer de verdad, aunque no del todo.",
      "Describir el significado de los principales nombres de Dios en la Biblia.",
    ],
    paraEmpezar:
      "La Biblia no empieza con argumentos para probar que Dios existe. Empieza así: En el principio creó Dios. Dios es el punto de partida de todo.",
    bloques: [
      { t: "versiculo", ref: "Génesis 1:1" },
      { t: "versiculo", ref: "Hebreos 11:6" },
      {
        t: "parrafo",
        texto:
          "«Es necesario que el que se acerca a Dios crea que le hay, y que es galardonador de los que le buscan». La Biblia llama necio al que dice en su corazón que no hay Dios (Salmos 14:1): no por falta de inteligencia, sino porque cierra los ojos a la evidencia que Dios ha dado.",
      },
      { t: "subtitulo", texto: "Conocido, pero no del todo" },
      { t: "versiculo", ref: "Romanos 11:33-36" },
      { t: "versiculo", ref: "Isaías 55:8-9" },
      {
        t: "parrafo",
        texto:
          "Pablo exclama: «¡Oh profundidad de las riquezas de la sabiduría y de la ciencia de Dios!». Podemos conocer a Dios de verdad, porque él se ha revelado, pero nunca del todo, porque es infinito: «como son más altos los cielos que la tierra, así son mis caminos más altos que vuestros caminos». Por eso la buena teología termina en adoración.",
      },
      { t: "subtitulo", texto: "Los nombres de Dios" },
      { t: "versiculo", ref: "Éxodo 3:13-15" },
      {
        t: "parrafo",
        texto:
          "Cuando Moisés preguntó por su nombre, Dios respondió: «YO SOY EL QUE SOY». Su nombre propio, que en hebreo se escribe con cuatro letras (YHWH), la Reina-Valera lo traduce casi siempre como Jehová. Expresa que Dios existe por sí mismo, que es eterno y que siempre está presente con su pueblo, fiel a su pacto.",
      },
      {
        t: "lista",
        items: [
          "Elohim: Dios, el Creador poderoso (Génesis 1:1).",
          "Jehová (YHWH): el que es, el Dios del pacto (Éxodo 3:14-15).",
          "Adonai: Señor, el que tiene autoridad (Salmos 8:1).",
          "El Shaddai: el Dios Todopoderoso (Génesis 17:1).",
          "Jehová proveerá: el nombre que Abraham dio al monte donde Dios proveyó el sacrificio (Génesis 22:14).",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=7Ajug_ZAfW4", titulo: "Yahweh: SEÑOR", fuente: "Proyecto Biblia", minutos: 4 },
      { t: "versiculo", ref: "Juan 8:58" },
      {
        t: "nota",
        titulo: "Jesús y el YO SOY",
        texto:
          "Jesús dijo: «Antes que Abraham fuese, yo soy». Los que lo oyeron tomaron piedras para arrojárselas (Juan 8:59): entendieron que se identificaba con el Dios que habló a Moisés en Éxodo 3.",
      },
    ],
    ideaClave:
      "La Biblia da por sentado que Dios existe y llama necio al que lo niega. Dios se puede conocer de verdad porque se ha revelado, aunque nunca del todo, porque es infinito. Sus nombres lo revelan: Elohim, el Creador; Jehová, YO SOY EL QUE SOY, el Dios fiel a su pacto; Adonai, el Señor; y el Dios Todopoderoso.",
    paraLaVida: {
      texto: "El Dios que se llama YO SOY está presente en tu vida hoy.",
      pregunta: "¿Cuál de los nombres de Dios necesitas recordar esta semana, y por qué?",
    },
  },
  {
    id: "n4-sistematica-1-5",
    objetivos: [
      "Distinguir los atributos que solo Dios tiene de los que comparte en parte con el ser humano.",
      "Explicar con pasajes bíblicos la eternidad, la inmutabilidad, la omnipresencia, la omnisciencia y la omnipotencia de Dios.",
      "Explicar la santidad, el amor, la justicia y la fidelidad de Dios, y cómo se unen en la cruz.",
    ],
    paraEmpezar:
      "Para confiar en alguien necesitas saber cómo es. Los atributos de Dios son las perfecciones de su ser que la Biblia revela.",
    bloques: [
      { t: "subtitulo", texto: "Lo que solo Dios es" },
      { t: "versiculo", ref: "Salmos 90:2" },
      {
        t: "lista",
        items: [
          "Eterno: no tiene principio ni fin; desde el siglo y hasta el siglo él es Dios (Salmos 90:2).",
          "Inmutable: no cambia en su ser, en su carácter ni en sus promesas (Malaquías 3:6).",
          "Omnipresente: está en todo lugar con todo su ser (Salmos 139:7-10).",
          "Omnisciente: lo sabe todo, también lo que pensamos (Salmos 139:1-4).",
          "Omnipotente: puede hacer todo lo que quiere, de acuerdo con su naturaleza; nada es difícil para él (Jeremías 32:17).",
        ],
      },
      { t: "versiculo", ref: "Salmos 139:7-10" },
      { t: "versiculo", ref: "Malaquías 3:6" },
      {
        t: "parrafo",
        texto:
          "David preguntó: «¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?». No hay lugar donde Dios no esté. Que Dios no cambie es una gran noticia: «Porque yo Jehová no cambio». Sus promesas de hoy son tan firmes como las que hizo a Abraham.",
      },
      { t: "subtitulo", texto: "Lo que Dios comparte en parte con nosotros" },
      { t: "versiculo", ref: "Isaías 6:3" },
      { t: "versiculo", ref: "1 Juan 4:8-10" },
      {
        t: "parrafo",
        texto:
          "Los serafines proclamaban: «Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria». La santidad de Dios es su perfección moral y su separación de todo lo malo. «Dios es amor», y su amor da sin que lo merezcamos. Es justo: todos sus caminos son rectitud (Deuteronomio 32:4). Y es fiel: sus misericordias son nuevas cada mañana (Lamentaciones 3:22-23).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=3clgkz-40Sw", titulo: "Qué significa la idea de santidad en la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "En la cruz se unen" },
      { t: "versiculo", ref: "Romanos 3:25-26" },
      {
        t: "parrafo",
        texto:
          "La santidad y la justicia de Dios exigen que el pecado sea castigado; su amor busca salvar al pecador. En la cruz se encuentran: Dios puso a Cristo como propiciación, «a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús». Ningún atributo de Dios contradice a otro.",
      },
      {
        t: "nota",
        titulo: "Atributos para la vida",
        texto:
          "Cada atributo de Dios es un consuelo y un llamado: si está en todo lugar, nunca estás solo; si es fiel, sus promesas se cumplen; si es santo, vale la pena vivir en santidad (1 Pedro 1:15-16).",
      },
    ],
    ideaClave:
      "Los atributos de Dios son las perfecciones de su ser. Algunos son solo de él: es eterno, inmutable, omnipresente, omnisciente y omnipotente. Otros los comparte en parte con nosotros: es santo, amor, justo y fiel. En la cruz se unen su santidad, su justicia y su amor, y ningún atributo contradice a otro.",
    paraLaVida: {
      texto: "Conocer cómo es Dios cambia la manera en que oras, confías y obedeces.",
      pregunta: "¿Qué atributo de Dios te consuela más hoy, y cómo cambiará tu oración?",
    },
  },
  {
    id: "n4-sistematica-1-6",
    objetivos: [
      "Explicar la doctrina de la Trinidad con pasajes bíblicos: un solo Dios en tres personas.",
      "Reconocer los errores sobre la Trinidad: el modalismo, el triteísmo y el arrianismo.",
      "Explicar la creación de la nada y la providencia de Dios.",
    ],
    paraEmpezar:
      "Los cristianos adoramos a un solo Dios y confesamos que el Padre es Dios, el Hijo es Dios y el Espíritu Santo es Dios. ¿Cómo se entiende esto sin caer en errores?",
    bloques: [
      { t: "versiculo", ref: "Deuteronomio 6:4" },
      {
        t: "parrafo",
        texto:
          "«Oye, Israel: Jehová nuestro Dios, Jehová uno es». La Biblia enseña con fuerza que hay un solo Dios. Pero el Nuevo Testamento muestra que el Padre es Dios, que el Hijo es Dios (Juan 1:1) y que el Espíritu Santo es Dios: mentirle al Espíritu Santo es mentirle a Dios (Hechos 5:3-4). Y los tres son personas distintas que se relacionan entre sí.",
      },
      { t: "versiculo", ref: "Mateo 3:16-17" },
      { t: "versiculo", ref: "Mateo 28:19" },
      {
        t: "parrafo",
        texto:
          "En el bautismo de Jesús aparecen los tres a la vez: el Hijo sale del agua, el Espíritu desciende como paloma y el Padre habla desde el cielo. Jesús mandó bautizar «en el nombre del Padre, y del Hijo, y del Espíritu Santo»: un solo nombre, tres personas. Así lo confiesa la declaración de fe del ministerio: un solo Dios que existe eternamente en tres personas, iguales en esencia, poder y gloria.",
      },
      { t: "subtitulo", texto: "Errores que hay que evitar" },
      {
        t: "lista",
        items: [
          "El modalismo: dice que Dios es una sola persona que a veces se muestra como Padre, a veces como Hijo y a veces como Espíritu. Lo contradice el bautismo de Jesús, donde los tres están a la vez. Hoy lo enseñan los grupos unicitarios, llamados también de solo Jesús.",
          "El triteísmo: habla de tres dioses separados. Contradice que Dios es uno.",
          "El arrianismo: dice que el Hijo es una criatura y no Dios eterno. Hoy lo enseñan, por ejemplo, los Testigos de Jehová.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=g05ydbCIDHM", titulo: "Cómo es que Dios es uno y tres al mismo tiempo", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "La creación y la providencia" },
      { t: "versiculo", ref: "Hebreos 11:3" },
      { t: "versiculo", ref: "Colosenses 1:16-17" },
      {
        t: "parrafo",
        texto:
          "«Por la fe entendemos haber sido constituido el universo por la palabra de Dios, de modo que lo que se ve fue hecho de lo que no se veía». Dios creó todo de la nada, por su palabra, y todo lo que hizo era bueno en gran manera (Génesis 1:31). Y no abandonó su creación: la sostiene y la gobierna. A esto se le llama providencia: en Cristo «todas las cosas en él subsisten», y ni un pajarillo cae a tierra sin el Padre (Mateo 10:29).",
      },
      { t: "versiculo", ref: "Romanos 8:28" },
      {
        t: "parrafo",
        texto:
          "Por eso el creyente puede descansar: «a los que aman a Dios, todas las cosas les ayudan a bien». La providencia no hace a Dios autor del mal ni quita la responsabilidad humana, pero asegura que nada escapa de su mano.",
      },
      {
        t: "nota",
        titulo: "Un misterio para adorar",
        texto:
          "Ninguna comparación explica del todo la Trinidad: el agua, el huevo o el trébol terminan pareciéndose a algún error. Confesamos lo que la Biblia enseña y adoramos al Padre, al Hijo y al Espíritu Santo (2 Corintios 13:14).",
      },
    ],
    ideaClave:
      "Hay un solo Dios que existe eternamente en tres personas, el Padre, el Hijo y el Espíritu Santo, iguales en esencia, poder y gloria (Deuteronomio 6:4; Mateo 28:19). Hay que evitar el modalismo, el triteísmo y el arrianismo. Dios creó todo de la nada por su palabra, y en su providencia lo sostiene y lo gobierna.",
    paraLaVida: {
      texto: "El Dios trino que creó el universo cuida de tu vida en cada detalle.",
      pregunta: "¿Cómo le explicarías a un amigo, con la Biblia, que adoramos a un solo Dios en tres personas?",
    },
  },
];
