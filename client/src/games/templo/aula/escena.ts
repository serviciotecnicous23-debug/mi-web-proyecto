/**
 * El aula en 3D (Jerusalén en línea): la sala donde se da la clase dentro de cada edificio. Al frente, la tarima con
 * el atril del maestro y el gran rollo colgado en el muro, donde la pluma escribe la pregunta y sus respuestas; por las
 * ventanas del poniente entra la luz (con su polvo que flota) y alumbran las lámparas de aceite; en los bancos están
 * los compañeros, cada uno con su nombre, que levantan la mano, asienten, cuchichean, aplauden y contienen el aliento.
 * La cámara cambia de toma como en «¿Quién es sabio?». Se dibuja en su propio lienzo detrás de la pantalla de la
 * clase; mientras, el edificio y la ciudad duermen.
 *
 * Tres aulas (shared/aula.ts): la escuela de los profetas (adobe, Isaías y Miqueas), la cámara de los sacerdotes
 * (piedra, Eleazar) y la sala de los escribas del palacio (cedro, Eliaquim, con sus pupitres). Nada con forma de cruz:
 * las ventanas llevan barrotes rectos y los adornos son franjas, granadas y rollos.
 */
import * as THREE from "three";
import { Vista } from "../motor/vista";
import { GeoBuilder, disposeGroup, meshPair } from "../three/builder";
import { apagarFuegos, ponerFuegos, sombraDeContacto, type Fuego } from "../three/luces";
import { pisoConTono, tiles } from "../three/structures";
import { BlobShadows, Crowd, Figure, newRig, type CrowdHandle, type FigureLook, type Pose, type Rig } from "../three/characters";
import { DICEN, type AulaDef, type MaestroAula } from "@shared/aula";

// ---------------------------------------------------------------- tipos públicos
export type FaseAula = "llegada" | "menu" | "ensena" | "pregunta" | "anotado" | "revision" | "suspenso" | "bien" | "mal" | "nota" | "aprobado";
export type ReaccionAula = "aplauso" | "asienten" | "mano" | "cuchichean" | "piensan" | "asombro" | "alegria" | "atentos";
export type GestoMaestro = "habla" | "senala" | "escucha" | "aplaude" | "explica" | "piensa" | "saluda";
export type Ropa = { manto?: string; faja?: string } | null;

/** Lo que muestra el gran rollo. */
export type ContenidoRollo =
  | { k: "titulo"; titulo: string; sub?: string; verso?: { text: string; ref: string } }
  | { k: "verso"; titulo?: string; texto: string; ref?: string }
  | { k: "pregunta"; n: number; de: number; texto: string; opciones: string[]; elegida?: number | null; correcta?: number | null; mala?: number | null; tachadas?: number[]; etiqueta?: string }
  | { k: "nota"; aciertos: number; de: number; titulo: string; sub?: string; metal: 0 | 1 | 2 | 3 };

export type OpcionesAula = {
  aula: AulaDef;
  maestro?: MaestroAula;
  alumno: { look: FigureLook; ropa?: Ropa; nombre: string };
  calidad?: "alta" | "baja";
};

// ---------------------------------------------------------------- medidas (una persona mide ~1,2)
const X0 = -4.5;
const X1 = 4.5;
const Z0 = -4.7;
const Z1 = 4.6;
const ALTO = 3.7;
const TARIMA = { z1: -2.45, h: 0.16 };
const ATRIL = { x: -1.55, z: -2.72 };
const MAESTRO = { x: -1.55, z: -3.3 };
const ROLLO = { x: 1.05, y: 2.0, z: Z0 + 0.09, w: 3.3, h: 2.0 };
const FILAS = [-1.0, 0.55, 2.1];
const ASIENTO_ALTO = 0.36;
/** Los asientos: [x, fila]; el del alumno es el primero de la derecha (junto al pasillo). */
const ASIENTOS: [number, number][] = [
  [-2.65, 0], [-1.35, 0], [2.65, 0],
  [-2.65, 1], [-1.35, 1], [1.35, 1], [2.65, 1],
  [-2.0, 2],
];
const ALUMNO = { x: 1.35, z: FILAS[0] };
const VENTANAS = [-1.75, 1.25];
const VENTANA = { y0: 1.45, y1: 2.85, ancho: 1.05 };
/** De dónde viene la luz del sol (de afuera hacia adentro, por las ventanas del poniente). */
const SOL = new THREE.Vector3(0.62, -0.6, -0.12).normalize();

type NombreToma = "general" | "ventana" | "maestro" | "rollo" | "alumnos" | "jugador" | "hombro" | "grua" | "banco";
type Toma = { pos: THREE.Vector3; mira: THREE.Vector3; fov: number; empuje?: number };
type Paso = { toma: NombreToma; dur: number; corte?: boolean };
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function toma(n: NombreToma, t: number): Toma {
  switch (n) {
    case "general":
      return { pos: V(0.35 + Math.sin(t * 0.08) * 0.35, 2.35, 4.25), mira: V(-0.1, 1.35, -3.6), fov: 50, empuje: 0.06 };
    case "ventana":
      return { pos: V(3.1, 1.7, 3.2), mira: V(-3.2, 1.25, -1.0), fov: 52, empuje: 0.05 };
    case "maestro":
      // de un lado del atril, para que la tabla no le tape la cara
      return { pos: V(0.2, 1.62, -1.0), mira: V(MAESTRO.x + 0.15, 1.18 + TARIMA.h, MAESTRO.z), fov: 40, empuje: 0.1 };
    case "rollo":
      return { pos: V(ROLLO.x, 1.85, -0.55), mira: V(ROLLO.x, ROLLO.y + 0.1, ROLLO.z), fov: 50, empuje: 0.08 };
    case "alumnos":
      return { pos: V(0.2 + Math.sin(t * 0.1) * 0.3, 1.85, -3.5), mira: V(0.2, 0.62, 1.1), fov: 56 };
    case "jugador":
      return { pos: V(ALUMNO.x - 0.55, 1.02, ALUMNO.z - 1.35), mira: V(ALUMNO.x, 0.86, ALUMNO.z), fov: 34, empuje: 0.22 };
    case "hombro":
      return { pos: V(ALUMNO.x + 0.62, 1.28, ALUMNO.z + 1.05), mira: V(0.1, 1.45, -4.1), fov: 46, empuje: 0.1 };
    case "banco":
      return { pos: V(-3.6, 1.05, 3.3), mira: V(0.6, 0.85, -1.6), fov: 46, empuje: 0.06 };
    case "grua": {
      const a = -0.55 + Math.sin(t * 0.13) * 0.55;
      return { pos: V(Math.sin(a) * 3.6, 2.7 + Math.sin(t * 0.21) * 0.25, 1.2 + Math.cos(a) * 3.0), mira: V(0, 1.0, -1.4), fov: 54 };
    }
  }
}

type Persona = {
  h: CrowdHandle;
  r: Rig;
  nombre: string;
  base: Pose;
  reac: Pose | null;
  desde: number;
  hasta: number;
  quieto: boolean;
  /** Mira a un lado (para cuchichear): -1, 0 o 1. */
  gira: number;
  asiente: number;
  x: number;
  z: number;
  etiqueta: THREE.Sprite | null;
};

// ---------------------------------------------------------------- texturas pintadas en código
function texturaRadial(c0: string, c1: string, px = 128): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = cv.height = px;
  const g = cv.getContext("2d")!;
  const gr = g.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  gr.addColorStop(0, c0);
  gr.addColorStop(1, c1);
  g.fillStyle = gr;
  g.fillRect(0, 0, px, px);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** El haz de luz: blanco junto a la ventana y transparente al llegar al piso. */
