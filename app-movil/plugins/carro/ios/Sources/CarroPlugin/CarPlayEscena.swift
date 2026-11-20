import CarPlay
import UIKit

/// La pantalla de CarPlay. Arma las listas con el catálogo vigente y deja que el reproductor nativo
/// haga el resto: funciona aunque la app no esté abierta en el teléfono (CarPlay la abre por detrás).
///
/// - Si la raíz del catálogo son varias carpetas (Radio, Academia, Prédicas), van como pestañas.
/// - Si no (la app de la radio), una sola lista con lo que suena.
/// - Al elegir algo, empieza a sonar y se muestra «Ahora suena» (lo llena MPNowPlayingInfoCenter).
///
/// Se declara en el Info.plist de cada app (CPTemplateApplicationSceneSessionRoleApplication) y en
/// `AppDelegate.application(_:configurationForConnecting:options:)`.
public final class CarroCarPlayDelegate: UIResponder, CPTemplateApplicationSceneDelegate, CPInterfaceControllerDelegate,
    CPNowPlayingTemplateObserver {
    private var interfaz: CPInterfaceController?
    private var observandoReproductor: UUID?
    private var observandoCatalogo: UUID?
    /// Las filas que se están mostrando, por id del catálogo (para marcar la que suena).
    private var filas: [String: [CPListItem]] = [:]
    /// Las listas abiertas, por id de su carpeta ("" es la raíz cuando no hay pestañas).
    private var listas: [String: CPListTemplate] = [:]
    private var idsRaiz: [String] = []
    private var conPestanas = false
    private var botonesDeArchivo: Bool?

    // MARK: - Conexión con el carro

    public func templateApplicationScene(_ escena: CPTemplateApplicationScene, didConnect interfaz: CPInterfaceController) {
        self.interfaz = interfaz
        interfaz.delegate = self
        CPNowPlayingTemplate.shared.add(self)
        construir()
        observandoCatalogo = FuenteCatalogo.shared.observar { [weak self] _ in self?.alCambiarCatalogo() }
        observandoReproductor = Reproductor.shared.observar { [weak self] foto in self?.alCambiar(foto) }
        FuenteCatalogo.shared.refrescar(forzar: true)
    }

    public func templateApplicationScene(_ escena: CPTemplateApplicationScene,
                                         didDisconnectInterfaceController interfaz: CPInterfaceController) {
        if let id = observandoReproductor { Reproductor.shared.dejarDeObservar(id) }
        if let id = observandoCatalogo { FuenteCatalogo.shared.dejarDeObservar(id) }
        observandoReproductor = nil
        observandoCatalogo = nil
        CPNowPlayingTemplate.shared.remove(self)
        self.interfaz = nil
        filas = [:]
        listas = [:]
        botonesDeArchivo = nil
    }

    // MARK: - Listas

    static func usaPestanas(_ catalogo: CatalogoCarro) -> Bool {
        catalogo.raiz.count >= 2 && catalogo.raiz.allSatisfy { $0.esCarpeta }
    }

    private func construir() {
        guard let interfaz else { return }
        filas = [:]
        listas = [:]
        let catalogo = FuenteCatalogo.shared.actual
        idsRaiz = catalogo.raiz.map(\.id)
        conPestanas = CarroCarPlayDelegate.usaPestanas(catalogo)
        let raiz: CPTemplate
        if conPestanas {
            let pestanas: [CPTemplate] = catalogo.raiz.prefix(CPTabBarTemplate.maximumTabCount).map { carpeta in
                let lista = plantilla(de: carpeta)
                lista.tabTitle = carpeta.titulo
                lista.tabImage = UIImage(systemName: CarroCarPlayDelegate.simbolo(carpeta.icono))
                return lista
            }
            raiz = CPTabBarTemplate(templates: pestanas)
        } else {
            let lista = CPListTemplate(title: catalogo.titulo, sections: secciones(de: catalogo.raiz))
            lista.emptyViewTitleVariants = ["Preparando la radio…"]
            listas[""] = lista
            raiz = lista
        }
        interfaz.setRootTemplate(raiz, animated: false, completion: nil)
        alCambiar(Reproductor.shared.foto)
    }

    private func plantilla(de carpeta: NodoCarro) -> CPListTemplate {
        let lista = CPListTemplate(title: carpeta.titulo, sections: secciones(de: carpeta.hijos ?? []))
        lista.emptyViewTitleVariants = [carpeta.vacio ?? "Todavía no hay nada aquí"]
        listas[carpeta.id] = lista
        return lista
    }

    private func secciones(de nodos: [NodoCarro]) -> [CPListSection] {
        let visibles = Array(nodos.prefix(CPListTemplate.maximumItemCount))
        guard !visibles.isEmpty else { return [] }
        let archivos = nodos.filter { $0.audio.map { !$0.enVivo } ?? false }
        return [CPListSection(items: visibles.map { fila(de: $0, cola: archivos) })]
    }

    private func fila(de nodo: NodoCarro, cola: [NodoCarro]) -> CPListItem {
        let fila = CPListItem(text: nodo.titulo, detailText: nodo.subtitulo, image: Imagenes.shared.inmediata(nodo.imagen))
        if nodo.esCarpeta {
            fila.accessoryType = .disclosureIndicator
            fila.handler = { [weak self] _, listo in
                self?.abrir(nodo)
                listo()
            }
        } else {
            fila.handler = { [weak self] _, listo in
                Reproductor.shared.reproducir(nodo, cola: cola)
                self?.mostrarAhoraSuena()
                listo()
            }
        }
        if let imagen = nodo.imagen, imagen.lowercased().hasPrefix("https://") {
            Imagenes.shared.cargar(imagen) { [weak fila] cargada in
                if let cargada { fila?.setImage(cargada) }
            }
        }
        filas[nodo.id, default: []].append(fila)
        return fila
    }

    private func abrir(_ carpeta: NodoCarro) {
        let vigente = FuenteCatalogo.shared.actual.buscar(id: carpeta.id) ?? carpeta
        interfaz?.pushTemplate(plantilla(de: vigente), animated: true, completion: nil)
    }

    private func mostrarAhoraSuena() {
        guard let interfaz else { return }
        let ahora = CPNowPlayingTemplate.shared
        if interfaz.topTemplate === ahora { return }
        if interfaz.templates.contains(where: { $0 === ahora }) {
            interfaz.pop(to: ahora, animated: true, completion: nil)
        } else {
            interfaz.pushTemplate(ahora, animated: true, completion: nil)
        }
    }

    /// Llegó un catálogo nuevo (lecciones nuevas, otro servidor): se actualizan las listas abiertas sin
    /// sacar al conductor de donde está. Solo si cambian las pestañas se arma todo otra vez.
    private func alCambiarCatalogo() {
        guard interfaz != nil else { return }
        let catalogo = FuenteCatalogo.shared.actual
        guard catalogo.raiz.map(\.id) == idsRaiz, CarroCarPlayDelegate.usaPestanas(catalogo) == conPestanas else {
            construir()
            return
        }
        filas = [:]
        for (id, lista) in listas {
            if id.isEmpty {
                lista.updateSections(secciones(de: catalogo.raiz))
            } else if let carpeta = catalogo.buscar(id: id) {
                lista.updateSections(secciones(de: carpeta.hijos ?? []))
            }
        }
        alCambiar(Reproductor.shared.foto)
    }

    // MARK: - Lo que suena

    private func alCambiar(_ foto: FotoCarro) {
        for (id, lista) in filas {
            let suena = id == foto.id && foto.sonando
            let nodo = FuenteCatalogo.shared.actual.buscar(id: id)
            for fila in lista {
                if fila.isPlaying != suena {
                    fila.isPlaying = suena
                    fila.playingIndicatorLocation = .trailing
                }
                // Debajo de la radio, la canción que suena ahora.
                if nodo?.audio?.enVivo == true {
                    let detalle = suena && !foto.titulo.isEmpty && foto.titulo != nodo?.titulo
                        ? "\(foto.titulo) · \(foto.artista)"
                        : nodo?.subtitulo
                    if fila.detailText != detalle { fila.setDetailText(detalle) }
                }
            }
        }
        actualizarBotones(foto)
    }

    private func actualizarBotones(_ foto: FotoCarro) {
        let ahora = CPNowPlayingTemplate.shared
        let archivo = foto.id != nil && !foto.enVivo
        if archivo != botonesDeArchivo {
            botonesDeArchivo = archivo
            if archivo {
                let velocidad = CPNowPlayingPlaybackRateButton { _ in Reproductor.shared.siguienteVelocidad() }
                ahora.updateNowPlayingButtons([velocidad])
            } else {
                ahora.updateNowPlayingButtons([])
            }
        }
        let hayCola = archivo && Reproductor.shared.cola.count > 1
        if ahora.isUpNextButtonEnabled != hayCola {
            ahora.upNextTitle = "A continuación"
            ahora.isUpNextButtonEnabled = hayCola
        }
        if ahora.isAlbumArtistButtonEnabled { ahora.isAlbumArtistButtonEnabled = false }
    }

    public func nowPlayingTemplateUpNextButtonTapped(_ plantilla: CPNowPlayingTemplate) {
        let cola = Reproductor.shared.cola
        let actual = Reproductor.shared.foto.id
        let filas: [CPListItem] = cola.prefix(CPListTemplate.maximumItemCount).map { nodo in
            let fila = CPListItem(text: nodo.titulo, detailText: nodo.subtitulo, image: Imagenes.shared.inmediata(nodo.imagen))
            fila.isPlaying = nodo.id == actual
            fila.playingIndicatorLocation = .trailing
            fila.handler = { [weak self] _, listo in
                Reproductor.shared.reproducir(nodo, cola: cola)
                self?.mostrarAhoraSuena()
                listo()
            }
            return fila
        }
        let lista = CPListTemplate(title: "A continuación", sections: [CPListSection(items: filas)])
        interfaz?.pushTemplate(lista, animated: true, completion: nil)
    }

    public func nowPlayingTemplateAlbumArtistButtonTapped(_ plantilla: CPNowPlayingTemplate) {}

    // MARK: - CPInterfaceControllerDelegate

    public func templateWillAppear(_ plantilla: CPTemplate, animated: Bool) {
        // Al volver a una lista, por si hay lecciones nuevas (como mucho una consulta por minuto).
        if plantilla is CPListTemplate { FuenteCatalogo.shared.refrescar() }
    }

    static func simbolo(_ icono: String?) -> String {
        switch icono {
        case "radio": return "dot.radiowaves.left.and.right"
        case "academia": return "graduationcap.fill"
        case "predicas": return "book.fill"
        default: return "music.note.list"
        }
    }
}
