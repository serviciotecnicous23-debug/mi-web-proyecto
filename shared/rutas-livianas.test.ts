import { test } from "node:test";
import assert from "node:assert/strict";
import { api, buildUrl } from "./routes";
import { RUTAS, conParametros } from "./rutas-livianas";

test("las rutas livianas son las mismas que las de shared/routes.ts", () => {
  assert.equal(RUTAS.auth.me, api.auth.me.path);
  assert.equal(RUTAS.auth.login, api.auth.login.path);
  assert.equal(RUTAS.auth.register, api.auth.register.path);
  assert.equal(RUTAS.auth.logout, api.auth.logout.path);
  assert.equal(RUTAS.radio.station, api.radio.station.path);
  assert.equal(RUTAS.admin.listRadioLibrary, api.admin.listRadioLibrary.path);
  assert.equal(RUTAS.admin.uploadRadioTrack, api.admin.uploadRadioTrack.path);
  assert.equal(RUTAS.admin.deleteRadioTrack, api.admin.deleteRadioTrack.path);
  assert.equal(RUTAS.events.list, api.events.list.path);
  assert.equal(RUTAS.enrollments.list, api.enrollments.list.path);
});

test("conParametros arma la ruta igual que buildUrl", () => {
  const p = { category: "jingles", fileName: "a b.mp3" };
  assert.equal(conParametros(RUTAS.admin.deleteRadioTrack, p), buildUrl(api.admin.deleteRadioTrack.path, p));
  assert.equal(conParametros(RUTAS.admin.uploadRadioTrack, { category: "musica" }), buildUrl(api.admin.uploadRadioTrack.path, { category: "musica" }));
});
