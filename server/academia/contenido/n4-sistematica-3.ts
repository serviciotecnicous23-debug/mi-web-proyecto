/**
 * Nivel 4 · Materia 3 — Teología sistemática III: el hombre, el pecado y la salvación (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La antropología, la hamartiología y la soteriología, con los artículos 5, 6 y 7 de la declaración de fe: la imagen de
 * Dios, el pecado y Pelagio, la gracia y la elección (calvinismo y arminianismo, presentados con respeto), la
 * conversión, la regeneración y la justificación, la adopción y la santificación, y la seguridad. La perseverancia es un
 * punto de la declaración de fe por confirmar: se presentan las dos posiciones.
 */
import type { LeccionContenido } from "../tipos";

export const N4_SISTEMATICA_3: LeccionContenido[] = [
  {
    id: "n4-sistematica-3-1",
    objetivos: [
      "Explicar qué significa que el ser humano fue creado a imagen de Dios.",
      "Describir las dos maneras de entender la constitución del ser humano.",
      "Aplicar la dignidad humana al ministerio y al trato con las personas.",
    ],
    paraEmpezar: "Para entender la salvación hay que entender primero a quién salva Dios: al ser humano, la obra que él hizo a su imagen.",
    bloques: [
      { t: "versiculo", ref: "Génesis 1:26-28" },
      {
        t: "parrafo",
        texto:
          "Dios dijo: «Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza». La imagen de Dios no es un parecido físico: el ser humano puede conocer a Dios, amar, razonar, decidir y gobernar la creación como su representante, «varón y hembra». Y recibió una tarea: «llenad la tierra, y sojuzgadla».",
      },
      { t: "versiculo", ref: "Génesis 2:7" },
      {
        t: "parrafo",
        texto:
          "Es polvo y aliento a la vez: Dios «formó al hombre del polvo de la tierra, y sopló en su nariz aliento de vida». El cuerpo no es malo; la persona entera es obra de Dios.",
      },
      { t: "versiculo", ref: "Salmos 8:4-6" },
      {
        t: "parrafo",
        texto: "El salmista se asombra: «¿Qué es el hombre, para que tengas de él memoria?», y responde: «lo coronaste de gloria y de honra».",
      },
      { t: "subtitulo", texto: "¿Dos partes o tres?" },
      { t: "versiculo", ref: "1 Tesalonicenses 5:23" },
      { t: "versiculo", ref: "Mateo 10:28" },
      {
        t: "parrafo",
        texto:
          "Los teólogos difieren en cómo describir al ser humano. La tricotomía habla de tres partes, y cita «todo vuestro ser, espíritu, alma y cuerpo». La dicotomía habla de dos, lo material y lo inmaterial, y cita a Jesús: «temed más bien a aquel que puede destruir el alma y el cuerpo». Las dos posiciones son evangélicas y coinciden en que la persona es una unidad que Dios quiere santificar por completo.",
      },
      { t: "versiculo", ref: "Santiago 3:9" },
      {
        t: "parrafo",
        texto:
          "La imagen de Dios no se perdió del todo con el pecado: Santiago reprende a los que maldicen a los hombres, «que están hechos a la semejanza de Dios». Por eso toda persona merece respeto, sea cual sea su origen, su condición o su pecado.",
      },
    ],
    ideaClave:
      "Dios creó al ser humano a su imagen, varón y hembra, para conocerlo, amar y gobernar la creación como su representante. Es polvo y aliento de vida, y Dios lo coronó de gloria y de honra. Algunos lo describen en tres partes y otros en dos, pero todos lo ven como una unidad. La imagen de Dios no se perdió del todo, y por eso toda persona merece respeto.",
    paraLaVida: {
      texto: "Cada persona que atiendes lleva la imagen de Dios.",
      pregunta: "¿Cómo cambia tu trato con las personas difíciles recordar que están hechas a la semejanza de Dios?",
    },
  },
  {
    id: "n4-sistematica-3-2",
    objetivos: [
      "Explicar el origen y la naturaleza del pecado.",
      "Describir el pecado original y sus consecuencias, y el error de Pelagio.",
      "Analizar el alcance del pecado en el ser humano.",
    ],
    paraEmpezar: "La Biblia no trata el pecado como un error pequeño, sino como la raíz de todo lo que está mal en el mundo y en el corazón humano.",
    bloques: [
      { t: "versiculo", ref: "Génesis 3:6-8" },
      {
        t: "parrafo",
        texto:
          "La primera desobediencia empezó con un deseo y una decisión: la mujer vio que el árbol era «codiciable para alcanzar la sabiduría», comió, y dio a su marido. Las consecuencias fueron inmediatas: la vergüenza y el escondite, porque «se escondieron de la presencia de Jehová Dios».",
      },
      { t: "versiculo", ref: "1 Juan 3:4" },
      { t: "versiculo", ref: "Santiago 4:17" },
      {
        t: "parrafo",
        texto:
          "El pecado es transgresión: «el pecado es infracción de la ley». Y también omisión: «al que sabe hacer lo bueno, y no lo hace, le es pecado».",
      },
      { t: "subtitulo", texto: "El pecado original" },
      { t: "versiculo", ref: "Romanos 5:18-19" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña que el pecado de Adán afectó a toda la humanidad: «por la desobediencia de un hombre los muchos fueron constituidos pecadores». A esto se le llama pecado original. Pero el mismo pasaje anuncia la esperanza: «por la obediencia de uno, los muchos serán constituidos justos».",
      },
      {
        t: "parrafo",
        texto:
          "A comienzos del siglo V, Pelagio enseñó que el ser humano nace sin inclinación al pecado y puede vivir sin pecar por su propio esfuerzo. Agustín de Hipona le respondió con la Escritura, y la iglesia rechazó la enseñanza de Pelagio: nadie puede salvarse sin la gracia de Dios.",
      },
      { t: "subtitulo", texto: "El alcance del pecado" },
      { t: "versiculo", ref: "Romanos 3:10-12" },
      { t: "versiculo", ref: "Efesios 2:1-3" },
      { t: "versiculo", ref: "Jeremías 17:9" },
      {
        t: "parrafo",
        texto:
          "El pecado alcanza a todos y a toda la persona: «No hay justo, ni aun uno». Sin Cristo estábamos «muertos en vuestros delitos y pecados», y «éramos por naturaleza hijos de ira». Aun el corazón engaña: «Engañoso es el corazón más que todas las cosas». No significa que el ser humano sea tan malo como podría ser, sino que ninguna parte de él quedó libre del pecado.",
      },
    ],
    ideaClave:
      "El pecado entró por la desobediencia de Adán y Eva, y trajo vergüenza y separación. Es infracción de la ley y también omisión del bien. Por un hombre los muchos fueron constituidos pecadores: es el pecado original, contra lo que enseñó Pelagio. El pecado alcanza a todos y a toda la persona: no hay justo, ni aun uno, y sin Cristo estábamos muertos en delitos y pecados.",
    paraLaVida: {
      texto: "Quien entiende la gravedad del pecado valora más la gracia.",
      pregunta: "¿Qué pecado de omisión necesitas reconocer delante de Dios?",
    },
  },
  {
    id: "n4-sistematica-3-3",
    objetivos: [
      "Explicar la gracia de Dios que se manifiesta para salvación.",
      "Comparar con respeto el calvinismo y el arminianismo sobre la elección.",
      "Reconocer en qué coinciden todos los evangélicos sobre la gracia y la responsabilidad humana.",
    ],
    paraEmpezar:
      "Si el ser humano está muerto en sus pecados, ¿cómo llega a creer? La respuesta empieza en Dios: en su gracia. Cómo se relacionan la gracia y la decisión humana ha dividido a buenos cristianos por siglos.",
    bloques: [
      { t: "versiculo", ref: "Tito 2:11" },
      {
        t: "parrafo",
        texto:
          "La gracia toma la iniciativa: «la gracia de Dios se ha manifestado para salvación a todos los hombres». Gracia es el favor que no merecemos; nadie busca a Dios si Dios no lo busca primero.",
      },
      { t: "versiculo", ref: "Juan 6:44" },
      { t: "versiculo", ref: "Efesios 1:4-6" },
      { t: "versiculo", ref: "Romanos 8:29-30" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «Ninguno puede venir a mí, si el Padre que me envió no le trajere». Pablo habla de un Dios que «nos escogió en él antes de la fundación del mundo» y de una cadena: «a los que antes conoció, también los predestinó», los llamó, los justificó y los glorificó.",
      },
      { t: "subtitulo", texto: "Dos maneras de entenderlo" },
      {
        t: "parrafo",
        texto:
          "El calvinismo, en la línea de Juan Calvino y del Sínodo de Dort (1618 y 1619), enseña que Dios elige a quienes salvará sin depender de nada en ellos, y que su gracia los lleva con seguridad a la fe. El arminianismo, en la línea de Jacobo Arminio y luego de Juan Wesley, enseña que Dios da a todos una gracia que les permite responder, y que elige a los que sabe de antemano que creerán. La mayoría de las iglesias pentecostales ha seguido una línea arminiana.",
      },
      { t: "versiculo", ref: "1 Timoteo 2:3-4" },
      { t: "versiculo", ref: "2 Pedro 3:9" },
      {
        t: "parrafo",
        texto:
          "Los arminianos subrayan que Dios «quiere que todos los hombres sean salvos» y que es paciente, «no queriendo que ninguno perezca». Los calvinistas subrayan que la salvación es toda de Dios. La declaración de fe del ministerio no entra en esta pregunta.",
      },
      {
        t: "nota",
        titulo: "En lo que todos coinciden",
        texto:
          "Calvinistas y arminianos evangélicos coinciden en que la salvación es solo por gracia, que Dios toma la iniciativa, que el ser humano es responsable de arrepentirse y creer, y que el evangelio se anuncia a todos. El líder enseña estas verdades con firmeza y trata con respeto a los hermanos que piensan distinto en lo demás.",
      },
    ],
    ideaClave:
      "La gracia de Dios se manifestó para salvación a todos: nadie viene a Cristo si el Padre no lo trae. Pablo habla de elección y de predestinación. El calvinismo enseña una elección que no depende de nada en el ser humano; el arminianismo, que la mayoría de los pentecostales ha seguido, enseña una gracia que permite a todos responder. Todos coinciden en que la salvación es solo por gracia y el ser humano es responsable de creer.",
    paraLaVida: {
      texto: "Antes de que tú buscaras a Dios, él ya te buscaba.",
      pregunta: "¿Cómo tratarías con respeto a un hermano que entiende la elección de otra manera?",
    },
  },
  {
    id: "n4-sistematica-3-4",
    objetivos: [
      "Explicar la conversión como arrepentimiento y fe.",
      "Distinguir la regeneración de la justificación.",
      "Explicar la justificación por la fe sin las obras de la ley.",
    ],
    paraEmpezar:
      "La salvación tiene un lado humano, la conversión, y una obra de Dios en dos aspectos: la regeneración, que cambia la naturaleza, y la justificación, que cambia la posición ante Dios.",
    bloques: [
      { t: "versiculo", ref: "Hechos 20:21" },
      {
        t: "parrafo",
        texto:
          "La conversión tiene dos caras inseparables. Pablo predicaba «el arrepentimiento para con Dios, y de la fe en nuestro Señor Jesucristo». Arrepentirse es dar la espalda al pecado; creer es volverse a Cristo y confiar en él.",
      },
      { t: "subtitulo", texto: "La regeneración" },
      { t: "versiculo", ref: "2 Corintios 5:17" },
      {
        t: "parrafo",
        texto:
          "La regeneración es el nuevo nacimiento que obra el Espíritu: «si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron». Cambia la naturaleza del creyente: le da una vida nueva desde adentro.",
      },
      { t: "subtitulo", texto: "La justificación" },
      { t: "versiculo", ref: "Romanos 3:28" },
      { t: "versiculo", ref: "Romanos 4:3-5" },
      {
        t: "parrafo",
        texto:
          "La justificación es una declaración de Dios, como la sentencia de un juez: el pecador es declarado justo. Pablo concluye: «el hombre es justificado por fe sin las obras de la ley». Así fue con Abraham: «Creyó Abraham a Dios, y le fue contado por justicia». Dios «justifica al impío» que cree.",
      },
      { t: "versiculo", ref: "Gálatas 2:16" },
      {
        t: "parrafo",
        texto:
          "Fue la gran verdad de la Reforma del siglo XVI, cuando Martín Lutero redescubrió que somos justificados solo por la fe. Pablo es claro: «por las obras de la ley nadie será justificado».",
      },
      { t: "versiculo", ref: "Romanos 5:1" },
      {
        t: "parrafo",
        texto:
          "Y el fruto es la paz: «Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo». Es el versículo de memoria de esta materia.",
      },
    ],
    ideaClave:
      "La conversión es arrepentimiento para con Dios y fe en Jesucristo. En la regeneración el Espíritu hace del creyente una nueva criatura: cambia su naturaleza. En la justificación Dios lo declara justo: cambia su posición. Somos justificados por la fe sin las obras de la ley, como Abraham, verdad que la Reforma volvió a proclamar, y justificados por la fe tenemos paz para con Dios.",
    paraLaVida: {
      texto: "Delante de Dios, el que cree en Cristo ya está declarado justo.",
      pregunta: "¿Cómo explicarías a un nuevo creyente la diferencia entre ser justificado y ser regenerado?",
    },
  },
  {
    id: "n4-sistematica-3-5",
    objetivos: [
      "Explicar la adopción del creyente como hijo de Dios.",
      "Distinguir la santificación posicional, la progresiva y la final.",
      "Reconocer las posiciones sobre la santificación completa en la tradición de santidad.",
    ],
    paraEmpezar: "Dios no solo declara justo al pecador: lo recibe en su familia y empieza a hacerlo santo. La adopción y la santificación son dos regalos más de la salvación.",
    bloques: [
      { t: "versiculo", ref: "Gálatas 4:4-7" },
      {
        t: "parrafo",
        texto:
          "Cristo vino «a fin de que recibiésemos la adopción de hijos». El Espíritu en el corazón clama «¡Abba, Padre!», y el resultado es un cambio de identidad: «ya no eres esclavo, sino hijo; y si hijo, también heredero de Dios por medio de Cristo».",
      },
      { t: "versiculo", ref: "1 Juan 3:1-2" },
      {
        t: "parrafo",
        texto: "Juan se asombra: «Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios».",
      },
      { t: "subtitulo", texto: "Tres aspectos de la santificación" },
      { t: "versiculo", ref: "Hebreos 10:10" },
      { t: "versiculo", ref: "Hebreos 10:14" },
      { t: "versiculo", ref: "Filipenses 3:12-14" },
      {
        t: "lista",
        items: [
          "Posicional: en Cristo el creyente ya fue apartado para Dios: «somos santificados mediante la ofrenda del cuerpo de Jesucristo hecha una vez para siempre».",
          "Progresiva: crece cada día; Pablo dice: «No que lo haya alcanzado ya», y «prosigo a la meta».",
          "Final: cuando Cristo se manifieste, «seremos semejantes a él».",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Hebreos une los dos primeros aspectos: «con una sola ofrenda hizo perfectos para siempre a los santificados», es decir, a los que están siendo santificados. Ya somos santos en Cristo, y estamos llegando a serlo en la vida diaria.",
      },
      {
        t: "nota",
        titulo: "La santificación completa",
        texto:
          "Juan Wesley enseñó una perfección cristiana, y algunas iglesias pentecostales de tradición de santidad hablan de una santificación completa como una experiencia definida. Otras la ven como un proceso que dura toda la vida. El artículo 7 de la declaración de fe la presenta como una posición en Cristo y un crecimiento diario por el Espíritu, la Palabra, la oración y la obediencia.",
      },
    ],
    ideaClave:
      "Por la adopción, el creyente ya no es esclavo, sino hijo y heredero de Dios, y el Espíritu clama en él: Abba, Padre. La santificación tiene tres aspectos: posicional, porque ya fuimos santificados por la ofrenda de Cristo hecha una vez para siempre; progresiva, porque proseguimos a la meta; y final, porque seremos semejantes a él. La declaración la presenta como posición y crecimiento diario.",
    paraLaVida: {
      texto: "Eres hijo antes de ser maduro: crece desde la seguridad del amor del Padre.",
      pregunta: "¿En qué área de tu vida necesitas seguir creciendo en santidad?",
    },
  },
  {
    id: "n4-sistematica-3-6",
    objetivos: [
      "Explicar la seguridad de la salvación basada en las promesas de Dios.",
      "Comparar las dos posiciones sobre la perseverancia que el ministerio debe confirmar.",
      "Describir la glorificación como el final de la salvación.",
    ],
    paraEmpezar: "¿Puede el creyente saber que es salvo? ¿Puede perder la salvación? La primera pregunta tiene una respuesta clara; la segunda divide a los evangélicos.",
    bloques: [
      { t: "versiculo", ref: "Romanos 8:38-39" },
      {
        t: "parrafo",
        texto:
          "La seguridad del creyente descansa en el amor de Dios: «ni la muerte, ni la vida, ni ángeles», ni «ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro». El artículo 6 de la declaración de fe enseña que se puede tener la seguridad de la vida eterna por las promesas de la Palabra.",
      },
      { t: "subtitulo", texto: "Un punto por confirmar: la perseverancia" },
      { t: "versiculo", ref: "Juan 10:28-29" },
      { t: "versiculo", ref: "Hebreos 6:4-6" },
      {
        t: "parrafo",
        texto:
          "Los calvinistas enseñan la perseverancia de los santos: quien de verdad nació de nuevo nunca pierde la salvación, porque «no perecerán jamás, ni nadie las arrebatará de mi mano». Los arminianos, como las Asambleas de Dios, enseñan que el creyente puede apartarse de la fe de manera definitiva y perderla, y leen así advertencias como la de los que «recayeron» después de haber sido «hechos partícipes del Espíritu Santo».",
      },
      { t: "versiculo", ref: "2 Pedro 1:10" },
      {
        t: "nota",
        titulo: "Lo que queda por confirmar",
        texto:
          "La posición del ministerio sobre la perseverancia es un punto de la declaración de fe por confirmar. Las dos posiciones coinciden en lo práctico: la seguridad descansa en Cristo y no en los sentimientos, y la Biblia llama a cada creyente a permanecer firme: «procurad hacer firme vuestra vocación y elección».",
      },
      { t: "subtitulo", texto: "La glorificación" },
      { t: "versiculo", ref: "Romanos 8:29-30" },
      {
        t: "parrafo",
        texto:
          "La salvación termina en la glorificación: «a los que justificó, a éstos también glorificó». En la venida de Cristo el creyente recibirá un cuerpo glorioso y será libre del pecado para siempre, hecho conforme «a la imagen de su Hijo».",
      },
    ],
    ideaClave:
      "La seguridad del creyente descansa en el amor de Dios, del que nada creado nos puede separar, y en las promesas de su Palabra. Los calvinistas enseñan que quien nació de nuevo nunca pierde la salvación; los arminianos, como las Asambleas de Dios, que puede perderla quien se aparta de manera definitiva: es un punto por confirmar. La salvación termina en la glorificación, cuando seremos conformes a la imagen del Hijo.",
    paraLaVida: {
      texto: "Tu seguridad no está en lo fuerte que te sientes, sino en lo fiel que es Cristo.",
      pregunta: "¿Cómo acompañarías a un hermano que duda de su salvación?",
    },
  },
];
