/**
 * El análisis de las preguntas (docs/academia.md, «El análisis de preguntas»), como el informe estadístico de los
 * cuestionarios de Moodle (teoría clásica de los tests):
 * - facilidad: qué parte de los intentos acertó la pregunta (0 a 100);
 * - discriminación: la correlación punto biserial entre acertarla y el resto del examen (−1 a 1). Una buena pregunta
 *   la aciertan más los que mejor van; si la aciertan más los que peor van (negativa), hay que revisarla;
 * - cuántos se dejan vencer el reloj, y la opción falsa más elegida (si una confunde a muchos, puede ser la redacción).
 * En las escritas: la nota media, cuántas marca el corrector y cuántas cambia la revisión (si la cambia seguido, a la
 * clave le faltan formas).
 *
 * Sin base de datos: recibe los intentos (academia_intentos.respuestas) y las escritas (academia_respuestas).
 */
export type RespuestaRegistrada = { id: string; bien: boolean; tarde: boolean; elegida?: string | null };
export type IntentoRegistrado = { respuestas: RespuestaRegistrada[] };

/** Los umbrales del análisis (con menos de `minimo` intentos no se saca ninguna conclusión). */
export const ANALISIS = { minimo: 8, muyDificil: 25, muyFacil: 95, discriminaPoco: 0.15, tarde: 20, escritas: { minimo: 5, cambiadas: 30, marcadas: 50, notaBaja: 50 } } as const;

export type CifrasPregunta = {
  n: number;
  facilidad: number;
  discriminacion: number | null;
  tarde: number;
  /** La opción falsa más elegida, cuántas veces y qué parte de los errores (sin contar los que se quedaron sin tiempo). */
  distractor: { texto: string; veces: number; parte: number } | null;
  banderas: string[];
};

export type CifrasEscrita = { n: number; promedio: number; marcadas: number; cambiadas: number; cambioMedio: number | null; banderas: string[] };

const media = (xs: number[]) => (xs.length ? xs.reduce((s, v) => s + v, 0) / xs.length : 0);
const dos = (x: number) => Math.round(x * 100) / 100;

/** La correlación punto biserial entre acertar (1) o no (0) y el resto del examen; null si no se puede calcular. */
export function biserial(x: number[], y: number[]): number | null {
  const n = x.length;
  if (n < 3 || y.length !== n) return null;
  const p = media(x);
  if (p === 0 || p === 1) return null;
  const my = media(y);
  const sy = Math.sqrt(y.reduce((s, v) => s + (v - my) ** 2, 0) / n);
  if (sy === 0) return null;
  const m1 = media(y.filter((_, i) => x[i] === 1));
  const m0 = media(y.filter((_, i) => x[i] === 0));
  return dos(((m1 - m0) / sy) * Math.sqrt(p * (1 - p)));
}

/** Lo que hay que mirar de una pregunta, de lo más grave a lo menos. */
export function banderasDe(n: number, facilidad: number, discriminacion: number | null, tarde: number): string[] {
  if (n < ANALISIS.minimo) return [`Pocos datos (${n} ${n === 1 ? "intento" : "intentos"})`];
  const b: string[] = [];
  if (discriminacion != null && discriminacion < 0) b.push("Discrimina al revés");
  if (facilidad < ANALISIS.muyDificil) b.push("Muy difícil");
  if (discriminacion != null && discriminacion >= 0 && discriminacion < ANALISIS.discriminaPoco) b.push("Discrimina poco");
  if (tarde >= ANALISIS.tarde) b.push("Muchos se quedan sin tiempo");
  if (facilidad > ANALISIS.muyFacil) b.push("Muy fácil");
  return b;
}

/** La gravedad para ordenar: primero lo que discrimina al revés, después lo muy difícil, y así. */
export function gravedad(banderas: string[]): number {
  const peso: Record<string, number> = { "Discrimina al revés": 40, "Muy difícil": 20, "Discrimina poco": 10, "Muchos se quedan sin tiempo": 8, "Muy fácil": 4 };
  return banderas.reduce((s, b) => s + (peso[b] ?? 0), 0);
}

