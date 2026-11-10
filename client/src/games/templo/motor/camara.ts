/**
 * Motor común del templo y la ciudad: ayudas de la cámara.
 */
import * as THREE from "three";

const rayo = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const plano = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const punto = new THREE.Vector3();

/** El punto del piso (a la altura `y`) que queda bajo un toque en la pantalla (`u`, `v` de 0 a 1). */
export function haciaElPiso(camara: THREE.Camera, u: number, v: number, y: number): [number, number] | null {
  ndc.set(u * 2 - 1, -(v * 2 - 1));
  rayo.setFromCamera(ndc, camara);
  plano.constant = -y;
  const hit = rayo.ray.intersectPlane(plano, punto);
  return hit ? [hit.x, hit.z] : null;
}
