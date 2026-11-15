/**
 * Especialidad Evangelismo y misiones · Materia 5 — Plantación de iglesias (avanzada; sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Por qué plantar, el plantador y su equipo, conocer el lugar, empezar en las casas, formar líderes y organizar, y una
 * iglesia que se multiplica. Quién puede ejercer cada cargo es un punto de la declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const EVANGELISMO_MISIONES_5: LeccionContenido[] = [
  {
    id: "evangelismo-misiones-5-1",
    objetivos: [
      "Explicar por qué plantar iglesias es parte de la misión.",
      "Reconocer que Cristo edifica su iglesia y que Dios da el crecimiento.",
      "Valorar a Jesucristo como el único fundamento de una iglesia nueva.",
    ],
    paraEmpezar:
      "En el Nuevo Testamento, el evangelio no solo producía creyentes sueltos: producía iglesias. Plantar una iglesia es formar una comunidad de discípulos en un lugar donde todavía no la hay.",
    bloques: [
      { t: "versiculo", ref: "Mateo 16:18" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella». La iglesia es obra de Cristo, y nada puede detenerla. Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "1 Corintios 3:6-7" },
      {
        t: "parrafo",
        texto:
          "Pablo explica de dónde viene el fruto: «Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios». El plantador siembra y cuida, pero el crecimiento viene de Dios.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 3:10-11" },
      {
        t: "parrafo",
        texto:
          "El fundamento no lo pone el plantador: «nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo». Una iglesia se planta sobre Cristo y su evangelio, y no sobre una persona.",
      },
      { t: "subtitulo", texto: "Por qué plantar iglesias" },
      {
        t: "lista",
        items: [
          "Porque así se extendió el evangelio en el Nuevo Testamento: en cada ciudad nacían iglesias.",
          "Porque una iglesia cercana puede alcanzar a personas que una iglesia lejana no alcanza.",
          "Porque los nuevos creyentes necesitan una familia donde crecer.",
          "Porque una iglesia nueva puede llegar a barrios y grupos que todavía no tienen una.",
        ],
      },
    ],
    ideaClave:
      "En el Nuevo Testamento, el evangelio producía iglesias: comunidades de discípulos en cada lugar. Cristo edifica su iglesia y nada la detiene; el plantador siembra y cuida, pero Dios da el crecimiento, y el único fundamento es Jesucristo. Plantar iglesias permite llegar a barrios y grupos que todavía no tienen una.",
    paraLaVida: {
      texto: "Cristo sigue edificando su iglesia, y te invita a sembrar con él.",
      pregunta: "¿Qué barrio o grupo de tu ciudad no tiene una iglesia cerca?",
    },
  },
  {
    id: "evangelismo-misiones-5-2",
    objetivos: [
      "Describir el llamado y el carácter del plantador.",
      "Explicar la importancia del equipo y de la iglesia que envía.",
      "Reconocer el valor del trabajo con un oficio, como el de Pablo en Corinto.",
    ],
    paraEmpezar: "Plantar una iglesia no es tarea de una sola persona brillante, sino de un llamado confirmado y de un equipo que trabaja junto.",
    bloques: [
      { t: "versiculo", ref: "Hechos 13:2-3" },
      {
        t: "parrafo",
        texto:
          "Bernabé y Saulo fueron apartados por el Espíritu Santo y enviados por su iglesia, que, «habiendo ayunado y orado, les impusieron las manos y los despidieron». El plantador va con un llamado y con el respaldo de una iglesia.",
      },
      { t: "subtitulo", texto: "El carácter primero" },
      {
        t: "parrafo",
        texto:
          "Antes que sus dones, importa la vida del plantador: su relación con Dios, su familia, su integridad y su perseverancia. Las cualidades que Pablo pide a los que guían la iglesia (1 Timoteo 3:1-7; Tito 1:5-9) valen también para el que la planta.",
      },
      { t: "subtitulo", texto: "Un equipo" },
      { t: "versiculo", ref: "Romanos 16:3-5" },
      {
        t: "parrafo",
        texto:
          "Pablo llamó a Priscila y a Aquila «mis colaboradores en Cristo Jesús», y saludó también «a la iglesia de su casa». La obra se hizo en equipo y en las casas.",
      },
      { t: "versiculo", ref: "Hechos 18:3-4" },
      {
        t: "parrafo",
        texto:
          "En Corinto, Pablo trabajó con ellos, porque «el oficio de ellos era hacer tiendas», y cada día de reposo discutía en la sinagoga. Muchos plantadores trabajan en un oficio mientras la iglesia crece.",
      },
      { t: "versiculo", ref: "Hechos 18:11" },
      {
        t: "parrafo",
        texto: "Pablo se quedó allí «un año y seis meses, enseñándoles la palabra de Dios». Plantar una iglesia pide paciencia.",
      },
      {
        t: "nota",
        titulo: "Sobre los cargos",
        texto:
          "Quién puede ejercer cada cargo de la iglesia es un punto de la declaración de fe del ministerio por confirmar. Aquí se estudian el carácter y la tarea del que planta.",
      },
    ],
    ideaClave:
      "El plantador va con un llamado confirmado y enviado por una iglesia, como Bernabé y Saulo. Primero importa su carácter: su vida con Dios, su familia, su integridad y su perseverancia. Trabaja en equipo, como Pablo con Priscila y Aquila; puede sostenerse con un oficio, como Pablo en Corinto; y tiene paciencia: allí enseñó un año y seis meses.",
    paraLaVida: {
      texto: "Nadie planta solo: Dios forma equipos.",
      pregunta: "¿Qué parte del carácter del plantador necesitas fortalecer antes de cualquier proyecto?",
    },
  },
  {
    id: "evangelismo-misiones-5-3",
    objetivos: [
      "Aplicar el ejemplo de Nehemías y de Pablo para conocer un lugar antes de plantar.",
      "Describir qué se observa en el estudio de una comunidad.",
      "Valorar la oración como parte de ese estudio.",
    ],
    paraEmpezar:
      "Antes de reconstruir el muro, Nehemías salió de noche a mirarlo. Antes de plantar una iglesia, hay que conocer el lugar y su gente.",
    bloques: [
      { t: "versiculo", ref: "Nehemías 2:12-13" },
      {
        t: "parrafo",
        texto:
          "Nehemías salió de noche con unos pocos hombres y cuenta: «observé los muros de Jerusalén que estaban derribados». Conoció la necesidad antes de presentar su plan.",
      },
      { t: "versiculo", ref: "Nehemías 2:17-18" },
      {
        t: "parrafo",
        texto: "Después invitó al pueblo: «venid, y edifiquemos el muro de Jerusalén», y ellos respondieron: «Levantémonos y edifiquemos».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras-Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Hechos 17:16-17" },
      {
        t: "parrafo",
        texto:
          "En Atenas, el espíritu de Pablo «se enardecía viendo la ciudad entregada a la idolatría», y él discutía «en la plaza cada día con los que concurrían». Observó la ciudad y fue adonde estaba la gente.",
      },
      { t: "subtitulo", texto: "El estudio de la comunidad" },
      {
        t: "lista",
        items: [
          "Quiénes viven allí: edades, familias, lenguas y trabajos.",
          "Qué necesidades tienen: soledad, pobreza, adicciones, falta de cuidado para los niños.",
          "Qué iglesias hay ya y a quiénes alcanzan.",
          "Dónde se reúne la gente: plazas, escuelas, mercados y canchas.",
          "Quiénes están abiertos a conversar y a abrir su casa.",
        ],
      },
      {
        t: "nota",
        titulo: "Orar mientras se camina",
        texto: "Muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar.",
      },
    ],
    ideaClave:
      "Antes de construir, Nehemías salió de noche a observar los muros, y después invitó a edificar. En Atenas, Pablo observó la ciudad y habló cada día en la plaza. Antes de plantar se conoce el lugar: quiénes viven allí, qué necesitan, qué iglesias hay, dónde se reúne la gente y quiénes están abiertos, y todo se acompaña de oración.",
    paraLaVida: {
      texto: "Conocer a la gente es la primera forma de amarla.",
      pregunta: "¿Qué sabes de verdad del barrio donde vives o donde se reúne tu iglesia?",
    },
  },
  {
    id: "evangelismo-misiones-5-4",
    objetivos: [
      "Describir cómo empezaron en las casas las iglesias del Nuevo Testamento.",
      "Aplicar el ejemplo de Lidia en Filipos.",
      "Planificar los primeros pasos de un grupo que puede llegar a ser iglesia.",
    ],
    paraEmpezar: "La mayoría de las iglesias del Nuevo Testamento no empezaron en un templo, sino en una casa.",
    bloques: [
      { t: "versiculo", ref: "Hechos 16:13-15" },
      {
        t: "parrafo",
        texto:
          "En Filipos, Pablo fue a orar «junto al río», y allí «el Señor abrió el corazón» de Lidia. Ella se bautizó con su familia y abrió su casa: «entrad en mi casa, y posad». Así empezó la iglesia de Filipos, que después se reunía en su casa (Hechos 16:40).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 2:46-47" },
      {
        t: "parrafo",
        texto:
          "En Jerusalén, los creyentes iban al templo y se reunían «partiendo el pan en las casas», y «el Señor añadía cada día a la iglesia los que habían de ser salvos».",
      },
      { t: "versiculo", ref: "Hechos 20:20" },
      {
        t: "parrafo",
        texto: "Pablo enseñaba «públicamente y por las casas». Las reuniones públicas y las casas se complementan.",
      },
      { t: "subtitulo", texto: "Los primeros pasos" },
      {
        t: "lista",
        items: [
          "Empezar con un grupo pequeño en una casa: la Biblia, la oración, una comida y la amistad.",
          "Evangelizar a las personas abiertas y a sus familias.",
          "Bautizar a los que creen y enseñarles a obedecer a Cristo.",
          "Multiplicar el grupo cuando crece, formando nuevos líderes.",
          "Pasar a reuniones públicas cuando haya un grupo de discípulos.",
        ],
      },
    ],
    ideaClave:
      "Las iglesias del Nuevo Testamento empezaron en las casas: en Filipos, la iglesia nació cuando Lidia creyó y abrió su casa, y en Jerusalén partían el pan en las casas mientras el Señor añadía a los salvos. Pablo enseñaba en público y por las casas. Los primeros pasos son un grupo pequeño, evangelizar a las personas abiertas y a sus familias, bautizar y enseñar, multiplicar los grupos y después reunirse en público.",
    paraLaVida: {
      texto: "Una casa abierta puede ser el principio de una iglesia.",
      pregunta: "¿Qué casa, la tuya o la de alguien que conoces, podría abrirse para un grupo de estudio?",
    },
  },
  {
    id: "evangelismo-misiones-5-5",
    objetivos: [
      "Explicar por qué Pablo dejaba líderes del lugar en cada iglesia.",
      "Aplicar Efesios 4:11-12 a la formación de los creyentes para el servicio.",
      "Proponer cómo organizar una iglesia nueva para que no dependa del plantador.",
    ],
    paraEmpezar: "Una iglesia nueva no puede depender para siempre del plantador. Desde el principio hay que formar a los que van a guiarla.",
    bloques: [
      { t: "versiculo", ref: "Tito 1:5" },
      {
        t: "parrafo",
        texto:
          "Pablo dejó a Tito en Creta «para que corrigieses lo deficiente, y establecieses ancianos en cada ciudad». Una iglesia madura tiene líderes del lugar.",
      },
      { t: "versiculo", ref: "Efesios 4:11-12" },
      {
        t: "parrafo",
        texto:
          "Cristo dio ministerios a la iglesia «a fin de perfeccionar a los santos para la obra del ministerio». El plantador no hace todo: prepara a cada creyente para servir.",
      },
      { t: "subtitulo", texto: "Organizar sin ahogar" },
      {
        t: "lista",
        items: [
          "Formar líderes del lugar desde el principio, como enseña 2 Timoteo 2:2.",
          "Reconocer los dones de cada uno y repartir el servicio.",
          "Dar a la iglesia un orden sencillo: reuniones, cuidado de los nuevos y cuentas claras.",
          "Buscar que la iglesia llegue a sostenerse, gobernarse y extenderse por sí misma.",
          "Mantener la relación con la iglesia que envió, con apoyo y rendición de cuentas.",
        ],
      },
      {
        t: "nota",
        titulo: "Sobre los cargos",
        texto:
          "Quién puede ejercer cada cargo es un punto de la declaración de fe del ministerio por confirmar. Aquí se estudia la tarea de formar líderes.",
      },
    ],
    ideaClave:
      "Pablo dejaba líderes del lugar en cada iglesia: dejó a Tito en Creta para establecer ancianos en cada ciudad. Cristo dio ministerios para preparar a los santos para la obra del ministerio, así que el plantador no lo hace todo. Una iglesia nueva forma líderes desde el principio, reparte el servicio, tiene un orden sencillo y camina hacia sostenerse, gobernarse y extenderse por sí misma.",
    paraLaVida: {
      texto: "El mejor plantador es el que un día ya no hace falta.",
      pregunta: "¿A quién estás preparando para que un día haga lo que tú haces?",
    },
  },
  {
    id: "evangelismo-misiones-5-6",
    objetivos: [
      "Describir cómo la iglesia de Tesalónica extendió la palabra.",
      "Explicar por qué una iglesia sana planta nuevas iglesias.",
      "Diseñar los pasos para que una iglesia nueva llegue a plantar otra.",
    ],
    paraEmpezar: "El fruto de una iglesia plantada no es solo que crezca, sino que un día plante otras.",
    bloques: [
      { t: "versiculo", ref: "1 Tesalonicenses 1:8" },
      {
        t: "parrafo",
        texto:
          "De la iglesia de Tesalónica, Pablo escribió: «partiendo de vosotros ha sido divulgada la palabra del Señor, no sólo en Macedonia y Acaya». Una iglesia joven se convirtió en una iglesia que extiende el evangelio.",
      },
      { t: "versiculo", ref: "Filipenses 1:5-6" },
      {
        t: "parrafo",
        texto:
          "Pablo daba gracias por la iglesia de Filipos «por vuestra comunión en el evangelio, desde el primer día hasta ahora», confiado en que «el que comenzó en vosotros la buena obra, la perfeccionará».",
      },
      { t: "versiculo", ref: "Hechos 19:9-10" },
      {
        t: "parrafo",
        texto:
          "Desde Éfeso, la palabra llegó a toda la región: «todos los que habitaban en Asia, judíos y griegos, oyeron la palabra del Señor Jesús».",
      },
      { t: "subtitulo", texto: "Plantar desde el principio" },
      {
        t: "lista",
        items: [
          "Enseñar desde el primer día que la iglesia existe para la misión.",
          "Orar por nuevos barrios, ciudades y pueblos.",
          "Formar a futuros plantadores dentro de la iglesia.",
          "Enviar un equipo con la bendición de la iglesia, como Antioquía.",
          "Seguir unida a la iglesia hija con apoyo y amistad, sin controlarla.",
        ],
      },
    ],
    ideaClave:
      "El fruto de una iglesia plantada es que plante otras. De Tesalónica salió la palabra del Señor a otras regiones, de Éfeso llegó a toda Asia, y Pablo daba gracias por la comunión de los filipenses en el evangelio. Una iglesia que se multiplica enseña desde el principio que existe para la misión, ora por nuevos lugares, forma plantadores, envía equipos y acompaña a sus iglesias hijas sin controlarlas.",
    paraLaVida: {
      texto: "Una iglesia sana no solo crece: da a luz otras iglesias.",
      pregunta: "¿Qué lugar cercano podría tener un día una iglesia hija de tu iglesia?",
    },
  },
];
