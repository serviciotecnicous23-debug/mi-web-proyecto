// El cierre del nivel visto sin cuenta (revisión del 20-nov-2026): el examen integral ya existe y dice lo que pide.
// Antes, a quien miraba sin cuenta le decía que estaría «disponible cuando todas las materias del nivel estén listas».
import { test } from "node:test";
import assert from "node:assert/strict";
import { NIVELES } from "@shared/academia";
import { estadoNivel, integralDisponible } from "./academia-nivel";

test("sin cuenta, cada nivel con todas sus materias muestra su examen integral, sin intentos y con lo que pide", async () => {
  assert.ok(NIVELES.some(integralDisponible), "algún nivel tiene su integral");
  for (const nv of NIVELES) {
    const e = await estadoNivel(null, nv, false);
    assert.equal(e.conSesion, false);
    const requisito = e.requisitos.find((r) => r.id === "integral")!;
    if (!integralDisponible(nv)) {
      assert.equal(e.integral, null, `Nivel ${nv.n}`);
      assert.equal(requisito.detalle, "Cuando todas las materias estén disponibles");
      continue;
    }
    assert.ok(e.integral, `Nivel ${nv.n}`);
    assert.equal(e.integral.intentos, 0);
    assert.equal(e.integral.mejor, null);
    assert.equal(e.integral.enCurso, false);
    assert.equal(e.integral.espera, 0);
    assert.equal(e.integral.aprobado, false);
    assert.equal(e.integral.aprueba, 75);
    assert.deepEqual(e.integral.falta, ["entrar con tu cuenta", `aprobar las ${nv.materias.length} materias del nivel`]);
    assert.equal(requisito.hecho, false);
    assert.equal(requisito.detalle, "Pendiente");
  }
});
