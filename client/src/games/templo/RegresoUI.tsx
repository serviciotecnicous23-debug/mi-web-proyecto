/**
 * «Mientras no estabas»: al volver a Jerusalén en línea después de dos días o más, lo que pasó (las fiestas de esos
 * días y si cambió la estación, de shared/anio.ts; lo que hizo tu barrio, lo de tu casa y la ciudad) y el regalo de
 * regreso, que se recibe aquí mismo. Lo cuenta el servidor (server/regreso.ts, reglas en shared/regreso.ts); si no
 * responde, queda lo del calendario con la última visita guardada en este teléfono.
 */
import { useEffect, useState } from "react";
import { diaEnJerusalen, loQuePaso, proximaFiestaGrande, type LoQuePaso } from "@shared/anio";
import { VERSO_BIENVENIDA, VERSO_REGRESO, type RegaloRecibido, type RegresoVista } from "@shared/regreso";
import { Ico } from "./iconos";

const CLAVE = "jerusalen-ultima-visita";
const minuscula = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function leer(k: string): string | null {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}

function nombreEvento(e: LoQuePaso["eventos"][number]): string {
  if (e.evento.id === "reposo") return `${e.dias} ${e.dias === 1 ? "día" : "días"} de reposo`;
  if (e.evento.id === "lunaNueva") return e.dias === 1 ? "la luna nueva" : `${e.dias} lunas nuevas`;
  return `${e.evento.nombre}${e.dias > 1 ? ` (${e.dias} días)` : ""}`;
}

/** «Ana, José y Rut» (y «y 2 más» si hubo más de los que se nombran). */
function enLista(nombres: string[], total = nombres.length): string {
  const n = nombres.filter(Boolean);
  if (!n.length) return "";
  const mas = Math.max(0, total - n.length);
  const partes = mas > 0 ? [...n, `${mas} más`] : n;
  return partes.length === 1 ? partes[0] : `${partes.slice(0, -1).join(", ")} y ${partes[partes.length - 1]}`;
}

const veces = (n: number, una: string, varias: string) => `${n} ${n === 1 ? una : varias}`;

function bienTexto(bien: string, n: number): string {
  if (bien === "harina") return `${n} de flor de harina`;
  if (bien === "aceite") return `${n} de aceite`;
  if (bien === "corderos") return veces(n, "cordero", "corderos");
  return `${n} de ${bien}`;
}

/** Lo que trae el regalo, en una línea. */
function textoRegalo(r: { gozo: number; semillas: { n: number; nombre: string }; prenda: { nombre: string } | null }): string {
  return [`+${r.gozo} ✨ gozo`, `${r.semillas.n} ${r.semillas.nombre}`, r.prenda ? `🥻 ${r.prenda.nombre}` : ""].filter(Boolean).join(" · ");
}

