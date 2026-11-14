// La inscripción en la academia: un asistente de cuatro pasos (bienvenida, tus datos, el reglamento y la confirmación)
// que da el número de matrícula, la promoción y el carné (server/academia-inscripcion.ts). Queda aprobada al instante.
// La misma página sirve para completar la ficha (quien se matriculó antes de que existiera) y para corregirla.
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft, ArrowRight, Award, BookOpen, CheckCircle2, ClipboardCheck, IdCard, Layers, Pencil, ScrollText, ShieldCheck, Smartphone, UserRound,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { loginUrl } from "@/lib/login-redirect";
import { CODIGO_HONOR, ETAPAS, LEMA, NIVELES, NOMBRE_ACADEMIA, REGLAMENTO, type MatriculaInfo } from "@shared/academia";
import {
  BAUTISMO, COMO_CONOCIO, LIMITES, PAISES, TIEMPO_FE, etiquetaDe, nombreCompleto, validarFicha,
  type ErroresFicha, type FichaInscripcion, type FichaVista, type IglesiaOpcion,
} from "@shared/academia-inscripcion";
import { inscribirme, useInscripcion, type ResultadoInscripcion } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";

type Paso = "bienvenida" | "datos" | "reglamento" | "confirmar" | "listo";
const NOMBRE_PASO: Record<Exclude<Paso, "listo">, string> = { bienvenida: "Bienvenida", datos: "Tus datos", reglamento: "Reglamento", confirmar: "Confirmación" };
const BORRADOR = "academia-ficha-borrador";
const CAMPOS: (keyof FichaInscripcion)[] = [
  "nombres", "apellidos", "pais", "ciudad", "telefono", "nacimiento", "iglesiaId", "iglesiaOtra", "pastor", "tiempoFe", "bautismo", "ministerio", "comoConocio", "espera",
];
const SELECT =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";

const fechaLarga = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
const fechaNacimiento = (f: string) => new Date(`${f}T12:00:00Z`).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const hoyIso = () => new Date().toISOString().slice(0, 10);

/** La vuelta a donde estaba (solo dentro de la academia). */
function volverDe(search: string): string | null {
  const v = new URLSearchParams(search).get("volver");
  return v && v.startsWith("/academia") && !v.startsWith("//") ? v : null;
}

function soloFicha(f: FichaVista): FichaInscripcion {
  const { iglesiaNombre: _n, foto: _f, creada: _c, actualizada: _a, ...ficha } = f;
  return ficha;
}

