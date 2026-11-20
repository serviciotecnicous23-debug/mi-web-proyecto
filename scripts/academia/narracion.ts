/**
 * La narración grabada de las lecciones (docs/academia.md, «La voz de las lecciones»).
 *
 *   npx tsx scripts/academia/narracion.ts estimar
 *       Cuántas palabras y minutos de audio tiene cada nivel (los versículos se estiman), y cuánto pesaría.
 *   npx tsx scripts/academia/narracion.ts guion <carpeta> <nivel 1-5 | especialidades | materia | lección>...
 *       Escribe <carpeta>/<lección>.json con el guion que dice la voz (los versículos, de la RV1960 de la web publicada).
 *   npx tsx scripts/academia/narracion.ts registrar <carpeta> [--r2 <depósito> --base <dirección pública>]
 *       Toma los audios grabados (<lección>.m4a y <lección>.marcas.json, que deja scripts/academia/voz/narrar.py), los
 *       copia a client/public/voz/academia/ con su huella en el nombre y escribe server/academia/narraciones.ts.
 *       Con --r2 los sube a Cloudflare R2 (con Wrangler, que usa la autorización guardada por `npx wrangler login`) a
 *       <depósito>/academia/<archivo>, y el registro guarda la dirección <base>/academia/<archivo>.
 */
import { execSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CONTENIDO } from "../../server/academia/index";
import { leccionPorId, todasLasMaterias, type MateriaDef } from "../../shared/academia";
import { parsearCita } from "../../shared/citas";
import { guionDeLeccion, huellaDeLeccion, type LeccionNarrable, type Narracion } from "../../shared/narracion";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WEB = process.env.WEB_PUBLICADA || "https://ministerioavivandoelfuego.com";
const CACHE = path.join(RAIZ, "node_modules", ".cache", "narracion-biblia.json");
const AUDIOS = path.join(RAIZ, "client", "public", "voz", "academia");
const REGISTRO = path.join(RAIZ, "server", "academia", "narraciones.ts");
/** Palabras por segundo de la voz elegida (medido en las muestras) y kilobits por segundo del audio. */
const PALABRAS_POR_SEGUNDO = 2.4;
const KBPS = 40;

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));
let cache: Record<string, { verse: number; text: string }[]> = {};
try {
  cache = JSON.parse(fs.readFileSync(CACHE, "utf8"));
} catch {
  // (sin caché todavía)
}

/** Un capítulo de la RV1960 de la web publicada (nunca el respaldo: con otra versión no se graba). */
async function capitulo(libro: string, cap: number) {
  const clave = `${libro} ${cap}`;
  if (cache[clave]) return cache[clave];
  for (let intento = 0; intento < 4; intento++) {
    const r = await fetch(`${WEB}/api/bible/chapter/rv1960/${encodeURIComponent(libro)}/${cap}`, { headers: { "User-Agent": "academia-narracion" } });
    if (r.status === 429) {
      await esperar(Number(r.headers.get("retry-after") || 20) * 1000);
      continue;
    }
    const d: any = await r.json();
    if (!r.ok || d.version !== "rv1960" || d.fallbackFrom) throw new Error(`${clave}: no llegó la RV1960 (${r.status} ${d.version ?? d.message ?? ""})`);
    cache[clave] = d.verses;
    fs.mkdirSync(path.dirname(CACHE), { recursive: true });
    fs.writeFileSync(CACHE, JSON.stringify(cache));
    await esperar(600);
    return cache[clave];
  }
  throw new Error(`${clave}: la web respondió 429 varias veces`);
}

/** La lección como la narra la voz: el contenido y el texto de cada versículo. */
async function narrable(leccionId: string, conBiblia: boolean): Promise<LeccionNarrable> {
  const l = leccionPorId(leccionId);
  const c = CONTENIDO.get(leccionId);
  if (!l || !c) throw new Error(`No existe la lección ${leccionId}`);
  const bloques = [];
  for (const b of c.bloques) {
    if (b.t !== "versiculo") {
      bloques.push(b);
      continue;
    }
    const cita = parsearCita(b.ref);
    if (!cita) throw new Error(`${leccionId}: no se entiende la cita «${b.ref}»`);
    let texto: string;
    if (conBiblia) {
      const vs = (await capitulo(cita.libro, cita.capitulo)).filter((v) => v.verse >= cita.desde && v.verse <= cita.hasta);
      if (vs.length !== cita.hasta - cita.desde + 1) throw new Error(`${leccionId}: faltan versículos de ${b.ref}`);
      texto = vs.map((v) => v.text.trim()).join(" ");
    } else {
      texto = "palabra ".repeat(26 * (cita.hasta - cita.desde + 1)); // un versículo tiene unas 26 palabras
    }
    bloques.push({ t: "versiculo" as const, ref: b.ref, texto });
  }
  return {
    materia: l.materia.titulo,
    titulo: l.leccion.titulo,
    n: l.indice + 1,
    objetivos: c.objetivos,
    paraEmpezar: c.paraEmpezar,
    bloques,
    ideaClave: c.ideaClave,
    paraLaVida: c.paraLaVida,
  };
}

