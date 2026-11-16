/**
 * Especialidad Intercesión y oración · Materia 5 — La oración en los avivamientos (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Qué es un avivamiento, los avivamientos de la Biblia, los moravos de Herrnhut (1727), los despertares con Edwards, Carey,
 * el pajar (1806) y la calle Fulton (1857), Gales (1904), Azusa (1906), Pyongyang (1907) y Valparaíso (1909), y cómo orar
 * hoy por avivamiento. Las cifras que varían según las fuentes se dicen con cautela. Las lenguas como señal del bautismo
 * en el Espíritu y la doctrina del avivamiento quedan para la declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const INTERCESION_5: LeccionContenido[] = [
  {
    id: "intercesion-5-1",
    objetivos: [
      "Definir el avivamiento como una obra de Dios que renueva a su pueblo.",
      "Reconocer las señales que se repiten en los avivamientos.",
      "Explicar por qué el avivamiento es obra de Dios y no un producto humano.",
    ],
    paraEmpezar:
      "La palabra avivamiento se usa para muchas cosas: una campaña, un culto emotivo, una semana de reuniones. En la historia de la iglesia, sin embargo, significa algo más profundo.",
    bloques: [
      { t: "versiculo", ref: "Habacuc 3:2" },
      {
        t: "parrafo",
        texto:
          "Habacuc, ante tiempos difíciles, pidió: «Oh Jehová, aviva tu obra en medio de los tiempos». Un avivamiento es eso: Dios mismo renovando su obra en su pueblo, con una fuerza poco común. No es algo que se pone en un calendario.",
      },
      { t: "versiculo", ref: "Salmos 85:6" },
      {
        t: "parrafo",
        texto:
          "El salmista ora: «¿No volverás a darnos vida, Para que tu pueblo se regocije en ti?». El avivamiento empieza en el pueblo de Dios: los creyentes vuelven a la vida espiritual, y después el mundo lo nota.",
      },
      { t: "versiculo", ref: "Isaías 57:15" },
      {
        t: "parrafo",
        texto:
          "Dios promete habitar «con el quebrantado y humilde de espíritu, para hacer vivir el espíritu de los humildes». Por eso los avivamientos empiezan casi siempre con humildad y quebranto.",
      },
      { t: "subtitulo", texto: "Las señales que se repiten" },
      { t: "versiculo", ref: "Juan 16:8" },
      {
        t: "parrafo",
        texto: "Jesús dijo que el Espíritu Santo «convencerá al mundo de pecado, de justicia y de juicio». En los avivamientos de la historia se repiten algunas señales:",
      },
      {
        t: "lista",
        items: [
          "Una conciencia fuerte del pecado y de la santidad de Dios.",
          "Confesión y arrepentimiento sinceros.",
          "Hambre de oración y de la Palabra.",
          "Amor renovado entre los hermanos.",
          "Muchos que se convierten y un nuevo celo por la misión.",
        ],
      },
      {
        t: "nota",
        titulo: "Obra de Dios",
        texto:
          "Los avivamientos no se fabrican con música, emociones ni técnicas: Dios los da, y su pueblo los busca con humildad y oración. Lo que el ministerio enseña sobre las manifestaciones del Espíritu y su doctrina del avivamiento son puntos de la declaración de fe por confirmar, que se estudiarán en la materia Teología del avivamiento.",
      },
    ],
    ideaClave:
      "Un avivamiento es una obra de Dios que renueva a su pueblo con una fuerza poco común: aviva tu obra en medio de los tiempos. Empieza con humildad y quebranto, y trae convicción de pecado, arrepentimiento, hambre de oración y de la Palabra, amor entre los hermanos y celo por la misión. No se fabrica: Dios lo da, y su pueblo lo busca orando.",
    paraLaVida: {
      texto: "El avivamiento empieza con un corazón humilde que dice: aviva tu obra en mí.",
      pregunta: "¿Qué parte de tu vida espiritual necesita que Dios la vuelva a la vida?",
    },
  },
  {
    id: "intercesion-5-2",
    objetivos: [
      "Explicar la promesa de 2 Crónicas 7:14 y cómo se aplica hoy.",
      "Describir avivamientos del Antiguo Testamento con la Palabra, la confesión y la oración.",
      "Relacionar Pentecostés con la oración perseverante de la iglesia.",
    ],
    paraEmpezar: "La Biblia cuenta momentos en que Dios renovó a su pueblo. En todos aparece lo mismo: la Palabra, la humildad y la oración.",
    bloques: [
      { t: "versiculo", ref: "2 Crónicas 7:13-14" },
      {
        t: "parrafo",
        texto:
          "En la dedicación del templo, Dios le respondió a Salomón con una promesa: «Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro, y se convirtieren de sus malos caminos; entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra». Es el versículo de memoria de esta materia.",
      },
      {
        t: "nota",
        titulo: "Leer bien la promesa",
        texto:
          "Esta promesa fue dada a Israel, en el contexto del templo y de su tierra. Los creyentes la aplican como un principio que la Biblia repite: Dios responde cuando su pueblo se humilla, ora, lo busca y se aparta del pecado.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=lMj--4fDpvc", titulo: "Resumen del libro de Crónicas", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "2 Crónicas 30:27" },
      {
        t: "parrafo",
        texto:
          "En tiempos del rey Ezequías, el pueblo volvió a celebrar la Pascua después de años de abandono, y la Biblia termina el relato así: «su oración llegó a la habitación de su santuario, al cielo».",
      },
      { t: "versiculo", ref: "Nehemías 8:5-6" },
      {
        t: "parrafo",
        texto:
          "Después del exilio, Esdras abrió el libro de la ley delante del pueblo, y el pueblo respondió: «¡Amén! ¡Amén! alzando sus manos; y se humillaron y adoraron a Jehová inclinados a tierra».",
      },
      { t: "versiculo", ref: "Nehemías 9:1-3" },
      {
        t: "parrafo",
        texto:
          "Poco después se reunieron «en ayuno», y «confesaron sus pecados, y las iniquidades de sus padres». Una cuarta parte del día leyeron la ley, y otra cuarta parte confesaron sus pecados y adoraron. La Palabra llevó a la confesión, y la confesión a la adoración.",
      },
      { t: "subtitulo", texto: "Pentecostés" },
      { t: "versiculo", ref: "Hechos 1:14" },
      {
        t: "parrafo",
        texto: "Antes de Pentecostés, los discípulos esperaron orando: «Todos éstos perseveraban unánimes en oración y ruego».",
      },
      { t: "versiculo", ref: "Hechos 2:1-4" },
      {
        t: "parrafo",
        texto: "Y el día de Pentecostés, mientras «estaban todos unánimes juntos», «fueron todos llenos del Espíritu Santo».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OisTpQEle6E", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", minutos: 7 },
      {
        t: "nota",
        titulo: "Lo que queda para la declaración",
        texto:
          "Hechos 2 dice que hablaron en otras lenguas. Lo que el ministerio enseña sobre las lenguas como señal del bautismo en el Espíritu es un punto de la declaración de fe por confirmar.",
      },
      { t: "versiculo", ref: "Hechos 2:41-42" },
      {
        t: "parrafo",
        texto:
          "Aquel día «se añadieron aquel día como tres mil personas», y la iglesia siguió perseverando «en las oraciones». El avivamiento no terminó en un día: siguió en una iglesia que oraba.",
      },
    ],
    ideaClave:
      "Los avivamientos de la Biblia muestran lo mismo: un pueblo que se humilla, ora, busca el rostro de Dios y se aparta del pecado, como enseña 2 Crónicas 7:14. Así fue con Ezequías, con Esdras y Nehemías, donde la Palabra llevó a la confesión y a la adoración, y en Pentecostés, cuando la iglesia esperó orando y fue llena del Espíritu Santo.",
    paraLaVida: {
      texto: "Antes de Pentecostés hubo días de oración unánime.",
      pregunta: "¿Qué lugar tiene la oración con otros en tu vida y en tu iglesia?",
    },
  },
  {
    id: "intercesion-5-3",
    objetivos: [
      "Narrar el avivamiento de Herrnhut y la vigilia de oración de los moravos.",
      "Relacionar la oración perseverante con el envío de misioneros.",
      "Valorar la oración organizada y constante de la iglesia.",
    ],
    paraEmpezar:
      "En una aldea de Alemania, un grupo de refugiados divididos por sus desacuerdos llegó a ser uno de los movimientos de oración y de misiones más grandes de la historia.",
    bloques: [
      {
        t: "parrafo",
        texto:
          "A principios del siglo XVIII, el conde Nicolás de Zinzendorf recibió en sus tierras de Sajonia a creyentes perseguidos que venían de Moravia, y juntos fundaron la aldea de Herrnhut. Al principio hubo divisiones y discusiones. Pero después de un tiempo de oración y reconciliación, el 13 de agosto de 1727, en un culto de Santa Cena, vivieron un avivamiento que muchos llaman el Pentecostés moravo.",
      },
      {
        t: "parrafo",
        texto:
          "Pocos días después, el 27 de agosto, veinticuatro hombres y veinticuatro mujeres se comprometieron a orar por turnos, una hora cada uno, para que la oración no se detuviera ni de día ni de noche. Las fuentes coinciden en que esa vigilia duró muchos años, y la mayoría habla de unos cien.",
      },
      { t: "versiculo", ref: "Isaías 62:6-7" },
      {
        t: "parrafo",
        texto:
          "La imagen bíblica de los guardas sobre los muros describe bien esa oración: «todo el día y toda la noche no callarán jamás». Y añade: «no reposéis, ni le deis tregua». La oración perseverante no cansa a Dios: responde a su invitación.",
      },
      { t: "subtitulo", texto: "De la oración a las misiones" },
      { t: "versiculo", ref: "Mateo 9:37-38" },
      {
        t: "parrafo",
        texto:
          "La oración llevó a la misión. En 1732 salieron sus primeros misioneros hacia las islas del Caribe, y con los años los moravos enviaron a cientos a muchas partes del mundo. Pedían: «Rogad, pues, al Señor de la mies, que envíe obreros a su mies», y ellos mismos fueron.",
      },
      {
        t: "parrafo",
        texto:
          "Su influencia llegó lejos. Juan Wesley conoció a los moravos en un viaje a América y aprendió de ellos sobre la fe, y en 1738, en una reunión en la calle Aldersgate de Londres, tuvo la experiencia que cambió su vida. Después fue una de las grandes voces del avivamiento en Inglaterra.",
      },
      { t: "versiculo", ref: "Mateo 18:19-20" },
      {
        t: "parrafo",
        texto:
          "Los moravos oraban juntos, organizados y con fidelidad. Jesús prometió: «donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos».",
      },
      {
        t: "lista",
        items: [
          "Divisiones sanadas por la oración y la reconciliación.",
          "Una vigilia de oración por turnos, de día y de noche.",
          "La oración llevó al envío de misioneros.",
          "Su ejemplo influyó en el avivamiento de Wesley.",
        ],
      },
    ],
    ideaClave:
      "En Herrnhut, creyentes divididos se reconciliaron, y en agosto de 1727 Dios los avivó. Organizaron una vigilia de oración por turnos, de día y de noche, que según la mayoría de las fuentes duró unos cien años, y de esa oración salieron misioneros a muchas partes del mundo. La oración perseverante y organizada lleva a la misión.",
    paraLaVida: {
      texto: "Una hora de oración, multiplicada por muchos, sostiene una obra entera.",
      pregunta: "¿Qué hora de la semana podrías ofrecer para una cadena de oración en tu iglesia?",
    },
  },
  {
    id: "intercesion-5-4",
    objetivos: [
      "Describir el llamado de Jonathan Edwards a la oración unida.",
      "Narrar cómo la oración de unos pastores, de unos estudiantes y de unos comerciantes precedió grandes movimientos.",
      "Reconocer que la oración unida prepara el avivamiento y la misión.",
    ],
    paraEmpezar:
      "En los siglos XVIII y XIX hubo grandes despertares espirituales en Inglaterra y en los Estados Unidos. Detrás de ellos hubo reuniones de oración, muchas veces pequeñas y sencillas.",
    bloques: [
      {
        t: "parrafo",
        texto:
          "Jonathan Edwards, pastor en Northampton, en Nueva Inglaterra, vio un avivamiento en su iglesia en 1734 y 1735, y después el Gran Despertar de la década de 1740, en el que también predicó Jorge Whitefield. En 1747 publicó un llamado a que los cristianos de distintos lugares se pusieran de acuerdo para orar juntos por un derramamiento del Espíritu.",
      },
      { t: "versiculo", ref: "Zacarías 8:20-22" },
      {
        t: "parrafo",
        texto:
          "Edwards basó su llamado en esta profecía, en la que los habitantes de una ciudad invitan a los de otra: «Vamos a implorar el favor de Jehová, y a buscar a Jehová de los ejércitos. Yo también iré». La oración unida de muchas ciudades fue su anhelo.",
      },
      {
        t: "parrafo",
        texto:
          "Ese llamado cruzó el mar. Pastores bautistas de Inglaterra lo leyeron y organizaron reuniones mensuales de oración por el avivamiento y por las naciones. Entre ellos estaba Guillermo Carey, que en 1793 partió como misionero a la India.",
      },
      { t: "subtitulo", texto: "Junto a un pajar" },
      {
        t: "parrafo",
        texto:
          "En 1806, en Massachusetts, cinco estudiantes del Williams College se refugiaron de una tormenta junto a un pajar y oraron por las naciones. De aquella reunión, que se recuerda como la reunión del pajar, salió pocos años después la primera gran sociedad de misiones al extranjero de los Estados Unidos.",
      },
      { t: "subtitulo", texto: "La calle Fulton" },
      {
        t: "parrafo",
        texto:
          "En septiembre de 1857, en Nueva York, un comerciante llamado Jeremías Lanphier invitó a orar al mediodía en la calle Fulton. El primer día llegaron solo seis personas. Pocos meses después, miles oraban al mediodía en muchas ciudades. Las cifras varían según las fuentes, pero se habla de cientos de miles de convertidos en ese avivamiento.",
      },
      { t: "versiculo", ref: "Salmos 51:10-13" },
      {
        t: "parrafo",
        texto:
          "El orden del Salmo 51 se ve en los despertares: primero «Crea en mí, oh Dios, un corazón limpio», y después «Entonces enseñaré a los transgresores tus caminos, Y los pecadores se convertirán a ti». La renovación del pueblo de Dios lleva a la conversión de otros.",
      },
      {
        t: "lista",
        items: [
          "Edwards llamó a orar unidos por un derramamiento del Espíritu.",
          "Reuniones de oración en Inglaterra prepararon la misión de Carey.",
          "La reunión del pajar impulsó las misiones de los Estados Unidos.",
          "La oración del mediodía en la calle Fulton se multiplicó en muchas ciudades.",
        ],
      },
    ],
    ideaClave:
      "Detrás de los grandes despertares hubo oración unida, muchas veces pequeña y sencilla. Edwards llamó a orar juntos por un derramamiento del Espíritu; en Inglaterra, la oración preparó la misión de Carey; cinco estudiantes oraron junto a un pajar; y en la calle Fulton, seis personas empezaron una oración del mediodía que se multiplicó. La renovación de la iglesia lleva a la conversión de otros.",
    paraLaVida: {
      texto: "Dios puede empezar algo grande con seis personas que oran.",
      pregunta: "¿Con quién podrías empezar a orar con regularidad por un despertar en tu ciudad?",
    },
  },
  {
    id: "intercesion-5-5",
    objetivos: [
      "Narrar los avivamientos de Gales, de la calle Azusa, de Corea y de Chile a comienzos del siglo XX.",
      "Reconocer el lugar de la oración y de la confesión en esos avivamientos.",
      "Valorar el avivamiento en América Latina.",
    ],
    paraEmpezar:
      "A comienzos del siglo XX, en pocos años y en lugares muy distintos, Dios avivó a su iglesia. En todos esos lugares hubo oración antes del fuego.",
    bloques: [
      { t: "subtitulo", texto: "Gales, 1904" },
      {
        t: "parrafo",
        texto:
          "En Gales, un joven llamado Evan Roberts, que había trabajado en las minas de carbón y se preparaba para el ministerio, oró durante años por un avivamiento. En 1904 empezaron reuniones de oración y confesión que se extendieron por todo el país. Roberts insistía en cosas sencillas: confesar a Dios todo pecado conocido, apartarse de lo dudoso, obedecer pronto al Espíritu y confesar a Cristo en público. Se calcula que unas cien mil personas se convirtieron en pocos meses.",
      },
      { t: "versiculo", ref: "Santiago 5:16-18" },
      {
        t: "parrafo",
        texto:
          "Santiago une la confesión con la oración: «Confesaos vuestras ofensas unos a otros, y orad unos por otros». Y recuerda a Elías, un hombre «sujeto a pasiones semejantes a las nuestras», que «oró fervientemente», y Dios respondió.",
      },
      { t: "subtitulo", texto: "La calle Azusa, 1906" },
      {
        t: "parrafo",
        texto:
          "En Los Ángeles, un predicador afroamericano llamado William J. Seymour dirigía reuniones de oración en una casa de la calle Bonnie Brae. En abril de 1906 comenzó allí un avivamiento que pasó a un viejo edificio de la calle Azusa, donde se reunieron personas de muchas razas y naciones. De allí el movimiento pentecostal se extendió por el mundo.",
      },
      { t: "versiculo", ref: "Hechos 2:16-18" },
      {
        t: "parrafo",
        texto: "Los creyentes de Azusa veían en lo que vivían la promesa que citó Pedro: «Derramaré de mi Espíritu sobre toda carne».",
      },
      {
        t: "nota",
        titulo: "Lo que queda para la declaración",
        texto:
          "En Azusa y en Chile muchos hablaron en lenguas. Lo que el ministerio enseña sobre las lenguas como señal del bautismo en el Espíritu es un punto de la declaración de fe por confirmar.",
      },
      { t: "subtitulo", texto: "Corea, 1907" },
      {
        t: "parrafo",
        texto:
          "En enero de 1907, en la iglesia de Jangdaehyun, en Pyongyang, durante unas reuniones de estudio bíblico, los creyentes empezaron a confesar sus pecados en público, con lágrimas. Entre los primeros estuvo Gil Seon-ju, que llegó a ser uno de los primeros pastores coreanos. El avivamiento se extendió por el país, y la iglesia coreana conserva hasta hoy la costumbre de orar juntos de madrugada, que muchos asocian con Gil.",
      },
      { t: "subtitulo", texto: "Chile, 1909" },
      {
        t: "parrafo",
        texto:
          "En Valparaíso, la iglesia metodista del pastor Willis C. Hoover oraba desde 1907 pidiendo un derramamiento del Espíritu, después de leer un folleto sobre un avivamiento en la India. En 1909 llegó un avivamiento que se extendió a Santiago, y ese mismo año nació la Iglesia Metodista Pentecostal, una de las raíces del pentecostalismo de América Latina.",
      },
      { t: "versiculo", ref: "Hechos 19:18" },
      {
        t: "parrafo",
        texto:
          "En todos estos avivamientos se repitió lo que pasó en Éfeso: «muchos de los que habían creído venían, confesando y dando cuenta de sus hechos». La confesión sincera abrió paso a la renovación.",
      },
      {
        t: "lista",
        items: [
          "Gales: oración por años, confesión y obediencia pronta al Espíritu.",
          "Azusa: reuniones de oración y una iglesia de muchas razas.",
          "Corea: confesión pública y oración de madrugada.",
          "Chile: años de oración antes del avivamiento de 1909.",
        ],
      },
    ],
    ideaClave:
      "A comienzos del siglo XX hubo avivamientos en Gales, en la calle Azusa, en Corea y en Chile. En todos hubo oración perseverante y confesión sincera antes del fuego: Evan Roberts insistía en confesar todo pecado y obedecer pronto al Espíritu, en Pyongyang los creyentes confesaron en público y en Valparaíso oraron por años. La confesión y la oración abren paso a la renovación.",
    paraLaVida: {
      texto: "Antes del fuego, siempre hubo rodillas.",
      pregunta: "¿Qué pecado necesitas confesar para que Dios renueve tu vida?",
    },
  },
  {
    id: "intercesion-5-6",
    objetivos: [
      "Aplicar 2 Crónicas 7:14 y Hechos 4 a la oración por avivamiento hoy.",
      "Evaluar un movimiento espiritual por sus frutos.",
      "Planear una vida de oración, personal y de la iglesia, que busque la renovación.",
    ],
    paraEmpezar:
      "La historia inspira, pero no basta. La pregunta es qué hacemos hoy: cómo orar por un avivamiento y cómo reconocer uno verdadero.",
    bloques: [
      { t: "versiculo", ref: "Isaías 64:1" },
      {
        t: "parrafo",
        texto: "El profeta ora con anhelo: «¡Oh, si rompieses los cielos, y descendieras». Orar por avivamiento es anhelar la presencia de Dios más que cualquier otra cosa.",
      },
      { t: "versiculo", ref: "Hechos 4:29-31" },
      {
        t: "parrafo",
        texto:
          "Cuando la iglesia fue amenazada, no pidió comodidad: pidió valor, «que con todo denuedo hablen tu palabra». Y «Cuando hubieron orado, el lugar en que estaban congregados tembló; y todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios». Orar por avivamiento es orar por una iglesia que habla de Cristo con valor.",
      },
      { t: "subtitulo", texto: "Por sus frutos" },
      { t: "versiculo", ref: "Mateo 7:16-20" },
      {
        t: "parrafo",
        texto:
          "No todo lo que se llama avivamiento lo es. Jesús dio la prueba: «Por sus frutos los conoceréis». Un avivamiento verdadero no se mide por el ruido, las emociones o la fama, sino por el fruto.",
      },
      { t: "versiculo", ref: "Gálatas 5:22-23" },
      {
        t: "parrafo",
        texto:
          "Y el fruto del Espíritu es claro: «amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza». Donde hay un avivamiento verdadero crecen la santidad, el amor, la unidad y la misión.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 5:19-21" },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto:
          "La iglesia evita dos extremos: apagar lo que Dios hace, o aceptarlo todo sin examinarlo. Pablo dice: «No apaguéis al Espíritu», y también: «Examinadlo todo; retened lo bueno». Y pide orden: «hágase todo decentemente y con orden».",
      },
      { t: "subtitulo", texto: "Cómo orar hoy por avivamiento" },
      {
        t: "lista",
        items: [
          "Empezar por uno mismo: humillarse, confesar y buscar el rostro de Dios.",
          "Orar con otros, con constancia, como los moravos y la calle Fulton.",
          "Pedir valor para anunciar a Cristo, como en Hechos 4.",
          "Orar por la ciudad y por las naciones.",
          "No fabricar emociones ni buscar espectáculo.",
          "Examinarlo todo por la Escritura y por el fruto.",
        ],
      },
    ],
    ideaClave:
      "Orar por avivamiento hoy es anhelar la presencia de Dios, empezar por la propia humillación y confesión, orar con otros con constancia y pedir valor para anunciar a Cristo. Un avivamiento verdadero se reconoce por sus frutos: amor, santidad, unidad y misión. La iglesia no apaga al Espíritu, pero lo examina todo y retiene lo bueno, con orden.",
    paraLaVida: {
      texto: "El avivamiento que pedimos para la iglesia empieza en nuestro propio corazón.",
      pregunta: "¿Qué paso concreto darás esta semana para orar por un avivamiento en tu iglesia?",
    },
  },
];
