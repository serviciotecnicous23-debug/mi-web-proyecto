/**
 * Las partes de cada examen de rango: su título y su tema (lo que ve la pantalla; las preguntas están SOLO en el
 * servidor, server/examenes-rango-banco.ts). (Generado con generar_banco_rango.py: no editar a mano.)
 */

export const PARTES_RANGO: Record<string, { titulo: string; tema: string }[]> = {
  "sacerdocio-2": [
    { titulo: "El turno y el servicio de cada día", tema: "Los turnos del sacerdocio, el holocausto continuo, el fuego, las lámparas y el incienso de cada día." },
    { titulo: "El lugar santo", tema: "La mesa de los panes, el candelero de oro, el altar del incienso y el velo." },
    { titulo: "La santidad del sacerdote", tema: "Lavarse antes de servir, Nadab y Abiú, el vino y el deber de enseñar." },
  ],
  "sacerdocio-3": [
    { titulo: "Los turnos y sus jefes", tema: "Los veinticuatro turnos, sus jefes y el orden del servicio en la casa de Dios." },
    { titulo: "El orden de las ofrendas", tema: "El holocausto, la oblación, el sacrificio de paz y la expiación, como los enseña Levítico." },
    { titulo: "Guiar a los que sirven", tema: "Elí y sus hijos, Ezequías con los sacerdotes y levitas, y el ejemplo de quien guía." },
  ],
  "sacerdocio-4": [
    { titulo: "El arca y el lugar santísimo", tema: "El arca del testimonio, el propiciatorio, los querubines y lo que guardaba el arca." },
    { titulo: "Lo limpio y lo inmundo", tema: "La ley del leproso, la vaca alazana y el discernir del sacerdote." },
    { titulo: "Las fiestas solemnes", tema: "La pascua, los panes, las primicias, las semanas, las trompetas, la expiación y los tabernáculos." },
    { titulo: "Juzgar y enseñar la ley", tema: "Los sacerdotes como jueces y maestros: Josafat, Esdras y la ley leída al pueblo." },
  ],
  "sacerdocio-5": [
    { titulo: "Las vestiduras del sumo sacerdote", tema: "El efod, el pectoral con las doce piedras, el Urim y Tumim, el manto azul y la lámina de oro." },
    { titulo: "El día de la expiación", tema: "Lo que hacía el sumo sacerdote una vez al año detrás del velo." },
    { titulo: "Cristo, nuestro gran sumo sacerdote", tema: "Lo que enseña Hebreos: el sumo sacerdote que se compadece, que vive para interceder y que entró una vez para siempre." },
    { titulo: "Los sumos sacerdotes de la historia", tema: "Finees, Sadoc, Joiada, Azarías, Hilcías, Josué y Caifás." },
  ],
  "profecia-2": [
    { titulo: "Escuchar a Dios", tema: "El llamado de Samuel, el silbo apacible y el oído que Dios despierta." },
    { titulo: "Probar los espíritus", tema: "Cómo se conoce la palabra que viene de Dios y cómo se reconoce al falso profeta." },
    { titulo: "La oración del profeta", tema: "Elías, Daniel, Samuel, Ana y Jonás: los que hablaban de parte de Dios hablaban primero con Dios." },
  ],
  "profecia-3": [
    { titulo: "Los hijos de los profetas", tema: "La escuela de Eliseo y de Samuel: vivir, aprender y servir juntos." },
    { titulo: "El mensajero fiel", tema: "El atalaya de Ezequiel, el llamado de Jeremías y la segunda oportunidad de Jonás." },
    { titulo: "Ni añadir ni quitar", tema: "Decir solo lo que Dios dice: Balaam, Micaías, Amós y el deber de cuidar la Palabra." },
  ],
  "profecia-4": [
    { titulo: "Los profetas delante de los reyes", tema: "Natán y Gad con David, Elías con Acab e Isaías con Ezequías." },
    { titulo: "El Mesías anunciado (1)", tema: "Emanuel, el niño que nos es nacido, la vara de Isaí, Belén y el rey humilde." },
    { titulo: "El Mesías anunciado (2)", tema: "El siervo sufriente de Isaías 53, el Salmo 22 y el Ungido de Isaías 61." },
    { titulo: "El llamado a volver a Dios", tema: "Lo que los profetas pedían al pueblo: un corazón que vuelve a Dios." },
  ],
  "profecia-5": [
    { titulo: "Moisés, el profeta", tema: "El llamado de Moisés, su mansedumbre, el cara a cara con Dios y el profeta como él." },
    { titulo: "Elías y Eliseo", tema: "El cuidado de Dios, el manto, la doble porción y los ojos abiertos." },
    { titulo: "El Espíritu y el nuevo pacto", tema: "Lo que los profetas anunciaron para los últimos días y se cumplió en Cristo." },
    { titulo: "El fruto del verdadero varón de Dios", tema: "Lo que pide Dios, el poder del Espíritu, la Palabra como fuego y la edificación de la iglesia." },
  ],
  "realeza-2": [
    { titulo: "La ley del rey", tema: "Lo que manda Deuteronomio 17 al rey y la Palabra que se medita de día y de noche." },
    { titulo: "Los escribas fieles", tema: "Esdras, Safán, Baruc y los escribas del palacio de Ezequías." },
    { titulo: "Palabras justas y prudentes", tema: "Lo que enseñan Proverbios y Santiago sobre la boca del que sirve al rey." },
  ],
  "realeza-3": [
    { titulo: "Servir con justicia", tema: "Los jueces y oficiales: sin soborno, sin acepción de personas y con temor de Jehová." },
    { titulo: "Cuidar al pobre", tema: "La voz del desvalido, el espigueo, la viuda y el huérfano." },
    { titulo: "Fieles en lo poco", tema: "José, Daniel y Nehemías: servir bien en el lugar que Dios da." },
  ],
  "realeza-4": [
    { titulo: "El buen consejo", tema: "La multitud de consejeros, Roboam y los ancianos, Ahitofel y Husai." },
    { titulo: "Saúl, David y Salomón", tema: "Obedecer es mejor que los sacrificios, el corazón que Dios mira, el pacto con David y la sabiduría de Salomón." },
    { titulo: "Los reyes de Judá", tema: "Josafat, Joás y Uzías: lo que hizo prosperar a un rey y lo que lo perdió." },
    { titulo: "Ezequías, el rey de este palacio", tema: "Sus reformas, la Pascua, Senaquerib, la enfermedad y el conducto de agua." },
  ],
  "realeza-5": [
    { titulo: "El rey según el corazón de Dios", tema: "David, el Salmo 72 y el justo que gobierna en el temor de Dios." },
    { titulo: "Josías y el libro hallado", tema: "El rey que buscó a Dios de muchacho, se humilló al oír la ley e hizo pacto con todo el pueblo." },
    { titulo: "El Rey de reyes", tema: "El Rey prometido, manso y justo, cuyo reino no es de este mundo." },
    { titulo: "Los mayordomos fieles", tema: "Eliaquim y la llave de David, José, Mardoqueo, Daniel y el mayordomo fiel y prudente." },
  ],
};
