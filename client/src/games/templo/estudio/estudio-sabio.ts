/**
 * El estudio de «¿Quién es sabio?» en 3D (diseño propio): la sala de la casa de la sabiduría con su escenario
 * redondo, el asiento de Etán y el del que concursa, las siete columnas (Proverbios 9:1), las quince gradas que se
 * encienden al subir (como los quince cánticos graduales), la pantalla grande, los focos que se mueven y el público
 * sentado en sus gradas, que aplaude, contiene el aliento o se pone de pie. La cámara cambia de toma como en la
 * televisión. Se dibuja en su propio lienzo detrás de la pantalla del concurso; mientras, la ciudad duerme.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GeoBuilder } from "../three/builder";
import { Crowd, Figure, newRig, randomVisitor, type CrowdHandle, type FigureLook, type Pose, type Rig } from "../three/characters";
import { GRADAS, GRADAS_SEGURAS, PUNTOS_GRADA, canticoGrada, dificultadGrada } from "@shared/sabio";

// ---------------------------------------------------------------- tipos públicos
export type FaseEstudio = "portada" | "entre" | "pregunta" | "confirmar" | "suspenso" | "bien" | "mal" | "segura" | "gano" | "fin" | "mirando";
export type Ropa = { manto?: string; faja?: string } | null;
export type PreguntaPantalla = { n: number; texto: string; opciones: string[]; quitadas: number[]; elegida?: number | null; correcta?: number | null; mala?: number | null };
export type OpcionesEstudio = {
  /** Quien se sienta en el asiento del que concursa. */
  concursante: { look: FigureLook; ropa?: Ropa; nombre: string };
  /** «baja» en equipos lentos: menos público, sin luces que se mueven. */
  calidad?: "alta" | "baja";
};

// ---------------------------------------------------------------- medidas de la sala (una persona mide ~1,2)
const DAIS_R = 2.35;
const DAIS_H = 0.2;
const ASIENTO = { concursante: new THREE.Vector3(0.78, DAIS_H, 0.3), presentador: new THREE.Vector3(-0.78, DAIS_H, 0.3) };
const GRADA_FONDO = 0.22;
const GRADA_ALTO = 0.13;
const GRADAS_Z0 = -2.55;
const GRADAS_ANCHO = 3.1;
const PANTALLA = { x: 0, y: 3.55, z: -6.15, w: 4.7, h: 2.35 };
const COLUMNAS_R = 6.3;

const COLOR = {
  calma: new THREE.Color("#5b6cff"),
  suspenso: new THREE.Color("#2a3aa8"),
  bien: new THREE.Color("#ffc94a"),
  mal: new THREE.Color("#ff3b3b"),
  segura: new THREE.Color("#3be0c8"),
  gano: new THREE.Color("#ffe08a"),
};

type NombreToma = "general" | "grua" | "hombro" | "concursante" | "presentador" | "publico" | "alas" | "gradas" | "pantalla" | "cenital";
type Toma = { pos: THREE.Vector3; mira: THREE.Vector3; fov: number; empuje?: number };
type Paso = { toma: NombreToma; dur: number; corte?: boolean };

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function toma(n: NombreToma, t: number): Toma {
  switch (n) {
    case "general":
      return { pos: V(Math.sin(t * 0.07) * 0.6, 2.75, 8.2), mira: V(0, 1.45, -1.9), fov: 47, empuje: 0.06 };
    case "grua": {
      const a = -0.9 + Math.sin(t * 0.11) * 0.9;
      return { pos: V(Math.sin(a) * 8.2, 3.9 + Math.sin(t * 0.17) * 0.5, 1.2 + Math.cos(a) * 8.2), mira: V(0, 1.3, -1.6), fov: 50 };
    }
    case "hombro":
      return { pos: V(2.2, 1.62, 1.12), mira: V(-0.85, 1.15, -0.5), fov: 44, empuje: 0.12 };
    case "concursante":
      return { pos: V(-0.25, 1.12, 1.42), mira: V(ASIENTO.concursante.x, 0.98, ASIENTO.concursante.z), fov: 36, empuje: 0.22 };
    case "presentador":
      return { pos: V(0.28, 1.12, 1.45), mira: V(ASIENTO.presentador.x, 0.98, ASIENTO.presentador.z), fov: 36, empuje: 0.12 };
    case "publico":
      return { pos: V(Math.sin(t * 0.13) * 0.8, 2.35, -2.3), mira: V(0, 0.9, 9.4), fov: 54 };
    case "alas":
      return { pos: V(2.4, 1.45, 2.6), mira: V(-5.2, 0.85, 2.2), fov: 52 };
    case "gradas":
      return { pos: V(2.35, 1.0, 0.7), mira: V(-0.2, 1.45, -4.2), fov: 50, empuje: 0.1 };
    case "pantalla":
      return { pos: V(0, 2.35, 1.6), mira: V(0, 3.1, -6.1), fov: 44, empuje: 0.08 };
    case "cenital":
      return { pos: V(0.01, 7.8, 1.9), mira: V(0, 0.2, -0.2), fov: 50 };
  }
}

type Persona = { h: CrowdHandle; r: Rig; base: Pose; reac: Pose | null; desde: number; hasta: number; de: THREE.Vector3; parado: boolean };

