# App del Ministerio Avivando el Fuego (Google Play y App Store)

La web oficial dentro de una app nativa (Capacitor 8), con lo que una web no puede hacer:
**CarPlay y Android Auto**. En el carro se ven tres pestañas:

| Pestaña | Qué suena | De dónde sale |
|---|---|---|
| Radio | La radio en vivo, normal y «ahorra datos», con la canción que suena | AzuraCast (con el servidor antiguo de respaldo) |
| Academia | Las lecciones narradas que la persona puede escuchar | `GET /api/carro/catalogo` con la sesión del teléfono |
| Prédicas | Las prédicas publicadas que tienen audio | El archivo de prédicas de la web |

La Academia respeta las mismas reglas que la página de la lección (`server/carro.ts`): sin cuenta, la
primera lección de cada materia del Nivel 1; inscrito, todas las lecciones de sus materias; la Dirección
académica y los profesores, todas.

## Cómo funciona

- `capacitor.config.ts`: la app abre `https://ministerioavivandoelfuego.com` y configura el complemento.
- `plugins/carro/`: el complemento «Carro» (reproductor nativo, CarPlay, Android Auto, voz y pantalla
  bloqueada). **Es una copia del de la app de la radio** (`avivando-radio/plugins/carro`): si se cambia uno,
  copiar el mismo cambio al otro.
- El catálogo de fábrica (en `capacitor.config.ts`) hace que la radio suene en el carro aunque la app nunca
  se haya abierto. Al abrirse, la app trae el catálogo al día del servidor (como mucho una vez por minuto).
- Nunca suenan dos cosas a la vez: si se le da play a algo de la página (la radio o «Escuchar la lección»),
  se pausa el reproductor nativo, y al revés.
- `www/`: solo la página de «sin conexión».

## Comandos

```bash
cd app-movil
npm ci
npm test          # el catálogo de fábrica
npx cap sync      # después de cambiar capacitor.config.ts o el complemento
```

La compilación de Android y de iPhone corre en GitHub Actions (`.github/workflows/app-movil.yml`): no hace
falta Mac. El APK de prueba se descarga desde la pestaña Actions → «Artifacts».

## Para publicarla (lo que necesita el ministerio)

1. **Apple Developer Program** (99 USD al año) y **Google Play Console** (25 USD una vez).
2. **Permiso de CarPlay**: en https://developer.apple.com/contact/carplay se pide «CarPlay Audio» para
   `com.ministerioavivandoelfuego.app` (es un pedido aparte para cada app). Apple lo revisa y, si lo aprueba,
   lo agrega a la cuenta. Hasta entonces la app se compila, pero no se puede firmar para el iPhone con
   `App.entitlements` (que ya trae `com.apple.developer.carplay-audio`).
3. **Android Auto** no pide permiso previo: Google revisa la app al publicarla. Para probar antes con el APK
   de prueba: en la app Android Auto del teléfono, tocar 10 veces la versión (Ajustes → Versión) para abrir
   los ajustes de desarrollador y activar «Fuentes desconocidas».
