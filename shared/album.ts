/**
 * El álbum (fase 4 de la economía del gozo, docs/guion-del-juego.md, capítulo 7), inspirado en la colección de Pokémon
 * GO: todo lo que tuviste alguna vez queda anotado (aunque después lo vendas o lo regales). Cada colección completa da
 * un título, y también dan título llenar el arca de la ciudad, invitar a un amigo y juntar muchas cosas. Cada uno elige
 * el título que quiere mostrar: lo ven los vecinos junto a su nombre.
 * «…semejante a un padre de familia, que saca de su tesoro cosas nuevas y cosas viejas.» (Mateo 13:52)
 */
import { ARCOS, prendasDeArco } from "./capitulos";
import { ARTICULOS, type Articulo } from "./mercado";
import { DICHOS } from "./dichos";

type Verso = { text: string; ref: string };

export const VERSO_ALBUM: Verso = {
  text: "El les dijo: Por eso todo escriba docto en el reino de los cielos es semejante a un padre de familia, que saca de su tesoro cosas nuevas y cosas viejas.",
  ref: "Mateo 13:52",
};

/** Las de siempre y una por cada historia de la temporada («historia-senaquerib», «historia-pascua-ezequias»…). */
export type ColeccionId = "muebles" | "muebles-finos" | "ropa" | "ropa-del-anio" | "ropa-fina" | "adornos" | "ganado" | "rangos" | `historia-${string}`;
export type TituloEspecialId = "dador-alegre" | "buen-amigo" | "idoneo" | "oido-sabio" | "coleccionista" | "gran-coleccionista";
export type TituloId = ColeccionId | TituloEspecialId;

const ids = (f: (a: Articulo) => boolean) => ARTICULOS.filter(f).map((a) => a.id);

export type Coleccion = { id: ColeccionId; nombre: string; icono: string; texto: string; items: string[]; titulo: string };

export const COLECCIONES: Coleccion[] = [
  { id: "muebles", nombre: "Los muebles", icono: "🪑", texto: "Todos los muebles del mercado.", items: ids((a) => a.categoria === "mueble" && !a.exclusivo), titulo: "Buen mayordomo" },
  { id: "adornos", nombre: "Los adornos", icono: "🪔", texto: "Los adornos de la puerta y el patio.", items: ids((a) => a.categoria === "adorno" && !a.exclusivo), titulo: "Casa alegre" },
  { id: "ropa", nombre: "La ropa de siempre", icono: "🧥", texto: "Los mantos y las fajas que siempre se venden.", items: ids((a) => a.categoria === "ropa" && !a.exclusivo && !a.deTemporada), titulo: "Bien vestido" },
  {
    id: "ropa-del-anio",
    nombre: "La ropa del año",
    icono: "📅",
    texto: "La prenda de cada estación y de cada fiesta. Fuera de su tiempo, solo de otro jugador en el intercambio.",
    items: ids((a) => a.categoria === "ropa" && !a.exclusivo && !!a.deTemporada),
    titulo: "Guarda los tiempos",
  },
  { id: "muebles-finos", nombre: "Los muebles finos", icono: "✨", texto: "Los muebles dorados que hace el artesano con 4 iguales.", items: ids((a) => a.categoria === "mueble" && a.exclusivo === "taller"), titulo: "Artífice" },
  { id: "ropa-fina", nombre: "La ropa fina", icono: "🧵", texto: "La ropa bordada de oro que hace el artesano con 4 iguales.", items: ids((a) => a.categoria === "ropa" && a.exclusivo === "taller"), titulo: "Bordador de oro" },
  {
    id: "ganado",
    nombre: "Lo que se gana",
    icono: "🏆",
    texto: "No se vende: los trajes de los sabios, el mejor vestido, la faja del buen amigo y el manto de Elías (el de los mentores).",
    items: ids((a) => a.exclusivo === "sabio" || a.exclusivo === "regreso" || a.exclusivo === "amigo" || a.exclusivo === "mentor"),
    titulo: "Tesoro de Jerusalén",
  },
  {
    id: "rangos",
    nombre: "Las prendas de los rangos",
    icono: "🎖️",
    texto: "Una por cada examen de rango aprobado, en los tres caminos (se ganan en el aula).",
    items: ids((a) => a.exclusivo === "rango"),
    titulo: "Diligente en la Palabra",
  },
  // las prendas de cada historia de la temporada (shared/capitulos.ts): una colección por historia, con su título
  ...ARCOS.map(
    (a): Coleccion => ({
      id: `historia-${a.id}`,
      nombre: a.titulo,
      icono: a.album.icono,
      texto: "La historia de la temporada: una prenda por cada capítulo que la ciudad cumple contigo, y la de la fiesta final. No se venden, y vuelven cuando se vuelve a contar la historia.",
      items: prendasDeArco(a),
      titulo: a.album.titulo,
    }),
  ),
];

