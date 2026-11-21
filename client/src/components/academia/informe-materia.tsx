// El informe de una materia del alumno en el panel (server/academia-perfil.ts, informeDe): lo que hizo en cada lección
// (cuándo la abrió y la terminó, cuánto leyó, el video, su repaso y su reflexión) y en cada examen (cada intento, cuánto
// tardó y cada pregunta: si la acertó, cuánto tardó y, para la Administración, qué decía, qué respondió y la correcta),
// sus respuestas escritas, el versículo y su repaso del día. Cada lección y cada intento se abren con un toque.
import { useState } from "react";
import { CheckCircle2, ChevronRight, Circle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { duracion, type InformeMateria, type IntentoInforme, type LeccionInforme, type MateriaNotas } from "@shared/academia-perfil";
import { useInformeMateria } from "@/components/academia/api-perfil";
import { Medidor } from "@/components/academia/seguimiento";

const fechaHora = (iso: string) => new Date(iso).toLocaleString("es", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
const fechaCorta = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });
const RESUMEN = "flex items-start gap-3 cursor-pointer list-none p-3 sm:p-4 rounded-xl hover:bg-muted/50 [&::-webkit-details-marker]:hidden";

/** De abrirla a terminarla: si fue el mismo día, cuánto pasó; si no, cuántos días después. */
function entreFechas(desde: string | null, hasta: string | null): string | null {
  if (!desde || !hasta) return null;
  const seg = (Date.parse(hasta) - Date.parse(desde)) / 1000;
  if (seg < 0) return null;
  if (seg < 6 * 3600) return `la terminó ${duracion(seg)} después de abrirla`;
  const dias = Math.round(seg / 86400);
  return dias <= 1 ? "la terminó al día siguiente" : `la terminó ${dias} días después de abrirla`;
}

