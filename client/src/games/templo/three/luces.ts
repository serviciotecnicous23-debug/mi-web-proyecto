/**
 * La luz de los fuegos (docs/guia-visual.md, sección 7): de noche, cada fuego (una antorcha, un brasero) alumbra con luz
 * tibia que titila el piso, los muros y a la gente que pasa cerca. No son luces de three (cada una le cuesta a todo lo
 * que se dibuja y cambiar cuántas hay obliga a rearmar los materiales): es una cuenta chica dentro de los materiales de
 * siempre, con los fuegos más cercanos a la cámara (hasta MAX_FUEGOS). Cada fuego alumbra solo dentro de su rectángulo,
 * para que la luz no pase al otro lado de un muro. De día no hay ninguno y no cuesta nada.
 *
 * Cada mundo pone sus fuegos (y su sombra de techo) justo antes de dibujarse y los quita después con apagarFuegos: a
 * veces se dibujan dos a la vez (el aula encima de un edificio, que sigue dibujándose detrás) y uno no debe recibir la luz
 * del otro.
 */
import * as THREE from "three";

export const MAX_FUEGOS = 12;

/**
 * Los fuegos de este cuadro: la posición de la llama y su fuerza, el rectángulo donde alumbra y, aparte, entre qué
 * alturas alumbra y hasta qué distancia (una antorcha llega a 8 m; una lamparita de barro, a unos 4).
 */
export const fuegosMateriales = {
  uFuegos: { value: Array.from({ length: MAX_FUEGOS }, () => new THREE.Vector4()) },
  uFuegosRect: { value: Array.from({ length: MAX_FUEGOS }, () => new THREE.Vector4()) },
  uFuegosAlto: { value: Array.from({ length: MAX_FUEGOS }, () => new THREE.Vector4()) },
  uNumFuegos: { value: 0 },
  /** La sombra de techo: una caja (x0, z0, x1, z1) y sus alturas, cuánta luz del cielo queda adentro y el ancho de la puerta. */
  uTecho: { value: new THREE.Vector4() },
  uTechoAlto: { value: new THREE.Vector4(0, 0, 1, 0) },
};

/**
 * La sombra de techo (docs/guia-visual.md, sección 7): bajo un techo la luz del cielo casi no llega, y adentro queda en
 * penumbra; el sol que entra de lado y las lámparas siguen iguales. Es la luz «de rebote» que three no calcula. Una sola
 * caja por mundo (la casa de Jehová), por el medio de los muros: la cara de adentro queda en penumbra y la de afuera no.
 * Por la puerta (el lado x1) la luz del cielo entra de a poco, en `puerta` metros.
 */
export function ponerTecho(caja: [number, number, number, number], alto: [number, number], queda: number, puerta = 1.5) {
  fuegosMateriales.uTecho.value.set(caja[0], caja[1], caja[2], caja[3]);
  fuegosMateriales.uTechoAlto.value.set(alto[0], alto[1], queda, puerta);
}

export type Fuego = {
  x: number; y: number; z: number; fuerza: number;
  /** El rectángulo del piso donde alumbra (x0, z0, x1, z1), para que la luz no pase un muro. */
  recorte?: [number, number, number, number];
  /** Entre qué alturas alumbra (para que la lámpara del piso de arriba no alumbre el de abajo). */
  alto?: [number, number];
  /** Hasta qué distancia llega (8 m si no se dice). */
  alcance?: number;
};

/**
 * Pone los fuegos de este cuadro. Con `cerca` (lo que mira la cámara), los lejanos se apagan de a poco (de 20 a 30 m,
 * fuera de la vista) y, si hay más de MAX_FUEGOS, quedan los más cercanos.
 */
export function ponerFuegos(fuegos: Fuego[], cerca?: { x: number; z: number }) {
  const lejos = (f: Fuego) => (cerca ? Math.hypot(f.x - cerca.x, f.z - cerca.z) : 0);
  const fuerza = (f: Fuego) => f.fuerza * (1 - THREE.MathUtils.smoothstep(lejos(f), 20, 30));
  let lista = fuegos.filter((f) => fuerza(f) > 0.001);
  if (lista.length > MAX_FUEGOS) lista = [...lista].sort((a, b) => lejos(a) - lejos(b));
  const n = Math.min(MAX_FUEGOS, lista.length);
  for (let i = 0; i < n; i++) {
    const f = lista[i];
    fuegosMateriales.uFuegos.value[i].set(f.x, f.y, f.z, fuerza(f));
    const r = f.recorte ?? [-1e5, -1e5, 1e5, 1e5];
    fuegosMateriales.uFuegosRect.value[i].set(r[0], r[1], r[2], r[3]);
    const a = f.alto ?? [-1e5, 1e5];
    fuegosMateriales.uFuegosAlto.value[i].set(a[0], a[1], f.alcance ?? 8, 0);
  }
  fuegosMateriales.uNumFuegos.value = n;
}

