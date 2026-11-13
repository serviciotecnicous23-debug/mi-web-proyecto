// La casa viva (13 de noviembre de 2026): más espacio sin mover lo que ya estaba puesto, los muebles nuevos y los que se
// usan, el rollo del día, la ropa de pies a cabeza y sus colecciones nuevas en el álbum.
import { test } from "node:test";
import assert from "node:assert/strict";
import { MUEBLES, PLANOS, ROLLO_DEL_DIA, USOS_CASA, celdasFijas, cuartoEn, mueble, rolloDelDia, usoDe, validarInterior } from "./casa-interior";
import { ARTICULOS, RANURAS, ROPA_DE_PIES_A_CABEZA, articulo, coloresDeIds, leerRopaIds, ranuraDe } from "./mercado";
import { COLECCIONES } from "./album";

/** Los cuartos de antes de la casa viva (para comprobar que lo puesto antes sigue cabiendo igual). */
const ANTES: { x: number; z: number; w: number; d: number; piso: 0 | 1 }[][] = [
  [{ x: 0, z: 0, w: 8, d: 6, piso: 0 }],
  [{ x: 0, z: 0, w: 10, d: 7, piso: 0 }, { x: 10, z: 0, w: 3, d: 4, piso: 0 }],
  [{ x: 0, z: 0, w: 14, d: 4, piso: 0 }, { x: 0, z: 4, w: 4, d: 8, piso: 0 }, { x: 4, z: 4, w: 6, d: 8, piso: 0 }, { x: 10, z: 4, w: 4, d: 8, piso: 0 }, { x: 0, z: 0, w: 14, d: 4, piso: 1 }],
  [{ x: 0, z: 0, w: 14, d: 4, piso: 0 }, { x: 0, z: 4, w: 4, d: 8, piso: 0 }, { x: 4, z: 4, w: 6, d: 8, piso: 0 }, { x: 10, z: 4, w: 4, d: 8, piso: 0 }, { x: 0, z: 0, w: 6, d: 4, piso: 1 }, { x: 6, z: 0, w: 8, d: 4, piso: 1 }],
];
const MAX_ANTES = [10, 18, 28, 40];

test("más espacio: cada celda de antes sigue en el mismo cuarto y caben más muebles", () => {
  PLANOS.forEach((pl, nivel) => {
    for (const cu of ANTES[nivel])
      for (let x = cu.x; x < cu.x + cu.w; x++)
        for (let z = cu.z; z < cu.z + cu.d; z++) {
          const ahora = cuartoEn(pl, x, z, cu.piso);
          assert.ok(ahora, `nivel ${nivel}: la celda ${x},${z} quedó afuera`);
          assert.equal(cuartoEn(pl, cu.x, cu.z, cu.piso)?.id, ahora!.id, `nivel ${nivel}: la celda ${x},${z} cambió de cuarto`);
        }
    assert.ok(pl.maxMuebles > MAX_ANTES[nivel], `nivel ${nivel}: caben ${pl.maxMuebles}`);
    assert.ok(pl.cuartos.length > ANTES[nivel].length, `nivel ${nivel}: un cuarto más`);
  });
  // un mueble en el cuarto nuevo de la casa de adobe (la alcoba) se puede poner
  const ok = validarInterior(1, [{ m: "lecho-cobertor", x: 10, z: 4, r: 0, p: 0 }], { "lecho-cobertor": 1 });
  assert.equal(ok.ok, true, JSON.stringify(ok));
  // y lo de antes, igual que antes
  const antes = validarInterior(0, [{ m: "mesa", x: 0, z: 1, r: 0, p: 0 }, { m: "silla", x: 2, z: 1, r: 0, p: 0 }], { mesa: 1, silla: 1 });
  assert.equal(antes.ok, true);
  // la puerta del huerto y la entrada no se tapan
  for (const pl of PLANOS) for (const [x, z] of pl.huerto ?? []) assert.ok(celdasFijas(pl).has(`0:${x},${z}`));
});

