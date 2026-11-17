/**
 * Los minutos reales de cada lección (shared/academia-carga.ts): salen de su contenido (lo que se lee, sus versículos,
 * sus videos y su repaso), no de los minutos fijos que traía cada lección. Se calculan una vez por lección y se usan en
 * todo lo que los muestra o los pide (la página de la lección, la materia, el catálogo, la revisión del contenido y el
 * tiempo mínimo de lectura antes del repaso).
 */
import { leccionPorId, type MateriaDef } from "@shared/academia";
import { contarPalabras, minutosDeLeccion } from "@shared/academia-carga";
import { BANCOS, CONTENIDO } from "./academia/index";

const calculados = new Map<string, number>();

/** Los minutos reales de una lección (los fijos si todavía no tiene contenido publicado). */
export function minutosReales(leccionId: string, fijos: number): number {
  const ya = calculados.get(leccionId);
  if (ya != null) return ya;
  const c = CONTENIDO.get(leccionId);
  const l = leccionPorId(leccionId);
  if (!c || !l) return fijos;
  let palabras =
    contarPalabras(c.paraEmpezar) + contarPalabras(c.ideaClave) + contarPalabras(c.paraLaVida.texto) + contarPalabras(c.paraLaVida.pregunta) +
    c.objetivos.reduce((a, o) => a + contarPalabras(o), 0);
  let versiculos = 0;
  const videos: (number | null)[] = [];
  for (const b of c.bloques) {
    if (b.t === "parrafo" || b.t === "subtitulo") palabras += contarPalabras(b.texto);
    else if (b.t === "lista") palabras += b.items.reduce((a, x) => a + contarPalabras(x), 0);
    else if (b.t === "nota") palabras += contarPalabras(b.titulo) + contarPalabras(b.texto);
    else if (b.t === "versiculo") versiculos++;
    else if (b.t === "video") videos.push(b.minutos ?? null);
    else if (b.t === "linea") palabras += contarPalabras(b.titulo) + b.eventos.reduce((a, e) => a + contarPalabras(e.fecha) + contarPalabras(e.texto), 0);
    else if (b.t === "cuadro") palabras += contarPalabras(b.titulo) + [...b.columnas, ...b.filas.flat()].reduce((a, x) => a + contarPalabras(x), 0);
    else if (b.t === "pasos") palabras += contarPalabras(b.titulo) + b.pasos.reduce((a, p) => a + contarPalabras(p.titulo) + contarPalabras(p.texto), 0);
  }
  const min = minutosDeLeccion({ palabras, versiculos, videos, preguntasRepaso: BANCOS.get(l.materia.id)?.repaso[leccionId]?.length ?? 0, nivel: l.materia.nivel });
  calculados.set(leccionId, min);
  return min;
}

/** Los minutos reales de toda una materia (la suma de sus lecciones). */
export function minutosDeMateria(m: MateriaDef): number {
  return m.lecciones.reduce((a, l) => a + minutosReales(l.id, l.minutos), 0);
}
