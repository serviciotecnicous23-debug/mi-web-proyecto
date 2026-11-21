// La sección «Materias» del panel de la academia: en un solo lugar, el seguimiento de cada materia (inscritos, en curso,
// aprobadas, promedio y avance) y su revisión doctrinal (aprobada o por aprobar, con «Aprobar» en cada una y «Aprobar
// varias»). Tarjetas grandes para el teléfono; en la computadora van de a dos. También la tarjeta de la declaración de fe.
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, CheckCircle2, Clock, ScrollText, Search, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { DireccionResumen } from "@shared/academia-direccion";
import type { ContenidoLista, ContenidoResumen } from "@shared/academia-calidad";
import { useContenido } from "@/components/academia/api";
import { useArea } from "@/components/academia/area";
import { Medidor, fecha, numero } from "@/components/academia/seguimiento";
import { AprobarDeclaracion, AprobarMateria, AprobarVarias, QuitarDeclaracion, type MateriaParaAprobar } from "@/components/academia/panel-aprobar";

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
export type VerMaterias = "aprobar" | "observaciones" | "mirar" | "alumnos" | "niveles" | "especialidades" | "todas";

function EstadoDoctrinal({ c }: { c: ContenidoResumen | undefined }) {
  if (!c) return null;
  const CHIP = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";
  if (c.aprobacion?.vigente) return <span className={`${CHIP} bg-emerald-500/15 text-emerald-800 dark:text-emerald-300`}><ShieldCheck className="w-3 h-3" aria-hidden="true" /> Aprobada</span>;
  if (c.aprobacion) return <span className={`${CHIP} bg-orange-500/15 text-orange-800 dark:text-orange-300`}><AlertTriangle className="w-3 h-3" aria-hidden="true" /> Cambió: aprobar otra vez</span>;
  return <span className={`${CHIP} bg-muted`}><Clock className="w-3 h-3" aria-hidden="true" /> Por aprobar</span>;
}

