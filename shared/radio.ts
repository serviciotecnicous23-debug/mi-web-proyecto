export type RadioCategoryId =
  | "adoracion"
  | "alabanza"
  | "predicas"
  | "palabras"
  | "devocionales"
  | "testimonios"
  | "jingles";

export type RadioProgram = {
  id: string;
  title: string;
  category: RadioCategoryId;
  days: number[];
  start: string;
  end: string;
  host: string;
  summary: string;
  mood: string;
};

export type RadioCategory = {
  id: RadioCategoryId;
  name: string;
  role: string;
  rotationTarget: string;
  folder: string;
};

export type RotationSlot = {
  minute: string;
  category: RadioCategoryId;
  purpose: string;
};

export type RadioLibraryTrack = {
  id: string;
  title: string;
  fileName: string;
  category: RadioCategoryId;
  url: string;
  size: number;
  createdAt: string;
};

export type RadioStationPayload = {
  name: string;
  slogan: string;
  timezone: string;
  streamUrl: string;
  metadataUrl: string;
  isConfigured: boolean;
  updatedAt: string;
  provider: {
    name: string;
    stationUrl: string;
    streamUrl: string;
    metadataUrl: string;
    isPrimary: boolean;
  };
  library: {
    tracks: RadioLibraryTrack[];
    trackCount: number;
    hasUploadedAudio: boolean;
  };
  liveOverride: {
    isLive: boolean;
    sourceType: string;
    sourceUrl: string;
    title: string;
  };
  now: {
    current: RadioProgram | null;
    next: RadioProgram | null;
  };
  schedule: RadioProgram[];
  categories: RadioCategory[];
  rotationClock: RotationSlot[];
};

export const RADIO_TIMEZONE = "America/Chicago";

export const DEFAULT_AZURACAST_BASE_URL = "https://40.160.2.176.sslip.io";

// Identificador (shortcode) de la estacion en AzuraCast. Fuente unica: todo se deriva de aqui.
export const AZURACAST_STATION_SHORTCODE = "avivando_el_fuego";

export const DEFAULT_AZURACAST_STATION_URL = `${DEFAULT_AZURACAST_BASE_URL}/public/${AZURACAST_STATION_SHORTCODE}`;

export const DEFAULT_AZURACAST_STREAM_URL = `${DEFAULT_AZURACAST_BASE_URL}/listen/${AZURACAST_STATION_SHORTCODE}/radio.mp3`;

export const DEFAULT_AZURACAST_METADATA_URL = `${DEFAULT_AZURACAST_BASE_URL}/api/nowplaying`;

// Logo/branding de la radio servido por AzuraCast.
export const DEFAULT_AZURACAST_LOGO_URL = `${DEFAULT_AZURACAST_BASE_URL}/static/uploads/${AZURACAST_STATION_SHORTCODE}/radio-logo-woodfire-20260520.jpg`;

// URL publica de NUESTRA propia web (despliegue en Render). Es el centro de la experiencia:
// se usa para instalar la PWA, compartir y generar el QR.
export const PUBLIC_SITE_RADIO_URL = "https://ministerioavivandoelfuego.com/radio";

export const LEGACY_PUBLIC_RADIO_STREAM =
  "https://upload.wikimedia.org/wikipedia/commons/8/82/God_of_Our_Fathers_-_Concert_Band_-_United_States_Air_Force_Heritage_of_America_Band.mp3";

export const DEFAULT_PUBLIC_RADIO_STREAM =
  DEFAULT_AZURACAST_STREAM_URL;

export const RADIO_CATEGORIES: RadioCategory[] = [
  {
    id: "adoracion",
    name: "Adoracion",
    role: "Adoracion actual, ministracion, oracion cantada y momentos de altar.",
    rotationTarget: "Base principal 24/7",
    folder: "02_Adoracion_y_Ministracion_Continua",
  },
  {
    id: "alabanza",
    name: "Alabanza",
    role: "Cantos nuevos de gozo, coros, celebracion y apertura de bloques.",
    rotationTarget: "Bloques de manana y tarde",
    folder: "01_Alabanza_Nueva_Coros_y_Gozo",
  },
  {
    id: "predicas",
    name: "Predicas",
    role: "Predicas nuevas y ensenanzas integradas sin juntarse una tras otra.",
    rotationTarget: "5:00, 13:00 y 21:00",
    folder: "04_Predicas_Programadas_Separadas",
  },
  {
    id: "palabras",
    name: "Palabras",
    role: "Capsulas cortas de Escritura, reflexiones y exhortaciones.",
    rotationTarget: "10%",
    folder: "media/palabras",
  },
  {
    id: "devocionales",
    name: "Devocionales",
    role: "Lecturas guiadas, oraciones pastorales y meditaciones diarias.",
    rotationTarget: "7%",
    folder: "media/devocionales",
  },
  {
    id: "testimonios",
    name: "Especiales",
    role: "Audios propios, WhatsApp ministerial y material para revision pastoral.",
    rotationTarget: "Cada 9 canciones",
    folder: "08_Audios_del_Ministerio_y_Especiales",
  },
  {
    id: "jingles",
    name: "Jingles",
    role: "Identidad sonora, separadores IA, proverbios, IDs de emisora y avisos breves.",
    rotationTarget: "Cada 4 canciones",
    folder: "07_Separadores_IA/voz_ia_2026_04",
  },
];