function texturaHaz(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 16;
  cv.height = 128;
  const g = cv.getContext("2d")!;
  const gr = g.createLinearGradient(0, 0, 0, 128);
  gr.addColorStop(0, "rgba(255,255,255,0.95)");
  gr.addColorStop(0.55, "rgba(255,255,255,0.35)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 16, 128);
  // los bordes del haz, más suaves
  const lado = g.createLinearGradient(0, 0, 16, 0);
  lado.addColorStop(0, "rgba(0,0,0,0.55)");
  lado.addColorStop(0.2, "rgba(0,0,0,0)");
  lado.addColorStop(0.8, "rgba(0,0,0,0)");
  lado.addColorStop(1, "rgba(0,0,0,0.55)");
  g.globalCompositeOperation = "destination-out";
  g.fillStyle = lado;
  g.fillRect(0, 0, 16, 128);
  return new THREE.CanvasTexture(cv);
}

function partir(g: CanvasRenderingContext2D, texto: string, ancho: number, maxLineas: number): string[] {
  const palabras = texto.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let linea = "";
  for (const p of palabras) {
    const prueba = linea ? `${linea} ${p}` : p;
    if (g.measureText(prueba).width <= ancho || !linea) linea = prueba;
    else {
      out.push(linea);
      linea = p;
    }
  }
  if (linea) out.push(linea);
  if (out.length > maxLineas) {
    const corto = out.slice(0, maxLineas);
    let ult = corto[maxLineas - 1];
    while (g.measureText(`${ult}…`).width > ancho && ult.length > 1) ult = ult.slice(0, -1);
    corto[maxLineas - 1] = `${ult}…`;
    return corto;
  }
  return out;
}

const LETRAS = ["A", "B", "C", "D", "E"];
const TINTA = "#3a2414";
const ROJA = "#8f2a17";

/** Un renglón que la pluma va escribiendo: su texto, dónde va y cómo se ve. */
type Renglon = { texto: string; x: number; y: number; font: string; color: string; centro?: boolean; marca?: { tipo: "elegida" | "bien" | "mal" | "tachada"; x: number; y: number; w: number; h: number } };

/** El gran rollo: un pergamino entre dos varas, que se vuelve a pintar a medida que la pluma escribe. */
class Rollo {
  canvas = document.createElement("canvas");
  tex: THREE.CanvasTexture;
  mesh: THREE.Mesh;
  private fondo: HTMLCanvasElement;
  private renglones: Renglon[] = [];
  private total = 0;
  private escrito = 0;
  private velocidad = 70;
  private clave = "";
  /** Dónde está la punta de la pluma (0..1 en el pergamino), para la chispa de tinta. */
  punta: { x: number; y: number } | null = null;

  constructor(w: number, h: number, px: number) {
    this.canvas.width = px;
    this.canvas.height = Math.round((px * h) / w);
    this.fondo = this.pintarFondo();
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.tex.anisotropy = 4;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: this.tex }));
  }

  /** El pergamino: crema con fibras, manchas suaves y los bordes oscurecidos. */
  private pintarFondo(): HTMLCanvasElement {
    const cv = document.createElement("canvas");
    cv.width = this.canvas.width;
    cv.height = this.canvas.height;
    const g = cv.getContext("2d")!;
    const W = cv.width, H = cv.height;
    g.fillStyle = "#ecdcb4";
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = `rgba(${120 + Math.random() * 60},${90 + Math.random() * 40},${40 + Math.random() * 30},${Math.random() * 0.05})`;
      g.fillRect(Math.random() * W, Math.random() * H, 1 + Math.random() * 30, 1 + Math.random() * 1.5);
    }
    for (let i = 0; i < 14; i++) {
      const x = Math.random() * W, y = Math.random() * H, r = 20 + Math.random() * 90;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, "rgba(150,110,50,0.07)");
      gr.addColorStop(1, "rgba(150,110,50,0)");
      g.fillStyle = gr;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const borde = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.62);
    borde.addColorStop(0, "rgba(90,55,20,0)");
    borde.addColorStop(1, "rgba(90,55,20,0.42)");
    g.fillStyle = borde;
    g.fillRect(0, 0, W, H);
    // dos franjas finas arriba y abajo, como en los rollos buenos
    g.fillStyle = "rgba(143,42,23,0.55)";
    g.fillRect(W * 0.04, H * 0.045, W * 0.92, H * 0.006);
    g.fillRect(W * 0.04, H * 0.95, W * 0.92, H * 0.006);
    return cv;
  }

  /** Arma los renglones de un contenido (sin pintarlos todavía). */
  private armar(c: ContenidoRollo): Renglon[] {
    const g = this.canvas.getContext("2d")!;
    const W = this.canvas.width, H = this.canvas.height;
    const serif = (px: number, peso = "700") => `${peso} ${Math.round(px)}px Georgia, 'Times New Roman', serif`;
    const out: Renglon[] = [];
    const bloque = (texto: string, font: string, color: string, y0: number, ancho: number, alto: number, max: number, centro = true, x = W / 2) => {
      g.font = font;
      const ls = partir(g, texto, ancho, max);
      ls.forEach((l, i) => out.push({ texto: l, x, y: y0 + i * alto, font, color, centro }));
      return y0 + ls.length * alto;
    };
    if (c.k === "titulo") {
      let y = bloque(c.titulo, serif(H * 0.11, "900"), ROJA, H * 0.2, W * 0.86, H * 0.12, 2);
      if (c.sub) y = bloque(c.sub, serif(H * 0.055, "600"), TINTA, y + H * 0.01, W * 0.84, H * 0.07, 2);
      if (c.verso) {
        y = bloque(`«${c.verso.text}»`, `italic ${serif(H * 0.052, "500")}`, TINTA, y + H * 0.06, W * 0.82, H * 0.068, 5);
        bloque(c.verso.ref, serif(H * 0.05, "800"), ROJA, y + H * 0.02, W * 0.8, H * 0.06, 1);
      }
    } else if (c.k === "verso") {
      let y = H * 0.17;
      if (c.titulo) y = bloque(c.titulo, serif(H * 0.07, "900"), ROJA, y, W * 0.86, H * 0.085, 2) + H * 0.03;
      const largo = c.texto.length;
      const tam = largo > 260 ? 0.05 : largo > 170 ? 0.058 : largo > 100 ? 0.066 : 0.078;
      y = bloque(c.ref ? `«${c.texto}»` : c.texto, `${c.ref ? "italic " : ""}${serif(H * tam, c.ref ? "500" : "600")}`, TINTA, y, W * 0.84, H * tam * 1.3, 8);
      if (c.ref) bloque(c.ref, serif(H * 0.056, "800"), ROJA, y + H * 0.02, W * 0.8, H * 0.06, 1);
    } else if (c.k === "pregunta") {
      const cab = c.etiqueta ?? `Pregunta ${c.n} de ${c.de}`;
      bloque(cab.toUpperCase(), `800 ${Math.round(H * 0.045)}px system-ui, -apple-system, 'Segoe UI', sans-serif`, ROJA, H * 0.1, W * 0.86, H * 0.05, 1);
      const largo = c.texto.length;
      const tam = largo > 150 ? 0.056 : largo > 95 ? 0.064 : 0.074;
      let y = bloque(c.texto, serif(H * tam, "700"), TINTA, H * 0.2, W * 0.86, H * tam * 1.22, 3);
      y += H * 0.03;
      const n = c.opciones.length;
      const alto = Math.min(H * 0.125, (H * 0.9 - y) / Math.max(1, n));
      c.opciones.forEach((o, i) => {
        const font = serif(Math.min(H * 0.054, alto * 0.48), "600");
        g.font = font;
        const xL = W * 0.1;
        const texto = partir(g, `${LETRAS[i]}.  ${o}`, W * 0.8, 1)[0] ?? "";
        const yy = y + i * alto + alto * 0.5;
        const ancho = g.measureText(texto).width;
        let marca: Renglon["marca"];
        if (c.correcta === i) marca = { tipo: "bien", x: xL - W * 0.02, y: yy - alto * 0.42, w: ancho + W * 0.04, h: alto * 0.84 };
        else if (c.mala === i) marca = { tipo: "mal", x: xL - W * 0.02, y: yy - alto * 0.42, w: ancho + W * 0.04, h: alto * 0.84 };
        else if (c.tachadas?.includes(i)) marca = { tipo: "tachada", x: xL, y: yy, w: ancho, h: alto };
        else if (c.elegida === i) marca = { tipo: "elegida", x: xL - W * 0.02, y: yy - alto * 0.42, w: ancho + W * 0.04, h: alto * 0.84 };
        out.push({ texto, x: xL, y: yy, font, color: c.tachadas?.includes(i) ? "rgba(58,36,20,0.45)" : TINTA, centro: false, marca });
      });
    } else if (c.k === "nota") {
      let y = bloque(c.titulo, serif(H * 0.1, "900"), ROJA, H * 0.22, W * 0.86, H * 0.12, 2);
      y = bloque(`${c.aciertos} de ${c.de}`, serif(H * 0.24, "900"), TINTA, y + H * 0.13, W * 0.8, H * 0.24, 1);
      if (c.sub) bloque(c.sub, serif(H * 0.058, "600"), TINTA, y + H * 0.02, W * 0.84, H * 0.075, 3);
    }
    return out;
  }

  /** Escribe un contenido nuevo (con la pluma) o solo cambia sus marcas si es la misma pregunta. */
  mostrar(c: ContenidoRollo, escribir: boolean) {
    const clave = JSON.stringify(c.k === "pregunta" ? { ...c, elegida: 0, correcta: 0, mala: 0, tachadas: [] } : c);
    const mismo = clave === this.clave;
    this.clave = clave;
    this.renglones = this.armar(c);
    this.total = this.renglones.reduce((s, r) => s + r.texto.length, 0);
    if (!mismo) this.escrito = escribir ? 0 : this.total;
    // escribe en unos 2,5 segundos, pero no más lento que 40 letras por segundo
    this.velocidad = Math.max(40, this.total / 2.6);
    this.pintar();
  }

  get escribiendo() {
    return this.escrito < this.total;
  }

  /** Avanza la pluma; devuelve si hubo que pintar. */
  avanzar(dt: number): boolean {
    if (this.escrito >= this.total) {
      this.punta = null;
      return false;
    }
    this.escrito = Math.min(this.total, this.escrito + this.velocidad * dt);
    this.pintar();
    return true;
  }

  terminar() {
    if (this.escrito < this.total) {
      this.escrito = this.total;
      this.pintar();
    }
  }

  private pintar() {
    const g = this.canvas.getContext("2d")!;
    const W = this.canvas.width, H = this.canvas.height;
    g.clearRect(0, 0, W, H);
    g.drawImage(this.fondo, 0, 0);
    g.textBaseline = "middle";
    let quedan = Math.floor(this.escrito);
    this.punta = null;
    for (const r of this.renglones) {
      if (quedan <= 0) break;
      const parte = r.texto.slice(0, quedan);
      quedan -= r.texto.length;
      g.font = r.font;
      g.textAlign = r.centro ? "center" : "left";
      const completo = parte.length >= r.texto.length;
      if (r.marca && completo) {
        const m = r.marca;
        if (m.tipo === "tachada") {
          g.strokeStyle = "rgba(143,42,23,0.75)";
          g.lineWidth = H * 0.007;
          g.beginPath();
          g.moveTo(m.x - W * 0.01, m.y + H * 0.004);
          g.lineTo(m.x + m.w + W * 0.01, m.y - H * 0.006);
          g.stroke();
        } else {
          g.fillStyle = m.tipo === "bien" ? "rgba(46,139,87,0.28)" : m.tipo === "mal" ? "rgba(178,34,34,0.22)" : "rgba(217,154,30,0.3)";
          g.strokeStyle = m.tipo === "bien" ? "#2e8b57" : m.tipo === "mal" ? "#b22222" : "#c9861a";
          g.lineWidth = H * 0.006;
          const rr = m.h * 0.45;
          g.beginPath();
          g.moveTo(m.x + rr, m.y);
          g.lineTo(m.x + m.w - rr, m.y);
          g.quadraticCurveTo(m.x + m.w, m.y, m.x + m.w, m.y + m.h / 2);
          g.quadraticCurveTo(m.x + m.w, m.y + m.h, m.x + m.w - rr, m.y + m.h);
          g.lineTo(m.x + rr, m.y + m.h);
          g.quadraticCurveTo(m.x, m.y + m.h, m.x, m.y + m.h / 2);
          g.quadraticCurveTo(m.x, m.y, m.x + rr, m.y);
          g.closePath();
          g.fill();
          g.stroke();
        }
      }
      g.fillStyle = r.color;
      g.fillText(parte, r.x, r.y);
      if (!completo) {
        const w = g.measureText(parte).width;
        const x = r.centro ? r.x - g.measureText(r.texto).width / 2 + w : r.x + w;
        this.punta = { x: x / W, y: r.y / H };
      }
      if (r.marca && completo && (r.marca.tipo === "bien" || r.marca.tipo === "mal")) {
        g.font = `900 ${Math.round(H * 0.06)}px system-ui, sans-serif`;
        g.textAlign = "left";
        g.fillStyle = r.marca.tipo === "bien" ? "#2e8b57" : "#b22222";
        g.fillText(r.marca.tipo === "bien" ? "✓" : "✗", r.marca.x + r.marca.w + W * 0.012, r.y);
      }
    }
    this.tex.needsUpdate = true;
  }

  dispose() {
    this.tex.dispose();
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}

