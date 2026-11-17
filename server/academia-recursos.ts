/**
 * Los recursos de estudio de toda la academia (página /academia/recursos): los videos y audios de cada lección, los
 * recursos del sílabo de cada materia (videos, lecturas y guías) y sus lecturas ampliadas, para buscarlos en un solo
 * lugar. Se arma una vez (el contenido no cambia mientras el servidor corre). Se ve como el catálogo: con la academia
 * abierta, también sin cuenta.
 */
import type { Express } from "express";
import { ESPECIALIDADES, NIVELES } from "@shared/academia";
import type { RecursoListado, RecursosAcademia } from "@shared/academia-recursos";
import { CONTENIDO } from "./academia/index";
import { accesoDe, MENSAJE_CERRADA } from "./academia-comun";

let lista: RecursoListado[] | null = null;

export function recursosDeLaAcademia(): RecursoListado[] {
  if (lista) return lista;
  const out: RecursoListado[] = [];
  const materias = [
    ...NIVELES.flatMap((n) => n.materias.map((m) => ({ m, lugar: `Nivel ${n.n}`, nivel: n.n as number | null }))),
    ...ESPECIALIDADES.flatMap((e) => e.materias.map((m) => ({ m, lugar: e.nombre, nivel: null as number | null }))),
  ].filter((x) => x.m.disponible);
  for (const { m, lugar, nivel } of materias) {
    const materia = { id: m.id, titulo: m.titulo, lugar, nivel };
    const vistos = new Set<string>();
    m.lecciones.forEach((l, i) => {
      for (const b of CONTENIDO.get(l.id)?.bloques ?? []) {
        if (b.t !== "video" && b.t !== "audio") continue;
        if (vistos.has(b.url)) continue;
        vistos.add(b.url);
        out.push({
          tipo: b.t,
          titulo: b.titulo,
          fuente: b.t === "video" ? b.fuente : "Academia Avivando el Fuego",
          url: b.url,
          minutos: b.t === "video" ? b.minutos ?? null : null,
          materia,
          leccion: { id: l.id, n: i + 1, titulo: l.titulo },
        });
      }
    });
    for (const r of m.silabo?.recursos ?? []) {
      if (r.url && vistos.has(r.url)) continue;
      if (r.url) vistos.add(r.url);
      out.push({ tipo: r.tipo, titulo: r.titulo, fuente: r.fuente, url: r.url ?? null, minutos: r.minutos ?? null, materia, leccion: null });
    }
    const a = m.silabo?.ampliada;
    if (a) out.push({ tipo: "ampliada", titulo: `Lectura ampliada: ${a.lectura}`, fuente: a.fuente, url: a.url ?? null, minutos: a.minutos, materia, leccion: null });
  }
  lista = out;
  return out;
}

export function registerAcademiaRecursosRoutes(app: Express) {
  app.get("/api/academia/recursos", async (req, res) => {
    try {
      const acceso = await accesoDe(req);
      if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
      const out: RecursosAcademia = { recursos: recursosDeLaAcademia() };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] recursos:", err);
      res.sendStatus(500);
    }
  });
}
