// swift-tools-version: 5.9
import PackageDescription

// El complemento «Carro»: reproductor nativo, CarPlay y la pantalla bloqueada del iPhone.
// El nombre del paquete (CapacitorCarro) lo pone Capacitor a partir del nombre npm (capacitor-carro).
let package = Package(
    name: "CapacitorCarro",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapacitorCarro",
            targets: ["CarroPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "CarroPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/CarroPlugin"),
        .testTarget(
            name: "CarroPluginTests",
            dependencies: ["CarroPlugin"],
            path: "ios/Tests/CarroPluginTests")
    ]
)
