import AVFoundation
import MediaPlayer
import Network
import UIKit

/// Los mismos estados que el motor de la app web (src/audio/radioEngine.ts).
public enum EstadoCarro: String {
    case idle, connecting, playing, buffering, reconnecting, offline, paused
}

/// Lo que se cuenta a la app, a CarPlay y a la pantalla bloqueada.
public struct FotoCarro: Equatable {
    public var estado: EstadoCarro = .idle
    public var id: String?
    public var titulo = ""
    public var artista = ""
    public var imagen: String?
    public var enVivo = false
    /// Segundos escuchados (solo archivos).
    public var posicion: Double = 0
    public var duracion: Double?
    /// Intento de reconexión seguido (0 cuando suena bien).
    public var intento = 0
    /// Cuándo se apaga sola (temporizador para dormir).
    public var dormirA: Date?
    public var velocidad: Float = 1
    public var volumen: Float = 1

    public var sonando: Bool { estado == .playing || estado == .buffering }

    public var diccionario: [String: Any] {
        [
            "estado": estado.rawValue,
            "id": id ?? NSNull(),
            "titulo": titulo,
            "artista": artista,
            "imagen": imagen ?? NSNull(),
            "enVivo": enVivo,
            "posicion": posicion,
            "duracion": duracion ?? NSNull(),
            "intento": intento,
            "dormirA": dormirA.map { $0.timeIntervalSince1970 * 1000 } ?? NSNull(),
            "velocidad": velocidad,
            "volumen": volumen,
        ]
    }
}

/// El reproductor nativo: suena con la pantalla apagada, en CarPlay y aunque la página de la app no esté
/// abierta. Regla central (igual que la app web): mientras el oyente QUIERE escuchar, no se rinde; si la
/// señal se cae, vuelve a conectar solo, con esperas crecientes y alternando los servidores de respaldo.
/// Todo se usa desde el hilo principal.
public final class Reproductor: NSObject {
    public static let shared = Reproductor()

    /// Esperas entre reintentos (segundos); la última se repite sin límite.
    static let esperas: [TimeInterval] = [1, 2, 4, 8, 15, 30]
    /// Un directo congelado más de esto se da por perdido (el vigilante de la app web).
    static let sinAvanceEnVivo: TimeInterval = 12
    static let sinAvanceArchivo: TimeInterval = 30
    /// Un intento que no empieza a sonar en este tiempo se da por fallido.
    static let conexionMaxima: TimeInterval = 15
    /// Tras este tiempo sonando sin cortes, la conexión se considera estable.
    static let estableTras: TimeInterval = 20
    /// Velocidades de las lecciones y prédicas (el botón de CarPlay las recorre en este orden).
    static let velocidades: [Float] = [1, 1.25, 1.5, 2, 0.75]

    private enum Clave {
        static let velocidad = "carro.velocidad"
        static let volumen = "carro.volumen"
        static func lugar(_ id: String) -> String { "carro.lugar.\(id)" }
    }

    public private(set) var foto = FotoCarro() {
        didSet {
            guard foto != oldValue else { return }
            for aviso in observadores.values { aviso(foto) }
        }
    }
    public private(set) var actual: NodoCarro?
    public private(set) var cola: [NodoCarro] = []
    /// Se llama cuando empieza a sonar algo aquí (la app del ministerio calla el audio de su página).
    public var alEmpezar: (() -> Void)?

    private let player = AVPlayer()
    private var quiereSonar = false
    private var pausadoPorSistema = false
    private var indiceUrl = 0
    private var posicionPendiente: Double?
    private var yaSono = false
    private var reintento: Timer?
    private var plazo: Timer?
    private var estable: Timer?
    private var temporizador: Timer?
    private var segundos = 0
    private var hayRed = true
    private let red = NWPathMonitor()
    private let vigia = VigiaMetadatos()
    private var cancion: CancionCarro?
    private var portada: UIImage?
    private var portadaDe: String?
    private var observadores: [UUID: (FotoCarro) -> Void] = [:]
    private var kvoControl: NSKeyValueObservation?
    private var kvoItem: NSKeyValueObservation?
    private var avisosItem: [NSObjectProtocol] = []
    private var avisos: [NSObjectProtocol] = []
    private var reloj: Any?