/** Las cifras de cada pregunta objetiva que salió en los intentos. */
export function cifrasDePreguntas(intentos: IntentoRegistrado[]): Map<string, CifrasPregunta> {
  const datos = new Map<string, { x: number[]; resto: number[]; tarde: number; falsas: Map<string, number> }>();
  for (const it of intentos) {
    const rs = (Array.isArray(it.respuestas) ? it.respuestas : []).filter((r) => r && typeof r.id === "string");
    if (rs.length < 2) continue;
    const total = rs.filter((r) => r.bien).length;
    for (const r of rs) {
      const d = datos.get(r.id) ?? { x: [], resto: [], tarde: 0, falsas: new Map<string, number>() };
      const b = r.bien ? 1 : 0;
      d.x.push(b);
      d.resto.push((total - b) / (rs.length - 1));
      if (r.tarde) d.tarde++;
      else if (!r.bien && r.elegida) d.falsas.set(r.elegida, (d.falsas.get(r.elegida) ?? 0) + 1);
      datos.set(r.id, d);
    }
  }
  const out = new Map<string, CifrasPregunta>();
  for (const [id, d] of datos) {
    const n = d.x.length;
    const aciertos = d.x.reduce((s, v) => s + v, 0);
    const facilidad = Math.round((100 * aciertos) / n);
    const discriminacion = biserial(d.x, d.resto);
    const tarde = Math.round((100 * d.tarde) / n);
    const errores = n - aciertos - d.tarde;
    let distractor: CifrasPregunta["distractor"] = null;
    for (const [texto, veces] of d.falsas) {
      if (!distractor || veces > distractor.veces) distractor = { texto, veces, parte: errores > 0 ? Math.round((100 * veces) / errores) : 0 };
    }
    out.set(id, { n, facilidad, discriminacion, tarde, distractor, banderas: banderasDe(n, facilidad, discriminacion, tarde) });
  }
  return out;
}

export type EscritaRegistrada = { pregunta_id: string; nota_auto: number; nota_final: number | null; marcas: number };

/** Las cifras de cada pregunta escrita: nota media, cuántas marcó el corrector y cuántas cambió la revisión. */
export function cifrasDeEscritas(filas: EscritaRegistrada[]): Map<string, CifrasEscrita> {
  const por = new Map<string, EscritaRegistrada[]>();
  for (const f of filas) por.set(f.pregunta_id, [...(por.get(f.pregunta_id) ?? []), f]);
  const out = new Map<string, CifrasEscrita>();
  const E = ANALISIS.escritas;
  for (const [id, fs] of por) {
    const n = fs.length;
    const promedio = Math.round(media(fs.map((f) => f.nota_final ?? f.nota_auto)));
    const marcadas = Math.round((100 * fs.filter((f) => f.marcas > 0).length) / n);
    const cambios = fs.filter((f) => f.nota_final != null && f.nota_final !== f.nota_auto);
    const cambiadas = Math.round((100 * cambios.length) / n);
    const cambioMedio = cambios.length ? Math.round(media(cambios.map((f) => (f.nota_final as number) - f.nota_auto))) : null;
    const banderas: string[] = [];
    if (n < E.minimo) banderas.push(`Pocos datos (${n} ${n === 1 ? "respuesta" : "respuestas"})`);
    else {
      if (cambiadas >= E.cambiadas) banderas.push("La revisión la cambia seguido: a la clave le faltan formas");
      if (marcadas >= E.marcadas) banderas.push("El corrector la marca seguido");
      if (promedio < E.notaBaja) banderas.push("Nota media baja");
    }
    out.set(id, { n, promedio, marcadas, cambiadas, cambioMedio, banderas });
  }
  return out;
}
