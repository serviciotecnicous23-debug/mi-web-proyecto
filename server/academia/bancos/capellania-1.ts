/**
 * El banco de «Fundamentos de la capellanía» (especialidad Capellanía, materia 1). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es la capellanía · o2 el ministerio de la presencia · o3 servir a personas de todas las creencias ·
 * o4 el llamado y la formación del capellán · o5 la visita paso a paso · o6 el capellán dentro de la institución ·
 * o7 el versículo de memoria (Mateo 25:36). Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de
 * memoria, al menos un 20 % de casos, y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `capellania-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_CAPELLANIA_1: BancoMateria = {
  materia: "capellania-1",
  repaso: {
    "capellania-1-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dijo Jesús del enfermo y del preso, según Mateo 25:36?", "Enfermo, y me visitasteis; en la cárcel, y vinisteis a mí", ["Enfermo, y os alejasteis; en la cárcel, y lo olvidasteis", "Que no había que visitarlos", "Que solo los sacerdotes debían visitarlos"], "«enfermo, y me visitasteis; en la cárcel, y vinisteis a mí».", "Mateo 25:35-36"],
      ["1-r2", 1, "o1", "comprender", "¿Qué diferencia hay entre el capellán y el pastor de una iglesia local?", "El capellán va a donde está la gente, en una institución que no es de la iglesia, y sirve a personas de muchas creencias", ["Ninguna", "El capellán solo predica los domingos", "El capellán no necesita a Dios"], "Como el pueblo en el exilio, el capellán sirve en un lugar ajeno: «procurad la paz de la ciudad a la cual os hice transportar».", "Jeremías 29:7"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano que empieza como capellán en un hospital quiere invitar a todos los pacientes a su iglesia. ¿Qué le aconsejas?", "Que vaya a servir y no a llenar su iglesia, y que hable de su fe cuando se lo pidan o lo permitan", ["Que los invite a todos", "Que reparta folletos en cada cuarto", "Que deje de ir"], "El capellán sirve a Cristo en cada persona: «en cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis».", "Mateo 25:40"],
    ] as P[]).map(p),
    "capellania-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hizo Jesús con los dos discípulos que iban tristes, según Lucas 24:15?", "Se acercó y caminaba con ellos", ["Los regañó", "Los dejó solos", "Les predicó desde lejos"], "«Jesús mismo se acercó, y caminaba con ellos».", "Lucas 24:15"],
      ["2-r2", 2, "o2", "comprender", "¿Qué es el ministerio de la presencia?", "Estar con la persona, escucharla y llevar la presencia de Dios, aunque no se pueda cambiar su situación", ["Predicar un sermón en cada visita", "Resolver todos sus problemas", "Visitar solo a los que creen"], "Dios no nos ayudó desde lejos: «Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
      ["2-r3", 2, "o2", "aplicar", "Un paciente que acaba de recibir una mala noticia no quiere hablar. ¿Qué haces?", "Le preguntas si puedes quedarte un momento y, si acepta, lo acompañas en silencio sin apurarlo", ["Le das un sermón", "Le dices que no debe estar triste", "Te vas sin decir nada"], "El capellán no está solo con él: «he aquí yo estoy con vosotros todos los días, hasta el fin del mundo».", "Mateo 28:20"],
    ] as P[]).map(p),
    "capellania-1-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Cómo pide Pedro presentar defensa de la esperanza, según 1 Pedro 3:15?", "Con mansedumbre y reverencia", ["Con gritos", "Con presión", "Con burlas"], "«y estad siempre preparados para presentar defensa con mansedumbre y reverencia».", "1 Pedro 3:15-16"],
      ["3-r2", 3, "o3", "comprender", "¿Qué diferencia hay entre el testimonio respetuoso y la presión?", "El respetuoso escucha y habla cuando se lo permiten; la presión aprovecha el miedo o el dolor para arrancar una decisión", ["Son lo mismo", "La presión es más eficaz, y por eso es mejor", "El respetuoso nunca habla de Cristo"], "«Sea vuestra palabra siempre con gracia, sazonada con sal».", "Colosenses 4:5-6"],
      ["3-r3", 3, "o3", "aplicar", "Un paciente judío te pide que llames a su rabino. ¿Qué haces?", "Lo llamas, o avisas al departamento de capellanía para que lo contacten", ["Le dices que tú eres suficiente", "Le predicas para que deje su fe", "No haces nada"], "«Andad sabiamente para con los de afuera».", "Colosenses 4:5-6"],
    ] as P[]).map(p),
    "capellania-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué dijo el Espíritu Santo a la iglesia de Antioquía, según Hechos 13:2?", "Apartadme a Bernabé y a Saulo para la obra a que los he llamado", ["Quedaos en Jerusalén", "No enviéis a nadie", "Escoged a un rey"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:2-3"],
      ["4-r2", 4, "o4", "comprender", "¿Qué es el aval de la iglesia para un capellán?", "Una carta que confirma que es un ministro en buen orden y que su iglesia lo envía", ["Un título universitario", "Un permiso para portar armas", "Una tarjeta de crédito"], "La iglesia confirma y envía: «les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
      ["4-r3", 4, "o4", "aplicar", "Una hermana quiere servir como capellana voluntaria en un hospital. ¿Cuál es el primer paso?", "Orar y confirmar el llamado con su pastor y con los líderes de la iglesia", ["Ir sola a visitar los cuartos", "Pedir un sueldo", "Decir que es capellana certificada"], "El llamado se prepara con diligencia: «Procura con diligencia presentarte a Dios aprobado».", "2 Timoteo 2:15"],
    ] as P[]).map(p),
    "capellania-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué pide Santiago 1:19?", "Ser pronto para oír, tardo para hablar y tardo para airarse", ["Ser pronto para hablar", "Hablar más que escuchar", "Enojarse rápido"], "«todo hombre sea pronto para oír, tardo para hablar, tardo para airarse».", "Santiago 1:19"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué el capellán pregunta por las necesidades espirituales de la persona antes de ofrecer algo?", "Para ofrecer lo que la persona necesita y quiere, y no lo que él supone", ["Para llenar un formulario", "Para juzgar su fe", "No hace falta preguntar"], "«todo hombre sea pronto para oír, tardo para hablar».", "Santiago 1:19"],
      ["5-r3", 5, "o5", "aplicar", "Un médico está atendiendo al paciente que vas a visitar. ¿Qué haces?", "Vuelves más tarde", ["Entras y oras en voz alta", "Esperas dentro del cuarto", "Te vas para siempre"], "«Andad sabiamente para con los de afuera, redimiendo el tiempo».", "Colosenses 4:5-6"],
    ] as P[]).map(p),
    "capellania-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Por qué no hallaron falta en Daniel, según Daniel 6:4?", "Porque él era fiel", ["Porque era rico", "Porque se escondía", "Porque nadie lo conocía"], "«mas no podían hallar ocasión alguna o falta, porque él era fiel, y ningún vicio ni falta fue hallado en él».", "Daniel 6:3-4"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué el capellán cuida también al personal de la institución?", "Porque las enfermeras, los guardias y los médicos también sufren y necesitan apoyo", ["Para que lo dejen entrar", "No debe cuidarlo", "Para vigilarlos"], "«mostrando toda mansedumbre para con todos los hombres».", "Tito 3:1-2"],
      ["6-r3", 6, "o6", "aplicar", "Un preso te pide que le lleves un paquete a escondidas. ¿Qué haces?", "Le explicas con amabilidad que sigues las normas, y le ofreces el camino permitido", ["Se lo llevas", "Lo denuncias sin hablar con él", "Dejas de visitarlo"], "Como Daniel, el capellán es fiel en su lugar: «porque él era fiel, y ningún vicio ni falta fue hallado en él».", "Daniel 6:3-4"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Qué es la capellanía
    ["f01", 1, "o1", "recordar", "Completa Mateo 25:35: Porque tuve hambre, y me disteis de comer…", "tuve sed, y me disteis de beber", ["tuve frío, y me disteis casa", "tuve miedo, y me dejasteis", "tuve sueño, y me despertasteis"], "«Porque tuve hambre, y me disteis de comer; tuve sed, y me disteis de beber».", "Mateo 25:35-36"],
    ["f02", 1, "o1", "recordar", "¿Qué le pidió Dios a su pueblo en el exilio, según Jeremías 29:7?", "Que procurara la paz de la ciudad y rogara por ella", ["Que huyera de la ciudad", "Que odiara a sus vecinos", "Que se encerrara"], "«Y procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová».", "Jeremías 29:7"],
    ["f03", 1, "o1", "comprender", "¿Por qué se dice que la capellanía nace de Mateo 25?", "Porque Jesús dijo que en el enfermo y en el preso lo visitamos a él", ["Porque Mateo era capellán", "Porque allí se habla de los hospitales modernos", "No nace de Mateo 25"], "«en cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis».", "Mateo 25:40"],
    ["f04", 1, "o1", "comprender", "¿Dónde sirve un capellán?", "En hospitales, cárceles, emergencias, fuerzas armadas, escuelas y empresas, entre otros lugares", ["Solo en el templo", "Solo en su casa", "Solo en la televisión"], "Donde esté la gente, buscando su bien: «procurad la paz de la ciudad».", "Jeremías 29:7"],
    ["f05", 1, "o1", "comprender", "¿Por qué el capellán sigue también las normas de la institución?", "Porque sirve como invitado en un lugar que no es de la iglesia", ["Porque no tiene fe", "Porque la institución manda en su fe", "No las sigue"], "«Y procurad la paz de la ciudad a la cual os hice transportar».", "Jeremías 29:7"],
    ["f06", 1, "o1", "analizar", "¿Qué tienen en común el capellán y el pastor de una iglesia?", "Los dos son enviados por Dios y por su iglesia, y sirven con la Palabra, la oración y el amor", ["Que cuidan a la misma congregación", "Que solo trabajan los domingos", "Nada"], "Los dos sirven a Cristo en las personas: «a mí lo hicisteis».", "Mateo 25:40"],
    ["f07", 1, "o1", "aplicar", "En tu día como capellán voluntario, una familia recibe una mala noticia en la sala de espera. ¿Qué haces?", "Te acercas con respeto y la acompañas, escuchando y ofreciendo una oración si la quiere", ["Sigues con tu lista", "Le predicas", "Llamas a tu iglesia para contarlo"], "«enfermo, y me visitasteis».", "Mateo 25:35-36"],
    ["f08", 1, "o1", "aplicar", "Una enfermera agotada después de un turno difícil se sienta a tu lado. ¿Qué haces?", "Le preguntas cómo está y la escuchas, porque el personal también necesita apoyo", ["Le pides que te deje solo", "Le hablas de tu iglesia", "Le dices que siga trabajando"], "El capellán busca el bien de todo el lugar: «porque en su paz tendréis vosotros paz».", "Jeremías 29:7"],
    ["f09", 1, "o1", "aplicar", "Un paciente católico te pide que avisen a su sacerdote. ¿Qué haces?", "Avisas al departamento de capellanía o a su parroquia, para que lo visite", ["Le dices que no hace falta", "Tratas de convencerlo de cambiar de iglesia", "No haces nada"], "«Andad sabiamente para con los de afuera».", "Colosenses 4:5-6"],
    ["f10", 1, "o7", "recordar", "Completa Mateo 25:36: estuve desnudo, y me cubristeis; enfermo, y me visitasteis…", "en la cárcel, y vinisteis a mí", ["en el templo, y me alabasteis", "en el camino, y me seguisteis", "en la casa, y me hospedasteis"], "«estuve desnudo, y me cubristeis; enfermo, y me visitasteis; en la cárcel, y vinisteis a mí».", "Mateo 25:36"],
    // Lección 2 · El ministerio de la presencia
    ["f11", 2, "o2", "recordar", "¿Qué dice Juan 1:14 del Verbo?", "Que fue hecho carne y habitó entre nosotros", ["Que se quedó lejos", "Que solo habló desde el cielo", "Que nunca vino"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
    ["f12", 2, "o2", "recordar", "¿Qué prometió Jesús en Mateo 28:20?", "Estar con nosotros todos los días, hasta el fin del mundo", ["Volver solo una vez al año", "Dejarnos solos", "Estar con los que no sufren"], "«y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo».", "Mateo 28:20"],
    ["f13", 2, "o2", "recordar", "¿Qué hacían los dos discípulos cuando Jesús se acercó, según Lucas 24:15?", "Hablaban y discutían entre sí", ["Dormían", "Comían", "Oraban en el templo"], "«Sucedió que mientras hablaban y discutían entre sí, Jesús mismo se acercó, y caminaba con ellos».", "Lucas 24:15"],
    ["f14", 2, "o2", "comprender", "¿Por qué el ministerio de la presencia se basa en la encarnación de Cristo?", "Porque Dios no nos ayudó desde lejos: vino a vivir con nosotros", ["Porque Jesús era capellán", "Porque la presencia no importa", "No se basa en la encarnación"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
    ["f15", 2, "o2", "comprender", "¿Qué es una pregunta abierta?", "Una pregunta que invita a contar, como ¿cómo está viviendo esto?", ["Una pregunta que se contesta con sí o con no", "Una pregunta para juzgar", "Una pregunta sobre el dinero"], "Ayuda a escuchar más que a hablar: «todo hombre sea pronto para oír, tardo para hablar».", "Santiago 1:19"],
    ["f16", 2, "o2", "analizar", "¿Qué diferencia al capellán que está presente del que está de paso?", "El presente da su tiempo completo, deja hablar a la persona y acepta que hay preguntas sin respuesta", ["El presente habla más", "El de paso escucha más", "No hay diferencia"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
    ["f17", 2, "o2", "aplicar", "Un paciente con cáncer se enoja con Dios mientras hablas con él. ¿Qué haces?", "Escuchas su enojo sin corregirlo, y le ofreces orar si él quiere", ["Lo corriges enseguida", "Te vas", "Le dices que su enojo es pecado y que se arrepienta"], "Cristo también está con él en su enojo: «he aquí yo estoy con vosotros todos los días».", "Mateo 28:20"],
    ["f18", 2, "o2", "aplicar", "Una paciente te dice que no quiere la visita del capellán. ¿Qué haces?", "Respetas su decisión con amabilidad y te despides", ["Insistes", "Oras en voz alta igual", "Te quejas con la enfermera"], "«Sea vuestra palabra siempre con gracia».", "Colosenses 4:5-6"],
    ["f19", 2, "o2", "aplicar", "Un hombre muy solo habla mucho de su vida cuando lo visitas. ¿Qué haces?", "Lo escuchas con paciencia y repites con otras palabras lo que dice, para que se sienta comprendido", ["Le cuentas tu vida", "Miras el reloj", "Cambias de tema"], "«todo hombre sea pronto para oír, tardo para hablar».", "Santiago 1:19"],
    ["f20", 2, "o2", "evaluar", "¿Qué visita muestra mejor el ministerio de la presencia?", "La que da su tiempo completo, escucha, deja silencios, respeta las emociones y ofrece la oración sin imponerla", ["La que da un sermón largo", "La que resuelve todo con un consejo", "La que dura un minuto"], "«Jesús mismo se acercó, y caminaba con ellos».", "Lucas 24:15"],
    // Lección 3 · Servir a personas de todas las creencias
    ["f21", 3, "o3", "recordar", "¿Qué dijo Pablo a los atenienses al empezar su discurso, según Hechos 17:22?", "En todo observo que sois muy religiosos", ["Sois todos unos pecadores", "No tenéis nada bueno", "Me voy de aquí"], "«Varones atenienses, en todo observo que sois muy religiosos».", "Hechos 17:22-23"],
    ["f22", 3, "o3", "recordar", "¿Cómo debe ser nuestra palabra, según Colosenses 4:6?", "Siempre con gracia, sazonada con sal", ["Dura y sin gracia", "Siempre en silencio", "Llena de quejas"], "«Sea vuestra palabra siempre con gracia, sazonada con sal».", "Colosenses 4:5-6"],
    ["f23", 3, "o3", "recordar", "¿Qué inscripción encontró Pablo en un altar de Atenas, según Hechos 17:23?", "Al Dios no conocido", ["Al dios del mar", "Al rey de Atenas", "A los héroes"], "«hallé también un altar en el cual estaba esta inscripción: AL DIOS NO CONOCIDO».", "Hechos 17:22-23"],
    ["f24", 3, "o3", "comprender", "¿Por qué el capellán sirve a personas de todas las creencias?", "Porque sirve a todos con el amor de Cristo, en una institución donde hay personas de muchas creencias", ["Porque no tiene una fe propia", "Porque cree que todas las religiones son iguales", "No sirve a todos"], "«en cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis».", "Mateo 25:40"],
    ["f25", 3, "o3", "comprender", "¿Qué puede hacer el capellán por una persona de otra fe?", "Preguntarle qué necesita, avisar a su líder religioso si lo pide y acompañarla con respeto", ["Obligarla a orar como él", "Ignorarla", "Fingir que cree lo mismo"], "«Andad sabiamente para con los de afuera».", "Colosenses 4:5-6"],
    ["f26", 3, "o3", "analizar", "¿Por qué está mal aprovechar el miedo o el dolor de una persona para arrancarle una decisión de fe?", "Porque se aprovecha de su debilidad y no respeta su libertad, y la fe verdadera nace de la convicción", ["Porque la fe no importa", "No está mal", "Porque es lento"], "El testimonio se da «con mansedumbre y reverencia».", "1 Pedro 3:15-16"],
    ["f27", 3, "o3", "aplicar", "Un paciente te pregunta por qué tienes esperanza en medio del dolor. ¿Qué haces?", "Le cuentas con sencillez y mansedumbre la esperanza que tienes en Cristo", ["Le dices que no puedes hablar de eso", "Le das un sermón largo", "Cambias de tema"], "«ante todo el que os demande razón de la esperanza que hay en vosotros».", "1 Pedro 3:15-16"],
    ["f28", 3, "o3", "aplicar", "Una paciente que no cree en Dios te pide que solo la acompañes un rato. ¿Qué haces?", "La acompañas con respeto, escuchándola, sin presionarla", ["Le predicas hasta que crea", "Te vas porque no cree", "Le dejas un folleto y te vas"], "«Andad sabiamente para con los de afuera, redimiendo el tiempo».", "Colosenses 4:5-6"],
    ["f29", 3, "o3", "aplicar", "Un hermano capellán condiciona la ayuda de la iglesia a que los presos vayan a su culto. ¿Qué le dices?", "Que la ayuda se da igual a todos, y que la fe se ofrece sin condiciones", ["Que hace bien", "Que pida más", "Nada"], "Cristo está en cada preso: «a mí lo hicisteis».", "Mateo 25:40"],
    ["f30", 3, "o3", "evaluar", "¿Qué actitud del capellán con una persona de otra fe es la mejor?", "Escuchar, respetar, facilitar los recursos de su fe y hablar de Cristo con mansedumbre si se lo piden", ["Ignorar su fe", "Burlarse de su fe", "Fingir que comparte su fe"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia».", "1 Pedro 3:15-16"],
    // Lección 4 · El llamado y la formación del capellán
    ["f31", 4, "o4", "recordar", "¿Qué hizo la iglesia con Bernabé y Saulo después de ayunar y orar, según Hechos 13:3?", "Les impusieron las manos y los despidieron", ["Los echaron de la ciudad", "Les quitaron el ministerio", "Los dejaron esperar un año"], "«Entonces, habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
    ["f32", 4, "o4", "recordar", "¿Cómo debe presentarse el obrero a Dios, según 2 Timoteo 2:15?", "Aprobado, como obrero que no tiene de qué avergonzarse", ["Con muchos títulos", "Sin preparación", "Con miedo"], "«Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse».", "2 Timoteo 2:15"],
    ["f33", 4, "o4", "recordar", "¿De quiénes debe tener buen testimonio el que sirve, según 1 Timoteo 3:7?", "De los de afuera", ["Solo de su familia", "Solo de su pastor", "De nadie"], "«También es necesario que tenga buen testimonio de los de afuera».", "1 Timoteo 3:7"],
    ["f34", 4, "o4", "comprender", "¿Qué es la educación pastoral clínica (CPE)?", "Una formación que une la práctica en un hospital con la reflexión supervisada", ["Un curso de cocina", "Un título de medicina", "Una ceremonia"], "Es una forma de prepararse con diligencia: «como obrero que no tiene de qué avergonzarse».", "2 Timoteo 2:15"],
    ["f35", 4, "o4", "comprender", "¿Qué pide la Asociación de Capellanes Profesionales para la certificación profesional?", "Una maestría, cuatro unidades de educación pastoral clínica, el aval de su grupo de fe y 2,000 horas de experiencia", ["Solo buena voluntad", "Un curso de un fin de semana", "Nada"], "«Procura con diligencia presentarte a Dios aprobado».", "2 Timoteo 2:15"],
    ["f36", 4, "o4", "analizar", "¿Por qué es importante el aval de la iglesia para el capellán?", "Porque confirma su llamado y su buen orden, y lo respalda ante la institución", ["Porque le da dinero", "No es importante", "Porque reemplaza la preparación"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:2-3"],
    ["f37", 4, "o4", "aplicar", "Un hermano dice que es capellán certificado, pero nunca hizo la formación. ¿Qué le dices?", "Que no use ese título y que, si quiere servir, se prepare y busque el aval de su iglesia", ["Que siga diciendo que es certificado", "Que se ponga otro título", "Nada"], "«También es necesario que tenga buen testimonio de los de afuera».", "1 Timoteo 3:7"],
    ["f38", 4, "o4", "aplicar", "Un hospital pide a los capellanes voluntarios una revisión de antecedentes. ¿Qué haces?", "La aceptas con gusto, porque cuidar a los pacientes es parte del servicio", ["Te niegas porque eres de la iglesia", "Mientes en el formulario", "Buscas otro hospital sin revisión"], "«También es necesario que tenga buen testimonio de los de afuera».", "1 Timoteo 3:7"],
    ["f39", 4, "o4", "aplicar", "Una capellana voluntaria nueva no sabe cómo empezar. ¿Qué le aconsejas?", "Empezar con pocas horas, acompañada por un capellán con experiencia, y evaluar con su pastor", ["Atender sola todos los pisos", "Esperar a sentirse lista", "Trabajar sin supervisión"], "«Procura con diligencia presentarte a Dios aprobado».", "2 Timoteo 2:15"],
    ["f40", 4, "o4", "evaluar", "¿Qué plan para prepararse como capellán está mejor armado?", "Confirmar el llamado con la iglesia, formarse, pedir el aval, hacer la capacitación de la institución y empezar acompañado", ["Ir directo a visitar sin preparación", "Solo leer un libro", "Esperar a que lo llamen"], "«Entonces, habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
    // Lección 5 · La visita del capellán paso a paso
    ["f41", 5, "o5", "recordar", "¿Qué debe hacer el que está enfermo, según Santiago 5:14?", "Llamar a los ancianos de la iglesia, para que oren por él", ["Esconderse", "No decir nada", "Esperar sin orar"], "«¿Está alguno enfermo entre vosotros? Llame a los ancianos de la iglesia, y oren por él».", "Santiago 5:13-14"],
    ["f42", 5, "o5", "recordar", "¿Cómo pide Hebreos 13:3 que nos acordemos de los presos?", "Como si estuviéramos presos juntamente con ellos", ["Como enemigos", "Solo en las fiestas", "Como si no existieran"], "«Acordaos de los presos, como si estuvierais presos juntamente con ellos».", "Hebreos 13:3"],
    ["f43", 5, "o5", "recordar", "¿Qué debe hacer el que está afligido, según Santiago 5:13?", "Orar", ["Callar", "Huir", "Quejarse"], "«¿Está alguno entre vosotros afligido? Haga oración».", "Santiago 5:13-14"],
    ["f44", 5, "o5", "comprender", "¿Por qué el capellán se lava las manos antes y después de cada visita?", "Para cuidar la salud de los pacientes y la suya", ["Por una costumbre religiosa", "No hace falta", "Para ganar tiempo"], "El capellán cuida al otro como a sí mismo: «como que también vosotros mismos estáis en el cuerpo».", "Hebreos 13:3"],
    ["f45", 5, "o5", "comprender", "¿Qué anota el capellán después de una visita?", "Solo lo que pide la institución, cuidando la privacidad de la persona", ["Todo lo que la persona dijo", "Nunca nada", "Lo publica para pedir oración"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f46", 5, "o5", "analizar", "¿Por qué el capellán pregunta qué le gustaría recibir a la persona antes de orar o de leer?", "Porque respeta su libertad y ofrece lo que la persona quiere", ["Porque no sabe orar", "Para alargar la visita", "No debe preguntar"], "«todo hombre sea pronto para oír, tardo para hablar».", "Santiago 1:19"],
    ["f47", 5, "o5", "aplicar", "Un cuarto tiene una señal de aislamiento en la puerta. ¿Qué haces antes de visitar al paciente?", "Sigues las indicaciones del personal antes de entrar", ["Entras igual", "Te vas sin avisar", "Abres la puerta para hablarle desde afuera"], "«Andad sabiamente para con los de afuera».", "Colosenses 4:5-6"],
    ["f48", 5, "o5", "aplicar", "Una paciente te cuenta que tiene mucho miedo de morir. ¿Qué haces?", "La escuchas, le preguntas qué le ha dado fuerza antes y le ofreces una oración o un salmo si lo quiere", ["Le dices que no tenga miedo y cambias de tema", "Le hablas de tu propio miedo", "Te vas"], "«¿Está alguno entre vosotros afligido? Haga oración».", "Santiago 5:13-14"],
    ["f49", 5, "o5", "aplicar", "Un paciente queda muy angustiado después de tu visita. ¿Qué haces?", "Avisas a la enfermera, para que el equipo lo sepa y lo atienda", ["No dices nada", "Lo publicas", "Esperas una semana"], "«Acordaos de los presos» y «de los maltratados, como que también vosotros mismos estáis en el cuerpo».", "Hebreos 13:3"],
    ["f50", 5, "o5", "evaluar", "¿Qué visita sigue mejor los pasos del capellán?", "Prepararse, entrar con respeto, escuchar, conocer sus necesidades espirituales, ofrecer sin imponer, cerrar y registrar", ["Entrar sin tocar y predicar", "Quedarse callado y sin presentarse", "Orar en voz alta sin preguntar"], "«todo hombre sea pronto para oír, tardo para hablar, tardo para airarse».", "Santiago 1:19"],
    // Lección 6 · El capellán dentro de la institución
    ["f51", 6, "o6", "recordar", "¿Qué había en Daniel, según Daniel 6:3?", "Un espíritu superior", ["Un espíritu de miedo", "Mucho orgullo", "Nada especial"], "«porque había en él un espíritu superior».", "Daniel 6:3-4"],
    ["f52", 6, "o6", "recordar", "¿A qué pide Pablo que estén dispuestos los creyentes, según Tito 3:1?", "A toda buena obra", ["A pelear", "A desobedecer", "A no trabajar"], "«que obedezcan, que estén dispuestos a toda buena obra».", "Tito 3:1-2"],
    ["f53", 6, "o6", "recordar", "¿Cómo pide Pablo que hagamos todo, según Colosenses 3:23?", "De corazón, como para el Señor", ["Para que nos vean", "Con prisa", "Sin ganas"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f54", 6, "o6", "comprender", "¿Por qué se dice que el capellán es un invitado en una casa ajena?", "Porque sirve en una institución que tiene sus propias normas, su personal y sus horarios", ["Porque no es bienvenido", "Porque vive allí", "Porque no tiene casa"], "«Recuérdales que se sujeten a los gobernantes y autoridades».", "Tito 3:1-2"],
    ["f55", 6, "o6", "comprender", "¿Qué no le corresponde al capellán dentro de una institución?", "Meterse en el tratamiento médico, en las decisiones legales o en la disciplina de la cárcel", ["Escuchar", "Orar", "Cuidar al personal"], "«Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan».", "Tito 3:1-2"],
    ["f56", 6, "o6", "analizar", "¿Por qué el capellán no critica a la institución delante de los pacientes o de los presos?", "Porque pierde la confianza del personal y divide en vez de ayudar", ["Porque no tiene opinión", "Sí debe criticarla", "Porque no le importa"], "«Que a nadie difamen, que no sean pendencieros, sino amables».", "Tito 3:1-2"],
    ["f57", 6, "o6", "aplicar", "Un preso insiste en que le lleves una carta sin pasarla por la revisión. ¿Qué haces?", "Pones el límite con calma, le ofreces el camino permitido y se lo cuentas a tu supervisor", ["Se la llevas", "Le gritas", "Dejas de hablarle"], "«porque él era fiel, y ningún vicio ni falta fue hallado en él».", "Daniel 6:3-4"],
    ["f58", 6, "o6", "aplicar", "Tienes un turno de capellán el martes y no vas a poder ir. ¿Qué haces?", "Avisas con tiempo a la oficina de capellanía", ["Faltas sin avisar", "Mandas a cualquier amigo", "Vas otro día sin avisar"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
    ["f59", 6, "o6", "aplicar", "Una norma del hospital te parece contraria a tu conciencia. ¿Qué haces?", "Lo hablas con respeto con tu supervisor y con tu iglesia, en lugar de desobedecer a escondidas", ["La desobedeces sin decir nada", "Te quejas con los pacientes", "Renuncias sin hablar con nadie"], "Daniel fue fiel sin esconderse: «porque él era fiel, y ningún vicio ni falta fue hallado en él».", "Daniel 6:3-4"],
    ["f60", 6, "o6", "evaluar", "¿Qué capellán se gana mejor la confianza de una institución?", "El que cumple las normas aunque nadie lo vea, sirve a todos por igual, habla bien del personal y avisa cuando no puede venir", ["El que busca atajos", "El que solo atiende a los de su iglesia", "El que critica a la institución"], "«mas no podían hallar ocasión alguna o falta, porque él era fiel».", "Daniel 6:3-4"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué dijo Jesús de los que recogieron al forastero, según Mateo 25:35?", "Que lo recogieron a él", ["Que se equivocaron", "Que debían echarlo", "Nada"], "«fui forastero, y me recogisteis».", "Mateo 25:35-36"],
      ["m1-02", 1, "o1", "comprender", "¿Qué enseña Jeremías 29:7 al capellán?", "Que debe buscar el bien de la institución y de la ciudad donde sirve, y orar por ella", ["Que debe encerrarse en su iglesia", "Que debe huir de la ciudad", "Que no debe orar por nadie"], "«Y procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová».", "Jeremías 29:7"],
      ["m1-03", 1, "o1", "aplicar", "Un amigo te pregunta para qué sirve un capellán si no puede curar a nadie. ¿Qué le respondes?", "Que lleva la presencia de Dios, escucha y acompaña a las personas donde están", ["Que no sirve para nada", "Que cura con oraciones mágicas", "Que reemplaza al médico"], "«enfermo, y me visitasteis; en la cárcel, y vinisteis a mí».", "Mateo 25:35-36"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué el capellán no va a la institución a llenar su iglesia?", "Porque va a servir a todos, y muchas veces siembra para que otro coseche", ["Porque no le importa su iglesia", "Porque está prohibido creer", "Sí va a llenar su iglesia"], "«en cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis».", "Mateo 25:40"],
      ["m1-05", 1, "o1", "recordar", "¿Qué tendría el pueblo si procuraba la paz de la ciudad, según Jeremías 29:7?", "Paz", ["Riquezas", "Guerra", "Nada"], "«porque en su paz tendréis vosotros paz».", "Jeremías 29:7"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué día del capellán voluntario está mejor organizado?", "Orar, recibir la lista, visitar, acompañar a las familias y al personal, registrar según las reglas y terminar orando", ["Visitar sin lista ni reglas", "Quedarse en la oficina", "Visitar solo a los conocidos"], "«enfermo, y me visitasteis».", "Mateo 25:35-36"],
      ["m1-07", 2, "o2", "recordar", "¿Qué hizo el Verbo, según Juan 1:14?", "Fue hecho carne y habitó entre nosotros", ["Se quedó en el cielo", "Mandó un mensajero", "Escribió una carta"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
      ["m1-08", 2, "o2", "comprender", "¿Qué enseña el camino a Emaús sobre la visita del capellán?", "Que primero se acompaña y se escucha, y después se habla", ["Que hay que hablar primero", "Que no hay que acompañar", "Que hay que caminar rápido"], "«Jesús mismo se acercó, y caminaba con ellos».", "Lucas 24:15"],
      ["m1-09", 2, "o2", "aplicar", "Un paciente llora mientras le hablas. ¿Qué haces?", "Respetas sus lágrimas y lo acompañas, sin apurarlo", ["Le dices que no llore", "Te vas", "Cambias de tema"], "«llorad con los que lloran».", "Romanos 12:15"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué el capellán acepta que hay preguntas sin respuesta?", "Porque no tiene que explicarlo todo, y su presencia ayuda más que una respuesta rápida", ["Porque no sabe nada", "Porque no le importa", "No las acepta"], "La certeza que ofrece es otra: «he aquí yo estoy con vosotros todos los días».", "Mateo 28:20"],
      ["m1-11", 2, "o2", "recordar", "¿Hasta cuándo prometió Jesús estar con nosotros, según Mateo 28:20?", "Hasta el fin del mundo", ["Hasta el domingo", "Hasta que lleguemos al cielo", "Solo un tiempo"], "«he aquí yo estoy con vosotros todos los días, hasta el fin del mundo».", "Mateo 28:20"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué respuesta ante un paciente que no quiere hablar es la mejor?", "Preguntar si puede quedarse, acompañar en silencio, hacer una pregunta suave, escuchar y ofrecer la oración", ["Hablar sin parar", "Irse enseguida", "Exigirle que hable"], "«Jesús mismo se acercó, y caminaba con ellos».", "Lucas 24:15"],
      ["m1-13", 3, "o3", "recordar", "¿Qué pide Colosenses 4:5?", "Andar sabiamente para con los de afuera, redimiendo el tiempo", ["Alejarse de los de afuera", "Hablar mal de los de afuera", "No tratar con nadie"], "«Andad sabiamente para con los de afuera, redimiendo el tiempo».", "Colosenses 4:5-6"],
      ["m1-14", 3, "o3", "comprender", "¿Qué enseña el discurso de Pablo en Atenas al capellán?", "A empezar con respeto por lo que la gente cree y, desde allí, hablar del Dios verdadero", ["A burlarse de las otras religiones", "A no hablar nunca de Dios", "A imponer su fe"], "«Al que vosotros adoráis, pues, sin conocerle, es a quien yo os anuncio».", "Hechos 17:22-23"],
      ["m1-15", 3, "o3", "aplicar", "Un paciente musulmán quiere un lugar tranquilo para orar. ¿Qué haces?", "Preguntas al personal si se puede facilitar, porque el capellán ayuda a cada persona con lo que su fe le pide", ["Le dices que ore como tú", "No haces nada", "Le dices que no se puede"], "«Andad sabiamente para con los de afuera».", "Colosenses 4:5-6"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué el capellán nunca finge tener otra fe?", "Porque sería mentir; sirve a todos con respeto sin dejar de ser quien es", ["Porque no le importa", "Sí puede fingir", "Para ganarse a la persona"], "«teniendo buena conciencia».", "1 Pedro 3:15-16"],
      ["m1-17", 3, "o3", "comprender", "¿Por qué 1 Pedro 3:16 pide tener buena conciencia al dar testimonio?", "Para que la buena conducta respalde lo que se dice", ["Para presumir", "Porque la conducta no importa", "Para no hablar nunca"], "«teniendo buena conciencia, para que en lo que murmuran de vosotros como de malhechores, sean avergonzados los que calumnian vuestra buena conducta en Cristo».", "1 Pedro 3:15-16"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué testimonio del capellán es el más respetuoso?", "El que escucha primero y habla de su fe cuando se lo piden o lo permiten, sin aprovecharse del dolor", ["El que insiste aunque le digan que no", "El que condiciona la ayuda", "El que nunca habla de Cristo aunque se lo pidan"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia».", "1 Pedro 3:15-16"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hacía la iglesia de Antioquía cuando habló el Espíritu Santo, según Hechos 13:2?", "Ministraba al Señor y ayunaba", ["Dormía", "Discutía", "Comía en una fiesta"], "«Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo».", "Hechos 13:2-3"],
      ["m2-02", 4, "o4", "comprender", "¿Qué diferencia hay entre el capellán voluntario y el profesional?", "El voluntario sirve algunas horas con la capacitación de la institución; el profesional trabaja en el equipo con una formación larga y supervisada", ["Ninguna", "El voluntario cobra más", "El profesional no necesita formación"], "Los dos se preparan: «Procura con diligencia presentarte a Dios aprobado».", "2 Timoteo 2:15"],
      ["m2-03", 4, "o4", "aplicar", "Tu iglesia quiere enviar a un hermano como capellán a la cárcel. ¿Qué le da la iglesia?", "Su aval: una carta que confirma que es un ministro en buen orden y que la iglesia lo envía", ["Nada", "Un arma", "Un cargo político"], "«les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué el capellán sigue aprendiendo después de empezar?", "Porque sirve en lugares delicados y necesita saber más del duelo, de las crisis, de las otras religiones y de las normas", ["Porque no sabe nada", "No necesita aprender", "Para tener títulos"], "«que usa bien la palabra de verdad».", "2 Timoteo 2:15"],
      ["m2-05", 4, "o4", "aplicar", "Un capellán nuevo quiere servir como profesional en un hospital. ¿Qué le aconsejas?", "Informarse con tiempo de los estudios de posgrado y de la educación pastoral clínica que necesitará", ["Que se presente como profesional sin estudiar", "Que no estudie nada", "Que espere a que lo contraten"], "«Procura con diligencia presentarte a Dios aprobado».", "2 Timoteo 2:15"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué necesita todo capellán, voluntario o profesional?", "El llamado, el aval de su iglesia, un buen testimonio y una buena preparación", ["Solo buena voluntad", "Solo un título", "Solo un uniforme"], "«También es necesario que tenga buen testimonio de los de afuera».", "1 Timoteo 3:7"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hacen los ancianos de la iglesia por el enfermo, según Santiago 5:14?", "Oran por él, ungiéndole con aceite en el nombre del Señor", ["Lo dejan solo", "Le cobran", "Lo regañan"], "«y oren por él, ungiéndole con aceite en el nombre del Señor».", "Santiago 5:13-14"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué el capellán se presenta por su nombre y su función al entrar?", "Para que la persona sepa quién es y pueda decidir si quiere la visita", ["Para presumir", "No hace falta", "Para que lo obedezcan"], "«Sea vuestra palabra siempre con gracia».", "Colosenses 4:5-6"],
      ["m2-09", 5, "o5", "aplicar", "Una paciente te pide que avises a su pastor. ¿Qué haces?", "Le avisas con su permiso, y anotas lo necesario según las reglas", ["No le avisas", "Le dices que ahora tú eres su pastor", "Lo publicas"], "«Llame a los ancianos de la iglesia, y oren por él».", "Santiago 5:13-14"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué el capellán vuelve más tarde si el paciente duerme o recibe un tratamiento?", "Porque respeta su descanso y su cuidado médico, y la visita es para servir, no para cumplir", ["Porque no le importa", "Para no trabajar", "No debe volver"], "«como que también vosotros mismos estáis en el cuerpo».", "Hebreos 13:3"],
      ["m2-11", 5, "o5", "aplicar", "Un paciente te pregunta si puedes orar con él. ¿Qué haces?", "Oras con él con palabras sencillas, sobre lo que él te pidió", ["Le dices que no", "Oras una hora", "Le pides que ore él solo"], "«¿Está alguno enfermo entre vosotros? Llame a los ancianos de la iglesia, y oren por él».", "Santiago 5:13-14"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué pregunta ayuda más a conocer las necesidades espirituales de una persona?", "¿Qué le ha dado fuerza en los momentos difíciles de su vida?", ["¿Por qué no va a la iglesia?", "¿Qué pecado cometió?", "¿Cuánto dinero tiene?"], "«todo hombre sea pronto para oír, tardo para hablar».", "Santiago 1:19"],
      ["m2-13", 6, "o6", "recordar", "¿Qué no podían hallar en Daniel sus enemigos, según Daniel 6:4?", "Ocasión alguna o falta", ["Amigos", "Riquezas", "Palabras"], "«mas no podían hallar ocasión alguna o falta».", "Daniel 6:3-4"],
      ["m2-14", 6, "o6", "comprender", "¿Qué enseña Tito 3:2 sobre el trato del capellán con todos?", "Que no difame a nadie y muestre mansedumbre con todos", ["Que hable mal de los que no creen", "Que discuta con todos", "Que solo trate a los de su iglesia"], "«Que a nadie difamen, que no sean pendencieros, sino amables, mostrando toda mansedumbre para con todos los hombres».", "Tito 3:1-2"],
      ["m2-15", 6, "o6", "aplicar", "Un guardia de la cárcel te cuenta que está pasando por un divorcio. ¿Qué haces?", "Lo escuchas con respeto y le ofreces apoyo, porque el personal también sufre", ["Le dices que tú solo atiendes a los presos", "Se lo cuentas a los presos", "Le das un consejo legal"], "«mostrando toda mansedumbre para con todos los hombres».", "Tito 3:1-2"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el capellán trabaja de corazón aunque nadie lo vea?", "Porque sirve para el Señor y no para los hombres", ["Porque lo vigilan", "Porque le pagan más", "No trabaja así"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
      ["m2-17", 6, "o6", "comprender", "¿Qué muestra que el rey pensara poner a Daniel sobre todo el reino?", "Que la fidelidad y la excelencia de Daniel se ganaron la confianza de un rey extranjero", ["Que Daniel era pariente del rey", "Que Daniel pagó por el cargo", "Nada"], "«porque había en él un espíritu superior; y el rey pensó en ponerlo sobre todo el reino».", "Daniel 6:3-4"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué respuesta a una petición fuera de las normas es la mejor?", "Escuchar, explicar con amabilidad, ofrecer el camino permitido, poner el límite si insiste, seguir sirviendo y avisar al supervisor", ["Hacer lo que pide para no perder su confianza", "Denunciarlo sin hablar con él", "Dejar de visitarlo"], "«porque él era fiel, y ningún vicio ni falta fue hallado en él».", "Daniel 6:3-4"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "capellania-1-e1",
      tipo: "corta",
      pregunta: "Explica qué es un capellán y en qué se basa la capellanía en la Biblia.",
      ideas: [
        { id: "que_es", peso: 30, texto: "El ministro que la iglesia envía a una institución.", formas: ["institucion*", "hospital*", "carcel*", "donde esta la gente", "donde estan las personas"] },
        { id: "mateo25", peso: 30, texto: "En el enfermo y en el preso servimos a Cristo.", formas: ["me visitasteis", "vinisteis a mi", "a mi lo hicisteis", "servimos a cristo", "visitamos a cristo"] },
        { id: "todos", peso: 30, texto: "Sirve a personas de todas las creencias y sigue las normas.", formas: ["todas las creencias", "muchas creencias", "otras religiones", "las normas"] },
      ],
      citas: ["Mateo 25:36", "Mateo 25:35-36", "Mateo 25:40", "Jeremías 29:7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El capellán es el ministro que la iglesia envía a una institución, como un hospital o una cárcel, para estar con las personas donde están. Se basa en las palabras de Jesús: enfermo, y me visitasteis; en la cárcel, y vinisteis a mí (Mateo 25:36). Sirve a personas de todas las creencias y sigue las normas del lugar.",
    },
    {
      id: "capellania-1-e2",
      tipo: "corta",
      pregunta: "Explica qué es el ministerio de la presencia y cómo se practica.",
      ideas: [
        { id: "estar", peso: 30, texto: "Estar con la persona, como Cristo, que habitó entre nosotros.", formas: ["estar con", "habito entre nosotros", "encarna*", "acompan*", "caminaba con ellos"] },
        { id: "escuchar", peso: 30, texto: "Escuchar con preguntas abiertas y silencios.", formas: ["escuch*", "preguntas abiertas", "silencio*"] },
        { id: "ofrecer", peso: 30, texto: "Ofrecer la oración sin imponerla y respetar lo que siente.", formas: ["sin imponer*", "ofrec*", "respet*"] },
      ],
      citas: ["Juan 1:14", "Lucas 24:15", "Mateo 28:20", "Romanos 12:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Es estar con la persona y llevar la presencia de Dios, aunque no podamos cambiar su situación, como el Verbo que habitó entre nosotros (Juan 1:14). Se practica escuchando con preguntas abiertas y dejando silencios, respetando sus lágrimas y sus dudas, y ofreciendo la oración sin imponerla.",
    },
    {
      id: "capellania-1-e3",
      tipo: "corta",
      pregunta: "Explica cómo sirve el capellán a una persona de otra fe.",
      ideas: [
        { id: "respetar", peso: 30, texto: "Escuchar y respetar lo que cree.", formas: ["escuch*", "respet*", "lo que cree"] },
        { id: "recursos", peso: 30, texto: "Facilitar los recursos de su propia fe.", formas: ["lider religioso", "su comunidad", "lo que su fe", "rabino", "sacerdote", "imam"] },
        { id: "testimonio", peso: 30, texto: "Hablar de Cristo con mansedumbre si se lo piden, sin presionar.", formas: ["mansedumbre", "si se lo piden", "cuando se lo piden", "sin presion*", "sin aprovechar*"] },
      ],
      citas: ["1 Pedro 3:15", "1 Pedro 3:15-16", "Hechos 17:22-23", "Colosenses 4:5-6", "Colosenses 4:6"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La escucha, respeta lo que cree y le pregunta qué necesita. Facilita los recursos de su fe: avisa a su líder religioso o a su comunidad si lo pide. Y si le preguntan, habla de su esperanza en Cristo con mansedumbre y reverencia (1 Pedro 3:15), sin aprovecharse de su dolor.",
    },
    {
      id: "capellania-1-e4",
      tipo: "breve",
      pregunta:
        "Te piden que expliques a tu iglesia cómo es una buena visita de un capellán voluntario en un hospital. Explica sus pasos, con citas bíblicas.",
      ideas: [
        { id: "preparar", peso: 25, texto: "Prepararse y entrar con respeto.", formas: ["prepar*", "lava las manos", "lavarse las manos", "toca la puerta", "tocar la puerta", "se presenta", "presentarse"] },
        { id: "escuchar", peso: 25, texto: "Escuchar y conocer sus necesidades espirituales.", formas: ["escuch*", "necesidades espirituales", "le ha dado fuerza", "le da fuerza"] },
        { id: "ofrecer", peso: 25, texto: "Ofrecer sin imponer: una oración, una lectura o avisar a su pastor.", formas: ["ofrec*", "oracion", "salmo", "su pastor", "sin imponer*"] },
        { id: "cerrar", peso: 25, texto: "Cerrar y registrar según las reglas.", formas: ["registr*", "anot*", "despide", "despedirse", "va a volver"] },
      ],
      basta: 85,
      citas: ["Santiago 1:19", "Santiago 5:13-14", "Santiago 5:14", "Hebreos 13:3", "Mateo 25:36"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero el capellán se prepara: ora, revisa la información que le da el hospital y se lava las manos. Al entrar, toca la puerta, se presenta por su nombre y su función, y pregunta si es un buen momento. Después escucha, porque todo hombre debe ser pronto para oír y tardo para hablar (Santiago 1:19), y deja que la persona cuente lo que vive. Con preguntas sencillas conoce sus necesidades espirituales: qué le ha dado fuerza en los momentos difíciles, si tiene una fe o una comunidad, y qué le gustaría recibir. Entonces ofrece, sin imponer, una oración, la lectura de un salmo o avisar a su propio pastor, porque la oración por el enfermo es parte de la vida de la iglesia (Santiago 5:14). Al final se despide, dice si va a volver y se lava las manos otra vez. Y registra solo lo que pide el hospital, avisando al personal si algo le preocupa. Así visita al enfermo como si visitara a Cristo (Mateo 25:36).",
    },
    {
      id: "capellania-1-e5",
      tipo: "breve",
      pregunta:
        "Un preso le pide al capellán que le lleve a escondidas una carta para su familia. Explica cómo debe responder el capellán y cómo trabaja dentro de una institución, con citas bíblicas.",
      ideas: [
        { id: "escuchar", peso: 20, texto: "Escuchar al preso y entender por qué lo pide.", formas: ["escuch*", "entender"] },
        { id: "normas", peso: 30, texto: "Seguir las normas y ofrecer el camino permitido.", formas: ["las normas", "camino permitido", "medio oficial", "la revision"] },
        { id: "limite", peso: 25, texto: "Poner el límite con calma y avisar al supervisor.", formas: ["limite", "supervisor"] },
        { id: "sirviendo", peso: 25, texto: "Seguir sirviendo con amor y con integridad.", formas: ["sigue sirviendo", "seguir sirviendo", "sin rencor", "integridad", "fidelidad"] },
      ],
      basta: 85,
      citas: ["Daniel 6:4", "Daniel 6:3-4", "Tito 3:1", "Tito 3:1-2", "Colosenses 3:23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero el capellán escucha al preso y trata de entender por qué lo pide. Después le explica con amabilidad que él sigue las normas de la cárcel y que no puede llevar nada a escondidas, porque Pablo pide sujetarse a las autoridades y estar dispuestos a toda buena obra (Tito 3:1). Le ofrece el camino permitido: ayudarlo a escribir la carta y enviarla por el medio oficial. Si el preso insiste o lo presiona, pone el límite con calma, y le cuenta el caso a su supervisor de capellanía. Y sigue sirviendo al preso con el mismo amor, sin rencor. Así trabaja el capellán dentro de una institución: como un invitado en una casa ajena, que respeta las normas, trabaja en equipo con el personal, guarda la confianza con sus límites y no se mete en lo que no le toca, con la fidelidad de Daniel, en quien no hallaron ninguna falta (Daniel 6:4), y haciendo todo de corazón, como para el Señor (Colosenses 3:23).",
    },
  ],
  breve: {
    id: "capellania-1-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo prepararías a tu iglesia para enviar capellanes voluntarios a un hospital o a una cárcel de tu ciudad, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "base", peso: 15, texto: "La base bíblica de la capellanía.", formas: ["me visitasteis", "vinisteis a mi", "a mi lo hicisteis", "la paz de la ciudad"] },
      { id: "presencia", peso: 15, texto: "El ministerio de la presencia.", formas: ["presencia", "escuch*", "acompan*"] },
      { id: "creencias", peso: 15, texto: "Servir a personas de todas las creencias, con respeto.", formas: ["creencias", "otra fe", "otras religiones", "con respeto"] },
      { id: "formacion", peso: 20, texto: "El llamado, el aval y la formación.", formas: ["aval", "capacitacion", "formacion", "llamado", "antecedentes"] },
      { id: "visita", peso: 15, texto: "Los pasos de la visita.", formas: ["pasos de una visita", "prepararse", "registrar", "ofrecer sin imponer"] },
      { id: "institucion", peso: 20, texto: "Las normas de la institución y el cuidado del personal.", formas: ["normas", "al personal", "supervisor"] },
    ],
    basta: 85,
    citas: ["Mateo 25:36", "Mateo 25:40", "Jeremías 29:7", "Juan 1:14", "1 Pedro 3:15", "Hechos 13:2-3", "2 Timoteo 2:15", "Santiago 1:19", "Daniel 6:4", "Colosenses 3:23", "Tito 3:1"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaría enseñando que, cuando visitamos al enfermo y al preso, visitamos a Cristo: enfermo, y me visitasteis; en la cárcel, y vinisteis a mí (Mateo 25:36), y que debemos procurar la paz de la ciudad (Jeremías 29:7). Formaría un equipo de hermanos con el llamado confirmado por la iglesia, como Bernabé y Saulo (Hechos 13:2-3), y les daría el aval de la iglesia. Los prepararía en el ministerio de la presencia: estar, escuchar y acompañar, como el Verbo que habitó entre nosotros (Juan 1:14). Les enseñaría a servir a personas de todas las creencias con respeto, hablando de Cristo con mansedumbre cuando se lo pidan (1 Pedro 3:15). Practicaríamos los pasos de una visita: prepararse, entrar con respeto, escuchar, ofrecer sin imponer y registrar. Después harían la capacitación y la revisión de antecedentes que pida el hospital o la cárcel, y empezarían acompañados por un capellán con experiencia. Y les enseñaría a respetar las normas de la institución, a cuidar también al personal y a avisar a su supervisor, sirviendo con la fidelidad de Daniel (Daniel 6:4).",
  },
};
