/**
 * El suelo vivo de la ciudad (docs/guia-visual.md, sección 7): matas de hierba que se mecen con el viento al pie de los
 * muros, en los callejones de atrás de las casas, en las orillas de las calles, al pie de los edificios y alrededor de
 * los árboles; piedritas sueltas; y, afuera de los muros, el campo con hierba, matas y piedras.
 *
 * Solo se ve: no choca con nada ni tapa un paso. La hierba va en mallas de instancias por bloques de 40 m (solo se
 * dibujan los bloques que ve la cámara) y el viento se calcula en la tarjeta de video con el mismo reloj de los
 * materiales (`tiempoMateriales`), así que la hierba, las hojas de los árboles y las matas se mecen con el mismo
 * viento. En los teléfonos va menos de la mitad.
 */
import * as THREE from "three";
import { AREA_RECT } from "@shared/ciudad";
import { PATIO_ZONA } from "@shared/juegos-grupo";
import { CALLES_DE_AREA, PARCELAS } from "@shared/parcelas";
import { C, GeoBuilder, matteMat, tiempoMateriales } from "../three/builder";
import { alturaSuelo } from "./escenario";
import { ARBOLES, ESCUELA, ESCUELA_PUERTA, PALACIO, PUERTA, SUELO, TORRES_NUEVAS, TORRE_MEDIO } from "./plano";

type Rect = [number, number, number, number];
type Mata = { x: number; y: number; z: number; s: number; tinte: THREE.Color };

/** El azar con semilla: la hierba sale igual cada vez (y en cada teléfono). */
function azar(semilla: number) {
  let s = semilla;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

/**
 * Una mata de hierba de 1 de alto: seis hojas angostas que salen del centro y se abren hacia afuera, oscuras abajo y
 * claras en la punta. Las normales miran arriba, como el suelo: así la hierba se ilumina como la tierra donde crece.
 */
function geometriaMata(): THREE.BufferGeometry {
  const r = azar(97);
  const pos: number[] = [], col: number[] = [], nor: number[] = [];
  const base = new THREE.Color("#4f5a2a"), medio = new THREE.Color("#8f9a4e"), punta = new THREE.Color("#e2d99a");
  const hojas = 5;
  for (let i = 0; i < hojas; i++) {
    const a = (i / hojas) * Math.PI * 2 + r() * 0.9;
    const inc = 0.3 + r() * 0.55;
    const alto = 0.7 + r() * 0.3;
    const ancho = 0.09 + r() * 0.04;
    const dx = Math.cos(a), dz = Math.sin(a);
    const px = (-dz * ancho) / 2, pz = (dx * ancho) / 2;
    const ox = dx * 0.04, oz = dz * 0.04;
    // la hoja en dos tramos: la base ancha y la punta, un poco más caída (se dobla)
    const mx = ox + dx * Math.sin(inc) * alto * 0.5, my = Math.cos(inc) * alto * 0.5, mz = oz + dz * Math.sin(inc) * alto * 0.5;
    const inc2 = inc + 0.35;
    const tx = mx + dx * Math.sin(inc2) * alto * 0.5, ty = my + Math.cos(inc2) * alto * 0.5, tz = mz + dz * Math.sin(inc2) * alto * 0.5;
    const q = 0.6;
    const v = [
      [ox + px, 0, oz + pz], [ox - px, 0, oz - pz], [mx - px * q, my, mz - pz * q],
      [ox + px, 0, oz + pz], [mx - px * q, my, mz - pz * q], [mx + px * q, my, mz + pz * q],
      [mx + px * q, my, mz + pz * q], [mx - px * q, my, mz - pz * q], [tx, ty, tz],
    ];
    const c = [base, base, medio, base, medio, medio, medio, medio, punta];
    v.forEach((p, k) => {
      pos.push(p[0], p[1], p[2]);
      col.push(c[k].r, c[k].g, c[k].b);
      nor.push(0, 1, 0);
    });
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.computeBoundingSphere();
  return g;
}

/**
 * La hierba con viento: la punta se dobla más que la base y pasan ráfagas de oriente a poniente. El empuje se calcula en
 * el mundo y se pasa a las medidas de cada mata (que está girada y escalada), así el viento sopla igual para todas.
 */
function materialHierba(): THREE.MeshLambertMaterial {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTiempo = tiempoMateriales;
    shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nuniform float uTiempo;").replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
#ifdef USE_INSTANCING
{
  vec3 hBase = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float hRafaga = 0.5 + 0.5 * sin(uTiempo * 0.5 - hBase.x * 0.05 - hBase.z * 0.018);
  float hFase = uTiempo * 2.3 - hBase.x * 0.45 - hBase.z * 0.3;
  float hDobla = position.y * position.y;
  vec3 hEmpuje = vec3(0.1 + sin(hFase) * 0.09 * (0.5 + hRafaga), 0.0, cos(hFase * 0.8) * 0.05) * (0.45 + 0.55 * hRafaga) * hDobla;
  mat3 hM = mat3(instanceMatrix);
  transformed += transpose(hM) * hEmpuje / max(dot(hM[0], hM[0]), 1e-4);
}
#endif`,
    );
    // las dos caras de la hoja se iluminan igual (sin esto, la cara de atrás quedaría oscura)
    shader.fragmentShader = shader.fragmentShader.replace("#include <normal_fragment_begin>", THREE.ShaderChunk.normal_fragment_begin.replace("normal *= faceDirection;", ""));
  };
  mat.customProgramCacheKey = () => "templo-hierba";
  return mat;
}