    private override init() {
        super.init()
        let guardada = UserDefaults.standard.float(forKey: Clave.velocidad)
        foto.velocidad = Reproductor.velocidades.contains(guardada) ? guardada : 1
        if let volumen = UserDefaults.standard.object(forKey: Clave.volumen) as? NSNumber {
            foto.volumen = max(0, min(1, volumen.floatValue))
        }
        player.volume = foto.volumen
        player.automaticallyWaitsToMinimizeStalling = true
        kvoControl = player.observe(\.timeControlStatus, options: [.new]) { [weak self] _, _ in
            DispatchQueue.main.async { self?.alCambiarControl() }
        }
        reloj = player.addPeriodicTimeObserver(forInterval: CMTime(seconds: 1, preferredTimescale: 600), queue: .main) { [weak self] _ in
            self?.alPasarUnSegundo()
        }
        let centro = NotificationCenter.default
        let sesion = AVAudioSession.sharedInstance()
        avisos = [
            centro.addObserver(forName: AVAudioSession.interruptionNotification, object: sesion, queue: .main) { [weak self] aviso in
                self?.alInterrumpir(aviso)
            },
            centro.addObserver(forName: AVAudioSession.routeChangeNotification, object: sesion, queue: .main) { [weak self] aviso in
                self?.alCambiarRuta(aviso)
            },
            centro.addObserver(forName: UIApplication.didEnterBackgroundNotification, object: nil, queue: .main) { [weak self] _ in
                self?.guardarLugar()
            },
        ]
        red.pathUpdateHandler = { [weak self] camino in
            let conectado = camino.status == .satisfied
            DispatchQueue.main.async { self?.alCambiarRed(conectado) }
        }
        red.start(queue: DispatchQueue(label: "carro.red"))
        vigia.alCambiar = { [weak self] cancion in self?.alLlegar(cancion) }
        configurarControles()
    }

    // MARK: - Observadores

    /// Avisa cada cambio (y una vez al empezar, con lo que hay).
    public func observar(_ aviso: @escaping (FotoCarro) -> Void) -> UUID {
        let id = UUID()
        observadores[id] = aviso
        aviso(foto)
        return id
    }

    public func dejarDeObservar(_ id: UUID) {
        observadores[id] = nil
    }

    // MARK: - Lo que pide el oyente

    /// Empieza a sonar un elemento del catálogo y deja lista su cola (las demás lecciones de la materia).
    public func reproducir(_ nodo: NodoCarro, cola nuevaCola: [NodoCarro]? = nil) {
        guard let audio = nodo.audio else { return }
        if quiereSonar, actual?.id == nodo.id {
            // Ya suena: tocarlo otra vez no lo corta. Si estaba reconectando, se intenta ya.
            if foto.estado == .reconnecting || foto.estado == .offline {
                reintento?.invalidate()
                conectar()
            }
            return
        }
        guardarLugar()
        vigia.detener()
        actual = nodo
        if audio.enVivo {
            cola = [nodo]
        } else {
            let archivos = (nuevaCola ?? [nodo]).filter { $0.audio.map { !$0.enVivo } ?? false }
            cola = archivos.contains(where: { $0.id == nodo.id }) ? archivos : [nodo]
        }
        cancion = nil
        indiceUrl = 0
        yaSono = false
        var nueva = foto
        nueva.id = nodo.id
        nueva.enVivo = audio.enVivo
        nueva.duracion = audio.duracion
        nueva.intento = 0
        nueva.posicion = audio.enVivo ? 0 : lugarGuardado(nodo.id)
        foto = nueva
        posicionPendiente = audio.enVivo ? nil : foto.posicion
        empezar()
    }

    /// Lo mismo, por su id en el catálogo vigente.
    @discardableResult
    public func reproducir(id: String) -> Bool {
        let catalogo = FuenteCatalogo.shared.actual
        guard let nodo = catalogo.buscar(id: id), nodo.suena else { return false }
        reproducir(nodo, cola: catalogo.cola(de: id))
        return true
    }

