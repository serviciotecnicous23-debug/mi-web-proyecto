/**
 * Las 54 cartas de la lotería bíblica: figuras propias de la Biblia (personajes, animales, objetos y lugares), con su
 * número, la copla del cantor (escrita para este juego) y un versículo de la Reina-Valera 1960 (textual: el versículo
 * entero o un trozo seguido de él, comprobado con la Biblia del sitio). Los dibujos son nuestros: están en
 * `client/src/games/templo/mesa/figuras.tsx`, con el mismo id.
 *
 * Para agregar cartas: al final, con un id nuevo (nunca se reusa uno), su copla, su versículo comprobado y su dibujo.
 */
import type { Verso } from "../ciudad";

export type TipoCarta = "personaje" | "animal" | "objeto" | "lugar";
export type CartaLoteria = { id: string; n: number; nombre: string; tipo: TipoCarta; copla: string; verso: Verso };

const c = (id: string, nombre: string, tipo: TipoCarta, copla: string, text: string, ref: string) => ({ id, nombre, tipo, copla, verso: { text, ref } });

const LISTA = [
  c("arca", "El arca", "objeto", "Ocho almas y animales, flotando sobre los mares.", "Dijo luego Jehová a Noé: Entra tú y toda tu casa en el arca; porque a ti he visto justo delante de mí en esta generación.", "Génesis 7:1"),
  c("paloma", "La paloma", "animal", "Volvió a la tarde con una hoja de olivo en el pico.", "Y la paloma volvió a él a la hora de la tarde; y he aquí que traía una hoja de olivo en el pico;", "Génesis 8:11"),
  c("arcoiris", "El arco iris", "lugar", "Siete colores en las nubes: una promesa que no se rompe.", "Mi arco he puesto en las nubes, el cual será por señal del pacto entre mí y la tierra.", "Génesis 9:13"),
  c("escalera", "La escalera", "objeto", "Jacob dormía en una piedra y los ángeles subían y bajaban.", "Y soñó: y he aquí una escalera que estaba apoyada en tierra, y su extremo tocaba en el cielo; y he aquí ángeles de Dios que subían y descendían por ella.", "Génesis 28:12"),
  c("tunica", "La túnica", "objeto", "De muchos colores, el regalo de un padre a José.", "Y amaba Israel a José más que a todos sus hijos, porque lo había tenido en su vejez; y le hizo una túnica de diversos colores.", "Génesis 37:3"),
  c("zarza", "La zarza", "lugar", "Ardía y ardía, y no se consumía.", "Y se le apareció el Angel de Jehová en una llama de fuego en medio de una zarza; y él miró, y vio que la zarza ardía en fuego, y la zarza no se consumía.", "Éxodo 3:2"),
  c("sandalia", "La sandalia", "objeto", "Quítatela, Moisés, que la tierra es santa.", "Y dijo: No te acerques; quita tu calzado de tus pies, porque el lugar en que tú estás, tierra santa es.", "Éxodo 3:5"),
  c("moises", "Moisés", "personaje", "Levantó su vara y el mar se partió en dos.", "Y extendió Moisés su mano sobre el mar, e hizo Jehová que el mar se retirase por recio viento oriental toda aquella noche;", "Éxodo 14:21"),
  c("rana", "La rana", "animal", "¡Saltaban por todo Egipto, hasta en las camas!", "Entonces Aarón extendió su mano sobre las aguas de Egipto, y subieron ranas que cubrieron la tierra de Egipto.", "Éxodo 8:6"),
  c("mar", "El mar abierto", "lugar", "Un muro de agua a cada lado, y el pueblo pasó en seco.", "Entonces los hijos de Israel entraron por en medio del mar, en seco, teniendo las aguas como muro a su derecha y a su izquierda.", "Éxodo 14:22"),
  c("nube", "La nube", "lugar", "De día una nube, de noche una columna de fuego.", "Y Jehová iba delante de ellos de día en una columna de nube para guiarlos por el camino, y de noche en una columna de fuego para alumbrarles,", "Éxodo 13:21"),
  c("tablas", "Las tablas", "objeto", "Dos de piedra y diez palabras, escritas por el dedo de Dios.", "Y dio a Moisés, cuando acabó de hablar con él en el monte de Sinaí, dos tablas del testimonio, tablas de piedra escritas con el dedo de Dios.", "Éxodo 31:18"),
  c("monte", "El monte", "lugar", "Humeaba el Sinaí y temblaba entero.", "Todo el monte Sinaí humeaba, porque Jehová había descendido sobre él en fuego;", "Éxodo 19:18"),
  c("candelero", "El candelero", "objeto", "Siete lamparillas de oro alumbran el lugar santo.", "Y le harás siete lamparillas, las cuales encenderás para que alumbren hacia adelante.", "Éxodo 25:37"),
  c("vara", "La vara", "objeto", "Seca en la tarde, con almendras en la mañana.", "he aquí que la vara de Aarón de la casa de Leví había reverdecido, y echado flores, y arrojado renuevos, y producido almendras.", "Números 17:8"),
  c("asna", "El asna", "animal", "Vio al ángel en el camino y le habló a su amo.", "Entonces Jehová abrió la boca al asna, la cual dijo a Balaam: ¿Qué te he hecho, que me has azotado estas tres veces?", "Números 22:28"),
  c("murallas", "Las murallas", "lugar", "Siete vueltas, un gran grito… ¡y se vinieron abajo!", "Por la fe cayeron los muros de Jericó después de rodearlos siete días.", "Hebreos 11:30"),
  c("shofar", "El cuerno", "objeto", "Cuerno de carnero que suena largo: ¡a gritar todo el pueblo!", "Y cuando toquen prolongadamente el cuerno de carnero, así que oigáis el sonido de la bocina, todo el pueblo gritará a gran voz, y el muro de la ciudad caerá;", "Josué 6:5"),
  c("sol", "El sol", "lugar", "Alumbra de día y es escudo para el justo.", "Porque sol y escudo es Jehová Dios; Gracia y gloria dará Jehová. No quitará el bien a los que andan en integridad.", "Salmos 84:11"),
  c("sanson", "Sansón", "personaje", "Su fuerza no estaba en el pelo: estaba en Dios.", "Entonces clamó Sansón a Jehová, y dijo: Señor Jehová, acuérdate ahora de mí, y fortaléceme, te ruego, solamente esta vez, oh Dios,", "Jueces 16:28"),
  c("rut", "Rut", "personaje", "Adonde tú vayas, iré yo; tu Dios será mi Dios.", "Tu pueblo será mi pueblo, y tu Dios mi Dios.", "Rut 1:16"),
  c("samuel", "Samuel", "personaje", "Un niño en el templo, de noche: «Habla, que te escucho».", "Y vino Jehová y se paró, y llamó como las otras veces: ¡Samuel, Samuel! Entonces Samuel dijo: Habla, porque tu siervo oye.", "1 Samuel 3:10"),
  c("arpa", "El arpa", "objeto", "Cuando David la tocaba, el rey Saúl descansaba.", "David tomaba el arpa y tocaba con su mano; y Saúl tenía alivio y estaba mejor,", "1 Samuel 16:23"),
  c("david", "David", "personaje", "Una honda, una piedra… ¡y el gigante al suelo!", "Así venció David al filisteo con honda y piedra; e hirió al filisteo y lo mató, sin tener David espada en su mano.", "1 Samuel 17:50"),
  c("goliat", "El gigante", "personaje", "Seis codos y un palmo de alto, y cayó de una pedrada.", "Salió entonces del campamento de los filisteos un paladín, el cual se llamaba Goliat, de Gat, y tenía de altura seis codos y un palmo.", "1 Samuel 17:4"),
  c("corona", "La corona", "objeto", "La que espera al que es fiel hasta el fin.", "Sé fiel hasta la muerte, y yo te daré la corona de la vida.", "Apocalipsis 2:10"),
  c("templo", "El templo", "lugar", "¡Qué alegría cuando me dicen: vamos a la casa de Jehová!", "Yo me alegré con los que me decían: A la casa de Jehová iremos.", "Salmos 122:1"),
  c("cuervo", "El cuervo", "animal", "Pan y carne le llevaba a Elías junto al arroyo.", "Y los cuervos le traían pan y carne por la mañana, y pan y carne por la tarde; y bebía del arroyo.", "1 Reyes 17:6"),
  c("ester", "Ester", "personaje", "Reina valiente que habló por su pueblo.", "¿Y quién sabe si para esta hora has llegado al reino?", "Ester 4:14"),
  c("leon", "El león", "animal", "Rugía en el foso, pero un ángel le cerró la boca.", "Mi Dios envió su ángel, el cual cerró la boca de los leones, para que no me hiciesen daño,", "Daniel 6:22"),
  c("gran-pez", "El gran pez", "animal", "Tres días y tres noches con Jonás en la panza.", "Pero Jehová tenía preparado un gran pez que tragase a Jonás; y estuvo Jonás en el vientre del pez tres días y tres noches.", "Jonás 1:17"),
  c("torre", "La torre", "lugar", "Quisieron llegar al cielo y ya no se entendieron.", "Y dijeron: Vamos, edifiquémonos una ciudad y una torre, cuya cúspide llegue al cielo;", "Génesis 11:4"),
  c("llave", "La llave", "objeto", "Lo que ella abre, nadie lo cierra.", "Y pondré la llave de la casa de David sobre su hombro; y abrirá, y nadie cerrará; cerrará, y nadie abrirá.", "Isaías 22:22"),
  c("lampara", "La lámpara", "objeto", "Una luz para mis pies y para mi camino.", "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino.", "Salmos 119:105"),
  c("luna", "La luna", "lugar", "La lumbrera menor, que marca los tiempos.", "Hizo la luna para los tiempos; El sol conoce su ocaso.", "Salmos 104:19"),
  c("estrella", "La estrella", "lugar", "Guió a los sabios de oriente hasta el niño.", "Y al ver la estrella, se regocijaron con muy grande gozo.", "Mateo 2:10"),
  c("cordero", "El cordero", "animal", "Manso y blanco, y quita el pecado del mundo.", "He aquí el Cordero de Dios, que quita el pecado del mundo.", "Juan 1:29"),
  c("ciervo", "El ciervo", "animal", "Busca el agua como mi alma busca a Dios.", "Como el ciervo brama por las corrientes de las aguas, Así clama por ti, oh Dios, el alma mía.", "Salmos 42:1"),
  c("aguila", "El águila", "animal", "Los que esperan en Jehová vuelan como ella.", "pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.", "Isaías 40:31"),
  c("palmera", "La palmera", "lugar", "Alta y verde: así florece el justo.", "El justo florecerá como la palmera; Crecerá como cedro en el Líbano.", "Salmos 92:12"),
  c("vid", "La vid", "objeto", "Unidos a ella, los pámpanos dan mucho fruto.", "Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, éste lleva mucho fruto; porque separados de mí nada podéis hacer.", "Juan 15:5"),
  c("pozo", "El pozo", "lugar", "Agua que, si la bebes, no vuelves a tener sed.", "mas el que bebiere del agua que yo le daré, no tendrá sed jamás; sino que el agua que yo le daré será en él una fuente de agua que salte para vida eterna.", "Juan 4:14"),
  c("cantaro", "El cántaro", "objeto", "Lo dejó junto al pozo y corrió a contarlo.", "Entonces la mujer dejó su cántaro, y fue a la ciudad,", "Juan 4:28"),
  c("panes-peces", "Los panes y los peces", "objeto", "Cinco panes y dos peces: ¡y alcanzó para miles!", "Aquí está un muchacho, que tiene cinco panes de cebada y dos pececillos; mas ¿qué es esto para tantos?", "Juan 6:9"),
  c("red", "La red", "objeto", "Échenla a la derecha… ¡y no la podían sacar!", "El les dijo: Echad la red a la derecha de la barca, y hallaréis. Entonces la echaron, y ya no la podían sacar, por la gran cantidad de peces.", "Juan 21:6"),
  c("sembrador", "El sembrador", "personaje", "Salió a sembrar, y una parte cayó en buena tierra.", "He aquí, el sembrador salió a sembrar.", "Mateo 13:3"),
  c("samaritano", "El samaritano", "personaje", "Se detuvo en el camino y curó al herido.", "Pero un samaritano, que iba de camino, vino cerca de él, y viéndole, fue movido a misericordia;", "Lucas 10:33"),
  c("oveja", "La oveja", "animal", "Una de cien se perdió, y el pastor la fue a buscar.", "Gozaos conmigo, porque he encontrado mi oveja que se había perdido.", "Lucas 15:6"),
  c("camello", "El camello", "animal", "Más fácil pasar por el ojo de una aguja…", "Otra vez os digo, que es más fácil pasar un camello por el ojo de una aguja, que entrar un rico en el reino de Dios.", "Mateo 19:24"),
  c("zaqueo", "Zaqueo", "personaje", "Chiquito de estatura, se subió a un árbol para verlo pasar.", "Y corriendo delante, subió a un árbol sicómoro para verle; porque había de pasar por allí.", "Lucas 19:4"),
  c("viuda", "La viuda", "personaje", "Dio dos moneditas, y dio más que todos.", "Y vino una viuda pobre, y echó dos blancas, o sea un cuadrante.", "Marcos 12:42"),
  c("gallo", "El gallo", "animal", "Cantó en la madrugada, y Pedro lloró.", "Entonces Pedro se acordó de las palabras de Jesús, que le había dicho: Antes que cante el gallo, me negarás tres veces. Y saliendo fuera, lloró amargamente.", "Mateo 26:75"),
  c("copa", "La copa", "objeto", "Llena hasta arriba, como su bondad.", "Aderezas mesa delante de mí en presencia de mis angustiadores; Unges mi cabeza con aceite; mi copa está rebosando.", "Salmos 23:5"),
  c("noe", "Noé", "personaje", "Construyó en tierra seca porque le creyó a Dios.", "Y lo hizo así Noé; hizo conforme a todo lo que Dios le mandó.", "Génesis 6:22"),
];

export const CARTAS_LOTERIA: CartaLoteria[] = LISTA.map((x, i) => ({ ...x, n: i + 1 }));
export const TOTAL_CARTAS = CARTAS_LOTERIA.length;
export const CARTA_POR_ID = new Map(CARTAS_LOTERIA.map((x) => [x.id, x]));
export const cartaPorIndice = (i: number) => CARTAS_LOTERIA[i];
