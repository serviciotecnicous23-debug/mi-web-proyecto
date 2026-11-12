/**
 * El arca de Joás en la ciudad (shared/arca.ts): un arca de madera de acacia con bandas de oro y el agujero en la tapa
 * (2 Reyes 12:9), arriba de la escalinata, a la puerta del templo. Cuando la ciudad la llena, se encienden lámparas de
 * oro a los dos lados de la escalinata y el arca brilla hasta el fin de la temporada. Nada con forma de cruz: las
 * lámparas son un pie con su taza y su llama.
 */
import * as THREE from "three";
import { C, GeoBuilder } from "../three/builder";
import { liberar, meshes } from "./escenario";
import * as P from "./plano";

/** Las lámparas de oro de la escalinata (x, lado). */
const LAMPARAS: [number, number][] = [
  [35.4, -1], [38.4, -1], [41.4, -1],
  [35.4, 1], [38.4, 1], [41.4, 1],
];

export class ArcaJoas {
  group = new THREE.Group();
  private llena: boolean | null = null;
  private llamas: THREE.Mesh | null = null;
  private brillo: THREE.Mesh | null = null;

  /** Dibuja el arca (y las lámparas si está llena). Devuelve si cambió algo. */
  poner(llena: boolean): boolean {
    if (this.llena === llena) return false;
    this.llena = llena;
    for (const c of [...this.group.children]) {
      this.group.remove(c);
      liberar(c);
    }
    this.llamas = null;
    this.brillo = null;
    const m = new GeoBuilder();
    const s = new GeoBuilder();
    const g = new GeoBuilder();
    const [ax, az] = P.ARCA;
    const y = P.alturaCiudad(ax, az);
    // el arca: caja de acacia, tapa con su agujero y bandas de oro en las esquinas
    // la base de piedra donde está puesta (cubre el escalón) y el arca encima
    m.box(1.0, 0.16, 0.76, C.piedraClara, { x: ax, y: y + 0.02, z: az });
    const b = y + 0.1;
    m.box(0.8, 0.5, 0.56, "#8a5a32", { x: ax, y: b + 0.25, z: az });
    m.box(0.86, 0.08, 0.62, "#6e4524", { x: ax, y: b + 0.54, z: az });
    // el agujero en la tapa (2 Reyes 12:9)
    m.box(0.24, 0.012, 0.07, "#140d07", { x: ax, y: b + 0.585, z: az });
    // las bandas de oro: en las esquinas, abajo y el borde de la tapa
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) s.box(0.05, 0.5, 0.05, C.oro, { x: ax + dx * 0.39, y: b + 0.25, z: az + dz * 0.27 });
    s.box(0.82, 0.05, 0.58, C.oro, { x: ax, y: b + 0.04, z: az });
    for (const dz of [-1, 1]) s.box(0.88, 0.035, 0.035, C.oro, { x: ax, y: b + 0.585, z: az + dz * 0.3 });
    for (const dx of [-1, 1]) s.box(0.035, 0.035, 0.6, C.oro, { x: ax + dx * 0.42, y: b + 0.585, z: az });
    if (llena) {
      // las lámparas de oro a los dos lados de la escalinata
      for (const [x, lado] of LAMPARAS) {
        const z = lado * (P.ESCALINATA.half + 0.12);
        const yl = P.alturaCiudad(x, lado * (P.ESCALINATA.half - 0.2));
        s.cyl(0.05, 0.07, 1.15, C.oro, { x, y: yl + 0.575, z }, 8);
        s.cyl(0.13, 0.06, 0.1, C.oro, { x, y: yl + 1.2, z }, 10);
        g.cone(0.06, 0.2, "#ffcf5a", { x, y: yl + 1.35, z }, 8);
      }
      // el brillo del arca llena
      g.cone(0.05, 0.16, "#ffe9a8", { x: ax, y: y + 0.8, z: az }, 6);
    }
    meshes(this.group, m, s, true, true);
    if (!g.empty) {
      const mat = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
      this.llamas = new THREE.Mesh(g.build(), mat);
      this.group.add(this.llamas);
      // un halo dorado alrededor del arca
      const halo = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.78, 32), new THREE.MeshBasicMaterial({ color: "#ffd35a", transparent: true, opacity: 0.55, toneMapped: false, side: THREE.DoubleSide }));
      halo.rotation.x = -Math.PI / 2;
      halo.position.set(ax, y + 0.04, az);
      this.brillo = halo;
      this.group.add(halo);
    }
    return true;
  }

  /** El halo del arca llena respira. */
  animar(t: number) {
    if (this.brillo) (this.brillo.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(t * 2) * 0.15;
  }

  destroy() {
    for (const c of [...this.group.children]) liberar(c);
    this.group.clear();
  }
}
