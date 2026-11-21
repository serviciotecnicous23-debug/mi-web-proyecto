/**
 * Lo que las páginas de la academia necesitan saber del catálogo sin bajarlo entero (shared/academia.ts pesa cientos
 * de kB; las páginas importan solo shared/academia-base.ts):
 *
 * - GET /api/academia/mapa: el título, el nivel y las lecciones de cada materia, y el nombre de cada nivel con cuántas
 *   materias tiene. Lo usan los exámenes (el final, la suficiencia, las mini pruebas y el integral) para su título y su
 *   «Volver».
 * - GET /api/academia/buscador: lo que el buscador del catálogo encuentra en cada materia, además de su título y su
 *   resumen (sus pasajes, su versículo, su propósito, sus lecciones y su bibliografía).
 *
 * Los dos son iguales para todos y solo cambian al publicar: se arman una vez y el navegador los guarda con su huella
 * (ETag), así que al volver solo pregunta si cambiaron. Se ven como el catálogo: con la academia abierta, también sin
 * cuenta.
 *
 * Aquí está también lo que la página de una materia recibe del catálogo con la materia (GET /api/academia/materia/:id,
 * en server/academia.ts): su nivel o su especialidad, y las materias de ese grupo que ya se pueden estudiar.
 */
import type { Express, Request, Response } from "express";
import { ESPECIALIDADES, NIVELES, todasLasMaterias, type BuscadorMateria, type MapaAcademia, type MateriaDef, type MateriaDetalle } from "@shared/academia";
import { accesoDe, MENSAJE_CERRADA } from "./academia-comun";
import { practicasDeMateria } from "./academia/laboratorio/index";

/** El nivel de una materia (o, si es de una especialidad, la especialidad). */
export function lugarDeMateria(m: MateriaDef): MateriaDetalle["lugar"] {
  const nv = m.nivel ? NIVELES.find((n) => n.n === m.nivel) : undefined;
  const esp = m.nivel ? undefined : ESPECIALIDADES.find((e) => e.id === m.especialidad);
  return {
    nivel: nv ? { n: nv.n, nombre: nv.nombre, para: nv.para } : null,
    especialidad: esp ? { id: esp.id, nombre: esp.nombre } : null,
  };
}

/** Las otras materias de su nivel o de su especialidad que ya se pueden estudiar (las muestra una materia en preparación). */
export function abiertasJunto(m: MateriaDef): MateriaDetalle["abiertas"] {
  const grupo = m.nivel ? NIVELES.find((n) => n.n === m.nivel)?.materias : ESPECIALIDADES.find((e) => e.id === m.especialidad)?.materias;
  return (grupo ?? []).filter((x) => x.disponible && x.id !== m.id).map((x) => ({ id: x.id, titulo: x.titulo }));
}

let mapa: MapaAcademia | null = null;
let buscador: Record<string, BuscadorMateria> | null = null;

export function mapaDeLaAcademia(): MapaAcademia {
  if (mapa) return mapa;
  mapa = {
    niveles: NIVELES.map((n) => ({ n: n.n, nombre: n.nombre, materias: n.materias.length })),
    materias: Object.fromEntries(todasLasMaterias().map((m) => [m.id, { titulo: m.titulo, nivel: m.nivel, lecciones: m.lecciones.length }])),
  };
  return mapa;
}

export function buscadorDeLaAcademia(): Record<string, BuscadorMateria> {
  if (buscador) return buscador;
  buscador = Object.fromEntries(
    todasLasMaterias().map((m): [string, BuscadorMateria] => {
      const b = m.silabo?.bibliografia;
      return [
        m.id,
        {
          base: m.base,
          memoria: m.memoria,
          proposito: m.silabo?.proposito,
          lecciones: m.lecciones.map((l) => l.titulo),
          libros: [...(b?.basica ?? []), ...(b?.complementaria ?? [])].map((l) => ({ autor: l.autor, titulo: l.titulo })),
          ...(practicasDeMateria(m.id).length ? { practicas: practicasDeMateria(m.id).map((p) => p.titulo) } : {}),
        },
      ];
    }),
  );
  return buscador;
}

/** Responde lo que arma `armar`, con la academia visible, y deja que el navegador lo guarde con su huella. */
const ruta = (nombre: string, armar: () => unknown) => async (req: Request, res: Response) => {
  try {
    const acceso = await accesoDe(req);
    if (!acceso.ver) return res.status(403).json({ message: MENSAJE_CERRADA });
    // (Express pone la huella y responde 304 si no cambió)
    res.setHeader("Cache-Control", "private, no-cache");
    res.json(armar());
  } catch (err) {
    console.error(`[academia] ${nombre}:`, err);
    res.sendStatus(500);
  }
};

export function registerAcademiaMapaRoutes(app: Express) {
  app.get("/api/academia/mapa", ruta("mapa", mapaDeLaAcademia));
  app.get("/api/academia/buscador", ruta("buscador", buscadorDeLaAcademia));
}
