/**
 * El director de la clase: la clase se escribe como un guion que se lee de arriba abajo («el maestro dice esto»,
 * «pregunta esto y espera», «felicita»…). Cada paso cambia lo que muestra la pantalla (la burbuja del maestro, el
 * rollo con las opciones, el reloj, la nota) y lo que pasa en el aula 3D, y espera lo que haga quien estudia (tocar
 * «Sigue», elegir una opción o que se acabe el reloj). Al cerrar el aula, el guion se corta solo.
 */
import type { MaestroId } from "@shared/aula";
import type { AulaEscena, ContenidoRollo, FaseAula, GestoMaestro, ReaccionAula } from "./escena";
import { sonidoAula } from "./aula-sonido";

export type Tono = "normal" | "bien" | "mal" | "suspenso" | "verso";

export type PreguntaVista = {
  n: number;
  de: number;
  etiqueta?: string;
  texto: string;
  opciones: string[];
  elegida: number | null;
  correcta: number | null;
  mala: number | null;
  tachadas: number[];
  /** Mientras no se puede tocar (se está corrigiendo o revisando). */
  bloqueada: boolean;
};

export type NotaVista = { aciertos: number; de: number; metal: 0 | 1 | 2 | 3; titulo: string; sub?: string; lineas: string[] };
export type AccionVista = { id: string; label: string; primaria?: boolean; disabled?: boolean };

export type VistaClase = {
  dice: { quien: MaestroId; texto: string; ref?: string; tono: Tono; n: number } | null;
  sigue: string | null;
  pregunta: PreguntaVista | null;
  reloj: { total: number; hasta: number } | null;
  nota: NotaVista | null;
  acciones: AccionVista[];
  progreso: string | null;
  cargando: boolean;
  error: string | null;
};

const VACIA: VistaClase = { dice: null, sigue: null, pregunta: null, reloj: null, nota: null, acciones: [], progreso: null, cargando: false, error: null };

/** Se lanza en los guiones cuando se cierra el aula (no es un error de verdad). */
export class AulaCerrada extends Error {
  constructor() {
    super("aula cerrada");
  }
}

export class Director {
  vista: VistaClase = { ...VACIA };
  escena: AulaEscena | null = null;
  maestro: MaestroId;
  /** El nombre de quien estudia (para las frases del maestro). */
  nombre: string;
  private oyentes = new Set<(v: VistaClase) => void>();
  private muerto = false;
  private alSeguir: (() => void) | null = null;
  private alElegir: ((i: number) => void) | null = null;
  private alAccion: ((id: string) => void) | null = null;
  private temporizadores = new Set<number>();
  private rechazos = new Set<(e: Error) => void>();
  private nDice = 0;
  private pararSuspenso: (() => void) | null = null;
  /** Para las pruebas en el navegador: responder rápido sin tocar. */
  rapido = false;

  constructor(maestro: MaestroId, nombre: string) {
    this.maestro = maestro;
    this.nombre = nombre;
  }

  get cerrado() {
    return this.muerto;
  }

  escuchar(fn: (v: VistaClase) => void): () => void {
    this.oyentes.add(fn);
    fn(this.vista);
    return () => {
      this.oyentes.delete(fn);
    };
  }

  private poner(cambio: Partial<VistaClase>) {
    if (this.muerto) return;
    this.vista = { ...this.vista, ...cambio };
    for (const fn of this.oyentes) fn(this.vista);
  }

  /** Corta el guion: lo que estaba esperando termina con AulaCerrada. */
  cerrar() {
    this.muerto = true;
    for (const t of this.temporizadores) window.clearTimeout(t);
    this.temporizadores.clear();
    this.pararSuspenso?.();
    this.pararSuspenso = null;
    const err = new AulaCerrada();
    for (const r of this.rechazos) r(err);
    this.rechazos.clear();
    this.oyentes.clear();
  }

  private promesa<T>(arma: (ok: (v: T) => void) => void): Promise<T> {
    if (this.muerto) return Promise.reject(new AulaCerrada());
    return new Promise<T>((resolve, reject) => {
      const rechazar = (e: Error) => reject(e);
      this.rechazos.add(rechazar);
      arma((v) => {
        this.rechazos.delete(rechazar);
        resolve(v);
      });
    });
  }

  esperar(ms: number): Promise<void> {
    return this.promesa<void>((ok) => {
      const t = window.setTimeout(() => {
        this.temporizadores.delete(t);
        ok();
      }, this.rapido ? Math.min(ms, 60) : ms);
      this.temporizadores.add(t);
    });
  }

  // ---------------------------------------------------------------- lo que ve la pantalla
  limpiar(cambio: Partial<VistaClase> = {}) {
    this.poner({ ...VACIA, progreso: this.vista.progreso, ...cambio });
  }

  progreso(texto: string | null) {
    this.poner({ progreso: texto });
  }

  cargando(on: boolean) {
    this.poner({ cargando: on });
  }

  error(texto: string | null) {
    this.poner({ error: texto, cargando: false });
  }

  /**
   * El maestro dice algo en su burbuja. Con `sigue` (el texto del botón), espera a que se toque; si no, sigue solo
   * cuando termina de leerse (o después de `ms`).
   */
  async decir(texto: string, o: { quien?: MaestroId; ref?: string; tono?: Tono; sigue?: string | null; ms?: number; gesto?: GestoMaestro } = {}): Promise<void> {
    if (this.muerto) throw new AulaCerrada();
    this.nDice++;
    const quien = o.quien ?? this.maestro;
    this.poner({ dice: { quien, texto, ref: o.ref, tono: o.tono ?? "normal", n: this.nDice }, sigue: o.sigue === undefined ? "Sigue" : o.sigue });
    this.escena?.gesto(o.gesto ?? "habla", Math.min(8, 1.2 + texto.length / 28));
    if (o.sigue === null) {
      await this.esperar(o.ms ?? Math.min(5200, 900 + texto.length * 35));
      return;
    }
    await this.promesa<void>((ok) => {
      this.alSeguir = () => {
        this.alSeguir = null;
        ok();
      };
      if (this.rapido) window.setTimeout(() => this.alSeguir?.(), 30);
    });
    this.poner({ sigue: null });
  }

