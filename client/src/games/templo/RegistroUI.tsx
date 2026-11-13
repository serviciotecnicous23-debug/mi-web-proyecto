/**
 * «📜 Su registro»: todo lo que ha hecho una persona en Jerusalén en línea (shared/registro.ts). Se abre desde su
 * casa, su ficha de vecino, las tablas y «Tu casa» (el mío). Cambia la ventana de antes por esta y, al volver,
 * la deja como estaba.
 */
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMINOS } from "@shared/caminos";
import { NIVELES_CASA, nombreDeBarrio } from "@shared/ciudad";
import { LOGROS_EN_LINEA, type LogroId } from "@shared/logros-en-linea";
import { OBRAS } from "@shared/obras";
import { NOMBRE_FIN, VERSO_REGISTRO, duracion, resumenRegistro, type PartidaRegistro, type RegistroJugador } from "@shared/registro";
import { Medalla } from "./medalla";
import { Estrellas } from "./ObrasUI";
import { gameStore, type Modal } from "./store";
import { Card, VerseBox } from "./ui";

type Pestana = "servicio" | "estudios" | "juegos" | "casa" | "logros";
const PESTANAS: { id: Pestana; nombre: string; icono: string }[] = [
  { id: "servicio", nombre: "Servicio", icono: "🔥" },
  { id: "estudios", nombre: "Estudios", icono: "📖" },
  { id: "juegos", nombre: "Juegos", icono: "🏆" },
  { id: "casa", nombre: "Casa y barrio", icono: "🏠" },
  { id: "logros", nombre: "Logros", icono: "🏅" },
];

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
function fecha(dia: string): string {
  const [y, m, d] = dia.split("-").map(Number);
  return y && m && d ? `${d} de ${MESES[m - 1]} de ${y}` : "";
}
const fmt = (n: number) => n.toLocaleString("es");
const FIN_ICONO: Record<PartidaRegistro["fin"], string> = { gano: "👑", retiro: "🚶", perdio: "❌", tiempo: "⏳" };

/** Abre el registro de una persona (con cualquiera de sus personajes); al cerrarlo, vuelve a la ventana de antes. */
export function abrirRegistro(personajeId: number, nombre?: string) {
  const antes = gameStore.getSnapshot().modal;
  const volver = antes && antes.kind !== "registro" ? antes : antes?.kind === "registro" ? antes.volver : undefined;
  if (antes) gameStore.reemplazar({ kind: "registro", personajeId, nombre, volver });
  else gameStore.push({ kind: "registro", personajeId, nombre });
}

/** El botón que abre el registro (en la casa, la ficha y las tablas). */
export function BotonRegistro({ personajeId, nombre, mio, className = "" }: { personajeId: number; nombre?: string; mio?: boolean; className?: string }) {
  return (
    <Button
      type="button"
      variant="secondary"
      className={`w-full rounded-full font-bold ${className}`}
      onClick={() => abrirRegistro(personajeId, nombre)}
      data-testid="button-abrir-registro"
    >
      📜 {mio ? "Ver mi registro" : "Ver su registro"}
    </Button>
  );
}

/** Un nombre de una tabla que abre su registro. */
export function NombreConRegistro({ personajeId, nombre, className = "" }: { personajeId: number; nombre: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => abrirRegistro(personajeId, nombre)}
      className={`text-left underline decoration-amber-400/60 decoration-dotted underline-offset-2 hover:decoration-amber-500 ${className}`}
      title={`Ver el registro de ${nombre}`}
      data-testid={`registro-de-${personajeId}`}
    >
      {nombre}
    </button>
  );
}

