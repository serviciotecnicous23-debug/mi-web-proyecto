// Pruebas del catálogo del carro (server/carro-catalogo.ts): npx tsx --test server/carro.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { ESPECIALIDADES, NIVELES, leccionPublica } from "@shared/academia";
import { DEFAULT_AZURACAST_LIGHT_STREAM_URL, DEFAULT_AZURACAST_STREAM_URL } from "@shared/radio";
import { narracionDe } from "./academia-narracion";
import { absoluta, carpetaAcademia, carpetaPredicas, catalogoDelCarro, radioDelCarro, type NodoCarro, type PermisoAcademia } from "./carro-catalogo";

const SITIO = "https://ministerioavivandoelfuego.com";
const visitante: PermisoAcademia = { abierta: true, conSesion: false, inscrito: false, todas: false, materias: new Set() };
const docente: PermisoAcademia = { abierta: true, conSesion: true, inscrito: true, todas: true, materias: new Set() };

const lecciones = (carpeta: NodoCarro) => (carpeta.hijos ?? []).flatMap((materia) => materia.hijos ?? []);
const idLeccion = (nodo: NodoCarro) => nodo.id.replace(/^leccion:/, "");
const todosLosNodos = (nodos: NodoCarro[]): NodoCarro[] => nodos.flatMap((n) => [n, ...todosLosNodos(n.hijos ?? [])]);

/** Las lecciones con narración válida hoy (las de la página «Escuchar la lección»). */
const narradas = [...NIVELES.flatMap((n) => n.materias), ...ESPECIALIDADES.flatMap((e) => e.materias)]
  .filter((m) => m.disponible)
  .flatMap((m) => m.lecciones.map((l) => l.id))
  .filter((id) => narracionDe(id));

test("la radio: el AzuraCast propio con el servidor antiguo de respaldo, en sus dos calidades", () => {
  const radio = radioDelCarro({});
  assert.equal(radio.normal[0], DEFAULT_AZURACAST_STREAM_URL);
  assert.equal(radio.normal[1], "https://40.160.2.176.sslip.io/listen/avivando_el_fuego/radio.mp3");
  assert.equal(radio.ligero[0], DEFAULT_AZURACAST_LIGHT_STREAM_URL);
  assert.deepEqual(radio.metadatos, [
    "https://radio.ministerioavivandoelfuego.com/api/nowplaying/avivando_el_fuego",
    "https://40.160.2.176.sslip.io/api/nowplaying/avivando_el_fuego",
  ]);
});

test("la radio obedece las variables de Render, como /api/radio/station", () => {
  const antigua = radioDelCarro({ RADIO_STREAM_URL: "https://40.160.2.176.sslip.io/listen/avivando_el_fuego/radio.mp3" });
  assert.equal(antigua.normal[0], "https://40.160.2.176.sslip.io/listen/avivando_el_fuego/radio.mp3");
  assert.equal(antigua.normal[1], DEFAULT_AZURACAST_STREAM_URL);
  const otra = radioDelCarro({ RADIO_STREAM_URL: "https://otra.example/directo" });
  assert.deepEqual(otra, { normal: ["https://otra.example/directo"], ligero: [], metadatos: [] });
  // Sin cifrar no sirve en el teléfono: se queda la propia.
  assert.equal(radioDelCarro({ RADIO_STREAM_URL: "http://inseguro.example/directo" }).normal[0], DEFAULT_AZURACAST_STREAM_URL);
});

test("absoluta: solo https; las rutas del sitio se completan", () => {
  assert.equal(absoluta("/voz/academia/x.m4a", SITIO), `${SITIO}/voz/academia/x.m4a`);
  assert.equal(absoluta("https://cdn.example/x.m4a", SITIO), "https://cdn.example/x.m4a");
  assert.equal(absoluta("http://inseguro.example/x.m4a", SITIO), null);
  assert.equal(absoluta("//otro.example/x.m4a", SITIO), null);
  assert.equal(absoluta("", SITIO), null);
  assert.equal(absoluta(null, SITIO), null);
});

test("hay lecciones narradas para probar", () => {
  assert.ok(narradas.length >= 30, `solo ${narradas.length}`);
});

test("sin cuenta: solo las lecciones públicas, y cada una con su audio", () => {
  const academia = carpetaAcademia(visitante, SITIO, narracionDe);
  const ids = lecciones(academia).map(idLeccion);
  assert.ok(ids.length > 0);
  for (const id of ids) assert.ok(leccionPublica(id), `${id} no es pública`);
  for (const l of lecciones(academia)) assert.ok(l.audio?.urls[0]?.startsWith(`${SITIO}/voz/academia/`), l.audio?.urls[0]);
  assert.equal(academia.vacio, "Entra con tu cuenta en la app para escuchar tus lecciones.");
});

