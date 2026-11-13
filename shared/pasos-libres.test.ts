// Se puede pasar a todas partes (13 de noviembre de 2026, pedido de Luis: «la escalera no me deja pasar» y «secciones
// bloqueadas por bibliotecas»). Recorre cada casa (sin muebles) y cada edificio en cada etapa de su restauración con la
// misma geometría de choques del motor (client/.../casa/choques.ts) y comprueba que desde la puerta se llega a cada
// cuarto y a cada círculo, y que ningún círculo que lleva a otro lado (subir, bajar, salir, el huerto) tapa un paso.
import { test } from "node:test";
import assert from "node:assert/strict";
import { PLANOS, pasoTapado, porQueNoCabe, validarInterior, type Colocado, type Plano } from "./casa-interior";
import { salasDe, type SalaDef } from "./restauracion";
import { EDIFICIOS, type EdificioDef } from "../client/src/games/templo/casa/edificios";
import { alcanzable, choquesFijos, choquesMuebles, medidasPlano, navDe } from "../client/src/games/templo/casa/choques";
import { DOOR_RECT, GATE_RECT, POS, STATIC_CIRCLES, STATIC_RECTS, VEIL_RECT, type Circle, type Rect } from "../client/src/games/templo/layout";
import { NavGrid } from "../client/src/games/templo/three/nav";
import { STATIONS } from "../client/src/games/templo/data";

type Objetivo = { que: string; x: number; z: number; piso: 0 | 1; radio: number };

/** Los círculos que llevan a otro lado (se vuelven obstáculo para ver si tapan un paso). */
type Trampa = { que: string; x: number; z: number; piso: 0 | 1; r: number };

function revisar(nombre: string, pl: Plano, o: { edificio: boolean; items: Colocado[]; personas?: Circle[]; objetivos: Objetivo[]; trampas: Trampa[] }): string[] {
  const { wx, wz } = medidasPlano(pl);
  const fijos = choquesFijos(pl, { edificio: o.edificio });
  const muebles = choquesMuebles(pl, o.items);
  const fallas: string[] = [];
  const [px, pz] = pl.puerta;
  const inicio: [number, number] = [wx(px + 1), wz(pz + 0.2)];
  for (const p of [0, 1] as const) {
    const cuartos = pl.cuartos.filter((c) => c.piso === p);
    if (!cuartos.length) continue;
    const rects: Rect[] = [...fijos.rects[p], ...muebles[p]];
    const circles: Circle[] = [...fijos.circles[p], ...(p === 0 ? o.personas ?? [] : [])];
    // arriba se llega por la escalera (donde se aparece al subir)
    const desde: [number, number] | null = p === 0 ? inicio : pl.escalera ? [wx(pl.escalera.arriba[0] + 0.5), wz(pl.escalera.arriba[1] + 0.5)] : null;
    if (!desde) continue;
    const llega = alcanzable(navDe(pl, p, rects, circles), desde);
    // los mismos caminos, con los círculos que llevan a otro lado como obstáculo (no se puede pasar por encima)
    const trampas = o.trampas.filter((t) => t.piso === p);
    const conTrampas = trampas.length ? alcanzable(navDe(pl, p, rects, [...circles, ...trampas.map((t): Circle => [t.x, t.z, t.r])]), desde) : llega;
    for (const cu of cuartos) {
      const celdas: [number, number][] = [];
      for (let x = cu.x; x < cu.x + cu.w; x++) for (let z = cu.z; z < cu.z + cu.d; z++) celdas.push([wx(x + 0.5), wz(z + 0.5)]);
      if (!celdas.some(([x, z]) => llega(x, z, 0.3))) fallas.push(`${nombre}: no se llega a «${cu.nombre}» (piso ${p})`);
      else if (!celdas.some(([x, z]) => conTrampas(x, z, 0.3))) fallas.push(`${nombre}: a «${cu.nombre}» solo se llega pisando ${trampas.map((t) => t.que).join(" o ")}`);
    }
    for (const ob of o.objetivos.filter((b) => b.piso === p)) if (!llega(ob.x, ob.z, ob.radio)) fallas.push(`${nombre}: no se llega a ${ob.que}`);
  }
  return fallas;
}

