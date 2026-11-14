// Pruebas de la matriz de roles y permisos de la academia: npx tsx --test shared/academia-permisos.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { ROLES } from "./roles";
import { CAPACIDADES, ROLES_ACADEMIA, alcanceDe, rolAcademia } from "./academia-permisos";
import { ROLES_REVISION, ROLES_VISTA_PREVIA } from "./academia";

test("cada rol de la web cae en un solo rol de la academia", () => {
  for (const role of Object.keys(ROLES)) {
    const en = ROLES_ACADEMIA.filter((r) => r.roles.includes(role));
    assert.ok(en.length <= 1, `${role} está en más de un rol de la academia`);
  }
  assert.equal(rolAcademia("admin"), "direccion");
  assert.equal(rolAcademia("director"), "direccion");
  assert.equal(rolAcademia("staff_global"), "direccion");
  assert.equal(rolAcademia("maestro_ministerio"), "profesor");
  assert.equal(rolAcademia("obrero"), "profesor");
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
    assert.deepEqual(Object.keys(c.alcance).sort(), ["alumno", "direccion", "iglesia", "profesor"], c.id);
    assert.ok(c.texto && c.detalle, c.id);
  }
});

test("la Dirección académica puede todo sobre todos", () => {
  for (const c of CAPACIDADES) assert.equal(alcanceDe("admin", c.id), "todos", c.id);
});

test("los profesores ven el avance y las notas, pero no el contacto ni los reportes", () => {
  assert.equal(alcanceDe("maestro_ministerio", "panel"), "todos");
  assert.equal(alcanceDe("maestro_ministerio", "avance"), "todos");
  assert.equal(alcanceDe("maestro_ministerio", "notas"), "todos");
  assert.equal(alcanceDe("maestro_ministerio", "revisar"), "todos");
  assert.equal(alcanceDe("maestro_ministerio", "contacto"), "no");
  assert.equal(alcanceDe("maestro_ministerio", "exportar"), "no");
  assert.equal(alcanceDe("maestro_ministerio", "avisos"), "no");
  assert.equal(alcanceDe("maestro_ministerio", "documentos"), "no");
});

test("las iglesias aliadas ven solo a los alumnos de su iglesia, y no revisan notas", () => {
  for (const c of ["panel", "avance", "notas", "contacto", "exportar", "avisos"] as const) assert.equal(alcanceDe("admin_iglesia", c), "iglesia", c);
  assert.equal(alcanceDe("maestro_iglesia", "revisar"), "no");
  assert.equal(alcanceDe("maestro_iglesia", "documentos"), "no");
});

test("el alumno solo ve lo suyo y no entra al panel", () => {
  assert.equal(alcanceDe("miembro", "panel"), "no");
  assert.equal(alcanceDe("miembro", "avance"), "propio");
  assert.equal(alcanceDe("miembro", "contacto"), "propio");
  assert.equal(alcanceDe("miembro", "exportar"), "no");
});

test("el contenido: lo revisan la Dirección y los profesores; lo aprueba y retira preguntas solo la Dirección", () => {
  for (const role of ["admin", "director", "staff_global", "maestro_ministerio", "obrero"]) assert.equal(alcanceDe(role, "contenido"), "todos", role);
  for (const role of ["admin_iglesia", "maestro_iglesia", "miembro"]) assert.equal(alcanceDe(role, "contenido"), "no", role);
  for (const c of ["aprobar", "banco"] as const) {
    for (const role of ["admin", "director", "staff_global"]) assert.equal(alcanceDe(role, c), "todos", `${role} ${c}`);
    for (const role of ["maestro_ministerio", "obrero", "admin_iglesia", "maestro_iglesia", "miembro"]) assert.equal(alcanceDe(role, c), "no", `${role} ${c}`);
  }
});

test("abrir la academia: solo la Administración y el Director del Ministerio", () => {
  assert.equal(alcanceDe("admin", "abrir"), "todos");
  assert.equal(alcanceDe("director", "abrir"), "todos");
  assert.equal(alcanceDe("staff_global", "abrir"), "no");
  assert.equal(alcanceDe("maestro_ministerio", "abrir"), "no");
});

test("la matriz coincide con quién ve la vista previa y quién revisa notas", () => {
  for (const role of ROLES_VISTA_PREVIA) assert.notEqual(alcanceDe(role, "panel"), "no", `${role} ve la vista previa: debe entrar al panel`);
  for (const role of ROLES_REVISION) assert.equal(alcanceDe(role, "revisar"), "todos", `${role} revisa notas`);
});
