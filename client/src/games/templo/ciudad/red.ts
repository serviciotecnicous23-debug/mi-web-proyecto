/**
 * La presencia de la ciudad: un WebSocket con el servidor (la misma sesión de la web). Manda la
 * posición del aprendiz cuando se mueve y recibe la de los vecinos que se ven, sus datos (una
 * vez), las frases rápidas y el resumen del barrio. Si se corta, vuelve a conectarse solo,
 * esperando cada vez un poco más; si la pantalla queda oculta un rato, se desconecta.
 */
import { RED_RUTA, type CasaVista, type RedEntra, type RedSale, type VecinoInfo } from "@shared/ciudad";
import type { MensajeBarrio } from "@shared/barrio";

export type EstadoRed = "conectando" | "conectado" | "fuera";

export type RedEventos = {
  onInfo: (v: VecinoInfo) => void;
  onVecinos: (l: [number, number, number, number, number, number?][]) => void;
  onFrase: (de: number, id: string) => void;
  /** Un vecino hizo un gesto (saludar, aplaudir…). */
  onGesto?: (de: number, id: string) => void;
  onBarrio: (n: number, casas: CasaVista[]) => void;
  /** La charla del barrio: un mensaje nuevo, o uno que se borró. */
  onChat?: (m: MensajeBarrio) => void;
  onChatFuera?: (id: number) => void;
  /** «¿Quién es sabio?»: llamadas para pedir consejo y sus avisos (sabio-red.ts). */
  onSabio?: (m: RedEntra) => void;
  /** Un amigo o vecino te invita a venir (acompanar.ts). */
  onInvitacion?: (i: import("@shared/acompanar").Invitacion) => void;
  /** El barrio terminó una obra (shared/barrio-obras.ts), un regalo para ti (shared/regalos.ts), un banquete abierto (shared/banquete.ts). */
  onObrasBarrio?: (n: number, obras: string[], terminada: string | null) => void;
  onRegalo?: (r: import("@shared/regalos").AvisoRegalo) => void;
  onBanquete?: (anfitrion: string, abierto: boolean) => void;
  /** La ciudad llenó el arca de Joás (shared/arca.ts) y un amigo invitado ya jugó sus 3 días (shared/invitar.ts). */
  onArca?: (a: import("@shared/arca").ArcaVista) => void;
  onAmigo?: (nombre: string, gozo: number) => void;
  /** Los mentores (shared/mentores.ts): te eligieron, tu aprendiz cumplió un paso, se encontraron… */
  onMentor?: (m: import("@shared/mentores").AvisoMentor) => void;
  /** La misión del barrio de hoy (juntos.ts): cómo va y cuando se cumple. */
  onJuntos?: (m: Extract<RedEntra, { t: "juntos" | "juntos-hecho" }>) => void;
  onFuera: (motivo: string) => void;
  onEstado: (e: EstadoRed) => void;
};

/** Oculta más de esto, se cierra la conexión (y se abre otra al volver). */
const OCULTA_MS = 60_000;

export class RedCiudad {
  private ws: WebSocket | null = null;
  private espera = 1000;
  private cerrado = false;
  private fuera = false;
  private temporizador: ReturnType<typeof setTimeout> | null = null;
  private oculta: ReturnType<typeof setTimeout> | null = null;
  estado: EstadoRed = "conectando";

  constructor(private ev: RedEventos) {
    document.addEventListener("visibilitychange", this.alCambiarVista);
  }

  conectar() {
    if (this.cerrado || this.fuera || this.ws) return;
    this.cambiar("conectando");
    const url = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}${RED_RUTA}`;
    let ws: WebSocket;
    try {
      ws = new WebSocket(url);
    } catch {
      this.reintentar();
      return;
    }
    this.ws = ws;
    ws.onopen = () => {
      this.espera = 1000;
      this.cambiar("conectado");
    };
    ws.onmessage = (e) => {
      let m: RedEntra;
      try {
        m = JSON.parse(String(e.data));
      } catch {
        return;
      }
      switch (m.t) {
        case "info":
          this.ev.onInfo(m.v);
          break;
        case "v":
          this.ev.onVecinos(m.l);
          break;
        case "frase":
          this.ev.onFrase(m.de, m.id);
          break;
        case "gesto":
          this.ev.onGesto?.(m.de, m.id);
          break;
        case "barrio":
          this.ev.onBarrio(m.n, m.casas);
          break;
        case "chat":
          this.ev.onChat?.(m.m);
          break;
        case "chat-fuera":
          this.ev.onChatFuera?.(m.id);
          break;
        case "sabio-llamada":
        case "sabio-llamada-fin":
        case "sabio-consejo":
        case "sabio-gracias":
        case "duelo-reto":
        case "duelo-reto-fin":
        case "duelo":
        case "noche-invita":
        case "noche":
          this.ev.onSabio?.(m);
          break;
        case "juntos":
        case "juntos-hecho":
          this.ev.onJuntos?.(m);
          break;
        case "invitacion":
          this.ev.onInvitacion?.(m.i);
          break;
        case "obras-barrio":
          this.ev.onObrasBarrio?.(m.n, m.obras, m.terminada);
          break;
        case "regalo":
          this.ev.onRegalo?.(m.r);
          break;
        case "banquete":
          this.ev.onBanquete?.(m.anfitrion, m.abierto);
          break;
        case "arca":
          this.ev.onArca?.(m.arca);
          break;
        case "amigo":
          this.ev.onAmigo?.(m.nombre, m.gozo);
          break;
        case "mentor":
          this.ev.onMentor?.(m.m);
          break;
        case "fuera":
          this.fuera = true;
          this.ev.onFuera(m.motivo);
          break;
        default:
          break;
      }
    };
    ws.onclose = (e) => {
      if (this.ws === ws) this.ws = null;
      this.ev.onVecinos([]);
      // 4000: se abrió en otra pantalla; 4003: la administración lo sacó de la ciudad
      if (e.code === 4000 || e.code === 4003) this.fuera = true;
      if (this.fuera) this.cambiar("fuera");
      // con la pantalla oculta no se insiste: al volver se conecta otra vez
      else if (!this.cerrado && !document.hidden) this.reintentar();
    };
  }

  private cambiar(e: EstadoRed) {
    if (this.estado === e) return;
    this.estado = e;
    this.ev.onEstado(e);
  }

  private reintentar() {
    if (this.cerrado || this.fuera || this.temporizador) return;
    this.cambiar("conectando");
    this.temporizador = setTimeout(() => {
      this.temporizador = null;
      this.conectar();
    }, this.espera);
    this.espera = Math.min(15_000, this.espera * 2);
  }

  private alCambiarVista = () => {
    if (document.hidden) {
      if (!this.oculta) this.oculta = setTimeout(() => this.ws?.close(1000, "oculta"), OCULTA_MS);
    } else {
      if (this.oculta) clearTimeout(this.oculta);
      this.oculta = null;
      if (!this.ws && !this.cerrado && !this.fuera) {
        this.espera = 1000;
        if (this.temporizador) clearTimeout(this.temporizador);
        this.temporizador = null;
        this.conectar();
      }
    }
  };

  enviar(m: RedSale) {
    if (this.ws?.readyState === 1) this.ws.send(JSON.stringify(m));
  }

  cerrar() {
    this.cerrado = true;
    document.removeEventListener("visibilitychange", this.alCambiarVista);
    if (this.temporizador) clearTimeout(this.temporizador);
    if (this.oculta) clearTimeout(this.oculta);
    this.ws?.close(1000, "salir");
    this.ws = null;
  }
}
