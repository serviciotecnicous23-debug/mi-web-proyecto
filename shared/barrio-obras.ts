/**
 * Las obras del barrio (Jerusalén en línea, fase 2 de la economía del gozo: «mi barrio»). Los vecinos edifican juntos,
 * con su gozo, una obra común a la vez, en orden: el pozo, los bancos de los ancianos, el horno, los árboles de la
 * calle, el granero y la placa de los constructores (Nehemías 3: cada uno edificó frente a su casa). Cada obra se ve
 * en las calles del barrio y da una ventaja a todas sus casas. Lo dado no se devuelve: es para todos.
 * «Levantémonos y edifiquemos» (Nehemías 2:18).
 */
import type { Verso } from "./ciudad";

export type ObraBarrioId = "pozo" | "bancos" | "horno" | "arboles" | "granero" | "placa";
export type ObraBarrio = {
  id: ObraBarrioId;
  nombre: string;
  icono: string;
  /** El gozo que hace falta entre todos los vecinos. */
  meta: number;
  /** Lo que da a todas las casas del barrio. */
  ventaja: string;
  detalle: string;
  verso: Verso;
};

export const OBRAS_BARRIO: ObraBarrio[] = [
  {
    id: "pozo", nombre: "El pozo del barrio", icono: "🪣", meta: 1500,
    ventaja: "El huerto de todos los vecinos crece 10 % más rápido (lo que se siembra desde que está).",
    detalle: "Un pozo con su brocal de piedra y su techito, en medio de la primera calle.",
    verso: { text: "Y se apartó de allí, y abrió otro pozo, y no riñeron sobre él; y llamó su nombre Rehobot, y dijo: Porque ahora Jehová nos ha prosperado, y fructificaremos en la tierra.", ref: "Génesis 26:22" },
  },
  {
    id: "bancos", nombre: "Los bancos de los ancianos", icono: "🪑", meta: 2500,
    ventaja: "Las reuniones en las casas del barrio premian hasta 15 vecinos (en vez de 10).",
    detalle: "Bancos de piedra a la entrada del barrio, para sentarse a conversar y a enseñar.",
    verso: { text: "Entonces él tomó a diez varones de los ancianos de la ciudad, y dijo: Sentaos aquí. Y ellos se sentaron.", ref: "Rut 4:2" },
  },
  {
    id: "horno", nombre: "El horno del barrio", icono: "🔥", meta: 4000,
    ventaja: "El horno de cada casa termina en la mitad del tiempo.",
    detalle: "Un horno grande de barro al fondo de la segunda calle, para el pan de todos.",
    verso: { text: "El pan nuestro de cada día, dánoslo hoy.", ref: "Mateo 6:11" },
  },
  {
    id: "arboles", nombre: "Los árboles de la calle", icono: "🌳", meta: 6000,
    ventaja: "+5 puntos a las estrellas de cada casa del barrio.",
    detalle: "Árboles a lo largo de la segunda calle, que dan sombra y fruto.",
    verso: { text: "Será como árbol plantado junto a corrientes de aguas, Que da su fruto en su tiempo, Y su hoja no cae; Y todo lo que hace, prosperará.", ref: "Salmos 1:3" },
  },
  {
    id: "granero", nombre: "El granero del barrio", icono: "🌾", meta: 9000,
    ventaja: "El alfolí de cada casa guarda 20 más de cada cosa.",
    detalle: "Un granero redondo de piedra al fondo de la primera calle.",
    verso: { text: "Todos los que habían creído estaban juntos, y tenían en común todas las cosas;", ref: "Hechos 2:44" },
  },
  {
    id: "placa", nombre: "La placa de los constructores", icono: "🪨", meta: 12000,
    ventaja: "+10 puntos a las estrellas de cada casa, y los nombres de los que más dieron, a la entrada del barrio.",
    detalle: "Una piedra grande a la entrada del barrio con los nombres de sus constructores.",
    verso: { text: "Desde la puerta de los Caballos restauraron los sacerdotes, cada uno enfrente de su casa.", ref: "Nehemías 3:28" },
  },
];

export const VERSO_OBRAS_BARRIO: Verso = {
  text: "Entonces les declaré cómo la mano de mi Dios había sido buena sobre mí, y asimismo las palabras que el rey me había dicho. Y dijeron: Levantémonos y edifiquemos. Así esforzaron sus manos para bien.",
  ref: "Nehemías 2:18",
};

/** Lo que se puede dar de una vez (botones), lo mínimo, y lo que se puede dar por día (para que nadie la haga solo). */
export const APORTES_BARRIO = [10, 50, 100, 250] as const;
export const APORTE_MINIMO = 10;
export const APORTE_MAXIMO_DIA = 1000;
/** Cuántos nombres lleva la placa (los que más dieron en todas las obras). */
export const NOMBRES_EN_LA_PLACA = 12;

export function obraBarrio(id: string): ObraBarrio | undefined {
  return OBRAS_BARRIO.find((o) => o.id === id);
}
/** La obra que se está juntando ahora (la primera que falta), o null si están todas. */
export function obraBarrioActual(hechas: readonly string[]): ObraBarrio | null {
  return OBRAS_BARRIO.find((o) => !hechas.includes(o.id)) ?? null;
}

export type VentajasBarrio = {
  /** Cuánto dura el crecimiento del huerto (1 = como siempre). */
  ritmo: number;
  /** Vecinos que premia una reunión. */
  cupoReunion: number;
  /** Cuánto dura lo del horno (1 = como siempre). */
  horno: number;
  /** Puntos de más para las estrellas de cada casa. */
  estrellas: number;
  /** Lo que guarda de más el alfolí de cada casa. */
  alfoli: number;
};
export function ventajasDelBarrio(hechas: readonly string[]): VentajasBarrio {
  const s = new Set(hechas);
  return {
    ritmo: s.has("pozo") ? 0.9 : 1,
    cupoReunion: s.has("bancos") ? 15 : 10,
    horno: s.has("horno") ? 0.5 : 1,
    estrellas: (s.has("arboles") ? 5 : 0) + (s.has("placa") ? 10 : 0),
    alfoli: s.has("granero") ? 20 : 0,
  };
}

// ---------------------------------------------------------------- respuestas de la API
export type ObrasBarrioEstado = {
  barrio: number;
  nombre: string;
  hechas: ObraBarrioId[];
  /** La obra de ahora: lo juntado, la meta y lo que dio cada uno (los primeros). */
  actual: { id: ObraBarrioId; aportado: number; meta: number; aportantes: number } | null;
  /** Lo que diste tú: en la obra de ahora, hoy y en todas. */
  mio: { enEsta: number; hoy: number; total: number; puedeHoy: number };
  /** Los que más dieron en todas las obras del barrio (los de la placa). */
  constructores: { nombre: string; gozo: number }[];
  gozo: number;
  ventajas: VentajasBarrio;
};
export type AporteBarrioRespuesta = ObrasBarrioEstado & { dado: number; terminada: ObraBarrioId | null; gozoTotal: number };
