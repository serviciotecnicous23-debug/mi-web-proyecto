// Los recursos de estudio de toda la academia (/academia/recursos, server/academia-recursos.ts): los videos y audios de
// las lecciones, los recursos de cada sílabo y las lecturas ampliadas, con un buscador (sin importar tildes) y filtros
// por tipo, por nivel y por materia (?materia=<id>, el enlace de cada materia) que quedan en la dirección. Cada recurso
// dice de qué materia y de qué lección es.
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useSearch } from "wouter";
import { ArrowLeft, BookMarked, BookOpen, Clock, ExternalLink, FileText, Headphones, Layers, Library, Search, SearchX, Video, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Button } from "@/components/ui/button";
import type { RecursoListado, RecursosAcademia, TipoRecurso } from "@shared/academia-recursos";
import { contieneTodos, marcar, terminos } from "@shared/buscar-texto";
import { pedir, type ErrorAcademia } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";

const TIPOS: { id: TipoRecurso | "todos"; texto: string }[] = [
  { id: "todos", texto: "Todos" },
  { id: "video", texto: "Videos" },
  { id: "lectura", texto: "Lecturas" },
  { id: "ampliada", texto: "Lecturas ampliadas" },
  { id: "guia", texto: "Guías" },
  { id: "audio", texto: "Audios" },
];
const LUGARES = ["todo", "1", "2", "3", "4", "5", "especialidades"] as const;
type Lugar = (typeof LUGARES)[number];

const NOMBRE: Record<TipoRecurso, [string, string]> = {
  video: ["video", "videos"],
  lectura: ["lectura", "lecturas"],
  ampliada: ["lectura ampliada", "lecturas ampliadas"],
  guia: ["guía", "guías"],
  audio: ["audio", "audios"],
};
/** «227 videos, 109 lecturas y 16 lecturas ampliadas»: solo los tipos que hay. */
function resumenDe(lista: RecursoListado[]): string {
  const partes = (Object.keys(NOMBRE) as TipoRecurso[])
    .map((t) => [t, lista.filter((r) => r.tipo === t).length] as const)
    .filter(([, n]) => n > 0)
    .map(([t, n]) => `${n} ${NOMBRE[t][n === 1 ? 0 : 1]}`);
  return partes.length <= 1 ? partes.join("") : `${partes.slice(0, -1).join(", ")} y ${partes[partes.length - 1]}`;
}

const ICONO: Record<TipoRecurso, typeof Video> = { video: Video, audio: Headphones, lectura: BookOpen, guia: FileText, ampliada: BookMarked };

function Marcado({ texto, ts }: { texto: string; ts: string[] }) {
  return <>{marcar(texto, ts).map((p, i) => (p.m ? <mark key={i} className="bg-amber-300/70 dark:bg-amber-400/30 text-current rounded-sm px-0.5">{p.t}</mark> : <span key={i}>{p.t}</span>))}</>;
}