/** Las lecciones publicadas que piden: un nivel («1»), una materia o una lección. */
function lecciones(pedidos: string[]): string[] {
  const materias = todasLasMaterias().filter((m) => m.disponible);
  const ids = new Set<string>();
  for (const p of pedidos) {
    const n = Number(p);
    const delNivel = Number.isInteger(n) && n >= 1 && n <= 5 ? materias.filter((m) => m.nivel === n) : p === "especialidades" ? materias.filter((m) => m.nivel == null) : [];
    const deMateria = materias.filter((m) => m.id === p);
    const ms: MateriaDef[] = [...delNivel, ...deMateria];
    if (ms.length) ms.forEach((m) => m.lecciones.forEach((l) => CONTENIDO.has(l.id) && ids.add(l.id)));
    else if (CONTENIDO.has(p)) ids.add(p);
    else throw new Error(`No encuentro «${p}» (nivel, materia o lección)`);
  }
  return [...ids];
}

const palabras = (partes: { texto: string }[]) => partes.reduce((s, p) => s + p.texto.split(/\s+/).filter(Boolean).length, 0);
const minutosDe = (pal: number, pausas: number) => (pal / PALABRAS_POR_SEGUNDO + pausas) / 60;

async function estimar() {
  const materias = todasLasMaterias().filter((m) => m.disponible);
  const grupos = new Map<string, MateriaDef[]>();
  for (const m of materias) {
    const g = m.nivel ? `Nivel ${m.nivel}` : "Especialidades";
    grupos.set(g, [...(grupos.get(g) ?? []), m]);
  }
  let total = { lecciones: 0, minutos: 0 };
  console.log("grupo | lecciones | minutos de audio | promedio por lección | MB a 40 kbps");
  for (const [g, ms] of grupos) {
    let n = 0;
    let min = 0;
    for (const m of ms)
      for (const l of m.lecciones) {
        if (!CONTENIDO.has(l.id)) continue;
        const partes = guionDeLeccion(await narrable(l.id, false));
        min += minutosDe(palabras(partes), partes.reduce((s, p) => s + p.pausa, 0));
        n++;
      }
    total = { lecciones: total.lecciones + n, minutos: total.minutos + min };
    console.log(`${g} | ${n} | ${min.toFixed(0)} | ${(min / n).toFixed(1)} | ${((min * 60 * KBPS) / 8 / 1024).toFixed(0)}`);
  }
  console.log(`Total | ${total.lecciones} | ${total.minutos.toFixed(0)} (${(total.minutos / 60).toFixed(1)} h) | ${(total.minutos / total.lecciones).toFixed(1)} | ${((total.minutos * 60 * KBPS) / 8 / 1024).toFixed(0)}`);
}

async function guion(carpeta: string, pedidos: string[]) {
  fs.mkdirSync(carpeta, { recursive: true });
  let pal = 0;
  let min = 0;
  for (const id of lecciones(pedidos)) {
    const l = await narrable(id, true);
    const partes = guionDeLeccion(l);
    const p = palabras(partes);
    pal += p;
    min += minutosDe(p, partes.reduce((s, x) => s + x.pausa, 0));
    fs.writeFileSync(path.join(carpeta, `${id}.json`), JSON.stringify({ leccionId: id, huella: huellaDeLeccion(l), partes }, null, 1));
    console.log(`${id}: ${partes.length} partes, ${p} palabras`);
  }
  console.log(`Listo: ${pal} palabras, unos ${min.toFixed(0)} minutos de audio.`);
}

/** Sube un audio a R2 con Wrangler (sin claves: usa la autorización de `npx wrangler login`). */
function subirAR2(deposito: string, clave: string, ruta: string) {
  const args = ["wrangler", "r2", "object", "put", `${deposito}/${clave}`, "--file", ruta, "--content-type", "audio/mp4", "--cache-control", "public, max-age=31536000, immutable", "--remote"];
  // (en Windows npx es un .cmd y necesita la consola: se arma el comando con comillas)
  execSync(["npx", ...args.map((a) => (/[\s,]/.test(a) ? `"${a}"` : a))].join(" "), { stdio: ["ignore", "ignore", "inherit"] });
}

/** Borra un audio viejo de R2 (cuando la lección se grabó de nuevo): lo que no se pueda borrar solo se avisa. */
function borrarDeR2(deposito: string, clave: string) {
  try {
    execSync(["npx", "wrangler", "r2", "object", "delete", `${deposito}/${clave}`, "--remote"].join(" "), { stdio: ["ignore", "ignore", "ignore"] });
  } catch {
    console.log(`(no se pudo borrar ${clave} de R2: queda sin uso)`);
  }
}

