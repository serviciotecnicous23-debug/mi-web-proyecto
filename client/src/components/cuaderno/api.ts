// Lo que pide el cuaderno al servidor (server/cuaderno.ts). Es el mismo cuaderno en la academia y en la Biblioteca.
// El guardado es automático: se guarda un momento después de escribir; sin conexión queda en el teléfono y se manda al
// volver la conexión; si otro equipo guardó antes, no se pisa nada: lo de este equipo queda como copia.
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { BloqueCuaderno, CuadernoLista, NotaCompleta, NotaResumen, ResaltadoLeccion } from "@shared/cuaderno";

export class ErrorCuaderno extends Error {
  status: number;
  datos: any;
  constructor(mensaje: string, status: number, datos: any) {
    super(mensaje);
    this.status = status;
    this.datos = datos;
  }
}

export async function pedir<T>(metodo: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", url: string, cuerpo?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: metodo,
    headers: cuerpo !== undefined ? { "Content-Type": "application/json" } : {},
    body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    credentials: "include",
  });
  let datos: any = null;
  try {
    datos = await res.json();
  } catch {
    datos = null;
  }
  if (!res.ok) throw new ErrorCuaderno(datos?.message || "No se pudo completar. Inténtalo otra vez.", res.status, datos);
  return datos as T;
}

export type FiltrosCuaderno = { q?: string; materia?: string; etiqueta?: string; vista?: "todas" | "fijadas" | "papelera" };

export function useCuaderno(f: FiltrosCuaderno, activo = true) {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.materia) p.set("materia", f.materia);
  if (f.etiqueta) p.set("etiqueta", f.etiqueta);
  if (f.vista && f.vista !== "todas") p.set("vista", f.vista);
  return useQuery<CuadernoLista, ErrorCuaderno>({
    queryKey: ["cuaderno", "lista", f.q ?? "", f.materia ?? "", f.etiqueta ?? "", f.vista ?? "todas"],
    queryFn: () => pedir("GET", `/api/cuaderno${p.toString() ? `?${p}` : ""}`),
    enabled: activo,
    retry: false,
  });
}

export function useResaltados(materia?: string, activo = true) {
  return useQuery<ResaltadoLeccion[], ErrorCuaderno>({
    queryKey: ["cuaderno", "resaltados", materia ?? ""],
    queryFn: () => pedir("GET", `/api/cuaderno/resaltados${materia ? `?materia=${encodeURIComponent(materia)}` : ""}`),
    enabled: activo,
    retry: false,
  });
}

export function useCuadernoLeccion(leccionId: string | undefined, activo = true) {
  return useQuery<{ nota: NotaCompleta | null; resaltados: ResaltadoLeccion[] }, ErrorCuaderno>({
    queryKey: ["cuaderno", "leccion", leccionId],
    queryFn: () => pedir("GET", `/api/cuaderno/leccion/${encodeURIComponent(leccionId!)}`),
    enabled: activo && !!leccionId,
    retry: false,
  });
}

export type ApunteBiblia = NotaResumen & { versiculos: { desde: number; hasta: number }[] };
export function useApuntesBiblia(libro: string | undefined, capitulo: number | undefined, activo = true) {
  return useQuery<ApunteBiblia[], ErrorCuaderno>({
    queryKey: ["cuaderno", "biblia", libro, capitulo],
    queryFn: () => pedir("GET", `/api/cuaderno/biblia/${encodeURIComponent(libro!)}/${capitulo}`),
    enabled: activo && !!libro && !!capitulo,
    retry: false,
    staleTime: 30_000,
  });
}

/** El texto de unos versículos de la RV1960 (la misma Biblia de la web). */
export function useTextoBiblico(libro: string | undefined, capitulo: number | undefined) {
  return useQuery<{ verse: number; text: string }[]>({
    queryKey: ["biblia-capitulo", "rv1960", libro, capitulo],
    queryFn: async () => (await pedir<{ verses: { verse: number; text: string }[] }>("GET", `/api/bible/chapter/rv1960/${encodeURIComponent(libro!)}/${capitulo}`)).verses,
    enabled: !!libro && !!capitulo,
    staleTime: 24 * 3600_000,
  });
}

