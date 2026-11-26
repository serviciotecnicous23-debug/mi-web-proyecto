/**
 * El cuadro de honor de la academia (pedido de Luis, 26-nov): la clasificación de los estudiantes, la comunidad (los
 * activos y los egresados) y el perfil de cada uno con su vitrina. Liviano: lo usan el servidor y las páginas.
 *
 * Cómo se ordena (`puntosDeHonor`):
 * - los puntos de honor son la suma de las notas de las materias aprobadas SIN los puntos extra (lo que logró con el
 *   curso y el examen) más la MITAD de los puntos extra del reto de dominio: practicar ayuda, pero lo logrado a la
 *   primera pesa más;
 * - a igual puntaje va primero quien tiene mejor promedio sin puntos extra (quien respondió todo bien no queda debajo
 *   de quien llegó con práctica), después quien aprobó más materias y después quien llegó antes (menos tiempo).
 */
import type { EstatusAlumno, InsigniaMateria } from "./academia-base";

/** Una materia aprobada, como la usa el cuadro. */
export type MateriaHonor = { nivel: number | null; base: number; extra: number; fecha: string | null };

export type PuntosHonor = { puntos: number; promedio: number; aprobadas: number; extra: number; ultima: string | null };

/** Los puntos de honor de un estudiante (de todas sus materias aprobadas, o solo las de un nivel). */
export function puntosDeHonor(materias: MateriaHonor[], nivel: number | null = null): PuntosHonor {
  const ms = nivel == null ? materias : materias.filter((m) => m.nivel === nivel);
  if (!ms.length) return { puntos: 0, promedio: 0, aprobadas: 0, extra: 0, ultima: null };
  const base = ms.reduce((a, m) => a + m.base, 0);
  const extra = ms.reduce((a, m) => a + m.extra, 0);
  const ultima = ms.map((m) => m.fecha).filter(Boolean).sort().pop() ?? null;
  return { puntos: Math.round(base + extra / 2), promedio: Math.round(base / ms.length), aprobadas: ms.length, extra, ultima };
}

/** El orden del cuadro: puntos, promedio sin extra, más materias, antes (y el nombre, para que nunca empaten). */
export function compararHonor(a: PuntosHonor & { nombre: string }, b: PuntosHonor & { nombre: string }): number {
  return (
    b.puntos - a.puntos ||
    b.promedio - a.promedio ||
    b.aprobadas - a.aprobadas ||
    (a.ultima ?? "9").localeCompare(b.ultima ?? "9") ||
    a.nombre.localeCompare(b.nombre, "es")
  );
}

/** Un nombre corto para el cuadro: el primer nombre y el primer apellido («Ruth Mejía»). */
export function nombreDeCuadro(nombres: string, apellidos: string): string {
  const palabra = (s: string) => (s || "").trim().split(/\s+/)[0] ?? "";
  const propio = (w: string) => (w ? w.charAt(0).toLocaleUpperCase("es") + w.slice(1).toLocaleLowerCase("es") : "");
  return [propio(palabra(nombres)), propio(palabra(apellidos))].filter(Boolean).join(" ") || "Estudiante";
}

/** Una fila de la clasificación. */
export type FilaHonor = PuntosHonor & {
  puesto: number;
  userId: number;
  nombre: string;
  nivel: number;
  pais: string;
  iglesia: string;
  insignias: number;
  medallas: number;
  propio: boolean;
};

export type CuadroHonor = {
  nivel: number | null;
  total: number;
  filas: FilaHonor[];
  /** El estudiante que mira: su puesto (general y en su nivel) y si se muestra en el cuadro. */
  yo: { alumno: boolean; visible: boolean; puesto: number | null; puestoNivel: number | null; nivel: number | null; puntos: number } | null;
};

/** Un estudiante de la comunidad (activos y egresados). */
export type EstudianteCuadro = {
  userId: number;
  nombre: string;
  estatus: EstatusAlumno;
  estatusTexto: string;
  nivel: number;
  pais: string;
  iglesia: string;
  insignias: number;
  medallas: number;
  puesto: number | null;
};

/** El perfil de un estudiante en el cuadro: su vitrina, sus medallas y su puesto. */
export type PerfilHonor = PuntosHonor & {
  userId: number;
  nombre: string;
  estatus: EstatusAlumno;
  estatusTexto: string;
  nivel: number;
  pais: string;
  iglesia: string;
  desde: string;
  niveles: { nivel: number; honores: boolean }[];
  insignias: InsigniaMateria[];
  medallas: { clave: string; nombre: string; detalle: string; fecha: string }[];
  puesto: number | null;
  puestoNivel: number | null;
  propio: boolean;
};
