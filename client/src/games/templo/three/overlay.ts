/**
 * Lo que se dibuja sobre el mundo: letreros de los círculos, burbujas sobre las personas,
 * números de gozo que suben, la flecha del objetivo y el joystick. Son elementos de la página
 * (texto nítido) que se mueven con el mundo; los círculos del piso son mallas con su propio sombreado.
 */
import * as THREE from "three";
import { htmlConIcono } from "../iconos";

const CSS = `
.tpl-layer{position:absolute;inset:0;overflow:hidden;pointer-events:none;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.tpl-l{position:absolute;left:0;top:0;will-change:transform;white-space:nowrap;pointer-events:none}
.tpl-pad{transform-origin:50% 100%;background:rgba(36,24,10,.78);border:1px solid rgba(255,214,107,.75);border-radius:999px;padding:3px 10px 3px 8px;color:#fff;font-weight:700;font-size:12px;line-height:1.25;box-shadow:0 2px 8px rgba(0,0,0,.35);text-align:center}
.tpl-pad small{display:block;font-weight:600;font-size:10.5px;color:#ffe7a3}
.tpl-pad.off{border-color:rgba(255,255,255,.35)}
.tpl-pad.off small{color:#f3c9b8}
.tpl-tag{background:rgba(0,0,0,.5);color:#fff;border-radius:7px;padding:1px 7px;font-size:11px;font-weight:600}
.tpl-ico{display:inline-flex;vertical-align:-.18em;margin-right:.32em;filter:drop-shadow(0 1px 0 rgba(0,0,0,.45)) brightness(1.35)}
.tpl-heap{background:rgba(255,214,107,.95);color:#3b2a10;border-radius:999px;padding:1px 8px;font-weight:800;font-size:12px;box-shadow:0 1px 6px rgba(255,190,60,.6)}
.tpl-bub{width:30px;height:30px;border-radius:50%;background:#fff;color:#7a4b0f;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:17px;box-shadow:0 2px 8px rgba(0,0,0,.35);animation:tplBob 1.1s ease-in-out infinite}
.tpl-bub.gold{background:linear-gradient(#ffe48a,#f2b632);color:#5a3500}
.tpl-bub.warn{background:#fff1ee;color:#b3242f}
.tpl-frase{max-width:210px;white-space:normal;background:#fff;color:#3b2a10;border-radius:12px;padding:4px 9px;font-size:12px;font-weight:700;line-height:1.25;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.35)}
.tpl-frase.mia{background:#fff4d6}
.tpl-frase.npc{background:#fdf6e3;color:#4a3214;box-shadow:0 2px 10px rgba(0,0,0,.35),inset 0 0 0 1px rgba(180,130,40,.35)}
.tpl-habla{display:inline-block;animation:tplHabla .28s cubic-bezier(.2,.9,.3,1.3) both}
@keyframes tplHabla{from{opacity:0;transform:translateY(5px) scale(.85)}}
.tpl-float{font-weight:900;font-size:16px;color:#ffd66b;text-shadow:0 1px 3px rgba(0,0,0,.85),0 0 8px rgba(255,180,40,.55);animation:tplFloat 1.15s ease-out forwards}
.tpl-float.blue{color:#bfe6ff;text-shadow:0 1px 3px rgba(0,0,0,.85)}
.tpl-float.white{color:#fff}
.tpl-edge{width:38px;height:38px;border-radius:50%;background:rgba(255,214,107,.95);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,.4)}
.tpl-edge svg{width:22px;height:22px}
.tpl-joy{position:absolute;left:0;top:0;width:116px;height:116px;margin:-58px 0 0 -58px;border-radius:50%;border:2px solid rgba(255,255,255,.45);background:radial-gradient(rgba(255,255,255,.14),rgba(255,255,255,.04));pointer-events:none;opacity:0;transition:opacity .15s}
.tpl-knob{position:absolute;left:0;top:0;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff7d6,#f2b632);box-shadow:0 3px 10px rgba(0,0,0,.4);pointer-events:none;opacity:0;transition:opacity .15s}
@keyframes tplBob{0%,100%{margin-top:0}50%{margin-top:-6px}}
@keyframes tplFloat{0%{opacity:0;margin-top:6px}12%{opacity:1}100%{opacity:0;margin-top:-46px}}
`;

let styleEl: HTMLStyleElement | null = null;
function ensureStyle() {
  if (styleEl && document.head.contains(styleEl)) return;
  styleEl = document.createElement("style");
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);
}

const v = new THREE.Vector3();

export class Overlay {
  layer: HTMLDivElement;
  private w = 1;
  private h = 1;
  private camera: THREE.Camera;
  private floats: { el: HTMLDivElement; p: THREE.Vector3; until: number }[] = [];
  joy: HTMLDivElement;
  knob: HTMLDivElement;
  edge: HTMLDivElement;

  constructor(parent: HTMLElement, camera: THREE.Camera) {
    ensureStyle();
    this.camera = camera;
    this.layer = document.createElement("div");
    this.layer.className = "tpl-layer";
    parent.appendChild(this.layer);
    this.joy = document.createElement("div");
    this.joy.className = "tpl-joy";
    this.knob = document.createElement("div");
    this.knob.className = "tpl-knob";
    this.edge = this.make("tpl-edge", `<svg viewBox="0 0 24 24" fill="#5a3500"><path d="M12 3l7 9h-4v9h-6v-9H5z"/></svg>`);
    this.edge.style.display = "none";
    this.layer.append(this.joy, this.knob);
  }

  resize(w: number, h: number) {
    this.w = w;
    this.h = h;
  }

