/**
 * Las clases del aula, escritas como guiones (aula/director.ts):
 * - la sección de un estudio: el maestro la enseña en burbujas con sus versículos y pregunta la práctica una por
 *   una (revuelta con `ordenDeOpciones`), felicita o explica con el verso, y al final la nota con su medalla;
 * - el examen final de un estudio: el servidor da las preguntas sin la respuesta, se contestan una por una con el
 *   reloj, se entregan todas juntas y después se revisan juntos, la última con el suspenso de «¿Quién es sabio?»;
 * - la cátedra del maestro: la enseñanza corta, la pregunta, la corrección del servidor con su cita y otra lección
 *   hasta el tope del día (la última del día, con suspenso).
 * Las reglas del servidor no cambian: lo que el teléfono no sabe, no lo muestra antes de tiempo.
 */
import {
  EXAMEN_APRUEBA, EXAMEN_INTENTOS, estudioPorId, ordenDeOpciones,
  type EstudiosEstado, type ExamenResultado, type PreguntaExamen,
} from "@shared/estudios";
import { CATEDRAS, GRUPOS_CATEDRA, gradoCatedra, type CatedraArea, type CatedraRespuesta, type LeccionVista } from "@shared/catedras";
import { FRASES, RELOJ_CATEDRA, RELOJ_EXAMEN, RELOJ_PRACTICA, burbujasDeSeccion, burbujasDeTexto, conNombre, frase, medallaDeNota, type MaestroId } from "@shared/aula";
import { GOZO } from "@shared/mercado";
import { REPASO_RANGO, SEGUNDOS_RANGO, examenRango, type FinParte, type PreguntaRango, type RespuestaRango } from "@shared/examenes-rango";
import { AulaCerrada, type Director } from "./director";
import { sonidoAula } from "./aula-sonido";

export type PedidoAula =
  | { que: "menu" }
  | { que: "seccion"; estudio: string; seccion: string }
  | { que: "examen"; estudio: string }
  | { que: "catedra"; area: CatedraArea }
  /** Una parte de un examen de rango (shared/examenes-rango.ts); «corrido»: al aprobarla, sigue con la próxima. */
  | { que: "rango"; examen: string; parte: number; corrido?: boolean }
  /** El repaso de la temporada para los cargos altos. */
  | { que: "repaso" };

/** Lo que sigue después de una clase: otra clase, el menú del aula o salir. */
export type Siguiente = PedidoAula | { que: "salir" };

