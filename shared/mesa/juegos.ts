/**
 * El catálogo de los juegos de grupo tradicionales del patio (sin marca, con dibujos y nombres propios): lo que se
 * ve en la lista del patio, cuántos caben, sus opciones y su versículo (RVR1960, textual). Lo comparten el servidor y
 * la pantalla.
 */
import type { Verso } from "../ciudad";

export type JuegoMesaId = "loteria" | "generala" | "escaleras" | "damas-chinas" | "memoria" | "basta" | "dibuja";
export const ORDEN_MESAS: JuegoMesaId[] = ["loteria", "generala", "escaleras", "damas-chinas", "memoria", "basta", "dibuja"];
export const esJuegoMesa = (x: unknown): x is JuegoMesaId => typeof x === "string" && (ORDEN_MESAS as string[]).includes(x);

export type OpcionMesa = { id: string; nombre: string; valores: { id: string; nombre: string }[]; inicial: string };

export type JuegoMesaDef = {
  id: JuegoMesaId;
  nombre: string;
  icono: string;
  corto: string;
  como: string[];
  verso: Verso;
  min: number;
  max: number;
  /** Lo que el anfitrión puede elegir antes de empezar. */
  opciones: OpcionMesa[];
  /** El color de su mesa en el patio 3D. */
  color: string;
};

export const JUEGOS_MESA: Record<JuegoMesaId, JuegoMesaDef> = {
  loteria: {
    id: "loteria",
    nombre: "Lotería bíblica",
    icono: "🎴",
    corto: "El cantor saca las cartas y tú marcas tu tabla. ¡Canta «Lotería»!",
    como: [
      "Cada uno tiene una tabla con 16 figuras de la Biblia. El cantor saca las cartas de la baraja, una por una, con su copla y su versículo.",
      "Marca con un frijolito cada figura de tu tabla que ya salió.",
      "Quien completa la figura de la partida (una línea, las esquinas, el centro o la tabla llena) toca «¡Lotería!» y gana. Si no es verdad, espera dos cartas.",
    ],
    verso: { text: "Entonces nuestra boca se llenará de risa, Y nuestra lengua de alabanza;", ref: "Salmos 126:2" },
    min: 2,
    max: 12,
    opciones: [
      {
        id: "modo",
        nombre: "Se busca",
        valores: [
          { id: "linea", nombre: "Una línea" },
          { id: "esquinas", nombre: "Las esquinas" },
          { id: "centro", nombre: "El centro" },
          { id: "llena", nombre: "La tabla llena" },
        ],
        inicial: "linea",
      },
      {
        id: "ritmo",
        nombre: "El cantor",
        valores: [
          { id: "lento", nombre: "Lento" },
          { id: "normal", nombre: "Normal" },
          { id: "rapido", nombre: "Rápido" },
        ],
        inicial: "normal",
      },
    ],
    color: "#b8432f",
  },
  generala: {
    id: "generala",
    nombre: "Generala",
    icono: "🎲",
    corto: "Cinco dados, tres tiros y la planilla: escalera, full, póker y generala.",
    como: [
      "En tu turno tira los cinco dados. Guarda los que quieras y vuelve a tirar el resto, hasta tres tiros.",
      "Anota en una casilla libre de tu planilla: del 1 al 6, escalera (20), full (30), póker (40), generala (50) o doble generala (100). Si no te sirve ninguna, tacha una.",
      "Lo que sale en el primer tiro es «servido» y vale 5 más. ¡La generala servida gana la partida!",
    ],
    verso: { text: "La suerte se echa en el regazo; Mas de Jehová es la decisión de ella.", ref: "Proverbios 16:33" },
    min: 2,
    max: 8,
    opciones: [],
    color: "#2e7d4f",
  },
  escaleras: {
    id: "escaleras",
    nombre: "Escaleras de Jacob",
    icono: "🪜",
    corto: "Tira el dado: las escaleras suben y las serpientes bajan. ¡A la 100!",
    como: [
      "Tira el dado y avanza tu ficha casilla por casilla.",
      "Al pie de una escalera de Jacob, subes (cada una con una virtud). En la cabeza de una serpiente, bajas (cada caída enseña algo).",
      "Gana quien llega justo a la 100: lo que sobra, se devuelve.",
    ],
    verso: { text: "Y soñó: y he aquí una escalera que estaba apoyada en tierra, y su extremo tocaba en el cielo; y he aquí ángeles de Dios que subían y descendían por ella.", ref: "Génesis 28:12" },
    min: 2,
    max: 6,
    opciones: [],
    color: "#c99024",
  },
  "damas-chinas": {
    id: "damas-chinas",
    nombre: "Damas chinas",
    icono: "⭐",
    corto: "La estrella de seis puntas: salta y salta hasta la punta de enfrente.",
    como: [
      "Cada uno tiene diez canicas en una punta de la estrella. Gana quien las lleva todas a la punta de enfrente.",
      "En tu turno mueve una canica: un paso a un hoyo vecino, o saltos sobre otras canicas, encadenados tantos como puedas.",
      "La canica que llegó a su meta ya no sale de ella.",
    ],
    verso: { text: "prosigo a la meta, al premio del supremo llamamiento de Dios en Cristo Jesús.", ref: "Filipenses 3:14" },
    min: 2,
    max: 6,
    opciones: [],
    color: "#3b6fb6",
  },
  memoria: {
    id: "memoria",
    nombre: "Memoria bíblica",
    icono: "🃏",
    corto: "Da vuelta dos cartas: junta a cada personaje con su versículo.",
    como: [
      "Las cartas están boca abajo: unas tienen un personaje de la Biblia y otras su versículo.",
      "En tu turno da vuelta dos. Si son pareja, te las llevas y vuelves a jugar; si no, se tapan otra vez.",
      "Gana quien junta más parejas. Solo, se juega contra el reloj.",
    ],
    verso: { text: "En mi corazón he guardado tus dichos, Para no pecar contra ti.", ref: "Salmos 119:11" },
    min: 1,
    max: 6,
    opciones: [
      {
        id: "tamano",
        nombre: "Las cartas",
        valores: [
          { id: "chico", nombre: "12 parejas" },
          { id: "grande", nombre: "18 parejas" },
        ],
        inicial: "chico",
      },
    ],
    color: "#8a54b8",
  },
  basta: {
    id: "basta",
    nombre: "«Basta» bíblico",
    icono: "✍️",
    corto: "Una letra: personaje, lugar, libro y objeto. ¡El primero dice «Basta»!",
    como: [
      "Sale una letra. Escribe una palabra de la Biblia que empiece con ella en cada categoría: personaje, lugar, libro y objeto.",
      "El primero que llena las cuatro dice «¡Basta!» y los demás tienen unos segundos para terminar.",
      "Lo que vale y nadie más puso: 100 puntos; repetido: 50. Son 5 rondas.",
    ],
    verso: { text: "El hombre se alegra con la respuesta de su boca; Y la palabra a su tiempo, ¡cuán buena es!", ref: "Proverbios 15:23" },
    min: 2,
    max: 12,
    opciones: [],
    color: "#1fa3a3",
  },
  dibuja: {
    id: "dibuja",
    nombre: "Dibuja y adivina",
    icono: "🖍️",
    corto: "Uno dibuja una palabra de la Biblia y los demás la adivinan entre ocho.",
    como: [
      "Por turnos, cada uno dibuja una palabra de la Biblia que solo él ve. Los demás miran el dibujo y eligen entre ocho palabras.",
      "Adivinar primero vale más; quien dibuja gana por cada uno que adivina. No se escriben letras en el dibujo.",
      "Solo, es práctica: dibuja tres palabras con el reloj. Los compañeros de la computadora aquí solo miran.",
    ],
    verso: { text: "Escribe la visión, y declárala en tablas, para que corra el que leyere en ella.", ref: "Habacuc 2:2" },
    min: 1,
    max: 12,
    opciones: [],
    color: "#e06aa0",
  },
};

