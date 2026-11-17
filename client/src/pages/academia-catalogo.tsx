// El catálogo de la academia (/academia/catalogo): todas las materias de los niveles y de las especialidades en una
// sola página. El buscador encuentra también las lecciones, los versículos de memoria y los autores de la bibliografía
// (sin importar tildes ni mayúsculas, shared/buscar-texto.ts); los filtros por nivel, especialidad y estado quedan en
// la dirección, así el enlace se puede compartir (la portada abre «Especialidades» con ?ver=especialidades). Cada
// materia muestra el avance del alumno y abre su página (también las que están en preparación, con «Avísame»).
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useSearch } from "wouter";
import { ArrowLeft, ArrowRight, BookMarked, BookOpen, Clock, GraduationCap, Layers, Library, Search, SearchX, X } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ESPECIALIDADES, NIVELES, type EstadoMateria, type Libro, type MateriaDef, type MateriaResumen } from "@shared/academia";
import { contieneAlguno, contieneTodos, marcar, terminos } from "@shared/buscar-texto";
import { useAcademiaEstado } from "@/components/academia/api";
import { BarraAvance, Cargando, ChipEstado, NotaMedalla, PantallaCerrada } from "@/components/academia/ui";
import { PestanasClases } from "@/components/academia/pestanas-clases";

type FiltroEstado = "todas" | "abiertas" | "en-curso" | "aprobada" | "en-preparacion";
const ESTADOS: { id: FiltroEstado; texto: string }[] = [
  { id: "todas", texto: "Todas" },
  { id: "abiertas", texto: "Abiertas" },
  { id: "en-curso", texto: "En curso" },
  { id: "aprobada", texto: "Aprobadas" },
  { id: "en-preparacion", texto: "En preparación" },
];
/** «todo», un nivel («1» a «5»), «especialidades» o el id de una especialidad. */
const VER_VALIDOS = new Set<string>(["todo", "1", "2", "3", "4", "5", "especialidades", ...ESPECIALIDADES.map((e) => e.id)]);
const DEFS = new Map<string, MateriaDef>([...NIVELES.flatMap((n) => n.materias), ...ESPECIALIDADES.flatMap((e) => e.materias)].map((m) => [m.id, m]));

const pasaEstado = (e: EstadoMateria, f: FiltroEstado) => (f === "todas" ? true : f === "abiertas" ? e !== "en-preparacion" : e === f);
const esEspecialidad = (ver: string) => ver === "especialidades" || ESPECIALIDADES.some((e) => e.id === ver);

/** Lo que la búsqueda encontró en la materia, con sus puntos para ordenar por relevancia. */
type Coincide = { lecciones: { n: number; titulo: string }[]; memoria: boolean; libro: Libro | null; puntos: number };
/** `lugar`: su nivel o su especialidad (se ve en los resultados de una búsqueda); `orden`: su lugar en el plan. */
type Fila = { r: MateriaResumen; def: MateriaDef | undefined; minutos: number; coincide: Coincide | null; lugar: string; orden: number };
type Grupo = { id: string; antetitulo: string; titulo: string; enlace: string | null; filas: Fila[] };