  /** Se tocó «Sigue». */
  seguir() {
    this.alSeguir?.();
  }

  /** Muestra una pregunta en el rollo (escrita por la pluma) y espera la opción elegida, o -1 si se acaba el reloj. */
  async preguntar(p: Omit<PreguntaVista, "elegida" | "correcta" | "mala" | "tachadas" | "bloqueada"> & { tachadas?: number[] }, reloj: number, escribir = true): Promise<number> {
    if (this.muerto) throw new AulaCerrada();
    const pv: PreguntaVista = { ...p, elegida: null, correcta: null, mala: null, tachadas: p.tachadas ?? [], bloqueada: false };
    this.poner({ pregunta: pv, reloj: reloj > 0 ? { total: reloj, hasta: Date.now() + reloj * 1000 } : null, nota: null, acciones: [] });
    this.rollo(pv, escribir);
    if (escribir) sonidoAula.pluma(Math.min(3, 0.6 + (p.texto.length + p.opciones.join("").length) / 70));
    return this.promesa<number>((ok) => {
      let t = 0;
      const fin = (i: number) => {
        if (t) {
          window.clearTimeout(t);
          this.temporizadores.delete(t);
        }
        this.alElegir = null;
        ok(i);
      };
      this.alElegir = fin;
      if (reloj > 0) {
        t = window.setTimeout(() => fin(-1), reloj * 1000);
        this.temporizadores.add(t);
      }
      if (this.rapido) window.setTimeout(() => this.alElegir?.(Math.max(0, pv.opciones.findIndex((_, k) => !pv.tachadas.includes(k)))), 40);
    });
  }

  /** Muestra una pregunta ya contestada para revisarla (sin reloj y sin poder tocar), con la respuesta marcada. */
  verPregunta(p: Omit<PreguntaVista, "elegida" | "correcta" | "mala" | "tachadas" | "bloqueada">, elegida: number) {
    if (this.muerto) throw new AulaCerrada();
    const pv: PreguntaVista = { ...p, elegida: elegida >= 0 ? elegida : null, correcta: null, mala: null, tachadas: [], bloqueada: true };
    this.poner({ pregunta: pv, reloj: null, nota: null, acciones: [] });
    this.rollo(pv, false);
  }

  /** Se tocó una opción del rollo. */
  elegir(i: number) {
    const p = this.vista.pregunta;
    if (!p || p.bloqueada || p.tachadas.includes(i) || !this.alElegir) return;
    sonidoAula.elegir();
    this.marcar({ elegida: i, bloqueada: true });
    this.poner({ reloj: null });
    this.alElegir(i);
  }

  /** Cambia las marcas de la pregunta (la elegida, la buena, la mala, las tachadas). */
  marcar(m: Partial<PreguntaVista>) {
    const p = this.vista.pregunta;
    if (!p) return;
    const nueva = { ...p, ...m };
    this.poner({ pregunta: nueva });
    this.rollo(nueva, false);
  }

  private rollo(p: PreguntaVista, escribir: boolean) {
    const c: ContenidoRollo = { k: "pregunta", n: p.n, de: p.de, etiqueta: p.etiqueta, texto: p.texto, opciones: p.opciones, elegida: p.elegida, correcta: p.correcta, mala: p.mala, tachadas: p.tachadas };
    this.escena?.mostrar(c, escribir);
  }

  /** Escribe otra cosa en el gran rollo (un versículo, el título, la nota). */
  pizarra(c: ContenidoRollo, escribir = true) {
    this.escena?.mostrar(c, escribir);
    if (escribir && c.k === "verso") sonidoAula.pluma(Math.min(3, 0.6 + c.texto.length / 70));
  }

  quitarPregunta() {
    this.poner({ pregunta: null, reloj: null });
  }

  /** Botones para elegir qué sigue (al final de una clase); espera el que se toque. */
  async acciones(lista: AccionVista[]): Promise<string> {
    this.poner({ acciones: lista, sigue: null });
    const id = await this.promesa<string>((ok) => {
      this.alAccion = (x) => {
        this.alAccion = null;
        ok(x);
      };
      if (this.rapido) {
        const primera = lista.find((a) => !a.disabled);
        if (primera) window.setTimeout(() => this.alAccion?.(primera.id), 40);
      }
    });
    this.poner({ acciones: [] });
    return id;
  }

  accion(id: string) {
    this.alAccion?.(id);
  }

  nota(n: NotaVista | null) {
    this.poner({ nota: n });
  }

  // ---------------------------------------------------------------- lo que pasa en el aula
  fase(f: FaseAula) {
    this.escena?.setFase(f);
  }

  reaccion(r: ReaccionAula, parte?: number, dur?: number) {
    this.escena?.reaccion(r, parte, dur);
  }

  /** El suspenso de la última pregunta: luces bajas, redoble y latido, hasta que se revela. */
  suspenso(on: boolean) {
    if (on) {
      this.fase("suspenso");
      this.pararSuspenso?.();
      this.pararSuspenso = sonidoAula.suspenso();
    } else {
      this.pararSuspenso?.();
      this.pararSuspenso = null;
      sonidoAula.golpe();
    }
  }
}
