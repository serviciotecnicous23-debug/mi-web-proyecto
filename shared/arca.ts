/**
 * El arca de Joás (fase 4 de la economía del gozo, docs/guion-del-juego.md, capítulo 7), inspirada en «Coins for
 * Change» de Club Penguin: una obra de toda la ciudad cada temporada (28 días). El arca está fuera, a la puerta del
 * templo, arriba de la escalinata; cada uno echa en ella su gozo, hasta 500 por día. La meta se fija al empezar la
 * temporada según la gente que sirve. Cuando se llena, cambia la ciudad hasta el fin de la temporada (lámparas de oro en
 * la escalinata y estandartes en la puerta del templo) y quedan los nombres de los que dieron en el libro del arca; los
 * que dieron 50 o más ganan el título «Dador alegre». Si el ministerio quiere, la ciudad llena el arca por una causa real
 * (la escribe la administración). Pesa cabal: nada al azar.
 */

type Verso = { text: string; ref: string };

/** Lo menos que se echa en el arca, lo más por persona en un día y lo que pide el título «Dador alegre». */
export const ARCA_MINIMO = 10;
export const ARCA_MAXIMO_DIA = 500;
export const ARCA_TITULO_DESDE = 50;
/** Cuántos nombres muestra el libro del arca. */
export const NOMBRES_EN_EL_LIBRO = 30;

/** La meta de la temporada: 1.500 de gozo por cada persona que sirvió en los últimos 7 días (de 3.000 a 300.000). */
export function metaDelArca(activos: number): number {
  return Math.max(3000, Math.min(300000, Math.round((Math.max(0, activos) * 1500) / 100) * 100));
}

export const VERSO_ARCA: Verso = { text: "Mandó, pues, el rey que hiciesen un arca, la cual pusieron fuera, a la puerta de la casa de Jehová;", ref: "2 Crónicas 24:8" };
export const VERSO_ARCA_LLENA: Verso = { text: "Y todos los jefes y todo el pueblo se gozaron, y trajeron ofrendas, y las echaron en el arca hasta llenarla.", ref: "2 Crónicas 24:10" };
export const VERSO_DADOR: Verso = { text: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.", ref: "2 Corintios 9:7" };

/** Lo que se puede echar ahora (lo pedido, sin pasar de lo que falta, de lo que queda hoy ni del gozo que tiene). */
export function cuantoSeEcha(pide: number, c: { falta: number; quedaHoy: number; gozo: number }): number {
  return Math.max(0, Math.min(Math.floor(pide), c.falta, c.quedaHoy, c.gozo));
}

// ---------------------------------------------------------------- respuestas de la API
/** Lo que ve la ciudad (para dibujar el arca y las lámparas cuando se llena). */
export type ArcaVista = { temporada: number; aportado: number; meta: number; llena: boolean };

export type ArcaEstado = ArcaVista & {
  /** Días que quedan de la temporada (contando hoy). */
  quedanDias: number;
  /** Lo que diste hoy, lo que te queda por dar hoy y lo que diste en toda la temporada. */
  hoy: number;
  quedaHoy: number;
  mio: number;
  gozo: number;
  dadores: number;
  /** El libro del arca: los que más dieron (sin los bloqueados). */
  libro: { nombre: string; gozo: number; esMio: boolean }[];
  /** La causa real, si el ministerio la puso. */
  causa: string | null;
  /** Las arcas de las temporadas anteriores. */
  anteriores: ArcaVista[];
  /** Si quien mira es de la administración (puede escribir la causa). */
  admin: boolean;
};