async function traerRegistro(personajeId: number): Promise<{ ok: boolean; data?: RegistroJugador; message?: string }> {
  try {
    const res = await fetch(`/api/jerusalen/registro/${personajeId}`, { credentials: "include" });
    const data = await res.json().catch(() => null);
    if (res.ok) return { ok: true, data: data as RegistroJugador };
    return { ok: false, message: (data as { message?: string } | null)?.message || (res.status === 401 ? "Entra con tu cuenta para ver el registro." : "No se pudo abrir el registro.") };
  } catch {
    return { ok: false, message: "No hay conexión. Intenta de nuevo." };
  }
}

export function RegistroView({ personajeId, nombre, volver }: { personajeId: number; nombre?: string; volver?: Modal }) {
  const [r, setR] = useState<RegistroJugador | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pestana, setPestana] = useState<Pestana>("servicio");
  useEffect(() => {
    let vivo = true;
    setR(null);
    setError(null);
    const pedir = (intento: number) =>
      void traerRegistro(personajeId).then((x) => {
        if (!vivo) return;
        if (x.ok && x.data) setR(x.data);
        else if (intento < 2 && x.message === "Espera un momento") setTimeout(() => pedir(intento + 1), 900);
        else setError(x.message || "No se pudo abrir el registro.");
      });
    pedir(0);
    return () => {
      vivo = false;
    };
  }, [personajeId]);
  const salir = () => (volver ? gameStore.reemplazar(volver) : gameStore.close());
  const quien = r?.nombre ?? nombre ?? "este vecino";
  return (
    <Card
      wide
      title={
        <span className="flex items-center gap-2">
          {volver && (
            <button type="button" onClick={salir} className="rounded-full p-0.5 hover:bg-amber-100 dark:hover:bg-amber-900/40" aria-label="Volver" data-testid="button-registro-volver">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          📜 {r?.esMio ? "Mi registro" : `El registro de ${quien}`}
        </span>
      }
      onClose={salir}
      testid="registro"
    >
      <div className="space-y-3 p-4 text-sm">
        {!r && !error && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
          </div>
        )}
        {error && <p className="rounded-xl bg-amber-50 p-3 text-sm dark:bg-amber-950/30">{error}</p>}
        {r && (
          <>
            <Cabecera r={r} />
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Partes del registro">
              {PESTANAS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={pestana === p.id}
                  onClick={() => setPestana(p.id)}
                  className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
                    pestana === p.id
                      ? "border-amber-500 bg-amber-400 text-amber-950 shadow-sm"
                      : "border-amber-200 bg-white text-stone-700 hover:bg-amber-50 dark:border-amber-900 dark:bg-transparent dark:text-stone-200 dark:hover:bg-amber-950/30"
                  }`}
                  data-testid={`registro-pestana-${p.id}`}
                >
                  {p.icono} {p.nombre}
                </button>
              ))}
            </div>
            <div className="min-h-[12rem]" data-testid={`registro-parte-${pestana}`}>
              {pestana === "servicio" && <Servicio r={r} />}
              {pestana === "estudios" && <Estudios r={r} />}
              {pestana === "juegos" && <Juegos r={r} />}
              {pestana === "casa" && <CasaYBarrio r={r} />}
              {pestana === "logros" && <Logros r={r} />}
            </div>
            <VerseBox text={VERSO_REGISTRO.text} refName={VERSO_REGISTRO.ref} />
          </>
        )}
        <Button variant="secondary" className="w-full" onClick={salir} data-testid="button-registro-cerrar">
          {volver ? "Volver" : "Cerrar"}
        </Button>
      </div>
    </Card>
  );
}

function Cabecera({ r }: { r: RegistroJugador }) {
  const resumen = resumenRegistro(r);
  const inicial = (r.nombre.trim()[0] || "?").toUpperCase();
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-300/70 bg-gradient-to-br from-amber-50 via-[#fff4dc] to-amber-100 p-3 dark:border-amber-700/50 dark:from-amber-950/50 dark:via-stone-900 dark:to-amber-950/40" data-testid="registro-cabecera">
      <div className="pointer-events-none absolute -right-6 -top-8 text-[96px] leading-none opacity-[0.08]" aria-hidden="true">
        📜
      </div>
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-amber-400 bg-gradient-to-b from-amber-300 to-amber-600 font-serif text-2xl font-black text-amber-950 shadow-inner">
          {inicial}
        </span>
        <div className="min-w-0">
          <p className="truncate font-serif text-xl font-black leading-tight">{r.nombre}</p>
          {r.titulo && <p className="mt-0.5 inline-block rounded-full bg-amber-500/90 px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-amber-950">✨ {r.titulo}</p>}
          <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-300">
            {r.desde ? `En Jerusalén desde el ${fecha(r.desde)}` : "Recién llegado a Jerusalén"}
            {r.barrio ? ` · ${nombreDeBarrio(r.barrio)}` : ""}
          </p>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
        <Dato icono="📅" valor={fmt(r.diasJugados)} nombre={r.diasJugados === 1 ? "día jugado" : "días jugados"} />
        <Dato icono="🔥" valor={fmt(r.racha.actual)} nombre={`racha (la mejor: ${r.racha.mejor})`} />
        <Dato icono="📖" valor={fmt(r.estudios.aprobados.length)} nombre={r.estudios.aprobados.length === 1 ? "estudio aprobado" : "estudios aprobados"} />
      </div>
      {resumen.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1">
          {resumen.map((t) => (
            <li key={t} className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-amber-900 dark:bg-black/20 dark:text-amber-200">
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Dato({ icono, valor, nombre }: { icono: string; valor: string; nombre: string }) {
  return (
    <div className="rounded-xl bg-white/75 px-1.5 py-1.5 dark:bg-black/25">
      <p className="text-base font-black leading-none tabular-nums">
        <span className="mr-0.5 text-sm" aria-hidden="true">
          {icono}
        </span>
        {valor}
      </p>
      <p className="mt-0.5 text-[10px] font-semibold leading-tight text-stone-500 dark:text-stone-400">{nombre}</p>
    </div>
  );
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h4 className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">{titulo}</h4>
      {children}
    </section>
  );
}

function Barra({ valor, de, color = "bg-amber-500" }: { valor: number; de: number; color?: string }) {
  const p = de > 0 ? Math.max(0, Math.min(1, valor / de)) : 0;
  return (
    <div className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700" role="progressbar" aria-valuemin={0} aria-valuemax={de} aria-valuenow={valor}>
      <div className={`h-full rounded-full ${color} transition-[width] duration-700`} style={{ width: `${p * 100}%` }} />
    </div>
  );
}

function Vacio({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl border border-dashed border-stone-300 p-3 text-center text-xs text-stone-500 dark:border-stone-600">{children}</p>;
}

function Servicio({ r }: { r: RegistroJugador }) {
  if (!r.personajes.length) return <Vacio>Todavía no tiene personaje en Jerusalén.</Vacio>;
  return (
    <div className="space-y-2.5">
      {r.personajes.map((p) => (
        <div key={p.id} className="rounded-2xl border border-amber-200 bg-white/70 p-3 dark:border-amber-900/60 dark:bg-black/20" data-testid={`registro-personaje-${p.id}`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              {CAMINOS[p.camino].icono}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{p.nombre}</p>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                {p.escalon} · {CAMINOS[p.camino].nombre}
              </p>
            </div>
            {p.puesto && p.puesto <= 3 && <Medalla icono={["🥇", "🥈", "🥉"][p.puesto - 1]} metal={(4 - p.puesto) as 1 | 2 | 3} size={36} titulo={`Puesto ${p.puesto} de su camino`} />}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
            <Dato icono="⭐" valor={fmt(p.merito)} nombre="mérito esta temporada" />
            <Dato icono="#" valor={p.puesto ? String(p.puesto) : "—"} nombre="puesto en su camino" />
            <Dato icono="🏛️" valor={fmt(p.meritoSiempre)} nombre={`mérito en ${p.temporadas || 0} ${p.temporadas === 1 ? "temporada" : "temporadas"}`} />
          </div>
          {p.cargos.length > 0 && (
            <ul className="mt-2 space-y-0.5 text-xs">
              {p.cargos.map((c) => (
                <li key={`${c.temporada}-${c.cargo}`} className="flex items-center gap-1.5">
                  <span aria-hidden="true">🏅</span>
                  <span className={c.perdido ? "text-stone-400 line-through" : "font-semibold"}>
                    Temporada {c.temporada}: {c.cargo}
                  </span>
                  {c.perdido && <span className="text-[10px] text-stone-500">(lo dejó)</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function Estudios({ r }: { r: RegistroJugador }) {
  const e = r.estudios;
  return (
    <div className="space-y-3">
      <Seccion titulo="Estudios aprobados">
        {e.aprobados.length ? (
          <ul className="space-y-1.5">
            {e.aprobados.map((a) => (
              <li key={a.id} className="flex items-center gap-2 rounded-xl bg-emerald-50 px-2.5 py-1.5 dark:bg-emerald-950/30">
                <span className="text-lg" aria-hidden="true">
                  {a.icono}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{a.titulo}</span>
                  <span className="text-[11px] text-stone-500">Aprobado el {fecha(a.fecha)}</span>
                </span>
                <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-black tabular-nums text-emerald-800 dark:bg-black/30 dark:text-emerald-300">
                  {a.perfecto ? "⭐ " : ""}
                  {a.nota} de {a.de}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <Vacio>Todavía no aprobó ningún estudio.</Vacio>
        )}
      </Seccion>
      {e.enCurso.length > 0 && (
        <Seccion titulo="Estudiando">
          <ul className="space-y-1.5">
            {e.enCurso.map((c) => (
              <li key={c.id} className="space-y-1 rounded-xl border border-stone-200 px-2.5 py-1.5 dark:border-stone-700">
                <p className="flex items-center justify-between gap-2 text-xs font-semibold">
                  <span>
                    {c.icono} {c.titulo}
                  </span>
                  <span className="tabular-nums text-stone-500">
                    {c.secciones} de {c.de} secciones
                  </span>
                </p>
                <Barra valor={c.secciones} de={c.de} />
              </li>
            ))}
          </ul>
        </Seccion>
      )}
      <Seccion titulo="La instrucción del templo">
        <div className="space-y-1">
          <p className="text-xs">{e.instruccion.partes >= e.instruccion.de ? "✅ Terminó la instrucción del sacerdote." : `Lleva ${e.instruccion.partes} de ${e.instruccion.de} partes.`}</p>
          <Barra valor={e.instruccion.partes} de={e.instruccion.de} color="bg-emerald-500" />
        </div>
      </Seccion>
      <Seccion titulo="Las cátedras de los maestros">
        {e.catedras.length ? (
          <ul className="space-y-1.5">
            {e.catedras.map((c) => (
              <li key={c.area} className="rounded-xl border border-violet-200 bg-violet-50/60 px-2.5 py-1.5 dark:border-violet-900/60 dark:bg-violet-950/20">
                <p className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold">
                    {c.icono} {c.nombre}
                  </span>
                  <span className="font-black text-violet-800 dark:text-violet-300">{c.grado}</span>
                </p>
                <div className="mt-1 flex gap-0.5" aria-label={`Grado ${c.nivel + 1} de 5`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= c.nivel ? "bg-violet-500" : "bg-stone-200 dark:bg-stone-700"}`} />
                  ))}
                </div>
                <p className="mt-0.5 text-[10px] text-stone-500">
                  {c.aprendidas} de {c.total} lecciones
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <Vacio>Todavía no tomó lecciones con los maestros.</Vacio>
        )}
      </Seccion>
    </div>
  );
}

