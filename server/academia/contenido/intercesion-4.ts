/**
 * Especialidad Intercesión y oración · Materia 4 — Guerra espiritual bíblica y equilibrada (sílabo en shared/academia.ts).
 * Materia avanzada: pide el Nivel 3.
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una batalla real sin miedo ni descuido, la victoria de Cristo, la armadura de Dios, someterse a Dios y resistir al
 * diablo, Jesús y los apóstoles ante los espíritus malos, y los errores que hay que evitar. No enseña técnicas de
 * liberación: quien sirva en esa área lo hace bajo la dirección de sus pastores.
 */
import type { LeccionContenido } from "../tipos";

export const INTERCESION_4: LeccionContenido[] = [
  {
    id: "intercesion-4-1",
    objetivos: [
      "Explicar que la Biblia enseña una batalla espiritual real.",
      "Reconocer que el enemigo no son las personas.",
      "Evitar los dos errores opuestos: negar al enemigo o vivir obsesionado con él.",
    ],
    paraEmpezar:
      "Hay creyentes que nunca piensan en el diablo y otros que no piensan en otra cosa. La Biblia nos llama a algo distinto: a estar despiertos y firmes, con los ojos puestos en Cristo.",
    bloques: [
      { t: "versiculo", ref: "Efesios 6:10-12" },
      {
        t: "parrafo",
        texto:
          "Pablo empieza por la fuerza correcta: «fortaleceos en el Señor, y en el poder de su fuerza». Y luego nombra la batalla: «Porque no tenemos lucha contra sangre y carne, sino contra principados, contra potestades». La batalla es real, pero el enemigo no son las personas: a las personas las amamos, aun cuando nos hacen daño.",
      },
      { t: "versiculo", ref: "1 Pedro 5:8-9" },
      {
        t: "parrafo",
        texto:
          "Pedro describe al enemigo sin exagerar ni minimizar: «vuestro adversario el diablo, como león rugiente, anda alrededor buscando a quien devorar». Y dice qué hacer: «Sed sobrios, y velad» y «resistid firmes en la fe». Sobriedad, no pánico.",
      },
      { t: "versiculo", ref: "Juan 10:10" },
      {
        t: "parrafo",
        texto:
          "Jesús muestra el contraste: «El ladrón no viene sino para hurtar y matar y destruir; yo he venido para que tengan vida, y para que la tengan en abundancia». El centro no es el ladrón: es la vida que Cristo da.",
      },
      { t: "subtitulo", texto: "No ignoramos sus maquinaciones" },
      { t: "versiculo", ref: "2 Corintios 2:10-11" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña algo práctico: perdonar es parte de la batalla, «para que Satanás no gane ventaja alguna sobre nosotros; pues no ignoramos sus maquinaciones». El rencor le abre puertas al enemigo; el perdón se las cierra.",
      },
      {
        t: "nota",
        titulo: "Dos errores opuestos",
        texto:
          "El escritor C. S. Lewis advirtió, en el prólogo de su libro Cartas del diablo a su sobrino, que hay dos errores opuestos sobre los demonios: no creer que existen, o interesarse en ellos de una manera excesiva y malsana. La Biblia nos libra de los dos.",
      },
      {
        t: "lista",
        items: [
          "La batalla espiritual es real.",
          "El enemigo no son las personas: no tenemos lucha contra sangre y carne.",
          "Se enfrenta con sobriedad y vigilancia, no con pánico.",
          "El perdón le cierra puertas al enemigo.",
          "El centro es Cristo, que vino a dar vida en abundancia.",
        ],
      },
    ],
    ideaClave:
      "La Biblia enseña una batalla espiritual real, pero el enemigo no son las personas: no tenemos lucha contra sangre y carne. El diablo anda como león rugiente, y se le resiste con sobriedad, vigilancia y fe, sin negarlo ni obsesionarse con él. El perdón le cierra puertas, y el centro es Cristo, que vino a dar vida en abundancia.",
    paraLaVida: {
      texto: "Estar alerta no es vivir con miedo: es vivir despierto.",
      pregunta: "¿Cuál de los dos errores, el descuido o la obsesión, es más fácil para ti?",
    },
  },
  {
    id: "intercesion-4-2",
    objetivos: [
      "Explicar la victoria de Cristo sobre los principados y las potestades en la cruz.",
      "Reconocer que Satanás es una criatura y no un dios igual a Dios.",
      "Valorar la seguridad del creyente que está en Cristo.",
    ],
    paraEmpezar:
      "El creyente no pelea para ganar la victoria: pelea desde la victoria que Cristo ya ganó. Esa es la diferencia entre el miedo y la firmeza.",
    bloques: [
      { t: "versiculo", ref: "Colosenses 1:16" },
      {
        t: "parrafo",
        texto:
          "Antes que nada, Satanás no es un dios igual a Dios. Todo fue creado por Cristo, también los poderes espirituales: «sean tronos, sean dominios, sean principados, sean potestades; todo fue creado por medio de él y para él». No hay dos fuerzas iguales en guerra: hay un Creador y criaturas.",
      },
      { t: "versiculo", ref: "Colosenses 2:15" },
      {
        t: "parrafo",
        texto:
          "En la cruz, Cristo los venció: «despojando a los principados y a las potestades, los exhibió públicamente, triunfando sobre ellos en la cruz». Lo que parecía la derrota de Jesús fue la derrota del enemigo.",
      },
      { t: "versiculo", ref: "Hebreos 2:14-15" },
      {
        t: "parrafo",
        texto:
          "Jesús se hizo hombre «para destruir por medio de la muerte al que tenía el imperio de la muerte, esto es, al diablo», y para librar a los que vivían «sujetos a servidumbre» por el temor de la muerte.",
      },
      { t: "versiculo", ref: "1 Juan 3:8" },
      {
        t: "parrafo",
        texto: "Juan lo resume así: «Para esto apareció el Hijo de Dios, para deshacer las obras del diablo».",
      },
      { t: "subtitulo", texto: "La seguridad del creyente" },
      { t: "versiculo", ref: "Colosenses 1:13" },
      {
        t: "parrafo",
        texto:
          "El que está en Cristo cambió de reino: Dios «nos ha librado de la potestad de las tinieblas, y trasladado al reino de su amado Hijo».",
      },
      { t: "versiculo", ref: "1 Juan 4:4" },
      {
        t: "parrafo",
        texto: "Por eso el creyente no vive con miedo: «mayor es el que está en vosotros, que el que está en el mundo».",
      },
      {
        t: "lista",
        items: [
          "Satanás es una criatura, no un dios igual a Dios.",
          "En la cruz, Cristo despojó a los principados y a las potestades.",
          "Jesús vino para deshacer las obras del diablo.",
          "El creyente fue librado de la potestad de las tinieblas.",
          "Mayor es el que está en nosotros.",
        ],
      },
    ],
    ideaClave:
      "Satanás es una criatura, no un dios igual a Dios. En la cruz, Cristo despojó a los principados y a las potestades y triunfó sobre ellos; vino para deshacer las obras del diablo y librarnos del temor de la muerte. El creyente fue trasladado al reino del Hijo y pelea desde la victoria: mayor es el que está en vosotros.",
    paraLaVida: {
      texto: "No peleamos para ganar: peleamos desde la victoria de Cristo.",
      pregunta: "¿Qué cambia en tu oración saber que la victoria ya fue ganada en la cruz?",
    },
  },
  {
    id: "intercesion-4-3",
    objetivos: [
      "Describir cada pieza de la armadura de Dios.",
      "Explicar que la armadura es una vida en Cristo y no una fórmula.",
      "Relacionar la armadura con la oración en todo tiempo.",
    ],
    paraEmpezar:
      "Pablo escribió desde la prisión, quizás mirando a los soldados romanos que lo custodiaban. Con esa imagen explica cómo se mantiene firme el creyente.",
    bloques: [
      { t: "versiculo", ref: "Efesios 6:13-18" },
      {
        t: "parrafo",
        texto:
          "La orden se repite: «estar firmes». La armadura sirve para resistir «en el día malo, y habiendo acabado todo, estar firmes». La meta no es el espectáculo, sino permanecer de pie.",
      },
      { t: "subtitulo", texto: "Las piezas de la armadura" },
      {
        t: "lista",
        items: [
          "El cinto de la verdad: vivir en la verdad y sin mentira.",
          "La coraza de justicia: una vida recta, cubierta por la justicia de Cristo.",
          "El calzado del evangelio de la paz: estar listos para anunciar a Cristo.",
          "El escudo de la fe: confiar en Dios, que apaga los dardos del maligno.",
          "El yelmo de la salvación: la seguridad de ser de Cristo, que guarda la mente.",
          "La espada del Espíritu: la palabra de Dios.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Con el escudo de la fe podemos «apagar todos los dardos de fuego del maligno»: las mentiras, las acusaciones y las tentaciones. Y la única arma para atacar es «la espada del Espíritu, que es la palabra de Dios».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "subtitulo", texto: "No es una fórmula" },
      {
        t: "parrafo",
        texto:
          "Muchos creyentes oran cada mañana pidiendo a Dios que los vista con su armadura, y eso puede ayudar a recordarla. Pero la armadura no es una fórmula de palabras: es una vida en Cristo, en la verdad, la justicia, el evangelio, la fe, la salvación y la Palabra.",
      },
      {
        t: "parrafo",
        texto:
          "Y todo termina en la oración: «orando en todo tiempo con toda oración y súplica en el Espíritu, y velando en ello con toda perseverancia y súplica por todos los santos». La guerra espiritual se pelea, sobre todo, de rodillas y por otros.",
      },
    ],
    ideaClave:
      "La armadura de Dios sirve para estar firmes: el cinto de la verdad, la coraza de justicia, el calzado del evangelio de la paz, el escudo de la fe, el yelmo de la salvación y la espada del Espíritu, que es la palabra de Dios. No es una fórmula, sino una vida en Cristo, y se completa con la oración en todo tiempo por todos los santos.",
    paraLaVida: {
      texto: "La armadura no se recita: se vive.",
      pregunta: "¿Qué pieza de la armadura necesitas fortalecer en tu vida esta semana?",
    },
  },
  {
    id: "intercesion-4-4",
    objetivos: [
      "Explicar el orden de Santiago 4:7: someterse a Dios y después resistir al diablo.",
      "Aplicar el ejemplo de Jesús, que resistió con la Escritura.",
      "Reconocer la batalla de la mente y la responsabilidad por el propio pecado.",
    ],
    paraEmpezar:
      "La guerra espiritual más común no se ve en una reunión de liberación: se pelea cada día en la mente, en las tentaciones y en las decisiones.",
    bloques: [
      { t: "versiculo", ref: "Santiago 4:7" },
      {
        t: "parrafo",
        texto:
          "El versículo de memoria de esta materia tiene un orden: «Someteos, pues, a Dios; resistid al diablo, y huirá de vosotros». Primero someterse a Dios, después resistir. No se puede resistir al diablo mientras se resiste a Dios.",
      },
      { t: "versiculo", ref: "Mateo 4:10-11" },
      {
        t: "parrafo",
        texto:
          "Jesús lo mostró en el desierto. Respondió cada tentación con la Escritura y terminó diciendo: «Vete, Satanás, porque escrito está: Al Señor tu Dios adorarás, y a él sólo servirás». Y el resultado fue el de Santiago: «El diablo entonces le dejó».",
      },
      { t: "versiculo", ref: "Efesios 4:26-27" },
      {
        t: "parrafo",
        texto:
          "Pablo advierte que el pecado sin resolver le da terreno al enemigo: «no se ponga el sol sobre vuestro enojo, ni deis lugar al diablo». Se resiste cerrando puertas: arreglando el enojo, confesando el pecado y apartándose de lo que hace caer.",
      },
      { t: "subtitulo", texto: "La batalla de la mente" },
      { t: "versiculo", ref: "2 Corintios 10:3-5" },
      {
        t: "parrafo",
        texto:
          "Las armas del creyente «no son carnales, sino poderosas en Dios para la destrucción de fortalezas». Y las fortalezas son ideas: se trata de ir «derribando argumentos» y «llevando cautivo todo pensamiento a la obediencia a Cristo». Se gana con la verdad de Dios en la mente.",
      },
      { t: "versiculo", ref: "Santiago 1:14" },
      {
        t: "parrafo",
        texto:
          "Y no todo se le puede echar al diablo: «cada uno es tentado, cuando de su propia concupiscencia es atraído y seducido». El creyente asume su responsabilidad, se arrepiente y busca ayuda.",
      },
      {
        t: "lista",
        items: [
          "Primero someterse a Dios; después resistir al diablo.",
          "Resistir con la Escritura, como Jesús.",
          "No dar lugar al diablo: arreglar el enojo y confesar el pecado.",
          "Llevar cautivo todo pensamiento a la obediencia a Cristo.",
          "No culpar al diablo del propio pecado.",
        ],
      },
    ],
    ideaClave:
      "Santiago 4:7 tiene un orden: someterse a Dios y después resistir al diablo, que huirá. Jesús resistió con la Escritura. Se resiste sin dar lugar al diablo, arreglando el enojo y confesando el pecado, y llevando cautivo todo pensamiento a la obediencia a Cristo, sin culpar al enemigo de lo que es nuestra responsabilidad.",
    paraLaVida: {
      texto: "La victoria de cada día empieza con rendirse a Dios.",
      pregunta: "¿Hay alguna puerta abierta, como un enojo o un pecado, que necesitas cerrar hoy?",
    },
  },
  {
    id: "intercesion-4-5",
    objetivos: [
      "Describir la autoridad de Jesús y de los apóstoles sobre los espíritus malos.",
      "Explicar por qué el nombre de Jesús no es una fórmula mágica.",
      "Reconocer las prácticas ocultas que el creyente rechaza.",
    ],
    paraEmpezar:
      "Los evangelios y Hechos muestran a Jesús y a los apóstoles frente a espíritus malos. Lo que hicieron, y lo que no hicieron, enseña mucho.",
    bloques: [
      { t: "versiculo", ref: "Marcos 1:23-27" },
      {
        t: "parrafo",
        texto:
          "Jesús no necesitó rituales: «Pero Jesús le reprendió, diciendo: ¡Cállate, y sal de él!». La gente se asombró de su autoridad: «con autoridad manda aun a los espíritus inmundos, y le obedecen».",
      },
      { t: "versiculo", ref: "Lucas 10:17-20" },
      {
        t: "parrafo",
        texto:
          "Los setenta volvieron felices: «Señor, aun los demonios se nos sujetan en tu nombre». Pero Jesús corrigió su gozo: «no os regocijéis de que los espíritus se os sujetan, sino regocijaos de que vuestros nombres están escritos en los cielos». El centro no es el poder, sino la salvación.",
      },
      { t: "versiculo", ref: "Hechos 16:16-18" },
      {
        t: "parrafo",
        texto:
          "En Filipos, Pablo enfrentó a una muchacha con espíritu de adivinación, que otros explotaban para ganar dinero. Y lo hizo sin espectáculo: «Te mando en el nombre de Jesucristo, que salgas de ella. Y salió en aquella misma hora».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "subtitulo", texto: "El nombre de Jesús no es una fórmula" },
      { t: "versiculo", ref: "Hechos 19:13-20" },
      {
        t: "parrafo",
        texto:
          "En Éfeso, unos exorcistas usaban el nombre de Jesús como un conjuro: «Os conjuro por Jesús, el que predica Pablo». El espíritu respondió: «A Jesús conozco, y sé quién es Pablo; pero vosotros, ¿quiénes sois?». El nombre de Jesús no funciona como magia: la autoridad es de los que le pertenecen.",
      },
      {
        t: "parrafo",
        texto:
          "Y el fruto fue el arrepentimiento: los que habían practicado la magia «trajeron los libros y los quemaron delante de todos». El verdadero avance fue este: «Así crecía y prevalecía poderosamente la palabra del Señor».",
      },
      { t: "versiculo", ref: "Deuteronomio 18:10-12" },
      {
        t: "parrafo",
        texto:
          "Dios prohíbe a su pueblo toda práctica oculta: que no haya «quien practique adivinación, ni agorero, ni sortílego, ni hechicero». Hoy eso incluye la brujería, la adivinación, las cartas, la ouija y consultar a los muertos. El creyente rompe con esas prácticas, como los de Éfeso.",
      },
      {
        t: "nota",
        titulo: "Con equilibrio y bajo los pastores",
        texto:
          "No todo problema es un demonio: hay enfermedades del cuerpo y de la mente, heridas del pasado y pecados que se tratan con el médico, la consejería, el arrepentimiento y el acompañamiento. Los evangélicos difieren sobre si un creyente puede estar bajo el dominio de un demonio, y esta materia no enseña técnicas de liberación: quien sirva en esa área lo hace bajo la dirección de sus pastores, sin espectáculo, con respeto, nunca a solas con un menor y siempre con el permiso de sus padres.",
      },
    ],
    ideaClave:
      "Jesús echó fuera espíritus con su sola palabra, y los apóstoles lo hicieron en su nombre, sin espectáculo. Pero el nombre de Jesús no es una fórmula mágica: la autoridad es de los que le pertenecen, y el gozo mayor es tener el nombre escrito en los cielos. El creyente rompe con toda práctica oculta, y no todo problema es un demonio.",
    paraLaVida: {
      texto: "El poder más grande no es que los espíritus se sujeten, sino que tu nombre esté escrito en el cielo.",
      pregunta: "¿Hay algo de lo oculto, en tu casa o en tu pasado, con lo que necesitas romper?",
    },
  },
  {
    id: "intercesion-4-6",
    objetivos: [
      "Identificar los errores más comunes en la guerra espiritual.",
      "Explicar el ejemplo del arcángel Miguel y de Daniel.",
      "Valorar una guerra espiritual centrada en Dios, humilde y sin miedo.",
    ],
    paraEmpezar:
      "Algunas prácticas que se presentan como guerra espiritual no vienen de la Biblia. El intercesor necesita discernimiento para no caer en ellas.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 1:7" },
      {
        t: "parrafo",
        texto:
          "El primer error es vivir con miedo, viendo demonios en todo. Pero «no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio». El poder va de la mano con el amor y el dominio propio.",
      },
      { t: "versiculo", ref: "Judas 1:9" },
      {
        t: "parrafo",
        texto:
          "El segundo es la arrogancia: hablarle al diablo con burla o con insultos. Aun el arcángel Miguel, cuando contendía con el diablo, «no se atrevió a proferir juicio de maldición contra él, sino que dijo: El Señor te reprenda». La autoridad es del Señor.",
      },
      { t: "versiculo", ref: "1 Juan 4:1" },
      {
        t: "parrafo",
        texto:
          "El tercero es creer en toda manifestación. Juan pide: «no creáis a todo espíritu, sino probad los espíritus si son de Dios». Lo que no concuerda con la Escritura no viene de Dios, por impresionante que parezca.",
      },
      { t: "versiculo", ref: "Daniel 10:12-13" },
      {
        t: "parrafo",
        texto:
          "El cuarto es inventar métodos que la Biblia no enseña. Daniel 10 muestra que hay conflicto en el mundo espiritual: «el príncipe del reino de Persia se me opuso durante veintiún días». Pero Daniel no le habló a ese príncipe ni trató de nombrarlo o de atarlo: oró a Dios con humildad, y sus palabras «fueron oídas» desde el primer día. Muchos maestros de la Biblia advierten que no hay base para dedicarse a identificar o a atar espíritus sobre ciudades; el modelo bíblico es orar a Dios.",
      },
      { t: "versiculo", ref: "Romanos 16:20" },
      {
        t: "parrafo",
        texto:
          "Y el creyente termina con confianza, no con miedo: «Y el Dios de paz aplastará en breve a Satanás bajo vuestros pies». La victoria es de Dios.",
      },
      {
        t: "lista",
        items: [
          "No vivir con miedo ni ver demonios en todo.",
          "No hablarle al diablo con arrogancia: el Señor te reprenda.",
          "Probar los espíritus con la Escritura.",
          "No inventar métodos que la Biblia no enseña: orar a Dios con humildad.",
          "No culpar al diablo del propio pecado.",
          "Confiar: el Dios de paz aplastará a Satanás.",
        ],
      },
    ],
    ideaClave:
      "Los errores de la guerra espiritual son vivir con miedo, hablarle al diablo con arrogancia, creer en toda manifestación e inventar métodos que la Biblia no enseña. Dios nos dio espíritu de poder, de amor y de dominio propio; Miguel dijo el Señor te reprenda; se prueban los espíritus; y Daniel oró a Dios con humildad. La victoria es del Dios de paz.",
    paraLaVida: {
      texto: "La guerra espiritual bíblica mira más a Dios que al diablo.",
      pregunta: "¿Qué práctica o idea sobre la guerra espiritual necesitas revisar a la luz de la Biblia?",
    },
  },
];
