/**
 * Las reglas del banco de preguntas de la academia (sin base de datos: se prueban en academia-banco.test.ts):
 * - cuándo se puede retirar una pregunta: el banco nunca queda corto para el examen;
 * - la huella del contenido de una materia, que guarda la aprobación doctrinal (si el contenido cambia, la aprobación
 *   deja de estar vigente).
 */
import { createHash } from "node:crypto";
import { examenDe, materiaPorId, type MateriaDef } from "@shared/academia";
import { DECLARACION_FE } from "@shared/academia-declaracion";
import { BANCOS, CONTENIDO, materiaDe } from "./academia/index";

/** La huella de todo lo que se revisa de una materia: su ficha, sus lecciones y su banco (sin «disponible»). */
export function calcularHuella(m: MateriaDef): string {
  const { disponible: _disponible, ...ficha } = m;
  const lecciones = m.lecciones.map((l) => CONTENIDO.get(l.id) ?? null);
  return createHash("sha256").update(JSON.stringify({ ficha, lecciones, banco: BANCOS.get(m.id) ?? null })).digest("hex").slice(0, 32);
}

/** La huella de la declaración de fe: si su texto cambia, la aprobación deja de estar vigente. */
export function huellaDeclaracion(): string {
  return createHash("sha256").update(JSON.stringify(DECLARACION_FE)).digest("hex").slice(0, 32);
}

const huellas = new Map<string, string>();
/** La misma huella, guardada: el contenido no cambia mientras corre el servidor (cambia al publicar). */
export function huellaDe(m: MateriaDef): string {
  let h = huellas.get(m.id);
  if (!h) huellas.set(m.id, (h = calcularHuella(m)));
  return h;
}

/**
 * Por qué no se puede retirar una pregunta (o null si se puede). El banco del examen final debe quedar con el doble de
 * las preguntas del examen (así cada intento trae preguntas nuevas) y cada lección con más de las que el examen saca de
 * ella; las escritas, con el doble de las que pide el examen (y nunca menos de 2).
 */
export function porQueNoSeRetira(id: string, retiradas: ReadonlySet<string>): string | null {
  const materiaId = materiaDe(id);
  const m = materiaId ? materiaPorId(materiaId) : undefined;
  const banco = materiaId ? BANCOS.get(materiaId) : undefined;
  if (!m || !banco) return "Esa pregunta no está en el banco de ningún examen (las del repaso se corrigen en el contenido).";
  const medida = examenDe(m);
  const p = banco.final.find((x) => x.id === id);
  if (p) {
    const activas = banco.final.filter((x) => x.id !== id && !retiradas.has(x.id));
    const minimo = medida.objetivas * 2;
    if (activas.length < minimo) {
      return `El banco quedaría con ${activas.length} preguntas y necesita al menos ${minimo} (el doble del examen) para que cada intento traiga preguntas nuevas. Corrígela en el contenido en lugar de retirarla.`;
    }
    const lecciones = new Set(banco.final.map((x) => x.leccion)).size || 1;
    const cupo = Math.ceil(medida.objetivas / lecciones);
    const deSuLeccion = activas.filter((x) => x.leccion === p.leccion).length;
    if (deSuLeccion <= cupo) {
      return `La lección ${p.leccion} quedaría con ${deSuLeccion} ${deSuLeccion === 1 ? "pregunta" : "preguntas"} y el examen saca hasta ${cupo} de cada lección. Corrígela en el contenido en lugar de retirarla.`;
    }
    return null;
  }
  if (banco.escritas.some((x) => x.id === id)) {
    const activas = banco.escritas.filter((x) => x.id !== id && !retiradas.has(x.id)).length;
    const minimo = Math.max(2, medida.escritas * 2);
    if (activas < minimo) return `Quedarían ${activas} ${activas === 1 ? "pregunta escrita" : "preguntas escritas"} y el examen necesita al menos ${minimo}. Corrígela en el contenido en lugar de retirarla.`;
    return null;
  }
  return "Esa pregunta no está en el banco del examen.";
}
