import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RadioDock } from "@/components/RadioDock";
import { AppStatus } from "@/components/AppStatus";
import { MobileTabBar } from "@/components/MobileTabBar";
import { useDock } from "@/components/media/player-store";

// La ventanita flotante (video que sigue mientras se navega) se descarga solo cuando hace falta.
const MediaDock = lazy(() => import("@/components/media/MediaDock").then((m) => ({ default: m.MediaDock })));
function MediaDockSlot() {
  const item = useDock();
  return item ? (
    <Suspense fallback={null}>
      <MediaDock />
    </Suspense>
  ) : null;
}
import { PageTransition } from "@/components/PageTransition";
import { GlassCursor } from "@/components/GlassCursor";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { Loader2 } from "lucide-react";

// Cada página se descarga al visitarla (antes todo iba en un JS de 2,2 MB que el
// celular bajaba entero para mostrar la portada). Portada y 404 van directas.
const Historia = lazy(() => import("@/pages/historia"));
const Bienvenida = lazy(() => import("@/pages/bienvenida"));
const Privacidad = lazy(() => import("@/pages/privacidad"));
const Terminos = lazy(() => import("@/pages/terminos"));
const Equipo = lazy(() => import("@/pages/equipo"));
const EnVivo = lazy(() => import("@/pages/en-vivo"));
const RadioPage = lazy(() => import("@/pages/radio"));
const RadioLiveScene = lazy(() => import("@/pages/radio-live-scene"));
const Contacto = lazy(() => import("@/pages/contacto"));
const Eventos = lazy(() => import("@/pages/eventos"));
const LoginPage = lazy(() => import("@/pages/auth").then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("@/pages/auth").then((m) => ({ default: m.RegisterPage })));
const Profile = lazy(() => import("@/pages/profile"));
const AdminDashboard = lazy(() => import("@/pages/admin"));
const Comunidad = lazy(() => import("@/pages/comunidad"));
const Capacitaciones = lazy(() => import("@/pages/capacitaciones"));
const CursoDetalle = lazy(() => import("@/pages/curso-detalle"));
const MisCapacitaciones = lazy(() => import("@/pages/mis-capacitaciones"));
const MaestroPanel = lazy(() => import("@/pages/maestro"));
const AulaVirtual = lazy(() => import("@/pages/aula"));
const BibliotecaPage = lazy(() => import("@/pages/biblioteca"));
const OracionPage = lazy(() => import("@/pages/oracion"));
const RegionesPage = lazy(() => import("@/pages/regiones"));
const IglesiasPage = lazy(() => import("@/pages/iglesias"));
const MensajesPage = lazy(() => import("@/pages/mensajes"));
const ForgotPasswordPage = lazy(() => import("@/pages/forgot-password"));
const ResetPasswordPage = lazy(() => import("@/pages/reset-password"));
const VerifyEmailPage = lazy(() => import("@/pages/verify-email"));
const ReportesPage = lazy(() => import("@/pages/reportes"));
const PlanillasPage = lazy(() => import("@/pages/planillas"));
const JuegosPage = lazy(() => import("@/pages/juegos"));
// solo en desarrollo: las mesas del patio corriendo en el navegador (no existe en la web publicada)
const PruebaMesa = import.meta.env.DEV ? lazy(() => import("@/games/templo/mesa/PruebaMesa")) : null;
const FinanzasPage = lazy(() => import("@/pages/finanzas"));
const SermonesPage = lazy(() => import("@/pages/sermones"));
const GruposPage = lazy(() => import("@/pages/grupos"));
const CalendarioPage = lazy(() => import("@/pages/calendario"));
const CertificadosPage = lazy(() => import("@/pages/certificados"));
// La Academia Avivando el Fuego (docs/academia.md)
const AcademiaPage = lazy(() => import("@/pages/academia"));
const AcademiaMateria = lazy(() => import("@/pages/academia-materia"));
const AcademiaLeccion = lazy(() => import("@/pages/academia-leccion"));
const AcademiaExamen = lazy(() => import("@/pages/academia-examen"));
const AcademiaNivel = lazy(() => import("@/pages/academia-nivel"));
const AcademiaIntegral = lazy(() => import("@/pages/academia-integral"));
const AlianzaPage = lazy(() => import("@/pages/alianza"));
const FichaMinisterialPage = lazy(() => import("@/pages/ficha-ministerial"));
const MiIglesiaPage = lazy(() => import("@/pages/mi-iglesia"));
const BuscarIglesiaPage = lazy(() => import("@/pages/buscar-iglesia"));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Cargando">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/bienvenida" component={Bienvenida} />
      <Route path="/privacidad" component={Privacidad} />
      <Route path="/terminos" component={Terminos} />
      <Route path="/historia" component={Historia} />
      <Route path="/equipo" component={Equipo} />
      <Route path="/en-vivo" component={EnVivo} />
      <Route path="/radio" component={RadioPage} />
      <Route path="/radio-live-scene" component={RadioLiveScene} />
      <Route path="/eventos" component={Eventos} />
      <Route path="/capacitaciones" component={Capacitaciones} />
      <Route path="/capacitaciones/:id" component={CursoDetalle} />
      <Route path="/aula/:id" component={AulaVirtual} />
      <Route path="/contacto" component={Contacto} />
      <Route path="/login" component={LoginPage} />
      <Route path="/registro" component={RegisterPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/verificar-email" component={VerifyEmailPage} />
      <Route path="/perfil" component={Profile} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/comunidad" component={Comunidad} />
      <Route path="/mis-capacitaciones" component={MisCapacitaciones} />
      <Route path="/maestro" component={MaestroPanel} />
      <Route path="/biblioteca" component={BibliotecaPage} />
      <Route path="/oracion" component={OracionPage} />
      <Route path="/regiones" component={RegionesPage} />
      <Route path="/iglesias" component={IglesiasPage} />
      <Route path="/mensajes" component={MensajesPage} />
      <Route path="/reportes" component={ReportesPage} />
      <Route path="/planillas/:id" component={PlanillasPage} />
      <Route path="/juegos" component={JuegosPage} />
      <Route path="/juegos/:slug" component={JuegosPage} />
      {PruebaMesa && <Route path="/mesa-prueba/:juego" component={PruebaMesa} />}
      <Route path="/finanzas" component={FinanzasPage} />
      <Route path="/sermones" component={SermonesPage} />
      <Route path="/grupos" component={GruposPage} />
      <Route path="/calendario" component={CalendarioPage} />
      <Route path="/certificados" component={CertificadosPage} />
      <Route path="/academia" component={AcademiaPage} />
      <Route path="/academia/materia/:materiaId" component={AcademiaMateria} />
      <Route path="/academia/leccion/:leccionId" component={AcademiaLeccion} />
      <Route path="/academia/examen/:materiaId" component={AcademiaExamen} />
      <Route path="/academia/nivel/:n" component={AcademiaNivel} />
      <Route path="/academia/integral/:nivel" component={AcademiaIntegral} />
      <Route path="/alianza" component={AlianzaPage} />
      <Route path="/ficha-ministerial" component={FichaMinisterialPage} />
      <Route path="/ficha-ministerial/:userId" component={FichaMinisterialPage} />
      <Route path="/mi-iglesia" component={MiIglesiaPage} />
      <Route path="/buscar-iglesia" component={BuscarIglesiaPage} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error en la aplicacion:", error, errorInfo);
    // Report to Sentry
    Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h1 style={{ color: "#e53e3e", fontSize: "1.5rem", marginBottom: "1rem" }}>
            Algo salió mal
          </h1>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            {this.state.error?.message || "Error desconocido"}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
            style={{
              padding: "0.5rem 1.5rem",
              background: "#e67e22",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Volver al Inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <GlassCursor />
            <PageTransition>
              <Router />
            </PageTransition>
            <RadioDock />
            <AppStatus />
            <MobileTabBar />
            <MediaDockSlot />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
