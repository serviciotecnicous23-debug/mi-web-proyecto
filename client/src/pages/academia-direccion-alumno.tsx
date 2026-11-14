// Un alumno en el panel de seguimiento: su ficha (con permiso de ver el contacto), su avance en cada materia, sus
// niveles, sus certificados y su actividad (server/academia-direccion.ts). Aquí llevan los avisos de cada inscripción.
import { useState } from "react";
import { Link, useParams } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Award, BookOpen, History, Lock, PenLine, ShieldOff, ShieldCheck, UserRound } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { loginUrl } from "@/lib/login-redirect";
import { BAUTISMO, COMO_CONOCIO, TIEMPO_FE, etiquetaDe } from "@shared/academia-inscripcion";
import type { AlumnoDetalle } from "@shared/academia-direccion";
import { accionDocumento, corregirNombre, useDireccionAlumno, useEscritasAlumno } from "@/components/academia/api";
import { TarjetaRevision } from "@/components/academia/revision";
import { Cargando } from "@/components/academia/ui";
import { ChipEstatus, ListaActividad, NivelesYCertificados, TablaAvance, fecha, hace } from "@/components/academia/seguimiento";

const fechaNacimiento = (f: string) => new Date(`${f}T12:00:00Z`).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function CorregirNombre({ d }: { d: AlumnoDetalle }) {
  const qc = useQueryClient();
  const [abierto, setAbierto] = useState(false);
  const [nombres, setNombres] = useState(d.ficha?.nombres ?? "");
  const [apellidos, setApellidos] = useState(d.ficha?.apellidos ?? "");
  const [motivo, setMotivo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null);
  const guardar = async () => {
    setOcupado(true);
    setAviso(null);
    try {
      const r = await corregirNombre(d.fila.userId, { nombres, apellidos, motivo });
      setAviso({ ok: true, texto: `Quedó «${r.nombre}» en la ficha y en ${r.documentos} ${r.documentos === 1 ? "documento" : "documentos"}.` });
      setAbierto(false);
      setMotivo("");
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setAviso({ ok: false, texto: e.message });
    } finally {
      setOcupado(false);
    }
  };
  return (
    <div className="mt-4">
      {abierto ? (
        <div className="rounded-xl border border-border p-3 space-y-2" data-testid="corregir-nombre">
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="text-sm">Nombres<Input value={nombres} onChange={(e) => setNombres(e.target.value)} className="mt-1 h-10 text-[16px]" /></label>
            <label className="text-sm">Apellidos<Input value={apellidos} onChange={(e) => setApellidos(e.target.value)} className="mt-1 h-10 text-[16px]" /></label>
          </div>
          <label className="text-sm block">Motivo (queda registrado y lo ve el alumno)<Textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" /></label>
          <p className="text-xs text-muted-foreground">Cambia el nombre en la ficha y en todos sus documentos vigentes.</p>
          <div className="flex gap-2">
            <Button size="sm" className="fire-btn-primary" onClick={guardar} disabled={ocupado || motivo.trim().length < 8} data-testid="corregir-nombre-guardar">{ocupado ? "Guardando…" : "Guardar el nombre"}</Button>
            <Button size="sm" variant="ghost" onClick={() => setAbierto(false)} disabled={ocupado}>Cancelar</Button>
          </div>
        </div>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setAbierto(true)} data-testid="corregir-nombre-abrir"><PenLine className="w-4 h-4 mr-1.5" /> Corregir el nombre</Button>
      )}
      {aviso && <p className={`text-sm mt-2 ${aviso.ok ? "text-emerald-700 dark:text-emerald-300" : "text-red-600 dark:text-red-400"}`} role="status">{aviso.texto}</p>}
    </div>
  );
}