    public func pausar() {
        guard actual != nil else { return }
        quiereSonar = false
        pausadoPorSistema = false
        reintento?.invalidate()
        reintento = nil
        plazo?.invalidate()
        plazo = nil
        apagarTemporizador()
        guardarLugar()
        if foto.enVivo {
            // Un directo pausado se suelta: al volver, se conecta al directo (nunca audio viejo).
            soltarItem()
        } else {
            player.pause()
        }
        vigia.detener()
        foto.estado = .paused
        actualizarAhoraSuena()
    }

    public func reanudar() {
        guard actual != nil else {
            // Nada elegido todavía (p. ej., el botón de play del volante): suena la radio en vivo.
            let catalogo = FuenteCatalogo.shared.actual
            if let vivo = catalogo.primeroEnVivo ?? catalogo.queSuenan.first {
                reproducir(vivo, cola: catalogo.cola(de: vivo.id))
            }
            return
        }
        guard !quiereSonar else { return }
        if !foto.enVivo, let item = player.currentItem, item.status == .readyToPlay {
            // La lección sigue cargada: sigue donde iba sin volver a conectar.
            empezar(conectando: false)
            return
        }
        posicionPendiente = foto.enVivo ? nil : foto.posicion
        empezar()
    }

    /// Se llama al abrir la app: deja listos los botones del volante, los audífonos y la pantalla
    /// bloqueada aunque todavía no suene nada.
    public func preparar() {}

    public func alternar() {
        quiereSonar ? pausar() : reanudar()
    }

    /// Detiene del todo: sin nada en la pantalla bloqueada ni en el carro.
    public func detener() {
        pausar()
        soltarItem()
        actual = nil
        cola = []
        cancion = nil
        foto = FotoCarro(velocidad: foto.velocidad, volumen: foto.volumen)
        MPNowPlayingInfoCenter.default().nowPlayingInfo = nil
        actualizarComandos()
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    }

    public func siguiente() {
        guard let i = indiceEnCola, i + 1 < cola.count else { return }
        let lista = cola
        reproducir(lista[i + 1], cola: lista)
    }

    /// La anterior, o el comienzo de esta si ya pasaron 3 s (como cualquier reproductor).
    public func anterior() {
        guard !foto.enVivo else { return }
        if posicionActual > 3 {
            ir(a: 0)
            return
        }
        guard let i = indiceEnCola, i > 0 else {
            ir(a: 0)
            return
        }
        let lista = cola
        reproducir(lista[i - 1], cola: lista)
    }

    public func saltar(_ segundos: Double) {
        ir(a: posicionActual + segundos)
    }

    public func ir(a segundos: Double) {
        guard !foto.enVivo, actual != nil else { return }
        let tope = (duracionDelItem ?? foto.duracion).map { max(0, $0 - 1) } ?? .greatestFiniteMagnitude
        let destino = max(0, min(segundos, tope))
        foto.posicion = destino
        if player.currentItem?.status == .readyToPlay {
            player.seek(to: CMTime(seconds: destino, preferredTimescale: 600)) { [weak self] _ in
                DispatchQueue.main.async { self?.actualizarAhoraSuena() }
            }
        } else {
            posicionPendiente = destino
        }
        guardarLugar()
        actualizarAhoraSuena()
    }

    public func ponerVolumen(_ valor: Float) {
        let volumen = max(0, min(1, valor))
        player.volume = volumen
        foto.volumen = volumen
        UserDefaults.standard.set(volumen, forKey: Clave.volumen)
    }

    public func ponerVelocidad(_ valor: Float) {
        let velocidad = Reproductor.velocidades.min(by: { abs($0 - valor) < abs($1 - valor) }) ?? 1
        foto.velocidad = velocidad
        UserDefaults.standard.set(velocidad, forKey: Clave.velocidad)
        if #available(iOS 16.0, *) { player.defaultRate = velocidad }
        if quiereSonar, !foto.enVivo, player.rate > 0 { player.rate = velocidad }
        actualizarAhoraSuena()
    }

