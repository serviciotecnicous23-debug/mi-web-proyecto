/**
 * El banco de «Sonido y técnica al servicio del culto» (especialidad Alabanza y adoración). SOLO SERVIDOR: respuestas y
 * claves. Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel
 * de Bloom. Objetivos: o1 el técnico, un servidor · o2 la claridad y la sala · o3 los micrófonos y la consola · o4 el
 * acople, los monitores y el volumen · o5 la proyección, la transmisión y los derechos de autor · o6 la seguridad, el
 * cuidado del equipo y el trabajo en equipo · o7 el versículo de memoria (1 Corintios 14:8).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `alabanza-5-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_ALABANZA_5: BancoMateria = {
  materia: "alabanza-5",
  repaso: {
    "alabanza-5-1": ([
      ["1-r1", 1, "o1", "recordar", "¿A quién llamó Dios por nombre y llenó de su Espíritu para el trabajo del tabernáculo?", "A Bezaleel", ["A Aarón", "A Josué", "A Coré"], "«Mira, yo he llamado por nombre a Bezaleel».", "Éxodo 31:2-5"],
      ["1-r2", 1, "o1", "comprender", "¿Qué enseña 1 Pedro 4:10 sobre el servicio técnico?", "Que cada uno ministra a los otros con el don que recibió", ["Que solo ministran los que predican", "Que los dones son para uno mismo", "Que la técnica no es un don"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
      ["1-r3", 1, "o1", "aplicar", "Un técnico piensa que su servicio no importa porque nadie lo ve. ¿Qué le enseña 1 Corintios 12:22?", "Que los miembros que parecen más débiles son los más necesarios", ["Que tiene razón", "Que solo importan los que están adelante", "Que debe dejar de servir"], "«los miembros del cuerpo que parecen más débiles, son los más necesarios».", "1 Corintios 12:21-22"],
    ] as P[]).map(p),
    "alabanza-5-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué pregunta Pablo sobre la trompeta que da sonido incierto?", "Quién se preparará para la batalla", ["Quién la tocará mejor", "Dónde se guarda", "Cuánto cuesta"], "«Y si la trompeta diere sonido incierto, ¿quién se preparará para la batalla?».", "1 Corintios 14:8"],
      ["2-r2", 2, "o2", "comprender", "¿Cuál es el primer propósito del sonido en la iglesia, según la lección?", "Que la Palabra se entienda y el pueblo pueda cantar unido", ["Que suene lo más fuerte posible", "Que luzca el equipo", "Que la banda brille"], "«¿cómo se entenderá lo que decís?».", "1 Corintios 14:9"],
      ["2-r3", 2, "o2", "aplicar", "¿Por qué el técnico debe caminar la sala durante la prueba de sonido?", "Porque el sonido no se oye igual en todos los lugares", ["Porque así hace ejercicio", "Porque la consola se mueve", "No hace falta"], "«y leían en el libro de la ley de Dios claramente».", "Nehemías 8:8"],
    ] as P[]).map(p),
    "alabanza-5-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué micrófonos necesitan la alimentación fantasma de la consola?", "Los de condensador", ["Los dinámicos", "Ninguno", "Solo los inalámbricos"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
      ["3-r2", 3, "o3", "comprender", "¿Qué ajusta la ganancia de un canal?", "Cuánta señal entra de cada micrófono", ["El color del sonido", "La luz de la plataforma", "El volumen de la transmisión"], "«como obrero que no tiene de qué avergonzarse».", "2 Timoteo 2:15"],
      ["3-r3", 3, "o3", "aplicar", "En la mezcla del culto, ¿qué es lo más importante?", "Que la voz que guía y la letra se entiendan, y la congregación pueda oírse cantar", ["Que la batería suene más fuerte que todo", "Que cada músico se oiga solo", "Que suene como un concierto"], "«¿Has visto hombre solícito en su trabajo? Delante de los reyes estará».", "Proverbios 22:29"],
    ] as P[]).map(p),
    "alabanza-5-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué es el acople?", "Un círculo de sonido que se forma cuando un micrófono capta el sonido de un parlante", ["Un tipo de micrófono", "Un cable especial", "Una canción de alabanza"], "«no mirando cada uno por lo suyo propio».", "Filipenses 2:4"],
      ["4-r2", 4, "o4", "comprender", "¿Para qué sirven los monitores?", "Para que los músicos y los cantantes se oigan en la plataforma", ["Para que la congregación vea la letra", "Para grabar el culto", "Para iluminar"], "«sino cada cual también por lo de los otros».", "Filipenses 2:4"],
      ["4-r3", 4, "o4", "aplicar", "¿Cómo se decide el volumen del culto, según la lección?", "Pensando en todos: ancianos, niños, visitas y que la congregación pueda oírse cantar", ["Al gusto del baterista", "Lo más fuerte posible", "Según la canción de moda"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ] as P[]).map(p),
    "alabanza-5-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le dijo Dios a Habacuc sobre la visión?", "Que la escribiera y la declarara en tablas, para que corriera el que la leyera", ["Que la guardara en secreto", "Que la olvidara", "Que la cantara"], "«Escribe la visión, y declárala en tablas, para que corra el que leyere en ella».", "Habacuc 2:2"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué la iglesia respeta los derechos de autor de los cantos?", "Porque hay que pagar a todos lo que se debe y honrar el trabajo de los autores", ["Porque no hay otra opción", "Porque los cantos no tienen autores", "No hace falta respetarlos"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
      ["5-r3", 5, "o5", "aplicar", "¿Qué se cuida en una transmisión en vivo, según la lección?", "Avisar que se transmite y no mostrar a niños ni a quienes no lo autorizaron", ["Mostrar a todos sin preguntar", "Transmitir las oraciones privadas", "No probar nada antes"], "«al que respeto, respeto».", "Romanos 13:7"],
    ] as P[]).map(p),
    "alabanza-5-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué dice Proverbios 27:23 que hay que conocer con diligencia?", "El estado de las ovejas", ["Las riquezas de los vecinos", "Los secretos del rey", "Las noticias de la ciudad"], "«Sé diligente en conocer el estado de tus ovejas».", "Proverbios 27:23"],
      ["6-r2", 6, "o6", "comprender", "¿En qué orden se encienden y se apagan los parlantes, según la lección?", "Se encienden al final y se apagan primero", ["Se encienden primero y se apagan al final", "Da igual el orden", "No se apagan nunca"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["6-r3", 6, "o6", "aplicar", "¿Qué hacen juntos los técnicos y los músicos antes del culto, según la lección?", "Oran juntos y se ponen de acuerdo en las señales", ["Discuten el volumen", "Se ignoran", "Cada uno trabaja por su lado"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · El técnico es un servidor
    ["f01", 1, "o1", "recordar", "¿De qué llenó Dios a Bezaleel, según Éxodo 31:3?", "Del Espíritu de Dios, en sabiduría, inteligencia, ciencia y todo arte", ["De riquezas", "De fuerza para la guerra", "De miedo"], "«lo he llenado del Espíritu de Dios, en sabiduría y en inteligencia, en ciencia y en todo arte».", "Éxodo 31:2-5"],
    ["f02", 1, "o1", "comprender", "¿Qué enseña el llamado de Bezaleel sobre el trabajo técnico?", "Que, hecho para Dios, también es un llamado y un don", ["Que no tiene nada que ver con Dios", "Que es menos que cantar", "Que solo es para los sacerdotes"], "«Mira, yo he llamado por nombre a Bezaleel».", "Éxodo 31:2-5"],
    ["f03", 1, "o1", "recordar", "¿De qué llenó Dios a los artesanos, según Éxodo 35:35?", "De sabiduría de corazón, para toda obra de arte y de invención", ["De orgullo", "De oro", "De temor"], "«y los ha llenado de sabiduría de corazón, para que hagan toda obra de arte y de invención».", "Éxodo 35:35"],
    ["f04", 1, "o1", "comprender", "¿Qué hace cada uno con el don que recibió, según 1 Pedro 4:10?", "Lo ministra a los otros, como buen administrador de la gracia de Dios", ["Lo guarda para sí", "Lo vende", "Lo esconde"], "«Cada uno según el don que ha recibido, minístrelo a los otros».", "1 Pedro 4:10"],
    ["f05", 1, "o1", "recordar", "¿Qué no puede decir el ojo a la mano, según 1 Corintios 12:21?", "No te necesito", ["Te quiero", "Ven conmigo", "Eres más fuerte"], "«Ni el ojo puede decir a la mano: No te necesito».", "1 Corintios 12:21-22"],
    ["f06", 1, "o1", "analizar", "¿Por qué el técnico es tan necesario como el que canta o el que predica?", "Porque sin un buen sonido la predicación no se entiende y la iglesia no canta unida", ["Porque controla a los demás", "Porque cobra más", "No es necesario"], "«los miembros del cuerpo que parecen más débiles, son los más necesarios».", "1 Corintios 12:21-22"],
    ["f07", 1, "o1", "aplicar", "¿Cómo sirve un técnico de corazón, según la lección?", "Ora por el culto, llega temprano y se mantiene atento todo el tiempo", ["Llega tarde porque nadie lo ve", "Se distrae durante la predicación", "Solo atiende en los cantos"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
    ["f08", 1, "o1", "comprender", "¿Para quién trabaja el técnico, según Colosenses 3:23?", "Para el Señor y no para los hombres", ["Para el director", "Para el público", "Para sí mismo"], "«como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f09", 1, "o1", "evaluar", "¿Cuál de estas actitudes muestra que el servicio técnico es un acto de adoración?", "Servir con cuidado y atención aunque nadie lo note", ["Servir solo cuando hay público", "Buscar reconocimiento", "Quejarse de que nadie aplaude"], "«hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f10", 1, "o7", "recordar", "Completa 1 Corintios 14:8: Y si la trompeta diere sonido incierto…", "¿quién se preparará para la batalla?", ["¿quién la afinará?", "¿quién oirá la canción?", "¿quién la guardará?"], "«Y si la trompeta diere sonido incierto, ¿quién se preparará para la batalla?».", "1 Corintios 14:8"],
    // Lección 2 · El sonido y la sala
    ["f11", 2, "o2", "comprender", "¿Qué enseña 1 Corintios 14:8 sobre el sonido?", "Que un sonido que no se entiende no cumple su propósito", ["Que la trompeta es mejor que la voz", "Que hay que tocar fuerte", "Que la batalla es lo importante"], "«Y si la trompeta diere sonido incierto».", "1 Corintios 14:8"],
    ["f12", 2, "o2", "recordar", "¿Qué pregunta Pablo en 1 Corintios 14:9 si no se da palabra bien comprensible?", "¿Cómo se entenderá lo que decís?", ["¿Quién lo dijo?", "¿Por qué tan bajo?", "¿Dónde se dijo?"], "«si por la lengua no diereis palabra bien comprensible, ¿cómo se entenderá lo que decís?».", "1 Corintios 14:9"],
    ["f13", 2, "o2", "recordar", "¿Cómo estaban los oídos del pueblo cuando Esdras leyó la ley?", "Atentos al libro de la ley", ["Cerrados", "Distraídos", "Tapados por el ruido"], "«y los oídos de todo el pueblo estaban atentos al libro de la ley».", "Nehemías 8:3-4"],
    ["f14", 2, "o2", "recordar", "¿Sobre qué estaba Esdras al leer, según Nehemías 8:4?", "Sobre un púlpito de madera que habían hecho para ello", ["Sobre un carro", "Sobre el muro", "Sobre una roca"], "«Y el escriba Esdras estaba sobre un púlpito de madera que habían hecho para ello».", "Nehemías 8:3-4"],
    ["f15", 2, "o2", "analizar", "¿Qué enseña el púlpito de madera de Esdras al técnico de hoy?", "Que preparar los medios para que todos vean y oigan es un servicio a la Palabra", ["Que hay que usar madera", "Que la técnica no importa", "Que solo importa el lector"], "«un púlpito de madera que habían hecho para ello».", "Nehemías 8:3-4"],
    ["f16", 2, "o2", "comprender", "¿Para qué leían claramente y ponían el sentido, según Nehemías 8:8?", "Para que entendieran la lectura", ["Para terminar rápido", "Para lucirse", "Para que nadie preguntara"], "«de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f17", 2, "o2", "comprender", "¿Qué pasa cuando el sonido rebota demasiado en la sala, según la lección?", "Se mezcla y cuesta entender", ["Suena más claro", "Se apaga solo", "No pasa nada"], "«Y leían en el libro de la ley de Dios claramente».", "Nehemías 8:8"],
    ["f18", 2, "o2", "comprender", "¿Qué superficies absorben el sonido y bajan el eco, según la lección?", "Las cortinas, las alfombras y la gente", ["Las paredes de vidrio", "Los pisos de cerámica vacíos", "Los techos de metal"], "«de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f19", 2, "o2", "aplicar", "¿Hacia dónde deben apuntar los parlantes?", "Hacia la gente, no a las paredes ni a los micrófonos", ["Hacia el techo", "Hacia la plataforma", "Hacia los micrófonos"], "«¿cómo se entenderá lo que decís?».", "1 Corintios 14:9"],
    ["f20", 2, "o2", "evaluar", "¿Cuál es la mejor manera de saber cómo llega el sonido a la congregación?", "Caminar la sala y escuchar desde varios lugares", ["Escuchar solo desde la consola", "Preguntar solo a los músicos", "Subir el volumen y esperar"], "«y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    // Lección 3 · Los micrófonos y la consola
    ["f21", 3, "o3", "recordar", "¿Qué dice Proverbios 22:29 del hombre solícito en su trabajo?", "Que estará delante de los reyes", ["Que será pobre", "Que estará solo", "Que no lo verán"], "«¿Has visto hombre solícito en su trabajo? Delante de los reyes estará».", "Proverbios 22:29"],
    ["f22", 3, "o3", "comprender", "¿Qué tipo de micrófono es resistente, menos sensible y muy usado para las voces en la plataforma?", "El dinámico", ["El de condensador", "El de contacto", "Ninguno"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
    ["f23", 3, "o3", "comprender", "¿Para qué se suelen usar los micrófonos de condensador, según la lección?", "Para coros o instrumentos acústicos, porque son más sensibles", ["Para gritar", "Solo para la batería", "Para la transmisión de video"], "«como obrero que no tiene de qué avergonzarse».", "2 Timoteo 2:15"],
    ["f24", 3, "o3", "aplicar", "¿Por qué conviene cantar cerca del micrófono?", "Porque suena más claro y capta menos ruido de la sala", ["Porque se ve mejor", "Porque así no hace falta consola", "Porque produce acople"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
    ["f25", 3, "o3", "aplicar", "¿Cuándo se ajusta la ganancia, según la lección?", "Primero, con la persona cantando o hablando como lo hará en el culto", ["Al final del culto", "Nunca", "Solo si alguien se queja"], "«como obrero que no tiene de qué avergonzarse».", "2 Timoteo 2:15"],
    ["f26", 3, "o3", "comprender", "¿Para qué sirve la ecualización?", "Para realzar o recortar graves, medios y agudos y que cada sonido sea claro", ["Para encender las luces", "Para grabar", "Para cambiar las diapositivas"], "«que usa bien la palabra de verdad».", "2 Timoteo 2:15"],
    ["f27", 3, "o3", "comprender", "¿Qué hacen los envíos de la consola?", "Mandan una mezcla distinta a los monitores de la plataforma", ["Envían mensajes al celular", "Apagan la consola", "Graban el culto"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
    ["f28", 3, "o3", "analizar", "¿Qué diferencia hay entre la mezcla de un concierto y la del culto, según la lección?", "En el culto la letra y la voz que guía deben entenderse y la congregación debe oírse cantar", ["No hay diferencia", "En el culto todo debe sonar más fuerte", "En el culto los instrumentos tapan a las voces"], "«que usa bien la palabra de verdad».", "2 Timoteo 2:15"],
    ["f29", 3, "o3", "evaluar", "Los instrumentos tapan a la voz que guía y la iglesia no entiende la letra. ¿Qué debe hacer el técnico?", "Equilibrar la mezcla para que la voz y la letra se entiendan", ["Subir todo el volumen", "Apagar la voz", "Dejarlo así"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
    ["f30", 3, "o3", "aplicar", "¿Qué pide 2 Timoteo 2:15 que el técnico aplique a su servicio?", "Ser un obrero que no tiene de qué avergonzarse: estudiar, practicar y aprender", ["No esforzarse", "Delegar todo", "Esperar que otros arreglen los errores"], "«Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse».", "2 Timoteo 2:15"],
    // Lección 4 · Los monitores, el acople y el volumen
    ["f31", 4, "o4", "comprender", "¿Qué produce el acople?", "Un pitido o un zumbido", ["Un silencio total", "Un sonido más claro", "Una mezcla perfecta"], "«no mirando cada uno por lo suyo propio».", "Filipenses 2:4"],
    ["f32", 4, "o4", "aplicar", "¿Cuál de estas acciones previene el acople?", "No poner los micrófonos frente a los parlantes", ["Subir al máximo la ganancia", "Apuntar los parlantes a los micrófonos", "Dejar abiertos todos los micrófonos"], "«sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f33", 4, "o4", "aplicar", "Aparece un acople en medio de la oración. ¿Qué hace el técnico?", "Baja enseguida el canal o el envío que lo provoca", ["Sube el volumen", "Sale de la sala", "Espera a que se vaya solo"], "«no mirando cada uno por lo suyo propio».", "Filipenses 2:4"],
    ["f34", 4, "o4", "aplicar", "¿Qué conviene pedir a quien habla muy bajo, en lugar de subir mucho el volumen?", "Que se acerque al micrófono", ["Que grite", "Que deje de hablar", "Que use dos micrófonos"], "«sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f35", 4, "o4", "comprender", "¿Qué pasa si los monitores suenan demasiado fuerte?", "También llegan a la sala y pueden provocar acople", ["Mejora el sonido de la sala", "No pasa nada", "Se apagan solos"], "«no mirando cada uno por lo suyo propio».", "Filipenses 2:4"],
    ["f36", 4, "o4", "recordar", "¿A qué compara Pablo al que no tiene amor, en 1 Corintios 13:1?", "A metal que resuena o címbalo que retiñe", ["A una trompeta afinada", "A un arpa dulce", "A un coro"], "«vengo a ser como metal que resuena, o címbalo que retiñe».", "1 Corintios 13:1"],
    ["f37", 4, "o4", "analizar", "¿Qué relación hay entre 1 Corintios 13:1 y el volumen del culto, según la lección?", "El ruido sin amor no edifica; el sonido pensado con amor por todos, sí", ["Que hay que tocar címbalos", "Que el volumen alto es amor", "No tiene relación"], "«y no tengo amor, vengo a ser como metal que resuena».", "1 Corintios 13:1"],
    ["f38", 4, "o4", "comprender", "¿Qué puede pasar con un volumen muy alto durante mucho tiempo?", "Puede dañar el oído y hacer que el pueblo deje de cantar", ["Mejora la adoración", "Nada", "Hace que todos canten más"], "«sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f39", 4, "o4", "evaluar", "¿Cuál es el volumen correcto, según la lección?", "El que ayuda a cantar a todos, de la abuela al joven", ["El que pide el baterista", "El más alto posible", "El más bajo posible"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    ["f40", 4, "o4", "aplicar", "¿Qué hace el técnico con los micrófonos que no se están usando?", "Los baja o los silencia", ["Los deja abiertos", "Los sube al máximo", "Los apunta a los parlantes"], "«sino cada cual también por lo de los otros».", "Filipenses 2:4"],
    // Lección 5 · Proyección, transmisión y derechos de autor
    ["f41", 5, "o5", "comprender", "¿Qué enseña Habacuc 2:2 sobre lo que se proyecta?", "Que debe escribirse claro para que se lea fácil y a tiempo", ["Que debe esconderse", "Que no importa la ortografía", "Que debe tener muchas líneas"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ["f42", 5, "o5", "aplicar", "¿Cuál de estos criterios es bueno para la proyección?", "Letra grande, clara y con buen contraste con el fondo", ["Letra pequeña y decorada", "Muchas líneas por pantalla", "Colores parecidos al fondo"], "«para que corra el que leyere en ella».", "Habacuc 2:2"],
    ["f43", 5, "o5", "aplicar", "¿Cuándo se cambia la diapositiva de la letra, según la lección?", "Un poco antes de que se cante la línea", ["Después de que se cantó", "Al final de la canción", "Nunca"], "«para que corra el que leyere en ella».", "Habacuc 2:2"],
    ["f44", 5, "o5", "recordar", "¿Qué manda Romanos 13:7?", "Pagar a todos lo que se debe: tributo, impuesto, respeto y honra", ["No pagar a nadie", "Pagar solo a los amigos", "Guardar el dinero"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ["f45", 5, "o5", "comprender", "¿Qué puede requerir permisos o licencias, según la lección?", "Proyectar letras, grabar o transmitir cantos", ["Orar en el culto", "Leer la Biblia", "Saludar a las visitas"], "«al que respeto, respeto; al que honra, honra».", "Romanos 13:7"],
    ["f46", 5, "o5", "recordar", "¿Qué organización se menciona en la lección como ejemplo de licencias para iglesias?", "CCLI", ["La ONU", "La FIFA", "La NASA"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ["f47", 5, "o5", "aplicar", "¿Qué se cuida en una transmisión durante la oración por personas y situaciones privadas?", "La privacidad: esos momentos no se exponen", ["Se transmiten con primer plano", "Se graban para publicarlos", "Se anuncian los nombres"], "«al que respeto, respeto».", "Romanos 13:7"],
    ["f48", 5, "o5", "evaluar", "¿Cuál de estas afirmaciones sobre la transmisión es correcta, según la lección?", "Sirve, pero no reemplaza la comunión de la iglesia reunida", ["Reemplaza a la iglesia reunida", "No necesita pruebas", "Puede mostrar a cualquiera sin permiso"], "«al que honra, honra».", "Romanos 13:7"],
    ["f49", 5, "o5", "analizar", "¿Por qué respetar los derechos de autor también es un testimonio?", "Porque honra el trabajo de los autores y muestra integridad", ["Porque nadie lo nota", "Porque es más barato", "No es un testimonio"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ["f50", 5, "o5", "aplicar", "¿Qué se revisa antes del culto en la proyección?", "Los textos bíblicos y las letras, sin faltas de ortografía", ["Solo los colores", "Nada", "Solo el fondo"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    // Lección 6 · Seguridad, mantenimiento y trabajo en equipo
    ["f51", 6, "o6", "comprender", "¿Qué vale más que el equipo, según la lección?", "Las personas", ["La consola", "Los parlantes", "Los cables"], "«Sé diligente en conocer el estado de tus ovejas».", "Proverbios 27:23"],
    ["f52", 6, "o6", "aplicar", "¿Cuál de estas normas de seguridad enseña la lección?", "Cables ordenados y asegurados, para que nadie tropiece", ["Cables sueltos por el pasillo", "Extensiones dañadas", "Bebidas sobre la consola"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f53", 6, "o6", "aplicar", "¿Dónde se ponen el agua y las bebidas?", "Lejos de la consola", ["Sobre la consola", "Junto a los enchufes", "Encima de los parlantes"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f54", 6, "o6", "comprender", "¿Qué hace el técnico al aplicar Proverbios 27:23 al equipo?", "Conoce su estado: guarda bien los cables, limpia, revisa y lleva un inventario", ["Lo usa sin revisarlo", "Lo presta sin control", "Lo guarda sucio"], "«Sé diligente en conocer el estado de tus ovejas, Y mira con cuidado por tus rebaños».", "Proverbios 27:23"],
    ["f55", 6, "o6", "recordar", "¿Qué dijo Jesús del que es fiel en lo muy poco?", "Que también en lo más es fiel", ["Que nunca crecerá", "Que pierde el tiempo", "Que es injusto"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    ["f56", 6, "o6", "analizar", "¿Por qué un cable bien guardado también es fidelidad?", "Porque la fidelidad se ve en lo pequeño", ["Porque los cables son caros", "Porque nadie lo ve", "No tiene relación con la fidelidad"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    ["f57", 6, "o6", "aplicar", "¿Para qué llega temprano el equipo técnico?", "Para la prueba de sonido", ["Para irse antes", "Para tomar café", "No hace falta llegar temprano"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f58", 6, "o6", "aplicar", "¿Cómo se piden las indicaciones entre técnicos y músicos?", "Con amabilidad, nunca con gritos ni gestos de enojo", ["A gritos", "Con gestos de enojo", "No se piden"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f59", 6, "o6", "evaluar", "¿Por qué hay que formar a nuevos técnicos?", "Para que el servicio no dependa de una sola persona", ["Para tener menos trabajo siempre", "Para competir", "No hace falta"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    ["f60", 6, "o6", "evaluar", "¿Cuál de estos equipos técnicos sirve como enseña la lección?", "El que llega temprano, acuerda las señales con el director, ora con los músicos y forma a otros", ["El que llega al comenzar el culto", "El que no habla con los músicos", "El que trabaja solo y no enseña a nadie"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿De qué tribu era Bezaleel?", "De Judá", ["De Leví", "De Benjamín", "De Dan"], "«Bezaleel hijo de Uri, hijo de Hur, de la tribu de Judá».", "Éxodo 31:2-5"],
      ["m1-02", 1, "o1", "recordar", "¿En qué materiales trabajaba Bezaleel, según Éxodo 31:4?", "En oro, en plata y en bronce", ["Solo en barro", "En hierro y acero", "En papel"], "«para trabajar en oro, en plata y en bronce».", "Éxodo 31:2-5"],
      ["m1-03", 1, "o1", "comprender", "¿Qué tienen en común Bezaleel y el técnico de sonido de hoy?", "Los dos ponen un don técnico al servicio de la adoración", ["Los dos trabajan con oro", "Los dos son sacerdotes", "Ninguna"], "«y lo he llenado del Espíritu de Dios, en sabiduría y en inteligencia».", "Éxodo 31:2-5"],
      ["m1-04", 1, "o1", "recordar", "¿Cómo debemos administrar los dones, según 1 Pedro 4:10?", "Como buenos administradores de la multiforme gracia de Dios", ["Como dueños", "Como si fueran nuestros", "Escondiéndolos"], "«como buenos administradores de la multiforme gracia de Dios».", "1 Pedro 4:10"],
      ["m1-05", 1, "o1", "aplicar", "¿Qué hace un técnico durante la predicación, según la lección?", "Se mantiene atento a los micrófonos y al sonido", ["Se va a tomar café", "Apaga la consola", "Mira el celular"], "«hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
      ["m1-06", 1, "o7", "recordar", "¿Dónde está el versículo de memoria de esta materia?", "1 Corintios 14:8", ["Éxodo 31:3", "Habacuc 2:2", "Lucas 16:10"], "«Y si la trompeta diere sonido incierto».", "1 Corintios 14:8"],
      ["m1-07", 2, "o2", "recordar", "¿Desde cuándo y hasta cuándo leyó Esdras el libro de la ley?", "Desde el alba hasta el mediodía", ["Toda la noche", "Una hora", "Tres días"], "«desde el alba hasta el mediodía».", "Nehemías 8:3-4"],
      ["m1-08", 2, "o2", "comprender", "¿Cómo leían el libro de la ley, según Nehemías 8:8?", "Claramente, poniendo el sentido", ["En voz baja", "Rápido", "Sin explicar"], "«Y leían en el libro de la ley de Dios claramente, y ponían el sentido».", "Nehemías 8:8"],
      ["m1-09", 2, "o2", "comprender", "¿Qué camino recorre el sonido en el sistema de la iglesia, según la lección?", "De la voz o el instrumento al micrófono, de la consola a los parlantes", ["De los parlantes al micrófono", "De la consola a la voz", "Del proyector a la consola"], "«¿cómo se entenderá lo que decís?».", "1 Corintios 14:9"],
      ["m1-10", 2, "o2", "aplicar", "Una sala vacía y de paredes duras tiene mucho eco. ¿Qué la ayudaría, según la lección?", "Cortinas, alfombras o materiales que absorban el sonido", ["Más paredes de vidrio", "Más volumen", "Quitar las cortinas"], "«de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["m1-11", 2, "o2", "evaluar", "¿Qué hace un técnico responsable que tiene un sistema nuevo?", "Lee su manual y aprende de quien ya lo conoce", ["Prueba al azar durante el culto", "No lo usa nunca", "Espera que otros lo arreglen"], "«Y leían en el libro de la ley de Dios claramente».", "Nehemías 8:8"],
      ["m1-12", 2, "o2", "analizar", "¿Por qué se dice que el mejor sonido es el que nadie nota?", "Porque todo se entiende y la atención queda en Dios y en su Palabra", ["Porque está apagado", "Porque es muy bajo", "Porque nadie escucha"], "«¿cómo se entenderá lo que decís?».", "1 Corintios 14:9"],
      ["m1-13", 3, "o3", "recordar", "¿Qué tipo de micrófono necesita alimentación fantasma?", "El de condensador", ["El dinámico", "Todos", "Ninguno"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
      ["m1-14", 3, "o3", "comprender", "¿Qué controla la mezcla?", "El volumen de cada canal en relación con los otros", ["La luz", "La proyección", "La ganancia de la transmisión"], "«como obrero que no tiene de qué avergonzarse».", "2 Timoteo 2:15"],
      ["m1-15", 3, "o3", "aplicar", "¿Hacia dónde se apunta un micrófono?", "A la fuente, lejos de los parlantes y los monitores", ["A los parlantes", "Al techo", "A los monitores"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
      ["m1-16", 3, "o3", "aplicar", "La voz de una cantante suena opaca y se pierde entre los instrumentos. ¿Qué herramienta ayuda?", "La ecualización, para que su voz suene clara", ["Apagar su micrófono", "Subir la batería", "Cambiar las luces"], "«como obrero que no tiene de qué avergonzarse».", "2 Timoteo 2:15"],
      ["m1-17", 3, "o3", "evaluar", "¿Cuál es la meta de la consola en el culto, según la lección?", "Un sonido claro y equilibrado que ayude a cantar a la congregación", ["El sonido más fuerte posible", "Lucir al técnico", "Que suene como una grabación"], "«¿Has visto hombre solícito en su trabajo? Delante de los reyes estará».", "Proverbios 22:29"],
      ["m1-18", 3, "o3", "analizar", "¿Por qué la ganancia se ajusta con la persona cantando como lo hará en el culto?", "Porque así la señal queda bien medida desde el principio", ["Porque es más rápido", "Porque nadie lo nota", "No importa cómo se ajuste"], "«Procura con diligencia presentarte a Dios aprobado».", "2 Timoteo 2:15"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "comprender", "¿Qué otro nombre tiene el acople?", "Retroalimentación", ["Ecualización", "Ganancia", "Mezcla"], "«no mirando cada uno por lo suyo propio».", "Filipenses 2:4"],
      ["m2-02", 4, "o4", "aplicar", "¿Qué recorta la ecualización para evitar el acople, según la lección?", "La frecuencia que se dispara", ["Todas las voces", "La batería", "La letra"], "«sino cada cual también por lo de los otros».", "Filipenses 2:4"],
      ["m2-03", 4, "o4", "comprender", "¿Quiénes hay en la congregación en los que se piensa al decidir el volumen?", "Ancianos, niños, visitas y personas con audífonos", ["Solo los músicos", "Solo los jóvenes", "Nadie"], "«no mirando cada uno por lo suyo propio».", "Filipenses 2:4"],
      ["m2-04", 4, "o4", "aplicar", "Un cantante pide más volumen en su monitor cada pocos minutos. ¿Qué principio recuerda el técnico?", "Lo justo: si los monitores suenan demasiado fuerte, provocan acople", ["Darle todo lo que pida", "Apagarle el monitor", "Subir toda la sala"], "«sino cada cual también por lo de los otros».", "Filipenses 2:4"],
      ["m2-05", 4, "o4", "evaluar", "¿Cuál es la señal de que el volumen está demasiado alto?", "Que la congregación ya no se oye cantar", ["Que suena el bajo", "Que hay luz en la plataforma", "Que la gente está atenta"], "«vengo a ser como metal que resuena».", "1 Corintios 13:1"],
      ["m2-06", 4, "o4", "analizar", "¿Qué tienen en común Filipenses 2:4 y una buena mezcla de monitores?", "Que cada uno piensa también en lo que necesitan los otros", ["Que cada uno pide lo suyo", "Que el más fuerte gana", "No tienen nada en común"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:4"],
      ["m2-07", 5, "o5", "recordar", "¿Para qué dice Habacuc 2:2 que se escriba la visión en tablas?", "Para que corra el que leyere en ella", ["Para guardarla", "Para venderla", "Para esconderla"], "«para que corra el que leyere en ella».", "Habacuc 2:2"],
      ["m2-08", 5, "o5", "aplicar", "¿Cuántas líneas conviene poner en cada pantalla, según la lección?", "Pocas", ["Toda la canción", "Ninguna", "Más de diez"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
      ["m2-09", 5, "o5", "aplicar", "¿Qué se hace antes de empezar una transmisión?", "Se prueban la conexión, el audio y la cámara", ["Nada", "Se apaga el sonido", "Se transmite sin avisar"], "«al que respeto, respeto».", "Romanos 13:7"],
      ["m2-10", 5, "o5", "comprender", "¿A quién se honra al respetar los derechos de autor?", "A los hermanos que escriben los cantos", ["A nadie", "Solo al técnico", "A la iglesia vecina"], "«al que honra, honra».", "Romanos 13:7"],
      ["m2-11", 5, "o5", "evaluar", "Tu iglesia transmite los cultos y proyecta letras sin saber si tiene permisos. ¿Qué es lo correcto?", "Informarse y tener las licencias que correspondan", ["Seguir igual", "Dejar de cantar", "Esconder la transmisión"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
      ["m2-12", 5, "o5", "analizar", "¿Por qué no se debe mostrar a niños en la transmisión sin permiso?", "Para cuidar su privacidad y su protección", ["Porque no se ven bien", "Porque distraen", "No hay razón"], "«al que respeto, respeto».", "Romanos 13:7"],
      ["m2-13", 6, "o6", "aplicar", "¿Qué se debe saber dónde está, por seguridad?", "Los interruptores y la salida de emergencia", ["El café", "La lista de canciones", "El estacionamiento"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m2-14", 6, "o6", "aplicar", "¿Cómo se guardan los cables, según la lección?", "Enrollados sin torcerlos", ["Anudados", "Tirados en una caja", "Doblados con fuerza"], "«Sé diligente en conocer el estado de tus ovejas».", "Proverbios 27:23"],
      ["m2-15", 6, "o6", "comprender", "¿Qué es el equipo de sonido para la iglesia, según la lección?", "Una ofrenda de la iglesia que se cuida como mayordomía", ["Un juguete del técnico", "Algo que no importa", "Propiedad del director"], "«Y mira con cuidado por tus rebaños».", "Proverbios 27:23"],
      ["m2-16", 6, "o6", "aplicar", "¿Qué señales acuerdan el técnico y el director, según la lección?", "Más volumen, menos, repetir o terminar", ["Ninguna", "Solo apagar", "Solo cambiar las luces"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m2-17", 6, "o6", "evaluar", "¿Cuál de estas prácticas muestra fidelidad en lo poco?", "Cambiar a tiempo las pilas de los micrófonos inalámbricos", ["Esperar a que se agoten en el culto", "No revisar nada", "Culpar a otros cuando fallan"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
      ["m2-18", 6, "o6", "analizar", "¿Por qué orar juntos antes del culto une a técnicos y músicos?", "Porque recuerda que todos sirven al mismo Señor", ["Porque dura poco", "Porque es costumbre", "No los une"], "«hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "alabanza-5-e1",
      tipo: "corta",
      pregunta: "Explica, con la Biblia, por qué el servicio técnico en la iglesia es un ministerio.",
      ideas: [
        { id: "bezaleel", peso: 25, texto: "Dios llamó a Bezaleel y lo llenó de su Espíritu para el trabajo del tabernáculo.", formas: ["bezaleel", "tabernaculo", "lleno del espiritu", "todo arte"] },
        { id: "don", peso: 25, texto: "Cada uno ministra a los otros con el don que recibió.", formas: ["el don", "un don", "su don", "sus dones", "ministra*", "administradores"] },
        { id: "necesario", peso: 20, texto: "Los miembros que parecen más débiles son los más necesarios.", formas: ["necesarios", "mas debiles", "no se ve", "nadie ve"] },
        { id: "corazon", peso: 20, texto: "Se sirve de corazón, como para el Señor.", formas: ["de corazon", "para el senor", "adoracion", "como para"] },
      ],
      citas: ["Éxodo 31:2-5", "Éxodo 31:3", "Éxodo 35:35", "1 Pedro 4:10", "1 Corintios 12:21-22", "1 Corintios 12:22", "Colosenses 3:23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios llamó a Bezaleel y lo llenó de su Espíritu, en sabiduría y en todo arte, para el trabajo del tabernáculo (Éxodo 31:3). Cada uno ministra a los otros con el don que recibió, y los miembros que parecen más débiles son los más necesarios. El técnico sirve de corazón, como para el Señor.",
    },
    {
      id: "alabanza-5-e2",
      tipo: "corta",
      pregunta: "Explica cuál es el propósito del sonido en el culto y cómo lo enseña la Biblia.",
      ideas: [
        { id: "entender", peso: 30, texto: "Que la Palabra se entienda.", formas: ["se entienda", "entienda", "comprensible", "entender*"] },
        { id: "trompeta", peso: 20, texto: "La trompeta con sonido incierto no prepara a nadie.", formas: ["trompeta", "sonido incierto", "batalla"] },
        { id: "esdras", peso: 20, texto: "Esdras leyó claramente desde un púlpito para que todos oyeran.", formas: ["esdras", "pulpito", "claramente", "ponian el sentido"] },
        { id: "cantar", peso: 20, texto: "Que la congregación pueda cantar unida.", formas: ["cantar unid*", "congregacion", "todo el pueblo", "pueda cantar"] },
      ],
      citas: ["1 Corintios 14:8", "1 Corintios 14:8-9", "1 Corintios 14:9", "Nehemías 8:3-4", "Nehemías 8:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El sonido existe para que la Palabra se entienda y la congregación pueda cantar unida. Si la trompeta da sonido incierto, nadie se prepara para la batalla (1 Corintios 14:8). En tiempos de Esdras leían claramente desde un púlpito de madera, para que todos oyeran y entendieran.",
    },
    {
      id: "alabanza-5-e3",
      tipo: "corta",
      pregunta: "Explica qué es el acople y cómo se previene.",
      ideas: [
        { id: "que_es", peso: 30, texto: "Un micrófono capta el sonido de un parlante o monitor y se forma un círculo que produce un pitido.", formas: ["capta el sonido", "circulo", "pitido", "zumbido", "retroalimentacion"] },
        { id: "ubicar", peso: 25, texto: "Ubicar bien micrófonos, parlantes y monitores.", formas: ["frente a los parlantes", "ubicar", "lejos de los", "monitores"] },
        { id: "ganancia", peso: 20, texto: "No subir demasiado la ganancia y recortar con la ecualización.", formas: ["ganancia", "ecualiz*", "frecuencia"] },
        { id: "acercarse", peso: 15, texto: "Acercarse al micrófono y silenciar los que no se usan.", formas: ["acerque", "acercarse", "silenciar", "no se usan"] },
      ],
      citas: ["Filipenses 2:4", "1 Corintios 13:1", "1 Corintios 14:40"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El acople ocurre cuando un micrófono capta el sonido de un parlante o de un monitor y se forma un círculo que produce un pitido. Se previene sin poner los micrófonos frente a los parlantes, cuidando la ganancia y la ecualización, pidiendo que se acerquen al micrófono y silenciando los que no se usan (Filipenses 2:4).",
    },
    {
      id: "alabanza-5-e4",
      tipo: "breve",
      pregunta:
        "Varios hermanos mayores dicen que el culto está demasiado fuerte y que ya no oyen la letra, y algunos músicos piden más volumen. Explica, con la Biblia y con lo que aprendiste, cómo resolverías el problema.",
      ideas: [
        { id: "todos", peso: 25, texto: "El volumen se decide pensando en todos, no solo en uno.", formas: ["por lo de los otros", "pensando en todos", "ancianos", "hermanos mayores", "visitas"] },
        { id: "letra", peso: 20, texto: "La letra y la voz que guía deben entenderse.", formas: ["la letra", "se entienda", "voz que guia", "entender"] },
        { id: "oirse", peso: 20, texto: "La congregación tiene que poder oírse cantar.", formas: ["oirse cantar", "se oiga cantar", "la congregacion", "deje de cantar"] },
        { id: "tecnico", peso: 20, texto: "Ajustes técnicos: mezcla, monitores, ecualización y caminar la sala.", formas: ["mezcla", "monitores", "ecualiz*", "caminar la sala", "varios lugares"] },
        { id: "amor", peso: 15, texto: "El ruido sin amor no edifica.", formas: ["sin amor", "metal que resuena", "amor", "dañar el oido"] },
      ],
      basta: 85,
      citas: ["Filipenses 2:4", "1 Corintios 13:1", "1 Corintios 14:8", "1 Corintios 14:9", "Nehemías 8:8", "1 Corintios 14:40"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero recordaría que el volumen se decide pensando en todos, no mirando cada uno por lo suyo propio, sino también por lo de los otros (Filipenses 2:4): en la iglesia hay ancianos, niños y visitas. El propósito del sonido es que se entienda, así que la letra y la voz que guía tienen que oírse claras, y la congregación debe poder oírse cantar; si no, deja de cantar. Caminaría la sala para escuchar desde varios lugares, equilibraría la mezcla para que los instrumentos acompañen y no tapen, y usaría la ecualización. A los músicos les explicaría que el problema muchas veces es de los monitores: les prepararía una mezcla mejor en sus monitores, para que se oigan sin subir el volumen de la sala. Les recordaría que sin amor somos como metal que resuena (1 Corintios 13:1), y que un volumen muy alto durante mucho tiempo puede dañar el oído.",
    },
    {
      id: "alabanza-5-e5",
      tipo: "breve",
      pregunta:
        "Tu iglesia empieza a proyectar las letras y a transmitir el culto por internet. Escribe, con la Biblia, las normas que propondrías para la proyección, la transmisión y los derechos de autor.",
      ideas: [
        { id: "proyeccion", peso: 25, texto: "Proyección clara: letra grande, pocas líneas, sin faltas, a tiempo.", formas: ["letra grande", "pocas lineas", "faltas de ortografia", "contraste", "a tiempo"] },
        { id: "habacuc", peso: 10, texto: "Escribir claro, como en tablas.", formas: ["en tablas", "habacuc", "corra el que"] },
        { id: "privacidad", peso: 25, texto: "Transmisión: avisar y cuidar la privacidad de niños y de quienes no autorizan.", formas: ["avisar", "privacidad", "no autoriz*", "sin permiso"] },
        { id: "derechos", peso: 25, texto: "Respetar los derechos de autor y tener las licencias.", formas: ["derechos de autor", "licencia*", "permiso*", "ccli"] },
        { id: "reunida", peso: 15, texto: "La transmisión no reemplaza a la iglesia reunida.", formas: ["no reemplaza", "iglesia reunida", "comunion"], negativa: true },
      ],
      basta: 85,
      citas: ["Habacuc 2:2", "Romanos 13:7", "Éxodo 20:15", "Hebreos 10:25"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Para la proyección propongo letra grande y clara, con buen contraste, pocas líneas por pantalla y sin faltas de ortografía, y cambiar cada diapositiva a tiempo, porque Dios mandó escribir la visión en tablas para que corra el que leyere (Habacuc 2:2). Revisaremos las letras y los textos bíblicos antes del culto. Para la transmisión, avisaremos siempre que el culto se transmite, cuidaremos la privacidad de los niños y de las personas que no lo autorizaron, y no transmitiremos las oraciones por situaciones privadas. Probaremos la conexión, el audio y la cámara antes de empezar. Además, recordaremos que la transmisión no reemplaza a la iglesia reunida. En cuanto a los derechos de autor, la iglesia se informará y tendrá las licencias necesarias, como las de CCLI, para proyectar y transmitir los cantos, porque debemos pagar a todos lo que debemos (Romanos 13:7) y honrar a los autores.",
    },
  ],
  breve: {
    id: "alabanza-5-b1",
    tipo: "breve",
    pregunta:
      "Escribe un plan para el equipo técnico de tu iglesia: cómo prepararán cada culto, qué normas de seguridad y de cuidado del equipo seguirán, cómo trabajarán con los músicos y cómo formarán a nuevos técnicos, con citas bíblicas.",
    ideas: [
      { id: "preparar", peso: 20, texto: "Preparar cada culto: llegar temprano y probar el sonido.", formas: ["temprano", "prueba de sonido", "probaremos", "prepar*"] },
      { id: "seguridad", peso: 25, texto: "Normas de seguridad.", formas: ["cables ordenados", "seguridad", "enchufes", "bebidas", "salida de emergencia"] },
      { id: "cuidado", peso: 20, texto: "Cuidado del equipo como mayordomía.", formas: ["inventario", "enrollad*", "limpiar*", "revisar*", "mayordomia"] },
      { id: "musicos", peso: 20, texto: "Trabajo con los músicos: señales, amabilidad y oración.", formas: ["señales", "con los musicos", "oraremos", "amabilidad"] },
      { id: "formar", peso: 15, texto: "Formar a nuevos técnicos.", formas: ["nuevos tecnicos", "formaremos", "enseñar a", "formar a"] },
    ],
    basta: 85,
    citas: ["Proverbios 27:23", "Lucas 16:10", "1 Corintios 14:40", "Colosenses 3:23", "Éxodo 31:2-5", "Éxodo 31:3", "1 Pedro 4:10", "2 Timoteo 2:2", "Proverbios 22:29", "1 Corintios 14:8"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Plan del equipo técnico. Primero, cada domingo llegaremos una hora antes para la prueba de sonido con los músicos, y oraremos por el culto, porque servimos de corazón, como para el Señor (Colosenses 3:23). Segundo, seguiremos normas de seguridad: cables ordenados y asegurados, enchufes sin sobrecargar, bebidas lejos de la consola y todos sabrán dónde está la salida de emergencia. Encenderemos los parlantes al final y los apagaremos primero. Tercero, cuidaremos el equipo como mayordomía: guardaremos los cables enrollados, limpiaremos y revisaremos todo una vez al mes con un inventario, porque el que es fiel en lo muy poco también en lo más es fiel (Lucas 16:10). Cuarto, con los músicos acordaremos las señales para subir, bajar, repetir o terminar, y nos hablaremos siempre con amabilidad. Quinto, formaremos a dos nuevos técnicos que servirán junto a nosotros, para que el servicio no dependa de una sola persona. Todo se hará decentemente y con orden (1 Corintios 14:40).",
  },
};
