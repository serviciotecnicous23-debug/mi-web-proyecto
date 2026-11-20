// El catálogo del carro (CarPlay y Android Auto) para la app del ministerio (app-movil/, complemento «Carro»): lo que se
// puede escuchar manejando. El formato es el del complemento (app-movil/plugins/carro: Catalogo.swift y Catalogo.java):
// carpetas con `hijos` y elementos que suenan con `audio`.
// - Radio: la radio en vivo, normal y «ahorra datos» (las mismas direcciones que /api/radio/station).
// - Academia: las lecciones narradas que la persona puede escuchar (quién puede, lo decide server/carro.ts con las mismas
//   reglas que la página de la lección).
// - Prédicas: las publicadas que tienen audio.
// Aquí solo se arma: no toca la base de datos (se prueba en server/carro.test.ts).
import { ESPECIALIDADES, NIVELES, leccionPublica, type MateriaDef } from "@shared/academia";
import type { NarracionVista } from "@shared/narracion";
import {
  AZURACAST_STATION_SHORTCODE,
  DEFAULT_AZURACAST_BASE_URL,
  DEFAULT_AZURACAST_LIGHT_STREAM_URL,
  DEFAULT_AZURACAST_LOGO_URL,
  DEFAULT_AZURACAST_STREAM_URL,
  LEGACY_AZURACAST_BASE_URL,
} from "@shared/radio";

export type AudioCarro = { urls: string[]; enVivo?: boolean; duracion?: number; metadatos?: string[]; artista?: string; album?: string };
export type NodoCarro = {
  id: string;
  titulo: string;
  subtitulo?: string;
  imagen?: string;
  icono?: "radio" | "academia" | "predicas";
  vacio?: string;
  hijos?: NodoCarro[];
  audio?: AudioCarro;
};
export type CatalogoCarro = { version: 1; titulo: string; raiz: NodoCarro[] };

/** Solo https: el reproductor del teléfono rechaza lo demás. Las rutas del propio sitio («/voz/…») se completan. */
export function absoluta(url: string | null | undefined, sitio: string): string | null {
  const limpia = (url || "").trim();
  if (!limpia) return null;
  if (/^https:\/\/[^/]/i.test(limpia)) return limpia;
  if (limpia.startsWith("/") && !limpia.startsWith("//")) return `${sitio}${limpia}`;
  return null;
}

// ---------------------------------------------------------------- la radio

export type RadioCarro = { normal: string[]; ligero: string[]; metadatos: string[] };

const MONTAJE = `/listen/${AZURACAST_STATION_SHORTCODE}/`;
const BASES = [DEFAULT_AZURACAST_BASE_URL, LEGACY_AZURACAST_BASE_URL];

/** Un stream de la radio propia en los dos servidores (el oficial y el antiguo de respaldo); otro stream, solo. */
function conRespaldo(url: string): string[] {
  const i = url.indexOf(MONTAJE);
  if (i < 0) return [url];
  const ruta = url.slice(i);
  return [url, ...BASES.map((base) => `${base}${ruta}`).filter((otra) => otra !== url)];
}

/**
 * Las direcciones de la radio, como /api/radio/station: primero las variables de Render (RADIO_STREAM_URL,
 * RADIO_LIGHT_STREAM_URL), si no, el AzuraCast propio. El servidor antiguo (sslip) queda de respaldo.
 */
export function radioDelCarro(env: Record<string, string | undefined> = process.env): RadioCarro {
  const elegido = (env.RADIO_STREAM_URL || env.PUBLIC_RADIO_STREAM_URL || "").trim();
  const principal = /^https:\/\//i.test(elegido) ? elegido : DEFAULT_AZURACAST_STREAM_URL;
  const propia = principal.includes(MONTAJE);
  const ligeroElegido = (env.RADIO_LIGHT_STREAM_URL || "").trim();
  const ligero = /^https:\/\//i.test(ligeroElegido) ? ligeroElegido : propia ? DEFAULT_AZURACAST_LIGHT_STREAM_URL : null;
  return {
    normal: conRespaldo(principal),
    ligero: ligero ? conRespaldo(ligero) : [],
    metadatos: propia ? BASES.map((base) => `${base}/api/nowplaying/${AZURACAST_STATION_SHORTCODE}`) : [],
  };
}

function carpetaRadio(radio: RadioCarro): NodoCarro {
  const comun = { enVivo: true, metadatos: radio.metadatos, album: "Avivando el Fuego Radio" };
  const hijos: NodoCarro[] = [
    {
      id: "radio:normal",
      titulo: "Radio en vivo",
      subtitulo: "Adoración, alabanza y la Palabra las 24 horas",
      imagen: DEFAULT_AZURACAST_LOGO_URL,
      audio: { urls: radio.normal, ...comun },
    },
  ];
  if (radio.ligero.length) {
    hijos.push({
      id: "radio:ligero",
      titulo: "Radio en vivo · Ahorra datos",
      subtitulo: "La misma señal con menos datos (64 kbps)",
      imagen: DEFAULT_AZURACAST_LOGO_URL,
      audio: { urls: radio.ligero, ...comun },
    });
  }
  return { id: "radio", titulo: "Radio", icono: "radio", hijos };
}