// ---------------------------------------------------------------- texturas pintadas en código
function texturaRadial(c0: string, c1: string): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 128;
  const g = cv.getContext("2d")!;
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, c0);
  gr.addColorStop(1, c1);
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function texturaCono(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 8;
  cv.height = 128;
  const g = cv.getContext("2d")!;
  const gr = g.createLinearGradient(0, 0, 0, 128);
  gr.addColorStop(0, "rgba(255,255,255,0.9)");
  gr.addColorStop(0.6, "rgba(255,255,255,0.25)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 8, 128);
  return new THREE.CanvasTexture(cv);
}

/** Un piso de estudio: losas oscuras con vetas y anillos dorados alrededor del escenario. */
function texturaPiso(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 512;
  const g = cv.getContext("2d")!;
  g.fillStyle = "#0b0820";
  g.fillRect(0, 0, 512, 512);
  // vetas de piedra pulida
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * 512, y = Math.random() * 512;
    g.fillStyle = `rgba(${90 + Math.random() * 60},${80 + Math.random() * 50},${170 + Math.random() * 60},${Math.random() * 0.06})`;
    g.beginPath();
    g.ellipse(x, y, 8 + Math.random() * 40, 1 + Math.random() * 3, Math.random() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  // juntas de las losas
  g.strokeStyle = "rgba(160,140,255,0.08)";
  g.lineWidth = 2;
  for (let k = 0; k <= 512; k += 128) {
    g.beginPath();
    g.moveTo(k, 0);
    g.lineTo(k, 512);
    g.moveTo(0, k);
    g.lineTo(512, k);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(7, 7);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// ---------------------------------------------------------------- la pantalla grande (lienzo que se repinta)
const LETRAS = ["A", "B", "C", "D"];
function miles(n: number) {
  return n.toLocaleString("es");
}

export type Contenido =
  | { k: "logo" }
  | { k: "grada"; n: number }
  | { k: "pregunta"; p: PreguntaPantalla }
  | { k: "mensaje"; titulo: string; sub?: string; color?: string }
  | { k: "llamada"; nombre: string; restan: number }
  | { k: "ancianos"; pct: number[]; quitadas: number[] };

class Pantalla {
  canvas = document.createElement("canvas");
  tex: THREE.CanvasTexture;
  mesh: THREE.Mesh;
  private clave = "";
  constructor(w: number, h: number, px: number) {
    this.canvas.width = px;
    this.canvas.height = Math.round((px * h) / w);
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.tex.anisotropy = 4;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: this.tex, toneMapped: false }));
  }

  dibujar(c: Contenido) {
    const clave = JSON.stringify(c);
    if (clave === this.clave) return;
    this.clave = clave;
    const g = this.canvas.getContext("2d")!;
    const W = this.canvas.width, H = this.canvas.height;
    // fondo: azul noche con un brillo al centro y marco dorado
    const fondo = g.createRadialGradient(W / 2, H * 0.45, H * 0.1, W / 2, H / 2, W * 0.7);
    fondo.addColorStop(0, "#2a2470");
    fondo.addColorStop(1, "#07051a");
    g.fillStyle = fondo;
    g.fillRect(0, 0, W, H);
    g.strokeStyle = "#e7b94a";
    g.lineWidth = W * 0.008;
    g.strokeRect(W * 0.012, W * 0.012, W - W * 0.024, H - W * 0.024);
    g.strokeStyle = "rgba(231,185,74,0.35)";
    g.lineWidth = W * 0.003;
    g.strokeRect(W * 0.028, W * 0.028, W - W * 0.056, H - W * 0.056);
    g.textAlign = "center";
    g.textBaseline = "middle";
    const serif = (px: number, peso = "700") => `${peso} ${Math.round(px)}px Georgia, 'Times New Roman', serif`;
    const sans = (px: number, peso = "800") => `${peso} ${Math.round(px)}px system-ui, -apple-system, 'Segoe UI', sans-serif`;

    if (c.k === "logo") {
      dibujarColumnas(g, W / 2, H * 0.3, W * 0.36, H * 0.22, 7, "#e7b94a");
      g.font = serif(H * 0.16, "900");
      dorado(g, H * 0.42, H * 0.6);
      g.fillText("¿Quién es sabio?", W / 2, H * 0.6);
      g.font = sans(H * 0.055, "700");
      g.fillStyle = "rgba(255,236,190,0.8)";
      g.fillText("LA CASA DE LA SABIDURÍA  ·  SANTIAGO 3:13", W / 2, H * 0.78);
    } else if (c.k === "grada") {
      const n = Math.max(1, Math.min(GRADAS, c.n));
      const segura = (GRADAS_SEGURAS as readonly number[]).includes(n);
      g.font = sans(H * 0.07, "800");
      g.fillStyle = segura ? "#7ff3e0" : "rgba(255,236,190,0.85)";
      g.fillText(segura ? "GRADA SEGURA" : canticoGrada(n).toUpperCase(), W / 2, H * 0.2);
      g.font = serif(H * 0.3, "900");
      dorado(g, H * 0.3, H * 0.52);
      g.fillText(`Grada ${n}`, W / 2, H * 0.47);
      g.font = sans(H * 0.11, "900");
      g.fillStyle = "#ffffff";
      g.fillText(`${miles(PUNTOS_GRADA[n])} puntos`, W / 2, H * 0.68);
      g.font = sans(H * 0.06, "900");
      g.fillStyle = dificultadGrada(n).color;
      g.fillText(dificultadGrada(n).nombre.toUpperCase(), W / 2, H * 0.79);
      // las quince marcas abajo
      const y = H * 0.89, paso = W * 0.045, x0 = W / 2 - paso * 7;
      for (let i = 1; i <= GRADAS; i++) {
        g.fillStyle = i < n ? "#e7b94a" : i === n ? "#ffffff" : "rgba(255,255,255,0.18)";
        if ((GRADAS_SEGURAS as readonly number[]).includes(i) && i >= n) g.fillStyle = "rgba(127,243,224,0.6)";
        g.beginPath();
        g.arc(x0 + (i - 1) * paso, y, H * 0.018 * (i === n ? 1.6 : 1), 0, Math.PI * 2);
        g.fill();
      }
    } else if (c.k === "pregunta") {
      const p = c.p;
      g.font = sans(H * 0.055, "800");
      g.fillStyle = "rgba(255,236,190,0.85)";
      g.fillText(`GRADA ${p.n}  ·  ${miles(PUNTOS_GRADA[p.n])} PUNTOS  ·  ${dificultadGrada(p.n).nombre.toUpperCase()}`, W / 2, H * 0.09);
      // la pregunta, partida en renglones
      g.font = serif(H * 0.075, "700");
      const lineas = partir(g, p.texto, W * 0.86, 3);
      const alto = H * 0.088;
      const y0 = H * 0.27 - ((lineas.length - 1) * alto) / 2;
      g.fillStyle = "#ffffff";
      lineas.forEach((l, i) => g.fillText(l, W / 2, y0 + i * alto));
      // las cuatro respuestas
      const bw = W * 0.43, bh = H * 0.15;
      p.opciones.forEach((o, i) => {
        if (p.quitadas.includes(i)) return;
        const x = i % 2 === 0 ? W * 0.27 : W * 0.73;
        const y = i < 2 ? H * 0.58 : H * 0.79;
        let fill = "rgba(20,16,60,0.92)", borde = "#e7b94a", texto = "#ffffff";
        if (p.correcta === i) [fill, borde, texto] = ["#14824f", "#7dffbf", "#ffffff"];
        else if (p.mala === i) [fill, borde, texto] = ["#a11d25", "#ff8b8b", "#ffffff"];
        else if (p.elegida === i) [fill, borde, texto] = ["#d99a1e", "#fff0b3", "#1b1200"];
        caja(g, x - bw / 2, y - bh / 2, bw, bh, bh * 0.5, fill, borde, W * 0.004);
        g.textAlign = "left";
        g.font = sans(H * 0.055, "900");
        g.fillStyle = p.elegida === i && p.correcta == null && p.mala == null ? "#5a3a00" : "#f3c95a";
        g.fillText(`${LETRAS[i]}:`, x - bw / 2 + bh * 0.45, y);
        g.font = sans(H * 0.05, "700");
        g.fillStyle = texto;
        const t = partir(g, o, bw - bh * 1.35, 1)[0] ?? "";
        g.fillText(t, x - bw / 2 + bh * 1.05, y);
        g.textAlign = "center";
      });
    } else if (c.k === "mensaje") {
      g.font = serif(H * 0.19, "900");
      if (c.color) g.fillStyle = c.color;
      else dorado(g, H * 0.32, H * 0.55);
      partir(g, c.titulo, W * 0.9, 2).forEach((l, i, a) => g.fillText(l, W / 2, H * 0.45 + (i - (a.length - 1) / 2) * H * 0.2));
      if (c.sub) {
        g.font = sans(H * 0.065, "700");
        g.fillStyle = "rgba(255,236,190,0.9)";
        g.fillText(c.sub, W / 2, H * 0.8);
      }
    } else if (c.k === "llamada") {
      // un rollo que suena: dos círculos que laten y el nombre
      g.strokeStyle = "#7dffbf";
      g.lineWidth = W * 0.006;
      for (const r of [0.1, 0.16, 0.22]) {
        g.beginPath();
        g.arc(W / 2, H * 0.32, H * r, Math.PI * 1.15, Math.PI * 1.85);
        g.stroke();
      }
      g.font = sans(H * 0.07, "800");
      g.fillStyle = "rgba(255,236,190,0.9)";
      g.fillText("LLAMANDO A", W / 2, H * 0.48);
      g.font = serif(H * 0.15, "900");
      g.fillStyle = "#ffffff";
      g.fillText(partir(g, c.nombre, W * 0.85, 1)[0] ?? c.nombre, W / 2, H * 0.64);
      g.font = sans(H * 0.12, "900");
      g.fillStyle = "#7dffbf";
      g.fillText(`${Math.max(0, c.restan)} s`, W / 2, H * 0.84);
    } else if (c.k === "ancianos") {
      g.font = sans(H * 0.065, "800");
      g.fillStyle = "rgba(255,236,190,0.9)";
      g.fillText("LOS ANCIANOS DE LA PUERTA", W / 2, H * 0.12);
      const bw = W * 0.12, base = H * 0.82, alto = H * 0.55;
      c.pct.forEach((v, i) => {
        const x = W * (0.2 + i * 0.2);
        const quitada = c.quitadas.includes(i);
        const h = quitada ? 0 : (alto * v) / 100;
        const gr = g.createLinearGradient(0, base - h, 0, base);
        gr.addColorStop(0, "#ffe08a");
        gr.addColorStop(1, "#c98a12");
        g.fillStyle = gr;
        g.fillRect(x - bw / 2, base - h, bw, h);
        g.font = sans(H * 0.06, "900");
        g.fillStyle = "#ffffff";
        if (!quitada) g.fillText(`${v}%`, x, base - h - H * 0.05);
        g.fillStyle = "#f3c95a";
        g.fillText(LETRAS[i], x, base + H * 0.07);
      });
    }
    this.tex.needsUpdate = true;
  }

  dispose() {
    this.tex.dispose();
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}

function dorado(g: CanvasRenderingContext2D, y0: number, y1: number) {
  const gr = g.createLinearGradient(0, y0, 0, y1);
  gr.addColorStop(0, "#fff3c4");
  gr.addColorStop(0.5, "#f3c95a");
  gr.addColorStop(1, "#b9801a");
  g.fillStyle = gr;
}

function caja(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string, borde: string, lw: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.lineTo(x + w - r, y);
  g.quadraticCurveTo(x + w, y, x + w, y + h / 2);
  g.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  g.lineTo(x + r, y + h);
  g.quadraticCurveTo(x, y + h, x, y + h / 2);
  g.quadraticCurveTo(x, y, x + r, y);
  g.closePath();
  g.fillStyle = fill;
  g.fill();
  g.strokeStyle = borde;
  g.lineWidth = lw;
  g.stroke();
}

/** Siete columnas con su dintel (el emblema del concurso, Proverbios 9:1). */
function dibujarColumnas(g: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number, n: number, color: string) {
  g.fillStyle = color;
  const paso = w / (n - 1);
  const cw = paso * 0.32;
  for (let i = 0; i < n; i++) {
    const x = cx - w / 2 + i * paso;
    g.fillRect(x - cw / 2, cy - h / 2 + h * 0.12, cw, h * 0.76);
    g.fillRect(x - cw * 0.8, cy + h / 2 - h * 0.1, cw * 1.6, h * 0.08);
    g.fillRect(x - cw * 0.8, cy - h / 2 + h * 0.06, cw * 1.6, h * 0.07);
  }
  g.beginPath();
  g.moveTo(cx - w / 2 - cw * 1.5, cy - h / 2 + h * 0.06);
  g.lineTo(cx, cy - h / 2 - h * 0.28);
  g.lineTo(cx + w / 2 + cw * 1.5, cy - h / 2 + h * 0.06);
  g.closePath();
  g.fill();
}

function partir(g: CanvasRenderingContext2D, texto: string, ancho: number, maxLineas: number): string[] {
  const palabras = texto.split(/\s+/);
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

// ---------------------------------------------------------------- el estudio
export class EstudioSabio {
  readonly canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(47, 1, 0.1, 80);
  private raf = 0;
  private vivo = true;
  private last = performance.now();
  private t = 0;
  private w = 1;
  private h = 1;
  /** Dónde va el centro de la toma, contado desde arriba (en el teléfono la parte de abajo la tapa la pantalla). */
  private foco = 0.5;
  /** Cuánto más alta es la imagen virtual que la visible (por el foco corrido hacia arriba). */
  private altoVirtual = 1;
  private baja: boolean;

  // personajes
  private etan = new Figure("oficial");
  private etanRig: Rig = newRig(ASIENTO.presentador.x, ASIENTO.presentador.z);
  private jugador: Figure;
  private propio: { look: FigureLook; ropa: Ropa };
  private jugRig: Rig = newRig(ASIENTO.concursante.x, ASIENTO.concursante.z);
  private crowd: Crowd;
  private publico: Persona[] = [];
  private nombres: THREE.Sprite[] = [];
  private nombresClave = "";

  // escena
  private pantalla = new Pantalla(PANTALLA.w, PANTALLA.h, 1024);
  private laterales: Pantalla[] = [];
  private gradas: THREE.Mesh[] = [];
  private gradaMat: THREE.MeshBasicMaterial[] = [];
  private anillo!: THREE.MeshBasicMaterial;
  private anillos: THREE.Mesh[] = [];
  private fondoBrillo!: THREE.MeshBasicMaterial;
  private columnasLuz: THREE.MeshBasicMaterial[] = [];
  private conos: { mesh: THREE.Mesh; base: number; fase: number }[] = [];
  private conoMat!: THREE.MeshBasicMaterial;
  private focoJugador = new THREE.SpotLight("#fff2d8", 0, 9, 0.38, 0.55, 0);
  private focoEtan = new THREE.SpotLight("#fff2d8", 0, 9, 0.38, 0.55, 0);
  private hemi = new THREE.HemisphereLight("#7b86ff", "#140c2c", 0.7);
  private relleno = new THREE.DirectionalLight("#ffe7c4", 0.9);
  private contra = new THREE.PointLight("#5b6cff", 2.2, 0, 0);
  private lampara!: THREE.Mesh;
  private confeti: THREE.Points | null = null;
  private confetiVel: Float32Array | null = null;
  private confetiHasta = 0;
  private envTex: THREE.Texture | null = null;
  private recursos: { dispose: () => void }[] = [];

  // estado de la dirección
  private fase: FaseEstudio = "portada";
  private grada = 0;
  private color = COLOR.calma.clone();
  private colorMeta = COLOR.calma.clone();
  private destello = 0;
  private guion: Paso[] = [];
  private paso = 0;
  private pasoT = 0;
  private tomaActual: Toma = toma("general", 0);
  private desde: Toma | null = null;
  private mezcla = 1;
  private camPos = new THREE.Vector3();
  private camMira = new THREE.Vector3();
  private camFov = 47;

  constructor(contenedor: HTMLElement, op: OpcionesEstudio) {
    this.baja = op.calidad === "baja";
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const dpr = window.devicePixelRatio || 1;
    this.renderer = new THREE.WebGLRenderer({ antialias: dpr < 2, powerPreference: "high-performance", alpha: false });
    this.renderer.setPixelRatio(Math.min(dpr, coarse ? 1.6 : 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.canvas = this.renderer.domElement;
    this.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none";
    this.canvas.setAttribute("aria-hidden", "true");
    this.canvas.dataset.testid = "sabio-estudio-3d";
    contenedor.appendChild(this.canvas);

    this.scene.background = new THREE.Color("#04030c");
    this.scene.fog = new THREE.Fog("#04030c", 14, 30);
    // un ambiente de estudio para los reflejos del oro y del piso
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    // (los reflejos van solo en el oro: el piso no refleja el ambiente, que se vería claro detrás del público)

    this.jugador = new Figure(op.concursante.look);
    this.propio = { look: op.concursante.look, ropa: op.concursante.ropa ?? null };
    this.jugador.setRopa(op.concursante.ropa ?? null);
    this.etan.setRopa({ manto: "#5b2a6e", faja: "#e2b33c" });
    this.crowd = new Crowd(this.baja ? 48 : 100);

    this.armarSala();
    this.armarPublico(this.baja ? 44 : 92);
    this.armarLuces();
    this.scene.add(this.etan.root, this.jugador.root, this.crowd.group);
    this.etanRig.yaw = Math.atan2(ASIENTO.concursante.x - ASIENTO.presentador.x, 0.55);
    this.jugRig.yaw = Math.atan2(ASIENTO.presentador.x - ASIENTO.concursante.x, 0.55);
    this.etanRig.y = this.jugRig.y = DAIS_H + 0.17;
    this.etanRig.seated = this.jugRig.seated = true;
    this.mostrarLogo();

    this.setFase("portada");
    this.camPos.copy(this.tomaActual.pos);
    this.camMira.copy(this.tomaActual.mira);
    this.resize();
    this.raf = requestAnimationFrame(this.cuadro);
  }

  // ================================================================ armar la sala
  private armarSala() {
    const s = this.scene;
    const mate = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.62, metalness: 0.08 });
    const metal = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.28, metalness: 0.85, envMap: this.envTex, envMapIntensity: 0.55 });
    this.recursos.push(mate, metal);

    // el piso pulido
    const pisoTex = texturaPiso();
    const piso = new THREE.Mesh(new THREE.CircleGeometry(16, 64), new THREE.MeshStandardMaterial({ map: pisoTex, roughness: 0.4, metalness: 0.2, color: "#9a92d6" }));
    piso.rotation.x = -Math.PI / 2;
    s.add(piso);
    this.recursos.push(pisoTex, piso.geometry, piso.material as THREE.Material);

    // el escenario redondo con su borde dorado
    const b = new GeoBuilder(), m = new GeoBuilder();
    b.cyl(DAIS_R, DAIS_R + 0.08, DAIS_H, "#1b1446", { y: DAIS_H / 2 }, 64);
    b.cyl(DAIS_R - 0.5, DAIS_R - 0.5, 0.012, "#241b5c", { y: DAIS_H + 0.006 }, 64);
    m.torus(DAIS_R + 0.02, 0.03, "#e2b33c", { y: DAIS_H, rx: Math.PI / 2 }, 6, 96);
    // los dos asientos con su respaldo y una mesa de consulta delante de cada uno
    for (const [p, frente] of [[ASIENTO.concursante, -1], [ASIENTO.presentador, 1]] as [THREE.Vector3, number][]) {
      // la silla: asiento acolchado sobre un pie dorado y un respaldo alto con marco de oro, detrás de la espalda
      b.cyl(0.2, 0.21, 0.07, "#2b2266", { x: p.x, y: DAIS_H + 0.3, z: p.z }, 24);
      m.cyl(0.035, 0.055, 0.28, "#c9a23a", { x: p.x, y: DAIS_H + 0.14, z: p.z }, 10);
      m.cyl(0.2, 0.22, 0.02, "#c9a23a", { x: p.x, y: DAIS_H + 0.01, z: p.z }, 24);
      const atras = p.x - frente * 0.27;
      b.box(0.04, 0.5, 0.32, "#2b2266", { x: atras, y: DAIS_H + 0.62, z: p.z });
      m.box(0.05, 0.03, 0.36, "#e2b33c", { x: atras, y: DAIS_H + 0.88, z: p.z });
      for (const dz of [-0.17, 0.17]) m.box(0.05, 0.56, 0.03, "#e2b33c", { x: atras, y: DAIS_H + 0.6, z: p.z + dz });
      // la mesa de consulta, con su pantalla encendida
      b.box(0.08, 0.5, 0.42, "#18123d", { x: p.x + frente * 0.42, y: DAIS_H + 0.25, z: p.z - 0.05 });
      m.box(0.1, 0.03, 0.46, "#e2b33c", { x: p.x + frente * 0.42, y: DAIS_H + 0.51, z: p.z - 0.05 });
    }
    // las quince gradas detrás del escenario
    for (let i = 0; i < GRADAS; i++) {
      const z = GRADAS_Z0 - i * GRADA_FONDO - GRADA_FONDO / 2;
      const y = (i + 1) * GRADA_ALTO;
      b.box(GRADAS_ANCHO - i * 0.06, y, GRADA_FONDO, i % 2 ? "#1d1650" : "#211a5a", { y: y / 2, z });
      m.box(GRADAS_ANCHO - i * 0.06 + 0.04, 0.012, 0.02, "#c9a23a", { y: y + 0.006, z: z + GRADA_FONDO / 2 });
    }
    // el muro del fondo, curvo, con su cornisa dorada
    const arco = new THREE.CylinderGeometry(9.5, 9.5, 7.2, 64, 1, true, Math.PI * 0.62, Math.PI * 0.76);
    b.add(arco, "#120d33", { y: 3.6, z: -0.6, sx: -1 });
    m.add(new THREE.CylinderGeometry(9.42, 9.42, 0.08, 64, 1, true, Math.PI * 0.62, Math.PI * 0.76), "#c9a23a", { y: 6.6, z: -0.6, sx: -1 });
    // la pared del frente, detrás del público (oscura, con su cornisa)
    b.add(new THREE.CylinderGeometry(12.6, 12.6, 6.4, 72, 1, true, Math.PI * -0.38, Math.PI * 0.76), "#0d0a26", { y: 3.2, sx: -1 });
    m.add(new THREE.CylinderGeometry(12.5, 12.5, 0.07, 72, 1, true, Math.PI * -0.38, Math.PI * 0.76), "#c9a23a", { y: 5.6, sx: -1 });
    // las siete columnas (Proverbios 9:1)
    for (let k = 0; k < 7; k++) {
      const a = Math.PI * (1.12 + (k / 6) * 0.76);
      const x = Math.cos(a) * COLUMNAS_R, z = -1.25 + Math.sin(a) * COLUMNAS_R;
      b.cyl(0.24, 0.27, 4.6, "#2a2160", { x, y: 2.5, z }, 16);
      m.cyl(0.36, 0.36, 0.16, "#c9a23a", { x, y: 0.08, z }, 16);
      m.box(0.66, 0.16, 0.66, "#c9a23a", { x, y: 4.86, z });
      m.cyl(0.3, 0.24, 0.18, "#c9a23a", { x, y: 4.7, z }, 16);
    }
    // las bancas del público
    for (const fila of this.filasPublico()) {
      for (const seg of fila.bancas) b.box(seg.largo, 0.08, 0.34, "#2a1f55", { x: seg.x, y: fila.y - 0.02, z: seg.z, ry: seg.ry });
      for (const seg of fila.bancas) b.box(seg.largo, fila.y - 0.06, 0.62, "#140f33", { x: seg.x - Math.sin(seg.ry) * 0.12, y: (fila.y - 0.06) / 2, z: seg.z - Math.cos(seg.ry) * 0.12, ry: seg.ry });
    }
    const sala = new THREE.Mesh(b.build(), mate);
    const oro = new THREE.Mesh(m.build(), metal);
    s.add(sala, oro);
    this.recursos.push(sala.geometry, oro.geometry);

    // luces de las gradas: una tira por escalón (se encienden al subir)
    for (let i = 0; i < GRADAS; i++) {
      const z = GRADAS_Z0 - i * GRADA_FONDO;
      const y = (i + 1) * GRADA_ALTO;
      const mat = new THREE.MeshBasicMaterial({ color: "#2b2a66", toneMapped: false });
      const tira = new THREE.Mesh(new THREE.PlaneGeometry(GRADAS_ANCHO - i * 0.06 - 0.1, GRADA_ALTO * 0.42), mat);
      tira.position.set(0, y - GRADA_ALTO * 0.5, z + 0.002);
      s.add(tira);
      this.gradas.push(tira);
      this.gradaMat.push(mat);
      this.recursos.push(tira.geometry, mat);
    }
    // el aro de luz del escenario y los anillos del piso
    this.anillo = new THREE.MeshBasicMaterial({ color: COLOR.calma, toneMapped: false, transparent: true, opacity: 0.95 });
    const aro = new THREE.Mesh(new THREE.TorusGeometry(DAIS_R + 0.09, 0.025, 6, 128), this.anillo);
    aro.rotation.x = Math.PI / 2;
    aro.position.y = DAIS_H * 0.5;
    s.add(aro);
    this.recursos.push(aro.geometry, this.anillo);
    const brilloTex = texturaRadial("rgba(255,255,255,0.55)", "rgba(255,255,255,0)");
    this.recursos.push(brilloTex);
    for (const [r, o] of [[3.2, 0.5], [4.1, 0.3], [5.2, 0.18]] as [number, number][]) {
      const mat = new THREE.MeshBasicMaterial({ color: COLOR.calma, transparent: true, opacity: o, toneMapped: false, depthWrite: false, blending: THREE.AdditiveBlending });
      const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.035, 128), mat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.01;
      s.add(ring);
      this.anillos.push(ring);
      this.recursos.push(ring.geometry, mat);
    }
    // el brillo del fondo detrás de las gradas
    this.fondoBrillo = new THREE.MeshBasicMaterial({ map: brilloTex, color: COLOR.calma, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(12, 7), this.fondoBrillo);
    halo.position.set(0, 3.2, -8.9);
    s.add(halo);
    this.recursos.push(halo.geometry, this.fondoBrillo);
    // las tiras de luz de las columnas
    for (let k = 0; k < 7; k++) {
      const a = Math.PI * (1.12 + (k / 6) * 0.76);
      const x = Math.cos(a) * COLUMNAS_R, z = -1.25 + Math.sin(a) * COLUMNAS_R;
      const mat = new THREE.MeshBasicMaterial({ color: "#3a3a8a", toneMapped: false });
      const tira = new THREE.Mesh(new THREE.BoxGeometry(0.06, 4.1, 0.06), mat);
      const hacia = Math.atan2(-x, 0.6 - z);
      tira.position.set(x + Math.sin(hacia) * 0.25, 2.5, z + Math.cos(hacia) * 0.25);
      s.add(tira);
      this.columnasLuz.push(mat);
      this.recursos.push(tira.geometry, mat);
    }
    // la pantalla grande sobre las gradas y dos pantallas a los lados
    this.pantalla.mesh.position.set(PANTALLA.x, PANTALLA.y, PANTALLA.z);
    const marco = new THREE.Mesh(new THREE.BoxGeometry(PANTALLA.w + 0.18, PANTALLA.h + 0.18, 0.1), metal);
    marco.position.set(PANTALLA.x, PANTALLA.y, PANTALLA.z - 0.06);
    s.add(this.pantalla.mesh, marco);
    this.recursos.push(this.pantalla, marco.geometry);
    for (const sg of [-1, 1]) {
      const p = new Pantalla(1.9, 1.1, 512);
      p.mesh.position.set(sg * 3.55, 2.2, -4.1);
      p.mesh.rotation.y = -sg * 0.55;
      const mc = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.2, 0.08), metal);
      mc.position.copy(p.mesh.position);
      mc.rotation.y = p.mesh.rotation.y;
      mc.translateZ(-0.05);
      s.add(p.mesh, mc);
      this.laterales.push(p);
      this.recursos.push(p, mc.geometry);
    }
    // la lámpara de la sabiduría arriba de las gradas (Salmo 119:105): se enciende al llegar a la cima
    const lb = new GeoBuilder();
    lb.lathe([[0, 0], [0.22, 0.04], [0.3, 0.12], [0.26, 0.18], [0.08, 0.2], [0, 0.2]], "#e2b33c");
    lb.cyl(0.05, 0.09, 0.5, "#c9a23a", { y: -0.25 }, 10);
    const lamp = new THREE.Mesh(lb.build(), metal);
    lamp.position.set(0, GRADAS * GRADA_ALTO + 0.5, GRADAS_Z0 - GRADAS * GRADA_FONDO - 0.15);
    s.add(lamp);
    this.recursos.push(lamp.geometry);
    const llamaMat = new THREE.MeshBasicMaterial({ map: texturaRadial("rgba(255,240,180,1)", "rgba(255,120,20,0)"), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
    this.lampara = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.3), llamaMat);
    this.lampara.position.copy(lamp.position).add(V(0, 0.55, 0.02));
    this.lampara.visible = false;
    s.add(this.lampara);
    this.recursos.push(this.lampara.geometry, llamaMat, llamaMat.map!);

    // los conos de luz que cuelgan del techo
    this.conoMat = new THREE.MeshBasicMaterial({ map: texturaCono(), color: COLOR.calma, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
    this.recursos.push(this.conoMat, this.conoMat.map!);
    const conoGeo = new THREE.ConeGeometry(1.15, 7.5, 24, 1, true);
    conoGeo.translate(0, -3.75, 0);
    this.recursos.push(conoGeo);
    const n = this.baja ? 4 : 8;
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2;
      const mesh = new THREE.Mesh(conoGeo, this.conoMat);
      mesh.position.set(Math.cos(a) * 4.2, 7.6, -1 + Math.sin(a) * 3.4);
      s.add(mesh);
      this.conos.push({ mesh, base: a, fase: k * 0.7 });
    }
  }

  /** Las filas del público: dos alas a los lados del escenario y un bloque al frente, detrás de las cámaras. */
  private filasPublico(): { y: number; asientos: { x: number; z: number; yaw: number }[]; bancas: { x: number; z: number; ry: number; largo: number }[]; frente: boolean }[] {
    const out: { y: number; asientos: { x: number; z: number; yaw: number }[]; bancas: { x: number; z: number; ry: number; largo: number }[]; frente: boolean }[] = [];
    for (let k = 0; k < 3; k++) {
      const R = 4.35 + k * 0.78, y = 0.3 + k * 0.32;
      for (const lado of [-1, 1]) {
        const a0 = lado < 0 ? Math.PI * 0.69 : Math.PI * 0.06;
        const a1 = lado < 0 ? Math.PI * 0.94 : Math.PI * 0.31;
        const nAs = 8 + k;
        const asientos: { x: number; z: number; yaw: number }[] = [];
        const bancas: { x: number; z: number; ry: number; largo: number }[] = [];
        for (let i = 0; i < nAs; i++) {
          const a = a0 + ((i + 0.5) / nAs) * (a1 - a0);
          const x = Math.cos(a) * R, z = Math.sin(a) * R;
          asientos.push({ x, z, yaw: Math.atan2(-x, -z) });
        }
        const segs = 4;
        for (let i = 0; i < segs; i++) {
          const a = a0 + ((i + 0.5) / segs) * (a1 - a0);
          const x = Math.cos(a) * R, z = Math.sin(a) * R;
          bancas.push({ x, z, ry: Math.atan2(-x, -z), largo: ((a1 - a0) / segs) * R + 0.05 });
        }
        out.push({ y, asientos, bancas, frente: false });
      }
      // el bloque del frente, detrás de la cámara principal
      const zf = 9.0 + k * 0.78, yf = 0.3 + k * 0.32;
      const nf = 11 + k;
      const asientos = Array.from({ length: nf }, (_, i) => ({ x: (i - (nf - 1) / 2) * 0.62, z: zf, yaw: Math.PI }));
      out.push({ y: yf, asientos, bancas: [{ x: 0, z: zf, ry: Math.PI, largo: nf * 0.62 }], frente: true });
    }
    return out;
  }

  private armarPublico(max: number) {
    const lugares: { x: number; y: number; z: number; yaw: number; frente: boolean }[] = [];
    for (const f of this.filasPublico()) for (const a of f.asientos) lugares.push({ ...a, y: f.y, frente: f.frente });
    // un poco al azar, para que no esté todo lleno igual
    lugares.sort(() => Math.random() - 0.5);
    for (const l of lugares.slice(0, max)) {
      const v = randomVisitor(true);
      const h = this.crowd.add(v.variant, v.colors);
      if (!h) continue;
      const r = newRig(l.x, l.z, v.scale);
      r.y = l.y - 0.08;
      r.yaw = l.yaw;
      r.seated = true;
      this.publico.push({ h, r, base: "idle", reac: null, desde: 0, hasta: 0, de: V(l.x, l.y, l.z), parado: false });
    }
  }

  private armarLuces() {
    const s = this.scene;
    s.add(this.hemi, this.relleno, this.contra);
    this.relleno.position.set(2, 6, 7);
    this.contra.position.set(0, 4.5, -7.5);
    for (const [foco, p] of [[this.focoJugador, ASIENTO.concursante], [this.focoEtan, ASIENTO.presentador]] as [THREE.SpotLight, THREE.Vector3][]) {
      foco.position.set(p.x * 0.6, 6.5, p.z + 2.2);
      foco.target.position.set(p.x, 0.8, p.z);
      s.add(foco, foco.target);
    }
  }

  // ================================================================ lo que manda la pantalla del concurso
  /** El momento del programa: cambia luces, tomas y lo que hace el público. */
  setFase(f: FaseEstudio, info: { grada?: number } = {}) {
    if (info.grada !== undefined) this.setGrada(info.grada);
    const antes = this.fase;
    this.fase = f;
    switch (f) {
      case "portada":
      case "mirando":
        this.colorMeta.copy(COLOR.calma);
        this.dirigir([
          { toma: "grua", dur: 9 },
          { toma: "publico", dur: 4, corte: true },
          { toma: "gradas", dur: 4, corte: true },
          { toma: "alas", dur: 4, corte: true },
          { toma: "pantalla", dur: 3.5, corte: true },
        ]);
        this.todos("idle");
        break;
      case "entre":
        this.colorMeta.copy(COLOR.calma);
        this.dirigir([{ toma: "gradas", dur: 4 }, { toma: "general", dur: 6, corte: true }]);
        this.todos("idle");
        this.jugRig.pose = "idle";
        this.etanRig.pose = "talk";
        break;
      case "pregunta":
        this.colorMeta.copy(COLOR.calma);
        this.jugRig.seated = true;
        if (antes !== "pregunta")
          this.dirigir([
            { toma: "pantalla", dur: 2.2, corte: true },
            { toma: "hombro", dur: 4.5, corte: true },
            { toma: "concursante", dur: 3.2, corte: true },
            { toma: "presentador", dur: 2.6, corte: true },
            { toma: "general", dur: 4, corte: true },
            { toma: "hombro", dur: 4.5, corte: true },
            { toma: "alas", dur: 2.6, corte: true },
          ]);
        this.jugRig.pose = "think";
        this.etanRig.pose = "talk";
        this.reaccion("think", 0.18, 2.5);
        break;
      case "confirmar":
        this.colorMeta.copy(COLOR.suspenso);
        this.dirigir([{ toma: "concursante", dur: 8, corte: true }]);
        this.jugRig.pose = "idle";
        this.etanRig.pose = "talk";
        break;
      case "suspenso":
        this.colorMeta.copy(COLOR.suspenso);
        this.dirigir([{ toma: "concursante", dur: 12, corte: true }]);
        this.jugRig.pose = "think";
        this.etanRig.pose = "idle";
        this.reaccion("think", 0.55, 6);
        break;
      case "bien":
        this.colorMeta.copy(COLOR.bien);
        this.destello = 1;
        this.dirigir([{ toma: "general", dur: 1.6, corte: true }, { toma: "gradas", dur: 3, corte: true }, { toma: "alas", dur: 3, corte: true }]);
        this.jugRig.pose = "cheer";
        this.jugRig.seated = false;
        this.etanRig.pose = "clap";
        this.reaccion("clap", 0.85, 3.4);
        this.reaccion("cheer", 0.15, 2.4);
        setTimeout(() => {
          if (this.fase === "bien") {
            this.jugRig.seated = true;
            this.jugRig.pose = "idle";
          }
        }, 1800);
        break;
      case "segura":
        this.colorMeta.copy(COLOR.segura);
        this.destello = 1;
        this.dirigir([{ toma: "gradas", dur: 3, corte: true }, { toma: "publico", dur: 3, corte: true }, { toma: "general", dur: 4, corte: true }]);
        this.jugRig.pose = "cheer";
        this.jugRig.seated = false;
        this.etanRig.pose = "clap";
        this.reaccion("clap", 0.9, 4);
        this.reaccion("cheer", 0.3, 3);
        this.lanzarConfeti(120, ["#3be0c8", "#ffe08a", "#ffffff"]);
        setTimeout(() => {
          if (this.fase === "segura") {
            this.jugRig.seated = true;
            this.jugRig.pose = "idle";
          }
        }, 2200);
        break;
      case "mal":
        this.colorMeta.copy(COLOR.mal);
        this.destello = 1;
        this.jugRig.seated = true;
        this.dirigir([{ toma: "concursante", dur: 1.8, corte: true }, { toma: "general", dur: 5, corte: true }]);
        this.jugRig.pose = "gasp";
        this.etanRig.pose = "idle";
        this.reaccion("gasp", 0.8, 2.2);
        break;
      case "gano":
        this.colorMeta.copy(COLOR.gano);
        this.destello = 1;
        this.dirigir([{ toma: "grua", dur: 7 }, { toma: "publico", dur: 3, corte: true }, { toma: "cenital", dur: 4, corte: true }]);
        this.jugRig.pose = "cheer";
        this.jugRig.seated = false;
        this.etanRig.pose = "clap";
        this.etanRig.seated = false;
        for (const p of this.publico) {
          p.parado = true;
          p.r.seated = false;
        }
        this.reaccion("cheer", 0.7, 9);
        this.reaccion("clap", 0.3, 9);
        this.lanzarConfeti(420, ["#ffe08a", "#f3c95a", "#ffffff", "#3be0c8", "#ff8bd0"]);
        this.lampara.visible = true;
        break;
      case "fin":
        this.colorMeta.copy(COLOR.calma);
        this.dirigir([{ toma: "general", dur: 5, corte: true }, { toma: "grua", dur: 9 }]);
        this.jugRig.pose = "idle";
        this.jugRig.seated = true;
        this.etanRig.pose = "clap";
        this.reaccion("clap", 0.7, 3);
        break;
    }
    if (f !== "gano") {
      for (const p of this.publico)
        if (p.parado) {
          p.parado = false;
          p.r.seated = true;
        }
      this.etanRig.seated = true;
    }
  }

  /** Quien se sienta a concursar (al mirar la partida de otro); `null` vuelve a sentar al jugador. */
  setConcursante(look: FigureLook | null, ropa: Ropa = null) {
    if (!look) {
      this.jugador.setLook(this.propio.look);
      this.jugador.setRopa(this.propio.ropa);
      return;
    }
    this.jugador.setLook(look);
    this.jugador.setRopa(ropa);
  }

  /** La grada en la que va (0 = todavía ninguna): se encienden las tiras de las gradas y las columnas. */
  setGrada(n: number) {
    this.grada = Math.max(0, Math.min(GRADAS, n));
    this.lampara.visible = this.grada >= GRADAS;
  }

  /** Lo que muestra la pantalla grande (y las de los lados, la grada y los puntos). */
  mostrar(c: Contenido) {
    this.pantalla.dibujar(c);
  }

  mostrarPregunta(p: PreguntaPantalla) {
    this.pantalla.dibujar({ k: "pregunta", p });
    this.lateral(p.n);
  }

  mostrarGrada(n: number) {
    this.pantalla.dibujar({ k: "grada", n });
    this.lateral(n);
  }

  mostrarMensaje(titulo: string, sub?: string, color?: string) {
    this.pantalla.dibujar({ k: "mensaje", titulo, sub, color });
  }

  mostrarLlamada(nombre: string, restan: number) {
    this.pantalla.dibujar({ k: "llamada", nombre, restan });
    this.cortarA("pantalla");
  }

  mostrarAncianos(pct: number[], quitadas: number[]) {
    this.pantalla.dibujar({ k: "ancianos", pct, quitadas });
    this.reaccion("wave", 0.65, 2.8);
    this.cortarA("publico");
  }

  mostrarLogo() {
    this.pantalla.dibujar({ k: "logo" });
    for (const l of this.laterales) l.dibujar({ k: "logo" });
  }

  private lateral(n: number) {
    for (const l of this.laterales) l.dibujar({ k: "grada", n: Math.max(1, n) });
  }

  /** Un aplauso de alguien que mira en vivo: una ola en el público. */
  aplauso(tipo: "aplauso" | "oracion" | "animo") {
    if (tipo === "aplauso") this.reaccion("clap", 0.45, 2.2);
    else if (tipo === "oracion") this.reaccion("bow", 0.35, 2.6);
    else this.reaccion("cheer", 0.35, 2);
  }

  /** Los nombres de quienes miran en vivo, sobre la primera fila del frente. */
  setMirando(nombres: string[]) {
    const clave = nombres.slice(0, 8).join("|");
    if (clave === this.nombresClave) return;
    this.nombresClave = clave;
    for (const sp of this.nombres) {
      this.scene.remove(sp);
      (sp.material as THREE.SpriteMaterial).map?.dispose();
      (sp.material as THREE.SpriteMaterial).dispose();
    }
    this.nombres = [];
    const frente = this.publico.filter((p) => p.de.z > 8 && p.de.z < 9.3).sort((a, b) => Math.abs(a.de.x) - Math.abs(b.de.x));
    nombres.slice(0, 8).forEach((nombre, i) => {
      const p = frente[i];
      if (!p) return;
      const cv = document.createElement("canvas");
      cv.width = 256;
      cv.height = 64;
      const g = cv.getContext("2d")!;
      caja(g, 4, 8, 248, 48, 22, "rgba(10,8,30,0.85)", "#7dffbf", 3);
      g.font = "800 28px system-ui, sans-serif";
      g.fillStyle = "#ffffff";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(nombre.slice(0, 14), 128, 33);
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, toneMapped: false }));
      sp.scale.set(0.9, 0.225, 1);
      sp.position.set(p.de.x, p.de.y + 1.25, p.de.z);
      this.scene.add(sp);
      this.nombres.push(sp);
      // quien llega a mirar saluda desde su lugar
      p.reac = "wave";
      p.desde = this.t;
      p.hasta = this.t + 4;
    });
  }

  // ================================================================ dirección de cámaras
  private dirigir(guion: Paso[]) {
    this.guion = guion;
    this.paso = 0;
    this.pasoT = 0;
    this.empezarPaso(true);
  }

  private cortarA(n: NombreToma) {
    this.dirigir([{ toma: n, dur: 3.5, corte: true }, ...this.guion.filter((p) => p.toma !== n)]);
  }

  private empezarPaso(primero = false) {
    const p = this.guion[this.paso];
    if (!p) return;
    const nueva = toma(p.toma, this.t);
    if (p.corte || primero) {
      this.desde = null;
      this.mezcla = 1;
      this.camPos.copy(nueva.pos);
      this.camMira.copy(nueva.mira);
      this.camFov = nueva.fov;
    } else {
      this.desde = { pos: this.camPos.clone(), mira: this.camMira.clone(), fov: this.camFov };
      this.mezcla = 0;
    }
    this.tomaActual = nueva;
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
      // empuje lento hacia lo que se mira (como una cámara que se acerca)
      const k = Math.min(1, this.pasoT / Math.max(1, this.guion[this.paso]?.dur ?? 4)) * (base.empuje ?? 0);
      base.pos.lerp(base.mira, k);
      if (this.desde && this.mezcla < 1) {
        this.mezcla = Math.min(1, this.mezcla + dt / 1.4);
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
    // un poco de pulso de mano, como un camarógrafo
    const tem = 0.012;
    this.camera.position.set(this.camPos.x + Math.sin(this.t * 1.3) * tem, this.camPos.y + Math.sin(this.t * 1.7) * tem, this.camPos.z);
    this.camera.lookAt(this.camMira);
    // en vertical se abre un poco la toma; con el foco corrido, la imagen virtual es más alta que la visible
    const deseado = THREE.MathUtils.degToRad(this.camFov * (this.w < this.h ? 1.3 : 1));
    const fovReal = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(deseado / 2) * this.altoVirtual));
    if (Math.abs(this.camera.fov - fovReal) > 0.01) {
      this.camera.fov = fovReal;
      this.camera.updateProjectionMatrix();
    }
  }

  // ================================================================ el público
  private todos(pose: Pose) {
    for (const p of this.publico) {
      p.base = pose;
      p.reac = null;
    }
  }

  /** Una parte del público reacciona, cada uno con su pequeño retraso. */
  private reaccion(pose: Pose, parte: number, dur: number) {
    for (const p of this.publico) {
      if (Math.random() > parte) continue;
      const retraso = Math.random() * 0.45;
      p.reac = pose;
      p.desde = this.t + retraso;
      p.hasta = this.t + retraso + dur * (0.75 + Math.random() * 0.5);
    }
  }

  private lanzarConfeti(n: number, colores: string[]) {
    if (this.confeti) {
      this.scene.remove(this.confeti);
      this.confeti.geometry.dispose();
      (this.confeti.material as THREE.Material).dispose();
    }
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), vel = new Float32Array(n * 3);
    const c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = 6 + Math.random() * 4;
      pos[i * 3 + 2] = -3 + Math.random() * 8;
      vel[i * 3] = (Math.random() - 0.5) * 0.5;
      vel[i * 3 + 1] = -(0.8 + Math.random() * 1.1);
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      c.set(colores[i % colores.length]);
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    this.confeti = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.08, vertexColors: true, toneMapped: false, transparent: true, opacity: 0.95, depthWrite: false }));
    this.confetiVel = vel;
    this.confetiHasta = this.t + 9;
    this.scene.add(this.confeti);
  }

  // ================================================================ cada cuadro
  /** Para probar con el panel oculto (sin cuadros del navegador): avanza el tiempo y dibuja una vez. */
  simular(segundos: number) {
    const pasos = Math.max(1, Math.round(segundos / 0.033));
    for (let i = 0; i < pasos; i++) {
      this.t += 0.033;
      this.moverCamara(0.033);
      this.animarLuces(0.033);
      this.animarGente(0.033);
      this.animarConfeti(0.033);
    }
    this.renderer.render(this.scene, this.camera);
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
    this.t += dt;
    this.moverCamara(dt);
    this.animarLuces(dt);
    this.animarGente(dt);
    this.animarConfeti(dt);
    this.renderer.render(this.scene, this.camera);
  };

  private animarLuces(dt: number) {
    this.color.lerp(this.colorMeta, 1 - Math.exp(-dt * 4));
    this.destello = Math.max(0, this.destello - dt * 1.4);
    const pulso = this.fase === "suspenso" || this.fase === "confirmar" ? 0.65 + Math.sin(this.t * 3.2) * 0.35 : 1;
    const flash = this.destello * this.destello;
    this.anillo.color.copy(this.color).multiplyScalar(0.9 + flash * 2.5);
    for (const [i, r] of this.anillos.entries()) {
      const m = r.material as THREE.MeshBasicMaterial;
      m.color.copy(this.color).multiplyScalar((0.7 + 0.3 * Math.sin(this.t * 1.6 - i)) * pulso + flash * 2);
    }
    this.fondoBrillo.color.copy(this.color).multiplyScalar(0.85 * pulso + flash * 1.6);
    this.contra.color.copy(this.color);
    this.contra.intensity = 1.6 + flash * 6;
    this.hemi.intensity = this.fase === "suspenso" ? 0.38 : 0.7 + flash * 0.6;
    // focos de los asientos: en el suspenso queda solo el del que concursa
    const objetivoJ = this.fase === "suspenso" || this.fase === "confirmar" ? 5.5 : 3.2;
    const objetivoE = this.fase === "suspenso" ? 0.8 : 2.6;
    this.focoJugador.intensity += (objetivoJ - this.focoJugador.intensity) * (1 - Math.exp(-dt * 3));
    this.focoEtan.intensity += (objetivoE - this.focoEtan.intensity) * (1 - Math.exp(-dt * 3));
    // las gradas: las subidas en oro, la de ahora late, las seguras en turquesa
    for (let i = 0; i < GRADAS; i++) {
      const n = i + 1;
      const m = this.gradaMat[i];
      if (n <= this.grada) m.color.set("#f3b93a").multiplyScalar(1.2 + flash * 0.8);
      else if (n === this.grada + 1 && this.fase !== "portada" && this.fase !== "mirando") m.color.set("#ffffff").multiplyScalar(0.5 + 0.5 * Math.abs(Math.sin(this.t * 3)));
      else if ((GRADAS_SEGURAS as readonly number[]).includes(n)) m.color.set("#1f8f80");
      else m.color.set("#262566");
    }
    // las columnas se encienden con el avance (una por cada dos gradas, la séptima en la cima)
    for (let k = 0; k < 7; k++) {
      const en = this.grada >= Math.min(GRADAS, (k + 1) * 2 + (k === 6 ? 1 : 0));
      this.columnasLuz[k].color.set(en ? "#ffd36a" : "#34348a").multiplyScalar(en ? 1.3 + flash : 0.8 + 0.2 * Math.sin(this.t * 0.9 + k));
    }
    // los conos de luz: barren lento; en el suspenso apuntan al que concursa; al acertar giran rápido
    this.conoMat.color.copy(this.color);
    this.conoMat.opacity = (this.fase === "suspenso" ? 0.1 : 0.15) + flash * 0.25;
    const rapido = this.fase === "bien" || this.fase === "segura" || this.fase === "gano" ? 3.2 : 0.35;
    for (const c of this.conos) {
      c.fase += dt * rapido;
      let rx = Math.sin(c.fase) * 0.42, rz = Math.cos(c.fase * 0.8 + c.base) * 0.42;
      if (this.fase === "suspenso" || this.fase === "confirmar") {
        const dx = ASIENTO.concursante.x - c.mesh.position.x, dz = ASIENTO.concursante.z - c.mesh.position.z;
        rz = Math.atan2(dx, 7.4);
        rx = -Math.atan2(dz, 7.4);
      }
      c.mesh.rotation.x += (rx - c.mesh.rotation.x) * (1 - Math.exp(-dt * 2.5));
      c.mesh.rotation.z += (rz - c.mesh.rotation.z) * (1 - Math.exp(-dt * 2.5));
    }
    if (this.lampara.visible) {
      const s = 1 + Math.sin(this.t * 13) * 0.05 + Math.sin(this.t * 7) * 0.04;
      this.lampara.scale.set(s, s * (1 + Math.sin(this.t * 9) * 0.04), 1);
      this.lampara.lookAt(this.camera.position.x, this.lampara.position.y, this.camera.position.z);
    }
  }

  private animarGente(dt: number) {
    this.etanRig.t += dt;
    this.jugRig.t += dt;
    this.etan.update(this.etanRig);
    this.jugador.update(this.jugRig);
    for (const p of this.publico) {
      p.r.t += dt;
      if (p.reac && this.t >= p.desde && this.t < p.hasta) p.r.pose = p.reac;
      else {
        if (p.reac && this.t >= p.hasta) p.reac = null;
        // a veces conversan con el de al lado
        p.r.pose = p.base === "idle" && Math.sin(p.r.t * 0.21 + p.de.x * 3.1) > 0.93 ? "talk" : p.base;
      }
      // de pie para aplaudir de alegría al final, y de vuelta al banco
      p.r.y = p.de.y - 0.08;
      this.crowd.update(p.h, p.r);
    }
    this.crowd.flush();
  }

  private animarConfeti(dt: number) {
    if (!this.confeti || !this.confetiVel) return;
    const a = this.confeti.geometry.attributes.position as THREE.BufferAttribute;
    const v = this.confetiVel;
    for (let i = 0; i < a.count; i++) {
      let y = a.getY(i) + v[i * 3 + 1] * dt;
      let x = a.getX(i) + (v[i * 3] + Math.sin(this.t * 2 + i) * 0.3) * dt;
      const z = a.getZ(i) + v[i * 3 + 2] * dt;
      if (y < 0.02) {
        y = this.t < this.confetiHasta - 3 ? 6 + Math.random() * 2 : 0.02;
        if (y > 1) x = (Math.random() - 0.5) * 9;
      }
      a.setXYZ(i, x, y, z);
    }
    a.needsUpdate = true;
    const m = this.confeti.material as THREE.PointsMaterial;
    m.opacity = Math.min(0.95, Math.max(0, this.confetiHasta - this.t) / 2);
    if (this.t > this.confetiHasta) {
      this.scene.remove(this.confeti);
      this.confeti.geometry.dispose();
      m.dispose();
      this.confeti = null;
      this.confetiVel = null;
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
    this.camera.aspect = this.w / this.h;
    // el centro de la toma más arriba (la mitad de abajo la tapa la pantalla del concurso en el teléfono)
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
  }

  dispose() {
    this.vivo = false;
    cancelAnimationFrame(this.raf);
    for (const sp of this.nombres) {
      (sp.material as THREE.SpriteMaterial).map?.dispose();
      (sp.material as THREE.SpriteMaterial).dispose();
    }
    if (this.confeti) {
      this.confeti.geometry.dispose();
      (this.confeti.material as THREE.Material).dispose();
    }
    for (const r of this.recursos) r.dispose();
    this.crowd.dispose();
    this.etan.dispose();
    this.jugador.dispose();
    this.envTex?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.canvas.remove();
  }
}
