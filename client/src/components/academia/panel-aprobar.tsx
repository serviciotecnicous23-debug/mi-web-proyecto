// Aprobar en el panel de la academia con un toque (docs/academia-panel.md): la declaración de fe, una materia o varias
// a la vez. Todo pasa en una ventana que aparece encima (en el teléfono se ve entera): qué se aprueba, un interruptor
// grande para confirmar que se leyó, notas opcionales y el botón, siempre a la vista. Si algo no deja aprobar (las
// observaciones abiertas de una materia) se dice ahí mismo, con el botón para ir a resolverlo.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PUNTOS_A_CONFIRMAR } from "@shared/academia-declaracion";
import { aprobarContenido, aprobarDeclaracion, desaprobarDeclaracion, pedir } from "@/components/academia/api";

export type ResultadoVarias = { aprobadas: string[]; omitidas: { id: string; titulo: string; motivo: string }[] };
export const aprobarVarias = (ids: string[], notas: string) => pedir<ResultadoVarias>("POST", "/api/academia/direccion/contenido/aprobar-varias", { ids, notas });

/** La materia que se aprueba (de la revisión doctrinal). */
export type MateriaParaAprobar = { id: string; titulo: string; grupo: string; abiertas: number };

/** El interruptor grande para confirmar (se toca toda la fila). */
function Confirmar({ marcado, alCambiar, children, testId }: { marcado: boolean; alCambiar: (v: boolean) => void; children: React.ReactNode; testId?: string }) {
  return (
    <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer select-none transition-colors ${marcado ? "border-orange-500 bg-orange-500/10" : "border-border"}`}>
      <Switch checked={marcado} onCheckedChange={alCambiar} className="mt-0.5 shrink-0" data-testid={testId} />
      <span className="text-sm leading-snug">{children}</span>
    </label>
  );
}

/** Lo que se ve al terminar bien: la confirmación y el botón para cerrar. */
function Listo({ texto, alCerrar }: { texto: string; alCerrar: () => void }) {
  return (
    <div className="py-4 text-center space-y-4" role="status" data-testid="aprobacion-lista">
      <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" aria-hidden="true" />
      <p className="text-base font-medium">{texto}</p>
      <Button className="fire-btn-primary w-full h-12" onClick={alCerrar}>Listo</Button>
    </div>
  );
}

const ANCHO = "max-w-lg w-[calc(100vw-1.5rem)] max-h-[92vh] overflow-y-auto rounded-2xl";

/** Aprobar la declaración de fe (o volver a aprobarla si su texto cambió). */
export function AprobarDeclaracion({ abierto, alCerrar, cambio }: { abierto: boolean; alCerrar: () => void; cambio: boolean }) {
  const qc = useQueryClient();
  const [leida, setLeida] = useState(false);
  const [notas, setNotas] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hecho, setHecho] = useState(false);
  const cerrar = () => {
    alCerrar();
    window.setTimeout(() => { setLeida(false); setNotas(""); setError(null); setHecho(false); }, 200);
  };
  const aprobar = async () => {
    setOcupado(true);
    setError(null);
    try {
      await aprobarDeclaracion(notas);
      setHecho(true);
      void qc.invalidateQueries({ queryKey: ["academia"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <Dialog open={abierto} onOpenChange={(v) => !v && cerrar()}>
      <DialogContent className={ANCHO} data-testid="dialogo-declaracion">
        {hecho ? (
          <Listo texto="La declaración de fe quedó aprobada. Los alumnos ya la ven como la declaración oficial de la academia." alCerrar={cerrar} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-orange-600" aria-hidden="true" /> Aprobar la declaración de fe</DialogTitle>
              <DialogDescription>
                {cambio
                  ? "Su texto cambió después de la última aprobación. Revisa estos puntos y apruébala otra vez."
                  : "Es lo que la academia enseña. Mientras no la apruebes, los alumnos la ven como borrador."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <p className="text-sm font-medium">Los {PUNTOS_A_CONFIRMAR.length} puntos en que las iglesias pentecostales difieren:</p>
              <ol className="max-h-[26vh] sm:max-h-[34vh] overflow-y-auto space-y-2 rounded-xl border border-border p-3 text-sm">
                {PUNTOS_A_CONFIRMAR.map((p) => (
                  <li key={p.n}><strong>Artículo {p.n} · {p.titulo}.</strong> {p.aConfirmar}</li>
                ))}
              </ol>
              <Link href="/academia/declaracion-de-fe" className="inline-block text-sm underline" onClick={cerrar}>Leer la declaración completa</Link>
            </div>
            <Confirmar marcado={leida} alCambiar={setLeida} testId="declaracion-confirmo">
              La leí completa y estoy de acuerdo con estos puntos tal como están escritos. Si alguno debe decir otra cosa, no la apruebes: pide el cambio.
            </Confirmar>
            <label className="block text-sm">
              Notas (opcional): con quién la revisaste
              <Textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" />
            </label>
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
            <div className="sticky bottom-0 -mx-6 -mb-6 px-6 pb-6 pt-3 bg-background border-t border-border z-10 space-y-2">
              {!leida && <p className="text-xs text-muted-foreground text-center">Activa el interruptor de arriba para poder aprobar.</p>}
              <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                <Button variant="ghost" className="h-12" onClick={cerrar} disabled={ocupado}>Cancelar</Button>
                <Button className="fire-btn-primary h-12" onClick={aprobar} disabled={ocupado || !leida} data-testid="declaracion-aprobar-ya">
                  {ocupado ? "Aprobando…" : "Aprobar la declaración"}
                </Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Quitar la aprobación de la declaración (con el motivo, que queda en el historial). */
export function QuitarDeclaracion({ abierto, alCerrar }: { abierto: boolean; alCerrar: () => void }) {
  const qc = useQueryClient();
  const [motivo, setMotivo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const quitar = async () => {
    setOcupado(true);
    setError(null);
    try {
      await desaprobarDeclaracion(motivo);
      void qc.invalidateQueries({ queryKey: ["academia"] });
      setMotivo("");
      alCerrar();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <Dialog open={abierto} onOpenChange={(v) => !v && alCerrar()}>
      <DialogContent className={ANCHO}>
        <DialogHeader>
          <DialogTitle>Quitar la aprobación de la declaración</DialogTitle>
          <DialogDescription>Los alumnos la volverán a ver como borrador. Escribe el motivo: queda en el historial.</DialogDescription>
        </DialogHeader>
        <Textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={3} maxLength={500} className="text-[16px]" placeholder="Motivo" />
        {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button variant="ghost" className="h-12" onClick={alCerrar} disabled={ocupado}>Cancelar</Button>
          <Button variant="destructive" className="h-12" onClick={quitar} disabled={ocupado || motivo.trim().length < 8}>{ocupado ? "Guardando…" : "Quitar la aprobación"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** Aprobar una materia en la revisión doctrinal, sin tener que abrir su página larga (con el enlace para verla antes). */
export function AprobarMateria({ materia, alCerrar }: { materia: MateriaParaAprobar | null; alCerrar: () => void }) {
  const qc = useQueryClient();
  const [revisada, setRevisada] = useState(false);
  const [notas, setNotas] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hecho, setHecho] = useState(false);
  const cerrar = () => {
    alCerrar();
    window.setTimeout(() => { setRevisada(false); setNotas(""); setError(null); setHecho(false); }, 200);
  };
  const aprobar = async () => {
    if (!materia) return;
    setOcupado(true);
    setError(null);
    try {
      await aprobarContenido(materia.id, notas);
      setHecho(true);
      void qc.invalidateQueries({ queryKey: ["academia"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <Dialog open={!!materia} onOpenChange={(v) => !v && cerrar()}>
      <DialogContent className={ANCHO} data-testid="dialogo-aprobar-materia">
        {materia && (hecho ? (
          <Listo texto={`«${materia.titulo}» quedó aprobada en la revisión doctrinal.`} alCerrar={cerrar} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Aprobar «{materia.titulo}»</DialogTitle>
              <DialogDescription>{materia.grupo} · revisión doctrinal: sus lecciones, el banco del examen y el repaso.</DialogDescription>
            </DialogHeader>
            {materia.abiertas > 0 ? (
              <div className="rounded-xl border border-orange-500/50 bg-orange-500/10 p-4 text-sm space-y-3">
                <p className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 text-orange-600 shrink-0" aria-hidden="true" /> Tiene {materia.abiertas === 1 ? "una observación abierta" : `${materia.abiertas} observaciones abiertas`}. Resuélvelas en su página y después apruébala.</p>
                <Link href={`/admin/academia/contenido/${materia.id}`} onClick={cerrar}><Button className="fire-btn-primary w-full h-11">Ver las observaciones</Button></Link>
              </div>
            ) : (
              <>
                <Link href={`/admin/academia/contenido/${materia.id}`} className="text-sm underline" onClick={cerrar}>Ver el contenido completo antes de aprobar</Link>
                <Confirmar marcado={revisada} alCambiar={setRevisada} testId="materia-confirmo">Revisé su contenido y está de acuerdo con la doctrina de la academia.</Confirmar>
                <label className="block text-sm">
                  Notas (opcional): qué revisaste y con quién
                  <Textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" />
                </label>
              </>
            )}
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
            {materia.abiertas === 0 && (
              <>
                <div className="sticky bottom-0 -mx-6 -mb-6 px-6 pb-6 pt-3 bg-background border-t border-border z-10 space-y-2">
                  {!revisada && <p className="text-xs text-muted-foreground text-center">Activa el interruptor de arriba para poder aprobar.</p>}
                  <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                    <Button variant="ghost" className="h-12" onClick={cerrar} disabled={ocupado}>Cancelar</Button>
                    <Button className="fire-btn-primary h-12" onClick={aprobar} disabled={ocupado || !revisada} data-testid="materia-aprobar-ya">{ocupado ? "Aprobando…" : "Aprobar la materia"}</Button>
                  </DialogFooter>
                </div>
              </>
            )}
          </>
        ))}
      </DialogContent>
    </Dialog>
  );
}

/** Aprobar varias materias de una vez (las elegidas en la lista). */
export function AprobarVarias({ materias, abierto, alCerrar, alTerminar }: { materias: MateriaParaAprobar[]; abierto: boolean; alCerrar: () => void; alTerminar: () => void }) {
  const qc = useQueryClient();
  const [revisadas, setRevisadas] = useState(false);
  const [notas, setNotas] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoVarias | null>(null);
  const cerrar = () => {
    if (resultado) alTerminar();
    alCerrar();
    window.setTimeout(() => { setRevisadas(false); setNotas(""); setError(null); setResultado(null); }, 200);
  };
  const aprobar = async () => {
    setOcupado(true);
    setError(null);
    try {
      setResultado(await aprobarVarias(materias.map((m) => m.id), notas));
      void qc.invalidateQueries({ queryKey: ["academia"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <Dialog open={abierto} onOpenChange={(v) => !v && cerrar()}>
      <DialogContent className={ANCHO} data-testid="dialogo-aprobar-varias">
        {resultado ? (
          <div className="space-y-4" role="status">
            <div className="text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" aria-hidden="true" />
              <p className="text-base font-medium">{resultado.aprobadas.length === 1 ? "Quedó aprobada 1 materia." : `Quedaron aprobadas ${resultado.aprobadas.length} materias.`}</p>
            </div>
            {resultado.omitidas.length > 0 && (
              <div className="rounded-xl border border-orange-500/50 bg-orange-500/10 p-3 text-sm">
                <p className="font-medium mb-1">No se aprobaron:</p>
                <ul className="space-y-1">{resultado.omitidas.map((o) => <li key={o.id}>{o.titulo}: {o.motivo}</li>)}</ul>
              </div>
            )}
            <Button className="fire-btn-primary w-full h-12" onClick={cerrar}>Listo</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Aprobar {materias.length === 1 ? "1 materia" : `${materias.length} materias`}</DialogTitle>
              <DialogDescription>En la revisión doctrinal. Las que tengan observaciones abiertas no se aprueban: se dicen al terminar.</DialogDescription>
            </DialogHeader>
            <ul className="max-h-[30vh] overflow-y-auto rounded-xl border border-border p-3 text-sm space-y-1">
              {materias.map((m) => <li key={m.id}>{m.titulo} <span className="text-muted-foreground">· {m.grupo}</span></li>)}
            </ul>
            <Confirmar marcado={revisadas} alCambiar={setRevisadas} testId="varias-confirmo">Revisé el contenido de {materias.length === 1 ? "esta materia" : `estas ${materias.length} materias`} y está de acuerdo con la doctrina de la academia.</Confirmar>
            <label className="block text-sm">
              Notas (opcional)
              <Textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" />
            </label>
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
            <div className="sticky bottom-0 -mx-6 -mb-6 px-6 pb-6 pt-3 bg-background border-t border-border z-10 space-y-2">
              {!revisadas && <p className="text-xs text-muted-foreground text-center">Activa el interruptor de arriba para poder aprobar.</p>}
              <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                <Button variant="ghost" className="h-12" onClick={cerrar} disabled={ocupado}>Cancelar</Button>
                <Button className="fire-btn-primary h-12" onClick={aprobar} disabled={ocupado || !revisadas || !materias.length} data-testid="varias-aprobar-ya">{ocupado ? "Aprobando…" : `Aprobar ${materias.length}`}</Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