const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];
export const RADIO_WEEKLY_SCHEDULE: RadioProgram[] = [
  {
    id: "adoracion-madrugada",
    title: "Adoracion y Ministracion Continua",
    category: "adoracion",
    days: EVERY_DAY,
    start: "00:00",
    end: "05:00",
    host: "AzuraCast AutoDJ",
    summary: "Adoracion y ministracion para orar, descansar y comenzar el dia.",
    mood: "adoracion",
  },
  {
    id: "predica-madrugada",
    title: "Predica Programada",
    category: "predicas",
    days: EVERY_DAY,
    start: "05:00",
    end: "06:00",
    host: "Archivo de predicas",
    summary: "Mensaje de ensenanza separado de los demas bloques para evitar predicas consecutivas.",
    mood: "ensenanza",
  },
  {
    id: "alabanza-manana",
    title: "Alabanza Nueva, Coros y Gozo",
    category: "alabanza",
    days: EVERY_DAY,
    start: "06:00",
    end: "10:00",
    host: "AzuraCast AutoDJ",
    summary: "Alabanza nueva, coros y celebracion para levantar la fe.",
    mood: "gozo",
  },
  {
    id: "adoracion-mediodia",
    title: "Adoracion y Ministracion",
    category: "adoracion",
    days: EVERY_DAY,
    start: "10:00",
    end: "14:00",
    host: "AzuraCast AutoDJ",
    summary: "Bloque de adoracion con predica prioritaria alrededor de la 1:00 PM.",
    mood: "ministracion",
  },
  {
    id: "alabanza-tarde-temprana",
    title: "Alabanza y Gozo",
    category: "alabanza",
    days: EVERY_DAY,
    start: "14:00",
    end: "16:00",
    host: "AzuraCast AutoDJ",
    summary: "Cantos de celebracion y acompanamiento para la tarde.",
    mood: "gozo",
  },
  {
    id: "adoracion-atardecer",
    title: "Adoracion y Ministracion",
    category: "adoracion",
    days: EVERY_DAY,
    start: "16:00",
    end: "18:00",
    host: "AzuraCast AutoDJ",
    summary: "Adoracion, oracion y ministracion antes del bloque familiar.",
    mood: "ministracion",
  },
  {
    id: "alabanza-tarde",
    title: "Alabanza Nueva, Coros y Gozo",
    category: "alabanza",
    days: EVERY_DAY,
    start: "18:00",
    end: "20:00",
    host: "AzuraCast AutoDJ",
    summary: "Rotacion de gozo para acompanamiento familiar y evangelismo digital.",
    mood: "acompanamiento",
  },
  {
    id: "cierre-adoracion",
    title: "Cierre en Adoracion",
    category: "adoracion",
    days: EVERY_DAY,
    start: "20:00",
    end: "00:00",
    host: "AzuraCast AutoDJ",
    summary: "Cierre del dia con adoracion y predica prioritaria alrededor de las 9:00 PM.",
    mood: "reposo",
  },
];

export const RADIO_ROTATION_CLOCK: RotationSlot[] = [
  { minute: "00", category: "jingles", purpose: "Identificacion, proverbio o separador de Avivando el Fuego Radio" },
  { minute: "04", category: "adoracion", purpose: "Adoracion y ministracion como base principal" },
  { minute: "18", category: "alabanza", purpose: "Alabanza, coros y gozo" },
  { minute: "32", category: "testimonios", purpose: "Audio especial del ministerio o aviso pastoral" },
  { minute: "45", category: "predicas", purpose: "Predica solo en bloques separados y horarios definidos" },
];

function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function getTimeInZone(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const weekdayText = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const hourText = parts.find((part) => part.type === "hour")?.value ?? "0";
  const minuteText = parts.find((part) => part.type === "minute")?.value ?? "0";
  const hour = Number(hourText) === 24 ? 0 : Number(hourText);

  return {
    weekday: weekdayMap[weekdayText] ?? 0,
    minutes: hour * 60 + Number(minuteText),
  };
}

function programIsActive(program: RadioProgram, weekday: number, minutes: number): boolean {
  const start = timeToMinutes(program.start);
  const end = timeToMinutes(program.end);

  if (start < end) {
    return program.days.includes(weekday) && minutes >= start && minutes < end;
  }

  return (
    (program.days.includes(weekday) && minutes >= start) ||
    (program.days.includes((weekday + 6) % 7) && minutes < end)
  );
}

export function getRadioNow(
  date = new Date(),
  timezone = RADIO_TIMEZONE,
  schedule = RADIO_WEEKLY_SCHEDULE,
) {
  const { weekday, minutes } = getTimeInZone(date, timezone);
  const current = schedule.find((program) => programIsActive(program, weekday, minutes)) ?? null;

  let next: RadioProgram | null = null;
  let nearestDelta = Number.POSITIVE_INFINITY;

  for (const program of schedule) {
    const start = timeToMinutes(program.start);
    for (const day of program.days) {
      let delta = ((day - weekday + 7) % 7) * 1440 + start - minutes;
      if (delta <= 0) delta += 7 * 1440;
      if (delta < nearestDelta) {
        nearestDelta = delta;
        next = program;
      }
    }
  }

  return { current, next };
}
