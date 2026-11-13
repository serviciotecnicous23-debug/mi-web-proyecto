/**
 * Los juegos de grupo tradicionales (lotería, generala, escaleras de Jacob, damas chinas, memoria y «Basta») dentro del
 * marco de mesas del patio (shared/mesa.ts, `JuegoDeMesa`).
 *
 * Estos juegos llevan su propio reloj: el cantor de la lotería saca una carta cada pocos segundos, el «Basta» cierra la
 * ronda, la memoria tapa las cartas, y los compañeros de la computadora juegan con su ritmo (marcan, piensan, dudan).
 * Por eso cada módulo (shared/mesa/<juego>.ts) decide sus turnos, sus relojes y a sus compañeros, y la sala solo lo pone
 * al día con la hora (`alTiempo` y `proximoCambio`): para la sala, nadie «tiene que jugar» (`pendientes` vacío).
 *
 * El estado guarda también los nombres de los asientos (para el título del final: «¡Lotería de Ana!»).
 */
import type { Verso } from "../ciudad";
import type { Azar, FinMesa, ModuloMesa, Nivel } from "./comun";
import { JUEGOS_MESA, ORDEN_MESAS, opcionesValidas, type JuegoMesaId, type OpcionMesa } from "./juegos";
import { loteria } from "./loteria";
import { generala } from "./generala";
import { escaleras } from "./escaleras";
import { damasChinas } from "./damas-chinas";
import { memoria } from "./memoria";
import { basta } from "./basta";

type AsientoT = { n: number; nombre: string; bot: Nivel | null };
type ResultadoT = { ganadores: number[]; puntos: number[]; detalle: string[]; titulo: string };
/** El estado en la sala: el del módulo y los nombres de los asientos. */
export type EstadoTradicional = { m: unknown; nombres: string[] };

export type JuegoTradicional = {
  id: JuegoMesaId;
  nombre: string;
  icono: string;
  corto: string;
  como: string[];
  verso: Verso;
  min: number;
  max: number;
  modo: "todos";
  relojMs: number;
  opciones: OpcionMesa[];
  /** La pantalla del juego trae su reloj, sus asientos y quién juega: la sala no los repite. */
  pantallaCompleta: true;
  estadoInicial(asientos: AsientoT[], azar: Azar, opciones?: Record<string, unknown>, ahora?: number): EstadoTradicional;
  turnoDe(e: EstadoTradicional): number | null;
  pendientes(e: EstadoTradicional): number[];
  jugadasValidas(e: EstadoTradicional, asiento: number): unknown[];
  esValida(e: EstadoTradicional, asiento: number, j: unknown): boolean;
  /** Por qué no vale una jugada (para decírselo a la persona), o null si vale. */
  porQueNo(e: EstadoTradicional, asiento: number, j: unknown, ahora?: number): string | null;
  aplicar(e: EstadoTradicional, asiento: number, j: unknown, azar: Azar, ahora?: number): EstadoTradicional;
  terminado(e: EstadoTradicional): ResultadoT | null;
  vistaPara(e: EstadoTradicional, asiento: number | null, ahora?: number): unknown;
  jugadaDeBot(e: EstadoTradicional, asiento: number, nivel: Nivel, azar: Azar): unknown;
  alTiempo(e: EstadoTradicional, ahora: number, azar: Azar): EstadoTradicional | null;
  proximoCambio(e: EstadoTradicional, ahora: number): number | null;
};

type ModuloConVista = ModuloMesa<unknown, unknown, unknown, Record<string, unknown>> & {
  vistaPara(e: unknown, a: number | null, ahora: number): unknown;
  jugadaDeBot(e: unknown, a: number, nivel: Nivel, azar: Azar): unknown;
};

const MODULOS: Record<JuegoMesaId, ModuloConVista> = {
  loteria: loteria as unknown as ModuloConVista,
  generala: generala as unknown as ModuloConVista,
  escaleras: escaleras as unknown as ModuloConVista,
  "damas-chinas": damasChinas as unknown as ModuloConVista,
  memoria: memoria as unknown as ModuloConVista,
  basta: basta as unknown as ModuloConVista,
};

/** El título del final con los nombres («¡Lotería de @2!» → «¡Lotería de Ana!»). */
export const tituloConNombres = (titulo: string, nombres: string[]) => titulo.replace(/@(\d+)/g, (_, i) => nombres[Number(i)] ?? "alguien");

function resultado(f: FinMesa, nombres: string[]): ResultadoT {
  return {
    ganadores: f.puestos.map((p, a) => (p === 1 ? a : -1)).filter((a) => a >= 0),
    puntos: f.puntos,
    detalle: f.detalle,
    titulo: tituloConNombres(f.titulo, nombres),
  };
}

function aMesa(id: JuegoMesaId): JuegoTradicional {
  const mod = MODULOS[id];
  const def = JUEGOS_MESA[id];
  const leer = (j: unknown) => mod.leerJugada(j);
  const probar = (e: EstadoTradicional, a: number, j: unknown, ahora: number) => {
    const x = leer(j);
    if (x == null) return { ok: false as const, motivo: "Esa jugada no se entiende." };
    // el azar no importa para saber si vale (los dados se tiran de verdad al aplicar)
    return mod.aplicar(e.m, a, x, ahora, () => 0.5);
  };
  return {
    id,
    nombre: def.nombre,
    icono: def.icono,
    corto: def.corto,
    como: def.como,
    verso: def.verso,
    min: mod.min,
    max: mod.max,
    modo: "todos",
    relojMs: 0,
    opciones: def.opciones,
    pantallaCompleta: true,
    estadoInicial(asientos, azar, opciones, ahora = Date.now()) {
      return {
        m: mod.estadoInicial({ bots: asientos.map((x) => x.bot), opciones: opcionesValidas(id, opciones) }, azar, ahora),
        nombres: asientos.map((x) => x.nombre),
      };
    },
    turnoDe: () => null,
    pendientes: () => [],
    jugadasValidas(e, a) {
      return mod.jugadasValidas(e.m, a, Date.now());
    },
    esValida(e, a, j) {
      return probar(e, a, j, Date.now()).ok;
    },
    porQueNo(e, a, j, ahora = Date.now()) {
      const r = probar(e, a, j, ahora);
      return r.ok ? null : r.motivo;
    },
    aplicar(e, a, j, azar, ahora = Date.now()) {
      const x = leer(j);
      if (x == null) return e;
      const r = mod.aplicar(e.m, a, x, ahora, azar);
      return r.ok ? { ...e, m: r.e } : e;
    },
    terminado(e) {
      const f = mod.terminado(e.m);
      return f ? resultado(f, e.nombres) : null;
    },
    vistaPara(e, a, ahora = Date.now()) {
      return mod.vistaPara(e.m, a, ahora);
    },
    jugadaDeBot(e, a, nivel, azar) {
      return mod.jugadaDeBot(e.m, a, nivel, azar);
    },
    alTiempo(e, ahora, azar) {
      const x = mod.alTiempo(e.m, ahora, azar);
      return x ? { ...e, m: x } : null;
    },
    proximoCambio(e, ahora) {
      return mod.proximoCambio(e.m, ahora);
    },
  };
}

export const MESAS_TRADICIONALES: JuegoTradicional[] = ORDEN_MESAS.map(aMesa);
export const MESA_TRADICIONAL = Object.fromEntries(MESAS_TRADICIONALES.map((j) => [j.id, j])) as Record<JuegoMesaId, JuegoTradicional>;
