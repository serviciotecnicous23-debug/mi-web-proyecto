/**
 * Especialidad Familia y consejería · Materia 2 — Consejería familiar (materia avanzada; sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: la familia según Dios y el consejero
 * familiar, la crianza con amor y con límites, los adolescentes y los hijos adultos, las familias ensambladas y los
 * padres solos, las crisis de la familia (con lo que dice USCIS sobre los notarios, comprobado) y el perdón y la
 * reconciliación. No reemplaza la terapia familiar profesional, y lo legal es una guía general.
 */
import type { LeccionContenido } from "../tipos";

export const FAMILIA_CONSEJERIA_2: LeccionContenido[] = [
  {
    id: "familia-consejeria-2-1",
    objetivos: [
      "Explicar el propósito de Dios para la familia según la Biblia.",
      "Describir cómo el problema de uno afecta a toda la familia, y el lugar del consejero familiar.",
      "Dirigir la primera reunión con una familia que pide ayuda.",
    ],
    paraEmpezar:
      "Cuando una familia pide ayuda, casi siempre llega por el problema de uno: el hijo que se rebeló, el padre que bebe, la madre que ya no tiene fuerzas. Pero en una familia lo que le pasa a uno les pasa a todos. El consejero de la iglesia aprende a mirar a la familia entera, con la Palabra y con paciencia.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=qfMplfJoYA0", titulo: "Resumen del libro de Deuteronomio", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Salmos 127:1" },
      {
        t: "parrafo",
        texto:
          "El salmo lo dice con claridad: «Si Jehová no edificare la casa, En vano trabajan los que la edifican». La familia es idea de Dios, y solo él puede sostenerla.",
      },
      { t: "versiculo", ref: "Deuteronomio 6:6-7" },
      {
        t: "parrafo",
        texto:
          "Dios puso en la familia la tarea de pasar la fe a los hijos: «y las repetirás a tus hijos, y hablarás de ellas estando en tu casa, y andando por el camino». La fe se aprende en la vida diaria de la casa, no solo en el templo.",
      },
      { t: "versiculo", ref: "Josué 24:15" },
      {
        t: "parrafo",
        texto:
          "Josué tomó una decisión por su familia: «pero yo y mi casa serviremos a Jehová». Cada familia decide a quién servirá.",
      },
      { t: "versiculo", ref: "Proverbios 24:3-4" },
      {
        t: "parrafo",
        texto:
          "Y el sabio añade: «Con sabiduría se edificará la casa, Y con prudencia se afirmará». La sabiduría de Dios es la base de una familia sana.",
      },
      { t: "subtitulo", texto: "La familia es como un cuerpo" },
      {
        t: "parrafo",
        texto:
          "En una familia, cada uno afecta a los demás. Cuando un hijo se mete en problemas, a veces está mostrando el dolor de toda la casa: un conflicto entre los padres, una pérdida que nadie ha llorado o una presión de la que nadie habla. Por eso el consejero no busca a un culpable, sino que mira a la familia entera.",
      },
      { t: "subtitulo", texto: "Lo que mira el consejero en una familia" },
      {
        t: "lista",
        items: [
          "Quién vive en la casa y quién falta: los abuelos, el padre que se fue, el hijo que se casó.",
          "Cómo se hablan: quién habla, quién calla y cómo resuelven los desacuerdos.",
          "Las reglas que nadie dice, como que de cierto tema no se habla o que al papá no se le contradice.",
          "Las heridas del pasado: las pérdidas, los secretos, las adicciones o la violencia.",
          "Lo bueno que tiene la familia: su fe, su cariño, sus tradiciones y su fuerza para salir adelante.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: mirar a una persona o mirar a la familia" },
      {
        t: "lista",
        items: [
          "Mirar a una persona: se busca al culpable. Mirar a la familia: se busca entender lo que les pasa a todos.",
          "Mirar a una persona: se corrige solo al que da problemas. Mirar a la familia: cada uno cambia su parte.",
          "Mirar a una persona: se escucha a uno. Mirar a la familia: se escucha a cada uno.",
          "Mirar a una persona: el cambio dura poco. Mirar a la familia: el cambio dura más, porque cambia la casa.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la primera reunión con una familia" },
      {
        t: "lista",
        items: [
          "Paso 1, invitar a todos los que viven en la casa, también a los hijos, según su edad.",
          "Paso 2, explicar el marco: cuánto durará, que todos hablarán por turnos y qué queda en confianza y qué no.",
          "Paso 3, escuchar a cada uno: ¿qué está pasando en la familia, según tú?, sin que nadie interrumpa.",
          "Paso 4, nombrar lo bueno: lo que cada uno valora de su familia.",
          "Paso 5, nombrar el problema como un problema de todos, sin señalar a un culpable.",
          "Paso 6, un primer acuerdo pequeño para la semana, como cenar juntos dos noches sin teléfonos, y orar juntos.",
          "Paso 7, si aparece violencia, abuso o peligro, hablar con cada uno por separado y actuar, como se vio en Consejería matrimonial.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuando el problema te supera, deriva a un terapeuta matrimonial y familiar con licencia, sin dejar de acompañar a la familia con oración y con la iglesia. Y no aconsejes a un niño a solas: siempre con otro adulto presente o en un lugar visible.",
      },
    ],
    ideaClave:
      "Si Jehová no edifica la casa, en vano trabajan los que la edifican, y Dios puso en la familia la tarea de pasar la fe a los hijos en la vida diaria. En una familia lo que le pasa a uno les pasa a todos; por eso el consejero no busca a un culpable: escucha a cada uno, nombra lo bueno, trata el problema como un problema de todos y deriva cuando hace falta.",
    paraLaVida: {
      texto: "Cada familia decide a quién servirá.",
      pregunta: "¿Qué decisión necesita tomar hoy tu casa?",
    },
  },
  {
    id: "familia-consejeria-2-2",
    objetivos: [
      "Explicar lo que enseña la Biblia sobre la crianza y la disciplina.",
      "Comparar las maneras de criar y sus frutos.",
      "Ayudar a unos padres a armar un plan de disciplina con amor.",
    ],
    paraEmpezar:
      "Muchos padres llegan cansados: no saben cómo corregir a sus hijos sin gritar, o se sienten culpables y ya no ponen límites. La Biblia no da una receta para cada caso, pero sí un camino: amor, enseñanza y límites claros.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=AG4jqCUapng", titulo: "Resumen del libro de Colosenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Efesios 6:1-4" },
      {
        t: "parrafo",
        texto:
          "Pablo habla a los dos. A los hijos: «Hijos, obedeced en el Señor a vuestros padres, porque esto es justo». Y a los padres: «no provoquéis a ira a vuestros hijos, sino criadlos en disciplina y amonestación del Señor».",
      },
      { t: "versiculo", ref: "Colosenses 3:21" },
      {
        t: "parrafo",
        texto:
          "Y a los colosenses les escribe: «Padres, no exasperéis a vuestros hijos, para que no se desalienten». La dureza sin amor desanima a los hijos.",
      },
      { t: "versiculo", ref: "Proverbios 22:6" },
      {
        t: "parrafo",
        texto:
          "«Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él». Criar es enseñar, con paciencia y con el ejemplo.",
      },
      { t: "versiculo", ref: "Hebreos 12:11" },
      {
        t: "parrafo",
        texto:
          "La disciplina no es agradable: «ninguna disciplina al presente parece ser causa de gozo, sino de tristeza; pero después da fruto apacible de justicia». Su meta es formar, no humillar.",
      },
      { t: "subtitulo", texto: "Comparación: cuatro maneras de criar" },
      {
        t: "lista",
        items: [
          "Autoritaria: muchas reglas y poco cariño. Los hijos obedecen por miedo, y suelen rebelarse o esconderse.",
          "Permisiva: mucho cariño y pocos límites. Los hijos crecen sin saber esperar ni respetar.",
          "Ausente: poco cariño y pocos límites. Los hijos se sienten solos y buscan afuera lo que no tienen en casa.",
          "Con amor y con límites: cariño, reglas claras y explicadas, y consecuencias justas. Es la que más se parece a la de nuestro Padre.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La psicóloga Diana Baumrind estudió estas maneras de criar, y la de amor con límites es la que suele dar mejores frutos. La Biblia ya pedía las dos cosas: no exasperar a los hijos y criarlos en disciplina.",
      },
      { t: "subtitulo", texto: "Disciplinar no es castigar con ira" },
      {
        t: "lista",
        items: [
          "La disciplina enseña; el castigo con ira solo descarga el enojo del padre.",
          "La consecuencia tiene que ver con la falta: si rompe algo, ayuda a repararlo.",
          "Se avisa antes y se cumple después, sin amenazas que nunca se cumplen.",
          "Los dos padres se ponen de acuerdo, y no se desautorizan delante de los hijos.",
          "Después de corregir, se restaura la relación: un abrazo, una conversación y una oración.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un plan de disciplina con amor" },
      {
        t: "parrafo",
        texto:
          "Unos padres cuentan que su hijo de diez años no hace las tareas, les contesta mal y pasa horas con los videojuegos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar a los padres, y después al niño, sin juzgar.",
          "Paso 2, que los padres se pongan de acuerdo en pocas reglas claras: las tareas antes del juego y hablar con respeto.",
          "Paso 3, explicar las reglas al niño, con sus consecuencias: si no hace las tareas, ese día no hay videojuegos.",
          "Paso 4, cumplir con calma y sin gritos, todas las veces.",
          "Paso 5, buscar cada día un tiempo de cariño: jugar, conversar y leer la Biblia juntos.",
          "Paso 6, revisar el plan en dos semanas con el consejero y celebrar lo que mejoró.",
        ],
      },
      {
        t: "nota",
        titulo: "Lo que nunca es disciplina",
        texto:
          "La disciplina nunca es maltrato: no deja marcas ni lesiones, no humilla ni insulta, y no se hace con ira. Si un niño tiene lesiones, cuenta que lo golpean o vive con miedo en su casa, se reporta como pide la ley en Texas, a la línea 1-800-252-5400 (Código de Familia, sección 261.101). Lo legal es una guía general, no un consejo legal.",
      },
    ],
    ideaClave:
      "Dios pide a los hijos obedecer a sus padres, y a los padres no exasperar a sus hijos, sino criarlos en disciplina y amonestación del Señor. La crianza con amor y con límites es la que más se parece a la de nuestro Padre: reglas claras, consecuencias justas, padres de acuerdo y la relación restaurada después de corregir. La disciplina nunca es maltrato, y el maltrato de un niño se reporta.",
    paraLaVida: {
      texto: "La disciplina forma; la ira solo hiere.",
      pregunta: "¿Qué padre o madre de tu iglesia necesita ánimo para criar con amor y con límites?",
    },
  },
  {
    id: "familia-consejeria-2-3",
    objetivos: [
      "Explicar cómo cambia la relación entre padres e hijos cuando los hijos crecen.",
      "Mediar en un conflicto entre unos padres y su hijo adolescente.",
      "Aconsejar a unos padres que tienen un hijo adulto que se alejó.",
    ],
    paraEmpezar:
      "Los hijos crecen, y la familia tiene que cambiar con ellos. Lo que servía con un niño de seis años no sirve con uno de dieciséis, ni con uno de treinta. Muchos conflictos nacen de no dar ese paso a tiempo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=sm8-GQl9P6w", titulo: "Lucas 9 a 19: cómo seguir a Jesús", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Lucas 2:48-52" },
      {
        t: "parrafo",
        texto:
          "Cuando Jesús tenía doce años, se quedó en el templo, y sus padres lo buscaron sin hallarlo. María le dijo: «Hijo, ¿por qué nos has hecho así? He aquí, tu padre y yo te hemos buscado con angustia». Ellos no entendieron todo lo que les respondió, pero Jesús «descendió con ellos, y volvió a Nazaret, y estaba sujeto a ellos», y «crecía en sabiduría y en estatura, y en gracia para con Dios y los hombres».",
      },
      {
        t: "parrafo",
        texto:
          "Hasta la familia de Jesús vivió la angustia de una etapa nueva. Los padres no siempre entienden a sus hijos, pero el amor y el respeto siguen, y los hijos crecen.",
      },
      { t: "versiculo", ref: "Éxodo 20:12" },
      {
        t: "parrafo",
        texto:
          "El mandamiento no tiene edad: «Honra a tu padre y a tu madre». El hijo adulto ya no obedece como un niño, pero sigue honrando a sus padres.",
      },
      { t: "versiculo", ref: "Lucas 15:20" },
      {
        t: "parrafo",
        texto:
          "En la parábola del hijo pródigo, el padre no persiguió al hijo, pero lo esperó: «cuando aún estaba lejos, lo vio su padre, y fue movido a misericordia, y corrió, y se echó sobre su cuello, y le besó».",
      },
      { t: "subtitulo", texto: "Comparación: lo que cambia en cada etapa" },
      {
        t: "lista",
        items: [
          "El niño: los padres deciden, enseñan y cuidan.",
          "El adolescente: los padres guían, conversan algunas reglas y dan más libertad a medida que crece la confianza.",
          "El joven adulto: los padres aconsejan cuando se les pide, y el hijo se hace cargo de su vida.",
          "El hijo casado: deja a su padre y a su madre y forma su propio hogar, y los padres respetan ese hogar.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un conflicto entre unos padres y su hija de dieciséis años" },
      {
        t: "parrafo",
        texto:
          "Los padres de Andrea, de dieciséis años, discuten con ella todos los días por la hora de llegar y por el teléfono.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar por separado: primero a los padres y después a Andrea, para que cada uno hable con libertad.",
          "Paso 2, reunirlos y pedir que cada uno diga lo que necesita: los padres, saber que está segura; Andrea, un poco más de confianza.",
          "Paso 3, nombrar lo que no se negocia: la seguridad, el respeto y la fe de la casa.",
          "Paso 4, negociar lo demás: una hora de llegar para los fines de semana y un horario para el teléfono.",
          "Paso 5, poner el acuerdo por escrito, con lo que pasa si se cumple, más libertad, y si no se cumple, menos.",
          "Paso 6, revisar el acuerdo en un mes, y reconocer lo que cada uno hizo bien.",
        ],
      },
      { t: "subtitulo", texto: "Cuando un hijo adulto se aleja" },
      {
        t: "lista",
        items: [
          "Orar por él sin cansarse, como el padre que esperaba.",
          "Mantener la puerta abierta y el cariño, sin un sermón en cada llamada.",
          "No pagar su pecado: amar no es financiar una adicción ni cubrir sus mentiras.",
          "Poner límites cuando hay peligro: un hijo que es violento o que consume drogas en la casa no puede seguir así.",
          "Cuidar el matrimonio y a los otros hijos, que también sufren.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuando un adolescente habla de quitarse la vida, de un abuso o de un peligro, no se guarda el secreto: se actúa como se vio en Consejería juvenil, con la línea 988 y el deber de reportar.",
      },
    ],
    ideaClave:
      "Los hijos crecen y la familia tiene que cambiar con ellos: con el niño los padres deciden, con el adolescente guían y conversan las reglas, y con el hijo adulto aconsejan y respetan su hogar. El mandamiento de honrar a los padres no tiene edad. Ante un hijo que se aleja, los padres oran, lo esperan con la puerta abierta como el padre del hijo pródigo y ponen límites sin pagar su pecado.",
    paraLaVida: {
      texto: "El padre del hijo pródigo no lo persiguió, pero lo esperó.",
      pregunta: "¿Por qué hijo que se alejó puedes orar hoy?",
    },
  },
  {
    id: "familia-consejeria-2-4",
    objetivos: [
      "Describir los desafíos de una familia ensamblada.",
      "Aconsejar a una familia ensamblada para que se una con paciencia.",
      "Organizar el apoyo de la iglesia a los padres y las madres que crían solos.",
    ],
    paraEmpezar:
      "Hoy muchas familias de la iglesia no se parecen a la foto de siempre: una madre que cría sola, un padre viudo, una pareja que se casó por segunda vez y une a los hijos de los dos. Dios no las mira como familias de segunda. La iglesia tampoco debe hacerlo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=f984fG4-xlE", titulo: "Resumen del libro de Rut", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Salmos 68:5-6" },
      {
        t: "parrafo",
        texto:
          "Dios se presenta así: «Padre de huérfanos y defensor de viudas Es Dios en su santa morada». Y añade: «Dios hace habitar en familia a los desamparados».",
      },
      { t: "versiculo", ref: "Rut 1:16" },
      {
        t: "parrafo",
        texto:
          "Rut no era de la sangre de Noemí, pero le dijo: «a dondequiera que tú fueres, iré yo, y dondequiera que vivieres, viviré. Tu pueblo será mi pueblo, y tu Dios mi Dios». Una familia también se forma con el amor y la lealtad.",
      },
      { t: "versiculo", ref: "Santiago 1:27" },
      {
        t: "parrafo",
        texto:
          "Santiago lo lleva a la práctica: «Visitar a los huérfanos y a las viudas en sus tribulaciones». Cuidar a las familias que están solas es parte de la fe verdadera.",
      },
      { t: "subtitulo", texto: "Los desafíos de una familia ensamblada" },
      {
        t: "lista",
        items: [
          "Los hijos sienten que querer al padrastro o a la madrastra es traicionar a su papá o a su mamá.",
          "Cada familia trae sus costumbres, sus reglas y sus heridas.",
          "El padrastro o la madrastra quiere corregir antes de haberse ganado la confianza.",
          "El otro padre o la otra madre sigue presente, y a veces hay conflictos por los hijos, las visitas o el dinero.",
          "La pareja tiene poco tiempo para sí misma, y los hijos a veces intentan dividirla.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que ayuda y lo que daña en una familia ensamblada" },
      {
        t: "lista",
        items: [
          "Ayuda: que la pareja se una y decida junta. Daña: que cada uno defienda solo a sus hijos.",
          "Ayuda: que el padrastro se gane la confianza antes de corregir. Daña: imponer la autoridad desde el primer día.",
          "Ayuda: hablar con respeto del otro padre o de la otra madre. Daña: criticarlos delante de los hijos.",
          "Ayuda: dar tiempo, porque unirse lleva años. Daña: esperar que todos se quieran enseguida.",
          "Ayuda: crear tradiciones nuevas de la familia. Daña: borrar las costumbres de los hijos.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan de la iglesia para una madre que cría sola" },
      {
        t: "parrafo",
        texto:
          "Rosa es viuda, trabaja en dos turnos y cría sola a sus tres hijos. Llega cansada a la iglesia y casi no habla con nadie.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escucharla: preguntarle lo que necesita, sin suponer.",
          "Paso 2, ayuda práctica: un grupo de la iglesia que lleve comida una vez por semana y ayude a los niños con las tareas.",
          "Paso 3, un respiro: unas horas al mes en que otras familias cuidan a los niños para que ella descanse.",
          "Paso 4, mentores: un matrimonio de confianza que acompañe a los hijos, en grupo y en lugares visibles.",
          "Paso 5, una amiga: una hermana que ore con ella y la llame cada semana.",
          "Paso 6, revisar con ella cada tres meses qué ayuda le sirve y qué le falta.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si la madre o el padre que cría solo viene de una separación con violencia, cuida que la ayuda no revele dónde vive ni cómo encontrarlo, y sigue lo que se vio sobre la violencia en el hogar en Consejería matrimonial.",
      },
    ],
    ideaClave:
      "Dios es padre de huérfanos y defensor de viudas, y hace habitar en familia a los desamparados; Rut muestra que una familia también se forma con el amor y la lealtad. Una familia ensamblada se une con paciencia: la pareja decide junta, el padrastro se gana la confianza antes de corregir y se habla con respeto del otro padre. La iglesia acompaña a los que crían solos con ayuda práctica, un respiro y mentores.",
    paraLaVida: {
      texto: "Ninguna familia es de segunda delante de Dios.",
      pregunta: "¿Qué familia que cría sola puedes ayudar este mes?",
    },
  },
  {
    id: "familia-consejeria-2-5",
    objetivos: [
      "Reconocer las crisis más comunes que golpean a una familia.",
      "Acompañar paso a paso a una familia en crisis.",
      "Orientar a una familia inmigrante a buscar una ayuda legal segura.",
    ],
    paraEmpezar:
      "Una enfermedad, un despido, una deportación, un divorcio o una muerte pueden sacudir a una familia en un solo día. En la crisis, la familia necesita a Dios y necesita a su iglesia, con consuelo y con ayuda práctica.",
    bloques: [
      { t: "versiculo", ref: "Salmos 46:1" },
      {
        t: "parrafo",
        texto:
          "En la tormenta, la familia tiene un refugio: «Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones».",
      },
      { t: "versiculo", ref: "2 Corintios 1:3-4" },
      {
        t: "parrafo",
        texto:
          "Dios es el «Padre de misericordias y Dios de toda consolación», y nos consuela «para que podamos también nosotros consolar a los que están en cualquier tribulación». La iglesia consuela con el consuelo que recibió.",
      },
      { t: "versiculo", ref: "Rut 1:1" },
      {
        t: "parrafo",
        texto:
          "La Biblia conoce la migración. Por el hambre, «un varón de Belén de Judá fue a morar en los campos de Moab, él y su mujer, y dos hijos suyos».",
      },
      { t: "versiculo", ref: "Mateo 2:14" },
      {
        t: "parrafo",
        texto:
          "Y la familia de Jesús también tuvo que huir: José «tomó de noche al niño y a su madre, y se fue a Egipto». Dios no es ajeno al dolor de las familias que tienen que dejar su tierra.",
      },
      { t: "subtitulo", texto: "Las crisis más comunes" },
      {
        t: "lista",
        items: [
          "La enfermedad grave o la discapacidad de uno de la familia.",
          "La pérdida del trabajo y las deudas.",
          "La migración: la separación de padres e hijos, el miedo a la deportación y los hijos que crecen en otra cultura y otra lengua.",
          "El divorcio de los padres, que los hijos sufren aunque no lo digan.",
          "La muerte de uno de la familia, que se estudia en Duelo y crisis.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: acompañar a una familia en crisis" },
      {
        t: "parrafo",
        texto:
          "Detienen al padre de la familia Gómez por su situación migratoria. La madre queda sola con cuatro hijos, sin el sueldo de él y con mucho miedo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, estar presentes: visitar a la familia, escuchar y orar, sin sermones.",
          "Paso 2, lo urgente: la comida, la renta y quién cuida a los niños, con un grupo de la iglesia que se organiza.",
          "Paso 3, una ayuda legal segura: un abogado de inmigración con licencia o un representante acreditado de una organización reconocida por el Departamento de Justicia, nunca un notario.",
          "Paso 4, los hijos: explicarles con palabras sencillas lo que pasa, darles rutina y cariño, y avisar a sus maestros si la madre está de acuerdo.",
          "Paso 5, la fe: recordarles que Dios es su amparo y que la iglesia no los dejará solos.",
          "Paso 6, el seguimiento: alguien de la iglesia llama cada semana, y se revisa qué ayuda falta.",
        ],
      },
      {
        t: "nota",
        titulo: "Cuidado con los notarios",
        texto:
          "En Estados Unidos, un notario público no es un abogado. Según USCIS, el notario no está autorizado para dar servicios legales de inmigración: solo un abogado o un representante acreditado que trabaje para una organización reconocida por el Departamento de Justicia puede aconsejar y representar a alguien en su caso. Muchas familias pierden su dinero y su caso por estas estafas. Lo legal es una guía general, no un consejo legal.",
      },
      { t: "subtitulo", texto: "Comparación: la familia que se encierra y la familia que se apoya" },
      {
        t: "lista",
        items: [
          "Se encierra: cada uno sufre solo y en silencio. Se apoya: hablan de lo que pasa, según la edad de cada uno.",
          "Se encierra: rechaza la ayuda por vergüenza. Se apoya: acepta la ayuda de la iglesia y de los profesionales.",
          "Se encierra: se culpan unos a otros. Se apoya: se unen contra el problema.",
          "Se encierra: deja de orar. Se apoya: ora unida, aunque no entienda todo.",
        ],
      },
    ],
    ideaClave:
      "Dios es el amparo y la fortaleza de la familia en la tribulación, y nos consuela para que consolemos a otros; la Biblia conoce la migración, y la familia de Jesús también tuvo que huir. Acompañar a una familia en crisis es estar presentes, cubrir lo urgente, buscar una ayuda segura (en inmigración, un abogado con licencia o un representante acreditado, nunca un notario), cuidar a los hijos y no dejarlos solos.",
    paraLaVida: {
      texto: "En la crisis, la familia necesita a Dios y a su iglesia.",
      pregunta: "¿Qué familia de tu iglesia está pasando hoy por una crisis?",
    },
  },
  {
    id: "familia-consejeria-2-6",
    objetivos: [
      "Explicar el camino de la reconciliación en la historia de José y sus hermanos.",
      "Distinguir el perdón de la reconciliación, y reconocer cuándo la reconciliación no es segura.",
      "Preparar y dirigir una reunión de reconciliación en una familia.",
    ],
    paraEmpezar:
      "Hay familias que no se hablan desde hace años: hermanos peleados por una herencia, hijos heridos por un padre ausente, suegros y nueras que no se soportan. Dios quiere volver el corazón de los padres hacia los hijos, y el de los hijos hacia los padres.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=MC8BqGu9B8A", titulo: "Resumen del libro de Génesis (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Génesis 45:4-5" },
      {
        t: "parrafo",
        texto:
          "Sus hermanos habían vendido a José. Años después, él se dio a conocer: «Yo soy José vuestro hermano, el que vendisteis para Egipto». Y les dijo: «para preservación de vida me envió Dios delante de vosotros».",
      },
      { t: "versiculo", ref: "Génesis 50:20-21" },
      {
        t: "parrafo",
        texto:
          "Cuando murió su padre, los hermanos temieron su venganza, pero José les dijo: «Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien». Y les prometió: «yo os sustentaré a vosotros y a vuestros hijos. Así los consoló, y les habló al corazón».",
      },
      {
        t: "parrafo",
        texto:
          "José no negó el mal: lo llamó por su nombre. Pero vio la mano de Dios y decidió bendecir a los que lo habían herido.",
      },
      { t: "versiculo", ref: "Lucas 15:28-32" },
      {
        t: "parrafo",
        texto:
          "En la parábola, el hermano mayor no quiso entrar a la fiesta: «Entonces se enojó, y no quería entrar». Y el padre salió también a buscarlo a él: «Salió por tanto su padre, y le rogaba que entrase». En una familia herida, el que se fue y el que se quedó pueden necesitar los dos la misericordia.",
      },
      { t: "versiculo", ref: "Romanos 12:18" },
      {
        t: "parrafo",
        texto:
          "La paz no depende solo de uno: «Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres». Cada uno hace su parte, aunque el otro no quiera.",
      },
      { t: "versiculo", ref: "Malaquías 4:6" },
      {
        t: "parrafo",
        texto:
          "Y Dios promete una obra en las familias: «hará volver el corazón de los padres hacia los hijos, y el corazón de los hijos hacia los padres».",
      },
      { t: "subtitulo", texto: "Comparación: el perdón, la confianza y la reconciliación" },
      {
        t: "lista",
        items: [
          "El perdón: una decisión delante de Dios de soltar la deuda. Lo hace uno, aunque el otro no cambie.",
          "La confianza: se reconstruye con el tiempo y con hechos. No se exige de un día para otro.",
          "La reconciliación: volver a tener una relación. Necesita a los dos, y que el que hizo daño reconozca su falta.",
        ],
      },
      { t: "subtitulo", texto: "Cuando la reconciliación no es segura" },
      {
        t: "parrafo",
        texto:
          "Si hubo abuso o violencia, se puede perdonar sin volver a ponerse en peligro. La persona herida no tiene que reunirse a solas con quien le hizo daño, y la seguridad de los niños va primero. La reconciliación, si llega, llega con límites, con tiempo y con un cambio de verdad.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una reunión de reconciliación entre dos hermanos" },
      {
        t: "parrafo",
        texto:
          "Marta y Julio no se hablan desde que murió su madre, por la casa que ella dejó. Los dos aceptan reunirse con el consejero.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, preparar a cada uno por separado: escuchar su dolor y preguntarle qué espera de la reunión.",
          "Paso 2, acordar las reglas: hablar por turnos, sin insultos ni gritos, y pedir una pausa si hace falta.",
          "Paso 3, que cada uno cuente cómo vivió lo que pasó, hablando de sí mismo y sin acusar.",
          "Paso 4, que cada uno reconozca su parte, aunque sea pequeña, y pida perdón por ella.",
          "Paso 5, separar el asunto práctico: la casa se resuelve con un acuerdo justo y, si hace falta, con un abogado.",
          "Paso 6, un primer paso juntos: una comida, una llamada o una visita a la tumba de su madre, y orar.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El consejero no obliga a nadie a reconciliarse ni a perdonar en una reunión. Prepara el camino, ora y deja que Dios obre en el corazón de cada uno.",
      },
    ],
    ideaClave:
      "José llamó al mal por su nombre, pero vio que Dios lo encaminó a bien y consoló a sus hermanos; el padre de la parábola salió a buscar a sus dos hijos. El perdón lo hace uno, la confianza se reconstruye con hechos y la reconciliación necesita a los dos. Si hubo abuso, se perdona sin volver al peligro. Dios quiere volver el corazón de los padres hacia los hijos y el de los hijos hacia los padres.",
    paraLaVida: {
      texto: "Cada uno hace su parte, aunque el otro no quiera.",
      pregunta: "¿Con quién de tu familia necesitas dar hoy el primer paso?",
    },
  },
];
