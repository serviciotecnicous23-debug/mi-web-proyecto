import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { isAdminRole } from "@/lib/utils";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { DollarSign, Plus, Trash2, FileText } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const COLORS = ["#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"];

const TITHE_TYPES: Record<string, string> = { diezmo: "Diezmo", ofrenda: "Ofrenda", donacion: "Donación", mision: "Misiones" };
const PAYMENT_METHODS: Record<string, string> = { efectivo: "Efectivo", transferencia: "Transferencia", tarjeta: "Tarjeta", paypal: "PayPal", otro: "Otro" };

export default function DiezmosPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [reportYear, setReportYear] = useState(new Date().getFullYear().toString());

  const { data: tithes = [] } = useQuery<any[]>({
    queryKey: ["/api/tithes", selectedMonth],
    enabled: isAdminRole(user?.role),
  });

  const { data: report } = useQuery<any>({
    queryKey: ["/api/tithes/report", reportYear],
    queryFn: () => fetch(`/api/tithes/report?year=${reportYear}`, { credentials: "include" }).then(r => r.json()),
    enabled: isAdminRole(user?.role),
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/tithes", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Error al registrar");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tithes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tithes/report"] });
      toast({ title: "Registro guardado" });
      setOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/tithes/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tithes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tithes/report"] });
    },
  });

  if (!user || !isAdminRole(user.role)) {
    return <Layout><div className="container mx-auto p-6 text-center"><h1 className="text-2xl font-bold text-red-500">Acceso Denegado</h1></div></Layout>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createMutation.mutate({
      donorName: fd.get("donorName"),
      amount: fd.get("amount"),
      currency: fd.get("currency") || "USD",
      type: fd.get("type") || "diezmo",
      method: fd.get("method") || "efectivo",
      regionName: fd.get("regionName") || undefined,
      notes: fd.get("notes") || undefined,
    });
  };

  const byTypeData = report?.byType ? Object.entries(report.byType).map(([key, val]) => ({ name: TITHE_TYPES[key] || key, value: val })) : [];
  const byMethodData = report?.byMethod ? Object.entries(report.byMethod).map(([key, val]) => ({ name: PAYMENT_METHODS[key] || key, value: val })) : [];
  const byRegionData = report?.byRegion ? Object.entries(report.byRegion).map(([key, val]) => ({ name: key, value: val })) : [];

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2"><DollarSign className="h-8 w-8" /> Diezmos y Ofrendas</h1>
            <p className="text-muted-foreground">Gestión financiera del ministerio</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Nuevo Registro</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Registrar Diezmo / Ofrenda</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div><Label>Nombre del donante</Label><Input name="donorName" required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Monto</Label><Input name="amount" type="number" step="0.01" required /></div>
                  <div><Label>Moneda</Label>
                    <Select name="currency" defaultValue="USD">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="VES">VES</SelectItem><SelectItem value="PEN">PEN</SelectItem><SelectItem value="COP">COP</SelectItem><SelectItem value="EUR">EUR</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Tipo</Label>
                    <Select name="type" defaultValue="diezmo">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.entries(TITHE_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Método de pago</Label>
                    <Select name="method" defaultValue="efectivo">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.entries(PAYMENT_METHODS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Región</Label><Input name="regionName" placeholder="Ej: Venezuela, Perú..." /></div>
                <div><Label>Notas</Label><Textarea name="notes" rows={2} /></div>
                <Button type="submit" disabled={createMutation.isPending} className="w-full">Guardar</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary */}
        {report && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">${report.total?.toFixed(2)}</div><div className="text-xs text-muted-foreground">Total {reportYear}</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{report.count}</div><div className="text-xs text-muted-foreground">Total Registros</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-orange-600">${(report.byType?.diezmo || 0).toFixed(2)}</div><div className="text-xs text-muted-foreground">Diezmos</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">${(report.byType?.ofrenda || 0).toFixed(2)}</div><div className="text-xs text-muted-foreground">Ofrendas</div></CardContent></Card>
          </div>
        )}

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {byTypeData.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Por Tipo</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart><Pie data={byTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{byTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
          {byRegionData.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Por Región</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={byRegionData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#f97316" /></BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Table */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Registros Recientes</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="text-left p-2">Fecha</th><th className="text-left p-2">Donante</th><th className="text-left p-2">Tipo</th><th className="text-right p-2">Monto</th><th className="text-left p-2">Método</th><th className="text-left p-2">Región</th><th className="p-2"></th></tr></thead>
                <tbody>
                  {tithes.map((t: any) => (
                    <tr key={t.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{t.createdAt ? format(new Date(t.createdAt), "dd MMM yyyy", { locale: es }) : "-"}</td>
                      <td className="p-2 font-medium">{t.donorName}</td>
                      <td className="p-2"><span className="px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700">{TITHE_TYPES[t.type] || t.type}</span></td>
                      <td className="p-2 text-right font-mono">{t.currency} {parseFloat(t.amount).toFixed(2)}</td>
                      <td className="p-2">{PAYMENT_METHODS[t.method] || t.method}</td>
                      <td className="p-2">{t.regionName || "-"}</td>
                      <td className="p-2"><Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(t.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button></td>
                    </tr>
                  ))}
                  {tithes.length === 0 && <tr><td colSpan={7} className="p-4 text-center text-muted-foreground">No hay registros</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
