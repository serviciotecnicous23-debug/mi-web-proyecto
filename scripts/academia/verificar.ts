/**
 * El verificador del contenido de la academia (docs/academia.md, «Control de calidad»). Antes de publicar una materia:
 *
 *   npx tsx scripts/academia/verificar.ts            (con la Biblia de la web publicada)
 *   BIBLIA_URL=http://127.0.0.1:5082 npx tsx scripts/academia/verificar.ts
 *
 * Revisa cada materia disponible: que cada lección tenga contenido; que los versículos sean citas válidas; que el banco
 * tenga su tamaño y cada pregunta su lección, objetivo, explicación y cita; que las opciones sean distintas; que los ids
 * no se repitan; que cada objetivo se mida con al menos 2 preguntas; que las claves de lo escrito estén bien hechas; y
 * que lo citado entre comillas «…» coincida letra por letra con la RV1960 (en las lecciones, con algún versículo de la
 * misma lección; en las preguntas, con su cita).
 */
import { ESCRITA, ESPECIALIDADES, MINI_PRUEBA, SUFICIENCIA, examenDe, miniPruebasDe, parsearCita, tieneEscritoBreve, todasLasMaterias } from "../../shared/academia";
import { BANCOS, CONTENIDO } from "../../server/academia/index";
import { TRABAJOS } from "../../server/academia/trabajos";
import { problemasDeClave } from "../../server/academia-correccion";
import { problemasDeBloque } from "../../server/academia/validar-bloques";
import type { PreguntaObjetiva } from "../../server/academia/tipos";

const BIBLIA = process.env.BIBLIA_URL || "https://ministerioavivandoelfuego.com";
const problemas: string[] = [];
const mal = (s: string) => problemas.push(s);

