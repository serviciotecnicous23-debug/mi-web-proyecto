// Las secciones del perfil completo del alumno en el panel (pages/academia-direccion-alumno.tsx; los datos salen de
// server/academia-perfil.ts): el resumen con las alertas, el próximo paso y su ritmo de estudio; las partes de cada nota
// y sus exámenes; lo que aprende bien y lo que le cuesta; las actividades de su nivel; y la bitácora de seguimiento.
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle, AlertTriangle, ArrowRight, Award, BookOpenCheck, CheckCircle2, Circle, ClipboardList, Flame, Info, MessageSquareText, NotebookPen, Repeat,
  Sparkles, Trash2, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  LIMITES_SEGUIMIENTO, TIPOS_SEGUIMIENTO, type AlertaPerfil, type GravedadAlerta, type PerfilAlumno, type TipoSeguimiento,
} from "@shared/academia-perfil";
import { anotarSeguimiento, borrarSeguimiento } from "@/components/academia/api-perfil";
import { Indicador, Medidor, fecha, hace, numero } from "@/components/academia/seguimiento";
import { BarrasSemanas, CalendarioEstudio, MedidorAcierto } from "@/components/academia/perfil-graficos";

const minutos = (n: number) => (n >= 120 ? `${Math.floor(n / 60)} h ${n % 60 ? `${n % 60} min` : ""}`.trim() : `${n} min`);

const ALERTA: Record<GravedadAlerta, { icono: typeof Info; etiqueta: string; borde: string; color: string }> = {
  alta: { icono: AlertTriangle, etiqueta: "Atender pronto", borde: "border-red-500/50", color: "text-red-600 dark:text-red-400" },
  media: { icono: AlertCircle, etiqueta: "Para mirar", borde: "border-orange-500/50", color: "text-orange-600 dark:text-orange-300" },
  info: { icono: Info, etiqueta: "Para saber", borde: "border-border", color: "text-sky-700 dark:text-sky-300" },
};