function Bloque({ titulo, items, testid }: { titulo: string; items: (string | null | false)[]; testid: string }) {
  const lista = items.filter((x): x is string => !!x);
  if (!lista.length) return null;
  return (
    <div className="mt-2" data-testid={testid}>
      <p className="text-[11px] font-bold text-sky-200">{titulo}</p>
      <ul className="mt-0.5 space-y-0.5">
        {lista.map((t, i) => (
          <li key={`${i}-${t}`} className="leading-snug">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MientrasNoEstabas({ personajeId }: { personajeId?: number | null }) {
  const k = personajeId ? `${CLAVE}:${personajeId}` : null;
  const [hoy] = useState(() => diaEnJerusalen());
  // lo de este teléfono (por si el servidor no responde): se lee una sola vez al llegar
  const [local] = useState<string | null>(() => {
    if (!k) return null;
    const antes = leer(k);
    return antes && /^\d{4}-\d{2}-\d{2}$/.test(antes) && antes < hoy.iso ? antes : null;
  });
  // undefined: todavía preguntando; null: el servidor no respondió
  const [vista, setVista] = useState<RegresoVista | null | undefined>(undefined);
  const [recibido, setRecibido] = useState<RegaloRecibido | null>(null);
  const [pidiendo, setPidiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!k) return;
    try {
      localStorage.setItem(k, hoy.iso);
    } catch {
      /* sin lugar en el teléfono: no pasa nada */
    }
  }, [k, hoy.iso]);

  useEffect(() => {
    if (!personajeId) return;
    let vivo = true;
    (async () => {
      try {
        const r = await fetch("/api/jerusalen/regreso", { credentials: "include", cache: "no-store" });
        if (!r.ok) throw new Error(String(r.status));
        const v = (await r.json()) as RegresoVista;
        if (vivo) setVista(v);
      } catch {
        if (vivo) setVista(null);
      }
    })();
    return () => {
      vivo = false;
    };
  }, [personajeId]);

  async function recibir() {
    if (pidiendo) return;
    setPidiendo(true);
    setError(null);
    try {
      const r = await fetch("/api/jerusalen/regreso/regalo", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError((j as { message?: string }).message || "No se pudo recibir el regalo. Prueba otra vez.");
        return;
      }
      const g = j as RegaloRecibido;
      setRecibido(g);
      setVista((v) => (v && v.regalo ? { ...v, regalo: { ...v.regalo, ...g, estado: "recibido" } } : v));
    } catch {
      setError("No hay conexión: prueba otra vez en un momento.");
    } finally {
      setPidiendo(false);
    }
  }

  if (!personajeId || vista === undefined) return null;
  // el día que vuelve, o mientras el regalo espera; si el servidor no respondió, lo de este teléfono
  const vuelta = vista?.vuelta ?? null;
  const desde = vista ? (vuelta && (vuelta.hoy || vista.regalo?.estado === "listo") ? vuelta.desde : null) : local;
  if (!desde) return null;
  const r = loQuePaso(desde, vuelta && !vuelta.hoy ? vuelta.dia : hoy.iso);
  const dias = vuelta?.ausencia ?? r.dias;
  if (dias < 2) return null;
  const prox = proximaFiestaGrande();
  const regalo = vista?.regalo ?? null;
  const b = vista?.barrio ?? null;
  const casa = vista?.casa ?? null;
  const ciudad = vista?.ciudad ?? null;

  const itemsBarrio = b
    ? [
        b.vecinosNuevos.total > 0 && `🏠 ${b.vecinosNuevos.total === 1 ? "Llegó un vecino nuevo" : `Llegaron ${b.vecinosNuevos.total} vecinos nuevos`}: ${enLista(b.vecinosNuevos.nombres, b.vecinosNuevos.total)}.`,
        b.charla.mensajes > 0 && `💬 ${veces(b.charla.mensajes, "mensaje", "mensajes")} en la charla del barrio${b.charla.quienes.length ? ` (de ${enLista(b.charla.quienes, b.charla.quienes.length)})` : ""}.`,
        b.reuniones.total > 0 && `📖 ${veces(b.reuniones.total, "reunión", "reuniones")} en las casas${b.reuniones.anfitriones.length ? ` (en la de ${enLista(b.reuniones.anfitriones)})` : ""}.`,
        b.ayudas.veces > 0 && `🤝 Se atendieron pedidos de ayuda ${veces(b.ayudas.veces, "vez", "veces")} (${veces(b.ayudas.cosas, "cosa", "cosas")}).`,
        b.pueblo.cosas > 0 && `🧺 ${b.pueblo.personas === 1 ? "Un vecino dio" : `${b.pueblo.personas} vecinos dieron`} ${veces(b.pueblo.cosas, "cosa", "cosas")} a las familias del pueblo.`,
        b.copa.puesto
          ? `🏆 La copa de la semana: van ${b.copa.puesto}.º de ${b.copa.barrios} con ${b.copa.puntos} puntos${b.copa.ganados ? ` (+${b.copa.ganados} mientras no estabas)` : ""}.`
          : "🏆 En la copa de esta semana tu barrio todavía no suma: cada deber y cada encargo cuentan.",
        b.nivel.subio && `⭐ ¡El barrio subió a «${b.nivel.nombre}»!`,
      ]
    : [];
  const itemsCasa = casa
    ? [
        casa.visitas.total > 0 && `🙏 ${casa.visitas.total === 1 ? "Te visitó y bendijo tu casa" : "Visitaron y bendijeron tu casa"}: ${enLista(casa.visitas.nombres, casa.visitas.total)}.`,
        ...casa.regalos.map((g) => `🎁 ${g.quien} te dio ${bienTexto(g.bien, g.cantidad)} en tu pedido.`),
        casa.huertoListo > 0 && `🌾 Tu huerto tiene ${veces(casa.huertoListo, "surco listo", "surcos listos")} para segar.`,
        casa.ventas > 0 && `🛒 En tu puesto del mercado se ${casa.ventas === 1 ? "vendió 1 cosa" : `vendieron ${casa.ventas} cosas`}.`,
      ]
    : [];
  const itemsCiudad = ciudad
    ? [
        ciudad.piedras
          ? `🧱 La ciudad puso ${ciudad.piedras.toLocaleString("es-419")} piedras en el muro (${
              ciudad.muro.tramos > 0 ? `${ciudad.muro.tramos} de ${ciudad.muro.de} tramos levantados` : "va en el primer tramo"
            }).`
          : ciudad.muro.tramos > 0 && `🧱 El muro: ${ciudad.muro.tramos} de ${ciudad.muro.de} tramos levantados.`,
        ...ciudad.capitulosCumplidos.map((t) => `📜 Se cumplió el capítulo «${t}».`),
        ciudad.capitulo && `${ciudad.capitulo.icono} Esta semana, «${ciudad.capitulo.titulo}»: ${ciudad.capitulo.cumplido ? "¡ya se cumplió!" : `la ciudad lleva el ${ciudad.capitulo.pct} %`}.`,
      ]
    : [];

  return (
    <section className="rounded-xl border border-sky-200/30 bg-sky-400/10 px-3 py-2.5 text-xs text-sky-50" data-testid="mientras-no-estabas">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-200">{vuelta ? "¡De vuelta en Jerusalén!" : "Mientras no estabas"}</p>
      {vuelta && (
        <p className="mt-0.5 italic text-sky-100/80">
          «{VERSO_BIENVENIDA.text}» ({VERSO_BIENVENIDA.ref})
        </p>
      )}
      <p className="mt-1">
        {vuelta && !vuelta.hoy ? `Estuviste ${dias} días fuera` : `Tu última visita fue hace ${dias} días`}
        {r.largo ? " (te contamos lo más reciente)" : ""}. En Jerusalén:
      </p>
      {r.eventos.length ? (
        <ul className="mt-1 flex flex-wrap gap-1">
          {r.eventos.map((e) => (
            <li key={e.evento.id} className="rounded-full bg-white/10 px-2 py-0.5 font-semibold">
              <Ico e={e.evento.icono ?? ""} /> {nombreEvento(e)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-sky-100/80">Fueron días de servicio, sin fiestas.</p>
      )}
      {r.antes.id !== r.ahora.id && (
        <p className="mt-1.5">
          <Ico e={r.ahora.icono ?? ""} /> <b>Empezó {minuscula(r.ahora.nombre)}</b>: {r.ahora.texto}
        </p>
      )}

      {regalo && (
        <div className="mt-2 rounded-lg border border-amber-200/40 bg-amber-300/10 px-2.5 py-2 text-amber-50" data-testid="regreso-regalo">
          <p className="font-black text-amber-200"><Ico e="🎁" /> Tu regalo de regreso</p>
          {!recibido && <p className="mt-0.5">{textoRegalo(regalo)}</p>}
          {regalo.prenda && (
            <p className="mt-0.5 text-[11px] italic text-amber-100/85">
              «{VERSO_REGRESO.text}» ({VERSO_REGRESO.ref})
            </p>
          )}
          {regalo.estado === "listo" && !recibido ? (
            <>
              <button
                type="button"
                onClick={() => void recibir()}
                disabled={pidiendo}
                className="tpl-btn-oro mt-1.5 rounded-full px-3 py-1 text-xs font-black disabled:opacity-60"
                data-testid="regreso-recibir"
              >
                {pidiendo ? "Recibiendo…" : "Recibir el regalo"}
              </button>
              <p className="mt-1 text-[11px] text-amber-100/80">Siembra las semillas en el huerto de tu casa: en esta estación crecen bien.</p>
            </>
          ) : recibido ? (
            <div className="mt-1.5 space-y-1">
              <p
                className="w-fit rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[11px] font-black text-white shadow-lg ring-1 ring-emerald-300/60"
                data-testid="regreso-ganancia"
                role="status"
              >
                {textoRegalo(recibido)}
              </p>
              <p className="text-[11px] text-amber-100/85">
                Ya tienes {recibido.gozoTotal.toLocaleString("es-419")} ✨ de gozo. Las semillas te esperan en tu casa
                {recibido.prenda ? " y ya llevas puesto el mejor vestido: tus vecinos lo ven" : ""}.
              </p>
            </div>
          ) : (
            <p className="mt-1 text-[11px] text-amber-100/80" data-testid="regreso-recibido">
              ✓ Ya lo recibiste.
            </p>
          )}
          {error && (
            <p className="mt-1 text-[11px] font-semibold text-rose-200" role="alert">
              {error}
            </p>
          )}
        </div>
      )}

      {b && <Bloque titulo={`En tu barrio, ${b.nombre}`} items={itemsBarrio} testid="regreso-barrio" />}
      <Bloque titulo="En tu casa" items={itemsCasa} testid="regreso-casa" />
      <Bloque titulo="En la ciudad" items={itemsCiudad} testid="regreso-ciudad" />

      <p className="mt-2 text-sky-100/85">
        Hoy: {hoy.hebreo.texto} · <Ico e={hoy.estacion.icono ?? ""} /> {hoy.estacion.nombre}
        {prox ? ` · ${prox.evento.icono} ${prox.evento.nombre} ${prox.enDias === 1 ? "mañana" : `en ${prox.enDias} días`}` : ""}.
      </p>
      <p className="mt-1 font-semibold text-amber-200">Entra a la ciudad: tu huerto, tus encargos y tu racha te esperan.</p>
    </section>
  );
}