    /// El botón de velocidad de CarPlay: 1 → 1,25 → 1,5 → 2 → 0,75 → 1.
    public func siguienteVelocidad() {
        let i = Reproductor.velocidades.firstIndex(of: foto.velocidad) ?? 0
        ponerVelocidad(Reproductor.velocidades[(i + 1) % Reproductor.velocidades.count])
    }

    /// Temporizador para dormir: se apaga sola a los `minutos` (nil o 0 lo quita).
    public func dormir(minutos: Double?) {
        apagarTemporizador()
        guard let minutos, minutos > 0 else { return }
        let cuando = Date().addingTimeInterval(minutos * 60)
        foto.dormirA = cuando
        let reloj = Timer(fire: cuando, interval: 0, repeats: false) { [weak self] _ in self?.pausar() }
        RunLoop.main.add(reloj, forMode: .common)
        temporizador = reloj
    }

    public var estaSonando: Bool { quiereSonar }

    // MARK: - Conexión y reconexión

    private func empezar(conectando: Bool = true) {
        guard let audio = actual?.audio else { return }
        quiereSonar = true
        pausadoPorSistema = false
        activarSesion(hablada: !audio.enVivo)
        alEmpezar?()
        if conectando {
            conectar()
        } else {
            tocar(audio)
            foto.estado = .buffering
        }
        actualizarTextos()
        actualizarComandos()
        cargarPortada()
        actualizarAhoraSuena()
    }

    private func conectar() {
        guard quiereSonar, let audio = actual?.audio else { return }
        reintento?.invalidate()
        reintento = nil
        soltarItem()
        guard hayRed else {
            foto.estado = .offline
            return
        }
        foto.estado = foto.intento == 0 ? .connecting : .reconnecting
        let url = audio.urls[indiceUrl % audio.urls.count]
        let item = AVPlayerItem(url: url)
        observar(item: item)
        player.replaceCurrentItem(with: item)
        tocar(audio)
        plazo = programar(Reproductor.conexionMaxima) { [weak self] in self?.fallo() }
        if audio.enVivo { vigia.empezar(audio.metadatos) }
    }

    private func tocar(_ audio: AudioCarro) {
        if audio.enVivo {
            player.play()
        } else {
            if #available(iOS 16.0, *) { player.defaultRate = foto.velocidad }
            player.rate = foto.velocidad
        }
    }

    private func observar(item: AVPlayerItem) {
        kvoItem = item.observe(\.status, options: [.new]) { [weak self] observado, _ in
            DispatchQueue.main.async { self?.alCambiarItem(observado) }
        }
        let centro = NotificationCenter.default
        avisosItem = [
            centro.addObserver(forName: .AVPlayerItemFailedToPlayToEndTime, object: item, queue: .main) { [weak self] _ in
                self?.fallo()
            },
            centro.addObserver(forName: .AVPlayerItemDidPlayToEndTime, object: item, queue: .main) { [weak self] _ in
                self?.alTerminar()
            },
            centro.addObserver(forName: .AVPlayerItemPlaybackStalled, object: item, queue: .main) { [weak self] _ in
                self?.vigilar()
            },
        ]
    }

    private func soltarItem() {
        kvoItem?.invalidate()
        kvoItem = nil
        for aviso in avisosItem { NotificationCenter.default.removeObserver(aviso) }
        avisosItem = []
        plazo?.invalidate()
        plazo = nil
        estable?.invalidate()
        estable = nil
        if player.currentItem != nil { player.replaceCurrentItem(with: nil) }
    }

    private func alCambiarItem(_ item: AVPlayerItem) {
        guard item === player.currentItem else { return }
        switch item.status {
        case .failed:
            fallo()
        case .readyToPlay:
            if let duracion = duracionDelItem { foto.duracion = duracion }
            if let pendiente = posicionPendiente, pendiente > 0 {
                posicionPendiente = nil
                player.seek(to: CMTime(seconds: pendiente, preferredTimescale: 600))
            }
        default:
            break
        }
    }

