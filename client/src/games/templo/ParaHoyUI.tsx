/**
 * «Para hoy» (arriba de las Misiones): lo que se puede hacer ahora en Jerusalén en línea, junto, con
 * su botón para ir. Junta lo que ya dicen el concurso, el mercado (huerto y horno), las reuniones,
 * los pedidos del barrio y el muro. En el templo (sin la ciudad) solo se informa.
 */
import { personajeCiudad, type RecadoEstado } from "@shared/personajes";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONCURSO_PREGUNTAS, type ConcursoEstado } from "@shared/concurso";
import type { MercadoEstado } from "@shared/mercado";
import type { ReunionesEstado } from "@shared/reuniones";
import type { AyudaEstado } from "@shared/ayuda";
import type { MuroEstado } from "@shared/muro";
import type { TesoroEstado } from "@shared/economia";
import type { MisionesEstado } from "@shared/misiones";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { lineasDeRacha } from "./RachaUI";
import { diaEnJerusalen, mananaEnJerusalen } from "@shared/anio";
import type { RachaVista } from "@shared/racha";
import { arcoDeTemporada, fechaEnPalabras, horaEnPalabras, type CapitulosVista } from "@shared/capitulos";
import { OBRAS, costoDeObra, obra, type ObrasEstado } from "@shared/obras";
import type { BanquetesEstado } from "@shared/banquete";
import type { RegalosEstado } from "@shared/regalos";
import { obraBarrio, type ObrasBarrioEstado } from "@shared/barrio-obras";

async function traer<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, { credentials: "include", cache: "no-store" });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

type Linea = { id: string; icono: string; texto: string; boton?: { texto: string; hacer: () => void } };

