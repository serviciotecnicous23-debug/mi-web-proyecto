import Capacitor
import Foundation

/// El puente con la página de la app (JavaScript: `registerPlugin("Carro")`).
/// La página manda el catálogo y los botones; el reproductor nativo le cuenta cada cambio con el
/// evento `estado` (la misma forma que en Android: ver FotoCarro.diccionario).
@objc(CarroPlugin)
public class CarroPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CarroPlugin"
    public let jsName = "Carro"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "ponerCatalogo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "reproducir", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pausar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "reanudar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "detener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "volumen", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "dormir", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "estado", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "refrescar", returnType: CAPPluginReturnPromise),
    ]

    private var observando: UUID?
    private var coordinador: CoordinadorWeb?

    override public func load() {
        let preparar = { [weak self] in
            guard let self else { return }
            self.observando = Reproductor.shared.observar { [weak self] foto in
                self?.notifyListeners("estado", data: foto.diccionario)
            }
            if FuenteCatalogo.shared.ajustes.coordinarWeb, let pagina = self.bridge?.webView {
                self.coordinador = CoordinadorWeb(pagina: pagina)
            }
            FuenteCatalogo.shared.refrescar()
        }
        // Capacitor carga los complementos en el hilo principal antes de abrir la página: así el guion
        // del coordinador ya está puesto en la primera carga.
        if Thread.isMainThread { preparar() } else { DispatchQueue.main.sync(execute: preparar) }
    }

    @objc func ponerCatalogo(_ call: CAPPluginCall) {
        guard let texto = call.getString("json"), let datos = texto.data(using: .utf8),
              let catalogo = CatalogoCarro.desde(datos: datos)
        else {
            call.reject("El catálogo no es válido")
            return
        }
        DispatchQueue.main.async {
            FuenteCatalogo.shared.poner(catalogo, datos: datos)
            call.resolve()
        }
    }

    @objc func reproducir(_ call: CAPPluginCall) {
        guard let id = call.getString("id") else {
            call.reject("Falta el id")
            return
        }
        DispatchQueue.main.async {
            if Reproductor.shared.reproducir(id: id) {
                call.resolve()
            } else {
                call.reject("No está en el catálogo: \(id)")
            }
        }
    }

    @objc func pausar(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            Reproductor.shared.pausar()
            call.resolve()
        }
    }

    @objc func reanudar(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            Reproductor.shared.reanudar()
            call.resolve()
        }
    }

    @objc func detener(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            Reproductor.shared.detener()
            call.resolve()
        }
    }

    @objc func volumen(_ call: CAPPluginCall) {
        let valor = Float(call.getDouble("valor") ?? 1)
        DispatchQueue.main.async {
            Reproductor.shared.ponerVolumen(valor)
            call.resolve()
        }
    }

    @objc func dormir(_ call: CAPPluginCall) {
        let minutos = call.getDouble("minutos")
        DispatchQueue.main.async {
            Reproductor.shared.dormir(minutos: minutos)
            call.resolve()
        }
    }

    @objc func estado(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            call.resolve(Reproductor.shared.foto.diccionario)
        }
    }

    @objc func refrescar(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            FuenteCatalogo.shared.refrescar(forzar: true) { cambio in
                call.resolve(["cambio": cambio])
            }
        }
    }
}
