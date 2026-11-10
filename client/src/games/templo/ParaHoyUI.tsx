/**
 * «Para hoy» (arriba de las Misiones): lo que se puede hacer ahora en Jerusalén en línea, junto, con
 * su botón para ir. Junta lo que ya dicen el concurso, el mercado (huerto y horno), las reuniones,
 * los pedidos del barrio y el muro. En el templo (sin la ciudad) solo se informa.
 */
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
  const [d, setD] = useState<{ concurso: ConcursoEstado | null; mercado: MercadoEstado | null; reuniones: ReunionesEstado | null; ayuda: AyudaEstado | null; muro: MuroEstado | null; tesoro: TesoroEstado | null } | null>(null);
  useEffect(() => {
    let vivo = true;
    void Promise.all([
      traer<ConcursoEstado>("/concurso"),
      traer<MercadoEstado>("/mercado"),
      traer<ReunionesEstado>("/reuniones"),
      traer<AyudaEstado>("/ayuda"),
      traer<MuroEstado>("/muro"),
      traer<TesoroEstado>("/tesoro"),
    ]).then(([concurso, mercado, reuniones, ayuda, muro, tesoro]) => vivo && setD({ concurso, mercado, reuniones, ayuda, muro, tesoro }));
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
  // las reuniones de ahora
  for (const r of (d.reuniones?.activas ?? []).filter((x) => !x.yaFui && x.faltan > 0).slice(0, 2)) {
    lineas.push({
      id: `reunion-${r.id}`,
      icono: "📖",
      texto: `${r.anfitrion} enseña «${r.titulo}» en su casa ahora`,
      boton: city ? { texto: "Ir", hacer: () => (gameStore.close(), city.irACasaDe(r.barrio, r.parcela)) } : undefined,
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