/** Los círculos de una casa (o edificio) que se disparan al pisarlos. */
function circulosDe(pl: Plano, edificio: boolean): { objetivos: Objetivo[]; trampas: Trampa[] } {
  const { wx, wz } = medidasPlano(pl);
  const [px, pz] = pl.puerta;
  const objetivos: Objetivo[] = [{ que: "la salida", x: wx(px + 1), z: wz(pz + 0.55), piso: 0, radio: 0.4 }];
  const trampas: Trampa[] = [{ que: "la salida", x: wx(px + 1), z: wz(pz + 0.55), piso: 0, r: 0.45 }];
  if (!edificio) {
    const [hx, hz] = pl.horno;
    objetivos.push({ que: "el horno", x: wx(hx + 0.5), z: wz(hz + 1.5), piso: 0, radio: 0.34 });
    if (pl.huerto?.length) {
      const xs = pl.huerto.map(([x]) => x);
      const hxx = wx((Math.min(...xs) + Math.max(...xs) + 1) / 2), hzz = wz(pl.huerto[0][1] + 0.6);
      objetivos.push({ que: "la puerta del huerto", x: hxx, z: hzz, piso: 0, radio: 0.38 });
      trampas.push({ que: "la puerta del huerto", x: hxx, z: hzz, piso: 0, r: 0.4 });
    }
  }
  if (pl.escalera) {
    const [ax, az] = pl.escalera.abajo, [bx, bz] = pl.escalera.arriba;
    objetivos.push({ que: "el pie de la escalera", x: wx(ax + 0.5), z: wz(az + 0.5), piso: 0, radio: 0.34 });
    objetivos.push({ que: "la llegada de la escalera", x: wx(bx + 0.5), z: wz(bz + 0.5), piso: 1, radio: 0.34 });
    trampas.push({ que: "el pie de la escalera", x: wx(ax + 0.5), z: wz(az + 0.5), piso: 0, r: 0.36 });
  }
  return { objetivos, trampas };
}

test("las casas: desde la puerta se llega a cada cuarto, al horno, al huerto y a la escalera, sin pisar la escalera para pasar", () => {
  const fallas = PLANOS.flatMap((pl, nivel) => revisar(`casa ${nivel}`, pl, { edificio: false, items: [], ...circulosDe(pl, false) }));
  assert.deepEqual(fallas, []);
});

/** Lo que hay en las salas de la restauración según cómo vaya cada trabajo (como CasaWorld.piezasResto). */
function piezasResto(salas: SalaDef[], progreso: Record<string, Record<string, number>>, hechas: Set<string>): Colocado[] {
  const out: Colocado[] = [];
  for (const s of salas) {
    if (hechas.has(s.id)) {
      for (const t of s.trabajos) out.push(...t.pone);
      out.push(...s.extra);
      continue;
    }
    for (const t of s.trabajos) {
      const n = Math.min(t.veces, progreso[s.id]?.[t.id] ?? 0);
      out.push(...t.quita.slice(Math.round((t.quita.length * n) / t.veces)));
      out.push(...t.pone.slice(0, Math.round((t.pone.length * n) / t.veces)));
    }
  }
  return out;
}

function revisarEdificio(e: EdificioDef): string[] {
  const pl = e.plano;
  const { wx, wz } = medidasPlano(pl);
  const salas = salasDe(e.id);
  const personas: Circle[] = e.personas.map((pd) => [wx(pd.x), wz(pd.z), 0.18]);
  const base = circulosDe(pl, true);
  const estaciones: Objetivo[] = e.estaciones.map((s) => ({ que: `la estación «${s.nombre}»`, x: wx(s.x), z: wz(s.z), piso: 0, radio: 0.4 }));
  // las etapas: todo en ruinas, cada trabajo a medias y terminado (uno por uno, en orden), cada sala hecha y todo hecho
  const etapas: { nombre: string; progreso: Record<string, Record<string, number>>; hechas: Set<string> }[] = [{ nombre: "en ruinas", progreso: {}, hechas: new Set() }];
  for (const s of salas) {
    const prog: Record<string, number> = {};
    for (const t of s.trabajos)
      for (let n = 1; n <= t.veces; n++) {
        prog[t.id] = n;
        etapas.push({ nombre: `${s.id}: ${t.id} ${n}/${t.veces}`, progreso: { [s.id]: { ...prog } }, hechas: new Set() });
      }
    etapas.push({ nombre: `${s.id} restaurada`, progreso: {}, hechas: new Set([s.id]) });
  }
  etapas.push({ nombre: "todo restaurado", progreso: {}, hechas: new Set(salas.map((s) => s.id)) });
  const fallas = new Set<string>();
  for (const et of etapas) {
    const objetivos = [...base.objetivos, ...estaciones];
    for (const s of salas) {
      if (et.hechas.has(s.id)) objetivos.push({ que: `la lectura de «${s.id}»`, x: wx(s.diario.x), z: wz(s.diario.z), piso: 0, radio: 0.4 });
      else
        for (const t of s.trabajos)
          if ((et.progreso[s.id]?.[t.id] ?? 0) < t.veces) objetivos.push({ que: `el trabajo «${t.nombre}» (${s.id})`, x: wx(t.x), z: wz(t.z), piso: 0, radio: 0.4 });
    }
    const items = [...e.piezas, ...piezasResto(salas, et.progreso, et.hechas)];
    for (const f of revisar(`${e.nombre} (${et.nombre})`, pl, { edificio: true, items, personas, objetivos, trampas: base.trampas })) fallas.add(f);
  }
  return [...fallas];
}

