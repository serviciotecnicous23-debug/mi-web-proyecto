/**
 * Especialidad Familia y consejería · Materia 4 — Adicciones y restauración (materia avanzada; sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: qué es una adicción (con lo que dice NIDA,
 * comprobado), la familia del que lucha, el camino de la restauración, las recaídas y la gracia, las adicciones a
 * conductas (pornografía, juego y pantallas) y la iglesia que restaura (con la línea de SAMHSA y la naloxona sin receta
 * desde 2023, comprobadas). No reemplaza la atención médica ni el tratamiento profesional.
 */
import type { LeccionContenido } from "../tipos";

export const FAMILIA_CONSEJERIA_4: LeccionContenido[] = [
  {
    id: "familia-consejeria-4-1",
    objetivos: [
      "Explicar qué es una adicción según la ciencia y según la Biblia.",
      "Reconocer las señales de una adicción.",
      "Dirigir la primera conversación con alguien que reconoce que tiene un problema.",
    ],
    paraEmpezar:
      "El alcohol, las drogas, el juego o la pornografía pueden empezar como algo pequeño y terminar dominando la vida de una persona y de su familia. Para ayudar, el consejero necesita entender qué es una adicción, sin minimizarla y sin perder la esperanza.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Proverbios 23:31-35" },
      {
        t: "parrafo",
        texto:
          "El sabio describió la adicción hace siglos. El vino «Se entra suavemente; Mas al fin como serpiente morderá». Y el que está atrapado dice: «Me hirieron, mas no me dolió; Me azotaron, mas no lo sentí; Cuando despertare, aún lo volveré a buscar». Así es la adicción: hace daño, y aun así se vuelve a buscar.",
      },
      { t: "versiculo", ref: "Romanos 7:15" },
      {
        t: "parrafo",
        texto:
          "Pablo describe la lucha del que quiere y no puede: «no hago lo que quiero, sino lo que aborrezco, eso hago». La persona con una adicción muchas veces sí quiere dejarla, pero no puede sola.",
      },
      { t: "versiculo", ref: "1 Corintios 6:12" },
      {
        t: "parrafo",
        texto:
          "Pablo pone un límite claro: «todas las cosas me son lícitas, mas yo no me dejaré dominar de ninguna». La adicción es justamente eso: algo que domina.",
      },
      { t: "versiculo", ref: "Juan 8:34-36" },
      {
        t: "parrafo",
        texto:
          "Jesús habló de una esclavitud más honda, la del pecado: «todo aquel que hace pecado, esclavo es del pecado». Pero también prometió: «si el Hijo os libertare, seréis verdaderamente libres».",
      },
      { t: "subtitulo", texto: "Lo que dice la ciencia" },
      {
        t: "parrafo",
        texto:
          "El Instituto Nacional sobre el Abuso de Drogas de los Estados Unidos (NIDA) describe la adicción como una enfermedad crónica del cerebro: la persona busca y consume la droga de manera compulsiva, aunque le haga daño. El cerebro cambia, y por eso dejarla es tan difícil y las recaídas son comunes.",
      },
      { t: "subtitulo", texto: "Comparación: lo que ve la ciencia y lo que ve la Biblia" },
      {
        t: "lista",
        items: [
          "La ciencia: el cerebro cambia y la persona pierde el control. La Biblia: algo que domina, como una esclavitud.",
          "La ciencia: necesita tratamiento, a veces médico. La Biblia: necesita libertad, y la libertad viene de Cristo.",
          "La ciencia: las recaídas son parte de la enfermedad. La Biblia: el justo cae siete veces, y vuelve a levantarse.",
          "Las dos juntas: la persona es responsable de buscar ayuda, y necesita a Dios, a su iglesia y, muchas veces, a los profesionales.",
        ],
      },
      { t: "subtitulo", texto: "Las señales de una adicción" },
      {
        t: "lista",
        items: [
          "Necesita cada vez más para sentir lo mismo.",
          "Se siente mal cuando no consume, y vuelve a consumir para que se le pase.",
          "Promete dejarlo y no puede.",
          "Miente, esconde o pide dinero prestado sin decir para qué.",
          "Deja de cumplir en el trabajo, en la escuela o en la casa.",
          "Sigue consumiendo aunque haya perdido la salud, la familia o el trabajo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la primera conversación" },
      {
        t: "parrafo",
        texto:
          "Roberto, de cuarenta años, le confiesa al consejero que bebe todas las noches, que su esposa ya no aguanta y que no puede parar.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecer su sinceridad: reconocer el problema es el primer paso, y requiere valor.",
          "Paso 2, escuchar sin escandalizarse ni dar un sermón: ¿desde cuándo?, ¿cuánto?, ¿qué ha perdido?",
          "Paso 3, preguntar por la seguridad: si maneja después de beber, si hay violencia en la casa o si ha pensado en hacerse daño.",
          "Paso 4, explicarle que, después de beber mucho tiempo, dejar el alcohol de golpe puede ser peligroso, y que necesita que lo vea un médico.",
          "Paso 5, ofrecerle el camino: el médico, la línea nacional de ayuda de SAMHSA (1-800-662-4357), un grupo de recuperación y la oración.",
          "Paso 6, un compromiso concreto: una cita con el médico esa misma semana, y volver a reunirse.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El consejero no es médico. Si la persona consume alcohol, drogas o pastillas todos los días, necesita una evaluación médica, porque dejarlos de golpe puede ser peligroso. Y si alguien está inconsciente o no respira bien después de consumir, llama al 911.",
      },
    ],
    ideaClave:
      "La adicción es algo que domina: hace daño y aun así se vuelve a buscar, como describe Proverbios, y la persona quiere dejarla y no puede sola, como dijo Pablo. NIDA la describe como una enfermedad crónica del cerebro, con recaídas comunes, y la Biblia como una esclavitud de la que Cristo libera. El consejero escucha sin escandalizarse, cuida la seguridad, deriva al médico y ofrece el camino de la libertad.",
    paraLaVida: {
      texto: "Cristo libera de verdad.",
      pregunta: "¿Quién de tu iglesia necesita oír hoy que hay salida?",
    },
  },
  {
    id: "familia-consejeria-4-2",
    objetivos: [
      "Explicar cómo afecta una adicción a toda la familia.",
      "Distinguir la ayuda que sana de la que permite que la adicción siga.",
      "Ayudar a una familia a poner límites con amor.",
    ],
    paraEmpezar:
      "Una adicción no la sufre solo el que consume. La esposa que cubre las mentiras, la madre que paga las deudas, los hijos que viven con miedo: toda la familia se enferma alrededor de la adicción, y también necesita ayuda.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=sm8-GQl9P6w", titulo: "Lucas 9 a 19: cómo seguir a Jesús", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Lucas 15:13-17" },
      {
        t: "parrafo",
        texto:
          "El hijo menor se fue y «desperdició sus bienes viviendo perdidamente». Cuando todo se acabó, «nadie le daba». Y fue ahí, en el fondo, donde «volviendo en sí», decidió regresar. El padre lo amaba, pero no fue al país lejano a pagarle la vida que llevaba.",
      },
      { t: "versiculo", ref: "Gálatas 6:5" },
      {
        t: "parrafo",
        texto:
          "Pablo pide sobrellevar las cargas de los otros, pero también dice: «porque cada uno llevará su propia carga». Amar no es cargar con las consecuencias que le tocan al otro.",
      },
      { t: "versiculo", ref: "Efesios 4:15" },
      {
        t: "parrafo",
        texto:
          "El camino es «siguiendo la verdad en amor»: decir la verdad sobre la adicción, sin dejar de amar.",
      },
      { t: "subtitulo", texto: "Comparación: la ayuda que sana y la que permite la adicción" },
      {
        t: "lista",
        items: [
          "Permite: pagar sus deudas una y otra vez. Sana: ayudarle a buscar tratamiento y dejar que enfrente sus deudas.",
          "Permite: mentir por él en el trabajo o en la familia. Sana: no cubrir sus mentiras.",
          "Permite: callar para no provocar una pelea. Sana: hablar con la verdad en un momento de calma.",
          "Permite: rescatarlo de cada consecuencia. Sana: dejar que las consecuencias lo hagan volver en sí.",
          "Permite: vivir solo para controlarlo. Sana: cuidar también la propia vida, la fe y a los hijos.",
        ],
      },
      { t: "subtitulo", texto: "Los límites con amor" },
      {
        t: "parrafo",
        texto:
          "Un límite no es un castigo ni una amenaza: es lo que yo voy a hacer para cuidar mi casa. No se puede controlar al otro, pero sí decidir lo que se permite en el hogar. Se dice con calma y se cumple.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan de una madre" },
      {
        t: "parrafo",
        texto:
          "Doña Carmen descubre que su hijo de veintidós años consume drogas. Le ha prestado dinero muchas veces, y él le ha robado. Está agotada y no sabe qué hacer.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escucharla y quitarle la culpa: la adicción de su hijo no es culpa suya.",
          "Paso 2, nombrar lo que permite la adicción: el dinero que le da y las mentiras que le cubre.",
          "Paso 3, decidir los límites: no más dinero en efectivo, no drogas en la casa, y la puerta abierta para buscar ayuda.",
          "Paso 4, decírselos con calma, en un buen momento y con otro familiar presente: te amo, y por eso no voy a seguir pagando lo que te está destruyendo.",
          "Paso 5, ofrecerle el camino: el número de un centro de tratamiento, la línea de SAMHSA y el acompañamiento de la iglesia.",
          "Paso 6, cuidarla a ella: un grupo de apoyo para familias, como Al-Anon o Nar-Anon, una hermana que ore con ella y su propia vida con Dios.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si en la casa hay violencia o la familia corre peligro, la seguridad va primero: el 911 y lo que se vio sobre la violencia en el hogar en Consejería matrimonial. Un límite nunca se pone con amenazas.",
      },
    ],
    ideaClave:
      "Una adicción enferma a toda la familia. El padre del hijo pródigo lo amaba, pero no le pagó la vida en el país lejano; cuando nadie le daba, el hijo volvió en sí. Cada uno lleva su propia carga, y amar no es rescatar de cada consecuencia. La familia pone límites con amor, dice la verdad, ofrece el camino de la ayuda y cuida también su propia vida.",
    paraLaVida: {
      texto: "Amar no es pagar lo que destruye.",
      pregunta: "¿Qué familia de tu iglesia necesita aprender a poner límites con amor?",
    },
  },
  {
    id: "familia-consejeria-4-3",
    objetivos: [
      "Describir los pasos del camino de la restauración.",
      "Explicar el lugar de la confesión, de la rendición de cuentas y de la comunidad.",
      "Armar un plan de rendición de cuentas con alguien que deja una adicción.",
    ],
    paraEmpezar:
      "Salir de una adicción no es un momento, sino un camino. Dios puede librar en un día, y muchas veces lo hace a lo largo de un proceso, con su gracia, con la iglesia y con la ayuda que haga falta.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "1 Juan 1:9" },
      {
        t: "parrafo",
        texto:
          "El camino empieza con la verdad delante de Dios: «Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad».",
      },
      { t: "versiculo", ref: "Santiago 5:16" },
      {
        t: "parrafo",
        texto:
          "Y sigue con la verdad delante de otros: «Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados». La adicción crece en el secreto y pierde fuerza en la luz.",
      },
      { t: "versiculo", ref: "Eclesiastés 4:9-10" },
      {
        t: "parrafo",
        texto:
          "Nadie sale solo: «si cayeren, el uno levantará a su compañero; pero ¡ay del solo! que cuando cayere, no habrá segundo que lo levante».",
      },
      { t: "versiculo", ref: "2 Corintios 5:17" },
      {
        t: "parrafo",
        texto:
          "La meta no es solo dejar algo, sino una vida nueva: «si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron».",
      },
      { t: "subtitulo", texto: "Los pasos del camino" },
      {
        t: "lista",
        items: [
          "Reconocer: admitir que hay un problema y que solo no puede.",
          "Volverse a Dios: confesar, recibir su perdón y pedir su fuerza.",
          "Buscar ayuda: el médico, un programa de tratamiento si hace falta y un grupo de recuperación.",
          "Rendir cuentas: una o dos personas de confianza que preguntan, oran y acompañan.",
          "Reparar: pedir perdón y reparar el daño hecho, cuando hacerlo no causa más daño.",
          "Crecer: la Palabra, la oración, la iglesia y servir a otros que luchan.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Muchas iglesias usan el programa Celebremos la recuperación, de John Baker, basado en ocho principios de las bienaventuranzas, y otras acompañan a los que van a grupos de doce pasos, como Alcohólicos Anónimos. Lo importante es que nadie camine solo.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un plan de rendición de cuentas" },
      {
        t: "parrafo",
        texto:
          "Andrés dejó el alcohol hace dos semanas, después de pasar por un programa médico. Pide ayuda para no volver a caer.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, elegir a dos hermanos maduros, del mismo sexo, que acepten acompañarlo durante un año.",
          "Paso 2, acordar las preguntas de cada semana: ¿bebiste?, ¿estuviste cerca de hacerlo?, ¿qué pasaba cuando sentiste ganas?",
          "Paso 3, una llamada cada semana y una reunión al mes, y permiso para llamar a cualquier hora si siente que va a caer.",
          "Paso 4, quitar las ocasiones: no tener alcohol en la casa, cambiar el camino del trabajo y dejar a los amigos de las borracheras.",
          "Paso 5, llenar el tiempo: un grupo de recuperación, el grupo de la iglesia y una tarea para servir.",
          "Paso 6, celebrar los logros: el primer mes, los tres meses y el primer año, dando gracias a Dios.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La rendición de cuentas no es vigilancia ni castigo: es una amistad que dice la verdad. Y lo que se cuenta allí se guarda en confianza, salvo cuando hay peligro para una vida.",
      },
    ],
    ideaClave:
      "El camino de la restauración empieza con la confesión delante de Dios, que es fiel para perdonar, y sigue con la verdad delante de otros, porque la adicción crece en el secreto. Nadie sale solo: mejores son dos que uno. Los pasos son reconocer, volverse a Dios, buscar ayuda, rendir cuentas, reparar y crecer, hacia una vida nueva en Cristo.",
    paraLaVida: {
      texto: "La adicción crece en el secreto y pierde fuerza en la luz.",
      pregunta: "¿Con quién puedes caminar como el compañero que levanta al que cae?",
    },
  },
  {
    id: "familia-consejeria-4-4",
    objetivos: [
      "Explicar qué es una recaída y por qué no es el final.",
      "Identificar las situaciones que llevan a una recaída.",
      "Armar un plan de prevención de recaídas.",
    ],
    paraEmpezar:
      "Muchos que dejan una adicción vuelven a caer alguna vez. La recaída duele y avergüenza, pero no es el final del camino. La pregunta no es solo cómo evitarla, sino qué hacer después.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2): la última cena, la cruz y la resurrección", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 24:16" },
      {
        t: "parrafo",
        texto:
          "La Biblia no habla de gente que nunca cae: «siete veces cae el justo, y vuelve a levantarse». Lo que distingue al justo no es que no caiga, sino que se levanta.",
      },
      { t: "versiculo", ref: "Miqueas 7:8" },
      {
        t: "parrafo",
        texto:
          "El profeta lo dice con fe: «aunque caí, me levantaré; aunque more en tinieblas, Jehová será mi luz».",
      },
      { t: "versiculo", ref: "Juan 21:15-17" },
      {
        t: "parrafo",
        texto:
          "Pedro negó a Jesús tres veces. Después de la resurrección, Jesús le preguntó tres veces: «Simón, hijo de Jonás, ¿me amas?», y lo volvió a enviar: «Apacienta mis ovejas». Jesús restaura al que cayó.",
      },
      { t: "subtitulo", texto: "Lo que dice la ciencia sobre las recaídas" },
      {
        t: "parrafo",
        texto:
          "Según NIDA, las recaídas en las adicciones son tan frecuentes como en otras enfermedades crónicas, como la diabetes, la presión alta o el asma. Una recaída no significa que el tratamiento fracasó: es una señal de que hay que retomarlo o ajustarlo.",
      },
      { t: "subtitulo", texto: "Comparación: un tropiezo y una recaída" },
      {
        t: "lista",
        items: [
          "Un tropiezo: un consumo que se reconoce enseguida, y se vuelve al plan. Una recaída: se vuelve al consumo de antes.",
          "Un tropiezo: se cuenta ese mismo día a la persona de confianza. Una recaída: se esconde, y el secreto la hace crecer.",
          "Los dos: se enfrentan con verdad, con gracia y volviendo a pedir ayuda.",
        ],
      },
      { t: "subtitulo", texto: "Las situaciones de riesgo" },
      {
        t: "lista",
        items: [
          "Las personas, los lugares y las fechas que se asocian con el consumo.",
          "El hambre, el enojo, la soledad y el cansancio: muchos grupos de recuperación los recuerdan juntos, porque abren la puerta a la recaída.",
          "Creer que ya está curado y que puede consumir un poco.",
          "Dejar las reuniones, la rendición de cuentas o la iglesia.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un plan de prevención de recaídas" },
      {
        t: "parrafo",
        texto:
          "Lucía lleva seis meses sin tomar las pastillas que la dominaban. Con su consejera arma un plan para los momentos difíciles.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, anotar sus situaciones de riesgo: las peleas con su mamá, las noches sola y el dolor de espalda.",
          "Paso 2, anotar las señales tempranas: dormir mal, aislarse y pensar que una pastilla no le hará daño.",
          "Paso 3, decidir qué hará en cada caso: llamar a su compañera de rendición de cuentas, salir a caminar, orar y leer un salmo.",
          "Paso 4, quitar lo que facilita la caída: entregar las pastillas que le sobran y hablar con su médico del dolor.",
          "Paso 5, decidir qué hará si cae: contarlo ese mismo día, volver a su grupo y a su médico, y no esconderse.",
          "Paso 6, revisar el plan cada mes y dar gracias por cada día.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Después de una recaída, no recibas a la persona con un sermón, sino como Jesús recibió a Pedro: con la verdad y con la gracia. Y si la recaída fue con opioides, recuerda que el riesgo de una sobredosis es mayor, porque el cuerpo ya no está acostumbrado.",
      },
    ],
    ideaClave:
      "El justo cae siete veces y vuelve a levantarse, y Jesús restauró a Pedro después de sus tres negaciones. Según NIDA, las recaídas son tan frecuentes como en otras enfermedades crónicas, y son una señal para retomar el tratamiento, no el final. Un plan de prevención anota las situaciones de riesgo y las señales tempranas, decide qué hacer en cada caso y qué hacer si cae: contarlo enseguida y volver a pedir ayuda.",
    paraLaVida: {
      texto: "El que cae puede volver a levantarse.",
      pregunta: "¿A quién que cayó puedes recibir hoy con la gracia de Jesús?",
    },
  },
  {
    id: "familia-consejeria-4-5",
    objetivos: [
      "Reconocer las adicciones a conductas: la pornografía, el juego y las pantallas.",
      "Explicar lo que enseña la Biblia sobre los ojos, el dinero y el tiempo.",
      "Armar un plan para salir de la pornografía.",
    ],
    paraEmpezar:
      "No todas las adicciones vienen en una botella. Hoy muchos, también en la iglesia, viven atrapados por la pornografía, las apuestas o el teléfono. Son luchas que se viven en secreto y con mucha vergüenza.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Job 31:1" },
      {
        t: "parrafo",
        texto:
          "Job decidió a tiempo: «Hice pacto con mis ojos». La batalla contra la pornografía empieza en lo que se decide mirar.",
      },
      { t: "versiculo", ref: "Mateo 5:28" },
      {
        t: "parrafo",
        texto:
          "Jesús llevó el mandamiento al corazón: «cualquiera que mira a una mujer para codiciarla, ya adulteró con ella en su corazón». La pornografía no es inofensiva: hiere el corazón, el matrimonio y a las personas que aparecen en ella.",
      },
      { t: "versiculo", ref: "1 Timoteo 6:9-10" },
      {
        t: "parrafo",
        texto:
          "Sobre el dinero fácil, Pablo advierte: «los que quieren enriquecerse caen en tentación y lazo», «porque raíz de todos los males es el amor al dinero». Las apuestas prometen riqueza y dejan deudas y familias rotas.",
      },
      { t: "versiculo", ref: "Efesios 5:15-16" },
      {
        t: "parrafo",
        texto:
          "Y sobre el tiempo: «Mirad, pues, con diligencia cómo andéis, no como necios sino como sabios, aprovechando bien el tiempo». Las pantallas pueden robar las horas de la familia, del descanso y de Dios.",
      },
      { t: "subtitulo", texto: "Lo que dicen los manuales de salud" },
      {
        t: "parrafo",
        texto:
          "El manual de diagnóstico de la Asociación Estadounidense de Psiquiatría reconoce el trastorno por juego de apuestas como una adicción, y la Organización Mundial de la Salud reconoce el trastorno por uso de videojuegos. No todo el que juega o usa el teléfono es adicto, pero hay señales de alarma.",
      },
      { t: "subtitulo", texto: "Las señales de alarma" },
      {
        t: "lista",
        items: [
          "No puede dejar de hacerlo, aunque lo ha intentado muchas veces.",
          "Lo esconde y miente sobre el tiempo o el dinero que gasta.",
          "Necesita cada vez más para sentir lo mismo.",
          "Deja de dormir, de trabajar, de estudiar o de estar con su familia.",
          "Se pone irritable cuando no puede hacerlo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un plan para salir de la pornografía" },
      {
        t: "parrafo",
        texto:
          "Daniel, de veinticinco años, le confiesa al consejero que mira pornografía casi todas las noches desde los catorce años, y que se siente sucio y sin fuerzas.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, recibirlo con gracia: confesar ya es un paso de valor, y Cristo perdona.",
          "Paso 2, hacer un pacto con los ojos, como Job: decidir delante de Dios lo que no va a mirar.",
          "Paso 3, cerrar las puertas: filtros en el teléfono y en la computadora, y el teléfono fuera del cuarto en la noche.",
          "Paso 4, un compañero de rendición de cuentas, del mismo sexo, que le pregunte cada semana.",
          "Paso 5, conocer sus momentos de riesgo, como la soledad, el aburrimiento o el estrés, y tener un plan para cada uno.",
          "Paso 6, sanar el corazón: la oración, la Palabra, amistades verdaderas y, si hay heridas profundas o abuso en su pasado, un consejero profesional.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si un adulto mira imágenes de abuso sexual de menores, eso no es solo un pecado ni una adicción: es un delito grave, porque detrás de cada imagen hay un niño abusado. Ahí no basta con la consejería: el pastor busca consejo legal y se avisa a las autoridades.",
      },
    ],
    ideaClave:
      "No todas las adicciones vienen en una botella: la pornografía, el juego y las pantallas también atrapan. Job hizo pacto con sus ojos, Jesús llevó el mandamiento al corazón, Pablo advirtió que el amor al dinero es raíz de todos los males y pide aprovechar bien el tiempo. El camino de salida une la gracia, un pacto con los ojos, puertas cerradas, rendición de cuentas, un plan para los momentos de riesgo y la sanidad del corazón.",
    paraLaVida: {
      texto: "Lo que se decide mirar decide el camino.",
      pregunta: "¿Qué puerta necesitas cerrar hoy en tu propia vida?",
    },
  },
  {
    id: "familia-consejeria-4-6",
    objetivos: [
      "Explicar cómo debe recibir la iglesia a los que luchan con una adicción.",
      "Describir los recursos que la iglesia puede tener listos, también ante una sobredosis.",
      "Organizar un ministerio de recuperación en la iglesia.",
    ],
    paraEmpezar:
      "Muchos que luchan con una adicción no se acercan a la iglesia porque esperan rechazo. Pero la iglesia está llena de personas que Dios rescató. Una iglesia que restaura es un lugar donde se puede decir la verdad y empezar de nuevo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=kMJLgLOWb3I", titulo: "Resumen del libro de Gálatas", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Gálatas 6:1" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «si alguno fuere sorprendido en alguna falta, vosotros que sois espirituales, restauradle con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado». Se restaura con mansedumbre y con humildad.",
      },
      { t: "versiculo", ref: "1 Corintios 6:9-11" },
      {
        t: "parrafo",
        texto:
          "En la lista de los que no heredarán el reino aparecen «los borrachos», pero Pablo añade: «Y esto erais algunos; mas ya habéis sido lavados, ya habéis sido santificados, ya habéis sido justificados en el nombre del Señor Jesús». En la iglesia de Corinto había personas que Cristo había librado de esos pecados.",
      },
      { t: "versiculo", ref: "Isaías 61:1" },
      {
        t: "parrafo",
        texto:
          "Jesús leyó en la sinagoga de Nazaret esta misión: «a vendar a los quebrantados de corazón, a publicar libertad a los cautivos». La iglesia sigue esa misión.",
      },
      { t: "versiculo", ref: "Lucas 15:22-24" },
      {
        t: "parrafo",
        texto:
          "Y cuando el hijo volvió, el padre no lo recibió con reproches, sino con una fiesta: «porque este mi hijo muerto era, y ha revivido; se había perdido, y es hallado».",
      },
      { t: "subtitulo", texto: "Comparación: la iglesia que rechaza y la iglesia que restaura" },
      {
        t: "lista",
        items: [
          "Rechaza: el que confiesa una adicción se vuelve un chisme. Restaura: lo que se confiesa se cuida en confianza.",
          "Rechaza: espera que la persona llegue ya limpia. Restaura: la recibe en el camino y la acompaña.",
          "Rechaza: solo predica contra el pecado. Restaura: predica la verdad y ofrece la gracia y un camino concreto.",
          "Rechaza: deja todo en manos del pastor. Restaura: forma un equipo y trabaja con los médicos y los programas de tratamiento.",
        ],
      },
      { t: "subtitulo", texto: "Los recursos que la iglesia puede tener listos" },
      {
        t: "lista",
        items: [
          "La línea nacional de ayuda de SAMHSA, 1-800-662-4357, que orienta gratis en inglés y en español.",
          "Una lista de médicos, centros de tratamiento y grupos de recuperación de la zona.",
          "La naloxona: desde 2023, la FDA permite vender sin receta el aerosol nasal Narcan, que puede revertir una sobredosis de opioides. Algunas iglesias lo tienen a mano y enseñan a usarlo.",
          "Un grupo de apoyo para las familias.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: empezar un ministerio de recuperación" },
      {
        t: "parrafo",
        texto:
          "La iglesia tiene varios hermanos que salieron de las drogas y del alcohol, y el pastor quiere abrir un ministerio de recuperación.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y formar un equipo: el pastor, algunos hermanos con años de recuperación y un consejero capacitado.",
          "Paso 2, elegir un programa probado, como Celebremos la recuperación, y prepararse antes de empezar.",
          "Paso 3, preparar el lugar y las reglas: una reunión cada semana, la confidencialidad y grupos de hombres y de mujeres.",
          "Paso 4, armar la lista de recursos y la red con los médicos y los centros de tratamiento.",
          "Paso 5, anunciarlo con sencillez y sin señalar a nadie, también en la comunidad.",
          "Paso 6, cuidar al equipo y evaluar cada seis meses cómo va.",
        ],
      },
      {
        t: "nota",
        titulo: "Ante una sobredosis",
        texto:
          "Si alguien no responde, no respira bien o tiene los labios morados después de consumir, llama al 911 enseguida; si hay naloxona, úsala siguiendo las instrucciones del envase, y quédate con la persona hasta que llegue la ayuda.",
      },
    ],
    ideaClave:
      "La iglesia restaura con mansedumbre y con humildad, como pide Gálatas 6:1; en Corinto había personas que Cristo lavó de las borracheras, y Jesús vino a publicar libertad a los cautivos. Una iglesia que restaura cuida la confianza, recibe a la persona en el camino, ofrece la gracia con un camino concreto y trabaja en red: la línea de SAMHSA, los médicos, los programas de recuperación y, ante una sobredosis, el 911 y la naloxona.",
    paraLaVida: {
      texto: "La iglesia está llena de personas que Dios rescató.",
      pregunta: "¿Qué puede hacer tu iglesia este año para ser un lugar donde se empieza de nuevo?",
    },
  },
];
