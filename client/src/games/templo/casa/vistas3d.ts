/**
 * Cómo se ve cada cosa del mercado antes de comprarla (pedido de Luis: «yo nada más he comprado una alfombra, no sé
 * cómo se ven las demás cosas»): una foto en 3D de cada mueble, adorno y prenda (la ropa, puesta en un personaje).
 * Se sacan de a una con un dibujante aparte (un solo lienzo pequeño), cuando el navegador está libre, y se guardan
 * mientras dura la visita.
 */
import * as THREE from "three";
import { construirMueble } from "./muebles3d";
import { construirAdornoSuelto } from "../ciudad/escenario";
import { Figure, newRig } from "../three/characters";
import { articulo } from "@shared/mercado";

const TAM = 200;
let dibujante: THREE.WebGLRenderer | null = null;
let escena: THREE.Scene | null = null;
let camara: THREE.PerspectiveCamera | null = null;
const fotos = new Map<string, string | null>();
const pedidos = new Map<string, Promise<string | null>>();
let cola: Promise<unknown> = Promise.resolve();

function preparar() {
  if (dibujante) return;
  dibujante = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  dibujante.setPixelRatio(1);
  dibujante.setSize(TAM, TAM, false);
  dibujante.outputColorSpace = THREE.SRGBColorSpace;
  dibujante.toneMapping = THREE.ACESFilmicToneMapping;
  dibujante.toneMappingExposure = 1.15;
  dibujante.setClearColor(0x000000, 0);
  escena = new THREE.Scene();
  escena.add(new THREE.HemisphereLight("#fff4dc", "#6d5a44", 1.4));
  const sol = new THREE.DirectionalLight("#fff1d6", 2.2);
  sol.position.set(3, 5, 4);
  const contra = new THREE.DirectionalLight("#a9c4ff", 0.7);
  contra.position.set(-4, 3, -3);
  escena.add(sol, contra);
  camara = new THREE.PerspectiveCamera(30, 1, 0.05, 50);
}

/** El modelo de un artículo (null si no tiene: semillas y letrero se quedan con su dibujo). */
function modelo(id: string): { obj: THREE.Object3D; liberar: () => void } | null {
  const a = articulo(id);
  if (!a) return null;
  if (a.categoria === "mueble") {
    const g = construirMueble(id);
    return g ? { obj: g, liberar: () => g.traverse((o) => (o as THREE.Mesh).geometry?.dispose()) } : null;
  }
  if (a.categoria === "adorno") {
    const g = construirAdornoSuelto(id);
    return { obj: g, liberar: () => g.traverse((o) => (o as THREE.Mesh).geometry?.dispose()) };
  }
  if (a.categoria === "ropa" && a.color) {
    // la prenda puesta en un aprendiz, un poco de lado para que se vea el manto o la faja
    const f = new Figure("aprendiz");
    // la ropa fina del artesano, con su orla de oro (shared/taller.ts)
    f.setRopa(id.startsWith("manto") ? { manto: a.color, ...(a.fina ? { mantoOro: true as const } : {}) } : { faja: a.color, ...(a.fina ? { fajaOro: true as const } : {}) });
    const r = newRig(0, 0);
    r.yaw = 0.55;
    r.t = 0;
    f.update(r);
    return { obj: f.root, liberar: () => f.dispose() };
  }
  return null;
}

function sacar(id: string): string | null {
  const m = modelo(id);
  if (!m) return null;
  preparar();
  const e = escena!, cam = camara!, d = dibujante!;
  e.add(m.obj);
  m.obj.updateMatrixWorld(true);
  // la cámara se acomoda al tamaño de la cosa: tres cuartos, un poco desde arriba
  const caja = new THREE.Box3().setFromObject(m.obj);
  const centro = caja.getCenter(new THREE.Vector3());
  const tam = caja.getSize(new THREE.Vector3());
  const radio = Math.max(0.15, tam.length() / 2);
  const dist = (radio / Math.sin(THREE.MathUtils.degToRad(cam.fov / 2))) * 1.02;
  const dir = new THREE.Vector3(0.62, 0.55, 0.85).normalize();
  cam.position.copy(centro).addScaledVector(dir, dist);
  cam.near = dist / 20;
  cam.far = dist * 4;
  cam.updateProjectionMatrix();
  cam.lookAt(centro);
  d.render(e, cam);
  const url = d.domElement.toDataURL("image/png");
  e.remove(m.obj);
  m.liberar();
  return url;
}

/** La foto de un artículo (data URL), o null si no tiene modelo. Se sacan de a una, sin trabar la pantalla. */
export function vistaDe(id: string): Promise<string | null> {
  if (fotos.has(id)) return Promise.resolve(fotos.get(id) ?? null);
  const ya = pedidos.get(id);
  if (ya) return ya;
  const p = (cola = cola.then(
    () =>
      new Promise<string | null>((listo) => {
        const hacer = () => {
          let url: string | null = null;
          try {
            url = sacar(id);
          } catch (err) {
            console.warn("[vistas] no se pudo dibujar", id, err);
          }
          fotos.set(id, url);
          listo(url);
        };
        const ric = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
        if (ric) ric(hacer, { timeout: 300 });
        else setTimeout(hacer, 16);
      }),
  )) as Promise<string | null>;
  pedidos.set(id, p);
  return p;
}
