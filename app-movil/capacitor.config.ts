import type { CapacitorConfig } from "@capacitor/cli";

// La app del ministerio para Google Play y App Store: abre la web oficial dentro de la app (siempre al día, con la
// sesión de cada persona) y suma lo que una web no puede: CarPlay y Android Auto con el complemento «Carro»
// (plugins/carro), con la radio, las lecciones narradas de la academia y las prédicas.
// OJO: appId no se puede cambiar después de publicar la app en las tiendas.

const SITIO = "https://ministerioavivandoelfuego.com";
const RADIO = "https://radio.ministerioavivandoelfuego.com";
const RADIO_ANTIGUA = "https://40.160.2.176.sslip.io";

// Lo que se ve en el carro antes de que llegue el catálogo del servidor (GET /api/carro/catalogo, server/carro.ts):
// la radio siempre suena, aunque la app nunca se haya abierto en el teléfono.
const CATALOGO_DE_FABRICA = {
  version: 1,
  titulo: "Avivando el Fuego",
  raiz: [
    {
      id: "radio",
      titulo: "Radio",
      icono: "radio",
      hijos: [
        {
          id: "radio:normal",
          titulo: "Radio en vivo",
          subtitulo: "Adoración, alabanza y la Palabra las 24 horas",
          imagen: "icon.png",
          audio: {
            urls: [`${RADIO}/listen/avivando_el_fuego/radio.mp3`, `${RADIO_ANTIGUA}/listen/avivando_el_fuego/radio.mp3`],
            enVivo: true,
            metadatos: [`${RADIO}/api/nowplaying/avivando_el_fuego`, `${RADIO_ANTIGUA}/api/nowplaying/avivando_el_fuego`],
            album: "Avivando el Fuego Radio",
          },
        },
        {
          id: "radio:ligero",
          titulo: "Radio en vivo · Ahorra datos",
          subtitulo: "La misma señal con menos datos (64 kbps)",
          imagen: "icon.png",
          audio: {
            urls: [`${RADIO}/listen/avivando_el_fuego/ligero.aac`, `${RADIO_ANTIGUA}/listen/avivando_el_fuego/ligero.aac`],
            enVivo: true,
            metadatos: [`${RADIO}/api/nowplaying/avivando_el_fuego`, `${RADIO_ANTIGUA}/api/nowplaying/avivando_el_fuego`],
            album: "Avivando el Fuego Radio",
          },
        },
      ],
    },
    { id: "academia", titulo: "Academia", icono: "academia", vacio: "Abre la app en el teléfono para cargar tus lecciones.", hijos: [] },
    { id: "predicas", titulo: "Prédicas", icono: "predicas", vacio: "Abre la app en el teléfono para cargar las prédicas.", hijos: [] },
  ],
};

const config: CapacitorConfig = {
  appId: "com.ministerioavivandoelfuego.app",
  appName: "Avivando el Fuego",
  // Solo la página de respaldo (sin internet): la app abre la web oficial.
  webDir: "www",
  backgroundColor: "#0b0507",
  server: {
    url: SITIO,
    cleartext: false,
    errorPath: "sin-conexion.html",
  },
  android: {
    allowMixedContent: false,
  },
  ios: {
    contentInset: "never",
    backgroundColor: "#0b0507",
  },
  plugins: {
    Carro: {
      titulo: "Avivando el Fuego",
      catalogo: CATALOGO_DE_FABRICA,
      catalogoUrl: `${SITIO}/api/carro/catalogo`,
      // La web también tiene audio (la radio en su marco, «Escuchar la lección»): nunca suenan dos cosas a la vez.
      coordinarWeb: true,
      origenesWeb: [SITIO, RADIO, RADIO_ANTIGUA],
    },
  },
};

export default config;
