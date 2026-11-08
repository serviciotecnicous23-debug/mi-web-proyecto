import type { GameScene } from "./engine";

export type Verse = { text: string; ref: string };

export type GameDef = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  howTo: string[];
  /** Ancho / alto del juego (para el tamaño de la pantalla de juego). */
  aspect: number;
  /** Se descarga solo al abrir el juego. */
  load: () => Promise<GameScene>;
  verses: Verse[];
  colors: [string, string];
  badge?: string;
};

export const GAMES_LIST: GameDef[] = [
  {
    slug: "atrapa-el-fuego",
    title: "Atrapa el fuego",
    tagline: "Mantén tu lámpara encendida",
    description:
      "Mueve la lámpara para recoger las llamas que caen del cielo. Las doradas valen más, el aceite te devuelve una vida y el humo te la quita. ¿Hasta qué nivel llegas?",
    howTo: [
      "Celular: desliza el dedo sobre el juego.",
      "Computadora: flechas ← → (o las teclas A y D), o arrastra con el ratón.",
      "🔥 +1 · llama dorada +5 · 💧 aceite: +1 vida · ☁️ humo: −1 vida.",
      "Recoge 10 seguidas para la racha x2, y 25 para la x3.",
    ],
    aspect: 360 / 600,
    load: () => import("./atrapa-el-fuego").then((m) => new m.AtrapaElFuego()),
    verses: [
      { text: "Te aconsejo que avives el fuego del don de Dios que está en ti.", ref: "2 Timoteo 1:6" },
      { text: "No apaguéis al Espíritu.", ref: "1 Tesalonicenses 5:19" },
      { text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", ref: "Salmo 119:105" },
      { text: "Vosotros sois la luz del mundo.", ref: "Mateo 5:14" },
      { text: "Estén ceñidos vuestros lomos, y vuestras lámparas encendidas.", ref: "Lucas 12:35" },
    ],
    colors: ["#f97316", "#7c2d12"],
    badge: "Nuevo",
  },
];

export function findGame(slug: string | undefined | null): GameDef | undefined {
  return GAMES_LIST.find((g) => g.slug === slug);
}
