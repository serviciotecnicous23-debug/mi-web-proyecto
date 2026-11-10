/**
 * Motor común: la presencia de los demás jugadores (por WebSocket, ciudad/red.ts). Dibuja a cada uno
 * con la vestidura de su escalón, lo mueve suave hacia donde dice el servidor, y pone su nombre y lo
 * que lleva en las manos sobre la cabeza. Lo usa el templo en línea (la ciudad tiene su propia
 * versión con las frases y la ficha del vecino).
 */
import * as THREE from "three";
import type { EscalonId } from "@shared/jerusalen";
import { ACTIVIDADES, type VecinoInfo } from "@shared/ciudad";
import { Figure, newRig, type BlobShadows, type FigureLook, type Rig } from "../three/characters";
import type { Overlay } from "../three/overlay";

const RANK_LOOK: FigureLook[] = ["aprendiz", "sacerdote", "turno", "principal", "sumo"];

function lookDe(e: EscalonId | undefined): FigureLook {
  switch (e) {
    case "sumo":
      return RANK_LOOK[4];
    case "principal":
      return RANK_LOOK[3];
    case "jefe":
    case "turno":
      return RANK_LOOK[2];
    default:
      return RANK_LOOK[1];
  }
}

function turn(a: number, b: number, k: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * Math.min(1, k);
}

type Otro = { id: number; fig: Figure; look: FigureLook; rig: Rig; obj: { x: number; z: number; ry: number; m: number; a: number }; etiqueta: HTMLDivElement };

export class Presencia {
  private infos = new Map<number, VecinoInfo>();
  private otros = new Map<number, Otro>();

  constructor(
    private scene: THREE.Scene,
    private overlay: Overlay,
    private shadows: BlobShadows,
    private altura: (x: number, z: number) => number,
  ) {}

  /** Cuántos se ven ahora. */
  get cuantos(): number {
    return this.otros.size;
  }

  alInfo(v: VecinoInfo) {
    const antes = this.infos.get(v.id);
    this.infos.set(v.id, v);
    const o = this.otros.get(v.id);
    if (!o) return;
    this.textoDe(o);
    if (!antes || antes.escalon !== v.escalon) {
      const look = lookDe(v.escalon);
      if (look !== o.look) {
        o.fig.setLook(look);
        o.look = look;
      }
    }
  }

  alVecinos(l: [number, number, number, number, number, number?][]) {
    const vistos = new Set<number>();
    for (const [id, x, z, ry, m, a] of l) {
      vistos.add(id);
      const o = this.otros.get(id) ?? this.crear(id, x, z, ry);
      o.obj.x = x;
      o.obj.z = z;
      o.obj.ry = ry;
      o.obj.m = m;
      if ((a ?? 0) !== o.obj.a) {
        o.obj.a = a ?? 0;
        this.textoDe(o);
      }
    }
    for (const id of [...this.otros.keys()]) if (!vistos.has(id)) this.quitar(id);
  }

  /** El letrero: el nombre (como texto, nunca como HTML) y lo que lleva. */
  private textoDe(o: Otro) {
    const nombre = this.infos.get(o.id)?.nombre ?? "Sacerdote";
    const lleva = ACTIVIDADES[o.obj.a] || "";
    o.etiqueta.textContent = lleva ? `${nombre} ${lleva}` : nombre;
  }

  private crear(id: number, x: number, z: number, ry: number): Otro {
    const look = lookDe(this.infos.get(id)?.escalon);
    const fig = new Figure(look);
    this.scene.add(fig.root);
    const rig = newRig(x, z);
    rig.y = this.altura(x, z);
    rig.yaw = ry;
    const etiqueta = this.overlay.make("tpl-tag");
    etiqueta.style.display = "none";
    const o: Otro = { id, fig, look, rig, obj: { x, z, ry, m: 0, a: 0 }, etiqueta };
    this.textoDe(o);
    this.otros.set(id, o);
    return o;
  }

  private quitar(id: number) {
    const o = this.otros.get(id);
    if (!o) return;
    this.scene.remove(o.fig.root);
    o.fig.dispose();
    this.overlay.remove(o.etiqueta);
    this.otros.delete(id);
  }

  /** Mueve a cada uno suave hacia donde está y pone su letrero (si está cerca del jugador). */
  animar(dt: number, jugador: { x: number; z: number }) {
    for (const o of this.otros.values()) {
      const r = o.rig;
      const dx = o.obj.x - r.x,
        dz = o.obj.z - r.z;
      const d = Math.hypot(dx, dz);
      if (d > 10) {
        r.x = o.obj.x;
        r.z = o.obj.z;
      } else {
        const k = Math.min(1, dt * 9);
        r.x += dx * k;
        r.z += dz * k;
        r.phase += d * k * 7.2;
      }
      const anda = o.obj.m || d > 0.12 ? Math.min(1, 0.5 + d) : 0;
      r.moving += (anda - r.moving) * Math.min(1, dt * 8);
      r.yaw = turn(r.yaw, o.obj.ry, dt * 10);
      r.y = this.altura(r.x, r.z);
      r.carrying = o.obj.a > 0;
      r.t += dt;
      o.fig.update(r);
      this.shadows.add(r.x, r.y, r.z, 1.05);
      const cerca = Math.hypot(jugador.x - r.x, jugador.z - r.z) < 18;
      if (cerca) this.overlay.place(o.etiqueta, new THREE.Vector3(r.x, r.y + 1.95, r.z));
      else o.etiqueta.style.display = "none";
    }
  }

  destruir() {
    for (const id of [...this.otros.keys()]) this.quitar(id);
  }
}
