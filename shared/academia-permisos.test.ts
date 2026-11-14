// Pruebas de la matriz de roles y permisos de la academia: npx tsx --test shared/academia-permisos.test.ts
// Dos áreas: la academia (cada alumno, lo suyo) y su administración, que maneja SOLO la Administración; los maestros,
// los líderes y las iglesias aliadas solo ven.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ROLES } from "./roles";
import { CAPACIDADES, ROLES_ACADEMIA, alcanceDe, rolAcademia, soloVer, textoCelda } from "./academia-permisos";
import { ROLES_REVISION, ROLES_VISTA_PREVIA, puedeRevisar } from "./academia";

/** Lo que cambia algo: notas, documentos, contenido, preguntas, mentores y la apertura. */
const ADMINISTRAR = ["revisar", "documentos", "contenido", "aprobar", "banco", "mentores", "abrir"] as const;
const SOLO_VEN = ["director", "staff_global", "maestro_ministerio", "obrero", "admin_iglesia", "maestro_iglesia"];

test("cada rol de la web cae en un solo rol de la academia", () => {
  for (const role of Object.keys(ROLES)) {
    const en = ROLES_ACADEMIA.filter((r) => r.roles.includes(role));
    assert.ok(en.length <= 1, `${role} está en más de un rol de la academia`);
  }
  assert.equal(rolAcademia("admin"), "direccion");
  for (const role of ["director", "staff_global", "maestro_ministerio", "obrero"]) assert.equal(rolAcademia(role), "equipo", role);
  assert.equal(rolAcademia("admin_iglesia"), "iglesia");
  assert.equal(rolAcademia("maestro_iglesia"), "iglesia");
  assert.equal(rolAcademia("miembro"), "alumno");
  assert.equal(rolAcademia(null), "alumno");
  assert.equal(rolAcademia("inventado"), "alumno");
});

test("los roles de la academia usan roles que existen en la web", () => {
  for (const r of ROLES_ACADEMIA) for (const role of r.roles) assert.ok(role in ROLES, `${role} no existe en shared/roles.ts`);
});

test("cada capacidad dice su alcance para los cuatro roles", () => {
  const ids = CAPACIDADES.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length, "capacidades repetidas");
  for (const c of CAPACIDADES) {
    assert.deepEqual(Object.keys(c.alcance).sort(), ["alumno", "direccion", "equipo", "iglesia"], c.id);
    assert.ok(c.texto && c.detalle, c.id);
  }
});

test("la Administración (solo el administrador) puede todo sobre todos", () => {
  for (const c of CAPACIDADES) assert.equal(alcanceDe("admin", c.id), "todos", c.id);
  assert.deepEqual(ROLES_ACADEMIA.find((r) => r.id === "direccion")?.roles, ["admin"]);
});

test("nadie más administra: ni el director, ni los maestros, ni los pastores, ni el alumno", () => {
  for (const role of [...SOLO_VEN, "miembro", null]) {
    for (const c of ADMINISTRAR) assert.equal(alcanceDe(role, c), "no", `${role} ${c}`);
  }
});

test("los maestros y líderes solo ven el avance y las notas, sin contacto ni reportes", () => {
  for (const role of ["director", "staff_global", "maestro_ministerio", "obrero"]) {
    for (const c of ["panel", "avance", "notas"] as const) assert.equal(alcanceDe(role, c), "todos", `${role} ${c}`);
    for (const c of ["contacto", "exportar", "avisos"] as const) assert.equal(alcanceDe(role, c), "no", `${role} ${c}`);
    assert.ok(soloVer(role), role);
  }
});

test("las iglesias aliadas ven solo a los alumnos de su iglesia", () => {
  for (const role of ["admin_iglesia", "maestro_iglesia"]) {
    for (const c of ["panel", "avance", "notas", "contacto", "exportar", "avisos"] as const) assert.equal(alcanceDe(role, c), "iglesia", `${role} ${c}`);
    assert.ok(soloVer(role), role);
  }
});

test("el alumno solo ve lo suyo y no entra al panel", () => {
  assert.equal(alcanceDe("miembro", "panel"), "no");
  assert.equal(alcanceDe("miembro", "avance"), "propio");
  assert.equal(alcanceDe("miembro", "notas"), "propio");
  assert.equal(alcanceDe("miembro", "contacto"), "propio");
  assert.equal(alcanceDe("miembro", "exportar"), "no");
  assert.ok(!soloVer("miembro"));
  assert.ok(!soloVer("admin"));
});

test("la matriz coincide con quién ve la vista previa y quién revisa notas", () => {
  for (const role of ROLES_VISTA_PREVIA) assert.notEqual(alcanceDe(role, "panel"), "no", `${role} ve la vista previa: debe entrar al panel`);
  assert.deepEqual([...ROLES_REVISION], ["admin"]);
  for (const role of ROLES_REVISION) assert.equal(alcanceDe(role, "revisar"), "todos", `${role} revisa notas`);
  assert.ok(puedeRevisar("admin"));
  for (const role of SOLO_VEN) assert.ok(!puedeRevisar(role), role);
});

test("las celdas del panel dicen «solo ver» a quien solo ve", () => {
  assert.equal(textoCelda("direccion", "todos"), "Sí");
  assert.equal(textoCelda("equipo", "todos"), "Sí, solo ver");
  assert.equal(textoCelda("iglesia", "iglesia"), "Solo los de su iglesia");
  assert.equal(textoCelda("alumno", "propio"), "Solo lo suyo");
  assert.equal(textoCelda("equipo", "no"), "—");
});