function registrar(carpeta: string, r2?: { deposito: string; base: string }) {
  const previas: Record<string, Narracion> = {};
  if (fs.existsSync(REGISTRO)) {
    const m = /export const NARRACIONES: Record<string, Narracion> = (\{[\s\S]*\});/.exec(fs.readFileSync(REGISTRO, "utf8"));
    if (m) Object.assign(previas, JSON.parse(m[1]));
  }
  fs.mkdirSync(AUDIOS, { recursive: true });
  let nuevas = 0;
  for (const f of fs.readdirSync(carpeta).filter((x) => x.endsWith(".marcas.json"))) {
    const d = JSON.parse(fs.readFileSync(path.join(carpeta, f), "utf8")) as { leccionId: string; huella: string; segundos: number; voz: string; marcas: [string, number][] };
    const audio = path.join(carpeta, `${d.leccionId}.m4a`);
    if (!fs.existsSync(audio)) throw new Error(`Falta ${audio}`);
    // la huella del contenido de hoy: si la lección cambió después de grabarla, no se registra
    const hoy = huellaDeLeccion({ ...(leccionPlana(d.leccionId)) });
    if (hoy !== d.huella) {
      console.log(`${d.leccionId}: la lección cambió desde que se grabó (huella ${d.huella} → ${hoy}); no se registra`);
      continue;
    }
    // el nombre lleva la huella del propio audio: si se graba otra vez, cambia, y nadie se queda con el viejo en la caché
    const huellaAudio = crypto.createHash("sha1").update(fs.readFileSync(audio)).digest("hex").slice(0, 8);
    const archivo = `${d.leccionId}-${huellaAudio}.m4a`;
    const anterior = previas[d.leccionId];
    if (anterior && anterior.archivo !== archivo && !anterior.url) fs.rmSync(path.join(AUDIOS, anterior.archivo), { force: true });
    if (r2) {
      // en R2: se sube una sola vez (el nombre cambia si el audio cambia)
      if (!(anterior?.url && anterior.archivo === archivo)) {
        subirAR2(r2.deposito, `academia/${archivo}`, audio);
        if (anterior?.url && anterior.archivo !== archivo) borrarDeR2(r2.deposito, `academia/${anterior.archivo}`);
      }
      previas[d.leccionId] = { archivo, url: `${r2.base.replace(/\/+$/, "")}/academia/${archivo}`, huella: d.huella, segundos: d.segundos, voz: d.voz, marcas: d.marcas };
      console.log(`${d.leccionId}: en R2`);
    } else {
      fs.copyFileSync(audio, path.join(AUDIOS, archivo));
      previas[d.leccionId] = { archivo, huella: d.huella, segundos: d.segundos, voz: d.voz, marcas: d.marcas };
    }
    nuevas++;
  }
  const orden = Object.fromEntries(Object.entries(previas).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(
    REGISTRO,
    `// Generado por scripts/academia/narracion.ts («registrar»): no editar a mano.\n` +
      `// Las lecciones con narración grabada: el audio (client/public/voz/academia/ o su dirección en R2), la huella del contenido con que se\n` +
      `// grabó, cuánto dura y dónde empieza cada lugar de la página (docs/academia.md, «La voz de las lecciones»).\n` +
      `import type { Narracion } from "@shared/narracion";\n\n` +
      `export const NARRACIONES: Record<string, Narracion> = ${JSON.stringify(orden)};\n`,
  );
  console.log(`Registradas ${nuevas} (en total ${Object.keys(orden).length}).`);
}

/** La lección para la huella (sin el texto de la Biblia, que no entra en la huella). */
function leccionPlana(id: string): LeccionNarrable {
  const l = leccionPorId(id);
  const c = CONTENIDO.get(id);
  if (!l || !c) throw new Error(`No existe la lección ${id}`);
  return { materia: l.materia.titulo, titulo: l.leccion.titulo, n: l.indice + 1, objetivos: c.objetivos, paraEmpezar: c.paraEmpezar, bloques: c.bloques, ideaClave: c.ideaClave, paraLaVida: c.paraLaVida };
}

const [orden, ...resto] = process.argv.slice(2);
(async () => {
  if (orden === "estimar") await estimar();
  else if (orden === "guion" && resto.length >= 2) await guion(path.resolve(resto[0]), resto.slice(1));
  else if (orden === "registrar" && resto[0]) {
    const valor = (nombre: string) => {
      const i = resto.indexOf(nombre);
      return i >= 0 ? resto[i + 1] : undefined;
    };
    const deposito = valor("--r2");
    const base = valor("--base");
    if (deposito && !base) throw new Error("Con --r2 hace falta --base <dirección pública del depósito>");
    registrar(path.resolve(resto[0]), deposito && base ? { deposito, base } : undefined);
  }
  else {
    console.log("Uso: narracion.ts estimar | guion <carpeta> <nivel|materia|lección>... | registrar <carpeta> [--r2 <depósito> --base <dirección>]");
    process.exitCode = 1;
  }
})().catch((e) => {
  console.error(e.message ?? e);
  process.exitCode = 1;
});
