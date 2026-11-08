import type { ComponentType } from "react";
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
  /** Juego de lienzo sencillo: se descarga solo al abrir el juego. */
  load?: () => Promise<GameScene>;
  /** Juego con pantalla propia (3D, con partida guardada): se descarga solo al abrirlo. */
  component?: () => Promise<{ default: ComponentType<{ game: GameDef }> }>;
  /** Dibujo de la portada en la sala de juegos. */
  cover?: "fuego" | "templo";
  verses: Verse[];
  colors: [string, string];
  badge?: string;
};

export const GAMES_LIST: GameDef[] = [
  {
    slug: "aprendiz-del-templo",
    title: "El aprendiz del templo",
    tagline: "Del atrio al Lugar Santísimo",
    description:
      "Sirve en el templo en los días del rey Ezequías: recibe las ofrendas del pueblo, mantén vivo el fuego del altar, restaura la casa de Jehová, llama a los levitas y aprende con el sumo sacerdote Azarías hasta vestir las vestiduras santas.",
    howTo: [
      "Toca y arrastra para caminar (en la computadora, flechas o W A S D).",
      "Párate en un lugar y el servicio se hace solo: cargar, entregar, presentar.",
      "Junta el gozo del pueblo para restaurar el templo y llamar levitas.",
      "Aprende con Azarías y sube de rango hasta sumo sacerdote.",
    ],
    aspect: 16 / 10,
    component: () => import("./templo/TemploGame"),
    cover: "templo",
    verses: [
      { text: "Yo me alegré con los que me decían: A la casa de Jehová iremos.", ref: "Salmo 122:1" },
      { text: "El fuego arderá continuamente en el altar; no se apagará.", ref: "Levítico 6:13" },
    ],
    colors: ["#e2b33c", "#5b2a6e"],
    badge: "Nuevo",
  },
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
  },
];

export function findGame(slug: string | undefined | null): GameDef | undefined {
  return GAMES_LIST.find((g) => g.slug === slug);
}