/** Una etiqueta pintada (el nombre de un compañero o lo que dice). */
function etiqueta(texto: string, o: { fondo: string; borde: string; color: string; ancho?: number; alto?: number; px?: number }): THREE.Sprite {
  const cv = document.createElement("canvas");
  cv.width = o.ancho ?? 256;
  cv.height = o.alto ?? 64;
  const g = cv.getContext("2d")!;
  const W = cv.width, H = cv.height;
  const r = H * 0.38;
  g.beginPath();
  g.moveTo(4 + r, 4);
  g.lineTo(W - 4 - r, 4);
  g.quadraticCurveTo(W - 4, 4, W - 4, H / 2);
  g.quadraticCurveTo(W - 4, H - 4, W - 4 - r, H - 4);
  g.lineTo(4 + r, H - 4);
  g.quadraticCurveTo(4, H - 4, 4, H / 2);
  g.quadraticCurveTo(4, 4, 4 + r, 4);
  g.closePath();
  g.fillStyle = o.fondo;
  g.fill();
  g.lineWidth = 3;
  g.strokeStyle = o.borde;
  g.stroke();
  g.font = `800 ${o.px ?? 28}px system-ui, -apple-system, 'Segoe UI', sans-serif`;
  g.fillStyle = o.color;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(texto.slice(0, 18), W / 2, H / 2 + 1);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, toneMapped: false, transparent: true }));
}

function soltarSprite(s: THREE.Sprite) {
  s.material.map?.dispose();
  s.material.dispose();
}

// ---------------------------------------------------------------- el aula
export class AulaEscena {
  readonly canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  /** La tubería de imagen (motor/vista.ts): tono, gradación, oclusión, resplandor y calidad. */
  private vista: Vista | null = null;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(50, 1, 0.05, 60);
  private raf = 0;
  private vivo = true;
  private last = performance.now();
  private t = 0;
  private w = 1;
  private h = 1;
  private foco = 0.5;
  private altoVirtual = 1;
  private baja: boolean;
  private aula: AulaDef;

  // gente
  private crowd: Crowd;
  private sombras: BlobShadows;
  private maestroH: CrowdHandle | null = null;
  private maestroR: Rig = newRig(MAESTRO.x, MAESTRO.z, 1.08);
  private maestroDef: MaestroAula;
  private gestoMaestro: GestoMaestro = "escucha";
  private gestoHasta = 0;
  private alumno: Figure;
  private alumnoR: Rig = newRig(ALUMNO.x, ALUMNO.z);
  private companeros: Persona[] = [];
  private globos: { s: THREE.Sprite; hasta: number; desde: number; y: number }[] = [];

  // sala
  private rollo = new Rollo(ROLLO.w, ROLLO.h, 1024);
  private sala: THREE.Group | null = null;
  private hemi: THREE.HemisphereLight;
  private sol = new THREE.DirectionalLight("#fff1d6", 1.6);
  private focoMaestro = new THREE.SpotLight("#ffe9c4", 0, 9, 0.5, 0.6, 0);
  private focoAlumno = new THREE.SpotLight("#fff4dc", 0, 8, 0.36, 0.55, 0);
  private focoRollo = new THREE.SpotLight("#ffe2b0", 0, 9, 0.62, 0.7, 0);
  /** Las lámparas: su llama y su luz (three/luces.ts), que alumbra la sala; antes eran luces de verdad, una por lámpara. */
  private lamparas: { llama: THREE.Sprite; base: number; fase: number; fuego: Fuego }[] = [];
  private haces: THREE.MeshBasicMaterial[] = [];
  private charcos: THREE.MeshBasicMaterial[] = [];
  private polvo: THREE.Points | null = null;
  private polvoVel: Float32Array | null = null;
  private chispas: THREE.Points | null = null;
  private chispasVel: Float32Array | null = null;
  private chispasHasta = 0;
  private puntaPluma: THREE.Sprite;
  private recursos: { dispose: () => void }[] = [];

  // dirección
  private fase: FaseAula = "llegada";
  private brillo = 1;
  private brilloMeta = 1;
  private tinte = new THREE.Color("#ffffff");
  private tinteMeta = new THREE.Color("#ffffff");
  private destello = 0;
  private colorDestello = new THREE.Color("#ffd36a");
  private guion: Paso[] = [];
  private paso = 0;
  private pasoT = 0;
  private desde: Toma | null = null;
  private mezcla = 1;
  private camPos = new THREE.Vector3();
  private camMira = new THREE.Vector3();
  private camFov = 50;
  private nombresVisibles = 1;

