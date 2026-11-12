/**
 * Los avisos del juego al teléfono (Jerusalén en línea): cuáles hay y qué dicen. Cada persona elige en el juego
 * cuáles quiere; quien no los activó no recibe nada del juego. Nunca de noche (de 22 a 8 h de Texas).
 * El servidor decide cuándo avisar (server/avisos-juego.ts).
 */
export type TipoAviso = "racha" | "huerto" | "duelos" | "fiestas";

export const TIPOS_AVISO: { id: TipoAviso; icono: string; titulo: string; texto: string }[] = [
  { id: "racha", icono: "🔥", titulo: "Tu racha de servicio", texto: "Por la tarde, si hoy todavía no serviste y tu racha se puede perder." },
  { id: "huerto", icono: "🌾", titulo: "Tu huerto, tus obras y tu taller", texto: "Cuando una parcela queda lista para cosechar, cuando terminan una obra de tu casa y cuando el artesano o tu telar terminan lo que hacían." },
  { id: "duelos", icono: "⚔️", titulo: "Duelos de sabios", texto: "Al momento, cuando alguien te reta (el reto dura 45 segundos)." },
  { id: "fiestas", icono: "🎉", titulo: "Fiestas de Jerusalén", texto: "10 minutos antes de una fiesta grande (mérito ×1,5 en el templo), una por día como mucho." },
];

export type PrefAvisos = { activo: boolean } & Record<TipoAviso, boolean>;

export type AvisosVista = {
  /** Si el servidor tiene los avisos encendidos (las claves VAPID en Render). */
  configurado: boolean;
  /** Lo que eligió la persona (null: nunca los activó). */
  pref: PrefAvisos | null;
  /** Cuántos teléfonos o navegadores suyos pueden recibir avisos. */
  telefonos: number;
};

/** Las horas de silencio (Texas): desde las 22 h hasta las 8 h no se avisa. */
export const SILENCIO = { desde: 22, hasta: 8 };
/** La racha se recuerda desde esta hora (Texas) hasta que empieza el silencio. */
export const HORA_RACHA = 19;
