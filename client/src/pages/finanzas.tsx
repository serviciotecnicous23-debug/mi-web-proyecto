import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { isAdminRole } from "@/lib/utils";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area,
} from "recharts";
import {
  DollarSign, Plus, Trash2, FileText, TrendingUp, TrendingDown,
  Heart, HandCoins, Wallet, ArrowUpRight, ArrowDownRight,
  Calculator, PiggyBank, CreditCard, Banknote, ChevronRight,
  BarChart3, Receipt, Download, Shield, CheckCircle2, Loader2, Lock,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const COLORS = ["#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f43f5e"];

const TITHE_TYPES: Record<string, string> = { diezmo: "Diezmo", ofrenda: "Ofrenda", donacion: "Donación", mision: "Misiones" };
const PAYMENT_METHODS: Record<string, string> = { efectivo: "Efectivo", transferencia: "Transferencia", tarjeta: "Tarjeta", paypal: "PayPal", otro: "Otro" };

// ===== PUBLIC DONATION SECTION =====
export function PublicDonationSection() {
  const { toast } = useToast();
  const [donateOpen, setDonateOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);

  // Check Stripe availability
  const { data: stripeConfig } = useQuery<{ enabled: boolean; publishableKey: string | null }>({
    queryKey: ["/api/stripe/config"],
  });

  const stripeEnabled = stripeConfig?.enabled || false;

  // Check URL params for payment result
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setPaymentSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["/api/tithes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tithes/report"] });
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("payment") === "cancelled") {
      setPaymentCancelled(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Stripe Checkout mutation
  const stripeMutation = useMutation({
    mutationFn: async (data: { donorName: string; email: string; amount: number; currency: string }) => {
      const res = await fetch("/api/donations/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error al iniciar el pago");
      }
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // Manual donation mutation (fallback)
  const manualMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/donations/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al procesar la donación");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "¡Gracias por tu generosidad!", description: "Tu donación ha sido registrada exitosamente." });
      setDonateOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/tithes"] });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo procesar. Intenta de nuevo.", variant: "destructive" });
    },
  });

  const handleStripeDonate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const amount = parseFloat(fd.get("amount") as string);
    if (!amount || amount < 1) {
      toast({ title: "Monto inválido", description: "El monto mínimo es $1.00", variant: "destructive" });
      return;
    }
    stripeMutation.mutate({
      donorName: fd.get("donorName") as string,
      email: fd.get("email") as string,
      amount,
      currency: (fd.get("currency") as string) || "usd",
    });
  };

  const handleManualDonate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    manualMutation.mutate({
      donorName: fd.get("donorName"),
      amount: fd.get("amount"),
      currency: fd.get("currency") || "USD",
      method: fd.get("method") || "transferencia",
      email: fd.get("email") || null,
      notes: fd.get("notes") || null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Payment success message */}
      {paymentSuccess && (
        <Card className="border-green-300 bg-green-50 dark:bg-green-950/30">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
            <div>
              <p className="font-semibold text-green-800 dark:text-green-200">¡Pago exitoso!</p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Tu donación ha sido procesada correctamente. ¡Gracias por tu generosidad!
              </p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setPaymentSuccess(false)}>✕</Button>
          </CardContent>
        </Card>
      )}

      {paymentCancelled && (
        <Card className="border-orange-300 bg-orange-50 dark:bg-orange-950/30">
          <CardContent className="p-4 flex items-center gap-3">
            <Heart className="h-6 w-6 text-orange-600 shrink-0" />
            <div>
              <p className="font-semibold text-orange-800 dark:text-orange-200">Pago cancelado</p>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                El pago fue cancelado. Puedes intentar de nuevo cuando lo desees.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setPaymentCancelled(false)}>✕</Button>
          </CardContent>
        </Card>
      )}

      {/* Ministry info */}
      <Card className="border-orange-200 bg-linear-to-br from-orange-50/50 to-amber-50/30 dark:from-orange-950/20 dark:to-amber-950/10">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-orange-500" /> Finanzas del Ministerio
          </CardTitle>
          <CardDescription>
            Apoyamos la obra de Dios a través de la transparencia y la buena administración de los recursos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {stripeEnabled && (
              <Card className="bg-white/60 dark:bg-card/60 border-blue-200/50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-blue-600" /> Tarjeta de Crédito / Débito
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Paga de forma segura con tu tarjeta a través de Stripe.
                    Acepta Visa, MasterCard, American Express y más.
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Lock className="h-3 w-3 text-green-600" />
                    <span className="text-[10px] text-green-700">Pago 100% seguro con encriptación</span>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card className="bg-white/60 dark:bg-card/60">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm flex items-center gap-2 mb-2">
                  <Banknote className="h-4 w-4 text-green-600" /> Transferencia Bancaria
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  También puedes realizar una transferencia directa.
                  Contacta al equipo administrativo para los datos bancarios.
                </p>
              </CardContent>
            </Card>
            {!stripeEnabled && (
              <Card className="bg-white/60 dark:bg-card/60">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-blue-600" /> Otros Métodos
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    PayPal y otros métodos digitales disponibles.
                    Todas las transacciones son seguras y confidenciales.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Donation button */}
          <div className="text-center pt-2">
            <Dialog open={donateOpen} onOpenChange={setDonateOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 gap-2"
                >
                  <Heart className="h-3.5 w-3.5" /> Apoyar el ministerio
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <HandCoins className="h-5 w-5 text-orange-500" /> Donar al Ministerio
                  </DialogTitle>
                  <DialogDescription>
                    Tu aporte ayuda a sostener la obra. Todas las donaciones son voluntarias y seguras.
                  </DialogDescription>
                </DialogHeader>

                {stripeEnabled ? (
                  /* ===== STRIPE CHECKOUT FORM ===== */
                  <form onSubmit={handleStripeDonate} className="space-y-3">
                    <div>
                      <Label>Tu nombre</Label>
                      <Input name="donorName" required placeholder="Nombre completo" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input name="email" type="email" required placeholder="correo@ejemplo.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Monto</Label>
                        <Input name="amount" type="number" step="0.01" min="1" required placeholder="0.00" />
                      </div>
                      <div>
                        <Label>Moneda</Label>
                        <Select name="currency" defaultValue="usd">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Quick amount buttons */}
                    <div className="flex gap-2 justify-center">
                      {[5, 10, 25, 50, 100].map((amt) => (
                        <Button
                          key={amt}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            const form = (e.target as HTMLElement).closest("form");
                            const input = form?.querySelector('input[name="amount"]') as HTMLInputElement;
                            if (input) input.value = amt.toString();
                          }}
                        >
                          ${amt}
                        </Button>
                      ))}
                    </div>

                    <Button
                      type="submit"
                      disabled={stripeMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                    >
                      {stripeMutation.isPending ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Redirigiendo a pago seguro...</>
                      ) : (
                        <><Shield className="h-4 w-4" /> Pagar con Tarjeta (Stripe)</>
                      )}
                    </Button>
                    <div className="flex items-center gap-2 justify-center text-[10px] text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Pago seguro procesado por Stripe. No almacenamos datos de tu tarjeta.</span>
                    </div>
                  </form>
                ) : (
                  /* ===== MANUAL DONATION FORM (fallback when Stripe not configured) ===== */
                  <form onSubmit={handleManualDonate} className="space-y-3">
                    <div>
                      <Label>Tu nombre</Label>
                      <Input name="donorName" required placeholder="Nombre completo" />
                    </div>
                    <div>
                      <Label>Email (opcional)</Label>
                      <Input name="email" type="email" placeholder="correo@ejemplo.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Monto</Label>
                        <Input name="amount" type="number" step="0.01" min="1" required placeholder="0.00" />
                      </div>
                      <div>
                        <Label>Moneda</Label>
                        <Select name="currency" defaultValue="USD">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="VES">VES</SelectItem>
                            <SelectItem value="PEN">PEN</SelectItem>
                            <SelectItem value="COP">COP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Método de pago</Label>
                      <Select name="method" defaultValue="transferencia">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Nota (opcional)</Label>
                      <Textarea name="notes" rows={2} placeholder="Mensaje o referencia de pago..." />
                    </div>
                    <Button type="submit" disabled={manualMutation.isPending} className="w-full bg-orange-600 hover:bg-orange-700">
                      {manualMutation.isPending ? "Procesando..." : "Confirmar Donación"}
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center">
                      Al enviar, confirmas que esta donación es voluntaria.
                    </p>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ===== ADMIN FINANCIAL DASHBOARD =====
function AdminFinanceDashboard() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [reportYear, setReportYear] = useState(new Date().getFullYear().toString());
  const [activeTab, setActiveTab] = useState("resumen");

  const { data: tithes = [] } = useQuery<any[]>({
    queryKey: ["/api/tithes"],
  });

  const { data: report } = useQuery<any>({
    queryKey: ["/api/tithes/report", reportYear],
    queryFn: () => fetch(`/api/tithes/report?year=${reportYear}`, { credentials: "include" }).then(r => r.json()),
  });

  const { data: budgetSummary } = useQuery<any>({
    queryKey: ["/api/finance/budget-summary", reportYear],
    queryFn: () => fetch(`/api/finance/budget-summary?year=${reportYear}`, { credentials: "include" }).then(r => r.json()),
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
      queryClient.invalidateQueries({ queryKey: ["/api/finance/budget-summary"] });
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
      queryClient.invalidateQueries({ queryKey: ["/api/finance/budget-summary"] });
    },
  });

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

  const handleExportCSV = () => {
    if (!tithes.length) return;
    const headers = ["Fecha", "Donante", "Tipo", "Monto", "Moneda", "Método", "Región", "Notas"];
    const rows = tithes.map((t: any) => [
      t.createdAt ? format(new Date(t.createdAt), "yyyy-MM-dd") : "",
      t.donorName, TITHE_TYPES[t.type] || t.type, t.amount, t.currency,
      PAYMENT_METHODS[t.method] || t.method, t.regionName || "", t.notes || "",
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `finanzas_${reportYear}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const byTypeData = report?.byType ? Object.entries(report.byType).map(([key, val]) => ({ name: TITHE_TYPES[key] || key, value: val })) : [];
  const byMethodData = report?.byMethod ? Object.entries(report.byMethod).map(([key, val]) => ({ name: PAYMENT_METHODS[key] || key, value: val })) : [];
  const byRegionData = report?.byRegion ? Object.entries(report.byRegion).map(([key, val]) => ({ name: key, value: val })) : [];
  const monthlyData = budgetSummary?.monthly || [];

  // Calculate trends
  const lastMonth = monthlyData.length > 0 ? monthlyData[monthlyData.length - 1]?.total || 0 : 0;
  const prevMonth = monthlyData.length > 1 ? monthlyData[monthlyData.length - 2]?.total || 0 : 0;
  const trend = prevMonth > 0 ? ((lastMonth - prevMonth) / prevMonth) * 100 : 0;

  // Count by type
  const donationCount = tithes.filter((t: any) => t.type === "donacion").length;
  const titheCount = tithes.filter((t: any) => t.type === "diezmo").length;
  const offeringCount = tithes.filter((t: any) => t.type === "ofrenda").length;
  const missionCount = tithes.filter((t: any) => t.type === "mision").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Select value={reportYear} onValueChange={setReportYear}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2025, 2026].map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={handleExportCSV} variant="outline" size="sm" className="gap-1">
            <Download className="h-3.5 w-3.5" /> CSV
          </Button>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4" /> Nuevo Registro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Registrar Ingreso Financiero</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div><Label>Nombre del donante</Label><Input name="donorName" required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Monto</Label><Input name="amount" type="number" step="0.01" required /></div>
                <div><Label>Moneda</Label>
                  <Select name="currency" defaultValue="USD">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="VES">VES</SelectItem>
                      <SelectItem value="PEN">PEN</SelectItem>
                      <SelectItem value="COP">COP</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
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
              <Button type="submit" disabled={createMutation.isPending} className="w-full bg-orange-600 hover:bg-orange-700">
                Guardar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="analisis">Análisis</TabsTrigger>
          <TabsTrigger value="presupuesto">Presupuesto</TabsTrigger>
          <TabsTrigger value="registros">Registros</TabsTrigger>
        </TabsList>

        {/* ===== RESUMEN TAB ===== */}
        <TabsContent value="resumen" className="space-y-4">
          {report && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <Wallet className="h-5 w-5 text-green-600" />
                    {trend !== 0 && (
                      <span className={`text-xs flex items-center ${trend > 0 ? "text-green-600" : "text-red-500"}`}>
                        {trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(trend).toFixed(1)}%
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-green-700">${report.total?.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Total {reportYear}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Receipt className="h-5 w-5 text-blue-500 mb-1" />
                  <div className="text-2xl font-bold">{report.count}</div>
                  <p className="text-xs text-muted-foreground">Total Registros</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Calculator className="h-5 w-5 text-orange-500 mb-1" />
                  <div className="text-2xl font-bold text-orange-600">
                    ${budgetSummary?.avgMonthly?.toFixed(2) || "0.00"}
                  </div>
                  <p className="text-xs text-muted-foreground">Promedio Mensual</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Heart className="h-5 w-5 text-pink-500 mb-1" />
                  <div className="text-2xl font-bold text-pink-600">{donationCount}</div>
                  <p className="text-xs text-muted-foreground">Donaciones Recibidas</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Type breakdown mini cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <div>
                <p className="text-xs font-medium">{titheCount} Diezmos</p>
                <p className="text-xs text-muted-foreground">${(report?.byType?.diezmo || 0).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200/50">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div>
                <p className="text-xs font-medium">{offeringCount} Ofrendas</p>
                <p className="text-xs text-muted-foreground">${(report?.byType?.ofrenda || 0).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div>
                <p className="text-xs font-medium">{donationCount} Donaciones</p>
                <p className="text-xs text-muted-foreground">${(report?.byType?.donacion || 0).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div>
                <p className="text-xs font-medium">{missionCount} Misiones</p>
                <p className="text-xs text-muted-foreground">${(report?.byType?.mision || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Quick charts */}
          <div className="grid md:grid-cols-2 gap-4">
            {byTypeData.length > 0 && (
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Distribución por Tipo</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={byTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={40} label>
                        {byTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
            {monthlyData.length > 0 && (
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Ingresos Mensuales</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                      <Area type="monotone" dataKey="total" stroke="#f97316" fill="#f97316" fillOpacity={0.2} name="Ingresos" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* ===== ANÁLISIS TAB ===== */}
        <TabsContent value="analisis" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {byMethodData.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Por Método de Pago</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={byMethodData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {byMethodData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
            {byRegionData.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Por Región</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={byRegionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                      <Bar dataKey="value" fill="#f97316" name="Total" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Top donors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Principales Contribuyentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const donorTotals: Record<string, number> = {};
                tithes.forEach((t: any) => {
                  donorTotals[t.donorName] = (donorTotals[t.donorName] || 0) + (parseFloat(t.amount) || 0);
                });
                const sorted = Object.entries(donorTotals)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10);
                if (sorted.length === 0) return <p className="text-sm text-muted-foreground">No hay datos</p>;
                const maxVal = sorted[0]?.[1] || 1;
                return (
                  <div className="space-y-2">
                    {sorted.map(([name, total], i) => (
                      <div key={name} className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground w-5">{i + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium truncate">{name}</span>
                            <span className="text-sm font-mono text-green-700">${total.toFixed(2)}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(total / maxVal) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* Monthly comparison */}
          {monthlyData.length > 1 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Comparativa Mensual</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                    <Bar dataKey="total" fill="#22c55e" name="Ingresos" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ===== PRESUPUESTO TAB ===== */}
        <TabsContent value="presupuesto" className="space-y-4">
          <Card className="border-orange-200/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-500" /> Resumen Presupuestario {reportYear}
              </CardTitle>
              <CardDescription>Vista general de ingresos y distribución financiera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <TrendingUp className="h-5 w-5 mx-auto text-green-600 mb-1" />
                  <p className="text-lg font-bold text-green-700">${(report?.total || 0).toFixed(2)}</p>
                  <p className="text-[10px] text-muted-foreground">Ingresos Totales</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <Calculator className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                  <p className="text-lg font-bold text-blue-700">${(budgetSummary?.avgMonthly || 0).toFixed(2)}</p>
                  <p className="text-[10px] text-muted-foreground">Promedio Mensual</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <Banknote className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                  <p className="text-lg font-bold text-purple-700">{monthlyData.length}</p>
                  <p className="text-[10px] text-muted-foreground">Meses con Actividad</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <PiggyBank className="h-5 w-5 mx-auto text-orange-600 mb-1" />
                  <p className="text-lg font-bold text-orange-700">
                    ${monthlyData.length > 0 ? Math.max(...monthlyData.map((m: any) => m.total)).toFixed(2) : "0.00"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Mejor Mes</p>
                </div>
              </div>

              {/* Budget allocation by type */}
              {report && (
                <div>
                  <h4 className="text-sm font-semibold mb-3">Distribución de Ingresos por Categoría</h4>
                  <div className="space-y-3">
                    {Object.entries(TITHE_TYPES).map(([key, label]) => {
                      const amount = report?.byType?.[key] || 0;
                      const pct = report.total > 0 ? (amount / report.total) * 100 : 0;
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>{label}</span>
                            <span className="font-mono">${amount.toFixed(2)} <span className="text-muted-foreground">({pct.toFixed(1)}%)</span></span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: COLORS[Object.keys(TITHE_TYPES).indexOf(key) % COLORS.length],
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Monthly trend */}
              {monthlyData.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3">Tendencia de Ingresos</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                      <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} name="Ingresos" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== REGISTROS TAB ===== */}
        <TabsContent value="registros" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4" /> Registros Financieros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Fecha</th>
                      <th className="text-left p-2">Donante</th>
                      <th className="text-left p-2">Tipo</th>
                      <th className="text-right p-2">Monto</th>
                      <th className="text-left p-2">Método</th>
                      <th className="text-left p-2">Región</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tithes.map((t: any) => (
                      <tr key={t.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 text-xs">{t.createdAt ? format(new Date(t.createdAt), "dd MMM yyyy", { locale: es }) : "-"}</td>
                        <td className="p-2 font-medium">{t.donorName}</td>
                        <td className="p-2">
                          <Badge variant="outline" className="text-xs">
                            {TITHE_TYPES[t.type] || t.type}
                          </Badge>
                        </td>
                        <td className="p-2 text-right font-mono">{t.currency} {parseFloat(t.amount).toFixed(2)}</td>
                        <td className="p-2 text-xs">{PAYMENT_METHODS[t.method] || t.method}</td>
                        <td className="p-2 text-xs">{t.regionName || "-"}</td>
                        <td className="p-2">
                          <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(t.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {tithes.length === 0 && (
                      <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No hay registros financieros</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ===== MAIN PAGE =====
export default function FinanzasPage() {
  const { user } = useAuth();
  const isAdmin = isAdminRole(user?.role);

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
            <Wallet className="h-8 w-8" /> Finanzas
          </h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Gestión financiera del ministerio" : "Información financiera y apoyo al ministerio"}
          </p>
        </div>

        {/* Public donation section — always visible */}
        <PublicDonationSection />

        {/* Admin financial dashboard */}
        {isAdmin && <AdminFinanceDashboard />}
      </div>
    </Layout>
  );
}