function leerBorrador(): FichaInscripcion | null {
  try {
    const t = sessionStorage.getItem(BORRADOR);
    return t ? (JSON.parse(t) as FichaInscripcion) : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- piezas

function Pasos({ nombres, actual }: { nombres: string[]; actual: number }) {
  return (
    <div className="mb-6" data-testid="inscripcion-pasos">
      <p className="text-sm text-muted-foreground mb-2">
        Paso {actual + 1} de {nombres.length} · <span className="font-semibold text-foreground">{nombres[actual]}</span>
      </p>
      <ol className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${nombres.length}, minmax(0, 1fr))` }}>
        {nombres.map((n, i) => (
          <li key={n} aria-current={i === actual ? "step" : undefined}>
            <div className={`h-1.5 rounded-full ${i <= actual ? "bg-orange-500" : "bg-muted"}`} />
            <span className={`hidden sm:block text-xs mt-1.5 ${i === actual ? "font-semibold" : "text-muted-foreground"}`}>{n}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Campo({ id, etiqueta, obligatorio, ayuda, error, children }: { id: string; etiqueta: string; obligatorio?: boolean; ayuda?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium block">
        {etiqueta}
        {obligatorio && <span className="text-orange-600 dark:text-orange-300" aria-hidden="true"> *</span>}
        {obligatorio && <span className="sr-only"> (obligatorio)</span>}
      </label>
      {children}
      {ayuda && !error && <p id={`${id}-ayuda`} className="text-xs text-muted-foreground">{ayuda}</p>}
      {error && <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </div>
  );
}

const describe = (id: string, error?: string, ayuda?: boolean) => (error ? `${id}-error` : ayuda ? `${id}-ayuda` : undefined);

function Opciones({ id, etiqueta, obligatorio, opciones, valor, cambiar, error }: {
  id: string; etiqueta: string; obligatorio?: boolean; opciones: readonly { id: string; texto: string }[]; valor: string; cambiar: (v: string) => void; error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium" id={`${id}-etiqueta`}>
        {etiqueta}
        {obligatorio && <span className="text-orange-600 dark:text-orange-300" aria-hidden="true"> *</span>}
      </p>
      <div id={id} role="radiogroup" aria-labelledby={`${id}-etiqueta`} aria-required={obligatorio} aria-invalid={!!error} tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
        {opciones.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={valor === o.id}
            onClick={() => cambiar(valor === o.id && !obligatorio ? "" : o.id)}
            className={`rounded-full px-4 py-2 text-sm border transition-colors ${valor === o.id ? "bg-orange-600 border-orange-600 text-white" : "border-border hover:border-orange-500"}`}
            data-testid={`${id}-${o.id}`}
          >
            {o.texto}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </div>
  );
}

function Seccion({ titulo, nota, children }: { titulo: string; nota?: string; children: React.ReactNode }) {
  return (
    <section className="glass-card p-5 space-y-4">
      <div>
        <h3 className="font-semibold text-lg">{titulo}</h3>
        {nota && <p className="text-sm text-muted-foreground">{nota}</p>}
      </div>
      {children}
    </section>
  );
}

/** Los datos de la ficha, para revisarlos antes de confirmar y en la inscripción ya hecha. */
function ResumenFicha({ f, iglesias, iglesiaNombre }: { f: FichaInscripcion; iglesias: IglesiaOpcion[]; iglesiaNombre?: string | null }) {
  const iglesia = (f.iglesiaId ? iglesiaNombre ?? iglesias.find((i) => i.id === f.iglesiaId)?.nombre : f.iglesiaOtra) || "";
  const filas: [string, string][] = [
    ["Nombre completo", nombreCompleto(f)],
    ["País y ciudad", [f.pais, f.ciudad].filter(Boolean).join(" · ")],
    ["Teléfono o WhatsApp", f.telefono],
    ["Fecha de nacimiento", f.nacimiento ? fechaNacimiento(f.nacimiento) : ""],
    ["Iglesia", [iglesia, f.pastor ? `Pastor o líder: ${f.pastor}` : ""].filter(Boolean).join(" · ")],
    ["Tiempo en la fe", etiquetaDe(TIEMPO_FE, f.tiempoFe)],
    ["Bautismo en agua", etiquetaDe(BAUTISMO, f.bautismo)],
    ["Sirve en", f.ministerio],
    ["Conoció la academia por", etiquetaDe(COMO_CONOCIO, f.comoConocio)],
    ["Lo que espera aprender", f.espera],
  ];
  return (
    <dl className="grid gap-3 sm:grid-cols-2 text-[15px]" data-testid="inscripcion-resumen">
      {filas.map(([k, v]) => (
        <div key={k} className={k === "Lo que espera aprender" ? "sm:col-span-2" : ""}>
          <dt className="text-xs text-muted-foreground">{k}</dt>
          <dd className={v ? "whitespace-pre-line break-words" : "text-muted-foreground"}>{v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function AvisoPrivacidad() {
  return (
    <aside className="glass-card p-5 border border-emerald-500/30 text-sm space-y-2" data-testid="inscripcion-privacidad">
      <p className="font-semibold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Tus datos, protegidos</p>
      <p>
        Los ven la Administración de la academia y, si eliges una iglesia aliada, quienes la dirigen. Se usan solo para acompañarte en tus estudios y para tus
        documentos: no se publican ni se comparten con nadie más.
      </p>
      <p className="text-muted-foreground">Puedes corregirlos cuando quieras. Si borras tu cuenta, tu ficha se borra con ella.</p>
    </aside>
  );
}

// ---------------------------------------------------------------- los pasos

function Bienvenida({ empezar, sinSesion, volver }: { empezar: () => void; sinSesion: boolean; volver: string | null }) {
  const tarjetas = [
    { icono: Layers, titulo: `${NIVELES.length} niveles en ${ETAPAS.length} etapas`, texto: `${ETAPAS.map((e) => e.nombre).join(", ").replace(/, ([^,]*)$/, " y $1")}: del nuevo creyente al obrero, al maestro y al pastor.` },
    { icono: Smartphone, titulo: "A tu ritmo, desde el teléfono", texto: "Lecciones de 5 a 10 minutos, con lectura, video y repaso. Es gratuita." },
    { icono: ClipboardCheck, titulo: "Evaluación justa y al instante", texto: "Exámenes con corrección automática, también de lo que escribes. Si una nota no te parece, se revisa." },
    { icono: Award, titulo: "Certificados verificables", texto: "Cada materia y cada nivel te dan su certificado con código QR, y recibes tu carné de estudiante." },
  ];
  return (
    <div className="space-y-6" data-testid="inscripcion-bienvenida">
      <section className="glass-card p-6 md:p-8 text-center">
        <p className="accent-serif text-lg md:text-xl">«{LEMA.frase}»</p>
        <p className="text-sm text-muted-foreground mt-1">{LEMA.ref}</p>
        <p className="mt-5 text-[15px] md:text-base max-w-2xl mx-auto">
          La {NOMBRE_ACADEMIA} es el instituto de formación del Ministerio Avivando el Fuego: te forma en la Palabra de Dios desde los primeros pasos de la fe
          hasta el ministerio, por niveles y a tu propio ritmo.
        </p>
      </section>
      <div className="grid gap-4 sm:grid-cols-2">
        {tarjetas.map(({ icono: Icono, titulo, texto }) => (
          <div key={titulo} className="glass-card p-5">
            <Icono className="w-6 h-6 text-orange-500" />
            <p className="font-semibold mt-2">{titulo}</p>
            <p className="text-sm text-muted-foreground mt-1">{texto}</p>
          </div>
        ))}
      </div>
      <section className="glass-card p-5">
        <h2 className="font-display text-xl font-bold mb-3">Cómo es la inscripción</h2>
        <ol className="space-y-3">
          {[
            ["Tus datos", "Tu nombre como saldrá en tus certificados, dónde vives, tu iglesia y tu caminar con Dios. Toma unos 2 minutos."],
            ["El reglamento y el código de honor", "Cómo se avanza, cómo se evalúa y el compromiso de estudiar con sinceridad."],
            ["La confirmación", "Revisas tus datos y recibes tu número de matrícula y tu carné."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>
              <span><span className="font-semibold">{t}.</span> <span className="text-muted-foreground">{d}</span></span>
            </li>
          ))}
        </ol>
        <p className="text-sm mt-4 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> La inscripción queda aprobada al instante: puedes empezar hoy mismo.</p>
        <p className="text-sm mt-2 flex items-start gap-2"><BookOpen className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> Después te inscribes en cada materia desde su página, donde ves lo que vas a aprender.</p>
      </section>
      <div className="flex flex-col sm:flex-row gap-3">
        {sinSesion ? (
          <a href={loginUrl(volver ? `/academia/inscripcion?volver=${encodeURIComponent(volver)}` : "/academia/inscripcion")} className="sm:w-auto">
            <Button size="lg" className="fire-btn-primary h-12 px-8 w-full" data-testid="inscripcion-entrar">Entrar para inscribirme <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </a>
        ) : (
          <Button size="lg" className="fire-btn-primary h-12 px-8" onClick={empezar} data-testid="inscripcion-empezar">Empezar mi inscripción <ArrowRight className="w-4 h-4 ml-2" /></Button>
        )}
        <Link href="/academia/reglamento"><Button variant="outline" size="lg" className="h-12 w-full sm:w-auto"><ScrollText className="w-4 h-4 mr-2" /> Leer el reglamento</Button></Link>
      </div>
      {sinSesion && <p className="text-sm text-muted-foreground">¿No tienes cuenta? Al entrar puedes crearla en un minuto.</p>}
    </div>
  );
}

function FormularioFicha({ f, cambiar, errores, iglesias, nombreFijo }: {
  f: FichaInscripcion; cambiar: (c: Partial<FichaInscripcion>) => void; errores: ErroresFicha; iglesias: IglesiaOpcion[]; nombreFijo: boolean;
}) {
  const [otraIglesia, setOtraIglesia] = useState(!f.iglesiaId && !!f.iglesiaOtra);
  const valorIglesia = f.iglesiaId ? String(f.iglesiaId) : otraIglesia ? "otra" : "";
  const elegirIglesia = (v: string) => {
    if (v === "otra") {
      setOtraIglesia(true);
      cambiar({ iglesiaId: null });
    } else {
      setOtraIglesia(false);
      cambiar({ iglesiaId: v ? Number(v) : null, iglesiaOtra: "" });
    }
  };
  const input = (campo: keyof FichaInscripcion, extra: React.ComponentProps<typeof Input>, ayuda = false) => ({
    id: `ficha-${campo}`,
    value: String(f[campo] ?? ""),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => cambiar({ [campo]: e.target.value } as Partial<FichaInscripcion>),
    "aria-invalid": !!errores[campo],
    "aria-describedby": describe(`ficha-${campo}`, errores[campo], ayuda),
    className: "h-11 text-[16px]",
    "data-testid": `ficha-${campo}`,
    ...extra,
  });
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_280px] items-start">
      <div className="space-y-5 min-w-0">
        <Seccion titulo="Tu nombre" nota="Escríbelo completo, tal como quieres que salga en tus certificados y en tu carné.">
          <div className="grid gap-4 md:grid-cols-2">
            <Campo id="ficha-nombres" etiqueta="Nombres" obligatorio error={errores.nombres}>
              <Input {...input("nombres", { autoComplete: "given-name", maxLength: LIMITES.nombre, disabled: nombreFijo })} />
            </Campo>
            <Campo id="ficha-apellidos" etiqueta="Apellidos" obligatorio error={errores.apellidos}>
              <Input {...input("apellidos", { autoComplete: "family-name", maxLength: LIMITES.nombre, disabled: nombreFijo })} />
            </Campo>
          </div>
          {nombreFijo && <p className="text-xs text-muted-foreground">Tu nombre ya figura en tus certificados. Para corregirlo, escribe a la Administración de la academia.</p>}
        </Seccion>

        <Seccion titulo="Dónde vives">
          <div className="grid gap-4 md:grid-cols-2">
            <Campo id="ficha-pais" etiqueta="País" obligatorio error={errores.pais}>
              <select
                id="ficha-pais" className={SELECT} value={f.pais} onChange={(e) => cambiar({ pais: e.target.value })} autoComplete="country-name"
                aria-invalid={!!errores.pais} aria-describedby={describe("ficha-pais", errores.pais)} data-testid="ficha-pais"
              >
                <option value="">Elige tu país</option>
                {PAISES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Campo>
            <Campo id="ficha-ciudad" etiqueta="Ciudad" error={errores.ciudad}>
              <Input {...input("ciudad", { autoComplete: "address-level2", maxLength: LIMITES.ciudad })} />
            </Campo>
          </div>
        </Seccion>

        <Seccion titulo="Contacto" nota="Opcional. Solo para que la Administración de la academia y tu iglesia puedan acompañarte.">
          <div className="grid gap-4 md:grid-cols-2">
            <Campo id="ficha-telefono" etiqueta="Teléfono o WhatsApp" error={errores.telefono} ayuda="Con el código de país si vives fuera de Estados Unidos.">
              <Input {...input("telefono", { type: "tel", inputMode: "tel", autoComplete: "tel", maxLength: LIMITES.telefono, placeholder: "+1 512 555 0123" }, true)} />
            </Campo>
            <Campo id="ficha-nacimiento" etiqueta="Fecha de nacimiento" error={errores.nacimiento}>
              <Input {...input("nacimiento", { type: "date", max: hoyIso(), min: "1900-01-01", autoComplete: "bday" })} />
            </Campo>
          </div>
        </Seccion>

        <Seccion titulo="Tu iglesia">
          <div className="grid gap-4 md:grid-cols-2">
            <Campo id="ficha-iglesiaId" etiqueta="Iglesia" error={errores.iglesiaId} ayuda={iglesias.length ? "Si tu iglesia es aliada del ministerio, elígela de la lista." : undefined}>
              <select
                id="ficha-iglesiaId" className={SELECT} value={valorIglesia} onChange={(e) => elegirIglesia(e.target.value)}
                aria-invalid={!!errores.iglesiaId} aria-describedby={describe("ficha-iglesiaId", errores.iglesiaId, iglesias.length > 0)} data-testid="ficha-iglesiaId"
              >
                <option value="">Todavía no tengo iglesia</option>
                {iglesias.map((i) => <option key={i.id} value={String(i.id)}>{i.nombre}{i.lugar ? ` · ${i.lugar}` : ""}</option>)}
                <option value="otra">Otra iglesia</option>
              </select>
            </Campo>
            {otraIglesia && (
              <Campo id="ficha-iglesiaOtra" etiqueta="Nombre de tu iglesia" error={errores.iglesiaOtra}>
                <Input {...input("iglesiaOtra", { maxLength: LIMITES.iglesia, autoComplete: "organization" })} />
              </Campo>
            )}
            <Campo id="ficha-pastor" etiqueta="Tu pastor o líder" error={errores.pastor}>
              <Input {...input("pastor", { maxLength: LIMITES.pastor })} />
            </Campo>
          </div>
        </Seccion>

        <Seccion titulo="Tu caminar con Dios" nota="Nos ayuda a acompañarte desde donde estás.">
          <Opciones id="ficha-tiempoFe" etiqueta="¿Cuánto tiempo llevas en la fe?" obligatorio opciones={TIEMPO_FE} valor={f.tiempoFe} cambiar={(v) => cambiar({ tiempoFe: v })} error={errores.tiempoFe} />
          <Opciones id="ficha-bautismo" etiqueta="¿Te bautizaste en agua?" opciones={BAUTISMO} valor={f.bautismo} cambiar={(v) => cambiar({ bautismo: v })} error={errores.bautismo} />
          <div className="grid gap-4 md:grid-cols-2">
            <Campo id="ficha-ministerio" etiqueta="¿Sirves en algún ministerio?" error={errores.ministerio}>
              <Input {...input("ministerio", { maxLength: LIMITES.ministerio, placeholder: "Por ejemplo: alabanza, niños, intercesión" })} />
            </Campo>
            <Campo id="ficha-comoConocio" etiqueta="¿Cómo conociste la academia?" error={errores.comoConocio}>
              <select id="ficha-comoConocio" className={SELECT} value={f.comoConocio} onChange={(e) => cambiar({ comoConocio: e.target.value })} data-testid="ficha-comoConocio">
                <option value="">Elige una opción</option>
                {COMO_CONOCIO.map((o) => <option key={o.id} value={o.id}>{o.texto}</option>)}
              </select>
            </Campo>
          </div>
          <Campo id="ficha-espera" etiqueta="¿Qué esperas aprender?" error={errores.espera}>
            <Textarea
              id="ficha-espera" value={f.espera} onChange={(e) => cambiar({ espera: e.target.value })} maxLength={LIMITES.espera} rows={3} className="text-[16px]"
              placeholder="Cuéntanos en pocas palabras qué te gustaría aprender o en qué quieres crecer." data-testid="ficha-espera"
            />
            <p className="text-xs text-muted-foreground text-right">{f.espera.length} de {LIMITES.espera}</p>
          </Campo>
        </Seccion>
      </div>
      <div className="lg:sticky lg:top-24">
        <AvisoPrivacidad />
      </div>
    </div>
  );
}

function PasoReglamento({ reglamento, honor, setReglamento, setHonor }: { reglamento: boolean; honor: boolean; setReglamento: (v: boolean) => void; setHonor: (v: boolean) => void }) {
  return (
    <section className="glass-card p-5 md:p-6 space-y-5" data-testid="inscripcion-reglamento">
      <div>
        <h2 className="font-display text-xl font-bold flex items-center gap-2"><ScrollText className="w-5 h-5 text-orange-500" /> {REGLAMENTO.titulo}</h2>
        <p className="text-sm text-muted-foreground mt-1">Léelo con calma: dice cómo se avanza, cómo se evalúa, qué documentos recibes y cómo se cuidan tus datos.</p>
      </div>
      <div className="max-h-80 overflow-y-auto rounded-xl border border-border p-4 space-y-4 text-sm" tabIndex={0} aria-label="Texto del reglamento académico">
        <p>{REGLAMENTO.intro}</p>
        {REGLAMENTO.secciones.map((sec) => (
          <div key={sec.titulo}>
            <p className="font-semibold">{sec.titulo}</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">{sec.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </div>
      <a href="/academia/reglamento" target="_blank" rel="noreferrer" className="text-sm underline inline-block">Abrir el reglamento en otra pestaña</a>
      <div className="rounded-xl border border-border p-4">
        <p className="font-semibold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> El código de honor</p>
        <p className="text-[15px] mt-1 accent-serif">{CODIGO_HONOR}</p>
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox checked={reglamento} onCheckedChange={(v) => setReglamento(v === true)} className="mt-0.5" data-testid="inscripcion-acepto-reglamento" />
        <span className="text-[15px]">Leí y acepto el reglamento académico.</span>
      </label>
      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox checked={honor} onCheckedChange={(v) => setHonor(v === true)} className="mt-0.5" data-testid="inscripcion-acepto-honor" />
        <span className="text-[15px]">Hago mío el código de honor.</span>
      </label>
    </section>
  );
}

function PasoConfirmar({ f, iglesias, editar, nueva }: { f: FichaInscripcion; iglesias: IglesiaOpcion[]; editar: () => void; nueva: boolean }) {
  return (
    <div className="space-y-5" data-testid="inscripcion-confirmar">
      <section className="glass-card p-6 text-center">
        <p className="text-sm text-muted-foreground">Así saldrá tu nombre en tus certificados y en tu carné</p>
        <p className="font-display text-2xl md:text-3xl font-bold mt-2 text-[#1e3a5f] dark:text-sky-200" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }} data-testid="inscripcion-nombre-certificado">
          {nombreCompleto(f)}
        </p>
      </section>
      <section className="glass-card p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="font-semibold text-lg">Revisa tus datos</h2>
          <Button variant="outline" size="sm" onClick={editar}><Pencil className="w-4 h-4 mr-1.5" /> Corregir</Button>
        </div>
        <ResumenFicha f={f} iglesias={iglesias} />
      </section>
      {nueva && (
        <p className="text-sm flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <span>Aceptaste el reglamento académico y el código de honor. Al confirmar, tu inscripción queda aprobada al instante y recibes tu número de matrícula.</span>
        </p>
      )}
    </div>
  );
}

function Listo({ m, volver, nueva }: { m: MatriculaInfo; volver: string | null; nueva: boolean }) {
  const primera = NIVELES[0].materias.find((x) => x.disponible);
  return (
    <div className="space-y-5">
      <section className="glass-card p-6 text-center border border-emerald-500/30" data-testid="inscripcion-lista">
        <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
        <h2 className="font-display text-2xl md:text-3xl font-bold mt-3">¡Te damos la bienvenida a la academia!</h2>
        <p className="text-muted-foreground mt-2">Tu inscripción quedó aprobada. Tu número de matrícula es</p>
        <p className="font-display text-3xl font-bold tracking-wider fire-text mt-1" data-testid="inscripcion-numero">{m.numero}</p>
        <p className="text-sm text-muted-foreground mt-2">Promoción {m.promocion} · desde el {fechaLarga(m.desde)}</p>
        <p className="mt-2 font-semibold">{m.estatus.texto}</p>
        <p className="text-sm text-muted-foreground mt-3">En tu carné puedes poner tu foto: ábrelo y toca «Poner mi foto».</p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          {volver && (
            <Link href={volver}><Button className="fire-btn-primary h-12 px-7 w-full sm:w-auto" data-testid="inscripcion-volver">Seguir donde estaba <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
          )}
          {!volver && !nueva && (
            <Link href="/academia"><Button className="fire-btn-primary h-12 px-7 w-full sm:w-auto" data-testid="inscripcion-ir-estudiar">Ir a estudiar <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
          )}
          <Link href="/academia/carne"><Button variant={volver || !nueva ? "outline" : "default"} className={`h-12 px-7 w-full sm:w-auto ${volver || !nueva ? "" : "fire-btn-primary"}`} data-testid="inscripcion-ver-carne"><IdCard className="w-4 h-4 mr-2" /> Ver mi carné</Button></Link>
        </div>
      </section>
      {primera && !volver && nueva && (
        <section className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4" data-testid="inscripcion-primera-materia">
          <BookOpen className="w-8 h-8 text-orange-500 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Tu siguiente paso: inscríbete en tu primera materia</p>
            <p className="text-sm text-muted-foreground mt-1">Te recomendamos empezar por «{primera.titulo}». En su página ves lo que vas a aprender y cómo se evalúa.</p>
          </div>
          <Link href={`/academia/materia/${primera.id}`}><Button className="fire-btn-primary h-11 w-full sm:w-auto">Ver la materia <ArrowRight className="w-4 h-4 ml-1.5" /></Button></Link>
        </section>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- la página

export default function AcademiaInscripcion() {
  const qc = useQueryClient();
  const q = useInscripcion();
  const volver = useMemo(() => volverDe(window.location.search), []);
  const [paso, setPaso] = useState<Paso | null>(null);
  const [editando, setEditando] = useState(false);
  const [ficha, setFicha] = useState<FichaInscripcion | null>(null);
  const [errores, setErrores] = useState<ErroresFicha>({});
  const [reglamento, setReglamento] = useState(false);
  const [honor, setHonor] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoInscripcion | null>(null);
  const [guardada, setGuardada] = useState(false);

  const d = q.data;
  const modo: "nuevo" | "completar" | "inscrito" = !d?.matricula ? "nuevo" : !d.ficha ? "completar" : "inscrito";

  useEffect(() => {
    if (d && !ficha) setFicha(d.ficha ? soloFicha(d.ficha) : leerBorrador() ?? d.sugerida);
  }, [d, ficha]);
  useEffect(() => {
    if (ficha && modo !== "inscrito") {
      try {
        sessionStorage.setItem(BORRADOR, JSON.stringify(ficha));
      } catch {
        /* sin almacenamiento: no pasa nada */
      }
    }
  }, [ficha, modo]);

  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  const sinSesion = q.error?.status === 401;

  const pasos: Exclude<Paso, "listo">[] = modo === "nuevo" ? ["bienvenida", "datos", "reglamento", "confirmar"] : ["datos", "confirmar"];
  const actual: Paso | null = resultado && paso === "listo" ? "listo" : sinSesion ? "bienvenida" : paso ?? (modo === "nuevo" ? "bienvenida" : modo === "completar" ? "datos" : null);
  const ir = (p: Paso | null) => {
    setError(null);
    setPaso(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cambiar = (c: Partial<FichaInscripcion>) => {
    setFicha((f) => ({ ...(f ?? d!.sugerida), ...c }));
    setErrores((e) => {
      const sin = { ...e };
      for (const k of Object.keys(c) as (keyof FichaInscripcion)[]) delete sin[k];
      return sin;
    });
  };
  const revisarDatos = () => {
    const v = validarFicha(ficha);
    if (!v.ok) {
      setErrores(v.errores);
      const primero = CAMPOS.find((k) => v.errores[k]);
      if (primero) setTimeout(() => document.getElementById(`ficha-${primero}`)?.focus(), 30);
      return;
    }
    setErrores({});
    setFicha(v.ficha);
    ir(modo === "nuevo" ? "reglamento" : "confirmar");
  };
  const confirmar = async () => {
    if (!ficha) return;
    setOcupado(true);
    setError(null);
    try {
      const r = await inscribirme(ficha, modo === "nuevo" ? { reglamento, honor } : undefined);
      try {
        sessionStorage.removeItem(BORRADOR);
      } catch {
        /* nada */
      }
      void qc.invalidateQueries({ queryKey: ["academia"] });
      if (r.nueva || modo === "completar") {
        setResultado(r);
        ir("listo");
      } else {
        setFicha(soloFicha(r.ficha));
        setEditando(false);
        setGuardada(true);
        ir(null);
      }
    } catch (e: any) {
      setError(e.message);
      if (e.datos?.errores) {
        setErrores(e.datos.errores);
        ir("datos");
      }
    } finally {
      setOcupado(false);
    }
  };

  const titulo = modo === "inscrito" && !editando ? "Mi inscripción" : modo === "completar" ? "Completa tu inscripción" : editando ? "Corregir mis datos" : "Inscripción";
  const indice = actual && actual !== "listo" ? pasos.indexOf(actual) : -1;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-16">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <p className="data-label text-orange-600 dark:text-orange-300 mt-5">{NOMBRE_ACADEMIA}</p>
        <h1 className="heading-display font-display text-3xl md:text-5xl mt-1 mb-6" data-testid="inscripcion-titulo">{titulo}</h1>

        {!sinSesion && !d ? (
          <p className="glass-card p-5">{q.error?.message ?? "No se pudo cargar tu inscripción."}</p>
        ) : actual === "listo" && resultado ? (
          <Listo m={resultado.matricula} volver={volver} nueva={resultado.nueva} />
        ) : actual === null && d?.matricula && d.ficha ? (
          <div className="space-y-5" data-testid="inscripcion-hecha">
            {guardada && <p className="glass-card p-4 border border-emerald-500/30 text-sm flex items-center gap-2" role="status"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tus datos quedaron guardados.</p>}
            <section className="glass-card p-6 border border-emerald-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-lg">Tu inscripción está al día</p>
                  <p className="text-sm text-muted-foreground">Matrícula <span className="font-semibold text-foreground tracking-wider" data-testid="inscripcion-numero">{d.matricula.numero}</span> · Promoción {d.matricula.promocion} · desde el {fechaLarga(d.matricula.desde)}</p>
                  <p className="text-sm font-semibold mt-1">{d.matricula.estatus.texto}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href="/academia/carne"><Button variant="outline" className="w-full"><IdCard className="w-4 h-4 mr-1.5" /> Mi carné</Button></Link>
                  <Link href={volver ?? "/academia"}><Button className="fire-btn-primary w-full">{volver ? "Seguir donde estaba" : "Ir a estudiar"}</Button></Link>
                </div>
              </div>
            </section>
            <section className="glass-card p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="font-semibold text-lg flex items-center gap-2"><UserRound className="w-5 h-5 text-orange-500" /> Mi ficha de inscripción</h2>
                <Button variant="outline" size="sm" onClick={() => { setGuardada(false); setEditando(true); setFicha(soloFicha(d.ficha!)); ir("datos"); }} data-testid="inscripcion-editar">
                  <Pencil className="w-4 h-4 mr-1.5" /> Corregir mis datos
                </Button>
              </div>
              <ResumenFicha f={soloFicha(d.ficha)} iglesias={d.iglesias} iglesiaNombre={d.ficha.iglesiaNombre} />
              <p className="text-sm mt-4">
                {d.ficha.foto ? "Tu carné lleva tu foto." : "Tu carné todavía no tiene una foto propia."}{" "}
                <Link href="/academia/carne" className="underline" data-testid="inscripcion-foto-carne">{d.ficha.foto ? "Cambiarla" : "Poner mi foto"}</Link>
              </p>
              <p className="text-xs text-muted-foreground mt-2">Actualizada el {fechaLarga(d.ficha.actualizada)}.</p>
            </section>
          </div>
        ) : (
          <>
            {indice >= 0 && !sinSesion && <Pasos nombres={pasos.map((p) => NOMBRE_PASO[p])} actual={indice} />}
            {modo === "completar" && actual === "datos" && (
              <p className="glass-card p-4 mb-5 text-sm border border-orange-500/30" role="note">
                Ya tienes tu matrícula <strong>{d!.matricula!.numero}</strong>. Para seguir guardando tu avance, completa tu ficha de inscripción: tus certificados
                llevarán el nombre que escribas aquí.
              </p>
            )}
            {actual === "bienvenida" && <Bienvenida empezar={() => ir("datos")} sinSesion={sinSesion} volver={volver} />}
            {actual === "datos" && ficha && d && <FormularioFicha f={ficha} cambiar={cambiar} errores={errores} iglesias={d.iglesias} nombreFijo={d.nombreFijo} />}
            {actual === "reglamento" && <PasoReglamento reglamento={reglamento} honor={honor} setReglamento={setReglamento} setHonor={setHonor} />}
            {actual === "confirmar" && ficha && d && <PasoConfirmar f={ficha} iglesias={d.iglesias} editar={() => ir("datos")} nueva={modo === "nuevo"} />}
            {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert" data-testid="inscripcion-error">{error}</p>}
            {actual && actual !== "bienvenida" && (
              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                <Button
                  variant="outline" size="lg" className="h-12"
                  onClick={() => {
                    const i = pasos.indexOf(actual as Exclude<Paso, "listo">);
                    if (i > 0) ir(pasos[i - 1]);
                    else if (editando) { setEditando(false); ir(null); }
                  }}
                  disabled={pasos.indexOf(actual as Exclude<Paso, "listo">) <= 0 && !editando}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> {pasos.indexOf(actual as Exclude<Paso, "listo">) <= 0 && editando ? "Cancelar" : "Atrás"}
                </Button>
                {actual === "datos" && <Button size="lg" className="fire-btn-primary h-12 px-8" onClick={revisarDatos} data-testid="inscripcion-siguiente">Siguiente <ArrowRight className="w-4 h-4 ml-2" /></Button>}
                {actual === "reglamento" && (
                  <Button size="lg" className="fire-btn-primary h-12 px-8" onClick={() => ir("confirmar")} disabled={!reglamento || !honor} data-testid="inscripcion-siguiente">
                    Siguiente <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                {actual === "confirmar" && (
                  <Button size="lg" className="fire-btn-primary h-12 px-8" onClick={confirmar} disabled={ocupado} data-testid="inscripcion-confirmar-boton">
                    {ocupado ? "Guardando…" : editando ? "Guardar mis datos" : "Confirmar mi inscripción"}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
