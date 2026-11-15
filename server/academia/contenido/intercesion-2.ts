/**
 * Especialidad Intercesión y oración · Materia 2 — Intercesión bíblica (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Qué es ponerse en la brecha, Abraham por Sodoma, Moisés por el pueblo, Samuel, Daniel y Nehemías, Cristo nuestro
 * intercesor, y por quiénes y cómo interceder hoy. Lo que el ministerio enseña sobre la sanidad divina y sobre la oración
 * en lenguas queda para la declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const INTERCESION_2: LeccionContenido[] = [
  {
    id: "intercesion-2-1",
    objetivos: [
      "Definir la intercesión como orar delante de Dios a favor de otros.",
      "Explicar la imagen de ponerse en la brecha.",
      "Reconocer que Cristo es el único mediador y que la intercesión del creyente descansa en él.",
    ],
    paraEmpezar:
      "Cuando una muralla tenía un hueco, alguien tenía que pararse allí para defender la ciudad. La Biblia usa esa imagen para hablar de los que oran por otros.",
    bloques: [
      { t: "versiculo", ref: "Ezequiel 22:30" },
      {
        t: "parrafo",
        texto:
          "En tiempos de Ezequiel, Dios buscó a alguien que se parara a favor de su pueblo: «Y busqué entre ellos hombre que hiciese vallado y que se pusiese en la brecha delante de mí, a favor de la tierra». Y añade con tristeza: «y no lo hallé». Interceder es eso: ponerse delante de Dios a favor de otros, como quien cubre el hueco de una muralla.",
      },
      { t: "subtitulo", texto: "Por todos los hombres" },
      { t: "versiculo", ref: "1 Timoteo 2:1-5" },
      {
        t: "parrafo",
        texto:
          "Pablo pone la oración por otros en primer lugar: «Exhorto ante todo, a que se hagan rogativas, oraciones, peticiones y acciones de gracias, por todos los hombres». Es el versículo de memoria de esta materia. La intercesión incluye pedir y también dar gracias, y abarca a todos, aun a las autoridades: «por los reyes y por todos los que están en eminencia».",
      },
      {
        t: "parrafo",
        texto:
          "Y explica por qué: Dios «quiere que todos los hombres sean salvos y vengan al conocimiento de la verdad». El que intercede se une al deseo de Dios por el mundo.",
      },
      {
        t: "nota",
        titulo: "El intercesor no es mediador",
        texto:
          "Orar por otros no convierte al creyente en mediador. La Biblia es clara: «hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre». Oramos por otros por medio de Cristo, nunca en su lugar.",
      },
      { t: "versiculo", ref: "Santiago 5:16" },
      {
        t: "parrafo",
        texto:
          "Santiago anima a toda la iglesia: «orad unos por otros». Y añade una promesa: «La oración eficaz del justo puede mucho». La intercesión no es solo para unos pocos con un don especial: es para todos los creyentes.",
      },
      {
        t: "nota",
        titulo: "La oración por los enfermos",
        texto:
          "Santiago habla aquí también de los enfermos. Lo que el ministerio enseña sobre la sanidad divina, como la sanidad en la expiación, es un punto de la declaración de fe por confirmar.",
      },
      {
        t: "lista",
        items: [
          "Interceder es orar delante de Dios a favor de otros.",
          "Es ponerse en la brecha, como quien cubre el hueco de una muralla.",
          "Es por todos los hombres, también por las autoridades.",
          "Nace del deseo de Dios de que todos sean salvos.",
          "Descansa en Cristo, el único mediador.",
        ],
      },
    ],
    ideaClave:
      "Interceder es ponerse en la brecha: orar delante de Dios a favor de otros. Pablo pide rogativas, oraciones, peticiones y acciones de gracias por todos los hombres, porque Dios quiere que todos sean salvos. El creyente no es mediador: intercede por medio de Cristo, el único mediador.",
    paraLaVida: {
      texto: "Dios todavía busca a alguien que se ponga en la brecha.",
      pregunta: "¿Por quién podrías ponerte en la brecha esta semana?",
    },
  },
  {
    id: "intercesion-2-2",
    objetivos: [
      "Narrar cómo intercedió Abraham por Sodoma.",
      "Analizar en qué apoyó Abraham su ruego: el carácter justo de Dios.",
      "Reconocer la humildad y la perseverancia del intercesor.",
    ],
    paraEmpezar:
      "Abraham supo que Sodoma iba a ser juzgada. Podía callar o alejarse; en cambio, se acercó a Dios y habló a favor de la ciudad, donde vivía su sobrino Lot.",
    bloques: [
      { t: "versiculo", ref: "Génesis 18:23-33" },
      {
        t: "parrafo",
        texto:
          "Abraham no exige ni se esconde: se acerca. «Y se acercó Abraham y dijo: ¿Destruirás también al justo con el impío?». Su ruego nace del amor por los que estaban en peligro.",
      },
      { t: "subtitulo", texto: "Apoyado en el carácter de Dios" },
      {
        t: "parrafo",
        texto:
          "El centro de su oración es quién es Dios: «El Juez de toda la tierra, ¿no ha de hacer lo que es justo?». El intercesor no trata de cambiar el carácter de Dios; se apoya en él. Le pide que actúe conforme a lo que él es.",
      },
      {
        t: "parrafo",
        texto:
          "Abraham ora con humildad: «He aquí ahora que he comenzado a hablar a mi Señor, aunque soy polvo y ceniza». Y ora con perseverancia: de cincuenta justos baja a cuarenta y cinco, a cuarenta, a treinta, a veinte y a diez. Dios le responde cada vez, hasta la última: «No la destruiré, respondió, por amor a los diez».",
      },
      { t: "subtitulo", texto: "La respuesta de Dios" },
      { t: "versiculo", ref: "Génesis 19:29" },
      {
        t: "parrafo",
        texto:
          "No había ni diez justos, y la ciudad fue destruida. Pero la oración no fue en vano: «Dios se acordó de Abraham, y envió fuera a Lot de en medio de la destrucción». Dios oyó a Abraham y salvó a Lot, aunque no de la manera en que Abraham lo había pedido.",
      },
      {
        t: "lista",
        items: [
          "Se acercó: no se quedó lejos ni callado.",
          "Se apoyó en el carácter justo de Dios.",
          "Oró con humildad: se sabía polvo y ceniza.",
          "Perseveró: volvió a pedir una y otra vez.",
          "Dios respondió a su manera y salvó a Lot.",
        ],
      },
    ],
    ideaClave:
      "Abraham se acercó a Dios a favor de Sodoma. Apoyó su ruego en el carácter de Dios: el Juez de toda la tierra hace lo que es justo. Oró con humildad y con perseverancia, y aunque la ciudad fue destruida, Dios se acordó de Abraham y sacó a Lot.",
    paraLaVida: {
      texto: "El intercesor no le enseña a Dios a ser bueno: le pide que actúe conforme a lo que él es.",
      pregunta: "¿Qué rasgo del carácter de Dios puedes recordar hoy al orar por alguien?",
    },
  },
  {
    id: "intercesion-2-3",
    objetivos: [
      "Narrar la intercesión de Moisés después del becerro de oro.",
      "Analizar los argumentos de su oración: la obra, el nombre y las promesas de Dios.",
      "Valorar el amor del intercesor que se identifica con el pueblo.",
    ],
    paraEmpezar:
      "Mientras Moisés estaba en el monte con Dios, el pueblo se hizo un becerro de oro. Lo que hizo Moisés entonces es una de las grandes oraciones de la Biblia.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 32:9-14" },
      {
        t: "parrafo",
        texto:
          "Dios anuncia su juicio y le ofrece a Moisés un futuro propio: «y de ti yo haré una nación grande». Moisés no acepta la oferta; ora por el pueblo: «Oh Jehová, ¿por qué se encenderá tu furor contra tu pueblo, que tú sacaste de la tierra de Egipto con gran poder y con mano fuerte?».",
      },
      { t: "subtitulo", texto: "Los argumentos de Moisés" },
      {
        t: "lista",
        items: [
          "La obra de Dios: es el pueblo que él sacó de Egipto.",
          "El nombre de Dios: qué dirían los egipcios.",
          "Las promesas de Dios: acuérdate de Abraham, de Isaac y de Israel tus siervos.",
        ],
      },
      { t: "versiculo", ref: "Números 23:19" },
      {
        t: "parrafo",
        texto:
          "La Biblia dice luego: «Entonces Jehová se arrepintió del mal que dijo que había de hacer a su pueblo». Muchos maestros de la Biblia lo explican como un lenguaje humano para decir que Dios cambió su trato con el pueblo en respuesta a la oración. No significa que Dios cambie de carácter ni que se equivoque: «Dios no es hombre, para que mienta, Ni hijo de hombre para que se arrepienta». Dios había decidido obrar por medio de la oración de su siervo.",
      },
      { t: "subtitulo", texto: "Ráeme ahora de tu libro" },
      { t: "versiculo", ref: "Éxodo 32:30-32" },
      {
        t: "parrafo",
        texto:
          "Al día siguiente, Moisés volvió a subir. No escondió el pecado del pueblo: «Vosotros habéis cometido un gran pecado, pero yo subiré ahora a Jehová». Y se puso él mismo en juego: «que perdones ahora su pecado, y si no, ráeme ahora de tu libro que has escrito». Así ama el intercesor: se identifica con aquellos por quienes ora.",
      },
      { t: "versiculo", ref: "Salmos 106:23" },
      {
        t: "parrafo",
        texto:
          "Siglos después, el salmista lo recordó así: «De no haberse interpuesto Moisés su escogido delante de él, A fin de apartar su indignación para que no los destruyese». Moisés se interpuso: se puso en medio.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=U2lUpubEMDI", titulo: "Resumen del libro de Éxodo (parte 2)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Números 14:19-20" },
      {
        t: "parrafo",
        texto:
          "No fue una sola vez. Cuando el pueblo volvió a rebelarse, Moisés volvió a rogar: «Perdona ahora la iniquidad de este pueblo según la grandeza de tu misericordia». Y Dios respondió: «Yo lo he perdonado conforme a tu dicho».",
      },
    ],
    ideaClave:
      "Después del becerro de oro, Moisés se interpuso entre Dios y el pueblo. Oró apoyado en la obra, el nombre y las promesas de Dios; reconoció el pecado del pueblo y se identificó con él hasta decir ráeme ahora de tu libro. Dios lo escuchó y perdonó conforme a su dicho.",
    paraLaVida: {
      texto: "El intercesor no se aparta de los que cayeron: se pone a su lado delante de Dios.",
      pregunta: "¿Hay alguien que te falló por quien Dios te pide que ores?",
    },
  },
  {
    id: "intercesion-2-4",
    objetivos: [
      "Explicar por qué Samuel consideraba pecado dejar de orar por el pueblo.",
      "Describir la confesión de Daniel y de Nehemías, que se incluyen en el pecado del pueblo.",
      "Relacionar la intercesión con la acción.",
    ],
    paraEmpezar:
      "Tres líderes del pueblo de Dios, en tiempos distintos, entendieron que una de sus tareas principales era orar por los suyos.",
    bloques: [
      { t: "versiculo", ref: "1 Samuel 12:23" },
      {
        t: "parrafo",
        texto:
          "Samuel, ya anciano, le dice al pueblo: «lejos sea de mí que peque yo contra Jehová cesando de rogar por vosotros». Para él, dejar de orar por el pueblo era pecar contra Dios. Y junto a la oración, la enseñanza: «antes os instruiré en el camino bueno y recto».",
      },
      { t: "subtitulo", texto: "Daniel: confesar con el pueblo" },
      { t: "versiculo", ref: "Daniel 9:2-5" },
      {
        t: "parrafo",
        texto:
          "Daniel leyó en el libro de Jeremías que las desolaciones de Jerusalén durarían setenta años, y se puso a orar: «Y volví mi rostro a Dios el Señor, buscándole en oración y ruego, en ayuno, cilicio y ceniza». Daniel era un hombre fiel, pero no dice que pecaron ellos; dice: «hemos pecado, hemos cometido iniquidad». El intercesor se incluye.",
      },
      { t: "versiculo", ref: "Daniel 9:18-19" },
      {
        t: "parrafo",
        texto:
          "Y no se apoya en sus méritos: «no elevamos nuestros ruegos ante ti confiados en nuestras justicias, sino en tus muchas misericordias». La intercesión descansa en la misericordia de Dios.",
      },
      { t: "subtitulo", texto: "Nehemías: orar y actuar" },
      { t: "versiculo", ref: "Nehemías 1:4-6" },
      {
        t: "parrafo",
        texto:
          "Cuando Nehemías supo que el muro de Jerusalén estaba derribado, lloró, ayunó y oró: «me senté y lloré, e hice duelo por algunos días, y ayuné y oré delante del Dios de los cielos». También él confesó: «sí, yo y la casa de mi padre hemos pecado».",
      },
      { t: "versiculo", ref: "Nehemías 2:4-5" },
      {
        t: "parrafo",
        texto:
          "Después de orar, actuó. Cuando el rey le preguntó qué pedía, Nehemías dice: «Entonces oré al Dios de los cielos», y pidió que lo enviara a reedificar la ciudad. La intercesión verdadera no reemplaza el trabajo: lo prepara.",
      },
      {
        t: "lista",
        items: [
          "Samuel: dejar de orar por el pueblo es pecar contra Dios.",
          "Daniel: el intercesor confiesa con el pueblo y dice hemos pecado.",
          "Daniel: se apoya en la misericordia de Dios, no en sus justicias.",
          "Nehemías: llora, ayuna, ora y después actúa.",
        ],
      },
    ],
    ideaClave:
      "Samuel entendió que dejar de rogar por el pueblo era pecar contra Dios. Daniel y Nehemías se incluyeron en la confesión del pueblo y se apoyaron en la misericordia de Dios, no en sus justicias; y Nehemías, después de orar, actuó. La intercesión verdadera confiesa, confía y se pone a trabajar.",
    paraLaVida: {
      texto: "Orar por los tuyos es parte de tu servicio, no un extra.",
      pregunta: "¿Por qué grupo de personas te ha puesto Dios a orar con fidelidad?",
    },
  },
  {
    id: "intercesion-2-5",
    objetivos: [
      "Explicar que Cristo intercedió en la tierra y sigue intercediendo en el cielo.",
      "Describir la seguridad que da al creyente la intercesión de Cristo.",
      "Relacionar la intercesión del creyente con la de Cristo.",
    ],
    paraEmpezar: "Toda la intercesión de la Biblia apunta a uno: Jesucristo, el que se puso en la brecha una vez y para siempre.",
    bloques: [
      { t: "versiculo", ref: "Isaías 53:12" },
      {
        t: "parrafo",
        texto:
          "Siglos antes, Isaías anunció que el Siervo de Jehová moriría por los pecadores e intercedería por ellos: «habiendo él llevado el pecado de muchos, y orado por los transgresores».",
      },
      { t: "versiculo", ref: "Lucas 23:34" },
      {
        t: "parrafo",
        texto: "En la cruz se cumplió. Jesús oró por los que lo crucificaban: «Padre, perdónalos, porque no saben lo que hacen».",
      },
      { t: "subtitulo", texto: "Jesús ora por los suyos" },
      { t: "versiculo", ref: "Lucas 22:31-32" },
      {
        t: "parrafo",
        texto:
          "Antes de que Pedro lo negara, Jesús ya había orado por él: «pero yo he rogado por ti, que tu fe no falte». Pedro cayó, pero no se perdió; y Jesús le dio una tarea: «y tú, una vez vuelto, confirma a tus hermanos».",
      },
      { t: "versiculo", ref: "Juan 17:20-21" },
      {
        t: "parrafo",
        texto:
          "En su oración antes de la cruz, Jesús oró también por nosotros: «Mas no ruego solamente por éstos, sino también por los que han de creer en mí por la palabra de ellos».",
      },
      { t: "subtitulo", texto: "Jesús intercede hoy" },
      { t: "versiculo", ref: "Hebreos 7:25" },
      {
        t: "parrafo",
        texto:
          "Cristo no dejó de interceder al subir al cielo. Como sumo sacerdote, «puede también salvar perpetuamente a los que por él se acercan a Dios, viviendo siempre para interceder por ellos».",
      },
      { t: "versiculo", ref: "Romanos 8:34" },
      {
        t: "parrafo",
        texto:
          "Pablo pregunta: «¿Quién es el que condenará?». Y responde con Cristo, que murió y resucitó, y que ahora está a la diestra de Dios, «el que también intercede por nosotros».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Juan 2:1" },
      {
        t: "parrafo",
        texto:
          "Esto cambia nuestra manera de orar por otros. No intercedemos para ganar el favor de Dios ni como mediadores: nos unimos a la intercesión de Cristo, que ya ora por los suyos. Y cuando caemos, «abogado tenemos para con el Padre, a Jesucristo el justo».",
      },
      {
        t: "lista",
        items: [
          "En la cruz, Jesús oró por los que lo crucificaban.",
          "Oró por Pedro antes de su caída.",
          "Oró por los que habían de creer, también por nosotros.",
          "Hoy vive siempre para interceder por los suyos.",
          "Nuestra intercesión no lo reemplaza: se une a la suya.",
        ],
      },
    ],
    ideaClave:
      "Cristo es el gran intercesor. Isaías anunció que oraría por los transgresores; en la tierra oró por los que lo crucificaban, por Pedro y por los que habían de creer; y hoy, a la diestra de Dios, vive siempre para interceder por los suyos. Nuestra intercesión no lo reemplaza: se une a la suya.",
    paraLaVida: {
      texto: "Antes de que tú ores por otros, Cristo ya está orando por ti.",
      pregunta: "¿Qué seguridad te da saber que Jesús intercede hoy por ti?",
    },
  },
  {
    id: "intercesion-2-6",
    objetivos: [
      "Enumerar por quiénes manda orar la Biblia.",
      "Aplicar formas prácticas de interceder con perseverancia y peticiones concretas.",
      "Valorar la fidelidad con lo que se confía en oración.",
    ],
    paraEmpezar:
      "Ya vimos a los grandes intercesores de la Biblia. Ahora la pregunta es práctica: ¿por quiénes y cómo intercede un creyente hoy?",
    bloques: [
      { t: "subtitulo", texto: "Por quiénes" },
      { t: "versiculo", ref: "Mateo 5:44" },
      {
        t: "parrafo",
        texto: "Jesús manda orar aun por los enemigos: «y orad por los que os ultrajan y os persiguen». La intercesión vence el rencor.",
      },
      { t: "versiculo", ref: "Mateo 9:37-38" },
      {
        t: "parrafo",
        texto: "Y manda orar por la obra: «Rogad, pues, al Señor de la mies, que envíe obreros a su mies».",
      },
      { t: "versiculo", ref: "Romanos 10:1" },
      {
        t: "parrafo",
        texto: "Pablo oraba por los que no conocían a Cristo: «y mi oración a Dios por Israel, es para salvación».",
      },
      { t: "versiculo", ref: "Efesios 6:18-19" },
      {
        t: "parrafo",
        texto:
          "Pide también orar «por todos los santos», y por los que predican: «y por mí, a fin de que al abrir mi boca me sea dada palabra para dar a conocer con denuedo el misterio del evangelio».",
      },
      {
        t: "nota",
        titulo: "Orar en el Espíritu",
        texto:
          "Pablo pide orar «en el Espíritu». Lo que el ministerio enseña sobre la oración en lenguas es un punto de la declaración de fe por confirmar.",
      },
      { t: "versiculo", ref: "Hechos 12:5" },
      {
        t: "parrafo",
        texto: "Y por los que sufren: cuando Pedro estaba preso, «la iglesia hacía sin cesar oración a Dios por él».",
      },
      { t: "subtitulo", texto: "Cómo" },
      { t: "versiculo", ref: "Colosenses 4:12" },
      {
        t: "parrafo",
        texto:
          "Epafras es un modelo: estaba «siempre rogando encarecidamente por vosotros en sus oraciones», y pedía algo concreto: «para que estéis firmes, perfectos y completos en todo lo que Dios quiere».",
      },
      {
        t: "lista",
        items: [
          "Con perseverancia: siempre, no una sola vez.",
          "Con peticiones concretas, conforme a lo que Dios quiere.",
          "Con acción de gracias por cada persona.",
          "Con una lista de oración o un cuaderno, para no olvidar y para ver las respuestas.",
          "Solo o en grupo, como la iglesia que oraba por Pedro.",
        ],
      },
      { t: "versiculo", ref: "Proverbios 11:13" },
      {
        t: "parrafo",
        texto:
          "El intercesor recibe confidencias, y no las cuenta a otros con la excusa de pedir oración: «El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo». Lo que se confía en oración se cuida.",
      },
    ],
    ideaClave:
      "La Biblia manda interceder por todos: por las autoridades, por los enemigos, por los obreros de la mies, por los santos y los que predican, por los que sufren y por los que no conocen a Cristo. Se intercede con perseverancia, con peticiones concretas y con acción de gracias, solo o en grupo, y guardando con fidelidad lo que se confía.",
    paraLaVida: {
      texto: "Una lista de oración es una forma sencilla de amar a muchos.",
      pregunta: "¿Qué cinco nombres pondrás hoy en tu lista de intercesión?",
    },
  },
];
