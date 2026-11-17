// Lo que agregó la revisión del sistema de estudio (docs/academia-auditoria.md) al sílabo de las materias ya publicadas:
// más bibliografía comprobada y, en los Niveles 4 y 5, la lectura ampliada con su reporte. Va aparte para no tocar los
// sílabos originales (shared/academia.ts lo aplica al cargar). Los esquemas, los videos y las preguntas de casos van en
// el servidor (server/academia/esquemas.ts y server/academia/casos.ts).
import type { LecturaAmpliada, Libro, MateriaDef } from "./academia";

export type Complemento = { basica?: Libro[]; complementaria?: Libro[]; ampliada?: LecturaAmpliada };

export const COMPLEMENTOS: Record<string, Complemento> = {
  // La oración: hablar con Dios
  "n1-oracion": {
    complementaria: [
      // comprobado: https://www.christianbook.com/fuego-viento-fresco-fresh-wind-fire/jim-cymbala/9780829706215/pd/706216
      { autor: "Jim Cymbala y Dean Merrill", titulo: "Fuego vivo, viento fresco", editorial: "Vida" },
    ],
  },
  // Doctrinas fundamentales
  "n2-doctrinas": {
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN9780829718539
      {
        autor: "William W. Menzies y Stanley M. Horton",
        titulo: "Doctrinas bíblicas: una perspectiva pentecostal",
        editorial: "Vida",
      },
    ],
  },
  // Mayordomía cristiana
  "n2-mayordomia": {
    complementaria: [
      // comprobado: https://www.editorialmh.org/la-mayordomia
      {
        autor: "Justo L. González",
        titulo: "La mayordomía: en la Biblia, en la Iglesia y en la vida",
        editorial: "Mundo Hispano",
      },
    ],
  },
  // Familia y relaciones
  "n2-familia": {
    complementaria: [
      // comprobado: https://bhespanol.bhpublishinggroup.com/product/el-significado-del-matrimonio-2/
      { autor: "Timothy Keller, con Kathy Keller", titulo: "El significado del matrimonio", editorial: "B&H Español" },
    ],
  },
  // Evangelismo personal
  "n2-evangelismo-personal": {
    complementaria: [
      // comprobado: https://www.perlego.com/es/book/557659/el-caso-de-la-fe-un-periodista-investiga-las-objeciones-ms-difciles-contra-el-cristianismo-pdf
      { autor: "Lee Strobel", titulo: "El caso de la fe", editorial: "Vida" },
    ],
  },
  // La persona y obra del Espíritu Santo
  "n3-espiritu-santo": {
    complementaria: [
      // comprobado: https://www.logos.com/product/10205/pablo-el-espiritu-y-el-pueblo-de-dios
      { autor: "Gordon D. Fee", titulo: "Pablo, el Espíritu y el pueblo de Dios", editorial: "Vida" },
    ],
  },
  // Liderazgo cristiano I
  "n3-liderazgo-1": {
    complementaria: [
      // comprobado: https://www.clie.es/11-curso-de-formacion-teologica-evangelica-ministros-de-jesucristo
      {
        autor: "José M. Martínez",
        titulo: "Ministros de Jesucristo: ministerio, homilética y pastoral",
        editorial: "CLIE",
      },
    ],
  },
  // Homilética I
  "n3-homiletica-1": {
    complementaria: [
      // comprobado: https://catalogobiblio.unach.cl/vufind/Record/16416/Description
      { autor: "John R. W. Stott", titulo: "La predicación: puente entre dos mundos", editorial: "Libros Desafío" },
    ],
  },
  // Historia de la iglesia I
  "n3-historia-1": {
    complementaria: [
      // comprobado: https://www.editorialmh.org/compendio-de-la-historia-cristiana
      { autor: "Robert A. Baker", titulo: "Compendio de la historia cristiana", editorial: "Mundo Hispano" },
      // comprobado: https://www.editorialmh.org/atlas-de-la-biblia-y-de-la-historia-del-cristianismo
      {
        autor: "Tim Dowley",
        titulo: "Atlas de la Biblia y de la historia del cristianismo",
        editorial: "Mundo Hispano",
      },
    ],
  },
  // Teología sistemática I: la Biblia y Dios
  "n4-sistematica-1": {
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN9780829721454
      { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática pentecostal", editorial: "Vida" },
    ],
    ampliada: {
      lectura: "Isaías 40–48: el único Dios verdadero, Creador eterno y Señor de la historia",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Isaias&cap=40",
      minutos: 60,
      reporte: [
        "¿Qué atributos de Dios enseña esta sección (por ejemplo, Isaías 40:12-31; 44:6-8; 46:9-10) y cómo amplían lo que estudiaste sobre su eternidad, su poder y su conocimiento?",
        "¿Cómo muestra el profeta que Jehová es el único Dios frente a los ídolos (Isaías 41:21-24; 44:9-20; 45:18-23), y qué significa que Pablo aplique Isaías 45:23 a Jesús en Filipenses 2:10-11?",
        "¿Qué enseña el anuncio de Ciro (Isaías 44:24–45:7) sobre la providencia de Dios en la historia, y cómo fortalece tu confianza en él ante lo que vives hoy?",
      ],
    },
  },
  // Teología sistemática II: Cristo y el Espíritu Santo
  "n4-sistematica-2": {
    ampliada: {
      lectura: "Hebreos 1–10: el Hijo, verdadero Dios y verdadero hombre, sumo sacerdote eterno y sacrificio una vez para siempre",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Hebreos&cap=1",
      minutos: 50,
      reporte: [
        "¿Con qué argumentos muestran Hebreos 1 y 2 que el Hijo es verdadero Dios y verdadero hombre, y por qué necesitaba ser las dos cosas para salvarnos?",
        "Según Hebreos 7 a 10, ¿en qué supera el sacerdocio de Cristo al de los levitas, y qué significa que se ofreció una vez para siempre?",
        "¿Qué consecuencias saca el autor para la vida del creyente en Hebreos 4:14-16 y 10:19-25, y cómo las aplicarías en tu ministerio?",
      ],
    },
  },
  // Teología sistemática III: el hombre, el pecado y la salvación
  "n4-sistematica-3": {
    ampliada: {
      lectura: "Romanos 1–8: del pecado de todos a la gloria de los hijos de Dios",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Romanos&cap=1",
      minutos: 60,
      reporte: [
        "¿Cómo muestra Pablo en Romanos 1:18–3:20 que judíos y gentiles están todos bajo pecado, y por qué eso hace necesaria la justificación por la fe de Romanos 3:21-28?",
        "Compara a Adán y a Cristo en Romanos 5:12-21: ¿qué trajo cada uno a la humanidad, y qué aclara este pasaje sobre el pecado original y sobre la gracia?",
        "En Romanos 6–8, ¿cómo se relacionan la justificación, la santificación, la adopción y la glorificación? ¿Qué promesa de Romanos 8 usarías para acompañar a un creyente que duda?",
      ],
    },
  },
  // Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos
  "n4-sistematica-4": {
    ampliada: {
      lectura: "1 Corintios 11–15: la Cena del Señor, el cuerpo de Cristo y la resurrección de los muertos",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=1%20Corintios&cap=11",
      minutos: 40,
      reporte: [
        "¿Qué corrige Pablo en la manera en que los corintios celebraban la Cena del Señor (11:17-34), y qué enseña eso sobre el sentido de la ordenanza y sobre examinarse a sí mismo?",
        "¿Cómo usa Pablo la imagen del cuerpo (12:12-27) para enseñar la unidad y la diversidad de los miembros, y qué lugar le da al amor (capítulo 13) en el servicio de cada uno?",
        "¿Por qué la resurrección de Cristo es el fundamento de la fe y de la esperanza del creyente (15:12-22), y cómo describe Pablo el cuerpo resucitado y la victoria final sobre la muerte (15:42-58)?",
      ],
    },
  },
  // Libros poéticos y proféticos
  "n4-poeticos-profeticos": {
    complementaria: [
      // comprobado: https://www.clie.es/libros-poeticos-y-sapienciales-del-antiguo-testamento
      { autor: "Samuel Pagán", titulo: "Libros poéticos y sapienciales del Antiguo Testamento", editorial: "CLIE" },
      // comprobado: https://www.clie.es/libros-profeticos-del-antiguo-testamento
      { autor: "Samuel Pagán", titulo: "Libros proféticos del Antiguo Testamento", editorial: "CLIE" },
    ],
    ampliada: {
      lectura: "Los libros de Amós y Miqueas completos: la justicia que Dios pide, el juicio y la esperanza",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Amos&cap=1",
      minutos: 60,
      reporte: [
        "Amós profetizó a Israel, el reino del norte, y Miqueas sobre Samaria y Jerusalén, en el siglo VIII a. C. (Amós 1:1; Miqueas 1:1). ¿Qué pecados denuncian (Amós 2:6-8; 5:10-12; Miqueas 2:1-2; 3:9-11) y por qué Dios rechaza el culto sin justicia (Amós 5:21-24; Miqueas 6:6-8)?",
        "¿Qué esperanza anuncian después del juicio (Amós 9:11-15; Miqueas 4:1-5; 5:2-5; 7:18-20), y cómo lee el Nuevo Testamento Amós 9:11-12 y Miqueas 5:2 a la luz de Cristo (Hechos 15:13-18; Mateo 2:4-6)?",
        "Escoge uno de estos pasajes y aplícale los tres pasos para leer a los profetas: ¿qué dijo a su pueblo en su tiempo, cómo se cumple en Cristo y en su iglesia y, con humildad, qué falta por cumplirse en la venida de Cristo? Termina con lo que te pide hoy Miqueas 6:8 en tu familia, tu iglesia o tu trabajo.",
      ],
    },
  },
  // Exégesis de un libro: Romanos
  "n5-exegesis": {
    ampliada: {
      lectura: "La carta a los Romanos completa (capítulos 1 al 16), leída de corrido para seguir el hilo de su argumento",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Romanos&cap=1",
      minutos: 80,
      reporte: [
        "Traza el mapa de la carta: ¿cómo desarrolla cada sección (1:18–3:20; 3:21–5:21; 6–8; 9–11; 12–16) la tesis de Romanos 1:16-17, y qué conectores marcan sus giros (3:21; 5:1; 8:1; 12:1)?",
        "¿Cómo aparece la relación entre judíos y gentiles a lo largo de la carta (1:16; 2:9-11; 3:29-30; 4:11-12; 11:17-24; 15:7-12), y qué luz da eso sobre su propósito: la obediencia a la fe en todas las naciones (1:5; 16:26)?",
        "Escoge un pasaje de Romanos 9 a 16 y aplícale los cinco pasos del método: el contexto histórico y literario, las palabras clave y la gramática, la teología en el conjunto de la Escritura y una aplicación concreta para tu iglesia.",
      ],
    },
  },
  // Teología del avivamiento
  "n5-avivamiento": {
    ampliada: {
      lectura: "2 Crónicas 29–36: los avivamientos de Ezequías y Josías, el arrepentimiento de Manasés y el final del reino",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=2%20Cronicas&cap=29",
      minutos: 55,
      reporte: [
        "Compara los pasos de Ezequías (2 Crónicas 29–31) y de Josías (2 Crónicas 34–35): ¿cómo aparecen en cada uno la casa de Dios, la Palabra, el arrepentimiento, el pacto y la Pascua? ¿Qué agrega el texto al patrón de la lección 2?",
        "¿Dónde ves obrar el principio de 2 Crónicas 7:14 (humillarse, orar, buscar a Dios y convertirse) en la oración de Ezequías por el pueblo (30:18-20), en Manasés (33:12-13) y en Josías (34:27)? ¿Cómo responde Dios en cada caso?",
        "2 Crónicas 34:33 dice que el pueblo no se apartó de Jehová todo el tiempo que vivió Josías, y el capítulo 36 cuenta cómo terminó el reino. ¿Qué enseña esto sobre sostener los frutos de un avivamiento y no depender de una sola persona (lección 6)?",
      ],
    },
  },
};

const clave = (l: Libro) => `${l.autor}|${l.titulo}`.toLowerCase().replace(/\s+/g, " ");

/** Agrega a cada sílabo su bibliografía de más (sin repetir libros) y su lectura ampliada. */
export function aplicarComplementos(porId: Map<string, MateriaDef>, complementos: Record<string, Complemento> = COMPLEMENTOS): void {
  for (const [id, c] of Object.entries(complementos)) {
    const s = porId.get(id)?.silabo;
    if (!s) continue;
    for (const [donde, libros] of [["basica", c.basica], ["complementaria", c.complementaria]] as const) {
      const lista = s.bibliografia[donde];
      for (const l of libros ?? []) if (![...s.bibliografia.basica, ...s.bibliografia.complementaria].some((x) => clave(x) === clave(l))) lista.push(l);
    }
    if (c.ampliada) s.ampliada = c.ampliada;
  }
}
