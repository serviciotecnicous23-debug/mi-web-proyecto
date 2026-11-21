// La ventana para confirmar lo que no se puede deshacer: borrar una iglesia, una región, una publicación, un movimiento de
// Finanzas, rechazar o desactivar. Se usa en el panel de administración y en el resto de la web, con botones grandes para
// el teléfono. `pedir` la abre; `ventana` se pone una vez en la página (o en el componente que tiene los botones).
import { useState, type ReactNode } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/** Lo que se confirma: un título, qué pasa, el texto del botón y la acción. */
export type Confirmacion = { titulo: string; detalle: string; boton: string; accion: () => void };

export function useConfirmar(): { pedir: (c: Confirmacion) => void; ventana: ReactNode } {
  const [c, setC] = useState<Confirmacion | null>(null);
  const ventana = (
    <AlertDialog open={!!c} onOpenChange={(v) => !v && setC(null)}>
      <AlertDialogContent className="w-[calc(100vw-1.5rem)] max-w-md rounded-2xl" data-testid="confirmar-accion">
        <AlertDialogHeader>
          <AlertDialogTitle>{c?.titulo}</AlertDialogTitle>
          <AlertDialogDescription>{c?.detalle}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <AlertDialogCancel className="h-12 mt-0">Cancelar</AlertDialogCancel>
          <AlertDialogAction className="h-12 bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { c?.accion(); setC(null); }} data-testid="confirmar-si">
            {c?.boton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return { pedir: setC, ventana };
}
