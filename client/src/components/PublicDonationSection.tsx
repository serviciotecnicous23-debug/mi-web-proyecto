/**
 * La sección pública de donaciones (la portada y la página de finanzas). Vive aparte de la página de finanzas para que la
 * portada no cargue los gráficos de la administración (recharts) en cada visita.
 */
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import {
  DollarSign, Plus, Trash2, FileText, TrendingUp, TrendingDown,
  Heart, HandCoins, Wallet, ArrowUpRight, ArrowDownRight,
  Calculator, PiggyBank, CreditCard, Banknote, ChevronRight,
  BarChart3, Receipt, Download, Shield, CheckCircle2, Loader2, Lock,
} from "lucide-react";

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
