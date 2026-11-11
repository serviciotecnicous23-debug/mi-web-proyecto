/**
 * La racha de servicio de Jerusalén en línea: los días seguidos en que la persona sirvió (cumplió al menos un
 * encargo del día o el recado de la calle de los siervos). Cada día que sigue da más gozo, hasta un tope, y hay
 * premios grandes a la semana, al mes y a los cien días. El día de reposo (el sábado) no la rompe: «Acuérdate del
 * día de reposo para santificarlo» (Éxodo 20:8); quien sirve en sábado también lo cuenta.
 * El servidor lleva la cuenta (server/racha.ts); aquí están las reglas, iguales para la pantalla.
 */

/** Gozo por el día N de la racha: 2 el primer día, 2 más cada día, hasta 14. */
export function gozoDeRacha(dias: number): number {
  return Math.max(0, Math.min(14, 2 * dias));
}

/** Los premios grandes de la racha. */
export const HITOS_RACHA: { dias: number; gozo: number; titulo: string }[] = [
  { dias: 7, gozo: 30, titulo: "¡Una semana entera sirviendo!" },
  { dias: 30, gozo: 120, titulo: "¡Un mes de servicio fiel!" },
  { dias: 100, gozo: 400, titulo: "¡Cien días de servicio!" },
];

export const VERSO_RACHA = { text: "Bien, buen siervo y fiel; sobre poco has sido fiel, sobre mucho te pondré; entra en el gozo de tu señor", ref: "Mateo 25:21" };

const numero = (dia: string) => {
  const [y, m, d] = dia.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
};
const clave = (n: number) => new Date(n * 86400000).toISOString().slice(0, 10);

/** Si el día (AAAA-MM-DD) es sábado, el día de reposo. */
export function esReposo(dia: string): boolean {
  return new Date(numero(dia) * 86400000).getUTCDay() === 6;
}

/** El día anterior y el siguiente (AAAA-MM-DD). */
export const diaAntes = (dia: string, n = 1) => clave(numero(dia) - n);
export const diaDespues = (dia: string, n = 1) => clave(numero(dia) + n);

/**
 * Qué pasa con la racha si hoy se sirve: «igual» si ya se contó hoy, «sigue» si el último día fue ayer (o
 * anteayer y ayer fue sábado), «nueva» si se había roto o nunca empezó.
 */
export function pasoDeRacha(ultimo: string | null, hoy: string): "igual" | "sigue" | "nueva" {
  if (!ultimo) return "nueva";
  if (ultimo === hoy) return "igual";
  if (ultimo === diaAntes(hoy)) return "sigue";
  if (ultimo === diaAntes(hoy, 2) && esReposo(diaAntes(hoy))) return "sigue";
  return "nueva";
}

/** Si la racha sigue viva hoy (aunque hoy todavía no se haya servido). */
export function rachaViva(ultimo: string | null, hoy: string): boolean {
  return !!ultimo && pasoDeRacha(ultimo, hoy) !== "nueva";
}

export type RachaVista = {
  /** Días seguidos (0 si se rompió). */
  actual: number;
  mejor: number;
  /** Si hoy ya sirvió. */
  hoy: boolean;
  /** Hoy es sábado: la racha no se pierde aunque no sirva. */
  reposoHoy: boolean;
  /** Tiene racha y hoy todavía no sirvió (y no es sábado): se pierde a medianoche. */
  enPeligro: boolean;
  /** Gozo que dará el próximo día de racha. */
  gozoSiguiente: number;
  proximoHito: { dias: number; gozo: number; titulo: string } | null;
  /** Lo que espera mañana: quién tiene el recado. */
  manana: { quien: string; recado: string };
};