// los colores de la hierba (se multiplican por los de la mata)
const SECA = ["#d9cf9a", "#e6d7a0", "#cdbf86"];
const VERDE = ["#b9cf8a", "#a8c27e", "#c6d394"];

/** Las matas de dentro de los muros: al pie de lo que está quieto, donde no se camina por el medio. */
function matasDeLaCiudad(r: () => number, cuantas: number): Mata[] {
  const out: Mata[] = [];
  const Y = SUELO - 0.03;
  const tono = (verde: number) => new THREE.Color(r() < verde ? VERDE[Math.floor(r() * 3)] : SECA[Math.floor(r() * 3)]);
  const mata = (x: number, z: number, s: number, verde = 0.3) => out.push({ x, y: Y, z, s: s * (0.75 + r() * 0.5), tinte: tono(verde) });
  /** Un manchón: de 2 a 5 matas juntas (así crece la hierba de verdad, no de una en una). */
  const manchon = (x: number, z: number, radio: number, s: number, verde = 0.3) => {
    const n = 3 + Math.floor(r() * 4);
    for (let k = 0; k < n; k++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * radio;
      mata(x + Math.cos(a) * d, z + Math.sin(a) * d, s, verde);
    }
  };
  const dentro = (x: number, z: number, q: Rect) => x > q[0] && x < q[2] && z > q[1] && z < q[3];
  /** Manchones a lo largo de una franja (en x o en z), cada tanto. */
  const franja = (q: Rect, cada: number, s: number, verde = 0.3, saltar?: (x: number, z: number) => boolean) => {
    const largoX = q[2] - q[0], largoZ = q[3] - q[1];
    const largo = Math.max(largoX, largoZ);
    for (let t = r() * cada; t < largo; t += cada * (0.6 + r() * 0.8)) {
      const x = largoX >= largoZ ? q[0] + t : q[0] + r() * largoX;
      const z = largoX >= largoZ ? q[1] + r() * largoZ : q[1] + t;
      if (saltar?.(x, z)) continue;
      manchon(x, z, Math.min(0.35, Math.min(largoX, largoZ) * 0.5 + 0.1), s, verde);
    }
  };
  // 1. al pie de los muros de la ciudad, por dentro (sin la puerta, sus torres, las torres nuevas ni el patio de los juegos)
  const enElPatio = (x: number, z: number) => dentro(x, z, PATIO_ZONA);
  franja([-6, -71.35, 75, -70.6], 1.5, 0.55, 0.25, enElPatio);
  franja([-6, 70.6, 75, 71.35], 1.5, 0.55, 0.25);
  franja([74.75, -70.5, 75.3, 70.5], 1.4, 0.55, 0.25, (_x, z) => Math.abs(z) < PUERTA.half + 4.6 || TORRES_NUEVAS.some((tz) => Math.abs(z - tz) < TORRE_MEDIO + 0.5));
  // 2. al pie del monte del templo, al norte y al sur
  franja([-6, 14.75, 34.2, 15.3], 1.6, 0.52, 0.35);
  franja([-6, -15.3, 34.2, -14.75], 1.6, 0.52, 0.35);
  // 3. al pie del palacio (atrás y a los costados) y de la escuela (atrás, costados y el frente sin la puerta)
  franja([PALACIO[0] - 0.6, PALACIO[3] + 0.05, PALACIO[2] + 0.6, PALACIO[3] + 0.55], 1.4, 0.5, 0.3);
  franja([PALACIO[0] - 0.55, PALACIO[1], PALACIO[0] - 0.05, PALACIO[3]], 1.4, 0.5, 0.3);
  franja([PALACIO[2] + 0.05, PALACIO[1], PALACIO[2] + 0.55, PALACIO[3]], 1.4, 0.5, 0.3);
  franja([ESCUELA[0] - 0.6, ESCUELA[1] - 0.55, ESCUELA[2] + 0.6, ESCUELA[1] - 0.05], 1.4, 0.5, 0.3);
  franja([ESCUELA[0] - 0.55, ESCUELA[1], ESCUELA[0] - 0.05, ESCUELA[3]], 1.4, 0.5, 0.3);
  franja([ESCUELA[2] + 0.05, ESCUELA[1], ESCUELA[2] + 0.55, ESCUELA[3]], 1.4, 0.5, 0.3);
  franja([ESCUELA[0], ESCUELA[3] + 0.05, ESCUELA[2], ESCUELA[3] + 0.45], 1.5, 0.46, 0.3, (x) => Math.abs(x - ESCUELA_PUERTA[0]) < 2.6);
  // 4. en los barrios: el callejón de atrás entre las filas de casas y las orillas de las calles (fuera de los huertitos)
  AREA_RECT.forEach(([x0, z0, x1], i) => {
    franja([x0, z0 + 13.9, x1, z0 + 14.6], 1.1, 0.56, 0.45);
    const huertito = (x: number, z: number) =>
      PARCELAS[i].some((p) => {
        if (x < p.rect[0] || x > p.rect[2]) return false;
        // el huertito de la casa queda a la orilla de la calle, del lado de la puerta
        const cerca = p.dir === 1 ? x < p.rect[0] + 1.05 : x > p.rect[2] - 1.05;
        const frente = p.dir === 1 ? p.rect[3] : p.rect[1];
        return cerca && Math.abs(z - frente) < 0.9;
      });
    for (const [a, b] of CALLES_DE_AREA) {
      franja([x0, z0 + a + 0.02, x1, z0 + a + 0.24], 2.4, 0.44, 0.3, huertito);
      franja([x0, z0 + b - 0.24, x1, z0 + b - 0.02], 2.4, 0.44, 0.3, huertito);
    }
  });
  // 5. alrededor de los árboles de las calles y de la plaza, más verde (la sombra guarda la humedad)
  for (const [ax, az] of ARBOLES) {
    for (let k = 0; k < 4; k++) {
      const a = r() * Math.PI * 2, d = 0.6 + r() * 0.8;
      manchon(ax + Math.cos(a) * d, az + Math.sin(a) * d, 0.3, 0.52, 0.7);
    }
  }
  // en los teléfonos, la mitad (de manera pareja)
  return cuantas >= out.length ? out : out.filter((_, k) => k % Math.ceil(out.length / cuantas) === 0);
}

