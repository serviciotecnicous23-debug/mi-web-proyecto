// El texto de un bloque del cuaderno con su formato: **negrita**, _cursiva_, ++subrayado++, ~~tachado~~, ==resaltado== y las citas bíblicas como
// enlaces. Al tocar una cita se ve el versículo (RV1960) sin salir de la nota, con el botón para abrir el capítulo.
import { Fragment } from "react";
import { BookOpen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { trozosDe } from "@shared/cuaderno";
import { citaVisible, enlaceBiblia, type Cita } from "@shared/citas";
import { useTextoBiblico } from "./api";

export type AlAbrirCita = (c: Cita) => void;

/** El versículo de una cita (RV1960), cargado al abrir la ventanita. */
export function TextoDeCita({ cita }: { cita: Cita }) {
  const q = useTextoBiblico(cita.libro, cita.capitulo);
  if (q.isLoading) return <p className="text-sm text-muted-foreground">Cargando el versículo…</p>;
  const vs = (q.data ?? []).filter((v) => v.verse >= cita.desde && v.verse <= cita.hasta);
  if (!vs.length) return <p className="text-sm text-muted-foreground">No se pudo cargar el versículo.</p>;
  return (
    <p className="text-[15px] leading-7">
      {vs.map((v) => (
        <Fragment key={v.verse}>
          <sup className="text-orange-600 dark:text-orange-300 font-semibold mr-0.5">{v.verse}</sup>
          {v.text}{" "}
        </Fragment>
      ))}
    </p>
  );
}

function EnlaceCita({ texto, cita, alAbrirCita }: { texto: string; cita: Cita; alAbrirCita?: AlAbrirCita }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-orange-700 dark:text-orange-300 underline decoration-dotted underline-offset-2 hover:decoration-solid font-medium"
          onClick={(e) => e.stopPropagation()}
          data-cita={citaVisible(cita)}
        >
          {texto}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <p className="font-semibold text-sm mb-1.5">{citaVisible(cita)} <span className="text-muted-foreground font-normal">· RV1960</span></p>
        <TextoDeCita cita={cita} />
        <div className="mt-2 text-right">
          {alAbrirCita ? (
            <button type="button" className="text-sm text-orange-700 dark:text-orange-300 hover:underline inline-flex items-center gap-1" onClick={() => alAbrirCita(cita)}>
              <BookOpen className="w-3.5 h-3.5" /> Abrir el capítulo
            </button>
          ) : (
            <a href={enlaceBiblia(cita)} className="text-sm text-orange-700 dark:text-orange-300 hover:underline inline-flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Abrir el capítulo
            </a>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

const MARCA: Record<string, string> = {
  amarillo: "bg-yellow-200/80 dark:bg-yellow-500/30",
  verde: "bg-emerald-200/80 dark:bg-emerald-500/30",
  azul: "bg-sky-200/80 dark:bg-sky-500/30",
  rosa: "bg-pink-200/80 dark:bg-pink-500/30",
  naranja: "bg-orange-200/80 dark:bg-orange-500/30",
};
export const fondoDeColor = (c: string | undefined | null) => MARCA[c ?? "amarillo"] ?? MARCA.amarillo;

/** El texto con su formato. Vacío, muestra el texto de ayuda. */
export function TextoCuaderno({ texto, ayuda, alAbrirCita }: { texto: string; ayuda?: string; alAbrirCita?: AlAbrirCita }) {
  if (!texto.trim()) return <span className="text-muted-foreground/70">{ayuda ?? "Escribe aquí…"}</span>;
  return (
    <>
      {trozosDe(texto).map((z, i) => {
        let nodo: React.ReactNode = z.cita ? <EnlaceCita texto={z.t} cita={z.cita} alAbrirCita={alAbrirCita} /> : z.t;
        if (z.resaltado) nodo = <mark className={`${fondoDeColor("amarillo")} rounded px-0.5 text-inherit`}>{nodo}</mark>;
        if (z.tachado) nodo = <s className="decoration-current">{nodo}</s>;
        if (z.subrayado) nodo = <u className="underline-offset-2">{nodo}</u>;
        if (z.cursiva) nodo = <em>{nodo}</em>;
        if (z.negrita) nodo = <strong>{nodo}</strong>;
        return <Fragment key={i}>{nodo}</Fragment>;
      })}
    </>
  );
}
