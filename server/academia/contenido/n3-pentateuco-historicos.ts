/**
 * Nivel 3 · Materia 3 — Pentateuco y libros históricos (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Profundiza lo que «Panorama del Antiguo Testamento» (Nivel 2) recorrió por encima: la estructura, el propósito y la
 * teología de cada libro, de Génesis a Ester, y cómo cada uno apunta a Cristo. Las fechas van como aproximadas y son
 * las de la cronología evangélica más usada (la división del reino hacia el 930 a. C., Samaria en el 722, Jerusalén en
 * el 586, el decreto de Ciro en el 538, el templo terminado hacia el 516, Esdras en el 458 y Nehemías en el 445). La
 * fecha del éxodo se discute (siglo XV o XIII a. C.) y no se decide aquí.
 */
import type { LeccionContenido } from "../tipos";

export const N3_PENTATEUCO_HISTORICOS: LeccionContenido[] = [
  {
    id: "n3-pentateuco-historicos-1",
    objetivos: [
      "Describir las dos partes de Génesis y su propósito como libro de los comienzos.",
      "Explicar qué enseña Génesis sobre la creación, el ser humano, el pecado y la gracia.",
      "Mostrar cómo la promesa a Abraham es el hilo de toda la Biblia y se cumple en Cristo.",
    ],
    paraEmpezar:
      "Los cinco primeros libros de la Biblia forman el Pentateuco, que los judíos llaman la Torá: la instrucción. Jesús los atribuyó a Moisés y dijo que Moisés escribió de él (Juan 5:46). Todo empieza en Génesis, el libro de los orígenes.",
    bloques: [
      { t: "versiculo", ref: "Génesis 1:1" },
      { t: "subtitulo", texto: "Dos partes y una fórmula" },
      {
        t: "parrafo",
        texto:
          "Génesis tiene dos grandes partes. Los capítulos 1 al 11 cuentan los comienzos de toda la humanidad: la creación, la caída, el primer homicidio, el diluvio y la torre de Babel. Los capítulos 12 al 50 cuentan la historia de una familia: Abraham, Isaac, Jacob y José. Las secciones del libro se abren con una fórmula que en hebreo es toledot, y que la RV1960 traduce como generaciones, descendientes o historia de la familia (Génesis 6:9; 37:2).",
      },
      { t: "subtitulo", texto: "La creación y el ser humano" },
      { t: "versiculo", ref: "Génesis 1:27" },
      {
        t: "parrafo",
        texto:
          "Génesis enseña que hay un solo Dios, distinto de su creación, que crea por su palabra. Todo lo que hizo era «bueno en gran manera» (Génesis 1:31). El ser humano, varón y hembra, fue creado a imagen de Dios: de ahí viene la dignidad de toda persona, su capacidad de relacionarse con Dios y su tarea de cuidar y administrar la creación (Génesis 1:28; 2:15).",
      },
      { t: "versiculo", ref: "Génesis 1:31" },
      { t: "subtitulo", texto: "El pecado y la primera promesa" },
      { t: "versiculo", ref: "Génesis 3:15" },
      {
        t: "parrafo",
        texto:
          "La caída rompió la relación con Dios, con el prójimo y con la creación, y el pecado se extendió de generación en generación (Génesis 4 a 11). Pero la gracia aparece desde el principio: Dios buscó a Adán, vistió a la pareja (3:21) y anunció a la serpiente: «pondré enemistad entre ti y la mujer». Los creyentes han visto en esa promesa el primer anuncio del evangelio, que se cumple en Cristo, descendiente de la mujer, que vence al maligno.",
      },
      { t: "subtitulo", texto: "La promesa a Abraham" },
      { t: "versiculo", ref: "Génesis 12:1-3" },
      {
        t: "parrafo",
        texto:
          "Génesis 12 es la bisagra del libro. Dios promete a Abraham una descendencia, una tierra y una bendición que alcanzará a todos: «serán benditas en ti todas las familias de la tierra». Esas promesas avanzan por todo el Antiguo Testamento. Pablo dice que la Escritura «dio de antemano la buena nueva a Abraham» (Gálatas 3:8), porque en Cristo la bendición llega a todas las naciones.",
      },
      { t: "versiculo", ref: "Gálatas 3:8" },
      { t: "versiculo", ref: "Génesis 15:6" },
      {
        t: "parrafo",
        texto:
          "Abraham «creyó a Jehová, y le fue contado por justicia». Pablo usa ese versículo para enseñar que la justificación es por la fe (Romanos 4:3). Los patriarcas no eran perfectos: Abraham mintió sobre su esposa, Jacob engañó a su padre y los hermanos de José lo vendieron. Génesis muestra que la promesa avanza por la fidelidad de Dios, no por la de ellos.",
      },
      { t: "versiculo", ref: "Génesis 50:20" },
      {
        t: "parrafo",
        texto:
          "El libro termina con José, que perdonó a sus hermanos y les dijo: «Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien». Es una de las enseñanzas más claras de la providencia de Dios: él gobierna aun el mal que otros hacen para cumplir sus propósitos de salvación.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=MC8BqGu9B8A", titulo: "Resumen del libro de Génesis (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "Para enseñar Génesis",
        texto:
          "Génesis no responde todas las preguntas de la ciencia ni da todas las fechas: responde quién creó, por qué el mundo está roto y qué hizo Dios para restaurarlo. Enséñalo con esas preguntas en el centro.",
      },
    ],
    ideaClave:
      "Génesis es el libro de los comienzos: un solo Dios crea todo bueno, el ser humano es imagen de Dios, el pecado lo rompe todo y la gracia promete un descendiente que vencerá. La promesa a Abraham de descendencia, tierra y bendición para las naciones es el hilo de toda la Biblia y se cumple en Cristo.",
    paraLaVida: {
      texto: "Tu dignidad y la de cada persona vienen de haber sido creados a imagen de Dios.",
      pregunta: "¿En qué situación de tu vida necesitas creer, como José, que Dios puede encaminar a bien lo que otros pensaron para mal?",
    },
  },
  {
    id: "n3-pentateuco-historicos-2",
    objetivos: [
      "Describir las tres partes de Éxodo: la liberación, el pacto y el tabernáculo.",
      "Explicar el sentido de la Pascua, del pacto del Sinaí y del tabernáculo, y su cumplimiento en Cristo.",
      "Explicar el mensaje de Levítico: la santidad de Dios, los sacrificios y el Día de la Expiación.",
    ],
    paraEmpezar:
      "Génesis termina con la familia de Jacob en Egipto. Éxodo empieza siglos después, con sus descendientes esclavizados. Lo que sigue es la gran historia de la redención del Antiguo Testamento, a la que los profetas y los apóstoles volverán una y otra vez.",
    bloques: [
      { t: "subtitulo", texto: "Éxodo: liberación, pacto y tabernáculo" },
      {
        t: "lista",
        items: [
          "Capítulos 1 al 18: Dios llama a Moisés, envía las plagas, instituye la Pascua y libera a su pueblo por el mar.",
          "Capítulos 19 al 24: en el Sinaí, Dios hace pacto con Israel y le da los diez mandamientos.",
          "Capítulos 25 al 40: las instrucciones del tabernáculo, el pecado del becerro de oro y la gloria de Dios que llena el tabernáculo.",
        ],
      },
      { t: "versiculo", ref: "Éxodo 3:14" },
      {
        t: "parrafo",
        texto:
          "Cuando Moisés preguntó por su nombre, Dios respondió: «YO SOY EL QUE SOY». Es el Dios que existe por sí mismo, fiel a sus promesas, el que estuvo con Abraham y ahora viene a librar a su pueblo.",
      },
      { t: "versiculo", ref: "Éxodo 12:13" },
      {
        t: "parrafo",
        texto:
          "En la Pascua, la sangre del cordero en las puertas protegió a los primogénitos: «veré la sangre y pasaré de vosotros». El Nuevo Testamento ve allí a Cristo: «nuestra pascua, que es Cristo, ya fue sacrificada por nosotros» (1 Corintios 5:7). La liberación de Egipto es el modelo de la salvación: Dios libra de la esclavitud por medio de la sangre del cordero.",
      },
      { t: "versiculo", ref: "1 Corintios 5:7" },
      { t: "versiculo", ref: "Éxodo 19:5-6" },
      {
        t: "parrafo",
        texto:
          "En el Sinaí, Dios ofrece un pacto a un pueblo ya rescatado: los mandamientos no se dan para ganar la liberación, sino como respuesta a ella. Israel sería «un reino de sacerdotes, y gente santa», y Pedro aplica esas mismas palabras a la iglesia (1 Pedro 2:9).",
      },
      { t: "versiculo", ref: "Éxodo 25:8" },
      {
        t: "parrafo",
        texto:
          "Casi un tercio del libro trata del tabernáculo, porque su meta es que Dios viva con su pueblo: «harán un santuario para mí, y habitaré en medio de ellos». Juan dice que el Verbo «habitó entre nosotros» (Juan 1:14), con una palabra griega que recuerda el tabernáculo: en Jesús, Dios vino a vivir en medio de su pueblo.",
      },
      { t: "versiculo", ref: "Juan 1:14" },
      { t: "subtitulo", texto: "Levítico: un Dios santo en medio de su pueblo" },
      { t: "versiculo", ref: "Levítico 19:2" },
      {
        t: "parrafo",
        texto:
          "Levítico responde una pregunta: ¿cómo puede un pueblo pecador vivir cerca de un Dios santo? Su lema es: «Santos seréis, porque santo soy yo Jehová vuestro Dios». El libro trata de los sacrificios (capítulos 1 al 7), del sacerdocio (8 al 10), de lo limpio y lo inmundo (11 al 15), del Día de la Expiación (16) y de la santidad en la vida diaria (17 al 27), donde está también el mandamiento: «amarás a tu prójimo como a ti mismo» (19:18).",
      },
      { t: "versiculo", ref: "Levítico 19:18" },
      { t: "versiculo", ref: "Levítico 17:11" },
      {
        t: "parrafo",
        texto:
          "Los sacrificios enseñaban que el pecado trae muerte y que Dios provee un sustituto: «la misma sangre hará expiación de la persona». Una vez al año, en el Día de la Expiación, el sumo sacerdote entraba en el Lugar Santísimo con la sangre del sacrificio (Levítico 16). La carta a los Hebreos explica que Cristo entró una vez para siempre, no con sangre de animales, sino con su propia sangre (Hebreos 9:11-12).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=vKT8eo3hAMw", titulo: "Resumen del libro de Levítico", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Leer las leyes del culto hoy",
        texto:
          "Los sacrificios y las leyes del culto se cumplieron en Cristo y no se practican hoy (Hebreos 10:1-14). Pero siguen enseñando: muestran la santidad de Dios, la gravedad del pecado y el valor de la sangre de Cristo.",
      },
    ],
    ideaClave:
      "Éxodo cuenta la redención (la Pascua y la liberación), el pacto del Sinaí con un pueblo ya rescatado y el tabernáculo donde Dios habita en medio de los suyos. Levítico enseña la santidad de Dios y los sacrificios que permitían acercarse a él. Todo se cumple en Cristo, nuestra pascua y nuestro sumo sacerdote.",
    paraLaVida: {
      texto: "Dios no te pide obedecer para ser rescatado: te rescató para que vivas con él y le obedezcas.",
      pregunta: "¿Qué parte de tu vida diaria necesita reflejar mejor que perteneces a un Dios santo?",
    },
  },
  {
    id: "n3-pentateuco-historicos-3",
    objetivos: [
      "Describir el mensaje de Números: la incredulidad en el desierto y la fidelidad de Dios.",
      "Explicar el propósito de Deuteronomio como renovación del pacto con la nueva generación.",
      "Aplicar las lecciones del desierto y del Shema a la vida del creyente.",
    ],
    paraEmpezar:
      "Entre Egipto y la tierra prometida había apenas unas semanas de camino, pero Israel tardó cuarenta años. Números cuenta por qué, y Deuteronomio, lo que Moisés dijo a los que por fin iban a entrar.",
    bloques: [
      { t: "subtitulo", texto: "Números: el camino por el desierto" },
      {
        t: "parrafo",
        texto:
          "El libro debe su nombre a los dos censos del pueblo (Números 1 y 26). Entre uno y otro, la generación que salió de Egipto murió en el desierto. En Cades, diez de los doce espías dijeron que no podrían conquistar la tierra, y el pueblo les creyó a ellos y no a Dios (Números 13 y 14). Solo Josué y Caleb confiaron, y solo ellos de esa generación entraron.",
      },
      { t: "versiculo", ref: "Números 14:8-9" },
      { t: "versiculo", ref: "Juan 3:14-15" },
      {
        t: "parrafo",
        texto:
          "Aun en medio de la rebeldía, Dios proveyó salvación. Cuando el pueblo fue mordido por serpientes, Moisés levantó una serpiente de bronce y el que la miraba vivía (Números 21:8-9). Jesús usó esa imagen: «como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado».",
      },
      { t: "versiculo", ref: "1 Corintios 10:11" },
      {
        t: "parrafo",
        texto:
          "Pablo dice de aquella generación: «estas cosas les acontecieron como ejemplo, y están escritas para amonestarnos a nosotros». La incredulidad y la murmuración siguen siendo peligros para el pueblo de Dios.",
      },
      { t: "subtitulo", texto: "Deuteronomio: el pacto renovado" },
      {
        t: "parrafo",
        texto:
          "Deuteronomio significa segunda ley, pero no es una ley nueva: son los discursos de Moisés a la nueva generación en las llanuras de Moab, antes de entrar en la tierra. Moisés recuerda lo que Dios hizo, repite y explica la ley, y llama al pueblo a elegir la vida: amar a Dios y obedecerle (Deuteronomio 30:19). El libro termina con la muerte de Moisés, que vio la tierra desde el monte, pero no entró.",
      },
      { t: "versiculo", ref: "Deuteronomio 6:4-9" },
      {
        t: "parrafo",
        texto:
          "En el centro está el Shema, que en hebreo significa oye: «Oye, Israel: Jehová nuestro Dios, Jehová uno es». Pide amar a Dios con todo el ser y enseñar sus palabras a los hijos en la vida diaria. Jesús lo llamó el primero y grande mandamiento (Mateo 22:37-38). Es el versículo de memoria de esta materia.",
      },
      {
        t: "parrafo",
        texto:
          "Deuteronomio es uno de los libros que más cita el Nuevo Testamento. Cuando el diablo lo tentó en el desierto, Jesús respondió las tres veces con palabras de Deuteronomio (Mateo 4:4, 7 y 10; Deuteronomio 8:3; 6:16; 6:13). Además, Moisés anunció un profeta como él, a quien el pueblo debía oír (Deuteronomio 18:15), y Pedro enseñó que ese profeta es Jesús (Hechos 3:22).",
      },
      { t: "versiculo", ref: "Deuteronomio 18:15" },
      { t: "video", url: "https://www.youtube.com/watch?v=qfMplfJoYA0", titulo: "Resumen del libro de Deuteronomio", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Recordar para no olvidar",
        texto:
          "Una palabra que se repite en Deuteronomio es acordarse, y su contrario, olvidar. El pueblo que se olvida de lo que Dios hizo termina olvidándose de Dios. Recordar sus obras, en familia y en la iglesia, protege la fe.",
      },
    ],
    ideaClave:
      "Números muestra que la incredulidad dejó a una generación en el desierto, mientras Dios seguía siendo fiel y proveía salvación. Deuteronomio renueva el pacto con la nueva generación: recordar lo que Dios hizo, amarlo con todo el corazón (el Shema) y elegir la vida obedeciéndole.",
    paraLaVida: {
      texto: "Lo que Dios te dio a conocer, enséñalo en casa, en el camino, al acostarte y al levantarte.",
      pregunta: "¿Qué obra de Dios en tu vida necesitas recordar hoy para no caer en la incredulidad o la murmuración?",
    },
  },
  {
    id: "n3-pentateuco-historicos-4",
    objetivos: [
      "Explicar el mensaje de Josué: Dios cumple su promesa de la tierra y llama a servirle.",
      "Describir el ciclo de los jueces y lo que enseña sobre el pecado y la misericordia de Dios.",
      "Explicar cómo Rut muestra la fidelidad de Dios y prepara la llegada de David y de Cristo.",
    ],
    paraEmpezar:
      "Josué, Jueces y Rut ocurren en la misma tierra y en épocas cercanas, pero suenan muy distintos: uno es una historia de victoria, otro una espiral de caídas y el último, una historia sencilla de fidelidad en medio de la crisis.",
    bloques: [
      { t: "subtitulo", texto: "Josué: Dios cumple su promesa" },
      { t: "versiculo", ref: "Josué 1:8-9" },
      {
        t: "parrafo",
        texto:
          "Josué cuenta la entrada en la tierra prometida a Abraham. La victoria depende de Dios: los muros de Jericó cayeron sin máquinas de guerra, y la derrota de Hai vino por el pecado de Acán (Josué 6 y 7). El libro termina con dos declaraciones: «No faltó palabra de todas las buenas promesas que Jehová había hecho» (Josué 21:45), y la decisión de Josué: «yo y mi casa serviremos a Jehová» (Josué 24:15).",
      },
      { t: "versiculo", ref: "Josué 21:45" },
      { t: "versiculo", ref: "Josué 24:15" },
      {
        t: "parrafo",
        texto:
          "La conquista fue un juicio de Dios sobre pueblos que habían llenado la medida de su maldad: a Abraham se le dijo que su descendencia volvería, «porque aún no ha llegado a su colmo la maldad del amorreo» (Génesis 15:16). Fue un hecho único de aquella historia, no un modelo para la iglesia, cuyas armas no son carnales (2 Corintios 10:4). Y aun allí hubo gracia: Rahab, una mujer cananea, creyó y fue salvada (Hebreos 11:31).",
      },
      { t: "versiculo", ref: "Génesis 15:16" },
      { t: "subtitulo", texto: "Jueces: el ciclo del olvido" },
      {
        t: "parrafo",
        texto:
          "Después de Josué, una nueva generación se olvidó de Dios. El libro de Jueces repite un ciclo: el pueblo peca, Dios permite que lo opriman otros pueblos, el pueblo clama, Dios levanta un libertador (un juez) y hay paz por un tiempo; luego todo vuelve a empezar (Jueces 2:11-19). Los jueces, como Débora, Gedeón y Sansón, fueron instrumentos imperfectos de la misericordia de Dios.",
      },
      { t: "versiculo", ref: "Jueces 21:25" },
      {
        t: "parrafo",
        texto:
          "Con cada vuelta, el ciclo empeora, y el libro termina con un retrato duro del pueblo: «cada uno hacía lo que bien le parecía». Jueces muestra que Israel necesitaba un rey conforme al corazón de Dios, y en último término, al Rey verdadero.",
      },
      { t: "subtitulo", texto: "Rut: la fidelidad en tiempos oscuros" },
      { t: "versiculo", ref: "Rut 1:16" },
      {
        t: "parrafo",
        texto:
          "En los días de los jueces, una moabita viuda decidió quedarse con su suegra Noemí: «Tu pueblo será mi pueblo, y tu Dios mi Dios». Booz, pariente de la familia, la protegió y la redimió conforme a la ley, como pariente redentor (Rut 4:1-10). La palabra hebrea jésed, el amor fiel, atraviesa el libro; la RV1960 la traduce allí como benevolencia (Rut 2:20).",
      },
      { t: "versiculo", ref: "Rut 4:17" },
      { t: "versiculo", ref: "Mateo 1:5" },
      {
        t: "parrafo",
        texto:
          "El final sorprende: el hijo de Rut y Booz fue Obed, abuelo del rey David. Y Mateo, en la genealogía de Jesús, nombra a Rahab y a Rut, dos mujeres extranjeras (Mateo 1:5). Dios ya estaba mostrando que su bendición era para todas las naciones.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=f984fG4-xlE", titulo: "Resumen del libro de Rut", fuente: "Proyecto Biblia", minutos: 8 },
      {
        t: "nota",
        titulo: "Cada generación necesita conocer a Dios",
        texto:
          "Jueces comienza diciendo que se levantó otra generación que no conocía a Jehová (Jueces 2:10). La fe no se hereda sola: cada generación necesita ser enseñada y discipulada.",
      },
    ],
    ideaClave:
      "Josué muestra que Dios cumple sus promesas y llama a servirle; Jueces, que el pueblo que se olvida de Dios cae en un ciclo de pecado del que solo su misericordia lo saca; y Rut, que en tiempos oscuros Dios obra por medio de la fidelidad sencilla, preparando la llegada de David y de Cristo.",
    paraLaVida: {
      texto: "Como Josué, cada familia necesita decidir a quién va a servir.",
      pregunta: "¿Cómo estás ayudando a que la próxima generación de tu familia o tu iglesia conozca a Dios?",
    },
  },
  {
    id: "n3-pentateuco-historicos-5",
    objetivos: [
      "Describir el paso de los jueces al reino en Samuel, con Saúl y con David.",
      "Explicar el pacto de Dios con David y su cumplimiento en Jesucristo.",
      "Explicar por qué cayeron Israel y Judá según Reyes, y qué propósito tiene Crónicas.",
    ],
    paraEmpezar:
      "Israel pidió un rey como tenían las naciones. Dios se lo dio, y la historia del reino se convirtió en una gran lección: el pueblo de Dios necesita un rey, pero ningún rey humano es suficiente.",
    bloques: [
      { t: "subtitulo", texto: "Samuel: del último juez al primer rey" },
      { t: "versiculo", ref: "1 Samuel 8:7" },
      {
        t: "parrafo",
        texto:
          "Samuel fue el último de los jueces y un gran profeta. Cuando el pueblo pidió un rey, Dios le dijo: «no te han desechado a ti, sino a mí me han desechado, para que no reine sobre ellos». Saúl empezó bien, pero desobedeció, y Samuel le dijo: «el obedecer es mejor que los sacrificios» (1 Samuel 15:22).",
      },
      { t: "versiculo", ref: "1 Samuel 15:22" },
      { t: "versiculo", ref: "1 Samuel 16:7" },
      {
        t: "parrafo",
        texto:
          "Dios escogió a David, un joven pastor, porque «Jehová no mira lo que mira el hombre». David venció a Goliat confiando en Dios, esperó con paciencia a que Dios le diera el trono y llevó el arca a Jerusalén.",
      },
      { t: "subtitulo", texto: "El pacto con David" },
      { t: "versiculo", ref: "2 Samuel 7:12-13" },
      { t: "versiculo", ref: "2 Samuel 7:16" },
      {
        t: "parrafo",
        texto:
          "David quiso edificar una casa para Dios, y Dios le prometió edificarle a él una casa, una dinastía: «Y será afirmada tu casa y tu reino para siempre». Es el pacto con David. El ángel se lo anunció a María: el Señor daría a Jesús «el trono de David su padre», y su reino no tendría fin (Lucas 1:32-33).",
      },
      { t: "versiculo", ref: "Lucas 1:32-33" },
      { t: "versiculo", ref: "2 Samuel 12:7" },
      {
        t: "parrafo",
        texto:
          "La Biblia no oculta el pecado de David con Betsabé ni el asesinato de Urías. El profeta Natán lo confrontó: «Tú eres aquel hombre» (2 Samuel 12:7). David se arrepintió (Salmo 51), pero las consecuencias marcaron a su familia. Ni siquiera el mejor rey de Israel podía ser el rey definitivo.",
      },
      { t: "subtitulo", texto: "Reyes: la división y la caída" },
      {
        t: "parrafo",
        texto:
          "Salomón construyó el templo, pero al final de su vida su corazón se apartó de Dios. Hacia el año 930 a. C. el reino se dividió: Israel al norte y Judá al sur. Reyes evalúa a cada rey según su fidelidad: hizo lo recto, o hizo lo malo ante los ojos de Jehová. Dios envió profetas como Elías, que en el monte Carmelo preguntó al pueblo: «¿Hasta cuándo claudicaréis vosotros entre dos pensamientos?» (1 Reyes 18:21).",
      },
      { t: "versiculo", ref: "1 Reyes 18:21" },
      { t: "versiculo", ref: "2 Reyes 17:7" },
      {
        t: "parrafo",
        texto:
          "El reino del norte cayó ante Asiria en el 722 a. C., y el libro explica por qué: «los hijos de Israel pecaron contra Jehová su Dios». Judá tuvo reformas, como la de Josías, pero también cayó: Babilonia destruyó Jerusalén y el templo en el 586 a. C. (2 Reyes 25). Aun así, el libro termina con una luz: el rey Joaquín, descendiente de David, salió de la cárcel en Babilonia (2 Reyes 25:27-30). La promesa seguía viva.",
      },
      { t: "subtitulo", texto: "Crónicas: la historia contada otra vez" },
      { t: "versiculo", ref: "2 Crónicas 7:14" },
      {
        t: "parrafo",
        texto:
          "Crónicas se escribió después del exilio para los que habían vuelto. Empieza con genealogías desde Adán, se concentra en David, en el templo y en la adoración, y llama a buscar a Dios. Allí está una promesa conocida: «si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro». Se le dio a Salomón al dedicar el templo, para Israel y su tierra; su principio sigue vigente para el pueblo de Dios: la humildad, la oración y el arrepentimiento preceden a la restauración.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=BEvicPpjQBE", titulo: "Resumen del libro de 2 Samuel", fuente: "Proyecto Biblia", minutos: 7 },
      {
        t: "nota",
        titulo: "Para leer los reyes",
        texto:
          "Estos libros no son solo crónicas políticas: son historia contada desde el pacto. Pregunta siempre qué hizo cada rey con la Palabra de Dios y qué enseña eso sobre el liderazgo en el pueblo de Dios.",
      },
    ],
    ideaClave:
      "Samuel muestra el paso al reino: Saúl desobedece y Dios escoge a David, con quien hace el pacto de un trono eterno que se cumple en Jesucristo. Reyes explica la división y la caída de Israel y de Judá por su infidelidad, y Crónicas vuelve a contar la historia para llamar a los que regresaron a buscar a Dios.",
    paraLaVida: {
      texto: "Dios no mira lo que mira el hombre: mira el corazón.",
      pregunta: "¿Qué te enseña la vida de David sobre el arrepentimiento y sobre las consecuencias del pecado?",
    },
  },
  {
    id: "n3-pentateuco-historicos-6",
    objetivos: [
      "Describir el regreso del exilio y la reconstrucción del templo según Esdras.",
      "Explicar el liderazgo de Nehemías y la renovación del pueblo por la Palabra.",
      "Mostrar la providencia de Dios en Ester, un libro en el que Dios no es nombrado.",
    ],
    paraEmpezar:
      "Setenta años después de la caída de Jerusalén, el imperio que la había destruido ya no existía. Persia gobernaba el mundo, y un decreto de su rey abrió el camino de regreso, tal como Dios lo había anunciado.",
    bloques: [
      { t: "subtitulo", texto: "Esdras: el templo y la ley" },
      { t: "versiculo", ref: "Esdras 1:1" },
      {
        t: "parrafo",
        texto:
          "En el 538 a. C., Ciro, rey de Persia, permitió a los judíos volver y reconstruir el templo, «para que se cumpliese la palabra de Jehová por boca de Jeremías» (Jeremías 29:10). Bajo Zorobabel volvió un primer grupo. La obra se detuvo por la oposición, pero los profetas Hageo y Zacarías animaron al pueblo (Esdras 5:1), y el templo se terminó hacia el 516 a. C. (Esdras 6:15).",
      },
      { t: "versiculo", ref: "Esdras 7:10" },
      {
        t: "parrafo",
        texto:
          "Unos sesenta años después llegó Esdras, sacerdote y escriba, que «había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar». Con él, el pueblo volvió a ordenar su vida según la Palabra.",
      },
      { t: "subtitulo", texto: "Nehemías: orar y trabajar" },
      {
        t: "parrafo",
        texto:
          "Nehemías era copero del rey de Persia. Cuando supo que los muros de Jerusalén seguían en ruinas, lloró, ayunó y oró (Nehemías 1:4), y después pidió permiso al rey para ir a reconstruirlos. Frente a la burla y las amenazas, unió la oración con el trabajo:",
      },
      { t: "versiculo", ref: "Nehemías 4:9" },
      { t: "versiculo", ref: "Nehemías 6:15" },
      {
        t: "parrafo",
        texto:
          "El muro se terminó en cincuenta y dos días. Después, Esdras leyó la ley delante del pueblo y los levitas ponían el sentido para que la entendieran (Nehemías 8:8). El pueblo lloró al oírla, pero se les dijo: «el gozo de Jehová es vuestra fuerza» (Nehemías 8:10). La reconstrucción no fue solo de piedras: fue una renovación por la Palabra.",
      },
      { t: "versiculo", ref: "Nehemías 8:10" },
      { t: "subtitulo", texto: "Ester: la providencia escondida" },
      { t: "versiculo", ref: "Ester 4:14" },
      {
        t: "parrafo",
        texto:
          "Ester ocurre en la corte de Persia, en tiempos del rey Asuero, entre la terminación del templo y la llegada de Esdras. Amán planeó destruir a todos los judíos, y Mardoqueo le dijo a la reina Ester: «¿Y quién sabe si para esta hora has llegado al reino?». Ester arriesgó su vida, y el pueblo fue librado; de allí viene la fiesta de Purim (Ester 9:26-28).",
      },
      {
        t: "parrafo",
        texto:
          "En todo el libro de Ester no aparece ni una vez el nombre de Dios, y sin embargo su mano se ve en cada detalle: una reina en el lugar justo, una noche sin sueño del rey, un decreto que se vuelve en contra de quien lo pensó. Dios gobierna la historia aun cuando parece ausente.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Una historia que sigue abierta",
        texto:
          "Los libros históricos terminan con el pueblo de nuevo en su tierra, pero todavía bajo un imperio extranjero y esperando las promesas. Esa espera la llenan los profetas, y la cumple Jesús, el hijo de David y el descendiente de Abraham (Mateo 1:1).",
      },
    ],
    ideaClave:
      "Esdras cuenta el regreso y la reconstrucción del templo según la palabra de Jeremías, y la renovación por la ley; Nehemías, la reconstrucción de los muros con oración y trabajo y el gozo de Jehová como fuerza del pueblo; y Ester, la providencia de Dios que guarda a su pueblo aun cuando su nombre no se menciona.",
    paraLaVida: {
      texto: "Como Nehemías, une la oración con el trabajo; como Ester, pregúntate para qué te puso Dios donde estás.",
      pregunta: "¿Para qué tarea crees que Dios te ha puesto en el lugar donde vives, estudias o trabajas hoy?",
    },
  },
];