for (const e of Object.values(EDIFICIOS))
  test(`${e.nombre}: se llega a cada sala, estación, trabajo y lectura en cada etapa de la restauración`, () => {
    assert.deepEqual(revisarEdificio(e), []);
  });

test("toda abertura entre cuartos tiene al menos dos celdas (por una sola no se alcanza a pasar)", () => {
  const planos: [string, Plano][] = [...PLANOS.map((pl, i): [string, Plano] => [`casa ${i}`, pl]), ...Object.values(EDIFICIOS).map((e): [string, Plano] => [e.nombre, e.plano])];
  const solas: string[] = [];
  for (const [nombre, pl] of planos)
    for (const a of pl.aberturas) {
      // la llegada de la escalera arriba no es un paso entre cuartos
      if (pl.escalera && a.piso === 1 && a.x === pl.escalera.arriba[0] && a.z === pl.escalera.arriba[1]) continue;
      const vecina = pl.aberturas.some((b) => b !== a && b.piso === a.piso && b.lado === a.lado && (a.lado === "N" || a.lado === "S" ? b.z === a.z && Math.abs(b.x - a.x) === 1 : b.x === a.x && Math.abs(b.z - a.z) === 1));
      if (!vecina) solas.push(`${nombre}: ${a.x},${a.z} ${a.lado}`);
    }
  assert.deepEqual(solas, []);
});

test("los muebles de cada jugador no pueden tapar el paso a un cuarto, al horno ni a la escalera", () => {
  const adobe = PLANOS[1];
  // la alcoba (10..12 × 4..6) se abre por 9,5 y 9,6
  const baul: Colocado = { m: "baul", x: 8, z: 5, r: 1, p: 0 };
  assert.equal(pasoTapado(adobe, [{ m: "baul", x: 9, z: 5, r: 1, p: 0 }]), "«La alcoba»", "el baúl delante de la abertura la tapa");
  assert.equal(pasoTapado(adobe, [baul]), null, "a una celda de la abertura queda un paso de una celda, y por ahí se pasa");
  assert.equal(pasoTapado(adobe, [baul, { m: "tinaja", x: 9, z: 4, r: 0, p: 0 }]), "«La alcoba»", "con la tinaja al lado, ese paso se cierra");
  assert.match(porQueNoCabe(adobe, 1, { m: "baul", x: 9, z: 5, r: 1, p: 0 }, []) ?? "", /taparías el paso a «La alcoba»/);
  // el frente del horno (8,2) queda libre
  assert.equal(pasoTapado(adobe, [{ m: "tinaja", x: 8, z: 2, r: 0, p: 0 }]), "el horno");
  // la casa de piedra: el paso del patio al cuarto del este (filas 8 a 10) no se tapa del todo
  const piedra = PLANOS[2];
  const tresTinajas: Colocado[] = [8, 9, 10].map((z): Colocado => ({ m: "tinaja", x: 10, z, r: 0, p: 0 }));
  assert.equal(pasoTapado(piedra, tresTinajas.slice(0, 2)), null, "con una celda libre se sigue pasando");
  assert.match(pasoTapado(piedra, tresTinajas) ?? "", /«El cuarto del este»/);
  // lo de siempre sigue valiendo
  assert.equal(validarInterior(1, [{ m: "mesa", x: 3, z: 3, r: 0, p: 0 }, { m: "silla", x: 3, z: 4, r: 0, p: 0 }], { mesa: 1, silla: 1 }).ok, true);
});

test("el templo (el modo del aprendiz): desde la entrada se llega a cada estación, al empezar y con todo construido", () => {
  const fuera: string[] = [];
  const revisarTemplo = (nombre: string, rects: Rect[], ids: string[]) => {
    const llega = alcanzable(new NavGrid(rects, STATIC_CIRCLES), POS.start);
    for (const s of STATIONS.filter((st) => ids.includes(st.id))) if (!llega(s.pad[0], s.pad[1], 0.5)) fuera.push(`${nombre}: ${s.nombre}`);
  };
  // al empezar: las puertas del atrio, el Lugar Santo y el velo cerrados; se llega a lo de afuera del santuario
  const deAfuera = ["puertas", "lenera", "altar", "fuente", "santuario", "prensa", "horno", "camIncienso"];
  revisarTemplo("al empezar", [...STATIC_RECTS, DOOR_RECT, VEIL_RECT, GATE_RECT], deAfuera);
  // todo construido: también el candelero, la mesa y el altar del incienso (en el Lugar Santo)
  revisarTemplo("todo construido", [...STATIC_RECTS], STATIONS.map((s) => s.id));
  assert.deepEqual(fuera, []);
});