function Leccion({ l, completo }: { l: LeccionInforme; completo: boolean }) {
  const estado = l.completada ? "Terminada" : l.abierta ? "Abierta, sin terminar" : "Sin abrir";
  const Icono = l.completada ? CheckCircle2 : l.abierta ? Clock : Circle;
  const color = l.completada ? "text-emerald-600" : l.abierta ? "text-orange-600" : "text-muted-foreground";
  return (
    <li className="border-b border-border/60 last:border-0">
      <details className="group">
        <summary className={RESUMEN}>
          <Icono className={`w-5 h-5 shrink-0 mt-0.5 ${color}`} aria-hidden="true" />
          <span className="flex-1 min-w-0">
            <span className="block font-medium leading-snug">{l.n}. {l.titulo}</span>
            <span className="block text-xs text-muted-foreground mt-0.5">
              {estado}
              {l.segundos > 0 ? ` · leyó ${duracion(l.segundos)}` : ""}
              {l.videoSeg > 0 ? ` · video ${duracion(l.videoSeg)}` : ""}
              {l.repaso.total ? ` · repaso ${l.repaso.bien} de ${l.repaso.total} a la primera` : ""}
            </span>
          </span>
          <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
        </summary>
        <div className="px-3 sm:px-4 pb-4 pl-11 sm:pl-12 space-y-2 text-sm">
          <p>
            {l.abierta ? <>La abrió el {fechaHora(l.abierta)}.</> : "Todavía no la abrió."}{" "}
            {l.completada ? <>La terminó el {fechaHora(l.completada)}{entreFechas(l.abierta, l.completada) ? ` (${entreFechas(l.abierta, l.completada)})` : ""}.</> : null}
          </p>
          <p className="text-muted-foreground">
            Tiempo de lectura: {l.segundos > 0 ? duracion(l.segundos) : "sin medir (se mide desde el 21 de noviembre de 2026)"}
            {l.videoSeg > 0 ? ` · video visto: ${duracion(l.videoSeg)}` : ""}
          </p>
          {l.repaso.total > 0 && (
            <div>
              <p className="font-medium">Repaso de la lección: {l.repaso.bien} de {l.repaso.total} bien a la primera</p>
              <ul className="mt-1 space-y-1">
                {l.repaso.preguntas.map((q, i) => (
                  <li key={q.id} className="flex items-start gap-2">
                    {q.bien ? <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" aria-hidden="true" /> : <XCircle className="w-4 h-4 mt-0.5 text-red-600 shrink-0" aria-hidden="true" />}
                    <span>{q.texto ?? `Pregunta ${i + 1}`}<span className="sr-only">{q.bien ? " (bien)" : " (mal)"}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {l.reflexion && (
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Lo que escribió al terminarla</p>
              <p className="whitespace-pre-line">{l.reflexion}</p>
            </div>
          )}
        </div>
      </details>
    </li>
  );
}

function Intento({ x, completo }: { x: IntentoInforme; completo: boolean }) {
  return (
    <li className="border-b border-border/60 last:border-0">
      <details className="group">
        <summary className={RESUMEN}>
          {x.aprobado ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" /> : <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />}
          <span className="flex-1 min-w-0">
            <span className="block font-medium leading-snug">{x.titulo} · intento {x.intento}</span>
            <span className="block text-xs text-muted-foreground mt-0.5">
              Nota <strong className="text-foreground">{x.nota}</strong> ({x.aprobado ? "aprobado" : "reprobado"})
              {x.de ? ` · ${x.aciertos} de ${x.de} bien` : ""} · {fechaCorta(x.fecha)}
              {x.segundos != null ? ` · tardó ${duracion(x.segundos)}` : ""}
            </span>
          </span>
          <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
        </summary>
        <div className="px-3 sm:px-4 pb-4 pl-11 sm:pl-12 text-sm">
          <p className="text-muted-foreground mb-2">
            Lo cerró el {fechaHora(x.fecha)}. {x.segundos != null ? `Tardó ${duracion(x.segundos)} en todo el examen.` : "Este intento es de antes de que se midiera su duración."}
          </p>
          {x.preguntas.length === 0 ? (
            <p className="text-muted-foreground">Este examen fue solo escrito: sus respuestas están en «Respuestas escritas».</p>
          ) : (
            <ol className="space-y-2.5">
              {x.preguntas.map((q, i) => (
                <li key={`${q.id}-${i}`} className="flex items-start gap-2">
                  {q.bien ? <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" aria-hidden="true" /> : <XCircle className="w-4 h-4 mt-0.5 text-red-600 shrink-0" aria-hidden="true" />}
                  <span className="min-w-0">
                    <span className="block">
                      <span className="font-medium">{i + 1}.</span> {q.texto ?? (q.leccion ? `Pregunta de la lección ${q.leccion}` : "Pregunta")}
                      <span className="sr-only">{q.bien ? " (bien)" : " (mal)"}</span>
                    </span>
                    {completo && (
                      <span className="block text-xs mt-0.5">
                        {q.elegida ? <>Respondió: <strong className={q.bien ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}>{q.elegida}</strong></> : <span className="text-red-700 dark:text-red-300">{q.tarde ? "Se le acabó el tiempo" : "No respondió"}</span>}
                        {!q.bien && q.correcta ? <> · Correcta: <strong>{q.correcta}</strong></> : null}
                      </span>
                    )}
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {q.leccion ? `Lección ${q.leccion}` : ""}
                      {q.seg != null ? `${q.leccion ? " · " : ""}tardó ${duracion(q.seg)}` : ""}
                      {q.tarde && q.elegida ? " · fuera de tiempo" : ""}
                    </span>
                    {completo && !q.bien && q.explica && <span className="block text-xs text-muted-foreground mt-0.5">Por qué: {q.explica}</span>}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </details>
    </li>
  );
}

function Contenido({ r }: { r: InformeMateria }) {
  const hechas = r.lecciones.filter((l) => l.completada).length;
  return (
    <div className="space-y-4" data-testid="informe-materia">
      <section className="rounded-xl border border-border p-3 sm:p-4 space-y-2 text-sm">
        <p>
          <span className="font-semibold">{r.estado === "aprobada" ? `Aprobada con ${r.nota ?? "—"}` : r.estado === "en-curso" ? "En curso" : "Sin inscribir"}</span>
          {r.inicio ? ` · empezó el ${fechaCorta(r.inicio)}` : ""}
          {r.aprobada ? ` · aprobó el ${fechaCorta(r.aprobada)}` : ""}
        </p>
        <p className="text-muted-foreground">
          {hechas} de {r.materia.lecciones} lecciones terminadas · lectura {r.tiempo.lectura ? duracion(r.tiempo.lectura) : "sin medir"} · exámenes {r.tiempo.examenes ? duracion(r.tiempo.examenes) : "sin medir"}
        </p>
        {r.componentes.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Las partes de la nota">
            {r.componentes.map((c) => (
              <li key={c.id} className="rounded-full bg-muted px-2.5 py-0.5 text-xs whitespace-nowrap">{c.texto} ({c.peso} %): <strong className="tabular-nums">{c.valor ?? "—"}</strong></li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h4 className="font-semibold mb-1">Las lecciones</h4>
        <ol className="rounded-xl border border-border">{r.lecciones.map((l) => <Leccion key={l.id} l={l} completo={r.completo} />)}</ol>
      </section>

      <section>
        <h4 className="font-semibold mb-1">Los exámenes ({r.intentos.length})</h4>
        {r.intentos.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-xl border border-border p-3">Todavía no dio ningún examen de esta materia.</p>
        ) : (
          <ol className="rounded-xl border border-border">{r.intentos.map((x) => <Intento key={`${x.clave}-${x.intento}`} x={x} completo={r.completo} />)}</ol>
        )}
      </section>

      {r.escritas && r.escritas.length > 0 && (
        <section>
          <h4 className="font-semibold mb-1">Respuestas escritas ({r.escritas.length})</h4>
          <ol className="space-y-2">
            {r.escritas.map((e) => (
              <li key={e.id} className="rounded-xl border border-border p-3 text-sm space-y-1">
                <p className="text-xs text-muted-foreground">{e.examen} · {fechaCorta(e.fecha)}</p>
                <p className="font-medium">{e.pregunta}</p>
                <p className="whitespace-pre-line rounded-lg bg-muted/50 p-2">{e.respuesta || "(sin respuesta)"}</p>
                <p className="text-xs">
                  Nota {e.notaFinal ?? e.notaAuto}
                  {e.notaFinal != null && e.notaFinal !== e.notaAuto ? ` (el corrector le dio ${e.notaAuto}; se cambió${e.motivo ? `: «${e.motivo}»` : ""})` : " (del corrector)"}
                  {e.marcada && !e.revisada ? " · marcada para revisar" : ""}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="grid gap-3 sm:grid-cols-2 text-sm">
        <section className="rounded-xl border border-border p-3">
          <h4 className="font-semibold">Versículo de memoria</h4>
          {r.versiculo ? (
            <p className="text-muted-foreground mt-1">
              {r.versiculo.ref}: {r.versiculo.aprendido ? `lo aprendió el ${fechaCorta(r.versiculo.aprendido)}` : "todavía no lo aprende"}
              {r.versiculo.dominado ? ` y lo domina desde el ${fechaCorta(r.versiculo.dominado)}` : ""} · {r.versiculo.intentos} {r.versiculo.intentos === 1 ? "intento" : "intentos"}
              {r.versiculo.puntaje != null ? ` · mejor puntaje ${r.versiculo.puntaje}` : ""}
            </p>
          ) : (
            <p className="text-muted-foreground mt-1">Todavía no lo practicó.</p>
          )}
        </section>
        <section className="rounded-xl border border-border p-3">
          <h4 className="font-semibold">Repaso del día</h4>
          <p className="text-muted-foreground mt-1">
            {r.repasoDia.total ? `${r.repasoDia.dominadas} de ${r.repasoDia.total} preguntas dominadas · ${r.repasoDia.aciertos} aciertos y ${r.repasoDia.fallos} fallos` : "Todavía no repasó preguntas de esta materia."}
          </p>
        </section>
      </div>
      {!r.completo && <p className="text-xs text-muted-foreground">El texto de cada pregunta, lo que respondió y sus reflexiones los ve solo la Administración.</p>}
    </div>
  );
}

/** El informe de una materia: se pide al abrirlo. */
export function InformeMateriaVista({ alumnoId, materiaId }: { alumnoId: number; materiaId: string }) {
  const q = useInformeMateria(alumnoId, materiaId, true);
  if (q.isLoading) return <p className="text-sm text-muted-foreground py-3">Preparando el informe…</p>;
  if (!q.data) return <p className="text-sm text-red-600 py-3">{q.error?.message ?? "No se pudo preparar el informe."}</p>;
  return <Contenido r={q.data} />;
}

/** Las materias del alumno: cada una se abre con un toque y muestra su informe completo. */
export function InformePorMateria({ alumnoId, materias, alGestionar }: { alumnoId: number; materias: MateriaNotas[]; alGestionar?: (materiaId: string) => void }) {
  const [abierta, setAbierta] = useState<string | null>(() => materias.find((m) => m.estado === "en-curso")?.id ?? materias[0]?.id ?? null);
  if (!materias.length) return <p className="glass-card p-6 text-center text-sm text-muted-foreground">Todavía no se inscribió en ninguna materia. Cuando empiece, aquí verás cada lección y cada examen.</p>;
  return (
    <div className="space-y-3" data-testid="informe-por-materia">
      <p className="text-sm text-muted-foreground">Toca una materia para ver todo lo que hizo: cada lección (cuándo la abrió, cuánto leyó y su repaso), cada examen con cada respuesta y cuánto tardó.</p>
      <ul className="space-y-3">
        {materias.map((m) => {
          const abiertaYa = abierta === m.id;
          return (
            <li key={m.id} className={`glass-card p-0 overflow-hidden border ${abiertaYa ? "border-orange-500/50" : "border-transparent"}`}>
              <button type="button" onClick={() => setAbierta(abiertaYa ? null : m.id)} aria-expanded={abiertaYa} className="w-full text-left p-4 flex items-start gap-3" data-testid={`informe-abrir-${m.id}`}>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold leading-snug">{m.titulo}</span>
                  <span className="block text-xs text-muted-foreground">{m.grupo}</span>
                  <span className="block mt-2"><Medidor valor={m.lecciones} de={m.de} etiqueta={`${m.lecciones} de ${m.de} lecciones`} /></span>
                  <span className="block text-xs mt-1.5">
                    {m.estado === "aprobada" ? `Aprobada con ${m.nota ?? "—"}` : `${m.lecciones} de ${m.de} lecciones${m.siguiente ? ` · sigue: ${m.siguiente}` : " · le falta el examen final"}`}
                    {m.intentosFinal ? ` · final: ${m.intentosFinal} ${m.intentosFinal === 1 ? "intento" : "intentos"}, mejor ${m.mejorFinal ?? "—"}` : ""}
                  </span>
                </span>
                <ChevronRight className={`w-5 h-5 mt-0.5 shrink-0 text-muted-foreground transition-transform ${abiertaYa ? "rotate-90" : ""}`} aria-hidden="true" />
              </button>
              {abiertaYa && (
                <div className="px-3 sm:px-4 pb-4 pt-3 border-t border-border space-y-3">
                  {alGestionar && <Button size="sm" variant="outline" className="h-10" onClick={() => alGestionar(m.id)} data-testid={`gestionar-${m.id}`}>Gestionar su nota, sus intentos y sus lecciones</Button>}
                  <InformeMateriaVista alumnoId={alumnoId} materiaId={m.id} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
