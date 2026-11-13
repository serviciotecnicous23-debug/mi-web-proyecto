/**
 * La lista del «Basta» bíblico: los nombres que valen en cada categoría (como se escriben en la Reina-Valera 1960).
 * Vive SOLO en el servidor: al arrancar, server/juegos-grupo.ts se la da al juego (`ponerListaBasta` de
 * shared/mesa/basta.ts). Así la lista no viaja al teléfono.
 *
 * Para agregar: el nombre con sus tildes, en su categoría (las mayúsculas y las tildes no importan al comparar). Los
 * primeros de cada letra son los más conocidos: los compañeros de la computadora los eligen más (y así a veces se
 * repiten, como pasa entre personas).
 */
export const PERSONAJES_BASTA = [
  // los más conocidos primero (por letra)
  "Abraham", "Adán", "Aarón", "Abel", "Ana", "Andrés", "Abigail", "Absalón", "Acab", "Agar", "Amós", "Ananías", "Apolos", "Aquila", "Asa", "Aser", "Asaf", "Atalía", "Azarías", "Abdías", "Abner", "Abisai", "Agripa", "Amnón", "Ahimaas", "Abimelec", "Abram", "Ana",
  "Bernabé", "Benjamín", "Booz", "Balaam", "Bartolomé", "Betsabé", "Barac", "Baruc", "Belsasar", "Barrabás", "Bilha", "Bezaleel",
  "Caín", "Caleb", "Cornelio", "Ciro", "Cam", "Coré", "Cleofas", "Crispo",
  "David", "Daniel", "Débora", "Dalila", "Dorcas", "Dina", "Darío", "Demas", "Datán",
  "Eva", "Elías", "Ester", "Esaú", "Eliseo", "Elí", "Esdras", "Ezequías", "Ezequiel", "Enoc", "Efraín", "Eliaquim", "Elcana", "Eleazar", "Elisabet", "Esteban", "Etán", "Eutico", "Eunice", "Epafras", "Elimelec", "Eliú",
  "Felipe", "Faraón", "Febe", "Félix", "Festo", "Filemón", "Finees",
  "Goliat", "Gedeón", "Gabriel", "Gad", "Gamaliel", "Giezi", "Gomer",
  "Herodes", "Habacuc", "Hageo", "Husai", "Hulda", "Hiram", "Hur", "Amán",
  "Isaac", "Isaías", "Ismael", "Isacar", "Itamar", "Icabod",
  "José", "Jonás", "Juan", "Jacob", "Josué", "Job", "Jeremías", "Judá", "Jezabel", "Jairo", "Jonatán", "Josías", "Jetro", "Jefté", "Joab", "Joás", "Jotam", "Joel", "Josafat", "Isaí", "Jafet", "Jael", "Jeroboam", "Jehú", "Judas", "Juana",
  "Lázaro", "Lot", "Lucas", "Lidia", "Labán", "Lea", "Leví", "Loida", "Lamec",
  "Moisés", "María", "Marta", "Mateo", "Marcos", "Mardoqueo", "Matusalén", "Melquisedec", "Miqueas", "Mical", "Manasés", "Malaquías", "Matías", "Mefi-boset", "Micaías", "Miriam",
  "Noé", "Noemí", "Nehemías", "Nicodemo", "Natán", "Naamán", "Nabucodonosor", "Nabal", "Natanael", "Nahúm", "Nadab", "Nimrod", "Neftalí",
  "Oseas", "Obed", "Onésimo", "Ofni", "Og", "Omri", "Orfa", "Otoniel", "Obadías",
  "Pedro", "Pablo", "Pilato", "Priscila", "Potifar",
  "Rut", "Raquel", "Rebeca", "Rahab", "Rubén", "Roboam", "Rode",
  "Sansón", "Samuel", "Sara", "Salomón", "Saúl", "Simeón", "Silas", "Santiago", "Sem", "Set", "Sadrac", "Sofonías", "Sísara", "Saulo", "Safira", "Salomé", "Senaquerib", "Simón", "Sedequías", "Séfora",
  "Tomás", "Timoteo", "Tito", "Tabita", "Taré", "Tamar", "Tíquico", "Tobías",
  "Uzías", "Urías", "Uza",
  "Vasti",
  "Zaqueo", "Zacarías", "Zorobabel", "Zebedeo", "Zabulón", "Zilpa",
];