/** Las matas del campo, afuera de los muros: en manchones, más cerca de los muros (lo lejano lo cubre la bruma). */
function matasDelCampo(r: () => number, manchones: number): Mata[] {
  const out: Mata[] = [];
  const franjas: Rect[] = [
    [78, -95, 118, 95], // al oriente: el valle del Cedrón
    [-40, 74.5, 78, 104], // al sur
    [-40, -104, 78, -74.5], // al norte
    [-52, -74.5, -23, 74.5], // al poniente, detrás del templo
  ];
  const areas = franjas.map((q) => (q[2] - q[0]) * (q[3] - q[1]));
  const total = areas.reduce((a, b) => a + b, 0);
  franjas.forEach((q, i) => {
    const n = Math.round((manchones * areas[i]) / total);
    for (let k = 0; k < n; k++) {
      const cx = q[0] + r() * (q[2] - q[0]), cz = q[1] + r() * (q[3] - q[1]);
      const verde = cx > 85 ? 0.55 : 0.4;
      const m = 2 + Math.floor(r() * 5);
      for (let j = 0; j < m; j++) {
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.7;
        const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
        out.push({ x, y: alturaSuelo(x, z) - 0.03, z, s: 0.6 + r() * 0.45, tinte: new THREE.Color(r() < verde ? VERDE[Math.floor(r() * 3)] : SECA[Math.floor(r() * 3)]) });
      }
    }
  });
  return out;
}

