import UIKit
import AVFoundation
import CarPlay
import Capacitor
import CarroPlugin

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // La radio y las lecciones siguen con la pantalla bloqueada y aunque el interruptor de
        // silencio esté puesto (junto con UIBackgroundModes = audio en Info.plist).
        try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .default, options: [])
        // El reproductor nativo (complemento «Carro»): deja listos el botón de play del volante, los
        // audífonos y la pantalla bloqueada desde que abre la app (también cuando la abre CarPlay).
        Reproductor.shared.preparar()
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ application: UIApplication,
                     configurationForConnecting connectingSceneSession: UISceneSession,
                     options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        if connectingSceneSession.role == UISceneSession.Role.carTemplateApplication {
            // La pantalla del carro (CarPlay): la arma el complemento «Carro» (CarPlayEscena.swift).
            let carro = UISceneConfiguration(name: "CarPlay", sessionRole: connectingSceneSession.role)
            carro.delegateClass = CarroCarPlayDelegate.self
            return carro
        }
        let config = UISceneConfiguration(name: "Default Configuration",
                                          sessionRole: connectingSceneSession.role)
        config.delegateClass = SceneDelegate.self
        return config
    }
}