export const crearNota = (cuerpo: { titulo?: string; bloques?: BloqueCuaderno[]; materiaId?: string | null; leccionId?: string | null; plantilla?: string }) =>
  pedir<NotaCompleta>("POST", "/api/cuaderno/notas", cuerpo);
export const cambiarNota = (id: number, cuerpo: { fijada?: boolean; color?: string | null; etiquetas?: string[] }) => pedir<NotaCompleta>("PATCH", `/api/cuaderno/notas/${id}`, cuerpo);
export const borrarNota = (id: number, definitiva = false) => pedir<{ papelera?: boolean; borrada?: boolean }>("DELETE", `/api/cuaderno/notas/${id}${definitiva ? "?definitiva=1" : ""}`);
export const restaurarNota = (id: number) => pedir<NotaCompleta>("POST", `/api/cuaderno/notas/${id}/restaurar`);
export const agregarALeccion = (leccionId: string, bloques: BloqueCuaderno[]) => pedir<NotaCompleta>("POST", `/api/cuaderno/leccion/${encodeURIComponent(leccionId)}/agregar`, { bloques });
/** El resaltado queda también en la nota de la lección: la respuesta trae la nota al día. */
export const resaltar = (cuerpo: { leccionId: string; bloque: number; texto: string; color: string }) =>
  pedir<ResaltadoLeccion & { notaLeccion: NotaCompleta | null }>("POST", "/api/cuaderno/resaltados", cuerpo);
export const cambiarResaltado = (id: number, cuerpo: { color?: string; nota?: string | null }) => pedir<ResaltadoLeccion>("PATCH", `/api/cuaderno/resaltados/${id}`, cuerpo);
export const borrarResaltado = (id: number) => pedir<{ borrado: boolean }>("DELETE", `/api/cuaderno/resaltados/${id}`);

// ---------------------------------------------------------------- el guardado automático

export type EstadoGuardado = "guardado" | "guardando" | "pendiente" | "sin-conexion" | "conflicto" | "error";
type Pendiente = { titulo: string; bloques: BloqueCuaderno[]; version: number; cuando: number };
const CLAVE = (id: number) => `cuaderno:pendiente:${id}`;

function leerPendiente(id: number): Pendiente | null {
  try {
    const s = localStorage.getItem(CLAVE(id));
    return s ? (JSON.parse(s) as Pendiente) : null;
  } catch {
    return null;
  }
}
function guardarPendiente(id: number, p: Pendiente | null) {
  try {
    if (p) localStorage.setItem(CLAVE(id), JSON.stringify(p));
    else localStorage.removeItem(CLAVE(id));
  } catch {
    // (sin almacenamiento: se intenta guardar igual en el servidor)
  }
}

/**
 * La nota abierta en el editor: su título y sus bloques, que se guardan solos un momento después del último cambio.
 * Sin conexión queda guardada en el teléfono (localStorage) y se manda al volver la conexión o al abrirla otra vez.
 */