/** Piedritas sueltas (aplastadas, de color de piedra) y, en el campo, matas bajas. */
function piedrasYMatas(r: () => number, coarse: boolean): { ciudad: GeoBuilder; campo: GeoBuilder } {
  const ciudad = new GeoBuilder(), campo = new GeoBuilder();
  const tonos = [C.piedra, C.piedraOsc, "#bfae8a", "#d8caa8", "#a99a7a"];
  const piedra = (b: GeoBuilder, x: number, y: number, z: number, s: number) =>
    b.add(new THREE.IcosahedronGeometry(1, 0), tonos[Math.floor(r() * tonos.length)], { x, y: y + s * 0.25, z, sx: s * (0.8 + r() * 0.6), sy: s * (0.45 + r() * 0.3), sz: s * (0.8 + r() * 0.5), ry: r() * 6, rx: (r() - 0.5) * 0.4 });
  const Y = SUELO;
  const div = coarse ? 2 : 1;
  // en la ciudad: junto a los muros de adentro y en los callejones de atrás
  for (let k = 0; k < 220 / div; k++) {
    const lado = r();
    if (lado < 0.35) piedra(ciudad, -6 + r() * 81, Y, -71.1 + r() * 0.6, 0.07 + r() * 0.1);
    else if (lado < 0.7) piedra(ciudad, -6 + r() * 81, Y, 70.5 + r() * 0.6, 0.07 + r() * 0.1);
    else {
      const [x0, z0, x1] = AREA_RECT[Math.floor(r() * 4)];
      piedra(ciudad, x0 + r() * (x1 - x0), Y, z0 + 13.95 + r() * 0.6, 0.06 + r() * 0.08);
    }
  }
  // en el campo: piedras sueltas y algunas grandes, y matas bajas de color oliva
  for (let k = 0; k < 520 / div; k++) {
    const x = -50 + r() * 168, z = -104 + r() * 208;
    if (x > -23 && x < 78 && Math.abs(z) < 74.5) continue;
    const grande = r() < 0.12;
    piedra(campo, x, alturaSuelo(x, z) - (grande ? 0.15 : 0.05), z, grande ? 0.35 + r() * 0.5 : 0.08 + r() * 0.16);
  }
  const oliva = ["#7d8455", "#86875a", "#6f7a45", "#8e8f62"];
  for (let k = 0; k < 170 / div; k++) {
    const x = -50 + r() * 168, z = -104 + r() * 208;
    if (x > -23 && x < 78 && Math.abs(z) < 74.5) continue;
    const y = alturaSuelo(x, z);
    const n = 2 + Math.floor(r() * 3), s = 0.28 + r() * 0.3;
    for (let j = 0; j < n; j++) campo.add(new THREE.IcosahedronGeometry(1, 0), oliva[Math.floor(r() * oliva.length)], { x: x + (r() - 0.5) * s * 1.6, y: y + s * 0.45, z: z + (r() - 0.5) * s * 1.6, sx: s, sy: s * 0.7, sz: s, ry: r() * 6 });
  }
  return { ciudad, campo };
}

export type SueloVivo = { grupo: THREE.Group; dispose(): void };

