// Piezas comunes de las pantallas de la academia: medallas, avance, estados, bloques de lección y avisos.
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { BookOpen, CheckCircle2, Clock, ExternalLink, GraduationCap, Headphones, History, ListOrdered, Lock, ShieldCheck, Sparkles, Table2, Video } from "lucide-react";
import { LinkEmbed } from "@/components/media/LinkEmbed";
import { Layout } from "@/components/layout";
import { VideoYouTube } from "./video-youtube";
import { LEMA, NOMBRE_MEDALLA, calificacion, type BloqueVista, type EstadoMateria, type Medalla, idYouTube } from "@shared/academia-base";
import { conMarcas, type Marca } from "@/components/cuaderno/marcas";

// El número va con el color del texto del tema (se lee en claro y en oscuro); la medalla la dan el aro y el fondo.
const COLOR_MEDALLA: Record<Medalla, { aro: string; fondo: string }> = {
  oro: { aro: "#c9a227", fondo: "rgba(201,162,39,.18)" },
  plata: { aro: "#a8b0ba", fondo: "rgba(168,176,186,.2)" },
  bronce: { aro: "#b4743c", fondo: "rgba(180,116,60,.18)" },
};

/** La nota con su medalla académica (oro desde 95, plata desde 85, bronce desde 70). */
export function NotaMedalla({ nota, medalla, grande = false }: { nota: number; medalla: Medalla | null; grande?: boolean }) {
  const c = medalla ? COLOR_MEDALLA[medalla] : null;
  const tam = grande ? "w-24 h-24 text-3xl" : "w-12 h-12 text-base";
  return (
    <div className="flex items-center gap-3" data-testid="nota-medalla">
      <div
        className={`${tam} rounded-full flex items-center justify-center font-display font-bold shrink-0 text-foreground`}
        style={{ border: `3px solid ${c?.aro ?? "rgba(148,148,148,.5)"}`, background: c?.fondo ?? "transparent" }}
        aria-label={`Nota ${nota} de 100`}
      >
        {nota}
      </div>
      <div className="leading-tight">
        <p className={grande ? "text-xl font-semibold" : "text-sm font-semibold"}>{calificacion(nota)}</p>
        {medalla && <p className="text-xs text-muted-foreground">{NOMBRE_MEDALLA[medalla]}</p>}
      </div>
    </div>
  );
}

export function BarraAvance({ valor, de, etiqueta }: { valor: number; de: number; etiqueta?: string }) {
  const pct = de ? Math.round((100 * valor) / de) : 0;
  return (
    <div className="w-full" aria-label={etiqueta ?? `${valor} de ${de}`}>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#ff7a1a,#ffb347)" }} />
      </div>
      {etiqueta && <p className="text-xs text-muted-foreground mt-1">{etiqueta}</p>}
    </div>
  );
}

/** El encabezado de cada fila de un cuadro, con la letra del texto (no la de los th de styles.css). */
const FILA_NORMAL = { fontFamily: "inherit", fontSize: "inherit", letterSpacing: "normal", textTransform: "none" } as const;