    private func alCambiarControl() {
        guard quiereSonar, actual != nil, player.currentItem != nil else { return }
        switch player.timeControlStatus {
        case .playing:
            plazo?.invalidate()
            plazo = nil
            yaSono = true
            foto.estado = .playing
            if foto.intento > 0, estable == nil {
                estable = programar(Reproductor.estableTras) { [weak self] in
                    self?.foto.intento = 0
                    self?.estable = nil
                }
            }
            actualizarAhoraSuena()
        case .waitingToPlayAtSpecifiedRate:
            if yaSono, foto.estado == .playing { foto.estado = .buffering }
            vigilar()
        default:
            break
        }
    }

    /// Si no avanza en un rato, la señal se da por perdida.
    private func vigilar() {
        guard quiereSonar, plazo == nil else { return }
        let espera = foto.enVivo ? Reproductor.sinAvanceEnVivo : Reproductor.sinAvanceArchivo
        plazo = programar(espera) { [weak self] in self?.fallo() }
    }

    private func fallo() {
        guard quiereSonar, actual?.audio != nil else { return }
        if !foto.enVivo { posicionPendiente = max(posicionPendiente ?? 0, posicionActual) }
        soltarItem()
        vigia.detener()
        foto.intento += 1
        indiceUrl += 1
        guard hayRed else {
            foto.estado = .offline
            actualizarAhoraSuena()
            return
        }
        foto.estado = .reconnecting
        let espera = Reproductor.esperas[min(foto.intento - 1, Reproductor.esperas.count - 1)]
        reintento = programar(espera) { [weak self] in self?.conectar() }
        actualizarAhoraSuena()
    }

    private func alTerminar() {
        guard let nodo = actual else { return }
        if foto.enVivo {
            // Un directo no termina: si "terminó", se cortó la conexión.
            fallo()
            return
        }
        borrarLugar(nodo.id)
        if let i = indiceEnCola, i + 1 < cola.count {
            let lista = cola
            reproducir(lista[i + 1], cola: lista)
        } else {
            quiereSonar = false
            foto.posicion = 0
            foto.estado = .paused
            soltarItem()
            actualizarAhoraSuena()
        }
    }

    private func alCambiarRed(_ conectado: Bool) {
        let antes = hayRed
        hayRed = conectado
        guard quiereSonar else { return }
        if conectado, !antes, foto.estado == .offline || foto.estado == .reconnecting {
            // Volvió la señal: se conecta ya, sin esperar el resto de la espera.
            conectar()
        } else if !conectado, foto.estado == .reconnecting {
            reintento?.invalidate()
            reintento = nil
            foto.estado = .offline
        }
    }

    // MARK: - Llamadas, audífonos y el carro

    private func alInterrumpir(_ aviso: Notification) {
        guard let datos = aviso.userInfo,
              let valor = datos[AVAudioSessionInterruptionTypeKey] as? UInt,
              let tipo = AVAudioSession.InterruptionType(rawValue: valor)
        else { return }
        switch tipo {
        case .began:
            if #available(iOS 14.5, *),
               let razon = datos[AVAudioSessionInterruptionReasonKey] as? UInt,
               AVAudioSession.InterruptionReason(rawValue: razon) == .appWasSuspended {
                return
            }
            guard quiereSonar else { return }
            pausar()
            pausadoPorSistema = true
        case .ended:
            guard pausadoPorSistema else { return }
            pausadoPorSistema = false
            let opciones = AVAudioSession.InterruptionOptions(rawValue: (datos[AVAudioSessionInterruptionOptionKey] as? UInt) ?? 0)
            // Terminó la llamada y el sistema dice que se puede seguir: se sigue (el directo, al directo).
            if opciones.contains(.shouldResume) { reanudar() }
        @unknown default:
            break
        }
    }

    private func alCambiarRuta(_ aviso: Notification) {
        guard let valor = aviso.userInfo?[AVAudioSessionRouteChangeReasonKey] as? UInt,
              let razon = AVAudioSession.RouteChangeReason(rawValue: valor)
        else { return }
        // Se desconectaron los audífonos o el carro: se pausa, como cualquier reproductor.
        if razon == .oldDeviceUnavailable, quiereSonar { pausar() }
    }

