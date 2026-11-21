// El laboratorio ministerial (server/academia-laboratorio.ts): una práctica de una materia, de la preparación a la
// conversación de cierre. El servidor manda un paso a la vez: el alumno decide (o, en una ronda, ordena), ve lo que
// pasa, y al final recibe su perfil por competencia, el camino ejemplar y la conversación de cierre: cómo se sintió, lo
// que hizo bien, lo que haría distinto y lo que se lleva (que puede guardar en su cuaderno).
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle, ArrowLeft, ArrowRight, BookOpen, CheckCircle2, FlaskConical, Loader2, MessageCircle, NotebookPen, RotateCcw, Route, XCircle,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import {
  LABORATORIO, LIMITE_LLEVO, NOMBRE_FORMATO, SENTIRES, type ConsecuenciaVista, type FormatoPractica, type IntentoVista, type Medidor, type NivelCompetencia,
  type PasoVista, type PracticaDetalle,
} from "@shared/laboratorio";
import { LIMITES, bloque } from "@shared/cuaderno";
import { ErrorCuaderno, crearNota } from "@/components/cuaderno/api";
import { BarraAvance, Cargando, PantallaCerrada, enlaceInscripcion } from "@/components/academia/ui";
import { empezarPractica, guardarCierre, responderPaso, textoLecciones, usePractica } from "@/components/academia/laboratorio-api";

type Fase = "preparacion" | "paso" | "consecuencia" | "resultado" | "cierre" | "camino";

const COLOR_NIVEL: Record<NivelCompetencia, string> = {
  Ejemplar: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
  Competente: "bg-sky-500/15 text-sky-800 dark:text-sky-200",
  "En desarrollo": "bg-amber-500/15 text-amber-900 dark:text-amber-200",
  Inicial: "bg-red-500/10 text-red-800 dark:text-red-200",
};

const NOMBRE_PASO: Record<FormatoPractica, [string, string]> = {
  escenario: ["Escena", "decisiones"],
  conversacion: ["Turno", "turnos"],
  ordenar: ["Ronda", "rondas"],
};

const puntos = (x: number) => x.toLocaleString("es", { maximumFractionDigits: 2 });

function ChipNivel({ nivel }: { nivel: NivelCompetencia }) {
  return <span className={`shrink-0 text-xs font-semibold rounded-full px-2.5 py-1 ${COLOR_NIVEL[nivel]}`}>{nivel}</span>;
}