function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${activo ? "bg-orange-600 border-orange-600 text-white" : "bg-background/60 border-border hover:border-orange-500/60"}`}
    >
      {children}
    </button>
  );
}

function Recurso({ r, ts }: { r: RecursoListado; ts: string[] }) {
  const Icono = ICONO[r.tipo];
  const titulo = <Marcado texto={r.titulo} ts={ts} />;
  return (
    <li className="glass-card p-4 flex gap-3" data-testid="recurso">
      <Icono className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-medium leading-snug">
          {r.url ? (
            r.url.startsWith("/") ? (
              <Link href={r.url} className="hover:underline">{titulo}</Link>
            ) : (
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">{titulo} <ExternalLink className="w-3.5 h-3.5 shrink-0" /></a>
            )
          ) : titulo}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          <Marcado texto={r.fuente} ts={ts} />
          {r.minutos ? <span className="inline-flex items-center gap-0.5 ml-2"><Clock className="w-3 h-3" /> {r.minutos} min</span> : null}
        </p>
        <p className="text-xs mt-1.5">
          <Link href={`/academia/materia/${r.materia.id}`} className="text-orange-700 dark:text-orange-300 hover:underline"><Marcado texto={r.materia.titulo} ts={ts} /></Link>
          {r.leccion && (
            <>
              {" · "}
              <Link href={`/academia/leccion/${r.leccion.id}`} className="hover:underline">Lección {r.leccion.n}: <Marcado texto={r.leccion.titulo} ts={ts} /></Link>
            </>
          )}
          <span className="text-muted-foreground"> · {r.materia.lugar}</span>
        </p>
      </div>
    </li>
  );
}

export default function AcademiaRecursos() {
  const q = useQuery<RecursosAcademia, ErrorAcademia>({ queryKey: ["academia", "recursos"], queryFn: () => pedir("GET", "/api/academia/recursos"), retry: false });
  const search = useSearch();
  useTituloAcademia("Recursos de estudio");
  const inicial = useMemo(() => new URLSearchParams(search), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [texto, setTexto] = useState(inicial.get("q") ?? "");
  const [tipo, setTipo] = useState<TipoRecurso | "todos">(() => (TIPOS.find((t) => t.id === inicial.get("tipo"))?.id ?? "todos"));
  const [lugar, setLugar] = useState<Lugar>(() => ((LUGARES as readonly string[]).includes(inicial.get("ver") ?? "") ? (inicial.get("ver") as Lugar) : "todo"));
  // una sola materia, exacta (buscar su título traería también las de nombre parecido: «Homilética I» y «II»)
  const [materia, setMateria] = useState<string | null>(() => inicial.get("materia"));
  const entrada = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = new URLSearchParams();
    if (texto.trim()) p.set("q", texto.trim());
    if (tipo !== "todos") p.set("tipo", tipo);
    if (lugar !== "todo") p.set("ver", lugar);
    if (materia) p.set("materia", materia);
    const url = `/academia/recursos${p.toString() ? `?${p}` : ""}`;
    if (url !== window.location.pathname + window.location.search) window.history.replaceState(window.history.state, "", url);
  }, [texto, tipo, lugar, materia]);

  const ts = useMemo(() => terminos(texto), [texto]);
  const todos = q.data?.recursos ?? [];
  const deLaMateria = materia ? todos.filter((r) => r.materia.id === materia) : todos;
  const tituloMateria = materia ? (todos.find((r) => r.materia.id === materia)?.materia.titulo ?? null) : null;
  const enLugar = deLaMateria.filter((r) => lugar === "todo" || (lugar === "especialidades" ? r.materia.nivel == null : String(r.materia.nivel) === lugar));
  const buscados = enLugar.filter((r) => !ts.length || contieneTodos([r.titulo, r.fuente, r.materia.titulo, r.leccion?.titulo ?? "", r.materia.lugar].join("\n"), ts));
  const visibles = buscados.filter((r) => tipo === "todos" || r.tipo === tipo);
  // agrupados por materia, en el orden del plan de estudios
  const grupos = useMemo(() => {
    const m = new Map<string, { titulo: string; lugar: string; id: string; lista: RecursoListado[] }>();
    for (const r of visibles) {
      const g = m.get(r.materia.id) ?? { titulo: r.materia.titulo, lugar: r.materia.lugar, id: r.materia.id, lista: [] };
      g.lista.push(r);
      m.set(r.materia.id, g);
    }
    return [...m.values()];
  }, [visibles]);

  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (q.error || !q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center" role="alert">
          <SearchX className="w-12 h-12 mx-auto text-muted-foreground" aria-hidden="true" />
          <p className="text-lg mt-4">No se pudieron cargar los recursos de estudio.</p>
          <p className="text-sm text-muted-foreground mt-1">Revisa tu conexión e inténtalo otra vez.</p>
          <Button className="fire-btn-primary mt-6" onClick={() => q.refetch()}>Intentar otra vez</Button>
        </div>
      </Layout>
    );
  }
  const cuenta = (t: TipoRecurso | "todos") => buscados.filter((r) => t === "todos" || r.tipo === t).length;

  return (
    <Layout>
      <section className="relative overflow-hidden section-aurora pt-10 pb-8">
        <div className="hero-grid-bg absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <Link href="/academia/catalogo" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /> Catálogo</Link>
          <h1 className="heading-display font-display text-4xl md:text-5xl mt-2" data-testid="recursos-titulo">Recursos de estudio</h1>
          <p className="text-muted-foreground mt-2">
            {todos.length} recursos de las materias: {resumenDe(todos)}.
          </p>
          <div className="mt-6 relative max-w-3xl">
            <label htmlFor="recursos-buscar" className="sr-only">Buscar un video, una lectura, una materia o una lección</label>
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <input
              ref={entrada}
              id="recursos-buscar"
              type="search"
              value={texto}
              onChange={(ev) => setTexto(ev.target.value)}
              placeholder="Busca un video, una lectura, una materia o una lección"
              autoComplete="off"
              enterKeyHint="search"
              maxLength={80}
              className="block w-full h-14 rounded-2xl border border-border bg-background/80 pl-12 pr-12 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              data-testid="recursos-buscar"
            />
            {texto && (
              <button type="button" onClick={() => { setTexto(""); entrada.current?.focus(); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-muted" aria-label="Borrar la búsqueda">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Tipo de recurso">
              {TIPOS.filter((t) => t.id === "todos" || tipo === t.id || todos.some((r) => r.tipo === t.id)).map((t) => (
                <Chip key={t.id} activo={tipo === t.id} onClick={() => setTipo(t.id)}>
                  {t.texto} <span className={`text-xs ${tipo === t.id ? "text-white/85" : "text-muted-foreground"}`}>{cuenta(t.id)}</span>
                </Chip>
              ))}
            </div>
            {materia && (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Materia">
                <Chip activo onClick={() => setMateria(null)}>
                  <Library className="w-4 h-4" /> {tituloMateria ?? "Esta materia"} <X className="w-4 h-4" aria-hidden="true" /><span className="sr-only">(quitar el filtro de la materia)</span>
                </Chip>
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Nivel">
              {LUGARES.map((l) => (
                <Chip key={l} activo={lugar === l} onClick={() => setLugar(l)}>
                  {l === "todo" ? "Todo" : l === "especialidades" ? <><Layers className="w-4 h-4" /> Especialidades</> : `Nivel ${l}`}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <p className="text-sm text-muted-foreground py-4" aria-live="polite" data-testid="recursos-total">
          {visibles.length === 0 ? "Ningún recurso" : visibles.length === 1 ? "1 recurso" : `${visibles.length} recursos`}{ts.length ? ` con «${texto.trim()}»` : ""}
        </p>
        {visibles.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <SearchX className="w-10 h-10 mx-auto text-muted-foreground" aria-hidden="true" />
            <p className="font-semibold mt-3">{ts.length ? "No encontramos recursos con esa búsqueda." : "No hay recursos con esos filtros."}</p>
            <Button variant="outline" className="mt-4" onClick={() => { setTexto(""); setTipo("todos"); setLugar("todo"); setMateria(null); }}>Quitar la búsqueda y los filtros</Button>
          </div>
        ) : (
          <div className="space-y-8">
            {grupos.map((g) => (
              <section key={g.id} aria-labelledby={`recursos-${g.id}`}>
                <p className="data-label text-orange-600 dark:text-orange-300">{g.lugar}</p>
                <h2 id={`recursos-${g.id}`} className="font-display text-xl font-bold mb-3 flex items-center gap-2">
                  <Library className="w-5 h-5 text-orange-500" /> <Link href={`/academia/materia/${g.id}`} className="hover:underline">{g.titulo}</Link>
                </h2>
                <ul className="grid gap-3 md:grid-cols-2">
                  {g.lista.map((r, i) => <Recurso key={`${r.url ?? r.titulo}-${i}`} r={r} ts={ts} />)}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