  make(cls: string, html = ""): HTMLDivElement {
    const el = document.createElement("div");
    el.className = `tpl-l ${cls}`;
    // el emoji del principio (los letreros de los círculos) se dibuja con su ícono (iconos.tsx)
    el.innerHTML = htmlConIcono(html);
    this.layer.appendChild(el);
    return el;
  }

  remove(el: HTMLElement | null | undefined) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  /** Pone un elemento sobre un punto del mundo. Devuelve si quedó a la vista. */
  place(el: HTMLElement, p: THREE.Vector3, dy = 0, scale = 1): boolean {
    v.copy(p).project(this.camera);
    if (v.z > 1 || v.x < -1.3 || v.x > 1.3 || v.y < -1.3 || v.y > 1.4) {
      if (el.style.display !== "none") el.style.display = "none";
      return false;
    }
    if (el.style.display === "none") el.style.display = "";
    const x = ((v.x + 1) / 2) * this.w;
    const y = ((1 - v.y) / 2) * this.h + dy;
    el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-100%)${scale !== 1 ? ` scale(${scale.toFixed(3)})` : ""}`;
    return true;
  }

  /** Número que sube y se desvanece (+12 de gozo, +1 de sabiduría...). */
  float(text: string, p: THREE.Vector3, tone: "" | "blue" | "white" = "", now = performance.now()) {
    if (this.floats.length > 14) {
      const old = this.floats.shift();
      if (old) this.remove(old.el);
    }
    const el = this.make(`tpl-float ${tone}`, text);
    this.floats.push({ el, p: p.clone(), until: now + 1150 });
    this.place(el, p);
  }

  /** Flecha en el borde de la pantalla hacia un objetivo que no se ve. */
  pointTo(p: THREE.Vector3 | null) {
    if (!p) {
      this.edge.style.display = "none";
      return;
    }
    v.copy(p).project(this.camera);
    const behind = v.z > 1;
    let x = v.x, y = v.y;
    if (behind) {
      x = -x;
      y = -y;
    }
    const inside = !behind && Math.abs(x) < 0.92 && Math.abs(y) < 0.88;
    if (inside) {
      this.edge.style.display = "none";
      return;
    }
    const ang = Math.atan2(y, x);
    const k = Math.min(0.86 / Math.max(Math.abs(Math.cos(ang)), 1e-3), 0.8 / Math.max(Math.abs(Math.sin(ang)), 1e-3));
    const ex = Math.cos(ang) * k, ey = Math.sin(ang) * k;
    const px = ((ex + 1) / 2) * this.w, py = ((1 - ey) / 2) * this.h;
    this.edge.style.display = "flex";
    this.edge.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0) translate(-50%,-50%) rotate(${(90 - (ang * 180) / Math.PI).toFixed(1)}deg)`;
  }

  update(now: number) {
    for (let i = this.floats.length - 1; i >= 0; i--) {
      const f = this.floats[i];
      if (now > f.until) {
        this.remove(f.el);
        this.floats.splice(i, 1);
      } else this.place(f.el, f.p);
    }
  }

  /** El joystick: `alpha` más bajo en reposo (el joystick fijo se ve siempre) y `escala` para los botones grandes. */
  joystick(active: boolean, ox = 0, oy = 0, kx = 0, ky = 0, alpha = 1, escala = 1) {
    const o = active ? String(alpha) : "0";
    if (this.joy.style.opacity !== o) {
      this.joy.style.opacity = o;
      this.knob.style.opacity = o;
    }
    if (!active) return;
    const e = escala !== 1 ? ` scale(${escala.toFixed(3)})` : "";
    this.joy.style.transform = `translate3d(${ox}px,${oy}px,0)${e}`;
    this.knob.style.transform = `translate3d(${kx}px,${ky}px,0)${e}`;
  }

  dispose() {
    this.layer.remove();
  }
}

// ---------------------------------------------------------------- círculos del piso
const RING_VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const RING_FRAG = `
varying vec2 vUv;
uniform vec3 uColor; uniform float uProgress; uniform float uTime; uniform float uOpacity; uniform float uPad; uniform float uPulse;
void main(){
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  if (r > 1.0) discard;
  float ang = atan(p.x, -p.y) / 6.28318 + 0.5;
  float ring = smoothstep(0.80, 0.85, r) * (1.0 - smoothstep(0.95, 1.0, r));
  float a;
  vec3 col = uColor;
  if (uPad > 0.5) {
    float dash = step(0.45, fract(ang * 20.0 - uTime * 0.35));
    float fill = step(ang, uProgress) * smoothstep(0.6, 0.64, r) * (1.0 - smoothstep(0.76, 0.8, r));
    float inner = (1.0 - smoothstep(0.0, 0.7, r)) * 0.2;
    a = ring * mix(0.35, 1.0, dash) + fill + inner;
    col = mix(uColor, vec3(1.0, 0.97, 0.85), fill * 0.45);
  } else {
    float wave = 0.5 + 0.5 * sin(uTime * 3.0 - r * 6.0);
    a = ring * (0.65 + 0.35 * uPulse * wave) + (1.0 - smoothstep(0.0, 0.85, r)) * 0.1 * (0.5 + uPulse);
  }
  gl_FragColor = vec4(col, a * uOpacity);
  #include <colorspace_fragment>
}`;

export class Ring {
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  constructor(radius: number, color: string, pad: boolean) {
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uOpacity: { value: 1 },
        uPad: { value: pad ? 1 : 0 },
        uPulse: { value: 0 },
      },
      vertexShader: RING_VERT,
      fragmentShader: RING_FRAG,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 2).rotateX(-Math.PI / 2), this.mat);
    this.mesh.renderOrder = 1;
  }
  set(x: number, y: number, z: number) {
    this.mesh.position.set(x, y + 0.025, z);
  }
  dispose() {
    this.mesh.geometry.dispose();
    this.mat.dispose();
  }
}