    private func activarSesion(hablada: Bool) {
        let sesion = AVAudioSession.sharedInstance()
        // Lecciones y prédicas son voz: el GPS las pausa en vez de bajarles el volumen.
        try? sesion.setCategory(.playback, mode: hablada ? .spokenAudio : .default, options: [])
        try? sesion.setActive(true)
    }

    // MARK: - La canción del directo, carátulas y «Ahora suena»

    private func alLlegar(_ nueva: CancionCarro) {
        guard foto.enVivo else { return }
        cancion = nueva
        actualizarTextos()
        cargarPortada()
        actualizarAhoraSuena()
    }

    private func actualizarTextos() {
        guard let nodo = actual, let audio = nodo.audio else { return }
        let general = audio.album ?? FuenteCatalogo.shared.actual.titulo
        if audio.enVivo {
            if let cancion, !cancion.titulo.isEmpty {
                foto.titulo = cancion.titulo
                foto.artista = cancion.artista
            } else {
                foto.titulo = nodo.titulo
                foto.artista = cancion?.artista ?? nodo.subtitulo ?? general
            }
            foto.imagen = cancion?.imagen ?? nodo.imagen
        } else {
            foto.titulo = nodo.titulo
            foto.artista = audio.artista ?? nodo.subtitulo ?? general
            foto.imagen = nodo.imagen
        }
    }

    private func cargarPortada() {
        let ruta = foto.imagen
        let clave = ruta ?? "(logo)"
        guard clave != portadaDe else { return }
        portadaDe = clave
        portada = Imagenes.shared.inmediata(ruta)
        Imagenes.shared.cargar(ruta) { [weak self] imagen in
            guard let self, self.portadaDe == clave, let imagen else { return }
            self.portada = imagen
            self.actualizarAhoraSuena()
        }
    }

    private func actualizarAhoraSuena() {
        guard let nodo = actual, let audio = nodo.audio else {
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nil
            return
        }
        let sonando = foto.estado == .playing
        var info: [String: Any] = [
            MPMediaItemPropertyTitle: foto.titulo.isEmpty ? nodo.titulo : foto.titulo,
            MPMediaItemPropertyArtist: foto.artista,
            MPMediaItemPropertyAlbumTitle: audio.album ?? FuenteCatalogo.shared.actual.titulo,
            MPNowPlayingInfoPropertyIsLiveStream: audio.enVivo,
            MPNowPlayingInfoPropertyMediaType: MPNowPlayingInfoMediaType.audio.rawValue,
            MPNowPlayingInfoPropertyPlaybackRate: sonando ? Double(audio.enVivo ? 1 : foto.velocidad) : 0.0,
            MPNowPlayingInfoPropertyDefaultPlaybackRate: 1.0,
        ]
        if !audio.enVivo {
            info[MPNowPlayingInfoPropertyElapsedPlaybackTime] = posicionActual
            if let duracion = duracionDelItem ?? audio.duracion { info[MPMediaItemPropertyPlaybackDuration] = duracion }
            if let i = indiceEnCola {
                info[MPNowPlayingInfoPropertyPlaybackQueueIndex] = i
                info[MPNowPlayingInfoPropertyPlaybackQueueCount] = cola.count
            }
        }
        if let imagen = portada {
            info[MPMediaItemPropertyArtwork] = MPMediaItemArtwork(boundsSize: imagen.size) { _ in imagen }
        }
        MPNowPlayingInfoCenter.default().nowPlayingInfo = info
    }