/**
 * La hierba con viento en otro lugar (el huerto): las matas que se le den, en una sola malla de instancias, con el mismo
 * viento que la ciudad. `verde` es la parte de matas verdes (el resto, secas).
 */
export function hierbaCon(matas: { x: number; y: number; z: number; s: number }[], verde = 0.4, semilla = 11): SueloVivo {
  const grupo = new THREE.Group();
  grupo.name = "hierba";
  const r = azar(semilla);
  const geo = geometriaMata();
  const mat = materialHierba();
  const hierba = new THREE.InstancedMesh(geo, mat, Math.max(1, matas.length));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s = new THREE.Vector3();
  matas.forEach((a, i) => {
    e.set((r() - 0.5) * 0.12, r() * Math.PI * 2, (r() - 0.5) * 0.12);
    q.setFromEuler(e);
    p.set(a.x, a.y, a.z);
    s.setScalar(a.s * (0.75 + r() * 0.5));
    hierba.setMatrixAt(i, m.compose(p, q, s));
    hierba.setColorAt(i, new THREE.Color(r() < verde ? VERDE[Math.floor(r() * 3)] : SECA[Math.floor(r() * 3)]));
  });
  hierba.count = matas.length;
  hierba.instanceMatrix.needsUpdate = true;
  if (hierba.instanceColor) hierba.instanceColor.needsUpdate = true;
  hierba.computeBoundingSphere();
  hierba.receiveShadow = true;
  grupo.add(hierba);
  return {
    grupo,
    dispose() {
      geo.dispose();
      mat.dispose();
      hierba.dispose();
    },
  };
}

/** Arma el suelo vivo de la ciudad (una vez, al entrar a la ciudad). */
export function construirSueloVivo(coarse: boolean): SueloVivo {
  const grupo = new THREE.Group();
  grupo.name = "suelo-vivo";
  const r = azar(5077);
  const matas = [...matasDeLaCiudad(r, coarse ? 1000 : 100000), ...matasDelCampo(r, coarse ? 520 : 1300)];
  const geo = geometriaMata();
  const mat = materialHierba();
  // por bloques de 40 m: cada bloque es una malla de instancias con su esfera, así la cámara descarta lo que no ve
  const BLOQUE = 40;
  const bloques = new Map<string, Mata[]>();
  for (const a of matas) {
    const k = `${Math.floor(a.x / BLOQUE)},${Math.floor(a.z / BLOQUE)}`;
    const lista = bloques.get(k);
    if (lista) lista.push(a);
    else bloques.set(k, [a]);
  }
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s = new THREE.Vector3();
  const mallas: THREE.InstancedMesh[] = [];
  for (const lista of bloques.values()) {
    const hierba = new THREE.InstancedMesh(geo, mat, lista.length);
    lista.forEach((a, i) => {
      e.set((r() - 0.5) * 0.12, r() * Math.PI * 2, (r() - 0.5) * 0.12);
      q.setFromEuler(e);
      p.set(a.x, a.y, a.z);
      s.setScalar(a.s);
      hierba.setMatrixAt(i, m.compose(p, q, s));
      hierba.setColorAt(i, a.tinte);
    });
    hierba.instanceMatrix.needsUpdate = true;
    if (hierba.instanceColor) hierba.instanceColor.needsUpdate = true;
    hierba.computeBoundingSphere();
    hierba.receiveShadow = true;
    hierba.castShadow = false;
    grupo.add(hierba);
    mallas.push(hierba);
  }
  const { ciudad, campo } = piedrasYMatas(r, coarse);
  const geos: THREE.BufferGeometry[] = [];
  for (const [b, oclusion] of [[ciudad, true], [campo, false]] as [GeoBuilder, boolean][]) {
    if (b.empty) continue;
    // en el campo, el suelo sube y baja: sin la oclusión horneada (que mira la parte más baja de toda la malla)
    const g = b.build(oclusion);
    geos.push(g);
    const malla = new THREE.Mesh(g, matteMat());
    malla.receiveShadow = true;
    grupo.add(malla);
  }
  return {
    grupo,
    dispose() {
      geo.dispose();
      mat.dispose();
      for (const h of mallas) h.dispose();
      for (const g of geos) g.dispose();
    },
  };
}
