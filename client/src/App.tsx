import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Component, lazy, Suspense, useEffect, type ComponentType, type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RadioDock } from "@/components/RadioDock";
import { AppStatus } from "@/components/AppStatus";
import { MobileTabBar } from "@/components/MobileTabBar";
import { useDock } from "@/components/media/player-store";
import { normalizarRuta, tituloDeRuta } from "@shared/titulos";

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
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
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
const AcademiaCertificado = lazy(() => import("@/pages/academia-certificado"));
const AcademiaVerificar = lazy(() => import("@/pages/academia-verificar"));
const AcademiaReglamento = lazy(() => import("@/pages/academia-reglamento"));
const AcademiaInscripcion = lazy(() => import("@/pages/academia-inscripcion"));
const AcademiaDireccion = lazy(() => import("@/pages/academia-direccion"));
const AcademiaDireccionAlumno = lazy(() => import("@/pages/academia-direccion-alumno"));
const AcademiaDireccionMateria = lazy(() => import("@/pages/academia-direccion-materia"));
const AcademiaDireccionContenido = lazy(() => import("@/pages/academia-direccion-contenido"));
const AcademiaAcompanados = lazy(() => import("@/pages/academia-acompanados"));
const RedirigirPanelAcademia = lazy(() => import("@/components/academia/entrada-panel").then((m) => ({ default: m.RedirigirPanelAcademia })));
const AcademiaExpediente = lazy(() => import("@/pages/academia-expediente"));
const AcademiaCarne = lazy(() => import("@/pages/academia-carne"));
const AcademiaCuaderno = lazy(() => import("@/pages/academia-cuaderno"));
const AcademiaSalon = lazy(() => import("@/pages/academia-salon"));
const AcademiaHonor = lazy(() => import("@/pages/academia-honor"));
const AcademiaHonorAlumno = lazy(() => import("@/pages/academia-honor-alumno"));
const AcademiaSuficiencia = lazy(() => import("@/pages/academia-suficiencia"));
const AcademiaDiagnostico = lazy(() => import("@/pages/academia-diagnostico"));
const AcademiaDiagnosticoPrueba = lazy(() => import("@/pages/academia-diagnostico").then((m) => ({ default: m.AcademiaDiagnosticoPrueba })));
const AcademiaRepaso = lazy(() => import("@/pages/academia-repaso"));
const AcademiaDeclaracion = lazy(() => import("@/pages/academia-declaracion"));
const AcademiaMini = lazy(() => import("@/pages/academia-mini"));
const AcademiaEscrito = lazy(() => import("@/pages/academia-escrito"));
const AcademiaEspecialidad = lazy(() => import("@/pages/academia-especialidad"));
const AcademiaCatalogo = lazy(() => import("@/pages/academia-catalogo"));
const AcademiaRepasoDia = lazy(() => import("@/pages/academia-repaso-dia"));
const AcademiaPractica = lazy(() => import("@/pages/academia-practica"));
const AcademiaPracticar = lazy(() => import("@/pages/academia-practicar"));
const AcademiaPracticarSesion = lazy(() => import("@/pages/academia-practicar-sesion"));
const AcademiaJuego = lazy(() => import("@/pages/academia-juego"));
const AcademiaRecursos = lazy(() => import("@/pages/academia-recursos"));
const AcademiaLaboratorio = lazy(() => import("@/pages/academia-laboratorio"));
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

/**
 * El título de la pestaña de cada ruta (antes quedaba el de la primera página que se cargó). Va dentro del Suspense y
 * antes de las rutas: cambia cuando la página nueva ya se ve, después de que la de antes devuelva el título que
 * guardaba, y antes de que la página ponga el suyo. Las que ponen el suyo (la academia, Juegos, Mensajes) no se tocan.
 */
function TituloDeLaRuta() {
  const ruta = normalizarRuta(useLocation()[0]);
  useEffect(() => {
    const titulo = tituloDeRuta(ruta);
    if (titulo !== null) document.title = titulo;
  }, [ruta]);
  return null;
}