/** La declaración de fe: su estado y el botón para aprobarla (en una ventana) o quitar la aprobación. */
export function TarjetaDeclaracionSimple({ declaracion }: { declaracion: ContenidoLista["declaracion"] }) {
  const [aprobar, setAprobar] = useState(false);
  const [quitar, setQuitar] = useState(false);
  const a = declaracion.aprobacion;
  const vigente = !!a?.vigente;
  return (
    <section id="contenido-declaracion" className={`glass-card p-4 sm:p-5 border scroll-mt-24 ${vigente ? "border-emerald-500/40" : "border-orange-500/50"}`} data-testid="tarjeta-declaracion" data-estado={vigente ? "aprobada" : a ? "cambio" : "pendiente"}>
      <div className="flex items-start gap-3">
        {vigente ? <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" /> : <ScrollText className="w-6 h-6 text-orange-600 shrink-0" aria-hidden="true" />}
        <div className="flex-1 min-w-0">
          <p className="font-semibold">Declaración de fe · {vigente ? "aprobada" : a ? "su texto cambió" : "sin aprobar"}</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {vigente
              ? `La aprobó ${a!.por} el ${fecha(a!.fecha)}. Los alumnos la ven como la declaración oficial.`
              : a
                ? `La aprobó ${a.por} el ${fecha(a.fecha)}, pero su texto cambió después. Hay que aprobarla otra vez.`
                : "Mientras no la apruebes, los alumnos la ven como borrador."}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {!vigente && <Button className="fire-btn-primary h-11 flex-1 sm:flex-none" onClick={() => setAprobar(true)} data-testid="declaracion-abrir-aprobar">{a ? "Aprobarla otra vez" : "Aprobar la declaración"}</Button>}
        <Link href="/academia/declaracion-de-fe" className="flex-1 sm:flex-none"><Button variant="outline" className="h-11 w-full">Leerla</Button></Link>
        {a && <Button variant="ghost" className="h-11" onClick={() => setQuitar(true)}>Quitar la aprobación</Button>}
      </div>
      <AprobarDeclaracion abierto={aprobar} alCerrar={() => setAprobar(false)} cambio={!!a} />
      <QuitarDeclaracion abierto={quitar} alCerrar={() => setQuitar(false)} />
    </section>
  );
}

export function PanelMaterias({ d, inicial }: { d: DireccionResumen; inicial?: VerMaterias }) {
  const { base } = useArea();
  const admin = d.puede.contenido;
  const contenido = useContenido(admin);
  const porId = useMemo(() => new Map((contenido.data?.materias ?? []).map((c) => [c.id, c])), [contenido.data]);
  const pendiente = (id: string) => admin && !!porId.get(id) && !porId.get(id)!.aprobacion?.vigente;
  const porAprobar = d.materias.filter((m) => pendiente(m.id));
  const conObservaciones = admin ? d.materias.filter((m) => (porId.get(m.id)?.abiertas ?? 0) > 0) : [];
  const paraMirar = admin ? d.materias.filter((m) => (porId.get(m.id)?.alertas ?? 0) > 0) : [];
  const conAlumnos = d.materias.filter((m) => m.inscritos > 0);
  const [ver, setVer] = useState<VerMaterias>(inicial ?? (conAlumnos.length ? "alumnos" : "todas"));
  // si se abrió en «Por aprobar» (al volver de una materia o desde una tarea) y ya no queda ninguna, se ven todas
  const yaAjustado = useRef(false);
  useEffect(() => {
    if (yaAjustado.current || !contenido.data) return;
    yaAjustado.current = true;
    if (ver === "aprobar" && porAprobar.length === 0) setVer("todas");
  }, [contenido.data]);
  const [texto, setTexto] = useState("");
  const [eligiendo, setEligiendo] = useState(false);
  const [elegidas, setElegidas] = useState<Set<string>>(new Set());
  const [aprobarUna, setAprobarUna] = useState<MateriaParaAprobar | null>(null);
  const [aprobarVarias, setAprobarVarias] = useState(false);
  const t = sinTildes(texto.trim());
  const lista = d.materias.filter(
    (m) =>
      (ver === "todas" ||
        (ver === "aprobar"
          ? pendiente(m.id)
          : ver === "observaciones"
            ? (porId.get(m.id)?.abiertas ?? 0) > 0
            : ver === "mirar"
              ? (porId.get(m.id)?.alertas ?? 0) > 0
              : ver === "alumnos"
                ? m.inscritos > 0
                : ver === "niveles"
                  ? !m.especialidad
                  : !!m.especialidad)) &&
      (!t || sinTildes(`${m.titulo} ${m.grupo}`).includes(t)),
  );
  const grupos = [...new Set(lista.map((m) => m.grupo))];
  const paraAprobar = (id: string): MateriaParaAprobar => {
    const m = d.materias.find((x) => x.id === id)!;
    return { id, titulo: m.titulo, grupo: m.grupo, abiertas: porId.get(id)?.abiertas ?? 0 };
  };
  const FILTROS: { id: VerMaterias; texto: string; si?: boolean }[] = [
    { id: "aprobar", texto: `Por aprobar (${porAprobar.length})`, si: admin },
    { id: "observaciones", texto: `Con observaciones (${conObservaciones.length})`, si: admin && (conObservaciones.length > 0 || ver === "observaciones") },
    { id: "mirar", texto: `Preguntas para mirar (${paraMirar.length})`, si: admin && (paraMirar.length > 0 || ver === "mirar") },
    { id: "alumnos", texto: `Con alumnos (${conAlumnos.length})` },
    { id: "niveles", texto: "Niveles" },
    { id: "especialidades", texto: "Especialidades" },
    { id: "todas", texto: `Todas (${d.materias.length})` },
  ];
  const elegibles = lista.filter((m) => pendiente(m.id));
  const cambiarElegida = (id: string, si: boolean) => setElegidas((s) => { const n = new Set(s); if (si) n.add(id); else n.delete(id); return n; });
  return (
    <div className="space-y-4 pb-24" data-testid="direccion-materias">
      {admin && contenido.data && (
        <div className="grid gap-3 sm:grid-cols-2">
          <TarjetaDeclaracionSimple declaracion={contenido.data.declaracion} />
          <section className="glass-card p-4 sm:p-5" data-testid="resumen-revision">
            <p className="font-semibold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-orange-600" aria-hidden="true" /> Revisión doctrinal</p>
            <p className="text-3xl font-semibold mt-2">{numero(contenido.data.aprobadas)} <span className="text-base font-normal text-muted-foreground">de {numero(contenido.data.total)} aprobadas</span></p>
            <div className="mt-2"><Medidor valor={contenido.data.aprobadas} de={contenido.data.total} etiqueta={`${contenido.data.aprobadas} de ${contenido.data.total} materias aprobadas`} /></div>
            {porAprobar.length > 0 && ver !== "aprobar" && (
              <Button className="fire-btn-primary h-11 w-full mt-3" onClick={() => setVer("aprobar")} data-testid="ver-por-aprobar">Ver las {numero(porAprobar.length)} por aprobar</Button>
            )}
          </section>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1" role="group" aria-label="Qué materias ver">
        {FILTROS.filter((f) => f.si !== false).map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => { setVer(f.id); setEligiendo(false); setElegidas(new Set()); }}
            aria-pressed={ver === f.id}
            className={`shrink-0 rounded-full px-4 h-10 text-sm border transition-colors ${ver === f.id ? "bg-orange-600 border-orange-600 text-white" : "border-border bg-card hover:border-orange-500"}`}
            data-testid={`materias-ver-${f.id}`}
          >
            {f.texto}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" aria-hidden="true" />
          <Input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Buscar una materia" className="pl-9 h-11 text-[16px]" aria-label="Buscar una materia" data-testid="materias-buscar" />
        </div>
        {admin && elegibles.length > 1 && (
          <Button variant={eligiendo ? "default" : "outline"} className={`h-11 ${eligiendo ? "fire-btn-primary" : ""}`} onClick={() => { setEligiendo((v) => !v); setElegidas(new Set()); }} data-testid="aprobar-varias">
            {eligiendo ? "Terminar de elegir" : "Aprobar varias"}
          </Button>
        )}
      </div>
      {eligiendo && (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span>Toca las materias que revisaste.</span>
          <button type="button" className="underline" onClick={() => setElegidas(new Set(elegibles.map((m) => m.id)))}>Elegir las {elegibles.length} de esta lista</button>
          {elegidas.size > 0 && <button type="button" className="underline" onClick={() => setElegidas(new Set())}>Quitar la elección</button>}
        </div>
      )}

      {lista.length === 0 ? (
        <p className="glass-card p-6 text-center text-sm text-muted-foreground">
          {ver === "aprobar"
            ? "No queda ninguna materia por aprobar. ¡Todo revisado!"
            : ver === "observaciones"
              ? "No hay observaciones abiertas."
              : ver === "mirar"
                ? "El análisis no marcó preguntas para mirar."
                : ver === "alumnos"
                  ? "Todavía nadie se inscribió en una materia."
                  : "Ninguna materia coincide."}
        </p>
      ) : (
        grupos.map((g) => (
          <section key={g} className="space-y-2">
            <h3 className="data-label text-orange-600 dark:text-orange-300 pt-1">{g}</h3>
            <ul className="grid gap-3 md:grid-cols-2">
              {lista.filter((m) => m.grupo === g).map((m) => {
                const c = porId.get(m.id);
                const pend = pendiente(m.id);
                const elegible = eligiendo && pend;
                const marcada = elegidas.has(m.id);
                return (
                  <li
                    key={m.id}
                    className={`glass-card p-4 border transition-colors ${marcada ? "border-orange-500" : "border-transparent"} ${elegible ? "cursor-pointer" : ""}`}
                    onClick={elegible ? () => cambiarElegida(m.id, !marcada) : undefined}
                    data-testid={`tarjeta-materia-${m.id}`}
                  >
                    <div className="flex items-start gap-3">
                      {elegible && <Checkbox checked={marcada} onCheckedChange={(v) => cambiarElegida(m.id, v === true)} onClick={(e) => e.stopPropagation()} className="mt-1 h-5 w-5" aria-label={`Elegir ${m.titulo}`} />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold leading-snug">{m.titulo}</p>
                          {admin && <EstadoDoctrinal c={c} />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{m.grupo}{c ? ` · ${c.lecciones} lecciones` : ""}</p>
                        {m.inscritos > 0 ? (
                          <div className="mt-2.5">
                            <Medidor valor={m.avance} etiqueta={`${m.titulo}: avance medio de ${m.avance} %`} />
                            <p className="text-xs mt-1.5"><Users className="w-3.5 h-3.5 inline -mt-0.5 mr-1" aria-hidden="true" />{m.inscritos} {m.inscritos === 1 ? "inscrito" : "inscritos"} · {m.enCurso} en curso · {m.aprobadas} {m.aprobadas === 1 ? "aprobada" : "aprobadas"}{m.promedio != null ? ` · promedio ${m.promedio}` : ""} · avance {m.avance} %</p>
                          </div>
                        ) : (
                          <p className="text-xs mt-2 text-muted-foreground">Sin alumnos todavía.</p>
                        )}
                        {admin && c && (c.abiertas > 0 || c.alertas > 0) && (
                          <p className="text-xs mt-1.5 text-orange-700 dark:text-orange-300">
                            {[c.abiertas ? `${c.abiertas} ${c.abiertas === 1 ? "observación abierta" : "observaciones abiertas"}` : "", c.alertas ? `${c.alertas} ${c.alertas === 1 ? "pregunta para mirar" : "preguntas para mirar"}` : ""].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        {admin && c?.aprobacion?.vigente && <p className="text-xs mt-1.5 text-muted-foreground flex items-center gap-1"><CheckCircle2 className="w-3 h-3" aria-hidden="true" /> {c.aprobacion.por} · {fecha(c.aprobacion.fecha)}</p>}
                        {!eligiendo && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Link href={`${base}/materia/${m.id}`}><Button size="sm" variant="outline" className="h-10 px-4">Ver alumnos</Button></Link>
                            {admin && <Link href={`${base}/contenido/${m.id}`}><Button size="sm" variant="outline" className="h-10 px-4">Contenido</Button></Link>}
                            {pend && <Button size="sm" className="fire-btn-primary h-10 px-4" onClick={() => setAprobarUna(paraAprobar(m.id))} data-testid={`aprobar-${m.id}`}>Aprobar</Button>}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}

      {eligiendo && elegidas.size > 0 && (
        <div className="fixed inset-x-0 bottom-[4.75rem] md:bottom-4 z-40 px-4">
          <div className="max-w-md mx-auto glass-card border border-orange-500/60 p-3 flex items-center gap-3 shadow-xl">
            <span className="flex-1 text-sm font-medium">{elegidas.size} {elegidas.size === 1 ? "elegida" : "elegidas"}</span>
            <Button className="fire-btn-primary h-11" onClick={() => setAprobarVarias(true)} data-testid="aprobar-elegidas">Aprobar {elegidas.size}</Button>
          </div>
        </div>
      )}

      <AprobarMateria materia={aprobarUna} alCerrar={() => setAprobarUna(null)} />
      <AprobarVarias
        materias={[...elegidas].map(paraAprobar)}
        abierto={aprobarVarias}
        alCerrar={() => setAprobarVarias(false)}
        alTerminar={() => { setEligiendo(false); setElegidas(new Set()); }}
      />
    </div>
  );
}