/** Apaga todos (al salir de un mundo, para que el siguiente no herede sus fuegos). */
export function apagarFuegos() {
  fuegosMateriales.uNumFuegos.value = 0;
  fuegosMateriales.uTechoAlto.value.w = 0;
}

let sombraTex: THREE.DataTexture | null = null;
let sombraMat: THREE.MeshBasicMaterial | null = null;
/**
 * La sombra de contacto (docs/guia-visual.md, sección 3): un rectángulo oscuro y suave bajo lo que se apoya en el piso
 * (un mueble, un banco), para que se asiente. `w` y `d` son las medidas de lo que se apoya; la sombra se abre un poco
 * más. Va a `alto` sobre el piso (encima de una alfombra).
 */
export function sombraDeContacto(w: number, d: number, alto = 0.03): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w / 0.6, d / 0.6).rotateX(-Math.PI / 2), materialSombra());
  m.position.y = alto;
  m.renderOrder = 1;
  return m;
}

const sombrasMats = new Map<number, THREE.MeshBasicMaterial>();
/**
 * Muchas sombras de contacto en una sola malla (las casas de un barrio): cada una con su centro, las medidas de lo que se
 * apoya, su giro y su altura. Afuera, al sol, van más suaves (`opacidad`).
 */
export function sombrasDeContacto(lista: { x: number; z: number; w: number; d: number; giro?: number; y: number }[], opacidad = 1): THREE.Mesh | null {
  if (!lista.length) return null;
  const base = materialSombra();
  let mat = opacidad >= 1 ? base : sombrasMats.get(opacidad);
  if (!mat) {
    mat = base.clone();
    mat.opacity = opacidad;
    sombrasMats.set(opacidad, mat);
  }
  const pos: number[] = [], uv: number[] = [];
  const t = [[0, 0], [1, 0], [1, 1], [0, 1]];
  for (const s of lista) {
    const hw = s.w / 0.6 / 2, hd = s.d / 0.6 / 2, c = Math.cos(s.giro ?? 0), sn = Math.sin(s.giro ?? 0);
    const P = (a: number, b: number) => [s.x + a * c + b * sn, s.y, s.z - a * sn + b * c];
    const q = [P(-hw, -hd), P(hw, -hd), P(hw, hd), P(-hw, hd)];
    // mirando hacia arriba
    for (const k of [0, 2, 1, 0, 3, 2]) {
      pos.push(q[k][0], q[k][1], q[k][2]);
      uv.push(t[k][0], t[k][1]);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.computeBoundingSphere();
  const m = new THREE.Mesh(g, mat);
  m.renderOrder = 1;
  m.name = "sombras-de-contacto";
  return m;
}

function materialSombra(): THREE.MeshBasicMaterial {
  if (!sombraTex || !sombraMat) {
    const n = 64;
    const data = new Uint8Array(n * n * 4);
    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++) {
        const u = (i + 0.5) / n, v = (j + 0.5) / n;
        const dx = Math.max(0, Math.abs(u - 0.5) - 0.3), dy = Math.max(0, Math.abs(v - 0.5) - 0.3);
        const s = Math.min(1, Math.hypot(dx, dy) / 0.2);
        const a = (1 - s * s * (3 - 2 * s)) * 0.5;
        data.set([255, 255, 255, Math.round(a * 255)], (j * n + i) * 4);
      }
    sombraTex = new THREE.DataTexture(data, n, n, THREE.RGBAFormat);
    sombraTex.magFilter = THREE.LinearFilter;
    sombraTex.minFilter = THREE.LinearFilter;
    sombraTex.needsUpdate = true;
    sombraMat = new THREE.MeshBasicMaterial({ map: sombraTex, color: "#000000", transparent: true, depthWrite: false, toneMapped: false });
  }
  return sombraMat;
}

/** Dibuja algo aparte (la foto de un mueble, el muñeco del probador) sin los fuegos del mundo que está abierto. */
export function sinFuegos(dibujar: () => void) {
  const n = fuegosMateriales.uNumFuegos.value;
  fuegosMateriales.uNumFuegos.value = 0;
  try {
    dibujar();
  } finally {
    fuegosMateriales.uNumFuegos.value = n;
  }
}

/** Cuánto titila un fuego (de 0,8 a 1,1): tres ondas sin compás, cada fuego con su fase. */
export function titila(t: number, i: number) {
  const f = i * 2.399;
  return 0.95 + Math.sin(t * 11 + f) * 0.06 + Math.sin(t * 6.3 + f * 1.7) * 0.05 + Math.sin(t * 17 + f * 2.9) * 0.03;
}

const FUEGOS_PARS = `
uniform vec4 uFuegos[${MAX_FUEGOS}];
uniform vec4 uFuegosRect[${MAX_FUEGOS}];
uniform vec4 uFuegosAlto[${MAX_FUEGOS}];
uniform int uNumFuegos;
uniform vec4 uTecho;
uniform vec4 uTechoAlto;
varying vec3 vFuegoP;
float bajoTecho(vec3 p) {
  if (uTechoAlto.w <= 0.0) return 1.0;
  float d = smoothstep(uTecho.x, uTecho.x + 0.12, p.x) * (1.0 - smoothstep(uTecho.z - uTechoAlto.w, uTecho.z, p.x))
          * smoothstep(uTecho.y, uTecho.y + 0.12, p.z) * (1.0 - smoothstep(uTecho.w - 0.12, uTecho.w, p.z))
          * step(uTechoAlto.x, p.y) * step(p.y, uTechoAlto.y);
  return mix(1.0, uTechoAlto.z, d);
}
vec3 luzDeFuegos(vec3 p, vec3 n) {
  vec3 l = vec3(0.0);
  for (int i = 0; i < ${MAX_FUEGOS}; i++) {
    if (i >= uNumFuegos) break;
    vec4 f = uFuegos[i];
    vec4 rc = uFuegosRect[i];
    vec4 al = uFuegosAlto[i];
    vec3 d = f.xyz - p;
    float r = length(d);
    if (r > al.z || p.x < rc.x - 0.06 || p.z < rc.y - 0.06 || p.x > rc.z + 0.06 || p.z > rc.w + 0.06 || p.y < al.x || p.y > al.y) continue;
    // cae con la distancia como una luz de verdad y se apaga del todo en su alcance
    float q = r / al.z;
    float v = 1.0 - q * q;
    float caida = v * v / (1.0 + q * q * 22.0);
    float lam = max(dot(n, normalize(mat3(viewMatrix) * d)), 0.0);
    l += caida * lam * f.w;
  }
  return l * vec3(1.0, 0.5, 0.18);
}
`;

/**
 * La normal con que alumbra un fuego: la del relieve mezclada con la de la cara lisa. Una lámpara pegada a un muro le da
 * casi de costado, y con la normal del relieve sola el revoque se veía arrugado como papel.
 */
const NORMAL_FUEGO = `vec3 nFuego = normal;
#ifndef FLAT_SHADED
{
  vec3 nLisa = normalize(vNormal);
#ifdef DOUBLE_SIDED
  nLisa *= faceDirection;
#endif
  nFuego = normalize(mix(normal, nLisa, 0.65));
}
#endif`;

/**
 * Agrega la luz de los fuegos a un material de three (Lambert o Phong): suma la luz tibia por el color propio de cada
 * punto, así la piedra clara se enciende y la junta sigue oscura, también en la sombra de la luna.
 */
export function conFuegos<M extends THREE.MeshLambertMaterial | THREE.MeshPhongMaterial>(mat: M, clave: string): M {
  const antes = mat.onBeforeCompile;
  const claveAntes = mat.customProgramCacheKey;
  mat.onBeforeCompile = (shader, renderer) => {
    antes.call(mat, shader, renderer);
    shader.uniforms.uFuegos = fuegosMateriales.uFuegos;
    shader.uniforms.uFuegosRect = fuegosMateriales.uFuegosRect;
    shader.uniforms.uFuegosAlto = fuegosMateriales.uFuegosAlto;
    shader.uniforms.uNumFuegos = fuegosMateriales.uNumFuegos;
    shader.uniforms.uTecho = fuegosMateriales.uTecho;
    shader.uniforms.uTechoAlto = fuegosMateriales.uTechoAlto;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vFuegoP;")
      .replace(
        "#include <project_vertex>",
        `#include <project_vertex>
{
  vec4 fP = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  fP = instanceMatrix * fP;
#endif
  vFuegoP = (modelMatrix * fP).xyz;
}`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${FUEGOS_PARS}`)
      .replace("#include <lights_fragment_begin>", "#include <lights_fragment_begin>\nirradiance *= bajoTecho(vFuegoP);")
      .replace("#include <opaque_fragment>", `${NORMAL_FUEGO}\noutgoingLight += diffuseColor.rgb * luzDeFuegos(vFuegoP, nFuego) * 2.4;\n#include <opaque_fragment>`);
  };
  // la clave del material de antes (con sus detalles) más la de los fuegos: cada clase de material, su programa
  mat.customProgramCacheKey = () => `${clave}-fuegos|${claveAntes.call(mat)}`;
  return mat;
}