/** Los documentos del alumno, con revocar o volver a dar por válido (siempre con un motivo). */
function Documentos({ d }: { d: AlumnoDetalle }) {
  const qc = useQueryClient();
  const [abierto, setAbierto] = useState<string | null>(null);
  const [motivo, setMotivo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const actuar = async (codigo: string, accion: "revocar" | "restaurar") => {
    setOcupado(true);
    setError(null);
    try {
      await accionDocumento(codigo, accion, motivo);
      setAbierto(null);
      setMotivo("");
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <section className="glass-card p-5" data-testid="alumno-documentos">
      <h2 className="font-semibold flex items-center gap-2 mb-3"><Award className="w-4 h-4 text-orange-600" /> Documentos</h2>
      {d.certificados.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no tiene certificados.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {d.certificados.map((c) => (
            <li key={c.codigo} className="border-b border-border/60 pb-3 last:border-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="min-w-0">
                  <Link href={`/academia/certificado/${c.codigo}`} className="font-medium hover:underline">{c.titulo}</Link>
                  <span className="block text-xs text-muted-foreground tracking-wider">{c.codigo} · {c.nombre}{c.nota != null ? ` · nota ${c.nota}` : ""}</span>
                  {c.revocado && <span className="block text-xs text-red-600 dark:text-red-400">Revocado el {fecha(c.revocado)}{c.motivo ? `: «${c.motivo}»` : ""}</span>}
                </span>
                {abierto !== c.codigo && (
                  <Button size="sm" variant="outline" onClick={() => { setAbierto(c.codigo); setMotivo(""); setError(null); }} data-testid="documento-accion">
                    {c.revocado ? <><ShieldCheck className="w-4 h-4 mr-1.5" /> Volver a darlo por válido</> : <><ShieldOff className="w-4 h-4 mr-1.5" /> Revocar</>}
                  </Button>
                )}
              </div>
              {abierto === c.codigo && (
                <div className="mt-2 rounded-xl border border-border p-3 space-y-2">
                  <label className="text-sm block">Motivo (queda registrado y lo ve el alumno)<Textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" data-testid="documento-motivo" /></label>
                  <div className="flex gap-2">
                    <Button size="sm" className="fire-btn-primary" onClick={() => actuar(c.codigo, c.revocado ? "restaurar" : "revocar")} disabled={ocupado || motivo.trim().length < 8} data-testid="documento-confirmar">
                      {ocupado ? "Guardando…" : c.revocado ? "Sí, darlo por válido" : "Sí, revocarlo"}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setAbierto(null)} disabled={ocupado}>Cancelar</Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-2" role="alert">{error}</p>}
    </section>
  );
}

/** Todas sus respuestas escritas: cualquiera se puede revisar, no solo las que marcó el corrector. */
function Escritas({ id, propio }: { id: string; propio: boolean }) {
  const q = useEscritasAlumno(id);
  if (q.isLoading) return <p className="text-muted-foreground">Cargando sus respuestas escritas…</p>;
  const lista = q.data?.escritas ?? [];
  return (
    <section className="space-y-3" data-testid="alumno-escritas">
      <h2 className="font-semibold flex items-center gap-2"><PenLine className="w-4 h-4 text-orange-600" /> Respuestas escritas</h2>
      {lista.length === 0 ? <p className="text-sm text-muted-foreground">Todavía no escribió en ningún examen.</p> : lista.map((it) => <TarjetaRevision key={it.id} item={it} puedeRevisar={!propio} conAlumno={false} />)}
      {propio && lista.length > 0 && <p className="text-xs text-muted-foreground">Son tus propias respuestas: las revisa otra persona de la Dirección académica o un profesor.</p>}
    </section>
  );
}

function Ficha({ d, propio }: { d: AlumnoDetalle; propio: boolean }) {
  const f = d.ficha;
  const a = d.fila;
  const filas: [string, string][] = f
    ? [
        ["Teléfono o WhatsApp", f.telefono],
        ["Correo", a.correo ?? ""],
        ["Fecha de nacimiento", f.nacimiento ? fechaNacimiento(f.nacimiento) : ""],
        ["País y ciudad", [f.pais, f.ciudad].filter(Boolean).join(" · ")],
        ["Iglesia", f.iglesiaNombre ?? f.iglesiaOtra],
        ["Pastor o líder", f.pastor],
        ["Tiempo en la fe", etiquetaDe(TIEMPO_FE, f.tiempoFe)],
        ["Bautismo en agua", etiquetaDe(BAUTISMO, f.bautismo)],
        ["Sirve en", f.ministerio],
        ["Conoció la academia por", etiquetaDe(COMO_CONOCIO, f.comoConocio)],
        ["Lo que espera aprender", f.espera],
      ]
    : [
        ["País y ciudad", [a.pais, a.ciudad].filter(Boolean).join(" · ")],
        ["Iglesia", a.iglesia],
      ];
  return (
    <section className="glass-card p-5" data-testid="alumno-ficha">
      <h2 className="font-semibold flex items-center gap-2 mb-3"><UserRound className="w-4 h-4 text-orange-600" /> Ficha de inscripción</h2>
      <dl className="grid gap-3 sm:grid-cols-2 text-[15px]">
        {filas.map(([k, v]) => (
          <div key={k} className={k === "Lo que espera aprender" ? "sm:col-span-2" : ""}>
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className={v ? "whitespace-pre-line break-words" : "text-muted-foreground"}>{v || "—"}</dd>
          </div>
        ))}
      </dl>
      {!f && <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Los datos de contacto los ven la Dirección académica y la iglesia del alumno.</p>}
      {f && <p className="text-xs text-muted-foreground mt-4">Ficha actualizada el {fecha(f.actualizada)}.</p>}
      {d.puede.documentos && f && !propio && <CorregirNombre d={d} />}
    </section>
  );
}

export default function AcademiaDireccionAlumno() {
  const { alumnoId } = useParams<{ alumnoId: string }>();
  const { user } = useAuth();
  const q = useDireccionAlumno(alumnoId);
  if (q.isLoading) return <Cargando />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-6">{q.error?.message ?? "No se pudo cargar al alumno."}</p>
          {q.error?.status === 401 ? (
            <a href={loginUrl()}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
          ) : (
            <Link href="/academia/direccion"><Button variant="outline" className="h-12 px-7">Volver al panel</Button></Link>
          )}
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const a = d.fila;
  const propio = !!user && user.id === a.userId;
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <Link href="/academia/direccion?tab=alumnos" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Panel de seguimiento</Link>
        <header className="flex items-start gap-4">
          {d.ficha?.foto && <img src={d.ficha.foto} alt={`Foto del carné de ${a.nombre}`} className="w-20 h-[100px] rounded-xl object-cover border border-orange-500/40 shrink-0" data-testid="alumno-foto" />}
          <div className="min-w-0">
          <p className="data-label text-orange-600 dark:text-orange-300">Alumno · Matrícula {a.matricula}</p>
          <h1 className="heading-display font-display text-3xl md:text-4xl mt-1" data-testid="alumno-nombre">{a.nombre}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
            <ChipEstatus e={a.estatus} />
            <span className="text-muted-foreground">Promoción {a.promocion} · inscrito el {fecha(a.desde)} · última actividad {hace(a.ultima)}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{[a.iglesia, a.pais].filter(Boolean).join(" · ")}</p>
          </div>
        </header>

        <Ficha d={d} propio={propio} />

        <section className="glass-card p-5">
          <h2 className="font-semibold flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-orange-600" /> Materias: por dónde va</h2>
          <TablaAvance materias={d.materias} />
        </section>

        <NivelesYCertificados d={d} sinCertificados={d.puede.documentos && !propio} />
        {d.puede.documentos && !propio && <Documentos d={d} />}
        {d.puede.revisar && alumnoId && <Escritas id={alumnoId} propio={propio} />}

        <section className="glass-card p-5">
          <h2 className="font-semibold flex items-center gap-2 mb-3"><History className="w-4 h-4 text-orange-600" /> Su actividad</h2>
          <ListaActividad items={d.actividad} />
        </section>
      </div>
    </Layout>
  );
}