    private func configurarControles() {
        let c = MPRemoteCommandCenter.shared()
        c.playCommand.addTarget { [weak self] _ in
            self?.reanudar()
            return .success
        }
        c.pauseCommand.addTarget { [weak self] _ in
            self?.pausar()
            return .success
        }
        c.togglePlayPauseCommand.addTarget { [weak self] _ in
            self?.alternar()
            return .success
        }
        c.stopCommand.addTarget { [weak self] _ in
            self?.pausar()
            return .success
        }
        c.nextTrackCommand.addTarget { [weak self] _ in
            self?.siguiente()
            return .success
        }
        c.previousTrackCommand.addTarget { [weak self] _ in
            self?.anterior()
            return .success
        }
        c.skipForwardCommand.preferredIntervals = [15]
        c.skipForwardCommand.addTarget { [weak self] _ in
            self?.saltar(15)
            return .success
        }
        c.skipBackwardCommand.preferredIntervals = [15]
        c.skipBackwardCommand.addTarget { [weak self] _ in
            self?.saltar(-15)
            return .success
        }
        c.changePlaybackPositionCommand.addTarget { [weak self] evento in
            guard let evento = evento as? MPChangePlaybackPositionCommandEvent else { return .commandFailed }
            self?.ir(a: evento.positionTime)
            return .success
        }
        c.changePlaybackRateCommand.supportedPlaybackRates = Reproductor.velocidades.sorted().map { NSNumber(value: $0) }
        c.changePlaybackRateCommand.addTarget { [weak self] evento in
            guard let evento = evento as? MPChangePlaybackRateCommandEvent else { return .commandFailed }
            self?.ponerVelocidad(evento.playbackRate)
            return .success
        }
        actualizarComandos()
    }

    /// Un directo no se adelanta ni se retrocede; una lección sí.
    private func actualizarComandos() {
        let c = MPRemoteCommandCenter.shared()
        let archivo = actual?.audio.map { !$0.enVivo } ?? false
        let hayDespues = archivo && (indiceEnCola.map { $0 + 1 < cola.count } ?? false)
        c.nextTrackCommand.isEnabled = hayDespues
        c.previousTrackCommand.isEnabled = archivo
        c.skipForwardCommand.isEnabled = archivo
        c.skipBackwardCommand.isEnabled = archivo
        c.changePlaybackPositionCommand.isEnabled = archivo
        c.changePlaybackRateCommand.isEnabled = archivo
    }

    // MARK: - Dónde quedó cada lección

    private func alPasarUnSegundo() {
        guard let audio = actual?.audio, !audio.enVivo, player.currentItem != nil else { return }
        let t = player.currentTime().seconds
        if t.isFinite { foto.posicion = t }
        if let duracion = duracionDelItem { foto.duracion = duracion }
        segundos += 1
        if segundos % 5 == 0, quiereSonar { guardarLugar() }
    }

    private func lugarGuardado(_ id: String) -> Double {
        UserDefaults.standard.double(forKey: Clave.lugar(id))
    }

    private func guardarLugar() {
        guard let nodo = actual, let audio = nodo.audio, !audio.enVivo else { return }
        let t = posicionActual
        let total = duracionDelItem ?? audio.duracion ?? 0
        if t < 5 || (total > 0 && t > total - 10) {
            borrarLugar(nodo.id)
        } else {
            UserDefaults.standard.set(t, forKey: Clave.lugar(nodo.id))
        }
    }

    private func borrarLugar(_ id: String) {
        UserDefaults.standard.removeObject(forKey: Clave.lugar(id))
    }

    // MARK: - Ayudas

    private var indiceEnCola: Int? {
        guard let id = actual?.id else { return nil }
        return cola.firstIndex { $0.id == id }
    }

    private var posicionActual: Double {
        let t = player.currentTime().seconds
        return player.currentItem != nil && t.isFinite ? t : foto.posicion
    }

    private var duracionDelItem: Double? {
        guard let d = player.currentItem?.duration.seconds, d.isFinite, d > 0 else { return nil }
        return d
    }

    private func apagarTemporizador() {
        temporizador?.invalidate()
        temporizador = nil
        foto.dormirA = nil
    }

    private func programar(_ segundos: TimeInterval, _ bloque: @escaping () -> Void) -> Timer {
        let reloj = Timer(timeInterval: segundos, repeats: false) { _ in bloque() }
        RunLoop.main.add(reloj, forMode: .common)
        return reloj
    }
}
