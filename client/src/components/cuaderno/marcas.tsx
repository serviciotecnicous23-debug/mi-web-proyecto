// Los resaltados del alumno pintados sobre el texto de una lección (cada uno, la primera vez que aparece en su bloque).
import { Fragment } from "react";
import { fondoDeColor } from "./texto";

export type Marca = { texto: string; color: string };

export function conMarcas(texto: string, marcas?: Marca[]): React.ReactNode {
  if (!marcas?.length || !texto) return texto;
  const rangos: { desde: number; hasta: number; color: string }[] = [];
  for (const m of marcas) {
    const i = texto.indexOf(m.texto);
    if (i < 0) continue;
    const r = { desde: i, hasta: i + m.texto.length, color: m.color };
    if (!rangos.some((x) => r.desde < x.hasta && x.desde < r.hasta)) rangos.push(r);
  }
  if (!rangos.length) return texto;
  rangos.sort((a, b) => a.desde - b.desde);
  const out: React.ReactNode[] = [];
  let ultimo = 0;
  rangos.forEach((r, i) => {
    if (r.desde > ultimo) out.push(<Fragment key={`t${i}`}>{texto.slice(ultimo, r.desde)}</Fragment>);
    out.push(
      <mark key={`m${i}`} className={`${fondoDeColor(r.color)} rounded px-0.5 text-inherit`} data-resaltado="">
        {texto.slice(r.desde, r.hasta)}
      </mark>,
    );
    ultimo = r.hasta;
  });
  if (ultimo < texto.length) out.push(<Fragment key="fin">{texto.slice(ultimo)}</Fragment>);
  return out;
}
