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
