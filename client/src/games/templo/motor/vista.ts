/**
 * La tubería de imagen de todos los mundos 3D (docs/guia-visual.md, sección 3): el tono fílmico (ACES), el resplandor de lo
 * que brilla de verdad (fuego, lámparas, oro, el sol), la gradación de color del juego (luces doradas y sombras un poco
 * azul pizarra), una viñeta suave y bordes suaves. Va por niveles de calidad (alta, media y baja): se elige sola según el
 * aparato, baja sola si los cuadros por segundo no alcanzan y quien juega la puede fijar.
 *
 * Uso en un mundo: `this.vista = new Vista(renderer, scene, camera)`; en cada cuadro `this.vista.render(dt)` en lugar de
 * `renderer.render(...)`; al cambiar de tamaño `this.vista.setSize(w, h)`; al cerrar `this.vista.dispose()`.
 */
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAPass } from "three/examples/jsm/postprocessing/FXAAPass.js";
import { GTAOPass } from "three/examples/jsm/postprocessing/GTAOPass.js";

export type Calidad = "alta" | "media" | "baja";
export const CALIDADES: Calidad[] = ["alta", "media", "baja"];
export const NOMBRE_CALIDAD: Record<Calidad, string> = { alta: "Alta", media: "Media", baja: "Ahorro" };

const CLAVE = "templo-calidad";
const oyentes = new Set<(c: Calidad) => void>();

/** La calidad que fijó quien juega (o null si la elige el juego). */
export function calidadElegida(): Calidad | null {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === "alta" || v === "media" || v === "baja" ? v : null;
  } catch {
    return null;
  }
}

/** Fija la calidad (null: que la elija el juego). Los mundos abiertos se rearman enseguida. */
export function fijarCalidad(c: Calidad | null) {
  try {
    if (c) localStorage.setItem(CLAVE, c);
    else localStorage.removeItem(CLAVE);
  } catch {
    /* sin almacenamiento: vale solo por ahora */
  }
  const final = c ?? calidadDelAparato();
  for (const f of oyentes) f(final);
}

/** La que conviene a este aparato: alta en computadora, media en teléfonos y ahorro en los modestos. */
export function calidadDelAparato(): Calidad {
  try {
    const tactil = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const nucleos = navigator.hardwareConcurrency || 4;
    const memoria = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
    if (tactil && (nucleos <= 4 || memoria <= 3)) return "baja";
    if (tactil) return "media";
    return nucleos <= 2 ? "media" : "alta";
  } catch {
    return "media";
  }
}

export function calidadInicial(): Calidad {
  return calidadElegida() ?? calidadDelAparato();
}

/** ¿Pidió el aparato menos movimiento? (sin temblores de cámara ni destellos fuertes) */
export function reducirMovimiento(): boolean {
  try {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  } catch {
    return false;
  }
}