/** Lo que la búsqueda encontró en la materia (null si no la encuentra). Sin búsqueda, todo pasa. */
function buscarEn(def: MateriaDef | undefined, r: MateriaResumen, grupo: string, ts: string[]): Coincide | null | "todo" {
  if (!ts.length) return "todo";
  const libros = def?.silabo ? [...def.silabo.bibliografia.basica, ...def.silabo.bibliografia.complementaria] : [];
  const campos = [
    r.titulo, r.resumen, grupo, def?.base ?? "", def?.memoria ?? "", r.antes ?? "", def?.silabo?.proposito ?? "",
    ...(def?.lecciones ?? []).map((l) => l.titulo),
    ...libros.map((b) => `${b.autor} ${b.titulo}`),
  ];
  if (!contieneTodos(campos.join("\n"), ts)) return null;
  const lecciones = (def?.lecciones ?? []).map((l, i) => ({ n: i + 1, titulo: l.titulo })).filter((l) => contieneAlguno(l.titulo, ts));
  const memoria = !!def?.memoria && contieneAlguno(def.memoria, ts);
  const libro = libros.find((b) => contieneAlguno(`${b.autor} ${b.titulo}`, ts)) ?? null;
  // primero lo que lo dice en el título, después en sus lecciones, su versículo, su resumen, su bibliografía y sus pasajes
  const puntos =
    (contieneTodos(r.titulo, ts) ? 100 : contieneAlguno(r.titulo, ts) ? 40 : 0) +
    15 * Math.min(lecciones.length, 4) +
    (memoria ? 10 : 0) +
    (contieneAlguno(r.resumen, ts) ? 8 : 0) +
    (libro ? 5 : 0) +
    (def?.base && contieneAlguno(def.base, ts) ? 3 : 0);
  return { lecciones: lecciones.slice(0, 3), memoria, libro, puntos };
}

/** El texto con lo encontrado resaltado. */
function Marcado({ texto, ts }: { texto: string; ts: string[] }) {
  return (
    <>
      {marcar(texto, ts).map((p, i) =>
        p.m ? <mark key={i} className="bg-amber-300/70 dark:bg-amber-400/30 text-current rounded-sm px-0.5">{p.t}</mark> : <span key={i}>{p.t}</span>,
      )}
    </>
  );
}

