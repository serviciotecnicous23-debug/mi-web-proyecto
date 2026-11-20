/**
 * Las reglas de forma de los esquemas visuales de una lección (línea de tiempo, cuadro comparativo y pasos): las usan el
 * verificador del contenido (scripts/academia/verificar.ts) y sus pruebas. Que se lean bien en el teléfono.
 */
import type { Bloque } from "./tipos";

export const LIMITES_ESQUEMA = {
  titulo: 70,
  eventos: [4, 10],
  fecha: 20,
  evento: 140,
  columnas: [2, 4],
  filas: [3, 8],
  celda: 120,
  pasos: [3, 7],
  tituloPaso: 50,
  textoPaso: 200,
} as const;

/** Lo que está mal en un bloque de esquema (vacío si está bien; los demás tipos de bloque no se revisan aquí). */
export function problemasDeBloque(b: Bloque): string[] {
  const p: string[] = [];
  const L = LIMITES_ESQUEMA;
  const largo = (t: string | undefined, max: number, que: string) => {
    if (!t?.trim()) p.push(`${que} vacío`);
    else if (t.length > max) p.push(`${que} pasa de ${max} letras (${t.length})`);
    else if (/[«»]/.test(t)) p.push(`${que} lleva comillas « »: en los esquemas la Biblia va solo por referencia`);
  };
  const rango = (n: number, [a, z]: readonly [number, number], que: string) => {
    if (n < a || n > z) p.push(`${que}: ${n} (van de ${a} a ${z})`);
  };
  switch (b.t) {
    case "linea":
      largo(b.titulo, L.titulo, "el título");
      rango(b.eventos.length, L.eventos, "los eventos");
      b.eventos.forEach((e, i) => {
        largo(e.fecha, L.fecha, `la fecha ${i + 1}`);
        largo(e.texto, L.evento, `el evento ${i + 1}`);
      });
      break;
    case "cuadro":
      largo(b.titulo, L.titulo, "el título");
      rango(b.columnas.length, L.columnas, "las columnas");
      rango(b.filas.length, L.filas, "las filas");
      b.columnas.forEach((c, i) => largo(c, L.celda, `la columna ${i + 1}`));
      b.filas.forEach((f, i) => {
        if (f.length !== b.columnas.length) p.push(`la fila ${i + 1} tiene ${f.length} celdas y el cuadro ${b.columnas.length} columnas`);
        f.forEach((c, k) => largo(c, L.celda, `la celda ${i + 1}.${k + 1}`));
      });
      break;
    case "pasos":
      largo(b.titulo, L.titulo, "el título");
      rango(b.pasos.length, L.pasos, "los pasos");
      b.pasos.forEach((x, i) => {
        largo(x.titulo, L.tituloPaso, `el título del paso ${i + 1}`);
        largo(x.texto, L.textoPaso, `el paso ${i + 1}`);
      });
      break;
  }
  return p;
}