test("inscrito en una materia: todas sus lecciones narradas, en orden", () => {
  const materia = NIVELES[0].materias.find((m) => m.disponible && m.lecciones.filter((l) => narracionDe(l.id)).length >= 2);
  assert.ok(materia, "una materia del Nivel 1 con al menos dos lecciones narradas");
  const alumno: PermisoAcademia = { abierta: true, conSesion: true, inscrito: true, todas: false, materias: new Set([materia.id]) };
  const academia = carpetaAcademia(alumno, SITIO, narracionDe);
  const suya = academia.hijos?.find((m) => m.id === `materia:${materia.id}`);
  assert.ok(suya);
  const esperadas = materia.lecciones.filter((l) => narracionDe(l.id)).map((l) => `leccion:${l.id}`);
  assert.deepEqual(suya.hijos?.map((l) => l.id), esperadas);
  assert.match(suya.subtitulo ?? "", /^\d+ lecciones · \d+ min$/);
  assert.match(suya.hijos?.[0].titulo ?? "", /^1\. /);
  // Las demás materias del Nivel 1, solo con su lección pública.
  for (const otra of academia.hijos ?? []) {
    if (otra.id === `materia:${materia.id}`) continue;
    for (const l of otra.hijos ?? []) assert.ok(leccionPublica(idLeccion(l)));
  }
});

test("la Dirección y los profesores: todas las narradas", () => {
  assert.equal(lecciones(carpetaAcademia(docente, SITIO, narracionDe)).length, narradas.length);
});

test("academia cerrada: nada, con su aviso", () => {
  const cerrada = carpetaAcademia({ ...docente, abierta: false }, SITIO, narracionDe);
  assert.deepEqual(cerrada.hijos, []);
  assert.equal(cerrada.vacio, "La academia abre pronto.");
});

test("las prédicas: solo las que tienen audio seguro, con quién predica y la fecha", () => {
  const predicas = carpetaPredicas(
    [
      { id: 1, title: "El fuego del altar", preacherName: "Pastor Luis", sermonDate: "2026-11-02T18:00:00Z", seriesName: "Avivamiento", audioUrl: "/uploads/predica-1.mp3", imageUrl: "/uploads/p1.jpg" },
      { id: 2, title: "Sin audio", audioUrl: null },
      { id: 3, title: "Inseguro", audioUrl: "http://otro.example/p.mp3" },
      { id: 4, title: "Externa", audioUrl: "https://cdn.example/p.mp3" },
    ],
    SITIO,
  );
  assert.deepEqual(predicas.hijos?.map((p) => p.id), ["predica:1", "predica:4"]);
  const primera = predicas.hijos![0];
  assert.equal(primera.audio?.urls[0], `${SITIO}/uploads/predica-1.mp3`);
  assert.equal(primera.imagen, `${SITIO}/uploads/p1.jpg`);
  assert.equal(primera.audio?.album, "Avivamiento");
  assert.match(primera.subtitulo ?? "", /^Pastor Luis · 2 nov\.? 2026$/);
  assert.equal(predicas.hijos![1].audio?.artista, "Ministerio Avivando el Fuego");
  assert.equal(carpetaPredicas([], SITIO).vacio, "Todavía no hay prédicas con audio.");
});

test("el catálogo completo: tres pestañas, ids sin repetir y todo por https", () => {
  const catalogo = catalogoDelCarro({ sitio: SITIO, radio: radioDelCarro({}), academia: docente, predicas: [], narracion: narracionDe });
  assert.equal(catalogo.version, 1);
  assert.deepEqual(catalogo.raiz.map((n) => [n.id, n.icono]), [["radio", "radio"], ["academia", "academia"], ["predicas", "predicas"]]);
  const nodos = todosLosNodos(catalogo.raiz);
  assert.equal(new Set(nodos.map((n) => n.id)).size, nodos.length);
  for (const n of nodos) {
    for (const url of [...(n.audio?.urls ?? []), ...(n.audio?.metadatos ?? []), ...(n.imagen ? [n.imagen] : [])]) {
      assert.ok(url.startsWith("https://"), `${n.id}: ${url}`);
    }
    // Cada elemento suena o es una carpeta (como lo pide el complemento).
    assert.ok(!!n.audio !== !!n.hijos, n.id);
  }
  // CarPlay y Android Auto no muestran más de 5 niveles.
  const profundidad = (ns: NodoCarro[]): number => (ns.length ? 1 + Math.max(...ns.map((n) => profundidad(n.hijos ?? []))) : 0);
  assert.ok(profundidad(catalogo.raiz) <= 5);
});
