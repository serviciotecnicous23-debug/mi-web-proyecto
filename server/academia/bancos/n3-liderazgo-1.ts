/**
 * El banco de «Liderazgo cristiano I» (Nivel 3). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es el liderazgo cristiano · o2 el carácter del líder · o3 servir como Jesús y el abuso de poder ·
 * o4 la vida con Dios, el descanso y la familia · o5 el trabajo en equipo · o6 los conflictos, las decisiones y los
 * nuevos líderes · o7 el versículo de memoria (Marcos 10:45).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n3-liderazgo-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N3_LIDERAZGO_1: BancoMateria = {
  materia: "n3-liderazgo-1",
  repaso: {
    "n3-liderazgo-1-1": ([
      ["1-r1", 1, "o1", "recordar", "Según Marcos 10:42-43, ¿qué dijo Jesús que no sería así entre sus discípulos?", "La manera de gobernar de las naciones, que se enseñorean de los demás", ["El servicio humilde", "La oración en grupo", "El cuidado de los pobres"], "«Pero no será así entre vosotros».", "Marcos 10:43"],
      ["1-r2", 1, "o1", "comprender", "¿Qué es el liderazgo cristiano?", "Influir en las personas para que sigan a Cristo, sirviéndolas como él", ["Mandar a los demás desde un cargo", "Tener muchos seguidores", "Ser el más talentoso"], "El que quiera hacerse grande entre vosotros será vuestro servidor.", "Marcos 10:43"],
      ["1-r3", 1, "o1", "recordar", "¿Qué dice 1 Timoteo 3:1 de quien anhela obispado?", "Que buena obra desea", ["Que busca honra", "Que es orgulloso", "Que debe esperar diez años"], "«Si alguno anhela obispado, buena obra desea».", "1 Timoteo 3:1"],
    ] as P[]).map(p),
    "n3-liderazgo-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué significa que el líder sea irreprensible?", "Que nadie pueda acusarlo con razón", ["Que nunca se equivoca", "Que es el más rico", "Que tiene muchos títulos"], "Es necesario que el obispo sea irreprensible.", "1 Timoteo 3:2"],
      ["2-r2", 2, "o2", "comprender", "¿Qué es la integridad?", "Ser la misma persona en público y en privado", ["Tener muchos talentos", "Hablar bien en público", "No tener problemas"], "«La integridad de los rectos los encaminará».", "Proverbios 11:3"],
      ["2-r3", 2, "o2", "recordar", "¿A quiénes da gracia Dios, según 1 Pedro 5:5?", "A los humildes", ["A los soberbios", "A los poderosos", "A los famosos"], "«Dios resiste a los soberbios, Y da gracia a los humildes».", "1 Pedro 5:5"],
    ] as P[]).map(p),
    "n3-liderazgo-1-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué hizo Jesús la noche antes de morir para dar ejemplo de servicio?", "Lavó los pies de sus discípulos", ["Pidió que le lavaran los pies", "Se sentó en el lugar de honor", "Repartió cargos"], "«Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».", "Juan 13:15"],
      ["3-r2", 3, "o3", "comprender", "¿Cómo debe apacentar el líder, según 1 Pedro 5:2-3?", "Voluntariamente, sin ganancia deshonesta y siendo ejemplo", ["Por obligación y con dureza", "Para enriquecerse", "Dominando a los demás"], "«Siendo ejemplos de la grey».", "1 Pedro 5:3"],
      ["3-r3", 3, "o3", "comprender", "¿Qué le gustaba a Diótrefes?", "Tener el primer lugar", ["Servir a todos", "Recibir a los hermanos", "Orar en secreto"], "«Diótrefes, al cual le gusta tener el primer lugar entre ellos».", "3 Juan 1:9"],
    ] as P[]).map(p),
    "n3-liderazgo-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué le dijo Moisés a Dios en Éxodo 33:15?", "Si tu presencia no ha de ir conmigo, no nos saques de aquí", ["Envía a otro", "Dame más soldados", "Quiero volver a Egipto"], "«Si tu presencia no ha de ir conmigo, no nos saques de aquí».", "Éxodo 33:15"],
      ["4-r2", 4, "o4", "comprender", "¿Qué hacía Jesús muy de mañana, según Marcos 1:35?", "Se iba a un lugar desierto a orar", ["Dormía hasta tarde", "Enseñaba en el templo", "Pescaba con Pedro"], "Salió y se fue a un lugar desierto, y allí oraba.", "Marcos 1:35"],
      ["4-r3", 4, "o4", "aplicar", "¿Qué les dijo Jesús a sus discípulos cansados?", "Venid aparte a un lugar desierto, y descansad un poco", ["Trabajad más", "No os quejéis", "Id a otra ciudad ahora mismo"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
    ] as P[]).map(p),
    "n3-liderazgo-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le dijo Jetro a Moisés?", "Que no estaba bien lo que hacía, porque no podría hacerlo solo", ["Que trabajara más horas", "Que dejara de juzgar al pueblo", "Que volviera a Madián"], "«No está bien lo que haces».", "Éxodo 18:17"],
      ["5-r2", 5, "o5", "comprender", "¿Para qué escogieron a los siete en Hechos 6?", "Para encargarles el servicio a las viudas, y que los apóstoles siguieran en la oración y la Palabra", ["Para reemplazar a los apóstoles", "Para cobrar ofrendas", "Para viajar a Roma"], "«Y nosotros persistiremos en la oración y en el ministerio de la palabra».", "Hechos 6:4"],
      ["5-r3", 5, "o5", "recordar", "¿Qué dice Eclesiastés 4:9?", "Mejores son dos que uno", ["Más vale estar solo", "Uno es suficiente", "Los grupos causan problemas"], "«Mejores son dos que uno; porque tienen mejor paga de su trabajo».", "Eclesiastés 4:9"],
    ] as P[]).map(p),
    "n3-liderazgo-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué pide Efesios 4:3 sobre la unidad?", "Guardar la unidad del Espíritu en el vínculo de la paz", ["Imponer la unidad con reglas", "Evitar a los que piensan distinto", "Que cada uno haga lo suyo"], "«Solícitos en guardar la unidad del Espíritu en el vínculo de la paz».", "Efesios 4:3"],
      ["6-r2", 6, "o6", "comprender", "¿Dónde se afirman los pensamientos, según Proverbios 15:22?", "En la multitud de consejeros", ["En decidir solo", "En la opinión del más fuerte", "En la prisa"], "«Mas en la multitud de consejeros se afirman».", "Proverbios 15:22"],
      ["6-r3", 6, "o6", "recordar", "¿Qué pudo decir Pablo al final de su vida?", "He peleado la buena batalla, he acabado la carrera, he guardado la fe", ["Me equivoqué de camino", "No terminé mi carrera", "Lo hice todo solo"], "«He peleado la buena batalla, he acabado la carrera, he guardado la fe».", "2 Timoteo 4:7"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: qué es el liderazgo cristiano (10)
    ["f01", 1, "o1", "recordar", "¿Qué le pidieron Santiago y Juan a Jesús?", "Sentarse a su derecha y a su izquierda en su gloria", ["Ser enviados a predicar", "Que sanara a su madre", "Más tiempo para orar"], "Por eso Jesús enseñó qué es ser grande en su reino.", "Marcos 10:37"],
    ["f02", 1, "o1", "comprender", "¿Cómo ejercen autoridad los gobernantes de las naciones, según Marcos 10:42?", "Se enseñorean de ellas", ["Las sirven con humildad", "Lavan los pies de sus súbditos", "Dan su vida por ellas"], "Sus grandes ejercen sobre ellas potestad.", "Marcos 10:42"],
    ["f03", 1, "o1", "comprender", "Según Jesús, ¿quién es grande entre sus discípulos?", "El que sirve a los demás", ["El que más manda", "El que tiene más dinero", "El que habla mejor"], "«El que quiera hacerse grande entre vosotros será vuestro servidor».", "Marcos 10:43"],
    ["f04", 1, "o1", "analizar", "¿Cómo se mide el liderazgo cristiano?", "Por cuántos crecen y por cuánto se parece el líder a Jesús", ["Por el tamaño del título", "Por cuántos obedecen sin preguntar", "Por los aplausos"], "El Hijo del Hombre vino para servir.", "Marcos 10:45"],
    ["f05", 1, "o1", "comprender", "Según J. Oswald Sanders, ¿qué distingue al líder espiritual?", "Que usa sus dones, pero depende de Dios y busca su voluntad", ["Que confía solo en su carisma", "Que no usa sus capacidades", "Que nunca consulta a nadie"], "La obra de Dios se hace con su Espíritu.", "Zacarías 4:6"],
    ["f06", 1, "o1", "recordar", "¿Qué dice Zacarías 4:6 sobre la obra de Dios?", "Que no se hace con ejército ni con fuerza, sino con su Espíritu", ["Que depende del dinero", "Que la hacen los fuertes", "Que no necesita a nadie"], "«No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos».", "Zacarías 4:6"],
    ["f07", 1, "o1", "aplicar", "¿Dónde ejerce influencia un creyente, además de la iglesia?", "En su familia, su grupo, su trabajo y su comunidad", ["En ningún otro lugar", "Solo en el templo", "Solo si tiene un cargo"], "Todos influimos con nuestra vida: sé ejemplo de los creyentes.", "1 Timoteo 4:12"],
    ["f08", 1, "o1", "analizar", "¿Qué diferencia hay entre un jefe y un líder cristiano?", "El jefe manda desde arriba; el líder va delante con el ejemplo y sirve", ["No hay diferencia", "El líder manda más fuerte", "El jefe sirve más"], "Siendo ejemplos de la grey.", "1 Pedro 5:3"],
    ["f09", 1, "o1", "comprender", "¿Cuál es el motivo correcto para desear el liderazgo?", "Servir en una obra, no buscar un lugar de honor", ["Ser reconocido", "Tener poder sobre otros", "Ganar dinero"], "Si alguno anhela obispado, buena obra desea.", "1 Timoteo 3:1"],
    ["f10", 1, "o7", "recordar", "Completa Marcos 10:45: Porque el Hijo del Hombre no vino para ser servido, sino…", "para servir, y para dar su vida en rescate por muchos", ["para gobernar a las naciones", "para ser rey de Israel", "para juzgar al mundo"], "Es el versículo de memoria de la materia.", "Marcos 10:45"],
    // ---- lección 2: el carácter del líder (10)
    ["f11", 2, "o2", "recordar", "¿Qué cualidades menciona 1 Timoteo 3:2?", "Sobrio, prudente, decoroso, hospedador y apto para enseñar", ["Rico, famoso y elocuente", "Joven, fuerte y alto", "Callado, solitario y estricto"], "«Sobrio, prudente, decoroso, hospedador, apto para enseñar».", "1 Timoteo 3:2"],
    ["f12", 2, "o2", "comprender", "¿Por qué el líder no debe ser un neófito?", "Porque un recién convertido puede envanecerse y caer", ["Porque los nuevos no sirven para nada", "Porque debe tener más de cincuenta años", "Porque así lo dice la tradición"], "No un neófito, no sea que envaneciéndose caiga en la condenación del diablo.", "1 Timoteo 3:6"],
    ["f13", 2, "o2", "comprender", "¿Por qué el líder necesita buen testimonio de los de afuera?", "Para no caer en descrédito ni en lazo del diablo", ["Para ser famoso", "Para conseguir donaciones", "Porque los de afuera eligen a los líderes"], "«También es necesario que tenga buen testimonio de los de afuera».", "1 Timoteo 3:7"],
    ["f14", 2, "o2", "aplicar", "Un líder es amable en la iglesia, pero grita y humilla en su casa. ¿Qué le falta?", "Integridad: ser el mismo en público y en privado", ["Talento", "Elocuencia", "Experiencia"], "La integridad de los rectos los encaminará.", "Proverbios 11:3"],
    ["f15", 2, "o2", "comprender", "¿Qué hace el líder humilde?", "Reconoce sus errores, escucha, pide perdón y da el reconocimiento a otros", ["Nunca admite errores", "Se queda con todo el mérito", "No escucha a nadie"], "Dios da gracia a los humildes.", "1 Pedro 5:5"],
    ["f16", 2, "o2", "recordar", "¿Qué les dijo Pablo a los ancianos de Éfeso en Hechos 20:28?", "Mirad por vosotros, y por todo el rebaño", ["Mirad por vuestras riquezas", "Cuidad solo el templo", "Buscad nuevos cargos"], "«Mirad por vosotros, y por todo el rebaño».", "Hechos 20:28"],
    ["f17", 2, "o2", "analizar", "¿Por qué el líder cuida primero su propia vida?", "Porque no puede llevar a otros adonde él no va", ["Porque es egoísta", "Porque los demás no importan", "Porque así descansa"], "Mirad por vosotros, y por todo el rebaño.", "Hechos 20:28"],
    ["f18", 2, "o2", "analizar", "¿Qué enseña el contraste entre Saúl y David sobre el liderazgo?", "Que el carácter va antes que el talento y la apariencia", ["Que la estatura es lo más importante", "Que Dios mira la apariencia", "Que no importa el corazón"], "Jehová no mira lo que mira el hombre: mira el corazón.", "1 Samuel 16:7"],
    ["f19", 2, "o2", "evaluar", "¿Cuál de estos candidatos cumple mejor con 1 Timoteo 3?", "Un creyente probado, sobrio, hospitalario y con buen testimonio", ["Un recién convertido muy talentoso", "Alguien elocuente pero pendenciero", "Alguien rico pero avaro"], "Es necesario que el obispo sea irreprensible.", "1 Timoteo 3:2"],
    ["f20", 2, "o2", "comprender", "¿Qué le pasa al líder que pierde la integridad?", "Pierde la confianza, y sin confianza nadie lo sigue", ["No le pasa nada", "Gana más seguidores", "Se vuelve más espiritual"], "A los pecadores los destruye su propia perversidad.", "Proverbios 11:3"],
    // ---- lección 3: servir como Jesús (10)
    ["f21", 3, "o3", "recordar", "¿Qué hizo Jesús en Juan 13, durante la cena?", "Lavó los pies de sus discípulos", ["Echó a los cambistas", "Multiplicó los panes", "Resucitó a Lázaro"], "Comenzó a lavar los pies de los discípulos y a enjugarlos con la toalla.", "Juan 13:5"],
    ["f22", 3, "o3", "comprender", "¿Qué ejemplo dio Jesús al lavar los pies?", "Que debemos servirnos humildemente unos a otros", ["Que hay que lavarse antes de comer", "Que solo los siervos lavan pies", "Que el maestro debe ser servido"], "«Vosotros también debéis lavaros los pies los unos a los otros».", "Juan 13:14"],
    ["f23", 3, "o3", "comprender", "¿Qué pide Filipenses 2:3?", "No hacer nada por contienda o vanagloria, y estimar a los demás como superiores", ["Buscar el primer lugar", "Defender siempre los propios intereses", "Competir con los hermanos"], "«Nada hagáis por contienda o por vanagloria».", "Filipenses 2:3"],
    ["f24", 3, "o3", "recordar", "¿De quién es el rebaño que cuida el líder, según 1 Pedro 5:2?", "De Dios", ["Del líder", "Del pastor principal", "De la denominación"], "«Apacentad la grey de Dios que está entre vosotros».", "1 Pedro 5:2"],
    ["f25", 3, "o3", "aplicar", "Un líder sirve solo porque lo obligan y espera sacar provecho. ¿Qué dice 1 Pedro 5:2?", "Que debe servir voluntariamente y no por ganancia deshonesta", ["Que está bien mientras cumpla", "Que todos sirven por interés", "Que debe cobrar más"], "«No por fuerza, sino voluntariamente; no por ganancia deshonesta, sino con ánimo pronto».", "1 Pedro 5:2"],
    ["f26", 3, "o3", "analizar", "¿Qué muestra un liderazgo que exige lealtad a la persona del líder?", "Que el poder se está usando para uno mismo y no para Cristo", ["Que es un liderazgo sano", "Que el líder es muy espiritual", "Que la iglesia está creciendo"], "Diótrefes amaba el primer lugar y rechazaba a los hermanos.", "3 Juan 1:9"],
    ["f27", 3, "o3", "evaluar", "¿Cuál es la mejor protección contra el abuso de poder?", "Rendir cuentas, con transparencia y bajo supervisión pastoral", ["No dar explicaciones a nadie", "Tener todo el control", "Castigar a quien pregunta"], "No como teniendo señorío, sino siendo ejemplos de la grey.", "1 Pedro 5:3"],
    ["f28", 3, "o3", "aplicar", "¿Qué se hace ante un abuso dentro de un ministerio?", "No encubrirlo: se informa a los pastores y, si hay delito, a las autoridades", ["Callar para proteger la imagen", "Culpar a la víctima", "Esperar a que pase"], "Nada hay oculto que no haya de ser manifestado.", "Lucas 8:17"],
    ["f29", 3, "o3", "comprender", "¿Servir como Jesús significa dejarse usar?", "No: Jesús servía con propósito, ponía límites y se apartaba a orar", ["Sí: hay que decir que sí a todo", "Sí: el líder no tiene límites", "No importa"], "«Mas él se apartaba a lugares desiertos, y oraba».", "Lucas 5:16"],
    ["f30", 3, "o3", "comprender", "Según Filipenses 2:7-8, ¿qué hizo Cristo?", "Se despojó a sí mismo, se hizo siervo y se humilló hasta la muerte de cruz", ["Buscó el poder", "Se negó a sufrir", "Exigió ser servido"], "Haya en vosotros este sentir que hubo también en Cristo Jesús.", "Filipenses 2:5"],
    // ---- lección 4: la vida con Dios (10)
    ["f31", 4, "o4", "comprender", "¿Por qué Moisés no quería avanzar sin la presencia de Dios?", "Porque sabía que su fuerza estaba en Dios y no en sus planes", ["Porque tenía miedo del camino", "Porque quería volver a Egipto", "Porque estaba enfermo"], "«Si tu presencia no ha de ir conmigo, no nos saques de aquí».", "Éxodo 33:15"],
    ["f32", 4, "o4", "recordar", "¿Qué hizo Nehemías antes de responder al rey?", "Oró al Dios de los cielos", ["Consultó a sus soldados", "Escribió una carta", "Se fue a Jerusalén"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4"],
    ["f33", 4, "o4", "aplicar", "¿Qué decidieron los apóstoles para no descuidar lo principal?", "Persistir en la oración y en el ministerio de la palabra", ["Atender ellos solos todas las mesas", "Dejar de orar para trabajar más", "Cerrar el servicio a las viudas"], "«Nosotros persistiremos en la oración y en el ministerio de la palabra».", "Hechos 6:4"],
    ["f34", 4, "o4", "comprender", "¿Por qué Jesús llevó a sus discípulos a descansar?", "Porque estaban cansados y ni tenían tiempo para comer", ["Porque no querían trabajar", "Porque había terminado la misión", "Porque tenían miedo"], "Eran muchos los que iban y venían, de manera que ni aun tenían tiempo para comer.", "Marcos 6:31"],
    ["f35", 4, "o4", "aplicar", "Un líder no descansa nunca y está agotado. ¿Qué le aconsejas?", "Que descanse como Jesús enseñó y organice su agenda con límites", ["Que trabaje más para demostrar su fe", "Que deje el ministerio para siempre", "Que no se lo diga a nadie"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
    ["f36", 4, "o4", "comprender", "¿Cuál es el primer ministerio del líder casado?", "Su familia", ["Su agenda", "Sus redes sociales", "Su cargo"], "El que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios?", "1 Timoteo 3:5"],
    ["f37", 4, "o4", "recordar", "¿En qué debía ser ejemplo Timoteo, según 1 Timoteo 4:12?", "En palabra, conducta, amor, espíritu, fe y pureza", ["En riqueza y fama", "En fuerza y estatura", "En títulos y cargos"], "«Sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza».", "1 Timoteo 4:12"],
    ["f38", 4, "o4", "comprender", "¿Qué pide 1 Timoteo 4:16 al líder?", "Tener cuidado de sí mismo y de la doctrina", ["Tener cuidado solo de los demás", "Cuidar sus bienes", "Cuidar su imagen"], "«Ten cuidado de ti mismo y de la doctrina».", "1 Timoteo 4:16"],
    ["f39", 4, "o4", "analizar", "¿Por qué caen muchos líderes?", "Por agotamiento, por descuidar su familia o por abandonar su vida con Dios", ["Por orar demasiado", "Por descansar mucho", "Por cuidar a su familia"], "Ten cuidado de ti mismo.", "1 Timoteo 4:16"],
    ["f40", 4, "o4", "aplicar", "¿Cuál es una buena regla de vida para un líder?", "Un tiempo diario con Dios, un día de descanso semanal, tiempo con la familia y una evaluación anual", ["Trabajar sin pausa", "Orar solo en emergencias", "Dejar a la familia para después"], "Jesús oraba de madrugada y llevaba a sus discípulos a descansar.", "Marcos 1:35"],
    // ---- lección 5: el trabajo en equipo (10)
    ["f41", 5, "o5", "recordar", "¿Qué clase de personas aconsejó Jetro escoger?", "Capaces, temerosas de Dios, honradas y que aborrecieran la avaricia", ["Ricas y famosas", "Jóvenes y fuertes", "Familiares de Moisés"], "«Varones de virtud, temerosos de Dios, varones de verdad, que aborrezcan la avaricia».", "Éxodo 18:21"],
    ["f42", 5, "o5", "comprender", "¿Qué problema resolvió la iglesia en Hechos 6?", "Que las viudas de los griegos eran desatendidas en el servicio diario", ["Que faltaba dinero para el templo", "Que los apóstoles estaban presos", "Que no había quién predicara"], "Hubo murmuración porque las viudas de los griegos eran desatendidas.", "Hechos 6:1"],
    ["f43", 5, "o5", "recordar", "¿Qué requisitos pusieron para los siete de Hechos 6?", "Buen testimonio, y estar llenos del Espíritu Santo y de sabiduría", ["Ser ricos y de buena familia", "Tener más de cuarenta años", "Hablar griego y latín"], "«Siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría».", "Hechos 6:3"],
    ["f44", 5, "o5", "comprender", "¿Qué resultado tuvo delegar en Hechos 6?", "Que la palabra del Señor crecía y se multiplicaban los discípulos", ["Que la iglesia se dividió", "Que los apóstoles dejaron de orar", "Que las viudas se fueron"], "Y crecía la palabra del Señor, y el número de los discípulos se multiplicaba.", "Hechos 6:7"],
    ["f45", 5, "o5", "comprender", "¿Qué enseña Romanos 12:4-5 sobre el equipo?", "Que somos un cuerpo con muchos miembros y funciones distintas", ["Que todos deben hacer lo mismo", "Que el líder hace todo", "Que no necesitamos a otros"], "«Así nosotros, siendo muchos, somos un cuerpo en Cristo».", "Romanos 12:5"],
    ["f46", 5, "o5", "aplicar", "¿Cuál es el primer paso para delegar bien?", "Escoger personas fieles y con el carácter adecuado", ["Dar la tarea al primero que pase", "No explicar nada", "Quitarle la tarea a la primera dificultad"], "Varones de virtud, temerosos de Dios.", "Éxodo 18:21"],
    ["f47", 5, "o5", "aplicar", "Delegaste una tarea y la persona tiene una dificultad. ¿Qué haces?", "La acompaño y la ayudo, sin quitarle la tarea enseguida", ["Le quito la tarea", "La critico delante de todos", "La ignoro"], "Si cayeren, el uno levantará a su compañero.", "Eclesiastés 4:10"],
    ["f48", 5, "o5", "comprender", "¿Cómo se reconstruyó el muro de Jerusalén en cincuenta y dos días?", "Con cada familia trabajando en su parte", ["Con Nehemías haciéndolo solo", "Contratando extranjeros", "Con un milagro, sin trabajo"], "Fue terminado el muro en cincuenta y dos días.", "Nehemías 6:15"],
    ["f49", 5, "o5", "evaluar", "¿Qué destruye la confianza en un equipo?", "Los rumores y las críticas a espaldas de otros", ["La comunicación clara", "La oración juntos", "El reconocimiento"], "Solícitos en guardar la unidad del Espíritu en el vínculo de la paz.", "Efesios 4:3"],
    ["f50", 5, "o5", "analizar", "¿Qué le pasa al líder que lo hace todo solo?", "Se agota y deja a los demás sin crecer", ["Su ministerio crece sin límites", "Forma muchos líderes", "Nunca se cansa"], "«Desfallecerás del todo, tú, y también este pueblo que está contigo».", "Éxodo 18:18"],
    // ---- lección 6: conflictos, decisiones y nuevos líderes (10)
    ["f51", 6, "o6", "comprender", "¿Qué enseñó Jesús sobre el hermano que nos ofende?", "Ir y hablar primero a solas con él", ["Contarlo a todos", "Ignorarlo para siempre", "Vengarse"], "Ve y repréndele estando tú y él solos.", "Mateo 18:15"],
    ["f52", 6, "o6", "aplicar", "¿Cómo enfrenta el líder un conflicto en su equipo?", "A tiempo, escuchando a todas las partes y buscando la reconciliación", ["Escondiéndolo", "Tomando partido sin escuchar", "Agrandándolo en público"], "Solícitos en guardar la unidad del Espíritu en el vínculo de la paz.", "Efesios 4:3"],
    ["f53", 6, "o6", "analizar", "¿Qué muestra la historia de Pablo, Bernabé y Marcos?", "Que aun los grandes líderes tienen desacuerdos, y que Dios puede sanar y dar fruto después", ["Que nunca hay que trabajar juntos", "Que Marcos dejó el ministerio para siempre", "Que los conflictos no tienen solución"], "Pablo escribió después que Marcos le era útil para el ministerio.", "2 Timoteo 4:11"],
    ["f54", 6, "o6", "recordar", "¿Qué pide Santiago 1:5 al que tiene falta de sabiduría?", "Que la pida a Dios", ["Que la compre", "Que decida al azar", "Que no haga nada"], "«Pídala a Dios, el cual da a todos abundantemente y sin reproche».", "Santiago 1:5"],
    ["f55", 6, "o6", "comprender", "¿Cómo tomó su decisión el concilio de Jerusalén?", "Buscando la guía del Espíritu Santo y el acuerdo del grupo", ["Por la opinión de uno solo", "Por votación, sin orar", "Echando suertes"], "«Porque ha parecido bien al Espíritu Santo, y a nosotros».", "Hechos 15:28"],
    ["f56", 6, "o6", "aplicar", "Debes tomar una decisión importante para tu ministerio. ¿Qué haces?", "Oro, busco lo que dice la Escritura, pido consejo y escucho a mi equipo", ["Decido solo y rápido", "Hago lo que hacen otros", "Espero sin hacer nada"], "En la multitud de consejeros se afirman los pensamientos.", "Proverbios 15:22"],
    ["f57", 6, "o6", "recordar", "¿A quién formó Moisés para continuar su obra?", "A Josué", ["A Aarón", "A Caleb", "A Coré"], "Toma a Josué hijo de Nun, varón en el cual hay espíritu, y pon tu mano sobre él.", "Números 27:18"],
    ["f58", 6, "o6", "comprender", "¿Qué cadena de formación aparece en 2 Timoteo 2:2?", "Pablo enseña a Timoteo, Timoteo a hombres fieles, y ellos a otros", ["Cada uno aprende solo", "Solo los apóstoles enseñan", "Solo se enseña a los líderes"], "«Esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f59", 6, "o6", "analizar", "¿Cuándo termina un líder cristiano su tarea?", "Cuando hay otros preparados para continuarla", ["Cuando cumple un año", "Cuando se cansa", "Nunca forma a nadie"], "Encarga a hombres fieles que enseñen también a otros.", "2 Timoteo 2:2"],
    ["f60", 6, "o6", "comprender", "¿Qué significa terminar bien, según 2 Timoteo 4:7?", "Pelear la buena batalla, acabar la carrera y guardar la fe", ["Tener el ministerio más grande", "Retirarse con riqueza", "Que nadie lo critique"], "«He peleado la buena batalla, he acabado la carrera, he guardado la fe».", "2 Timoteo 4:7"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hicieron los otros diez discípulos cuando Santiago y Juan pidieron los primeros lugares?", "Se enojaron", ["Los felicitaron", "Pidieron lo mismo", "Se fueron"], "Cuando lo oyeron los diez, comenzaron a enojarse contra Jacobo y contra Juan.", "Marcos 10:41"],
      ["m1-02", 1, "o1", "comprender", "Según Marcos 10:44, ¿quién será el primero?", "El que sea siervo de todos", ["El más antiguo", "El más rico", "El más elocuente"], "«El que de vosotros quiera ser el primero, será siervo de todos».", "Marcos 10:44"],
      ["m1-03", 1, "o1", "aplicar", "¿Qué pregunta ayuda a evaluar a un líder cristiano?", "¿Las personas que guía están creciendo en Cristo?", ["¿Cuántos títulos tiene?", "¿Cuántos lo aplauden?", "¿Cuánto gana?"], "El Hijo del Hombre vino para servir.", "Marcos 10:45"],
      ["m1-04", 1, "o1", "comprender", "¿De dónde viene la autoridad del líder cristiano?", "De Dios y de su vida, no solo de su cargo", ["Solo de su cargo", "De su fuerza", "De su dinero"], "Siendo ejemplos de la grey.", "1 Pedro 5:3"],
      ["m1-05", 1, "o1", "analizar", "¿Por qué no basta apoyarse en el carisma y en los métodos?", "Porque la obra de Dios se hace con la fuerza de su Espíritu", ["Porque el carisma es pecado", "Porque los métodos están prohibidos", "Porque no hay que usar los dones"], "No con ejército, ni con fuerza, sino con mi Espíritu.", "Zacarías 4:6"],
      ["m1-06", 1, "o7", "recordar", "¿Qué cita dice: el Hijo del Hombre no vino para ser servido, sino para servir?", "Marcos 10:45", ["Juan 3:16", "Mateo 28:19", "Lucas 4:18"], "Es el versículo de memoria de la materia.", "Marcos 10:45"],
      ["m1-07", 2, "o2", "recordar", "Según 1 Timoteo 3:3, ¿qué no debe ser el líder?", "Dado al vino, pendenciero ni codicioso", ["Amable", "Apacible", "Hospedador"], "No dado al vino, no pendenciero, no codicioso de ganancias deshonestas.", "1 Timoteo 3:3"],
      ["m1-08", 2, "o2", "comprender", "¿Qué significa que el líder sea apto para enseñar?", "Que puede explicar la Palabra con fidelidad", ["Que tiene un título universitario", "Que habla muy fuerte", "Que nunca escucha"], "Apto para enseñar es una de las cualidades del obispo.", "1 Timoteo 3:2"],
      ["m1-09", 2, "o2", "aplicar", "Un hermano muy talentoso se convirtió hace un mes y quiere dirigir el grupo. ¿Qué dice 1 Timoteo 3:6?", "Que no conviene un neófito, porque puede envanecerse", ["Que debe dirigir de inmediato", "Que el talento basta", "Que nunca podrá servir"], "No un neófito, no sea que envaneciéndose caiga.", "1 Timoteo 3:6"],
      ["m1-10", 2, "o2", "comprender", "¿Qué hace la integridad, según Proverbios 11:3?", "Encamina a los rectos", ["Los hace ricos", "Los hace famosos", "Los aleja de todos"], "«La integridad de los rectos los encaminará».", "Proverbios 11:3"],
      ["m1-11", 2, "o2", "recordar", "¿A quiénes resiste Dios, según 1 Pedro 5:5?", "A los soberbios", ["A los humildes", "A los pobres", "A los jóvenes"], "Dios resiste a los soberbios, y da gracia a los humildes.", "1 Pedro 5:5"],
      ["m1-12", 2, "o2", "analizar", "¿Por qué en 1 Timoteo 3 Pablo habla más de carácter que de talentos?", "Porque el carácter sostiene al líder en el tiempo", ["Porque los talentos son malos", "Porque no había gente talentosa", "Porque el carácter no se puede cambiar"], "Es necesario que el obispo sea irreprensible.", "1 Timoteo 3:2"],
      ["m1-13", 3, "o3", "recordar", "¿Con qué se ciñó Jesús para lavar los pies de los discípulos?", "Con una toalla", ["Con un manto real", "Con una cuerda", "Con un cinturón de cuero"], "Se quitó su manto, y tomando una toalla, se la ciñó.", "Juan 13:4"],
      ["m1-14", 3, "o3", "comprender", "¿Qué pide Filipenses 2:4?", "No mirar cada uno por lo suyo propio, sino también por lo de los otros", ["Cuidar solo lo propio", "Competir con los demás", "No ayudar a nadie"], "«No mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
      ["m1-15", 3, "o3", "recordar", "Según 1 Pedro 5:3, ¿qué no debe tener el líder sobre los que cuida?", "Señorío", ["Amor", "Paciencia", "Ejemplo"], "No como teniendo señorío sobre los que están a vuestro cuidado.", "1 Pedro 5:3"],
      ["m1-16", 3, "o3", "aplicar", "Un líder usa supuestas revelaciones para que lo obedezcan. ¿Qué es eso?", "Una manipulación, señal de abuso de poder", ["Una forma sana de liderar", "Un don espiritual", "Algo sin importancia"], "Diótrefes amaba el primer lugar entre los hermanos.", "3 Juan 1:9"],
      ["m1-17", 3, "o3", "comprender", "Según 3 Juan 10, ¿qué hacía Diótrefes con los hermanos?", "No los recibía y expulsaba de la iglesia a los que querían recibirlos", ["Los recibía con amor", "Los enviaba a misionar", "Los visitaba"], "No recibe a los hermanos y expulsa de la iglesia a los que quieren recibirlos.", "3 Juan 1:10"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál de estos líderes sigue mejor el modelo de 1 Pedro 5?", "El que sirve con gusto, rinde cuentas y es ejemplo", ["El que exige obediencia ciega", "El que maneja el dinero en secreto", "El que solo sirve si le pagan"], "Siendo ejemplos de la grey.", "1 Pedro 5:3"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hacía Jesús con frecuencia, según Lucas 5:16?", "Se apartaba a lugares desiertos y oraba", ["Organizaba grandes reuniones", "Dormía en el templo", "Visitaba al rey"], "«Mas él se apartaba a lugares desiertos, y oraba».", "Lucas 5:16"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué la oración es el motor del liderazgo?", "Porque el líder depende de Dios para guiar a otros", ["Porque así lo ven los demás", "Porque es una costumbre", "Porque reemplaza el trabajo"], "Entonces oré al Dios de los cielos.", "Nehemías 2:4"],
      ["m2-03", 4, "o4", "aplicar", "Un líder no tiene tiempo para orar ni estudiar la Biblia. ¿Qué debe hacer?", "Reorganizar su agenda, como los apóstoles en Hechos 6", ["Seguir igual", "Dejar la oración para el retiro anual", "Orar solo en público"], "Persistiremos en la oración y en el ministerio de la palabra.", "Hechos 6:4"],
      ["m2-04", 4, "o4", "comprender", "¿Qué es el descanso para el líder?", "Obedecer el ritmo que Dios dio a la vida", ["Pereza", "Falta de fe", "Abandonar el ministerio"], "Venid aparte y descansad un poco.", "Marcos 6:31"],
      ["m2-05", 4, "o4", "recordar", "Según 1 Timoteo 4:12, ¿qué no debía permitir Timoteo?", "Que nadie tuviera en poco su juventud", ["Que nadie lo corrigiera", "Que nadie le preguntara", "Que nadie lo ayudara"], "«Ninguno tenga en poco tu juventud».", "1 Timoteo 4:12"],
      ["m2-06", 4, "o4", "analizar", "¿Por qué cuidarse a sí mismo no es egoísmo para el líder?", "Porque es la condición para cuidar a otros por mucho tiempo", ["Porque los demás no importan", "Porque el líder es más importante", "Porque así evita trabajar"], "Ten cuidado de ti mismo y de la doctrina.", "1 Timoteo 4:16"],
      ["m2-07", 5, "o5", "recordar", "Según el consejo de Jetro, ¿qué asuntos atendería Moisés?", "Los asuntos graves, mientras otros juzgaban los pequeños", ["Ninguno", "Solo los pequeños", "Todos, sin ayuda"], "Todo asunto grave lo traerán a ti, y ellos juzgarán todo asunto pequeño.", "Éxodo 18:22"],
      ["m2-08", 5, "o5", "comprender", "¿Qué hace el buen líder con los dones de su equipo?", "Los descubre y los pone a servir", ["Los ignora", "Lo hace todo él", "Los compara para competir"], "No todos los miembros tienen la misma función.", "Romanos 12:4"],
      ["m2-09", 5, "o5", "aplicar", "Al delegar, ¿qué debes explicar con claridad?", "La tarea, el resultado esperado y hasta dónde llega la autoridad de la persona", ["Nada: que lo descubra sola", "Solo la fecha", "Solo tu opinión de ella"], "Escoge varones capaces y ponlos sobre el pueblo.", "Éxodo 18:21"],
      ["m2-10", 5, "o5", "recordar", "Según Eclesiastés 4:10, ¿qué le pasa al que está solo cuando cae?", "No habrá segundo que lo levante", ["Se levanta más fuerte", "Lo levanta un ángel", "Nada"], "¡Ay del solo! que cuando cayere, no habrá segundo que lo levante.", "Eclesiastés 4:10"],
      ["m2-11", 5, "o5", "comprender", "¿Qué significa que somos miembros los unos de los otros?", "Que nos necesitamos y nos pertenecemos en el cuerpo de Cristo", ["Que cada uno trabaja solo", "Que unos valen más que otros", "Que no hay que ayudarse"], "Somos un cuerpo en Cristo, y todos miembros los unos de los otros.", "Romanos 12:5"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué cuida la unidad de un equipo?", "La comunicación clara, las metas compartidas, la oración juntos y el reconocimiento", ["Los rumores", "Las críticas a espaldas", "El secreto"], "Guardar la unidad del Espíritu en el vínculo de la paz.", "Efesios 4:3"],
      ["m2-13", 6, "o6", "recordar", "¿Cuál es el primer paso de Mateo 18:15 cuando un hermano peca contra ti?", "Hablar con él a solas", ["Llevarlo a la iglesia de inmediato", "Contarlo en las redes", "Romper la relación"], "Repréndele estando tú y él solos; si te oyere, has ganado a tu hermano.", "Mateo 18:15"],
      ["m2-14", 6, "o6", "comprender", "Según Proverbios 15:22, ¿qué pasa con los pensamientos donde no hay consejo?", "Son frustrados", ["Se cumplen mejor", "Se vuelven famosos", "No pasa nada"], "«Los pensamientos son frustrados donde no hay consejo».", "Proverbios 15:22"],
      ["m2-15", 6, "o6", "aplicar", "Según Hechos 15:28, ¿qué une una buena decisión en la iglesia?", "La guía del Espíritu Santo y el discernimiento del grupo", ["La voluntad de uno solo", "La costumbre", "La presión de la mayoría"], "Ha parecido bien al Espíritu Santo, y a nosotros.", "Hechos 15:28"],
      ["m2-16", 6, "o6", "recordar", "¿Qué le pidió Eliseo a Elías antes de que fuera llevado?", "Una doble porción de su espíritu", ["Su manto de oro", "Su casa", "Sus discípulos"], "Te ruego que una doble porción de tu espíritu sea sobre mí.", "2 Reyes 2:9"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué un líder debe formar a otros?", "Para que la obra continúe y se multiplique después de él", ["Para tener ayudantes que lo sirvan", "Porque lo obliga la ley", "Para no trabajar nunca"], "Encarga a hombres fieles que sean idóneos para enseñar también a otros.", "2 Timoteo 2:2"],
      ["m2-18", 6, "o6", "aplicar", "¿Qué puedes hacer desde hoy para terminar bien la carrera?", "Cuidar mi vida con Dios y mi carácter, y formar a otros con fidelidad", ["Buscar el reconocimiento", "Trabajar solo", "Dejar la fe para después"], "He acabado la carrera, he guardado la fe.", "2 Timoteo 4:7"],
    ] as P[]).map(p),
  },
  // las escritas del examen final: una corta (de 3) y un escrito breve (de 2) por intento
  escritas: [
    {
      id: "n3-liderazgo-1-e1",
      tipo: "corta",
      pregunta: "Explica, con Marcos 10:42-45, qué es el liderazgo cristiano y en qué se diferencia del liderazgo del mundo.",
      ideas: [
        { id: "servir", peso: 30, texto: "Que el grande es el que sirve.", formas: ["servi*", "sirv*", "servidor", "siervo"] },
        { id: "mundo", peso: 25, texto: "Que en el mundo los gobernantes se enseñorean de los demás.", formas: ["enseñorean", "ensenorean", "dominar", "dominan", "potestad", "naciones"] },
        { id: "jesus", peso: 25, texto: "El ejemplo de Jesús, que dio su vida en rescate.", formas: ["hijo del hombre", "dio su vida", "dar su vida", "rescate", "ejemplo"] },
        { id: "influir", peso: 10, texto: "Que liderar es influir en otros para que sigan a Cristo.", formas: ["influ*", "guiar", "sigan a cristo", "crecer"] },
      ],
      citas: ["Marcos 10:42-45", "Marcos 10:45", "Marcos 10:43", "Marcos 10:44", "Juan 13:14-15", "1 Pedro 5:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los gobernantes de las naciones se enseñorean de los demás, pero Jesús dijo que entre sus discípulos no será así: el que quiera ser grande será servidor de todos (Marcos 10:43). El liderazgo cristiano es influir en otros para que sigan a Cristo, sirviéndolos, porque el Hijo del Hombre vino para servir y dar su vida en rescate.",
    },
    {
      id: "n3-liderazgo-1-e2",
      tipo: "corta",
      pregunta: "Describe tres cualidades del carácter del líder según 1 Timoteo 3, y explica por qué el carácter va antes que el talento.",
      ideas: [
        { id: "cualidades", peso: 40, texto: "Cualidades de 1 Timoteo 3: irreprensible, sobrio, prudente, decoroso, hospedador, apto para enseñar, con buen testimonio.", formas: ["irreprensible", "sobrio", "prudente", "decoroso", "hospedador", "apto para enseñar", "apto para ensenar", "apacible", "buen testimonio"] },
        { id: "antes", peso: 30, texto: "Por qué el carácter va antes: sostiene la confianza en el tiempo.", formas: ["antes que el talento", "talento", "sostiene", "confianza", "en el tiempo"] },
        { id: "ejemplo", peso: 20, texto: "Un ejemplo o una razón: Saúl y David, la integridad.", formas: ["saul", "david", "corazon", "integridad", "en privado"] },
      ],
      citas: ["1 Timoteo 3:2-7", "1 Timoteo 3:2", "Tito 1:7-9", "Proverbios 11:3", "1 Samuel 16:7", "1 Pedro 5:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Pablo pide que el líder sea irreprensible, sobrio, prudente y apto para enseñar, con buen testimonio y no un neófito (1 Timoteo 3:2-7). El carácter va antes que el talento porque es lo que sostiene la confianza en el tiempo: Saúl tenía estatura, pero David tenía un corazón conforme a Dios. Sin integridad, el talento se derrumba.",
    },
    {
      id: "n3-liderazgo-1-e3",
      tipo: "corta",
      pregunta: "Explica el consejo de Jetro a Moisés y cómo se aplica al trabajo en equipo en la iglesia.",
      ideas: [
        { id: "solo", peso: 25, texto: "Que el trabajo era demasiado pesado para hacerlo solo.", formas: ["pesado", "desfalle*", "agota*", "no podria hacerlo"], negativa: true },
        { id: "delegar", peso: 30, texto: "Escoger personas capaces y temerosas de Dios, y delegar.", formas: ["deleg*", "escoger", "escoge", "capaces", "temerosos de dios", "jefes"] },
        { id: "iglesia", peso: 25, texto: "La aplicación en la iglesia: Hechos 6, los dones y el cuerpo.", formas: ["hechos 6", "siete", "dones", "cuerpo", "equipo", "miembros"] },
        { id: "resultado", peso: 10, texto: "El resultado: la obra crece y otros se forman.", formas: ["crec*", "multiplic*", "forma*", "durar"] },
      ],
      citas: ["Éxodo 18:17-18", "Éxodo 18:17-23", "Éxodo 18:21", "Hechos 6:3-4", "Romanos 12:4-5", "Eclesiastés 4:9-10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jetro le dijo a Moisés que no estaba bien lo que hacía, porque el trabajo era demasiado pesado y no podría hacerlo solo (Éxodo 18:17-18). Le aconsejó escoger hombres capaces y temerosos de Dios para delegar. En la iglesia, como en Hechos 6, el líder reparte el trabajo según los dones del equipo, y así la obra crece.",
    },
    {
      id: "n3-liderazgo-1-e4",
      tipo: "breve",
      pregunta:
        "Explica el modelo de liderazgo de servicio de Jesús (Juan 13 y Marcos 10), el modelo del buen pastor de 1 Pedro 5:2-3 y las señales del abuso de poder, y di cómo lo aplicarás en tu servicio. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "pies", peso: 15, texto: "Jesús lavó los pies de sus discípulos y nos dio ejemplo.", formas: ["lavo los pies", "lavar los pies", "toalla", "ejemplo os he dado"] },
        { id: "servir", peso: 15, texto: "El grande es el que sirve.", formas: ["servi*", "sirv*", "siervo", "servidor"] },
        { id: "pastor", peso: 20, texto: "El buen pastor: voluntariamente, sin ganancia deshonesta, sin señorío, siendo ejemplo.", formas: ["voluntariamente", "ganancia deshonesta", "señorio", "senorio", "grey", "rebaño", "rebano"] },
        { id: "abuso", peso: 20, texto: "Las señales del abuso de poder.", formas: ["abuso", "control*", "manipul*", "diotrefes", "primer lugar", "lealtad"] },
        { id: "cuentas", peso: 15, texto: "Rendir cuentas y no encubrir.", formas: ["rendir cuentas", "transparen*", "supervision", "encubr*", "consultar"] },
        { id: "aplicacion", peso: 15, texto: "Cómo lo aplicará en su servicio.", formas: ["aplic*", "voy a", "mi grupo", "mi equipo", "en mi servicio"] },
      ],
      basta: 85,
      citas: ["Juan 13:14-15", "Juan 13:15", "Marcos 10:42-45", "Marcos 10:43", "Marcos 10:45", "1 Pedro 5:2-3", "1 Pedro 5:3", "3 Juan 1:9", "Filipenses 2:3-5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús enseñó que entre sus discípulos no sería como en las naciones, donde los gobernantes se enseñorean de los demás: el que quiera ser grande será servidor (Marcos 10:43). Él mismo lo mostró la noche antes de morir, cuando se ciñó una toalla y lavó los pies de sus discípulos, y les dijo: ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis (Juan 13:15). Pedro describe al líder como un pastor que cuida la grey de Dios voluntariamente, no por ganancia deshonesta, y no como teniendo señorío sobre los demás, sino siendo ejemplo (1 Pedro 5:2-3). El poder se tuerce cuando se usa para uno mismo, como Diótrefes, que amaba el primer lugar: las señales son controlar, manipular con culpa o miedo, exigir lealtad a la persona y esconder las cosas. La protección es rendir cuentas con transparencia y nunca encubrir un abuso. Lo aplicaré en mi grupo así: voy a servir primero, escuchar a todos, consultar mis decisiones con mi pastor y manejar con transparencia lo que se me confíe.",
    },
    {
      id: "n3-liderazgo-1-e5",
      tipo: "breve",
      pregunta:
        "Describe cómo cuidarás como líder tu vida con Dios, tu descanso y tu familia, y cómo delegarás y formarás a otros. Usa los ejemplos de Moisés, de Jesús o de Pablo y al menos dos citas bíblicas.",
      ideas: [
        { id: "oracion", peso: 20, texto: "La vida con Dios: la oración y la Palabra.", formas: ["orar", "oracion", "palabra", "presencia", "tiempo con dios"] },
        { id: "descanso", peso: 15, texto: "El descanso y los límites.", formas: ["descans*", "limites", "agenda"] },
        { id: "familia", peso: 15, texto: "La familia como primer ministerio.", formas: ["familia", "esposa", "esposo", "hijos", "su casa", "mi casa"] },
        { id: "delegar", peso: 20, texto: "Delegar en el equipo según los dones.", formas: ["deleg*", "jetro", "dones", "repartir", "capaces"] },
        { id: "formar", peso: 20, texto: "Formar a otros que continúen la obra.", formas: ["formar", "timoteo", "josue", "fieles", "continuar", "enseñara tambien", "ensenara tambien"] },
        { id: "ejemplo", peso: 10, texto: "Un ejemplo bíblico: Moisés, Jesús o Pablo.", formas: ["moises", "jesus", "pablo"] },
      ],
      basta: 85,
      citas: ["Éxodo 33:15", "Marcos 1:35", "Marcos 6:31", "1 Timoteo 3:5", "1 Timoteo 4:16", "Éxodo 18:17-18", "Hechos 6:3-4", "2 Timoteo 2:2", "Números 27:18"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Como Moisés, no quiero avanzar sin la presencia de Dios (Éxodo 33:15). Por eso voy a separar cada mañana un tiempo para orar y leer la Palabra antes de empezar el día, como Jesús, que se levantaba de madrugada para orar (Marcos 1:35). También voy a respetar un día de descanso cada semana, porque Jesús llevó a sus discípulos cansados a descansar un poco, y voy a poner límites a mi agenda. Mi familia es mi primer ministerio: cenaré con mi esposa y mis hijos sin el teléfono y oraremos juntos, porque el que no gobierna bien su casa no puede cuidar de la iglesia (1 Timoteo 3:5). En el ministerio no quiero hacerlo todo solo: siguiendo el consejo de Jetro a Moisés, voy a delegar en mi equipo según los dones de cada uno, explicando bien cada tarea y acompañándolos. Además, voy a formar a dos hermanos fieles para que un día dirijan el grupo, como Pablo formó a Timoteo para que enseñara también a otros (2 Timoteo 2:2). Así espero terminar bien la carrera.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 3
  breve: {
    id: "n3-liderazgo-1-b1",
    tipo: "breve",
    pregunta:
      "Evalúa tu propio liderazgo (en tu familia, tu grupo o tu ministerio) a la luz de esta materia: escoge dos fortalezas y dos áreas que necesitas mejorar (por ejemplo, el carácter, el servicio, la vida con Dios, el trabajo en equipo o la formación de otros) y escribe un plan concreto para los próximos tres meses. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "area", peso: 15, texto: "Dónde ejerce su liderazgo.", formas: ["familia", "grupo", "ministerio", "equipo"] },
      { id: "fortalezas", peso: 15, texto: "Dos fortalezas.", formas: ["fortaleza*", "me gusta", "hago bien", "preparo bien"] },
      { id: "mejorar", peso: 20, texto: "Dos áreas para mejorar.", formas: ["mejorar", "debilidad*", "necesito", "me cuesta"] },
      { id: "caracter", peso: 15, texto: "Áreas de la materia: carácter, servicio, vida con Dios, equipo o formación.", formas: ["caracter", "integridad", "humild*", "servir", "sirv*", "orar", "descans*", "deleg*", "formar*"] },
      { id: "plan", peso: 25, texto: "Un plan concreto para tres meses.", formas: ["plan", "tres meses", "cada semana", "cada dia", "voy a"] },
      { id: "rendir", peso: 10, texto: "Rendir cuentas a alguien.", formas: ["rendir cuentas", "le pedire", "mi pastor", "mentor", "que me pregunte"] },
    ],
    basta: 85,
    citas: ["Marcos 10:45", "Marcos 10:43", "1 Timoteo 3:2", "1 Timoteo 4:12", "1 Timoteo 4:16", "Proverbios 11:3", "1 Pedro 5:2-3", "Éxodo 18:17-18", "2 Timoteo 2:2", "Hechos 20:28"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Dirijo un grupo de jóvenes en mi iglesia. Una fortaleza es que me gusta servir: llego temprano, preparo el lugar y visito a los que faltan, como Jesús, que vino para servir (Marcos 10:45). Otra fortaleza es que preparo bien la enseñanza de cada semana. Pero necesito mejorar en dos áreas. La primera es mi vida con Dios: con tanto trabajo, a veces dejo de orar y solo leo la Biblia para preparar la clase, y Pablo pide tener cuidado de uno mismo y de la doctrina (1 Timoteo 4:16). La segunda es el trabajo en equipo: me cuesta delegar y termino agotado, como Moisés antes del consejo de Jetro (Éxodo 18:17-18). Mi plan para los próximos tres meses es este: voy a separar cada día treinta minutos para orar y leer la Biblia por mí mismo, sin preparar nada; cada semana voy a delegar una parte de la reunión en dos jóvenes fieles y los acompañaré para formarlos, como Pablo a Timoteo (2 Timoteo 2:2). Además, le pediré a mi pastor que me pregunte cada mes cómo voy, para rendir cuentas.",
  },
};
