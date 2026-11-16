// Para leer en voz alta (client/src/components/academia/lectura.tsx): el texto en trozos que la voz del navegador lee
// sin cortarse. No importa nada: sirve igual en el navegador y en las pruebas.

/** El texto en trozos de una o pocas oraciones (los navegadores cortan las frases muy largas). */
export function trozosDeLectura(texto: string, max = 220): string[] {
  const limpio = texto.replace(/\s+/g, " ").trim();
  if (!limpio) return [];
  const oraciones = limpio.match(/[^.!?¡¿…;:]+[.!?…;:]*["»”)]*\s*|[¡¿][^.!?]*[.!?]\s*/g) ?? [limpio];
  const out: string[] = [];
  let actual = "";
  for (const o of oraciones) {
    if (actual && (actual + o).length > max) {
      out.push(actual.trim());
      actual = "";
    }
    if (o.length > max) {
      // una oración muy larga: se corta por las comas
      for (const parte of o.split(/(?<=,)\s+/)) {
        if (actual && (actual + parte).length > max) {
          out.push(actual.trim());
          actual = "";
        }
        actual += `${parte} `;
      }
    } else {
      actual += o;
    }
  }
  if (actual.trim()) out.push(actual.trim());
  return out;
}
