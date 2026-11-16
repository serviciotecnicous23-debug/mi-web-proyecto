/**
 * El selector de rol de una cuenta en el panel de administración: los roles agrupados (administración, enseñanza,
 * iglesias aliadas y comunidad), lo que puede hacer el rol elegido y una confirmación antes de dar acceso de
 * administración, que es lo más delicado (shared/roles.ts).
 */
import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GRUPOS_DE_ROLES, ROLES, ROLES_ADMIN_WEB, detalleDeRol, type RolId } from "@shared/roles";

type Cuenta = { id: number; role: string; displayName?: string | null; username: string };

export function SelectorDeRol({ usuario, alCambiar }: { usuario: Cuenta; alCambiar: (role: string) => void }) {
  const [pendiente, setPendiente] = useState<RolId | null>(null);
  const nombre = usuario.displayName || usuario.username;
  const elegir = (role: string) => {
    if (role === usuario.role) return;
    if ((ROLES_ADMIN_WEB as readonly string[]).includes(role)) setPendiente(role as RolId);
    else alCambiar(role);
  };
  return (
    <div className="space-y-1 max-w-[230px]">
      <Select value={usuario.role} onValueChange={elegir}>
        <SelectTrigger className="w-[220px]" data-testid={`select-role-${usuario.id}`} aria-label={`Rol de ${nombre}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {GRUPOS_DE_ROLES.map((g) => (
            <SelectGroup key={g.nombre}>
              <SelectLabel className="text-[11px] uppercase tracking-wide text-muted-foreground">{g.nombre}</SelectLabel>
              {g.roles.map((r) => (
                <SelectItem key={r.id} value={r.id}>{ROLES[r.id]}</SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      <p className="text-[11px] leading-snug text-muted-foreground" data-testid={`role-detalle-${usuario.id}`}>{detalleDeRol(usuario.role)}</p>
      <AlertDialog open={!!pendiente} onOpenChange={(abierto) => !abierto && setPendiente(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-600" /> ¿Darle a {nombre} el rol «{pendiente ? ROLES[pendiente] : ""}»?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendiente ? detalleDeRol(pendiente) : ""} Dale este rol solo a personas de toda confianza.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendiente) alCambiar(pendiente);
                setPendiente(null);
              }}
              data-testid="confirmar-rol"
            >
              Sí, darle el rol
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