const ESTADO: Record<EstadoMateria, { texto: string; clase: string }> = {
  "en-preparacion": { texto: "En preparación", clase: "bg-muted text-muted-foreground" },
  disponible: { texto: "Disponible", clase: "bg-orange-500/15 text-orange-600 dark:text-orange-300" },
  "en-curso": { texto: "En curso", clase: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
  aprobada: { texto: "Aprobada", clase: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
};
export function ChipEstado({ estado }: { estado: EstadoMateria }) {
  const e = ESTADO[estado];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${e.clase}`}>{estado === "aprobada" ? <CheckCircle2 className="w-3 h-3" /> : estado === "en-preparacion" ? <Lock className="w-3 h-3" /> : null}{e.texto}</span>;
}

/** La inscripción en la academia, con la vuelta a la página donde estaba. */
export const enlaceInscripcion = (volver?: string) => (volver ? `/academia/inscripcion?volver=${encodeURIComponent(volver)}` : "/academia/inscripcion");

/** Para quien todavía no se inscribió en la academia: sin inscripción se lee, pero no se guarda el avance. */
export function AvisoInscripcion({ texto, volver, boton = "Inscribirme" }: { texto: string; volver?: string; boton?: string }) {
  return (
    <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 border border-orange-500/30" role="note" data-testid="aviso-inscripcion">
      <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
      <p className="text-sm flex-1">{texto}</p>
      <Link href={enlaceInscripcion(volver)}><span className="inline-flex items-center rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 cursor-pointer">{boton}</span></Link>
    </div>
  );
}

export function AvisoVistaPrevia() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="glass-card p-4 flex items-start gap-3 border border-orange-500/30" role="note" data-testid="academia-vista-previa">
        <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong>Vista previa.</strong> La academia está cerrada al público: por ahora la ven solo la Administración y, para consultar, los maestros y
          las iglesias aliadas. La Administración la abre para todos desde su panel.
        </p>
      </div>
    </div>
  );
}

export function PantallaCerrada({ mensaje }: { mensaje?: string }) {
  return (
    <Layout>
      <section className="relative overflow-hidden section-aurora py-24">
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <GraduationCap className="w-12 h-12 mx-auto text-orange-500 mb-5" />
          <h1 className="heading-display font-display text-4xl md:text-5xl mb-4">
            Academia <span className="fire-text">Avivando el Fuego</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{mensaje ?? "La academia abre muy pronto."}</p>
          <p className="accent-serif text-xl">«{LEMA.frase}»</p>
          <p className="data-label mt-2">{LEMA.ref}</p>
        </div>
      </section>
    </Layout>
  );
}

export function Cargando() {
  return (
    <Layout>
      <div className="min-h-[50vh] flex items-center justify-center" role="status" aria-label="Cargando">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    </Layout>
  );
}

/** Un bloque de una lección: texto, versículo (de la RV1960 de la web), lista, nota, video, audio o imagen. */
/** `marcas`: lo que el alumno resaltó en este bloque (su cuaderno: components/cuaderno). */
export function BloqueLeccion({ b, alVerVideo, marcas }: { b: BloqueVista; alVerVideo?: (segundos: number) => void; marcas?: Marca[] }) {
  switch (b.t) {
    case "subtitulo":
      return <h2 className="font-display font-semibold text-xl md:text-2xl mt-8 mb-3">{b.texto}</h2>;
    case "parrafo":
      return <p className="text-[17px] leading-8 mb-4">{conMarcas(b.texto, marcas)}</p>;
    case "lista":
      return (
        <ul className="list-disc pl-6 space-y-2 mb-4 text-[17px] leading-8">
          {b.items.map((x) => <li key={x}>{conMarcas(x, marcas)}</li>)}
        </ul>
      );
    case "nota":
      return (
        <aside className="glass-card p-5 my-6 border-l-4" style={{ borderLeftColor: "#ff7a1a" }}>
          {b.titulo && <p className="data-label text-orange-600 dark:text-orange-300 mb-2 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />{b.titulo}</p>}
          <p className="text-[16px] leading-7">{conMarcas(b.texto, marcas)}</p>
        </aside>
      );
    case "versiculo":
      return (
        <figure className="my-6 rounded-2xl p-5 md:p-6 bg-orange-500/[0.07] border border-orange-500/20" data-testid="versiculo">
          <blockquote className="accent-serif text-lg md:text-xl leading-8">{b.texto ? conMarcas(b.texto, marcas) : "No se pudo cargar el texto ahora; ábrelo en la Biblia."}</blockquote>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-semibold">{b.ref} <span className="text-muted-foreground font-normal">· RV1960</span></span>
            {b.enlace && (
              <Link href={b.enlace} className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-300 hover:underline">
                <BookOpen className="w-4 h-4" /> Leer el capítulo
              </Link>
            )}
          </figcaption>
        </figure>
      );
    case "video":
      return (
        <figure className="my-6">
          <p className="data-label mb-2 flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> Video{b.minutos ? ` · ${b.minutos} min` : ""}</p>
          {alVerVideo && idYouTube(b.url) ? <VideoYouTube id={idYouTube(b.url)!} titulo={b.titulo} alProgresar={alVerVideo} /> : <LinkEmbed url={b.url} />}
          <figcaption className="text-sm text-muted-foreground mt-2">
            {b.titulo} · Fuente: {b.fuente}{" "}
            <a href={b.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir el video «${b.titulo}» en otra pestaña`} className="inline-flex items-center gap-0.5 py-1 hover:underline">
              abrir <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      );
    case "audio":
      return (
        <figure className="my-6 glass-card p-4">
          <p className="data-label mb-2 flex items-center gap-1.5"><Headphones className="w-3.5 h-3.5" /> {b.titulo}</p>
          <audio controls preload="none" src={b.url} className="w-full" />
        </figure>
      );
    case "imagen":
      return (
        <figure className="my-6">
          <img src={b.src} alt={b.alt} loading="lazy" className="rounded-xl w-full" />
          {b.pie && <figcaption className="text-sm text-muted-foreground mt-2">{b.pie}</figcaption>}
        </figure>
      );
    // los esquemas visuales (revisión del 16-nov): línea de tiempo, cuadro comparativo y pasos. Pintan lo que el alumno
    // resaltó (conMarcas en cada texto) y cada texto termina en un espacio: así lo que se copia o se lleva al cuaderno
    // no sale pegado (la selección del cuaderno une los textos tal cual: components/cuaderno/seleccion.ts).
    case "linea":
      return (
        <figure className="my-6 glass-card p-5" data-testid="esquema-linea">
          <figcaption className="data-label text-orange-600 dark:text-orange-300 mb-4 flex items-center gap-1.5"><History className="w-3.5 h-3.5" /> {b.titulo}</figcaption>
          {/* role="list": Safari les quita la semántica de lista a las que no tienen viñetas */}
          <ol role="list" className="relative ml-2 border-l-2 border-orange-500/40 space-y-4">
            {b.eventos.map((e, i) => (
              <li key={i} className="relative pl-5">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-background" aria-hidden="true" />
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">{conMarcas(e.fecha, marcas)}{" "}</p>
                <p className="text-[15px] leading-6">{conMarcas(e.texto, marcas)}{e.ref ? <span className="text-muted-foreground"> ({e.ref})</span> : null}{" "}</p>
              </li>
            ))}
          </ol>
        </figure>
      );
    case "cuadro":
      return <Cuadro b={b} marcas={marcas} />;
    case "pasos":
      return (
        <figure className="my-6 glass-card p-5" data-testid="esquema-pasos">
          <figcaption className="data-label text-orange-600 dark:text-orange-300 mb-4 flex items-center gap-1.5"><ListOrdered className="w-3.5 h-3.5" /> {b.titulo}</figcaption>
          <ol role="list" className="space-y-3">
            {b.pasos.map((x, i) => (
              <li key={i} className="flex gap-3">
                {/* el número se dibuja con CSS (no es texto: no se copia), y el lector de pantalla oye «Paso N» */}
                <span data-n={i + 1} className="w-7 h-7 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 text-sm font-semibold flex items-center justify-center shrink-0 before:content-[attr(data-n)]" aria-hidden="true" />
                <div>
                  <p className="font-semibold leading-7"><span className="sr-only">Paso {i + 1}: </span>{conMarcas(x.titulo, marcas)}{" "}</p>
                  <p className="text-[15px] leading-6 text-muted-foreground">{conMarcas(x.texto, marcas)}{" "}</p>
                </div>
              </li>
            ))}
          </ol>
        </figure>
      );
  }
}

