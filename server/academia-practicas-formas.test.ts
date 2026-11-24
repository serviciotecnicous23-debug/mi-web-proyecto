// Las formas de jugar (shared/practicas.ts, `FORMATOS`): cada actividad del contenido, en cada forma en que se puede
// jugar y con varias semillas, se responde entera bien (vale 1) y entera mal (vale menos); lo que ve el alumno no
// delata la respuesta y cada forma trae su consigna. Así una materia nueva queda probada en todas sus formas sola.
import { test } from "node:test";
import assert from "node:assert/strict";
import { contestar, escritoIgual, formatosPosibles, nuevoEstado, preguntaDe, vistaDe, type EstadoItem } from "./academia-practicas-calificar";
import { TODAS_LAS_PRACTICAS } from "./academia/practicas/index";
import type { Actividad } from "./academia/practicas/tipos";
import { FORMATOS, FORMATOS_SOLO_PARA_APRENDER, type Formato, type RespuestaPractica } from "@shared/practicas";

const huecos = (texto: string) => [...texto.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
const normal = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** La respuesta buena (o una mala) del paso en que va, con lo que sabe el servidor. */
function respuesta(a: Actividad, e: EstadoItem, bien: boolean): RespuestaPractica | null {
  const v: any = a.versiones[e.version];
  const r: any = e.rondas?.[e.paso];
  const otra = (k: number, n: number) => (bien ? k : (k + 1) % n);
  switch (e.formato as Formato) {
    case "relampago":
      return { pieza: "tarjetas", opcion: otra(r.opciones.indexOf(r.i), r.opciones.length) };
    case "banco":
    case "elige":
    case "escribe":
      return { pieza: "completa", huecos: bien ? huecos(v.texto) : huecos(v.texto).map(() => "zzzz") };
    case "parejas": {
      const pares = v.pares.map((_: unknown, i: number) => e.orden.derecha.indexOf(i));
      return { pieza: "relaciona", pares: bien ? pares : [...pares.slice(1), pares[0]] };
    }
    case "elige-pareja":
      return { pieza: "relaciona", opcion: otra(r.opciones.indexOf(r.i), r.opciones.length) };
    case "recuadros":
      return { pieza: "clasifica", grupos: e.orden.frases.map((i) => (bien ? v.frases[i].grupo : (v.frases[i].grupo + 1) % v.grupos.length)) };
    case "desliza":
      return { pieza: "clasifica", grupo: otra(v.frases[e.orden.frases[e.paso]].grupo, 2) };
    case "intruso":
      return { pieza: "clasifica", frase: otra(r.frases.indexOf(r.intruso), r.frases.length) };
    case "lista":
      if (a.pieza !== "ordena") return null;
      {
        const orden = v.pasos.map((_: unknown, i: number) => e.orden.pasos.indexOf(i));
        return { pieza: "ordena", orden: bien ? orden : [...orden].reverse() };
      }
    case "escalones": {
      const opciones = e.orden.pasos.filter((k) => k >= e.paso);
      return { pieza: "ordena", opcion: otra(opciones.indexOf(e.paso), opciones.length) };
    }
    case "donde-va":
      return { pieza: "ordena", opcion: otra(r.hueco, v.pasos.length) };
    case "verdad-o-error":
      return { pieza: "verdad", verdad: bien ? v.afirmaciones[e.paso].verdad : !v.afirmaciones[e.paso].verdad };
    case "cual-falsa":
      return { pieza: "verdad", frase: otra(r.correcta, r.items.length) };
    case "frases":
    case "detective":
      return { pieza: "error", frase: otra(e.orden.frases.indexOf(v.malo), v.frases.length) };
    case "opciones":
    case "chat":
      return { pieza: "situacion", opcion: otra(e.orden.opciones.indexOf(v.opciones.findIndex((o: any) => o.bien)), v.opciones.length) };
    default:
      return null;
  }
}

/** Lo que ve el alumno no dice cuál es la buena. */
function revisarVista(a: Actividad, e: EstadoItem, donde: string) {
  const vista = vistaDe(a, e);
  assert.equal(vista.formato, e.formato, donde);
  assert.ok(vista.consigna && vista.consigna.trim().length > 5, `${donde}: sin consigna`);
  const json = JSON.stringify(vista);
  assert.ok(!/"(bien|verdad|malo|correcta|correctas|intruso|explica|apoyo|errores|clave|reverso)":/.test(json), `${donde}: la vista delata la respuesta: ${json}`);
  assert.ok(!/\[\[[^\]"]+\]\]/.test(json), `${donde}: se ven los huecos`);
  const v: any = a.versiones[e.version];
  const distintas = (l: string[], que: string) => assert.equal(new Set(l.map(normal)).size, l.length, `${donde}: ${que} repetidas: ${l.join(" | ")}`);
  switch (vista.formato) {
    case "relampago":
      assert.equal(vista.opciones.length, 3, donde);
      distintas(vista.opciones, "respuestas");
      break;
    case "elige":
      for (const par of vista.opciones) {
        assert.equal(par.length, 2, donde);
        distintas(par, "palabras");
      }
      break;
    case "escribe":
      assert.deepEqual(vista.letras, huecos(v.texto).map((h) => h.length), donde);
      assert.deepEqual(vista.iniciales, huecos(v.texto).map((h) => h.charAt(0)), donde);
      break;
    case "elige-pareja":
      assert.equal(vista.opciones.length, 3, donde);
      distintas(vista.opciones, "parejas");
      break;
    case "intruso":
      assert.equal(vista.frases.length, 4, donde);
      distintas(vista.frases, "frases");
      break;
    case "escalones":
      distintas(vista.opciones, "pasos");
      assert.equal(vista.colocados.length, vista.paso, donde);
      break;
    case "donde-va":
      assert.equal(vista.lista.length, v.pasos.length - 1, donde);
      assert.ok(!vista.lista.includes(vista.suelto), `${donde}: el paso suelto sigue en la lista`);
      break;
    case "cual-falsa":
      assert.equal(vista.afirmaciones.length, 3, donde);
      distintas(vista.afirmaciones, "afirmaciones");
      break;
    default:
      break;
  }
}

/** Juega la actividad entera: devuelve el puntaje final (de 0 a 1). */
function jugar(a: Actividad, e0: EstadoItem, bien: boolean, donde: string): number {
  let e = e0;
  for (let paso = 0; paso < 30; paso++) {
    revisarVista(a, e, `${donde} paso ${paso + 1}`);
    const r = respuesta(a, e, bien);
    assert.ok(r, `${donde}: sin respuesta para la forma ${e.formato}`);
    const { devolucion, estado } = contestar(a, e, r!);
    if (bien) assert.equal(devolucion.puntaje, 1, `${donde} paso ${paso + 1}: la buena no vale 1`);
    if (devolucion.terminada) return devolucion.puntajeActividad ?? -1;
    assert.ok(devolucion.siguiente, `${donde}: sin paso siguiente`);
    e = estado;
  }
  throw new Error(`${donde}: no termina`);
}

for (const p of TODAS_LAS_PRACTICAS) {
  test(`${p.materia}: cada actividad se juega bien en todas sus formas`, () => {
    let jugadas = 0;
    for (const [leccion, actividades] of Object.entries(p.lecciones)) {
      for (const a of actividades) {
        if (a.pieza === "explica" || FORMATOS[a.pieza].length < 2) continue;
        a.versiones.forEach((_, version) => {
          const formas = formatosPosibles(a, version, "guiada");
          assert.ok(formas.length >= 1, `${leccion}/${a.id} v${version + 1}: ninguna forma`);
          for (const f of formatosPosibles(a, version, "cuenta")) assert.ok(!FORMATOS_SOLO_PARA_APRENDER.includes(f), `${leccion}/${a.id}: ${f} en la que cuenta`);
          for (const f of formas) {
            for (const semilla of [7, 1234, 98765]) {
              const donde = `${leccion}/${a.id} v${version + 1} ${f} (semilla ${semilla})`;
              const e = nuevoEstado(leccion, a, version, semilla, f);
              assert.equal(e.formato, f, donde);
              assert.equal(jugar(a, e, true, donde), 1, `${donde}: todo bien no vale 1`);
              assert.ok(jugar(a, e, false, donde) < 1, `${donde}: todo mal vale 1`);
              jugadas++;
            }
          }
        });
      }
    }
    assert.ok(jugadas > 0);
  });
}

test("las formas cambian con la semilla: no siempre la misma ronda", () => {
  const p = TODAS_LAS_PRACTICAS.find((x) => x.materia === "n1-salvacion")!;
  const a = p.lecciones["n1-salvacion-1"].find((x) => x.pieza === "tarjetas")!;
  const preguntas = new Set<string>();
  for (let semilla = 1; semilla < 30; semilla++) {
    const vista = vistaDe(a, nuevoEstado("n1-salvacion-1", a, 0, semilla, "relampago"));
    if (vista.formato === "relampago") preguntas.add(vista.pregunta);
  }
  assert.ok(preguntas.size > 1, "la primera pregunta del relámpago cambia");
});

test("la pregunta de la consigna y lo escrito a mano", () => {
  assert.equal(preguntaDe("¿Es ayuno bíblico o no lo es? Lleva cada frase a su grupo."), "¿Es ayuno bíblico o no lo es?");
  assert.equal(preguntaDe("Jesús corrigió dos errores. ¿Cuál es cada ejemplo? Lleva cada frase a su recuadro."), "Jesús corrigió dos errores. ¿Cuál es cada ejemplo?");
  assert.equal(preguntaDe("Une cada idea con lo que le corresponde."), null);
  assert.equal(preguntaDe(undefined), null);
  assert.equal(escritoIgual("padre", "Padre"), true);
  assert.equal(escritoIgual("Espiritu", "Espíritu"), true);
  assert.equal(escritoIgual("regalos", "regalo"), true, "una letra de más en una palabra larga");
  assert.equal(escritoIgual("Dios", "Padre"), false);
  assert.equal(escritoIgual("de", "fe"), false, "en las cortas no se perdona nada");
  assert.equal(escritoIgual("", "fe"), false);
});

test("un intento de antes de las formas (sin forma ni rondas) se sigue jugando", () => {
  const p = TODAS_LAS_PRACTICAS.find((x) => x.materia === "n1-salvacion")!;
  for (const a of p.lecciones["n1-salvacion-1"]) {
    if (a.pieza === "explica") continue;
    const nuevo = nuevoEstado("n1-salvacion-1", a, 0, 55);
    const { formato: _f, rondas: _r, total: _t, ...viejo } = nuevo;
    const e = viejo as EstadoItem;
    const vista = vistaDe(a, e);
    assert.ok(vista.consigna, `${a.id}: sin vista`);
    if (a.pieza === "tarjetas") {
      const r = contestar(a, e, { pieza: "tarjetas", opcion: 0 });
      assert.equal(r.devolucion.terminada, true, "el relámpago de antes termina en un paso");
    }
  }
});