export function useNotaEditable(inicial: NotaCompleta | null, alGuardar?: (n: NotaCompleta) => void) {
  const qc = useQueryClient();
  const [nota, setNota] = useState<NotaCompleta | null>(inicial);
  const [estado, setEstado] = useState<EstadoGuardado>("guardado");
  const version = useRef(inicial?.version ?? 1);
  const temporizador = useRef<number | null>(null);
  const enVuelo = useRef(false);
  const otraVez = useRef(false);
  const ultima = useRef<NotaCompleta | null>(inicial);

  // al abrir otra nota (o al llegar la del servidor), se toma esa; si había algo pendiente en este equipo, se recupera
  useEffect(() => {
    if (!inicial) {
      setNota(null);
      ultima.current = null;
      return;
    }
    const pend = leerPendiente(inicial.id);
    if (pend && pend.version === inicial.version) {
      const recuperada = { ...inicial, titulo: pend.titulo, bloques: pend.bloques };
      setNota(recuperada);
      ultima.current = recuperada;
      version.current = inicial.version;
      setEstado("pendiente");
      programar(0);
    } else {
      if (pend) guardarPendiente(inicial.id, null);
      setNota(inicial);
      ultima.current = inicial;
      version.current = inicial.version;
      setEstado("guardado");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inicial?.id, inicial?.version]);

  const enviar = useCallback(async () => {
    const n = ultima.current;
    if (!n) return;
    if (enVuelo.current) {
      otraVez.current = true;
      return;
    }
    enVuelo.current = true;
    setEstado("guardando");
    try {
      const r = await pedir<NotaCompleta>("PUT", `/api/cuaderno/notas/${n.id}`, { titulo: n.titulo, bloques: n.bloques, version: version.current });
      version.current = r.version;
      guardarPendiente(n.id, null);
      setEstado(otraVez.current ? "pendiente" : "guardado");
      qc.invalidateQueries({ queryKey: ["cuaderno", "lista"] });
      alGuardar?.(r);
    } catch (e: any) {
      if (e instanceof ErrorCuaderno && e.status === 409 && e.datos?.conflicto && e.datos?.nota) {
        // otro equipo guardó antes: lo de este equipo queda como una copia, sin pisar nada
        try {
          const copia = await crearNota({ titulo: `${n.titulo || "Nota"} (copia de este equipo)`, bloques: n.bloques, materiaId: n.materiaId, leccionId: n.leccionId });
          guardarPendiente(n.id, null);
          setEstado("conflicto");
          qc.invalidateQueries({ queryKey: ["cuaderno"] });
          alGuardar?.(copia);
        } catch {
          setEstado("error");
        }
      } else if (!navigator.onLine || !(e instanceof ErrorCuaderno)) {
        guardarPendiente(n.id, { titulo: n.titulo, bloques: n.bloques, version: version.current, cuando: Date.now() });
        setEstado("sin-conexion");
      } else {
        guardarPendiente(n.id, { titulo: n.titulo, bloques: n.bloques, version: version.current, cuando: Date.now() });
        setEstado("error");
      }
    } finally {
      enVuelo.current = false;
      if (otraVez.current) {
        otraVez.current = false;
        void enviar();
      }
    }
  }, [qc, alGuardar]);

  const programar = useCallback(
    (ms = 900) => {
      if (temporizador.current) window.clearTimeout(temporizador.current);
      temporizador.current = window.setTimeout(() => void enviar(), ms);
    },
    [enviar],
  );

  /** Cambia la nota (el título o los bloques) y programa el guardado. */
  const cambiar = useCallback(
    (f: (n: NotaCompleta) => NotaCompleta) => {
      setNota((n) => {
        if (!n) return n;
        const nueva = f(n);
        ultima.current = nueva;
        guardarPendiente(nueva.id, { titulo: nueva.titulo, bloques: nueva.bloques, version: version.current, cuando: Date.now() });
        return nueva;
      });
      setEstado("pendiente");
      programar();
    },
    [programar],
  );

  // al volver la conexión se manda lo pendiente; al salir, se intenta guardar lo último
  useEffect(() => {
    const alVolver = () => {
      if (ultima.current && leerPendiente(ultima.current.id)) programar(0);
    };
    window.addEventListener("online", alVolver);
    return () => {
      window.removeEventListener("online", alVolver);
      if (temporizador.current) {
        window.clearTimeout(temporizador.current);
        if (ultima.current && leerPendiente(ultima.current.id)) void enviar();
      }
    };
  }, [enviar, programar]);

  return { nota, estado, cambiar, guardarYa: () => programar(0) };
}
