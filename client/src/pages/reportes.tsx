import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { isAdminRole } from "@/lib/utils";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area, RadialBarChart, RadialBar,
} from "recharts";
import {
  Users, BookOpen, Calendar, Heart, Download, TrendingUp, GraduationCap,
  Library, Activity, DollarSign, FileSpreadsheet, Church, MessageSquare,
  Mic, UserCheck, Globe, Award, BarChart3, ArrowUpRight, ArrowDownRight, Clock,
  Video, Radio, Eye, Timer, User, ChevronDown, ChevronUp,
} from "lucide-react";

const COLORS = ["#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f43f5e"];

export default function ReportesPage() {
  const { user } = useAuth();
  const [reportYear, setReportYear] = useState(new Date().getFullYear().toString());

  const { data: dashboard } = useQuery<any>({
    queryKey: ["/api/reports/dashboard"],
    enabled: user?.role === "admin",
  });

  const { data: memberGrowth } = useQuery<any>({
    queryKey: ["/api/reports/member-growth"],
    enabled: user?.role === "admin",
  });

  const { data: courseStats } = useQuery<any>({
    queryKey: ["/api/reports/course-stats"],
    enabled: user?.role === "admin",
  });

  const { data: prayerStats } = useQuery<any>({
    queryKey: ["/api/reports/prayer"],
    enabled: user?.role === "admin",
  });

  const { data: libraryStats } = useQuery<any>({
    queryKey: ["/api/reports/library"],
    enabled: user?.role === "admin",
  });

  const { data: financeReport } = useQuery<any>({
    queryKey: ["/api/tithes/report", reportYear],
    queryFn: () => fetch(`/api/tithes/report?year=${reportYear}`, { credentials: "include" }).then(r => r.json()),
    enabled: user?.role === "admin",
  });

  const { data: budgetSummary } = useQuery<any>({
    queryKey: ["/api/finance/budget-summary", reportYear],
    queryFn: () => fetch(`/api/finance/budget-summary?year=${reportYear}`, { credentials: "include" }).then(r => r.json()),
    enabled: user?.role === "admin",
  });

  const { data: liveEventsReport } = useQuery<any>({
    queryKey: ["/api/reports/live-events"],
    enabled: user?.role === "admin",
  });

  const [expandedSession, setExpandedSession] = useState<number | null>(null);

  const { data: sessionDetail } = useQuery<any>({
    queryKey: ["/api/reports/live-events", expandedSession],
    queryFn: () => fetch(`/api/reports/live-events/${expandedSession}`, { credentials: "include" }).then(r => r.json()),
    enabled: !!expandedSession && isAdminRole(user?.role),
  });

  if (!user || !isAdminRole(user.role)) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold text-red-500">Acceso Denegado</h1>
          <p className="text-muted-foreground mt-2">Solo administradores pueden ver los reportes.</p>
        </div>
      </Layout>
    );
  }

  const handleExport = () => {
    window.open("/api/reports/enrollments/export", "_blank");
  };

  const handleExportFinance = () => {
    if (!financeReport?.rows?.length) return;
    const headers = ["Fecha", "Donante", "Tipo", "Monto", "Moneda", "Método", "Región"];
    const rows = financeReport.rows.map((t: any) => [
      t.createdAt ? new Date(t.createdAt).toISOString().slice(0, 10) : "",
      t.donorName, t.type, t.amount, t.currency, t.method, t.regionName || "",
    ]);
    const csv = [headers.join(","), ...rows.map((r: any) => r.map((c: any) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `finanzas_${reportYear}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportLiveEvents = () => {
    window.open("/api/reports/live-events/export", "_blank");
  };

  // Calculate engagement metrics
  const totalActivities = (dashboard?.totalPrayerActivities || 0) + (dashboard?.totalEvents || 0) + (dashboard?.totalSermons || 0);
  const enrollmentRate = dashboard?.totalUsers > 0
    ? ((dashboard.totalEnrollments / dashboard.totalUsers) * 100).toFixed(1) : "0";
  const completionRate = dashboard?.totalEnrollments > 0
    ? ((dashboard.completedEnrollments / dashboard.totalEnrollments) * 100).toFixed(1) : "0";
  const activeRate = dashboard?.totalUsers > 0
    ? ((dashboard.activeUsers / dashboard.totalUsers) * 100).toFixed(1) : "0";

  // Monthly finance data
  const monthlyFinance = budgetSummary?.monthly || [];

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
              <BarChart3 className="h-8 w-8" /> Reportes y Estadísticas
            </h1>
            <p className="text-muted-foreground">Panel completo de análisis del ministerio</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={reportYear} onValueChange={setReportYear}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2024, 2025, 2026].map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleExport} variant="outline" size="sm" className="gap-1">
              <Download className="h-3.5 w-3.5" /> Inscripciones
            </Button>
            <Button onClick={handleExportFinance} variant="outline" size="sm" className="gap-1">
              <FileSpreadsheet className="h-3.5 w-3.5" /> Finanzas
            </Button>
          </div>
        </div>

        {/* ===== MAIN DASHBOARD CARDS ===== */}
        {dashboard && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <Users className="h-6 w-6 mx-auto text-blue-500 mb-1" />
                <div className="text-xl font-bold">{dashboard.totalUsers}</div>
                <p className="text-[10px] text-muted-foreground">Miembros</p>
                <Badge variant="outline" className="mt-1 text-[9px]">{dashboard.activeUsers} activos</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <BookOpen className="h-6 w-6 mx-auto text-green-500 mb-1" />
                <div className="text-xl font-bold">{dashboard.totalCourses}</div>
                <p className="text-[10px] text-muted-foreground">Cursos</p>
                <Badge variant="outline" className="mt-1 text-[9px]">{dashboard.activeCourses} activos</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <GraduationCap className="h-6 w-6 mx-auto text-purple-500 mb-1" />
                <div className="text-xl font-bold">{dashboard.totalEnrollments}</div>
                <p className="text-[10px] text-muted-foreground">Inscripciones</p>
                <Badge variant="outline" className="mt-1 text-[9px]">{dashboard.completedEnrollments} completadas</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <Calendar className="h-6 w-6 mx-auto text-orange-500 mb-1" />
                <div className="text-xl font-bold">{dashboard.totalEvents}</div>
                <p className="text-[10px] text-muted-foreground">Eventos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <Heart className="h-6 w-6 mx-auto text-red-500 mb-1" />
                <div className="text-xl font-bold">{dashboard.totalPrayerActivities}</div>
                <p className="text-[10px] text-muted-foreground">Oración</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <DollarSign className="h-6 w-6 mx-auto text-emerald-500 mb-1" />
                <div className="text-xl font-bold">${(financeReport?.total || 0).toFixed(0)}</div>
                <p className="text-[10px] text-muted-foreground">Ingresos {reportYear}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== KEY METRICS BAR ===== */}
        {dashboard && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200/50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                  <span className="text-lg font-bold text-blue-700">{activeRate}%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Tasa de Activación</p>
                <div className="w-full bg-blue-200/50 rounded-full h-1 mt-1.5">
                  <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${activeRate}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100/30 dark:from-green-950/20 dark:to-green-900/10 border-green-200/50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-bold text-green-700">{completionRate}%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Tasa de Completación</p>
                <div className="w-full bg-green-200/50 rounded-full h-1 mt-1.5">
                  <div className="bg-green-600 h-1 rounded-full" style={{ width: `${completionRate}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/30 dark:from-purple-950/20 dark:to-purple-900/10 border-purple-200/50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-lg font-bold text-purple-700">{enrollmentRate}%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Tasa de Inscripción</p>
                <div className="w-full bg-purple-200/50 rounded-full h-1 mt-1.5">
                  <div className="bg-purple-600 h-1 rounded-full" style={{ width: `${Math.min(100, parseFloat(enrollmentRate))}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100/30 dark:from-orange-950/20 dark:to-orange-900/10 border-orange-200/50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <Activity className="h-4 w-4 text-orange-600" />
                  <span className="text-lg font-bold text-orange-700">{totalActivities}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Total Actividades</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ===== DETAILED TABS ===== */}
        <Tabs defaultValue="members">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7">
            <TabsTrigger value="members" className="text-xs">Miembros</TabsTrigger>
            <TabsTrigger value="courses" className="text-xs">Cursos</TabsTrigger>
            <TabsTrigger value="finance" className="text-xs">Finanzas</TabsTrigger>
            <TabsTrigger value="prayer" className="text-xs">Oración</TabsTrigger>
            <TabsTrigger value="library" className="text-xs">Biblioteca</TabsTrigger>
            <TabsTrigger value="live" className="text-xs gap-1"><Video className="h-3 w-3" /> En Vivo</TabsTrigger>
            <TabsTrigger value="engagement" className="text-xs">Engagement</TabsTrigger>
          </TabsList>

          {/* ===== MEMBERS TAB ===== */}
          <TabsContent value="members" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Crecimiento por Mes</CardTitle></CardHeader>
                <CardContent>
                  {memberGrowth?.monthly && (
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={memberGrowth.monthly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#f97316" fill="#f97316" fillOpacity={0.2} name="Nuevos Miembros" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Globe className="h-4 w-4" /> Por País</CardTitle></CardHeader>
                <CardContent>
                  {memberGrowth?.byCountry && (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={memberGrowth.byCountry} dataKey="count" nameKey="country" cx="50%" cy="50%" outerRadius={90} innerRadius={45} label>
                          {memberGrowth.byCountry.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Country table */}
            {memberGrowth?.byCountry && memberGrowth.byCountry.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Detalle por País</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {memberGrowth.byCountry.slice(0, 15).map((c: any, i: number) => {
                      const maxCount = memberGrowth.byCountry[0]?.count || 1;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-16 truncate">{c.country || "Sin país"}</span>
                          <div className="flex-1">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(c.count / maxCount) * 100}%` }} />
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold w-8 text-right">{c.count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ===== COURSES TAB ===== */}
          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-sm">Estadísticas por Curso</CardTitle></CardHeader>
              <CardContent>
                {courseStats && Array.isArray(courseStats) && (
                  <ResponsiveContainer width="100%" height={Math.max(300, courseStats.length * 50)}>
                    <BarChart data={courseStats} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="title" width={160} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="enrolled" fill="#22c55e" name="Inscritos" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="completed" fill="#3b82f6" name="Completados" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="pending" fill="#eab308" name="Pendientes" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Course completion summary */}
            {courseStats && Array.isArray(courseStats) && courseStats.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {courseStats.slice(0, 6).map((c: any) => {
                  const total = (c.enrolled || 0) + (c.completed || 0) + (c.pending || 0);
                  const completionPct = total > 0 ? ((c.completed / total) * 100).toFixed(0) : "0";
                  return (
                    <Card key={c.id} className="relative overflow-hidden">
                      <CardContent className="p-3">
                        <h4 className="text-sm font-semibold truncate">{c.title}</h4>
                        <p className="text-[10px] text-muted-foreground mb-2">{c.category}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completionPct}%` }} />
                            </div>
                          </div>
                          <span className="text-xs font-bold text-green-700">{completionPct}%</span>
                        </div>
                        <div className="mt-2 flex gap-2 text-[10px]">
                          <Badge variant="outline" className="text-[9px]">{c.pending} pendientes</Badge>
                          <Badge variant="outline" className="text-[9px]">{c.enrolled} aprobados</Badge>
                          <Badge variant="secondary" className="text-[9px]">{c.completed} completados</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ===== FINANCE TAB ===== */}
          <TabsContent value="finance" className="space-y-4">
            {financeReport && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="border-green-200">
                  <CardContent className="p-3 text-center">
                    <div className="text-xl font-bold text-green-700">${financeReport.total?.toFixed(2)}</div>
                    <p className="text-[10px] text-muted-foreground">Total {reportYear}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-xl font-bold">{financeReport.count}</div>
                    <p className="text-[10px] text-muted-foreground">Transacciones</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-xl font-bold text-orange-600">${(financeReport.byType?.diezmo || 0).toFixed(2)}</div>
                    <p className="text-[10px] text-muted-foreground">Diezmos</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <div className="text-xl font-bold text-blue-600">${(financeReport.byType?.donacion || 0).toFixed(2)}</div>
                    <p className="text-[10px] text-muted-foreground">Donaciones</p>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {monthlyFinance.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="text-sm">Tendencia Mensual</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={monthlyFinance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                        <Area type="monotone" dataKey="total" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} name="Ingresos" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
              {financeReport?.byType && (
                <Card>
                  <CardHeader><CardTitle className="text-sm">Distribución por Tipo</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={Object.entries(financeReport.byType).map(([k, v]) => ({ name: k, value: v }))}
                          dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} label
                        >
                          {Object.keys(financeReport.byType).map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>

            {financeReport?.byRegion && Object.keys(financeReport.byRegion).length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Ingresos por Región</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={Object.entries(financeReport.byRegion).map(([k, v]) => ({ name: k, total: v }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                      <Bar dataKey="total" fill="#f97316" name="Total" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ===== PRAYER TAB ===== */}
          <TabsContent value="prayer" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-sm">Actividades de Oración por Mes</CardTitle></CardHeader>
                <CardContent>
                  {prayerStats?.activities && (
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={prayerStats.activities}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#f97316" fill="#f97316" fillOpacity={0.2} name="Actividades" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm">Participantes por Mes</CardTitle></CardHeader>
                <CardContent>
                  {prayerStats?.attendees && (
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={prayerStats.attendees}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Participantes" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ===== LIBRARY TAB ===== */}
          <TabsContent value="library" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Library className="h-4 w-4" /> Recursos por Categoría</CardTitle></CardHeader>
                <CardContent>
                  {libraryStats?.byCategory && (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={libraryStats.byCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={90} innerRadius={40} label>
                          {libraryStats.byCategory.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm">Estadísticas de Lectura</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {libraryStats?.planStats && (
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-3xl font-bold text-orange-600">
                          {libraryStats.planStats.total > 0
                            ? ((libraryStats.planStats.completed / libraryStats.planStats.total) * 100).toFixed(0)
                            : 0}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Progreso de Lectura</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capítulos completados</span>
                        <span className="font-bold">{libraryStats.planStats.completed} / {libraryStats.planStats.total}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="bg-orange-500 h-3 rounded-full transition-all"
                          style={{
                            width: `${libraryStats.planStats.total > 0 ? (libraryStats.planStats.completed / libraryStats.planStats.total) * 100 : 0}%`
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {libraryStats?.topLiked && libraryStats.topLiked.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-2">Recursos más populares</h4>
                      <div className="space-y-1">
                        {libraryStats.topLiked.slice(0, 5).map((r: any, i: number) => (
                          <div key={i} className="flex items-center justify-between text-xs p-1.5 rounded bg-muted/30">
                            <span>Recurso #{r.resourceId}</span>
                            <Badge variant="outline" className="text-[9px]">{r.count} likes</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ===== LIVE EVENTS TAB ===== */}
          <TabsContent value="live" className="space-y-4">
            {/* Summary Cards */}
            {liveEventsReport?.summary && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="border-red-200/50 bg-gradient-to-br from-red-50 to-red-100/30 dark:from-red-950/20 dark:to-red-900/10">
                  <CardContent className="p-3 text-center">
                    <Video className="h-6 w-6 mx-auto text-red-500 mb-1" />
                    <div className="text-xl font-bold">{liveEventsReport.summary.totalSessions}</div>
                    <p className="text-[10px] text-muted-foreground">Total Sesiones</p>
                    {liveEventsReport.summary.activeSessions > 0 && (
                      <Badge variant="destructive" className="mt-1 text-[9px] animate-pulse">{liveEventsReport.summary.activeSessions} activa(s)</Badge>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <Timer className="h-6 w-6 mx-auto text-blue-500 mb-1" />
                    <div className="text-xl font-bold">{liveEventsReport.summary.totalDuration}</div>
                    <p className="text-[10px] text-muted-foreground">Minutos Totales</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <Clock className="h-6 w-6 mx-auto text-green-500 mb-1" />
                    <div className="text-xl font-bold">{liveEventsReport.summary.avgDuration}</div>
                    <p className="text-[10px] text-muted-foreground">Prom. Duración (min)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <Radio className="h-6 w-6 mx-auto text-purple-500 mb-1" />
                    <div className="text-xl font-bold">
                      {liveEventsReport.sessions?.reduce((max: number, s: any) => Math.max(max, s.peakViewers || 0), 0)}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Pico Máx Conectados</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Export Button */}
            <div className="flex justify-end">
              <Button onClick={handleExportLiveEvents} variant="outline" size="sm" className="gap-1">
                <FileSpreadsheet className="h-3.5 w-3.5" /> Exportar CSV
              </Button>
            </div>

            {/* Sessions Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Video className="h-4 w-4 text-red-500" /> Historial de Eventos en Vivo
                </CardTitle>
                <CardDescription className="text-xs">
                  Detalle de cada sesión: quién la creó, conectados, duración y más
                </CardDescription>
              </CardHeader>
              <CardContent>
                {liveEventsReport?.sessions?.length > 0 ? (
                  <div className="space-y-2">
                    {liveEventsReport.sessions.map((session: any) => (
                      <div key={session.id} className="border rounded-lg overflow-hidden">
                        {/* Session Header Row */}
                        <div
                          className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${session.status === "active" ? "bg-red-50/50 dark:bg-red-950/20 border-l-4 border-l-red-500" : ""}`}
                          onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                        >
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                {session.status === "active" ? (
                                  <>
                                    <Radio className="w-5 h-5 text-red-500" />
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                                  </>
                                ) : (
                                  <Video className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold flex items-center gap-2">
                                  {session.title}
                                  {session.status === "active" && (
                                    <Badge variant="destructive" className="text-[9px] animate-pulse">EN VIVO</Badge>
                                  )}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                                  <Badge variant="outline" className="text-[9px]">{session.contextLabel}</Badge>
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {session.creatorName}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {session.startedAt ? new Date(session.startedAt).toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" }) : ""}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {session.startedAt ? new Date(session.startedAt).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }) : ""}
                                    {session.endedAt && (
                                      <> - {new Date(session.endedAt).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}</>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                              <div className="text-center">
                                <div className="font-bold text-blue-600">{session.uniqueAttendees}</div>
                                <div className="text-[9px] text-muted-foreground">Conectados</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-green-600">{session.durationMinutes || 0} min</div>
                                <div className="text-[9px] text-muted-foreground">Duración</div>
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-purple-600">{session.peakViewers}</div>
                                <div className="text-[9px] text-muted-foreground">Pico</div>
                              </div>
                              {expandedSession === session.id ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Session Detail */}
                        {expandedSession === session.id && sessionDetail && (
                          <div className="border-t bg-muted/20 p-4 space-y-4">
                            {/* Session Info */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="bg-background rounded-lg p-3 border">
                                <p className="text-[10px] text-muted-foreground">Creador / Responsable</p>
                                <p className="font-semibold text-sm">{sessionDetail.creatorName}</p>
                                <p className="text-[10px] text-muted-foreground">@{sessionDetail.creatorUsername}</p>
                              </div>
                              <div className="bg-background rounded-lg p-3 border">
                                <p className="text-[10px] text-muted-foreground">Usuarios Únicos</p>
                                <p className="font-semibold text-sm text-blue-600">{sessionDetail.uniqueAttendees}</p>
                              </div>
                              <div className="bg-background rounded-lg p-3 border">
                                <p className="text-[10px] text-muted-foreground">Total Conexiones</p>
                                <p className="font-semibold text-sm text-orange-600">{sessionDetail.totalConnections}</p>
                              </div>
                              <div className="bg-background rounded-lg p-3 border">
                                <p className="text-[10px] text-muted-foreground">Sala</p>
                                <p className="font-semibold text-[10px] break-all">{sessionDetail.roomName}</p>
                              </div>
                            </div>

                            {/* Attendees Table */}
                            {sessionDetail.attendees?.length > 0 ? (
                              <div>
                                <h5 className="text-xs font-semibold mb-2 flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5" /> Detalle de Conectados ({sessionDetail.attendees.length} registros)
                                </h5>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead>
                                      <tr className="border-b bg-muted/30">
                                        <th className="text-left p-2">Usuario</th>
                                        <th className="text-left p-2">Hora Entrada</th>
                                        <th className="text-left p-2">Hora Salida</th>
                                        <th className="text-right p-2">Duración (min)</th>
                                        <th className="text-right p-2"># Conexión</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sessionDetail.attendees.map((a: any) => (
                                        <tr key={a.id} className="border-b hover:bg-muted/20">
                                          <td className="p-2">
                                            <div className="flex items-center gap-2">
                                              {a.userAvatar ? (
                                                <img src={a.userAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                                              ) : (
                                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                  <User className="w-3 h-3 text-primary" />
                                                </div>
                                              )}
                                              <div>
                                                <span className="font-medium">{a.userName}</span>
                                                <span className="text-muted-foreground ml-1">@{a.userUsername}</span>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="p-2">
                                            {a.joinedAt ? new Date(a.joinedAt).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "-"}
                                          </td>
                                          <td className="p-2">
                                            {a.leftAt ? (
                                              new Date(a.leftAt).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                                            ) : (
                                              <Badge variant="outline" className="text-[9px] text-green-600">Conectado</Badge>
                                            )}
                                          </td>
                                          <td className="p-2 text-right font-mono">
                                            {a.durationMinutes || (a.leftAt ? "-" : (
                                              <Badge variant="outline" className="text-[9px]">activo</Badge>
                                            ))}
                                          </td>
                                          <td className="p-2 text-right font-mono">{a.joinCount}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground text-center py-4">
                                No hay registros de conexión para esta sesión
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Video className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                    <p className="text-sm text-muted-foreground">No hay sesiones en vivo registradas aún.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Las sesiones se registran automáticamente cuando un administrador o maestro inicia una sala en vivo.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Distribution by Type Chart */}
            {liveEventsReport?.sessions?.length > 0 && (() => {
              const contextCounts = liveEventsReport.sessions.reduce((acc: any, s: any) => {
                acc[s.contextLabel] = (acc[s.contextLabel] || 0) + 1;
                return acc;
              }, {});
              const chartData = Object.entries(contextCounts).map(([name, value]) => ({ name, value }));
              return (
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Distribución por Tipo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={35} label>
                            {chartData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Top Responsables</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const creatorCounts = liveEventsReport.sessions.reduce((acc: any, s: any) => {
                          acc[s.creatorName] = (acc[s.creatorName] || 0) + 1;
                          return acc;
                        }, {});
                        const creatorData = Object.entries(creatorCounts)
                          .map(([name, count]) => ({ name, count }))
                          .sort((a: any, b: any) => b.count - a.count)
                          .slice(0, 10);
                        const maxCount = creatorData.length > 0 ? (creatorData[0] as any).count : 1;
                        return (
                          <div className="space-y-2">
                            {creatorData.map((c: any, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                                <span className="text-xs text-muted-foreground w-24 truncate">{c.name}</span>
                                <div className="flex-1">
                                  <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(c.count / maxCount) * 100}%` }} />
                                  </div>
                                </div>
                                <span className="text-xs font-mono font-bold w-6 text-right">{c.count}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </TabsContent>

          {/* ===== ENGAGEMENT TAB ===== */}
          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Indicadores de Engagement
                </CardTitle>
                <CardDescription className="text-xs">Métricas clave de participación del ministerio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {dashboard && (
                  <>
                    {/* Engagement gauges */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg border">
                        <div className="text-3xl font-bold text-blue-600">{activeRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Usuarios Activos</p>
                        <p className="text-[10px] text-muted-foreground">{dashboard.activeUsers} de {dashboard.totalUsers}</p>
                      </div>
                      <div className="text-center p-4 rounded-lg border">
                        <div className="text-3xl font-bold text-green-600">{completionRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Cursos Completados</p>
                        <p className="text-[10px] text-muted-foreground">{dashboard.completedEnrollments} de {dashboard.totalEnrollments}</p>
                      </div>
                      <div className="text-center p-4 rounded-lg border">
                        <div className="text-3xl font-bold text-purple-600">{dashboard.totalSermons || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Sermones</p>
                      </div>
                      <div className="text-center p-4 rounded-lg border">
                        <div className="text-3xl font-bold text-orange-600">{dashboard.totalSmallGroups || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Grupos Pequeños</p>
                      </div>
                    </div>

                    {/* Activity breakdown */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Distribución de Actividades</h4>
                      {(() => {
                        const activityData = [
                          { name: "Eventos", value: dashboard.totalEvents || 0, color: "#f97316" },
                          { name: "Oración", value: dashboard.totalPrayerActivities || 0, color: "#8b5cf6" },
                          { name: "Sermones", value: dashboard.totalSermons || 0, color: "#3b82f6" },
                          { name: "Grupos", value: dashboard.totalSmallGroups || 0, color: "#22c55e" },
                        ].filter(a => a.value > 0);
                        if (activityData.length === 0) return <p className="text-sm text-muted-foreground">No hay actividades registradas</p>;
                        return (
                          <div className="grid md:grid-cols-2 gap-4">
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie data={activityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={35} label>
                                  {activityData.map((a, i) => <Cell key={i} fill={a.color} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-3">
                              {activityData.map((a) => {
                                const maxVal = Math.max(...activityData.map(x => x.value));
                                return (
                                  <div key={a.name} className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }} />
                                    <div className="flex-1">
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>{a.name}</span>
                                        <span className="font-bold">{a.value}</span>
                                      </div>
                                      <div className="w-full bg-muted rounded-full h-1.5">
                                        <div className="h-1.5 rounded-full" style={{ width: `${(a.value / maxVal) * 100}%`, backgroundColor: a.color }} />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Growth summary */}
                    {memberGrowth?.monthly && memberGrowth.monthly.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-3">Resumen de Crecimiento</h4>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-lg font-bold">
                              {memberGrowth.monthly.length > 0 ? memberGrowth.monthly[memberGrowth.monthly.length - 1].count : 0}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Último Mes</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-lg font-bold">
                              {memberGrowth.monthly.reduce((sum: number, m: any) => sum + Number(m.count), 0)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Total Histórico</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-lg font-bold">
                              {memberGrowth.monthly.length > 0
                                ? (memberGrowth.monthly.reduce((sum: number, m: any) => sum + Number(m.count), 0) / memberGrowth.monthly.length).toFixed(1)
                                : 0}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Promedio/Mes</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
