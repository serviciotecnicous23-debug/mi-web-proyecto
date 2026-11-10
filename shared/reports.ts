// Denuncias de contenido: lo que se puede denunciar y por qué (servidor y cliente).

export const TIPOS_DENUNCIABLES = ["publicacion", "comentario", "oracion", "jugador", "mensaje"] as const;
export type TipoDenunciable = (typeof TIPOS_DENUNCIABLES)[number];

export const NOMBRE_DEL_TIPO: Record<TipoDenunciable, string> = {
  publicacion: "Publicación de Comunidad",
  comentario: "Comentario de Comunidad",
  oracion: "Petición del muro de oración",
  jugador: "Jugador de Jerusalén en línea",
  mensaje: "Mensaje de la charla de un barrio (Jerusalén en línea)",
};

export const MOTIVOS_DE_DENUNCIA = {
  ofensivo: "Insultos, acoso u odio",
  inapropiado: "Contenido sexual o violento",
  spam: "Spam, ventas o publicidad",
  enganio: "Engaño o estafa",
  datos: "Datos personales de otra persona",
  otro: "Otro motivo",
} as const;
export type MotivoDeDenuncia = keyof typeof MOTIVOS_DE_DENUNCIA;

export const ESTADOS_DE_DENUNCIA = ["pendiente", "revisada", "descartada"] as const;
export type EstadoDeDenuncia = (typeof ESTADOS_DE_DENUNCIA)[number];

/** Cuántas denuncias puede hacer una persona en 24 horas (evita abusos del botón). */
export const DENUNCIAS_POR_DIA = 10;