export async function api<T>(path: string, body?: unknown, metodo?: "GET" | "POST"): Promise<{ ok: boolean; status: number; data: (T & { message?: string }) | null }> {
  try {
    const m = metodo ?? (body === undefined ? "GET" : "POST");
    const r = await fetch(`/api/jerusalen${path}`, {
      method: m,
      credentials: "include",
      cache: "no-store",
      headers: m === "POST" ? { "Content-Type": "application/json" } : undefined,
      body: m === "POST" ? JSON.stringify(body ?? {}) : undefined,
    });
    return { ok: r.ok, status: r.status, data: (await r.json().catch(() => null)) as never };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

/** Para las frases: «{n}» es el nombre y «{t}» el título. */
function f(d: Director, lista: readonly string[], semilla: number, t = ""): string {
  return conNombre(frase(lista, semilla), d.nombre).split("{t}").join(t);
}

/** Un número para que las frases cambien de una clase a otra sin saltar al volver a dibujar. */
const semillaDe = () => Math.floor(Date.now() / 1000);

/** Hasta que la acción la elija quien estudia (y si falla la conexión, ofrece reintentar). */
async function conReintento<T>(d: Director, hacer: () => Promise<{ ok: boolean; status: number; data: (T & { message?: string }) | null }>, texto: string): Promise<T | null> {
  for (;;) {
    d.cargando(true);
    const r = await hacer();
    d.cargando(false);
    if (d.cerrado) throw new AulaCerrada();
    if (r.ok && r.data) {
      d.error(null);
      return r.data;
    }
    const msg = r.data?.message || (r.status === 0 ? "No hay conexión. Revisa tu internet." : texto);
    d.error(msg);
    // si el servidor dijo que no (no es la conexión), no se reintenta
    if (r.status !== 0 && r.status !== 429 && r.status < 500) return null;
    const elegido = await d.acciones([
      { id: "otra", label: "Intentar de nuevo", primaria: true },
      { id: "salir", label: "Salir del aula" },
    ]);
    if (elegido === "salir") return null;
    if (r.status === 429) await d.esperar(1500);
  }
}

// ================================================================ la sección de un estudio
export async function claseSeccion(d: Director, o: { estudioId: string; seccionId: string; hecha: boolean; estado: EstudiosEstado | null; alGuardar?: (e: EstudiosEstado) => void; alAviso?: (t: string, tono: "gold" | "info") => void; alMisiones?: (m: unknown) => void }): Promise<Siguiente> {
  const e = estudioPorId(o.estudioId);
  const s = e?.secciones.find((x) => x.id === o.seccionId);
  if (!e || !s) return { que: "menu" };
  const sem = semillaDe();
  const idx = e.secciones.findIndex((x) => x.id === s.id);
  d.limpiar();
  d.progreso(`${e.icono} ${e.titulo} · sección ${idx + 1} de ${e.secciones.length}`);
  d.fase("ensena");
  d.pizarra({ k: "titulo", titulo: s.titulo, sub: e.titulo });
  sonidoAula.pagina();
  await d.decir(f(d, FRASES.empezarSeccion, sem, s.titulo));

  // la enseñanza: de 3 a 5 burbujas con la lectura, los versículos y la idea clave
  const burbujas = burbujasDeSeccion(s);
  for (const [i, b] of burbujas.entries()) {
    if (b.tipo === "verso") {
      d.pizarra({ k: "verso", texto: b.texto, ref: b.ref });
      d.escena?.cortarA("rollo", 3.4);
      await d.decir(`${frase(FRASES.verso, sem + i)} «${b.texto}»`, { ref: b.ref, tono: "verso", gesto: "senala" });
      d.reaccion("asienten", 0.5, 2.2);
      sonidoAula.asentir();
    } else if (b.tipo === "clave") {
      d.pizarra({ k: "verso", titulo: "Idea clave", texto: b.texto });
      await d.decir(`${frase(FRASES.clave, sem + i)} ${b.texto}`, { tono: "verso" });
      d.reaccion("asienten", 0.75, 2.4);
      sonidoAula.asentir();
    } else {
      if (i === 0) d.fase("ensena");
      await d.decir(b.texto);
      if (i % 2 === 1) d.reaccion("cuchichean", 0.3, 1.4);
    }
  }

  // la práctica: una por una, revuelta; si no es, se tacha y se vuelve a elegir
  await d.decir(f(d, FRASES.aPreguntar, sem), { sigue: "¡Pregunte!" });
  const n = s.preguntas.length;
  let primeras = 0;
  for (const [qi, q] of s.preguntas.entries()) {
    const orden = ordenDeOpciones(q.ops.length, sem + qi * 7919);
    const ops = orden.map((k) => q.ops[k]);
    const buena = orden.indexOf(q.ok);
    let tachadas: number[] = [];
    let fallos = 0;
    let escribir = true;
    d.fase("pregunta");
    void d.decir(q.p, { sigue: null, ms: 300, gesto: "senala" }).catch(() => undefined);
    for (;;) {
      const manos = window.setTimeout(() => d.escena?.manos(2), 2600);
      const i = await d.preguntar({ n: qi + 1, de: n, etiqueta: `Práctica · ${qi + 1} de ${n}`, texto: q.p, opciones: ops, tachadas }, RELOJ_PRACTICA, escribir);
      window.clearTimeout(manos);
      escribir = false;
      if (i === -1) {
        d.marcar({ bloqueada: true });
        await d.decir(f(d, FRASES.tiempoPractica, sem + qi), { sigue: "Otra vez" });
        d.fase("pregunta");
        continue;
      }
      if (i === buena) {
        if (!fallos) primeras++;
        d.marcar({ correcta: i, elegida: null });
        d.fase("bien");
        sonidoAula.bien();
        sonidoAula.aplauso(0.5);
        await d.decir(`${f(d, FRASES.bien, sem + qi)} ${q.por}`, { tono: "bien", sigue: qi + 1 < n ? "Siguiente pregunta" : "Terminar la sección", gesto: "aplaude" });
        break;
      }
      fallos++;
      tachadas = [...tachadas, i];
      d.marcar({ mala: i, elegida: null });
      d.fase("mal");
      sonidoAula.mal();
      const v = s.versos[(fallos - 1) % Math.max(1, s.versos.length)];
      await d.decir(v ? `${f(d, FRASES.mal, sem + fallos)} «${v.text}»` : `${f(d, FRASES.mal, sem + fallos)} ${s.clave}`, { ref: v?.ref, tono: "mal", sigue: "Elegir otra vez", gesto: "explica" });
      d.marcar({ mala: null, tachadas, bloqueada: false });
      d.fase("pregunta");
    }
  }

  // se guarda la sección (el servidor da el mérito y el gozo una sola vez)
  d.quitarPregunta();
  const r = await conReintento<{ premio: number; estado: EstudiosEstado; misiones?: unknown }>(d, () => api(`/estudios/${e.id}/seccion`, { seccion: s.id }), "No se pudo guardar la sección.");
  if (!r) return { que: "menu" };
  o.alGuardar?.(r.estado);
  o.alMisiones?.(r.misiones);
  const primera = r.premio > 0;
  // la medalla de la práctica: oro con todas a la primera, plata si falló una, bronce si acertó alguna a la primera
  const metal = primeras <= 0 ? 0 : medallaDeNota(primeras, n, Math.max(1, n - 1));
  d.pizarra({ k: "nota", aciertos: primeras, de: n, titulo: s.titulo, sub: primeras >= n ? "¡Todas a la primera!" : "a la primera", metal }, true);
  d.fase(primera ? "aprobado" : "nota");
  sonidoAula.medalla(metal);
  if (primera) sonidoAula.aplauso(1);
  if (primera) o.alAviso?.(`Sección terminada: «${s.titulo}» · +${r.premio} de mérito · +${GOZO.seccion} de gozo`, "gold");
  d.nota({
    aciertos: primeras,
    de: n,
    metal,
    titulo: primeras >= n ? "¡Todas a la primera!" : `${primeras} de ${n} a la primera`,
    sub: primera ? `+${r.premio} de mérito · +${GOZO.seccion} de gozo` : o.hecha ? "Repaso hecho: la sección ya era tuya." : undefined,
    lineas: [`«${s.titulo}» · ${e.titulo}`],
  });
  await d.decir(primera ? `Terminaste «${s.titulo}», ${d.nombre}. ${s.clave}` : `Buen repaso, ${d.nombre}. ${s.clave}`, { tono: "bien", sigue: null, ms: 600 });
  const mio = r.estado.mios.find((m) => m.id === e.id);
  const siguiente = e.secciones.find((x, k) => k > idx && !mio?.secciones.includes(x.id)) ?? e.secciones.find((x) => !mio?.secciones.includes(x.id));
  const acciones = [
    ...(siguiente ? [{ id: "sig", label: `▶ Siguiente sección: «${siguiente.titulo}»`, primaria: true }] : []),
    ...(!siguiente && mio?.puedeExamen ? [{ id: "examen", label: "🎓 Dar el examen final", primaria: true }] : []),
    { id: "menu", label: "📜 Volver a los rollos" },
    { id: "salir", label: "Salir del aula" },
  ];
  const elegido = await d.acciones(acciones);
  if (elegido === "sig" && siguiente) return { que: "seccion", estudio: e.id, seccion: siguiente.id };
  if (elegido === "examen") return { que: "examen", estudio: e.id };
  if (elegido === "salir") return { que: "salir" };
  return { que: "menu" };
}

// ================================================================ el examen final de un estudio
export async function claseExamen(d: Director, o: { estudioId: string; alGuardar?: (e: EstudiosEstado) => void; alAviso?: (t: string, tono: "gold" | "info") => void }): Promise<Siguiente> {
  const e = estudioPorId(o.estudioId);
  if (!e) return { que: "menu" };
  const sem = semillaDe();
  d.limpiar();
  d.progreso(`🎓 Examen final · ${e.titulo}`);
  d.fase("ensena");
  d.pizarra({ k: "titulo", titulo: "Examen final", sub: e.titulo });
  sonidoAula.pagina();
  const pedido = await conReintento<{ preguntas: PreguntaExamen[]; intento?: number; de?: number }>(d, () => api(`/estudios/${e.id}/examen`, {}), "No se pudo traer el examen.");
  if (!pedido) {
    const el = await d.acciones([{ id: "menu", label: "📜 Volver a los rollos", primaria: true }, { id: "salir", label: "Salir del aula" }]);
    return el === "salir" ? { que: "salir" } : { que: "menu" };
  }
  const preguntas = pedido.preguntas;
  const n = preguntas.length;
  const intento = pedido.intento ? ` Es tu intento ${pedido.intento} de ${pedido.de ?? EXAMEN_INTENTOS}.` : "";
  d.reaccion("atentos", 1, 3);
  await d.decir(`Hoy es el examen final de «${e.titulo}», ${d.nombre}. Son ${n} preguntas y se aprueba con ${EXAMEN_APRUEBA}.${intento} Responde con calma: al final las revisamos juntos.`, { sigue: "Empezar el examen" });

  // las preguntas, una por una (la respuesta queda anotada, sin saber todavía si está bien)
  const resp: Record<string, string> = {};
  const elegidas: number[] = [];
  for (const [qi, p] of preguntas.entries()) {
    d.fase("pregunta");
    void d.decir(p.pregunta, { sigue: null, ms: 300, gesto: "senala" }).catch(() => undefined);
    const i = await d.preguntar({ n: qi + 1, de: n, etiqueta: `Examen · pregunta ${qi + 1} de ${n}`, texto: p.pregunta, opciones: p.opciones }, RELOJ_EXAMEN, true);
    elegidas.push(i);
    if (i >= 0) resp[p.id] = p.opciones[i];
    d.fase("anotado");
    sonidoAula.cuchicheo();
    await d.decir(i < 0 ? f(d, FRASES.tiempo, sem + qi) + " Queda sin responder." : f(d, FRASES.anotado, sem + qi), { sigue: null, ms: 1100, gesto: "escucha" });
  }

  // se entrega todo junto (el servidor corrige)
  d.quitarPregunta();
  const res = await conReintento<ExamenResultado>(d, () => api(`/estudios/${e.id}/examen/respuestas`, { respuestas: resp }), "No se pudo entregar el examen.");
  if (!res) return { que: "menu" };
  const entregado = Date.now();
  o.alGuardar?.(res.estado);

  // la revisión: una por una; la última, con suspenso
  d.fase("revision");
  await d.decir(f(d, FRASES.revisar, sem), { sigue: "Revisar" });
  let buenas = 0;
  for (const [qi, p] of preguntas.entries()) {
    const c = res.correcciones.find((x) => x.id === p.id);
    if (!c) continue;
    const elegida = elegidas[qi] ?? -1;
    const buena = p.opciones.indexOf(c.correcta);
    const ultima = qi === preguntas.length - 1;
    d.fase("revision");
    d.verPregunta({ n: qi + 1, de: n, etiqueta: `Revisión · pregunta ${qi + 1} de ${n}`, texto: p.pregunta, opciones: p.opciones }, elegida);
    if (ultima) {
      d.suspenso(true);
      await d.decir(f(d, FRASES.suspenso, sem), { tono: "suspenso", sigue: null, ms: 3400, gesto: "piensa" });
      d.suspenso(false);
    } else {
      await d.decir(elegida >= 0 ? `La ${qi + 1}: «${p.opciones[elegida]}»…` : `La ${qi + 1} quedó sin responder…`, { sigue: null, ms: 1300 });
    }
    if (c.bien) {
      buenas++;
      d.marcar({ correcta: buena >= 0 ? buena : elegida, elegida: null });
      d.fase("bien");
      sonidoAula.bien();
      sonidoAula.aplauso(ultima ? 0.9 : 0.4);
      await d.decir(`${f(d, FRASES.bien, sem + qi)} ${c.explica}`, { ref: c.ref, tono: "bien", sigue: ultima ? "Ver la nota" : "Siguiente" });
    } else {
      d.marcar({ correcta: buena >= 0 ? buena : null, mala: elegida >= 0 ? elegida : null, elegida: null });
      d.fase("mal");
      sonidoAula.mal();
      await d.decir(`Era «${c.correcta}». ${c.explica}`, { ref: c.ref, tono: "mal", sigue: ultima ? "Ver la nota" : "Siguiente", gesto: "explica" });
    }
  }

  // la nota con su medalla
  d.quitarPregunta();
  const metal = medallaDeNota(res.aciertos, res.de, EXAMEN_APRUEBA);
  d.pizarra({ k: "nota", aciertos: res.aciertos, de: res.de, titulo: res.aprobado ? "¡Aprobado!" : "Examen final", sub: e.titulo, metal });
  d.fase(res.aprobado ? "aprobado" : "nota");
  sonidoAula.medalla(metal);
  if (res.aprobado) sonidoAula.aplauso(1.2);
  if (res.aprobado) o.alAviso?.(res.primeraVez ? `¡Aprobaste «${e.titulo}»! +${res.premio} de mérito · +${GOZO.estudio} de gozo` : "¡Aprobado otra vez!", "gold");
  const mio = res.estado.mios.find((m) => m.id === e.id);
  d.nota({
    aciertos: res.aciertos,
    de: res.de,
    metal,
    titulo: res.aciertos >= res.de ? "⭐ ¡Perfecto!" : res.aprobado ? "¡Aprobado!" : res.aciertos >= EXAMEN_APRUEBA - 1 ? "¡Te faltó poco!" : "Todavía no",
    sub: res.primeraVez ? `+${res.premio} de mérito · +${GOZO.estudio} de gozo · es tuyo para siempre` : res.aprobado ? "Aprobado: es tuyo para siempre." : `Se aprueba con ${EXAMEN_APRUEBA}.`,
    lineas: [e.titulo, pedido.intento ? `Intento ${pedido.intento}${pedido.intento <= EXAMEN_INTENTOS ? ` de ${EXAMEN_INTENTOS}` : ""}` : ""].filter(Boolean),
  });
  const dice = res.aciertos >= res.de ? FRASES.perfecto : res.aprobado ? FRASES.aprobado : res.aciertos >= EXAMEN_APRUEBA - 1 ? FRASES.casi : FRASES.noAun;
  await d.decir(f(d, dice, sem), { tono: res.aprobado ? "bien" : "normal", sigue: null, ms: 600, gesto: res.aprobado ? "aplaude" : "habla" });
  const puedeOtro = !!mio && !mio.perfecto && !(mio.intentos >= EXAMEN_INTENTOS && mio.aprobado);
  const espera = mio?.esperaExamen ?? 0;
  for (;;) {
    const quedan = Math.max(0, Math.ceil(espera - (Date.now() - entregado) / 1000));
    const el = await d.acciones([
      ...(puedeOtro
        ? [{ id: "otro", label: quedan > 0 ? (quedan > 90 ? `Repasa: otro intento en ${Math.ceil(quedan / 60)} min` : `Otro intento en ${quedan} s (toca para ver)`) : buenas >= res.de ? "Otra vez" : "🎓 Otro intento con preguntas nuevas", primaria: quedan <= 0, disabled: quedan > 90 }]
        : []),
      { id: "menu", label: "📜 Volver a los rollos", primaria: !puedeOtro || quedan > 0 },
      { id: "salir", label: "Salir del aula" },
    ]);
    if (el === "otro") {
      if (Math.max(0, Math.ceil(espera - (Date.now() - entregado) / 1000)) > 0) continue;
      return { que: "examen", estudio: e.id };
    }
    return el === "salir" ? { que: "salir" } : { que: "menu" };
  }
}

// ================================================================ la cátedra del maestro
export async function claseCatedra(
  d: Director,
  o: { area: CatedraArea; pista: string[]; alGozo?: (n: number) => void; alAviso?: (t: string, tono: "gold" | "info") => void; maestro?: MaestroId },
): Promise<Siguiente> {
  const meta = CATEDRAS[o.area];
  const sem = semillaDe();
  let ganado = { merito: 0, gozo: 0, bien: 0, de: 0 };
  let primera = true;
  let ultimo: CatedraRespuesta | LeccionVista | null = null;
  d.limpiar();
  for (;;) {
    d.progreso(`${meta.icono} ${meta.nombre}`);
    d.fase("ensena");
    const lec = await conReintento<LeccionVista & { agotada?: boolean; message?: string }>(d, () => api(`/catedra/${o.area}/leccion`, { pista: o.pista }), "No se pudo traer la lección.");
    if (!lec) return { que: "menu" };
    if (lec.agotada) {
      d.pizarra({ k: "titulo", titulo: meta.nombre, sub: `Hoy: ${lec.hoy} de ${lec.max} lecciones` });
      await d.decir(lec.message || meta.manana, { sigue: null, ms: 500 });
      ultimo = lec;
      break;
    }
    ultimo = lec;
    const ultimaDelDia = lec.hoy + 1 >= lec.max;
    d.progreso(`${meta.icono} ${meta.nombre} · lección ${lec.hoy + 1} de ${lec.max} de hoy`);
    d.pizarra({ k: "verso", titulo: lec.tema, texto: lec.ensena });
    sonidoAula.pagina();
    if (primera && lec.sobre && GRUPOS_CATEDRA[lec.sobre]) await d.decir(`Hace poco serviste en ${GRUPOS_CATEDRA[lec.sobre]}, ${d.nombre}. De eso te enseño hoy.`);
    else if (primera) await d.decir(`Hoy aprendemos de «${lec.tema}».`);
    primera = false;
    for (const b of burbujasDeTexto(lec.ensena)) await d.decir(b);
    d.fase("pregunta");
    void d.decir(lec.pregunta, { sigue: null, ms: 300, gesto: "senala" }).catch(() => undefined);
    const manos = window.setTimeout(() => d.escena?.manos(2), 2600);
    const i = await d.preguntar({ n: lec.hoy + 1, de: lec.max, etiqueta: `${meta.nombre.replace(/^La /, "")} · ${lec.tema}`, texto: lec.pregunta, opciones: lec.opciones }, RELOJ_CATEDRA, true);
    window.clearTimeout(manos);
    if (i < 0) {
      d.marcar({ bloqueada: true });
      await d.decir(f(d, FRASES.tiempo, sem), { sigue: null, ms: 900 });
    }
    const res = await conReintento<CatedraRespuesta>(d, () => api(`/catedra/${o.area}/respuesta`, { opcion: i >= 0 ? lec.opciones[i] : "" }), "No se pudo corregir la lección.");
    if (!res) return { que: "menu" };
    ultimo = res;
    ganado = { merito: ganado.merito + res.premio.merito, gozo: ganado.gozo + res.premio.gozo, bien: ganado.bien + (res.correcta ? 1 : 0), de: ganado.de + 1 };
    if (typeof res.gozoTotal === "number") o.alGozo?.(res.gozoTotal);
    // la última del día: el suspenso antes de revelar
    if (ultimaDelDia) {
      d.suspenso(true);
      await d.decir(f(d, FRASES.suspenso, sem), { tono: "suspenso", sigue: null, ms: 3200, gesto: "piensa" });
      d.suspenso(false);
    }
    const buena = lec.opciones.indexOf(res.respuesta);
    if (res.correcta) {
      d.marcar({ correcta: buena >= 0 ? buena : i, elegida: null });
      d.fase("bien");
      sonidoAula.bien();
      sonidoAula.aplauso(0.5);
      await d.decir(`${f(d, FRASES.bien, sem + ganado.de)} +${res.premio.merito} de mérito · +${res.premio.gozo} de gozo. ${res.explica}`, { ref: res.ref, tono: "bien", sigue: null, ms: 200, gesto: "aplaude" });
    } else {
      d.marcar({ correcta: buena >= 0 ? buena : null, mala: i >= 0 ? i : null, elegida: null });
      d.fase("mal");
      sonidoAula.mal();
      await d.decir(`Era «${res.respuesta}». ${res.explica}`, { ref: res.ref, tono: "mal", sigue: null, ms: 200, gesto: "explica" });
    }
    const antes = gradoCatedra(o.area, lec.aprendidas, lec.total);
    const ahora = gradoCatedra(o.area, res.aprendidas, res.total);
    if (ahora.n > antes.n) o.alAviso?.(`🎓 Subiste de grado en ${meta.nombre.toLowerCase()}: ${ahora.nombre}`, "gold");
    const otra = meta.seguidas && res.hoy < res.max;
    const el = await d.acciones([
      ...(otra ? [{ id: "otra", label: `📜 Otra lección (${res.hoy} de ${res.max} hoy)`, primaria: true }] : []),
      { id: "fin", label: otra ? "Terminar la clase" : "Ver cómo me fue", primaria: !otra },
    ]);
    if (el !== "otra") break;
    d.quitarPregunta();
  }

  // el final de la clase: lo aprendido hoy y el grado
  d.quitarPregunta();
  const aprendidas = ultimo ? ultimo.aprendidas : 0;
  const total = ultimo ? ultimo.total : 0;
  const grado = gradoCatedra(o.area, aprendidas, total);
  const metal = (ganado.de ? medallaDeNota(ganado.bien, ganado.de, Math.max(1, ganado.de - 1)) : 0) as 0 | 1 | 2 | 3;
  if (ganado.de) {
    d.pizarra({ k: "nota", aciertos: ganado.bien, de: ganado.de, titulo: meta.nombre, sub: `${grado.nombre} · ${aprendidas} de ${total} lecciones`, metal });
    d.fase(ganado.bien >= ganado.de ? "aprobado" : "nota");
    sonidoAula.medalla(metal);
    if (ganado.bien) o.alAviso?.(`${meta.icono} Bien aprendido · +${ganado.merito} mérito · +${ganado.gozo} ✨ gozo`, "gold");
  } else d.fase("nota");
  d.nota({
    aciertos: ganado.bien,
    de: ganado.de,
    metal,
    titulo: ganado.de ? `${ganado.bien} de ${ganado.de} bien` : "Por hoy, suficiente",
    sub: ganado.de ? `+${ganado.merito} de mérito · +${ganado.gozo} de gozo` : meta.manana,
    lineas: [`🎓 ${grado.nombre} · ${aprendidas} de ${total} lecciones aprendidas`, ultimo ? `Hoy: ${ultimo.hoy} de ${ultimo.max}` : ""].filter(Boolean),
  });
  await d.decir(f(d, FRASES.despedida, sem), { sigue: null, ms: 400 });
  const el = await d.acciones([
    { id: "menu", label: "📜 Volver al aula", primaria: true },
    { id: "salir", label: meta.cierre },
  ]);
  return el === "salir" ? { que: "salir" } : { que: "menu" };
}

// ================================================================ los exámenes de rango (y el repaso de la temporada)
/**
 * Una parte de un examen de rango (o el repaso): el servidor da las preguntas de a una y lleva el reloj; cada respuesta
 * se corrige al momento (la respuesta llega solo después de responder). La última, con suspenso. Al final, la nota; si
 * con ella quedó aprobado el examen, la prenda y el premio; y si se va de corrido, sigue con la próxima parte.
 */
export async function claseRango(
  d: Director,
  o: { examen: string; parte: number; corrido: boolean; alGozo?: (n: number) => void; alAviso?: (t: string, tono: "gold" | "info") => void },
): Promise<Siguiente> {
  const repaso = o.examen === "repaso";
  const def = repaso ? null : examenRango(o.examen);
  if (!repaso && !def) return { que: "menu" };
  const p = def?.partes.find((x) => x.n === o.parte);
  if (!repaso && !p) return { que: "menu" };
  const sem = semillaDe();
  const nombre = repaso ? "El repaso de la temporada" : def!.nombre;
  const n = repaso ? REPASO_RANGO.preguntas : p!.preguntas;
  const aprueba = repaso ? REPASO_RANGO.aprueba : p!.aprueba;
  d.limpiar();
  d.progreso(repaso ? "🎖️ El repaso de la temporada" : `🎖️ ${def!.nombre} · parte ${o.parte} de ${def!.partes.length}${o.corrido ? " · de corrido" : ""}`);
  d.fase("ensena");
  d.pizarra({ k: "titulo", titulo: nombre, sub: repaso ? "Para seguir en un cargo alto" : `Parte ${o.parte}: ${p!.titulo}` });
  sonidoAula.pagina();
  d.reaccion("atentos", 1, 3);
  await d.decir(
    repaso
      ? `${d.nombre}, para seguir en un cargo alto se repasa cada temporada. Son ${n} preguntas de ${SEGUNDOS_RANGO} segundos y se aprueba con ${aprueba}. Te corrijo una por una.`
      : `${d.nombre}, hoy das la parte ${o.parte} del examen de ${def!.rango.toLowerCase()}: «${p!.titulo}». ${p!.tema} Son ${n} preguntas de ${SEGUNDOS_RANGO} segundos y se aprueba con ${aprueba}. Te corrijo una por una.`,
    { sigue: "Empezar" },
  );
  let fin: FinParte | null = null;
  for (let vuelta = 0; vuelta < 20 && !fin; vuelta++) {
    const r = await conReintento<{ pregunta?: PreguntaRango; fin?: FinParte }>(d, () => api("/rango/pregunta", { examen: o.examen, parte: o.parte, corrido: o.corrido }), "No se pudo traer la pregunta.");
    if (!r) {
      const el = await d.acciones([{ id: "menu", label: "📜 Volver al aula", primaria: true }, { id: "salir", label: "Salir del aula" }]);
      return el === "salir" ? { que: "salir" } : { que: "menu" };
    }
    if (r.fin) {
      // (la pregunta que se dejó sin responder venció y cerró el intento)
      fin = r.fin;
      break;
    }
    const pq = r.pregunta!;
    const ultima = pq.n >= pq.de;
    d.fase("pregunta");
    void d.decir(pq.pregunta, { sigue: null, ms: 300, gesto: "senala" }).catch(() => undefined);
    const manos = window.setTimeout(() => d.escena?.manos(2), 2600);
    const i = await d.preguntar({ n: pq.n, de: pq.de, etiqueta: `${repaso ? "Repaso" : `Parte ${o.parte}`} · pregunta ${pq.n} de ${pq.de}`, texto: pq.pregunta, opciones: pq.opciones }, Math.max(1, pq.restan), true);
    window.clearTimeout(manos);
    if (i < 0) {
      d.marcar({ bloqueada: true });
      await d.decir(f(d, FRASES.tiempo, sem + pq.n), { sigue: null, ms: 800 });
    }
    const res = await conReintento<RespuestaRango>(d, () => api("/rango/respuesta", { examen: o.examen, parte: o.parte, opcion: i }), "No se pudo corregir la respuesta.");
    if (!res) return { que: "menu" };
    if (typeof res.gozoTotal === "number") o.alGozo?.(res.gozoTotal);
    if (ultima) {
      d.suspenso(true);
      await d.decir(f(d, FRASES.suspenso, sem), { tono: "suspenso", sigue: null, ms: 3000, gesto: "piensa" });
      d.suspenso(false);
    }
    const buena = pq.opciones.indexOf(res.correcta);
    if (res.bien) {
      d.marcar({ correcta: buena >= 0 ? buena : i, elegida: null });
      d.fase("bien");
      sonidoAula.bien();
      sonidoAula.aplauso(ultima ? 0.9 : 0.45);
      await d.decir(`${f(d, FRASES.bien, sem + pq.n)} ${res.explica}`, { ref: res.ref, tono: "bien", sigue: res.fin ? "Ver la nota" : "Siguiente", gesto: "aplaude" });
    } else {
      d.marcar({ correcta: buena >= 0 ? buena : null, mala: i >= 0 ? i : null, elegida: null });
      d.fase("mal");
      sonidoAula.mal();
      await d.decir(`${res.tarde ? "Llegó tarde: cuenta como no respondida. " : ""}Era «${res.correcta}». ${res.explica}`, { ref: res.ref, tono: "mal", sigue: res.fin ? "Ver la nota" : "Siguiente", gesto: "explica" });
    }
    if (res.fin) fin = res.fin;
  }
  if (!fin) return { que: "menu" };

  // la nota de la parte, con su medalla; si con ella quedó aprobado el examen, la prenda y el premio
  d.quitarPregunta();
  const metal = medallaDeNota(fin.aciertos, fin.de, fin.aprueba);
  d.pizarra({ k: "nota", aciertos: fin.aciertos, de: fin.de, titulo: fin.examenAprobado ? "¡Examen aprobado!" : fin.aprobada ? "¡Parte aprobada!" : nombre, sub: repaso ? "Repaso de la temporada" : `Parte ${o.parte}: ${p!.titulo}`, metal });
  d.fase(fin.aprobada ? "aprobado" : "nota");
  sonidoAula.medalla(metal);
  if (fin.aprobada) sonidoAula.aplauso(fin.examenAprobado ? 1.3 : 0.9);
  if (fin.examenAprobado && fin.premio) o.alAviso?.(`🎖️ ¡Aprobaste el ${nombre.toLowerCase()}! +${fin.premio.merito} de mérito · +${fin.premio.gozo} de gozo${fin.prenda ? ` · ${fin.prenda.nombre}` : ""}`, "gold");
  else if (fin.aprobada) o.alAviso?.(repaso ? "🎖️ Repaso de la temporada aprobado: tu cargo alto sigue al día." : `🎖️ Parte ${o.parte} aprobada: queda guardada.`, "gold");
  const esperaMin = Math.max(1, Math.ceil(fin.espera / 60));
  d.nota({
    aciertos: fin.aciertos,
    de: fin.de,
    metal,
    titulo: fin.examenAprobado ? (fin.deCorrido ? "⭐ ¡Aprobado de corrido!" : "🎖️ ¡Examen aprobado!") : fin.aprobada ? "¡Parte aprobada!" : "Todavía no",
    sub:
      fin.examenAprobado && fin.premio
        ? `+${fin.premio.merito} de mérito · +${fin.premio.gozo} de gozo${fin.prenda ? ` · ganaste «${fin.prenda.nombre}»` : ""}`
        : fin.aprobada
          ? "Queda guardada: sigue cuando quieras."
          : `Se aprueba con ${fin.aprueba}. Repasa y vuelve en ${esperaMin} minutos, con preguntas nuevas.`,
    lineas: [nombre, ...(def && fin.examenAprobado ? def.abre.slice(0, 2) : [])],
  });
  const dice = fin.aprobada ? (fin.de - fin.aciertos === 0 ? FRASES.perfecto : FRASES.aprobado) : fin.aciertos >= fin.aprueba - 1 ? FRASES.casi : FRASES.noAun;
  await d.decir(f(d, dice, sem), { tono: fin.aprobada ? "bien" : "normal", sigue: null, ms: 500, gesto: fin.aprobada ? "aplaude" : "habla" });
  // ¿sigue (de corrido o no) con la próxima parte?
  const proxima = !repaso && fin.aprobada && !fin.examenAprobado ? def!.partes.find((x) => x.n > o.parte) : undefined;
  const el = await d.acciones([
    ...(proxima ? [{ id: "seguir", label: o.corrido ? `🏃 Seguir de corrido: parte ${proxima.n}` : `▶ Parte ${proxima.n}: «${proxima.titulo}»`, primaria: true }] : []),
    { id: "menu", label: "📜 Volver al aula", primaria: !proxima },
    { id: "salir", label: "Salir del aula" },
  ]);
  if (el === "seguir" && proxima) return { que: "rango", examen: o.examen, parte: proxima.n, corrido: o.corrido };
  return el === "salir" ? { que: "salir" } : { que: "menu" };
}