export function ParaHoy({ misiones }: { misiones: MisionesEstado }) {
  const { city } = useContext(CiudadCtx);
  const [d, setD] = useState<{ concurso: ConcursoEstado | null; mercado: MercadoEstado | null; reuniones: ReunionesEstado | null; ayuda: AyudaEstado | null; muro: MuroEstado | null; tesoro: TesoroEstado | null; recado: { estado: RecadoEstado } | null; racha: RachaVista | null; capitulos: CapitulosVista | null; obras: ObrasEstado | null; banquetes: BanquetesEstado | null; regalos: RegalosEstado | null; barrioObras: ObrasBarrioEstado | null } | null>(null);
  useEffect(() => {
    let vivo = true;
    void Promise.all([
      traer<ConcursoEstado>("/concurso"),
      traer<MercadoEstado>("/mercado"),
      traer<ReunionesEstado>("/reuniones"),
      traer<AyudaEstado>("/ayuda"),
      traer<MuroEstado>("/muro"),
      traer<TesoroEstado>("/tesoro"),
      traer<{ estado: RecadoEstado }>("/recado"),
      traer<RachaVista>("/racha"),
      traer<{ vista: CapitulosVista | null }>("/capitulos"),
      traer<ObrasEstado>("/casa/obras"),
      traer<BanquetesEstado>("/banquetes"),
      traer<RegalosEstado>("/regalos"),
      traer<ObrasBarrioEstado>("/barrio/obras"),
    ]).then(([concurso, mercado, reuniones, ayuda, muro, tesoro, recado, racha, capitulos, obras, banquetes, regalos, barrioObras]) => {
      if (!vivo) return;
      setD({ concurso, mercado, reuniones, ayuda, muro, tesoro, recado, racha, capitulos: capitulos?.vista ?? null, obras, banquetes, regalos, barrioObras });
      // si terminó una obra, la ciudad la dibuja ya (la ven los vecinos)
      if (obras?.terminada) city?.alObras(obras.hechas, obras.estrellas.estrellas, obras.gozo);
    });
    return () => {
      vivo = false;
    };
  }, []);
  if (!d) return null;
  const abrir = (m: Parameters<typeof gameStore.push>[0]) => {
    gameStore.close();
    gameStore.push(m);
  };
  const lineas: Linea[] = [];
  // la racha de servicio va primero: es lo que se pierde si no se sirve hoy
  if (d.racha) lineas.push(...lineasDeRacha(d.racha).filter((l) => l.id === "racha"));
  // el año de Jerusalén (shared/anio.ts): lo que se celebra hoy y la estación (con la lluvia)
  {
    const dj = diaEnJerusalen();
    const verCalendario = { texto: "Ver", hacer: () => abrir({ kind: "calendario" }) };
    for (const a of dj.eventos.slice(0, 2)) {
      const h = a.evento.hora;
      lineas.push({ id: `evento-${a.evento.id}`, icono: a.evento.icono, texto: `Hoy: ${a.evento.corto}${a.de > 1 ? ` (día ${a.dia} de ${a.de})` : ""}${h ? ` · ${h.titulo}, de ${h.desde - 12} a ${h.hasta - 12} de la noche: ×${h.merito.toLocaleString("es-419")}` : ""}`, boton: verCalendario });
    }
    const semilla = dj.estacion.cultivo ? { trigo: "el trigo", cebada: "la cebada", olivo: "los olivos" }[dj.estacion.cultivo] : null;
    lineas.push({
      id: "estacion",
      icono: dj.llueve ? "🌧️" : dj.estacion.icono,
      texto: `${dj.hebreo.texto}: ${dj.estacion.nombre.charAt(0).toLowerCase()}${dj.estacion.nombre.slice(1)}${dj.llueve ? ". Hoy llueve: lo que siembres hoy queda regado" : mananaEnJerusalen(dj).llueve ? ". Mañana llueve: lo que siembres mañana quedará regado" : ""}${semilla ? `. Crece más rápido ${semilla}` : ""}.`,
      boton: { texto: "Calendario", hacer: () => abrir({ kind: "calendario" }) },
    });
  }
  // la historia de la temporada: la fiesta final (se anuncia desde el capítulo 3) y la meta de la ciudad de esta semana
  const hv = d.capitulos;
  const arco = hv ? arcoDeTemporada(hv.temporada) : null;
  if (hv && arco) {
    const f = hv.fiesta;
    const irPlaza = city ? { texto: "Ir", hacer: () => (gameStore.close(), city.irA("plaza")) } : { texto: "Ver", hacer: () => abrir({ kind: "capitulos" }) };
    if (f.momento === "vivo" && !f.yo.enVivo) lineas.push({ id: "fiesta", icono: "🎺", texto: `¡Es la gran alabanza de ${arco.fiesta.titulo.toLowerCase()}! Ve a la plaza y da gracias (+${arco.fiesta.premio.vivo} de gozo más)`, boton: irPlaza });
    else if (f.momento === "fiesta" && !f.yo.fui) lineas.push({ id: "fiesta", icono: "🎺", texto: `¡Hoy es ${arco.fiesta.titulo.toLowerCase()}! Ve a la plaza y da gracias con toda la ciudad`, boton: irPlaza });
    else if ((f.momento === "fiesta" || f.momento === "vivo") && f.yo.fui)
      lineas.push({ id: "fiesta", icono: "🎺", texto: `Diste gracias en la fiesta ✓ ${f.momento === "fiesta" && !f.yo.enVivo ? `La gran alabanza: el ${fechaEnPalabras(f.vivo.dia)} a las ${horaEnPalabras(f.vivo.desde)} (hora de Texas)` : `Ya ${f.participantes === 1 ? "dio gracias 1 vecino" : `dieron gracias ${f.participantes} vecinos`}`}` });
    else if (f.momento === "antes" && (hv.hoy?.n ?? 0) >= 3)
      lineas.push({ id: "fiesta", icono: "🎺", texto: `Del ${fechaEnPalabras(f.desde)} al ${fechaEnPalabras(f.hasta)}: ${arco.fiesta.titulo.toLowerCase()} en la plaza, con toda la ciudad`, boton: { texto: "Ver", hacer: () => abrir({ kind: "capitulos" }) } });
    const cv = hv.hoy ? hv.capitulos.find((c) => c.n === hv.hoy!.n) : null;
    const cap = cv ? arco.capitulos.find((c) => c.n === cv.n) : null;
    if (cv && cap) {
      const cuenta = cv.meta !== null ? `${cv.puntos.toLocaleString("es")} de ${cv.meta.toLocaleString("es")} ${cap.unidad[1]}` : `0 ${cap.unidad[1]}`;
      lineas.push({
        id: "capitulo",
        icono: cap.icono,
        texto: cv.cumplido
          ? `Capítulo ${cap.n} de ${arco.capitulos.length}, «${cap.titulo}»: ¡la ciudad cumplió! (${cuenta}; tú: ${cv.mios}${cv.premiado ? ", premio recibido ✓" : ""})`
          : `Capítulo ${cap.n} de ${arco.capitulos.length}, «${cap.titulo}»: la ciudad lleva ${cuenta} (tú: ${cv.mios}). ${hv.hoy!.diasRestantes === 1 ? "¡Último día!" : `Quedan ${hv.hoy!.diasRestantes} días.`}`,
        boton: { texto: "Ver", hacer: () => abrir({ kind: "capitulos" }) },
      });
    }
  }
  const hechos = misiones.encargos.filter((e) => e.hecho).length;
  if (hechos < misiones.encargos.length) lineas.push({ id: "encargos", icono: "🎯", texto: `Encargos de hoy: ${hechos} de ${misiones.encargos.length} (abajo los ves)` });
  // el concurso de la semana
  const c = d.concurso;
  if (c && !c.mio) lineas.push({ id: "concurso", icono: "🏅", texto: "El concurso bíblico de esta semana te espera", boton: { texto: "Hacerlo", hacer: () => abrir({ kind: "concurso" }) } });
  else if (c?.mio && !c.mio.terminado) lineas.push({ id: "concurso", icono: "🏅", texto: `Sigue tu concurso: vas en la pregunta ${c.mio.respondidas + 1} de ${CONCURSO_PREGUNTAS}`, boton: { texto: "Seguir", hacer: () => abrir({ kind: "concurso" }) } });
  // el huerto y el horno (en tu casa)
  const m = d.mercado;
  const irCasa = city ? { texto: "Ir a tu casa", hacer: () => abrir({ kind: "casa" }) } : undefined;
  if (m) {
    const listas = m.huerto.filter((p) => p.listo).length;
    const vacias = m.huerto.filter((p) => !p.semilla).length;
    const semillas = Object.values(m.semillas).reduce((a, b) => a + b, 0);
    if (listas) lineas.push({ id: "huerto", icono: "🌾", texto: `${listas === 1 ? "Una parcela de tu huerto está lista" : `${listas} parcelas de tu huerto están listas`} para cosechar`, boton: irCasa });
    else if (vacias && semillas) lineas.push({ id: "huerto", icono: "🌱", texto: "Tienes semillas y parcelas vacías: siembra en tu huerto", boton: irCasa });
    if (m.horno && m.horno.faltan <= 0) lineas.push({ id: "horno", icono: "🫓", texto: "Tu horno está listo: saca lo preparado", boton: irCasa });
    else if (m.preparadas.tortas + m.preparadas.aceitePuro > 0) lineas.push({ id: "horno", icono: "🫓", texto: "Tienes ofrendas preparadas para llevar al templo", boton: irCasa });
  }
  // las obras de tu casa (shared/obras.ts): la que se está haciendo o la que ya alcanza con tu gozo
  const o = d.obras;
  if (o) {
    const irObras = { texto: "Ver", hacer: () => abrir({ kind: "casa", pestana: "obras" }) };
    const enObra = o.curso ? obra(o.curso.id) : null;
    if (o.terminada) {
      const t = obra(o.terminada);
      if (t) lineas.push({ id: "obra", icono: t.icono, texto: `¡Terminaron tu obra: ${t.nombre.toLowerCase()}! Tus vecinos ya la ven`, boton: irObras });
    } else if (enObra && o.curso) {
      const min = Math.ceil(o.curso.faltan / 60);
      lineas.push({ id: "obra", icono: "🔨", texto: `Los obreros trabajan en ${enObra.nombre.toLowerCase()}: ${min >= 60 ? `faltan ${Math.floor(min / 60)} h ${min % 60} min` : `faltan ${min} min`}`, boton: irObras });
    } else {
      const alcanza = OBRAS.find((x) => {
        const v = o.obras.find((y) => y.id === x.id);
        const c = costoDeObra(x);
        return v?.estado === "se-puede" && o.gozo >= c.gozo && o.harina >= c.harina && o.aceite >= c.aceite;
      });
      if (alcanza) lineas.push({ id: "obra", icono: "🧱", texto: `Con tu gozo ya puedes edificar en tu casa: ${alcanza.icono} ${alcanza.nombre.toLowerCase()} (${alcanza.gozo})`, boton: irObras });
    }
  }
  // los banquetes de ahora en mi barrio (shared/banquete.ts) y el mío
  const bq = d.banquetes;
  if (bq?.mio && bq.mio.faltan > 0) {
    lineas.push({ id: "banquete-mio", icono: "🍞", texto: `Tu banquete está abierto: ${bq.mio.invitados} ${bq.mio.invitados === 1 ? "vecino se sentó" : "vecinos se sentaron"} a tu mesa`, boton: city ? { texto: "Ver", hacer: () => abrir({ kind: "casa", pestana: "vecinos" }) } : undefined });
  }
  for (const b of (bq?.activos ?? []).filter((x) => !x.mio && !x.sentado && x.faltan > 0 && x.barrio === d.barrioObras?.barrio).slice(0, 2)) {
    lineas.push({
      id: `banquete-${b.id}`,
      icono: "🍞",
      texto: `${b.anfitrion} tiene un banquete en su casa: siéntate a su mesa (+2 de gozo)`,
      boton: city ? { texto: "Ir", hacer: () => (gameStore.close(), city.irACasaDe(b.barrio, b.parcela)) } : undefined,
    });
  }
  // los regalos nuevos (shared/regalos.ts)
  if (d.regalos?.nuevos) {
    const n = d.regalos.nuevos;
    lineas.push({ id: "regalos", icono: "🎁", texto: n === 1 ? `${d.regalos.recibidos.find((g) => g.nuevo)?.de ?? "Un vecino"} te mandó un regalo` : `Te mandaron ${n} regalos`, boton: { texto: "Ver", hacer: () => abrir({ kind: "casa", pestana: "vecinos" }) } });
  }
  // la obra del barrio de ahora (shared/barrio-obras.ts)
  const ob = d.barrioObras?.actual ? obraBarrio(d.barrioObras.actual.id) : null;
  if (ob && d.barrioObras?.actual) {
    const a = d.barrioObras.actual;
    lineas.push({ id: "obra-barrio", icono: ob.icono, texto: `La obra del barrio: ${ob.nombre.toLowerCase()}, ${a.aportado} de ${a.meta} de gozo entre todos`, boton: { texto: "Dar", hacer: () => abrir({ kind: "barrio", pestana: "obras" }) } });
  }
  // las reuniones de ahora
  for (const r of (d.reuniones?.activas ?? []).filter((x) => !x.yaFui && x.faltan > 0).slice(0, 2)) {
    lineas.push({
      id: `reunion-${r.id}`,
      icono: "📖",
      texto: `${r.anfitrion} enseña «${r.titulo}» en su casa ahora`,
      boton: city ? { texto: "Ir", hacer: () => (gameStore.close(), city.irACasaDe(r.barrio, r.parcela)) } : undefined,
    });
  }
  // el recado del día en la calle de los siervos
  const rc = d.recado?.estado;
  if (rc && !rc.hecho) {
    const toca = personajeCiudad(rc.recado.cadena[rc.paso]);
    if (toca)
      lineas.push({
        id: "recado",
        icono: "📜",
        texto: rc.paso === 0 ? `${toca.nombre} tiene un recado para ti: «${rc.recado.titulo}»` : `Lleva ${rc.recado.lleva[rc.paso - 1]} a ${toca.nombre} (paso ${rc.paso + 1} de 3)`,
        boton: city
          ? {
              texto: "Ir",
              hacer: () => {
                gameStore.close();
                setTimeout(() => city.irAPersonaje(toca.id), 60);
              },
            }
          : undefined,
      });
  }
  // los pedidos del barrio
  const pedidos = d.ayuda?.pedidos.length ?? 0;
  if (pedidos) lineas.push({ id: "ayuda", icono: "🤲", texto: `${pedidos === 1 ? "Un vecino pide" : `${pedidos} vecinos piden`} ayuda para su ofrenda`, boton: city ? { texto: "Ver", hacer: () => abrir({ kind: "anuncios" }) } : undefined });
  // la provisión del tesoro (para los que empiezan)
  if (d.tesoro?.provision.puede) lineas.push({ id: "provision", icono: "🏛️", texto: `El tesoro del templo tiene tu provisión de hoy: +${d.tesoro.provision.gozo} de gozo`, boton: { texto: "Recibir", hacer: () => abrir({ kind: "tesoro" }) } });
  // el muro de todos
  const w = d.muro;
  if (w && w.construidos < w.tramos) lineas.push({ id: "muro", icono: "🧱", texto: `El muro caído: tramo ${w.construidos + 1} de ${w.tramos}, ${w.progreso} de ${w.meta} piedras (tus piedras: ${w.mias}). Cada deber pone una.` });
  // y lo que espera mañana
  if (d.racha) lineas.push(...lineasDeRacha(d.racha).filter((l) => l.id === "manana"));
  if (!lineas.length) return null;
  return (
    <section className="space-y-1.5 rounded-xl border border-amber-300 bg-amber-50/60 p-3 dark:border-amber-800 dark:bg-amber-950/20" data-testid="para-hoy">
      <p className="font-black">Para hoy en Jerusalén</p>
      <ul className="space-y-1">
        {lineas.map((l) => (
          <li key={l.id} className="flex items-center gap-2 text-[13px]" data-testid={`para-hoy-${l.id}`}>
            <span className="w-5 shrink-0 text-center">{l.icono}</span>
            <span className="min-w-0 flex-1">{l.texto}</span>
            {l.boton && (
              <Button size="sm" variant="secondary" className="h-7 shrink-0" onClick={l.boton.hacer}>
                {l.boton.texto}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
