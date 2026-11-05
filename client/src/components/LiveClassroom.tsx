import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Video, VideoOff, Radio, Users, Clock, X, Maximize2, Minimize2,
  PhoneOff, Loader2,
} from "lucide-react";
import { useLiveClassroom, useStartLiveClassroom, useStopLiveClassroom } from "@/hooks/use-users";
import { toast } from "@/hooks/use-toast";

interface LiveClassroomProps {
  courseId: number;
  courseTitle: string;
  canManage: boolean;
  userName: string;
  userEmail?: string;
}

// Helper: load Jitsi external_api.js script once
function loadJitsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).JitsiMeetExternalAPI) {
      resolve();
      return;
    }
    const existing = document.querySelector('script[src*="external_api.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Jitsi")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Jitsi script"));
    document.head.appendChild(script);
  });
}

export default function LiveClassroom({ courseId, courseTitle, canManage, userName, userEmail }: LiveClassroomProps) {
  const { data: liveState, isLoading } = useLiveClassroom(courseId);
  const startLive = useStartLiveClassroom();
  const stopLive = useStopLiveClassroom();

  const [showStartDialog, setShowStartDialog] = useState(false);
  const [classTitle, setClassTitle] = useState("");
  const [joined, setJoined] = useState(false);
  const [jitsiLoading, setJitsiLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  const isLive = liveState?.isLive;
  const roomName = liveState?.roomName;

  // Initialize Jitsi AFTER the container div is rendered (joined=true triggers render, then useEffect fires)
  useEffect(() => {
    if (!joined || !roomName || !jitsiContainerRef.current) return;
    // Don't re-init if already running
    if (jitsiApiRef.current) return;

    let cancelled = false;
    setJitsiLoading(true);

    loadJitsiScript()
      .then(() => {
        if (cancelled || !jitsiContainerRef.current) return;

        const domain = "meet.jit.si";
        const options = {
          roomName,
          parentNode: jitsiContainerRef.current,
          width: "100%",
          height: 500,
          configOverwrite: {
            startWithAudioMuted: !canManage,
            startWithVideoMuted: !canManage,
            prejoinPageEnabled: false,
            disableModeratorIndicator: false,
            enableClosePage: false,
            toolbarButtons: [
              "microphone", "camera", "desktop", "fullscreen",
              "chat", "raisehand", "participants-pane",
              "tileview", "hangup",
              ...(canManage ? ["mute-everyone", "recording"] : []),
            ],
            notifications: [],
            disableDeepLinking: true,
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: "#1a1a2e",
            TOOLBAR_ALWAYS_VISIBLE: true,
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
            MOBILE_APP_PROMO: false,
            HIDE_INVITE_MORE_HEADER: true,
            SHOW_CHROME_EXTENSION_BANNER: false,
          },
          userInfo: {
            displayName: userName,
            email: userEmail || "",
          },
        };

        // @ts-ignore
        const api = new window.JitsiMeetExternalAPI(domain, options);
        jitsiApiRef.current = api;
        setJitsiLoading(false);

        api.addEventListener("readyToClose", () => {
          if (jitsiApiRef.current) {
            jitsiApiRef.current.dispose();
            jitsiApiRef.current = null;
          }
          setJoined(false);
        });

        // If teacher, set subject
        if (canManage) {
          api.addEventListener("participantRoleChanged", (event: any) => {
            if (event.role === "moderator") {
              api.executeCommand("subject", liveState?.title || `Clase: ${courseTitle}`);
            }
          });
        }
      })
      .catch((err) => {
        console.error("Error loading Jitsi:", err);
        setJitsiLoading(false);
        setJoined(false);
        toast({ title: "No se pudo abrir la sala en vivo", description: "Revisa tu conexión e inténtalo de nuevo.", variant: "destructive" });
      });

    return () => {
      cancelled = true;
    };
  }, [joined, roomName]); // Only re-run when joined or roomName changes

  // Clean up Jitsi when class stops
  useEffect(() => {
    if (!isLive && jitsiApiRef.current) {
      jitsiApiRef.current.dispose();
      jitsiApiRef.current = null;
      setJoined(false);
    }
  }, [isLive]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
    };
  }, []);

  const handleStartClass = () => {
    startLive.mutate(
      { courseId, title: classTitle || `Clase en Vivo - ${courseTitle}` },
      {
        onSuccess: () => {
          setShowStartDialog(false);
          setClassTitle("");
        },
      }
    );
  };

  const handleStopClass = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.dispose();
      jitsiApiRef.current = null;
    }
    setJoined(false);
    stopLive.mutate({ courseId });
  };

  const handleJoinClass = () => {
    if (!roomName) return;
    setJoined(true); // This triggers re-render → container appears → useEffect initializes Jitsi
  };

  const handleLeaveClass = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.dispose();
      jitsiApiRef.current = null;
    }
    setJoined(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  // Live class is active
  if (isLive) {
    const startedAt = liveState?.startedAt ? new Date(liveState.startedAt) : null;

    return (
      <div className={isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}>
        <Card className={`border-2 border-red-500/50 ${isFullscreen ? "h-full rounded-none border-0" : ""}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Radio className="w-6 h-6 text-red-500" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {liveState?.title || "Clase en Vivo"}
                    <Badge variant="destructive" className="animate-pulse">
                      EN VIVO
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Iniciada por {liveState?.startedByName}
                    </span>
                    {startedAt && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {startedAt.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {joined && (
                  <Button variant="ghost" size="icon" onClick={toggleFullscreen} title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}>
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>
                )}
                {canManage && (
                  <Button variant="destructive" size="sm" onClick={handleStopClass} disabled={stopLive.isPending}>
                    {stopLive.isPending ? (
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <PhoneOff className="w-4 h-4 mr-1" />
                    )}
                    Finalizar Clase
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!joined ? (
              <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
                <Video className="w-16 h-16 text-primary mx-auto mb-4 opacity-70" />
                <h3 className="text-lg font-semibold mb-2">La clase esta en curso</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Haz clic en el botón para unirte a la sala de video
                </p>
                <Button size="lg" onClick={handleJoinClass} className="gap-2">
                  <Video className="w-5 h-5" />
                  Unirse a la Clase en Vivo
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Se abrira una sala de video con camara y microfono
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {jitsiLoading && (
                  <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Conectando a la sala de video...</span>
                  </div>
                )}
                <div
                  ref={jitsiContainerRef}
                  className={`rounded-lg overflow-hidden ${isFullscreen ? "h-[calc(100vh-120px)]" : "h-[500px]"}`}
                />
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" onClick={handleLeaveClass} className="gap-1">
                    <PhoneOff className="w-4 h-4" />
                    Salir de la Sala
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // No live class — show controls for teacher, info for students
  if (canManage) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Sala en Vivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 bg-muted/20 rounded-lg">
            <VideoOff className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground mb-4">
              No hay ninguna clase en vivo activa en este momento
            </p>
            <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Radio className="w-4 h-4" />
                  Iniciar Clase en Vivo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Iniciar Clase en Vivo</DialogTitle>
                  <DialogDescription>
                    Se creara una sala de video donde los estudiantes inscritos podran conectarse.
                    Los estudiantes recibiran una notificacion automatica.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="classTitle">Título de la Clase (opcional)</Label>
                    <Input
                      id="classTitle"
                      placeholder={`Clase en Vivo - ${courseTitle}`}
                      value={classTitle}
                      onChange={(e) => setClassTitle(e.target.value)}
                    />
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg text-sm">
                    <p className="font-medium mb-1">Lo que incluye la sala:</p>
                    <ul className="space-y-1 text-muted-foreground text-xs">
                      <li>• Video y audio en tiempo real</li>
                      <li>• Chat de texto integrado</li>
                      <li>• Compartir pantalla</li>
                      <li>• Levantar la mano</li>
                      <li>• Sin límite de tiempo</li>
                      <li>• 100% gratuito (Jitsi Meet)</li>
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowStartDialog(false)}>Cancelar</Button>
                  <Button onClick={handleStartClass} disabled={startLive.isPending} className="gap-2">
                    {startLive.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Radio className="w-4 h-4" />
                    )}
                    Iniciar Ahora
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Student view — no active class
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Video className="w-5 h-5 text-primary" />
          Sala en Vivo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6 bg-muted/20 rounded-lg">
          <VideoOff className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-sm text-muted-foreground">
            No hay clase en vivo en este momento.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Recibirás una notificación cuando el maestro inicie una clase.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