/** La gradación de color del juego y la viñeta (después del tono fílmico, ya en sRGB). */
const GRADO = {
  name: "GradoTemplo",
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uSat: { value: 1.08 },
    uContraste: { value: 1.05 },
    uCalido: { value: new THREE.Vector3(1.045, 1.0, 0.935) },
    uFrio: { value: new THREE.Vector3(0.95, 0.985, 1.05) },
    uVineta: { value: 0.25 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uSat;
    uniform float uContraste;
    uniform vec3 uCalido;
    uniform vec3 uFrio;
    uniform float uVineta;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      vec3 col = c.rgb;
      float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
      // luces cálidas (doradas) y sombras un poco frías (azul pizarra)
      col *= mix(uFrio, uCalido, smoothstep(0.12, 0.78, lum));
      // saturación y contraste suaves
      col = mix(vec3(lum), col, uSat);
      col = (col - 0.5) * uContraste + 0.5;
      // viñeta suave
      vec2 d = vUv - 0.5;
      col *= 1.0 - dot(d, d) * uVineta * 1.6;
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), c.a);
    }`,
};

export type VistaOpts = {
  calidad?: Calidad;
  /** Cuánto resplandor (0 lo apaga). Por defecto 0.22. */
  resplandor?: number;
  /** Cuánto se multiplica el brillo de cada mundo. Por defecto 1. */
  exposicion?: number;
  /** La oclusión ambiental en pantalla (solo en calidad alta). Por defecto sí. */
  oclusion?: boolean;
  /** Para escenas pequeñas o fotos: sin bajar sola de calidad. */
  fija?: boolean;
};

/** La tubería de imagen de un mundo. */
export class Vista {
  private composer: EffectComposer | null = null;
  private calidad: Calidad;
  private ancho = 1;
  private alto = 1;
  // el regulador: si los cuadros por segundo no alcanzan, baja un nivel
  private lento = 0;
  private promedio = 1 / 60;
  private ultimo = 0;
  private readonly oyente = (c: Calidad) => this.setCalidad(c);

  constructor(
    private readonly renderer: THREE.WebGLRenderer,
    private readonly scene: THREE.Scene,
    private readonly camera: THREE.Camera,
    private readonly o: VistaOpts = {},
  ) {
    this.calidad = o.calidad ?? calidadInicial();
    const s = renderer.getSize(new THREE.Vector2());
    this.ancho = Math.max(1, s.x);
    this.alto = Math.max(1, s.y);
    this.armar();
    oyentes.add(this.oyente);
  }

  get nivel(): Calidad {
    return this.calidad;
  }

  setCalidad(c: Calidad) {
    if (c === this.calidad) return;
    this.calidad = c;
    this.armar();
  }

  private armar() {
    const r = this.renderer;
    this.composer?.dispose();
    this.composer = null;
    // ACES (vivo y con contraste, el que ya tenían los mundos) y encima la gradación del juego. Se probó AgX: deja los
    // blancos grises en estas escenas claras.
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.shadowMap.type = this.calidad === "baja" ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
    r.shadowMap.needsUpdate = true;
    // en ahorro: sin tubería (el tono fílmico lo hace el dibujante al dibujar en pantalla)
    if (this.calidad === "baja") return;
    const pr = r.getPixelRatio();
    const rt = new THREE.WebGLRenderTarget(this.ancho * pr, this.alto * pr, {
      type: THREE.HalfFloatType,
      samples: this.calidad === "alta" ? 4 : 0,
    });
    const c = new EffectComposer(r, rt);
    c.addPass(new RenderPass(this.scene, this.camera));
    // la oclusión ambiental en pantalla (los rincones y lo que toca el piso), solo en calidad alta
    if (this.calidad === "alta" && this.o.oclusion !== false) {
      const ao = new GTAOPass(this.scene, this.camera, this.ancho * pr, this.alto * pr);
      ao.output = GTAOPass.OUTPUT.Default;
      ao.blendIntensity = 0.85;
      ao.updateGtaoMaterial({ radius: 0.5, distanceExponent: 1.2, thickness: 1, scale: 1.1, samples: 12 });
      // los destellos transparentes (las llamas, los brillos) no tapan nada: se ocultan mientras se calcula la oclusión
      // (si no, dejan un cuadro oscuro alrededor)
      const calcular = ao.render.bind(ao);
      ao.render = (...args: Parameters<GTAOPass["render"]>) => {
        const ocultos: THREE.Object3D[] = [];
        this.scene.traverseVisible((o) => {
          const m = (o as THREE.Mesh).material as THREE.Material | undefined;
          if ((o as THREE.Sprite).isSprite || (m && !Array.isArray(m) && m.transparent && !m.depthWrite)) ocultos.push(o);
        });
        for (const o of ocultos) o.visible = false;
        try {
          calcular(...args);
        } finally {
          for (const o of ocultos) o.visible = true;
        }
      };
      c.addPass(ao);
    }
    const fuerza = this.o.resplandor ?? 0.22;
    // solo resplandece lo que pasa del blanco de verdad (llamas, oro al sol, el sol): umbral alto
    if (fuerza > 0) c.addPass(new UnrealBloomPass(new THREE.Vector2(this.ancho, this.alto), fuerza, 0.5, 3.0));
    c.addPass(new OutputPass());
    c.addPass(new ShaderPass(GRADO));
    if (this.calidad === "media") c.addPass(new FXAAPass());
    c.setPixelRatio(pr);
    c.setSize(this.ancho, this.alto);
    this.composer = c;
  }

  /**
   * Dibuja un cuadro (con la tubería o directo, según la calidad). Cada mundo ajusta el brillo según la hora; aquí solo se
   * multiplica (si el mundo lo pide) y se deja como estaba.
   */
  render(dt?: number) {
    if (!this.o.fija) this.regular();
    const r = this.renderer;
    const brillo = r.toneMappingExposure;
    if (this.composer) {
      r.toneMappingExposure = brillo * (this.o.exposicion ?? 1);
      this.composer.render(dt);
    } else r.render(this.scene, this.camera);
    r.toneMappingExposure = brillo;
  }

  private regular() {
    const ahora = performance.now();
    const d = (ahora - (this.ultimo || ahora)) / 1000;
    this.ultimo = ahora;
    // pausas (pestaña oculta, ventana abierta): no cuentan
    if (d <= 0 || d > 0.25) return;
    this.promedio += (d - this.promedio) * 0.05;
    const meta = this.calidad === "alta" ? 1 / 45 : 1 / 27;
    if (this.calidad !== "baja" && this.promedio > meta) {
      this.lento += d;
      if (this.lento > 4) {
        this.lento = 0;
        this.promedio = 1 / 60;
        this.setCalidad(this.calidad === "alta" ? "media" : "baja");
      }
    } else this.lento = Math.max(0, this.lento - d);
  }

  setSize(w: number, h: number) {
    this.ancho = Math.max(1, w);
    this.alto = Math.max(1, h);
    if (this.composer) {
      this.composer.setPixelRatio(this.renderer.getPixelRatio());
      this.composer.setSize(this.ancho, this.alto);
    }
  }

  dispose() {
    oyentes.delete(this.oyente);
    this.composer?.dispose();
    this.composer = null;
  }
}
