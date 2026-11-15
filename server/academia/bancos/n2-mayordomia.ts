/**
 * El banco de «Mayordomía cristiana» (Nivel 2). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es la mayordomía y el señorío de Dios · o2 el tiempo, el trabajo y los talentos · o3 el diezmo,
 * las ofrendas, la generosidad y el error de la prosperidad · o4 el trabajo, las deudas, el ahorro y el presupuesto ·
 * o5 el versículo de memoria (1 Corintios 4:2).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n2-mayordomia-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N2_MAYORDOMIA: BancoMateria = {
  materia: "n2-mayordomia",
  repaso: {
    "n2-mayordomia-1": ([
      ["1-r1", 1, "o1", "recordar", "Según Salmos 24:1, ¿de quién es la tierra y su plenitud?", "De Jehová", ["De los reyes", "De los ricos", "De quien la trabaja"], "De Jehová es la tierra y su plenitud; el mundo, y los que en él habitan.", "Salmos 24:1"],
      ["1-r2", 1, "o1", "comprender", "¿Qué es un mayordomo?", "El que administra lo que pertenece a su señor", ["El dueño de la casa", "Un siervo sin responsabilidades", "El que hereda los bienes"], "Somos administradores de lo que Dios nos confía.", "1 Corintios 4:1-2"],
      ["1-r3", 1, "o1", "recordar", "¿Qué se requiere de los administradores, según 1 Corintios 4:2?", "Que cada uno sea hallado fiel", ["Que cada uno sea rico", "Que cada uno sea famoso", "Que todos tengan lo mismo"], "Ahora bien, se requiere de los administradores, que cada uno sea hallado fiel.", "1 Corintios 4:2"],
    ] as P[]).map(p),
    "n2-mayordomia-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué pidió Moisés en Salmos 90:12?", "Que Dios le enseñara a contar sus días", ["Que Dios le diera muchos años", "Que Dios lo hiciera rico", "Que Dios castigara a Egipto"], "Enséñanos de tal modo a contar nuestros días, que traigamos al corazón sabiduría.", "Salmos 90:12"],
      ["2-r2", 2, "o2", "comprender", "¿Cómo debe trabajar el creyente, según Colosenses 3:23?", "De corazón, como para el Señor", ["Solo cuando lo vigilan", "Lo mínimo posible", "Solo para ganar dinero"], "Todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.", "Colosenses 3:23"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué va primero en un plan semanal bíblico?", "El tiempo con Dios: la Palabra, la oración y la iglesia", ["El entretenimiento", "Lo que sobre después del trabajo", "Las redes sociales"], "Mas buscad primeramente el reino de Dios y su justicia: lo importante va primero.", "Mateo 6:33"],
    ] as P[]).map(p),
    "n2-mayordomia-3": ([
      ["3-r1", 3, "o2", "recordar", "¿Cómo repartió el señor los talentos, según Mateo 25:15?", "A cada uno conforme a su capacidad", ["A todos por igual", "Al azar", "Solo al mejor siervo"], "A uno dio cinco talentos, y a otro dos, y a otro uno, a cada uno conforme a su capacidad.", "Mateo 25:15"],
      ["3-r2", 3, "o2", "comprender", "¿Qué premia Dios, según la parábola de los talentos?", "La fidelidad, no la cantidad", ["Solo al que más gana", "La buena suerte", "La comodidad"], "A los dos siervos fieles les dijo lo mismo: Bien, buen siervo y fiel.", "Mateo 25:21"],
      ["3-r3", 3, "o2", "comprender", "¿Por qué enterró su talento el tercer siervo?", "Por miedo, porque veía a su señor como un hombre duro", ["Porque lo había perdido", "Porque se lo robaron", "Porque se lo dio a otro siervo"], "Tuve miedo, y fui y escondí tu talento en la tierra.", "Mateo 25:24-25"],
    ] as P[]).map(p),
    "n2-mayordomia-4": ([
      ["4-r1", 4, "o3", "recordar", "¿Quién dio los diezmos a Melquisedec antes de la ley?", "Abram", ["Moisés", "David", "Salomón"], "Abram le dio los diezmos de todo a Melquisedec, sacerdote del Dios Altísimo.", "Génesis 14:18-20"],
      ["4-r2", 4, "o3", "comprender", "¿Qué dijo Jesús sobre el diezmo en Mateo 23:23?", "Que era necesario, sin dejar lo más importante de la ley", ["Que ya no era necesario", "Que era lo único importante", "Que solo lo daban los fariseos"], "Esto era necesario hacer, sin dejar de hacer aquello: la justicia, la misericordia y la fe.", "Mateo 23:23"],
      ["4-r3", 4, "o3", "comprender", "¿Qué enseña el evangelio de la prosperidad?", "Que dar dinero obliga a Dios a hacernos ricos", ["Que hay que dar con alegría", "Que hay que ayudar a los pobres", "Que Dios suple lo que necesitamos"], "La Biblia reprende a los que toman la piedad como fuente de ganancia.", "1 Timoteo 6:5"],
    ] as P[]).map(p),
    "n2-mayordomia-5": ([
      ["5-r1", 5, "o3", "recordar", "¿Qué hicieron primero los creyentes de Macedonia, según 2 Corintios 8:5?", "Se dieron primeramente al Señor", ["Se hicieron ricos", "Pidieron ayuda a otras iglesias", "Guardaron todo para ellos"], "A sí mismos se dieron primeramente al Señor, y luego a nosotros por la voluntad de Dios.", "2 Corintios 8:5"],
      ["5-r2", 5, "o3", "recordar", "Según 1 Timoteo 6:10, ¿qué es raíz de todos los males?", "El amor al dinero", ["El dinero", "El trabajo", "La pobreza"], "Raíz de todos los males es el amor al dinero.", "1 Timoteo 6:10"],
      ["5-r3", 5, "o3", "comprender", "¿Qué es el contentamiento?", "Estar satisfecho en Cristo, con mucho o con poco", ["No desear nunca nada", "Tener todo lo que uno quiere", "Conformarse con el pecado"], "Pablo aprendió a contentarse en cualquier situación: todo lo puedo en Cristo que me fortalece.", "Filipenses 4:11-13"],
    ] as P[]).map(p),
    "n2-mayordomia-6": ([
      ["6-r1", 6, "o4", "recordar", "¿Qué dice Proverbios 22:7 del que toma prestado?", "Que es siervo del que presta", ["Que es más libre", "Que es más sabio", "Que es bendecido"], "El que toma prestado es siervo del que presta.", "Proverbios 22:7"],
      ["6-r2", 6, "o4", "comprender", "¿Qué enseña la hormiga de Proverbios 6:6-8?", "A trabajar y a prever para el tiempo difícil", ["A no hacer nada", "A gastar todo en el verano", "A vivir sin planes"], "Prepara en el verano su comida, y recoge en el tiempo de la siega su mantenimiento.", "Proverbios 6:6-8"],
      ["6-r3", 6, "o4", "aplicar", "¿Qué va primero en un presupuesto con prioridades bíblicas?", "Dar a Dios el diezmo y las ofrendas", ["Los gustos y los deseos", "Las compras a crédito", "Lo que sobre al final del mes"], "Honra a Jehová con tus bienes, y con las primicias de todos tus frutos.", "Proverbios 3:9"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: Dios es el dueño; nosotros, administradores (8)
    ["f01", 1, "o1", "recordar", "¿Para qué puso Dios al hombre en el huerto de Edén, según Génesis 2:15?", "Para que lo labrara y lo guardase", ["Para que descansara siempre", "Para que lo vendiera", "Para que lo abandonara"], "Lo puso en el huerto de Edén, para que lo labrara y lo guardase.", "Génesis 2:15"],
    ["f02", 1, "o1", "comprender", "¿Qué significa que Dios es el dueño de todo?", "Que lo que tenemos nos fue confiado para administrarlo", ["Que no debemos tener nada", "Que podemos usarlo como queramos", "Que a Dios no le interesa lo material"], "De Jehová es la tierra y su plenitud.", "Salmos 24:1"],
    ["f03", 1, "o1", "recordar", "¿Qué dice Lucas 16:10 del que es fiel en lo muy poco?", "Que también en lo más es fiel", ["Que nunca recibirá más", "Que es un siervo inútil", "Que debe guardar todo"], "El que es fiel en lo muy poco, también en lo más es fiel.", "Lucas 16:10"],
    ["f04", 1, "o1", "comprender", "¿Por qué el cuerpo también es parte de la mayordomía?", "Porque es templo del Espíritu Santo y pertenece a Dios", ["Porque hay que tener buena apariencia", "Porque no importa lo que hagamos con él", "Porque solo el alma es de Dios"], "Vuestro cuerpo es templo del Espíritu Santo, y no sois vuestros.", "1 Corintios 6:19-20"],
    ["f05", 1, "o1", "recordar", "Según Romanos 14:12, ¿qué hará cada uno ante Dios?", "Dará cuenta de sí", ["Recibirá una herencia igual", "Será juzgado por otros", "No tendrá que responder"], "De manera que cada uno de nosotros dará a Dios cuenta de sí.", "Romanos 14:12"],
    ["f06", 1, "o1", "comprender", "Según 1 Corintios 4:1, ¿de qué son administradores los siervos de Cristo?", "De los misterios de Dios", ["Del gobierno del mundo", "De la ley de Moisés", "Del templo de Jerusalén"], "Téngannos los hombres por servidores de Cristo, y administradores de los misterios de Dios.", "1 Corintios 4:1"],
    ["f07", 1, "o1", "aplicar", "Un hermano dice que su dinero es suyo y que a Dios solo le importa lo espiritual. ¿Qué le responderías?", "Que todo es de Dios, también el dinero, y que somos sus administradores", ["Que tiene toda la razón", "Que el dinero es malo en sí", "Que solo los pastores administran"], "De Jehová es la tierra y su plenitud.", "Salmos 24:1"],
    ["f08", 1, "o5", "recordar", "¿Cómo termina 1 Corintios 4:2, el versículo de memoria de esta materia?", "Que cada uno sea hallado fiel", ["Que cada uno sea hallado rico", "Que cada uno dé lo que le sobra", "Que cada uno trabaje sin descanso"], "Ahora bien, se requiere de los administradores, que cada uno sea hallado fiel.", "1 Corintios 4:2"],
    // ---- lección 2: el tiempo y el trabajo (8)
    ["f09", 2, "o2", "recordar", "¿Para qué pedía Moisés aprender a contar sus días?", "Para traer al corazón sabiduría", ["Para vivir más años", "Para ganar más dinero", "Para no trabajar"], "Enséñanos de tal modo a contar nuestros días, que traigamos al corazón sabiduría.", "Salmos 90:12"],
    ["f10", 2, "o2", "recordar", "Según Efesios 5:16, ¿por qué hay que aprovechar bien el tiempo?", "Porque los días son malos", ["Porque el tiempo sobra", "Porque la vida es larga", "Porque hay que descansar mucho"], "Aprovechando bien el tiempo, porque los días son malos.", "Efesios 5:16"],
    ["f11", 2, "o2", "comprender", "¿Qué significa aprovechar bien el tiempo?", "Usarlo para la voluntad de Dios, poniendo primero lo importante", ["Llenar la agenda sin descanso", "Hacer todo muy rápido", "No perder un minuto con la familia"], "No seáis insensatos, sino entendidos de cuál sea la voluntad del Señor.", "Efesios 5:15-17"],
    ["f12", 2, "o2", "comprender", "¿Por qué el trabajo no es un castigo?", "Porque Dios le dio trabajo al hombre antes del pecado", ["Porque es solo para los pobres", "Porque se puede evitar", "Porque no tiene que ver con Dios"], "Dios puso al hombre en el huerto para que lo labrara y lo guardase.", "Génesis 2:15"],
    ["f13", 2, "o2", "recordar", "¿Qué recibe del Señor quien trabaja para Él, según Colosenses 3:24?", "La recompensa de la herencia", ["Un salario doble", "La fama", "Un trabajo más fácil"], "Sabiendo que del Señor recibiréis la recompensa de la herencia, porque a Cristo el Señor servís.", "Colosenses 3:24"],
    ["f14", 2, "o2", "recordar", "¿Qué ritmo de trabajo y descanso estableció Dios, según Éxodo 20:9-10?", "Seis días de trabajo y uno de descanso", ["Trabajar sin descanso", "Tres días de trabajo y cuatro de descanso", "Descansar solo en las fiestas"], "Seis días trabajarás, y harás toda tu obra; mas el séptimo día es reposo para Jehová tu Dios.", "Éxodo 20:9-10"],
    ["f15", 2, "o2", "aplicar", "Una madre trabaja todo el día y siente que no tiene tiempo para Dios. ¿Qué le aconsejarías?", "Separar un tiempo fijo, aunque sea corto, y ordenar la semana con prioridades", ["Dejar a Dios para cuando se jubile", "Dejar de cuidar a sus hijos", "Sentirse culpable sin cambiar nada"], "Contar nuestros días es vivirlos con sabiduría: lo importante primero.", "Salmos 90:12"],
    ["f16", 2, "o2", "aplicar", "¿Qué hábito ayuda a administrar mejor el tiempo?", "Revisar en qué se va el tiempo, sobre todo en las pantallas", ["Dormir menos para hacer más", "Decir que sí a todo", "No planear nada"], "Mirad con diligencia cómo andéis, aprovechando bien el tiempo.", "Efesios 5:15-16"],
    // ---- lección 3: los talentos (8)
    ["f17", 3, "o2", "recordar", "¿Cuántos talentos recibió cada siervo en la parábola?", "Cinco, dos y uno", ["Diez, cinco y uno", "Tres a cada uno", "Uno a cada uno"], "A uno dio cinco talentos, y a otro dos, y a otro uno.", "Mateo 25:15"],
    ["f18", 3, "o2", "recordar", "¿Qué hicieron los siervos que recibieron cinco y dos talentos?", "Negociaron y ganaron otros tantos", ["Los enterraron", "Los gastaron", "Los devolvieron enseguida"], "Los dos negociaron con ellos y duplicaron lo que habían recibido.", "Mateo 25:16-17"],
    ["f19", 3, "o2", "recordar", "¿Qué les dijo el señor a los siervos fieles?", "Bien, buen siervo y fiel; sobre poco has sido fiel, sobre mucho te pondré", ["Ganaste poco, pero está bien", "Devuélveme todo lo que ganaste", "Ahora descansa para siempre"], "Bien, buen siervo y fiel; sobre poco has sido fiel, sobre mucho te pondré; entra en el gozo de tu señor.", "Mateo 25:21"],
    ["f20", 3, "o2", "comprender", "¿Cuál fue el error del siervo que recibió un talento?", "No usar lo que recibió, por miedo", ["Haber recibido poco", "Perder el dinero en un negocio", "Pedir más talentos"], "Tuve miedo, y fui y escondí tu talento en la tierra.", "Mateo 25:25"],
    ["f21", 3, "o2", "recordar", "¿Cómo llamó el señor al siervo que enterró su talento?", "Siervo malo y negligente", ["Siervo prudente", "Siervo humilde", "Siervo cansado"], "Siervo malo y negligente, sabías que siego donde no sembré.", "Mateo 25:26"],
    ["f22", 3, "o2", "comprender", "Según 1 Pedro 4:10, ¿para qué es cada don?", "Para servir a otros como buenos administradores de la gracia de Dios", ["Para presumir ante la iglesia", "Para guardarlo en secreto", "Para ganar dinero con él"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
    ["f23", 3, "o2", "analizar", "¿Qué muestra la parábola sobre cómo vemos a Dios?", "Quien lo ve como un amo duro se paraliza; quien lo conoce, sirve con fidelidad", ["Que Dios reparte de forma injusta", "Que hay que tenerle miedo a Dios", "Que los talentos no importan"], "El tercer siervo dijo: te conocía que eres hombre duro; por eso tuvo miedo.", "Mateo 25:24-25"],
    ["f24", 3, "o2", "aplicar", "Un joven toca bien la guitarra, pero no sirve en la iglesia porque cree que otros tocan mejor. ¿Qué le enseña la parábola?", "Que Dios espera fidelidad con lo que recibió, sin compararse", ["Que hace bien en no servir", "Que debe esperar a ser el mejor", "Que los talentos son para uno mismo"], "A cada uno conforme a su capacidad: Dios premia la fidelidad.", "Mateo 25:15"],
    // ---- lección 4: el diezmo y las ofrendas (7)
    ["f25", 4, "o3", "recordar", "¿Qué prometió Jacob en Bet-el, según Génesis 28:22?", "Dar a Dios el diezmo de todo", ["Construir un palacio", "No volver nunca a su casa", "Ofrecer a su hijo"], "De todo lo que me dieres, el diezmo apartaré para ti.", "Génesis 28:22"],
    ["f26", 4, "o3", "recordar", "¿A quiénes sostenía el diezmo en la ley de Moisés?", "A los levitas, que servían en el tabernáculo", ["A los reyes de Israel", "A los soldados", "A los extranjeros ricos"], "Dios dio a los hijos de Leví todos los diezmos en Israel por heredad, por su ministerio.", "Números 18:21"],
    ["f27", 4, "o3", "recordar", "¿Adónde manda traer los diezmos Malaquías 3:10?", "Al alfolí, para que haya alimento en la casa de Dios", ["Al palacio del rey", "A los pobres de otra nación", "A la plaza del pueblo"], "Traed todos los diezmos al alfolí y haya alimento en mi casa.", "Malaquías 3:10"],
    ["f28", 4, "o3", "comprender", "Según 1 Corintios 16:2, ¿cómo se aparta la ofrenda?", "Con orden, cada primer día de la semana, según haya prosperado", ["Solo cuando sobra", "Una vez en la vida", "Sin ningún orden"], "Cada primer día de la semana cada uno de vosotros ponga aparte algo, según haya prosperado.", "1 Corintios 16:2"],
    ["f29", 4, "o3", "comprender", "¿Para qué sirven las ofrendas según el Nuevo Testamento?", "Para sostener la obra de Dios y ayudar a los necesitados", ["Para enriquecer a los líderes", "Para comprar la salvación", "Para obligar a Dios a bendecir"], "Así también ordenó el Señor a los que anuncian el evangelio, que vivan del evangelio.", "1 Corintios 9:14"],
    ["f30", 4, "o3", "analizar", "¿Por qué el evangelio de la prosperidad es un error?", "Porque trata a Dios como un negocio y toma la piedad como fuente de ganancia", ["Porque Dios no quiere que demos", "Porque el dinero es pecado", "Porque la Biblia prohíbe trabajar"], "Hombres corruptos de entendimiento, que toman la piedad como fuente de ganancia.", "1 Timoteo 6:5"],
    ["f31", 4, "o3", "aplicar", "¿Cómo debe manejar la iglesia las ofrendas?", "Con transparencia, delante del Señor y de los hombres", ["En secreto, sin informar a nadie", "Como quiera el que las cuenta", "Sin ningún control"], "Procurando hacer las cosas honradamente, no solo delante del Señor sino también delante de los hombres.", "2 Corintios 8:20-21"],
    // ---- lección 5: generosidad y contentamiento (7)
    ["f32", 5, "o3", "recordar", "¿Cómo dieron las iglesias de Macedonia, según 2 Corintios 8:3?", "Conforme a sus fuerzas, y aun más allá de sus fuerzas", ["Solo lo que les sobraba", "Nada, porque eran pobres", "Por obligación"], "Con agrado han dado conforme a sus fuerzas, y aun más allá de sus fuerzas.", "2 Corintios 8:3"],
    ["f33", 5, "o3", "comprender", "¿Qué hizo Cristo por nosotros, según 2 Corintios 8:9?", "Se hizo pobre, siendo rico, para enriquecernos", ["Nos hizo ricos en dinero", "Nos pidió que fuéramos pobres", "Se quedó en el cielo"], "Por amor a vosotros se hizo pobre, siendo rico, para que vosotros con su pobreza fueseis enriquecidos.", "2 Corintios 8:9"],
    ["f34", 5, "o3", "recordar", "Según 1 Timoteo 6:6, ¿qué es gran ganancia?", "La piedad acompañada de contentamiento", ["Las riquezas abundantes", "El éxito en los negocios", "La fama ante los hombres"], "Gran ganancia es la piedad acompañada de contentamiento.", "1 Timoteo 6:6"],
    ["f35", 5, "o3", "comprender", "¿Qué les pasa a los que quieren enriquecerse, según 1 Timoteo 6:9?", "Caen en tentación y lazo, y en muchas codicias dañosas", ["Siempre tienen paz", "Ayudan más a los pobres", "Agradan más a Dios"], "Los que quieren enriquecerse caen en tentación y lazo, y en muchas codicias necias y dañosas.", "1 Timoteo 6:9"],
    ["f36", 5, "o3", "recordar", "¿Qué palabras del Señor Jesús recordó Pablo en Hechos 20:35?", "Más bienaventurado es dar que recibir", ["Dad al César lo que es del César", "No os hagáis tesoros en la tierra", "El obrero es digno de su salario"], "Recordar las palabras del Señor Jesús, que dijo: Más bienaventurado es dar que recibir.", "Hechos 20:35"],
    ["f37", 5, "o3", "aplicar", "¿Cuál de estas es una forma de generosidad además del dinero?", "Abrir la casa y la mesa a quien lo necesita", ["Guardar todo para el futuro", "Ayudar solo a la familia", "Prestar con intereses"], "Compartiendo para las necesidades de los santos; practicando la hospitalidad.", "Romanos 12:13"],
    ["f38", 5, "o3", "analizar", "¿Por qué la generosidad depende más de la confianza en Dios que de cuánto se tiene?", "Porque los macedonios, aun pobres, dieron mucho al entregarse primero al Señor", ["Porque solo los ricos pueden dar", "Porque Dios no necesita nada", "Porque dar es un buen negocio"], "A sí mismos se dieron primeramente al Señor.", "2 Corintios 8:1-5"],
    // ---- lección 6: finanzas sanas (7)
    ["f39", 6, "o4", "recordar", "Según 2 Tesalonicenses 3:10, ¿qué ordenaba Pablo?", "Si alguno no quiere trabajar, tampoco coma", ["Que todos vivan de la iglesia", "Que nadie trabaje en día de fiesta", "Que los ricos mantengan a todos"], "Si alguno no quiere trabajar, tampoco coma.", "2 Tesalonicenses 3:10"],
    ["f40", 6, "o4", "recordar", "Según 1 Timoteo 5:8, ¿qué debe hacer el creyente por los suyos?", "Proveer para ellos", ["Dejarlos a cargo de la iglesia", "Pedirles que trabajen por él", "Nada: Dios proveerá sin su esfuerzo"], "Si alguno no provee para los suyos, y mayormente para los de su casa, ha negado la fe.", "1 Timoteo 5:8"],
    ["f41", 6, "o4", "comprender", "¿Qué enseña Romanos 13:8 sobre las deudas?", "No deber a nadie nada, sino el amarnos unos a otros", ["Que hay que pedir prestado siempre", "Que las deudas no importan", "Que no hay que pagarlas"], "No debáis a nadie nada, sino el amaros unos a otros.", "Romanos 13:8"],
    ["f42", 6, "o4", "comprender", "¿Qué enseña Jesús con el que quiere edificar una torre, en Lucas 14:28?", "A calcular los gastos antes de empezar", ["A no construir nunca", "A pedir prestado para todo", "A dejar las obras sin terminar"], "¿Quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos?", "Lucas 14:28"],
    ["f43", 6, "o4", "aplicar", "¿Cuál es un buen orden de prioridades para un presupuesto cristiano?", "Dios, el ahorro, las necesidades, las deudas y luego los deseos", ["Los deseos, las deudas y lo que sobre para Dios", "Solo las necesidades, sin dar ni ahorrar", "Primero los gustos y después lo demás"], "Honra a Jehová con tus bienes, y con las primicias de todos tus frutos.", "Proverbios 3:9"],
    ["f44", 6, "o4", "recordar", "¿Qué pide Romanos 13:7 a los creyentes?", "Pagar a todos lo que se debe, también los impuestos", ["No pagar impuestos", "Pagar solo a los creyentes", "Dar todo a los gobernantes"], "Pagad a todos lo que debéis: al que tributo, tributo; al que impuesto, impuesto.", "Romanos 13:7"],
    ["f45", 6, "o4", "aplicar", "Un hermano gasta cada mes más de lo que gana con tarjetas de crédito. ¿Qué principio le ayudaría?", "Hacer un presupuesto y no contraer deudas para consumir", ["Pedir otra tarjeta de crédito", "Dejar de dar a Dios para pagar", "No pensar en el problema"], "El que toma prestado es siervo del que presta.", "Proverbios 22:7"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué significa la palabra mayordomo?", "Administrador de los bienes de otro", ["Dueño de una casa", "Jefe de los soldados", "Sacerdote del templo"], "Los siervos de Cristo son administradores de lo que Dios les confía.", "1 Corintios 4:1"],
      ["m1-02", 1, "o1", "recordar", "Según Salmos 24:1, ¿qué más pertenece a Jehová, además de la tierra?", "El mundo y los que en él habitan", ["Solo el templo", "Solo Israel", "Solo los cielos"], "De Jehová es la tierra y su plenitud; el mundo, y los que en él habitan.", "Salmos 24:1"],
      ["m1-03", 1, "o1", "comprender", "¿Qué administramos como mayordomos de Dios?", "La vida, el tiempo, los dones, los bienes y el evangelio", ["Solo el dinero", "Solo lo que damos a la iglesia", "Nada: todo lo decide Dios"], "Todo nos ha sido confiado: somos administradores.", "1 Corintios 4:1-2"],
      ["m1-04", 1, "o1", "comprender", "¿Qué dice Lucas 16:10 del que es injusto en lo muy poco?", "Que también en lo más es injusto", ["Que en lo mucho será fiel", "Que eso no importa", "Que Dios lo premiará"], "El que en lo muy poco es injusto, también en lo más es injusto.", "Lucas 16:10"],
      ["m1-05", 1, "o1", "recordar", "¿A quién pertenece el creyente, según 1 Corintios 6:19-20?", "A Dios, porque fue comprado por precio", ["A sí mismo", "A la iglesia", "A sus padres"], "No sois vuestros, porque habéis sido comprados por precio.", "1 Corintios 6:19-20"],
      ["m1-06", 1, "o1", "aplicar", "¿Cuál es la mejor actitud al saber que rendiremos cuentas a Dios?", "Vivir con propósito y fidelidad, no con miedo", ["Vivir con miedo constante", "Pensar que no pasará", "Hacer lo mínimo"], "Cada uno de nosotros dará a Dios cuenta de sí.", "Romanos 14:12"],
      ["m1-07", 2, "o2", "recordar", "¿Cómo pide Efesios 5:15 que andemos?", "Como sabios, no como necios", ["Con prisa, sin pensar", "Solos, sin la iglesia", "Despacio, sin trabajar"], "Mirad, pues, con diligencia cómo andéis, no como necios sino como sabios.", "Efesios 5:15"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué el descanso también es mayordomía?", "Porque el cuerpo es de Dios y necesita reposo para servirle", ["Porque trabajar es malo", "Porque así no hay que servir", "Porque Dios prohíbe el trabajo"], "Seis días trabajarás; mas el séptimo día es reposo para Jehová tu Dios.", "Éxodo 20:9-10"],
      ["m1-09", 2, "o2", "recordar", "Según Colosenses 3:23, ¿para quién trabaja el creyente?", "Para el Señor y no para los hombres", ["Solo para su jefe", "Solo para sí mismo", "Para que lo vean"], "Hacedlo de corazón, como para el Señor y no para los hombres.", "Colosenses 3:23"],
      ["m1-10", 2, "o2", "comprender", "¿Qué significa contar nuestros días?", "Recordar que la vida es breve y vivirla con sabiduría", ["Contar los años que faltan", "Hacer cálculos del futuro", "Llevar un calendario de fiestas"], "Enséñanos de tal modo a contar nuestros días, que traigamos al corazón sabiduría.", "Salmos 90:12"],
      ["m1-11", 2, "o2", "aplicar", "¿Cómo se trabaja como para el Señor en un empleo común?", "Con honradez y excelencia, aunque nadie vigile", ["Haciendo lo mínimo", "Solo cuando el jefe mira", "Hablando de Dios sin trabajar"], "Todo lo que hagáis, hacedlo de corazón.", "Colosenses 3:23"],
      ["m1-12", 2, "o2", "aplicar", "¿Qué lugar debe tener la familia en la semana del creyente?", "Tiempo de calidad, no solo lo que sobra", ["Ninguno: primero el trabajo", "Solo los fines de semana, si sobra", "La familia se cuida sola"], "Dios pide enseñar a los hijos en la vida diaria: en la casa, en el camino, al acostarse y al levantarse.", "Deuteronomio 6:6-7"],
      ["m1-13", 3, "o2", "recordar", "¿Qué era un talento en tiempos de Jesús?", "Una gran suma de dinero", ["Una habilidad musical", "Una moneda pequeña", "Una medida de trigo"], "En la parábola, el señor entregó sus bienes a sus siervos en talentos.", "Mateo 25:14-15"],
      ["m1-14", 3, "o2", "recordar", "¿Qué hizo el siervo que recibió un talento?", "Lo escondió en la tierra", ["Lo negoció y ganó otro", "Lo dio a los pobres", "Lo gastó en una fiesta"], "Fui y escondí tu talento en la tierra; aquí tienes lo que es tuyo.", "Mateo 25:25"],
      ["m1-15", 3, "o2", "comprender", "¿Por qué el señor dijo lo mismo al de cinco y al de dos talentos?", "Porque ambos fueron fieles con lo que recibieron", ["Porque ganaron lo mismo", "Porque no le importaba", "Porque eran hermanos"], "Bien, buen siervo y fiel; sobre poco has sido fiel, sobre mucho te pondré.", "Mateo 25:21-23"],
      ["m1-16", 3, "o2", "recordar", "¿De qué somos administradores, según 1 Pedro 4:10?", "De la multiforme gracia de Dios", ["De las riquezas del mundo", "De la ley de Moisés", "De los reinos de la tierra"], "Como buenos administradores de la multiforme gracia de Dios.", "1 Pedro 4:10"],
      ["m1-17", 3, "o2", "comprender", "Además de más responsabilidad, ¿qué recibe el siervo fiel?", "Entrar en el gozo de su señor", ["Un descanso sin trabajo", "Todo el dinero del señor", "El castigo del siervo malo"], "Sobre mucho te pondré; entra en el gozo de tu señor.", "Mateo 25:21"],
      ["m1-18", 3, "o2", "aplicar", "¿Qué puedes hacer con un don que no estás usando?", "Ofrecerlo para servir en la iglesia o a otros", ["Esperar a que alguien lo descubra", "Compararlo con el de otros", "Guardarlo para cuando seas mayor"], "Cada uno según el don que ha recibido, minístrelo a los otros.", "1 Pedro 4:10"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o3", "recordar", "¿Qué significa diezmo?", "La décima parte", ["La mitad", "Lo que sobra", "Cualquier ofrenda voluntaria"], "Abram le dio los diezmos de todo: la décima parte.", "Génesis 14:20"],
      ["m2-02", 4, "o3", "recordar", "¿De quién era sacerdote Melquisedec?", "Del Dios Altísimo", ["De Baal", "Del faraón", "De los filisteos"], "Melquisedec, rey de Salem y sacerdote del Dios Altísimo, bendijo a Abram.", "Génesis 14:18-19"],
      ["m2-03", 4, "o3", "comprender", "¿De qué acusó Dios a su pueblo en Malaquías 3:8?", "De robarle en los diezmos y las ofrendas", ["De dar demasiado", "De construir el templo", "De ayunar mucho"], "¿Robará el hombre a Dios? Pues vosotros me habéis robado. En vuestros diezmos y ofrendas.", "Malaquías 3:8"],
      ["m2-04", 4, "o3", "comprender", "¿Qué es lo más importante de la ley, según Mateo 23:23?", "La justicia, la misericordia y la fe", ["El diezmo de la menta", "Los ayunos", "Las fiestas"], "Dejáis lo más importante de la ley: la justicia, la misericordia y la fe.", "Mateo 23:23"],
      ["m2-05", 4, "o3", "comprender", "¿Cuál es el motivo correcto para dar?", "La gratitud, la fe y el amor a Dios", ["Hacerse rico", "Que los demás nos vean", "Obligar a Dios a bendecirnos"], "Dios ama al dador alegre.", "2 Corintios 9:7"],
      ["m2-06", 4, "o3", "aplicar", "Un predicador promete que, si das una ofrenda grande, Dios te hará rico en una semana. ¿Qué piensas?", "Que es el evangelio de la prosperidad: a Dios no se le compra", ["Que hay que dar para hacerse rico", "Que eso enseña la Biblia", "Que hay que dar todo lo que tienes"], "Toman la piedad como fuente de ganancia; apártate de los tales.", "1 Timoteo 6:5"],
      ["m2-07", 5, "o3", "recordar", "¿Cómo estaban las iglesias de Macedonia cuando dieron?", "En gran prueba y en profunda pobreza", ["Eran muy ricas", "No tenían problemas", "Recibían ayuda de Roma"], "En grande prueba de tribulación, la abundancia de su gozo y su profunda pobreza abundaron en riquezas de su generosidad.", "2 Corintios 8:2"],
      ["m2-08", 5, "o3", "recordar", "Según 1 Timoteo 6:7, ¿qué trajimos a este mundo?", "Nada", ["Riquezas", "Una herencia", "Un tesoro"], "Nada hemos traído a este mundo, y sin duda nada podremos sacar.", "1 Timoteo 6:7"],
      ["m2-09", 5, "o3", "comprender", "Según 1 Timoteo 6:8, ¿con qué debemos estar contentos?", "Con tener sustento y abrigo", ["Solo con mucho dinero", "Con nada", "Con lo que tienen los demás"], "Teniendo sustento y abrigo, estemos contentos con esto.", "1 Timoteo 6:8"],
      ["m2-10", 5, "o3", "recordar", "¿Qué aprendió Pablo, según Filipenses 4:11?", "A contentarse, cualquiera que sea su situación", ["A pedir dinero a las iglesias", "A no trabajar", "A quejarse menos en público"], "He aprendido a contentarme, cualquiera que sea mi situación.", "Filipenses 4:11"],
      ["m2-11", 5, "o3", "comprender", "¿Por qué el contentamiento libra del amor al dinero?", "Porque quien está satisfecho en Cristo no vive para tener más", ["Porque prohíbe trabajar", "Porque el dinero desaparece", "Porque obliga a ser pobre"], "Gran ganancia es la piedad acompañada de contentamiento.", "1 Timoteo 6:6"],
      ["m2-12", 5, "o3", "aplicar", "¿Cuál es una forma práctica de ser generoso esta semana?", "Ayudar a alguien en necesidad sin anunciarlo", ["Dar solo si te lo agradecen", "Ayudar para salir en una foto", "Esperar a tener mucho para dar"], "Más bienaventurado es dar que recibir.", "Hechos 20:35"],
      ["m2-13", 6, "o4", "recordar", "Según Efesios 4:28, ¿para qué trabaja el que antes robaba?", "Para tener qué compartir con el que padece necesidad", ["Para hacerse rico", "Para no ir a la iglesia", "Para pagar su castigo"], "Trabaje, haciendo con sus manos lo que es bueno, para que tenga qué compartir con el que padece necesidad.", "Efesios 4:28"],
      ["m2-14", 6, "o4", "recordar", "¿Qué hace la hormiga en el verano, según Proverbios 6:8?", "Prepara su comida", ["Duerme todo el día", "Gasta todo lo que tiene", "Pide prestado a otras"], "Prepara en el verano su comida, y recoge en el tiempo de la siega su mantenimiento.", "Proverbios 6:8"],
      ["m2-15", 6, "o4", "comprender", "¿Qué hace el impío con lo que toma prestado, según Salmos 37:21?", "No lo paga", ["Lo devuelve doble", "Lo regala", "Lo invierte bien"], "El impío toma prestado, y no paga; mas el justo tiene misericordia, y da.", "Salmos 37:21"],
      ["m2-16", 6, "o4", "recordar", "¿Qué dice Proverbios 11:1 del peso falso?", "Que es abominación a Jehová", ["Que es sabiduría", "Que trae bendición", "Que es necesario en los negocios"], "El peso falso es abominación a Jehová; mas la pesa cabal le agrada.", "Proverbios 11:1"],
      ["m2-17", 6, "o4", "comprender", "¿Por qué planear el dinero no es falta de fe?", "Porque Jesús enseñó a calcular los gastos antes de edificar", ["Porque la fe no tiene que ver con el dinero", "Porque Dios no provee", "Porque hay que confiar solo en uno mismo"], "No se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla.", "Lucas 14:28"],
      ["m2-18", 6, "o4", "aplicar", "¿Qué consejo da la Biblia sobre salir fiador?", "No hacerlo a la ligera", ["Hacerlo siempre que te lo pidan", "Hacerlo por cualquier desconocido", "Que no tiene ninguna consecuencia"], "No seas de aquellos que se comprometen, ni de los que salen por fiadores de deudas.", "Proverbios 22:26"],
    ] as P[]).map(p),
  },
  // las escritas del examen final (2 por intento, de 4)
  escritas: [
    {
      id: "n2-mayordomia-e1",
      tipo: "corta",
      pregunta: "¿Qué es la mayordomía cristiana y qué espera Dios de un administrador?",
      ideas: [
        { id: "dueno", peso: 30, texto: "Que Dios es el dueño de todo.", formas: ["dueño", "dueno", "de jehova es la tierra", "todo es de dios", "le pertenece", "pertenece a dios", "creador"] },
        { id: "administrar", peso: 25, texto: "Que somos administradores de lo que nos confió.", formas: ["administrador*", "administrar", "mayordomo*", "confi*"] },
        { id: "fiel", peso: 25, texto: "Que Dios espera fidelidad.", formas: ["fiel", "fieles", "fidelidad"] },
        { id: "areas", peso: 10, texto: "Lo que administramos: la vida, el tiempo, los dones o los bienes.", formas: ["tiempo", "dones", "talentos", "bienes", "dinero", "cuerpo"] },
      ],
      citas: ["1 Corintios 4:2", "1 Corintios 4:1-2", "Salmos 24:1", "Lucas 16:10", "Génesis 2:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La mayordomía cristiana es administrar lo que Dios nos confió, porque de Jehová es la tierra y su plenitud (Salmos 24:1): Dios es el dueño de todo. Somos administradores de la vida, el tiempo, los dones y los bienes, y lo que Dios espera es que cada uno sea hallado fiel (1 Corintios 4:2).",
    },
    {
      id: "n2-mayordomia-e2",
      tipo: "corta",
      pregunta: "Explica la parábola de los talentos y lo que enseña sobre la fidelidad.",
      ideas: [
        { id: "reparto", peso: 20, texto: "Que el señor repartió a cada uno conforme a su capacidad.", formas: ["capacidad", "cinco", "a cada uno"] },
        { id: "fieles", peso: 30, texto: "Que los siervos fieles negociaron y fueron premiados.", formas: ["negoci*", "ganaron", "duplic*", "buen siervo", "fiel", "fieles"] },
        { id: "enterro", peso: 25, texto: "Que el siervo malo enterró su talento por miedo.", formas: ["enterr*", "escond*", "miedo", "negligente"] },
        { id: "fidelidad", peso: 15, texto: "Que Dios premia la fidelidad, no la cantidad.", formas: ["fidelidad", "no la cantidad", "lo que recibio", "usar", "usemos"] },
      ],
      citas: ["Mateo 25:14-30", "Mateo 25:21", "Mateo 25:15", "1 Pedro 4:10", "Mateo 25:24-26"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Un señor repartió talentos a sus siervos, a cada uno conforme a su capacidad. Los dos primeros negociaron y duplicaron lo recibido, y el señor les dijo: Bien, buen siervo y fiel (Mateo 25:21). El tercero enterró su talento por miedo: siervo malo y negligente. Dios premia la fidelidad, no la cantidad: espera que usemos lo recibido.",
    },
    {
      id: "n2-mayordomia-e3",
      tipo: "corta",
      pregunta: "¿Qué enseña la Biblia sobre el diezmo y las ofrendas, y por qué el evangelio de la prosperidad es un error?",
      ideas: [
        { id: "diezmo", peso: 25, texto: "Que el diezmo aparece antes de la ley, en la ley y en las palabras de Jesús.", formas: ["diezmo*", "decima parte", "abram", "abraham", "malaquias", "jacob"] },
        { id: "ofrenda", peso: 20, texto: "Que las ofrendas son voluntarias y se dan con alegría y con orden.", formas: ["ofrenda*", "alegria", "alegre", "voluntari*"] },
        { id: "proposito", peso: 15, texto: "Que sostienen la obra de Dios y ayudan a los necesitados.", formas: ["obra de dios", "sostener", "sostiene*", "necesitados", "pobres"] },
        {
          id: "prosperidad",
          peso: 30,
          texto: "Que a Dios no se le compra: damos por gratitud y por fe, no para hacernos ricos.",
          formas: ["no se (compra|puede comprar)", "no (compra|compramos|compran)", "no es un negocio", "no para (hacernos|hacerse|hacerme) ricos", "no para enriquecer*", "gratitud", "fuente de ganancia", "por amor"],
          negativa: true,
        },
      ],
      citas: ["Malaquías 3:10", "Mateo 23:23", "2 Corintios 9:7", "1 Timoteo 6:5", "1 Corintios 16:2", "Génesis 14:20"],
      pesoCita: 10,
      errores: [
        { id: "compra", anula: "prosperidad", texto: "Dios bendice al generoso, pero no se le compra: damos por gratitud y por fe, no para hacernos ricos (1 Timoteo 6:5-10).", formas: ["dios nos hace ricos", "dios nos hara ricos", "para hacernos ricos", "para que dios nos de mas", "dar para recibir mas"] },
      ],
      modelo:
        "El diezmo, la décima parte, aparece con Abram (Génesis 14:20) y en las palabras de Jesús (Mateo 23:23). Las ofrendas se dan con alegría para sostener la obra de Dios y ayudar a los necesitados. El evangelio de la prosperidad es un error: a Dios no se le compra; damos por gratitud, no para hacernos ricos (1 Timoteo 6:5).",
    },
    {
      id: "n2-mayordomia-e4",
      tipo: "corta",
      pregunta: "Describe un presupuesto sencillo con prioridades bíblicas y lo que enseña la Biblia sobre las deudas y el ahorro.",
      ideas: [
        { id: "dios", peso: 25, texto: "Primero dar a Dios: el diezmo y las ofrendas.", formas: ["diezmo*", "ofrenda*", "primicias", "primero (a|para) dios"] },
        { id: "ahorro", peso: 25, texto: "Ahorrar para las emergencias, como la hormiga.", formas: ["ahorr*", "hormiga", "emergencia*"] },
        { id: "deudas", peso: 25, texto: "Evitar las deudas para consumir y pagar lo que se debe.", formas: ["deuda*", "prestado", "presta", "debais", "endeud*"], negativa: true },
        { id: "necesidades", peso: 15, texto: "Pagar las necesidades sin gastar más de lo que entra.", formas: ["necesidades", "vivienda", "comida", "mas de lo que (entra|gan*)"], negativa: true },
      ],
      citas: ["Proverbios 22:7", "Romanos 13:8", "Proverbios 6:6-8", "Lucas 14:28", "Proverbios 3:9", "1 Corintios 16:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero daría a Dios el diezmo y las ofrendas, para honrar a Jehová con las primicias (Proverbios 3:9). Después ahorraría para las emergencias, como la hormiga que prepara su comida en el verano. Luego pagaría las necesidades y las deudas a tiempo, sin gastar más de lo que entra, porque el que toma prestado es siervo del que presta.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 15 % de la nota del Nivel 2
  breve: {
    id: "n2-mayordomia-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo vas a administrar tu vida como mayordomo de Dios: tu tiempo, tus dones y tu dinero. Incluye el diezmo y la generosidad, y un paso concreto para tus finanzas. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "dueno", peso: 15, texto: "Que Dios es el dueño de todo.", formas: ["dueño", "dueno", "todo es de dios", "de jehova es la tierra", "le pertenece", "pertenece a dios"] },
      { id: "fiel", peso: 10, texto: "La fidelidad del administrador.", formas: ["fiel", "fieles", "fidelidad", "administrador*", "mayordomo*"] },
      { id: "tiempo", peso: 15, texto: "El tiempo.", formas: ["tiempo", "dias", "semana", "agenda"] },
      { id: "dones", peso: 15, texto: "Los dones y el servicio.", formas: ["don", "dones", "talento*", "servir", "servicio"] },
      { id: "diezmo", peso: 15, texto: "El diezmo, las ofrendas y la generosidad.", formas: ["diezmo*", "ofrenda*", "generos*"] },
      { id: "finanzas", peso: 20, texto: "Un paso concreto: el presupuesto, el ahorro o las deudas.", formas: ["presupuesto", "ahorr*", "deuda*", "gastos", "gastar"], negativa: true },
      { id: "corazon", peso: 10, texto: "El corazón: la gratitud, la alegría o el contentamiento.", formas: ["gratitud", "contentamiento", "contento*", "alegria", "alegre"] },
    ],
    basta: 85,
    citas: ["1 Corintios 4:2", "Salmos 24:1", "Mateo 25:21", "Malaquías 3:10", "2 Corintios 9:7", "Proverbios 22:7", "Lucas 14:28", "Colosenses 3:23", "Efesios 5:16", "1 Timoteo 6:6"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Quiero vivir como mayordomo de Dios, porque de Jehová es la tierra y su plenitud (Salmos 24:1) y Él es el dueño de todo lo que tengo. Lo que me pide es que sea hallado fiel (1 Corintios 4:2). Con mi tiempo, voy a separar cada mañana un rato para la Palabra y la oración, y voy a revisar cuántas horas se me van en el teléfono. Con mis dones, voy a servir en el ministerio de alabanza, porque no quiero enterrar lo que Dios me dio. Con mi dinero, voy a dar primero el diezmo y las ofrendas con alegría, porque Dios ama al dador alegre (2 Corintios 9:7), y no para hacerme rico. También quiero ser generoso con los necesitados y vivir con contentamiento. El paso concreto para mis finanzas es hacer un presupuesto este mes, empezar a ahorrar una parte pequeña para las emergencias y pagar una deuda de la tarjeta, porque el que toma prestado es siervo del que presta (Proverbios 22:7).",
  },
};