function Router() {
  return (
    // Si una página falla, el aviso sale con el menú; la radio y el menú de abajo siguen funcionando.
    <AtrapaErrores aviso={ErrorDePagina}>
    <Suspense fallback={<PageFallback />}>
    <TituloDeLaRuta />
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
      <Route path="/academia/catalogo" component={AcademiaCatalogo} />
      <Route path="/academia/repaso-del-dia" component={AcademiaRepasoDia} />
      <Route path="/academia/practica/:leccionId" component={AcademiaPractica} />
      <Route path="/academia/practicar" component={AcademiaPracticar} />
      <Route path="/academia/practicar/dia" component={AcademiaPracticarSesion} />
      <Route path="/academia/practicar/mision/:materiaId" component={AcademiaPracticarSesion} />
      <Route path="/academia/practicar/juego/:juego" component={AcademiaJuego} />
      <Route path="/academia/recursos" component={AcademiaRecursos} />
      <Route path="/academia/laboratorio/:practicaId" component={AcademiaLaboratorio} />
      <Route path="/academia/materia/:materiaId" component={AcademiaMateria} />
      <Route path="/academia/leccion/:leccionId" component={AcademiaLeccion} />
      <Route path="/academia/examen/:materiaId" component={AcademiaExamen} />
      <Route path="/academia/nivel/:n" component={AcademiaNivel} />
      <Route path="/academia/integral/:nivel" component={AcademiaIntegral} />
      <Route path="/academia/certificado/:codigo" component={AcademiaCertificado} />
      <Route path="/academia/verificar/:codigo" component={AcademiaVerificar} />
      <Route path="/academia/verificar" component={AcademiaVerificar} />
      <Route path="/academia/reglamento" component={AcademiaReglamento} />
      <Route path="/academia/inscripcion" component={AcademiaInscripcion} />
      <Route path="/academia/matricula" component={AcademiaInscripcion} />
      <Route path="/academia/carne" component={AcademiaCarne} />
      <Route path="/academia/cuaderno" component={AcademiaCuaderno} />
      <Route path="/academia/salon" component={AcademiaSalon} />
      <Route path="/academia/cuadro-de-honor" component={AcademiaHonor} />
      <Route path="/academia/cuadro-de-honor/:id" component={AcademiaHonorAlumno} />
      <Route path="/academia/expediente" component={AcademiaExpediente} />
      <Route path="/academia/acompanados" component={AcademiaAcompanados} />
      <Route path="/academia/suficiencia/:materiaId" component={AcademiaSuficiencia} />
      <Route path="/academia/diagnostico/prueba" component={AcademiaDiagnosticoPrueba} />
      <Route path="/academia/diagnostico" component={AcademiaDiagnostico} />
      <Route path="/academia/repaso" component={AcademiaRepaso} />
      <Route path="/academia/declaracion-de-fe" component={AcademiaDeclaracion} />
      <Route path="/academia/mini/:materiaId/:n" component={AcademiaMini} />
      <Route path="/academia/escrito/:materiaId" component={AcademiaEscrito} />
      <Route path="/academia/especialidad/:especialidadId" component={AcademiaEspecialidad} />
      {/* La administración de la academia: la Administración desde su panel; los maestros y las iglesias, solo para ver */}
      <Route path="/admin/academia" component={AcademiaDireccion} />
      <Route path="/admin/academia/alumno/:alumnoId" component={AcademiaDireccionAlumno} />
      <Route path="/admin/academia/materia/:materiaId" component={AcademiaDireccionMateria} />
      <Route path="/admin/academia/contenido/:materiaId" component={AcademiaDireccionContenido} />
      <Route path="/maestro/academia" component={AcademiaDireccion} />
      <Route path="/maestro/academia/alumno/:alumnoId" component={AcademiaDireccionAlumno} />
      <Route path="/maestro/academia/materia/:materiaId" component={AcademiaDireccionMateria} />
      <Route path="/mi-iglesia/academia" component={AcademiaDireccion} />
      <Route path="/mi-iglesia/academia/alumno/:alumnoId" component={AcademiaDireccionAlumno} />
      <Route path="/mi-iglesia/academia/materia/:materiaId" component={AcademiaDireccionMateria} />
      <Route path="/academia/direccion" component={RedirigirPanelAcademia} />
      <Route path="/academia/direccion/alumno/:alumnoId" component={RedirigirPanelAcademia} />
      <Route path="/academia/direccion/materia/:materiaId" component={RedirigirPanelAcademia} />
      <Route path="/academia/direccion/contenido/:materiaId" component={RedirigirPanelAcademia} />
      <Route path="/alianza" component={AlianzaPage} />
      <Route path="/ficha-ministerial" component={FichaMinisterialPage} />
      <Route path="/ficha-ministerial/:userId" component={FichaMinisterialPage} />
      <Route path="/mi-iglesia" component={MiIglesiaPage} />
      <Route path="/buscar-iglesia" component={BuscarIglesiaPage} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
    </AtrapaErrores>
  );
}

