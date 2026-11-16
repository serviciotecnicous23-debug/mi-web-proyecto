/**
 * Nivel 4 · Materia 6 — Epístolas y Apocalipsis (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * De Romanos a Judas y el libro de Apocalipsis: el autor, la fecha aproximada, la ocasión, la estructura y el mensaje de
 * cada grupo de cartas, con las fechas que se discuten dichas con cautela. El Apocalipsis se presenta con sus cuatro
 * maneras de leerlo; el orden de los últimos tiempos es un punto de la declaración de fe por confirmar (se estudia en
 * Teología sistemática IV).
 */
import type { LeccionContenido } from "../tipos";

export const N4_EPISTOLAS_APOCALIPSIS: LeccionContenido[] = [
  {
    id: "n4-epistolas-apocalipsis-1",
    objetivos: [
      "Explicar el propósito y el tema central de Romanos.",
      "Describir el problema que Pablo enfrentó en Gálatas y su respuesta.",
      "Relacionar la justificación por la fe con la vida en el Espíritu.",
    ],
    paraEmpezar:
      "Dos cartas de Pablo han encendido la iglesia más de una vez. Lutero las leyó en el siglo XVI, y en 1738 Juan Wesley sintió que su corazón ardía de una manera extraña mientras oía leer el prefacio de Lutero a Romanos.",
    bloques: [
      { t: "subtitulo", texto: "Romanos" },
      {
        t: "parrafo",
        texto:
          "Pablo escribió a los Romanos desde Corinto, hacia el año 57 según la mayoría de los estudiosos, antes de llevar a Jerusalén la ofrenda de las iglesias (Romanos 15:25-26). No había fundado esa iglesia y quería visitarla de camino a España (Romanos 15:24). Es la exposición más ordenada del evangelio en el Nuevo Testamento.",
      },
      { t: "versiculo", ref: "Romanos 1:16-17" },
      {
        t: "parrafo",
        texto:
          "El tema está al principio: el evangelio «es poder de Dios para salvación a todo aquel que cree», y en él «la justicia de Dios se revela por fe y para fe», porque «el justo por la fe vivirá».",
      },
      { t: "versiculo", ref: "Romanos 3:23-24" },
      {
        t: "parrafo",
        texto:
          "Pablo une el diagnóstico y el remedio: «todos pecaron, y están destituidos de la gloria de Dios», y son «justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús». La carta sigue este camino:",
      },
      {
        t: "lista",
        items: [
          "Capítulos 1 al 3: todos pecaron, judíos y gentiles.",
          "Capítulos 3 al 5: la justificación por la fe, con el ejemplo de Abraham.",
          "Capítulos 6 al 8: la vida nueva en el Espíritu.",
          "Capítulos 9 al 11: Dios y el pueblo de Israel.",
          "Capítulos 12 al 16: la vida práctica de la iglesia.",
        ],
      },
      { t: "versiculo", ref: "Romanos 8:1" },
      { t: "versiculo", ref: "Romanos 12:1-2" },
      {
        t: "parrafo",
        texto:
          "La justificación no deja al creyente igual: «ninguna condenación hay para los que están en Cristo Jesús», y desde el capítulo 12 Pablo pide una vida entregada: «que presentéis vuestros cuerpos en sacrificio vivo», y «transformaos por medio de la renovación de vuestro entendimiento».",
      },
      { t: "subtitulo", texto: "Gálatas" },
      { t: "versiculo", ref: "Gálatas 1:6-7" },
      {
        t: "parrafo",
        texto:
          "En Gálatas, Pablo escribe con urgencia: algunos enseñaban que los creyentes gentiles debían circuncidarse y guardar la ley para ser salvos. Pablo se asombra de que siguieran «un evangelio diferente», y aclara: «No que haya otro». La fecha se discute: unos la ubican hacia el año 48, antes del concilio de Jerusalén (Hechos 15), y otros, unos años después.",
      },
      { t: "versiculo", ref: "Gálatas 5:1" },
      { t: "versiculo", ref: "Gálatas 5:22-23" },
      {
        t: "parrafo",
        texto:
          "La gracia trae libertad: «Estad, pues, firmes en la libertad con que Cristo nos hizo libres». No es libertad para pecar, sino para andar en el Espíritu, cuyo fruto es «amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza».",
      },
      {
        t: "nota",
        titulo: "Romanos, Gálatas y los avivamientos",
        texto:
          "Martín Lutero encontró en estas cartas la justificación por la fe, y en 1738 Juan Wesley sintió su corazón ardiendo de una manera extraña mientras oía leer, en una reunión en Londres, el prefacio de Lutero a Romanos. El evangelio de la gracia sigue encendiendo vidas.",
      },
    ],
    ideaClave:
      "Romanos es la exposición más ordenada del evangelio: todos pecaron, y Dios justifica gratuitamente por su gracia a todo el que cree, para una vida nueva en el Espíritu. Gálatas defiende ese mismo evangelio contra los que querían añadirle la ley, y llama a vivir firmes en la libertad de Cristo, dando el fruto del Espíritu.",
    paraLaVida: {
      texto: "Al evangelio de la gracia no se le añade nada: se cree y se vive.",
      pregunta: "¿Hay algo que le añades a la gracia para sentirte aceptado por Dios?",
    },
  },
  {
    id: "n4-epistolas-apocalipsis-2",
    objetivos: [
      "Describir la ciudad y la iglesia de Corinto.",
      "Explicar las respuestas de Pablo a los problemas de la iglesia.",
      "Aplicar la enseñanza de 2 Corintios sobre el ministerio, la generosidad y la debilidad.",
    ],
    paraEmpezar:
      "Si alguna vez piensas que tu iglesia tiene problemas, lee 1 Corintios. Pablo escribió a una iglesia llena de dones y llena de conflictos, y no la abandonó.",
    bloques: [
      {
        t: "parrafo",
        texto:
          "Corinto era una ciudad rica y comercial, con dos puertos y fama de inmoralidad. Pablo fundó allí la iglesia en su segundo viaje y se quedó un año y medio (Hechos 18:11). Escribió 1 Corintios desde Éfeso (1 Corintios 16:8), hacia los años 53 a 55.",
      },
      { t: "subtitulo", texto: "Los problemas de Corinto" },
      { t: "versiculo", ref: "1 Corintios 1:10" },
      {
        t: "parrafo",
        texto:
          "El primero era la división: unos decían ser de Pablo, otros de Apolos y otros de Cefas (1 Corintios 1:12). Pablo ruega «que no haya entre vosotros divisiones». Después responde, uno por uno, a la inmoralidad, a los pleitos entre hermanos, al matrimonio, a la comida ofrecida a los ídolos, al orden del culto, a los dones del Espíritu y a la resurrección.",
      },
      { t: "versiculo", ref: "1 Corintios 13:4-7" },
      {
        t: "parrafo",
        texto:
          "En medio de la enseñanza sobre los dones, en los capítulos 12 al 14, Pablo pone el capítulo del amor: «El amor es sufrido, es benigno; el amor no tiene envidia». Los dones sin amor no edifican.",
      },
      { t: "versiculo", ref: "1 Corintios 15:3-4" },
      {
        t: "parrafo",
        texto:
          "Algunos negaban la resurrección de los muertos, y Pablo responde con el corazón del evangelio: «Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día». Muchos estudiosos ven aquí uno de los resúmenes más antiguos de la fe de la iglesia.",
      },
      { t: "subtitulo", texto: "2 Corintios: el ministerio en la debilidad" },
      { t: "versiculo", ref: "2 Corintios 5:18-20" },
      {
        t: "parrafo",
        texto:
          "En 2 Corintios Pablo defiende su ministerio ante quienes lo criticaban, y abre su corazón. Dios «nos dio el ministerio de la reconciliación», y por eso «somos embajadores en nombre de Cristo».",
      },
      { t: "versiculo", ref: "2 Corintios 9:7" },
      {
        t: "parrafo",
        texto:
          "En los capítulos 8 y 9 anima a la ofrenda para los pobres de Jerusalén: «Cada uno dé como propuso en su corazón», «porque Dios ama al dador alegre».",
      },
      { t: "versiculo", ref: "2 Corintios 12:9" },
      {
        t: "parrafo",
        texto: "Y comparte la lección más profunda de su vida: el Señor le dijo «Bástate mi gracia; porque mi poder se perfecciona en la debilidad».",
      },
    ],
    ideaClave:
      "Corinto era una iglesia con muchos dones y muchos problemas: divisiones, inmoralidad, pleitos, desorden en el culto y dudas sobre la resurrección. Pablo la corrigió con amor y con el evangelio: la cruz, el amor por encima de los dones y la resurrección de Cristo. En 2 Corintios presenta el ministerio de la reconciliación, la generosidad alegre y el poder de Dios que se perfecciona en la debilidad.",
    paraLaVida: {
      texto: "Una iglesia con problemas no es una iglesia sin esperanza.",
      pregunta: "¿Qué te enseña 2 Corintios 12:9 sobre tus propias debilidades en el ministerio?",
    },
  },
  {
    id: "n4-epistolas-apocalipsis-3",
    objetivos: [
      "Identificar las cartas de la prisión y su contexto.",
      "Explicar el mensaje de Efesios y de Colosenses sobre Cristo y la iglesia.",
      "Aplicar la enseñanza de Filipenses y de Filemón a la vida del líder.",
    ],
    paraEmpezar:
      "Cuatro cartas del Nuevo Testamento salieron de una prisión: Efesios, Filipenses, Colosenses y Filemón. Pablo estaba encadenado, pero la Palabra no.",
    bloques: [
      { t: "versiculo", ref: "Efesios 4:1-3" },
      {
        t: "parrafo",
        texto:
          "Pablo se llama a sí mismo «preso en el Señor». La tradición ubica estas cartas en su primera prisión en Roma, hacia los años 60 a 62 (Hechos 28:30); algunos estudiosos proponen Éfeso o Cesarea. Efesios, Colosenses y Filemón parecen haber viajado juntas, con Tíquico y Onésimo (Colosenses 4:7-9).",
      },
      { t: "subtitulo", texto: "Efesios: la iglesia, el cuerpo de Cristo" },
      { t: "versiculo", ref: "Efesios 2:8-10" },
      {
        t: "parrafo",
        texto:
          "Efesios presenta el plan de Dios en Cristo y en la iglesia. La salvación es «por gracia», «no por obras», pero tiene un propósito: somos «creados en Cristo Jesús para buenas obras». La segunda mitad pide andar «como es digno de la vocación con que fuisteis llamados», «solícitos en guardar la unidad del Espíritu en el vínculo de la paz», y termina con la armadura de Dios (Efesios 6:10-18).",
      },
      { t: "subtitulo", texto: "Filipenses: el gozo en la prisión" },
      { t: "versiculo", ref: "Filipenses 2:5-8" },
      { t: "versiculo", ref: "Filipenses 4:4" },
      {
        t: "parrafo",
        texto:
          "Filipenses es la carta del gozo. Desde la cárcel Pablo escribe: «Regocijaos en el Señor siempre». En el centro está el ejemplo de Cristo, que «se despojó a sí mismo, tomando forma de siervo», y «se humilló a sí mismo, haciéndose obediente hasta la muerte, y muerte de cruz».",
      },
      { t: "subtitulo", texto: "Colosenses y Filemón" },
      { t: "versiculo", ref: "Colosenses 1:15-18" },
      {
        t: "parrafo",
        texto:
          "En Colosas circulaba una enseñanza que añadía filosofías y reglas humanas a Cristo (Colosenses 2:8). Pablo responde con la grandeza de Cristo: «El es la imagen del Dios invisible», «todo fue creado por medio de él y para él», y «él es la cabeza del cuerpo que es la iglesia».",
      },
      { t: "versiculo", ref: "Filemón 1:15-16" },
      {
        t: "parrafo",
        texto:
          "Filemón es la carta más breve de Pablo. Le pide a Filemón que reciba a Onésimo, el esclavo que se había apartado de él y se había convertido, «no ya como esclavo, sino como más que esclavo, como hermano amado». El evangelio cambia las relaciones.",
      },
    ],
    ideaClave:
      "Las cartas de la prisión son Efesios, Filipenses, Colosenses y Filemón. Efesios presenta la salvación por gracia y la iglesia como cuerpo de Cristo, llamada a la unidad; Filipenses enseña el gozo y la humildad de Cristo; Colosenses afirma que Cristo es supremo y que nada se le debe añadir; y Filemón muestra cómo el evangelio transforma las relaciones.",
    paraLaVida: {
      texto: "Pablo escribió sus cartas de gozo encadenado.",
      pregunta: "¿Qué circunstancia difícil puede convertirse hoy en tu lugar de servicio?",
    },
  },
  {
    id: "n4-epistolas-apocalipsis-4",
    objetivos: [
      "Explicar el mensaje de 1 y 2 Tesalonicenses sobre la esperanza y el trabajo.",
      "Describir el propósito de las cartas pastorales.",
      "Aplicar sus instrucciones al ministerio de hoy.",
    ],
    paraEmpezar:
      "Algunas de las primeras cartas de Pablo fueron para una iglesia nueva, y las últimas, para sus colaboradores. En las dos se ve el corazón de un pastor.",
    bloques: [
      { t: "subtitulo", texto: "1 y 2 Tesalonicenses" },
      { t: "versiculo", ref: "1 Tesalonicenses 1:9-10" },
      {
        t: "parrafo",
        texto:
          "Pablo fundó la iglesia de Tesalónica en pocas semanas, antes de tener que salir de la ciudad (Hechos 17:1-10), y le escribió desde Corinto hacia los años 50 y 51: son de sus primeras cartas. Aquellos creyentes se habían convertido «de los ídolos a Dios, para servir al Dios vivo y verdadero, y esperar de los cielos a su Hijo».",
      },
      { t: "versiculo", ref: "2 Tesalonicenses 3:10" },
      {
        t: "parrafo",
        texto:
          "Las dos cartas hablan mucho de la venida del Señor. Algunos dejaron de trabajar esperándola, y Pablo fue claro: «Si alguno no quiere trabajar, tampoco coma». La esperanza no hace perezosos, sino fieles.",
      },
      { t: "subtitulo", texto: "Las cartas pastorales" },
      {
        t: "parrafo",
        texto:
          "1 Timoteo, 2 Timoteo y Tito se llaman cartas pastorales porque Pablo instruye a dos colaboradores que dirigían iglesias, en Éfeso y en Creta. Hablan de la sana doctrina, de los requisitos de los líderes y del cuidado de la iglesia. Algunos estudiosos dudan de que Pablo las escribiera, pero las cartas se presentan como suyas y la iglesia antigua las recibió así.",
      },
      { t: "versiculo", ref: "1 Timoteo 4:12" },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      {
        t: "parrafo",
        texto:
          "Pablo anima a Timoteo, que era joven: «sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza». Y le da el plan de la multiplicación: «esto encarga a hombres fieles que sean idóneos para enseñar también a otros».",
      },
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "parrafo",
        texto:
          "La base de todo es la Palabra: «Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia».",
      },
      { t: "versiculo", ref: "2 Timoteo 4:7-8" },
      {
        t: "parrafo",
        texto:
          "2 Timoteo es la última carta de Pablo, escrita en su segunda prisión en Roma, poco antes de morir en tiempos de Nerón, según la tradición. Se despide así: «He peleado la buena batalla, he acabado la carrera, he guardado la fe».",
      },
    ],
    ideaClave:
      "1 y 2 Tesalonicenses, de las primeras cartas de Pablo, animan a una iglesia nueva a esperar la venida del Señor trabajando y viviendo en santidad. Las cartas pastorales, 1 y 2 Timoteo y Tito, enseñan la sana doctrina, los requisitos de los líderes y la multiplicación de maestros fieles, con la Escritura inspirada como base. En 2 Timoteo, Pablo se despide habiendo guardado la fe.",
    paraLaVida: {
      texto: "El líder que termina bien es el que guardó la fe y formó a otros.",
      pregunta: "¿A quién le estás encargando lo que has aprendido, como Pablo a Timoteo?",
    },
  },
  {
    id: "n4-epistolas-apocalipsis-5",
    objetivos: [
      "Explicar el tema de Hebreos: la superioridad de Cristo.",
      "Armonizar la enseñanza de Pablo y de Santiago sobre la fe y las obras.",
      "Describir el mensaje de las cartas de Pedro, de Juan y de Judas.",
    ],
    paraEmpezar:
      "Después de las cartas de Pablo vienen ocho cartas escritas por otros: Hebreos, Santiago, las dos de Pedro, las tres de Juan y Judas.",
    bloques: [
      { t: "subtitulo", texto: "Hebreos: Cristo es mejor" },
      { t: "versiculo", ref: "Hebreos 1:1-2" },
      {
        t: "parrafo",
        texto:
          "Hebreos no dice quién la escribió. Se ha pensado en Pablo, en Apolos o en Bernabé, y ya en el siglo III Orígenes reconoció que solo Dios sabe quién fue. Empieza con su gran tema: Dios, que habló «muchas veces y de muchas maneras» por los profetas, «en estos postreros días nos ha hablado por el Hijo».",
      },
      {
        t: "parrafo",
        texto:
          "La carta, que parece dirigida a creyentes de origen judío, muestra que Cristo es superior a los ángeles, a Moisés y al sacerdocio de Aarón, y que su sacrificio abre un nuevo pacto. Por eso les advierte que no vuelvan atrás.",
      },
      { t: "versiculo", ref: "Hebreos 11:1" },
      { t: "versiculo", ref: "Hebreos 11:6" },
      {
        t: "parrafo",
        texto:
          "El capítulo 11 es la gran galería de la fe: «Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve», y «sin fe es imposible agradar a Dios».",
      },
      { t: "subtitulo", texto: "Santiago: la fe que obra" },
      { t: "versiculo", ref: "Santiago 2:17-18" },
      {
        t: "parrafo",
        texto:
          "Santiago, que la tradición identifica con el hermano del Señor, escribe una carta muy práctica: «la fe, si no tiene obras, es muerta en sí misma». No contradice a Pablo. Pablo enseña que las obras no son la base de la justificación; Santiago enseña que la fe verdadera se muestra con obras: «yo te mostraré mi fe por mis obras». Lutero tuvo dudas sobre esta carta, pero la iglesia la recibió como parte de la Escritura.",
      },
      { t: "subtitulo", texto: "Pedro, Juan y Judas" },
      { t: "versiculo", ref: "1 Pedro 1:3" },
      { t: "versiculo", ref: "1 Juan 5:13" },
      { t: "versiculo", ref: "Judas 1:3" },
      {
        t: "parrafo",
        texto:
          "1 Pedro anima a creyentes que sufrían: Dios «nos hizo renacer para una esperanza viva, por la resurrección de Jesucristo». 2 Pedro y Judas advierten contra los falsos maestros: hay que contender «ardientemente por la fe que ha sido una vez dada a los santos». Y las cartas de Juan enseñan el amor, la verdad y la seguridad: «para que sepáis que tenéis vida eterna».",
      },
    ],
    ideaClave:
      "Hebreos, de autor desconocido, muestra que Cristo es superior a todo lo anterior y que su sacrificio abre un nuevo pacto, y llama a vivir por fe sin volver atrás. Santiago enseña que la fe verdadera se muestra con obras, en armonía con Pablo. Pedro anima en el sufrimiento con una esperanza viva, Juan enseña el amor y la seguridad de la vida eterna, y Judas y 2 Pedro llaman a defender la fe ante los falsos maestros.",
    paraLaVida: {
      texto: "La fe que salva es la misma que se nota en la vida.",
      pregunta: "¿Qué obras están mostrando hoy tu fe a los demás?",
    },
  },
  {
    id: "n4-epistolas-apocalipsis-6",
    objetivos: [
      "Describir el autor, el género y la estructura del Apocalipsis.",
      "Comparar con respeto las cuatro maneras de interpretarlo.",
      "Reconocer su mensaje central para la iglesia de todos los tiempos.",
    ],
    paraEmpezar:
      "El Apocalipsis asusta a unos y fascina a otros. Pero empieza con una bendición para quien lo lee y termina con una oración: que Jesús venga.",
    bloques: [
      { t: "versiculo", ref: "Apocalipsis 1:1-3" },
      { t: "versiculo", ref: "Apocalipsis 1:9" },
      {
        t: "parrafo",
        texto:
          "Es «La revelación de Jesucristo», dada «a su siervo Juan», que estaba desterrado «en la isla llamada Patmos, por causa de la palabra de Dios y el testimonio de Jesucristo». La mayoría de los estudiosos lo fecha hacia el año 95, en tiempos del emperador Domiciano, como dijo Ireneo; otros lo ubican antes del año 70. Es a la vez profecía, carta a siete iglesias y apocalipsis, un mensaje en visiones y símbolos. Y promete: «Bienaventurado el que lee, y los que oyen las palabras de esta profecía».",
      },
      { t: "subtitulo", texto: "Cómo está organizado" },
      {
        t: "lista",
        items: [
          "Capítulo 1: la visión de Cristo glorificado.",
          "Capítulos 2 y 3: las cartas a las siete iglesias de Asia.",
          "Capítulos 4 y 5: el trono de Dios y el Cordero.",
          "Capítulos 6 al 16: los sellos, las trompetas y las copas.",
          "Capítulos 17 al 20: la caída de Babilonia, la venida de Cristo, el milenio y el juicio.",
          "Capítulos 21 y 22: el cielo nuevo y la tierra nueva.",
        ],
      },
      { t: "versiculo", ref: "Apocalipsis 1:17-18" },
      {
        t: "parrafo",
        texto:
          "Todo empieza con Cristo. Juan cayó «como muerto a sus pies», y oyó: «No temas; yo soy el primero y el último», «y tengo las llaves de la muerte y del Hades».",
      },
      { t: "subtitulo", texto: "Cuatro maneras de leerlo" },
      {
        t: "lista",
        items: [
          "Preterista: la mayor parte se cumplió en el siglo I, con la caída de Jerusalén y la persecución de Roma.",
          "Historicista: describe la historia de la iglesia desde el siglo I hasta la venida de Cristo. La siguieron muchos reformadores.",
          "Futurista: desde el capítulo 4 describe sobre todo los acontecimientos del fin. Es la lectura más común entre los pentecostales.",
          "Idealista: presenta en símbolos la lucha de todos los tiempos entre el reino de Dios y el mal.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Muchos maestros combinan estas lecturas. Las preguntas sobre el arrebatamiento y el milenio se estudian en Teología sistemática IV, y son un punto de la declaración de fe por confirmar.",
      },
      { t: "subtitulo", texto: "El mensaje central" },
      { t: "versiculo", ref: "Apocalipsis 5:9-10" },
      { t: "versiculo", ref: "Apocalipsis 11:15" },
      { t: "versiculo", ref: "Apocalipsis 22:20" },
      {
        t: "parrafo",
        texto:
          "Por encima de las diferencias, el mensaje es claro: el Cordero que fue inmolado es digno, porque «con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación», y al final «Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo». La iglesia que sufre no está perdida: Cristo vence. Por eso el libro termina orando: «Amén; sí, ven, Señor Jesús».",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Enseña el Apocalipsis empezando por lo que es claro: la gloria de Cristo, el llamado a ser fieles, el juicio de Dios y la esperanza final. Evita poner fechas o identificar con seguridad a personas de hoy con los símbolos del libro: muchos lo han hecho y se han equivocado.",
      },
    ],
    ideaClave:
      "El Apocalipsis es la revelación de Jesucristo dada a Juan en Patmos: profecía, carta y apocalipsis a la vez. Se lee de cuatro maneras principales, preterista, historicista, futurista e idealista, y el orden de los últimos tiempos es un punto por confirmar. Su mensaje central es claro: el Cordero inmolado es digno, Cristo vence, y la iglesia fiel espera su venida orando: ven, Señor Jesús.",
    paraLaVida: {
      texto: "El Apocalipsis no se escribió para asustar a la iglesia, sino para darle esperanza.",
      pregunta: "¿Qué parte del mensaje central del Apocalipsis necesita oír hoy tu congregación?",
    },
  },
];
