/**
 * Especialidad Familia y consejería · Materia 3 — Duelo y crisis (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: el duelo y sus reacciones, acompañar al que
 * sufre, los duelos difíciles (con el trastorno de duelo prolongado del DSM-5-TR, comprobado), los niños y el duelo, las
 * crisis con la primera ayuda psicológica de la OMS (observar, escuchar y conectar, comprobado) y la esperanza cristiana
 * con el cuidado del que consuela. No reemplaza la atención profesional.
 */
import type { LeccionContenido } from "../tipos";

export const FAMILIA_CONSEJERIA_3: LeccionContenido[] = [
  {
    id: "familia-consejeria-3-1",
    objetivos: [
      "Explicar qué es el duelo y por qué llorar no es falta de fe.",
      "Reconocer las reacciones comunes del duelo.",
      "Dirigir la primera visita a una familia que acaba de perder a un ser querido.",
    ],
    paraEmpezar:
      "Todos vamos a perder a alguien. El duelo es el dolor que sigue a una pérdida: la muerte de un ser querido, pero también un divorcio, la salud, el trabajo o la tierra donde uno nació. La iglesia no está para apurar ese dolor, sino para acompañarlo con la esperanza de Cristo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Juan 11:33-35" },
      {
        t: "parrafo",
        texto:
          "Ante la tumba de su amigo Lázaro, Jesús vio a María llorando, y «se estremeció en espíritu y se conmovió». El evangelio lo dice en dos palabras: «Jesús lloró». Llorar no es falta de fe: el Hijo de Dios lloró, aunque iba a resucitar a su amigo.",
      },
      { t: "versiculo", ref: "Salmos 13:1-2" },
      {
        t: "parrafo",
        texto:
          "Los salmos enseñan a llevar el dolor a Dios con palabras honestas: «¿Hasta cuándo, Jehová? ¿Me olvidarás para siempre?». Dios no se ofende con la queja sincera de sus hijos.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 4:13-14" },
      {
        t: "parrafo",
        texto:
          "Pablo no prohíbe la tristeza: pide que no nos entristezcamos «como los otros que no tienen esperanza». El creyente llora, pero con esperanza: «si creemos que Jesús murió y resucitó, así también traerá Dios con Jesús a los que durmieron en él».",
      },
      { t: "versiculo", ref: "Salmos 34:18" },
      {
        t: "parrafo",
        texto:
          "Y en medio del dolor, Dios se acerca: «Cercano está Jehová a los quebrantados de corazón; Y salva a los contritos de espíritu».",
      },
      { t: "subtitulo", texto: "Las reacciones comunes del duelo" },
      {
        t: "lista",
        items: [
          "La tristeza profunda y el llanto que llega de repente.",
          "El enojo: contra Dios, contra los médicos, contra uno mismo o contra el que murió.",
          "La culpa: lo que se dijo, lo que no se hizo, lo que se pudo hacer.",
          "El cansancio, la falta de sueño o de hambre, y otros síntomas del cuerpo.",
          "La confusión: olvidar cosas, no poder concentrarse, sentir que nada es real.",
          "El alivio, cuando la persona sufrió mucho, y la culpa por sentirlo.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La psiquiatra Elisabeth Kübler-Ross describió cinco etapas en las personas que se enfrentan a la muerte: la negación, la ira, la negociación, la depresión y la aceptación. Ayudan a nombrar lo que se siente, pero el duelo no sigue un orden fijo: las emociones van y vienen como olas, y cada persona tiene su tiempo.",
      },
      { t: "subtitulo", texto: "Comparación: lo que ayuda decir y lo que no ayuda" },
      {
        t: "lista",
        items: [
          "No ayuda: ya está en un lugar mejor, no llores. Ayuda: lo siento mucho; estoy aquí contigo.",
          "No ayuda: Dios necesitaba otro ángel. Ayuda: no tengo palabras, pero voy a orar por ti.",
          "No ayuda: sé exactamente cómo te sientes. Ayuda: ¿cómo estás hoy?, y escuchar la respuesta.",
          "No ayuda: tienes que ser fuerte. Ayuda: está bien llorar; Jesús también lloró.",
          "No ayuda: llámame si necesitas algo. Ayuda: el jueves te traigo la cena, ¿te parece?",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la primera visita a una familia en duelo" },
      {
        t: "parrafo",
        texto:
          "Esta mañana murió don Ernesto, de un infarto. Su esposa y sus dos hijos están en la casa, con algunos vecinos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, ir pronto y quedarse poco: la primera visita es corta, y el consejero va con otro hermano.",
          "Paso 2, saludar con cariño y decir algo sencillo: lo siento mucho, estamos con ustedes.",
          "Paso 3, escuchar más que hablar: dejar que cuenten lo que pasó, si quieren, y aceptar los silencios y el llanto.",
          "Paso 4, preguntar por lo práctico: quién avisa a la familia, la funeraria, la comida y el cuidado de los niños.",
          "Paso 5, orar brevemente, si la familia lo desea, con palabras de consuelo y no de sermón.",
          "Paso 6, acordar la próxima visita y anotar las fechas que vienen: el funeral, el primer mes y el primer aniversario.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El duelo no es una enfermedad, y casi siempre la familia lo atraviesa con la ayuda de Dios, de los suyos y de la iglesia. Pero si alguien habla de quitarse la vida, no puede cuidarse o no puede llevar su vida después de mucho tiempo, busca ayuda profesional; la línea 988 atiende en español las 24 horas.",
      },
    ],
    ideaClave:
      "El duelo es el dolor natural después de una pérdida, y llorar no es falta de fe: Jesús lloró ante la tumba de Lázaro, y los salmos llevan a Dios la queja sincera. El creyente llora, pero no como los que no tienen esperanza, y Dios está cerca de los quebrantados de corazón. Las emociones del duelo van y vienen como olas. El que consuela escucha más que habla, evita las frases hechas, ayuda en lo práctico y vuelve.",
    paraLaVida: {
      texto: "Jesús lloró.",
      pregunta: "¿A quién de tu iglesia que perdió a alguien puedes llamar esta semana?",
    },
  },
  {
    id: "familia-consejeria-3-2",
    objetivos: [
      "Explicar el ministerio de la presencia con el ejemplo de los amigos de Job.",
      "Distinguir el consuelo que ayuda del que hiere.",
      "Organizar un plan de acompañamiento para el primer año del duelo.",
    ],
    paraEmpezar:
      "Muchos no visitan al que sufre porque no saben qué decir. Pero la persona en duelo no necesita discursos, sino compañía. Estar ahí, con amor y con paciencia, ya es un consuelo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=_AIvRQj8kHs", titulo: "Resumen de la historia de Job: ¿por qué la vida de Job se volvió tan difícil?", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Job 2:11-13" },
      {
        t: "parrafo",
        texto:
          "Cuando los amigos de Job supieron de su desgracia, vinieron «para condolerse de él y para consolarle». Y lo mejor que hicieron fue esto: «se sentaron con él en tierra por siete días y siete noches, y ninguno le hablaba palabra, porque veían que su dolor era muy grande».",
      },
      { t: "versiculo", ref: "Job 16:2" },
      {
        t: "parrafo",
        texto:
          "Pero después hablaron, y quisieron explicarle por qué sufría, como si fuera culpa suya. Job les respondió: «Consoladores molestos sois todos vosotros». A veces las palabras que buscan explicar el dolor hieren más que el silencio.",
      },
      { t: "versiculo", ref: "Romanos 12:15" },
      {
        t: "parrafo",
        texto:
          "Pablo lo dice en pocas palabras: «Gozaos con los que se gozan; llorad con los que lloran». Consolar es acompañar el dolor, no apurarlo.",
      },
      { t: "versiculo", ref: "Gálatas 6:2" },
      {
        t: "parrafo",
        texto:
          "«Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo». La ayuda práctica también es consuelo.",
      },
      { t: "subtitulo", texto: "Comparación: los amigos de Job en silencio y hablando" },
      {
        t: "lista",
        items: [
          "En silencio: vinieron, se sentaron con él y compartieron su dolor. Hablando: le dieron explicaciones que no les pedía.",
          "En silencio: vieron que su dolor era muy grande. Hablando: buscaron un pecado escondido que explicara su sufrimiento.",
          "En silencio: fueron un consuelo. Hablando: Job los llamó consoladores molestos.",
        ],
      },
      { t: "subtitulo", texto: "La ayuda práctica" },
      {
        t: "lista",
        items: [
          "Llevar comida, con un calendario para que no lleguen diez platos el mismo día.",
          "Ayudar con los trámites, con los niños, con la casa o con el carro.",
          "Acompañar en las fechas difíciles: el cumpleaños, el aniversario de la boda y las fiestas de fin de año.",
          "Recordar el nombre del que murió y hablar de él, si la familia quiere.",
          "Seguir llamando después del funeral, cuando casi todos dejan de venir.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan del primer año" },
      {
        t: "parrafo",
        texto:
          "Doña Marta enviudó en marzo. El equipo de consuelo de la iglesia arma un plan para acompañarla durante el primer año.",
      },
      {
        t: "lista",
        items: [
          "La primera semana: visitas cortas, la comida organizada y ayuda con el funeral.",
          "El primer mes: una llamada cada semana y una visita para conversar y orar.",
          "A los tres meses: invitarla a almorzar después del culto y preguntarle cómo duerme y cómo come.",
          "Las fechas difíciles: anotar el cumpleaños de su esposo, el aniversario de la boda y la Navidad, y llamarla esos días.",
          "El primer aniversario de la muerte: visitarla, recordar juntos a su esposo y orar.",
          "Todo el año: estar atentos a las señales de un duelo que se complica, y buscar ayuda si hace falta.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "No le digas al que sufre que su pérdida es un castigo, ni le busques un pecado escondido: eso hicieron los amigos de Job, y al final Dios les dijo que no habían hablado de él lo recto (Job 42:7).",
      },
    ],
    ideaClave:
      "Los amigos de Job consolaron mientras se sentaron con él en silencio, y lo hirieron cuando quisieron explicarle su dolor. Consolar es llorar con los que lloran y sobrellevar sus cargas: estar presentes, escuchar, ayudar en lo práctico y seguir acompañando todo el primer año, sobre todo en las fechas difíciles.",
    paraLaVida: {
      texto: "Estar ahí ya es un consuelo.",
      pregunta: "¿Qué fecha difícil de alguien de tu iglesia puedes anotar hoy en tu calendario?",
    },
  },
  {
    id: "familia-consejeria-3-3",
    objetivos: [
      "Reconocer los duelos que pesan más: la muerte de un hijo, el suicidio y la muerte repentina.",
      "Acompañar con compasión a una familia después de un suicidio.",
      "Reconocer las señales de un duelo que se complica y saber cuándo derivar.",
    ],
    paraEmpezar:
      "Hay pérdidas que parecen ir contra el orden de la vida: un padre que entierra a su hijo, una muerte por suicidio, un accidente que se lleva a alguien sin despedirse. En esos duelos el dolor suele ser más intenso y durar más, y la familia necesita una compañía más cuidadosa.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=BEvicPpjQBE", titulo: "Resumen del libro de 2 Samuel", fuente: "Proyecto Biblia" },
      { t: "versiculo", ref: "2 Samuel 12:22-23" },
      {
        t: "parrafo",
        texto:
          "Cuando murió el niño que tuvo con Betsabé, David dijo: «Mas ahora que ha muerto, ¿para qué he de ayunar? ¿Podré yo hacerle volver? Yo voy a él, mas él no volverá a mí». Muchos ven en sus palabras la esperanza de volver a encontrarse con su hijo.",
      },
      { t: "versiculo", ref: "2 Samuel 18:33" },
      {
        t: "parrafo",
        texto:
          "Años después, cuando murió su hijo Absalón, que se había rebelado contra él, el rey lloró: «¡Hijo mío Absalón, hijo mío, hijo mío Absalón! ¡Quién me diera que muriera yo en lugar de ti». El dolor de un padre no depende de lo que hizo el hijo.",
      },
      { t: "versiculo", ref: "Lamentaciones 3:22-23" },
      {
        t: "parrafo",
        texto:
          "En el libro del llanto también hay esperanza: «Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad».",
      },
      { t: "subtitulo", texto: "Los duelos que pesan más" },
      {
        t: "lista",
        items: [
          "La muerte de un hijo, a cualquier edad, también la pérdida de un embarazo.",
          "El suicidio, que deja preguntas sin respuesta, culpa y, muchas veces, vergüenza.",
          "La muerte repentina por un accidente, un crimen o un infarto, sin poder despedirse.",
          "La muerte después de una larga enfermedad, con el cansancio de los que cuidaron.",
          "Las pérdidas que nadie ve: un divorcio, un hijo en la cárcel o deportado, un sueño que se rompió.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: acompañar a una familia después de un suicidio" },
      {
        t: "parrafo",
        texto:
          "Un joven de la iglesia se quitó la vida. Sus padres y su hermana están destrozados, y algunos en la iglesia hacen preguntas que lastiman.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, estar presentes como en cualquier duelo, sin preguntar por los detalles.",
          "Paso 2, nombrar al que murió por su nombre y recordar su vida, no solo su muerte.",
          "Paso 3, quitar la culpa: el suicidio nace de un dolor muy grande, y la familia no es la culpable.",
          "Paso 4, no juzgar el destino eterno del que murió: eso le corresponde a Dios, que es justo y misericordioso.",
          "Paso 5, cuidar a la iglesia: pedir que no haya chismes y enseñar cómo acompañar a la familia.",
          "Paso 6, cuidar a los que quedan: el dolor puede traer pensamientos de muerte, así que se les pregunta con cariño cómo están y se tiene a mano la línea 988.",
          "Paso 7, derivar a un consejero profesional o a un grupo de apoyo para las familias que perdieron a alguien por suicidio.",
        ],
      },
      { t: "subtitulo", texto: "Cuando el duelo se complica" },
      {
        t: "parrafo",
        texto:
          "Desde 2022, el manual de diagnóstico de la Asociación Estadounidense de Psiquiatría reconoce el trastorno de duelo prolongado: cuando, pasado al menos un año de la muerte en un adulto, o seis meses en un niño o un adolescente, el anhelo y el dolor siguen tan intensos que la persona no puede llevar su vida diaria. No le toca al consejero diagnosticar, pero sí notar las señales y derivar.",
      },
      {
        t: "lista",
        items: [
          "No puede trabajar, comer ni cuidarse después de muchos meses.",
          "Habla de que no quiere vivir o de irse con el que murió.",
          "Se aísla de todos, o empieza a beber o a usar drogas para no sentir.",
          "Siente una culpa que no la deja en paz, aunque no tenga culpa.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si alguien habla de quitarse la vida, no lo dejes solo y llama al 988; si está en peligro inmediato, llama al 911. Lo que te digan en confianza no se guarda cuando hay una vida en peligro.",
      },
    ],
    ideaClave:
      "Hay duelos que pesan más: la muerte de un hijo, el suicidio y la muerte repentina. David lloró a sus hijos, y Lamentaciones recuerda que las misericordias de Dios son nuevas cada mañana. Después de un suicidio se quita la culpa a la familia, no se juzga el destino del que murió y se cuida a los que quedan. Si el dolor no deja vivir después de mucho tiempo, o hay riesgo de suicidio, se deriva.",
    paraLaVida: {
      texto: "Las misericordias de Dios son nuevas cada mañana.",
      pregunta: "¿Qué familia que vive un duelo difícil necesita hoy tu compañía?",
    },
  },
  {
    id: "familia-consejeria-3-4",
    objetivos: [
      "Describir cómo viven el duelo los niños según su edad.",
      "Explicar a un niño una muerte con palabras sencillas y verdaderas.",
      "Organizar el apoyo de la familia y de la iglesia a un niño en duelo.",
    ],
    paraEmpezar:
      "A veces los adultos creen que los niños no se dan cuenta, o los apartan para que no sufran. Pero los niños sienten la pérdida, y necesitan que alguien les explique lo que pasa y los acompañe.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 10:14" },
      {
        t: "parrafo",
        texto:
          "Cuando los discípulos quisieron apartar a los niños, Jesús se indignó y dijo: «Dejad a los niños venir a mí, y no se lo impidáis». Los niños también pueden llevar su dolor a Jesús.",
      },
      { t: "versiculo", ref: "Salmos 27:10" },
      {
        t: "parrafo",
        texto:
          "El salmista confía: «Aunque mi padre y mi madre me dejaran, Con todo, Jehová me recogerá». El niño que pierde a su papá o a su mamá no queda solo delante de Dios.",
      },
      { t: "versiculo", ref: "Isaías 66:13" },
      {
        t: "parrafo",
        texto:
          "Dios mismo consuela como una madre: «Como aquel a quien consuela su madre, así os consolaré yo a vosotros». Su consuelo llega también por los abrazos de la familia y de la iglesia.",
      },
      { t: "subtitulo", texto: "Comparación: cómo viven el duelo los niños según su edad" },
      {
        t: "lista",
        items: [
          "Hasta los cinco años, más o menos: no entienden que la muerte es para siempre; preguntan una y otra vez cuándo vuelve, y pueden portarse como si fueran más pequeños.",
          "De los seis a los nueve años: empiezan a entender que la muerte es para siempre; pueden tener miedo de que mueran otros o culparse por lo que pasó.",
          "De los diez a los doce años: entienden la muerte casi como un adulto, pero a veces esconden lo que sienten para no preocupar a los demás.",
          "Los adolescentes: sienten como adultos, pero lo viven a su manera, con enojo, con silencio o apoyándose en sus amigos.",
        ],
      },
      { t: "subtitulo", texto: "Lo que ayuda a un niño en duelo" },
      {
        t: "lista",
        items: [
          "Decirle la verdad con palabras sencillas: murió, su cuerpo dejó de funcionar y ya no va a volver.",
          "No decirle que se durmió o que se fue de viaje, porque puede tenerle miedo a dormir o esperar que regrese.",
          "Dejar que pregunte, aunque pregunte lo mismo muchas veces, y responder con calma.",
          "Invitarlo al funeral si quiere ir, explicándole antes lo que va a ver.",
          "Mantener la rutina: la escuela, las comidas y la hora de dormir.",
          "Avisar a sus maestros y estar atentos a los cambios en su conducta.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: decirle a una niña de seis años que murió su abuelo" },
      {
        t: "parrafo",
        texto:
          "El abuelo de Sofía, de seis años, murió anoche en el hospital. Sus padres no saben cómo decírselo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, elegir quién y dónde: uno de sus padres, en un lugar tranquilo y con tiempo, con alguien de confianza al lado.",
          "Paso 2, decirlo con palabras claras: Sofía, el abuelo estaba muy enfermo y anoche murió. Su cuerpo dejó de funcionar y ya no va a volver.",
          "Paso 3, hablar de la esperanza con sencillez: el abuelo amaba a Jesús, y Jesús prometió que los que creen en él vivirán.",
          "Paso 4, dejar que reaccione: puede llorar, quedarse callada o pedir ir a jugar, y todo eso es normal.",
          "Paso 5, responder sus preguntas con la verdad, sin dar más detalles de los que pide.",
          "Paso 6, decirle lo que va a pasar: cuándo es el funeral, quién la va a cuidar, y que puede preguntar todo lo que quiera.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si después de un tiempo el niño no puede ir a la escuela, tiene miedo todo el tiempo, no duerme, se lastima o habla de morirse, sus padres deben buscar a un profesional que atienda a niños. Y nadie habla a solas con un niño en un lugar cerrado: siempre con otro adulto presente o en un lugar visible.",
      },
    ],
    ideaClave:
      "Jesús pidió que dejaran a los niños venir a él, y Dios consuela como una madre. Los niños viven el duelo según su edad, y necesitan la verdad con palabras sencillas: murió y ya no va a volver, sin decir que se durmió o que se fue de viaje. Ayuda dejarlos preguntar, invitarlos al funeral si quieren, mantener la rutina y estar atentos a las señales de que necesitan más ayuda.",
    paraLaVida: {
      texto: "Los niños también pueden llevar su dolor a Jesús.",
      pregunta: "¿Qué niño de tu iglesia perdió a alguien y necesita un adulto que lo escuche?",
    },
  },
  {
    id: "familia-consejeria-3-5",
    objetivos: [
      "Explicar qué es una crisis y cómo suele reaccionar la gente.",
      "Aplicar los principios de la primera ayuda psicológica: observar, escuchar y conectar.",
      "Organizar la respuesta de la iglesia ante un desastre en la comunidad.",
    ],
    paraEmpezar:
      "Un huracán, una inundación, un incendio, un tiroteo o un accidente pueden cambiar una comunidad en una hora. En esos momentos la iglesia puede ser un refugio, si sabe cómo ayudar sin hacer más daño.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=s-K5s7YpUC8", titulo: "Resumen del libro de Isaías (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Isaías 43:2" },
      {
        t: "parrafo",
        texto:
          "Dios no promete que no pasaremos por la tormenta, sino que no pasaremos solos: «Cuando pases por las aguas, yo estaré contigo; y si por los ríos, no te anegarán».",
      },
      { t: "versiculo", ref: "Marcos 4:38-39" },
      {
        t: "parrafo",
        texto:
          "En la tempestad, los discípulos le gritaron a Jesús: «Maestro, ¿no tienes cuidado que perecemos?». Él se levantó, «reprendió al viento, y dijo al mar: Calla, enmudece». En la crisis el miedo es normal, y Jesús está en la barca.",
      },
      { t: "versiculo", ref: "1 Reyes 19:5-7" },
      {
        t: "parrafo",
        texto:
          "Cuando Elías, agotado y con miedo, pidió morirse, el ángel no le dio primero un sermón: le dijo «Levántate, come», y a su lado había «una torta cocida sobre las ascuas, y una vasija de agua». En la crisis se cuida primero lo básico: la seguridad, la comida, el agua y el descanso.",
      },
      { t: "subtitulo", texto: "Qué es una crisis" },
      {
        t: "parrafo",
        texto:
          "Una crisis es un golpe que supera, por un tiempo, las fuerzas con que la persona suele salir adelante. Es normal sentir miedo, confusión, llanto o enojo, o no poder dormir. La mayoría de las personas se recupera con el tiempo y con el apoyo de los suyos, y la iglesia ayuda a que no estén solas.",
      },
      { t: "subtitulo", texto: "La primera ayuda psicológica: observar, escuchar y conectar" },
      {
        t: "parrafo",
        texto:
          "La Organización Mundial de la Salud publicó una guía de primera ayuda psicológica para los que ayudan en las emergencias. Sus tres principios sirven también a la iglesia.",
      },
      {
        t: "lista",
        items: [
          "Observar: ver si el lugar es seguro, quién necesita ayuda urgente y quién está muy angustiado.",
          "Escuchar: acercarse con respeto, preguntar qué necesita y escuchar sin presionar a nadie a contar lo que vivió.",
          "Conectar: ayudar a cubrir lo básico, como el agua, la comida y el techo, a encontrar a los seres queridos y a llegar a la ayuda que hace falta.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la ayuda que sirve y la que hace daño" },
      {
        t: "lista",
        items: [
          "Sirve: preguntar qué necesita. Hace daño: suponer y llevar lo que nadie pidió.",
          "Sirve: escuchar si quiere hablar. Hace daño: obligarlo a contar lo que vivió.",
          "Sirve: decir solo lo que se sabe. Hace daño: prometer lo que no se puede cumplir.",
          "Sirve: coordinarse con las autoridades y con los que ayudan. Hace daño: llegar por su cuenta a un lugar peligroso.",
          "Sirve: orar con quien lo pide. Hace daño: decir que el desastre es un castigo de Dios.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la iglesia después de una inundación" },
      {
        t: "parrafo",
        texto:
          "Una inundación sacó de sus casas a varias familias del barrio, entre ellas a tres familias de la iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, la seguridad: seguir las indicaciones de las autoridades y no entrar en las zonas de peligro.",
          "Paso 2, saber quién está bien: llamar a cada familia de la iglesia y anotar lo que necesita.",
          "Paso 3, lo básico: abrir el templo como centro de ayuda, si es seguro, con agua, comida, ropa seca y un lugar para descansar.",
          "Paso 4, escuchar: un equipo que acompañe a las familias, escuche sin presionar y ore con quien lo pida.",
          "Paso 5, conectar: ayudar a las familias a pedir la ayuda oficial de emergencia y a llegar a los servicios que necesitan.",
          "Paso 6, seguir después: las visitas, la limpieza de las casas y la atención a los que, semanas después, siguen sin poder dormir o con mucho miedo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los que ayudan también se cansan y se afectan. Organiza turnos, cuida que el equipo coma y descanse, y conversa con ellos al terminar.",
      },
    ],
    ideaClave:
      "Dios no promete que no pasaremos por las aguas, sino que estará con nosotros; en la tempestad Jesús está en la barca, y con Elías Dios cuidó primero lo básico. Una crisis supera por un tiempo las fuerzas de la persona, y la iglesia ayuda con los principios de la primera ayuda psicológica de la OMS: observar, escuchar y conectar, coordinándose con las autoridades y sin prometer lo que no puede cumplir.",
    paraLaVida: {
      texto: "En la tormenta, Jesús está en la barca.",
      pregunta: "¿Está tu iglesia preparada para servir si mañana llega una emergencia?",
    },
  },
  {
    id: "familia-consejeria-3-6",
    objetivos: [
      "Explicar la esperanza cristiana ante la muerte.",
      "Compartir la esperanza sin apurar el duelo.",
      "Armar un plan para cuidar al equipo que consuela.",
    ],
    paraEmpezar:
      "El creyente llora, pero no llora sin esperanza. Y el que acompaña a muchos que sufren también se cansa. Esta lección mira las dos cosas: la esperanza que sostiene y el cuidado del que consuela.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2): la última cena, la cruz y la resurrección", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Juan 11:25-26" },
      {
        t: "parrafo",
        texto:
          "Ante la tumba de Lázaro, Jesús le dijo a Marta: «Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá». La esperanza cristiana no es un deseo bonito: es una persona que venció a la muerte.",
      },
      { t: "versiculo", ref: "1 Corintios 15:55-57" },
      {
        t: "parrafo",
        texto:
          "Pablo canta: «¿Dónde está, oh muerte, tu aguijón? ¿Dónde, oh sepulcro, tu victoria?», y da gracias a Dios, «que nos da la victoria por medio de nuestro Señor Jesucristo».",
      },
      { t: "versiculo", ref: "Apocalipsis 21:4" },
      {
        t: "parrafo",
        texto:
          "Y la Biblia termina con una promesa: «Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».",
      },
      { t: "subtitulo", texto: "Compartir la esperanza sin apurar el duelo" },
      {
        t: "lista",
        items: [
          "Primero el llanto y después las palabras: Jesús lloró antes de resucitar a Lázaro.",
          "La esperanza se ofrece, no se impone: no se usa para callar la tristeza.",
          "Se habla con sencillez de la resurrección y del cielo, sin inventar detalles que la Biblia no dice.",
          "Cuando no se sabe si el que murió creía, no se juzga: se consuela a la familia y se confía en Dios, que es justo y misericordioso.",
          "El funeral, que se estudia en Ordenanzas y ceremonias, es un lugar para llorar y para anunciar la esperanza.",
        ],
      },
      { t: "subtitulo", texto: "El cuidado del que consuela" },
      { t: "versiculo", ref: "Éxodo 18:17-18" },
      {
        t: "parrafo",
        texto:
          "Moisés atendía solo a todo el pueblo, y su suegro le dijo: «No está bien lo que haces. Desfallecerás del todo», y añadió: «no podrás hacerlo tú solo».",
      },
      { t: "versiculo", ref: "Marcos 6:31" },
      {
        t: "parrafo",
        texto:
          "Jesús también cuidó a sus discípulos cansados: «Venid vosotros aparte a un lugar desierto, y descansad un poco».",
      },
      {
        t: "parrafo",
        texto:
          "El que acompaña a muchos que sufren puede cansarse por dentro: se vuelve irritable, duerme mal, siente que nada de lo que hace sirve o deja de sentir compasión. Se llama fatiga por compasión, y se previene a tiempo.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan de cuidado del equipo de consuelo" },
      {
        t: "parrafo",
        texto:
          "La iglesia formó un equipo de seis hermanos que acompaña a las familias en duelo. El pastor quiere cuidarlos para que no se agoten.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, nadie va solo: las visitas se hacen de dos en dos, y los casos se reparten.",
          "Paso 2, un límite: cada uno acompaña a pocas familias a la vez.",
          "Paso 3, una reunión al mes para orar, contar lo que viven y aprender juntos.",
          "Paso 4, el descanso: un tiempo libre cada cierto tiempo, sobre todo después de un caso muy duro.",
          "Paso 5, atención a las señales: si alguien se ve agotado, el pastor conversa con él y lo ayuda a descansar o a buscar ayuda.",
          "Paso 6, su propia vida con Dios: la oración, la Palabra y el día de reposo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuidarte no es egoísmo. Jesús se apartaba a orar, y llevó a sus discípulos a descansar. Un consolador agotado no puede consolar.",
      },
    ],
    ideaClave:
      "Jesús es la resurrección y la vida, la muerte ya no tiene la victoria y Dios enjugará toda lágrima. La esperanza se comparte después del llanto, con sencillez y sin juzgar. El que consuela también necesita cuidado: como le dijo a Moisés su suegro, nadie puede hacerlo solo, y Jesús llevó a sus discípulos a descansar. Un equipo que va de dos en dos, con límites, oración y descanso, puede consolar por mucho tiempo.",
    paraLaVida: {
      texto: "Un consolador agotado no puede consolar.",
      pregunta: "¿Qué necesitas hacer esta semana para cuidar tu propia alma?",
    },
  },
];