function Alertas({ alertas }: { alertas: AlertaPerfil[] }) {
  if (!alertas.length) {
    return (
      <section className="glass-card p-4 flex items-center gap-3 border border-emerald-500/30" data-testid="perfil-sin-alertas">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
        <p className="text-sm">Sin alertas: estudia con regularidad y le va bien en sus exámenes.</p>
      </section>
    );
  }
  return (
    <section className="space-y-2" data-testid="perfil-alertas" aria-label="Alertas">
      {alertas.map((a) => {
        const x = ALERTA[a.gravedad];
        const Icono = x.icono;
        return (
          <div key={a.clave} className={`glass-card p-4 flex items-start gap-3 border ${x.borde}`} data-gravedad={a.gravedad}>
            <Icono className={`w-5 h-5 shrink-0 mt-0.5 ${x.color}`} aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm"><span className={`font-semibold ${x.color}`}>{x.etiqueta}:</span> <span className="font-medium">{a.titulo}</span></p>
              <p className="text-sm text-muted-foreground mt-0.5">{a.detalle}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export function ResumenPerfil({ p }: { p: PerfilAlumno }) {
  const r = p.resumen;
  const e = p.estudio;
  return (
    <div className="space-y-6" data-testid="perfil-resumen">
      <Alertas alertas={p.alertas} />
      {(p.proximo || p.logros.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {p.proximo && (
            <section className="glass-card p-4">
              <p className="data-label text-orange-600 dark:text-orange-300 flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /> Su próximo paso</p>
              <p className="mt-1.5 text-[15px]" data-testid="perfil-proximo">{p.proximo}</p>
            </section>
          )}
          {p.logros.length > 0 && (
            <section className="glass-card p-4">
              <p className="data-label text-orange-600 dark:text-orange-300 flex items-center gap-1.5"><Award className="w-3.5 h-3.5" aria-hidden="true" /> Logros</p>
              <ul className="mt-1.5 space-y-1 text-sm" data-testid="perfil-logros">
                {p.logros.map((l) => <li key={l} className="flex items-start gap-2"><Sparkles className="w-3.5 h-3.5 mt-1 text-orange-600 shrink-0" aria-hidden="true" />{l}</li>)}
              </ul>
            </section>
          )}
        </div>
      )}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5" data-testid="perfil-indicadores">
        <Indicador etiqueta="Avance del programa" valor={`${r.programa.aprobadas} de ${r.programa.de}`} nota={`${r.programa.pct} % de las materias de los cinco niveles`} />
        <Indicador etiqueta="Nivel actual" valor={r.nivelActual ? `Nivel ${r.nivelActual.n}` : "—"} nota={r.nivelActual?.nombre} />
        <Indicador etiqueta="Promedio" valor={r.promedio ?? "—"} nota={r.aprobadas ? `de ${r.aprobadas} ${r.aprobadas === 1 ? "materia aprobada" : "materias aprobadas"}` : "todavía sin materias aprobadas"} />
        <Indicador etiqueta="Estudio en 30 días" valor={minutos(e.minutos30)} nota={`${e.diasActivos30} ${e.diasActivos30 === 1 ? "día" : "días"} · ${e.sesiones30} ${e.sesiones30 === 1 ? "sesión" : "sesiones"}`} />
        <Indicador etiqueta="Racha" valor={r.racha ? `${r.racha} ${r.racha === 1 ? "día" : "días"}` : "—"} nota={r.racha ? "seguidos estudiando" : r.diasSinEstudiar ? `${r.diasSinEstudiar} ${r.diasSinEstudiar === 1 ? "día" : "días"} sin estudiar` : "estudió hoy"} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass-card p-5" data-testid="perfil-niveles">
          <h3 className="font-semibold mb-3">Su avance por nivel</h3>
          <ul className="space-y-3 text-sm">
            {p.niveles.map((n) => (
              <li key={n.n} className="grid grid-cols-[minmax(0,1fr)_7rem_4.5rem] sm:grid-cols-[minmax(0,1fr)_9rem_4.5rem] items-center gap-3">
                <span className="min-w-0">
                  <span className={`block truncate ${n.actual ? "font-semibold" : ""}`}>Nivel {n.n} · {n.nombre}{n.actual ? " · cursando" : ""}</span>
                  <span className="block text-xs text-muted-foreground">
                    {n.completado
                      ? `Completo el ${fecha(n.completado)}${n.promedio != null ? ` · promedio ${n.promedio}` : ""}`
                      : n.de > 0 && n.aprobadas === n.de
                        ? n.integral?.aprobado
                          ? `Integral aprobado con ${n.integral.mejor} · todavía no cierra el nivel`
                          : n.integral
                            ? `Materias completas · integral: mejor ${n.integral.mejor} de ${n.integral.intentos} ${n.integral.intentos === 1 ? "intento" : "intentos"} (se aprueba con 75)`
                            : "Materias completas · le falta el examen integral"
                        : n.aprobadas || n.enCurso
                          ? `En curso${n.enCurso ? ` · ${n.enCurso} ${n.enCurso === 1 ? "materia" : "materias"} cursando` : ""}`
                          : "Sin empezar"}
                  </span>
                </span>
                <Medidor valor={n.aprobadas} de={n.de} etiqueta={`Nivel ${n.n}: ${n.aprobadas} de ${n.de} materias aprobadas`} />
                <span className="tabular-nums text-right">{n.aprobadas} de {n.de}</span>
              </li>
            ))}
          </ul>
          {p.especialidades.length > 0 && (
            <>
              <h4 className="font-semibold mt-5 mb-2 text-sm">Especialidades</h4>
              <ul className="space-y-3 text-sm">
                {p.especialidades.map((x) => (
                  <li key={x.id} className="grid grid-cols-[minmax(0,1fr)_7rem_4.5rem] sm:grid-cols-[minmax(0,1fr)_9rem_4.5rem] items-center gap-3">
                    <span className="min-w-0">
                      <span className="block truncate">{x.nombre}</span>
                      <span className="block text-xs text-muted-foreground">
                        {x.completada
                          ? `Completa el ${fecha(x.completada)}`
                          : x.aprobadas === x.de
                            ? x.trabajo?.aprobado
                              ? `Trabajo final aprobado con ${x.trabajo.mejor}`
                              : x.trabajo
                                ? `Trabajo final: mejor ${x.trabajo.mejor} (se aprueba con 70)`
                                : "Materias completas · le falta el trabajo final"
                            : x.enCurso
                              ? `${x.enCurso} en curso`
                              : "Ninguna en curso ahora"}
                      </span>
                    </span>
                    <Medidor valor={x.aprobadas} de={x.de} etiqueta={`${x.nombre}: ${x.aprobadas} de ${x.de} materias aprobadas`} />
                    <span className="tabular-nums text-right">{x.aprobadas} de {x.de}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
        <CalendarioEstudio dias={e.dias} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <BarrasSemanas titulo="Minutos de estudio por semana" semanas={e.semanas} valor={(s) => s.minutos} unidad={minutos} meta={e.metaSemanal} testId="perfil-minutos" />
        <BarrasSemanas titulo="Lecciones completadas por semana" semanas={e.semanas} valor={(s) => s.lecciones} unidad={(n) => `${n} ${n === 1 ? "lección" : "lecciones"}`} testId="perfil-lecciones" />
      </div>
      <p className="text-xs text-muted-foreground">
        En total estudió {minutos(e.minutosTotal)} y vio {minutos(e.videoMinutos)} de video. Se inscribió hace {r.diasInscrito} {r.diasInscrito === 1 ? "día" : "días"}. Su meta es de {e.metaSemanal} minutos por semana.
      </p>
    </div>
  );
}

const TIPO_EXAMEN: Record<string, string> = { final: "Final", mini: "Mini prueba", breve: "Escrito breve", suficiencia: "Suficiencia", integral: "Integral", trabajo: "Trabajo final", otro: "Examen" };

export function NotasPerfil({ p }: { p: PerfilAlumno }) {
  return (
    <div className="space-y-6" data-testid="perfil-notas">
      <section className="glass-card p-0 overflow-x-auto">
        <h3 className="font-semibold px-5 pt-4">Las partes de cada nota</h3>
        <p className="text-xs text-muted-foreground px-5 mt-1">Cada materia se califica con su examen final, los repasos de las lecciones, el versículo de memoria y, desde el Nivel 2, las mini pruebas y los escritos. Entre paréntesis, cuánto pesa cada parte.</p>
        {p.materias.length === 0 ? (
          <p className="text-sm text-muted-foreground px-5 py-6">Todavía no se inscribió en ninguna materia.</p>
        ) : (
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-2.5 px-5 font-medium">Materia</th>
                <th className="py-2.5 px-3 font-medium">Partes de la nota</th>
                <th className="py-2.5 px-3 font-medium text-right">Nota</th>
                <th className="py-2.5 px-5 font-medium">Por dónde va</th>
              </tr>
            </thead>
            <tbody>
              {p.materias.map((m) => (
                <tr key={m.id} className="border-b border-border/60 last:border-0 align-top" data-testid={`perfil-materia-${m.id}`}>
                  <td className="py-2.5 px-5">
                    <span className="font-medium">{m.titulo}</span>
                    <span className="block text-xs text-muted-foreground">{m.grupo}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {m.componentes.map((c) => (
                        <li key={c.id} className="rounded-full bg-muted px-2.5 py-0.5 text-xs whitespace-nowrap">
                          {c.texto} ({c.peso} %): <strong className="tabular-nums">{c.valor ?? "—"}</strong>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-semibold">{m.estado === "aprobada" && m.nota != null ? m.nota : "—"}</td>
                  <td className="py-2.5 px-5 text-sm">
                    {m.estado === "aprobada" ? (
                      <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Aprobada</span>
                    ) : (
                      <>
                        <span className="block">{m.lecciones} de {m.de} lecciones</span>
                        {m.siguiente ? <span className="block text-xs text-muted-foreground">Sigue: {m.siguiente}</span> : <span className="block text-xs text-muted-foreground">{m.intentosFinal ? `Final: ${m.intentosFinal} ${m.intentosFinal === 1 ? "intento" : "intentos"}, mejor ${m.mejorFinal ?? "—"}` : "Le falta el examen final"}</span>}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="glass-card p-0 overflow-x-auto" data-testid="perfil-examenes">
        <h3 className="font-semibold px-5 pt-4">Sus exámenes</h3>
        {p.examenes.length === 0 ? (
          <p className="text-sm text-muted-foreground px-5 py-6">Todavía no dio ningún examen.</p>
        ) : (
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-2.5 px-5 font-medium">Examen</th>
                <th className="py-2.5 px-3 font-medium">Intento</th>
                <th className="py-2.5 px-3 font-medium text-right">Aciertos</th>
                <th className="py-2.5 px-3 font-medium text-right">Nota</th>
                <th className="py-2.5 px-5 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {p.examenes.map((x) => (
                <tr key={`${x.clave}-${x.intento}`} className="border-b border-border/60 last:border-0">
                  <td className="py-2.5 px-5">
                    <span className="block">{x.titulo}</span>
                    <span className="block text-xs text-muted-foreground">{TIPO_EXAMEN[x.tipo]}</span>
                  </td>
                  <td className="py-2.5 px-3 tabular-nums">{x.intento}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums">{x.de ? `${x.aciertos} de ${x.de}` : "—"}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-semibold tabular-nums">
                      {x.aprobado ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> : <XCircle className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />}
                      {x.nota}
                      <span className="sr-only">{x.aprobado ? "aprobado" : "reprobado"}</span>
                    </span>
                  </td>
                  <td className="py-2.5 px-5 whitespace-nowrap" title={new Date(x.fecha).toLocaleString("es")}>{fecha(x.fecha)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export function AprendizajePerfil({ p }: { p: PerfilAlumno }) {
  const a = p.aprendizaje;
  const cuestan = a.porLeccion.slice(0, 5);
  const domina = [...a.porLeccion].reverse().filter((l) => l.pct >= 80).slice(0, 5);
  return (
    <div className="space-y-6" data-testid="perfil-aprendizaje">
      <p className="text-sm text-muted-foreground">
        {a.respuestas
          ? `Sale de ${numero(a.respuestas)} respuestas suyas: las de sus exámenes, las del repaso de cada lección (la primera vez que respondió) y las del repaso del día.`
          : "Todavía no hay respuestas suyas para analizar: aparecen al hacer los repasos de las lecciones y los exámenes."}
      </p>
      {a.respuestas > 0 && (
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="glass-card p-5" data-testid="perfil-bloom">
            <h3 className="font-semibold">Por tipo de pregunta</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-3">De recordar lo leído a aplicarlo y analizarlo: muestra si aprende de memoria o si ya usa lo que aprende.</p>
            <ul className="space-y-2.5">{a.porBloom.map((b) => <MedidorAcierto key={b.clave} nombre={b.nombre} pct={b.pct} bien={b.bien} total={b.total} />)}</ul>
          </section>
          <section className="glass-card p-5" data-testid="perfil-cuestan">
            <h3 className="font-semibold">Las lecciones que más le cuestan</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-3">Las de menos aciertos (con al menos 3 respuestas). Son las que conviene repasar con él.</p>
            {cuestan.length ? <ul className="space-y-2.5">{cuestan.map((l) => <MedidorAcierto key={l.clave} nombre={l.nombre} detalle={l.detalle} pct={l.pct} bien={l.bien} total={l.total} />)}</ul> : <p className="text-sm text-muted-foreground">Todavía no hay suficientes respuestas por lección.</p>}
          </section>
        </div>
      )}
      {domina.length > 0 && (
        <section className="glass-card p-5" data-testid="perfil-domina">
          <h3 className="font-semibold">Lo que mejor domina</h3>
          <ul className="space-y-2.5 mt-3">{domina.map((l) => <MedidorAcierto key={l.clave} nombre={l.nombre} detalle={l.detalle} pct={l.pct} bien={l.bien} total={l.total} />)}</ul>
        </section>
      )}
      {a.dificiles && a.dificiles.length > 0 && (
        <section className="glass-card p-5" data-testid="perfil-dificiles">
          <h3 className="font-semibold">Las preguntas que más falla</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-3">Solo las ve la Administración. Sirven para saber qué idea no le quedó clara.</p>
          <ol className="space-y-3 text-sm">
            {a.dificiles.map((d) => (
              <li key={d.id} className="border-b border-border/60 pb-3 last:border-0">
                <p>{d.texto}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{d.donde} · falló {d.fallos} {d.fallos === 1 ? "vez" : "veces"}{d.aciertos ? `, acertó ${d.aciertos}` : ""}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Indicador etiqueta="Repaso del día" valor={p.repaso.total ? `${p.repaso.dominadas} de ${p.repaso.total}` : "—"} nota={p.repaso.total ? `preguntas dominadas · ${p.repaso.vencidas} vencidas` : "todavía no lo usa"} />
        <Indicador etiqueta="Versículos de memoria" valor={`${p.versiculos.aprendidos} de ${p.versiculos.de}`} nota={`aprendidos · ${p.versiculos.dominados} dominados`} />
        <Indicador etiqueta="Video" valor={minutos(p.estudio.videoMinutos)} nota="vistos en las lecciones" />
        <Indicador etiqueta="Cuaderno" valor={p.cuaderno.notas} nota={`notas · ${p.cuaderno.resaltados} resaltados`} />
      </div>
      {p.reflexiones && (
        <section className="glass-card p-5" data-testid="perfil-reflexiones">
          <h3 className="font-semibold flex items-center gap-2"><NotebookPen className="w-4 h-4 text-orange-600" aria-hidden="true" /> Lo que escribe al terminar las lecciones</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-3">Sus reflexiones más recientes. Solo las ve la Administración: tratarlas con cuidado pastoral.</p>
          {p.reflexiones.length === 0 ? (
            <p className="text-sm text-muted-foreground">Todavía no escribió reflexiones.</p>
          ) : (
            <ul className="space-y-3">
              {p.reflexiones.map((r, i) => (
                <li key={i} className="rounded-xl bg-muted/50 p-3 text-sm">
                  <p className="whitespace-pre-line">{r.texto}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{r.leccion} · {r.materia} · {fecha(r.fecha)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

export function ActividadesPerfil({ p }: { p: PerfilAlumno }) {
  if (!p.actividades.length) return <p className="text-sm text-muted-foreground">Su nivel todavía no pide actividades fuera de las materias (empiezan en el Nivel 2).</p>;
  return (
    <div className="space-y-4" data-testid="perfil-actividades">
      {p.actividades.map((a) => (
        <section key={a.nivel} className="glass-card p-5">
          <h3 className="font-semibold">Nivel {a.nivel} · {a.nombre}</h3>
          <ul className="mt-3 space-y-2.5 text-sm">
            {a.requisitos.map((q) => (
              <li key={q.texto} className="flex items-start gap-2.5">
                {q.hecho ? <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" aria-hidden="true" /> : <Circle className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" aria-hidden="true" />}
                <span>
                  <span className="font-medium">{q.texto}</span>
                  <span className="sr-only">{q.hecho ? " (hecho)" : " (pendiente)"}</span>
                  <span className="block text-xs text-muted-foreground">{q.detalle}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

const ICONO_SEGUIMIENTO: Record<TipoSeguimiento, typeof Info> = { nota: ClipboardList, llamada: MessageSquareText, mensaje: MessageSquareText, visita: BookOpenCheck, reunion: Repeat, oracion: Flame };

/** La bitácora de seguimiento: lo que la Administración hizo con el alumno (llamadas, visitas, oración…). */
export function BitacoraPerfil({ p, alumnoId, nombre }: { p: PerfilAlumno; alumnoId: number; nombre: string }) {
  const qc = useQueryClient();
  const [tipo, setTipo] = useState<TipoSeguimiento>("nota");
  const [texto, setTexto] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [borrando, setBorrando] = useState<number | null>(null);
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null);
  const refrescar = () => qc.invalidateQueries({ queryKey: ["academia", "direccion", "perfil", String(alumnoId)] });
  const anotar = async () => {
    setOcupado(true);
    setAviso(null);
    try {
      await anotarSeguimiento(alumnoId, { tipo, texto });
      setTexto("");
      setAviso({ ok: true, texto: "Quedó anotado en la bitácora." });
      await refrescar();
    } catch (e: any) {
      setAviso({ ok: false, texto: e.message });
    } finally {
      setOcupado(false);
    }
  };
  const borrar = async (id: number) => {
    setOcupado(true);
    setAviso(null);
    try {
      await borrarSeguimiento(id);
      setBorrando(null);
      await refrescar();
    } catch (e: any) {
      setAviso({ ok: false, texto: e.message });
    } finally {
      setOcupado(false);
    }
  };
  const notas = p.seguimiento ?? [];
  return (
    <section className="glass-card p-5" data-testid="perfil-bitacora" id="perfil-bitacora">
      <h3 className="font-semibold flex items-center gap-2"><ClipboardList className="w-4 h-4 text-orange-600" aria-hidden="true" /> Bitácora de seguimiento</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Anota cada contacto con {nombre}: una llamada, un mensaje, una visita, una reunión o la oración por él. Solo la ve la Administración; {nombre} no la ve.
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Qué fue">
          {TIPOS_SEGUIMIENTO.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTipo(t.id)}
              aria-pressed={tipo === t.id}
              className={`rounded-full px-3 py-1 text-sm border transition-colors ${tipo === t.id ? "bg-orange-600 border-orange-600 text-white" : "border-border hover:border-orange-500"}`}
            >
              {t.texto}
            </button>
          ))}
        </div>
        <label className="block text-sm">
          <span className="sr-only">Qué pasó</span>
          <Textarea value={texto} onChange={(e) => setTexto(e.target.value)} rows={3} maxLength={LIMITES_SEGUIMIENTO.max} placeholder="Qué pasó, qué se habló o qué se acordó" className="text-[16px]" data-testid="bitacora-texto" />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Button className="fire-btn-primary" onClick={anotar} disabled={ocupado || texto.trim().length < LIMITES_SEGUIMIENTO.min} data-testid="bitacora-anotar">{ocupado ? "Guardando…" : "Anotar"}</Button>
          {aviso && <p className={`text-sm ${aviso.ok ? "text-emerald-700 dark:text-emerald-300" : "text-red-600 dark:text-red-400"}`} role="status">{aviso.texto}</p>}
        </div>
      </div>
      {notas.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-4">Todavía no hay anotaciones.</p>
      ) : (
        <ol className="mt-5 space-y-3" data-testid="bitacora-lista">
          {notas.map((n) => {
            const Icono = ICONO_SEGUIMIENTO[n.tipo] ?? ClipboardList;
            return (
              <li key={n.id} className="flex items-start gap-3 border-b border-border/60 pb-3 last:border-0">
                <Icono className="w-4 h-4 mt-1 text-orange-600 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">{TIPOS_SEGUIMIENTO.find((t) => t.id === n.tipo)?.texto ?? "Nota"}</strong> · {n.autor} · <time dateTime={n.fecha} title={new Date(n.fecha).toLocaleString("es")}>{fecha(n.fecha)} ({hace(n.fecha)})</time>
                  </p>
                  <p className="text-sm whitespace-pre-line mt-0.5">{n.texto}</p>
                  {borrando === n.id && (
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <span>¿Borrar esta anotación? Queda constancia en el historial.</span>
                      <Button size="sm" variant="destructive" onClick={() => borrar(n.id)} disabled={ocupado}>Sí, borrarla</Button>
                      <Button size="sm" variant="ghost" onClick={() => setBorrando(null)} disabled={ocupado}>Cancelar</Button>
                    </div>
                  )}
                </div>
                {borrando !== n.id && (
                  <Button size="icon" variant="ghost" onClick={() => setBorrando(n.id)} aria-label="Borrar la anotación" title="Borrar la anotación">
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </Button>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

