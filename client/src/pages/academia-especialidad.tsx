// La página de una especialidad (server/academia-especialidad.ts): sus cinco materias con el avance del alumno, el
// trabajo final que las integra y el Certificado de Especialidad, que sale solo con las cinco materias y el trabajo
// aprobados. El trabajo se escribe aquí, con el contador de palabras: hay 3 entregas y cuenta la mejor; la respuesta
// modelo se ve después de la última.
import { useState } from "react";
import { Link, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Award, Layers, PenLine, Send } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { loginUrl } from "@/lib/login-redirect";
import { NOMBRE_ACADEMIA, medallaDe, type EspecialidadDetalle } from "@shared/academia";
import { entregarTrabajo, useEspecialidad } from "@/components/academia/api";
import { EscritaCorregida } from "@/components/academia/examen";
import { AvisoInscripcion, AvisoVistaPrevia, BarraAvance, Cargando, ChipEstado, NotaMedalla, PantallaCerrada } from "@/components/academia/ui";

const palabras = (t: string) => t.split(/\s+/).filter(Boolean).length;

type Materia = EspecialidadDetalle["materias"][number];

function TarjetaMateria({ m }: { m: Materia }) {
  const contenido = (
    <div className={`glass-card h-full p-4 flex flex-col gap-3 transition hover:-translate-y-0.5 ${m.estado === "en-preparacion" ? "opacity-75 hover:opacity-100" : ""}`} data-testid={`materia-${m.id}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-snug">{m.titulo}</h3>
        {m.estado === "aprobada" && m.nota != null ? <NotaMedalla nota={m.nota} medalla={medallaDe(m.nota)} /> : null}
      </div>
      {m.resumen && <p className="text-sm text-muted-foreground leading-6">{m.resumen}</p>}
      <div className="mt-auto space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <ChipEstado estado={m.estado} />
          {m.lecciones > 0 && <span className="text-xs text-muted-foreground">{m.lecciones} lecciones</span>}
          {m.avanzada && <span className="text-xs text-muted-foreground">Avanzada</span>}
        </div>
        {(m.estado === "en-curso" || m.estado === "aprobada") && m.lecciones > 0 && <BarraAvance valor={m.hechas} de={m.lecciones} etiqueta={`${m.hechas} de ${m.lecciones} lecciones`} />}
        {m.estado !== "aprobada" && m.estado !== "en-preparacion" && m.requisitos.length > 0 && (
          <p className="text-xs text-muted-foreground">Para inscribirte: {m.requisitos.join(" y ")}.</p>
        )}
      </div>
    </div>
  );
  // también la que está en preparación: su página dice lo que viene y tiene «Avísame cuando abra»
  return <Link href={`/academia/materia/${m.id}`} className="block h-full">{contenido}</Link>;
}

function TrabajoFinal({ d }: { d: EspecialidadDetalle }) {
  const qc = useQueryClient();
  const [texto, setTexto] = useState("");
  const [pegado, setPegado] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = d.trabajo!;
  const n = palabras(texto);
  const puede = d.conSesion && !t.falta.length && !t.cerrado;
  const entregar = async () => {
    setOcupado(true);
    setError(null);
    try {
      const nueva = await entregarTrabajo(d.id, texto, pegado);
      qc.setQueryData(["academia", "especialidad", d.id], nueva);
      void qc.invalidateQueries({ queryKey: ["academia", "estado"] });
      void qc.invalidateQueries({ queryKey: ["academia", "certificados"] });
      setTexto("");
      setPegado(false);
      document.getElementById("trabajo-final")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <section id="trabajo-final" className="space-y-4 scroll-mt-24" data-testid="trabajo-final">
      <div>
        <h2 className="font-display text-2xl font-bold flex items-center gap-2"><PenLine className="w-6 h-6 text-orange-500" /> El trabajo final</h2>
        <p className="text-muted-foreground mt-1">
          Un escrito de {t.min} a {t.max} palabras que une lo aprendido en las cinco materias, con tus palabras y con citas de la Biblia. Se entrega con las
          cinco materias aprobadas. Lo corrige el sistema idea por idea y lo puede revisar la Administración. Tienes {t.maxEntregas} entregas y cuenta la
          mejor; se aprueba con 70. No tiene reloj: escríbelo con calma.
        </p>
      </div>

      <div className="glass-card p-5" data-testid="trabajo-consigna">
        <p className="data-label mb-2">La consigna</p>
        <p className="text-[16px] leading-7">{t.pregunta}</p>
        {d.conSesion && <p className="text-xs text-muted-foreground mt-3">Entregas: {t.entregas} de {t.maxEntregas}{t.mejor != null ? ` · Mejor nota: ${t.mejor}` : ""}</p>}
      </div>

      {t.ultimo && (
        <div data-testid="trabajo-resultado">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="font-display text-xl font-bold">{t.entregas >= t.maxEntregas ? "Tu última entrega" : `Tu entrega ${t.entregas} de ${t.maxEntregas}`}</h3>
            <NotaMedalla nota={t.ultimo.nota} medalla={t.ultimo.medalla} />
          </div>
          {t.ultimo.escritas.map((w, i) => <EscritaCorregida key={i} w={w} />)}
          {t.entregas < t.maxEntregas && !d.certificado && (
            <p className="text-sm text-muted-foreground">Mira qué ideas faltaron y vuelve a escribirlo: cuenta la mejor de tus entregas. La respuesta modelo se muestra después de la última.</p>
          )}
        </div>
      )}

      {d.conSesion && t.falta.length > 0 && <p className="glass-card p-4 text-sm" data-testid="trabajo-falta">Para entregarlo te falta {t.falta.join(" y ")}.</p>}
      {t.cerrado && <p className="glass-card p-4 text-sm" data-testid="trabajo-cerrado">{t.cerrado}</p>}

      {puede && (
        <div className="glass-card p-5 space-y-3" data-testid="trabajo-formulario">
          <label className="text-sm font-medium block" htmlFor="trabajo-texto">{t.entregas ? `Tu entrega ${t.entregas + 1} de ${t.maxEntregas}` : "Tu trabajo final"}</label>
          <Textarea
            id="trabajo-texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onPaste={() => setPegado(true)}
            rows={18}
            maxLength={14000}
            className="text-[16px] leading-7"
            data-testid="trabajo-texto"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className={n < t.min || n > t.max ? "text-orange-700 dark:text-orange-300" : "text-emerald-700 dark:text-emerald-300"} data-testid="trabajo-palabras">
              {n} palabras (de {t.min} a {t.max})
            </span>
            {pegado && <span className="text-xs text-muted-foreground">Pegaste texto: queda anotado para la revisión.</span>}
          </div>
          <Button className="fire-btn-primary" disabled={ocupado || n < t.min || n > t.max} onClick={entregar} data-testid="trabajo-entregar">
            <Send className="w-4 h-4 mr-1.5" /> {ocupado ? "Corrigiendo…" : "Entregar"}
          </Button>
          {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      )}
    </section>
  );
}

export default function AcademiaEspecialidad() {
  const { especialidadId } = useParams<{ especialidadId: string }>();
  const q = useEspecialidad(especialidadId);
  useTituloAcademia(q.data ? `Especialidad · ${q.data.nombre}` : "Especialidad");
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-5">{q.error?.message ?? "No se encontró la especialidad."}</p>
          <Link href="/academia"><Button variant="outline">Volver a la academia</Button></Link>
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const total = d.materias.length;
  const listas = d.materias.filter((m) => m.estado !== "en-preparacion").length;
  const volver = `/academia/especialidad/${d.id}`;
  return (
    <Layout>
      {d.vistaPrevia && <AvisoVistaPrevia />}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-16 space-y-8">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> {NOMBRE_ACADEMIA}</Link>
        <header>
          <p className="data-label text-orange-600 dark:text-orange-300">Especialidad</p>
          <h1 className="heading-display font-display text-3xl md:text-4xl mt-1 flex items-center gap-3"><Layers className="w-8 h-8 text-orange-500 shrink-0" /> {d.nombre}</h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">{d.resumen}</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
            Tiene {total} materias y un trabajo final. Se abre al terminar el Nivel 2 (las materias avanzadas piden el Nivel 3), cada materia da su certificado
            y, con las {total} y el trabajo final aprobados, recibes el Certificado de Especialidad en {d.nombre}.
          </p>
        </header>

        {!d.conSesion && (
          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3" role="note">
            <p className="text-sm flex-1">Entra con tu cuenta para ver tu avance en la especialidad.</p>
            <a href={loginUrl(volver)}><span className="inline-flex items-center rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 cursor-pointer">Entrar</span></a>
          </div>
        )}
        {d.conSesion && d.trabajo?.falta.includes("inscribirte en la academia") && (
          <AvisoInscripcion texto="Para estudiar la especialidad y guardar tu avance, primero inscríbete en la academia." volver={volver} />
        )}

        {d.certificado && (
          <section className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 border border-orange-500/30" data-testid="especialidad-certificado">
            {d.nota != null && <NotaMedalla nota={d.nota} medalla={medallaDe(d.nota)} />}
            <div className="flex-1">
              <p className="font-semibold flex items-center gap-2"><Award className="w-5 h-5 text-orange-500" /> Completaste la especialidad{d.honores ? ", con honores" : ""}</p>
              <p className="text-sm text-muted-foreground">Tu nota es el promedio de las {total} materias y del trabajo final.</p>
            </div>
            <Link href={`/academia/certificado/${d.certificado}`}><Button className="fire-btn-primary">Ver mi certificado <ArrowRight className="w-4 h-4 ml-1.5" /></Button></Link>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-bold">Las materias</h2>
            {d.conSesion ? (
              <div className="w-full sm:w-64"><BarraAvance valor={d.aprobadas} de={total} etiqueta={`${d.aprobadas} de ${total} materias aprobadas`} /></div>
            ) : (
              <span className="text-sm text-muted-foreground">{listas} de {total} materias listas</span>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {d.materias.map((m) => <TarjetaMateria key={m.id} m={m} />)}
          </div>
        </section>

        {d.trabajo ? (
          <TrabajoFinal d={d} />
        ) : (
          <section className="glass-card p-5" data-testid="trabajo-en-preparacion">
            <h2 className="font-display text-xl font-bold flex items-center gap-2"><PenLine className="w-5 h-5 text-orange-500" /> El trabajo final</h2>
            <p className="text-sm text-muted-foreground mt-1">Se publica cuando la especialidad tenga sus {total} materias listas.</p>
          </section>
        )}
      </div>
    </Layout>
  );
}