function Chip({ activo, onClick, children, testid }: { activo: boolean; onClick: () => void; children: ReactNode; testid?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      data-testid={testid}
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        activo ? "bg-orange-600 border-orange-600 text-white shadow-sm" : "bg-background/60 border-border text-foreground hover:border-orange-500/60"
      }`}
    >
      {children}
    </button>
  );
}

function TarjetaCatalogo({ f, ts, conLugar = false }: { f: Fila; ts: string[]; conLugar?: boolean }) {
  const { r, def, coincide } = f;
  return (
    <Link
      href={`/academia/materia/${r.id}`}
      className={`glass-card h-full p-4 flex flex-col gap-2 border border-transparent hover:border-orange-500/40 hover:-translate-y-0.5 transition ${r.estado === "en-preparacion" ? "opacity-80" : ""}`}
      data-testid={`catalogo-materia-${r.id}`}
    >
      {conLugar && <p className="data-label text-[10px] text-orange-600 dark:text-orange-300">{f.lugar}</p>}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-snug"><Marcado texto={r.titulo} ts={ts} /></h3>
        {r.estado === "aprobada" && r.nota != null && <NotaMedalla nota={r.nota} medalla={r.medalla} />}
      </div>
      {r.resumen && <p className="text-sm text-muted-foreground leading-6 line-clamp-3"><Marcado texto={r.resumen} ts={ts} /></p>}
      {coincide && (coincide.lecciones.length > 0 || coincide.memoria || coincide.libro) && (
        <ul className="text-xs space-y-1 rounded-lg bg-muted/50 p-2" data-testid="catalogo-coincide">
          {coincide.lecciones.map((l) => (
            <li key={l.n} className="flex items-start gap-1.5"><BookOpen className="w-3.5 h-3.5 mt-0.5 text-orange-500 shrink-0" /><span>Lección {l.n}: <Marcado texto={l.titulo} ts={ts} /></span></li>
          ))}
          {coincide.memoria && def?.memoria && (
            <li className="flex items-start gap-1.5"><BookMarked className="w-3.5 h-3.5 mt-0.5 text-orange-500 shrink-0" /><span>Versículo de memoria: <Marcado texto={def.memoria} ts={ts} /></span></li>
          )}
          {coincide.libro && (
            <li className="flex items-start gap-1.5"><Library className="w-3.5 h-3.5 mt-0.5 text-orange-500 shrink-0" /><span>Bibliografía: <Marcado texto={`${coincide.libro.autor}, ${coincide.libro.titulo}`} ts={ts} /></span></li>
          )}
        </ul>
      )}
      <div className="mt-auto pt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
        <ChipEstado estado={r.estado} />
        {r.lecciones > 0 && <span className="inline-flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {r.lecciones} lecciones</span>}
        {f.minutos > 0 && <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {f.minutos} min</span>}
        {r.avanzada && <span>Avanzada</span>}
      </div>
      {r.estado === "en-curso" && r.lecciones > 0 && <BarraAvance valor={r.hechas} de={r.lecciones} etiqueta={`${r.hechas} de ${r.lecciones} lecciones`} />}
    </Link>
  );
}

export default function AcademiaCatalogo() {
  const q = useAcademiaEstado();
  const search = useSearch();
  // los filtros salen de la dirección al entrar y la dirección sigue a los filtros (sin llenar el historial)
  const inicial = useMemo(() => new URLSearchParams(search), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [texto, setTexto] = useState(inicial.get("q") ?? "");
  const [ver, setVer] = useState(() => (VER_VALIDOS.has(inicial.get("ver") ?? "") ? inicial.get("ver")! : "todo"));
  const [estado, setEstado] = useState<FiltroEstado>(() => (ESTADOS.find((x) => x.id === inicial.get("estado"))?.id ?? "todas"));
  const entrada = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = new URLSearchParams();
    if (texto.trim()) p.set("q", texto.trim());
    if (ver !== "todo") p.set("ver", ver);
    if (estado !== "todas") p.set("estado", estado);
    const url = `/academia/catalogo${p.toString() ? `?${p}` : ""}`;
    if (url !== window.location.pathname + window.location.search) window.history.replaceState(window.history.state, "", url);
  }, [texto, ver, estado]);

  // «/» lleva al buscador (como en los sitios profesionales), salvo que se esté escribiendo en otro lado
  useEffect(() => {
    const alTeclear = (ev: KeyboardEvent) => {
      if (ev.key !== "/" || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      const t = ev.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable='true']")) return;
      ev.preventDefault();
      entrada.current?.focus();
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, []);

  const ts = useMemo(() => terminos(texto), [texto]);
  const e = q.data;

  // todos los grupos (niveles y especialidades) con lo que pasa la búsqueda
  const grupos = useMemo<Grupo[]>(() => {
    if (!e) return [];
    let orden = 0;
    const fila = (r: MateriaResumen, grupo: string, lugar: string): Fila | null => {
      const def = DEFS.get(r.id);
      const c = buscarEn(def, r, grupo, ts);
      orden++;
      if (!c) return null;
      // (los minutos reales de la materia los calcula el servidor; los fijos, solo si no los manda)
      return { r, def, minutos: r.minutos ?? (def?.lecciones ?? []).reduce((a, l) => a + (l.minutos || 0), 0), coincide: c === "todo" ? null : c, lugar, orden };
    };
    const niveles = e.niveles.map((n) => ({
      id: String(n.n), antetitulo: `Nivel ${n.n} · ${n.para}`, titulo: n.nombre, enlace: `/academia/nivel/${n.n}`,
      filas: n.materias.map((r) => fila(r, `Nivel ${n.n} ${n.nombre}`, `Nivel ${n.n} · ${n.nombre}`)).filter((x): x is Fila => !!x),
    }));
    const especialidades = e.especialidades.map((esp) => ({
      id: esp.id, antetitulo: "Especialidad", titulo: esp.nombre,
      enlace: esp.materias.some((m) => m.estado !== "en-preparacion") ? `/academia/especialidad/${esp.id}` : null,
      filas: esp.materias.map((r) => fila(r, `Especialidad ${esp.nombre}`, `Especialidad · ${esp.nombre}`)).filter((x): x is Fila => !!x),
    }));
    return [...niveles, ...especialidades];
  }, [e, ts]);

  // lo que pasa el filtro de «dónde» (para contar los estados) y después el de estado
  const enLugar = grupos.filter((g) => ver === "todo" || g.id === ver || (ver === "especialidades" && !/^\d$/.test(g.id)));
  const visibles = enLugar.map((g) => ({ ...g, filas: g.filas.filter((x) => pasaEstado(x.r.estado, estado)) })).filter((g) => g.filas.length);
  const total = visibles.reduce((a, g) => a + g.filas.length, 0);
  // con una búsqueda, una sola lista ordenada por relevancia (cada tarjeta dice su nivel o especialidad)
  const resultados = ts.length
    ? visibles.flatMap((g) => g.filas).sort((a, b) => (b.coincide?.puntos ?? 0) - (a.coincide?.puntos ?? 0) || a.orden - b.orden)
    : [];
  const conFiltros = !!ts.length || ver !== "todo" || estado !== "todas";

  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403 || !e) return <PantallaCerrada mensaje={q.error?.message} />;

  const todas = [...e.niveles.flatMap((n) => n.materias), ...e.especialidades.flatMap((x) => x.materias)];
  const abiertas = todas.filter((m) => m.estado !== "en-preparacion").length;
  const lecciones = todas.reduce((a, m) => a + m.lecciones, 0);
  const aprobadas = todas.filter((m) => m.estado === "aprobada").length;
  const enCurso = todas.filter((m) => m.estado === "en-curso").length;
  const limpiar = () => {
    setTexto("");
    setVer("todo");
    setEstado("todas");
    entrada.current?.focus();
  };

  return (
    <Layout>
      <section className="relative overflow-hidden section-aurora pt-10 pb-8">
        <div className="hero-grid-bg absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {e.conSesion && <PestanasClases actual="academia" className="mb-6" />}
          <Link href="/academia" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground" data-testid="catalogo-volver">
            <ArrowLeft className="w-4 h-4" /> Academia
          </Link>
          <h1 className="heading-display font-display text-4xl md:text-5xl mt-2" data-testid="catalogo-titulo">Catálogo de materias</h1>
          <Link href="/academia/recursos" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-orange-700 dark:text-orange-300 hover:underline" data-testid="catalogo-recursos">
            <Library className="w-4 h-4" /> Ver todos los recursos de estudio: videos, lecturas y lecturas ampliadas
          </Link>
          <p className="text-muted-foreground mt-2">
            {todas.length} materias en {e.niveles.length} niveles y {e.especialidades.length} especialidades · {abiertas} abiertas · {lecciones} lecciones
          </p>
          {e.alumno && (aprobadas > 0 || enCurso > 0) && (
            <p className="text-sm mt-1" data-testid="catalogo-mi-avance">
              <GraduationCap className="w-4 h-4 inline -mt-0.5 text-orange-500" /> Tu avance: {aprobadas} {aprobadas === 1 ? "aprobada" : "aprobadas"} · {enCurso} en curso
            </p>
          )}

          {/* el buscador */}
          <div className="mt-6 relative max-w-3xl">
            <label htmlFor="catalogo-buscar" className="sr-only">Buscar una materia, una lección, un versículo o un autor</label>
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <input
              ref={entrada}
              id="catalogo-buscar"
              type="search"
              value={texto}
              onChange={(ev) => setTexto(ev.target.value)}
              onKeyDown={(ev) => { if (ev.key === "Escape" && texto) { ev.preventDefault(); setTexto(""); } }}
              placeholder="Busca una materia, una lección, un versículo o un autor"
              autoComplete="off"
              enterKeyHint="search"
              maxLength={80}
              className="block w-full h-14 rounded-2xl border border-border bg-background/80 pl-12 pr-24 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              data-testid="catalogo-buscar"
            />
            {texto ? (
              <button type="button" onClick={() => { setTexto(""); entrada.current?.focus(); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-muted" aria-label="Borrar la búsqueda" data-testid="catalogo-borrar">
                <X className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 rounded border border-border px-2 py-0.5 text-xs text-muted-foreground" aria-hidden="true">/</kbd>
            )}
          </div>

          {/* los filtros: dónde y en qué estado */}
          <div className="mt-4 space-y-2">
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Dónde buscar">
              <Chip activo={ver === "todo"} onClick={() => setVer("todo")} testid="catalogo-ver-todo">Todo</Chip>
              {e.niveles.map((n) => (
                <Chip key={n.n} activo={ver === String(n.n)} onClick={() => setVer(String(n.n))} testid={`catalogo-ver-${n.n}`}>Nivel {n.n}</Chip>
              ))}
              <Chip activo={esEspecialidad(ver)} onClick={() => setVer("especialidades")} testid="catalogo-ver-especialidades"><Layers className="w-4 h-4" /> Especialidades</Chip>
            </div>
            {esEspecialidad(ver) && (
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Especialidad">
                <Chip activo={ver === "especialidades"} onClick={() => setVer("especialidades")}>Todas</Chip>
                {e.especialidades.map((x) => (
                  <Chip key={x.id} activo={ver === x.id} onClick={() => setVer(x.id)} testid={`catalogo-esp-${x.id}`}>{x.nombre}</Chip>
                ))}
              </div>
            )}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Estado">
              {ESTADOS.filter((x) => e.conSesion || (x.id !== "en-curso" && x.id !== "aprobada")).map((x) => {
                const n = enLugar.reduce((a, g) => a + g.filas.filter((f) => pasaEstado(f.r.estado, x.id)).length, 0);
                return (
                  <Chip key={x.id} activo={estado === x.id} onClick={() => setEstado(x.id)} testid={`catalogo-estado-${x.id}`}>
                    {x.texto} <span className={`text-xs ${estado === x.id ? "text-white/85" : "text-muted-foreground"}`}>{n}</span>
                  </Chip>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-2 py-4">
          <p className="text-sm text-muted-foreground" aria-live="polite" data-testid="catalogo-total">
            {total === 0 ? "Ninguna materia" : total === 1 ? "1 materia" : `${total} materias`}
            {ts.length ? ` con «${texto.trim()}»` : ""}
          </p>
          {conFiltros && (
            <button type="button" onClick={limpiar} className="text-sm text-orange-700 dark:text-orange-300 hover:underline underline-offset-2" data-testid="catalogo-limpiar">
              Quitar la búsqueda y los filtros
            </button>
          )}
        </div>

        {total === 0 ? (
          <div className="glass-card p-8 text-center" data-testid="catalogo-vacio">
            <SearchX className="w-10 h-10 mx-auto text-muted-foreground" aria-hidden="true" />
            <p className="font-semibold mt-3">No encontramos materias{ts.length ? ` con «${texto.trim()}»` : ""}{ver !== "todo" || estado !== "todas" ? " con estos filtros" : ""}.</p>
            <p className="text-sm text-muted-foreground mt-1">Prueba con otra palabra, por ejemplo oración, profetas, Romanos o Pearlman, o quita los filtros.</p>
            <Button variant="outline" className="mt-4" onClick={limpiar}>Quitar la búsqueda y los filtros</Button>
          </div>
        ) : resultados.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-testid="catalogo-resultados">
            {resultados.map((f) => <TarjetaCatalogo key={f.r.id} f={f} ts={ts} conLugar />)}
          </div>
        ) : (
          <div className="space-y-10">
            {visibles.map((g) => (
              <section key={g.id} aria-labelledby={`grupo-${g.id}`} data-testid={`catalogo-grupo-${g.id}`}>
                <div className="flex flex-wrap items-end justify-between gap-2 mb-3">
                  <div>
                    <p className="data-label text-orange-600 dark:text-orange-300">{g.antetitulo}</p>
                    <h2 id={`grupo-${g.id}`} className="font-display text-2xl font-bold">{g.titulo}</h2>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground">{g.filas.length} {g.filas.length === 1 ? "materia" : "materias"}</span>
                    {g.enlace && (
                      <Link href={g.enlace} className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300 hover:underline underline-offset-2">
                        {/^\d$/.test(g.id) ? "Ver el nivel" : "Ver la especialidad"} <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.filas.map((f) => <TarjetaCatalogo key={f.r.id} f={f} ts={ts} />)}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