  constructor(contenedor: HTMLElement, op: OpcionesAula) {
    this.aula = op.aula;
    this.baja = op.calidad === "baja";
    this.maestroDef = op.maestro ?? op.aula.maestro;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const dpr = window.devicePixelRatio || 1;
    this.renderer = new THREE.WebGLRenderer({ antialias: dpr < 2, powerPreference: "high-performance", alpha: false });
    this.renderer.setPixelRatio(Math.min(dpr, coarse ? 1.6 : 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = !this.baja;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    this.canvas = this.renderer.domElement;
    this.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none";
    this.canvas.setAttribute("aria-hidden", "true");
    this.canvas.dataset.testid = "aula-3d";
    contenedor.appendChild(this.canvas);

    const c = op.aula.colores;
    this.scene.background = new THREE.Color("#1a120c");
    this.scene.fog = new THREE.Fog("#1a120c", 9, 22);
    this.hemi = new THREE.HemisphereLight(new THREE.Color(c.luz), new THREE.Color("#4a3422"), 0.75);

    this.crowd = new Crowd(16);
    this.sombras = new BlobShadows(14);
    this.alumno = new Figure(op.alumno.look);
    this.alumno.setRopa(op.alumno.ropa ?? null);

    this.armarSala();
    this.armarLuces();
    this.armarGente();
    this.scene.add(this.crowd.group, this.sombras.mesh, this.alumno.root);

    // la chispa de la pluma que escribe en el rollo
    const chispaTex = texturaRadial("rgba(255,236,170,1)", "rgba(255,170,60,0)", 64);
    this.puntaPluma = new THREE.Sprite(new THREE.SpriteMaterial({ map: chispaTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
    this.puntaPluma.scale.set(0.12, 0.12, 1);
    this.puntaPluma.visible = false;
    this.scene.add(this.puntaPluma);
    this.recursos.push(chispaTex, this.puntaPluma.material);

    this.rollo.mostrar({ k: "titulo", titulo: op.aula.nombre, sub: op.aula.lugar.replace(/^./, (x) => x.toUpperCase()), verso: op.aula.verso }, false);
    this.setFase("llegada");
    this.camPos.copy(toma("ventana", 0).pos);
    this.camMira.copy(toma("ventana", 0).mira);
    this.resize();
    this.renderer.shadowMap.needsUpdate = true;
    this.raf = requestAnimationFrame(this.cuadro);
  }

  // ================================================================ armar la sala
  private armarSala() {
    const s = this.scene;
    const a = this.aula;
    const col = a.colores;
    const b = new GeoBuilder();
    const m = new GeoBuilder();
    const piedra = a.estilo === "piedra";
    const cedro = a.id === "palacio";
    const muro = col.pared;
    const madera = col.madera;
    const oscuro = new THREE.Color(madera).multiplyScalar(0.7).getStyle();
    const W = X1 - X0;

    // el piso: tierra apisonada con esteras (escuela), losas trabadas (cámara) o tablas de cedro (palacio), con la sombra
    // junto a los muros (docs/guia-visual.md, sección 3)
    const tonoAula = (x: number, z: number) => {
      const d = Math.min(x - X0, X1 - x, z - Z0, Z1 - z);
      if (d >= 0.9) return 1;
      const s = 1 - Math.max(0, d) / 0.9;
      return 1 - 0.3 * s * s;
    };
    const juntaPiso = new THREE.Color(col.piso).multiplyScalar(0.72).getStyle();
    b.box(W, 0.1, Z1 - Z0, piedra && !cedro ? juntaPiso : col.piso, { y: -0.052, z: (Z0 + Z1) / 2 }, 0.08);
    if (piedra && !cedro) {
      const c0 = new THREE.Color(col.piso);
      const tono = (k: number) => c0.clone().multiplyScalar(k).getStyle();
      b.raw(tiles(X0, Z0, X1, Z1, 0.95, [col.piso, tono(1.05), tono(0.95), tono(1.02)], -0.004, 0.012, 0.07, tonoAula));
    } else b.raw(pisoConTono(X0, Z0, X1, Z1, col.piso, 0.0, 0.3, tonoAula));
    if (cedro) for (let x = X0 + 0.3; x < X1; x += 0.6) b.box(0.018, 0.012, Z1 - Z0, oscuro, { x, y: 0.004, z: (Z0 + Z1) / 2 });
    // la tarima del maestro
    b.box(W, TARIMA.h, TARIMA.z1 - Z0, piedra ? new THREE.Color(col.piso).multiplyScalar(0.92).getStyle() : madera, { y: TARIMA.h / 2, z: (Z0 + TARIMA.z1) / 2 }, 0.05);
    b.box(W, 0.035, 0.06, oscuro, { y: TARIMA.h + 0.012, z: TARIMA.z1 });

    // los muros: el del fondo (con el rollo), el del poniente (con las ventanas), el del oriente (los estantes) y el de la entrada
    b.box(W, ALTO, 0.2, muro, { y: ALTO / 2, z: Z0 - 0.1 }, 0.06);
    b.box(W, ALTO, 0.2, muro, { y: ALTO / 2, z: Z1 + 0.1 }, 0.06);
    b.box(0.2, ALTO, Z1 - Z0, muro, { x: X1 + 0.1, y: ALTO / 2, z: (Z0 + Z1) / 2 }, 0.06);
    // el muro de las ventanas, en trozos alrededor de los huecos
    const hv = VENTANA.ancho / 2;
    const zs = [Z0, ...VENTANAS.flatMap((z) => [z - hv, z + hv]), Z1];
    for (let i = 0; i < zs.length; i += 2) b.box(0.2, ALTO, zs[i + 1] - zs[i], muro, { x: X0 - 0.1, y: ALTO / 2, z: (zs[i] + zs[i + 1]) / 2 }, 0.06);
    for (const zv of VENTANAS) {
      b.box(0.2, VENTANA.y0, VENTANA.ancho, muro, { x: X0 - 0.1, y: VENTANA.y0 / 2, z: zv });
      b.box(0.2, ALTO - VENTANA.y1, VENTANA.ancho, muro, { x: X0 - 0.1, y: (ALTO + VENTANA.y1) / 2, z: zv });
      // el marco y los barrotes (rectos, sin travesaño)
      b.box(0.26, 0.07, VENTANA.ancho + 0.12, madera, { x: X0, y: VENTANA.y0 - 0.02, z: zv });
      b.box(0.26, 0.07, VENTANA.ancho + 0.12, madera, { x: X0, y: VENTANA.y1 + 0.02, z: zv });
      for (const dz of [-hv - 0.03, hv + 0.03]) b.box(0.24, VENTANA.y1 - VENTANA.y0 + 0.1, 0.06, madera, { x: X0, y: (VENTANA.y0 + VENTANA.y1) / 2, z: zv + dz });
      for (let k = 1; k < 4; k++) b.box(0.035, VENTANA.y1 - VENTANA.y0, 0.035, oscuro, { x: X0 - 0.02, y: (VENTANA.y0 + VENTANA.y1) / 2, z: zv - hv + (k * VENTANA.ancho) / 4 });
    }
    // zócalo y cornisa
    b.box(W, 0.32, 0.04, new THREE.Color(muro).multiplyScalar(0.82).getStyle(), { y: 0.16, z: Z0 + 0.02 });
    b.box(0.04, 0.32, Z1 - Z0, new THREE.Color(muro).multiplyScalar(0.82).getStyle(), { x: X1 - 0.02, y: 0.16, z: (Z0 + Z1) / 2 });
    // el techo de vigas
    b.box(W + 0.4, 0.12, Z1 - Z0 + 0.4, oscuro, { y: ALTO + 0.06, z: (Z0 + Z1) / 2 });
    for (let x = X0 + 0.55; x < X1; x += 1.15) b.box(0.2, 0.22, Z1 - Z0, madera, { x, y: ALTO - 0.11, z: (Z0 + Z1) / 2 }, 0.06);
    b.box(W, 0.26, 0.26, oscuro, { y: ALTO - 0.13, z: TARIMA.z1 + 0.3 });

    // el palacio: los muros forrados de cedro hasta media altura (1 Reyes 7:7)
    if (cedro) {
      b.box(W - 0.05, 1.5, 0.04, madera, { y: 0.75, z: Z0 + 0.03 }, 0.05);
      b.box(0.04, 1.5, Z1 - Z0 - 0.05, madera, { x: X1 - 0.03, y: 0.75, z: (Z0 + Z1) / 2 }, 0.05);
      for (let x = X0 + 0.6; x < X1; x += 0.9) b.box(0.03, 1.5, 0.05, oscuro, { x, y: 0.75, z: Z0 + 0.05 });
      m.box(W - 0.1, 0.04, 0.05, "#c9a23a", { y: 1.52, z: Z0 + 0.05 });
    }

    // el gran rollo colgado en el muro del fondo: el pergamino entre dos varas con sus pomos
    this.rollo.mesh.position.set(ROLLO.x, ROLLO.y, ROLLO.z);
    s.add(this.rollo.mesh);
    this.recursos.push(this.rollo);
    for (const dy of [ROLLO.h / 2 + 0.06, -ROLLO.h / 2 - 0.06]) {
      b.cyl(0.075, 0.075, ROLLO.w + 0.22, madera, { x: ROLLO.x, y: ROLLO.y + dy, z: ROLLO.z + 0.03, rz: Math.PI / 2 }, 14);
      // el pergamino enrollado sobre cada vara
      b.cyl(0.1, 0.1, ROLLO.w - 0.04, "#d9c49a", { x: ROLLO.x, y: ROLLO.y + dy, z: ROLLO.z + 0.035, rz: Math.PI / 2 }, 16);
      for (const sx of [-1, 1]) m.sphere(0.085, "#c9a23a", { x: ROLLO.x + sx * (ROLLO.w / 2 + 0.17), y: ROLLO.y + dy, z: ROLLO.z + 0.03 }, 10, 8);
    }
    // los cordones de donde cuelga
    for (const sx of [-1, 1]) b.box(0.02, ALTO - ROLLO.y - ROLLO.h / 2 - 0.25, 0.02, "#7a5a3a", { x: ROLLO.x + sx * (ROLLO.w / 2 + 0.05), y: (ALTO + ROLLO.y + ROLLO.h / 2) / 2 - 0.05, z: ROLLO.z + 0.03 });

    // el atril del maestro: pie, columna y la tabla inclinada con un rollo pequeño abierto
    b.box(0.6, 0.06, 0.42, oscuro, { x: ATRIL.x, y: TARIMA.h + 0.03, z: ATRIL.z });
    b.cyl(0.07, 0.09, 0.82, madera, { x: ATRIL.x, y: TARIMA.h + 0.44, z: ATRIL.z }, 12);
    b.box(0.72, 0.05, 0.46, madera, { x: ATRIL.x, y: TARIMA.h + 0.9, z: ATRIL.z + 0.03, rx: 0.42 });
    b.box(0.5, 0.012, 0.3, "#efe2c0", { x: ATRIL.x, y: TARIMA.h + 0.93, z: ATRIL.z + 0.03, rx: 0.42 });
    for (const sx of [-1, 1]) b.cyl(0.03, 0.03, 0.36, "#d9c49a", { x: ATRIL.x + sx * 0.27, y: TARIMA.h + 0.94, z: ATRIL.z + 0.03, rx: 0.42 + Math.PI / 2 }, 10);
    if (a.id === "camara") m.box(0.74, 0.03, 0.03, "#c9a23a", { x: ATRIL.x, y: TARIMA.h + 0.8, z: ATRIL.z + 0.22 });

    // la tela colgada a la izquierda del maestro, con franjas y granadas (Éxodo 28:33)
    const tela = col.tela;
    const tx = -3.45;
    b.box(1.3, 2.3, 0.03, tela, { x: tx, y: 1.95, z: Z0 + 0.03 }, 0.04);
    b.box(1.3, 0.12, 0.035, "#e8d6a8", { x: tx, y: 1.0, z: Z0 + 0.05 });
    b.box(1.3, 0.06, 0.035, "#e8d6a8", { x: tx, y: 2.95, z: Z0 + 0.05 });
    for (let k = 0; k < 5; k++) b.sphere(0.05, "#8f2a17", { x: tx - 0.5 + k * 0.25, y: 0.9, z: Z0 + 0.06 }, 8, 6);
    b.cyl(0.03, 0.03, 1.5, oscuro, { x: tx, y: 3.12, z: Z0 + 0.06, rz: Math.PI / 2 }, 8);

    // los estantes del oriente con los rollos guardados y las tinajas de los rollos
    for (const zc of [-2.6, 1.6]) {
      const ez = zc;
      for (let k = 0; k < 4; k++) b.box(0.42, 0.05, 1.8, madera, { x: X1 - 0.24, y: 0.45 + k * 0.62, z: ez });
      for (const dz of [-0.9, 0.9]) b.box(0.42, 2.4, 0.06, madera, { x: X1 - 0.24, y: 1.2, z: ez + dz });
      for (let k = 0; k < 4; k++)
        for (let j = 0; j < 6; j++) {
          const x = X1 - 0.24, y = 0.55 + k * 0.62, z = ez - 0.7 + j * 0.28;
          const lleno = (k * 7 + j * 3 + (a.id === "palacio" ? 1 : 0)) % 5 !== 0;
          if (!lleno) continue;
          b.cyl(0.07, 0.07, 0.34, j % 3 === 0 ? "#d9c49a" : j % 3 === 1 ? "#cdb88c" : "#e3d1a6", { x, y, z, rx: Math.PI / 2 }, 10);
          b.box(0.02, 0.15, 0.03, j % 2 ? "#8f2a17" : tela, { x: x - 0.02, y, z: z + 0.1 });
        }
    }
    for (const [x, z] of [[X1 - 0.35, -0.6], [X1 - 0.35, 3.6]] as [number, number][]) {
      b.lathe([[0, 0], [0.16, 0.02], [0.22, 0.2], [0.2, 0.42], [0.12, 0.52], [0.13, 0.58], [0, 0.58]], piedra ? "#b98a5a" : "#a86b45", { x, z }, 14);
      for (let k = 0; k < 3; k++) b.cyl(0.035, 0.035, 0.32, "#e3d1a6", { x: x + (k - 1) * 0.06, y: 0.68, z, rx: 0.15 * (k - 1) }, 8);
    }

    // los bancos de los alumnos (dos por fila, a los lados del pasillo)
    for (const z of FILAS) {
      for (const xc of [-2.0, 2.0]) {
        // la sombra de contacto del banco (y del pupitre del palacio, delante)
        const sb = sombraDeContacto(2.3, cedro ? 0.9 : 0.44, cedro ? 0.02 : 0.025);
        sb.position.set(xc, sb.position.y, cedro ? z - 0.24 : z);
        s.add(sb);
        this.recursos.push(sb.geometry);
        if (piedra && !cedro) {
          // la cámara: bancos de piedra con cojines de lino
          b.box(2.3, ASIENTO_ALTO, 0.44, new THREE.Color(col.piso).multiplyScalar(0.88).getStyle(), { x: xc, y: ASIENTO_ALTO / 2, z }, 0.05);
          for (const dx of [-0.65, 0.65]) b.box(0.78, 0.06, 0.36, "#f2ead8", { x: xc + dx, y: ASIENTO_ALTO + 0.03, z });
        } else {
          b.box(2.3, 0.07, 0.44, madera, { x: xc, y: ASIENTO_ALTO - 0.035, z }, 0.05);
          for (const dx of [-1.0, 1.0]) for (const dz of [-0.16, 0.16]) b.box(0.07, ASIENTO_ALTO - 0.07, 0.07, oscuro, { x: xc + dx, y: (ASIENTO_ALTO - 0.07) / 2, z: z + dz });
          if (!cedro) b.box(2.5, 0.015, 0.9, "#b59a62", { x: xc, y: 0.008, z: z + 0.1 }, 0.1);
        }
        // el palacio: un pupitre para cada dos escribas, con tintero y rollo
        if (cedro) {
          const zp = z - 0.48;
          b.box(2.2, 0.05, 0.36, madera, { x: xc, y: 0.62, z: zp, rx: -0.18 }, 0.04);
          for (const dx of [-1.0, 1.0]) b.box(0.06, 0.6, 0.3, oscuro, { x: xc + dx, y: 0.3, z: zp });
          for (const dx of [-0.6, 0.6]) {
            b.cyl(0.035, 0.04, 0.06, "#2a2a32", { x: xc + dx + 0.28, y: 0.67, z: zp - 0.05 }, 8);
            b.box(0.38, 0.01, 0.2, "#efe2c0", { x: xc + dx - 0.05, y: 0.655, z: zp, rx: -0.18 });
          }
        }
      }
    }

    // las lámparas de aceite: dos candeleros sobre la tarima y lamparitas en repisas
    const llamas: [number, number, number][] = [];
    for (const x of [-3.0, 3.25]) {
      m.cyl(0.13, 0.16, 0.06, "#b9801a", { x, y: TARIMA.h + 0.03, z: -3.8 }, 12);
      m.cyl(0.025, 0.03, 1.35, "#c9a23a", { x, y: TARIMA.h + 0.7, z: -3.8 }, 8);
      m.lathe([[0, 0], [0.09, 0.02], [0.12, 0.06], [0.04, 0.08], [0, 0.08]], "#c9a23a", { x, y: TARIMA.h + 1.37, z: -3.8 }, 12);
      llamas.push([x, TARIMA.h + 1.52, -3.8]);
    }
    for (const [x, z] of [[X1 - 0.12, -0.4], [X0 + 0.12, -0.2], [X0 + 0.12, 2.9], [0, Z1 - 0.12]] as [number, number][]) {
      const y = 2.05;
      b.box(x === 0 ? 0.36 : 0.22, 0.04, x === 0 ? 0.22 : 0.36, madera, { x, y: y - 0.06, z });
      b.lathe([[0, 0], [0.07, 0.01], [0.09, 0.04], [0.05, 0.06], [0, 0.05]], "#a86b45", { x: x + (x > 0 && x !== 0 ? -0.05 : x < 0 ? 0.05 : 0), y: y - 0.04, z: z + (x === 0 ? -0.05 : 0) }, 10);
      llamas.push([x + (x > 0 && x !== 0 ? -0.05 : x < 0 ? 0.05 : 0), y + 0.07, z + (x === 0 ? -0.05 : 0)]);
    }
    // la escuela en invierno: un brasero; la cámara: el lavamanos de bronce (Éxodo 30:18)
    if (a.id === "escuela") {
      m.cyl(0.32, 0.2, 0.26, "#7a5a3a", { x: -3.7, y: 0.33, z: 3.6 }, 14);
      for (let k = 0; k < 3; k++) b.box(0.05, 0.22, 0.05, "#4a3424", { x: -3.7 + Math.cos(k * 2.1) * 0.18, y: 0.11, z: 3.6 + Math.sin(k * 2.1) * 0.18 });
      llamas.push([-3.7, 0.55, 3.6]);
    } else if (a.id === "camara") {
      m.lathe([[0, 0], [0.18, 0.02], [0.2, 0.08], [0.1, 0.14], [0.08, 0.55], [0.3, 0.62], [0.36, 0.72], [0.34, 0.76], [0, 0.7]], "#b9801a", { x: -3.6, z: 3.6 }, 18);
    } else {
      // el palacio: el estandarte del rey (azul y oro, en franjas)
      b.box(0.9, 1.6, 0.03, "#27468f", { x: 3.3, y: 2.3, z: Z0 + 0.03 });
      m.box(0.9, 0.08, 0.035, "#e2b33c", { x: 3.3, y: 2.0, z: Z0 + 0.05 });
      m.box(0.9, 0.08, 0.035, "#e2b33c", { x: 3.3, y: 2.6, z: Z0 + 0.05 });
      m.cyl(0.025, 0.025, 1.05, "#c9a23a", { x: 3.3, y: 3.12, z: Z0 + 0.06, rz: Math.PI / 2 }, 8);
    }
    // la puerta de la entrada, al fondo de los bancos
    b.box(1.3, 2.25, 0.05, "#2a1a10", { x: -0.2, y: 1.12, z: Z1 - 0.02 });
    b.box(1.5, 0.12, 0.12, madera, { x: -0.2, y: 2.3, z: Z1 - 0.05 });
    for (const sx of [-1, 1]) b.box(0.1, 2.3, 0.12, madera, { x: -0.2 + sx * 0.7, y: 1.15, z: Z1 - 0.05 });

    this.sala = meshPair(b, m, !this.baja);
    s.add(this.sala);

    // afuera de las ventanas: el cielo claro
    const cieloMat = new THREE.MeshBasicMaterial({ color: "#fff3d6", toneMapped: false });
    this.recursos.push(cieloMat);
    for (const zv of VENTANAS) {
      const cielo = new THREE.Mesh(new THREE.PlaneGeometry(VENTANA.ancho + 0.2, VENTANA.y1 - VENTANA.y0 + 0.2), cieloMat);
      cielo.position.set(X0 - 0.3, (VENTANA.y0 + VENTANA.y1) / 2, zv);
      cielo.rotation.y = Math.PI / 2;
      s.add(cielo);
      this.recursos.push(cielo.geometry);
    }

    // los haces de luz que entran por las ventanas y su charco de luz en el piso
    const hazTex = texturaHaz();
    const charcoTex = texturaRadial("rgba(255,255,255,0.85)", "rgba(255,255,255,0)");
    this.recursos.push(hazTex, charcoTex);
    for (const zv of VENTANAS) {
      const largo = (VENTANA.y1 - 0.02) / -SOL.y;
      const esquinas = [
        V(X0, VENTANA.y0, zv - hv), V(X0, VENTANA.y1, zv - hv), V(X0, VENTANA.y1, zv + hv), V(X0, VENTANA.y0, zv + hv),
      ];
      const pos: number[] = [];
      const uv: number[] = [];
      for (let i = 0; i < 4; i++) {
        const p0 = esquinas[i], p1 = esquinas[(i + 1) % 4];
        const l0 = Math.min(largo, p0.y / -SOL.y), l1 = Math.min(largo, p1.y / -SOL.y);
        const q0 = p0.clone().addScaledVector(SOL, l0), q1 = p1.clone().addScaledVector(SOL, l1);
        pos.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z, q1.x, q1.y, q1.z, p0.x, p0.y, p0.z, q1.x, q1.y, q1.z, q0.x, q0.y, q0.z);
        uv.push(0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      const mat = new THREE.MeshBasicMaterial({ map: hazTex, color: col.luz, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
      const haz = new THREE.Mesh(geo, mat);
      s.add(haz);
      this.haces.push(mat);
      this.recursos.push(geo, mat);
      // el charco de luz en el piso
      const centro = V(X0, (VENTANA.y0 + VENTANA.y1) / 2, zv).addScaledVector(SOL, ((VENTANA.y0 + VENTANA.y1) / 2) / -SOL.y);
      const cmat = new THREE.MeshBasicMaterial({ map: charcoTex, color: col.luz, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
      const charco = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6), cmat);
      charco.rotation.x = -Math.PI / 2;
      charco.position.set(Math.min(X1 - 1, centro.x), 0.012, centro.z);
      s.add(charco);
      this.charcos.push(cmat);
      this.recursos.push(charco.geometry, cmat);
    }

    // el polvo que flota en la luz
    if (!this.baja) {
      const n = 160;
      const p = new Float32Array(n * 3);
      this.polvoVel = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) this.ponerPolvo(p, i, true);
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(p, 3));
      const mat = new THREE.PointsMaterial({ size: 0.028, color: col.luz, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
      this.polvo = new THREE.Points(g, mat);
      s.add(this.polvo);
      this.recursos.push(g, mat);
    }

    // las llamas: una luz por lámpara grande (en equipos modestos, solo las de la tarima)
    const llamaTex = texturaRadial("rgba(255,244,200,1)", "rgba(255,130,30,0)", 64);
    this.recursos.push(llamaTex);
    llamas.forEach(([x, y, z], i) => {
      const mat = new THREE.SpriteMaterial({ map: llamaTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
      const llama = new THREE.Sprite(mat);
      llama.position.set(x, y, z);
      const grande = i < 2 || (a.id === "escuela" && i === llamas.length - 1);
      llama.scale.set(grande ? 0.3 : 0.2, grande ? 0.42 : 0.28, 1);
      s.add(llama);
      this.recursos.push(mat);
      // su luz alumbra la sala (y solo la sala): la de los candeleros llega más lejos que la de una lamparita
      const fuego: Fuego = { x, y: y + 0.05, z, fuerza: 0, recorte: [X0 - 0.1, Z0 - 0.1, X1 + 0.1, Z1 + 0.1], alto: [-0.3, ALTO + 0.3], alcance: grande ? 6 : 4.2 };
      this.lamparas.push({ llama, base: grande ? 1.2 : 0.6, fase: Math.random() * 10, fuego });
    });
  }

  private ponerPolvo(p: Float32Array, i: number, inicio: boolean) {
    const zv = VENTANAS[i % VENTANAS.length];
    const k = Math.random();
    const y = VENTANA.y0 + Math.random() * (VENTANA.y1 - VENTANA.y0);
    const largo = (y / -SOL.y) * k;
    p[i * 3] = X0 + SOL.x * largo;
    p[i * 3 + 1] = inicio ? y + SOL.y * largo : y + SOL.y * largo;
    p[i * 3 + 2] = zv + (Math.random() - 0.5) * VENTANA.ancho + SOL.z * largo;
    if (this.polvoVel) {
      this.polvoVel[i * 3] = (Math.random() - 0.5) * 0.04;
      this.polvoVel[i * 3 + 1] = (Math.random() - 0.4) * 0.03;
      this.polvoVel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }
  }

  private armarLuces() {
    const s = this.scene;
    s.add(this.hemi, this.sol, this.sol.target);
    // el sol entra por las ventanas del poniente
    this.sol.position.set(X0 - SOL.x * 8, -SOL.y * 8, -SOL.z * 8);
    this.sol.target.position.set(0, 0, 0);
    if (!this.baja) {
      this.sol.castShadow = true;
      this.sol.shadow.mapSize.set(1024, 1024);
      const sc = this.sol.shadow.camera;
      sc.left = -6;
      sc.right = 6;
      sc.top = 6;
      sc.bottom = -6;
      sc.near = 1;
      sc.far = 22;
      this.sol.shadow.bias = -0.0008;
      this.sol.shadow.normalBias = 0.03;
    }
    this.focoMaestro.position.set(MAESTRO.x + 0.6, 3.4, MAESTRO.z + 2.8);
    this.focoMaestro.target.position.set(MAESTRO.x, 1.0, MAESTRO.z);
    this.focoAlumno.position.set(ALUMNO.x - 0.4, 3.5, ALUMNO.z - 1.2);
    this.focoAlumno.target.position.set(ALUMNO.x, 0.7, ALUMNO.z);
    this.focoRollo.position.set(ROLLO.x, 3.3, ROLLO.z + 2.6);
    this.focoRollo.target.position.set(ROLLO.x, ROLLO.y, ROLLO.z);
    s.add(this.focoMaestro, this.focoMaestro.target, this.focoAlumno, this.focoAlumno.target, this.focoRollo, this.focoRollo.target);
  }

  private armarGente() {
    this.ponerMaestro(this.maestroDef);
    this.maestroR.y = TARIMA.h;
    this.maestroR.yaw = 0;
    // el alumno, en el primer banco junto al pasillo, mirando al maestro
    this.alumnoR.y = ASIENTO_ALTO - 0.17;
    this.alumnoR.yaw = Math.PI;
    this.alumnoR.seated = true;
    this.alumnoR.pose = "idle";
    const lista = this.aula.companeros.slice(0, ASIENTOS.length);
    lista.forEach((c, i) => {
      const [x, fila] = ASIENTOS[i];
      const z = FILAS[fila];
      const h = this.crowd.add(c.variante, { robe: c.manto, accent: c.acento, head: c.cabeza, skin: ["#c98c5f", "#b97a4f", "#d9a274", "#a86b45", "#e0b08a", "#8f5a3a"][i % 6], hair: c.variante === "anciano" ? "#d9d4cc" : ["#2b1d14", "#3b2a1e", "#1d1712", "#4a3526"][i % 4] });
      if (!h) return;
      const escala = c.variante === "nino" ? 0.76 : c.variante === "mujer" ? 0.95 : c.variante === "anciano" ? 0.97 : 1;
      const r = newRig(x, z, escala);
      r.y = ASIENTO_ALTO - 0.17 - (c.variante === "nino" ? 0.04 : 0);
      r.yaw = Math.PI;
      r.seated = true;
      r.pose = "idle";
      const et = etiqueta(c.nombre, { fondo: "rgba(255,248,232,0.92)", borde: "rgba(143,42,23,0.75)", color: "#3a2414", px: 30 });
      et.scale.set(0.5, 0.125, 1);
      et.position.set(x, 1.38 * escala + r.y, z);
      et.renderOrder = 5;
      this.scene.add(et);
      this.companeros.push({ h, r, nombre: c.nombre, base: "idle", reac: null, desde: 0, hasta: 0, quieto: false, gira: 0, asiente: 0, x, z, etiqueta: et });
    });
  }

  private ponerMaestro(m: MaestroAula) {
    if (this.maestroH) this.crowd.remove(this.maestroH);
    this.maestroH = this.crowd.add(m.variante, { robe: m.manto, accent: m.acento, head: m.cabeza, skin: "#c98c5f", hair: m.variante === "anciano" ? "#e8e4dc" : "#3b2a1e" });
    this.maestroDef = m;
  }

  /** Quien enseña ahora (en la escuela, Miqueas da los oficios del profeta). */
  setMaestro(m: MaestroAula) {
    if (m.id === this.maestroDef.id) return;
    this.ponerMaestro(m);
  }

  // ================================================================ lo que manda la pantalla de la clase
  setFase(f: FaseAula) {
    const antes = this.fase;
    this.fase = f;
    switch (f) {
      case "llegada":
        this.luz(1, "#ffffff");
        this.dirigir([
          { toma: "ventana", dur: 3.6 },
          { toma: "general", dur: 4, corte: true },
          { toma: "alumnos", dur: 3, corte: true },
          { toma: "maestro", dur: 3.2, corte: true },
          { toma: "banco", dur: 3.5, corte: true },
          { toma: "general", dur: 6, corte: true },
        ]);
        this.todos("idle");
        this.gesto("saluda", 3);
        break;
      case "menu":
        this.luz(1, "#ffffff");
        this.dirigir([
          { toma: "general", dur: 7 },
          { toma: "ventana", dur: 5, corte: true },
          { toma: "grua", dur: 9, corte: true },
        ]);
        this.todos("idle");
        this.gesto("escucha");
        break;
      case "ensena":
        this.luz(1, "#ffffff");
        if (antes !== "ensena")
          this.dirigir([
            { toma: "maestro", dur: 5.5, corte: true },
            { toma: "rollo", dur: 4.5, corte: true },
            { toma: "general", dur: 4.5, corte: true },
            { toma: "alumnos", dur: 3, corte: true },
            { toma: "maestro", dur: 4, corte: true },
            { toma: "hombro", dur: 4, corte: true },
          ]);
        this.todos("idle");
        this.gesto("habla");
        break;
      case "pregunta":
        this.luz(0.95, "#fff4e2");
        this.dirigir([
          { toma: "rollo", dur: 3.4, corte: true },
          { toma: "hombro", dur: 5, corte: true },
          { toma: "maestro", dur: 3, corte: true },
          { toma: "alumnos", dur: 3.2, corte: true },
          { toma: "hombro", dur: 5, corte: true },
          { toma: "jugador", dur: 2.8, corte: true },
        ]);
        this.todos("idle");
        this.gesto("senala", 2.4);
        this.alumnoR.pose = "think";
        this.reaccion("piensan", 0.45, 3.5);
        break;
      case "anotado":
        this.luz(0.95, "#fff4e2");
        this.dirigir([{ toma: "general", dur: 4, corte: true }, { toma: "alumnos", dur: 3, corte: true }]);
        this.alumnoR.pose = "idle";
        this.gesto("escucha");
        this.reaccion("cuchichean", 0.5, 1.6);
        break;
      case "revision":
        this.luz(0.95, "#fff4e2");
        this.dirigir([{ toma: "rollo", dur: 3, corte: true }, { toma: "maestro", dur: 3, corte: true }, { toma: "hombro", dur: 4, corte: true }]);
        this.alumnoR.pose = "idle";
        this.gesto("senala", 2);
        this.todos("idle");
        break;
      case "suspenso":
        this.luz(0.32, "#9aa6ff");
        this.dirigir([{ toma: "jugador", dur: 4.5, corte: true }, { toma: "alumnos", dur: 2.2, corte: true }, { toma: "jugador", dur: 6, corte: true }]);
        this.alumnoR.pose = "think";
        this.gesto("piensa");
        this.reaccion("asombro", 0.35, 6);
        this.reaccion("atentos", 0.6, 6);
        break;
      case "bien":
        this.luz(1.08, "#fff2c8");
        this.destello = 1;
        this.colorDestello.set("#ffd36a");
        // (de pie y saltando no cabe en la toma de cerca: se ve desde el frente de la clase)
        this.dirigir([{ toma: "alumnos", dur: 2.4, corte: true }, { toma: "maestro", dur: 3, corte: true }, { toma: "general", dur: 3.5, corte: true }]);
        this.alumnoR.pose = "cheer";
        this.alumnoR.seated = false;
        this.gesto("aplaude", 2.4);
        this.reaccion("aplauso", 0.8, 2.6);
        this.reaccion("asienten", 0.3, 2.2);
        this.dicen("bien", 2);
        setTimeout(() => {
          if (this.fase === "bien" && this.vivo) {
            this.alumnoR.seated = true;
            this.alumnoR.pose = "idle";
          }
        }, 1700);
        break;
      case "mal":
        this.luz(0.85, "#c8d2ff");
        this.destello = 0.7;
        this.colorDestello.set("#6f86c8");
        this.dirigir([{ toma: "jugador", dur: 1.6, corte: true }, { toma: "maestro", dur: 6, corte: true }, { toma: "rollo", dur: 4, corte: true }]);
        this.alumnoR.seated = true;
        this.alumnoR.pose = "gasp";
        setTimeout(() => {
          if (this.fase === "mal" && this.vivo) this.alumnoR.pose = "idle";
        }, 1500);
        this.gesto("explica", 6);
        this.reaccion("asombro", 0.4, 1.4);
        this.dicen("mal", 1);
        break;
      case "nota":
        this.luz(1, "#ffffff");
        this.dirigir([{ toma: "rollo", dur: 3.5, corte: true }, { toma: "general", dur: 5, corte: true }, { toma: "grua", dur: 9 }]);
        this.alumnoR.seated = true;
        this.alumnoR.pose = "idle";
        this.gesto("habla", 3);
        this.reaccion("asienten", 0.5, 2);
        break;
      case "aprobado":
        this.luz(1.12, "#fff0c0");
        this.destello = 1;
        this.colorDestello.set("#ffe08a");
        this.dirigir([{ toma: "alumnos", dur: 3.5, corte: true }, { toma: "grua", dur: 8, corte: true }, { toma: "rollo", dur: 3.5, corte: true }, { toma: "banco", dur: 3.5, corte: true }]);
        this.alumnoR.seated = false;
        this.alumnoR.pose = "cheer";
        this.gesto("aplaude", 6);
        for (const p of this.companeros) {
          p.r.seated = false;
        }
        this.reaccion("alegria", 0.6, 5);
        this.reaccion("aplauso", 0.9, 6);
        this.dicen("aprobado", 3);
        this.lanzarChispas(160);
        setTimeout(() => {
          if (!this.vivo) return;
          for (const p of this.companeros) p.r.seated = true;
          this.alumnoR.seated = true;
          if (this.fase === "aprobado") this.alumnoR.pose = "idle";
        }, 5200);
        break;
    }
  }

  /** Escribe en el gran rollo (con la pluma) o solo cambia sus marcas. */
  mostrar(c: ContenidoRollo, escribir = true) {
    this.rollo.mostrar(c, escribir);
  }

  get escribiendo(): boolean {
    return this.rollo.escribiendo;
  }

  terminarDeEscribir() {
    this.rollo.terminar();
  }

  /** Lo que hace el maestro (vuelve a escuchar después de `seg`, si se da). */
  gesto(g: GestoMaestro, seg = 0) {
    this.gestoMaestro = g;
    this.gestoHasta = seg > 0 ? this.t + seg : 0;
  }

  /** Una parte de la clase reacciona, cada uno con su pequeño retraso. */
  reaccion(tipo: ReaccionAula, parte = 0.6, dur = 2.5) {
    const pose: Pose | null =
      tipo === "aplauso" ? "clap" : tipo === "mano" ? "wave" : tipo === "piensan" ? "think" : tipo === "asombro" ? "gasp" : tipo === "alegria" ? "cheer" : tipo === "cuchichean" ? "talk" : null;
    const lista = [...this.companeros].sort(() => Math.random() - 0.5);
    let n = Math.max(1, Math.round(lista.length * parte));
    for (const p of lista) {
      if (n-- <= 0) break;
      const retraso = Math.random() * 0.5;
      if (tipo === "asienten") {
        p.asiente = this.t + retraso + dur;
        continue;
      }
      if (tipo === "atentos") {
        p.reac = null;
        p.base = "idle";
        p.gira = 0;
        continue;
      }
      p.reac = pose;
      p.desde = this.t + retraso;
      p.hasta = this.t + retraso + dur * (0.75 + Math.random() * 0.5);
      // la mano levantada se queda quieta (no saluda)
      p.quieto = tipo === "mano";
      // para cuchichear, se miran con el de al lado
      p.gira = tipo === "cuchichean" ? (p.x < 0 === p.x < -2 ? 1 : -1) : 0;
    }
  }

  /** Alguien levanta la mano (para la pregunta). */
  manos(cuantos = 2) {
    this.reaccion("mano", Math.min(1, cuantos / Math.max(1, this.companeros.length)), 3.2);
  }

  /** Lo que dicen algunos compañeros, en una burbuja sobre su cabeza. */
  dicen(tipo: keyof typeof DICEN, cuantos = 1) {
    const lista = [...this.companeros].sort(() => Math.random() - 0.5).slice(0, cuantos);
    lista.forEach((p, i) => {
      const frases = DICEN[tipo];
      const texto = frases[Math.floor(Math.random() * frases.length)];
      const s = etiqueta(texto, { fondo: "rgba(255,255,255,0.96)", borde: tipo === "mal" ? "rgba(120,130,180,0.9)" : "rgba(201,162,58,0.95)", color: "#2a1a10", px: 32, ancho: 256, alto: 72 });
      s.scale.set(0.001, 0.001, 1);
      const y = 1.62 * p.r.scale + p.r.y;
      s.position.set(p.x, y, p.z);
      s.renderOrder = 6;
      this.scene.add(s);
      this.globos.push({ s, desde: this.t + i * 0.25, hasta: this.t + i * 0.25 + 1.9, y });
    });
  }

  private todos(pose: Pose) {
    for (const p of this.companeros) {
      p.base = pose;
      p.reac = null;
      p.gira = 0;
    }
  }

  /** El nivel de luz de la sala y su color (en el suspenso baja y se enfría). */
  private luz(brillo: number, tinte: string) {
    this.brilloMeta = brillo;
    this.tinteMeta.set(tinte);
  }

  private lanzarChispas(n: number) {
    if (this.chispas) {
      this.scene.remove(this.chispas);
      this.chispas.geometry.dispose();
      (this.chispas.material as THREE.Material).dispose();
    }
    const pos = new Float32Array(n * 3);
    const vel = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = 2.4 + Math.random() * 1.2;
      pos[i * 3 + 2] = -2.5 + Math.random() * 5.5;
      vel[i * 3] = (Math.random() - 0.5) * 0.25;
      vel[i * 3 + 1] = -(0.25 + Math.random() * 0.45);
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.chispas = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.05, color: "#ffd36a", transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
    this.chispasVel = vel;
    this.chispasHasta = this.t + 7;
    this.scene.add(this.chispas);
  }

  // ================================================================ dirección de cámaras
  private dirigir(guion: Paso[]) {
    this.guion = guion;
    this.paso = 0;
    this.pasoT = 0;
    this.empezarPaso(true);
  }

  /** Cortar a una toma un momento (por ejemplo, al rollo cuando se escribe). */
  cortarA(n: NombreToma, dur = 3) {
    this.dirigir([{ toma: n, dur, corte: true }, ...this.guion.filter((p) => p.toma !== n)]);
  }

  private empezarPaso(primero = false) {
    const p = this.guion[this.paso];
    if (!p) return;
    const nueva = toma(p.toma, this.t);
    if ((p.corte || primero) && !(primero && !p.corte && this.camPos.lengthSq() > 0)) {
      this.desde = null;
      this.mezcla = 1;
      this.camPos.copy(nueva.pos);
      this.camMira.copy(nueva.mira);
      this.camFov = nueva.fov;
    } else {
      this.desde = { pos: this.camPos.clone(), mira: this.camMira.clone(), fov: this.camFov };
      this.mezcla = 0;
    }
    // los nombres se ven en las tomas abiertas, no en las de cerca
    this.nombresVisibles = p.toma === "general" || p.toma === "alumnos" || p.toma === "banco" || p.toma === "grua" || p.toma === "ventana" ? 1 : 0;
  }

  private moverCamara(dt: number) {
    const p = this.guion[this.paso];
    if (p) {
      this.pasoT += dt;
      if (this.pasoT >= p.dur && this.guion.length > 1) {
        this.paso = (this.paso + 1) % this.guion.length;
        this.pasoT = 0;
        this.empezarPaso();
      }
      const nombre = this.guion[this.paso]?.toma ?? "general";
      const base = toma(nombre, this.t);
      const k = Math.min(1, this.pasoT / Math.max(1, this.guion[this.paso]?.dur ?? 4)) * (base.empuje ?? 0);
      base.pos.lerp(base.mira, k);
      if (this.desde && this.mezcla < 1) {
        this.mezcla = Math.min(1, this.mezcla + dt / 1.5);
        const e = this.mezcla * this.mezcla * (3 - 2 * this.mezcla);
        this.camPos.copy(this.desde.pos).lerp(base.pos, e);
        this.camMira.copy(this.desde.mira).lerp(base.mira, e);
        this.camFov = this.desde.fov + (base.fov - this.desde.fov) * e;
      } else {
        this.camPos.copy(base.pos);
        this.camMira.copy(base.mira);
        this.camFov = base.fov;
      }
    }
    const tem = 0.008;
    this.camera.position.set(this.camPos.x + Math.sin(this.t * 1.3) * tem, this.camPos.y + Math.sin(this.t * 1.7) * tem, this.camPos.z);
    this.camera.lookAt(this.camMira);
    const deseado = THREE.MathUtils.degToRad(this.camFov * (this.w < this.h ? 1.25 : 1));
    const fovReal = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(deseado / 2) * this.altoVirtual));
    if (Math.abs(this.camera.fov - fovReal) > 0.01) {
      this.camera.fov = fovReal;
      this.camera.updateProjectionMatrix();
    }
  }

  // ================================================================ cada cuadro
  /** Para probar con el panel oculto (sin cuadros del navegador): avanza el tiempo y dibuja una vez. */
  simular(segundos: number) {
    const pasos = Math.max(1, Math.round(segundos / 0.033));
    for (let i = 0; i < pasos; i++) this.avanzar(0.033);
    this.pintar();
  }

  /**
   * Dibuja la sala con la luz de sus lámparas (three/luces.ts), que vale solo para este dibujo: el aula se dibuja encima
   * de un edificio que sigue dibujándose detrás, y uno no recibe la luz del otro.
   */
  private pintar() {
    ponerFuegos(this.lamparas.map((l) => l.fuego));
    (this.vista ??= new Vista(this.renderer, this.scene, this.camera)).render();
    apagarFuegos();
  }

  private cuadro = (now: number) => {
    if (!this.vivo) return;
    this.raf = requestAnimationFrame(this.cuadro);
    if (document.hidden) {
      this.last = now;
      return;
    }
    const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.avanzar(dt);
    this.pintar();
  };

  private avanzar(dt: number) {
    this.t += dt;
    this.moverCamara(dt);
    this.animarLuces(dt);
    this.animarGente(dt);
    this.animarParticulas(dt);
    // la pluma escribe en el rollo, con su chispa de tinta
    this.rollo.avanzar(dt);
    const pu = this.rollo.punta;
    this.puntaPluma.visible = !!pu;
    if (pu) {
      this.puntaPluma.position.set(ROLLO.x - ROLLO.w / 2 + pu.x * ROLLO.w + 0.02, ROLLO.y + ROLLO.h / 2 - pu.y * ROLLO.h, ROLLO.z + 0.03);
      const s = 0.1 + Math.sin(this.t * 30) * 0.02;
      this.puntaPluma.scale.set(s, s, 1);
    }
  }

  private animarLuces(dt: number) {
    const k = 1 - Math.exp(-dt * 2.6);
    this.brillo += (this.brilloMeta - this.brillo) * k;
    this.tinte.lerp(this.tinteMeta, k);
    this.destello = Math.max(0, this.destello - dt * 1.3);
    const fl = this.destello * this.destello;
    const suspenso = this.fase === "suspenso";
    const pulso = suspenso ? 0.85 + Math.sin(this.t * 4.4) * 0.15 : 1;
    this.hemi.intensity = 0.72 * this.brillo * pulso + fl * 0.5;
    this.hemi.color.set(this.aula.colores.luz).multiply(this.tinte);
    if (fl > 0.001) this.hemi.color.lerp(this.colorDestello, fl * 0.6);
    this.sol.intensity = 1.55 * this.brillo;
    this.sol.color.set("#fff1d6").multiply(this.tinte);
    for (const h of this.haces) h.opacity = (0.22 + Math.sin(this.t * 0.4) * 0.03) * this.brillo;
    for (const c of this.charcos) c.opacity = 0.32 * this.brillo;
    const objM = suspenso ? 0.6 : this.fase === "ensena" || this.fase === "mal" || this.fase === "llegada" ? 3.2 : 2.2;
    const objA = suspenso ? 6.5 : this.fase === "bien" || this.fase === "aprobado" ? 3.5 : 0.3;
    const objR = this.fase === "pregunta" || this.fase === "revision" || this.fase === "ensena" ? 2.4 : suspenso ? 0.4 : 1.4;
    const kk = 1 - Math.exp(-dt * 3);
    this.focoMaestro.intensity += (objM - this.focoMaestro.intensity) * kk;
    this.focoAlumno.intensity += (objA - this.focoAlumno.intensity) * kk;
    this.focoRollo.intensity += (objR - this.focoRollo.intensity) * kk;
    for (const l of this.lamparas) {
      l.fase += dt;
      const f = 1 + Math.sin(l.fase * 11) * 0.06 + Math.sin(l.fase * 7.3) * 0.05 + Math.sin(l.fase * 23) * 0.03;
      const ss = l.llama.scale;
      const base = l.base > 1 ? 0.3 : 0.2;
      ss.set(base * f, base * 1.4 * (1 + Math.sin(l.fase * 9) * 0.06), 1);
      l.fuego.fuerza = l.base * 0.75 * f * (suspenso ? 0.45 : 1) * Math.min(1.1, this.brillo + 0.25);
    }
  }

  private animarGente(dt: number) {
    // el maestro
    this.maestroR.t += dt;
    if (this.gestoHasta && this.t > this.gestoHasta) {
      this.gestoHasta = 0;
      this.gestoMaestro = "escucha";
    }
    const g = this.gestoMaestro;
    const haciaRollo = Math.atan2(ROLLO.x - MAESTRO.x, ROLLO.z + 1.2 - MAESTRO.z);
    const yawMeta = g === "senala" ? haciaRollo * 0.85 : g === "explica" ? haciaRollo * 0.35 : Math.sin(this.t * 0.35) * 0.18;
    this.maestroR.yaw += (yawMeta - this.maestroR.yaw) * (1 - Math.exp(-dt * 3));
    this.maestroR.pose = g === "habla" || g === "explica" ? "talk" : g === "senala" ? "point" : g === "aplaude" ? "clap" : g === "piensa" ? "think" : g === "saluda" ? "wave" : "idle";
    if (this.maestroH) this.crowd.update(this.maestroH, this.maestroR);
    // el alumno
    this.alumnoR.t += dt;
    this.alumnoR.y = this.alumnoR.seated ? ASIENTO_ALTO - 0.17 : 0;
    this.alumno.update(this.alumnoR);
    // los compañeros
    for (const p of this.companeros) {
      if (!(p.quieto && p.reac && this.t >= p.desde && this.t < p.hasta)) p.r.t += dt;
      if (p.reac && this.t >= p.desde && this.t < p.hasta) p.r.pose = p.reac;
      else {
        if (p.reac && this.t >= p.hasta) {
          p.reac = null;
          p.quieto = false;
          p.gira = 0;
        }
        // de vez en cuando alguien conversa bajito o piensa
        const ruido = Math.sin(p.r.t * 0.19 + p.x * 3.1 + p.z * 1.7);
        p.r.pose = p.base === "idle" && this.fase !== "suspenso" && ruido > 0.95 ? "talk" : p.base;
      }
      const yawMeta = Math.PI + p.gira * 0.9;
      p.r.yaw += (yawMeta - p.r.yaw) * (1 - Math.exp(-dt * 5));
      // asentir: la cabeza (todo el cuerpo, un poco) sube y baja
      p.r.hunch = p.asiente > this.t ? Math.max(0, Math.sin((p.asiente - this.t) * 9)) * 0.14 : 0;
      p.r.y = p.r.seated ? ASIENTO_ALTO - 0.17 - (p.r.scale < 0.8 ? 0.04 : 0) : 0;
      this.crowd.update(p.h, p.r);
      if (p.etiqueta) {
        const m = p.etiqueta.material;
        m.opacity += (this.nombresVisibles * 0.95 - m.opacity) * (1 - Math.exp(-dt * 6));
        p.etiqueta.visible = m.opacity > 0.02;
        p.etiqueta.position.y = 1.38 * p.r.scale + p.r.y + (p.r.seated ? 0 : 0.2);
      }
    }
    this.crowd.flush();
    // las sombras suaves bajo cada uno
    this.sombras.begin();
    this.sombras.add(this.maestroR.x, TARIMA.h + 0.005, this.maestroR.z, 1.1);
    this.sombras.add(this.alumnoR.x, 0.005, this.alumnoR.z + 0.05, 1);
    for (const p of this.companeros) this.sombras.add(p.x, 0.005, p.z + 0.05, p.r.scale);
    this.sombras.end();
    // las burbujas de lo que dicen
    for (let i = this.globos.length - 1; i >= 0; i--) {
      const gl = this.globos[i];
      if (this.t > gl.hasta) {
        this.scene.remove(gl.s);
        soltarSprite(gl.s);
        this.globos.splice(i, 1);
        continue;
      }
      const vida = this.t - gl.desde;
      if (vida < 0) {
        gl.s.visible = false;
        continue;
      }
      gl.s.visible = true;
      const e = Math.min(1, vida / 0.18);
      const fin = Math.min(1, (gl.hasta - this.t) / 0.3);
      const sc = e * (1 + Math.sin(Math.min(1, vida / 0.3) * Math.PI) * 0.15);
      gl.s.scale.set(0.62 * sc, 0.175 * sc, 1);
      gl.s.material.opacity = fin;
      gl.s.position.y = gl.y + vida * 0.08;
    }
  }

  private animarParticulas(dt: number) {
    if (this.polvo && this.polvoVel) {
      const a = this.polvo.geometry.attributes.position as THREE.BufferAttribute;
      const p = a.array as Float32Array;
      const v = this.polvoVel;
      for (let i = 0; i < a.count; i++) {
        p[i * 3] += (v[i * 3] + Math.sin(this.t * 0.6 + i) * 0.01) * dt;
        p[i * 3 + 1] += v[i * 3 + 1] * dt;
        p[i * 3 + 2] += v[i * 3 + 2] * dt;
        if (p[i * 3 + 1] < 0.05 || p[i * 3 + 1] > ALTO - 0.3 || p[i * 3] > X1 - 0.5) this.ponerPolvo(p, i, false);
      }
      a.needsUpdate = true;
      (this.polvo.material as THREE.PointsMaterial).opacity = 0.7 * this.brillo;
    }
    if (this.chispas && this.chispasVel) {
      const a = this.chispas.geometry.attributes.position as THREE.BufferAttribute;
      const p = a.array as Float32Array;
      const v = this.chispasVel;
      for (let i = 0; i < a.count; i++) {
        p[i * 3] += (v[i * 3] + Math.sin(this.t * 2 + i) * 0.12) * dt;
        p[i * 3 + 1] += v[i * 3 + 1] * dt;
        p[i * 3 + 2] += v[i * 3 + 2] * dt;
        if (p[i * 3 + 1] < 0.03) p[i * 3 + 1] = this.t < this.chispasHasta - 2.5 ? 2.6 + Math.random() : 0.03;
      }
      a.needsUpdate = true;
      const m = this.chispas.material as THREE.PointsMaterial;
      m.opacity = Math.min(0.95, Math.max(0, this.chispasHasta - this.t) / 2);
      if (this.t > this.chispasHasta) {
        this.scene.remove(this.chispas);
        this.chispas.geometry.dispose();
        m.dispose();
        this.chispas = null;
        this.chispasVel = null;
      }
    }
  }

  // ================================================================ tamaño y limpieza
  /** `foco`: dónde va el centro de la toma, de 0 (arriba) a 1 (abajo). */
  resize(foco?: number) {
    if (foco !== undefined) this.foco = foco;
    const r = this.canvas.parentElement?.getBoundingClientRect();
    this.w = Math.max(1, Math.round(r?.width ?? 1));
    this.h = Math.max(1, Math.round(r?.height ?? 1));
    this.renderer.setSize(this.w, this.h, false);
    this.vista?.setSize(this.w, this.h);
    this.camera.aspect = this.w / this.h;
    const f = Math.min(0.5, Math.max(0.15, this.foco));
    if (f < 0.5) {
      const alto = this.h * 2 * (1 - f);
      this.altoVirtual = alto / this.h;
      this.camera.setViewOffset(this.w, alto, 0, alto - this.h, this.w, this.h);
    } else {
      this.altoVirtual = 1;
      this.camera.clearViewOffset();
    }
    this.camera.updateProjectionMatrix();
    this.renderer.shadowMap.needsUpdate = true;
  }

  /** Para las capturas de las pruebas: dibuja ahora mismo. */
  dibujar() {
    this.pintar();
  }

  dispose() {
    this.vivo = false;
    cancelAnimationFrame(this.raf);
    for (const p of this.companeros) if (p.etiqueta) soltarSprite(p.etiqueta);
    for (const gl of this.globos) soltarSprite(gl.s);
    if (this.chispas) {
      this.chispas.geometry.dispose();
      (this.chispas.material as THREE.Material).dispose();
    }
    if (this.sala) disposeGroup(this.sala);
    for (const r of this.recursos) r.dispose();
    this.crowd.dispose();
    this.sombras.dispose();
    this.alumno.dispose();
    this.vista?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.canvas.remove();
  }
}
