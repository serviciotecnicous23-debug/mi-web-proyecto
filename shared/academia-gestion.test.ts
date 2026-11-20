import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAMEN_FINAL, FACTOR_TIEMPO_EXTRA, MEDIDA_MINI, conTiempoExtra, minutosDe } from "./academia";
import { CAPACIDADES, alcanceDe, soloVer } from "./academia-permisos";

test("el tiempo extra alarga cada reloj 1,5 veces y no cambia el examen", () => {
  assert.equal(FACTOR_TIEMPO_EXTRA, 1.5);
  const n1 = conTiempoExtra(EXAMEN_FINAL[1]);
  assert.equal(n1.segundos, 90);
  assert.equal(n1.minutosEscrita, 9);
  assert.equal(n1.objetivas, EXAMEN_FINAL[1].objetivas);
  assert.equal(n1.escritas, EXAMEN_FINAL[1].escritas);
  assert.equal(n1.pesoObjetiva, EXAMEN_FINAL[1].pesoObjetiva);
  assert.equal("minutosBreve" in n1, false, "sin escrito breve no aparece");
  // los Niveles 3 a 5 tienen escrito breve: 15 minutos pasan a 23 (se redondea para arriba)
  const n3 = conTiempoExtra(EXAMEN_FINAL[3]);
  assert.equal(n3.minutosBreve, 23);
  assert.equal(minutosDe(n3, "breve"), 23);
  assert.equal(minutosDe(n3, "corta"), 9);
  // las mini pruebas: 60 segundos pasan a 90
  assert.equal(conTiempoExtra(MEDIDA_MINI).segundos, 90);
  // no toca la medida original (es la de todos)
  assert.equal(EXAMEN_FINAL[1].segundos, 60);
});

test("gestionar el expediente es solo de la Administración", () => {
  const c = CAPACIDADES.find((x) => x.id === "gestionar");
  assert.ok(c, "existe la capacidad");
  assert.equal(alcanceDe("admin", "gestionar"), "todos");
  for (const rol of ["director", "staff_global", "maestro_ministerio", "obrero", "admin_iglesia", "maestro_iglesia", "miembro", "usuario", null]) {
    assert.equal(alcanceDe(rol, "gestionar"), "no", `${rol} no gestiona`);
  }
  // los maestros y líderes siguen solo viendo
  assert.equal(soloVer("director"), true);
  assert.equal(soloVer("admin"), false);
});
