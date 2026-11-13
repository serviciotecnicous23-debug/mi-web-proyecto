/**
 * El registro de cada jugador («📜 Su registro»): todo lo que ha hecho una persona en Jerusalén en línea, para
 * verlo al visitar su casa, en su ficha de vecino o en las tablas. Es de la PERSONA (su titular y todos sus
 * personajes, uno por camino) y no trae datos personales: solo el nombre del juego y lo que hizo jugando.
 *
 * «Yo conozco tus obras, y amor, y fe, y servicio, y tu paciencia, y que tus obras postreras son más que las
 * primeras.» (Apocalipsis 2:19)
 */
import type { Camino } from "./caminos";

export const VERSO_REGISTRO = {
  text: "Yo conozco tus obras, y amor, y fe, y servicio, y tu paciencia, y que tus obras postreras son más que las primeras.",
  ref: "Apocalipsis 2:19",
};

/** Cuánto recuerda el servidor el registro de una persona (lo de otro no hace falta al segundo). */
export const REGISTRO_RECUERDA_MS = 60_000;

/** Cuántas partidas de «¿Quién es sabio?» trae el registro. */
export const REGISTRO_PARTIDAS = 5;

export type CargoRegistro = { temporada: number; cargo: string; perdido: boolean };

export type PersonajeRegistro = {
  id: number;
  nombre: string;
  camino: Camino;
  /** El nombre de su escalón en su camino («Sacerdote de turno», «Vidente»…). */
  escalon: string;
  /** El mérito de la temporada de ahora y su puesto entre los de su camino (null si no sirvió). */
  merito: number;
  puesto: number | null;
  /** El mérito de todas las temporadas. */
  meritoSiempre: number;
  temporadas: number;
  cargos: CargoRegistro[];
};

export type FinSabio = "gano" | "retiro" | "perdio" | "tiempo";

export type PartidaRegistro = {
  /** La grada (la pregunta) en que quedó, de 1 a 15. */
  grada: number;
  puntos: number;
  /** Cuánto duró, en segundos. */
  segundos: number;
  fin: FinSabio;
  /** El día (AAAA-MM-DD). */
  fecha: string;
};

export type RegistroJugador = {
  personajeId: number;
  nombre: string;
  /** El nombre del título que eligió mostrar (shared/album.ts). */
  titulo: string | null;
  esMio: boolean;
  /** Cuándo empezó (AAAA-MM-DD) y cuántos días distintos ha jugado. */
  desde: string;
  diasJugados: number;
  racha: { actual: number; mejor: number; total: number };
  barrio: number | null;
  personajes: PersonajeRegistro[];
  estudios: {
    aprobados: { id: string; titulo: string; icono: string; fecha: string; perfecto: boolean; nota: number; de: number }[];
    /** Los que empezó y todavía no aprobó: secciones hechas de cuántas. */
    enCurso: { id: string; titulo: string; icono: string; secciones: number; de: number }[];
    instruccion: { partes: number; de: number };
    catedras: { area: string; nombre: string; icono: string; grado: string; nivel: number; aprendidas: number; total: number }[];
  };
  juegos: {
    sabio: { partidas: number; mejor: number; ganadas: number; total: number; ultimas: PartidaRegistro[] };
    duelos: { jugados: number; ganados: number };
    concurso: { semanas: number; mejor: { aciertos: number; de: number; segundos: number } | null };
    consejos: { dados: number; buenos: number };
  };
  casa: {
    nivel: number;
    estrellas: number;
    obras: string[];
    bendiciones: number;
  } | null;
  barrioHecho: {
    ayudas: number;
    reuniones: number;
    asistencias: number;
    banquetes: number;
    regalosDados: number;
    regalosRecibidos: number;
    piedras: number;
    arca: number;
    historia: number;
    recados: number;
  };
  /** Los logros en línea que ganó (ids de shared/logros-en-linea.ts). */
  logros: string[];
  album: {
    cosas: number;
    colecciones: { id: string; nombre: string; icono: string; tiene: number; de: number; completa: boolean }[];
  };
};

export const NOMBRE_FIN: Record<FinSabio, string> = {
  gano: "Ganó las 15 gradas",
  retiro: "Se retiró con lo ganado",
  perdio: "Falló una pregunta",
  tiempo: "Se le acabó el tiempo",
};

/** «3 min 20 s», «45 s», «1 h 2 min». */
export function duracion(segundos: number): string {
  const s = Math.max(0, Math.round(segundos));
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  if (m < 60) return s % 60 ? `${m} min ${s % 60} s` : `${m} min`;
  const h = Math.floor(m / 60);
  return m % 60 ? `${h} h ${m % 60} min` : `${h} h`;
}

/** Un resumen corto para la cabecera: lo más llamativo que hizo. */
export function resumenRegistro(r: RegistroJugador): string[] {
  const out: string[] = [];
  const alto = [...r.personajes].sort((a, b) => b.meritoSiempre - a.meritoSiempre)[0];
  if (alto && alto.meritoSiempre > 0) out.push(`${alto.escalon} · ${alto.meritoSiempre.toLocaleString("es")} de mérito en total`);
  if (r.estudios.aprobados.length) out.push(`${r.estudios.aprobados.length} ${r.estudios.aprobados.length === 1 ? "estudio aprobado" : "estudios aprobados"}`);
  if (r.juegos.sabio.mejor > 0) out.push(`Llegó a la grada ${r.juegos.sabio.mejor} en «¿Quién es sabio?»`);
  if (r.racha.mejor >= 3) out.push(`Racha de ${r.racha.mejor} días`);
  if (r.casa && r.casa.estrellas > 1) out.push(`Casa de ${r.casa.estrellas} estrellas`);
  return out.slice(0, 4);
}
