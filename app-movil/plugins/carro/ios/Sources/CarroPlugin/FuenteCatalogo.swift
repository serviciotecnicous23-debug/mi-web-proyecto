import Foundation
import WebKit

/// Lo que cada app pone en `capacitor.config.ts` → `plugins.Carro`:
/// - `titulo`: el nombre que se ve arriba en CarPlay.
/// - `catalogo`: el catálogo de fábrica (sirve aunque la app nunca se haya abierto en el teléfono).
/// - `catalogoUrl`: de dónde traer el catálogo al día (la web del ministerio; va con la sesión del usuario).
/// - `coordinarWeb`: si la página de la app también reproduce audio (la web del ministerio), para que
///   nunca suenen dos cosas a la vez.
public struct AjustesCarro {
    public var titulo: String
    public var catalogo: CatalogoCarro?
    public var catalogoUrl: URL?
    public var coordinarWeb: Bool

    static func leer(_ paquete: Bundle = .main) -> AjustesCarro {
        var ajustes = AjustesCarro(titulo: "Avivando el Fuego", catalogo: nil, catalogoUrl: nil, coordinarWeb: false)
        guard let url = paquete.url(forResource: "capacitor.config", withExtension: "json"),
              let datos = try? Data(contentsOf: url),
              let json = (try? JSONSerialization.jsonObject(with: datos)) as? [String: Any]
        else { return ajustes }
        let carro = (json["plugins"] as? [String: Any])?["Carro"] as? [String: Any] ?? [:]
        ajustes.titulo = textoDe(carro["titulo"]) ?? textoDe(json["appName"]) ?? ajustes.titulo
        ajustes.catalogo = carro["catalogo"].flatMap { CatalogoCarro.desde(json: $0) }
        ajustes.catalogoUrl = textoDe(carro["catalogoUrl"]).flatMap { enlacesDe([$0]).first }
        ajustes.coordinarWeb = (carro["coordinarWeb"] as? Bool) ?? false
        return ajustes
    }
}

/// El catálogo vigente. Orden de preferencia: el último bueno guardado en el teléfono (la app web o el
/// servidor lo mandaron), y si no hay, el de fábrica. Nunca se queda sin nada que sonar.
public final class FuenteCatalogo {
    public static let shared = FuenteCatalogo()

    public let ajustes: AjustesCarro
    public private(set) var actual: CatalogoCarro

    private var observadores: [UUID: (CatalogoCarro) -> Void] = [:]
    private var ultimaConsulta: Date?
    private var consultando = false
    private var esperandoConsulta: [(Bool) -> Void] = []

    private static var archivo: URL? {
        guard let carpeta = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first else { return nil }
        try? FileManager.default.createDirectory(at: carpeta, withIntermediateDirectories: true)
        return carpeta.appendingPathComponent("carro-catalogo.json")
    }

    init(ajustes: AjustesCarro = AjustesCarro.leer()) {
        self.ajustes = ajustes
        let guardado = FuenteCatalogo.archivo.flatMap { try? Data(contentsOf: $0) }.flatMap { CatalogoCarro.desde(datos: $0) }
        actual = guardado ?? ajustes.catalogo ?? CatalogoCarro.vacio(titulo: ajustes.titulo)
    }

    public func observar(_ aviso: @escaping (CatalogoCarro) -> Void) -> UUID {
        let id = UUID()
        observadores[id] = aviso
        return id
    }

    public func dejarDeObservar(_ id: UUID) {
        observadores[id] = nil
    }

    /// Pone un catálogo nuevo (ya validado) y lo guarda para la próxima vez.
    public func poner(_ catalogo: CatalogoCarro, datos: Data) {
        if let archivo = FuenteCatalogo.archivo {
            // Se puede leer con el iPhone bloqueado (tras el primer desbloqueo): CarPlay lo necesita.
            try? datos.write(to: archivo, options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
        }
        guard catalogo != actual else { return }
        actual = catalogo
        for aviso in observadores.values { aviso(catalogo) }
    }

    /// Trae el catálogo del servidor (solo si la app tiene `catalogoUrl`). Como mucho una vez por minuto,
    /// salvo que se fuerce. Responde en el hilo principal si hubo cambios.
    public func refrescar(forzar: Bool = false, listo: ((Bool) -> Void)? = nil) {
        guard let url = ajustes.catalogoUrl else {
            listo?(false)
            return
        }
        if let listo { esperandoConsulta.append(listo) }
        if consultando { return }
        if !forzar, let ultima = ultimaConsulta, Date().timeIntervalSince(ultima) < 60 {
            terminarConsulta(false)
            return
        }
        consultando = true
        ultimaConsulta = Date()
        FuenteCatalogo.galletas(para: url) { [weak self] cabecera in
            var pedido = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 10)
            pedido.setValue("application/json", forHTTPHeaderField: "Accept")
            pedido.setValue("ios", forHTTPHeaderField: "X-Carro")
            if let cabecera { pedido.setValue(cabecera, forHTTPHeaderField: "Cookie") }
            URLSession.shared.dataTask(with: pedido) { datos, respuesta, _ in
                DispatchQueue.main.async {
                    guard let self else { return }
                    self.consultando = false
                    guard let datos, (respuesta as? HTTPURLResponse)?.statusCode == 200,
                          let nuevo = CatalogoCarro.desde(datos: datos)
                    else {
                        self.terminarConsulta(false)
                        return
                    }
                    let cambio = nuevo != self.actual
                    self.poner(nuevo, datos: datos)
                    self.terminarConsulta(cambio)
                }
            }.resume()
        }
    }

    private func terminarConsulta(_ cambio: Bool) {
        let todos = esperandoConsulta
        esperandoConsulta = []
        for aviso in todos { aviso(cambio) }
    }

    /// Las galletas de la página de la app (la sesión del usuario en la web del ministerio) para ese
    /// servidor. Si el almacén no contesta en 3 s, se sigue sin ellas: el catálogo público basta.
    static func galletas(para url: URL, listo: @escaping (String?) -> Void) {
        DispatchQueue.main.async {
            var respondido = false
            let responder: (String?) -> Void = { cabecera in
                guard !respondido else { return }
                respondido = true
                listo(cabecera)
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 3) { responder(nil) }
            WKWebsiteDataStore.default().httpCookieStore.getAllCookies { todas in
                let validas = todas.filter { galletaSirve($0, para: url) }
                responder(HTTPCookie.requestHeaderFields(with: validas)["Cookie"])
            }
        }
    }

    static func galletaSirve(_ galleta: HTTPCookie, para url: URL) -> Bool {
        guard let host = url.host?.lowercased() else { return false }
        let dominio = galleta.domain.lowercased()
        let delDominio = dominio.hasPrefix(".")
            ? (host == String(dominio.dropFirst()) || host.hasSuffix(dominio))
            : host == dominio
        guard delDominio else { return false }
        if galleta.isSecure && url.scheme?.lowercased() != "https" { return false }
        if let vence = galleta.expiresDate, vence < Date() { return false }
        let ruta = url.path.isEmpty ? "/" : url.path
        return ruta.hasPrefix(galleta.path)
    }
}