type AvisoDeError = ComponentType<{ error: Error; reintentar: () => void }>;
type PropsErrorBoundary = { children: ReactNode; ruta: string; aviso: AvisoDeError };

/**
 * Muestra «Algo salió mal» si lo que envuelve falla, y se quita sola al cambiar de ruta
 * (antes quedaba puesta en todas las páginas hasta recargar).
 */
class ErrorBoundary extends Component<PropsErrorBoundary, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: unknown) {
    // Lo lanzado puede no ser un Error (null, un texto…): igual hay que mostrar el aviso.
    if (error instanceof Error) return { error };
    const mensaje = (error as { message?: unknown } | null)?.message;
    return { error: new Error(typeof error === "string" ? error : typeof mensaje === "string" ? mensaje : "") };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error("Error en la aplicación:", error, errorInfo);
    Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
  }

  componentDidUpdate(antes: PropsErrorBoundary, estadoAntes: { error: Error | null }) {
    // Solo si el aviso ya estaba puesto: si la página nueva es la que acaba de fallar, no se reintenta en seguida.
    if (this.state.error && estadoAntes.error && antes.ruta !== this.props.ruta) {
      this.setState({ error: null });
    }
  }

  reintentar = () => this.setState({ error: null });

  render() {
    const Aviso = this.props.aviso;
    if (this.state.error) return <Aviso error={this.state.error} reintentar={this.reintentar} />;
    return this.props.children;
  }
}

/** Lee la ruta aquí y no en App, para no volver a dibujar toda la app en cada cambio de página. */
function AtrapaErrores({ aviso, children }: { aviso: AvisoDeError; children: ReactNode }) {
  const [ruta] = useLocation();
  return (
    <ErrorBoundary ruta={ruta} aviso={aviso}>
      {children}
    </ErrorBoundary>
  );
}

/** Una página que falla: el aviso va con el menú, para seguir a otra parte sin recargar. */
function ErrorDePagina({ error, reintentar }: { error: Error; reintentar: () => void }) {
  const [, navegar] = useLocation();
  return (
    <Layout>
      <div className="mx-auto max-w-xl px-4 py-16 text-center" role="alert" data-testid="pantalla-error">
        <h1 className="mb-3 text-2xl font-bold text-red-600 dark:text-red-400">Algo salió mal</h1>
        <p className="mb-2 text-muted-foreground">
          Esta página tuvo un problema. Puedes ir a otra desde el menú, volver al inicio o recargarla.
        </p>
        <p className="mb-6 text-sm text-muted-foreground break-words">{error.message || "Error desconocido"}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              reintentar();
              navegar("/");
            }}
            data-testid="boton-error-inicio"
          >
            Volver al inicio
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()} data-testid="boton-error-recargar">
            Recargar la página
          </Button>
        </div>
      </div>
    </Layout>
  );
}

/** Si falla algo de fuera de las páginas (el tema, la radio, el menú de abajo…): sin menú, y al inicio recargando. */
function ErrorGeneral({ error }: { error: Error; reintentar: () => void }) {
  return (
    <div role="alert" style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#e53e3e", fontSize: "1.5rem", marginBottom: "1rem" }}>
        Algo salió mal
      </h1>
      <p style={{ color: "#666", marginBottom: "1rem" }}>
        {error.message || "Error desconocido"}
      </p>
      <button
        onClick={() => {
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
        Volver al inicio
      </button>
    </div>
  );
}

function App() {
  return (
    <AtrapaErrores aviso={ErrorGeneral}>
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
    </AtrapaErrores>
  );
}

export default App;
