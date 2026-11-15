/**
 * El banco de «Pentateuco y libros históricos» (Nivel 3). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 Génesis y la promesa a Abraham · o2 Éxodo y Levítico: redención, pacto, tabernáculo y santidad ·
 * o3 Números y Deuteronomio · o4 Josué, Jueces y Rut · o5 Samuel, Reyes y Crónicas: el reino y el pacto con David ·
 * o6 Esdras, Nehemías y Ester · o7 el versículo de memoria (Deuteronomio 6:4-5).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n3-pentateuco-historicos-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N3_PENTATEUCO_HISTORICOS: BancoMateria = {
  materia: "n3-pentateuco-historicos",
  repaso: {
    "n3-pentateuco-historicos-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cómo llaman los judíos al Pentateuco?", "La Torá, que significa instrucción", ["El Talmud", "Los Profetas", "Los Escritos"], "Jesús atribuyó estos libros a Moisés y dijo que Moisés escribió de él.", "Juan 5:46"],
      ["1-r2", 1, "o1", "comprender", "¿Qué enseña Génesis 1:27 sobre el ser humano?", "Que varón y hembra fueron creados a imagen de Dios", ["Que el ser humano es un animal más", "Que solo el varón es imagen de Dios", "Que el ser humano se hizo a sí mismo"], "«Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó».", "Génesis 1:27"],
      ["1-r3", 1, "o1", "comprender", "¿Qué tres cosas prometió Dios a Abraham?", "Descendencia, tierra y bendición para todas las familias de la tierra", ["Riquezas, fama y salud", "Un templo, un rey y un ejército", "Una ciudad, un idioma y una torre"], "«Serán benditas en ti todas las familias de la tierra».", "Génesis 12:3"],
    ] as P[]).map(p),
    "n3-pentateuco-historicos-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué respondió Dios cuando Moisés le preguntó su nombre?", "YO SOY EL QUE SOY", ["El Dios de Egipto", "El Señor de los ejércitos", "El Rey de reyes"], "«Y respondió Dios a Moisés: YO SOY EL QUE SOY».", "Éxodo 3:14"],
      ["2-r2", 2, "o2", "comprender", "¿Quién es nuestra pascua, según 1 Corintios 5:7?", "Cristo, que fue sacrificado por nosotros", ["Moisés", "El cordero de cada año", "La ley del Sinaí"], "«Nuestra pascua, que es Cristo, ya fue sacrificada por nosotros».", "1 Corintios 5:7"],
      ["2-r3", 2, "o2", "recordar", "¿Cuál es el lema de Levítico?", "Santos seréis, porque santo soy yo", ["Trabajad seis días", "Ojo por ojo", "Honra a tu padre"], "«Santos seréis, porque santo soy yo Jehová vuestro Dios».", "Levítico 19:2"],
    ] as P[]).map(p),
    "n3-pentateuco-historicos-3": ([
      ["3-r1", 3, "o3", "comprender", "¿Por qué murió en el desierto la generación que salió de Egipto?", "Por su incredulidad: creyó a los espías y no a Dios", ["Por falta de comida", "Por una guerra con Egipto", "Porque Moisés se perdió"], "Solo Josué y Caleb confiaron en que Jehová estaba con ellos.", "Números 14:8-9"],
      ["3-r2", 3, "o3", "recordar", "¿Qué significa Shema?", "Oye", ["Paz", "Santo", "Ley"], "«Oye, Israel: Jehová nuestro Dios, Jehová uno es».", "Deuteronomio 6:4"],
      ["3-r3", 3, "o3", "comprender", "¿Con qué libro respondió Jesús las tres tentaciones del desierto?", "Con palabras de Deuteronomio", ["Con palabras de Isaías", "Con palabras de los Salmos", "Con palabras de Génesis"], "Citó Deuteronomio 8:3, 6:16 y 6:13 diciendo: Escrito está.", "Mateo 4:4"],
    ] as P[]).map(p),
    "n3-pentateuco-historicos-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué decidió Josué al final de su vida?", "Que él y su casa servirían a Jehová", ["Volver a Egipto", "Repartir la tierra a otros pueblos", "Construir un palacio"], "«Yo y mi casa serviremos a Jehová».", "Josué 24:15"],
      ["4-r2", 4, "o4", "comprender", "¿Cuál es el ciclo que se repite en Jueces?", "El pueblo peca, es oprimido, clama, Dios levanta un juez y hay paz por un tiempo", ["El pueblo obedece siempre y prospera", "Dios abandona al pueblo para siempre", "Los jueces gobiernan sin problemas"], "«Y Jehová levantó jueces que los librasen de mano de los que les despojaban».", "Jueces 2:16"],
      ["4-r3", 4, "o4", "recordar", "¿De quién fue bisabuela Rut?", "Del rey David", ["De Moisés", "De Samuel", "De Elías"], "Su hijo Obed fue padre de Isaí, padre de David.", "Rut 4:17"],
    ] as P[]).map(p),
    "n3-pentateuco-historicos-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le dijo Samuel a Saúl cuando desobedeció?", "Que el obedecer es mejor que los sacrificios", ["Que los sacrificios cubren la desobediencia", "Que podía hacer lo que quisiera", "Que sería rey para siempre"], "«Ciertamente el obedecer es mejor que los sacrificios».", "1 Samuel 15:22"],
      ["5-r2", 5, "o5", "comprender", "¿Qué le prometió Dios a David en 2 Samuel 7?", "Una dinastía y un trono afirmados para siempre", ["Que construiría el templo él mismo", "Que no tendría enemigos", "Que nunca pecaría"], "«Y será afirmada tu casa y tu reino para siempre».", "2 Samuel 7:16"],
      ["5-r3", 5, "o5", "comprender", "¿Por qué cayó el reino del norte, según 2 Reyes 17:7?", "Porque los hijos de Israel pecaron contra Jehová su Dios", ["Porque tenían pocos soldados", "Por una sequía", "Porque Judá los atacó"], "«Porque los hijos de Israel pecaron contra Jehová su Dios».", "2 Reyes 17:7"],
    ] as P[]).map(p),
    "n3-pentateuco-historicos-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué rey de Persia permitió el regreso de los judíos?", "Ciro", ["Nabucodonosor", "Faraón", "Herodes"], "Así se cumplió la palabra de Jehová por boca de Jeremías.", "Esdras 1:1"],
      ["6-r2", 6, "o6", "comprender", "¿Cómo enfrentó Nehemías las amenazas al reconstruir el muro?", "Orando a Dios y poniendo guarda de día y de noche", ["Abandonando la obra", "Atacando a sus enemigos", "Pidiendo ayuda a Egipto"], "«Entonces oramos a nuestro Dios, y por causa de ellos pusimos guarda contra ellos de día y de noche».", "Nehemías 4:9"],
      ["6-r3", 6, "o6", "comprender", "¿Qué muestra el libro de Ester, aunque no nombre a Dios?", "Que Dios gobierna la historia y guarda a su pueblo", ["Que Dios abandonó a los judíos", "Que todo pasa por casualidad", "Que la reina era profetisa"], "«¿Y quién sabe si para esta hora has llegado al reino?».", "Ester 4:14"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: Génesis (10)
    ["f01", 1, "o1", "recordar", "¿Qué significa la palabra Torá?", "Instrucción", ["Rey", "Profecía", "Sacrificio"], "Así llaman los judíos a los cinco libros de Moisés, de los que Jesús dijo que Moisés escribió de él.", "Juan 5:46"],
    ["f02", 1, "o1", "comprender", "¿Qué cuentan los capítulos 1 al 11 de Génesis?", "Los comienzos de toda la humanidad: la creación, la caída, el diluvio y Babel", ["La historia de José en Egipto", "La salida de Egipto", "La conquista de Canaán"], "Los capítulos 12 al 50 cuentan la historia de Abraham, Isaac, Jacob y José.", "Génesis 1:1"],
    ["f03", 1, "o1", "comprender", "¿Qué enseña Génesis 1:1 sobre Dios?", "Que Dios existía antes de todo y lo creó todo", ["Que el mundo siempre existió", "Que hay muchos dioses", "Que Dios es parte de la naturaleza"], "«En el principio creó Dios los cielos y la tierra».", "Génesis 1:1"],
    ["f04", 1, "o1", "analizar", "¿Qué consecuencia práctica tiene que el ser humano sea imagen de Dios?", "Que toda persona tiene dignidad, sin importar su origen o su condición", ["Que algunos pueblos valen más que otros", "Que el ser humano no necesita a Dios", "Que podemos hacer lo que queramos con la creación"], "Varón y hembra fueron creados a imagen de Dios.", "Génesis 1:27"],
    ["f05", 1, "o1", "comprender", "¿Cómo han llamado muchos creyentes a la promesa de Génesis 3:15?", "El primer anuncio del evangelio", ["La ley del Sinaí", "El pacto con Noé", "La promesa de la tierra"], "«Pondré enemistad entre ti y la mujer»: el descendiente de la mujer vencerá.", "Génesis 3:15"],
    ["f06", 1, "o1", "recordar", "¿Qué dice Génesis 15:6 de Abraham?", "Que creyó a Jehová, y le fue contado por justicia", ["Que obedeció la ley de Moisés", "Que nunca pecó", "Que construyó un templo"], "«Y creyó a Jehová, y le fue contado por justicia».", "Génesis 15:6"],
    ["f07", 1, "o1", "analizar", "¿Por qué Génesis 12 es la bisagra del libro?", "Porque allí Dios llama a Abraham y le da las promesas que avanzan por toda la Biblia", ["Porque cuenta el diluvio", "Porque allí termina la historia de José", "Porque es el capítulo más largo"], "«Serán benditas en ti todas las familias de la tierra».", "Génesis 12:3"],
    ["f08", 1, "o1", "comprender", "¿Cómo explica Pablo la promesa a Abraham en Gálatas 3:8?", "Como el evangelio anunciado de antemano: en Cristo la bendición llega a las naciones", ["Como una promesa solo para los judíos", "Como una ley que hay que cumplir", "Como una profecía cancelada"], "La Escritura «dio de antemano la buena nueva a Abraham».", "Gálatas 3:8"],
    ["f09", 1, "o1", "analizar", "¿Qué enseña la historia de José sobre la providencia?", "Que Dios gobierna aun el mal que otros hacen para cumplir sus propósitos de bien", ["Que Dios no se ocupa de las familias", "Que el mal siempre gana", "Que José se vengó de su familia"], "«Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien».", "Génesis 50:20"],
    ["f10", 1, "o7", "recordar", "Completa Deuteronomio 6:4: Oye, Israel: Jehová nuestro Dios…", "Jehová uno es", ["es el más fuerte", "es un Dios lejano", "está en el cielo"], "Es el comienzo del Shema y el versículo de memoria de la materia.", "Deuteronomio 6:4"],
    // ---- lección 2: Éxodo y Levítico (10)
    ["f11", 2, "o2", "recordar", "¿Cuáles son las tres partes de Éxodo?", "La liberación de Egipto, el pacto del Sinaí y el tabernáculo", ["La creación, el diluvio y Babel", "La conquista, los jueces y el reino", "El exilio, el regreso y el templo"], "Los capítulos 1 al 18, del 19 al 24 y del 25 al 40.", "Éxodo 19:5-6"],
    ["f12", 2, "o2", "comprender", "¿Qué protegía a los primogénitos en la Pascua?", "La sangre del cordero en las puertas", ["Una espada en la puerta", "El oro de Egipto", "Una oración en voz alta"], "«Veré la sangre y pasaré de vosotros».", "Éxodo 12:13"],
    ["f13", 2, "o2", "analizar", "¿Por qué el pacto del Sinaí no enseña la salvación por obras?", "Porque Dios lo hizo con un pueblo que ya había rescatado", ["Porque Israel nunca recibió leyes", "Porque los mandamientos no importan", "Porque se hizo antes de la Pascua"], "«Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto, de casa de servidumbre».", "Éxodo 20:2"],
    ["f14", 2, "o2", "comprender", "¿Qué sería Israel si guardaba el pacto, según Éxodo 19:6?", "Un reino de sacerdotes, y gente santa", ["Un imperio de guerreros", "Un pueblo sin leyes", "Esclavos de otro rey"], "«Y vosotros me seréis un reino de sacerdotes, y gente santa». Pedro aplica estas palabras a la iglesia.", "Éxodo 19:6"],
    ["f15", 2, "o2", "comprender", "¿Cuál era la meta del tabernáculo?", "Que Dios habitara en medio de su pueblo", ["Guardar el oro de Israel", "Ser un palacio para Moisés", "Atraer a otros pueblos al comercio"], "«Y harán un santuario para mí, y habitaré en medio de ellos».", "Éxodo 25:8"],
    ["f16", 2, "o2", "analizar", "¿Qué relación hay entre el tabernáculo y Juan 1:14?", "Juan dice que el Verbo habitó entre nosotros con una palabra que recuerda el tabernáculo", ["Ninguna", "Que Jesús construyó un tabernáculo", "Que el tabernáculo se llevó a Belén"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
    ["f17", 2, "o2", "recordar", "¿Qué pregunta responde el libro de Levítico?", "Cómo puede un pueblo pecador vivir cerca de un Dios santo", ["Cómo se conquistó Canaán", "Quién escribió los Salmos", "Cuándo vendría el Mesías"], "«Santos seréis, porque santo soy yo Jehová vuestro Dios».", "Levítico 19:2"],
    ["f18", 2, "o2", "comprender", "¿Qué enseñaban los sacrificios del Antiguo Testamento?", "Que el pecado trae muerte y que Dios provee un sustituto", ["Que Dios necesita comida", "Que el pecado no importa", "Que la sangre no tiene valor"], "«La misma sangre hará expiación de la persona».", "Levítico 17:11"],
    ["f19", 2, "o2", "analizar", "¿Cómo se cumple en Cristo el Día de la Expiación?", "Cristo entró una vez para siempre en el Lugar Santísimo con su propia sangre", ["Cristo repite el sacrificio cada año", "Ya no hace falta ninguna expiación", "El sumo sacerdote sigue entrando cada año"], "No por sangre de machos cabríos ni de becerros, sino por su propia sangre.", "Hebreos 9:11-12"],
    ["f20", 2, "o2", "recordar", "¿Qué mandamiento sobre el prójimo está en Levítico 19:18?", "Amarás a tu prójimo como a ti mismo", ["Ojo por ojo, diente por diente", "No hablarás con extranjeros", "Odiarás a tu enemigo"], "«Amarás a tu prójimo como a ti mismo».", "Levítico 19:18"],
    // ---- lección 3: Números y Deuteronomio (10)
    ["f21", 3, "o3", "recordar", "¿Por qué el libro de Números se llama así?", "Por los dos censos del pueblo", ["Porque trata de matemáticas", "Porque cuenta los días de la creación", "Por los números de los Salmos"], "Los censos están en Números 1 y 26.", "Números 1:2"],
    ["f22", 3, "o3", "comprender", "¿Qué pasó en Cades con los doce espías?", "Diez dijeron que no podrían conquistar la tierra, y el pueblo les creyó a ellos y no a Dios", ["Los doce dieron un buen informe", "No volvió ninguno", "Todos se quedaron a vivir en Canaán"], "Josué y Caleb dijeron que Jehová estaba con ellos.", "Números 14:8-9"],
    ["f23", 3, "o3", "recordar", "¿Quiénes de la generación que salió de Egipto entraron en la tierra?", "Josué y Caleb", ["Moisés y Aarón", "Datán y Abiram", "Coré y sus hijos"], "Ellos confiaron en Dios cuando los demás no.", "Números 14:30"],
    ["f24", 3, "o3", "comprender", "¿Qué relación hay entre la serpiente de bronce y Jesús?", "Así como la serpiente fue levantada para dar vida, Jesús fue levantado en la cruz", ["Ninguna", "Jesús también fue mordido", "Jesús destruyó la serpiente de bronce"], "«Como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado».", "Juan 3:14"],
    ["f25", 3, "o3", "aplicar", "¿Qué lección deja la generación del desierto, según 1 Corintios 10:11?", "Que su historia es un ejemplo para que no caigamos en la incredulidad y la murmuración", ["Que ya no tiene nada que enseñarnos", "Que Dios castiga sin razón", "Que hay que vivir en el desierto"], "«Estas cosas les acontecieron como ejemplo, y están escritas para amonestarnos a nosotros».", "1 Corintios 10:11"],
    ["f26", 3, "o3", "comprender", "¿Qué es Deuteronomio?", "Los discursos de Moisés a la nueva generación antes de entrar en la tierra", ["Una ley distinta de la del Sinaí", "La historia de los reyes", "Un libro de cantos"], "Moisés recuerda lo que Dios hizo, renueva el pacto y pone delante la vida y la muerte.", "Deuteronomio 30:19"],
    ["f27", 3, "o3", "recordar", "¿Qué pide el Shema?", "Amar a Jehová con todo el corazón, el alma y las fuerzas, y enseñar sus palabras a los hijos", ["Ofrecer sacrificios cada día", "Viajar a Jerusalén", "Guardar silencio"], "Jesús lo llamó el primero y grande mandamiento.", "Deuteronomio 6:5"],
    ["f28", 3, "o3", "aplicar", "¿Dónde manda Deuteronomio 6:7 hablar de las palabras de Dios?", "En casa, en el camino, al acostarse y al levantarse", ["Solo en el templo", "Solo en las fiestas", "Solo los sacerdotes"], "La fe se enseña en la vida diaria de la familia.", "Deuteronomio 6:7"],
    ["f29", 3, "o3", "comprender", "¿A quién anunció Moisés en Deuteronomio 18:15?", "A un profeta como él, a quien el pueblo debía oír, que es Jesús", ["A Josué solamente", "A un rey de Egipto", "A Samuel solamente"], "«Profeta de en medio de ti, de tus hermanos, como yo, te levantará Jehová tu Dios; a él oiréis».", "Deuteronomio 18:15"],
    ["f30", 3, "o3", "aplicar", "Deuteronomio repite acordarse y no olvidar. ¿Por qué?", "Porque el pueblo que olvida lo que Dios hizo termina olvidándose de Dios", ["Porque Moisés tenía mala memoria", "Porque había que memorizar fechas", "Porque el pasado no importa"], "Moisés pone delante la vida y la muerte: escoge, pues, la vida.", "Deuteronomio 30:19"],
    // ---- lección 4: Josué, Jueces y Rut (10)
    ["f31", 4, "o4", "recordar", "¿Qué ciudad cayó cuando sus muros se derrumbaron sin máquinas de guerra?", "Jericó", ["Hai", "Jerusalén", "Gabaón"], "El pueblo gritó, los sacerdotes tocaron las bocinas y el muro se derrumbó: la victoria era de Dios.", "Josué 6:20"],
    ["f32", 4, "o4", "comprender", "¿Por qué fue derrotado Israel en Hai?", "Por el pecado de Acán, que tomó lo que Dios había prohibido", ["Porque Hai era más fuerte que Jericó", "Porque Josué no quiso pelear", "Porque llovió"], "El pecado de uno afectó a todo el pueblo.", "Josué 7:1"],
    ["f33", 4, "o4", "recordar", "¿Qué dice Josué 21:45 de las promesas de Dios?", "Que no faltó palabra de todas sus buenas promesas: todo se cumplió", ["Que muchas se perdieron", "Que solo se cumplió la mitad", "Que había que esperar otros mil años"], "«No faltó palabra de todas las buenas promesas que Jehová había hecho a la casa de Israel; todo se cumplió».", "Josué 21:45"],
    ["f34", 4, "o4", "analizar", "¿Cómo se entiende la conquista de Canaán?", "Como un juicio único de Dios sobre pueblos cuya maldad había llegado a su colmo, no como un modelo para la iglesia", ["Como un modelo para conquistar territorios hoy", "Como un error de Josué", "Como algo que la Biblia no cuenta"], "«Porque aún no ha llegado a su colmo la maldad del amorreo».", "Génesis 15:16"],
    ["f35", 4, "o4", "comprender", "¿Qué muestra la historia de Rahab?", "Que hubo gracia para una cananea que creyó", ["Que Dios rechaza a los extranjeros", "Que Rahab era israelita", "Que la fe no salva"], "Por la fe Rahab la ramera no pereció juntamente con los desobedientes.", "Hebreos 11:31"],
    ["f36", 4, "o4", "analizar", "¿Por qué el ciclo de los jueces va empeorando?", "Porque cada generación se aleja más de Dios y cada uno hace lo que bien le parece", ["Porque los jueces eran perfectos", "Porque Dios dejó de ser misericordioso", "Porque Israel ya tenía rey"], "«Cada uno hacía lo que bien le parecía».", "Jueces 21:25"],
    ["f37", 4, "o4", "aplicar", "Después de Josué se levantó una generación que no conocía a Jehová. ¿Qué enseña eso hoy?", "Que la fe no se hereda sola: cada generación necesita ser enseñada", ["Que no hace falta enseñar a los jóvenes", "Que la fe se pierde siempre", "Que los padres no tienen responsabilidad"], "Cada generación necesita ser enseñada y discipulada.", "Jueces 2:10"],
    ["f38", 4, "o4", "recordar", "¿Qué le dijo Rut a Noemí?", "Tu pueblo será mi pueblo, y tu Dios mi Dios", ["Vuelvo a mi tierra y a mis dioses", "Busca otra nuera", "Iré a Moab sola"], "«Tu pueblo será mi pueblo, y tu Dios mi Dios».", "Rut 1:16"],
    ["f39", 4, "o4", "comprender", "¿Qué papel tuvo Booz en la historia de Rut?", "El de pariente redentor, que la protegió y la redimió conforme a la ley", ["El de rey de Moab", "El de juez de Israel", "El de enemigo de Noemí"], "Booz redimió la heredad y tomó a Rut por mujer.", "Rut 4:10"],
    ["f40", 4, "o4", "analizar", "¿Qué muestra que Mateo nombre a Rahab y a Rut en la genealogía de Jesús?", "Que la bendición de Dios era también para las naciones", ["Que Mateo se equivocó", "Que Jesús no era judío", "Que las genealogías no importan"], "«Salmón engendró de Rahab a Booz, Booz engendró de Rut a Obed».", "Mateo 1:5"],
    // ---- lección 5: Samuel, Reyes y Crónicas (10)
    ["f41", 5, "o5", "recordar", "¿Qué le dijo Dios a Samuel cuando el pueblo pidió un rey?", "Que no lo habían desechado a él, sino a Dios", ["Que buscara al más alto", "Que el pueblo tenía razón", "Que nunca habría rey"], "«No te han desechado a ti, sino a mí me han desechado, para que no reine sobre ellos».", "1 Samuel 8:7"],
    ["f42", 5, "o5", "comprender", "¿Por qué fue rechazado Saúl?", "Por desobedecer a Dios", ["Por ser muy bajo", "Por no tener hijos", "Por perder una batalla"], "«Ciertamente el obedecer es mejor que los sacrificios».", "1 Samuel 15:22"],
    ["f43", 5, "o5", "recordar", "¿Qué mira Jehová, según 1 Samuel 16:7?", "El corazón", ["La estatura", "La riqueza", "La familia"], "«Pero Jehová mira el corazón».", "1 Samuel 16:7"],
    ["f44", 5, "o5", "comprender", "¿Qué prometió Dios a David en 2 Samuel 7?", "Que su casa y su reino serían afirmados para siempre", ["Que construiría el templo él mismo", "Que no tendría enemigos", "Que su hijo nunca pecaría"], "«Y será afirmada tu casa y tu reino para siempre».", "2 Samuel 7:16"],
    ["f45", 5, "o5", "analizar", "¿En quién se cumple el pacto con David?", "En Jesucristo, a quien Dios dio el trono de David para siempre", ["En Salomón solamente", "En Saúl", "En ningún rey"], "«Y el Señor Dios le dará el trono de David su padre».", "Lucas 1:32"],
    ["f46", 5, "o5", "recordar", "¿Qué le dijo el profeta Natán a David después de su pecado?", "Tú eres aquel hombre", ["Dios no lo vio", "No importa", "Eres el mejor rey"], "«Tú eres aquel hombre».", "2 Samuel 12:7"],
    ["f47", 5, "o5", "recordar", "¿Hacia qué año se dividió el reino de Israel?", "Hacia el 930 a. C.", ["Hacia el 1500 a. C.", "Hacia el 586 a. C.", "Hacia el 30 d. C."], "Después de Salomón, Israel quedó al norte y Judá al sur.", "1 Reyes 12:16"],
    ["f48", 5, "o5", "comprender", "¿Qué preguntó Elías al pueblo en el monte Carmelo?", "Hasta cuándo claudicarían entre dos pensamientos", ["Quién tenía más ofrendas", "Dónde estaba el rey", "Por qué no llovía"], "«¿Hasta cuándo claudicaréis vosotros entre dos pensamientos?».", "1 Reyes 18:21"],
    ["f49", 5, "o5", "recordar", "¿Qué imperio destruyó Jerusalén y el templo en el 586 a. C.?", "Babilonia", ["Asiria", "Egipto", "Roma"], "Quemó la casa de Jehová y la casa del rey; antes, Asiria había conquistado Samaria en el 722 a. C.", "2 Reyes 25:9"],
    ["f50", 5, "o5", "aplicar", "¿Cómo se aplica hoy 2 Crónicas 7:14?", "Se dio a Israel al dedicar el templo, y su principio sigue: la humildad, la oración y el arrepentimiento preceden a la restauración", ["Promete que todo país que ore será rico", "Ya no tiene ninguna enseñanza", "Solo vale para Salomón"], "«Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren».", "2 Crónicas 7:14"],
    // ---- lección 6: Esdras, Nehemías y Ester (10)
    ["f51", 6, "o6", "recordar", "¿En qué año aproximado permitió Ciro el regreso de los judíos?", "En el 538 a. C.", ["En el 722 a. C.", "En el 1000 a. C.", "En el 70 d. C."], "«Para que se cumpliese la palabra de Jehová por boca de Jeremías».", "Esdras 1:1"],
    ["f52", 6, "o6", "comprender", "¿Qué profecía cumplió el decreto de Ciro?", "La de Jeremías sobre los setenta años", ["La de Isaías sobre el siervo sufriente", "La de Daniel sobre las setenta semanas", "La de Malaquías sobre Elías"], "«Cuando en Babilonia se cumplan los setenta años, yo os visitaré».", "Jeremías 29:10"],
    ["f53", 6, "o6", "recordar", "¿Qué profetas animaron a reconstruir el templo?", "Hageo y Zacarías", ["Elías y Eliseo", "Isaías y Jeremías", "Amós y Oseas"], "Profetizaron a los judíos que estaban en Judá y en Jerusalén.", "Esdras 5:1"],
    ["f54", 6, "o6", "comprender", "¿Para qué preparó Esdras su corazón?", "Para inquirir la ley de Jehová, cumplirla y enseñarla", ["Para reconstruir los muros", "Para ser rey", "Para volver a Babilonia"], "«Había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar».", "Esdras 7:10"],
    ["f55", 6, "o6", "recordar", "¿Qué oficio tenía Nehemías en la corte de Persia?", "Copero del rey", ["General del ejército", "Sacerdote del templo", "Escriba de la ley"], "«Porque yo servía de copero al rey».", "Nehemías 1:11"],
    ["f56", 6, "o6", "aplicar", "¿Qué enseña Nehemías 4:9 sobre el servicio a Dios?", "Que se une la oración con el trabajo y la vigilancia", ["Que basta con orar y no trabajar", "Que basta con trabajar y no orar", "Que hay que rendirse ante la oposición"], "«Entonces oramos a nuestro Dios, y por causa de ellos pusimos guarda contra ellos de día y de noche».", "Nehemías 4:9"],
    ["f57", 6, "o6", "recordar", "¿En cuántos días se terminó el muro de Jerusalén?", "En cincuenta y dos días", ["En siete días", "En cuarenta años", "En setenta semanas"], "Fue terminado el muro el veinticinco del mes de Elul.", "Nehemías 6:15"],
    ["f58", 6, "o6", "comprender", "¿Qué se le dijo al pueblo cuando lloraba al oír la ley?", "Que el gozo de Jehová es su fuerza", ["Que siguiera llorando", "Que volviera a Babilonia", "Que la ley no era para ellos"], "«El gozo de Jehová es vuestra fuerza».", "Nehemías 8:10"],
    ["f59", 6, "o6", "recordar", "¿Qué fiesta nació de la liberación narrada en Ester?", "Purim", ["La Pascua", "Pentecostés", "Los Tabernáculos"], "Los judíos decidieron celebrarla cada año.", "Ester 9:26"],
    ["f60", 6, "o6", "analizar", "¿Por qué se dice que Ester muestra la providencia escondida de Dios?", "Porque, sin nombrarlo, el libro muestra que Dios guía cada detalle para guardar a su pueblo", ["Porque Dios no tuvo nada que ver", "Porque Ester era profetisa", "Porque todo fue casualidad"], "«¿Y quién sabe si para esta hora has llegado al reino?».", "Ester 4:14"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Cuántos libros forman el Pentateuco?", "Cinco", ["Siete", "Doce", "Tres"], "De Génesis a Deuteronomio: la ley de Moisés.", "Lucas 24:44"],
      ["m1-02", 1, "o1", "comprender", "¿Qué fórmula marca las secciones de Génesis?", "La que en hebreo es toledot: estas son las generaciones de…", ["En el principio", "Así dice Jehová", "Y aconteció en aquellos días"], "Por ejemplo, «Estas son las generaciones de Noé».", "Génesis 6:9"],
      ["m1-03", 1, "o1", "recordar", "¿Cómo vio Dios todo lo que había hecho, según Génesis 1:31?", "Bueno en gran manera", ["Imperfecto", "Sin terminar", "Malo"], "«Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera».", "Génesis 1:31"],
      ["m1-04", 1, "o1", "comprender", "¿Qué hizo Dios por Adán y Eva después de la caída, según Génesis 3:21?", "Les hizo túnicas de pieles y los vistió", ["Los abandonó", "Los destruyó", "Los dejó en el huerto"], "Es una muestra de su gracia en medio del juicio.", "Génesis 3:21"],
      ["m1-05", 1, "o1", "analizar", "¿Qué muestran las faltas de Abraham, Jacob y los hermanos de José?", "Que la promesa avanza por la fidelidad de Dios, no por la de ellos", ["Que Dios canceló la promesa", "Que no eran parte del pueblo", "Que el pecado no importa"], "Abraham creyó y le fue contado por justicia, aunque no era perfecto.", "Génesis 15:6"],
      ["m1-06", 1, "o1", "recordar", "¿Qué versículo usa Pablo en Romanos 4:3 para enseñar la justificación por la fe?", "Génesis 15:6", ["Génesis 1:1", "Éxodo 20:3", "Levítico 19:2"], "«Y creyó a Jehová, y le fue contado por justicia».", "Génesis 15:6"],
      ["m1-07", 2, "o2", "recordar", "¿Qué cuentan los capítulos 19 al 24 de Éxodo?", "El pacto del Sinaí y los diez mandamientos", ["Las plagas de Egipto", "La construcción del tabernáculo", "La muerte de Moisés"], "«Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto».", "Éxodo 20:2"],
      ["m1-08", 2, "o2", "comprender", "¿Qué modelo de salvación muestra la Pascua?", "Dios libra de la esclavitud por medio de la sangre del cordero", ["Cada uno se salva por su esfuerzo", "Dios salva a los más fuertes", "La salvación se compra"], "«Y veré la sangre y pasaré de vosotros».", "Éxodo 12:13"],
      ["m1-09", 2, "o2", "recordar", "¿Qué pecado cometió el pueblo mientras Moisés estaba en el monte?", "Hizo un becerro de oro", ["Volvió a Egipto", "Mató a Aarón", "Quemó el tabernáculo"], "Aarón hizo de ello un becerro de fundición, en medio de las instrucciones del tabernáculo.", "Éxodo 32:4"],
      ["m1-10", 2, "o2", "comprender", "¿Qué hacía el sumo sacerdote en el Día de la Expiación?", "Entraba una vez al año en el Lugar Santísimo con la sangre del sacrificio", ["Entraba cada día al templo", "Ofrecía solo frutos", "Leía la ley al pueblo"], "Cristo entró una vez para siempre con su propia sangre.", "Hebreos 9:12"],
      ["m1-11", 2, "o2", "aplicar", "¿Qué valor tienen hoy las leyes del culto de Levítico?", "Ya no se practican, pero enseñan la santidad de Dios, la gravedad del pecado y el valor de la sangre de Cristo", ["Hay que ofrecer animales cada semana", "No enseñan nada", "Solo valen para los sacerdotes"], "Con una sola ofrenda hizo perfectos para siempre a los santificados.", "Hebreos 10:14"],
      ["m1-12", 2, "o2", "recordar", "¿Dónde dice: Santos seréis, porque santo soy yo?", "Levítico 19:2", ["Génesis 1:1", "Josué 1:8", "Rut 1:16"], "Es el lema de Levítico.", "Levítico 19:2"],
      ["m1-13", 3, "o3", "recordar", "¿Cuántos años anduvo Israel por el desierto?", "Cuarenta", ["Siete", "Setenta", "Cuatrocientos"], "La generación incrédula murió en el desierto.", "Números 14:33"],
      ["m1-14", 3, "o3", "comprender", "¿Qué tenía que hacer el israelita mordido por una serpiente para vivir?", "Mirar la serpiente de bronce que Moisés levantó", ["Matar una serpiente", "Ofrecer un cordero", "Huir del campamento"], "Jesús comparó su cruz con esa serpiente levantada.", "Números 21:8"],
      ["m1-15", 3, "o3", "recordar", "¿Dónde dio Moisés los discursos de Deuteronomio?", "En las llanuras de Moab, antes de entrar en la tierra", ["En Egipto", "En Jerusalén", "En Babilonia"], "Moisés vio la tierra desde el monte, pero no entró.", "Deuteronomio 34:1"],
      ["m1-16", 3, "o3", "comprender", "¿Qué llamó Jesús el primero y grande mandamiento?", "Amar a Dios con todo el corazón, el alma y la mente", ["No matar", "Guardar el sábado", "Diezmar"], "Jesús citó el Shema de Deuteronomio 6.", "Mateo 22:37-38"],
      ["m1-17", 3, "o3", "aplicar", "¿Qué elección pone Moisés delante del pueblo en Deuteronomio 30:19?", "La vida y la muerte, la bendición y la maldición: escoger la vida", ["Egipto o Canaán", "La guerra o la paz", "El oro o la plata"], "«Escoge, pues, la vida, para que vivas tú y tu descendencia».", "Deuteronomio 30:19"],
      ["m1-18", 3, "o3", "analizar", "¿Por qué Deuteronomio no es una ley nueva?", "Porque repite y explica la ley del Sinaí para la nueva generación", ["Porque no tiene leyes", "Porque es un libro de historia de los reyes", "Porque se escribió en Babilonia"], "Moisés renueva el pacto en las llanuras de Moab y llama a escoger la vida.", "Deuteronomio 30:19"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué le mandó Dios a Josué en Josué 1:9?", "Que se esforzara y fuera valiente, porque Dios estaría con él", ["Que volviera a Egipto", "Que buscara otro líder", "Que hiciera pacto con los cananeos"], "«Mira que te mando que te esfuerces y seas valiente».", "Josué 1:9"],
      ["m2-02", 4, "o4", "comprender", "¿Quiénes fueron algunos de los jueces?", "Débora, Gedeón y Sansón", ["David, Salomón y Saúl", "Pedro, Juan y Santiago", "Esdras, Nehemías y Ester"], "Dios los levantó para librar a su pueblo.", "Jueces 2:16"],
      ["m2-03", 4, "o4", "analizar", "¿Qué necesidad muestra el final de Jueces?", "La de un rey conforme al corazón de Dios y, en último término, la del Rey verdadero", ["La de más jueces", "La de volver a Egipto", "La de tener más ejército"], "«Cada uno hacía lo que bien le parecía».", "Jueces 21:25"],
      ["m2-04", 4, "o4", "recordar", "¿De qué pueblo era Rut?", "De Moab", ["De Egipto", "De Israel", "De Babilonia"], "Los hijos de Noemí tomaron mujeres moabitas; una era Rut.", "Rut 1:4"],
      ["m2-05", 4, "o4", "comprender", "¿Qué palabra hebrea del amor fiel atraviesa el libro de Rut?", "Jésed", ["Shalom", "Torá", "Amén"], "La RV1960 la traduce allí como benevolencia.", "Rut 2:20"],
      ["m2-06", 4, "o4", "aplicar", "¿Qué enseña la decisión de Josué 24:15 a las familias de hoy?", "Que cada familia debe decidir servir a Dios", ["Que solo los líderes deben servir a Dios", "Que la fe se hereda sola", "Que no hay que decidir nada"], "«Yo y mi casa serviremos a Jehová».", "Josué 24:15"],
      ["m2-07", 5, "o5", "recordar", "¿Quién fue el último de los jueces y un gran profeta?", "Samuel", ["Sansón", "Elías", "Natán"], "Ungió a Saúl y después a David.", "1 Samuel 16:13"],
      ["m2-08", 5, "o5", "comprender", "¿Qué salmo expresa el arrepentimiento de David?", "El Salmo 51", ["El Salmo 23", "El Salmo 1", "El Salmo 150"], "Después de que Natán lo confrontó, David dijo: Pequé contra Jehová.", "2 Samuel 12:13"],
      ["m2-09", 5, "o5", "recordar", "¿Qué imperio conquistó el reino del norte en el 722 a. C.?", "Asiria", ["Babilonia", "Persia", "Grecia"], "«Porque los hijos de Israel pecaron contra Jehová su Dios».", "2 Reyes 17:7"],
      ["m2-10", 5, "o5", "comprender", "¿Cómo evalúa el libro de Reyes a cada rey?", "Según su fidelidad: si hizo lo recto o lo malo ante los ojos de Jehová", ["Según sus riquezas", "Según sus victorias", "Según su estatura"], "Es historia contada desde el pacto: los reyes y el pueblo pecaron contra Jehová.", "2 Reyes 17:7"],
      ["m2-11", 5, "o5", "analizar", "¿Qué esperanza deja el final de 2 Reyes?", "Que el rey Joaquín, descendiente de David, salió de la cárcel: la promesa seguía viva", ["Que Babilonia se convirtió", "Que el templo nunca se destruyó", "Ninguna"], "Dios no había olvidado su pacto con David.", "2 Reyes 25:27"],
      ["m2-12", 5, "o5", "comprender", "¿Para quiénes se escribió Crónicas?", "Para los que volvieron del exilio", ["Para los egipcios", "Para la iglesia de Corinto", "Para los reyes de Asiria"], "Llama a buscar a Dios y a renovar la adoración.", "2 Crónicas 7:14"],
      ["m2-13", 6, "o6", "recordar", "¿Quién dirigió a los primeros que volvieron del exilio y comenzaron el templo?", "Zorobabel", ["Nehemías", "Mardoqueo", "Daniel"], "Zorobabel hijo de Salatiel comenzó la obra de la casa de Dios.", "Esdras 3:8"],
      ["m2-14", 6, "o6", "recordar", "¿Hacia qué año se terminó de reconstruir el templo?", "Hacia el 516 a. C.", ["Hacia el 930 a. C.", "Hacia el 445 a. C.", "Hacia el 70 d. C."], "Fue terminada en el sexto año del reinado del rey Darío.", "Esdras 6:15"],
      ["m2-15", 6, "o6", "comprender", "¿Qué hizo Nehemías al saber que los muros estaban en ruinas?", "Lloró, ayunó y oró, y después pidió permiso al rey", ["Se quedó tranquilo en Persia", "Envió dinero y se olvidó", "Culpó a Esdras"], "La reconstrucción empezó de rodillas.", "Nehemías 1:4"],
      ["m2-16", 6, "o6", "aplicar", "¿Qué enseña la lectura de la ley en Nehemías 8?", "Que la renovación del pueblo viene por la Palabra explicada con claridad", ["Que basta con reconstruir muros", "Que la ley no se entiende", "Que solo los sacerdotes deben oírla"], "Los levitas ponían el sentido, de modo que entendiesen la lectura.", "Nehemías 8:8"],
      ["m2-17", 6, "o6", "recordar", "¿Qué rey de Persia aparece en el libro de Ester?", "Asuero", ["Ciro", "Nabucodonosor", "Darío de Media"], "Ester llegó a ser reina en su corte.", "Ester 1:1"],
      ["m2-18", 6, "o6", "analizar", "¿Dónde se ve la providencia de Dios en el libro de Ester?", "En los detalles: una reina en el lugar justo, una noche sin sueño del rey y un decreto que se volvió contra quien lo pensó", ["En los milagros públicos de Ester", "En los profetas que hablaron en el libro", "En ningún lugar"], "Mardoqueo preguntó a Ester si para esta hora había llegado al reino.", "Ester 4:14"],
    ] as P[]).map(p),
  },
  // las escritas del examen final: una corta (de 3) y un escrito breve (de 2) por intento
  escritas: [
    {
      id: "n3-pentateuco-historicos-e1",
      tipo: "corta",
      pregunta: "Explica las tres promesas de Dios a Abraham y cómo se cumplen en Cristo.",
      ideas: [
        { id: "descendencia", peso: 20, texto: "Una descendencia.", formas: ["descendencia", "descendiente*", "simiente", "nacion grande"] },
        { id: "tierra", peso: 20, texto: "Una tierra.", formas: ["tierra"] },
        { id: "bendicion", peso: 25, texto: "Una bendición para todas las familias de la tierra.", formas: ["bendicion*", "benditas", "naciones", "familias"] },
        { id: "cristo", peso: 25, texto: "Que se cumplen en Cristo, por quien la bendición llega a las naciones.", formas: ["cristo", "jesus", "buena nueva", "evangelio"] },
      ],
      citas: ["Génesis 12:1-3", "Génesis 12:3", "Gálatas 3:8", "Gálatas 3:16", "Génesis 15:6", "Génesis 22:18"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios prometió a Abraham una descendencia, una tierra y una bendición para todas las familias de la tierra (Génesis 12:1-3). Esas promesas avanzan por todo el Antiguo Testamento y se cumplen en Cristo, el descendiente de Abraham: por él la bendición llega a todas las naciones. Pablo dice que la Escritura dio de antemano la buena nueva a Abraham.",
    },
    {
      id: "n3-pentateuco-historicos-e2",
      tipo: "corta",
      pregunta: "¿Cómo apuntan a Cristo la Pascua, el tabernáculo y el Día de la Expiación?",
      ideas: [
        { id: "pascua", peso: 30, texto: "La Pascua: la sangre del cordero; Cristo es nuestra pascua.", formas: ["pascua", "cordero"] },
        { id: "tabernaculo", peso: 30, texto: "El tabernáculo: Dios habita en medio de su pueblo; el Verbo habitó entre nosotros.", formas: ["tabernaculo", "habit*", "en medio"] },
        { id: "expiacion", peso: 30, texto: "El Día de la Expiación: Cristo entró una vez para siempre con su propia sangre.", formas: ["expiacion", "lugar santisimo", "sumo sacerdote", "una vez para siempre", "propia sangre"] },
      ],
      citas: ["Éxodo 12:13", "1 Corintios 5:7", "Éxodo 25:8", "Juan 1:14", "Hebreos 9:11-12", "Hebreos 9:12", "Levítico 17:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En la Pascua, la sangre del cordero libró a los primogénitos: Cristo es nuestra pascua (1 Corintios 5:7). En el tabernáculo Dios habitaba en medio de su pueblo; en Jesús, el Verbo habitó entre nosotros. En el Día de la Expiación el sumo sacerdote entraba con sangre al Lugar Santísimo; Cristo entró una vez para siempre con su propia sangre.",
    },
    {
      id: "n3-pentateuco-historicos-e3",
      tipo: "corta",
      pregunta: "Explica el pacto de Dios con David y por qué ningún rey de Israel pudo ser el rey definitivo.",
      ideas: [
        { id: "pacto", peso: 25, texto: "La promesa de una casa y un trono para siempre.", formas: ["pacto", "dinastia", "trono", "para siempre", "linaje"] },
        { id: "cristo", peso: 25, texto: "Que se cumple en Jesús, a quien Dios dio el trono de David.", formas: ["jesus", "cristo", "trono de david", "no tendra fin"] },
        { id: "pecado", peso: 25, texto: "Que los reyes fallaron: Saúl desobedeció, David pecó, Salomón se apartó.", formas: ["peco", "pecado*", "betsabe", "urias", "desobedec*", "se aparto", "fallaron"] },
        { id: "caida", peso: 15, texto: "Que el reino se dividió y cayó en el exilio.", formas: ["dividio", "division", "exilio", "cayo", "babilonia", "asiria"] },
      ],
      citas: ["2 Samuel 7:12-13", "2 Samuel 7:16", "Lucas 1:32-33", "2 Samuel 12:7", "1 Samuel 15:22", "2 Reyes 17:7", "Salmos 51:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios prometió a David una casa, una dinastía, y un trono que sería afirmado para siempre (2 Samuel 7:16). Ningún rey de Israel cumplió esa promesa: Saúl desobedeció, David pecó con Betsabé y Salomón se apartó, y el reino se dividió y cayó en el exilio. La promesa se cumple en Jesús, a quien Dios dio el trono de David.",
    },
    {
      id: "n3-pentateuco-historicos-e4",
      tipo: "breve",
      pregunta:
        "Explica el mensaje de Deuteronomio: a quién se dirigió, qué enseña el Shema, por qué insiste en recordar y cómo lo usó Jesús. Aplícalo a tu vida o a tu familia, con al menos dos citas bíblicas.",
      ideas: [
        { id: "generacion", peso: 15, texto: "Que son los discursos de Moisés a la nueva generación antes de entrar en la tierra.", formas: ["nueva generacion", "llanuras de moab", "antes de entrar", "discursos"] },
        { id: "shema", peso: 20, texto: "El Shema: un solo Dios, amarlo con todo el ser.", formas: ["shema", "oye israel", "uno es", "de todo tu corazon", "amaras a jehova"] },
        { id: "recordar", peso: 15, texto: "Por qué insiste en recordar y no olvidar.", formas: ["record*", "acordar*", "olvid*"] },
        { id: "jesus", peso: 20, texto: "Cómo lo usó Jesús: las tentaciones, el gran mandamiento o el profeta como Moisés.", formas: ["tentacion*", "escrito esta", "primero y grande", "profeta como"] },
        { id: "ensenar", peso: 15, texto: "Enseñar estas palabras a los hijos en la vida diaria.", formas: ["ensenar", "enseñar", "hijos", "en el camino", "al acostarse", "al levantarse"] },
        { id: "aplicacion", peso: 15, texto: "Una aplicación personal o familiar.", formas: ["aplic*", "mi familia", "mi casa", "voy a", "cada noche"] },
      ],
      basta: 85,
      citas: ["Deuteronomio 6:4-9", "Deuteronomio 6:4-5", "Deuteronomio 6:7", "Deuteronomio 8:3", "Deuteronomio 30:19", "Deuteronomio 18:15", "Mateo 4:4", "Mateo 22:37-38"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Deuteronomio reúne los discursos de Moisés a la nueva generación en las llanuras de Moab, antes de entrar en la tierra. No es una ley distinta: Moisés recuerda lo que Dios hizo, explica otra vez la ley y llama al pueblo a escoger la vida (Deuteronomio 30:19). En el centro está el Shema: Oye, Israel: Jehová nuestro Dios, Jehová uno es, y amarás a Jehová tu Dios de todo tu corazón (Deuteronomio 6:4-5). El libro insiste en recordar, porque el pueblo que olvida las obras de Dios termina olvidándose de Dios. Jesús lo usó mucho: respondió las tres tentaciones del desierto con palabras de Deuteronomio, diciendo escrito está (Mateo 4:4), y llamó al Shema el primero y grande mandamiento. Además, Moisés pide enseñar estas palabras a los hijos en casa, en el camino, al acostarse y al levantarse. Lo aplico a mi familia así: voy a leer la Biblia con mis hijos cada noche y a contarles lo que Dios ha hecho por nosotros, para que ellos también lo amen.",
    },
    {
      id: "n3-pentateuco-historicos-e5",
      tipo: "breve",
      pregunta:
        "Compara Jueces y Rut: qué muestra cada libro sobre el pueblo de Dios en la misma época y qué lugar tiene Rut en la historia de la salvación. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "ciclo", peso: 20, texto: "El ciclo de los jueces: pecado, opresión, clamor, liberación y paz.", formas: ["ciclo", "oprim*", "clam*", "levanta un juez", "jueces"] },
        { id: "cadauno", peso: 15, texto: "Que todo empeora y cada uno hace lo que bien le parece.", formas: ["bien le parecia", "no habia rey", "empeora"] },
        { id: "rut", peso: 20, texto: "La fidelidad de Rut, una moabita.", formas: ["fiel*", "fidelidad", "tu pueblo sera mi pueblo", "moabita"] },
        { id: "booz", peso: 15, texto: "Booz como pariente redentor.", formas: ["booz", "redentor", "redimi*", "pariente"] },
        { id: "david", peso: 20, texto: "Que Rut fue antepasada de David y está en la genealogía de Jesús.", formas: ["david", "obed", "isai", "genealogia"] },
        { id: "contraste", peso: 10, texto: "El contraste entre los dos libros.", formas: ["en cambio", "mientras", "misma epoca", "tiempos oscuros", "dos caras"] },
      ],
      basta: 85,
      citas: ["Jueces 2:11-19", "Jueces 2:16", "Jueces 21:25", "Jueces 2:10", "Rut 1:16", "Rut 4:17", "Mateo 1:5", "Rut 2:20"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jueces y Rut ocurren en la misma época, pero muestran dos caras del pueblo de Dios. Jueces cuenta un ciclo que se repite: el pueblo peca, es oprimido por otros pueblos, clama a Dios, Dios levanta un juez que lo libra y hay paz por un tiempo (Jueces 2:16). Con cada vuelta todo empeora, y el libro termina diciendo que no había rey en Israel y que cada uno hacía lo que bien le parecía (Jueces 21:25). En cambio, Rut muestra la fidelidad en tiempos oscuros: una moabita que decide quedarse con Noemí y le dice: Tu pueblo será mi pueblo, y tu Dios mi Dios (Rut 1:16). Booz actúa como pariente redentor y la redime conforme a la ley. El final de Rut le da su lugar en la historia de la salvación: su hijo Obed fue padre de Isaí, padre de David (Rut 4:17), y Mateo la nombra en la genealogía de Jesús. Mientras el pueblo se perdía, Dios preparaba al rey que necesitaba y, al final, a Cristo.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 3
  breve: {
    id: "n3-pentateuco-historicos-b1",
    tipo: "breve",
    pregunta:
      "Escoge uno de los libros de esta materia, de Génesis a Ester, y explica su mensaje central, en qué situación se escribió o sucedió, cómo apunta a Cristo y una enseñanza que vas a aplicar o enseñar. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "libro", peso: 15, texto: "El libro escogido.", formas: ["genesis", "exodo", "levitico", "numeros", "deuteronomio", "josue", "jueces", "rut", "samuel", "reyes", "cronicas", "esdras", "nehemias", "ester"] },
      { id: "mensaje", peso: 20, texto: "Su mensaje central.", formas: ["mensaje", "trata de", "cuenta", "muestra", "enseña", "ensena"] },
      { id: "situacion", peso: 10, texto: "La situación en que se escribió o sucedió.", formas: ["en su tiempo", "epoca", "despues del exilio", "situacion", "contexto", "primeros lectores"] },
      { id: "cristo", peso: 25, texto: "Cómo apunta a Cristo.", formas: ["cristo", "jesus", "mesias", "apunta"] },
      { id: "dios", peso: 10, texto: "Lo que muestra de Dios: su fidelidad, su pacto o su providencia.", formas: ["fiel*", "fidelidad", "providencia", "promesa*", "pacto"] },
      { id: "aplicacion", peso: 20, texto: "Una enseñanza para aplicar o enseñar.", formas: ["aplic*", "voy a", "mi vida", "mi familia", "mi iglesia"] },
    ],
    basta: 85,
    citas: [
      "Génesis 12:1-3", "Génesis 50:20", "Éxodo 12:13", "1 Corintios 5:7", "Levítico 19:2", "Deuteronomio 6:4-5", "Josué 24:15", "Rut 1:16",
      "2 Samuel 7:16", "Lucas 1:32-33", "Esdras 7:10", "Nehemías 4:9", "Nehemías 8:10", "Ester 4:14", "Juan 1:14", "Hebreos 9:12", "Gálatas 3:8",
    ],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí el libro de Nehemías, que cuenta cómo un copero del rey de Persia volvió a Jerusalén, en su tiempo, para reconstruir los muros que seguían en ruinas después del exilio. Su mensaje central es que Dios restaura a su pueblo cuando este une la oración con el trabajo y vuelve a su Palabra. Nehemías lloró, ayunó y oró antes de actuar, y ante las amenazas dijo que oraron a su Dios y pusieron guarda de día y de noche (Nehemías 4:9). El muro se terminó en cincuenta y dos días, pero la verdadera renovación vino cuando Esdras leyó la ley y el pueblo oyó que el gozo de Jehová es su fuerza (Nehemías 8:10). El libro apunta a Cristo porque muestra a un pueblo que todavía esperaba las promesas: Jesús, el hijo de David, es quien edifica de verdad a su iglesia y le da gozo. Dios es fiel a su pacto. Lo voy a aplicar en mi iglesia: antes de empezar el proyecto de evangelismo de nuestro grupo voy a organizar una semana de oración, y después trabajaremos juntos sin rendirnos ante las dificultades.",
  },
};