export const LUGARES_BASTA = [
  "Antioquía", "Atenas", "Ararat", "Asiria", "Acaya", "Adulam", "Hai", "Arabia", "Asia", "Anatot", "Arimatea",
  "Belén", "Babilonia", "Betania", "Betel", "Betesda", "Berea", "Betsaida", "Beerseba", "Basán", "Babel",
  "Canaán", "Capernaum", "Carmelo", "Corinto", "Ciudad de David", "Cesarea", "Chipre", "Creta", "Cedrón", "Colosas", "Caná", "Cades", "Cirene", "Cilicia",
  "Damasco", "Dan", "Decápolis", "Dotán", "Derbe",
  "Egipto", "Edén", "Éfeso", "Emaús", "Esmirna", "Edom", "Ecrón", "En-gadi", "Etiopía", "Elim",
  "Filipos", "Filistea", "Fenicia", "Frigia", "Filadelfia",
  "Galilea", "Gaza", "Getsemaní", "Gólgota", "Gosén", "Gilgal", "Gabaón", "Gat", "Galacia", "Gilboa", "Gomorra", "Gerar",
  "Hebrón", "Horeb", "Harán", "Hermón", "Hesbón",
  "Jerusalén", "Jericó", "Jordán", "Jope", "Judea", "Jezreel", "Jaboc",
  "Líbano", "Laodicea", "Listra", "Luz",
  "Moab", "Macedonia", "Mar Rojo", "Meguido", "Madián", "Mesopotamia", "Mileto", "Moriah", "Mizpa", "Malta", "Mar de Galilea",
  "Nazaret", "Nínive", "Nilo", "Naín", "Neguev", "Nob", "Nebo",
  "Olivos", "Ofel", "Ofir",
  "Patmos", "Persia", "Pérgamo", "Peniel", "Pisga", "Ponto", "Panfilia", "Pafos",
  "Roma", "Ramá", "Ramot", "Refidim", "Rodas",
  "Sinaí", "Samaria", "Sion", "Sodoma", "Siloé", "Siquem", "Sardis", "Sidón", "Silo", "Susa", "Sarepta", "Sicar", "Seir",
  "Tarso", "Tiro", "Tarsis", "Tesalónica", "Tiatira", "Tecoa", "Tiberias", "Troas", "Tabor",
  "Ur",
  "Zoar", "Zif",
];

export const LIBROS_BASTA = [
  "Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué", "Jueces", "Rut", "Samuel", "Reyes", "Crónicas", "Esdras", "Nehemías", "Ester", "Job",
  "Salmos", "Proverbios", "Eclesiastés", "Cantares", "Isaías", "Jeremías", "Lamentaciones", "Ezequiel", "Daniel", "Oseas", "Joel", "Amós", "Abdías", "Jonás",
  "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Hageo", "Zacarías", "Malaquías", "Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos", "Corintios", "Gálatas",
  "Efesios", "Filipenses", "Colosenses", "Tesalonicenses", "Timoteo", "Tito", "Filemón", "Hebreos", "Santiago", "Pedro", "Judas", "Apocalipsis",
];
/** Otras formas de nombrar un libro (lo de la derecha es como queda). */
export const LIBROS_OTROS: Record<string, string> = { salmo: "Salmos", "cantar de los cantares": "Cantares", "hechos de los apostoles": "Hechos" };

export const OBJETOS_BASTA = [
  "Arca", "Arpa", "Altar", "Aceite", "Anillo", "Arco", "Aguijón", "Alforja", "Arado", "Aljaba", "Aguja", "Azote",
  "Bocina", "Bastón", "Balanza", "Barca", "Brasero",
  "Corona", "Copa", "Cántaro", "Candelero", "Cesta", "Cayado", "Cinto", "Collar", "Cuerno", "Carro", "Címbalo", "Cítara", "Cuchillo", "Cetro", "Cadena", "Cofre", "Canasta", "Cuerda", "Cama",
  "Denario", "Dracma", "Diadema", "Dardo",
  "Espada", "Escudo", "Escalera", "Efod", "Estandarte", "Escoba", "Estaca", "Espejo",
  "Flecha", "Flauta", "Frasco", "Freno",
  "Grano", "Gavilla", "Granada",
  "Honda", "Hacha", "Hisopo", "Hoz", "Horno", "Hilo",
  "Jarro", "Jabalina", "Jarra",
  "Lámpara", "Lanza", "Llave", "Lebrillo", "Ladrillo", "Lino", "Libro",
  "Maná", "Manto", "Mirra", "Martillo", "Mesa", "Moneda", "Mortero", "Muela", "Mitra",
  "Nardo", "Nave",
  "Odre", "Olla", "Oro", "Óleo",
  "Pan", "Piedra", "Pandero", "Perla", "Pesebre", "Pergamino", "Pluma", "Pectoral", "Plata",
  "Red", "Rollo", "Rueda", "Remo",
  "Sandalia", "Sal", "Saco", "Silla", "Sello", "Salterio", "Sartén",
  "Túnica", "Trompeta", "Tablas", "Talento", "Tienda", "Tamboril", "Tinaja", "Tea", "Tiara", "Telar",
  "Vara", "Velo", "Vasija", "Vaso", "Vestido",
  "Yugo", "Yelmo",
  "Zurrón",
];