/** Las opciones que el anfitrión puede mandar (las que no existen se ignoran). */
export function opcionesValidas(juego: JuegoMesaId, x: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  const o = x && typeof x === "object" ? (x as Record<string, unknown>) : {};
  for (const op of JUEGOS_MESA[juego].opciones) {
    const v = o[op.id];
    out[op.id] = typeof v === "string" && op.valores.some((w) => w.id === v) ? v : op.inicial;
  }
  return out;
}

/**
 * Las mesas de estos juegos en el patio (las mismas coordenadas de la ciudad): tres junto al muro del poniente y tres
 * frente a la grada del oriente, lejos del camino de la carrera y del muro. Cada una con su juego encima, sus banquitos
 * y gente sentada jugando (ciudad/mesas3d.ts). Lo que ocupan, con los banquitos, no se puede pisar.
 */
export const MESAS_PATIO: { id: JuegoMesaId; x: number; z: number }[] = [
  { id: "loteria", x: 47.6, z: -63.9 },
  { id: "generala", x: 47.6, z: -60.5 },
  { id: "escaleras", x: 47.6, z: -57.1 },
  { id: "damas-chinas", x: 62.9, z: -64.3 },
  { id: "memoria", x: 62.9, z: -61.0 },
  { id: "basta", x: 62.9, z: -57.8 },
];
/** Del centro de la mesa al borde de lo que ocupa (la mesa y sus banquitos). */
export const MESA_PATIO_MEDIO = 1.3;
