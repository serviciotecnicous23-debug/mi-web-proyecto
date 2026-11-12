/**
 * Invita a un amigo (fase 4 de la economía del gozo, docs/guion-del-juego.md, capítulo 7): cada persona tiene un código
 * y un enlace para invitar. Quien entra con él (una cuenta nueva, aprobada, en sus primeros 14 días) queda como su
 * invitado; cuando el amigo juega 3 días distintos en Jerusalén, los dos ganan gozo y la faja del buen amigo. Las
 * cuentas las aprueba el ministerio: esa es la guarda contra las trampas.
 * «Natanael le dijo: ¿De Nazaret puede salir algo de bueno? Le dijo Felipe: Ven y ve.» (Juan 1:46)
 */

type Verso = { text: string; ref: string };

export const INVITAR = {
  /** Días distintos que tiene que jugar el amigo. */
  dias: 3,
  /** Lo que gana el amigo y lo que gana quien lo invitó. */
  gozoInvitado: 100,
  gozoQuienInvita: 150,
  /** Cuántos amigos le dan gozo a una misma persona (después siguen contando, sin gozo). */
  maxPremiados: 10,
  /** Hasta cuántos días después de crear la cuenta se puede usar un código. */
  diasParaUsar: 14,
} as const;

/** La prenda del que invita y del invitado: no se vende, se gana. */
export const PRENDA_AMIGO = { id: "faja-buen-amigo", nombre: "Faja del buen amigo", color: "#3f8f8a" } as const;

export const VERSO_INVITAR: Verso = { text: "Natanael le dijo: ¿De Nazaret puede salir algo de bueno? Le dijo Felipe: Ven y ve.", ref: "Juan 1:46" };
export const VERSO_AMIGO: Verso = { text: "En todo tiempo ama el amigo, Y es como un hermano en tiempo de angustia.", ref: "Proverbios 17:17" };

/** Las letras de los códigos (sin las que se confunden: 0/O, 1/I). */
export const ALFABETO_CODIGO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const LARGO_CODIGO = 6;

/** Un código escrito a mano (con espacios, guiones o en minúsculas) tal como se guarda, o null si no es uno. */
export function normalizarCodigo(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const c = v.toUpperCase().replace(/[\s-]/g, "");
  if (c.length !== LARGO_CODIGO) return null;
  for (const ch of c) if (!ALFABETO_CODIGO.includes(ch)) return null;
  return c;
}

/** El enlace para compartir (con el código). */
export function enlaceDeInvitacion(origen: string, codigo: string): string {
  return `${origen.replace(/\/$/, "")}/juegos/aprendiz-del-templo?invita=${codigo}`;
}

// ---------------------------------------------------------------- respuestas de la API
export type Invitado = { nombre: string; dias: number; premiado: boolean; cuando: string };
export type InvitarEstado = {
  codigo: string;
  invitados: Invitado[];
  /** Cuántos de sus amigos ya le dieron gozo (hasta `INVITAR.maxPremiados`). */
  premiados: number;
  /** Quién lo invitó a él (si entró con un código). */
  meInvito: { nombre: string; dias: number; premiado: boolean } | null;
  /** Si todavía puede escribir el código de quien lo invitó (y si no, por qué). */
  puedeUsar: boolean;
  motivo: string | null;
};
