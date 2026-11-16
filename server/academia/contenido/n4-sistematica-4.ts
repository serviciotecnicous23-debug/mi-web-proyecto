/**
 * Nivel 4 · Materia 4 — Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La eclesiología, la angelología y la escatología, con los artículos 8, 12, 13, 16 y 17 de la declaración de fe. Dos
 * puntos de la declaración de fe por confirmar se presentan con sus posiciones: el ministerio de la mujer (lección 2) y
 * el orden de los últimos tiempos, el arrebatamiento y el milenio (lección 6).
 */
import type { LeccionContenido } from "../tipos";

export const N4_SISTEMATICA_4: LeccionContenido[] = [
  {
    id: "n4-sistematica-4-1",
    objetivos: [
      "Explicar qué es la iglesia y la diferencia entre la iglesia universal y la iglesia local.",
      "Describir las imágenes con que la Biblia presenta a la iglesia.",
      "Identificar las marcas de una iglesia sana según Hechos 2:42-47.",
    ],
    paraEmpezar:
      "Muchos dicen que van a la iglesia como quien va a un edificio. La Biblia habla de la iglesia como de un pueblo: no es un lugar al que vamos, sino lo que somos en Cristo.",
    bloques: [
      { t: "versiculo", ref: "Mateo 16:18" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella». La palabra del Nuevo Testamento es ekklesía, la asamblea de los llamados. La iglesia es de Cristo, porque él la edifica, y nada la vencerá.",
      },
      {
        t: "parrafo",
        texto:
          "Sobre «esta roca» hay lecturas distintas. La iglesia católica ve en Pedro el fundamento del papado. Los evangélicos entienden que la roca es la confesión que Pedro acababa de hacer, que Jesús es el Cristo, o Cristo mismo, y que Pedro fue parte del fundamento de los apóstoles, con Cristo como la piedra principal.",
      },
      { t: "subtitulo", texto: "La iglesia universal y la iglesia local" },
      { t: "versiculo", ref: "Efesios 1:22-23" },
      {
        t: "parrafo",
        texto:
          "La iglesia universal es el cuerpo de Cristo: todos los que han creído en él, de todo lugar y de toda época. Dios «lo dio por cabeza sobre todas las cosas a la iglesia, la cual es su cuerpo». La iglesia local es la expresión visible de ese cuerpo en un lugar: la congregación que se reúne, con sus líderes y sus miembros. El artículo 12 de la declaración de fe enseña las dos.",
      },
      { t: "subtitulo", texto: "Las imágenes de la iglesia" },
      { t: "versiculo", ref: "1 Corintios 12:12-13" },
      {
        t: "parrafo",
        texto:
          "Es un cuerpo: «el cuerpo es uno, y tiene muchos miembros». Por un solo Espíritu «fuimos todos bautizados en un cuerpo», sin importar el origen ni la condición de cada uno. Nadie sobra y nadie se basta solo.",
      },
      { t: "versiculo", ref: "Efesios 2:19-22" },
      {
        t: "parrafo",
        texto:
          "Es una familia y un templo: somos «miembros de la familia de Dios», y todo el edificio «va creciendo para ser un templo santo en el Señor», sobre «el fundamento de los apóstoles y profetas», con Jesucristo como «la principal piedra del ángulo».",
      },
      { t: "versiculo", ref: "1 Pedro 2:9" },
      {
        t: "parrafo",
        texto:
          "Es un pueblo: «linaje escogido, real sacerdocio, nación santa». Cada creyente es sacerdote: puede acercarse a Dios por medio de Cristo y servirle. Es lo que la Reforma llamó el sacerdocio de todos los creyentes.",
      },
      { t: "subtitulo", texto: "Las marcas de una iglesia sana" },
      { t: "versiculo", ref: "Hechos 2:42-47" },
      {
        t: "parrafo",
        texto:
          "Los primeros creyentes «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones». Esas cuatro marcas siguen siendo la base: la enseñanza de la Palabra, la comunión, la Santa Cena y la oración. Y llegó el fruto: «el Señor añadía cada día a la iglesia los que habían de ser salvos».",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Una iglesia no se mide solo por cuántos asisten, sino por si persevera en la doctrina, la comunión, el partimiento del pan y la oración. Esas marcas se cuidan en el culto, en los grupos y en las casas.",
      },
    ],
    ideaClave:
      "La iglesia es la asamblea de los llamados por Cristo, que él edifica y que nada vencerá. Es universal, el cuerpo de todos los creyentes, y local, la congregación que se reúne en un lugar. La Biblia la presenta como un cuerpo, una familia, un templo y un pueblo de sacerdotes. Una iglesia sana persevera en la doctrina, la comunión, el partimiento del pan y la oración.",
    paraLaVida: {
      texto: "No solo vas a la iglesia: eres parte de ella.",
      pregunta: "¿Cuál de las cuatro marcas de Hechos 2:42 necesita más atención en tu congregación?",
    },
  },
  {
    id: "n4-sistematica-4-2",
    objetivos: [
      "Describir las tres formas históricas de gobierno de la iglesia.",
      "Explicar los ministerios de Efesios 4 y los requisitos de los líderes.",
      "Presentar con respeto las posiciones sobre el ministerio de la mujer.",
    ],
    paraEmpezar: "Toda iglesia tiene que decidir quién la guía y cómo. La Biblia no da un organigrama, pero sí da principios claros.",
    bloques: [
      { t: "versiculo", ref: "Hechos 14:23" },
      {
        t: "parrafo",
        texto:
          "Pablo y Bernabé «constituyeron ancianos en cada iglesia», después de orar con ayunos. En el Nuevo Testamento, anciano (presbítero), obispo (supervisor) y pastor se usan para la misma tarea de guiar y cuidar la congregación, como se ve en Hechos 20 y en Tito 1. Los diáconos sirven en las necesidades prácticas, como los siete de Hechos 6, que muchos ven como los primeros diáconos.",
      },
      { t: "subtitulo", texto: "Tres formas de gobierno" },
      {
        t: "lista",
        items: [
          "Episcopal: la iglesia es guiada por obispos. La siguen la iglesia católica, la ortodoxa, la anglicana y la metodista.",
          "Presbiteriana: la iglesia es guiada por ancianos reunidos en consejos. La siguen las iglesias presbiterianas y reformadas.",
          "Congregacional: la congregación toma las decisiones principales. La siguen las iglesias bautistas y congregacionales.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Muchas iglesias pentecostales combinan rasgos de las tres: un pastor que guía, ancianos o diáconos que lo acompañan y una congregación que participa. La Biblia no impone una sola forma, pero sí pide orden, líderes de carácter y rendición de cuentas.",
      },
      { t: "subtitulo", texto: "Los ministerios y los requisitos" },
      { t: "versiculo", ref: "Efesios 4:11-13" },
      {
        t: "parrafo",
        texto:
          "Cristo «constituyó a unos, apóstoles; a otros, profetas; a otros, evangelistas; a otros, pastores y maestros», y les dio un propósito: «perfeccionar a los santos para la obra del ministerio». Los líderes no hacen toda la obra: preparan a todos para hacerla. Así lo enseña el artículo 13 de la declaración de fe.",
      },
      { t: "versiculo", ref: "1 Timoteo 3:1-7" },
      {
        t: "parrafo",
        texto:
          "Los requisitos del líder son sobre todo de carácter: que sea «irreprensible», «apto para enseñar», que «gobierne bien su casa» y que tenga «buen testimonio de los de afuera». Pablo advierte que no sea «un neófito», para que el orgullo no lo haga caer.",
      },
      { t: "subtitulo", texto: "El ministerio de la mujer" },
      { t: "versiculo", ref: "Hechos 2:17-18" },
      { t: "versiculo", ref: "Romanos 16:1-2" },
      {
        t: "parrafo",
        texto:
          "Muchas iglesias pentecostales, como las Asambleas de Dios, reconocen a mujeres como pastoras y predicadoras. Recuerdan que en Pentecostés se cumplió la promesa: «vuestros hijos y vuestras hijas profetizarán»; que Pablo recomienda a Febe, «diaconisa de la iglesia en Cencrea»; que Priscila, junto con Aquila, le explicó el camino de Dios a Apolos (Hechos 18:26), y que Débora fue profetisa y gobernó a Israel (Jueces 4:4).",
      },
      { t: "versiculo", ref: "1 Timoteo 2:11-12" },
      {
        t: "parrafo",
        texto:
          "Otras iglesias evangélicas, como la Convención Bautista del Sur en su confesión Fe y Mensaje Bautistas del año 2000, enseñan que el pastorado es solo para varones. Leen así las palabras de Pablo, «no permito a la mujer enseñar, ni ejercer dominio sobre el hombre», y el requisito de ser «marido de una sola mujer». Esas iglesias valoran a la mujer en muchos otros ministerios.",
      },
      {
        t: "nota",
        titulo: "Lo que queda por confirmar",
        texto:
          "El ministerio de la mujer es un punto de la declaración de fe por confirmar (artículo 13): si puede ejercer el pastorado y la predicación, o con qué límites. Las dos posiciones las sostienen cristianos que aman la Escritura, y las dos afirman que hombres y mujeres llevan por igual la imagen de Dios y reciben los dones del Espíritu para servir.",
      },
    ],
    ideaClave:
      "En el Nuevo Testamento, ancianos, obispos y pastores guían y cuidan la iglesia, y los diáconos sirven en lo práctico. Hay tres formas históricas de gobierno: episcopal, presbiteriana y congregacional. Cristo da ministerios para preparar a todos los santos para la obra, y pide líderes de carácter probado. Sobre el ministerio de la mujer hay dos posiciones evangélicas, y la del ministerio está por confirmar.",
    paraLaVida: {
      texto: "El líder no hace toda la obra: prepara a otros para hacerla.",
      pregunta: "¿A quién estás preparando hoy para servir?",
    },
  },
  {
    id: "n4-sistematica-4-3",
    objetivos: [
      "Explicar la misión de la iglesia según la gran comisión.",
      "Describir las cuatro tareas de la iglesia: adoración, edificación, evangelización y servicio.",
      "Explicar el sentido del bautismo en agua y de la Santa Cena.",
    ],
    paraEmpezar: "Una iglesia puede estar muy ocupada y aun así olvidar para qué existe. Jesús dejó claro cuál es su misión.",
    bloques: [
      { t: "versiculo", ref: "Mateo 28:18-20" },
      {
        t: "parrafo",
        texto:
          "Con «Toda potestad» en sus manos, Jesús mandó: «id, y haced discípulos a todas las naciones». La tarea no es solo que las personas crean, sino hacer discípulos: «bautizándolos» y «enseñándoles que guarden todas las cosas que os he mandado». Y prometió: «yo estoy con vosotros todos los días, hasta el fin del mundo».",
      },
      { t: "versiculo", ref: "Marcos 16:15-16" },
      { t: "versiculo", ref: "Hechos 1:8" },
      {
        t: "parrafo",
        texto:
          "La declaración de fe del ministerio (artículo 12) resume la misión con las palabras de Marcos: «Id por todo el mundo y predicad el evangelio a toda criatura». Y la iglesia no la cumple con sus fuerzas: «recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos».",
      },
      { t: "subtitulo", texto: "Cuatro tareas" },
      {
        t: "lista",
        items: [
          "La adoración, hacia Dios: la iglesia existe primero para glorificarlo.",
          "La edificación, hacia dentro: los creyentes crecen juntos en Cristo.",
          "La evangelización, hacia fuera: anuncia el evangelio y hace discípulos.",
          "El servicio, hacia el prójimo: muestra el amor de Dios con obras de misericordia.",
        ],
      },
      { t: "versiculo", ref: "Efesios 4:15-16" },
      {
        t: "parrafo",
        texto: "La edificación es obra de todos: el cuerpo crece «según la actividad propia de cada miembro» y va «edificándose en amor».",
      },
      { t: "versiculo", ref: "Gálatas 6:10" },
      {
        t: "parrafo",
        texto:
          "El servicio no se queda dentro de la iglesia: «hagamos bien a todos, y mayormente a los de la familia de la fe». La iglesia anuncia el evangelio con palabras y lo muestra con obras.",
      },
      { t: "subtitulo", texto: "Las dos ordenanzas" },
      { t: "versiculo", ref: "1 Corintios 11:23-26" },
      {
        t: "parrafo",
        texto:
          "Cristo dejó a su iglesia dos ordenanzas, como enseña el artículo 8 de la declaración de fe. El bautismo en agua, por inmersión, de los que se arrepintieron y creyeron, en el nombre del Padre, del Hijo y del Espíritu Santo, como testimonio de que murieron al pecado y resucitaron a una vida nueva. Y la Santa Cena, que se celebra «en memoria de mí», como comunión con Cristo y con su pueblo y como anuncio de su venida: «la muerte del Señor anunciáis hasta que él venga».",
      },
      {
        t: "nota",
        titulo: "¿Ordenanzas o sacramentos?",
        texto:
          "La iglesia católica enseña siete sacramentos, que según ella dan la gracia por el rito mismo. La mayoría de los evangélicos habla de dos ordenanzas, porque Cristo las ordenó: son señales de la gracia que se recibe por la fe. Sobre la Santa Cena, los católicos enseñan la transubstanciación; los luteranos, la presencia real de Cristo con el pan y el vino; Calvino, una presencia espiritual; y muchos evangélicos y pentecostales la viven sobre todo como un memorial.",
      },
    ],
    ideaClave:
      "La misión de la iglesia es la gran comisión: ir, hacer discípulos, bautizarlos y enseñarles, con el poder del Espíritu Santo. Cumple cuatro tareas: adora a Dios, edifica a los creyentes, evangeliza al mundo y sirve al prójimo. Cristo le dejó dos ordenanzas: el bautismo en agua de los que creyeron y la Santa Cena, memorial de su muerte hasta que él venga.",
    paraLaVida: {
      texto: "Tu iglesia existe para Dios, para los hermanos y para el mundo.",
      pregunta: "¿Cuál de las cuatro tareas está más débil en tu ministerio, y qué harás para fortalecerla?",
    },
  },
  {
    id: "n4-sistematica-4-4",
    objetivos: [
      "Explicar lo que la Biblia enseña sobre los ángeles y su servicio.",
      "Describir el origen, la obra y la derrota de Satanás y los demonios.",
      "Evitar los dos errores opuestos: negar el mundo espiritual o darle demasiada atención.",
    ],
    paraEmpezar:
      "Sobre los ángeles y los demonios circulan muchas ideas que no vienen de la Biblia. Aquí nos quedamos con lo que la Escritura dice, y donde ella calla, callamos.",
    bloques: [
      { t: "versiculo", ref: "Hebreos 1:14" },
      { t: "versiculo", ref: "Salmos 103:20" },
      {
        t: "parrafo",
        texto:
          "Los ángeles son seres espirituales creados por Dios (Colosenses 1:16). Son «espíritus ministradores, enviados para servicio a favor de los que serán herederos de la salvación», y el salmo los llama «Poderosos en fortaleza, que ejecutáis su palabra». No son personas que murieron, y no se les adora: cuando Juan quiso adorar a un ángel, este le dijo que adorara a Dios (Apocalipsis 22:8-9).",
      },
      { t: "versiculo", ref: "Lucas 1:19" },
      { t: "versiculo", ref: "Judas 1:9" },
      {
        t: "parrafo",
        texto:
          "La Biblia nombra a pocos: Gabriel, que dijo «estoy delante de Dios», y «el arcángel Miguel». Hace bien el líder en no inventar nombres, jerarquías ni mensajes de ángeles que la Escritura no da.",
      },
      { t: "subtitulo", texto: "Satanás y los demonios" },
      { t: "versiculo", ref: "Apocalipsis 12:9" },
      { t: "versiculo", ref: "Judas 1:6" },
      {
        t: "parrafo",
        texto:
          "El diablo es «la serpiente antigua», «el cual engaña al mundo entero». La mayoría de los evangélicos entiende que los demonios son ángeles que cayeron con él: «sus ángeles fueron arrojados con él», y Judas habla de «los ángeles que no guardaron su dignidad». Muchos intérpretes ven en Isaías 14 y Ezequiel 28, que hablan de los reyes de Babilonia y de Tiro, un reflejo de la caída de Satanás; otros los leen solo como profecías contra esos reyes. La Biblia no da todos los detalles de su origen.",
      },
      { t: "versiculo", ref: "1 Pedro 5:8-9" },
      { t: "versiculo", ref: "Colosenses 2:15" },
      {
        t: "parrafo",
        texto:
          "El diablo es real: «como león rugiente, anda alrededor buscando a quien devorar». Pero no es igual a Dios ni está fuera de su control, y ya fue vencido: Cristo despojó «a los principados y a las potestades», «triunfando sobre ellos en la cruz». Por eso el creyente no vive con miedo, sino que obedece: «resistid firmes en la fe».",
      },
      {
        t: "parrafo",
        texto:
          "Las Asambleas de Dios, por ejemplo, enseñan que un creyente nacido de nuevo, en quien mora el Espíritu Santo, no puede ser poseído por un demonio, aunque sí puede ser tentado y atacado.",
      },
      {
        t: "nota",
        titulo: "Dos errores opuestos",
        texto:
          "C. S. Lewis advirtió, en el prólogo de Cartas del diablo a su sobrino, sobre dos errores opuestos: no creer en los demonios, o interesarse en ellos de manera excesiva y malsana. El líder enseña que el enemigo existe y que fue vencido, y pone los ojos en Cristo, no en el diablo.",
      },
    ],
    ideaClave:
      "Los ángeles son espíritus creados que sirven a Dios a favor de los herederos de la salvación, y no se les adora. Satanás y los demonios son ángeles caídos que engañan y atacan, pero Cristo los venció en la cruz. El creyente los resiste firme en la fe, sin negar el mundo espiritual y sin darle más atención que la que le da la Biblia.",
    paraLaVida: {
      texto: "El enemigo es real, pero Cristo ya triunfó.",
      pregunta: "¿Hacia cuál de los dos errores tiende tu congregación: negar el mundo espiritual o darle demasiada atención?",
    },
  },
  {
    id: "n4-sistematica-4-5",
    objetivos: [
      "Explicar lo que la Biblia enseña sobre la muerte y lo que pasa después.",
      "Reconocer los errores sobre el estado intermedio.",
      "Describir la resurrección del cuerpo.",
    ],
    paraEmpezar: "Tarde o temprano, todo líder acompaña a una familia junto a una tumba. Lo que diga ese día tiene que salir de la Escritura.",
    bloques: [
      { t: "versiculo", ref: "Hebreos 9:27" },
      {
        t: "parrafo",
        texto:
          "La muerte no es el final, ni un nuevo comienzo en otra vida: está establecido «que mueran una sola vez, y después de esto el juicio». Por eso la Biblia no deja lugar a la reencarnación.",
      },
      { t: "subtitulo", texto: "El estado intermedio" },
      { t: "versiculo", ref: "Filipenses 1:21-23" },
      { t: "versiculo", ref: "2 Corintios 5:8" },
      { t: "versiculo", ref: "Lucas 23:43" },
      {
        t: "parrafo",
        texto:
          "Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz. Pablo deseaba «partir y estar con Cristo, lo cual es muchísimo mejor», y quería estar «ausentes del cuerpo, y presentes al Señor». Jesús le dijo al ladrón arrepentido: «hoy estarás conmigo en el paraíso».",
      },
      {
        t: "parrafo",
        texto:
          "Los que mueren sin Cristo esperan el juicio separados de Dios. Muchos maestros lo ven en el relato del rico y Lázaro (Lucas 16:19-31), aunque Jesús lo cuenta para advertir más que para describir cada detalle.",
      },
      {
        t: "nota",
        titulo: "Tres errores",
        texto:
          "La reencarnación contradice que morimos «una sola vez». El sueño del alma, que enseñan los adventistas y los testigos de Jehová, dice que el muerto no tiene conciencia hasta la resurrección, pero Pablo esperaba estar «presentes al Señor». Y el purgatorio, que la iglesia católica enseña como una purificación después de la muerte, no aparece en la Escritura: la obra de Cristo basta para limpiar al creyente.",
      },
      { t: "subtitulo", texto: "La resurrección del cuerpo" },
      { t: "versiculo", ref: "Juan 5:28-29" },
      {
        t: "parrafo",
        texto:
          "La esperanza no es solo que el alma vaya al cielo, sino la resurrección del cuerpo. Jesús enseñó que «todos los que están en los sepulcros oirán su voz»: unos «saldrán a resurrección de vida», y otros, «a resurrección de condenación».",
      },
      { t: "versiculo", ref: "1 Corintios 15:42-44" },
      {
        t: "parrafo",
        texto:
          "El cuerpo resucitado será el mismo y a la vez transformado: «Se siembra en corrupción, resucitará en incorrupción». Un «cuerpo espiritual» no es un fantasma, sino un cuerpo lleno de la vida del Espíritu, como el de Jesús resucitado, que comió con sus discípulos y se dejó tocar (Lucas 24:39-43).",
      },
    ],
    ideaClave:
      "El ser humano muere una sola vez, y después viene el juicio. Entre la muerte y la resurrección, el creyente está con Cristo, consciente y en paz, y el que murió sin Cristo espera el juicio. La Biblia no enseña la reencarnación, el sueño del alma ni el purgatorio. Todos resucitarán, unos para vida y otros para condenación, y el cuerpo del creyente será transformado, incorruptible y glorioso.",
    paraLaVida: {
      texto: "Junto a una tumba, la esperanza cristiana tiene nombre: resurrección.",
      pregunta: "¿Qué le dirías, con la Escritura, a una familia cristiana que acaba de perder a un ser querido?",
    },
  },
  {
    id: "n4-sistematica-4-6",
    objetivos: [
      "Explicar lo que todos los cristianos confiesan sobre la venida de Cristo.",
      "Comparar con respeto las posiciones sobre el arrebatamiento y el milenio.",
      "Describir el juicio final y el destino eterno.",
    ],
    paraEmpezar:
      "Pocos temas despiertan tanta curiosidad, y tantas especulaciones, como los últimos tiempos. El líder empieza por lo que la Biblia dice con claridad.",
    bloques: [
      { t: "versiculo", ref: "Hechos 1:11" },
      { t: "versiculo", ref: "Tito 2:13" },
      {
        t: "parrafo",
        texto:
          "Todos los cristianos confiesan que Cristo volverá en persona y de manera visible: «Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo». Su venida es «la esperanza bienaventurada» de la iglesia, como enseña el artículo 16 de la declaración de fe.",
      },
      { t: "versiculo", ref: "Mateo 24:36" },
      {
        t: "parrafo",
        texto:
          "Nadie puede poner fecha: «del día y la hora nadie sabe, ni aun los ángeles de los cielos». Todos los que han anunciado una fecha se han equivocado. El llamado de Jesús es a velar y a estar preparados.",
      },
      { t: "subtitulo", texto: "El arrebatamiento" },
      { t: "versiculo", ref: "1 Tesalonicenses 4:16-17" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña que «los muertos en Cristo resucitarán primero», y que los creyentes que vivan «seremos arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire». De la traducción latina de esa frase viene la palabra rapto.",
      },
      {
        t: "parrafo",
        texto:
          "Los evangélicos difieren sobre el momento. El pretribulacionismo, que enseñan las Asambleas de Dios y muchas iglesias pentecostales, dice que el arrebatamiento ocurrirá antes de la gran tribulación. El postribulacionismo dice que ocurrirá al final de la tribulación, en la venida visible de Cristo. Hay también posiciones intermedias.",
      },
      { t: "subtitulo", texto: "El milenio" },
      { t: "versiculo", ref: "Apocalipsis 20:4-6" },
      {
        t: "parrafo",
        texto: "Apocalipsis 20 habla de los que «reinaron con Cristo mil años». Hay tres lecturas principales:",
      },
      {
        t: "lista",
        items: [
          "El premilenarismo: Cristo vendrá antes del milenio y reinará mil años en la tierra. Lo enseñan las Asambleas de Dios y muchos evangélicos.",
          "El amilenarismo: los mil años son una figura del reinado presente de Cristo, desde su resurrección hasta su venida. Viene de Agustín, y es la lectura más común en la iglesia católica y en muchas iglesias reformadas y luteranas.",
          "El postmilenarismo: el evangelio se extenderá y traerá un largo tiempo de paz, y después vendrá Cristo. Lo sostuvieron muchos puritanos y Jonathan Edwards.",
        ],
      },
      {
        t: "nota",
        titulo: "Lo que queda por confirmar",
        texto:
          "El orden de los últimos tiempos es un punto de la declaración de fe por confirmar (artículo 16): si el ministerio enseña el arrebatamiento de la iglesia antes de la gran tribulación y un reino de mil años de Cristo en la tierra, como las Asambleas de Dios. Todas las posiciones confiesan lo central: Cristo volverá en persona, los muertos resucitarán, habrá juicio y Dios hará nuevas todas las cosas.",
      },
      { t: "subtitulo", texto: "El juicio" },
      { t: "versiculo", ref: "2 Corintios 5:10" },
      {
        t: "parrafo",
        texto:
          "Los creyentes comparecerán «ante el tribunal de Cristo, para que cada uno reciba según lo que haya hecho». No es un juicio para condenación, porque la salvación es por gracia, sino para recibir según su servicio.",
      },
      { t: "versiculo", ref: "Apocalipsis 20:11-15" },
      {
        t: "parrafo",
        texto:
          "Juan vio «un gran trono blanco», y los muertos «fueron juzgados cada uno según sus obras». Y «el que no se halló inscrito en el libro de la vida fue lanzado al lago de fuego». Los premilenaristas suelen distinguir el tribunal de Cristo para los creyentes y el gran trono blanco al final del milenio; otros ven un solo juicio final con dos aspectos.",
      },
      { t: "subtitulo", texto: "La eternidad" },
      { t: "versiculo", ref: "Mateo 25:46" },
      { t: "versiculo", ref: "Apocalipsis 21:1-4" },
      {
        t: "parrafo",
        texto:
          "Jesús usó la misma palabra para los dos destinos: «E irán éstos al castigo eterno, y los justos a la vida eterna». Por eso la iglesia rechaza el universalismo, la idea de que al final todos se salvarán. Para los redimidos, Dios promete «un cielo nuevo y una tierra nueva», donde «él morará con ellos» y «ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».",
      },
    ],
    ideaClave:
      "Cristo volverá en persona y de manera visible, y nadie sabe el día ni la hora. Los muertos en Cristo resucitarán y los creyentes que vivan serán arrebatados. Sobre el momento del arrebatamiento y sobre el milenio hay varias posiciones evangélicas, y la del ministerio está por confirmar. Habrá juicio, y el destino será eterno: castigo para los que rechazaron a Cristo, y vida eterna con Dios en los cielos nuevos y la tierra nueva para los redimidos.",
    paraLaVida: {
      texto: "La esperanza de la venida de Cristo no es para especular, sino para vivir preparado.",
      pregunta: "¿Cómo cambia tu manera de vivir y de servir saber que Cristo puede venir en cualquier momento?",
    },
  },
];
