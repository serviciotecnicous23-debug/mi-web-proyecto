// El informe del laboratorio ministerial en el panel de la academia (server/academia-laboratorio-informe.ts): cómo les
// va a los alumnos en cada práctica, para seguir el piloto. Solo la Administración. No cuenta los intentos de prueba.
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, ChevronRight, Download, FlaskConical, Loader2 } from "lucide-react";
import { LABORATORIO, NOMBRE_FORMATO, type InformeLaboratorio as Informe, type InformePractica, type NivelCompetencia } from "@shared/laboratorio";
import { useInformeLaboratorio } from "./laboratorio-api";
import { Indicador, Medidor, hace, numero } from "./seguimiento";

const NIVELES: NivelCompetencia[] = ["Ejemplar", "Competente", "En desarrollo", "Inicial"];
/** Los colores de los niveles, como en el resultado del alumno; siempre van con su nombre y su cifra. */
const COLOR: Record<NivelCompetencia, string> = {
  Ejemplar: "bg-emerald-600",
  Competente: "bg-sky-600",
  "En desarrollo": "bg-amber-500",
  Inicial: "bg-red-600",
};
const CHIP: Record<NivelCompetencia, string> = {
  Ejemplar: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
  Competente: "bg-sky-500/15 text-sky-800 dark:text-sky-200",
  "En desarrollo": "bg-amber-500/15 text-amber-900 dark:text-amber-200",
  Inicial: "bg-red-500/10 text-red-800 dark:text-red-200",
};
const cifra = (x: number | null, unidad = "") => (x == null ? "—" : `${numero(x)}${unidad}`);
/** Todos los intentos en CSV (server/academia-laboratorio-informe.ts, RUTA_CSV_LABORATORIO). */
export const CSV_LABORATORIO = "/api/academia/direccion/laboratorio/exportar";

