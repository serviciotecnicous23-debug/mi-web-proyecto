/**
 * Nivel 4 · Materia 10 — Ética cristiana y ministerial (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Los fundamentos de la ética, las decisiones morales, la vida y la dignidad humana, la sexualidad y el matrimonio (con
 * el artículo 14 de la declaración de fe, que no tiene puntos pendientes), el dinero, el trabajo y la verdad, y la ética
 * del ministro con la protección de menores. Quién puede ejercer cada cargo, también el ministerio de la mujer, no se
 * decide aquí: es un punto de la declaración por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const N4_ETICA: LeccionContenido[] = [
  {
    id: "n4-etica-1",
    objetivos: [
      "Explicar en qué se funda la ética cristiana: el carácter de Dios, su Palabra, el ejemplo de Cristo y la obra del Espíritu.",
      "Distinguir la ética cristiana del relativismo moral.",
      "Aplicar Romanos 12:1-2 a la manera de pensar y de decidir.",
    ],
    paraEmpezar:
      "Hoy muchos dicen que cada uno decide lo que está bien o mal. La ética cristiana parte de otra base: Dios, que es santo, ha hablado.",
    bloques: [
      { t: "versiculo", ref: "Romanos 12:1-2" },
      {
        t: "parrafo",
        texto:
          "«No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta». La ética cristiana no es una lista de prohibiciones, sino una vida transformada que busca agradar a Dios. Es el versículo de memoria de esta materia.",
      },
      { t: "subtitulo", texto: "Sus fundamentos" },
      {
        t: "lista",
        items: [
          "El carácter de Dios: lo bueno es lo que refleja a Dios, que es santo, justo y amor (1 Pedro 1:15-16).",
          "La Palabra de Dios: la Escritura enseña lo que agrada a Dios y prepara para toda buena obra (2 Timoteo 3:16-17).",
          "El ejemplo de Cristo: imitamos su amor, su humildad y su obediencia (1 Pedro 2:21).",
          "La obra del Espíritu Santo: él produce en nosotros el fruto que agrada a Dios (Gálatas 5:22-23).",
        ],
      },
      { t: "versiculo", ref: "Mateo 22:37-40" },
      {
        t: "parrafo",
        texto:
          "Jesús resumió la ley en dos mandamientos: amar a Dios con todo el corazón y «Amarás a tu prójimo como a ti mismo». Toda decisión moral se mide por este doble amor.",
      },
      { t: "subtitulo", texto: "Frente al relativismo" },
      { t: "versiculo", ref: "Jueces 21:25" },
      {
        t: "parrafo",
        texto:
          "En tiempos de los jueces, «cada uno hacía lo que bien le parecía», y el resultado fue el caos. El relativismo dice que no hay verdades morales para todos; pero, si fuera así, nadie podría decir que la injusticia o el abuso están mal. La ética cristiana afirma que hay un bien y un mal reales, porque Dios existe y ha hablado.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "La gracia antes que las reglas",
        texto:
          "El creyente no obedece para ganarse el amor de Dios, sino porque ya fue amado y salvado. La ética cristiana nace de la gracia, que nos enseña a vivir sobria, justa y piadosamente (Tito 2:11-12).",
      },
    ],
    ideaClave:
      "La ética cristiana se funda en el carácter santo de Dios, en su Palabra, en el ejemplo de Cristo y en la obra del Espíritu, y se resume en amar a Dios y al prójimo. Frente al relativismo, afirma que hay un bien y un mal reales. No es una lista de prohibiciones, sino una mente renovada que comprueba la buena voluntad de Dios.",
    paraLaVida: {
      texto: "Una mente renovada por la Palabra decide distinto que el mundo.",
      pregunta: "¿En qué área de tu vida piensas todavía como el mundo, y qué te enseña la Palabra sobre ella?",
    },
  },
  {
    id: "n4-etica-2",
    objetivos: [
      "Aplicar pasos bíblicos para tomar decisiones morales.",
      "Explicar cómo decidir en los temas que la Biblia no menciona directamente.",
      "Valorar la conciencia, el consejo y la oración en las decisiones.",
    ],
    paraEmpezar:
      "La Biblia no menciona las redes sociales ni muchos dilemas de hoy. ¿Cómo decide un creyente cuando ningún versículo lo dice directamente?",
    bloques: [
      { t: "versiculo", ref: "Salmos 119:105" },
      { t: "subtitulo", texto: "Los pasos" },
      {
        t: "lista",
        items: [
          "¿Qué manda o prohíbe la Biblia sobre esto? Si lo dice claramente, se obedece.",
          "¿Qué principios bíblicos se aplican? Por ejemplo, el amor al prójimo, la santidad y la verdad.",
          "¿Qué dice mi conciencia, iluminada por la Palabra? (Romanos 14:23)",
          "¿Qué aconsejan creyentes maduros? (Proverbios 11:14)",
          "¿Glorifica a Dios? ¿Edifica a otros? ¿Me esclaviza? (1 Corintios 10:31; 6:12)",
          "Oro y pido sabiduría a Dios (Santiago 1:5).",
        ],
      },
      { t: "subtitulo", texto: "Lo que la Biblia no menciona" },
      { t: "versiculo", ref: "1 Corintios 10:23-24" },
      {
        t: "parrafo",
        texto:
          "Pablo escribe: «Todo me es lícito, pero no todo conviene; todo me es lícito, pero no todo edifica». En los temas que la Biblia no regula, el creyente usa su libertad con amor: busca lo que edifica, no hace tropezar al hermano débil y no se deja dominar por nada (1 Corintios 6:12).",
      },
      { t: "versiculo", ref: "1 Corintios 10:31" },
      {
        t: "parrafo",
        texto:
          "La pregunta final es la de Pablo: «Si, pues, coméis o bebéis, o hacéis otra cosa, hacedlo todo para la gloria de Dios».",
      },
      { t: "versiculo", ref: "Santiago 1:5" },
      {
        t: "parrafo",
        texto:
          "Y Dios promete ayudar: «Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada».",
      },
      {
        t: "nota",
        titulo: "La conciencia necesita la Palabra",
        texto:
          "La conciencia es una alarma valiosa, pero puede estar mal entrenada. Se educa con la Palabra de Dios, y nunca se pasa por encima de ella a la ligera.",
      },
    ],
    ideaClave:
      "Para decidir se pregunta qué manda la Biblia, qué principios se aplican, qué dice la conciencia iluminada por la Palabra y qué aconsejan creyentes maduros, y se ora pidiendo sabiduría. En lo que la Biblia no menciona, se usa la libertad con amor: no todo conviene ni todo edifica, y todo se hace para la gloria de Dios.",
    paraLaVida: {
      texto: "La sabiduría para decidir se pide a Dios, y él la da sin reproche.",
      pregunta: "¿Qué decisión tienes por delante, y qué responden a ella los pasos de esta lección?",
    },
  },
  {
    id: "n4-etica-3",
    objetivos: [
      "Explicar la dignidad humana a partir de la imagen de Dios.",
      "Aplicar el valor de la vida a temas como el aborto, la violencia y el cuidado de los débiles.",
      "Rechazar el racismo y toda discriminación a la luz de la Escritura.",
    ],
    paraEmpezar:
      "Toda persona, rica o pobre, joven o anciana, sana o enferma, tiene un valor que nadie le da ni le puede quitar: fue creada a imagen de Dios.",
    bloques: [
      { t: "versiculo", ref: "Génesis 1:27" },
      { t: "versiculo", ref: "Éxodo 20:13" },
      {
        t: "parrafo",
        texto:
          "«Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó». Por eso la vida humana es sagrada: «No matarás». La dignidad de una persona no depende de su utilidad, de su salud ni de su edad.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=VsGlbwF4HtI", titulo: "Imagen de Dios", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "La vida antes de nacer" },
      { t: "versiculo", ref: "Salmos 139:13-16" },
      { t: "versiculo", ref: "Jeremías 1:5" },
      {
        t: "parrafo",
        texto:
          "David le dice a Dios: «Tú me hiciste en el vientre de mi madre», y Dios le dijo a Jeremías: «Antes que te formase en el vientre te conocí». Por eso los cristianos defienden la vida desde el vientre materno. A la vez, acompañan con compasión y sin condenación a la mujer en un embarazo difícil y a quien ya abortó y busca el perdón de Dios.",
      },
      { t: "subtitulo", texto: "Cuidar a los débiles" },
      { t: "versiculo", ref: "Proverbios 31:8-9" },
      {
        t: "parrafo",
        texto:
          "La Biblia pide proteger a los más vulnerables: «Abre tu boca por el mudo En el juicio de todos los desvalidos». Eso incluye a los niños, los ancianos, los enfermos, los pobres, los inmigrantes y las víctimas de la violencia. La violencia en la familia nunca se justifica.",
      },
      { t: "subtitulo", texto: "Un solo linaje" },
      { t: "versiculo", ref: "Hechos 17:26" },
      {
        t: "parrafo",
        texto:
          "Dios «de una sangre ha hecho todo el linaje de los hombres». El racismo y el desprecio por el origen, el color o la nación de una persona contradicen la creación y el evangelio, que une a todos en un solo cuerpo en Cristo (Gálatas 3:28).",
      },
      {
        t: "nota",
        titulo: "La verdad con compasión",
        texto:
          "Defender la vida y la dignidad no es condenar a las personas, sino amarlas como Dios las ama: con la verdad y con misericordia.",
      },
    ],
    ideaClave:
      "Toda persona fue creada a imagen de Dios; por eso la vida humana es sagrada y su dignidad no depende de su utilidad ni de su salud. Los cristianos defienden la vida desde el vientre materno y acompañan con compasión, protegen a los débiles y rechazan la violencia y el racismo, porque Dios hizo de una sangre todo el linaje humano.",
    paraLaVida: {
      texto: "Cada persona que ves lleva la imagen de Dios.",
      pregunta: "¿A quién te cuesta tratar con la dignidad que Dios le dio, y qué vas a cambiar?",
    },
  },
  {
    id: "n4-etica-4",
    objetivos: [
      "Explicar el diseño de Dios para la sexualidad y el matrimonio.",
      "Aplicar el llamado a la pureza en una cultura sexualizada, incluida la pornografía.",
      "Ofrecer restauración y gracia a quien ha caído.",
    ],
    paraEmpezar:
      "La sexualidad es un regalo de Dios, no algo sucio. Pero, como todo regalo poderoso, tiene un diseño y un lugar.",
    bloques: [
      { t: "versiculo", ref: "Génesis 2:24" },
      {
        t: "parrafo",
        texto:
          "«Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne». Jesús confirmó este diseño (Mateo 19:4-6). La declaración de fe del ministerio enseña que Dios instituyó el matrimonio entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida.",
      },
      { t: "versiculo", ref: "Hebreos 13:4" },
      {
        t: "parrafo",
        texto:
          "«Honroso sea en todos el matrimonio, y el lecho sin mancilla». La intimidad sexual es para el matrimonio. Fuera de él, la Biblia la llama fornicación o adulterio, y nos llama a huir de ella (1 Corintios 6:18).",
      },
      { t: "subtitulo", texto: "La pureza hoy" },
      { t: "versiculo", ref: "Mateo 5:27-28" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó que la pureza empieza en el corazón: mirar a una persona para codiciarla ya es adulterio en el corazón. La pornografía destruye la intimidad, explota a personas y esclaviza. La salida incluye confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza.",
      },
      { t: "versiculo", ref: "1 Corintios 6:18-20" },
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "Gracia para el que cae" },
      { t: "versiculo", ref: "1 Juan 1:9" },
      {
        t: "parrafo",
        texto:
          "Nadie está fuera del alcance de la gracia: «Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad». La iglesia debe hablar de este tema con verdad y sin burla, y acompañar a quien quiere ser libre.",
      },
      {
        t: "nota",
        titulo: "Con respeto por todos",
        texto:
          "La iglesia enseña el diseño de Dios con claridad y trata a toda persona con respeto, cualquiera que sea su lucha. Nadie debe ser humillado ni maltratado.",
      },
    ],
    ideaClave:
      "Dios creó la sexualidad como un regalo y la puso dentro del matrimonio entre un hombre y una mujer, un pacto para toda la vida. La pureza empieza en el corazón; la pornografía esclaviza, y la salida incluye confesar, pedir ayuda y rendir cuentas. Hay perdón y restauración para quien confiesa, y respeto para todos.",
    paraLaVida: {
      texto: "La pureza es posible con la gracia de Dios y la ayuda de hermanos fieles.",
      pregunta: "¿Qué límite práctico necesitas poner para cuidar tu pureza, y a quién le rendirás cuentas?",
    },
  },
  {
    id: "n4-etica-5",
    objetivos: [
      "Aplicar la honestidad bíblica al dinero, los impuestos y los negocios.",
      "Explicar la ética cristiana del trabajo.",
      "Valorar la verdad en las palabras y en los compromisos.",
    ],
    paraEmpezar:
      "La fe de una persona se nota en cómo usa su dinero, en cómo trabaja y en si cumple su palabra.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 11:1" },
      { t: "versiculo", ref: "Romanos 13:7" },
      {
        t: "parrafo",
        texto:
          "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada». El creyente es honrado en sus negocios: no engaña en el precio, no roba en el trabajo, paga lo que debe y paga sus impuestos, como enseñó Pablo: «Pagad a todos lo que debéis».",
      },
      { t: "subtitulo", texto: "El trabajo" },
      { t: "versiculo", ref: "Colosenses 3:23-24" },
      {
        t: "parrafo",
        texto:
          "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres». El trabajo es parte del plan de Dios desde el Edén (Génesis 2:15). El creyente trabaja con diligencia, sin pereza y sin explotar a otros, y trata con justicia a quienes trabajan para él (Santiago 5:4).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=i4C_o1AtR9o", titulo: "Libro de Proverbios: ¿cómo vivir una vida buena?", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "subtitulo", texto: "La verdad" },
      { t: "versiculo", ref: "Efesios 4:25" },
      {
        t: "parrafo",
        texto:
          "«Por lo cual, desechando la mentira, hablad verdad cada uno con su prójimo». La mentira, aunque parezca pequeña, rompe la confianza. Jesús enseñó que nuestro sí sea sí y nuestro no sea no (Mateo 5:37): el creyente cumple su palabra aunque le cueste.",
      },
      { t: "subtitulo", texto: "Cuidado con el amor al dinero" },
      { t: "versiculo", ref: "1 Timoteo 6:9-10" },
      {
        t: "parrafo",
        texto:
          "«porque raíz de todos los males es el amor al dinero». El problema no es el dinero, sino amarlo. Por eso el creyente da con generosidad, se contenta con lo que tiene y no se deja comprar.",
      },
      {
        t: "nota",
        titulo: "La integridad se ve en lo pequeño",
        texto:
          "El que es fiel en lo muy poco, también en lo más es fiel (Lucas 16:10). La integridad se construye en los detalles: una factura honesta, una hora bien trabajada, una promesa cumplida.",
      },
    ],
    ideaClave:
      "El creyente es honrado en sus negocios y paga lo que debe, también sus impuestos; trabaja de corazón, como para el Señor, y trata con justicia a los demás; dice la verdad y cumple su palabra; y no ama el dinero, porque la raíz de todos los males es el amor al dinero. La integridad se construye en lo pequeño.",
    paraLaVida: {
      texto: "Tu manera de trabajar y de usar el dinero predica más que tus palabras.",
      pregunta: "¿En qué detalle de tu trabajo o de tus finanzas necesitas ser más íntegro esta semana?",
    },
  },
  {
    id: "n4-etica-6",
    objetivos: [
      "Describir la integridad que pide la Palabra a quienes sirven y dirigen.",
      "Aplicar normas de ética ministerial: la transparencia en el dinero, la autoridad sin abuso y las relaciones apropiadas.",
      "Explicar cómo proteger a los menores y cómo restaurar a un líder que cae.",
    ],
    paraEmpezar:
      "Cuando un líder cae, el daño alcanza a muchos. La ética ministerial protege a la iglesia, a los débiles y al propio ministro.",
    bloques: [
      { t: "versiculo", ref: "1 Timoteo 3:2-3" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que quien dirige sea «irreprensible», sobrio y prudente, «no codicioso de ganancias deshonestas». Los requisitos del liderazgo son, ante todo, de carácter.",
      },
      { t: "subtitulo", texto: "Normas de ética ministerial" },
      {
        t: "lista",
        items: [
          "Transparencia en el dinero: las ofrendas las cuentan al menos dos personas, se registran y se rinden cuentas a la iglesia.",
          "Autoridad sin abuso: el que dirige sirve, no se enseñorea de los demás, y rinde cuentas (1 Pedro 5:2-3).",
          "Relaciones apropiadas: no se aconseja a solas a alguien del otro sexo en un lugar cerrado, y se evita toda apariencia de mal.",
          "Confidencialidad con sus límites: se guarda lo que se confía, salvo cuando hay peligro para la vida o abuso.",
          "Honestidad en el púlpito: no se inventan testimonios ni se usan sermones ajenos sin decirlo.",
        ],
      },
      { t: "versiculo", ref: "2 Corintios 8:20-21" },
      {
        t: "parrafo",
        texto:
          "Pablo cuidaba el dinero de las ofrendas «procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».",
      },
      { t: "subtitulo", texto: "Proteger a los menores" },
      { t: "versiculo", ref: "Mateo 18:6" },
      {
        t: "parrafo",
        texto:
          "En el ministerio con niños y adolescentes, la iglesia sigue normas claras: siempre hay al menos dos adultos, se verifica a quienes sirven, las puertas tienen ventana o quedan abiertas, y toda sospecha de abuso se reporta a las autoridades. En Texas, la ley obliga a toda persona a reportar la sospecha de abuso de un menor, sin excepción para los ministros. Jesús advirtió con dureza contra quien haga tropezar a uno de estos pequeños.",
      },
      { t: "subtitulo", texto: "Cuando un líder cae" },
      { t: "versiculo", ref: "Gálatas 6:1" },
      {
        t: "parrafo",
        texto:
          "La restauración se hace «con espíritu de mansedumbre», pero no es lo mismo que volver enseguida al cargo. Un líder que cae en un pecado grave deja el ministerio por un tiempo, recibe disciplina y acompañamiento, y repara el daño. Nunca se encubre un abuso para cuidar la imagen de la iglesia: primero se protege a la víctima.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Rendir cuentas",
        texto:
          "Todo ministro necesita a alguien a quien rendir cuentas: un pastor, un consejo o un grupo de hermanos maduros. Nadie está por encima de la Palabra.",
      },
    ],
    ideaClave:
      "Quien dirige debe ser irreprensible y no codicioso de ganancias deshonestas. La ética ministerial pide transparencia en el dinero, autoridad sin abuso, relaciones apropiadas, confidencialidad con límites y honestidad en el púlpito. Se protege a los menores con normas claras y reportando todo abuso, y el líder que cae se restaura con mansedumbre, sin encubrir nada.",
    paraLaVida: {
      texto: "La integridad del que sirve protege a toda la iglesia.",
      pregunta: "¿Qué norma de ética ministerial necesita fortalecer tu ministerio o tu iglesia?",
    },
  },
];