/**
 * El cuadro comparativo: en la computadora, la tabla; en el teléfono, una tarjeta por fila con cada dato y su columna.
 * Se dibuja una sola de las dos (no las dos con una escondida), para que lo que se selecciona no traiga el texto doble.
 */
const ANGOSTA = "(max-width: 639.98px)";
/** ¿La pantalla es angosta (menos de 640 px, el «sm» de Tailwind)? Se sabe desde el primer dibujo, sin saltos. */
function useAngosta(): boolean {
  const [angosta, setAngosta] = useState(() => typeof window !== "undefined" && window.matchMedia(ANGOSTA).matches);
  useEffect(() => {
    const mq = window.matchMedia(ANGOSTA);
    const cambio = () => setAngosta(mq.matches);
    cambio();
    mq.addEventListener("change", cambio);
    return () => mq.removeEventListener("change", cambio);
  }, []);
  return angosta;
}

function Cuadro({ b, marcas }: { b: Extract<BloqueVista, { t: "cuadro" }>; marcas?: Marca[] }) {
  const telefono = useAngosta();
  return (
    <figure className="my-6 glass-card p-4 md:p-5" data-testid="esquema-cuadro">
      <figcaption className="data-label text-orange-600 dark:text-orange-300 mb-3 flex items-center gap-1.5"><Table2 className="w-3.5 h-3.5" /> {b.titulo}</figcaption>
      {!telefono ? (
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>{b.columnas.map((c, i) => <th key={i} scope="col" className="text-left align-bottom p-2 border-b-2 border-orange-500/40 font-semibold">{c}{" "}</th>)}</tr>
            </thead>
            <tbody>
              {b.filas.map((f, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0 align-top">
                  {/* la regla global de th (styles.css, sin capa) pone mayúsculas y letra de máquina: aquí, letra normal */}
                  {f.map((c, k) =>
                    k === 0 ? (
                      <th key={k} scope="row" className="text-left p-2 font-semibold leading-6" style={FILA_NORMAL}>{conMarcas(c, marcas)}{" "}</th>
                    ) : (
                      <td key={k} className="p-2 leading-6">{conMarcas(c, marcas)}{" "}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-3">
          {b.filas.map((f, i) => (
            <div key={i} className="rounded-xl border border-border/70 p-3">
              <p className="font-semibold">{conMarcas(f[0], marcas)}{" "}</p>
              <dl className="mt-1 space-y-1 text-sm">
                {f.slice(1).map((c, k) => (
                  <div key={k}>
                    <dt className="text-xs text-muted-foreground">{b.columnas[k + 1]}{" "}</dt>
                    <dd className="leading-6">{conMarcas(c, marcas)}{" "}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      )}
    </figure>
  );
}

export function Minutos({ min }: { min: number }) {
  return <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" />{min} min</span>;
}
