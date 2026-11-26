// Las formas de jugar (shared/practicas.ts, `FORMATOS`): cada actividad del contenido, en cada forma en que se puede
// jugar y con varias semillas, se responde entera bien (vale 1) y entera mal (vale menos); lo que ve el alumno no
// delata la respuesta y cada forma trae su consigna. Así una materia nueva queda probada en todas sus formas sola.
import { test } from "node:test";
import assert from "node:assert/strict";
import { contestar, crucigramaDe, enLetras, escritoIgual, formatoDificil, formatosPosibles, listaDe, notaAdivina, notaMemoria, nuevoEstado, ordenDeLista, preguntaDe, trozosDe, vistaDe, type EstadoItem } from "./academia-practicas-calificar";
import { TODAS_LAS_PRACTICAS } from "./academia/practicas/index";
import type { Actividad } from "./academia/practicas/tipos";
import { FORMATOS, FORMATOS_SOLO_PARA_APRENDER, extraDeLecciones, type Formato, type RespuestaPractica } from "@shared/practicas";

const huecos = (texto: string) => [...texto.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
const conPalabras = (texto: string) => texto.replace(/\[\[([^\]]+)\]\]/g, "$1").replace(/\s+/g, " ").trim();

/** Si una palabra está en la sopa de letras, en línea recta y en cualquier sentido. */
function enSopa(filas: string[], w: string): boolean {
  const N = filas.length;
  const sentidos = [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1]];
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++)
      for (const [dr, dc] of sentidos) {
        let ok = true;
        for (let k = 0; k < w.length && ok; k++) if (filas[r + dr * k]?.[c + dc * k] !== w[k]) ok = false;
        if (ok) return true;
      }
  return false;
}
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
    case "lista": {
      if (a.pieza !== "ordena" && a.pieza !== "linea") return null;
      const orden = listaDe(a, v).textos.map((_: unknown, i: number) => ordenDeLista(a, e).indexOf(i));
      return { pieza: a.pieza, orden: bien ? orden : [...orden].reverse() } as RespuestaPractica;
    }
    case "escalones": {
      const opciones = ordenDeLista(a, e).filter((k) => k >= e.paso);
      return { pieza: a.pieza, opcion: otra(opciones.indexOf(e.paso), opciones.length) } as RespuestaPractica;
    }
    case "donde-va":
      return { pieza: a.pieza, opcion: otra(r.hueco, listaDe(a, v).textos.length) } as RespuestaPractica;
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
    case "anagrama":
      return { pieza: "completa", huecos: [bien ? huecos(v.texto)[e.paso] : "zzzz"] };
    case "sopa": {
      const puestas = (e.rondas![0].colocadas as { trazo: number[]; respuesta: boolean }[]).filter((x) => x.respuesta).map((x) => x.trazo);
      // (la primera se marca al revés: una palabra vale de una punta a la otra o al contrario)
      return { pieza: "completa", trazos: bien ? puestas.map((t, k) => (k === 0 ? [t[2], t[3], t[0], t[1]] : t)) : [] };
    }
    case "crucigrama":
      return { pieza: "completa", huecos: (e.rondas![0].palabras as { i: number }[]).map((x) => (bien ? huecos(v.texto)[x.i].toLowerCase() : "zzzz")) };
    case "arma": {
      const orden = e.rondas![0].orden as number[];
      const correcto = orden.map((_, i) => orden.indexOf(i));
      return { pieza: "completa", orden: bien ? correcto : [...correcto].reverse() };
    }
    case "memoria": {
      // (mal: se equivoca más de lo que se perdona y después las encuentra; bien: siempre la pareja)
      const cartas = e.rondas![0].cartas as { par: number; lado: number }[];
      const quedan = cartas.map((_, i) => i).filter((i) => !(e.orden.descubiertas ?? []).includes(i));
      const i = quedan[0];
      const pareja = quedan.find((k) => k !== i && cartas[k].par === cartas[i].par)!;
      const otraCarta = quedan.find((k) => k !== i && cartas[k].par !== cartas[i].par);
      const fallar = !bien && (e.orden.fallos?.[0] ?? 0) <= Math.round(v.pares.length * 1.5) && otraCarta != null;
      return { pieza: "relaciona", cartas: [i, fallar ? otraCarta! : pareja] };
    }
    case "atrapa": {
      const r0 = e.rondas![0];
      const del = (r0.frases as number[]).map((k, d) => (v.frases[k].grupo === r0.grupo ? d : -1)).filter((d) => d >= 0);
      return { pieza: "clasifica", atrapadas: bien ? del : (r0.frases as number[]).map((_, d) => d).filter((d) => !del.includes(d)) };
    }
    case "adivina": {
      // (bien: la próxima letra que falta; mal: una que no está, hasta que se apague la lámpara)
      const palabra = enLetras(huecos(v.texto)[e.rondas![0].hueco].trim());
      const dichas = new Set((e.orden.dichas ?? []).map((x) => String.fromCodePoint(x)));
      const faltan = [...new Set([...palabra])].filter((x) => !dichas.has(x));
      const ajenas = [..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"].filter((x) => !palabra.includes(x) && !dichas.has(x));
      return { pieza: "completa", letra: (bien ? faltan[0] : ajenas[0]).toLowerCase() };
    }
    case "globos": {
      const items = e.rondas![0].items as { v: number; i: number }[];
      const verdad = items.map((x) => (a.versiones[x.v] as any).afirmaciones[x.i].verdad as boolean);
      return { pieza: "verdad", reventadas: items.map((_, d) => d).filter((d) => verdad[d] === bien) };
    }
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
      assert.equal(vista.lista.length, listaDe(a, v).textos.length - 1, donde);
      assert.ok(!vista.lista.includes(vista.suelto), `${donde}: el paso suelto sigue en la lista`);
      break;
    case "cual-falsa":
      assert.equal(vista.afirmaciones.length, 3, donde);
      distintas(vista.afirmaciones, "afirmaciones");
      break;
    case "anagrama": {
      const h = huecos(v.texto)[vista.hueco].trim().toLocaleUpperCase("es");
      assert.deepEqual([...vista.letras].sort(), [...h].sort(), `${donde}: las letras no son las de la palabra`);
      assert.notEqual(vista.letras.join(""), h, `${donde}: las letras van en su orden`);
      assert.deepEqual(vista.hechas, huecos(v.texto).slice(0, vista.hueco), donde);
      break;
    }
    case "sopa":
      assert.equal(vista.filas.length, 9, donde);
      for (const fila of vista.filas) assert.match(fila, /^[A-ZÑ]{9}$/, donde);
      assert.equal(vista.buscar, huecos(v.texto).length, donde);
      for (const h of huecos(v.texto)) assert.ok(enSopa(vista.filas, enLetras(h)), `${donde}: ${h} no está en la sopa`);
      break;
    case "crucigrama": {
      const hs = huecos(v.texto);
      assert.deepEqual(vista.palabras.map((x) => x.hueco).sort(), hs.map((_, i) => i), `${donde}: faltan palabras`);
      assert.ok(vista.filas <= 12 && vista.columnas <= 12, `${donde}: no cabe en el teléfono`);
      const casillas = new Map<string, { letra: string; sentidos: string }>();
      for (const x of vista.palabras) {
        const w = enLetras(hs[x.hueco]);
        assert.equal(x.largo, w.length, donde);
        for (let j = 0; j < w.length; j++) {
          const f = x.fila + (x.dir === "v" ? j : 0);
          const c = x.col + (x.dir === "h" ? j : 0);
          assert.ok(f >= 0 && f < vista.filas && c >= 0 && c < vista.columnas, `${donde}: se sale del crucigrama`);
          const ya = casillas.get(`${f},${c}`);
          assert.ok(!ya || (ya.letra === w[j] && !ya.sentidos.includes(x.dir)), `${donde}: el cruce no coincide`);
          casillas.set(`${f},${c}`, { letra: w[j], sentidos: (ya?.sentidos ?? "") + x.dir });
        }
      }
      break;
    }
    case "arma": {
      const palabras = (s: string) => s.split(" ").sort();
      const correcta = (e.rondas![0].trozos as string[]).join(" ");
      assert.ok(vista.trozos.length >= 3 && vista.trozos.length <= 5, `${donde}: ${vista.trozos.length} trozos`);
      assert.ok(conPalabras(v.texto).includes(correcta), `${donde}: la oración no es del texto`);
      assert.ok(!/[.!?…]\s+[A-ZÁÉÍÓÚÑ]/.test(correcta.replace(/\b[a-zA-Z]\.\s/g, "")), `${donde}: arma más de una oración: ${correcta}`);
      assert.deepEqual(palabras(vista.trozos.join(" ")), palabras(correcta), `${donde}: los trozos no son la oración`);
      assert.notEqual(vista.trozos.join(" "), correcta, `${donde}: los trozos van en su orden`);
      assert.ok(!/[«»]/.test(v.texto), `${donde}: una cita no se arma`);
      break;
    }
    case "memoria":
      assert.equal(vista.cartas.length, v.pares.length * 2, donde);
      assert.deepEqual([...vista.cartas].sort(), (v.pares as string[][]).flat().sort(), donde);
      assert.equal(vista.pasos, v.pares.length, donde);
      assert.equal(vista.descubiertas.length, vista.paso * 2, donde);
      break;
    case "atrapa":
      assert.ok(v.grupos.includes(vista.grupo), donde);
      assert.deepEqual([...vista.frases].sort(), v.frases.map((f: any) => f.texto).sort(), donde);
      break;
    case "adivina": {
      const palabra = [...huecos(v.texto)[vista.hueco].trim()];
      assert.equal(vista.patron.length, palabra.length, donde);
      assert.ok(vista.patron.every((x, k) => x === null || x === palabra[k]), `${donde}: el patrón no es de la palabra`);
      assert.equal(vista.partes.filter((x) => typeof x !== "string").length, 1, `${donde}: se adivina una sola palabra`);
      assert.ok(vista.fallos < vista.gotas, donde);
      break;
    }
    case "globos": {
      const items = e.rondas![0].items as { v: number; i: number }[];
      const verdad = items.map((x) => (a.versiones[x.v] as any).afirmaciones[x.i].verdad as boolean);
      assert.ok(verdad.filter(Boolean).length >= 2 && verdad.filter((x) => !x).length >= 2, `${donde}: hacen falta 2 verdades y 2 errores`);
      distintas(vista.frases, "frases");
      break;
    }
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
    assert.ok(jugadas > 0 || Object.values(p.lecciones).every((l) => !l.length), "hay actividades y ninguna se jugó");
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

test("la línea del tiempo se juega en sus tres formas (lista, escalones y ¿dónde va?)", () => {
  const eventos = [
    { texto: "Dios llama a Abraham", fecha: "Hacia el 2000 a. C." },
    { texto: "Moisés saca al pueblo de Egipto", fecha: "Hacia el 1446 a. C." },
    { texto: "David reina en Jerusalén", fecha: "Hacia el 1000 a. C." },
    { texto: "El pueblo va al exilio en Babilonia", fecha: "586 a. C." },
    { texto: "El regreso a Jerusalén", fecha: "538 a. C." },
  ];
  const v = { consigna: "Ordena los hechos del primero al último.", eventos, explica: "Así avanza la historia.", apoyo: "una frase" };
  const a = { id: "z1", objetivo: 0, pieza: "linea", versiones: [v, { ...v, eventos: [...eventos].reverse().reverse() }] } as unknown as Actividad;
  const formas = formatosPosibles(a, 0, "guiada");
  assert.deepEqual(formas, ["lista", "escalones", "donde-va"]);
  for (const f of formas) {
    for (const semilla of [3, 77, 2024]) {
      const donde = `línea ${f} (semilla ${semilla})`;
      const e = nuevoEstado("prueba", a, 0, semilla, f);
      assert.equal(jugar(a, e, true, donde), 1, `${donde}: todo bien no vale 1`);
      assert.ok(jugar(a, e, false, donde) < 1, `${donde}: todo mal vale 1`);
    }
  }
  // al corregir ¿dónde va? o escalones, la explicación trae la fecha
  const e = nuevoEstado("prueba", a, 0, 5, "escalones");
  const r = contestar(a, e, respuesta(a, e, false)!);
  assert.match(r.devolucion.explica, /a\. C\./);
  assert.equal(vistaDe(a, e).pieza, "linea");
});

test("el reto de dominio usa la forma más difícil que se pueda, y se juega entero", () => {
  const p = TODAS_LAS_PRACTICAS.find((x) => x.materia === "n1-salvacion")!;
  for (const [leccion, actividades] of Object.entries(p.lecciones)) {
    for (const a of actividades) {
      if (a.pieza === "explica") continue;
      const f = formatoDificil(a, 0);
      assert.ok(formatosPosibles(a, 0, "reto").includes(f), `${leccion}/${a.id}: ${f}`);
      if (a.pieza === "completa") assert.equal(f, "escribe", "completar se escribe en el reto");
      if (a.pieza === "verdad") assert.equal(f, "cual-falsa");
      if (FORMATOS[a.pieza].length > 1) assert.equal(jugar(a, nuevoEstado(leccion, a, 0, 11, f), true, `${leccion}/${a.id} reto`), 1);
    }
  }
});

test("las dinámicas del catálogo: letras, crucigrama, trozos y memoria", () => {
  assert.equal(enLetras("Espíritu"), "ESPIRITU");
  assert.equal(enLetras("niño"), "NIÑO", "la ñ queda");
  assert.equal(enLetras("pingüino"), "PINGUINO");
  // el crucigrama: cada palabra cruza otra en una letra igual; sin letra común, no se arma
  const c = crucigramaDe(["gracia", "amor", "cruz"]);
  assert.ok(c, "gracia, amor y cruz se cruzan");
  assert.equal(c!.colocadas.length, 3);
  assert.equal(crucigramaDe(["luz", "pan"]), null, "sin letra común no se cruzan");
  assert.equal(crucigramaDe(["fe", "amor"]), null, "las de menos de 3 letras no van");
  // los trozos: en las comas y nunca después de «de», «que» o «y»
  const t = trozosDe("La gracia es el favor de Dios que no [[merecemos]], y nos salva por la fe.")!;
  assert.deepEqual(t, ["La gracia es el favor", "de Dios que no merecemos,", "y nos salva", "por la fe."]);
  assert.equal(trozosDe("Jesús dijo: «Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí»."), null, "un versículo no se arma");
  assert.equal(trozosDe("Muy corta la frase."), null);
  // con dos oraciones se arma una sola: la de la palabra clave (el orden de dos oraciones también podría ir al revés)
  assert.deepEqual(trozosDe("La gracia es el favor de Dios que no merecemos. La fe es la mano vacía que recibe el [[regalo]] de Dios.")?.join(" "), "La fe es la mano vacía que recibe el regalo de Dios.");
  assert.equal(trozosDe("Hacia el 2000 a. C. Dios llamó a [[Abraham]] para formar un pueblo nuevo.")?.join(" "), "Hacia el 2000 a. C. Dios llamó a Abraham para formar un pueblo nuevo.", "«a. C.» no corta la oración");
  // la memoria perdona los primeros errores (destapar también es recordar)
  assert.equal(notaMemoria(4, 0), 1);
  assert.equal(notaMemoria(4, 6), 1, "4 parejas: se perdonan 6");
  assert.ok(Math.abs(notaMemoria(4, 8) - 0.8) < 1e-9);
  assert.equal(notaMemoria(3, 50), 0.5, "nunca menos de la mitad");
});

test("la sopa, el crucigrama, la memoria y «¡Atrápalas!» califican a medias lo que está a medias", () => {
  const completa = { id: "z2", objetivo: 0, pieza: "completa", versiones: [{ texto: "La [[gracia]] y la [[verdad]] vinieron por [[Cristo]].", distractores: ["ley", "obras"], explica: "Así es.", apoyo: "una frase" }] } as unknown as Actividad;
  // la sopa: dos de tres palabras
  const es = nuevoEstado("prueba", completa, 0, 9, "sopa");
  assert.equal(es.formato, "sopa");
  const puestas = (es.rondas![0].colocadas as { trazo: number[]; respuesta: boolean }[]).filter((x) => x.respuesta).map((x) => x.trazo);
  const s = contestar(completa, es, { pieza: "completa", trazos: [puestas[0], puestas[1], [0, 0, 0, 0]] });
  assert.ok(Math.abs(s.devolucion.puntaje - 2 / 3) < 1e-9, "dos de tres");
  assert.equal(s.devolucion.correccion.pieza === "completa" && s.devolucion.correccion.formato === "sopa" && s.devolucion.correccion.faltan.length, 1);
  // la misma palabra dos veces cuenta una
  const s2 = contestar(completa, es, { pieza: "completa", trazos: [puestas[0], puestas[0], puestas[0]] });
  assert.ok(Math.abs(s2.devolucion.puntaje - 1 / 3) < 1e-9, "repetir una palabra no suma");
  // el crucigrama: sin tildes ni mayúsculas, y una mala
  const ec = nuevoEstado("prueba", completa, 0, 9, "crucigrama");
  assert.equal(ec.formato, "crucigrama");
  const orden = (ec.rondas![0].palabras as { i: number }[]).map((x) => x.i);
  const dadas = orden.map((i) => ["GRACIA", "verdád", "otra"][i]);
  const cr = contestar(completa, ec, { pieza: "completa", huecos: dadas });
  assert.ok(Math.abs(cr.devolucion.puntaje - 2 / 3) < 1e-9, "dos de tres en el crucigrama");
  // la memoria: un intento con cartas ya destapadas o repetidas es un error, no una pareja
  const relaciona = { id: "z3", objetivo: 0, pieza: "relaciona", versiones: [{ pares: [["Gracia", "Favor no merecido"], ["Fe", "Confianza en Dios"], ["Justificación", "Declarados justos"]], explica: "Así es.", apoyo: "una frase" }] } as unknown as Actividad;
  const em = nuevoEstado("prueba", relaciona, 0, 4, "memoria");
  assert.equal(em.formato, "memoria");
  const cartas = em.rondas![0].cartas as { par: number }[];
  const j = cartas.findIndex((x, k) => k > 0 && x.par === cartas[0].par);
  const m1 = contestar(relaciona, em, { pieza: "relaciona", cartas: [0, 0] });
  assert.equal(m1.devolucion.bien, false, "la misma carta dos veces no es pareja");
  assert.equal(m1.estado.paso, 0);
  const m2 = contestar(relaciona, m1.estado, { pieza: "relaciona", cartas: [0, j] });
  assert.equal(m2.devolucion.bien, true);
  assert.deepEqual(m2.estado.orden.descubiertas, [0, j]);
  const m3 = contestar(relaciona, m2.estado, { pieza: "relaciona", cartas: [0, j] });
  assert.equal(m3.devolucion.bien, false, "una pareja ya destapada no cuenta otra vez");
  // «¡Atrápalas!»: atrapar una que no es del grupo resta solo esa
  const clasifica = { id: "z4", objetivo: 0, pieza: "clasifica", versiones: [{ consigna: "¿Es por gracia o por obras? Lleva cada frase a su grupo.", grupos: ["Por gracia", "Por obras"], frases: [{ texto: "Un regalo", grupo: 0 }, { texto: "Sin merecerlo", grupo: 0 }, { texto: "Por fe", grupo: 0 }, { texto: "Un salario", grupo: 1 }, { texto: "Lo que me gané", grupo: 1 }], explica: "Así es.", apoyo: "una frase" }] } as unknown as Actividad;
  const ea = nuevoEstado("prueba", clasifica, 0, 4, "atrapa");
  assert.equal(ea.formato, "atrapa");
  const va = vistaDe(clasifica, ea);
  assert.ok(va.formato === "atrapa" && va.grupo === "Por gracia" && va.pregunta === "¿Es por gracia o por obras?");
  const r0 = ea.rondas![0];
  const del = (r0.frases as number[]).map((k, d) => (k <= 2 ? d : -1)).filter((d) => d >= 0);
  const otra = (r0.frases as number[]).findIndex((k) => k > 2);
  const at = contestar(clasifica, ea, { pieza: "clasifica", atrapadas: [...del, otra] });
  assert.ok(Math.abs(at.devolucion.puntaje - 4 / 5) < 1e-9, "una de cinco mal");
});

test("«Adivina la palabra» y «Globos»: la lámpara, la nota de cada palabra y las verdades reventadas", () => {
  assert.equal(notaAdivina(0), 1);
  assert.equal(notaAdivina(2), 1, "se perdonan 2 gotas");
  assert.ok(Math.abs(notaAdivina(4) - 0.7) < 1e-9);
  assert.equal(notaAdivina(6), 0, "con la lámpara apagada vale 0");
  const completa = { id: "z5", objetivo: 0, pieza: "completa", versiones: [{ texto: "La [[gracia]] es el favor de Dios que no merecemos.", distractores: ["ley"], explica: "Así es.", apoyo: "una frase" }] } as unknown as Actividad;
  // seis letras que no están: se apaga la lámpara y la palabra vale 0
  let e = nuevoEstado("prueba", completa, 0, 3, "adivina");
  assert.equal(e.formato, "adivina");
  let d = null as ReturnType<typeof contestar>["devolucion"] | null;
  for (const l of ["Z", "X", "Q", "W", "K", "J"]) {
    const r = contestar(completa, e, { pieza: "completa", letra: l });
    d = r.devolucion;
    e = r.estado;
  }
  assert.equal(d!.terminada, true);
  assert.equal(d!.puntajeActividad, 0);
  assert.ok(d!.correccion.pieza === "completa" && d!.correccion.formato === "adivina" && d!.correccion.palabra === "gracia" && d!.correccion.resuelta === false);
  // una letra repetida no gasta aceite; con la palabra entera y una gota gastada, vale 1
  let e2 = nuevoEstado("prueba", completa, 0, 3, "adivina");
  e2 = contestar(completa, e2, { pieza: "completa", letra: "Z" }).estado;
  e2 = contestar(completa, e2, { pieza: "completa", letra: "z" }).estado;
  assert.deepEqual(e2.orden.fallos, [1]);
  for (const l of ["G", "R", "A", "C", "I"]) e2 = contestar(completa, e2, { pieza: "completa", letra: l }).estado;
  assert.equal(e2.terminada, true);
  assert.equal(e2.puntaje, 1);
  // globos: reventar un error resta solo esa
  const verdad = { id: "z6", objetivo: 0, pieza: "verdad", versiones: [
    { afirmaciones: [{ texto: "Dios es amor.", verdad: true, explica: "Sí.", apoyo: "a" }, { texto: "La fe es un salario.", verdad: false, explica: "No.", apoyo: "b" }] },
    { afirmaciones: [{ texto: "Cristo resucitó.", verdad: true, explica: "Sí.", apoyo: "c" }, { texto: "La gracia se compra.", verdad: false, explica: "No.", apoyo: "d" }] },
  ] } as unknown as Actividad;
  const eg = nuevoEstado("prueba", verdad, 0, 5, "globos");
  assert.equal(eg.formato, "globos");
  const items = eg.rondas![0].items as { v: number; i: number }[];
  const ver = items.map((x) => (verdad.versiones[x.v] as any).afirmaciones[x.i].verdad as boolean);
  const g = contestar(verdad, eg, { pieza: "verdad", reventadas: [...items.map((_, k) => k).filter((k) => ver[k]), ver.indexOf(false)] });
  assert.ok(Math.abs(g.devolucion.puntaje - 3 / 4) < 1e-9, "una de cuatro mal");
});

test("los puntos extra completan lo que falta para 100, en la parte de cada reto dominado", () => {
  assert.equal(extraDeLecciones(80, 0, 6), 0);
  assert.equal(extraDeLecciones(80, 3, 6), 10);
  assert.equal(extraDeLecciones(80, 6, 6), 20, "con todos dominados llega a 100");
  assert.equal(extraDeLecciones(74, 1, 4), 7, "26 ÷ 4 = 6,5: se redondea");
  assert.equal(extraDeLecciones(100, 6, 6), 0);
  assert.equal(extraDeLecciones(90, 9, 6), 10, "nunca más que las lecciones");
  assert.equal(extraDeLecciones(90, 2, 0), 0);
});