test("los muebles nuevos: en el mercado, con su pieza fina y en su colección del álbum", () => {
  for (const id of ["fogon", "cantaros", "baul", "lecho-cobertor", "tapiz"]) {
    const mu = mueble(id);
    assert.ok(mu && mu.precio > 0 && !mu.exclusivo && mu.serie === "casa-viva", id);
    assert.ok(mueble(`${id}-oro`)?.fina === id, `${id}-oro`);
  }
  assert.equal(mueble("lecho-cobertor")!.nivelMin, 1);
  assert.equal(mueble("fogon")!.luz, true);
  const casaViva = COLECCIONES.find((c) => c.id === "casa-viva")!;
  assert.deepEqual([...casaViva.items].sort(), ["baul", "cantaros", "fogon", "lecho-cobertor", "tapiz"]);
  // las colecciones de antes no cambian (nadie pierde un título)
  const muebles = COLECCIONES.find((c) => c.id === "muebles")!;
  assert.ok(!muebles.items.some((i) => mueble(i)?.serie), "los muebles de antes no cambian");
  assert.equal(muebles.items.length, MUEBLES.filter((m) => !m.exclusivo && !m.serie).length);
  assert.ok(!COLECCIONES.find((c) => c.id === "muebles-finos")!.items.some((i) => mueble(i)?.serie));
  assert.ok(!COLECCIONES.find((c) => c.id === "ropa")!.items.some((i) => articulo(i)?.serie));
});

test("los muebles que se usan: sentarse, descansar, cocinar y leer el rollo", () => {
  assert.equal(usoDe("silla"), "sentarse");
  assert.equal(usoDe("banco-cedro-oro"), "sentarse", "la pieza fina, como la suya");
  assert.equal(usoDe("lecho"), "descansar");
  assert.equal(usoDe("lecho-cobertor"), "descansar");
  assert.equal(usoDe("fogon"), "cocinar");
  assert.equal(usoDe("estante"), "leer");
  assert.equal(usoDe("mesa"), null, "sin estante de rollos, en la mesa no se lee");
  assert.equal(usoDe("mesa", true), "leer");
  assert.equal(usoDe("tinaja"), null);
  assert.ok(USOS_CASA.descansar.gozo > 0 && USOS_CASA.cocinar.harina > 0 && USOS_CASA.leer.gozo > 0);
  // el rollo del día: el mismo todo el día, y cambia con los días
  assert.equal(rolloDelDia("2026-11-13"), rolloDelDia("2026-11-13"));
  const distintos = new Set(Array.from({ length: 30 }, (_, i) => rolloDelDia(`2026-12-${String(i + 1).padStart(2, "0")}`).ref));
  assert.ok(distintos.size >= 8);
  assert.equal(ROLLO_DEL_DIA.length, 14);
  for (const v of ROLLO_DEL_DIA) assert.ok(v.text.length > 20 && /\d+:\d+/.test(v.ref), v.ref);
});

test("la ropa de pies a cabeza: cada prenda en su ranura y se dibuja con sus colores", () => {
  assert.equal(ranuraDe(articulo("manto-lana")), "manto");
  assert.equal(ranuraDe(articulo("faja-azul")), "faja");
  assert.equal(ranuraDe(articulo("tunica-bordada")), "tunica");
  assert.equal(ranuraDe(articulo("velo-rosa")), "cabeza");
  assert.equal(ranuraDe(articulo("sandalias-rojas")), "pies");
  assert.equal(ranuraDe(articulo("rollo")), "mano");
  assert.equal(ranuraDe(articulo("zurron-cuero")), "bolsa");
  assert.equal(ranuraDe(articulo("letrero")), null);
  for (const a of ROPA_DE_PIES_A_CABEZA) {
    assert.ok(a.ranura && RANURAS.includes(a.ranura) && a.color && a.precio > 0, a.id);
    assert.ok(ARTICULOS.includes(a), a.id);
  }
  const v = coloresDeIds({ tunica: "tunica-bordada", cabeza: "turbante-azul", pies: "sandalias-cuero", mano: "cayado", bolsa: "zurron-cuero", manto: "manto-cielo", faja: null });
  assert.equal(v.tunica, "#f3ecd8");
  assert.equal(v.franja, "#c99a3b");
  assert.equal(v.bordado, true);
  assert.deepEqual(v.cabeza, { forma: "turbante", color: "#2f5aa8" });
  assert.equal(v.pies, "#7a5634");
  assert.equal(v.mano, "cayado");
  assert.equal(v.bolsa, "#8a6a42");
  assert.equal(v.manto, "#7fb2d9");
  // lo que no es de esa ranura no cuenta
  assert.deepEqual(coloresDeIds({ tunica: "manto-lana", mano: "velo-lino" }), {});
  const leida = leerRopaIds({ manto: "manto-lana", tunica: "cayado", cabeza: "velo-lino", basura: 4 });
  assert.equal(leida.manto, "manto-lana");
  assert.equal(leida.tunica, null);
  assert.equal(leida.cabeza, "velo-lino");
  assert.deepEqual(Object.keys(leida).sort(), [...RANURAS].sort());
  assert.deepEqual(COLECCIONES.find((c) => c.id === "de-pies-a-cabeza")!.items.length, ROPA_DE_PIES_A_CABEZA.length);
});