/** Cuántos alumnos quedaron en cada nivel con su mejor intento: una barra con cuatro tramos y su leyenda. */
function Niveles({ n }: { n: Record<NivelCompetencia, number> }) {
  const total = NIVELES.reduce((a, k) => a + n[k], 0);
  if (!total) return null;
  return (
    <div className="mt-3">
      <p className="text-xs text-muted-foreground mb-1.5">Con su mejor intento</p>
      <div className="flex h-2.5 w-full gap-[2px] overflow-hidden rounded-[4px]" role="img" aria-label={NIVELES.map((k) => `${k}: ${n[k]}`).join(", ")}>
        {NIVELES.filter((k) => n[k] > 0).map((k) => (
          <span key={k} className={`h-full ${COLOR[k]}`} style={{ width: `${(100 * n[k]) / total}%` }} />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        {NIVELES.map((k) => (
          <li key={k} className="inline-flex items-center gap-1.5">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${COLOR[k]}`} aria-hidden="true" /> {k} <span className="font-semibold tabular-nums">{n[k]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="rounded-lg bg-muted/50 px-2 py-2">
      <p className="text-xl font-semibold tabular-nums leading-none">{valor}</p>
      <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{etiqueta}</p>
    </div>
  );
}

function TarjetaPractica({ x }: { x: InformePractica }) {
  const dificiles = x.pasos
    .filter((p) => p.mejor !== null && p.mejor < 100)
    .sort((a, b) => (a.mejor ?? 0) - (b.mejor ?? 0))
    .slice(0, 3);
  return (
    <article className="glass-card p-4 sm:p-5 min-w-0" data-testid="informe-practica" data-id={x.id}>
      <p className="data-label text-orange-600 dark:text-orange-300">{x.materia.titulo} · {NOMBRE_FORMATO[x.formato]}</p>
      <h3 className="font-display text-lg font-bold mt-1 leading-snug">{x.titulo}</h3>
      <p className="text-sm text-muted-foreground mt-0.5">
        {numero(x.alumnos)} {x.alumnos === 1 ? "alumno" : "alumnos"} · {numero(x.terminados)} {x.terminados === 1 ? "terminada" : "terminadas"}
        {x.enCurso ? ` · ${numero(x.enCurso)} sin terminar` : ""}
      </p>
      {x.terminados === 0 ? (
        <p className="text-sm mt-3">Todavía nadie la terminó.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <Dato etiqueta="Primer intento" valor={cifra(x.primero)} />
            <Dato etiqueta="Mejor intento" valor={cifra(x.mejor)} />
            <Dato etiqueta="Con acción crítica" valor={cifra(x.conCritica, " %")} />
          </div>
          <Niveles n={x.niveles} />
          {dificiles.length > 0 && (
            <section className="mt-4">
              <h4 className="text-sm font-semibold">Donde más se equivocan</h4>
              <ul className="mt-1.5 space-y-1.5">
                {dificiles.map((p) => (
                  <li key={`${p.titulo}-${p.version}`} className="text-sm">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0">{p.titulo}{p.version ? <span className="text-muted-foreground"> ({p.version})</span> : null}</span>
                      <span className="tabular-nums text-muted-foreground shrink-0">{p.mejor} % eligió lo mejor</span>
                    </span>
                    <span className="block mt-1"><Medidor valor={p.mejor ?? 0} etiqueta={`${p.titulo}: ${p.mejor} % eligió lo mejor, de ${p.respuestas} respuestas`} /></span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {x.criticas.length > 0 && (
            <section className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 p-3" data-testid="informe-criticas">
              <h4 className="text-sm font-semibold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-red-600" aria-hidden="true" /> Acciones críticas más elegidas</h4>
              <ul className="mt-1.5 space-y-1.5 text-sm">
                {x.criticas.map((c, i) => (
                  <li key={i}>
                    <span className="break-words">{c.texto}</span>
                    <span className="block text-xs text-muted-foreground">{c.paso} · {c.veces === 1 ? "1 vez" : `${numero(c.veces)} veces`}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="mt-4">
            <h4 className="text-sm font-semibold">Por competencia</h4>
            <ul className="mt-1.5 space-y-2">
              {x.competencias.map((c) => (
                <li key={c.nombre} className="text-sm">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0">{c.nombre} <span className="text-xs text-muted-foreground">({c.leccion})</span></span>
                    <span className="tabular-nums shrink-0">{cifra(c.pct, " %")}</span>
                  </span>
                  <span className="block mt-1"><Medidor valor={c.pct ?? 0} etiqueta={`${c.nombre}: ${cifra(c.pct, " %")} en promedio`} /></span>
                </li>
              ))}
            </ul>
          </section>
          {x.sentir.length > 0 && (
            <p className="text-sm mt-4"><span className="font-semibold">Cómo se sintieron: </span>{x.sentir.map((s) => `${s.sentir} ${s.n}`).join(" · ")}</p>
          )}
          {x.llevo.length > 0 && (
            <section className="mt-3">
              <h4 className="text-sm font-semibold">Lo que se llevan</h4>
              <ul className="mt-1.5 space-y-1.5">
                {x.llevo.map((t, i) => (
                  <li key={i} className="text-sm italic border-l-2 border-orange-500/60 pl-3 break-words">{t}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
      <Link href={`/academia/laboratorio/${x.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-700 dark:text-orange-300 hover:underline">
        Ver la práctica <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

function Ultimos({ d, enlaceAlumno }: { d: Informe; enlaceAlumno: (id: number) => string }) {
  return (
    <section data-testid="informe-ultimos">
      <h3 className="font-display text-lg font-bold">Los últimos intentos</h3>
      {d.ultimos.length === 0 ? (
        <p className="text-sm text-muted-foreground mt-1">Todavía no hay intentos terminados.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {d.ultimos.map((u) => (
            <li key={u.id}>
              <Link href={`${enlaceAlumno(u.alumno.id)}?tab=informe&materia=${encodeURIComponent(u.materiaId)}`} className="glass-card p-3 flex items-center gap-3 border border-transparent hover:border-orange-500/50 transition">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold truncate">{u.alumno.nombre}</span>
                  <span className="block text-xs text-muted-foreground truncate">{u.practica} · {hace(u.cuando)}{u.cuenta ? "" : " · práctica libre"}</span>
                  <span className="mt-1 flex flex-wrap items-center gap-1.5">
                    {u.nivel && <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${CHIP[u.nivel]}`}>{u.nivel}</span>}
                    {u.criticas > 0 && (
                      <span className="text-[11px] font-semibold rounded-full px-2 py-0.5 bg-red-500/10 text-red-800 dark:text-red-200">
                        {u.criticas === 1 ? "1 acción crítica" : `${u.criticas} acciones críticas`}
                      </span>
                    )}
                  </span>
                </span>
                <span className="text-2xl font-semibold tabular-nums shrink-0">{u.nota ?? "—"}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function InformeLaboratorio({ enlaceAlumno }: { enlaceAlumno: (id: number) => string }) {
  const q = useInformeLaboratorio(true);
  if (q.isLoading) {
    return (
      <div className="py-16 flex justify-center" role="status" aria-label="Cargando el informe">
        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
      </div>
    );
  }
  if (!q.data) return <p className="text-sm text-red-600 py-8" role="alert">{q.error?.message ?? "No se pudo cargar el informe del laboratorio."}</p>;
  const d = q.data;
  const t = d.totales;
  return (
    <div className="space-y-6 pb-24" data-testid="direccion-laboratorio">
      <div>
        <h2 className="font-display text-xl font-bold flex items-center gap-2"><FlaskConical className="w-5 h-5 text-orange-500" aria-hidden="true" /> Laboratorio ministerial</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Cómo les va a los alumnos en las prácticas.{LABORATORIO.cuentaParaLaNota ? "" : " Es un piloto: todavía no cuenta para la nota."} No incluye tus intentos de prueba.
        </p>
        {t.terminados > 0 && (
          <a href={CSV_LABORATORIO} download className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-orange-700 dark:text-orange-300 hover:underline" data-testid="informe-descargar">
            <Download className="w-4 h-4" aria-hidden="true" /> Descargar todos los intentos (Excel)
          </a>
        )}
      </div>
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4" data-testid="informe-cifras">
        <Indicador etiqueta="Alumnos que practicaron" valor={t.alumnos} />
        <Indicador etiqueta="Prácticas terminadas" valor={t.terminados} />
        <Indicador etiqueta="Promedio" valor={cifra(t.promedio)} nota="con el mejor intento de cada alumno" />
        <Indicador etiqueta="Con acción crítica" valor={cifra(t.conCritica, " %")} nota="de las prácticas terminadas" />
      </div>
      {/* columnas que no crecen más que la pantalla, aunque un texto largo no tenga espacios */}
      <div className="grid gap-4 grid-cols-[minmax(0,1fr)] lg:grid-cols-[repeat(2,minmax(0,1fr))]">
        {d.practicas.map((x) => <TarjetaPractica key={x.id} x={x} />)}
      </div>
      <Ultimos d={d} enlaceAlumno={enlaceAlumno} />
    </div>
  );
}
