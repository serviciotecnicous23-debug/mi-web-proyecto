/**
 * Quiénes están ahora en el templo en línea. Lo llena la red de presencia (server/ciudad-red.ts,
 * cuando el teléfono dice que está en el templo) y lo usan los deberes para «servir juntos».
 * Vive en su propio archivo para que la red y Jerusalén no se importen entre sí.
 */
const enTemplo = new Set<number>();

export function marcarEnTemplo(personajeId: number, dentro: boolean) {
  if (dentro) enTemplo.add(personajeId);
  else enTemplo.delete(personajeId);
}

/** Cuántos sacerdotes sirven ahora en el templo, si este personaje está entre ellos (si no, 0). */
export function sirviendoJuntos(personajeId: number): number {
  return enTemplo.has(personajeId) ? enTemplo.size : 0;
}

/** Cuántos están en el templo en línea ahora. */
export function enElTemplo(): number {
  return enTemplo.size;
}