// ---------------------------------------------------------------- la academia

/**
 * Qué lecciones puede escuchar la persona (server/carro.ts lo saca de su sesión):
 * - `todas`: la Dirección académica y los profesores (leen sin inscribirse, como en la página).
 * - `materias`: las materias en que está inscrita (con la inscripción en la academia hecha).
 * - Cualquiera: las lecciones públicas (la primera de cada materia del Nivel 1).
 */
export type PermisoAcademia = {
  abierta: boolean;
  conSesion: boolean;
  inscrito: boolean;
  todas: boolean;
  materias: ReadonlySet<string>;
};

const MATERIAS: MateriaDef[] = [...NIVELES.flatMap((n) => n.materias), ...ESPECIALIDADES.flatMap((e) => e.materias)];

const plural = (n: number, una: string, varias: string) => `${n} ${n === 1 ? una : varias}`;

function vacioAcademia(p: PermisoAcademia): string {
  if (!p.abierta) return "La academia abre pronto.";
  if (!p.conSesion) return "Entra con tu cuenta en la app para escuchar tus lecciones.";
  if (!p.inscrito && !p.todas) return "Inscríbete en la academia desde la app para escuchar tus lecciones.";
  return "Tus materias todavía no tienen lecciones narradas.";
}

export function carpetaAcademia(p: PermisoAcademia, sitio: string, narracion: (leccionId: string) => NarracionVista | null): NodoCarro {
  const hijos: NodoCarro[] = [];
  if (p.abierta) {
    for (const m of MATERIAS) {
      if (!m.disponible) continue;
      const suya = p.todas || p.materias.has(m.id);
      const lecciones: NodoCarro[] = [];
      m.lecciones.forEach((l, i) => {
        if (!suya && !leccionPublica(l.id)) return;
        const grabada = narracion(l.id);
        const url = grabada ? absoluta(grabada.url, sitio) : null;
        if (!grabada || !url) return;
        lecciones.push({
          id: `leccion:${l.id}`,
          titulo: `${i + 1}. ${l.titulo}`,
          subtitulo: `${Math.max(1, Math.round(grabada.segundos / 60))} min · ${m.titulo}`,
          audio: { urls: [url], duracion: Math.round(grabada.segundos), artista: "Academia Avivando el Fuego", album: m.titulo },
        });
      });
      if (!lecciones.length) continue;
      const segundos = lecciones.reduce((total, x) => total + (x.audio?.duracion ?? 0), 0);
      hijos.push({
        id: `materia:${m.id}`,
        titulo: m.titulo,
        subtitulo: `${plural(lecciones.length, "lección", "lecciones")} · ${Math.max(1, Math.round(segundos / 60))} min`,
        hijos: lecciones,
      });
    }
  }
  return { id: "academia", titulo: "Academia", icono: "academia", vacio: vacioAcademia(p), hijos };
}

// ---------------------------------------------------------------- las prédicas

export type PredicaCarro = {
  id: number;
  title: string;
  preacherName?: string | null;
  sermonDate?: Date | string | null;
  seriesName?: string | null;
  audioUrl?: string | null;
  imageUrl?: string | null;
};

const fechaCorta = (valor: Date | string | null | undefined) => {
  if (!valor) return null;
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return null;
  return fecha.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Chicago" });
};

export function carpetaPredicas(predicas: PredicaCarro[], sitio: string): NodoCarro {
  const hijos: NodoCarro[] = [];
  for (const p of predicas) {
    const url = absoluta(p.audioUrl, sitio);
    if (!url) continue;
    const subtitulo = [p.preacherName?.trim(), fechaCorta(p.sermonDate)].filter(Boolean).join(" · ");
    const imagen = absoluta(p.imageUrl, sitio);
    hijos.push({
      id: `predica:${p.id}`,
      titulo: p.title,
      ...(subtitulo ? { subtitulo } : {}),
      ...(imagen ? { imagen } : {}),
      audio: { urls: [url], artista: p.preacherName?.trim() || "Ministerio Avivando el Fuego", album: p.seriesName?.trim() || "Prédicas" },
    });
    if (hijos.length >= 100) break;
  }
  return { id: "predicas", titulo: "Prédicas", icono: "predicas", vacio: "Todavía no hay prédicas con audio.", hijos };
}

// ---------------------------------------------------------------- todo junto

export function catalogoDelCarro(partes: {
  sitio: string;
  radio: RadioCarro;
  academia: PermisoAcademia;
  predicas: PredicaCarro[];
  narracion: (leccionId: string) => NarracionVista | null;
}): CatalogoCarro {
  return {
    version: 1,
    titulo: "Avivando el Fuego",
    raiz: [carpetaRadio(partes.radio), carpetaAcademia(partes.academia, partes.sitio, partes.narracion), carpetaPredicas(partes.predicas, partes.sitio)],
  };
}