/** La escalera de las 15 gradas, con la grada en que quedó. */
function Escalera({ grada, fin }: { grada: number; fin: PartidaRegistro["fin"] }) {
  return (
    <div className="flex items-end gap-[2px]" aria-label={`Llegó a la grada ${grada} de 15`}>
      {Array.from({ length: 15 }, (_, i) => {
        const n = i + 1;
        const alto = 6 + i * 1.3;
        const color =
          n < grada ? "bg-amber-400" : n === grada ? (fin === "gano" ? "bg-yellow-300 ring-1 ring-amber-600" : fin === "retiro" ? "bg-emerald-400" : "bg-red-400") : "bg-stone-200 dark:bg-stone-700";
        return <span key={n} className={`w-[5px] rounded-sm ${color} ${n === 5 || n === 10 ? "opacity-100" : ""}`} style={{ height: alto }} />;
      })}
    </div>
  );
}

function Juegos({ r }: { r: RegistroJugador }) {
  const j = r.juegos;
  return (
    <div className="space-y-3">
      <Seccion titulo="«¿Quién es sabio?»">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <Dato icono="🎬" valor={fmt(j.sabio.partidas)} nombre="partidas" />
          <Dato icono="🪜" valor={j.sabio.mejor ? String(j.sabio.mejor) : "—"} nombre="mejor grada" />
          <Dato icono="👑" valor={fmt(j.sabio.ganadas)} nombre="ganadas" />
          <Dato icono="✨" valor={fmt(j.sabio.total)} nombre="puntos" />
        </div>
        {j.sabio.ultimas.length ? (
          <ul className="space-y-1" data-testid="registro-partidas">
            {j.sabio.ultimas.map((p, i) => (
              <li key={i} className="flex items-center gap-2 rounded-xl border border-amber-200/80 bg-white/70 px-2.5 py-1.5 dark:border-amber-900/50 dark:bg-black/20">
                <span className="text-base" aria-hidden="true" title={NOMBRE_FIN[p.fin]}>
                  {FIN_ICONO[p.fin]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold">
                    Grada {p.grada} · {fmt(p.puntos)} puntos
                  </span>
                  <span className="block text-[10px] text-stone-500">
                    {NOMBRE_FIN[p.fin]} · {duracion(p.segundos)}
                    {p.fecha ? ` · ${fecha(p.fecha)}` : ""}
                  </span>
                </span>
                <Escalera grada={p.grada} fin={p.fin} />
              </li>
            ))}
          </ul>
        ) : (
          <Vacio>Todavía no se sentó en el estudio de «¿Quién es sabio?».</Vacio>
        )}
      </Seccion>
      <div className="grid grid-cols-3 gap-1.5 text-center">
        <Dato icono="⚔️" valor={`${j.duelos.ganados}/${j.duelos.jugados}`} nombre="duelos ganados" />
        <Dato icono="📜" valor={j.concurso.mejor ? `${j.concurso.mejor.aciertos}/${j.concurso.mejor.de}` : "—"} nombre={`mejor concurso (${j.concurso.semanas} ${j.concurso.semanas === 1 ? "semana" : "semanas"})`} />
        <Dato icono="📞" valor={`${j.consejos.buenos}/${j.consejos.dados}`} nombre="consejos acertados" />
      </div>
    </div>
  );
}

function CasaYBarrio({ r }: { r: RegistroJugador }) {
  const b = r.barrioHecho;
  const nivel = r.casa ? NIVELES_CASA[r.casa.nivel] : null;
  const obras = r.casa ? OBRAS.filter((o) => r.casa!.obras.includes(o.id)) : [];
  const datos: [string, number, string][] = [
    ["🤲", b.ayudas, "ayudas a vecinos"],
    ["📖", b.reuniones, "reuniones en su casa"],
    ["🙋", b.asistencias, "reuniones a las que fue"],
    ["🍞", b.banquetes, "banquetes"],
    ["🎁", b.regalosDados, "regalos dados"],
    ["💌", b.regalosRecibidos, "regalos recibidos"],
    ["🧱", b.piedras, "piedras para el muro"],
    ["🪙", b.arca, "gozo en el arca"],
    ["📜", b.historia, "puntos para la historia"],
    ["✉️", b.recados, "recados cumplidos"],
  ];
  return (
    <div className="space-y-3">
      <Seccion titulo="Su casa">
        {r.casa && nivel ? (
          <div className="rounded-2xl border border-amber-200 bg-white/70 p-3 dark:border-amber-900/60 dark:bg-black/20">
            <p className="flex items-center justify-between gap-2">
              <span className="font-serif text-lg font-black">{nivel.nombre}</span>
              <Estrellas n={r.casa.estrellas} className="text-lg" />
            </p>
            <p className="text-xs text-stone-500">
              ✨ {fmt(r.casa.bendiciones)} {r.casa.bendiciones === 1 ? "bendición" : "bendiciones"} de sus vecinos
            </p>
            {obras.length ? (
              <ul className="mt-1.5 flex flex-wrap gap-1">
                {obras.map((o) => (
                  <li key={o.id} className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                    {o.icono} {o.nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-xs text-stone-500">Todavía no edificó obras en su casa.</p>
            )}
          </div>
        ) : (
          <Vacio>Todavía no tiene casa en la ciudad.</Vacio>
        )}
      </Seccion>
      <Seccion titulo="En su barrio y en la ciudad">
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {datos.map(([icono, n, nombre]) => (
            <div key={nombre} className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 ${n > 0 ? "bg-amber-50 dark:bg-amber-950/30" : "bg-stone-50 opacity-70 dark:bg-stone-900/40"}`}>
              <span className="text-lg" aria-hidden="true">
                {icono}
              </span>
              <span>
                <span className="block text-sm font-black tabular-nums leading-none">{fmt(n)}</span>
                <span className="text-[10px] leading-tight text-stone-500">{nombre}</span>
              </span>
            </div>
          ))}
        </div>
      </Seccion>
    </div>
  );
}

function Logros({ r }: { r: RegistroJugador }) {
  const ganados = r.logros.filter((id): id is LogroId => id in LOGROS_EN_LINEA);
  const completas = r.album.colecciones.filter((c) => c.completa).length;
  return (
    <div className="space-y-3">
      <Seccion titulo="Logros">
        {ganados.length ? (
          <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {ganados.map((id) => (
              <li key={id} className="flex items-center gap-2 rounded-xl bg-amber-50 px-2 py-1.5 dark:bg-amber-950/30">
                <Medalla icono={LOGROS_EN_LINEA[id].icono} metal={3} progreso={1} size={36} titulo={LOGROS_EN_LINEA[id].como} />
                <span className="text-xs font-bold leading-tight">{LOGROS_EN_LINEA[id].nombre}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Vacio>Todavía no ganó logros en línea.</Vacio>
        )}
      </Seccion>
      <Seccion titulo={`Su álbum · ${fmt(r.album.cosas)} cosas · ${completas} ${completas === 1 ? "colección completa" : "colecciones completas"}`}>
        <ul className="space-y-1">
          {r.album.colecciones.map((c) => (
            <li key={c.id} className="flex items-center gap-2 text-xs">
              <span className="w-5 text-center" aria-hidden="true">
                {c.icono}
              </span>
              <span className={`min-w-0 flex-1 truncate ${c.completa ? "font-bold text-emerald-800 dark:text-emerald-300" : ""}`}>
                {c.nombre}
                {c.completa ? " ✓" : ""}
              </span>
              <span className="w-20">
                <Barra valor={c.tiene} de={c.de} color={c.completa ? "bg-emerald-500" : "bg-amber-500"} />
              </span>
              <span className="w-10 text-right tabular-nums text-stone-500">
                {c.tiene}/{c.de}
              </span>
            </li>
          ))}
        </ul>
      </Seccion>
    </div>
  );
}