/** Cuántas cosas distintas piden los títulos de coleccionista. */
export const COLECCIONISTA = 40;
export const GRAN_COLECCIONISTA = 100;

export const TITULOS_ESPECIALES: { id: TituloEspecialId; titulo: string; como: string }[] = [
  { id: "dador-alegre", titulo: "Dador alegre", como: "Echa 50 de gozo o más en el arca de Joás de una temporada en que la ciudad la llene." },
  { id: "buen-amigo", titulo: "Buen amigo", como: "Invita a un amigo que juegue 3 días en Jerusalén." },
  { id: "idoneo", titulo: "Idóneo para enseñar", como: "Sé mentor de un nuevo hasta que termine sus seis pasos." },
  { id: "oido-sabio", titulo: "Oído de sabio", como: `Junta los ${DICHOS.length} dichos de los ancianos de la puerta.` },
  { id: "coleccionista", titulo: "Coleccionista", como: `Junta ${COLECCIONISTA} cosas distintas en tu álbum.` },
  { id: "gran-coleccionista", titulo: "Gran coleccionista", como: `Junta ${GRAN_COLECCIONISTA} cosas distintas en tu álbum.` },
];

/** Todo lo que puede ir en el álbum. */
export const EN_EL_ALBUM = new Set(COLECCIONES.flatMap((c) => c.items));

/** El nombre de un título (o null si no existe). */
export function nombreDeTitulo(id: unknown): string | null {
  if (typeof id !== "string") return null;
  return COLECCIONES.find((c) => c.id === id)?.titulo ?? TITULOS_ESPECIALES.find((t) => t.id === id)?.titulo ?? null;
}

/** Los títulos ganados con lo que tiene en el álbum y lo demás (el arca, los amigos, los aprendices y los dichos). */
export function titulosGanados(tengo: ReadonlySet<string>, extra: { dador: boolean; amigo: boolean; mentor?: boolean; dichos?: number }): TituloId[] {
  const out: TituloId[] = [];
  for (const c of COLECCIONES) if (c.items.length && c.items.every((i) => tengo.has(i))) out.push(c.id);
  if (extra.dador) out.push("dador-alegre");
  if (extra.amigo) out.push("buen-amigo");
  if (extra.mentor) out.push("idoneo");
  if ((extra.dichos ?? 0) >= DICHOS.length) out.push("oido-sabio");
  const n = [...tengo].filter((i) => EN_EL_ALBUM.has(i)).length;
  if (n >= COLECCIONISTA) out.push("coleccionista");
  if (n >= GRAN_COLECCIONISTA) out.push("gran-coleccionista");
  return out;
}

/** Lo que se lee de lo guardado: solo lo que puede ir en el álbum. */
export function leerAlbum(v: unknown): string[] {
  return Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === "string" && EN_EL_ALBUM.has(x)))] : [];
}

// ---------------------------------------------------------------- respuestas de la API
export type AlbumEstado = {
  tengo: string[];
  /** Los dichos de los ancianos que tiene (shared/dichos.ts). */
  dichos: string[];
  titulos: TituloId[];
  /** El título que muestra (o null). */
  titulo: TituloId | null;
};