function Medidores({ medidores, cambios }: { medidores: Medidor[]; cambios?: { nombre: string; delta: number }[] }) {
  if (!medidores.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3" data-testid="laboratorio-medidores">
      {medidores.map((m) => {
        const c = cambios?.find((x) => x.nombre === m.nombre);
        return (
          <div key={m.id}>
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-medium truncate" title={m.explica}>{m.nombre}</span>
              <span className="tabular-nums text-muted-foreground shrink-0">
                {c && c.delta !== 0 && (
                  <span className={`font-semibold mr-1 ${c.delta > 0 ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                    {c.delta > 0 ? `+${c.delta}` : `−${Math.abs(c.delta)}`}
                    <span className="sr-only">, ahora en </span>
                  </span>
                )}
                {m.valor}
              </span>
            </div>
            <div
              className="h-2 rounded-full bg-muted overflow-hidden mt-1"
              role="meter"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={m.valor}
              aria-label={`${m.nombre}: ${m.explica}`}
            >
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.valor}%`, background: "linear-gradient(90deg,#ff7a1a,#ffb347)" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Globo({ quien, texto, tuyo }: { quien: string | null; texto: string; tuyo?: boolean }) {
  return (
    <div
      className={`max-w-[90%] w-fit rounded-2xl px-4 py-3 text-[15px] leading-6 ${tuyo ? "ml-auto bg-orange-500/10 border border-orange-500/30 rounded-br-md" : "bg-muted rounded-bl-md"}`}
      data-testid={tuyo ? "laboratorio-tu-globo" : "laboratorio-globo"}
    >
      <p className="text-[11px] font-semibold tracking-wide text-muted-foreground mb-0.5">{tuyo ? "Tú" : quien}</p>
      <p>{texto}</p>
    </div>
  );
}

function Escena({ paso, ocupado, alElegir }: { paso: Extract<PasoVista, { tipo: "escena" }>; ocupado: boolean; alElegir: (k: number) => void }) {
  return (
    <div data-testid="laboratorio-escena">
      {paso.narra.map((t, i) => <p key={i} className="text-[15px] leading-7 mb-2">{t}</p>)}
      {paso.dice && <div className="my-3"><Globo quien={paso.quien} texto={paso.dice} /></div>}
      <p className="font-semibold mt-5 mb-2">{paso.pregunta}</p>
      <div className="grid gap-2">
        {paso.opciones.map((o) => (
          <button
            key={o.k}
            type="button"
            disabled={ocupado}
            onClick={() => alElegir(o.k)}
            className="text-left rounded-xl border border-border px-4 py-3 text-[15px] leading-6 min-h-[52px] transition hover:border-orange-500 hover:bg-orange-500/5 disabled:opacity-60"
            data-testid="laboratorio-opcion"
          >
            {o.texto}
          </button>
        ))}
      </div>
    </div>
  );
}

function Ordenar({ paso, ocupado, alConfirmar }: { paso: Extract<PasoVista, { tipo: "ordenar" }>; ocupado: boolean; alConfirmar: (orden: number[]) => void }) {
  const [orden, setOrden] = useState<number[]>([]);
  useEffect(() => setOrden([]), [paso.n]);
  const n = paso.opciones.length;
  const tocar = (k: number) => setOrden((o) => (o.includes(k) ? o.filter((x) => x !== k) : [...o, k]));
  return (
    <div data-testid="laboratorio-ordenar">
      <p className="text-[15px] leading-7">{paso.situacion}</p>
      <p className="font-semibold mt-5">{paso.pregunta}</p>
      <p className="text-sm text-muted-foreground mt-1" aria-live="polite">
        {orden.length < n ? `Toca la opción que va en el lugar ${orden.length + 1}.` : "Listo. Revisa tu orden y confírmalo. Para cambiar uno, tócalo otra vez."}
      </p>
      <div className="grid gap-2 mt-3">
        {paso.opciones.map((o) => {
          const lugar = orden.indexOf(o.k);
          return (
            <button
              key={o.k}
              type="button"
              aria-pressed={lugar >= 0}
              disabled={ocupado}
              onClick={() => tocar(o.k)}
              className={`text-left rounded-xl border px-4 py-3 text-[15px] leading-6 min-h-[52px] flex items-start gap-3 transition ${lugar >= 0 ? "border-orange-500 bg-orange-500/5" : "border-border hover:border-orange-500"}`}
              data-testid="laboratorio-ordenar-opcion"
            >
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${lugar >= 0 ? "bg-orange-600 text-white" : "border-2 border-dashed border-muted-foreground/40"}`}
                aria-hidden="true"
              >
                {lugar >= 0 ? lugar + 1 : ""}
              </span>
              <span>
                {lugar >= 0 && <span className="sr-only">Lugar {lugar + 1}: </span>}
                {o.texto}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button className="fire-btn-primary h-12 px-6" disabled={orden.length < n || ocupado} onClick={() => alConfirmar(orden)} data-testid="laboratorio-confirmar">
          {ocupado ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Confirmar el orden
        </Button>
        {orden.length > 0 && (
          <Button variant="outline" className="h-12" onClick={() => setOrden([])} disabled={ocupado}>
            <RotateCcw className="w-4 h-4 mr-2" /> Empezar de nuevo
          </Button>
        )}
      </div>
    </div>
  );
}

function Consecuencia({ c, medidores, ultimo, alSeguir }: { c: ConsecuenciaVista; medidores: Medidor[]; ultimo: boolean; alSeguir: () => void }) {
  const cabeza = c.critica ? "Acción crítica" : c.ejemplar ? "La mejor respuesta" : c.puntos > 0 ? "Bien, pero se podía mejor" : "No era lo que más ayudaba";
  const tono = c.critica ? "bg-red-500/10 border-red-500/30" : c.ejemplar ? "bg-emerald-500/10 border-emerald-500/30" : "bg-orange-500/10 border-orange-500/30";
  return (
    <div data-testid="laboratorio-consecuencia">
      {c.orden ? (
        <>
          <p className="text-[15px] leading-7 font-medium">{c.pasa}</p>
          <p className="font-semibold mt-4">El orden de quien sabe</p>
          <ol className="mt-2 space-y-2">
            {c.orden.map((o, i) => (
              <li key={i} className="rounded-xl border border-border p-3">
                <p className="text-[15px] leading-6"><span className="font-bold mr-1">{i + 1}.</span>{o.texto}</p>
                <p className="text-sm text-muted-foreground mt-1">{o.porque}</p>
                <p className={`text-xs font-semibold mt-1.5 ${o.tuLugar === i + 1 ? "text-emerald-700 dark:text-emerald-300" : "text-orange-700 dark:text-orange-300"}`}>
                  {o.tuLugar === i + 1 ? "La pusiste en el mismo lugar." : `La pusiste en el lugar ${o.tuLugar}.`}
                </p>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <>
          <Globo quien={null} texto={c.elegida[0]} tuyo />
          {c.responde && <div className="mt-2"><Globo quien={c.quien} texto={c.responde} /></div>}
          <p className="text-[15px] leading-7 mt-3">{c.pasa}</p>
        </>
      )}
      {medidores.length > 0 && <div className="mt-4"><Medidores medidores={medidores} cambios={c.cambios} /></div>}
      <div className={`rounded-xl border p-4 mt-4 text-[15px] leading-6 ${tono}`} role="status" data-testid="laboratorio-explica">
        <p className="font-semibold flex items-center gap-1.5">
          {c.critica ? <AlertTriangle className="w-4 h-4 text-red-600" /> : c.ejemplar ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-orange-600" />}
          {cabeza}
          <span className="ml-auto text-xs tabular-nums font-medium text-muted-foreground">{puntos(c.puntos)} de {c.max}</span>
        </p>
        {c.critica && <p className="mt-1.5">{c.critica}</p>}
        {!c.critica || c.explica !== c.critica ? <p className="mt-1.5">{c.explica}</p> : null}
        {c.mejor && (
          <p className="mt-2"><span className="font-semibold">Lo que más ayudaba: </span>{c.mejor}</p>
        )}
      </div>
      <Button className="fire-btn-primary h-12 px-7 mt-5 w-full sm:w-auto" onClick={alSeguir} data-testid="laboratorio-seguir">
        {ultimo ? "Ver cómo te fue" : "Seguir"} <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

function Resultado({ v, ocupado, alCierre, alCamino, alOtra, materia }: { v: IntentoVista; ocupado: boolean; alCierre: () => void; alCamino: () => void; alOtra: () => void; materia: string }) {
  const r = v.resultado!;
  return (
    <div data-testid="laboratorio-resultado">
      <div className="glass-card p-6 text-center">
        <p className="data-label">Cómo te fue</p>
        <p className="font-display text-6xl font-bold mt-2 tabular-nums" data-testid="laboratorio-nota">{r.nota}</p>
        <p className="text-sm text-muted-foreground">de 100 en esta práctica</p>
        {v.mejor != null && v.intentos > 1 && <p className="text-sm mt-2">Tu mejor resultado: <strong>{v.mejor}</strong></p>}
      </div>
      <h2 className="font-semibold mt-6 mb-2">Tu perfil en esta práctica</h2>
      <ul className="space-y-2">
        {r.competencias.map((c) => (
          <li key={c.id} className="glass-card p-4" data-testid="laboratorio-competencia">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold leading-6">{c.nombre}</p>
                <p className="text-xs text-muted-foreground">{c.leccion} · {c.pct} %</p>
              </div>
              <ChipNivel nivel={c.nivel} />
            </div>
            <div className="mt-2"><BarraAvance valor={c.pct} de={100} /></div>
          </li>
        ))}
      </ul>
      {r.criticas.length > 0 ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 mt-4 text-[15px] leading-6" role="note" data-testid="laboratorio-criticas">
          <p className="font-semibold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-red-600" /> {r.criticas.length === 1 ? "Una acción crítica" : `${r.criticas.length} acciones críticas`}</p>
          <ul className="mt-1.5 space-y-1.5 list-disc pl-5">
            {r.criticas.map((c, i) => <li key={i}><strong>{c.titulo}.</strong> {c.texto}</li>)}
          </ul>
          <p className="mt-2 text-sm">Con una acción crítica, la práctica queda en {LABORATORIO.topeConCritica} como máximo. Vuelve a hacerla: el próximo intento puede traer otra versión del caso.</p>
        </div>
      ) : (
        <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-4 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Sin acciones críticas.</p>
      )}
      <p className="text-xs text-muted-foreground mt-3">
        Práctica formativa: en el piloto no cuenta para la nota de la materia.
        {!v.cuenta ? " Este intento es de práctica libre o de prueba: no cambia tu mejor resultado." : ""}
      </p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Button className="fire-btn-primary h-12" onClick={alCierre} data-testid="laboratorio-ir-cierre"><MessageCircle className="w-4 h-4 mr-2" /> Conversación de cierre</Button>
        <Button variant="outline" className="h-12" onClick={alCamino} data-testid="laboratorio-ir-camino"><Route className="w-4 h-4 mr-2" /> El camino ejemplar</Button>
        <Button variant="outline" className="h-12" onClick={alOtra} disabled={ocupado} data-testid="laboratorio-otra-vez"><RotateCcw className="w-4 h-4 mr-2" /> Hacerla otra vez</Button>
        <Link href={materia}><Button variant="ghost" className="h-12 w-full">Volver a la materia</Button></Link>
      </div>
    </div>
  );
}

function Cierre({ v, alGuardado, alVolver }: { v: IntentoVista; alGuardado: (v: IntentoVista) => void; alVolver: () => void }) {
  const r = v.resultado!;
  const qc = useQueryClient();
  const [, navegar] = useLocation();
  const [sentir, setSentir] = useState<string | null>(v.cierre?.sentir ?? null);
  const [llevo, setLlevo] = useState(v.cierre?.llevo ?? "");
  const [ocupado, setOcupado] = useState(false);
  const [guardado, setGuardado] = useState(!!v.cierre);
  const [error, setError] = useState<string | null>(null);

  const guardar = async (): Promise<boolean> => {
    setOcupado(true);
    setError(null);
    try {
      const nv = await guardarCierre(v.id, { sentir, llevo });
      alGuardado(nv);
      setGuardado(true);
      return true;
    } catch (e: any) {
      setError(e?.message ?? "No se pudo guardar. Inténtalo otra vez.");
      return false;
    } finally {
      setOcupado(false);
    }
  };
  const alCuaderno = async () => {
    if (!(await guardar())) return;
    setOcupado(true);
    try {
      const nota = await crearNota({
        titulo: `Laboratorio: ${v.practica.titulo}`.slice(0, LIMITES.titulo),
        materiaId: v.materia.id,
        bloques: [
          bloque("aviso", `Práctica del laboratorio ministerial: ${v.practica.titulo} (${v.materia.titulo}). Resultado: ${r.nota} de 100.`),
          ...(sentir ? [bloque("texto", `Cómo me sentí: ${sentir}.`)] : []),
          bloque("subtitulo", "Lo que hice bien"),
          ...(r.bien.length ? r.bien.map((t) => bloque("lista", t)) : [bloque("texto", "Esta vez ninguna decisión fue la mejor.")]),
          bloque("subtitulo", "Lo que haría distinto"),
          ...(r.distinto.length ? r.distinto.map((t) => bloque("lista", t)) : [bloque("texto", "Nada importante.")]),
          bloque("subtitulo", "Lo que me llevo"),
          bloque("texto", llevo || v.practica.cierre),
        ],
      });
      qc.setQueryData(["cuaderno", "nota", nota.id], nota);
      await qc.invalidateQueries({ queryKey: ["cuaderno", "lista"] });
      navegar(`/academia/cuaderno?nota=${nota.id}`);
    } catch (e) {
      setError(e instanceof ErrorCuaderno ? e.message : "No se pudo abrir el cuaderno. Revisa tu conexión e inténtalo otra vez.");
      setOcupado(false);
    }
  };

  return (
    <div data-testid="laboratorio-cierre">
      <h2 className="font-display text-2xl font-bold flex items-center gap-2"><MessageCircle className="w-6 h-6 text-orange-500" /> Conversación de cierre</h2>
      <p className="text-sm text-muted-foreground mt-1">Unos minutos para pensar en lo que pasó: así lo aprendido se queda contigo.</p>
      <fieldset className="mt-5">
        <legend className="font-semibold">1. ¿Cómo te sentiste?</legend>
        <div className="flex flex-wrap gap-2 mt-2">
          {SENTIRES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={sentir === s}
              onClick={() => { setSentir(sentir === s ? null : s); setGuardado(false); }}
              className={`rounded-full border px-4 min-h-[44px] text-sm transition ${sentir === s ? "border-orange-500 bg-orange-500/10 font-semibold" : "border-border hover:border-orange-500"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-5">
        <p className="font-semibold">2. Lo que hiciste bien</p>
        <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-[15px] leading-6">
          {r.bien.length ? r.bien.map((t, i) => <li key={i}>{t}</li>) : <li>Esta vez ninguna decisión fue la mejor: el camino ejemplar te muestra cuáles eran.</li>}
        </ul>
      </div>
      <div className="mt-5">
        <p className="font-semibold">3. Lo que harías distinto</p>
        <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-[15px] leading-6">
          {r.distinto.length ? r.distinto.map((t, i) => <li key={i}>{t}</li>) : <li>Nada importante. Vuelve a hacerla otro día para afianzarlo.</li>}
        </ul>
      </div>
      <div className="mt-5">
        <label htmlFor="lab-llevo" className="font-semibold">4. Lo que me llevo</label>
        <p className="text-sm text-muted-foreground mt-0.5">{v.practica.cierre}</p>
        <textarea
          id="lab-llevo"
          value={llevo}
          onChange={(e) => { setLlevo(e.target.value); setGuardado(false); }}
          maxLength={LIMITE_LLEVO}
          rows={4}
          className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-[15px] leading-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Escribe en una o dos frases lo que harás la próxima vez."
          data-testid="laboratorio-llevo"
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-2" role="alert">{error}</p>}
      <div className="mt-4 grid gap-2 sm:flex sm:flex-wrap">
        <Button className="fire-btn-primary h-12" onClick={() => void guardar()} disabled={ocupado} data-testid="laboratorio-guardar-cierre">
          {guardado ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Guardado</> : "Guardar"}
        </Button>
        <Button variant="outline" className="h-12" onClick={alCuaderno} disabled={ocupado} data-testid="laboratorio-al-cuaderno">
          <NotebookPen className="w-4 h-4 mr-2" /> Llevarlo a mi cuaderno
        </Button>
        <Button variant="ghost" className="h-12" onClick={alVolver}>Volver al resultado</Button>
      </div>
    </div>
  );
}

function Camino({ v, ocupado, alVolver, alOtra }: { v: IntentoVista; ocupado: boolean; alVolver: () => void; alOtra: () => void }) {
  const r = v.resultado!;
  const ordenar = v.practica.formato === "ordenar";
  return (
    <div data-testid="laboratorio-camino">
      <h2 className="font-display text-2xl font-bold flex items-center gap-2"><Route className="w-6 h-6 text-orange-500" /> El camino ejemplar</h2>
      <p className="text-sm text-muted-foreground mt-1">Lo que mejor ayudaba en cada paso, según las lecciones, junto a lo que tú elegiste.</p>
      <ol className="mt-4 space-y-2">
        {r.camino.map((c, i) => (
          <li key={i} className="glass-card p-4">
            <p className="font-semibold leading-6">{i + 1}. {c.titulo}</p>
            <p className="text-[15px] leading-6 mt-1">{c.porque}</p>
            <p className={`text-sm mt-2 flex items-start gap-1.5 ${c.bien ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}`}>
              {c.bien ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 mt-0.5 shrink-0" />}
              <span>
                <span className="font-medium">{c.bien ? (ordenar ? "Tu orden fue el de quien sabe. " : "Así lo hiciste: ") : ordenar ? "Pusiste primero: " : "Tu elección: "}</span>
                {c.bien && ordenar ? "" : c.elegida}
              </span>
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap">
        <Button className="fire-btn-primary h-12" onClick={alOtra} disabled={ocupado}><RotateCcw className="w-4 h-4 mr-2" /> Hacerla otra vez</Button>
        <Button variant="outline" className="h-12" onClick={alVolver}>Volver al resultado</Button>
      </div>
    </div>
  );
}

function Preparacion({ d, ocupado, error, alEmpezar }: { d: PracticaDetalle; ocupado: boolean; error: { mensaje: string; status: number } | null; alEmpezar: () => void }) {
  const p = d.practica;
  const aqui = `/academia/laboratorio/${p.id}`;
  const materia = `/academia/materia/${d.materia.id}`;
  const [nombre, nombres] = NOMBRE_PASO[p.formato];
  const pendientes = p.lecciones.filter((l) => !l.completada);
  return (
    <div data-testid="laboratorio-preparacion">
      <p className="data-label text-orange-600 dark:text-orange-300 flex items-center gap-1.5">
        <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" /> Laboratorio ministerial · {NOMBRE_FORMATO[p.formato]}
      </p>
      <h1 className="heading-display font-display text-3xl md:text-4xl mt-2" data-testid="laboratorio-titulo">{p.titulo}</h1>
      <p className="text-sm text-muted-foreground mt-2">Unos {p.minutos} minutos · {p.pasos} {nombres} · se basa en {textoLecciones(p.lecciones.map((l) => l.n))}</p>
      {d.prueba && (
        <p className="text-sm mt-4 rounded-lg bg-sky-500/10 px-3 py-2">Vista de la Administración: puedes hacerla sin inscribirte. Tus intentos quedan como prueba.</p>
      )}
      <div className="glass-card p-5 mt-5">
        <dl className="space-y-3 text-[15px] leading-6">
          <div><dt className="font-semibold">Tu rol</dt><dd>{p.rol}</dd></div>
          <div><dt className="font-semibold">La situación</dt><dd>{p.situacion}</dd></div>
          <div><dt className="font-semibold">Tu objetivo</dt><dd>{p.objetivo}</dd></div>
        </dl>
        {p.lectura && (
          <p className="mt-4">
            {p.lectura.enlace ? (
              <Link href={p.lectura.enlace} className="inline-flex items-center gap-1.5 text-orange-700 dark:text-orange-300 font-medium hover:underline">
                <BookOpen className="w-4 h-4" /> Leer {p.lectura.ref} en la Biblioteca
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Lee antes {p.lectura.ref}</span>
            )}
          </p>
        )}
      </div>
      <h2 className="font-semibold mt-6">Antes de empezar</h2>
      <ul className="list-disc pl-5 mt-1.5 space-y-1.5 text-[15px] leading-6">
        {p.antes.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
      <h2 className="font-semibold mt-6">Lo que se mide</h2>
      <ul className="mt-1.5 space-y-1 text-[15px] leading-6">
        {p.competencias.map((c) => <li key={c.nombre}>{c.nombre} <span className="text-sm text-muted-foreground">({c.leccion})</span></li>)}
      </ul>
      {p.mejor != null && (
        <p className="text-sm mt-5">Tu mejor resultado: <strong>{p.mejor}</strong> de 100 · {p.nivel} · {Math.min(p.intentos, LABORATORIO.intentos)} de {LABORATORIO.intentos} intentos que cuentan</p>
      )}
      <div className="mt-6">
        {!d.conSesion ? (
          <Button asChild className="fire-btn-primary h-12 px-7"><a href={loginUrl(aqui)}>Entrar para hacer la práctica</a></Button>
        ) : !d.puede ? (
          <div className="glass-card p-4 border border-orange-500/30">
            <p className="text-sm">Para hacer esta práctica, primero inscríbete en la materia {d.materia.titulo}.</p>
            <Link href={materia}><Button className="fire-btn-primary mt-3">Ir a la materia</Button></Link>
          </div>
        ) : p.falta.length > 0 ? (
          <div className="glass-card p-4 border border-orange-500/30" data-testid="laboratorio-falta">
            <p className="text-sm">Para hacer esta práctica te falta {p.falta.join(" y ")}:</p>
            <ul className="mt-2 space-y-1">
              {pendientes.map((l) => (
                <li key={l.id}><Link href={`/academia/leccion/${l.id}`} className="text-sm text-orange-700 dark:text-orange-300 hover:underline">Lección {l.n}: {l.titulo}</Link></li>
              ))}
            </ul>
          </div>
        ) : (
          <Button className="fire-btn-primary h-12 px-7 w-full sm:w-auto" onClick={alEmpezar} disabled={ocupado} data-testid="laboratorio-empezar">
            {ocupado ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {p.enCurso ? "Seguir con la práctica" : p.intentos ? "Hacerla otra vez" : "Empezar la práctica"} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {error && (
          <div className="mt-3 text-sm" role="alert">
            <p className="text-red-600">{error.mensaje}</p>
            {error.status === 409 && <Link href={error.mensaje.includes("academia") ? enlaceInscripcion(aqui) : materia} className="text-orange-700 dark:text-orange-300 hover:underline">Ir a resolverlo</Link>}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          Práctica formativa: en el piloto no cuenta para la nota de la materia. Cada intento puede traer otra versión del caso. {nombre === "Ronda" ? "" : "Las opciones cambian de lugar en cada intento."}
        </p>
      </div>
    </div>
  );
}

export default function AcademiaLaboratorio() {
  const { practicaId } = useParams<{ practicaId: string }>();
  const qc = useQueryClient();
  const q = usePractica(practicaId);
  useTituloAcademia(q.data?.practica.titulo ?? "Laboratorio ministerial");
  const [v, setV] = useState<IntentoVista | null>(null);
  const [c, setC] = useState<ConsecuenciaVista | null>(null);
  const [fase, setFase] = useState<Fase>("preparacion");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<{ mensaje: string; status: number } | null>(null);

  // en el teléfono, cada paso empieza arriba
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [fase, v?.paso?.n]);

  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <FlaskConical className="w-12 h-12 mx-auto text-orange-500" />
          <p className="text-lg mt-4 mb-6">{q.error?.message ?? "No se encontró esa práctica."}</p>
          <Link href="/academia"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-1" /> Volver a la academia</Button></Link>
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const materia = `/academia/materia/${d.materia.id}`;

  const empezar = async () => {
    setOcupado(true);
    setError(null);
    try {
      const nv = await empezarPractica(d.practica.id);
      setV(nv);
      setC(null);
      setFase(nv.estado === "terminado" ? "resultado" : "paso");
    } catch (e: any) {
      setError({ mensaje: e?.message ?? "No se pudo empezar la práctica.", status: e?.status ?? 0 });
      setFase("preparacion");
    } finally {
      setOcupado(false);
    }
  };
  const contestar = async (cuerpo: { k?: number; orden?: number[] }) => {
    if (!v?.paso || ocupado) return;
    setOcupado(true);
    setError(null);
    try {
      const r = await responderPaso(v.id, { paso: v.paso.n, ...cuerpo });
      setC(r.consecuencia);
      setV(r.intento);
      setFase("consecuencia");
      if (r.intento.estado === "terminado") void qc.invalidateQueries({ queryKey: ["academia", "laboratorio"] });
    } catch (e: any) {
      // si ya se había respondido (otra pestaña), el servidor manda cómo va
      if (e?.datos?.intento) setV(e.datos.intento as IntentoVista);
      setError({ mensaje: e?.message ?? "No se pudo guardar tu respuesta.", status: e?.status ?? 0 });
    } finally {
      setOcupado(false);
    }
  };
  const seguir = () => {
    setC(null);
    setFase(v?.estado === "terminado" ? "resultado" : "paso");
  };

  const enCamino = (fase === "paso" || fase === "consecuencia") && v;
  const total = v?.paso?.de ?? c?.n ?? 0;
  const n = fase === "consecuencia" ? c?.n ?? 0 : v?.paso?.n ?? 0;
  const [nombre] = NOMBRE_PASO[d.practica.formato];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16" data-testid="laboratorio">
        <Link href={materia} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> {d.materia.titulo}</Link>

        {enCamino && (
          <div className="mt-4">
            <p className="data-label text-orange-600 dark:text-orange-300 flex items-center gap-1.5"><FlaskConical className="w-3.5 h-3.5" aria-hidden="true" /> {d.practica.titulo}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-2 mb-1.5">
              <span>{nombre} {n} de {total || d.practica.pasos}{fase === "consecuencia" && c ? " · Lo que pasa" : v?.paso ? ` · ${v.paso.titulo}` : ""}</span>
              {!v!.cuenta && <span className="text-xs">Práctica libre</span>}
            </div>
            <BarraAvance valor={fase === "consecuencia" ? n : n - 1} de={total || d.practica.pasos} />
            {fase === "paso" && v!.medidores.length > 0 && <div className="mt-4"><Medidores medidores={v!.medidores} /></div>}
          </div>
        )}

        <div className="mt-5">
          {fase === "preparacion" || !v ? (
            <Preparacion d={d} ocupado={ocupado} error={error} alEmpezar={empezar} />
          ) : fase === "paso" && v.paso ? (
            <div className="glass-card p-5">
              {v.paso.tipo === "escena" ? (
                <Escena paso={v.paso} ocupado={ocupado} alElegir={(k) => void contestar({ k })} />
              ) : (
                <Ordenar paso={v.paso} ocupado={ocupado} alConfirmar={(orden) => void contestar({ orden })} />
              )}
              {error && <p className="text-sm text-red-600 mt-3" role="alert">{error.mensaje}</p>}
            </div>
          ) : fase === "consecuencia" && c ? (
            <div className="glass-card p-5">
              <Consecuencia c={c} medidores={v.medidores} ultimo={v.estado === "terminado"} alSeguir={seguir} />
            </div>
          ) : v.estado === "terminado" && v.resultado ? (
            fase === "cierre" ? (
              <Cierre v={v} alGuardado={setV} alVolver={() => setFase("resultado")} />
            ) : fase === "camino" ? (
              <Camino v={v} ocupado={ocupado} alVolver={() => setFase("resultado")} alOtra={empezar} />
            ) : (
              <Resultado v={v} ocupado={ocupado} alCierre={() => setFase("cierre")} alCamino={() => setFase("camino")} alOtra={empezar} materia={materia} />
            )
          ) : (
            <Preparacion d={d} ocupado={ocupado} error={error} alEmpezar={empezar} />
          )}
          {error && fase !== "preparacion" && fase !== "paso" && <p className="text-sm text-red-600 mt-3" role="alert">{error.mensaje}</p>}
        </div>
      </div>
    </Layout>
  );
}