const capitulos = new Map<string, Promise<{ verse: number; text: string }[]>>();
const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));
// Los capítulos se piden de a uno y con una pausa: el proveedor de la RV1960 (Bolls) responde 429 si recibe cientos
// de golpe, y entonces el servidor sirve la RV1909 de respaldo, que dice distinto y daría falsos errores de cita.
let fila: Promise<unknown> = Promise.resolve();
async function pedirCapitulo(libro: string, cap: number): Promise<{ verse: number; text: string }[]> {
  let respaldos = 0;
  let esperas = 0;
  for (;;) {
    const r = await fetch(`${BIBLIA}/api/bible/chapter/rv1960/${encodeURIComponent(libro)}/${cap}`);
    // la propia web limita las peticiones por minuto: se espera lo que pide (Retry-After) y se reintenta
    if (r.status === 429 && esperas < 8) {
      esperas++;
      const segundos = Number(r.headers.get("retry-after"));
      await dormir((Number.isFinite(segundos) && segundos > 0 ? Math.min(segundos, 65) : 15) * 1000);
      continue;
    }
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d: any = await r.json();
    if (!d.fallbackFrom) return d.verses as { verse: number; text: string }[];
    if (++respaldos >= 4) throw new Error(`la RV1960 no respondió (el servidor dio el respaldo ${d.version}); vuelve a correr el verificador en unos minutos`);
    await dormir(2500 * respaldos);
  }
}
function capitulo(libro: string, cap: number) {
  const clave = `${libro}|${cap}`;
  if (!capitulos.has(clave)) {
    const turno = fila.then(() => dormir(120)).then(() => pedirCapitulo(libro, cap));
    fila = turno.catch(() => undefined);
    capitulos.set(clave, turno);
  }
  return capitulos.get(clave)!;
}
async function textoDe(ref: string): Promise<string | null> {
  const c = parsearCita(ref);
  if (!c) return null;
  const vs = await capitulo(c.libro, c.capitulo);
  return vs.filter((v) => v.verse >= c.desde && v.verse <= c.hasta).map((v) => v.text).join(" ");
}
const plano = (s: string) => s.toLowerCase().replace(/[.,;:!?¡¿()«»"]/g, " ").replace(/\s+/g, " ").trim();
const comillas = (s: string) => [...s.matchAll(/«([^»]+)»/g)].map((m) => m[1]);

async function revisarComillas(donde: string, texto: string, refs: string[]) {
  for (const q of comillas(texto)) {
    const errores: string[] = [];
    const textos = await Promise.all(refs.map((r) => textoDe(r).catch((e: Error) => (errores.push(`${r}: ${e.message}`), null))));
    if (textos.some((t) => t && plano(t).includes(plano(q)))) continue;
    // si un capítulo no cargó, no es un error de la cita: se dice que no se pudo comprobar
    if (errores.length) mal(`${donde}: no se pudo comprobar «${q}» (${errores.join("; ")})`);
    else mal(`${donde}: «${q}» no coincide con la RV1960 de ${refs.join(", ") || "(sin citas)"}`);
  }
}

function revisarPregunta(donde: string, p: PreguntaObjetiva, lecciones: number, objetivos: Set<string>, ids: Set<string>) {
  if (ids.has(p.id)) mal(`${donde}: id repetido ${p.id}`);
  ids.add(p.id);
  if (p.leccion < 1 || p.leccion > lecciones) mal(`${p.id}: lección ${p.leccion} fuera de la materia`);
  if (!objetivos.has(p.objetivo)) mal(`${p.id}: objetivo ${p.objetivo} no está en el sílabo`);
  const opciones = [p.correcta, ...p.falsas].map((x) => x.trim().toLowerCase());
  if (new Set(opciones).size !== 4) mal(`${p.id}: opciones repetidas`);
  if (!p.explica.trim()) mal(`${p.id}: sin explicación`);
  if (!parsearCita(p.ref)) mal(`${p.id}: cita no válida «${p.ref}»`);
}

async function main() {
  const ids = new Set<string>();
  for (const m of todasLasMaterias().filter((x) => x.disponible)) {
    const objetivos = new Set((m.silabo?.objetivos ?? []).map((o) => o.id));
    if (!m.silabo) mal(`${m.id}: sin sílabo`);
    if (m.memoria && !parsearCita(m.memoria)) mal(`${m.id}: versículo de memoria no válido`);
    // el contenido
    for (const l of m.lecciones) {
      const c = CONTENIDO.get(l.id);
      if (!c) {
        mal(`${l.id}: sin contenido`);
        continue;
      }
      if (c.objetivos.length < 2) mal(`${l.id}: menos de 2 objetivos`);
      const refs = c.bloques.filter((b) => b.t === "versiculo").map((b) => (b as { ref: string }).ref);
      for (const r of refs) if (!parsearCita(r)) mal(`${l.id}: versículo no válido «${r}»`);
      if (!refs.length) mal(`${l.id}: sin versículos`);
      for (const b of c.bloques) if (b.t === "parrafo" || b.t === "nota") await revisarComillas(l.id, b.texto, refs);
      // los esquemas visuales (línea de tiempo, cuadro y pasos): su forma y sus referencias
      for (const b of c.bloques) {
        for (const x of problemasDeBloque(b)) mal(`${l.id}, esquema «${(b as { titulo?: string }).titulo ?? b.t}»: ${x}`);
        if (b.t === "linea") for (const e of b.eventos) if (e.ref && !parsearCita(e.ref)) mal(`${l.id}: referencia no válida en la línea de tiempo «${e.ref}»`);
      }
    }
    // el banco
    const banco = BANCOS.get(m.id);
    if (!banco) {
      mal(`${m.id}: sin banco`);
      continue;
    }
    for (const l of m.lecciones) {
      const rep = banco.repaso[l.id] ?? [];
      if (rep.length < 2) mal(`${l.id}: menos de 2 preguntas de repaso`);
      for (const p of rep) {
        revisarPregunta(l.id, p, m.lecciones.length, objetivos, ids);
        await revisarComillas(p.id, p.explica, [p.ref]);
      }
    }
    const medida = examenDe(m);
    if (banco.final.length < medida.banco) mal(`${m.id}: el banco del final tiene ${banco.final.length} (pide ${medida.banco})`);
    for (const p of banco.final) {
      revisarPregunta(m.id, p, m.lecciones.length, objetivos, ids);
      await revisarComillas(p.id, p.explica, [p.ref]);
    }
    for (let k = 1; k <= m.lecciones.length; k++) {
      const n = banco.final.filter((p) => p.leccion === k).length;
      if (n < Math.ceil(medida.objetivas / m.lecciones.length)) mal(`${m.id}: la lección ${k} tiene solo ${n} preguntas en el banco del final`);
    }
    for (const o of m.silabo?.objetivos ?? []) {
      const n = banco.final.filter((p) => p.objetivo === o.id).length;
      const deMemoria = /de memoria/i.test(o.texto);
      if (!deMemoria && n < 2) mal(`${m.id}: el objetivo ${o.id} se mide con ${n} preguntas (pide 2)`);
    }
    // las cortas sirven al final, a la suficiencia y al integral; en los Niveles 3 a 5 el final trae además un escrito breve
    const breves = medida.breves ?? 0;
    const cortas = banco.escritas.filter((e) => e.tipo === "corta").length;
    const largas = banco.escritas.filter((e) => e.tipo === "breve").length;
    if (cortas < Math.max(medida.escritas - breves, SUFICIENCIA.escritas)) mal(`${m.id}: faltan respuestas cortas en el final (tiene ${cortas})`);
    if (largas < breves) mal(`${m.id}: el final pide ${breves} escrito breve y el banco tiene ${largas}`);
    if (largas && !breves) mal(`${m.id}: el final de este nivel no lleva escritos breves`);
    for (const e of banco.escritas) {
      if (ids.has(e.id)) mal(`${m.id}: id repetido ${e.id}`);
      ids.add(e.id);
      for (const x of problemasDeClave(e)) mal(x);
      const n = e.modelo.split(/\s+/).filter(Boolean).length;
      const { min, max } = ESCRITA[e.tipo];
      if (n < min || n > max) mal(`${e.id}: la respuesta modelo tiene ${n} palabras (de ${min} a ${max})`);
    }
    // Nivel 2 en adelante: cada mini prueba con su banco de 18, de las lecciones de su grupo, y el escrito breve
    const minis = miniPruebasDe(m);
    for (const g of minis) {
      const lista = banco.mini?.[g.n] ?? [];
      if (lista.length < MINI_PRUEBA.banco) mal(`${m.id}: la mini prueba ${g.n} tiene ${lista.length} preguntas (pide ${MINI_PRUEBA.banco})`);
      for (const p of lista) {
        revisarPregunta(`${m.id} mini ${g.n}`, p, m.lecciones.length, objetivos, ids);
        if (!g.lecciones.includes(p.leccion)) mal(`${p.id}: es de la lección ${p.leccion}, fuera de la mini prueba ${g.n}`);
        await revisarComillas(p.id, p.explica, [p.ref]);
      }
      for (const k of g.lecciones) {
        if (lista.filter((p) => p.leccion === k).length < Math.ceil(MINI_PRUEBA.objetivas / g.lecciones.length)) mal(`${m.id}: la lección ${k} tiene pocas preguntas en la mini prueba ${g.n}`);
      }
    }
    if (tieneEscritoBreve(m)) {
      const b = banco.breve;
      if (!b) mal(`${m.id}: sin escrito breve`);
      else {
        if (b.tipo !== "breve") mal(`${b.id}: el escrito breve debe ser de tipo «breve»`);
        if (ids.has(b.id)) mal(`${m.id}: id repetido ${b.id}`);
        ids.add(b.id);
        for (const x of problemasDeClave(b)) mal(x);
        const n = b.modelo.split(/\s+/).filter(Boolean).length;
        if (n < ESCRITA.breve.min || n > ESCRITA.breve.max) mal(`${b.id}: la respuesta modelo tiene ${n} palabras (de ${ESCRITA.breve.min} a ${ESCRITA.breve.max})`);
      }
    }
    const extra = minis.length ? `, ${minis.map((g) => (banco.mini?.[g.n] ?? []).length).join(" y ")} de las mini pruebas${banco.breve ? " y el escrito breve" : ""}` : "";
    console.log(`✔ ${m.id}: ${m.lecciones.length} lecciones, ${Object.values(banco.repaso).flat().length} de repaso, ${banco.final.length} del final, ${banco.escritas.length} escritas${extra}`);
  }
  // el trabajo final de cada especialidad: de tipo «trabajo», con su clave y su respuesta modelo, y solo cuando la
  // especialidad tiene sus cinco materias listas
  for (const [espId, t] of TRABAJOS) {
    const e = ESPECIALIDADES.find((x) => x.id === espId);
    if (!e) {
      mal(`${t.id}: la especialidad ${espId} no existe`);
      continue;
    }
    if (!e.materias.every((m) => m.disponible)) mal(`${t.id}: la especialidad ${e.nombre} todavía no tiene sus materias listas`);
    if (t.tipo !== "trabajo") mal(`${t.id}: el trabajo final debe ser de tipo «trabajo»`);
    if (ids.has(t.id)) mal(`${t.id}: id repetido`);
    ids.add(t.id);
    for (const x of problemasDeClave(t)) mal(x);
    const n = t.modelo.split(/\s+/).filter(Boolean).length;
    if (n < ESCRITA.trabajo.min || n > ESCRITA.trabajo.max) mal(`${t.id}: la respuesta modelo tiene ${n} palabras (de ${ESCRITA.trabajo.min} a ${ESCRITA.trabajo.max})`);
    await revisarComillas(t.id, t.modelo, t.citas ?? []);
    console.log(`✔ ${t.id}: el trabajo final de ${e.nombre}, con su clave y una respuesta modelo de ${n} palabras`);
  }
  if (problemas.length) {
    console.error(`\n${problemas.length} problemas:`);
    for (const p of problemas) console.error(` ✖ ${p}`);
    process.exit(1);
  }
  console.log("\nTodo en orden.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
